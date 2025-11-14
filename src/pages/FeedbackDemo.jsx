import React from 'react'

const FeedbackDemo = () => {
  return (
    <div>
      <div style={{ marginBottom: 'var(--p-space-8)' }}>
        <h1 style={{
          fontSize: 'var(--p-font-size-heading-lg)',
          fontWeight: 'var(--p-font-weight-bold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-3) 0'
        }}>
          Feedback
        </h1>
        <p style={{
          fontSize: 'var(--p-font-size-body-lg)',
          color: 'var(--p-color-text-secondary)',
          margin: 0
        }}>
          Messages, progress indicators, and status feedback.
        </p>
      </div>

      {/* Banners Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Banners
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <s-banner status="info">
            <p>This is an informational banner to provide context or guidance.</p>
          </s-banner>

          <s-banner status="success" style={{ marginTop: 'var(--p-space-4)' }}>
            <p>Your changes have been saved successfully!</p>
          </s-banner>

          <s-banner status="warning" style={{ marginTop: 'var(--p-space-4)' }}>
            <p>This action will affect 100+ items. Please review before proceeding.</p>
          </s-banner>

          <s-banner status="critical" style={{ marginTop: 'var(--p-space-4)' }}>
            <p>There was an error processing your request. Please try again.</p>
          </s-banner>
        </div>
      </section>

      {/* Progress Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Progress Indicators
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
            Progress Bars
          </h3>

          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--p-space-2)' }}>
              <span style={{
                fontSize: 'var(--p-font-size-body-sm)',
                color: 'var(--p-color-text-secondary)'
              }}>
                Upload Progress
              </span>
              <span style={{
                fontSize: 'var(--p-font-size-body-sm)',
                color: 'var(--p-color-text-secondary)'
              }}>
                75%
              </span>
            </div>
            <s-progress progress={75} />
          </div>

          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--p-space-2)' }}>
              <span style={{
                fontSize: 'var(--p-font-size-body-sm)',
                color: 'var(--p-color-text-secondary)'
              }}>
                Processing
              </span>
              <span style={{
                fontSize: 'var(--p-font-size-body-sm)',
                color: 'var(--p-color-text-secondary)'
              }}>
                40%
              </span>
            </div>
            <s-progress progress={40} />
          </div>

          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: 'var(--p-space-6) 0 var(--p-space-4) 0'
          }}>
            Spinners
          </h3>

          <div style={{ display: 'flex', gap: 'var(--p-space-6)', alignItems: 'center' }}>
            <s-spinner size="small" />
            <s-spinner size="medium" />
            <s-spinner size="large" />
            <span style={{
              fontSize: 'var(--p-font-size-body-md)',
              color: 'var(--p-color-text-secondary)'
            }}>
              Loading data...
            </span>
          </div>
        </div>
      </section>

      {/* Badges Section */}
      <section>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Badges
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--p-space-3)' }}>
            <s-badge>New</s-badge>
            <s-badge status="success">Active</s-badge>
            <s-badge status="attention">Review</s-badge>
            <s-badge status="warning">Warning</s-badge>
            <s-badge status="critical">Error</s-badge>
            <s-badge status="info">Info</s-badge>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeedbackDemo