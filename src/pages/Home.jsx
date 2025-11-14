import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  Button,
  Page,
  Layout,
  Text,
  Badge,
  InlineStack,
  BlockStack,
  Grid,
} from '@shopify/polaris'

const Home = () => {
  const categories = [
    {
      title: 'Actions',
      description: 'Buttons, links, and interactive elements that users can click or tap.',
      path: '/actions',
      components: ['Button', 'Link', 'Icon Button', 'Unstyled Link']
    },
    {
      title: 'Forms',
      description: 'Input fields, selects, checkboxes, and other form controls.',
      path: '/forms',
      components: ['TextField', 'Select', 'Checkbox', 'Radio Button', 'Choice List']
    },
    {
      title: 'Layout',
      description: 'Containers, grids, and structural components for organizing content.',
      path: '/layout',
      components: ['Card', 'Layout', 'Page', 'Grid', 'Stack', 'Inline Stack']
    },
    {
      title: 'Navigation',
      description: 'Navigation patterns and wayfinding components.',
      path: '/navigation',
      components: ['Tabs', 'Pagination', 'Breadcrumb', 'Navigation']
    },
    {
      title: 'Feedback',
      description: 'Messages, progress indicators, and status feedback.',
      path: '/feedback',
      components: ['Banner', 'Toast', 'Spinner', 'Progress Bar', 'Badge']
    },
    {
      title: 'Images & Media',
      description: 'Images, avatars, and media handling components.',
      path: '/images',
      components: ['Image', 'Avatar', 'Video Thumbnail', 'Media Card']
    }
  ]

  const designTokens = [
    { title: 'Typography', path: '/typography' },
    { title: 'Colors', path: '/colors' },
    { title: 'Spacing', path: '/spacing' }
  ]

  return (
    <Page
      title="Welcome to Polaris Design System"
      subtitle="This is a comprehensive showcase of Shopify's Polaris design system implemented with React components. Explore all the components, patterns, and design tokens that make up Polaris."
      primaryAction={{
        content: 'Get Started',
        url: '/actions'
      }}
      secondaryActions={[
        {
          content: 'View Documentation',
          url: 'https://polaris.shopify.com',
          external: true
        }
      ]}
    >
      <Layout>
        <Layout.Section>
          <div style={{ marginBottom: 'var(--p-space-8)' }}>
            <InlineStack gap="400" align="center">
              <Badge tone="info">React Components</Badge>
              <Badge tone="success">Polaris v13.9.5</Badge>
              <Badge tone="attention">Light/Dark Theme</Badge>
            </InlineStack>
          </div>
        </Layout.Section>

        <Layout.Section>
          <Text variant="headingMd" as="h2">
            Components
          </Text>
          <Grid columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }} gap="400">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                style={{ textDecoration: 'none' }}
              >
                <Card>
                  <div style={{ padding: 'var(--p-space-6)' }}>
                    <BlockStack gap="400">
                      <div>
                        <Text variant="headingSm" as="h3">
                          {category.title}
                        </Text>
                      </div>
                      <Text tone="subdued">
                        {category.description}
                      </Text>
                      <InlineStack gap="200" wrap>
                        {category.components.map((component) => (
                          <Badge key={component} tone="new">
                            {component}
                          </Badge>
                        ))}
                      </InlineStack>
                    </BlockStack>
                  </div>
                </Card>
              </Link>
            ))}
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Text variant="headingMd" as="h2">
            Design Tokens
          </Text>
          <Grid columns={{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }} gap="400">
            {designTokens.map((token) => (
              <Link
                key={token.path}
                to={token.path}
                style={{ textDecoration: 'none' }}
              >
                <Card>
                  <div style={{ padding: 'var(--p-space-4)' }}>
                    <Text variant="bodyLg" as="span" fontWeight="medium">
                      {token.title}
                    </Text>
                  </div>
                </Card>
              </Link>
            ))}
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <BlockStack gap="400">
                <Text variant="headingSm" as="h3">
                  About This Demo
                </Text>
                <Text>
                  This implementation uses the official Polaris React components with React 18 and Vite for development.
                  The design system includes comprehensive theming, typography, spacing, and component patterns that match the official Shopify Polaris design system.
                </Text>
                <Text tone="subdued" as="span">
                  <strong>Version:</strong> Polaris v13.9.5 (React Components) |
                  <strong>Framework:</strong> React 18 + Vite |
                  <strong>Theme:</strong> Light/Dark support
                </Text>
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default Home