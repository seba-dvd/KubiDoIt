import { formatDue } from '@kubidoit/shared';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface DueDateFieldProps {
  value: Date;
  onChange: (date: Date) => void;
}

/** Deadline picker: native on iOS and Android (see DueDateField.web.tsx for the web preview). */
export function DueDateField({ value, onChange }: DueDateFieldProps) {
  if (Platform.OS === 'ios') {
    return (
      <View style={styles.row}>
        <Text variant="bodyLarge">Termen</Text>
        <DateTimePicker
          value={value}
          mode="datetime"
          display="compact"
         onValueChange={(_event: any, date?: Date) => { if (date) onChange(date) }}
        />
      </View>
    );
  }

  // Android shows the date and the time in two separate dialogs.
  const open = (mode: 'date' | 'time') =>
    DateTimePickerAndroid.open({
      value,
      mode,
      is24Hour: true,
     onValueChange: (_event: any, picked?: Date) => { if (picked) onChange(merge(value, picked, mode)) },
    });

  return (
    <View style={styles.field}>
      <Text variant="labelLarge">Termen</Text>
      <Text variant="bodyLarge">{formatDue(value.toISOString())}</Text>
      <View style={styles.row}>
        <Button mode="outlined" icon="calendar" onPress={() => open('date')}>
          Data
        </Button>
        <Button mode="outlined" icon="clock-outline" onPress={() => open('time')}>
          Ora
        </Button>
      </View>
    </View>
  );
}

/** Keeps the time when the date changes, and the date when the time changes. */
function merge(current: Date, picked: Date, mode: 'date' | 'time'): Date {
  const result = new Date(current);
  if (mode === 'date') {
    result.setFullYear(picked.getFullYear(), picked.getMonth(), picked.getDate());
  } else {
    result.setHours(picked.getHours(), picked.getMinutes(), 0, 0);
  }
  return result;
}

const styles = StyleSheet.create({
  field: { gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
