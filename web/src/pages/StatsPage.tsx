import {
  completionRate,
  countByStatus,
  STATUS_COLORS,
  STATUS_LABELS,
  STATUS_ORDER,
} from '@kubidoit/shared';

import { useNow } from '../hooks/useNow';
import { useTasks } from '../state/tasks-context';

export function StatsPage() {
  const { tasks } = useTasks();
  const now = useNow();
  const counts = countByStatus(tasks, now);
  const rate = completionRate(tasks, now);
  const percent = rate === null ? null : Math.round(rate * 100);

  return (
    <section className="page stack">
      <h1>Statistici</h1>
      <ul className="stats-grid">
        {STATUS_ORDER.map((status) => (
          <li key={status} className="card stat" style={{ borderTopColor: STATUS_COLORS[status] }}>
            <span className="stat__value">{counts[status]}</span>
            <span className="stat__label">{STATUS_LABELS[status]}</span>
          </li>
        ))}
      </ul>
      <div className="card stack">
        <h2>Rata de finalizare</h2>
        {percent === null ? (
          <p className="muted">Nu există activități de finalizat.</p>
        ) : (
          <>
            <div
              className="progress"
              role="progressbar"
              aria-label="Rata de finalizare"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
            >
              <div className="progress__bar" style={{ width: `${percent}%` }} />
            </div>
            <p>
              {percent}% din activități sunt finalizate (activitățile anulate nu se iau în calcul).
            </p>
          </>
        )}
      </div>
      <p className="muted">Total: {tasks.length} activități.</p>
    </section>
  );
}
