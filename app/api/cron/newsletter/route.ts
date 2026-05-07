import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Vercel cron jobs envían este header de seguridad
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: process.env.NEWSLETTER_SEND_TOKEN })
    })

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    return NextResponse.json({ error: 'Error ejecutando cron' }, { status: 500 })
  }
}
