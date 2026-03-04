import Link from 'next/link';

export const metadata = {
  title: 'Aviso Legal | PRODE Mundial 2026',
};

export default function LegalPage() {
  return (
    <section className="stack-lg legal-doc">
      <div className="legal-back-row">
        <Link className="legal-back-btn" href="/" aria-label="Volver atrás">
          ←
        </Link>
      </div>

      <div className="panel stack-md">
        <h2>Aviso Legal y Cumplimiento</h2>
        <p className="muted">
          Este apartado resume criterios operativos y de cumplimiento recomendados para comercializar y escalar la
          plataforma en Argentina.
        </p>
      </div>

      <div className="panel stack-md">
        <h3>1. Naturaleza del servicio</h3>
        <ul className="list">
          <li>La plataforma se presenta como servicio digital de organización de pronósticos deportivos entre participantes de un grupo.</li>
          <li>Se trata de una competencia recreativa basada en la habilidad y análisis de los participantes, no de un sistema de apuestas.</li>
          <li>No debe publicitarse como casino, bookmaker, apuestas online, casino social con premios aleatorios ni juego de azar regulado.</li>
          <li>La inscripción remunera un acceso integral al servicio, que incluye plataforma, administración, rankings, estadísticas, soporte y operativa del torneo.</li>
        </ul>

        <h3>2. Cláusula antiapuestas</h3>
        <ul className="list">
          <li>Queda expresamente prohibido usar la plataforma para aceptar apuestas, intermediar apuestas entre terceros o captar fondos vinculados a juego clandestino.</li>
          <li>No se admite el uso del servicio por menores de 18 años.</li>
          <li>La organización podrá bloquear usuarios y reportar incidentes cuando existan indicios de fraude, uso indebido o desvío del servicio hacia apuestas.</li>
        </ul>

        <h3>3. Estructura comercial e impositiva sugerida</h3>
        <ul className="list">
          <li>La operación debe tratarse como prestación de un servicio digital organizado por una persona humana o jurídica formalmente registrada.</li>
          <li>Se recomienda contar con alta fiscal activa, facturación electrónica y cuenta recaudadora identificable.</li>
          <li>La inscripción debe describirse comercialmente como cargo de acceso al servicio y no como apuesta o pozo azaroso.</li>
          <li>Los premios deben documentarse internamente y, según el caso concreto, analizar con contador el tratamiento impositivo, contable y de facturación correspondiente.</li>
        </ul>

        <h3>4. Modelo operativo de premios recomendado</h3>
        <ul className="list">
          <li>Definir por adelantado un esquema transparente: por ejemplo top 5, con premios monetarios y no monetarios anunciados antes del inicio del torneo.</li>
          <li>Los premios anunciados deben considerarse estimativos y sujetos a variaciones por participación real, costos operativos y comisiones de cobro.</li>
          <li>Dejar asentado que el organizador conserva facultad de reasignar porcentajes o reemplazar premios equivalentes por razones operativas justificadas.</li>
        </ul>

        <h3>5. Pagos y premios</h3>
        <ul className="list">
          <li>El organizador actúa como administrador de la plataforma tecnológica y no como intermediario financiero.</li>
          <li>Los premios se distribuyen conforme al ranking publicado y a las reglas del torneo.</li>
          <li>El organizador no será responsable por disputas personales, transferencias externas o acuerdos privados entre participantes.</li>
        </ul>

        <h3>6. Aviso de revisión profesional</h3>
        <p className="muted">
          Este contenido funciona como base documental operativa. Antes de escalar comercialmente a múltiples grupos o
          volúmenes relevantes, corresponde revisión final por abogado y contador matriculados en Argentina.
        </p>
      </div>
    </section>
  );
}
