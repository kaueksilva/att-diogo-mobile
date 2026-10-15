import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,
  Image, Switch, ActivityIndicator, Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import { createTask, updateTask, deleteTask } from '../services/taskService';
import { persistPhoto, deletePhoto } from '../services/fileService';
import { getWeather } from '../services/apiService';
import {
  remindersSupported, hasReminderPermission, requestReminderPermission,
} from '../services/notificationService';
import { showAlert, confirmAction } from '../utils/alert';
import { formatDueDate, formatDateTime } from '../utils/date';
import ScreenHeader from '../components/ScreenHeader';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { colors, PRIORITIES } from '../theme/theme';
import { styles } from '../styles/TaskDetailStyles';

// O seletor nativo de data/hora não existe na Web; lá usamos só os atalhos rápidos.
const DateTimePicker = Platform.OS === 'web' ? null : require('@react-native-community/datetimepicker');

const TITLE_MAX_LENGTH = 80;

/** Data daqui a `days` dias, no horário `hour` (minutos zerados). */
const atDayAndHour = (days, hour) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, 0, 0, 0);
  return date;
};

/** Atalhos para definir o prazo com um toque. */
const QUICK_DUE_OPTIONS = [
  { label: 'Em 1 hora', getDate: () => new Date(Math.ceil((Date.now() + 60 * 60 * 1000) / 60000) * 60000) },
  { label: 'Amanhã 9h', getDate: () => atDayAndHour(1, 9) },
  { label: 'Em 1 semana', getDate: () => atDayAndHour(7, 9) },
];

/**
 * Tela de criação e edição de tarefas.
 * Recursos de dispositivo: câmera/galeria (foto anexada), GPS (localização)
 * e notificações locais (lembrete no prazo da tarefa).
 * API externa: clima atual no local da tarefa (Open-Meteo).
 */
const TaskDetailScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const existingTask = route.params?.task ?? null;
  const isEditing = !!existingTask;

  const [title, setTitle] = useState(existingTask?.title ?? '');
  const [description, setDescription] = useState(existingTask?.description ?? '');
  const [priority, setPriority] = useState(existingTask?.priority ?? 'media');
  const [completed, setCompleted] = useState(existingTask?.completed ?? false);
  const [dueDate, setDueDate] = useState(existingTask?.dueDate ?? null);
  const [showIosPicker, setShowIosPicker] = useState(false);
  const [canNotify, setCanNotify] = useState(null);
  const [photo, setPhoto] = useState(existingTask?.photo ?? null);
  const [location, setLocation] = useState(existingTask?.location ?? null);
  const [titleError, setTitleError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [weather, setWeather] = useState(null);
  const [weatherStatus, setWeatherStatus] = useState('idle');

  // Busca o clima sempre que uma localização é anexada.
  useEffect(() => {
    if (!location) {
      setWeather(null);
      setWeatherStatus('idle');
      return undefined;
    }

    let isCancelled = false;
    setWeatherStatus('loading');
    getWeather(location.latitude, location.longitude)
      .then((data) => {
        if (isCancelled) return;
        setWeather(data);
        setWeatherStatus('ready');
      })
      .catch(() => {
        if (!isCancelled) setWeatherStatus('error');
      });

    return () => {
      isCancelled = true;
    };
  }, [location]);

  // Descobre se as notificações já estão liberadas para mostrar o aviso certo.
  useEffect(() => {
    if (remindersSupported) hasReminderPermission().then(setCanNotify);
  }, []);

  /** Define o prazo e pede permissão de notificação para o lembrete. */
  const selectDueDate = (date) => {
    setDueDate(date.toISOString());
    if (remindersSupported && !canNotify) requestReminderPermission().then(setCanNotify);
  };

  /** Abre o seletor nativo de data e hora (Android: dois diálogos; iOS: inline). */
  const openDatePicker = () => {
    const initial = dueDate ? new Date(dueDate) : atDayAndHour(1, 9);

    if (Platform.OS === 'ios') {
      if (!dueDate) selectDueDate(initial);
      setShowIosPicker(true);
      return;
    }

    DateTimePicker.DateTimePickerAndroid.open({
      value: initial,
      mode: 'date',
      minimumDate: new Date(),
      onChange: (dateEvent, pickedDate) => {
        if (dateEvent.type !== 'set' || !pickedDate) return;
        DateTimePicker.DateTimePickerAndroid.open({
          value: pickedDate,
          mode: 'time',
          is24Hour: true,
          onChange: (timeEvent, pickedTime) => {
            if (timeEvent.type === 'set' && pickedTime) selectDueDate(pickedTime);
          },
        });
      },
    });
  };

  const clearDueDate = () => {
    setDueDate(null);
    setShowIosPicker(false);
  };

  /** Texto de ajuda abaixo do prazo, explicando se haverá lembrete. */
  const getReminderHint = () => {
    if (new Date(dueDate).getTime() <= Date.now()) return 'Este prazo já passou.';
    if (!remindersSupported) return 'Lembretes por notificação funcionam no app (Android/iOS).';
    if (canNotify === false) return 'Ative as notificações do app para receber o lembrete.';
    return '🔔 Você receberá um lembrete neste horário.';
  };

  /** Abre a câmera ou a galeria e anexa a imagem escolhida. */
  const pickPhoto = async (fromCamera) => {
    try {
      const permission = fromCamera
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        showAlert('Permissão negada', `Precisamos de acesso à ${fromCamera ? 'câmera' : 'galeria'} para anexar uma foto.`);
        return;
      }

      const options = {
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      };
      const result = fromCamera
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);

      if (!result.canceled && result.assets?.length) {
        setPhoto(result.assets[0].uri);
      }
    } catch (e) {
      console.warn('Erro ao obter foto', e);
      showAlert('Erro', 'Não foi possível acessar a câmera ou a galeria.');
    }
  };

  /** Captura a localização atual pelo GPS e tenta descobrir o endereço. */
  const captureLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        showAlert('Permissão negada', 'Precisamos da permissão de localização para anexá-la à tarefa.');
        return;
      }

      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };

      let address = null;
      try {
        const [place] = await Location.reverseGeocodeAsync(coords);
        if (place) {
          address = [place.street, place.district || place.subregion, place.city].filter(Boolean).join(', ') || null;
        }
      } catch (e) {
        // Geocodificação reversa não está disponível em todas as plataformas (ex: web).
      }

      setLocation({ ...coords, address });
    } catch (e) {
      console.warn('Erro ao obter localização', e);
      showAlert('Erro', 'Não foi possível obter a localização. Verifique se o GPS está ativado.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
    Linking.openURL(url).catch(() => showAlert('Erro', 'Não foi possível abrir o mapa.'));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setTitleError('O título da tarefa é obrigatório');
      return;
    }

    setIsSaving(true);
    try {
      const savedPhoto = photo ? await persistPhoto(photo) : null;
      const data = {
        title: title.trim(),
        description: description.trim(),
        priority,
        completed,
        dueDate,
        photo: savedPhoto,
        location,
      };

      if (isEditing) {
        await updateTask(user.email, existingTask.id, data);
        if (existingTask.photo && existingTask.photo !== savedPhoto) {
          await deletePhoto(existingTask.photo);
        }
      } else {
        await createTask(user.email, data);
      }
      navigation.goBack();
    } catch (e) {
      console.warn('Erro ao salvar tarefa', e);
      showAlert('Erro', 'Não foi possível salvar a tarefa.');
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = await confirmAction('Excluir tarefa', 'Esta ação não pode ser desfeita.', 'Excluir');
    if (!confirmed) return;
    try {
      await deleteTask(user.email, existingTask.id);
      navigation.goBack();
    } catch (e) {
      showAlert('Erro', 'Não foi possível excluir a tarefa.');
    }
  };

  const renderWeather = () => {
    if (weatherStatus === 'loading') {
      return (
        <View style={styles.weatherBox}>
          <ActivityIndicator color={colors.primary} />
          <Text style={[styles.weatherMeta, { marginLeft: 12 }]}>Consultando o clima...</Text>
        </View>
      );
    }
    if (weatherStatus === 'error') {
      return (
        <View style={styles.weatherBox}>
          <MaterialIcons name="cloud-off" size={24} color={colors.textMuted} />
          <Text style={[styles.weatherMeta, { marginLeft: 12 }]}>Clima indisponível (sem conexão).</Text>
        </View>
      );
    }
    if (weatherStatus === 'ready' && weather) {
      return (
        <View style={styles.weatherBox}>
          <MaterialIcons name={weather.icon} size={34} color={colors.warning} />
          <Text style={styles.weatherTemp}>{weather.temperature}°C</Text>
          <View style={styles.weatherInfo}>
            <Text style={styles.weatherDesc}>{weather.description}</Text>
            <Text style={styles.weatherMeta}>Vento {weather.wind} km/h • Open-Meteo</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScreenHeader
        title={isEditing ? 'Editar tarefa' : 'Nova tarefa'}
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <FormInput
            label={`Título (${title.length}/${TITLE_MAX_LENGTH})`}
            icon="title"
            placeholder="Ex: Estudar para a prova"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (titleError) setTitleError('');
            }}
            error={titleError}
            maxLength={TITLE_MAX_LENGTH}
          />

          <FormInput
            label="Descrição (opcional)"
            icon="notes"
            placeholder="Detalhes da tarefa..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.sectionLabel}>Prioridade</Text>
          <View style={styles.priorityRow}>
            {Object.entries(PRIORITIES).map(([key, config]) => {
              const isSelected = priority === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.priorityChip, isSelected && { backgroundColor: config.color }]}
                  onPress={() => setPriority(key)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                >
                  <View style={[styles.priorityDot, { backgroundColor: isSelected ? colors.white : config.color }]} />
                  <Text style={[styles.priorityText, isSelected && styles.priorityTextActive]}>{config.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionLabel}>Prazo</Text>
          <View style={styles.card}>
            {dueDate ? (
              <>
                <View style={styles.dueRow}>
                  <View style={[styles.locationIcon, { backgroundColor: colors.primaryLight }]}>
                    <MaterialIcons name="event" size={24} color={colors.primary} />
                  </View>
                  <Text style={styles.dueText}>{formatDueDate(dueDate)}</Text>
                  {DateTimePicker ? (
                    <TouchableOpacity style={styles.dueIconBtn} onPress={openDatePicker} accessibilityLabel="Alterar prazo">
                      <MaterialIcons name="edit" size={20} color={colors.primary} />
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity
                    style={[styles.dueIconBtn, { backgroundColor: colors.dangerLight }]}
                    onPress={clearDueDate}
                    accessibilityLabel="Remover prazo"
                  >
                    <MaterialIcons name="close" size={20} color={colors.danger} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.dueHint}>{getReminderHint()}</Text>

                {Platform.OS === 'ios' && showIosPicker ? (
                  <>
                    <DateTimePicker.default
                      value={new Date(dueDate)}
                      mode="datetime"
                      display="inline"
                      locale="pt-BR"
                      minimumDate={new Date()}
                      onChange={(event, date) => date && setDueDate(date.toISOString())}
                    />
                    <TouchableOpacity style={styles.mapLink} onPress={() => setShowIosPicker(false)}>
                      <MaterialIcons name="check" size={18} color={colors.primary} />
                      <Text style={styles.mapLinkText}>Concluir</Text>
                    </TouchableOpacity>
                  </>
                ) : null}
              </>
            ) : (
              <>
                <Text style={styles.cardHint}>Defina um prazo para receber um lembrete.</Text>
                <View style={styles.dueChips}>
                  {QUICK_DUE_OPTIONS.map(({ label, getDate }) => (
                    <TouchableOpacity key={label} style={styles.dueChip} onPress={() => selectDueDate(getDate())}>
                      <Text style={styles.dueChipText}>{label}</Text>
                    </TouchableOpacity>
                  ))}
                  {DateTimePicker ? (
                    <TouchableOpacity style={[styles.dueChip, styles.dueChipAccent]} onPress={openDatePicker}>
                      <MaterialIcons name="calendar-today" size={15} color={colors.white} />
                      <Text style={[styles.dueChipText, { color: colors.white, marginLeft: 5 }]}>Escolher</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </>
            )}
          </View>

          <Text style={styles.sectionLabel}>Foto</Text>
          <View style={styles.card}>
            {photo ? (
              <View>
                <Image source={{ uri: photo }} style={styles.photo} resizeMode="cover" />
                <TouchableOpacity
                  style={styles.removePhotoBtn}
                  onPress={() => setPhoto(null)}
                  accessibilityLabel="Remover foto"
                >
                  <MaterialIcons name="close" size={20} color={colors.white} />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={styles.cardHint}>Anexe uma foto para lembrar de um detalhe importante.</Text>
                <View style={styles.photoActions}>
                  <TouchableOpacity
                    style={[styles.photoActionBtn, { backgroundColor: colors.primaryLight }]}
                    onPress={() => pickPhoto(true)}
                  >
                    <MaterialIcons name="photo-camera" size={30} color={colors.primary} />
                    <Text style={[styles.photoActionText, { color: colors.primary }]}>Câmera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.photoActionBtn, { backgroundColor: colors.accentLight }]}
                    onPress={() => pickPhoto(false)}
                  >
                    <MaterialIcons name="photo-library" size={30} color={colors.accent} />
                    <Text style={[styles.photoActionText, { color: colors.accent }]}>Galeria</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          <Text style={styles.sectionLabel}>Localização</Text>
          <View style={styles.card}>
            <View style={styles.locationRow}>
              <View
                style={[
                  styles.locationIcon,
                  { backgroundColor: location ? colors.successLight : colors.subtle },
                ]}
              >
                <MaterialIcons
                  name={location ? 'place' : 'location-off'}
                  size={24}
                  color={location ? colors.success : colors.textMuted}
                />
              </View>
              <View style={[styles.locationInfo, { marginLeft: 10 }]}>
                {location ? (
                  <>
                    <Text style={styles.locationTitle} numberOfLines={2}>
                      {location.address || 'Localização capturada'}
                    </Text>
                    <Text style={styles.locationCoords}>
                      {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.locationCoords}>Nenhuma localização anexada.</Text>
                )}
              </View>
              <TouchableOpacity
                style={[styles.locationBtn, location && styles.locationBtnRemove]}
                onPress={location ? () => setLocation(null) : captureLocation}
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <MaterialIcons name={location ? 'delete-outline' : 'my-location'} size={18} color={colors.white} />
                )}
                <Text style={styles.locationBtnText}>
                  {isLoadingLocation ? 'Buscando' : location ? 'Remover' : 'Capturar'}
                </Text>
              </TouchableOpacity>
            </View>

            {location ? (
              <>
                <TouchableOpacity style={styles.mapLink} onPress={openInMaps}>
                  <MaterialIcons name="map" size={18} color={colors.primary} />
                  <Text style={styles.mapLinkText}>Abrir no mapa</Text>
                </TouchableOpacity>
                {renderWeather()}
              </>
            ) : null}
          </View>

          {isEditing ? (
            <View style={styles.card}>
              <View style={styles.statusRow}>
                <MaterialIcons
                  name={completed ? 'check-circle' : 'radio-button-unchecked'}
                  size={30}
                  color={completed ? colors.success : colors.textMuted}
                />
                <View style={styles.statusInfo}>
                  <Text style={styles.statusTitle}>{completed ? 'Concluída' : 'Pendente'}</Text>
                  <Text style={styles.statusHint}>Marque quando terminar a tarefa</Text>
                </View>
                <Switch
                  value={completed}
                  onValueChange={setCompleted}
                  trackColor={{ true: colors.success, false: colors.border }}
                  thumbColor={colors.white}
                />
              </View>
            </View>
          ) : null}

          <PrimaryButton
            title={isEditing ? 'Salvar alterações' : 'Criar tarefa'}
            icon="save"
            onPress={handleSave}
            loading={isSaving}
          />

          {isEditing ? (
            <>
              <PrimaryButton
                title="Excluir tarefa"
                icon="delete-outline"
                variant="danger"
                onPress={handleDelete}
                style={styles.deleteBtn}
              />
              <Text style={styles.meta}>
                Criada em {formatDateTime(existingTask.createdAt)}
                {existingTask.updatedAt ? `\nÚltima alteração em ${formatDateTime(existingTask.updatedAt)}` : ''}
              </Text>
            </>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TaskDetailScreen;
