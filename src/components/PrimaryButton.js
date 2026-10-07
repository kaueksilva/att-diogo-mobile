import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/theme';
import { buttonStyles as styles } from '../styles/ComponentStyles';

const TEXT_COLORS = {
  primary: colors.white,
  success: colors.white,
  danger: colors.danger,
  outline: colors.primary,
};

/**
 * Botão padrão do app com suporte a ícone e estado de carregamento.
 * Enquanto `loading` é verdadeiro o botão fica desabilitado, evitando
 * cliques duplos (ex: salvar a mesma tarefa duas vezes).
 *
 * @param {object} props
 * @param {string} props.title Texto do botão.
 * @param {() => void} props.onPress Ação ao tocar.
 * @param {string} [props.icon] Nome do ícone (MaterialIcons).
 * @param {boolean} [props.loading] Exibe indicador de carregamento.
 * @param {'primary' | 'success' | 'danger' | 'outline'} [props.variant]
 */
const PrimaryButton = ({ title, onPress, icon, loading = false, disabled = false, variant = 'primary', style }) => {
  const textColor = TEXT_COLORS[variant];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], isDisabled && styles.disabled, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon ? <MaterialIcons name={icon} size={22} color={textColor} style={styles.icon} /> : null}
          <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
