'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email,   setEmail]   = useState('')
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res  = await fetch('/api/newsletter', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message ?? "You're on the list!")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error — please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ padding: '1rem', background: 'rgba(122,140,110,0.15)', borderRadius: 6, border: '1px solid rgba(122,140,110,0.3)', textAlign: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A8C6E" strokeWidth="2" style={{ margin: '0 auto 0.5rem' }}>
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', color: '#2C1A0E' }}>{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', borderRadius: 4, overflow: 'hidden', boxShadow: '0 3px 16px rgba(44,26,14,0.08)' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-label="Email address"
          style={{ flex: 1, padding: '0.875rem 1.25rem', border: '1px solid rgba(44,26,14,0.15)', borderRight: 'none', fontFamily: 'var(--font-lora), Georgia, serif', fontSize: '1rem', background: '#FDFAF5', color: '#2C1A0E', outline: 'none' }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{ padding: '0.875rem 1.5rem', background: status === 'loading' ? '#6B3F1F' : '#2C1A0E', color: '#E8D5B0', border: 'none', fontFamily: 'var(--font-dm-sans)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.04em', textTransform: 'uppercase', cursor: status === 'loading' ? 'wait' : 'pointer', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
        >
          {status === 'loading' ? 'Signing up…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: '#A0622A', marginTop: '0.5rem' }}>{message}</p>
      )}
    </form>
  )
}
