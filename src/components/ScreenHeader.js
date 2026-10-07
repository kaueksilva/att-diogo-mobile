import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/theme';
import { screenHeaderStyles as styles } from '../styles/ComponentStyles';

/**
 * Cabeçalho das telas internas, com botão de voltar e uma ação opcional
 * à direita. Respeita a área segura (notch / barra de status).
 *
 * @param {object} props
 * @param {string} props.title Título da tela.
 * @param {() => void} [props.onBack] Ação do botão voltar.
 * @param {React.ReactNode} [props.right] Elemento exibido à direita.
 */
const ScreenHeader = ({ title, onBack, right }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
      <View style={styles.side}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.side} accessibilityLabel="Voltar">
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <View style={styles.side}>{right}</View>
    </View>
  );
};

export default ScreenHeader;
