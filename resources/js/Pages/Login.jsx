
import React, { useState } from 'react'
import { router } from '@inertiajs/react'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError('')

        router.post('/login', form, {
            onError: () => {
                setError('Invalid credentials')
                setLoading(false)
            },
            onSuccess: () => setLoading(false),
        })
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '0 20px' }}>

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '64px',
                        height: '64px',
                        background: '#2563eb',
                        borderRadius: '16px',
                        marginBottom: '16px'
                    }}>
                        <svg width="32" height="32" fill="none" stroke="white" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                    </div>
                    <h1 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                        Cloud Platform
                    </h1>
                    <p style={{ color: '#6b7280', marginTop: '8px' }}>Sign in to your account</p>
                </div>

                {/* Card */}
                <div style={{
                    background: '#111827',
                    borderRadius: '16px',
                    padding: '32px',
                    border: '1px solid #1f2937'
                }}>
                    {error && (
                        <div style={{
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '24px',
                            color: '#f87171',
                            fontSize: '14px'
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#d1d5db', fontSize: '14px', marginBottom: '8px' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                            style={{
                                width: '100%',
                                background: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                color: 'white',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                                outline: 'none'
                            }}
                            placeholder="you@company.com"
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', color: '#d1d5db', fontSize: '14px', marginBottom: '8px' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={e => setForm({...form, password: e.target.value})}
                            style={{
                                width: '100%',
                                background: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                color: 'white',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                                outline: 'none'
                            }}
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            width: '100%',
                            background: loading ? '#1d4ed8' : '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '12px',
                            fontSize: '15px',
                            fontWeight: '500',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </div>
            </div>
        </div>
    )
}