export const metadata = {
  title: 'Política de Privacidad | PRODE Mundial 2026',
};

export default function PrivacyPage() {
  return (
    <section className="stack-lg legal-doc">
      <div className="panel stack-md">
        <h2>Política de Privacidad</h2>
        <p className="muted">
          Esta Política describe cómo se recolectan, usan, almacenan y protegen los datos personales de los usuarios de
          PRODE Mundial 2026.
        </p>
      </div>

      <div className="panel stack-md">
        <h3>1. Datos que recopilamos</h3>
        <ul className="list">
          <li>Datos de registro: nombre, apellido, email, teléfono, contraseña cifrada y CBU/CVU o alias.</li>
          <li>Datos de uso: pronósticos cargados, resultados visualizados, sesión, estado de pago y actividad técnica necesaria para operar la plataforma.</li>
          <li>Datos de pago: identificadores de transacción, estado de aprobación y comprobantes o referencias asociados al pago.</li>
        </ul>

        <h3>2. Finalidades</h3>
        <ul className="list">
          <li>Crear y administrar cuentas de usuario.</li>
          <li>Habilitar o restringir el acceso en función del estado de inscripción.</li>
          <li>Calcular puntajes, ranking, estadísticas y premios.</li>
          <li>Enviar comunicaciones operativas, soporte y notificaciones vinculadas al PRODE.</li>
          <li>Prevenir fraude, abuso, accesos indebidos y conflictos internos del torneo.</li>
        </ul>

        <h3>3. Base legal y consentimiento</h3>
        <ul className="list">
          <li>El tratamiento se realiza por consentimiento del usuario, por necesidad contractual para prestar el servicio y por interés legítimo en seguridad, prevención de fraude y administración del torneo.</li>
          <li>El usuario declara que los datos aportados son exactos, completos y actualizados.</li>
        </ul>

        <h3>4. Conservación</h3>
        <ul className="list">
          <li>Los datos se conservan durante el tiempo necesario para operar el torneo, acreditar pagos, resolver reclamos, cumplir obligaciones legales y sostener registros históricos.</li>
          <li>Cuando los datos dejan de ser necesarios para la finalidad informada, podrán ser anonimizados, bloqueados o suprimidos según corresponda.</li>
        </ul>

        <h3>5. Cesiones y terceros</h3>
        <ul className="list">
          <li>La plataforma puede apoyarse en proveedores tecnológicos para hosting, base de datos, analítica y cobros.</li>
          <li>Los datos solo se compartirán con terceros en la medida necesaria para operar la plataforma, procesar pagos, cumplir obligaciones legales o responder requerimientos válidos de autoridad competente.</li>
          <li>No se comercializan datos personales con fines ajenos al servicio.</li>
        </ul>

        <h3>6. Derechos del titular</h3>
        <ul className="list">
          <li>Podés solicitar acceso, rectificación, actualización o supresión de tus datos, dentro de los límites legales aplicables.</li>
          <li>También podés pedir información sobre la finalidad del tratamiento, la existencia de bases de datos y los terceros que intervengan en la operación.</li>
          <li>Para ejercer tus derechos, la organización podrá requerir validaciones razonables de identidad.</li>
        </ul>

        <h3>7. Seguridad</h3>
        <ul className="list">
          <li>Se aplican medidas técnicas y organizativas razonables para proteger la información contra acceso no autorizado, alteración, pérdida o divulgación.</li>
          <li>La organización no puede garantizar seguridad absoluta frente a ataques sofisticados o eventos ajenos a su control, pero sí un estándar diligente de protección.</li>
        </ul>

        <h3>8. Contacto y reclamos</h3>
        <ul className="list">
          <li>El usuario podrá canalizar consultas o reclamos por los medios de contacto que informe la organización.</li>
          <li>Si el tratamiento involucrara derechos protegidos por la legislación argentina, se respetarán los mecanismos previstos en la normativa de protección de datos personales.</li>
        </ul>
      </div>
    </section>
  );
}
