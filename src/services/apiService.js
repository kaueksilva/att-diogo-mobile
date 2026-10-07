/**
 * Integrações com APIs externas (sem necessidade de chave de acesso):
 * - DummyJSON Quotes: frases motivacionais (https://dummyjson.com/docs/quotes)
 * - Open-Meteo: clima atual na localização da tarefa (https://open-meteo.com)
 *
 * Todas as requisições têm timeout para que o app nunca fique travado
 * esperando a rede, e possuem tratamento de erro/fallback offline.
 */

const REQUEST_TIMEOUT_MS = 8000;

/**
 * `fetch` com timeout e validação do status HTTP.
 * @param {string} url Endereço da requisição.
 * @returns {Promise<any>} JSON da resposta.
 */
const fetchJson = async (url) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
};

/** Frases usadas quando não há internet (requisito de funcionamento offline). */
const OFFLINE_QUOTES = [
  { text: 'A persistência é o caminho do êxito.', author: 'Charles Chaplin' },
  { text: 'O segredo de progredir é começar.', author: 'Mark Twain' },
  { text: 'Feito é melhor que perfeito.', author: 'Sheryl Sandberg' },
  { text: 'Grandes coisas são feitas por uma série de pequenas coisas reunidas.', author: 'Vincent van Gogh' },
  { text: 'A disciplina é a ponte entre metas e realizações.', author: 'Jim Rohn' },
];

/**
 * Busca uma frase aleatória. Sem conexão, retorna uma frase local.
 * @returns {Promise<{ text: string, author: string, offline: boolean }>}
 */
export const getRandomQuote = async () => {
  try {
    const data = await fetchJson('https://dummyjson.com/quotes/random');
    return { text: data.quote, author: data.author, offline: false };
  } catch (e) {
    console.warn('Falha ao buscar frase, usando fallback offline', e);
    const quote = OFFLINE_QUOTES[Math.floor(Math.random() * OFFLINE_QUOTES.length)];
    return { ...quote, offline: true };
  }
};

/** Traduz o código WMO retornado pela Open-Meteo para texto e ícone. */
const describeWeather = (code) => {
  if (code === 0) return { description: 'Céu limpo', icon: 'wb-sunny' };
  if (code <= 3) return { description: 'Parcialmente nublado', icon: 'wb-cloudy' };
  if (code <= 48) return { description: 'Neblina', icon: 'blur-on' };
  if (code <= 57) return { description: 'Garoa', icon: 'grain' };
  if (code <= 67) return { description: 'Chuva', icon: 'umbrella' };
  if (code <= 77) return { description: 'Neve', icon: 'ac-unit' };
  if (code <= 82) return { description: 'Pancadas de chuva', icon: 'umbrella' };
  return { description: 'Tempestade', icon: 'flash-on' };
};

/**
 * Consulta o clima atual em uma coordenada.
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<{ temperature: number, wind: number, description: string, icon: string }>}
 */
export const getWeather = async (latitude, longitude) => {
  const url =
    'https://api.open-meteo.com/v1/forecast' +
    `?latitude=${latitude}&longitude=${longitude}` +
    '&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto';

  const data = await fetchJson(url);
  const { temperature_2m, weather_code, wind_speed_10m } = data.current;

  return {
    temperature: Math.round(temperature_2m),
    wind: Math.round(wind_speed_10m),
    ...describeWeather(weather_code),
  };
};
