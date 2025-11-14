import React, { useState } from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Tabs,
  Pagination,
  InlineStack,
  BlockStack,
} from '@shopify/polaris'

const NavigationDemo = () => {
  const tabs = [
    { id: 'all', content: 'All Products', accessibilityLabel: 'All products', panelID: 'all-products' },
    { id: 'active', content: 'Active', accessibilityLabel: 'Active products', panelID: 'active-products' },
    { id: 'draft', content: 'Draft', accessibilityLabel: 'Draft products', panelID: 'draft-products' },
    { id: 'archived', content: 'Archived', accessibilityLabel: 'Archived products', panelID: 'archived-products' },
  ]

  const [selected, setSelected] = useState(0)

  return (
    <Page
      title="Navigation"
      subtitle="Navigation patterns and wayfinding components."
    >
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Tabs
              </Text>
              <Tabs tabs={tabs} selected={selected} onSelect={setSelected}>
                <Card.Section title={tabs[selected].content}>
                  <Text>
                    Tab content area for "{tabs[selected].content}"
                  </Text>
                </Card.Section>
              </Tabs>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Pagination
              </Text>
              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <InlineStack align="space-between">
                  <Text tone="subdued">
                    Showing 1-10 of 100 results
                  </Text>
                  <Pagination
                    hasPrevious
                    hasNext
                    label="Previous page"
                    onNext={() => {}}
                    onPrevious={() => {}}
                  />
                </InlineStack>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Breadcrumbs
              </Text>
              <div style={{ margin: 'var(--p-space-4) 0' }}>
                <InlineStack gap="200">
                  <Text>Home</Text>
                  <Text>/</Text>
                  <Text>Products</Text>
                  <Text>/</Text>
                  <Text>T-Shirts</Text>
                  <Text>/</Text>
                  <Text fontWeight="medium">Classic Tee</Text>
                </InlineStack>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default NavigationDemo