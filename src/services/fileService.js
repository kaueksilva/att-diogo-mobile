/**
 * Serviço de armazenamento de fotos.
 * A URI retornada pela câmera/galeria é gravada junto com a tarefa no
 * AsyncStorage. O expo-file-system não é usado porque não está disponível
 * para todas as plataformas no Expo Snack.
 */

/**
 * Prepara a foto para ser salva junto com a tarefa.
 * @param {string} uri URI da imagem.
 * @returns {Promise<string>} URI que será salva na tarefa.
 */
export const persistPhoto = async (uri) => uri;

/**
 * Remove uma foto da tarefa. Como a imagem não é copiada pelo app,
 * não há arquivo próprio para apagar.
 * @param {string | null} uri URI da imagem.
 */
export const deletePhoto = async (uri) => {};
