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
import { showAlert, confirmAction } from '../utils/alert';
import ScreenHeader from '../components/ScreenHeader';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { colors, PRIORITIES } from '../theme/theme';
import { styles } from '../styles/TaskDetailStyles';

const TITLE_MAX_LENGTH = 80;

const formatDate = (iso) =>
  new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

/**
 * Tela de criação e edição de tarefas.
 * Recursos de dispositivo: câmera/galeria (foto anexada) e GPS (localização).
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
          <MaterialIcons name={weather.icon} size={32} color={colors.warning} />
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
      <StatusBar style="dark" />
      <ScreenHeader
        title={isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}
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
                  style={[
                    styles.priorityChip,
                    isSelected && { borderColor: config.color, backgroundColor: config.background },
                  ]}
                  onPress={() => setPriority(key)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                >
                  <View style={[styles.priorityDot, { backgroundColor: config.color }]} />
                  <Text style={[styles.priorityText, isSelected && { color: config.color }]}>{config.label}</Text>
                </TouchableOpacity>
              );
            })}
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
                  <TouchableOpacity style={styles.photoActionBtn} onPress={() => pickPhoto(true)}>
                    <MaterialIcons name="photo-camera" size={28} color={colors.primary} />
                    <Text style={styles.photoActionText}>Câmera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.photoActionBtn} onPress={() => pickPhoto(false)}>
                    <MaterialIcons name="photo-library" size={28} color={colors.primary} />
                    <Text style={styles.photoActionText}>Galeria</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          <Text style={styles.sectionLabel}>Localização</Text>
          <View style={styles.card}>
            <View style={styles.locationRow}>
              <MaterialIcons
                name={location ? 'place' : 'location-off'}
                size={28}
                color={location ? colors.success : colors.textMuted}
              />
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
                  size={28}
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
            title={isEditing ? 'Salvar Alterações' : 'Criar Tarefa'}
            icon="save"
            onPress={handleSave}
            loading={isSaving}
          />

          {isEditing ? (
            <>
              <PrimaryButton
                title="Excluir Tarefa"
                icon="delete-outline"
                variant="danger"
                onPress={handleDelete}
                style={styles.deleteBtn}
              />
              <Text style={styles.meta}>
                Criada em {formatDate(existingTask.createdAt)}
                {existingTask.updatedAt ? `\nÚltima alteração em ${formatDate(existingTask.updatedAt)}` : ''}
              </Text>
            </>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TaskDetailScreen;
