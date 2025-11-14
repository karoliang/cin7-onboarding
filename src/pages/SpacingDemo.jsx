import React from 'react'

const SpacingDemo = () => {
  const spacingValues = [
    { name: '0', cssVar: '--p-space-0', value: '0', display: '0px' },
    { name: '1', cssVar: '--p-space-1', value: '0.25rem', display: '4px' },
    { name: '2', cssVar: '--p-space-2', value: '0.5rem', display: '8px' },
    { name: '3', cssVar: '--p-space-3', value: '0.75rem', display: '12px' },
    { name: '4', cssVar: '--p-space-4', value: '1rem', display: '16px' },
    { name: '5', cssVar: '--p-space-5', value: '1.25rem', display: '20px' },
    { name: '6', cssVar: '--p-space-6', value: '1.5rem', display: '24px' },
    { name: '8', cssVar: '--p-space-8', value: '2rem', display: '32px' },
    { name: '10', cssVar: '--p-space-10', value: '2.5rem', display: '40px' },
    { name: '12', cssVar: '--p-space-12', value: '3rem', display: '48px' },
    { name: '16', cssVar: '--p-space-16', value: '4rem', display: '64px' },
    { name: '20', cssVar: '--p-space-20', value: '5rem', display: '80px' },
    { name: '24', cssVar: '--p-space-24', value: '6rem', display: '96px' },
  ]

  const borderRadiusValues = [
    { name: 'Base', cssVar: '--p-border-radius-base', value: '0.375rem', display: '6px' },
    { name: 'Wide', cssVar: '--p-border-radius-wide', value: '0.5rem', display: '8px' },
    { name: 'Full', cssVar: '--p-border-radius-full', value: '9999px', display: 'Pill' },
  ]

  const shadowValues = [
    { name: 'Small', cssVar: '--p-shadow-sm', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
    { name: 'Medium', cssVar: '--p-shadow-md', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
    { name: 'Large', cssVar: '--p-shadow-lg', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
    { name: 'Extra Large', cssVar: '--p-shadow-xl', value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 'var(--p-space-8)' }}>
        <h1 style={{
          fontSize: 'var(--p-font-size-heading-lg)',
          fontWeight: 'var(--p-font-weight-bold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-3) 0'
        }}>
          Spacing
        </h1>
        <p style={{
          fontSize: 'var(--p-font-size-body-lg)',
          color: 'var(--p-color-text-secondary)',
          margin: 0
        }}>
          Margin, padding, and spatial relationships in the design system.
        </p>
      </div>

      {/* Spacing Scale */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Spacing Scale
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <p style={{
            fontSize: 'var(--p-font-size-body-md)',
            color: 'var(--p-color-text-secondary)',
            margin: '0 0 var(--p-space-6) 0'
          }}>
            The spacing scale follows a consistent 4px base unit (0.25rem) for all spacing values.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--p-space-4)'
          }}>
            {spacingValues.map((spacing, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--p-space-3)',
                padding: 'var(--p-space-4)',
                border: '1px solid var(--p-color-border)',
                borderRadius: 'var(--p-border-radius-base)',
                backgroundColor: 'var(--p-color-bg)'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--p-space-2)',
                  marginRight: 'var(--p-space-3)'
                }}>
                  <div style={{
                    width: '60px',
                    height: spacing.value === '0' ? '2px' : spacing.value,
                    backgroundColor: 'var(--p-color-interactive)',
                    borderRadius: 'var(--p-border-radius-base)',
                    minHeight: '2px'
                  }} />
                  <span style={{
                    fontSize: 'var(--p-font-size-body-sm)',
                    color: 'var(--p-color-text-secondary)',
                    fontFamily: 'var(--p-font-family-mono)'
                  }}>
                    {spacing.display}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 'var(--p-font-size-body-md)',
                    fontWeight: 'var(--p-font-weight-medium)',
                    color: 'var(--p-color-text)',
                    marginBottom: 'var(--p-space-1)'
                  }}>
                    Space {spacing.name}
                  </div>
                  <div style={{
                    fontSize: 'var(--p-font-size-body-sm)',
                    color: 'var(--p-color-text-secondary)',
                    fontFamily: 'var(--p-font-family-mono)',
                    marginBottom: 'var(--p-space-1)'
                  }}>
                    {spacing.cssVar}
                  </div>
                  <div style={{
                    fontSize: 'var(--p-font-size-body-sm)',
                    color: 'var(--p-color-text-secondary)',
                    fontFamily: 'var(--p-font-family-mono)'
                  }}>
                    {spacing.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Border Radius
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--p-space-4)'
          }}>
            {borderRadiusValues.map((radius, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--p-space-3)',
                padding: 'var(--p-space-4)',
                border: '1px solid var(--p-color-border)',
                borderRadius: 'var(--p-border-radius-base)',
                backgroundColor: 'var(--p-color-bg)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'var(--p-color-interactive)',
                  borderRadius: radius.value,
                  marginRight: 'var(--p-space-3)',
                  flexShrink: 0
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 'var(--p-font-size-body-md)',
                    fontWeight: 'var(--p-font-weight-medium)',
                    color: 'var(--p-color-text)',
                    marginBottom: 'var(--p-space-1)'
                  }}>
                    {radius.name}
                  </div>
                  <div style={{
                    fontSize: 'var(--p-font-size-body-sm)',
                    color: 'var(--p-color-text-secondary)',
                    fontFamily: 'var(--p-font-family-mono)',
                    marginBottom: 'var(--p-space-1)'
                  }}>
                    {radius.cssVar}
                  </div>
                  <div style={{
                    fontSize: 'var(--p-font-size-body-sm)',
                    color: 'var(--p-color-text-secondary)',
                    fontFamily: 'var(--p-font-family-mono)'
                  }}>
                    {radius.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shadows */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Shadows
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--p-space-6)'
          }}>
            {shadowValues.map((shadow, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--p-space-3)',
                padding: 'var(--p-space-6)',
                border: '1px solid var(--p-color-border)',
                borderRadius: 'var(--p-border-radius-base)',
                backgroundColor: 'var(--p-color-bg)',
                boxShadow: shadow.value
              }}>
                <div style={{
                  width: '80px',
                  height: '40px',
                  backgroundColor: 'var(--p-color-interactive)',
                  borderRadius: 'var(--p-border-radius-base)'
                }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: 'var(--p-font-size-body-md)',
                    fontWeight: 'var(--p-font-weight-medium)',
                    color: 'var(--p-color-text)',
                    marginBottom: 'var(--p-space-1)'
                  }}>
                    {shadow.name}
                  </div>
                  <div style={{
                    fontSize: 'var(--p-font-size-body-sm)',
                    color: 'var(--p-color-text-secondary)',
                    fontFamily: 'var(--p-font-family-mono)'
                  }}>
                    {shadow.cssVar}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Usage Examples
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
            Spacing in Components
          </h3>

          <div style={{
            border: '1px dashed var(--p-color-border)',
            borderRadius: 'var(--p-border-radius-base)',
            padding: 'var(--p-space-6)',
            marginBottom: 'var(--p-space-4)'
          }}>
            <div style={{
              marginBottom: 'var(--p-space-4)',
              paddingBottom: 'var(--p-space-4)',
              borderBottom: '1px solid var(--p-color-border)'
            }}>
              <h4 style={{
                fontSize: 'var(--p-font-size-heading-sm)',
                fontWeight: 'var(--p-font-weight-medium)',
                color: 'var(--p-color-text)',
                margin: '0 0 var(--p-space-2) 0'
              }}>
                Card Header
              </h4>
              <p style={{
                fontSize: 'var(--p-font-size-body-sm)',
                color: 'var(--p-color-text-secondary)',
                margin: 0
              }}>
                margin-bottom: var(--p-space-4); padding-bottom: var(--p-space-4);
              </p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--p-space-3)' }}>
              <s-button variant="primary" size="small">Primary</s-button>
              <s-button variant="secondary" size="small">Secondary</s-button>
            </div>
          </div>

          <p style={{
            fontSize: 'var(--p-font-size-body-sm)',
            color: 'var(--p-color-text-secondary)',
            margin: 0,
            fontFamily: 'var(--p-font-family-mono)'
          }}>
            gap: var(--p-space-3); padding: var(--p-space-6);
          </p>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Best Practices
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-surface-highlight-subdued)',
          border: '1px solid var(--p-color-border-highlight)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)'
        }}>
          <ul style={{
            margin: 0,
            paddingLeft: 'var(--p-space-6)',
            color: 'var(--p-color-text-secondary)'
          }}>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Use the spacing scale consistently for all margins and padding
            </li>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Combine spacing units (e.g., var(--p-space-6) + var(--p-space-2)) when needed
            </li>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Use larger spacing for major layout sections and smaller spacing for component details
            </li>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Consider mobile devices when choosing spacing values
            </li>
            <li>
              Use semantic spacing (e.g., var(--p-space-4) for card padding) consistently across components
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default SpacingDemo