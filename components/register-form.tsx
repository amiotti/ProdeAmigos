'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function RegisterForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, password }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) throw new Error(data.error || 'Error al registrar');

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('prode-auth-changed'));
      }

      setStatus(`Usuario registrado: ${data.user.name}. Redirigiendo a Inicio...`);
      router.push('/inicio');
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo registrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="panel form-grid form-grid-register" onSubmit={onSubmit}>
      <label>
        Nombre
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Ej: Juan" required />
      </label>
      <label>
        Apellido
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Ej: Pérez" required />
      </label>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="juan@mail.com" required />
      </label>
      <label>
        Teléfono
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+54 9 11 ..." required />
      </label>
      <label>
        Contraseña
        <input
          type="password"
          value={password}
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          required
        />
      </label>

      <button className="btn btn-primary" disabled={loading} type="submit">
        {loading ? 'Creando usuario...' : 'Registrarme'}
      </button>

      {status ? <p className="status">{status}</p> : null}
      <p className="muted">Luego podrás pagar la inscripción desde Predicciones o desde tu perfil.</p>
    </form>
  );
}
