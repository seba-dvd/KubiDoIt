import {
  completionRate,
  countByStatus,
  STATUS_COLORS,
  STATUS_LABELS,
  STATUS_ORDER,
} from '@kubidoit/shared';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, ProgressBar, Text } from 'react-native-paper';

import { useNow } from '@/hooks/useNow';
import { useTasks } from '@/state/tasks-context';

export default function StatsScreen() {
  const { tasks } = useTasks();
  const now = useNow();
  const counts = countByStatus(tasks, now);
  const rate = completionRate(tasks, now);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {STATUS_ORDER.map((status) => (
          <Card
            key={status}
            mode="outlined"
            style={[styles.stat, { borderTopColor: STATUS_COLORS[status] }]}
          >
            <Card.Content>
              <Text variant="displaySmall">{counts[status]}</Text>
              <Text variant="bodyMedium">{STATUS_LABELS[status]}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
      <Card mode="outlined">
        <Card.Title title="Rata de finalizare" />
        <Card.Content style={styles.rate}>
          {rate === null ? (
            <Text variant="bodyMedium">Nu există activități de finalizat.</Text>
          ) : (
            <>
              <ProgressBar progress={rate} color={STATUS_COLORS.completed} />
              <Text variant="bodyMedium">
                {Math.round(rate * 100)}% din activități sunt finalizate (activitățile anulate nu se
                iau în calcul).
              </Text>
            </>
          )}
        </Card.Content>
      </Card>
      <Text variant="bodyMedium">Total: {tasks.length} activități.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  stat: { flexBasis: '45%', flexGrow: 1, borderTopWidth: 5 },
  rate: { gap: 12 },
});
