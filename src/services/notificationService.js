import { LogBox, Platform } from 'react-native';

/**
 * Lembretes de tarefas por notificação local (expo-notifications).
 * Uma notificação é agendada para o horário do prazo da tarefa e cancelada
 * quando a tarefa é concluída, editada ou excluída.
 *
 * Notificações locais não existem no navegador, então na Web todas as
 * funções viram no-op e o restante do app continua funcionando.
 */

export const remindersSupported = Platform.OS !== 'web';

const CHANNEL_ID = 'task-reminders';

// O Expo Go avisa que notificações *remotas* não são suportadas; as locais funcionam normalmente.
LogBox.ignoreLogs(['expo-notifications']);

const Notifications = remindersSupported ? require('expo-notifications') : null;

if (Notifications) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

/** Cria o canal de notificações exigido pelo Android 8+. */
const ensureChannel = async () => {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: 'Lembretes de tarefas',
    importance: Notifications.AndroidImportance.HIGH,
  });
};

/**
 * Verifica se o app pode enviar notificações, sem perguntar ao usuário.
 * @returns {Promise<boolean>}
 */
export const hasReminderPermission = async () => {
  if (!Notifications) return false;
  try {
    return (await Notifications.getPermissionsAsync()).granted;
  } catch (e) {
    return false;
  }
};

/**
 * Pede permissão de notificação (se ainda for possível perguntar).
 * @returns {Promise<boolean>} `true` se a permissão foi concedida.
 */
export const requestReminderPermission = async () => {
  if (!Notifications) return false;
  try {
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) return true;
    if (!current.canAskAgain) return false;
    return (await Notifications.requestPermissionsAsync()).granted;
  } catch (e) {
    console.warn('Erro ao pedir permissão de notificação', e);
    return false;
  }
};

/**
 * Agenda o lembrete de uma tarefa para o horário do prazo.
 * @param {object} task Tarefa com `dueDate` (ISO) e `title`.
 * @returns {Promise<string | null>} ID da notificação ou `null` se não agendou.
 */
export const scheduleTaskReminder = async (task) => {
  if (!Notifications || !task.dueDate || task.completed) return null;

  const date = new Date(task.dueDate);
  if (date.getTime() <= Date.now()) return null;

  try {
    if (!(await requestReminderPermission())) return null;
    await ensureChannel();
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Prazo da tarefa',
        body: task.title,
        data: { taskId: task.id },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
        channelId: CHANNEL_ID,
      },
    });
  } catch (e) {
    console.warn('Erro ao agendar lembrete', e);
    return null;
  }
};

/**
 * Cancela um lembrete agendado.
 * @param {string | null} notificationId ID retornado por `scheduleTaskReminder`.
 */
export const cancelTaskReminder = async (notificationId) => {
  if (!Notifications || !notificationId) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (e) {
    console.warn('Erro ao cancelar lembrete', e);
  }
};
