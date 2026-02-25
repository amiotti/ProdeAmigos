import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { getSessionCookieName, getSessionCookieOptions, signSession } from '@/lib/auth';
import { createUser } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      password?: string;
    };

    const user = await createUser({
      firstName: body.firstName ?? '',
      lastName: body.lastName ?? '',
      email: body.email ?? '',
      phone: body.phone ?? '',
      password: body.password ?? '',
    });

    const token = signSession({ userId: user.id, role: user.role });
    cookies().set(getSessionCookieName(), token, getSessionCookieOptions());

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudo registrar';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}


