import { Platform } from 'react-native';

/**
 * Serviço de armazenamento de fotos (expo-file-system).
 * A câmera/galeria devolve uma imagem em uma pasta temporária, que o sistema
 * pode apagar a qualquer momento. Por isso a foto é copiada para a pasta de
 * documentos do app, e a tarefa guarda o caminho dessa cópia.
 *
 * Na Web não há sistema de arquivos, então a URI original é mantida.
 */

const PHOTO_DIR = 'task-photos';

const FileSystem = Platform.OS === 'web' ? null : require('expo-file-system');

const getPhotoDir = () => new FileSystem.Directory(FileSystem.Paths.document, PHOTO_DIR);

/** Extrai a extensão do arquivo da URI (padrão: jpg). */
const getExtension = (uri) => {
  const match = /\.(\w{3,4})(?:\?.*)?$/.exec(uri);
  return match ? match[1].toLowerCase() : 'jpg';
};

/**
 * Copia a foto para a pasta permanente do app.
 * Em caso de erro, mantém a URI original para não perder o anexo.
 * @param {string} uri URI da imagem.
 * @returns {Promise<string>} URI que será salva na tarefa.
 */
export const persistPhoto = async (uri) => {
  if (!FileSystem) return uri;
  try {
    const dir = getPhotoDir();
    if (uri.startsWith(dir.uri)) return uri; // já está salva
    if (!dir.exists) dir.create();

    const destination = new FileSystem.File(dir, `${Date.now()}.${getExtension(uri)}`);
    new FileSystem.File(uri).copy(destination);
    return destination.uri;
  } catch (e) {
    console.warn('Erro ao salvar foto, mantendo URI original', e);
    return uri;
  }
};

/**
 * Apaga uma foto salva pelo app. URIs de fora da pasta do app são ignoradas.
 * @param {string | null} uri URI da imagem.
 */
export const deletePhoto = async (uri) => {
  if (!FileSystem || !uri) return;
  try {
    if (!uri.startsWith(getPhotoDir().uri)) return;
    const file = new FileSystem.File(uri);
    if (file.exists) file.delete();
  } catch (e) {
    console.warn('Erro ao apagar foto', e);
  }
};
