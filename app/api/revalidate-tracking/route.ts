import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.REVALIDATION_SECRET}`;

  if (!authHeader || authHeader !== expectedAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { vertical_id } = body;

    if (!vertical_id) {
      return NextResponse.json({ error: 'Missing vertical_id' }, { status: 400 });
    }

    // Next.js 15+ / 16 requires a profile argument (e.g. 'max')
    revalidateTag(`tracking-${vertical_id}`, 'max');

    return NextResponse.json(
      { revalidated: true, vertical: vertical_id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
