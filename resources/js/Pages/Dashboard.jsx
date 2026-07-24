import React, { useState } from 'react'
import { Link, router } from '@inertiajs/react'

const colors = {
  primary: '#4648d4',
  onPrimary: '#ffffff',
  onBackground: '#1b1b23',
  surface: '#fcf8ff',
  surfaceDim: '#dcd8e6',
  surfaceContainer: '#efecf8',
  surfaceContainerLow: '#f5f2fe',
  surfaceContainerHigh: '#e9e6f3',
  surfaceContainerLowest: '#ffffff',
  surfaceBright: '#fcf8ff',
  outlineVariant: '#c7c4d7',
  outline: '#767586',
  onSurface: '#1b1b23',
  onSurfaceVariant: '#464554',
  primaryFixed: '#e1e0ff',
  primaryFixedDim: '#c0c1ff',
  secondaryContainer: '#2d6a4f',
  secondaryFixed: '#d8f3dc',
  secondaryFixedDim: '#74c69d',
  tertiary: '#d97706',
  tertiaryContainer: '#fbbf24',
  tertiaryFixed: '#fef3c7',
  error: '#ba1a1a',
}

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', active: true, href: '/dashboard' },
  { icon: 'inventory_2', label: 'Resources', href: '/resources' },
  { icon: 'rocket_launch', label: 'Deployments', href: '/deployments' },
  { icon: 'monitoring', label: 'Monitoring', href: '/monitoring' },
  { icon: 'payments', label: 'Billing', href: '/billing' },
  { icon: 'shield', label: 'Security', href: '/security' },
  { icon: 'help_center', label: 'Support', href: '/support' },
  { icon: 'settings', label: 'Settings', href: '/settings' },
]

const deployments = [
  { version: 'v1.2.4', resource: 'api-gateway-prod', type: 'Compute', status: 'Success', time: '2m ago' },
  { version: 'v2.0.1-rc', resource: 'auth-service-edge', type: 'Edge', status: 'Building', time: '15m ago' },
  { version: 'v1.2.3', resource: 'database-sharder-01', type: 'Compute', status: 'Success', time: '1h ago' },
  { version: 'v1.1.9', resource: 'static-assets-cdn', type: 'Edge', status: 'Success', time: '4h ago' },
]

const chartData = [40, 55, 45, 80, 60, 70, 50, 65]

export default function Dashboard({ auth }) {
  const [searchFocus, setSearchFocus] = useState(false)

  function handleLogout() {
    router.post('/logout')
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: colors.surfaceContainerLowest, minHeight: '100vh' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .glass-card {
          background: white;
          border: 1px solid ${colors.outlineVariant}40;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .sidebar-item:hover {
          background: ${colors.surfaceContainer};
          border-radius: 12px;
        }
        .nav-item-active {
          background: ${colors.primaryFixed};
          color: ${colors.primary} !important;
          border-radius: 12px;
        }
        @keyframes ping {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0; transform: scale(2); }
        }
        .animate-ping { animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
        .kpi-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .kpi-card { transition: all 0.2s ease; }
        .action-btn:hover { background: ${colors.surfaceContainerHigh} !important; }
        .action-btn:hover .arrow-icon { transform: translateX(4px); }
        .arrow-icon { transition: transform 0.2s; }
        tr:hover td { background: ${colors.surfaceContainerLow}80; }
      `}</style>

      {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
      <aside style={{
        width: '240px', height: '100vh', position: 'fixed', left: 0, top: 0,
        display: 'flex', flexDirection: 'column', padding: '20px 0',
        zIndex: 50, borderRight: `1px solid ${colors.outlineVariant}40`,
        background: colors.surfaceDim
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="material-symbols-outlined" style={{ color: colors.primary, fontSize: '28px', fontVariationSettings: "'FILL' 1" }}>cloud</span>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: colors.onSurface }}>NexCloud</h1>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map(item => (
              <li key={item.label}>
                <Link href={item.href} style={{
                  display: 'flex', alignItems: 'center', padding: '10px 12px',
                  borderRadius: '12px', textDecoration: 'none',
                  fontWeight: item.active ? 700 : 400,
                  color: item.active ? colors.primary : colors.onSurfaceVariant,
                  background: item.active ? colors.primaryFixed : 'transparent',
                  transition: 'all 0.2s',
                  fontSize: '14px'
                }}>
                  <span className="material-symbols-outlined" style={{
                    marginRight: '12px', fontSize: '20px',
                    fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0"
                  }}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User */}
        <div style={{ padding: '16px 12px 0', borderTop: `1px solid ${colors.outlineVariant}40`, marginTop: 'auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px', borderRadius: '12px',
            background: colors.surfaceContainerHigh, cursor: 'pointer'
          }} onClick={handleLogout}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: colors.primary, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '16px',
              flexShrink: 0
            }}>
              {auth?.user?.name?.[0] ?? 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: colors.onSurface, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {auth?.user?.name ?? 'Alex Rivera'}
              </p>
              <p style={{ fontSize: '11px', color: colors.onSurfaceVariant }}>Admin Access</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        height: '64px', padding: '0 24px',
        marginLeft: '240px',
        position: 'sticky', top: 0, zIndex: 40,
        background: `${colors.surface}cc`, backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.outlineVariant}40`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        {/* Left: breadcrumb + search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: colors.onSurfaceVariant }}>
            <span>Dashboard</span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', margin: '0 4px' }}>chevron_right</span>
            <span style={{ color: colors.onSurface, fontWeight: 700 }}>Overview</span>
          </nav>
          <div style={{ position: 'relative' }}>
            <span className="material-symbols-outlined" style={{
              position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
              color: colors.onSurfaceVariant, fontSize: '20px', pointerEvents: 'none'
            }}>search</span>
            <input
              type="text"
              placeholder="Search resources..."
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              style={{
                paddingLeft: '40px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px',
                background: colors.surfaceContainerHigh, border: 'none',
                borderRadius: '12px', fontSize: '14px',
                width: searchFocus ? '280px' : '220px',
                outline: searchFocus ? `2px solid ${colors.primary}30` : 'none',
                transition: 'width 0.2s, outline 0.2s'
              }}
            />
          </div>
        </div>

        {/* Right: actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{
            width: '40px', height: '40px', borderRadius: '50%', border: 'none',
            background: 'transparent', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', position: 'relative',
            color: colors.onSurfaceVariant
          }}>
            <span className="material-symbols-outlined">notifications</span>
            <span style={{
              position: 'absolute', top: '8px', right: '8px',
              width: '8px', height: '8px', borderRadius: '50%', background: colors.error
            }} />
          </button>
          <button style={{
            width: '40px', height: '40px', borderRadius: '50%', border: 'none',
            background: 'transparent', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: colors.onSurfaceVariant
          }}>
            <span className="material-symbols-outlined">help</span>
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: colors.primary, color: 'white',
            padding: '8px 16px', borderRadius: '12px', border: 'none',
            fontWeight: 600, fontSize: '14px', cursor: 'pointer',
            boxShadow: `0 4px 12px ${colors.primary}30`
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            New Deployment
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <main style={{
        marginLeft: '240px', padding: '24px',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex', flexDirection: 'column', gap: '24px'
      }}>

        {/* ── KPI CARDS ─────────────────────────────────────────────────── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>

          {/* Total Resources */}
          <div className="glass-card kpi-card" style={{ padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '128px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '11px', fontWeight: 500, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Resources</span>
              <span className="material-symbols-outlined" style={{ color: colors.primary, opacity: 0.5 }}>layers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: colors.onSurface }}>24</span>
              <span style={{ fontSize: '12px', color: colors.onSurfaceVariant }}>Active Units</span>
            </div>
          </div>

          {/* Running */}
          <div className="glass-card kpi-card" style={{ padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '128px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '11px', fontWeight: 500, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Running</span>
              <div style={{ position: 'relative', width: '12px', height: '12px' }}>
                <div className="animate-ping" style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: colors.secondaryContainer, opacity: 0.75
                }} />
                <div style={{ position: 'relative', width: '12px', height: '12px', borderRadius: '50%', background: colors.secondaryContainer }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: colors.secondaryContainer }}>18</span>
              <span style={{ fontSize: '12px', color: colors.secondaryContainer, background: colors.secondaryFixed, padding: '2px 10px', borderRadius: '20px' }}>Optimal</span>
            </div>
          </div>

          {/* Monthly Cost */}
          <div className="glass-card kpi-card" style={{ padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '128px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '11px', fontWeight: 500, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Monthly Cost</span>
              <span className="material-symbols-outlined" style={{ color: colors.primary }}>payments</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: colors.onSurface }}>$2,847</span>
              <span style={{ fontSize: '12px', color: colors.primary, display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_upward</span> 12%
              </span>
            </div>
          </div>

          {/* Active Alerts */}
          <div className="glass-card kpi-card" style={{ padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '128px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '11px', fontWeight: 500, color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Active Alerts</span>
              <span className="material-symbols-outlined" style={{ color: colors.tertiaryContainer }}>warning</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: colors.tertiary }}>3</span>
              <span style={{ fontSize: '12px', color: colors.tertiary, background: colors.tertiaryFixed, padding: '2px 10px', borderRadius: '20px' }}>Requires Action</span>
            </div>
          </div>

        </section>

        {/* ── CHARTS + QUICK ACTIONS ────────────────────────────────────── */}
        <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>

          {/* Chart */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: colors.onSurface, marginBottom: '4px' }}>Resource Usage</h3>
                <p style={{ fontSize: '12px', color: colors.onSurfaceVariant }}>Global CPU and Memory telemetry (last 24h)</p>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: colors.primary }} />
                  CPU
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: colors.secondaryFixedDim }} />
                  Memory
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px', position: 'relative' }}>
              {/* Grid lines */}
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  position: 'absolute', left: 0, right: 0,
                  bottom: `${i * 25}%`, borderBottom: `1px solid ${colors.onSurface}15`,
                  pointerEvents: 'none'
                }} />
              ))}
              {chartData.map((val, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                  <div style={{
                    background: `${colors.primary}15`, borderRadius: '6px 6px 0 0',
                    height: `${val}%`, position: 'relative', cursor: 'pointer'
                  }}>
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: colors.primary, borderRadius: '6px 6px 0 0',
                      height: `${Math.min(val + 15, 100)}%`,
                      transition: 'height 0.7s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px', color: colors.onSurfaceVariant }}>
              {['00:00', '06:00', '12:00', '18:00', 'Now'].map(t => <span key={t}>{t}</span>)}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: colors.onSurface }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              {[
                { icon: 'add_circle', label: 'New Deployment' },
                { icon: 'key', label: 'Manage Keys' },
                { icon: 'receipt_long', label: 'View Logs' },
                { icon: 'contact_support', label: 'Contact Support' },
              ].map(action => (
                <button key={action.label} className="action-btn" style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', borderRadius: '12px',
                  background: colors.surfaceContainer, border: 'none',
                  cursor: 'pointer', fontSize: '14px', color: colors.onSurface,
                  transition: 'background 0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="material-symbols-outlined" style={{ color: colors.primary, fontSize: '20px' }}>{action.icon}</span>
                    {action.label}
                  </div>
                  <span className="material-symbols-outlined arrow-icon" style={{ color: colors.onSurfaceVariant, fontSize: '20px' }}>arrow_forward</span>
                </button>
              ))}
            </div>
          </div>

        </section>

        {/* ── RECENT DEPLOYMENTS TABLE ──────────────────────────────────── */}
        <section className="glass-card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{
            padding: '16px 24px', borderBottom: `1px solid ${colors.outlineVariant}30`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: `${colors.surfaceContainerLow}80`
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: colors.onSurface }}>Recent Deployments</h3>
            <button style={{ color: colors.primary, background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
              View All Activity
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: colors.surfaceContainerLow, color: colors.onSurfaceVariant }}>
                  {['Version', 'Resource', 'Type', 'Status', 'Time'].map((h, i) => (
                    <th key={h} style={{
                      padding: '12px 24px', fontWeight: 600, fontSize: '11px',
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      textAlign: i === 4 ? 'right' : 'left'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deployments.map((d, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${colors.outlineVariant}20`, cursor: 'pointer' }}>
                    <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: colors.primary, fontWeight: 600 }}>{d.version}</td>
                    <td style={{ padding: '16px 24px', fontWeight: 500, color: colors.onSurface }}>{d.resource}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{
                        background: d.type === 'Compute' ? colors.primaryFixed : colors.secondaryFixed,
                        color: d.type === 'Compute' ? colors.primary : colors.secondaryContainer,
                        padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 500
                      }}>{d.type}</span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className={d.status === 'Building' ? 'animate-pulse' : ''}>
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: d.status === 'Success' ? colors.secondaryContainer : d.status === 'Building' ? colors.primary : colors.error
                        }} />
                        <span style={{
                          color: d.status === 'Success' ? colors.secondaryContainer : d.status === 'Building' ? colors.primary : colors.error,
                          fontWeight: 500
                        }}>{d.status}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right', color: colors.onSurfaceVariant }}>{d.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  )
}