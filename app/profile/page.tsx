import Link from 'next/link';
import { cookies } from 'next/headers';

import { TeamName } from '@/components/team-name';
import { ProfileForm } from '@/components/profile-form';
import { getSessionCookieName } from '@/lib/auth';
import { getPredictionsScreenState, getUserFromSessionToken } from '@/lib/db';

export const dynamic = 'force-dynamic';

function formatKickoffStable(iso: string) {
  const d = new Date(iso);
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const hour = String(d.getUTCHours()).padStart(2, '0');
  const minute = String(d.getUTCMinutes()).padStart(2, '0');
  return `${day}/${month} ${hour}:${minute} UTC`;
}

export default async function ProfilePage() {
  const token = cookies().get(getSessionCookieName())?.value ?? null;
  const user = await getUserFromSessionToken(token);

  if (!user) {
    return (
      <section className="stack-lg">
        <div className="panel">
          <h2>Perfil</h2>
          <p className="muted">Debes iniciar sesion para ver y editar tu perfil.</p>
          <div className="cta-row">
            <Link className="cta-link" href="/login">
              Ir a Ingresar
            </Link>
            <Link className="cta-link" href="/register">
              Crear cuenta
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const predictionsState = await getPredictionsScreenState(token);
  const predictionRows = predictionsState.db.predictions
    .filter((p) => p.userId === user.id)
    .map((p) => {
      const match = predictionsState.db.matches.find((m) => m.id === p.matchId);
      return match ? { prediction: p, match } : null;
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row))
    .sort((a, b) => new Date(a.match.kickoffAt).getTime() - new Date(b.match.kickoffAt).getTime());

  return (
    <section className="stack-lg">
      <div className="panel">
        <h2>Mi perfil</h2>
        <p className="muted">
          Edita tus datos personales. Rol actual: <strong>{user.role === 'admin' ? 'Administrador' : 'Usuario'}</strong>
        </p>
      </div>
      <ProfileForm user={user} />
      <div className="panel stack-md">
        <div className="section-head">
          <h3>Mis predicciones guardadas</h3>
          <span>{predictionRows.length} registradas</span>
        </div>
        {predictionRows.length === 0 ? (
          <p className="muted">Todavia no tienes predicciones guardadas.</p>
        ) : (
          <div className="match-list">
            {predictionRows.map(({ prediction, match }) => (
              <div key={prediction.id} className="match-card">
                <div>
                  <p className="match-meta">
                    {match.id} - {formatKickoffStable(match.kickoffAt)}
                  </p>
                  {match.venue ? <p className="match-meta">Sede: {match.venue}</p> : null}
                  <div className="fixture-row">
                    <TeamName teamName={match.homeTeam} linkToTeam />
                    <span className="vs">vs</span>
                    <TeamName teamName={match.awayTeam} linkToTeam />
                  </div>
                  {match.officialResult ? (
                    <p className="official-result">
                      Resultado oficial: {match.officialResult.home} - {match.officialResult.away}
                    </p>
                  ) : null}
                </div>
                <div className="score-inputs is-locked">
                  <input value={String(prediction.homeGoals)} disabled aria-label={`Goles pronosticados ${match.homeTeam}`} />
                  <span>-</span>
                  <input value={String(prediction.awayGoals)} disabled aria-label={`Goles pronosticados ${match.awayTeam}`} />
                  <span className="chip">Guardada</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
