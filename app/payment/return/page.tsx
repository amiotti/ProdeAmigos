import Link from 'next/link';
import { cookies } from 'next/headers';

import { getSessionCookieName } from '@/lib/auth';
import { getUserFromSessionToken, markUserRegistrationPaymentApproved } from '@/lib/db';
import { getGalioPayment, isGalioApprovedStatus } from '@/lib/galiopay';

type PaymentReturnPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function getText(status: string | undefined) {
  if (status === 'success' || status === 'approved') {
    return {
      title: 'Pago aprobado',
      description: 'La inscripción fue pagada correctamente. Ya puedes continuar en la app.',
    };
  }
  if (status === 'pending') {
    return {
      title: 'Pago pendiente',
      description: 'El cobro figura como pendiente. Puedes revisar el estado y reintentar si hace falta.',
    };
  }
  if (status === 'failure') {
    return {
      title: 'Pago no completado',
      description: 'El pago fue cancelado o fallido. Puedes volver a registrarte o reintentar el checkout.',
    };
  }
  return {
    title: 'Retorno de pago',
    description: 'Volviste desde la plataforma de pagos. Revisa el estado del pago e ingresa a la app.',
  };
}

export default async function PaymentReturnPage({ searchParams }: PaymentReturnPageProps) {
  const raw = searchParams?.status;
  const status = Array.isArray(raw) ? raw[0] : raw;
  const rawProvider = searchParams?.provider;
  const provider = Array.isArray(rawProvider) ? rawProvider[0] : rawProvider;
  const rawGalioPaymentId = searchParams?.galio_payment_id;
  const galioPaymentId = Array.isArray(rawGalioPaymentId) ? rawGalioPaymentId[0] : rawGalioPaymentId;
  const token = cookies().get(getSessionCookieName())?.value ?? null;
  const sessionUser = await getUserFromSessionToken(token);
  let approvedNow = false;
  let galioPaymentStatus: string | null = null;
  let galioPaymentFetchError = false;

  if (galioPaymentId) {
    try {
      const payment = await getGalioPayment(galioPaymentId);
      galioPaymentStatus = payment.status ?? null;
    } catch (error) {
      galioPaymentFetchError = true;
    }
  }

  const approvalSignal = galioPaymentId
    ? isGalioApprovedStatus(galioPaymentStatus)
    : status === 'success' || status === 'approved';

  if (approvalSignal && sessionUser && sessionUser.role !== 'admin') {
    try {
      const before = sessionUser.registrationPaymentStatus;
      const updated = await markUserRegistrationPaymentApproved(sessionUser.id, galioPaymentId ?? null);
      approvedNow = before !== 'approved' && updated.registrationPaymentStatus === 'approved';
    } catch {
      approvedNow = false;
    }
  }

  const text = getText(status);
  const receiptNumber = galioPaymentId ?? null;
  const shouldShowLogin = !sessionUser;

  return (
    <section className="stack-lg">
      <div className="panel">
        <h2>{text.title}</h2>
        <p className="muted">{text.description}</p>
        {approvedNow ? (
          <p className="status">Pago marcado como aprobado en tu usuario (validado en retorno, sin webhook).</p>
        ) : null}
        {receiptNumber ? <p className="muted">N° de comprobante: <strong>{receiptNumber}</strong></p> : null}
        {sessionUser && sessionUser.role !== 'admin' ? (
          <p className="muted">
            Estado de inscripción actual: <strong>{approvedNow ? 'approved' : sessionUser.registrationPaymentStatus ?? 'pending'}</strong>
          </p>
        ) : null}
        {provider === 'galio' && galioPaymentFetchError ? (
          <p className="status">No pudimos validar el pago automáticamente. Revisa el estado e intenta nuevamente.</p>
        ) : null}
        <div className="cta-row">
          {shouldShowLogin ? (
            <Link className="cta-link" href="/login">
              Iniciar sesión
            </Link>
          ) : null}
          <Link className="cta-link" href="/profile">
            Mi perfil
          </Link>
          <Link className="cta-link" href="/predictions">
            Ir a predicciones
          </Link>
        </div>
      </div>
    </section>
  );
}



