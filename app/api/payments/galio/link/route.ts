import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { getSessionCookieName } from '@/lib/auth';
import { getUserFromSessionToken } from '@/lib/db';
import { createGalioRegistrationPaymentLink } from '@/lib/galiopay';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const token = cookies().get(getSessionCookieName())?.value ?? null;
    const user = await getUserFromSessionToken(token);

    if (!user) {
      return NextResponse.json({ ok: false, error: 'Debes iniciar sesión para generar el pago' }, { status: 401 });
    }
    if (user.role === 'admin') {
      return NextResponse.json({ ok: false, error: 'El administrador no requiere pago de inscripción' }, { status: 400 });
    }

    const result = await createGalioRegistrationPaymentLink({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    return NextResponse.json({ ok: true, url: result.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudo generar el link de pago (GalioPay)';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}



