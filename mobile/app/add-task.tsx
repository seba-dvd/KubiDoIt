import {
  TITLE_MAX_LENGTH,
  tomorrowAtNoon,
  validateNewTask,
  type NewTaskErrors,
} from '@kubidoit/shared';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import { DueDateField } from '@/components/DueDateField';
import { useTasks } from '@/state/tasks-context';

export default function AddTaskScreen() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [due, setDue] = useState(() => tomorrowAtNoon());
  const [errors, setErrors] = useState<NewTaskErrors>({});

  function save() {
    const result = validateNewTask({
      title,
      due_at: Number.isNaN(due.getTime()) ? '' : due.toISOString(),
    });
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    addTask(result.value);
    router.back();
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <TextInput
        label="Titlu"
        mode="outlined"
        value={title}
        onChangeText={setTitle}
        maxLength={TITLE_MAX_LENGTH}
        error={Boolean(errors.title)}
        returnKeyType="done"
        onSubmitEditing={save}
        autoFocus
      />
      <HelperText type="error" visible={Boolean(errors.title)}>
        {errors.title}
      </HelperText>
      <DueDateField value={due} onChange={setDue} />
      <HelperText type="error" visible={Boolean(errors.due_at)}>
        {errors.due_at}
      </HelperText>
      <Button mode="contained" icon="plus" onPress={save}>
        Adaugă
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 4 },
});
