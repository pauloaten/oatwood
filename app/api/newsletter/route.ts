import { NextRequest, NextResponse } from 'next/server'

// ── Plug in your email provider here ──────────────────────────────────────────
// Mailchimp:   https://mailchimp.com/developer/marketing/api/list-members/
// ConvertKit:  https://developers.convertkit.com/#create-a-subscriber
// Resend:      https://resend.com/docs/api-reference/contacts/create-contact
// ─────────────────────────────────────────────────────────────────────────────

async function addToMailchimp(email: string): Promise<void> {
  const apiKey    = process.env.MAILCHIMP_API_KEY
  const listId    = process.env.MAILCHIMP_LIST_ID
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX // e.g. 'us21'

  if (!apiKey || !listId || !serverPrefix) {
    console.warn('Mailchimp env vars not set — skipping actual signup')
    return
  }

  const res = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email, status: 'subscribed' }),
    }
  )

  if (!res.ok) {
    const body = await res.json()
    // Title 'Member Exists' is not an error from the user's perspective
    if (body.title === 'Member Exists') return
    throw new Error(body.detail ?? 'Mailchimp error')
  }
}

// Alternative: ConvertKit
async function addToConvertKit(email: string): Promise<void> {
  const apiKey  = process.env.CONVERTKIT_API_KEY
  const formId  = process.env.CONVERTKIT_FORM_ID

  if (!apiKey || !formId) {
    console.warn('ConvertKit env vars not set — skipping actual signup')
    return
  }

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: apiKey, email }),
    }
  )

  if (!res.ok) throw new Error('ConvertKit error')
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Choose your provider — comment out the one you're not using:
    await addToMailchimp(email.toLowerCase().trim())
    // await addToConvertKit(email.toLowerCase().trim())

    return NextResponse.json({ success: true, message: "You're on the list — thanks!" })

  } catch (err) {
    console.error('Newsletter signup error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
