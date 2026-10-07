import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRIORITIES } from '../theme/theme';
import { deletePhoto } from './fileService';

/**
 * Repositório de tarefas (CRUD) com persistência local via AsyncStorage.
 * As tarefas de cada usuário ficam em uma chave própria, então o app
 * funciona 100% offline. Cada operação de escrita retorna a lista
 * atualizada para que a tela possa apenas substituir seu estado.
 *
 * Formato de uma tarefa:
 * {
 *   id: string, title: string, description: string,
 *   priority: 'alta' | 'media' | 'baixa', completed: boolean,
 *   photo: string | null, location: { latitude, longitude, address } | null,
 *   createdAt: string, updatedAt: string
 * }
 */

const storageKey = (email) => `tasks_${email}`;

/** Garante valores padrão em tarefas criadas por versões antigas do app. */
const normalizeTask = (task) => ({
  description: '',
  priority: 'media',
  completed: false,
  photo: null,
  location: null,
  ...task,
});

const saveTasks = async (email, tasks) => {
  await AsyncStorage.setItem(storageKey(email), JSON.stringify(tasks));
  return tasks;
};

/** Lê todas as tarefas do usuário. */
export const getTasks = async (email) => {
  const raw = await AsyncStorage.getItem(storageKey(email));
  return raw ? JSON.parse(raw).map(normalizeTask) : [];
};

/** Cria uma nova tarefa e retorna a lista atualizada. */
export const createTask = async (email, data) => {
  const tasks = await getTasks(email);
  const now = new Date().toISOString();
  const task = normalizeTask({ ...data, id: Date.now().toString(), createdAt: now, updatedAt: now });
  return saveTasks(email, [task, ...tasks]);
};

/** Atualiza os campos informados de uma tarefa. */
export const updateTask = async (email, id, changes) => {
  const tasks = await getTasks(email);
  const now = new Date().toISOString();
  const updated = tasks.map((t) => (t.id === id ? { ...t, ...changes, updatedAt: now } : t));
  return saveTasks(email, updated);
};

/** Alterna o status de concluída/pendente. */
export const toggleTask = async (email, id) => {
  const tasks = await getTasks(email);
  const now = new Date().toISOString();
  const updated = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed, updatedAt: now } : t
  );
  return saveTasks(email, updated);
};

/** Exclui uma tarefa (e a foto anexada, se houver). */
export const deleteTask = async (email, id) => {
  const tasks = await getTasks(email);
  const task = tasks.find((t) => t.id === id);
  if (task?.photo) await deletePhoto(task.photo);
  return saveTasks(email, tasks.filter((t) => t.id !== id));
};

/** Exclui todas as tarefas concluídas. */
export const clearCompleted = async (email) => {
  const tasks = await getTasks(email);
  const completed = tasks.filter((t) => t.completed);
  await Promise.all(completed.map((t) => deletePhoto(t.photo)));
  return saveTasks(email, tasks.filter((t) => !t.completed));
};

/**
 * Ordena as tarefas: pendentes primeiro, depois por prioridade e,
 * por fim, das mais recentes para as mais antigas.
 */
export const sortTasks = (tasks) =>
  [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const byPriority = PRIORITIES[a.priority].weight - PRIORITIES[b.priority].weight;
    if (byPriority !== 0) return byPriority;
    return (b.createdAt || '').localeCompare(a.createdAt || '');
  });

/** Calcula os números exibidos no painel de progresso. */
export const getStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  return {
    total,
    completed,
    pending: total - completed,
    progress: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
};
