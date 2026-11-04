import {
  computeStatus,
  countByStatus,
  sortTasksForDisplay,
  STATUS_LABELS,
  STATUS_ORDER,
  type TaskStatus,
} from '@kubidoit/shared';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Chip, FAB, Text } from 'react-native-paper';

import { TaskCard } from '@/components/TaskCard';
import { useNow } from '@/hooks/useNow';
import { useTasks } from '@/state/tasks-context';

type Filter = 'all' | TaskStatus;

export default function TasksScreen() {
  const { tasks } = useTasks();
  const now = useNow();
  const [filter, setFilter] = useState<Filter>('all');

  const counts = countByStatus(tasks, now);
  const options: { value: Filter; label: string }[] = [
    { value: 'all', label: `Toate (${tasks.length})` },
    ...STATUS_ORDER.map((status) => ({
      value: status,
      label: `${STATUS_LABELS[status]} (${counts[status]})`,
    })),
  ];
  const visible = sortTasksForDisplay(tasks, now).filter(
    (task) => filter === 'all' || computeStatus(task, now) === filter,
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={styles.filters}
      >
        {options.map((option) => (
          <Chip
            key={option.value}
            selected={filter === option.value}
            showSelectedCheck={false}
            mode={filter === option.value ? 'flat' : 'outlined'}
            onPress={() => setFilter(option.value)}
          >
            {option.label}
          </Chip>
        ))}
      </ScrollView>
      <FlatList
        data={visible}
        extraData={now}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => <TaskCard task={item} status={computeStatus(item, now)} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text variant="bodyLarge" style={styles.empty}>
            Nicio activitate aici.
          </Text>
        }
      />
      <FAB icon="plus" label="Adaugă" style={styles.fab} onPress={() => router.push('/add-task' as never)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filterBar: { flexGrow: 0 },
  filters: { gap: 8, paddingHorizontal: 16, paddingVertical: 12 },
  list: { gap: 12, paddingHorizontal: 16, paddingBottom: 96 },
  empty: { textAlign: 'center', marginTop: 32 },
  fab: { position: 'absolute', right: 16, bottom: 16 },
});
