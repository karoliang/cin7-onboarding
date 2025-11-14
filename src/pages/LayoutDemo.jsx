import React from 'react'

const LayoutDemo = () => {
  return (
    <div>
      <div style={{ marginBottom: 'var(--p-space-8)' }}>
        <h1 style={{
          fontSize: 'var(--p-font-size-heading-lg)',
          fontWeight: 'var(--p-font-weight-bold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-3) 0'
        }}>
          Layout
        </h1>
        <p style={{
          fontSize: 'var(--p-font-size-body-lg)',
          color: 'var(--p-color-text-secondary)',
          margin: 0
        }}>
          Containers, grids, and structural components for organizing content.
        </p>
      </div>

      {/* Cards Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Cards
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
            Card Variants
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--p-space-6)' }}>
            <s-card>
              <h4 style={{
                fontSize: 'var(--p-font-size-heading-sm)',
                fontWeight: 'var(--p-font-weight-semibold)',
                color: 'var(--p-color-text)',
                margin: '0 0 var(--p-space-3) 0'
              }}>
                Standard Card
              </h4>
              <p style={{
                fontSize: 'var(--p-font-size-body-md)',
                color: 'var(--p-color-text-secondary)',
                margin: '0 0 var(--p-space-4) 0'
              }}>
                This is a standard card with a title, content, and actions.
              </p>
              <s-button variant="primary" size="small">Action</s-button>
            </s-card>

            <s-card>
              <h4 style={{
                fontSize: 'var(--p-font-size-heading-sm)',
                fontWeight: 'var(--p-font-weight-semibold)',
                color: 'var(--p-color-text)',
                margin: '0 0 var(--p-space-3) 0'
              }}>
                Card with Subtitle
              </h4>
              <p style={{
                fontSize: 'var(--p-font-size-body-sm)',
                color: 'var(--p-color-text-secondary)',
                margin: '0 0 var(--p-space-4) 0',
                fontStyle: 'italic'
              }}>
                Secondary information
              </p>
              <p style={{
                fontSize: 'var(--p-font-size-body-md)',
                color: 'var(--p-color-text-secondary)',
                margin: '0 0 var(--p-space-4) 0'
              }}>
                This card includes a subtitle to provide additional context.
              </p>
              <div style={{ display: 'flex', gap: 'var(--p-space-2)' }}>
                <s-button variant="primary" size="small">Primary</s-button>
                <s-button variant="secondary" size="small">Secondary</s-button>
              </div>
            </s-card>

            <s-card>
              <h4 style={{
                fontSize: 'var(--p-font-size-heading-sm)',
                fontWeight: 'var(--p-font-weight-semibold)',
                color: 'var(--p-color-text)',
                margin: '0 0 var(--p-space-3) 0'
              }}>
                Card with Status
              </h4>
              <div style={{
                display: 'inline-block',
                backgroundColor: 'var(--p-color-surface-success-subdued)',
                color: 'var(--p-color-text-success)',
                padding: 'var(--p-space-1) var(--p-space-3)',
                borderRadius: 'var(--p-border-radius-full)',
                fontSize: 'var(--p-font-size-body-sm)',
                marginBottom: 'var(--p-space-3)'
              }}>
                ✅ Active
              </div>
              <p style={{
                fontSize: 'var(--p-font-size-body-md)',
                color: 'var(--p-color-text-secondary)',
                margin: '0 0 var(--p-space-4) 0'
              }}>
                This card shows status information.
              </p>
            </s-card>
          </div>
        </div>
      </section>

      {/* Layout Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Layout Components
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
            Page Layout
          </h3>

          <div style={{
            border: '1px dashed var(--p-color-border)',
            borderRadius: 'var(--p-border-radius-base)',
            padding: 'var(--p-space-6)',
            marginBottom: 'var(--p-space-6)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--p-space-4)',
              paddingBottom: 'var(--p-space-4)',
              borderBottom: '1px solid var(--p-color-border)'
            }}>
              <div>
                <h4 style={{
                  fontSize: 'var(--p-font-size-heading-md)',
                  fontWeight: 'var(--p-font-weight-semibold)',
                  color: 'var(--p-color-text)',
                  margin: '0 0 var(--p-space-1) 0'
                }}>
                  Page Title
                </h4>
                <p style={{
                  fontSize: 'var(--p-font-size-body-md)',
                  color: 'var(--p-color-text-secondary)',
                  margin: 0
                }}>
                  Page subtitle or description
                </p>
              </div>
              <s-button variant="primary">Primary Action</s-button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 300px',
              gap: 'var(--p-space-6)'
            }}>
              <div>
                <h5 style={{
                  fontSize: 'var(--p-font-size-heading-sm)',
                  fontWeight: 'var(--p-font-weight-medium)',
                  color: 'var(--p-color-text)',
                  margin: '0 0 var(--p-space-3) 0'
                }}>
                  Main Content
                </h5>
                <p style={{
                  fontSize: 'var(--p-font-size-body-md)',
                  color: 'var(--p-color-text-secondary)',
                  margin: 0
                }}>
                  This is the main content area. It can contain forms, cards, lists, or any other components.
                </p>
              </div>
              <div>
                <h5 style={{
                  fontSize: 'var(--p-font-size-heading-sm)',
                  fontWeight: 'var(--p-font-weight-medium)',
                  color: 'var(--p-color-text)',
                  margin: '0 0 var(--p-space-3) 0'
                }}>
                  Sidebar
                </h5>
                <p style={{
                  fontSize: 'var(--p-font-size-body-md)',
                  color: 'var(--p-color-text-secondary)',
                  margin: 0
                }}>
                  Secondary content or navigation.
                </p>
              </div>
            </div>
          </div>

          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            Grid Layout
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--p-space-4)',
            border: '1px dashed var(--p-color-border)',
            borderRadius: 'var(--p-border-radius-base)',
            padding: 'var(--p-space-6)'
          }}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} style={{
                backgroundColor: 'var(--p-color-bg-surface-hover)',
                border: '1px solid var(--p-color-border)',
                borderRadius: 'var(--p-border-radius-base)',
                padding: 'var(--p-space-4)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: 'var(--p-font-size-heading-md)',
                  fontWeight: 'var(--p-font-weight-semibold)',
                  color: 'var(--p-color-text)',
                  marginBottom: 'var(--p-space-2)'
                }}>
                  Grid Item {item}
                </div>
                <div style={{
                  fontSize: 'var(--p-font-size-body-sm)',
                  color: 'var(--p-color-text-secondary)'
                }}>
                  Responsive grid item
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stacks Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Stack Layouts
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
            Vertical Stack
          </h3>

          <div style={{
            border: '1px dashed var(--p-color-border)',
            borderRadius: 'var(--p-border-radius-base)',
            padding: 'var(--p-space-6)',
            marginBottom: 'var(--p-space-6)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--p-space-4)' }}>
              <s-button variant="primary">Button 1</s-button>
              <s-button variant="secondary">Button 2</s-button>
              <s-button variant="tertiary">Button 3</s-button>
            </div>
          </div>

          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            Horizontal Stack
          </h3>

          <div style={{
            border: '1px dashed var(--p-color-border)',
            borderRadius: 'var(--p-border-radius-base)',
            padding: 'var(--p-space-6)'
          }}>
            <div style={{ display: 'flex', gap: 'var(--p-space-3)', alignItems: 'center' }}>
              <s-button variant="primary">Button 1</s-button>
              <s-button variant="secondary">Button 2</s-button>
              <s-button variant="tertiary">Button 3</s-button>
              <div style={{
                padding: 'var(--p-space-2) var(--p-space-4)',
                backgroundColor: 'var(--p-color-bg-surface-hover)',
                borderRadius: 'var(--p-border-radius-base)',
                fontSize: 'var(--p-font-size-body-sm)'
              }}>
                Additional content
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Groups */}
      <section>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Section Groups
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)'
        }}>
          <s-section>
            <s-section-header>
              <h3 style={{
                fontSize: 'var(--p-font-size-heading-md)',
                fontWeight: 'var(--p-font-weight-semibold)',
                color: 'var(--p-color-text)',
                margin: 0
              }}>
                Section Header
              </h3>
            </s-section-header>
            <s-section-content>
              <p style={{
                fontSize: 'var(--p-font-size-body-md)',
                color: 'var(--p-color-text-secondary)',
                margin: '0 0 var(--p-space-4) 0'
              }}>
                This is the content of a section. Sections help organize related content and provide clear visual hierarchy.
              </p>
              <s-button variant="secondary" size="small">Learn More</s-button>
            </s-section-content>
          </s-section>
        </div>
      </section>
    </div>
  )
}

export default LayoutDemo