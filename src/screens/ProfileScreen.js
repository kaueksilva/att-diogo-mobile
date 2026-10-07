import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { getTasks, clearCompleted, getStats } from '../services/taskService';
import { getRandomQuote } from '../services/apiService';
import { showAlert, confirmAction } from '../utils/alert';
import ScreenHeader from '../components/ScreenHeader';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { colors, gradients } from '../theme/theme';
import { styles } from '../styles/ProfileStyles';

const StatCard = ({ value, label, icon, color, background }) => (
  <View style={[styles.statCard, { backgroundColor: background }]}>
    <MaterialIcons name={icon} size={22} color={color} />
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

/**
 * Tela de perfil: dados do usuário (com edição do nome), estatísticas das
 * tarefas, frase motivacional vinda de API externa e ações da conta.
 */
const ProfileScreen = ({ navigation }) => {
  const { user, logout, updateProfile } = useContext(AuthContext);
  const [stats, setStats] = useState(getStats([]));
  const [quote, setQuote] = useState(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(user.name);
  const [nameError, setNameError] = useState('');

  useFocusEffect(
    useCallback(() => {
      getTasks(user.email)
        .then((tasks) => setStats(getStats(tasks)))
        .catch((e) => console.warn('Erro ao carregar estatísticas', e));
    }, [user.email])
  );

  const loadQuote = useCallback(async () => {
    setIsLoadingQuote(true);
    setQuote(await getRandomQuote());
    setIsLoadingQuote(false);
  }, []);

  useEffect(() => {
    loadQuote();
  }, [loadQuote]);

  const handleSaveName = async () => {
    if (name.trim().length < 3) {
      setNameError('Nome deve ter pelo menos 3 letras');
      return;
    }
    const success = await updateProfile(name);
    if (success) {
      setIsEditingName(false);
      setNameError('');
    } else {
      showAlert('Erro', 'Não foi possível atualizar o nome.');
    }
  };

  const cancelEditName = () => {
    setName(user.name);
    setNameError('');
    setIsEditingName(false);
  };

  const handleClearCompleted = async () => {
    if (stats.completed === 0) {
      showAlert('Nada para limpar', 'Você não tem tarefas concluídas.');
      return;
    }
    const confirmed = await confirmAction(
      'Limpar concluídas',
      `Excluir ${stats.completed} tarefa(s) concluída(s)?`,
      'Limpar'
    );
    if (!confirmed) return;
    try {
      setStats(getStats(await clearCompleted(user.email)));
    } catch (e) {
      showAlert('Erro', 'Não foi possível limpar as tarefas.');
    }
  };

  const handleLogout = async () => {
    const confirmed = await confirmAction('Sair da conta', 'Deseja realmente sair?', 'Sair');
    if (confirmed) logout();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScreenHeader title="Meu perfil" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.profileTop}>
          <LinearGradient colors={gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
          </LinearGradient>

          <View style={styles.profileInfo}>
            {isEditingName ? (
              <View style={styles.nameEditor}>
                <FormInput
                  style={styles.nameInput}
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    setNameError('');
                  }}
                  error={nameError}
                  autoFocus
                  onSubmitEditing={handleSaveName}
                />
                <TouchableOpacity
                  style={[styles.nameEditorBtn, { backgroundColor: colors.primary }]}
                  onPress={handleSaveName}
                  accessibilityLabel="Salvar nome"
                >
                  <MaterialIcons name="check" size={22} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.nameEditorBtn, { backgroundColor: colors.subtle }]}
                  onPress={cancelEditName}
                  accessibilityLabel="Cancelar edição"
                >
                  <MaterialIcons name="close" size={22} color={colors.textBody} />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.nameRow}>
                  <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
                  <TouchableOpacity
                    style={styles.editNameBtn}
                    onPress={() => setIsEditingName(true)}
                    accessibilityLabel="Editar nome"
                  >
                    <MaterialIcons name="edit" size={18} color={colors.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.email} numberOfLines={1}>{user.email}</Text>
              </>
            )}
          </View>
        </View>

        <Text style={styles.sectionLabel}>Resumo das tarefas</Text>
        <View style={styles.statsRow}>
          <StatCard
            value={stats.total}
            label="Total"
            icon="list-alt"
            color={colors.primary}
            background={colors.primaryLight}
          />
          <StatCard
            value={stats.completed}
            label="Concluídas"
            icon="check-circle"
            color={colors.success}
            background={colors.successLight}
          />
          <StatCard
            value={stats.pending}
            label="Pendentes"
            icon="schedule"
            color={colors.warning}
            background={colors.warningLight}
          />
        </View>

        <LinearGradient colors={gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.apiSection}>
          <View style={styles.apiHeader}>
            <Text style={styles.apiTitle}>✨ Inspiração do dia</Text>
            {quote?.offline ? (
              <View style={styles.offlineBadge}>
                <MaterialIcons name="wifi-off" size={12} color={colors.white} />
                <Text style={styles.offlineText}>Offline</Text>
              </View>
            ) : null}
          </View>

          {isLoadingQuote || !quote ? (
            <ActivityIndicator size="small" color={colors.white} style={styles.quoteLoading} />
          ) : (
            <>
              <Text style={styles.quoteText}>"{quote.text}"</Text>
              <Text style={styles.quoteAuthor}>— {quote.author}</Text>
            </>
          )}

          <TouchableOpacity onPress={loadQuote} style={styles.refreshBtn} disabled={isLoadingQuote}>
            <MaterialIcons name="refresh" size={18} color={colors.primary} />
            <Text style={styles.refreshBtnText}>Nova frase</Text>
          </TouchableOpacity>
        </LinearGradient>

        <PrimaryButton
          title="Limpar tarefas concluídas"
          icon="cleaning-services"
          variant="outline"
          onPress={handleClearCompleted}
          style={styles.actionSpacing}
        />
        <PrimaryButton title="Sair da conta" icon="logout" variant="danger" onPress={handleLogout} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
