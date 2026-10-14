import { STATUS_ORDER } from '@kubidoit/shared';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { StatusBadge } from '@/components/StatusBadge';

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">Aici vor apărea activitățile, cu cele 4 statusuri:</Text>
      <View style={styles.legend}>
        {STATUS_ORDER.map((status) => (
          <StatusBadge key={status} status={status} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
