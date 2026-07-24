import React from 'react'
import { Link } from '@inertiajs/react'

// ── Custom color tokens from Stitch design ──────────────────────────────────
const colors = {
  primary: '#4648d4',
  primaryContainer: '#6063ee',
  onPrimary: '#ffffff',
  onBackground: '#1b1b23',
  surface: '#fcf8ff',
  surfaceContainer: '#efecf8',
  surfaceContainerLow: '#f5f2fe',
  surfaceContainerHigh: '#e9e6f3',
  surfaceBright: '#fcf8ff',
  surfaceVariant: '#e4e1ed',
  outline: '#767586',
  outlineVariant: '#c7c4d7',
  onSurface: '#1b1b23',
  onSurfaceVariant: '#464554',
  primaryFixed: '#e1e0ff',
  primaryFixedDim: '#c0c1ff',
  error: '#ba1a1a',
}

export default function Landing() {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: colors.surface, color: colors.onBackground }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .bento-card {
          background: white;
          border-radius: 16px;
          border: 1px solid ${colors.outlineVariant}40;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .perspective-view {
          transform: perspective(1200px) rotateX(6deg) rotateY(-2deg);
          transition: transform 0.4s ease;
        }
        .perspective-view:hover {
          transform: perspective(1200px) rotateX(2deg) rotateY(0deg);
        }
        @keyframes ping {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.5); }
        }
        .animate-ping { animation: ping 2s cubic-bezier(0,0,0.2,1) infinite; }
        .animate-ping-slow { animation: ping 3s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        background: `${colors.surface}cc`,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.outlineVariant}50`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px', maxWidth: '1280px', margin: '0 auto', height: '64px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', background: colors.primary,
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontSize: '16px' }}>☁</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '18px', color: colors.onBackground }}>NexCloud</span>
            </div>
            {/* Nav links */}
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Infrastructure', 'Network', 'Storage', 'Pricing', 'Company'].map((item, i) => (
                <a key={item} href="#" style={{
                  fontSize: '15px', fontWeight: i === 0 ? 600 : 400,
                  color: i === 0 ? colors.primary : colors.onSurfaceVariant,
                  textDecoration: 'none',
                  borderBottom: i === 0 ? `2px solid ${colors.primary}` : 'none',
                  paddingBottom: '2px',
                  transition: 'color 0.2s'
                }}>{item}</a>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/login" style={{
              fontSize: '15px', color: colors.onSurfaceVariant,
              padding: '8px 16px', textDecoration: 'none',
              transition: 'color 0.2s'
            }}>Log In</Link>
            <Link href="/login" style={{
              fontSize: '15px', fontWeight: 600,
              background: colors.primary, color: 'white',
              padding: '8px 20px', borderRadius: '8px',
              textDecoration: 'none', transition: 'background 0.2s'
            }}>Get Started</Link>
          </div>
        </nav>
      </header>

      <main style={{ paddingTop: '96px' }}>

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section style={{
          maxWidth: '1280px', margin: '0 auto', padding: '80px 48px 60px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '56px', fontWeight: 800, lineHeight: 1.1,
            color: colors.onBackground, marginBottom: '20px'
          }}>
            Your infrastructure,{' '}
            <span style={{ color: colors.primary }}>finally simple.</span>
          </h1>
          <p style={{
            fontSize: '18px', color: colors.outline,
            maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.7
          }}>
            NexCloud provides the world's fastest cloud foundation for high-performance
            applications. Scale instantly without managing servers.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px' }}>
            <Link href="/login" style={{
              background: colors.primary, color: 'white',
              padding: '14px 32px', borderRadius: '10px',
              fontWeight: 700, fontSize: '16px', textDecoration: 'none',
              boxShadow: `0 4px 20px ${colors.primary}40`,
              transition: 'all 0.2s'
            }}>Deploy Now</Link>
            <a href="#" style={{
              border: `1px solid ${colors.outlineVariant}`,
              color: colors.onSurface,
              padding: '14px 32px', borderRadius: '10px',
              fontWeight: 600, fontSize: '16px', textDecoration: 'none',
              transition: 'all 0.2s'
            }}>Read Docs</a>
          </div>

          {/* Hero Image */}
          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            <div className="perspective-view" style={{
              borderRadius: '12px', overflow: 'hidden',
              border: `1px solid ${colors.outlineVariant}40`,
              boxShadow: '0 24px 80px rgba(70,72,212,0.15)'
            }}>
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLt3O-tbNeG4arNKEBUhP1oixFKPfoA1emghchvcUChYuNbXPxIDfOcrUbz_FFbkBaM-wQ5DtcrrfOdP9kNUuYxgHCybavuSXj3-vvyt5zryD-Su8cbINkQFuc68wF6vP3CvpvmDzsQgyjA0awfOjwvnsoahbY9T7De74GsCDj-RpHYW37OtDVghov7hT6K3Mv7XCN0GlHDax3bhIU1wqb07e7DCJgr2UQ6GZOrPskvB6RDwgH2zB8IkumY"
                alt="NexCloud Dashboard"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            {/* Glow */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120%', height: '120%',
              background: `${colors.primary}08`,
              filter: 'blur(80px)', borderRadius: '50%', zIndex: -1
            }} />
          </div>
        </section>

        {/* ── LOGO STRIP ─────────────────────────────────────────────────── */}
        <section style={{
          padding: '48px 0',
          borderTop: `1px solid ${colors.outlineVariant}30`,
          borderBottom: `1px solid ${colors.outlineVariant}30`,
          background: 'white'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
            <p style={{
              textAlign: 'center', fontSize: '11px', fontWeight: 500,
              color: colors.outline, letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: '32px'
            }}>
              Trusted by the world's most innovative teams
            </p>
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              gap: '48px', flexWrap: 'wrap', filter: 'grayscale(1)', opacity: 0.5
            }}>
              {['Stripe', 'Vercel', 'GitHub', 'Notion', 'Linear', 'Figma', 'Slack', 'Discord'].map(name => (
                <span key={name} style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.03em' }}>{name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENTO GRID ─────────────────────────────────────────────────── */}
        <section style={{ padding: '96px 48px', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }}>

            {/* Deploy in Seconds — 2 cols */}
            <div className="bento-card" style={{
              gridColumn: 'span 2', padding: '28px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: '320px', background: '#0d1117'
            }}>
              <div style={{
                background: '#0a0a0a', borderRadius: '10px', padding: '20px',
                flexGrow: 1, fontFamily: 'monospace', fontSize: '13px'
              }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  {['#ff5f57','#febc2e','#28c840'].map(c => (
                    <div key={c} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div style={{ lineHeight: 1.8 }}>
                  <p style={{ color: '#888' }}><span style={{ color: colors.primary }}>$</span> nexcloud deploy --prod</p>
                  <p style={{ color: 'white' }}>🚀 Analyzing project structure...</p>
                  <p style={{ color: 'white' }}>📦 Building container image...</p>
                  <p style={{ color: colors.primaryFixedDim }}>✓ 12 edge functions initialized</p>
                  <p style={{ color: 'white' }}>☁️ Scaling global fleet...</p>
                  <p style={{ color: colors.primaryFixedDim }}>✓ Deployment live at <u style={{ cursor: 'pointer' }}>nex.cloud/v8f2a</u></p>
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>Deploy in seconds</h3>
                <p style={{ fontSize: '13px', color: colors.outlineVariant }}>A fully automated CI/CD pipeline for every commit.</p>
              </div>
            </div>

            {/* Global Regions */}
            <div className="bento-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: '160px' }}>
                <span style={{ fontSize: '80px', color: colors.primary, opacity: 0.15 }}>🌍</span>
                {[['-20px','30px'],['10px','-15px'],['20px','20px']].map(([t, l], i) => (
                  <div key={i} className="animate-ping" style={{
                    position: 'absolute', top: `calc(50% + ${t})`, left: `calc(50% + ${l})`,
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: colors.primary, animationDelay: `${i * 0.7}s`
                  }} />
                ))}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>Global regions</h3>
                <p style={{ fontSize: '13px', color: colors.outline }}>35+ data centers globally.</p>
              </div>
            </div>

            {/* Real-time Metrics */}
            <div className="bento-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', gap: '6px', padding: '16px 16px 0' }}>
                {[40, 60, 75, 100].map((h, i) => (
                  <div key={i} style={{
                    flex: 1, height: `${h}%`,
                    background: `${colors.primary}${['33','66','99','ff'][i]}`,
                    borderRadius: '4px 4px 0 0'
                  }} />
                ))}
              </div>
              <div style={{ marginTop: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>Real-time metrics</h3>
                <p style={{ fontSize: '13px', color: colors.outline }}>Observability built-in.</p>
              </div>
            </div>

            {/* 99.99% */}
            <div className="bento-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
              <span style={{ fontSize: '48px', fontWeight: 800, color: colors.primary, lineHeight: 1 }}>99.99%</span>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '12px' }}>Uptime</h3>
              <p style={{ fontSize: '13px', color: colors.outline, marginTop: '4px' }}>SLA guaranteed stability.</p>
            </div>

            {/* Auto-scaling */}
            <div className="bento-card" style={{
              padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              background: colors.primaryFixed
            }}>
              <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '72px' }}>⚡</span>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>Auto-scaling</h3>
                <p style={{ fontSize: '13px', color: colors.onSurfaceVariant }}>Scale to millions in seconds.</p>
              </div>
            </div>

            {/* Security First — 2 cols */}
            <div className="bento-card" style={{
              gridColumn: 'span 2', padding: '28px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              background: colors.surfaceContainer
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {['SOC2', 'ISO 27001', 'GDPR', 'PCI DSS'].map(cert => (
                  <div key={cert} style={{
                    padding: '20px', background: 'white', borderRadius: '10px',
                    border: `1px solid ${colors.outlineVariant}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, color: colors.outline, fontSize: '14px'
                  }}>{cert}</div>
                ))}
              </div>
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>Security first</h3>
                <p style={{ fontSize: '13px', color: colors.outline }}>Enterprise-grade compliance and encryption as standard for every project.</p>
              </div>
            </div>

          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
        <section style={{ padding: '96px 48px', background: colors.surfaceContainerLow }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '64px' }}>From idea to production in minutes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>
              {[
                { num: '1', icon: '🔗', title: 'Connect', desc: 'Link your GitHub repository and we auto-detect your framework settings.' },
                { num: '2', icon: '⚙️', title: 'Configure', desc: 'Customize environment variables, edge regions, and database clusters with one click.' },
                { num: '3', icon: '🚀', title: 'Deploy', desc: 'Every push is automatically built and deployed to our global edge network.' },
              ].map(step => (
                <div key={step.num} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '48px', height: '48px', background: colors.primary, color: 'white',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px', fontWeight: 700, fontSize: '18px'
                  }}>{step.num}</div>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>{step.icon}</div>
                  <h4 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px' }}>{step.title}</h4>
                  <p style={{ fontSize: '15px', color: colors.outline, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ────────────────────────────────────────────────────── */}
        <section style={{ padding: '96px 48px', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>Transparent pricing for every scale</h2>
            <p style={{ fontSize: '16px', color: colors.outline }}>Start for free, then scale as you grow.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>

            {/* Free */}
            <div className="bento-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Free</h3>
                <p style={{ fontSize: '13px', color: colors.outline, marginBottom: '20px' }}>Perfect for side projects and hobbyists.</p>
                <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px' }}>
                  $0<span style={{ fontSize: '16px', fontWeight: 400, color: colors.outline }}>/mo</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Unlimited deployments', 'DDoS protection', 'SSL by default'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                      <span style={{ color: colors.primary }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button style={{
                marginTop: '32px', width: '100%', padding: '10px',
                border: `1px solid ${colors.outlineVariant}`, borderRadius: '8px',
                fontWeight: 600, cursor: 'pointer', background: 'white',
                fontSize: '15px', transition: 'all 0.2s'
              }}>Get Started</button>
            </div>

            {/* Team — Popular */}
            <div className="bento-card" style={{
              padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              border: `2px solid ${colors.primary}`, position: 'relative'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)',
                background: colors.primary, color: 'white',
                padding: '4px 16px', borderRadius: '20px',
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase'
              }}>Popular</div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Team</h3>
                <p style={{ fontSize: '13px', color: colors.outline, marginBottom: '20px' }}>Collaborate with your entire team.</p>
                <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px' }}>
                  $49<span style={{ fontSize: '16px', fontWeight: 400, color: colors.outline }}>/mo</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['All Free features', 'Up to 10 team members', 'Preview deployments', 'Custom domains'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                      <span style={{ color: colors.primary }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button style={{
                marginTop: '32px', width: '100%', padding: '10px',
                background: colors.primary, color: 'white', borderRadius: '8px',
                fontWeight: 600, cursor: 'pointer', border: 'none',
                fontSize: '15px', boxShadow: `0 4px 12px ${colors.primary}40`,
                transition: 'all 0.2s'
              }}>Start Team Trial</button>
            </div>

            {/* Scale */}
            <div className="bento-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Scale</h3>
                <p style={{ fontSize: '13px', color: colors.outline, marginBottom: '20px' }}>For enterprises and high-traffic apps.</p>
                <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px' }}>
                  $199<span style={{ fontSize: '16px', fontWeight: 400, color: colors.outline }}>/mo</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['All Team features', 'Dedicated support', '99.99% uptime SLA', 'Custom contracts'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                      <span style={{ color: colors.primary }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button style={{
                marginTop: '32px', width: '100%', padding: '10px',
                border: `1px solid ${colors.outlineVariant}`, borderRadius: '8px',
                fontWeight: 600, cursor: 'pointer', background: 'white',
                fontSize: '15px', transition: 'all 0.2s'
              }}>Contact Sales</button>
            </div>

          </div>
        </section>

        {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
        <section style={{ padding: '48px 48px 96px' }}>
          <div style={{
            maxWidth: '1280px', margin: '0 auto',
            background: '#09090b', borderRadius: '24px',
            padding: '80px 96px', textAlign: 'center',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', top: '-96px', right: '-96px',
              width: '384px', height: '384px',
              background: `${colors.primary}20`, filter: 'blur(80px)', borderRadius: '50%'
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '40px', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
                Ready to modernize your stack?
              </h2>
              <p style={{ fontSize: '18px', color: colors.outlineVariant, maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7 }}>
                Join over 50,000 developers building on NexCloud today. No credit card required to get started.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <Link href="/login" style={{
                  background: 'white', color: colors.onBackground,
                  padding: '14px 40px', borderRadius: '10px',
                  fontWeight: 700, fontSize: '16px', textDecoration: 'none',
                  transition: 'all 0.2s'
                }}>Create Free Account</Link>
                <a href="#" style={{
                  border: `1px solid rgba(255,255,255,0.2)`, color: 'white',
                  padding: '14px 40px', borderRadius: '10px',
                  fontWeight: 600, fontSize: '16px', textDecoration: 'none',
                  transition: 'all 0.2s'
                }}>View Showcase</a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer style={{ background: colors.onBackground, color: colors.primaryFixedDim, padding: '64px 48px' }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{
                width: '28px', height: '28px', background: colors.primary,
                borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontSize: '14px' }}>☁</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '16px', color: colors.surfaceBright }}>NexCloud</span>
            </div>
            <p style={{ fontSize: '13px', color: colors.outlineVariant, lineHeight: 1.7 }}>
              The future of cloud infrastructure. Fast, reliable, and effortless.
            </p>
          </div>
          {[
            { title: 'Platform', links: ['Infrastructure', 'Network Edge', 'Cloud Storage', 'Global CDN'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Customers'] },
            { title: 'Resources', links: ['API Docs', 'Security', 'System Status', 'Privacy Policy'] },
          ].map(col => (
            <div key={col.title}>
              <h5 style={{
                fontSize: '11px', fontWeight: 600, color: colors.surfaceBright,
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px'
              }}>{col.title}</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: '14px', color: colors.outlineVariant, textDecoration: 'none' }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          maxWidth: '1280px', margin: '48px auto 0', paddingTop: '24px',
          borderTop: `1px solid rgba(255,255,255,0.08)`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <p style={{ fontSize: '13px', color: colors.outlineVariant }}>© 2024 NexCloud Infrastructure. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service'].map(link => (
              <a key={link} href="#" style={{ fontSize: '13px', color: colors.outlineVariant, textDecoration: 'underline' }}>{link}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}