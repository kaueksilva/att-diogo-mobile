import React, { useState, forwardRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/theme';
import { formInputStyles as styles } from '../styles/ComponentStyles';

/**
 * Campo de formulário padrão do app, com rótulo, ícone, destaque de foco,
 * mensagem de erro e botão de mostrar/ocultar senha.
 *
 * @param {object} props
 * @param {string} [props.label] Rótulo exibido acima do campo.
 * @param {string} [props.icon] Nome do ícone (MaterialIcons).
 * @param {string} [props.error] Mensagem de erro de validação.
 * @param {boolean} [props.secureTextEntry] Campo de senha.
 * Demais props são repassadas ao TextInput.
 */
const FormInput = forwardRef(({ label, icon, error, secureTextEntry, multiline, style, onFocus, onBlur, ...rest }, ref) => {
  const [isHidden, setIsHidden] = useState(!!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const iconColor = error ? colors.danger : isFocused ? colors.primary : colors.textMuted;

  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputRow,
          multiline && styles.inputRowMultiline,
          isFocused && styles.inputRowFocused,
          error && styles.inputRowError,
        ]}
      >
        {icon ? (
          <MaterialIcons
            name={icon}
            size={20}
            color={iconColor}
            style={[styles.icon, multiline && styles.iconMultiline]}
          />
        ) : null}

        <TextInput
          {...rest}
          ref={ref}
          multiline={multiline}
          style={[styles.input, multiline && styles.multiline]}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={isHidden}
          accessibilityLabel={label || rest.placeholder}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setIsHidden((hidden) => !hidden)}
            style={styles.toggle}
            accessibilityLabel={isHidden ? 'Mostrar senha' : 'Ocultar senha'}
          >
            <MaterialIcons name={isHidden ? 'visibility' : 'visibility-off'} size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
