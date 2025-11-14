import React from 'react'

const ImagesDemo = () => {
  return (
    <div>
      <div style={{ marginBottom: 'var(--p-space-8)' }}>
        <h1 style={{
          fontSize: 'var(--p-font-size-heading-lg)',
          fontWeight: 'var(--p-font-weight-bold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-3) 0'
        }}>
          Images & Media
        </h1>
        <p style={{
          fontSize: 'var(--p-font-size-body-lg)',
          color: 'var(--p-color-text-secondary)',
          margin: 0
        }}>
          Images, avatars, and media handling components.
        </p>
      </div>

      {/* Avatars Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Avatars
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
            Avatar Sizes
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--p-space-4)' }}>
            <s-avatar size="small" initials="AB" />
            <s-avatar size="medium" initials="CD" />
            <s-avatar size="large" initials="EF" />
            <s-avatar size="extra-large" initials="GH" />
          </div>

          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: 'var(--p-space-6) 0 var(--p-space-4) 0'
          }}>
            Avatar Types
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--p-space-4)' }}>
            <s-avatar size="medium" initials="JD" />
            <s-avatar size="medium" customer initials="CU" />
            <s-avatar size="medium" initials="👤" />
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Images
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)'
        }}>
          <s-image
            source="https://via.placeholder.com/400x300/e1e1e2/919eab?text=Product+Image"
            alt="Product placeholder"
            width="400"
            height="300"
          />
        </div>
      </section>
    </div>
  )
}

export default ImagesDemo