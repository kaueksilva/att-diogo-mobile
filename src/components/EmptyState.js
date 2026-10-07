import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, gradients } from '../theme/theme';
import { emptyStateStyles as styles } from '../styles/ComponentStyles';

/**
 * Mensagem exibida quando uma lista está vazia.
 * @param {{ icon: string, title: string, subtitle?: string }} props
 */
const EmptyState = ({ icon, title, subtitle }) => (
  <View style={styles.container}>
    <LinearGradient colors={gradients.soft} style={styles.iconCircle}>
      <MaterialIcons name={icon} size={44} color={colors.primary} />
    </LinearGradient>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

export default EmptyState;
