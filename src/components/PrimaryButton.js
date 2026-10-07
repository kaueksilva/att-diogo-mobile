import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, gradients } from '../theme/theme';
import { buttonStyles as styles } from '../styles/ComponentStyles';

const TEXT_COLORS = {
  primary: colors.white,
  success: colors.white,
  danger: colors.danger,
  outline: colors.primaryDark,
};

/**
 * Botão padrão do app com suporte a ícone e estado de carregamento.
 * A variante `primary` usa o gradiente da marca. Enquanto `loading` é
 * verdadeiro o botão fica desabilitado, evitando cliques duplos
 * (ex: salvar a mesma tarefa duas vezes).
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
  const isGradient = variant === 'primary';

  const content = loading ? (
    <ActivityIndicator color={textColor} />
  ) : (
    <>
      {icon ? <MaterialIcons name={icon} size={22} color={textColor} style={styles.icon} /> : null}
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </>
  );

  return (
    <TouchableOpacity
      style={[styles.wrapper, isGradient && styles.wrapperPrimary, isDisabled && styles.disabled, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {isGradient ? (
        <LinearGradient colors={gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.base}>
          {content}
        </LinearGradient>
      ) : (
        <View style={[styles.base, styles[variant]]}>{content}</View>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
