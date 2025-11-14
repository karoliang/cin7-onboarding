import React from 'react'

const TypographyDemo = () => {
  return (
    <div>
      <div style={{ marginBottom: 'var(--p-space-8)' }}>
        <h1 style={{
          fontSize: 'var(--p-font-size-heading-lg)',
          fontWeight: 'var(--p-font-weight-bold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-3) 0'
        }}>
          Typography
        </h1>
        <p style={{
          fontSize: 'var(--p-font-size-body-lg)',
          color: 'var(--p-color-text-secondary)',
          margin: 0
        }}>
          Font families, sizes, weights, and text styles.
        </p>
      </div>

      {/* Font Families */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Font Families
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <h3 style={{
              fontSize: 'var(--p-font-size-heading-sm)',
              fontWeight: 'var(--p-font-weight-medium)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Sans Serif
            </h3>
            <p style={{
              fontFamily: 'var(--p-font-family-sans)',
              fontSize: 'var(--p-font-size-body-lg)',
              color: 'var(--p-color-text)',
              margin: 0
            }}>
              The quick brown fox jumps over the lazy dog
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 'var(--p-space-2) 0 0 0'
            }}>
              Font family: var(--p-font-family-sans)
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: 'var(--p-font-size-heading-sm)',
              fontWeight: 'var(--p-font-weight-medium)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Mono Space
            </h3>
            <p style={{
              fontFamily: 'var(--p-font-family-mono)',
              fontSize: 'var(--p-font-size-body-lg)',
              color: 'var(--p-color-text)',
              margin: 0
            }}>
              The quick brown fox jumps over the lazy dog
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 'var(--p-space-2) 0 0 0'
            }}>
              Font family: var(--p-font-family-mono)
            </p>
          </div>
        </div>
      </section>

      {/* Font Sizes */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Font Sizes
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <p style={{
              fontSize: 'var(--p-font-size-heading-lg)',
              fontWeight: 'var(--p-font-weight-bold)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Heading Large
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              2rem (32px) - var(--p-font-size-heading-lg)
            </p>
          </div>

          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <p style={{
              fontSize: 'var(--p-font-size-heading-md)',
              fontWeight: 'var(--p-font-weight-semibold)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Heading Medium
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              1.5rem (24px) - var(--p-font-size-heading-md)
            </p>
          </div>

          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <p style={{
              fontSize: 'var(--p-font-size-heading-sm)',
              fontWeight: 'var(--p-font-weight-medium)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Heading Small
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              1.25rem (20px) - var(--p-font-size-heading-sm)
            </p>
          </div>

          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <p style={{
              fontSize: 'var(--p-font-size-body-lg)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Body Large
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              1rem (16px) - var(--p-font-size-body-lg)
            </p>
          </div>

          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <p style={{
              fontSize: 'var(--p-font-size-body-md)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Body Medium
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              0.875rem (14px) - var(--p-font-size-body-md)
            </p>
          </div>

          <div>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Body Small
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              0.75rem (12px) - var(--p-font-size-body-sm)
            </p>
          </div>
        </div>
      </section>

      {/* Font Weights */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Font Weights
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <p style={{
              fontSize: 'var(--p-font-size-body-lg)',
              fontWeight: 'var(--p-font-weight-regular)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Regular (400)
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              var(--p-font-weight-regular)
            </p>
          </div>

          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <p style={{
              fontSize: 'var(--p-font-size-body-lg)',
              fontWeight: 'var(--p-font-weight-medium)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Medium (500)
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              var(--p-font-weight-medium)
            </p>
          </div>

          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <p style={{
              fontSize: 'var(--p-font-size-body-lg)',
              fontWeight: 'var(--p-font-weight-semibold)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Semibold (600)
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              var(--p-font-weight-semibold)
            </p>
          </div>

          <div>
            <p style={{
              fontSize: 'var(--p-font-size-body-lg)',
              fontWeight: 'var(--p-font-weight-bold)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Bold (700)
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              var(--p-font-weight-bold)
            </p>
          </div>
        </div>
      </section>

      {/* Line Heights */}
      <section>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Line Heights
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)'
        }}>
          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <h3 style={{
              fontSize: 'var(--p-font-size-heading-sm)',
              fontWeight: 'var(--p-font-weight-medium)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Heading Line Height
            </h3>
            <p style={{
              fontSize: 'var(--p-font-size-body-md)',
              lineHeight: 'var(--p-line-height-heading)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              This text uses the heading line height (1.25) which is tighter for better readability of headings.
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              var(--p-line-height-heading) - 1.25
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: 'var(--p-font-size-heading-sm)',
              fontWeight: 'var(--p-font-weight-medium)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              Body Line Height
            </h3>
            <p style={{
              fontSize: 'var(--p-font-size-body-md)',
              lineHeight: 'var(--p-line-height-body)',
              color: 'var(--p-color-text)',
              margin: '0 0 var(--p-space-2) 0'
            }}>
              This text uses the body line height (1.5) which provides better readability for longer paragraphs and body content. The additional spacing makes it easier to read and scan.
            </p>
            <p style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              var(--p-line-height-body) - 1.5
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TypographyDemo