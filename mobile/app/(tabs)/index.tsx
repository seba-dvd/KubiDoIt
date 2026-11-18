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
import { Button, Chip, FAB, Icon, Text, useTheme } from 'react-native-paper';

import { TaskCard } from '@/components/TaskCard';
import { useNow } from '@/hooks/useNow';
import { useTasks } from '@/state/tasks-context';

type Filter = 'all' | TaskStatus;

export default function TasksScreen() {
  const { tasks } = useTasks();
  const now = useNow();
  const theme = useTheme();
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

  const isEmptyDatabase = tasks.length === 0;

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
            showSelectedCheck={true}
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
        contentContainerStyle={[styles.list, visible.length === 0 && styles.emptyList]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon
              source={isEmptyDatabase ? 'clipboard-check-outline' : 'filter-off-outline'}
              size={56}
              color={theme.colors.outline}
            />
            <Text variant="titleMedium" style={styles.emptyTitle}>
              {isEmptyDatabase
                ? 'Nu ai nicio activitate încă'
                : 'Nicio activitate în această categorie'}
            </Text>
            <Text
              variant="bodyMedium"
              style={[styles.emptySubtitle, { color: theme.colors.onSurfaceVariant }]}
            >
              {isEmptyDatabase
                ? 'Adaugă prima ta activitate pentru a începe să-ți organizezi ziua.'
                : 'Încearcă un alt filtru sau revino la toate activitățile.'}
            </Text>
            {isEmptyDatabase ? (
              <Button
                mode="contained"
                icon="plus"
                onPress={() => router.push('/add-task' as never)}
              >
                Adaugă activitate
              </Button>
            ) : (
              <Button mode="outlined" onPress={() => setFilter('all')}>
                Arată toate
              </Button>
            )}
          </View>
        }
      />
      <FAB icon="plus" style={styles.fab} onPress={() => router.push('/add-task' as never)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filterBar: { flexGrow: 0 },
  filters: { gap: 8, paddingHorizontal: 16, paddingVertical: 12 },
  list: { gap: 12, paddingHorizontal: 16, paddingBottom: 96 },
  emptyList: { flexGrow: 1, justifyContent: 'center' },
  emptyContainer: { alignItems: 'center', paddingHorizontal: 24, gap: 10 },
  emptyTitle: { textAlign: 'center', marginTop: 8 },
  emptySubtitle: { textAlign: 'center', marginBottom: 8 },
  fab: { position: 'absolute', right: 16, bottom: 16 },
});
