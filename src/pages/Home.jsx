import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const categories = [
    {
      title: 'Actions',
      description: 'Buttons, links, and interactive elements that users can click or tap.',
      path: '/actions',
      icon: '🔘',
      components: ['Button', 'Link', 'Icon Button', 'Unstyled Link']
    },
    {
      title: 'Forms',
      description: 'Input fields, selects, checkboxes, and other form controls.',
      path: '/forms',
      icon: '📝',
      components: ['TextField', 'Select', 'Checkbox', 'Radio Button', 'Choice List']
    },
    {
      title: 'Layout',
      description: 'Containers, grids, and structural components for organizing content.',
      path: '/layout',
      icon: '📐',
      components: ['Card', 'Layout', 'Page', 'Grid', 'Stack', 'Inline Stack']
    },
    {
      title: 'Navigation',
      description: 'Navigation patterns and wayfinding components.',
      path: '/navigation',
      icon: '🧭',
      components: ['Tabs', 'Pagination', 'Breadcrumb', 'Navigation']
    },
    {
      title: 'Feedback',
      description: 'Messages, progress indicators, and status feedback.',
      path: '/feedback',
      icon: '💬',
      components: ['Banner', 'Toast', 'Spinner', 'Progress Bar', 'Badge']
    },
    {
      title: 'Images & Media',
      description: 'Images, avatars, and media handling components.',
      path: '/images',
      icon: '🖼️',
      components: ['Image', 'Avatar', 'Video Thumbnail', 'Media Card']
    }
  ]

  const designTokens = [
    { title: 'Typography', path: '/typography', icon: '📝' },
    { title: 'Colors', path: '/colors', icon: '🎨' },
    { title: 'Spacing', path: '/spacing', icon: '📏' }
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--p-space-12)' }}>
        <h1 style={{
          fontSize: 'var(--p-font-size-heading-lg)',
          fontWeight: 'var(--p-font-weight-bold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-4) 0'
        }}>
          Welcome to Polaris Design System
        </h1>
        <p style={{
          fontSize: 'var(--p-font-size-body-lg)',
          color: 'var(--p-color-text-secondary)',
          margin: '0 0 var(--p-space-6) 0',
          maxWidth: '800px'
        }}>
          This is a comprehensive showcase of Shopify's Polaris design system implemented with Web Components.
          Explore all the components, patterns, and design tokens that make up Polaris.
        </p>
        <div style={{
          display: 'flex',
          gap: 'var(--p-space-4)',
          alignItems: 'center'
        }}>
          <s-button variant="primary">Get Started</s-button>
          <s-button variant="secondary">View Documentation</s-button>
        </div>
      </div>

      {/* Component Categories */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Components
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 'var(--p-space-6)'
        }}>
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              style={{
                display: 'block',
                textDecoration: 'none',
                backgroundColor: 'var(--p-color-bg-surface)',
                border: '1px solid var(--p-color-border)',
                borderRadius: 'var(--p-border-radius-base)',
                padding: 'var(--p-space-6)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{ marginBottom: 'var(--p-space-4)' }}>
                <span style={{ fontSize: '2em', marginRight: 'var(--p-space-3)' }}>
                  {category.icon}
                </span>
                <h3 style={{
                  fontSize: 'var(--p-font-size-heading-sm)',
                  fontWeight: 'var(--p-font-weight-semibold)',
                  color: 'var(--p-color-text)',
                  margin: '0',
                  display: 'inline'
                }}>
                  {category.title}
                </h3>
              </div>
              <p style={{
                fontSize: 'var(--p-font-size-body-md)',
                color: 'var(--p-color-text-secondary)',
                margin: '0 0 var(--p-space-4) 0',
                lineHeight: 'var(--p-line-height-body)'
              }}>
                {category.description}
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--p-space-2)'
              }}>
                {category.components.map((component) => (
                  <span
                    key={component}
                    style={{
                      fontSize: 'var(--p-font-size-body-sm)',
                      color: 'var(--p-color-text-secondary)',
                      backgroundColor: 'var(--p-color-bg-surface-hover)',
                      padding: 'var(--p-space-1) var(--p-space-3)',
                      borderRadius: 'var(--p-border-radius-full)',
                      border: '1px solid var(--p-color-border)'
                    }}
                  >
                    {component}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Design Tokens */}
      <section>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Design Tokens
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--p-space-4)'
        }}>
          {designTokens.map((token) => (
            <Link
              key={token.path}
              to={token.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--p-space-3)',
                textDecoration: 'none',
                backgroundColor: 'var(--p-color-bg-surface)',
                border: '1px solid var(--p-color-border)',
                borderRadius: 'var(--p-border-radius-base)',
                padding: 'var(--p-space-4)',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '1.5em' }}>{token.icon}</span>
              <span style={{
                fontSize: 'var(--p-font-size-body-md)',
                fontWeight: 'var(--p-font-weight-medium)',
                color: 'var(--p-color-text)'
              }}>
                {token.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Info */}
      <section style={{
        marginTop: 'var(--p-space-12)',
        backgroundColor: 'var(--p-color-surface-success-subdued)',
        border: '1px solid var(--p-color-border-success)',
        borderRadius: 'var(--p-border-radius-base)',
        padding: 'var(--p-space-6)'
      }}>
        <h3 style={{
          fontSize: 'var(--p-font-size-heading-sm)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-3) 0'
        }}>
          About This Demo
        </h3>
        <p style={{
          fontSize: 'var(--p-font-size-body-md)',
          color: 'var(--p-color-text-secondary)',
          margin: '0 0 var(--p-space-3) 0'
        }}>
          This implementation uses the new Polaris Web Components (s- prefixed components) alongside React for routing and state management.
          The design system includes comprehensive theming, typography, spacing, and component patterns that match the official Shopify Polaris design system.
        </p>
        <p style={{
          fontSize: 'var(--p-font-size-body-sm)',
          color: 'var(--p-color-text-secondary)',
          margin: 0
        }}>
          <strong>Version:</strong> Polaris v13.9.5 (Web Components) |
          <strong>Framework:</strong> React 18 + Vite |
          <strong>Theme:</strong> Light/Dark support
        </p>
      </section>
    </div>
  )
}

export default Home