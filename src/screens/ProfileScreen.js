import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { getTasks, clearCompleted, getStats } from '../services/taskService';
import { getRandomQuote } from '../services/apiService';
import { showAlert, confirmAction } from '../utils/alert';
import ScreenHeader from '../components/ScreenHeader';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme/theme';
import { styles } from '../styles/ProfileStyles';

const StatCard = ({ value, label, color }) => (
  <View style={styles.statCard}>
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
      <StatusBar style="dark" />
      <ScreenHeader title="Meu Perfil" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.profileTop}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
          </View>

          {isEditingName ? (
            <View style={styles.nameEditor}>
              <FormInput
                style={styles.nameInput}
                icon="person"
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
                style={[styles.nameEditorBtn, { backgroundColor: colors.success }]}
                onPress={handleSaveName}
                accessibilityLabel="Salvar nome"
              >
                <MaterialIcons name="check" size={24} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.nameEditorBtn, { backgroundColor: colors.border }]}
                onPress={cancelEditName}
                accessibilityLabel="Cancelar edição"
              >
                <MaterialIcons name="close" size={24} color={colors.textBody} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user.name}</Text>
              <TouchableOpacity
                style={styles.editNameBtn}
                onPress={() => setIsEditingName(true)}
                accessibilityLabel="Editar nome"
              >
                <MaterialIcons name="edit" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard value={stats.total} label="Total" color={colors.primary} />
          <StatCard value={stats.completed} label="Concluídas" color={colors.success} />
          <StatCard value={stats.pending} label="Pendentes" color={colors.warning} />
        </View>

        <View style={styles.apiSection}>
          <View style={styles.apiHeader}>
            <Text style={styles.apiTitle}>Inspiração do Dia</Text>
            {quote?.offline ? (
              <View style={styles.offlineBadge}>
                <MaterialIcons name="wifi-off" size={12} color={colors.textSecondary} />
                <Text style={styles.offlineText}>Offline</Text>
              </View>
            ) : null}
          </View>

          {isLoadingQuote || !quote ? (
            <ActivityIndicator size="small" color={colors.success} style={styles.quoteLoading} />
          ) : (
            <>
              <Text style={styles.quoteText}>"{quote.text}"</Text>
              <Text style={styles.quoteAuthor}>— {quote.author}</Text>
            </>
          )}

          <TouchableOpacity onPress={loadQuote} style={styles.refreshBtn} disabled={isLoadingQuote}>
            <MaterialIcons name="refresh" size={20} color={colors.primary} />
            <Text style={styles.refreshBtnText}>Nova Frase</Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          title="Limpar Tarefas Concluídas"
          icon="cleaning-services"
          variant="outline"
          onPress={handleClearCompleted}
          style={styles.actionSpacing}
        />
        <PrimaryButton title="Sair da Conta" icon="logout" variant="danger" onPress={handleLogout} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
