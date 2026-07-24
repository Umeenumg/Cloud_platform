import React, { useState } from 'react'
import { Link, router, useForm } from '@inertiajs/react'

const primary = '#4648d4'
const primaryFixed = '#e1e0ff'
const outline = '#767586'
const outlineVariant = '#c7c4d7'
const surface = '#fcf8ff'
const surfaceContainer = '#efecf8'
const onSurface = '#1b1b23'
const onSurfaceVariant = '#464554'
const error = '#ba1a1a'

export default function Register({ companies }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    first_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    company_id: '',
    role: 'Developer',
    terms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(0)

  function getStrength(val) {
    let score = 0
    if (val.length > 6) score++
    if (val.length > 10) score++
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++
    if (/[^A-Za-z0-9]/.test(val)) score++
    return score
  }

  function strengthLabel(s) {
    return ['', 'Weak', 'Fair', 'Good', 'Strong'][s] || 'Password strength'
  }

  function strengthColor(s) {
    return [outlineVariant, error, '#d97706', primary, '#059669'][s]
  }

  function handleSubmit(e) {
    e.preventDefault()
    post('/register')
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: surface, padding: '32px 16px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field {
          width: 100%; padding: 12px 12px 12px 40px;
          background: white; border: 1px solid ${outlineVariant};
          border-radius: 10px; font-size: 14px; color: ${onSurface};
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          font-family: Inter, system-ui, sans-serif;
        }
        .input-field:focus { border-color: ${primary}; box-shadow: 0 0 0 3px ${primary}20; }
        .input-field::placeholder { color: ${outlineVariant}; }
        .social-btn {
          flex: 1; display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 10px 16px; border: 1px solid ${outlineVariant};
          border-radius: 10px; background: white; cursor: pointer;
          font-size: 14px; font-weight: 500; color: ${onSurface};
          transition: background 0.2s; font-family: Inter, system-ui, sans-serif;
        }
        .social-btn:hover { background: ${surfaceContainer}; }
        .submit-btn {
          width: 100%; padding: 14px; background: ${primary};
          color: white; border: none; border-radius: 10px;
          font-size: 15px; font-weight: 600; cursor: pointer;
          transition: all 0.2s; font-family: Inter, system-ui, sans-serif;
          box-shadow: 0 4px 12px ${primary}30;
        }
        .submit-btn:hover { background: #3436b8; }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .error-msg { color: ${error}; font-size: 12px; margin-top: 4px; }
        select.input-field { padding-left: 40px; appearance: none; cursor: pointer; }
      `}</style>

      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '48px', height: '48px', background: primary,
            borderRadius: '12px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', marginBottom: '16px'
          }}>
            <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '28px', fontVariationSettings: "'FILL' 1" }}>cloud</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: onSurface, marginBottom: '8px' }}>Create your account</h1>
          <p style={{ fontSize: '14px', color: onSurfaceVariant }}>Start building on NexCloud today</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'white', borderRadius: '16px', padding: '32px',
          border: `1px solid ${outlineVariant}40`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
        }}>

          {/* Social buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button className="social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="social-btn">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ flex: 1, borderBottom: `1px solid ${outlineVariant}` }} />
            <span style={{ padding: '0 16px', fontSize: '11px', color: outline, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'white' }}>or continue with email</span>
            <div style={{ flex: 1, borderBottom: `1px solid ${outlineVariant}` }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Name */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: onSurface, marginBottom: '6px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: outlineVariant, fontSize: '18px', pointerEvents: 'none' }}>person</span>
                <input className="input-field" type="text" placeholder="John Doe" value={data.name} onChange={e => setData('name', e.target.value)} required />
              </div>
              {errors.name && <p className="error-msg">{errors.name}</p>}
            </div>

            {/* First Name */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: onSurface, marginBottom: '6px' }}>First Name</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: outlineVariant, fontSize: '18px', pointerEvents: 'none' }}>badge</span>
                <input className="input-field" type="text" placeholder="John" value={data.first_name} onChange={e => setData('first_name', e.target.value)} required />
              </div>
              {errors.first_name && <p className="error-msg">{errors.first_name}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: onSurface, marginBottom: '6px' }}>Work Email</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: outlineVariant, fontSize: '18px', pointerEvents: 'none' }}>mail</span>
                <input className="input-field" type="email" placeholder="name@company.com" value={data.email} onChange={e => setData('email', e.target.value)} required />
              </div>
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>

            {/* Company */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: onSurface, marginBottom: '6px' }}>Company</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: outlineVariant, fontSize: '18px', pointerEvents: 'none', zIndex: 1 }}>business</span>
                <select className="input-field" value={data.company_id} onChange={e => setData('company_id', e.target.value)} required>
                  <option value="">Select company...</option>
                  {(companies || []).map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              {errors.company_id && <p className="error-msg">{errors.company_id}</p>}
            </div>

            {/* Role */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: onSurface, marginBottom: '6px' }}>Role</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: outlineVariant, fontSize: '18px', pointerEvents: 'none', zIndex: 1 }}>manage_accounts</span>
                <select className="input-field" value={data.role} onChange={e => setData('role', e.target.value)}>
                  {['Administrator','Developer','DevOpsEngineer','SecurityEngineer','BillingManager'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: onSurface, marginBottom: '6px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: outlineVariant, fontSize: '18px', pointerEvents: 'none' }}>lock</span>
                <input
                  className="input-field" type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••" style={{ paddingRight: '44px' }}
                  value={data.password}
                  onChange={e => { setData('password', e.target.value); setStrength(getStrength(e.target.value)) }}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: outlineVariant
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              {/* Strength bar */}
              {data.password && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', gap: '4px', height: '4px', borderRadius: '4px', overflow: 'hidden' }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{
                        flex: 1, borderRadius: '4px',
                        background: i <= strength ? strengthColor(strength) : outlineVariant + '40',
                        transition: 'background 0.3s'
                      }} />
                    ))}
                  </div>
                  <p style={{ fontSize: '11px', marginTop: '4px', color: strengthColor(strength) }}>{strengthLabel(strength)}</p>
                </div>
              )}
              {errors.password && <p className="error-msg">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: onSurface, marginBottom: '6px' }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: outlineVariant, fontSize: '18px', pointerEvents: 'none' }}>lock_reset</span>
                <input className="input-field" type="password" placeholder="••••••••" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} required />
              </div>
            </div>

            {/* Terms */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <input type="checkbox" id="terms" checked={data.terms} onChange={e => setData('terms', e.target.checked)}
                style={{ marginTop: '2px', width: '16px', height: '16px', accentColor: primary, cursor: 'pointer' }} required />
              <label htmlFor="terms" style={{ fontSize: '13px', color: onSurfaceVariant, cursor: 'pointer' }}>
                I agree to the <a href="#" style={{ color: primary }}>Terms of Service</a> and <a href="#" style={{ color: primary }}>Privacy Policy</a>
              </label>
            </div>

            <button type="submit" disabled={processing} className="submit-btn">
              {processing ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: onSurfaceVariant }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: primary, fontWeight: 700, textDecoration: 'none' }}>Log in</Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: outlineVariant }}>© 2024 NexCloud Infrastructure Inc. Secure, compliant, and ready for production.</p>
        </div>
      </div>
    </div>
  )
}