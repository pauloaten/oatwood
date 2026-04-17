'use client'

import { useState } from 'react'

const SUBJECTS = [
  'General enquiry',
  'Custom order',
  'Product question',
  'Delivery / returns',
  'Trade enquiry',
]

export default function ContactForm() {
  const [fields, setFields] = useState({
    firstName: '', lastName: '', email: '', subject: SUBJECTS[0], message: '',
  })
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(fields),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message)
        setFields({ firstName: '', lastName: '', email: '', subject: SUBJECTS[0], message: '' })
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error — please try again.')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem',
    border: '1px solid rgba(44,26,14,0.2)', borderRadius: 4,
    fontFamily: 'var(--font-lora), Georgia, serif', fontSize: '1rem',
    background: '#F7F0E3', color: '#2C1A0E', outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem',
    letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0622A',
    marginBottom: '0.375rem',
  }

  if (status === 'success') {
    return (
      <div style={{ padding: '2rem', background: 'rgba(122,140,110,0.1)', borderRadius: 8, border: '1px solid rgba(122,140,110,0.3)', textAlign: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#7A8C6E" strokeWidth="2" style={{ margin: '0 auto 1rem' }}>
          <path d="M28 8L13 23l-7-7"/>
        </svg>
        <h3 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2C1A0E', marginBottom: '0.5rem' }}>Message sent</h3>
        <p style={{ color: '#6B3F1F', fontSize: '0.9rem' }}>{message}</p>
        <button onClick={() => setStatus('idle')} style={{ marginTop: '1.25rem', fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: '#A0622A', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>First name</label>
          <input type="text" value={fields.firstName} onChange={set('firstName')} required style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Last name</label>
          <input type="text" value={fields.lastName} onChange={set('lastName')} required style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" value={fields.email} onChange={set('email')} required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Subject</label>
        <select value={fields.subject} onChange={set('subject')} style={inputStyle}>
          {SUBJECTS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Message</label>
        <textarea
          value={fields.message}
          onChange={set('message')}
          required
          rows={6}
          placeholder="Tell us about your project, what you have in mind, or any questions you have..."
          style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
        />
      </div>

      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: '#A0622A' }}>{message}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary"
        style={{ justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'wait' : 'pointer' }}
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
