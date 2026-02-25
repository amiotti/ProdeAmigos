import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { getSessionCookieName } from '@/lib/auth';
import { getPredictionsScreenState, getUserFromSessionToken, savePredictions } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      predictions?: Array<{ matchId: string; homeGoals: number; awayGoals: number }>;
    };
    const token = cookies().get(getSessionCookieName())?.value ?? null;
    const user = await getUserFromSessionToken(token);
    if (!user) {
      return NextResponse.json({ ok: false, error: 'Debes iniciar sesión para cargar predicciones' }, { status: 401 });
    }

    const result = await savePredictions(user.id, body.predictions ?? []);
    revalidatePath('/predictions');
    revalidatePath('/profile');
    revalidatePath('/leaderboard');
    revalidatePath('/');
    const state = await getPredictionsScreenState(token);
    return NextResponse.json({ ok: true, state, lockedMatches: result.lockedMatches });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudieron guardar las predicciones';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}


