/**
 * Formatação de datas para exibição em português.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const formatTime = (date) =>
  date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

/**
 * Formata o prazo de forma amigável: "Hoje, 18:00", "Amanhã, 09:00",
 * "Ontem, 14:30" ou "25/10, 09:00".
 * @param {string} iso Data em formato ISO.
 * @returns {string}
 */
export const formatDueDate = (iso) => {
  const date = new Date(iso);
  const diffDays = Math.round((startOfDay(date) - startOfDay(new Date())) / DAY_MS);
  const labels = { '-1': 'Ontem', 0: 'Hoje', 1: 'Amanhã' };
  const day = labels[diffDays] ?? date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  return `${day}, ${formatTime(date)}`;
};

/**
 * Formata data e hora completas (ex: "15/10/2026, 14:30").
 * @param {string} iso Data em formato ISO.
 * @returns {string}
 */
export const formatDateTime = (iso) =>
  new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
