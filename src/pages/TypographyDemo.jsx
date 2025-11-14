import React from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  InlineStack,
  BlockStack,
} from '@shopify/polaris'

const TypographyDemo = () => {
  return (
    <Page
      title="Typography"
      subtitle="Font families, sizes, weights, and text styles."
    >
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Font Families
              </Text>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <BlockStack gap="400">
                  <div>
                    <Text variant="headingSm" as="h3">
                      Sans Serif
                    </Text>
                    <Text as="p">
                      The quick brown fox jumps over the lazy dog
                    </Text>
                    <Text tone="subdued" as="span" monospace>
                      Font family: var(--p-font-family-sans)
                    </Text>
                  </div>

                  <div>
                    <Text variant="headingSm" as="h3">
                      Mono Space
                    </Text>
                    <Text as="p" monospace>
                      The quick brown fox jumps over the lazy dog
                    </Text>
                    <Text tone="subdued" as="span" monospace>
                      Font family: var(--p-font-family-mono)
                    </Text>
                  </div>
                </BlockStack>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Font Sizes
              </Text>

              <BlockStack gap="400">
                <div>
                  <Text variant="headingLg" as="p">
                    Heading Large
                  </Text>
                  <Text tone="subdued" as="span" monospace>
                    2rem (32px) - var(--p-font-size-heading-lg)
                  </Text>
                </div>

                <div>
                  <Text variant="headingMd" as="p">
                    Heading Medium
                  </Text>
                  <Text tone="subdued" as="span" monospace>
                    1.5rem (24px) - var(--p-font-size-heading-md)
                  </Text>
                </div>

                <div>
                  <Text variant="headingSm" as="p">
                    Heading Small
                  </Text>
                  <Text tone="subdued" as="span" monospace>
                    1.25rem (20px) - var(--p-font-size-heading-sm)
                  </Text>
                </div>

                <div>
                  <Text variant="bodyLg" as="p">
                    Body Large
                  </Text>
                  <Text tone="subdued" as="span" monospace>
                    1rem (16px) - var(--p-font-size-body-lg)
                  </Text>
                </div>

                <div>
                  <Text variant="bodyMd" as="p">
                    Body Medium
                  </Text>
                  <Text tone="subdued" as="span" monospace>
                    0.875rem (14px) - var(--p-font-size-body-md)
                  </Text>
                </div>

                <div>
                  <Text variant="bodySm" as="p">
                    Body Small
                  </Text>
                  <Text tone="subdued" as="span" monospace>
                    0.75rem (12px) - var(--p-font-size-body-sm)
                  </Text>
                </div>
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Font Weights
              </Text>

              <BlockStack gap="400">
                <div>
                  <Text fontWeight="regular" as="p">
                    Regular (400)
                  </Text>
                  <Text tone="subdued" as="span" monospace>
                    var(--p-font-weight-regular)
                  </Text>
                </div>

                <div>
                  <Text fontWeight="medium" as="p">
                    Medium (500)
                  </Text>
                  <Text tone="subdued" as="span" monospace>
                    var(--p-font-weight-medium)
                  </Text>
                </div>

                <div>
                  <Text fontWeight="semibold" as="p">
                    Semibold (600)
                  </Text>
                  <Text tone="subdued" as="span" monospace>
                    var(--p-font-weight-semibold)
                  </Text>
                </div>

                <div>
                  <Text fontWeight="bold" as="p">
                    Bold (700)
                  </Text>
                  <Text tone="subdued" as="span" monospace>
                    var(--p-font-weight-bold)
                  </Text>
                </div>
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Line Heights
              </Text>

              <BlockStack gap="400">
                <div>
                  <Text variant="headingSm" as="h3">
                    Heading Line Height
                  </Text>
                  <Text>
                    This text uses the heading line height (1.25) which is tighter for better readability of headings.
                  </Text>
                  <Text tone="subdued" as="span" monospace>
                    var(--p-line-height-heading) - 1.25
                  </Text>
                </div>

                <div>
                  <Text variant="headingSm" as="h3">
                    Body Line Height
                  </Text>
                  <Text>
                    This text uses the body line height (1.5) which provides better readability for longer paragraphs and body content. The additional spacing makes it easier to read and scan.
                  </Text>
                  <Text tone="subdued" as="span" monospace>
                    var(--p-line-height-body) - 1.5
                  </Text>
                </div>
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default TypographyDemo