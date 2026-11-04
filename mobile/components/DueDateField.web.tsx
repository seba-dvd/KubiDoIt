import { toDateTimeLocalValue } from '@kubidoit/shared';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface DueDateFieldProps {
  value: Date;
  onChange: (date: Date) => void;
}

/** Web preview (`w` in Expo): the native picker doesn't exist there, so use the browser's. */
export function DueDateField({ value, onChange }: DueDateFieldProps) {
  return (
    <View style={styles.field}>
      <Text variant="labelLarge">Termen</Text>
      <input
        type="datetime-local"
        aria-label="Termen"
        value={Number.isNaN(value.getTime()) ? '' : toDateTimeLocalValue(value)}
        onChange={(event) => onChange(new Date(event.target.value))}
        style={{ fontSize: 16, padding: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 8 },
});
