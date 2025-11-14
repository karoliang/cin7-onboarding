import React from 'react'

const NavigationDemo = () => {
  return (
    <div>
      <div style={{ marginBottom: 'var(--p-space-8)' }}>
        <h1 style={{
          fontSize: 'var(--p-font-size-heading-lg)',
          fontWeight: 'var(--p-font-weight-bold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-3) 0'
        }}>
          Navigation
        </h1>
        <p style={{
          fontSize: 'var(--p-font-size-body-lg)',
          color: 'var(--p-color-text-secondary)',
          margin: 0
        }}>
          Navigation patterns and wayfinding components.
        </p>
      </div>

      {/* Tabs Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Tabs
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <s-tabs>
            <s-tab selected>All Products</s-tab>
            <s-tab>Active</s-tab>
            <s-tab>Draft</s-tab>
            <s-tab>Archived</s-tab>
          </s-tabs>

          <div style={{
            marginTop: 'var(--p-space-6)',
            padding: 'var(--p-space-6)',
            backgroundColor: 'var(--p-color-bg)',
            border: '1px solid var(--p-color-border)',
            borderRadius: 'var(--p-border-radius-base)'
          }}>
            <p style={{
              fontSize: 'var(--p-font-size-body-md)',
              color: 'var(--p-color-text-secondary)',
              margin: 0
            }}>
              Tab content area for "All Products"
            </p>
          </div>
        </div>
      </section>

      {/* Pagination Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Pagination
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--p-space-4)' }}>
            <span style={{
              fontSize: 'var(--p-font-size-body-sm)',
              color: 'var(--p-color-text-secondary)'
            }}>
              Showing 1-10 of 100 results
            </span>
            <s-pagination
              has-previous
              has-next
              previous-tooltip="Previous page"
              next-tooltip="Next page"
            />
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <section>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Breadcrumbs
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)'
        }}>
          <s-breadcrumb>
            <s-breadcrumb-item>Home</s-breadcrumb-item>
            <s-breadcrumb-item>Products</s-breadcrumb-item>
            <s-breadcrumb-item>T-Shirts</s-breadcrumb-item>
            <s-breadcrumb-item selected>Classic Tee</s-breadcrumb-item>
          </s-breadcrumb>
        </div>
      </section>
    </div>
  )
}

export default NavigationDemo