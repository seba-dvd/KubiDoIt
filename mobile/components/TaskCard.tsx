import { formatDue, STATUS_COLORS, type Task, type TaskStatus } from '@kubidoit/shared';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';

import { useTasks } from '@/state/tasks-context';

import { StatusBadge } from './StatusBadge';

export function TaskCard({ task, status }: { task: Task; status: TaskStatus }) {
  const { removeTask, setTaskStatus } = useTasks();
  const theme = useTheme();
  const isClosed = status === 'completed' || status === 'canceled';

  return (
    <Card mode="outlined" style={[styles.card, { borderLeftColor: STATUS_COLORS[status] }]}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text
            variant="titleMedium"
            style={[
              styles.title,
              isClosed && { color: theme.colors.outline },
              isClosed && styles.closed,
            ]}
          >
            {task.title}
          </Text>
          <StatusBadge status={status} />
        </View>
        <Text variant="bodyMedium">Termen: {formatDue(task.due_at)}</Text>
      </Card.Content>
      <Card.Actions>
        {task.manual_status === null ? (
          <>
            <Button mode="text" onPress={() => setTaskStatus(task.id, 'completed')}>
              Complet
            </Button>
            <Button mode="text" onPress={() => setTaskStatus(task.id, 'canceled')}>
              Anulează
            </Button>
          </>
        ) : (
          <Button mode="text" onPress={() => setTaskStatus(task.id, null)}>
            Reactivează
          </Button>
        )}
        <Button mode="text" textColor={theme.colors.error} onPress={() => removeTask(task.id)}>
          Șterge
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { borderLeftWidth: 5 },
  content: { gap: 6 },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  title: { flex: 1 },
  closed: { textDecorationLine: 'line-through' },
});
