import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <main className="page stack">
      <h1>Pagina nu există</h1>
      <Link to="/tasks">Înapoi la activități</Link>
    </main>
  );
}
