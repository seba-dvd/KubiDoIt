import { STATUS_ORDER } from '@kubidoit/shared';

import { StatusBadge } from '../components/StatusBadge';

export function TasksPage() {
  return (
    <section className="page stack">
      <h1>Activități</h1>
      <p className="muted">Aici vor apărea activitățile, cu cele 4 statusuri:</p>
      <ul className="legend" aria-label="Statusuri">
        {STATUS_ORDER.map((status) => (
          <li key={status}>
            <StatusBadge status={status} />
          </li>
        ))}
      </ul>
    </section>
  );
}
