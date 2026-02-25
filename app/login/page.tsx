import Link from 'next/link';

import { LoginForm } from '@/components/login-form';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LoginPage() {
  return (
    <section className="auth-screen stack-lg">
      <Link className="public-back-btn" href="/" aria-label="Volver a la landing">
        ←
      </Link>
      <div className="public-theme-toggle"><ThemeToggle /></div>
      <div className="auth-bg-shade" aria-hidden="true" />
      <div className="auth-center-wrap">
        <div className="panel auth-intro-panel">
          <h2>Ingresar</h2>
          <p className="muted">Iniciá sesión con tu email y contraseña para cargar pronósticos y editar tu perfil.</p>
          <div className="cta-row">
            <Link className="cta-link" href="/register">
              ¿Primera vez? Registrarme
            </Link>
          </div>
        </div>
        <div className="auth-form-wrap">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
