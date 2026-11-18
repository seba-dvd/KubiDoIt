import {
  TITLE_MAX_LENGTH,
  toDateTimeLocalValue,
  tomorrowAtNoon,
  validateNewTask,
  type NewTaskErrors,
} from '@kubidoit/shared';
import { useRef, useState, type FormEvent, type RefObject } from 'react';

import { useTasks } from '../state/tasks-context';

interface TaskFormProps {
  /** The title field, so the page can move the focus to it (e.g. from the empty state). */
  titleInputRef: RefObject<HTMLInputElement | null>;
}

export function TaskForm({ titleInputRef }: TaskFormProps) {
  const { addTask } = useTasks();
  const dueInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [due, setDue] = useState(() => toDateTimeLocalValue(tomorrowAtNoon()));
  const [errors, setErrors] = useState<NewTaskErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateNewTask({ title, due_at: due });
    if (!result.ok) {
      setErrors(result.errors);
      // The first field with an error gets the focus, so its message is read right away.
      (result.errors.title ? titleInputRef : dueInputRef).current?.focus();
      return;
    }
    addTask(result.value);
    setTitle('');
    setDue(toDateTimeLocalValue(tomorrowAtNoon()));
    setErrors({});
  }

  return (
    <form className="card task-form" onSubmit={handleSubmit} noValidate>
      <div className="field task-form__title">
        <label htmlFor="task-title">Activitate nouă</label>
        <input
          ref={titleInputRef}
          id="task-title"
          className="input"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ce ai de făcut?"
          maxLength={TITLE_MAX_LENGTH}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'task-title-error' : undefined}
        />
        {errors.title && (
          <span id="task-title-error" className="field-error">
            {errors.title}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="task-due">Termen</label>
        <input
          ref={dueInputRef}
          id="task-due"
          className="input"
          type="datetime-local"
          required
          value={due}
          onChange={(event) => setDue(event.target.value)}
          aria-invalid={Boolean(errors.due_at)}
          aria-describedby={errors.due_at ? 'task-due-error' : undefined}
        />
        {errors.due_at && (
          <span id="task-due-error" className="field-error">
            {errors.due_at}
          </span>
        )}
      </div>
      <button type="submit" className="btn btn--primary task-form__submit">
        Adaugă
      </button>
    </form>
  );
}
