import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, PRIORITIES } from '../theme/theme';
import { taskCardStyles as styles } from '../styles/ComponentStyles';

const MetaItem = ({ icon, label }) => (
  <View style={styles.metaItem}>
    <MaterialIcons name={icon} size={13} color={colors.textMuted} />
    <Text style={styles.metaText}>{label}</Text>
  </View>
);

/**
 * Linha de uma tarefa na lista.
 * Toque no círculo marca como concluída; toque na linha abre a edição.
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
      style={[styles.row, task.completed && styles.rowDone]}
      onPress={() => onPress(task)}
      activeOpacity={0.6}
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
          size={24}
          color={task.completed ? colors.accent : colors.textMuted}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.titleDone]} numberOfLines={1}>
          {task.title}
        </Text>
        {task.description ? (
          <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
        ) : null}

        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <View style={[styles.metaDot, { backgroundColor: priority.color }]} />
            <Text style={[styles.metaText, styles.metaTextAfterDot]}>{priority.label}</Text>
          </View>
          {task.location ? <MetaItem icon="place" label="Local" /> : null}
          {task.photo ? <MetaItem icon="photo-camera" label="Foto" /> : null}
        </View>
      </View>

      {task.photo ? <Image source={{ uri: task.photo }} style={styles.thumbnail} /> : null}

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(task)}
        accessibilityLabel="Excluir tarefa"
      >
        <MaterialIcons name="delete-outline" size={20} color={colors.textMuted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default memo(TaskCard);
