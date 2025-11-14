import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation()

  const navigation = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Actions', path: '/actions', icon: '🔘' },
    { name: 'Forms', path: '/forms', icon: '📝' },
    { name: 'Layout', path: '/layout', icon: '📐' },
    { name: 'Navigation', path: '/navigation', icon: '🧭' },
    { name: 'Feedback', path: '/feedback', icon: '💬' },
    { name: 'Images & Media', path: '/images', icon: '🖼️' },
    { name: 'Typography', path: '/typography', icon: '📝' },
    { name: 'Colors', path: '/colors', icon: '🎨' },
    { name: 'Spacing', path: '/spacing', icon: '📏' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Navigation */}
      <nav style={{
        width: '240px',
        backgroundColor: 'var(--p-color-bg-surface)',
        borderRight: '1px solid var(--p-color-border)',
        padding: 'var(--p-space-6)',
        position: 'fixed',
        height: '100vh',
        overflow: 'auto'
      }}>
        <div style={{ marginBottom: 'var(--p-space-8)' }}>
          <h1 style={{
            fontSize: 'var(--p-font-size-heading-md)',
            fontWeight: 'var(--p-font-weight-semibold)',
            color: 'var(--p-color-text)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--p-space-2)'
          }}>
            <span>🛍️</span> Polaris Demo
          </h1>
          <p style={{
            fontSize: 'var(--p-font-size-body-sm)',
            color: 'var(--p-color-text-secondary)',
            margin: 'var(--p-space-2) 0 0 0'
          }}>
            Shopify Design System
          </p>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navigation.map((item) => (
            <li key={item.path} style={{ marginBottom: 'var(--p-space-1)' }}>
              <Link
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--p-space-3)',
                  padding: 'var(--p-space-3) var(--p-space-4)',
                  borderRadius: 'var(--p-border-radius-base)',
                  textDecoration: 'none',
                  color: location.pathname === item.path
                    ? 'var(--p-color-interactive)'
                    : 'var(--p-color-text)',
                  backgroundColor: location.pathname === item.path
                    ? 'var(--p-color-surface-selected)'
                    : 'transparent',
                  fontWeight: location.pathname === item.path
                    ? 'var(--p-font-weight-medium)'
                    : 'var(--p-font-weight-regular)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '1.2em' }}>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: '240px',
        backgroundColor: 'var(--p-color-bg)',
        minHeight: '100vh'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--p-space-8)' }}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout