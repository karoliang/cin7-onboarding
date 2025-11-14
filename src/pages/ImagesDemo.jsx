import React from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Avatar,
  Image,
  InlineStack,
  BlockStack,
} from '@shopify/polaris'

const ImagesDemo = () => {
  return (
    <Page
      title="Images & Media"
      subtitle="Images, avatars, and media handling components."
    >
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Avatars
              </Text>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Avatar Sizes
                </Text>
                <InlineStack gap="400" align="center">
                  <Avatar size="small" initials="AB" />
                  <Avatar size="medium" initials="CD" />
                  <Avatar size="large" initials="EF" />
                  <Avatar size="extraLarge" initials="GH" />
                </InlineStack>
              </div>

              <div style={{ margin: 'var(--p-space-6) 0' }}>
                <Text variant="headingSm" as="h3">
                  Avatar Types
                </Text>
                <InlineStack gap="400" align="center">
                  <Avatar size="medium" initials="JD" />
                  <Avatar size="medium" customer initials="CU" />
                  <Avatar size="medium" initials="👤" />
                </InlineStack>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Images
              </Text>
              <div style={{ margin: 'var(--p-space-4) 0' }}>
                <Image
                  source="https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg"
                  alt="Shopify Logo"
                  width={400}
                  height={300}
                />
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default ImagesDemo