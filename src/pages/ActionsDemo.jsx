import React from 'react'

const ActionsDemo = () => {
  return (
    <div>
      <div style={{ marginBottom: 'var(--p-space-8)' }}>
        <h1 style={{
          fontSize: 'var(--p-font-size-heading-lg)',
          fontWeight: 'var(--p-font-weight-bold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-3) 0'
        }}>
          Actions
        </h1>
        <p style={{
          fontSize: 'var(--p-font-size-body-lg)',
          color: 'var(--p-color-text-secondary)',
          margin: 0
        }}>
          Buttons, links, and interactive elements that users can click or tap.
        </p>
      </div>

      {/* Buttons Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Buttons
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            Button Variants
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--p-space-3)',
            marginBottom: 'var(--p-space-6)'
          }}>
            <s-button variant="primary">Primary</s-button>
            <s-button variant="secondary">Secondary</s-button>
            <s-button variant="tertiary">Tertiary</s-button>
            <s-button variant="plain">Plain</s-button>
          </div>

          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            Button States
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--p-space-3)',
            marginBottom: 'var(--p-space-6)'
          }}>
            <s-button variant="primary" loading>Loading</s-button>
            <s-button variant="secondary" disabled>Disabled</s-button>
            <s-button variant="destructive">Destructive</s-button>
          </div>

          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            Button Sizes
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--p-space-3)',
            alignItems: 'center'
          }}>
            <s-button variant="primary" size="large">Large</s-button>
            <s-button variant="primary" size="medium">Medium</s-button>
            <s-button variant="primary" size="small">Small</s-button>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Links
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            Link Types
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--p-space-4)',
            marginBottom: 'var(--p-space-6)'
          }}>
            <s-link href="#">Standard Link</s-link>
            <s-link href="#" external>External Link</s-link>
            <s-link href="#" monochrome>Monochrome Link</s-link>
          </div>

          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            Link Colors
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--p-space-4)',
            alignItems: 'center'
          }}>
            <s-link href="#" color="interactive">Interactive</s-link>
            <s-link href="#" color="success">Success</s-link>
            <s-link href="#" color="warning">Warning</s-link>
            <s-link href="#" color="critical">Critical</s-link>
          </div>
        </div>
      </section>

      {/* Icon Buttons Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Icon Buttons
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            Icon Button Variants
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--p-space-3)',
            marginBottom: 'var(--p-space-6)'
          }}>
            <s-icon-button variant="primary" accessibility-label="Settings">⚙️</s-icon-button>
            <s-icon-button variant="secondary" accessibility-label="Search">🔍</s-icon-button>
            <s-icon-button variant="tertiary" accessibility-label="Menu">📱</s-icon-button>
            <s-icon-button variant="plain" accessibility-label="Info">ℹ️</s-icon-button>
          </div>

          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            Icon Button Sizes
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--p-space-3)',
            alignItems: 'center'
          }}>
            <s-icon-button variant="primary" size="large" accessibility-label="Large">🔍</s-icon-button>
            <s-icon-button variant="primary" size="medium" accessibility-label="Medium">🔍</s-icon-button>
            <s-icon-button variant="primary" size="small" accessibility-label="Small">🔍</s-icon-button>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Usage Guidelines
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-surface-highlight-subdued)',
          border: '1px solid var(--p-color-border-highlight)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)'
        }}>
          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            Best Practices
          </h3>
          <ul style={{
            margin: 0,
            paddingLeft: 'var(--p-space-6)',
            color: 'var(--p-color-text-secondary)'
          }}>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Use <strong>Primary</strong> buttons for the main action in a section or form
            </li>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Use <strong>Secondary</strong> buttons for alternative actions
            </li>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Use <strong>Tertiary</strong> buttons for less important actions
            </li>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Use <strong>Destructive</strong> buttons only for actions that can't be undone
            </li>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Always provide accessibility labels for icon buttons
            </li>
            <li>
              Consider the visual hierarchy and limit the number of primary buttons on screen
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default ActionsDemo