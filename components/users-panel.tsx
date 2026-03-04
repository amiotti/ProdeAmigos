'use client';

import { useState } from 'react';

import type { User } from '@/lib/types';

export function UsersPanel({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [paymentDrafts, setPaymentDrafts] = useState<Record<string, User['registrationPaymentStatus']>>(
    Object.fromEntries(initialUsers.map((user) => [user.id, user.registrationPaymentStatus ?? 'pending'])),
  );

  function syncUsers(nextUsers: User[]) {
    setUsers(nextUsers);
    setPaymentDrafts(
      Object.fromEntries(nextUsers.map((user) => [user.id, user.registrationPaymentStatus ?? 'pending'])),
    );
  }

  async function deleteUser(userId: string) {
    setLoadingId(userId);
    setStatus(null);
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || 'No se pudo eliminar');
      syncUsers((data.users as User[]) ?? []);
      setStatus('Usuario eliminado.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo eliminar el usuario');
    } finally {
      setLoadingId(null);
    }
  }

  async function updatePaymentStatus(userId: string, registrationPaymentStatus: User['registrationPaymentStatus']) {
    setLoadingId(userId);
    setStatus(null);
    try {
      const response = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, registrationPaymentStatus }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || 'No se pudo actualizar el pago');
      syncUsers((data.users as User[]) ?? []);
      setStatus('Estado de pago actualizado.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo actualizar el pago');
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <section className="stack-lg">
      <div className="panel">
        <h2>Usuarios</h2>
        <p className="muted">Panel exclusivo de administrador. Lista de todos los usuarios registrados.</p>
      </div>

      {status ? <p className="status">{status}</p> : null}

      <div className="panel table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>CBU/CVU o Alias</th>
              <th>Pago</th>
              <th>Rol</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <span className="session-avatar session-avatar-fallback avatar-preview-xs" aria-hidden="true">
                    {user.firstName?.[0] ?? user.name?.[0] ?? 'U'}
                  </span>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.bankInfo}</td>
                <td>
                  {user.role === 'admin' ? (
                    <span className="muted">Aprobado</span>
                  ) : (
                    <div className="inline-actions">
                      <select
                        value={paymentDrafts[user.id] ?? 'pending'}
                        onChange={(e) => {
                          const nextStatus = e.target.value as User['registrationPaymentStatus'];
                          setPaymentDrafts((prev) => ({
                            ...prev,
                            [user.id]: nextStatus,
                          }));
                          void updatePaymentStatus(user.id, nextStatus);
                        }}
                        disabled={loadingId === user.id}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="approved">Aprobado</option>
                        <option value="failed">Fallido</option>
                      </select>

                    </div>
                  )}
                </td>
                <td>{user.role === 'admin' ? 'Administrador' : 'Usuario'}</td>
                <td>
                  {user.role === 'admin' ? (
                    <span className="muted">No editable</span>
                  ) : (
                    <button
                      className="btn btn-danger btn-small"
                      type="button"
                      onClick={() => deleteUser(user.id)}
                      disabled={loadingId === user.id}
                    >
                      {loadingId === user.id ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

