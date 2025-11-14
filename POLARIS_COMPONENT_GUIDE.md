# Polaris React Components Reference Guide

This guide provides comprehensive documentation for using Shopify Polaris React components in your project.

## Table of Contents
1. [Setup and Configuration](#setup-and-configuration)
2. [Core Components](#core-components)
3. [Common Component Patterns](#common-component-patterns)
4. [Best Practices](#best-practices)
5. [Migration from Non-existent Web Components](#migration-from-non-existent-web-components)

## Setup and Configuration

### Required Dependencies
```bash
npm install @shopify/polaris
npm install @shopify/polaris-icons  # For icons
```

### Essential Setup
```jsx
import { AppProvider } from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json'

// Wrap your entire app with AppProvider
function App() {
  return (
    <AppProvider i18n={enTranslations}>
      {/* Your app content */}
    </AppProvider>
  )
}
```

### CSS Import
```jsx
import '@shopify/polaris/build/esm/styles.css'
```

## Core Components

### Button Component
```jsx
import { Button } from '@shopify/polaris'

// Variants
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="tertiary">Tertiary Button</Button>
<Button variant="plain">Plain Button</Button>
<Button variant="destructive">Destructive Button</Button>

// States
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>

// Sizes
<Button size="large">Large</Button>
<Button size="medium">Medium</Button>
<Button size="small">Small</Button>

// With icons and actions
<Button
  icon="SettingsMajor"
  onClick={() => console.log('clicked')}
  accessibilityLabel="Settings"
>
  Settings
</Button>
```

### Card Component
```jsx
import { Card } from '@shopify/polaris'

<Card sectioned>
  <Text>Card content goes here</Text>
</Card>

<Card>
  <Card.Section title="Section Title">
    <Text>Section content</Text>
  </Card.Section>
  <Card.Section>
    <Text>Another section</Text>
  </Card.Section>
</Card>
```

### Layout Components
```jsx
import { Page, Layout, Grid, BlockStack, InlineStack } from '@shopify/polaris'

<Page title="Page Title" subtitle="Page subtitle">
  <Layout>
    <Layout.Section>
      <Card>Content</Card>
    </Layout.Section>
    <Layout.Section secondary>
      <Card>Sidebar content</Card>
    </Layout.Section>
  </Layout>
</Page>

// Grid System
<Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
  <Grid.Cell columnSpan={{ xs: 1, sm: 2 }}>
    <Card>Responsive content</Card>
  </Grid.Cell>
</Grid>

// Stack Layouts
<BlockStack gap="400">
  <Text>Stacked vertically</Text>
  <Text>With spacing</Text>
</BlockStack>

<InlineStack gap="400" align="center">
  <Text>Side by side</Text>
  <Text>With alignment</Text>
</InlineStack>
```

### Form Components
```jsx
import {
  TextField,
  Select,
  Checkbox,
  RadioButton,
  FormLayout
} from '@shopify/polaris'

<FormLayout>
  <TextField
    label="Email"
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={setEmail}
    helpText="We'll use this to contact you"
    error={emailError}
  />

  <Select
    label="Country"
    options={[
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' }
    ]}
    value={country}
    onChange={setCountry}
  />

  <Checkbox
    label="I agree to terms"
    checked={agreed}
    onChange={setAgreed}
    helpText="Required to continue"
  />

  <RadioButton
    label="Option 1"
    checked={option === '1'}
    id="option1"
    name="options"
    onChange={() => setOption('1')}
  />
</FormLayout>
```

### Text Components
```jsx
import { Text } from '@shopify/polaris'

<Text variant="headingLg" as="h1">Large Heading</Text>
<Text variant="headingMd" as="h2">Medium Heading</Text>
<Text variant="headingSm" as="h3">Small Heading</Text>

<Text variant="bodyLg">Large body text</Text>
<Text variant="bodyMd">Medium body text</Text>
<Text variant="bodySm">Small body text</Text>

<Text tone="subdued">Subdued text</Text>
<Text tone="critical">Critical text</Text>
<Text tone="warning">Warning text</Text>
<Text tone="success">Success text</Text>
```

### Navigation Components
```jsx
import { Navigation, TopBar, Tabs } from '@shopify/polaris'

// Navigation
<Navigation location="/">
  <Navigation.Section
    items={[
      {
        label: 'Dashboard',
        icon: 'HomeMajor',
        url: '/',
        selected: location === '/'
      }
    ]}
  />
</Navigation>

// Tabs
<Tabs tabs={[
  { id: 'all', content: 'All', panelID: 'all-content' },
  { id: 'active', content: 'Active', panelID: 'active-content' }
]} selected={0} onSelect={handleTabChange}>
  <div>Tab content</div>
</Tabs>
```

## Common Component Patterns

### Page Layout Pattern
```jsx
<Page
  title="Page Title"
  subtitle="Page description"
  primaryAction={{
    content: 'Primary Action',
    onAction: handlePrimaryAction
  }}
  secondaryActions={[
    {
      content: 'Secondary Action',
      onAction: handleSecondaryAction
    }
  ]}
>
  <Layout>
    <Layout.Section>
      <Card>Main content</Card>
    </Layout.Section>
    <Layout.Section secondary>
      <Card>Sidebar content</Card>
    </Layout.Section>
  </Layout>
</Page>
```

### List/Grid Pattern
```jsx
<Grid columns={{ xs: 1, sm: 2, md: 3 }} gap="400">
  {items.map(item => (
    <Card key={item.id}>
      <div style={{ padding: 'var(--p-space-4)' }}>
        <Text variant="headingSm" as="h3">{item.title}</Text>
        <Text>{item.description}</Text>
      </div>
    </Card>
  ))}
</Grid>
```

### Form with Validation Pattern
```jsx
<FormLayout>
  <TextField
    label="Name"
    value={name}
    onChange={setName}
    error={nameError}
    required
  />

  <TextField
    label="Email"
    type="email"
    value={email}
    onChange={setEmail}
    error={emailError}
    required
  />

  <Button
    variant="primary"
    onClick={handleSubmit}
    loading={isSubmitting}
    disabled={!isFormValid}
  >
    Submit
  </Button>
</FormLayout>
```

## Best Practices

### 1. Always Use AppProvider
Wrap your entire app with `AppProvider` and provide translations.

### 2. Use Semantic Components
- Use `Page` for main pages
- Use `Layout` for page structure
- Use `Card` for content containers
- Use `FormLayout` for forms

### 3. Follow Polaris Design Patterns
- Use proper spacing tokens (`gap="400"`, etc.)
- Follow the component hierarchy
- Use proper text variants and tones

### 4. Accessibility
- Always provide accessibility labels for icon buttons
- Use proper semantic HTML structure
- Test keyboard navigation

### 5. Responsive Design
- Use Grid component for responsive layouts
- Test on different screen sizes
- Use appropriate spacing

## Migration from Non-existent Web Components

### ❌ Incorrect (Non-existent Components)
```jsx
<!-- These do NOT exist in @shopify/polaris package -->
<s-button variant="primary">Click me</s-button>
<s-text-field label="Name" />
<s-select placeholder="Choose..." />
```

### ✅ Correct (React Components)
```jsx
import { Button, TextField, Select } from '@shopify/polaris'

<Button variant="primary">Click me</Button>
<TextField label="Name" />
<Select placeholder="Choose..." options={[]} />
```

### Component Name Mapping
| Non-existent | Correct React Component |
|-------------|------------------------|
| `s-button` | `Button` |
| `s-text-field` | `TextField` |
| `s-select` | `Select` |
| `s-checkbox` | `Checkbox` |
| `s-radio-button` | `RadioButton` |
| `s-card` | `Card` |
| `s-link` | `Link` or `UnstyledLink` |

## Quick Reference

### Button Variants
- `primary` - Main action
- `secondary` - Secondary action
- `tertiary` - Less important action
- `plain` - Link-like button
- `destructive` - Destructive action

### Spacing Tokens
- `100` = 0.25rem = 4px
- `200` = 0.5rem = 8px
- `300` = 0.75rem = 12px
- `400` = 1rem = 16px
- `500` = 1.25rem = 20px
- `600` = 1.5rem = 24px

### Text Variants
- `headingXl`, `headingLg`, `headingMd`, `headingSm`, `headingXs`
- `bodyLg`, `bodyMd`, `bodySm`
- `subdued`, `critical`, `warning`, `success`, `new`

### Grid Columns
- Responsive: `{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }`
- Or fixed number: `columns={3}`

## Additional Resources

- [Official Polaris Documentation](https://polaris.shopify.com/components)
- [Component Playground](https://polaris.shopify.com/components/playground)
- [Design Tokens](https://polaris.shopify.com/tokens)

Remember: The `s-` prefixed Web Components shown on some documentation pages do not exist in the npm package. Always use the React components imported from `@shopify/polaris`.