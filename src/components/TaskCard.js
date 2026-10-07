import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, PRIORITIES } from '../theme/theme';
import { taskCardStyles as styles } from '../styles/ComponentStyles';

const Badge = ({ icon, label, color, background }) => (
  <View style={[styles.badge, { backgroundColor: background }]}>
    <MaterialIcons name={icon} size={13} color={color} />
    <Text style={[styles.badgeText, { color }]}>{label}</Text>
  </View>
);

/**
 * Card de uma tarefa na lista.
 * Toque no círculo marca como concluída; toque no card abre a edição.
 * Envolvido em `memo` para não re-renderizar itens que não mudaram.
 *
 * @param {object} props
 * @param {object} props.task Tarefa exibida.
 * @param {(task: object) => void} props.onPress Abre a tarefa.
 * @param {(id: string) => void} props.onToggle Alterna concluída/pendente.
 * @param {(task: object) => void} props.onDelete Exclui a tarefa.
 */
const TaskCard = ({ task, onPress, onToggle, onDelete }) => {
  const priority = PRIORITIES[task.priority];

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: priority.color }, task.completed && styles.cardDone]}
      onPress={() => onPress(task)}
      activeOpacity={0.85}
      accessibilityLabel={`Tarefa ${task.title}`}
    >
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={styles.checkbox}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        accessibilityLabel={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
      >
        <MaterialIcons
          name={task.completed ? 'check-circle' : 'radio-button-unchecked'}
          size={28}
          color={task.completed ? colors.success : colors.textMuted}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.titleDone]} numberOfLines={1}>
          {task.title}
        </Text>
        {task.description ? (
          <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
        ) : null}

        <View style={styles.badges}>
          <Badge icon="flag" label={priority.label} color={priority.color} background={priority.background} />
          {task.location ? (
            <Badge icon="place" label="Local" color={colors.successDark} background={colors.successLight} />
          ) : null}
          {task.photo ? (
            <Badge icon="photo-camera" label="Foto" color={colors.primary} background={colors.primaryLight} />
          ) : null}
        </View>
      </View>

      {task.photo ? <Image source={{ uri: task.photo }} style={styles.thumbnail} /> : null}

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(task)}
        accessibilityLabel="Excluir tarefa"
      >
        <MaterialIcons name="delete-outline" size={20} color={colors.dangerDark} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default memo(TaskCard);
