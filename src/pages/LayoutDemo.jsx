import React from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Button,
  Badge,
  InlineStack,
  BlockStack,
  Grid,
} from '@shopify/polaris'

const LayoutDemo = () => {
  return (
    <Page
      title="Layout"
      subtitle="Containers, grids, and structural components for organizing content."
    >
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Cards
              </Text>

              <Text variant="headingSm" as="h3">
                Card Variants
              </Text>
              <Grid columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }} gap="400">
                <Card>
                  <div style={{ padding: 'var(--p-space-6)' }}>
                    <BlockStack gap="400">
                      <Text variant="headingSm" as="h4">
                        Standard Card
                      </Text>
                      <Text tone="subdued">
                        This is a standard card with a title, content, and actions.
                      </Text>
                      <Button variant="primary" size="small">Action</Button>
                    </BlockStack>
                  </div>
                </Card>

                <Card>
                  <div style={{ padding: 'var(--p-space-6)' }}>
                    <BlockStack gap="400">
                      <Text variant="headingSm" as="h4">
                        Card with Subtitle
                      </Text>
                      <Text tone="subdued" as="span" italic>
                        Secondary information
                      </Text>
                      <Text tone="subdued">
                        This card includes a subtitle to provide additional context.
                      </Text>
                      <InlineStack gap="200">
                        <Button variant="primary" size="small">Primary</Button>
                        <Button variant="secondary" size="small">Secondary</Button>
                      </InlineStack>
                    </BlockStack>
                  </div>
                </Card>

                <Card>
                  <div style={{ padding: 'var(--p-space-6)' }}>
                    <BlockStack gap="400">
                      <InlineStack gap="200">
                        <Text variant="headingSm" as="h4">
                          Card with Status
                        </Text>
                        <Badge tone="success">Active</Badge>
                      </InlineStack>
                      <Text tone="subdued">
                        This card shows status information.
                      </Text>
                    </BlockStack>
                  </div>
                </Card>

                <Card>
                  <div style={{ padding: 'var(--p-space-6)' }}>
                    <BlockStack gap="400">
                      <Text variant="headingSm" as="h4">
                        Interactive Card
                      </Text>
                      <Text tone="subdued">
                        This card can be clicked or have interactive elements.
                      </Text>
                      <Button variant="plain" size="small">View Details</Button>
                    </BlockStack>
                  </div>
                </Card>
              </Grid>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Layout Components
              </Text>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Page Layout Example
                </Text>
                <Card sectioned>
                  <BlockStack gap="400">
                    <div>
                      <Text variant="headingMd" as="h4">
                        Page Title
                      </Text>
                      <Text tone="subdued">
                        Page subtitle or description
                      </Text>
                    </div>
                    <InlineStack align="end">
                      <Button variant="primary">Primary Action</Button>
                    </InlineStack>
                  </BlockStack>
                </Card>
              </div>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Grid Layout
                </Text>
                <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }} gap="400">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card key={item}>
                      <div style={{ padding: 'var(--p-space-4)' }}>
                        <BlockStack gap="200" align="center">
                          <Text variant="headingMd" as="div">
                            Grid Item {item}
                          </Text>
                          <Text tone="subdued" as="span">
                            Responsive grid item
                          </Text>
                        </BlockStack>
                      </div>
                    </Card>
                  ))}
                </Grid>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Stack Layouts
              </Text>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Vertical Stack
                </Text>
                <Card sectioned>
                  <BlockStack gap="400">
                    <Button variant="primary">Button 1</Button>
                    <Button variant="secondary">Button 2</Button>
                    <Button variant="tertiary">Button 3</Button>
                  </BlockStack>
                </Card>
              </div>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Horizontal Stack
                </Text>
                <Card sectioned>
                  <InlineStack gap="400" align="center">
                    <Button variant="primary">Button 1</Button>
                    <Button variant="secondary">Button 2</Button>
                    <Button variant="tertiary">Button 3</Button>
                    <Badge>Additional content</Badge>
                  </InlineStack>
                </Card>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Section Groups
              </Text>

              <Card sectioned>
                <BlockStack gap="400">
                  <Text variant="headingSm" as="h3">
                    Section Header
                  </Text>
                  <Text>
                    This is the content of a section. Sections help organize related content and provide clear visual hierarchy.
                  </Text>
                  <Button variant="secondary" size="small">Learn More</Button>
                </BlockStack>
              </Card>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default LayoutDemo