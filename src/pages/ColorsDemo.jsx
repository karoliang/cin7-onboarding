import React from 'react'

const ColorsDemo = () => {
  const colorGroups = [
    {
      title: 'Primary Colors',
      colors: [
        { name: 'Interactive', cssVar: '--p-color-interactive', hex: '#5c6ac4' },
        { name: 'Interactive Hover', cssVar: '--p-color-interactive-hover', hex: '#4650c2' },
        { name: 'Interactive Pressed', cssVar: '--p-color-interactive-pressed', hex: '#3348d3' },
        { name: 'Interactive Disabled', cssVar: '--p-color-interactive-disabled', hex: '#c4cdd5' },
      ]
    },
    {
      title: 'Text Colors',
      colors: [
        { name: 'Text', cssVar: '--p-color-text', hex: '#212b36' },
        { name: 'Text Secondary', cssVar: '--p-color-text-secondary', hex: '#637381' },
        { name: 'Text Disabled', cssVar: '--p-color-text-disabled', hex: '#c4cdd5' },
        { name: 'Text Inverse', cssVar: '--p-color-text-inverse', hex: '#ffffff' },
      ]
    },
    {
      title: 'Background Colors',
      colors: [
        { name: 'Background', cssVar: '--p-color-bg', hex: '#ffffff' },
        { name: 'Surface', cssVar: '--p-color-bg-surface', hex: '#f6f6f7' },
        { name: 'Surface Hover', cssVar: '--p-color-bg-surface-hover', hex: '#f1f1f2' },
        { name: 'Surface Selected', cssVar: '--p-color-surface-selected', hex: '#ebf2ff' },
      ]
    },
    {
      title: 'Border Colors',
      colors: [
        { name: 'Border', cssVar: '--p-color-border', hex: '#dfe3e8' },
        { name: 'Border Hover', cssVar: '--p-color-border-hover', hex: '#c4cdd5' },
        { name: 'Border Active', cssVar: '--p-color-border-active', hex: '#919eab' },
        { name: 'Border Critical', cssVar: '--p-color-border-critical', hex: '#de3618' },
      ]
    },
    {
      title: 'Status Colors',
      colors: [
        { name: 'Success', cssVar: '--p-color-border-success', hex: '#008060' },
        { name: 'Warning', cssVar: '--p-color-border-warning', hex: '#fcd116' },
        { name: 'Critical', cssVar: '--p-color-border-critical', hex: '#de3618' },
        { name: 'Highlight', cssVar: '--p-color-border-highlight', hex: '#4b7a00' },
      ]
    },
    {
      title: 'Surface Status Colors',
      colors: [
        { name: 'Success Subdued', cssVar: '--p-color-surface-success-subdued', hex: '#e4f3ec' },
        { name: 'Warning Subdued', cssVar: '--p-color-surface-warning-subdued', hex: '#fff8e6' },
        { name: 'Critical Subdued', cssVar: '--p-color-surface-critical-subdued', hex: '#fbeae5' },
        { name: 'Highlight Subdued', cssVar: '--p-color-surface-highlight-subdued', hex: '#f0f4e3' },
      ]
    }
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
          Colors
        </h1>
        <p style={{
          fontSize: 'var(--p-font-size-body-lg)',
          color: 'var(--p-color-text-secondary)',
          margin: 0
        }}>
          Color palette, semantic colors, and theme variables.
        </p>
      </div>

      {/* Color Palettes */}
      {colorGroups.map((group, index) => (
        <section key={index} style={{ marginBottom: 'var(--p-space-12)' }}>
          <h2 style={{
            fontSize: 'var(--p-font-size-heading-md)',
            fontWeight: 'var(--p-font-weight-semibold)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-6) 0'
          }}>
            {group.title}
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--p-space-4)'
            }}>
              {group.colors.map((color, colorIndex) => (
                <div key={colorIndex} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--p-space-3)',
                  padding: 'var(--p-space-4)',
                  border: '1px solid var(--p-color-border)',
                  borderRadius: 'var(--p-border-radius-base)',
                  backgroundColor: 'var(--p-color-bg)'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: color.hex,
                    borderRadius: 'var(--p-border-radius-base)',
                    border: '1px solid var(--p-color-border)',
                    flexShrink: 0
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 'var(--p-font-size-body-md)',
                      fontWeight: 'var(--p-font-weight-medium)',
                      color: 'var(--p-color-text)',
                      marginBottom: 'var(--p-space-1)'
                    }}>
                      {color.name}
                    </div>
                    <div style={{
                      fontSize: 'var(--p-font-size-body-sm)',
                      color: 'var(--p-color-text-secondary)',
                      fontFamily: 'var(--p-font-family-mono)',
                      marginBottom: 'var(--p-space-1)'
                    }}>
                      {color.cssVar}
                    </div>
                    <div style={{
                      fontSize: 'var(--p-font-size-body-sm)',
                      color: 'var(--p-color-text-secondary)',
                      fontFamily: 'var(--p-font-family-mono)'
                    }}>
                      {color.hex}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Color Usage Guidelines */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Color Usage Guidelines
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
            Accessibility & Contrast
          </h3>
          <ul style={{
            margin: 0,
            paddingLeft: 'var(--p-space-6)',
            color: 'var(--p-color-text-secondary)'
          }}>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Ensure text has sufficient contrast (4.5:1 minimum) against backgrounds
            </li>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Use semantic colors (success, warning, critical) consistently
            </li>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Don't rely solely on color to convey meaning
            </li>
            <li style={{ marginBottom: 'var(--p-space-2)' }}>
              Use subdued surface colors for backgrounds instead of full-strength colors
            </li>
            <li>
              Test color combinations with both light and dark themes
            </li>
          </ul>
        </div>
      </section>

      {/* Theme Toggle Example */}
      <section>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Theme Support
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)'
        }}>
          <p style={{
            fontSize: 'var(--p-font-size-body-md)',
            color: 'var(--p-color-text-secondary)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            This design system supports both light and dark themes through CSS custom properties. The theme automatically adapts based on user preferences or can be controlled programmatically.
          </p>
          <div style={{
            display: 'flex',
            gap: 'var(--p-space-3)'
          }}>
            <s-button variant="primary">Light Theme</s-button>
            <s-button variant="secondary">Dark Theme</s-button>
            <s-button variant="tertiary">System Default</s-button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ColorsDemo