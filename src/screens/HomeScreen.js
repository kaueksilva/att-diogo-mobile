import React, { useState, useContext, useCallback, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { getTasks, toggleTask, deleteTask, sortTasks, getStats } from '../services/taskService';
import { showAlert, confirmAction } from '../utils/alert';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { colors } from '../theme/theme';
import { styles } from '../styles/HomeStyles';

const FILTERS = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'done', label: 'Concluídas' },
];

/** Saudação de acordo com o horário do dispositivo. */
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
};

/**
 * Tela principal: lista as tarefas do usuário com busca, filtros por status,
 * painel de progresso e ações rápidas (concluir / excluir).
 */
const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      setTasks(await getTasks(user.email));
    } catch (e) {
      console.warn('Erro ao carregar tarefas', e);
      showAlert('Erro', 'Não foi possível carregar suas tarefas.');
    } finally {
      setIsLoading(false);
    }
  }, [user.email]);

  // Recarrega sempre que a tela volta ao foco (ex: após salvar uma tarefa).
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTasks();
    setIsRefreshing(false);
  };

  const handleToggle = useCallback(async (id) => {
    // Atualização otimista: a interface responde na hora e o disco é gravado em seguida.
    setTasks((current) => current.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    try {
      setTasks(await toggleTask(user.email, id));
    } catch (e) {
      showAlert('Erro', 'Não foi possível atualizar a tarefa.');
      loadTasks();
    }
  }, [user.email, loadTasks]);

  const handleDelete = useCallback(async (task) => {
    const confirmed = await confirmAction('Excluir tarefa', `Deseja excluir "${task.title}"?`, 'Excluir');
    if (!confirmed) return;
    try {
      setTasks(await deleteTask(user.email, task.id));
    } catch (e) {
      showAlert('Erro', 'Não foi possível excluir a tarefa.');
    }
  }, [user.email]);

  const handleOpen = useCallback((task) => {
    navigation.navigate('TaskDetail', { task });
  }, [navigation]);

  const stats = useMemo(() => getStats(tasks), [tasks]);

  const filterCounts = { all: stats.total, pending: stats.pending, done: stats.completed };

  const visibleTasks = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = tasks.filter((task) => {
      if (filter === 'pending' && task.completed) return false;
      if (filter === 'done' && !task.completed) return false;
      if (!term) return true;
      return task.title.toLowerCase().includes(term) || task.description.toLowerCase().includes(term);
    });
    return sortTasks(filtered);
  }, [tasks, filter, search]);

  const firstName = user?.name?.split(' ')[0] ?? '';
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  const renderEmpty = () => {
    if (tasks.length === 0) {
      return (
        <EmptyState
          icon="playlist-add"
          title="Nenhuma tarefa ainda"
          subtitle="Toque em “Nova tarefa” para cadastrar a primeira."
        />
      );
    }
    return (
      <EmptyState
        icon="search-off"
        title="Nada por aqui"
        subtitle="Nenhuma tarefa corresponde à busca ou ao filtro selecionado."
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={[styles.header, { paddingTop: insets.top + 14 }]}>
        <View style={styles.headerInner}>
          <View style={styles.headerTop}>
            <View style={styles.greetingContainer}>
              <Text style={styles.date}>{today}</Text>
              <Text style={styles.greeting} numberOfLines={1}>{getGreeting()}, {firstName}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} accessibilityLabel="Abrir perfil">
              <View style={styles.profileBtn}>
                <Text style={styles.profileBtnText}>{firstName.charAt(0).toUpperCase()}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>
                {stats.completed} de {stats.total} tarefas concluídas
              </Text>
              <Text style={styles.progressPercent}>{stats.progress}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${stats.progress}%` }]} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.toolbar}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={22} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar tarefas..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')} accessibilityLabel="Limpar busca">
              <MaterialIcons name="close" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.filters}>
          {FILTERS.map(({ key, label }) => {
            const isActive = filter === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setFilter(key)}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
              >
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{label}</Text>
                <Text style={[styles.filterCount, isActive && styles.filterCountActive]}>
                  {filterCounts[key]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard task={item} onPress={handleOpen} onToggle={handleToggle} onDelete={handleDelete} />
          )}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.listContainer}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={[colors.primary]} />
          }
        />
      )}

      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 20 }]}
        onPress={() => navigation.navigate('TaskDetail')}
        activeOpacity={0.8}
        accessibilityLabel="Nova tarefa"
      >
        <MaterialIcons name="add" size={22} color={colors.white} />
        <Text style={styles.fabText}>Nova tarefa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
