import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRIORITIES } from '../theme/theme';
import { deletePhoto } from './fileService';
import { scheduleTaskReminder, cancelTaskReminder } from './notificationService';

/**
 * Repositório de tarefas (CRUD) com persistência local via AsyncStorage.
 * As tarefas de cada usuário ficam em uma chave própria, então o app
 * funciona 100% offline. Cada operação de escrita retorna a lista
 * atualizada para que a tela possa apenas substituir seu estado.
 * O serviço também mantém o lembrete (notificação local) de cada tarefa
 * sincronizado com o prazo e o status dela.
 *
 * Formato de uma tarefa:
 * {
 *   id: string, title: string, description: string,
 *   priority: 'alta' | 'media' | 'baixa', completed: boolean,
 *   dueDate: string | null, notificationId: string | null,
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
  dueDate: null,
  notificationId: null,
  photo: null,
  location: null,
  ...task,
});

const saveTasks = async (email, tasks) => {
  await AsyncStorage.setItem(storageKey(email), JSON.stringify(tasks));
  return tasks;
};

/** Cancela o lembrete antigo e agenda um novo conforme o estado atual da tarefa. */
const syncReminder = async (task) => {
  await cancelTaskReminder(task.notificationId);
  return { ...task, notificationId: await scheduleTaskReminder(task) };
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
  const task = await syncReminder(
    normalizeTask({ ...data, id: Date.now().toString(), createdAt: now, updatedAt: now })
  );
  return saveTasks(email, [task, ...tasks]);
};

/** Aplica alterações a uma tarefa e reagenda o lembrete dela. */
const changeTask = async (email, id, getChanges) => {
  const tasks = await getTasks(email);
  const now = new Date().toISOString();
  const updated = await Promise.all(
    tasks.map((t) => (t.id === id ? syncReminder({ ...t, ...getChanges(t), updatedAt: now }) : t))
  );
  return saveTasks(email, updated);
};

/** Atualiza os campos informados de uma tarefa. */
export const updateTask = (email, id, changes) => changeTask(email, id, () => changes);

/** Alterna o status de concluída/pendente. */
export const toggleTask = (email, id) => changeTask(email, id, (t) => ({ completed: !t.completed }));

/** Exclui uma tarefa (e a foto e o lembrete dela, se houver). */
export const deleteTask = async (email, id) => {
  const tasks = await getTasks(email);
  const task = tasks.find((t) => t.id === id);
  if (task) {
    await cancelTaskReminder(task.notificationId);
    await deletePhoto(task.photo);
  }
  return saveTasks(email, tasks.filter((t) => t.id !== id));
};

/** Exclui todas as tarefas concluídas. */
export const clearCompleted = async (email) => {
  const tasks = await getTasks(email);
  const completed = tasks.filter((t) => t.completed);
  await Promise.all(
    completed.map(async (t) => {
      await cancelTaskReminder(t.notificationId);
      await deletePhoto(t.photo);
    })
  );
  return saveTasks(email, tasks.filter((t) => !t.completed));
};

/** Indica se a tarefa está pendente e com o prazo vencido. */
export const isOverdue = (task, now = Date.now()) =>
  !task.completed && !!task.dueDate && new Date(task.dueDate).getTime() < now;

/**
 * Ordena as tarefas: pendentes primeiro, depois por prioridade, depois pelo
 * prazo mais próximo (tarefas sem prazo por último) e, por fim, das mais
 * recentes para as mais antigas.
 */
export const sortTasks = (tasks) =>
  [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const byPriority = PRIORITIES[a.priority].weight - PRIORITIES[b.priority].weight;
    if (byPriority !== 0) return byPriority;
    if (a.dueDate !== b.dueDate) {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    }
    return (b.createdAt || '').localeCompare(a.createdAt || '');
  });

/** Calcula os números exibidos no painel de progresso. */
export const getStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const now = Date.now();
  return {
    total,
    completed,
    pending: total - completed,
    overdue: tasks.filter((t) => isOverdue(t, now)).length,
    progress: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
};
