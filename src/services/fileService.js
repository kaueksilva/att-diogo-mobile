import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

/**
 * Serviço de armazenamento de arquivos.
 * As fotos retornadas pela câmera/galeria ficam em uma pasta de cache que o
 * sistema pode limpar a qualquer momento. Por isso copiamos a imagem para o
 * diretório de documentos do app, garantindo que ela continue disponível
 * (inclusive offline). Na web o FileSystem não existe e a URI é mantida.
 */

const PHOTO_DIR = FileSystem.documentDirectory
  ? `${FileSystem.documentDirectory}task_photos/`
  : null;

const canPersist = Platform.OS !== 'web' && !!PHOTO_DIR;

/**
 * Copia uma foto para o armazenamento permanente do app.
 * @param {string} uri URI temporária da imagem.
 * @returns {Promise<string>} URI definitiva da imagem.
 */
export const persistPhoto = async (uri) => {
  if (!canPersist || uri.startsWith(PHOTO_DIR)) return uri;

  const dirInfo = await FileSystem.getInfoAsync(PHOTO_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(PHOTO_DIR, { intermediates: true });
  }

  const destination = `${PHOTO_DIR}${Date.now()}.jpg`;
  await FileSystem.copyAsync({ from: uri, to: destination });
  return destination;
};

/**
 * Remove uma foto salva pelo app. Falhas são ignoradas, pois o arquivo
 * pode já ter sido apagado.
 * @param {string | null} uri URI da imagem.
 */
export const deletePhoto = async (uri) => {
  if (!canPersist || !uri || !uri.startsWith(PHOTO_DIR)) return;
  try {
    await FileSystem.deleteAsync(uri, { idempotent: true });
  } catch (e) {
    console.warn('Não foi possível remover a foto', e);
  }
};
