import { useRef, useState, type KeyboardEvent } from 'react';
import { Link, NavLink, Outlet } from 'react-router';

export function AppLayout() {
  // On phones the navigation collapses behind the menu button (`.nav-toggle` in index.css).
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setMenuOpen(false);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  }

  return (
    <>
      <header className="app-header">
        <div className="app-header__inner" onKeyDown={handleKeyDown}>
          <Link to="/tasks" className="brand" onClick={closeMenu}>
            KubiDoIt
          </Link>
          <span className="pill" title="Datele sunt locale până la conectarea Supabase (R5)">
            Mod demo
          </span>
          <button
            ref={menuButtonRef}
            type="button"
            className="nav-toggle"
            aria-label="Meniu"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <nav
            id="main-nav"
            className={menuOpen ? 'nav nav--open' : 'nav'}
            aria-label="Navigare principală"
          >
            <NavLink to="/tasks" onClick={closeMenu}>
              Activități
            </NavLink>
            <NavLink to="/stats" onClick={closeMenu}>
              Statistici
            </NavLink>
            <NavLink to="/login" onClick={closeMenu}>
              Cont
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
