import { Link, NavLink, Outlet } from 'react-router';

export function AppLayout() {
  return (
    <>
      <header className="app-header">
        <div className="app-header__inner">
          <Link to="/tasks" className="brand">
            KubiDoIt
          </Link>
          <span className="pill" title="Datele sunt locale până la conectarea Supabase (R5)">
            Mod demo
          </span>
          <nav className="nav" aria-label="Navigare principală">
            <NavLink to="/tasks">Activități</NavLink>
            <NavLink to="/stats">Statistici</NavLink>
            <NavLink to="/login">Cont</NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
