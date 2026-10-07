import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/theme';
import { emptyStateStyles as styles } from '../styles/ComponentStyles';

/**
 * Mensagem exibida quando uma lista está vazia.
 * @param {{ icon: string, title: string, subtitle?: string }} props
 */
const EmptyState = ({ icon, title, subtitle }) => (
  <View style={styles.container}>
    <MaterialIcons name={icon} size={44} color={colors.textMuted} style={styles.icon} />
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

export default EmptyState;
