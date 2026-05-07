import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (token !== process.env.NEWSLETTER_SEND_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    revalidatePath('/blog')
    revalidatePath('/blog/[slug]', 'page')

    return NextResponse.json({ revalidated: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error revalidando' }, { status: 500 })
  }
}
