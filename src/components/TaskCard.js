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
 * Cartão de uma tarefa na lista.
 * O círculo de conclusão usa a cor da prioridade; tocar nele marca a tarefa
 * como concluída e tocar no cartão abre a edição.
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
      style={[styles.card, task.completed && styles.cardDone]}
      onPress={() => onPress(task)}
      activeOpacity={0.85}
      accessibilityLabel={`Tarefa ${task.title}`}
    >
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={[
          styles.checkbox,
          { borderColor: priority.color },
          task.completed && { backgroundColor: priority.color },
        ]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        accessibilityLabel={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
      >
        {task.completed ? <MaterialIcons name="check" size={18} color={colors.white} /> : null}
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
            <Badge icon="place" label="Local" color={colors.primary} background={colors.primaryLight} />
          ) : null}
          {task.photo ? (
            <Badge icon="photo-camera" label="Foto" color={colors.accent} background={colors.accentLight} />
          ) : null}
        </View>
      </View>

      {task.photo ? <Image source={{ uri: task.photo }} style={styles.thumbnail} /> : null}

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(task)}
        accessibilityLabel="Excluir tarefa"
      >
        <MaterialIcons name="delete-outline" size={19} color={colors.danger} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default memo(TaskCard);
