import React from 'react'
import {
  Card,
  Button,
  ButtonGroup,
  Text,
  Divider,
  InlineStack,
  BlockStack,
  Grid,
  Page,
  Layout,
} from '@shopify/polaris'

const ActionsDemo = () => {
  return (
    <Page
      title="Actions"
      subtitle="Buttons, links, and interactive elements that users can click or tap."
    >
      <Layout>
        <Layout.Section>
          {/* Buttons Section */}
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Buttons
              </Text>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Button Variants
                </Text>
                <div style={{ margin: 'var(--p-space-4) 0' }}>
                  <InlineStack gap="400">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                    <Button variant="plain">Plain</Button>
                  </InlineStack>
                </div>
              </div>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Button States
                </Text>
                <div style={{ margin: 'var(--p-space-4) 0' }}>
                  <InlineStack gap="400">
                    <Button variant="primary" loading>Loading</Button>
                    <Button variant="secondary" disabled>Disabled</Button>
                    <Button variant="destructive">Destructive</Button>
                  </InlineStack>
                </div>
              </div>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Button Sizes
                </Text>
                <div style={{ margin: 'var(--p-space-4) 0' }}>
                  <InlineStack gap="400" align="center">
                    <Button variant="primary" size="large">Large</Button>
                    <Button variant="primary" size="medium">Medium</Button>
                    <Button variant="primary" size="small">Small</Button>
                  </InlineStack>
                </div>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          {/* Button Groups Section */}
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Button Groups
              </Text>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Segmented Buttons
                </Text>
                <div style={{ margin: 'var(--p-space-4) 0' }}>
                  <ButtonGroup segmented>
                    <Button variant="primary">Bold</Button>
                    <Button variant="primary">Italic</Button>
                    <Button variant="primary">Underline</Button>
                  </ButtonGroup>
                </div>
              </div>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Connected Buttons
                </Text>
                <div style={{ margin: 'var(--p-space-4) 0' }}>
                  <ButtonGroup>
                    <Button>Cancel</Button>
                    <Button variant="primary">Save</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          {/* Full Width Buttons */}
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Full Width Buttons
              </Text>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <BlockStack gap="400">
                  <Button variant="primary" fullWidth>
                    Full Width Primary Button
                  </Button>
                  <Button variant="secondary" fullWidth>
                    Full Width Secondary Button
                  </Button>
                  <Button variant="plain" fullWidth>
                    Full Width Plain Button
                  </Button>
                </BlockStack>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          {/* Usage Guidelines */}
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Usage Guidelines
              </Text>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Best Practices
                </Text>
                <div style={{ margin: 'var(--p-space-4) 0' }}>
                  <BlockStack gap="200">
                    <Text as="span">
                      <strong>Primary</strong> buttons for the main action in a section or form
                    </Text>
                    <Text as="span">
                      <strong>Secondary</strong> buttons for alternative actions
                    </Text>
                    <Text as="span">
                      <strong>Tertiary</strong> buttons for less important actions
                    </Text>
                    <Text as="span">
                      <strong>Destructive</strong> buttons only for actions that can't be undone
                    </Text>
                    <Text as="span">
                      Consider the visual hierarchy and limit the number of primary buttons on screen
                    </Text>
                  </BlockStack>
                </div>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default ActionsDemo