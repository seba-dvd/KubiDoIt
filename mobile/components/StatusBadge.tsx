import { STATUS_COLORS, STATUS_LABELS, type TaskStatus } from '@kubidoit/shared';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <View style={[styles.badge, { backgroundColor: STATUS_COLORS[status] }]}>
      <Text variant="labelMedium" style={styles.label}>
        {STATUS_LABELS[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 999,
  },
  label: {
    color: '#ffffff',
  },
});
