export const metadata = {
  title: 'Términos y condiciones | PRODE Mundial 2026',
};

export default function TermsPage() {
  return (
    <section className="stack-lg">
      <div className="panel">
        <h2>Términos y condiciones</h2>
        <p className="muted">
          Estos Términos regulan el uso del sitio PRODE Mundial 2026 en la República Argentina. Al registrarte y
          utilizar la plataforma aceptás estas condiciones.
        </p>
      </div>

      <div className="panel stack-md">
        <h3>1. Participación y elegibilidad</h3>
        <ul className="list">
          <li>La participación es exclusiva para mayores de 18 años.</li>
          <li>Cada persona puede registrar un único usuario.</li>
          <li>La cuenta es personal e intransferible.</li>
        </ul>

        <h3>2. Inscripción y pagos</h3>
        <ul className="list">
          <li>La inscripción queda confirmada una vez aprobado el pago.</li>
          <li>Las transferencias y pagos de inscripción se procesan de forma segura a través de la plataforma Galio Pay.</li>
          <li>Los pagos realizados no son reembolsables salvo disposición legal aplicable.</li>
          <li>El organizador puede solicitar validaciones adicionales ante inconsistencias.</li>
        </ul>

        <h3>3. Predicciones y reglas del juego</h3>
        <ul className="list">
          <li>Las predicciones pueden editarse hasta 1 hora antes del inicio de cada partido.</li>
          <li>Los resultados oficiales los carga el administrador según fuentes públicas confiables.</li>
          <li>La tabla de posiciones se actualiza automáticamente con los resultados oficiales.</li>
        </ul>

        <h3>4. Premios</h3>
        <ul className="list">
          <li>Los premios se asignan según el ranking final publicado en la plataforma.</li>
          <li>El monto final de los premios en dinero dependerá de la cantidad de participantes inscriptos.</li>
          <li>En caso de empate, se aplican los criterios de desempate definidos en la página de reglas.</li>
          <li>Los premios no son canjeables por dinero salvo que se indique expresamente.</li>
        </ul>

        <h3>5. Conducta y uso aceptable</h3>
        <ul className="list">
          <li>Está prohibido el uso indebido del sitio o la alteración de datos.</li>
          <li>El organizador puede suspender cuentas por fraude o incumplimientos.</li>
        </ul>

        <h3>6. Datos personales</h3>
        <ul className="list">
          <li>Los datos se utilizan para gestionar el PRODE y comunicación con los participantes.</li>
          <li>Se aplican las normas de la Ley 25.326 de Protección de Datos Personales.</li>
        </ul>

        <h3>7. Responsabilidad</h3>
        <ul className="list">
          <li>El servicio puede tener interrupciones por mantenimiento o causas externas.</li>
          <li>No se garantiza disponibilidad continua ni ausencia de errores.</li>
        </ul>

        <h3>8. Jurisdicción</h3>
        <ul className="list">
          <li>Estas condiciones se rigen por las leyes de la República Argentina.</li>
          <li>Cualquier disputa se someterá a los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires.</li>
        </ul>
      </div>
    </section>
  );
}
