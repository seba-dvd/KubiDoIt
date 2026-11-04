import { STATUS_LABELS, STATUS_ORDER, type TaskStatus } from '@kubidoit/shared';

export type StatusFilterValue = 'all' | TaskStatus;

interface StatusFilterProps {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
  counts: Record<TaskStatus, number>;
  total: number;
}

export function StatusFilter({ value, onChange, counts, total }: StatusFilterProps) {
  const options: { value: StatusFilterValue; label: string; count: number }[] = [
    { value: 'all', label: 'Toate', count: total },
    ...STATUS_ORDER.map((status) => ({
      value: status,
      label: STATUS_LABELS[status],
      count: counts[status],
    })),
  ];

  return (
    <div className="filters" role="group" aria-label="Filtrează după status">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="filter"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label} <span className="filter__count">{option.count}</span>
        </button>
      ))}
    </div>
  );
}
