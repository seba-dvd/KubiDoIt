import { Link } from 'react-router';

import { isSupabaseConfigured } from '../lib/supabase';

export function LoginPage() {
  return (
    <main className="page page--narrow stack">
      <h1>KubiDoIt</h1>
      <form className="card stack" aria-describedby="login-note">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" className="input" type="email" autoComplete="email" disabled />
        </div>
        <div className="field">
          <label htmlFor="password">Parolă</label>
          <input
            id="password"
            className="input"
            type="password"
            autoComplete="current-password"
            disabled
          />
        </div>
        <button type="submit" className="btn btn--primary" disabled>
          Autentificare
        </button>
      </form>
      <p id="login-note" className="muted">
        Autentificarea cu Supabase (R5) nu este încă activă. Până atunci aplicația rulează în modul
        demo, cu date locale.{' '}
        {isSupabaseConfigured ? 'Supabase este configurat.' : 'Supabase nu este configurat (.env).'}
      </p>
      <Link to="/tasks" className="btn">
        Continuă în modul demo
      </Link>
    </main>
  );
}
