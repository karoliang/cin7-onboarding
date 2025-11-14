import React from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Banner,
  ProgressBar,
  Spinner,
  Badge,
  InlineStack,
  BlockStack,
} from '@shopify/polaris'

const FeedbackDemo = () => {
  return (
    <Page
      title="Feedback"
      subtitle="Messages, progress indicators, and status feedback."
    >
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Banners
              </Text>
              <BlockStack gap="400">
                <Banner status="info">
                  <p>This is an informational banner to provide context or guidance.</p>
                </Banner>

                <Banner status="success">
                  <p>Your changes have been saved successfully!</p>
                </Banner>

                <Banner status="warning">
                  <p>This action will affect 100+ items. Please review before proceeding.</p>
                </Banner>

                <Banner status="critical">
                  <p>There was an error processing your request. Please try again.</p>
                </Banner>
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Progress Indicators
              </Text>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Progress Bars
                </Text>
                <BlockStack gap="400">
                  <div>
                    <InlineStack align="space-between">
                      <Text tone="subdued">Upload Progress</Text>
                      <Text tone="subdued">75%</Text>
                    </InlineStack>
                    <ProgressBar progress={75} />
                  </div>

                  <div>
                    <InlineStack align="space-between">
                      <Text tone="subdued">Processing</Text>
                      <Text tone="subdued">40%</Text>
                    </InlineStack>
                    <ProgressBar progress={40} />
                  </div>
                </BlockStack>
              </div>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Spinners
                </Text>
                <InlineStack gap="400" align="center">
                  <Spinner size="small" />
                  <Spinner size="medium" />
                  <Spinner size="large" />
                  <Text>Loading data...</Text>
                </InlineStack>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Badges
              </Text>
              <InlineStack gap="300" wrap>
                <Badge>New</Badge>
                <Badge tone="success">Active</Badge>
                <Badge tone="attention">Review</Badge>
                <Badge tone="warning">Warning</Badge>
                <Badge tone="critical">Error</Badge>
                <Badge tone="info">Info</Badge>
              </InlineStack>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default FeedbackDemo