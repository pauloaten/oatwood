import { NextRequest, NextResponse } from 'next/server'

// ── Email sending ──────────────────────────────────────────────────────────────
// Uses Resend (https://resend.com) — free tier sends 3,000 emails/month.
// Install: npm install resend
// Alternatives: Nodemailer + SMTP, Postmark, SendGrid
// ─────────────────────────────────────────────────────────────────────────────

interface ContactBody {
  firstName: string
  lastName:  string
  email:     string
  subject:   string
  message:   string
}

async function sendWithResend(body: ContactBody): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'hello@woodcraft.co.uk'

  if (!apiKey) {
    // In development without Resend configured, just log
    console.log('📧 Contact form submission (Resend not configured):', body)
    return
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:    'Woodcraft Website <noreply@woodcraft.co.uk>',
      to:      [toEmail],
      replyTo: body.email,
      subject: `[Woodcraft] ${body.subject} — ${body.firstName} ${body.lastName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; color: #2C1A0E;">
          <h2 style="color: #A0622A;">New contact form message</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr><td style="padding: 8px 0; color: #6B3F1F; width: 120px;">Name</td><td style="padding: 8px 0;">${body.firstName} ${body.lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B3F1F;">Email</td><td style="padding: 8px 0;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #6B3F1F;">Subject</td><td style="padding: 8px 0;">${body.subject}</td></tr>
          </table>
          <div style="background: #F7F0E3; padding: 1.25rem; border-left: 3px solid #A0622A; border-radius: 0 6px 6px 0;">
            <p style="margin: 0; white-space: pre-wrap;">${body.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
          <p style="color: #A0622A; font-size: 0.8rem; margin-top: 2rem;">Sent from woodcraft.co.uk contact form</p>
        </div>
      `,
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message ?? 'Resend error')
  }
}

function validateBody(body: Partial<ContactBody>): body is ContactBody {
  return (
    typeof body.firstName === 'string' && body.firstName.trim().length > 0 &&
    typeof body.lastName  === 'string' && body.lastName.trim().length > 0 &&
    typeof body.email     === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) &&
    typeof body.subject   === 'string' && body.subject.trim().length > 0 &&
    typeof body.message   === 'string' && body.message.trim().length > 10
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!validateBody(body)) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }

    // Basic spam check
    if (body.message.toLowerCase().includes('http') && body.message.split('http').length > 3) {
      return NextResponse.json({ error: 'Message flagged as spam.' }, { status: 400 })
    }

    await sendWithResend(body)

    return NextResponse.json({
      success: true,
      message: "Thanks for getting in touch — we'll get back to you within 2 working days.",
    })

  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send message. Please email us directly.' }, { status: 500 })
  }
}
