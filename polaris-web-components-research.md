# Shopify Polaris Web Components - Comprehensive Setup Guide

## Summary

Shopify Polaris Web Components were officially released on October 1, 2025, replacing the deprecated Polaris React library. These web components provide a technology-agnostic foundation that works with any framework (React, Vue, Angular) as well as plain JavaScript and server-rendered sites.

## Key Information

- **Release Date**: October 1, 2025
- **Status**: Polaris React is now deprecated
- **Technology**: Standard Web Components (Custom Elements)
- **Framework Agnostic**: Works with React, Vue, Angular, or vanilla JavaScript
- **License**: Custom MIT-based license (requires integration with Shopify software)

## Installation and Setup

### 1. Package Installation

The Polaris Web Components are distributed through the main `@shopify/polaris` package. The web components use an `s-` prefix (e.g., `<s-button>`, `<s-link>`).

```bash
# Install the main Polaris package
npm install @shopify/polaris

# Install type definitions for TypeScript
npm install @shopify/polaris-types --save-dev

# Install icons (if needed)
npm install @shopify/polaris-icons

# Install design tokens (for theming)
npm install @shopify/polaris-tokens
```

### 2. React/Vite Project Setup

#### Basic Vite + React Setup

1. **Create a new Vite React project:**
```bash
npm create vite@latest polaris-web-components-demo -- --template react-ts
cd polaris-web-components-demo
```

2. **Install dependencies:**
```bash
npm install @shopify/polaris @shopify/polaris-types @shopify/polaris-icons
```

3. **Configure Vite (vite.config.ts):**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@shopify/polaris']
  }
})
```

4. **Update main.tsx to import web components:**
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import Polaris Web Components
import '@shopify/polaris/dist/polaris.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 3. Integration Patterns

#### Vanilla JavaScript/HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Polaris Web Components Demo</title>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shopify/polaris/dist/polaris.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shopify/polaris/dist/polaris.css">
</head>
<body>
    <s-button>Click me</s-button>
    <s-card>
        <s-heading element="h2">Card Title</s-heading>
        <p>This is a card component.</p>
    </s-card>
</body>
</html>
```

#### React Integration
```tsx
import React from 'react'
import { useEffect } from 'react'

// Import the web components bundle
import '@shopify/polaris/dist/polaris.js'
import '@shopify/polaris/dist/polaris.css'

function App() {
  useEffect(() => {
    // Custom elements might need to be defined
    import('@shopify/polaris')
  }, [])

  return (
    <div className="App">
      <s-button onClick={() => alert('Button clicked!')}>
        Click me
      </s-button>

      <s-card sectioned>
        <s-heading element="h2">Welcome to Polaris Web Components</s-heading>
        <s-text as="p">
          This is a demonstration of using Shopify Polaris Web Components in a React application.
        </s-text>
      </s-card>

      <s-form>
        <s-text-field
          label="Name"
          placeholder="Enter your name"
          onChange={(e: any) => console.log(e.target.value)}
        />
        <s-button submit>Submit</s-button>
      </s-form>
    </div>
  )
}

export default App
```

#### TypeScript Support
```typescript
// types/polaris.d.ts
import { HTMLElementEvent } from '@shopify/polaris-types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      's-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        onClick?: (e: HTMLElementEvent<HTMLButtonElement>) => void;
        children?: React.ReactNode;
        variant?: 'primary' | 'secondary' | 'destructive';
        size?: 'small' | 'medium' | 'large';
        disabled?: boolean;
        loading?: boolean;
        submit?: boolean;
      };
      's-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        children?: React.ReactNode;
        sectioned?: boolean;
        title?: string;
      };
      's-heading': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        children?: React.ReactNode;
        element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      };
      's-text': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        children?: React.ReactNode;
        as?: 'p' | 'span' | 'div';
        variant?: 'headingMd' | 'bodyMd' | 'bodySm';
      };
      's-text-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        label?: string;
        placeholder?: string;
        value?: string;
        onChange?: (e: any) => void;
        type?: string;
        error?: string;
        disabled?: boolean;
      };
      's-form': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        children?: React.ReactNode;
        onSubmit?: (e: any) => void;
      };
    }
  }
}
```

### 4. Theming and Customization

#### CSS Custom Properties for Theming
```css
/* styles/theme.css */
:root {
  /* Primary Colors */
  --p-surface: #ffffff;
  --p-surface-hovered: #f6f6f7;
  --p-surface-pressed: #e1e3e5;
  --p-surface-depressed: #c3c7ca;

  /* Interactive Colors */
  --p-interactive: #202223;
  --p-interactive-hovered: #5c5f62;
  --p-interactive-pressed: #232324;
  --p-interactive-disabled: #c3c7ca;

  /* Primary Brand Colors */
  --p-primary: #4f46e5;
  --p-primary-hovered: #4338ca;
  --p-primary-pressed: #3730a3;
  --p-primary-subdued: #f0f9ff;

  /* Background Colors */
  --p-background: #fcfcfd;
  --p-background-hovered: #f6f6f7;
  --p-background-pressed: #e1e3e5;
  --p-background-subdued: #f6f6f7;

  /* Text Colors */
  --p-text: #202223;
  --p-text-subdued: #42474d;
  --p-text-disabled: #c3c7ca;

  /* Border Colors */
  --p-border: #c3c7ca;
  --p-border-hovered: #91969d;
  --p-border-subdued: #e1e3e5;

  /* Shadow */
  --p-shadow: rgba(0, 0, 0, 0.1);
  --p-shadow-from-above: rgba(0, 0, 0, 0.15);
}

/* Dark theme */
[data-theme="dark"] {
  --p-surface: #1c1c1e;
  --p-surface-hovered: #2c2c2e;
  --p-surface-pressed: #3a3a3c;
  --p-surface-depressed: #48484a;

  --p-interactive: #ffffff;
  --p-interactive-hovered: #c7c7cc;
  --p-interactive-pressed: #8e8e93;
  --p-interactive-disabled: #48484a;

  --p-background: #000000;
  --p-background-hovered: #1c1c1e;
  --p-background-pressed: #2c2c2e;
  --p-background-subdued: #1c1c1e;

  --p-text: #ffffff;
  --p-text-subdued: #c7c7cc;
  --p-text-disabled: #48484a;

  --p-border: #48484a;
  --p-border-hovered: #636366;
  --p-border-subdued: #38383a;

  --p-shadow: rgba(0, 0, 0, 0.3);
  --p-shadow-from-above: rgba(0, 0, 0, 0.5);
}
```

#### Dynamic Theme Switching
```tsx
import React, { useState, useEffect } from 'react'
import '@shopify/polaris/dist/polaris.css'
import './styles/theme.css'

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div>
      <s-button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </s-button>
      {children}
    </div>
  )
}
```

### 5. Available Components (Based on Research)

Based on the research, the following web components are available with the `s-` prefix:

#### Core Components
- `<s-button>` - Button component with variants and states
- `<s-link>` - Link component for navigation
- `<s-card>` - Card container component
- `<s-heading>` - Typography component for headings
- `<s-text>` - Text component with various variants
- `<s-form>` - Form wrapper component
- `<s-text-field>` - Input field component

#### Additional Components (likely available)
- `<s-button-group>` - Group of buttons
- `<s-badge>` - Badge/status indicator
- `<s-banner>` - Alert/banner component
- `<s-checkbox>` - Checkbox input
- `<s-choice-list>` - Radio button group
- `<s-select>` - Dropdown select
- `<s-text-area>` - Multi-line text input
- `<s-modal>` - Modal dialog
- `<s-popover>` - Popover tooltip
- `<s-tabs>` - Tab navigation
- `<s-layout>` - Layout grid component
- `<s-stack>` - Stack layout component
- `<s-grid>` - Grid layout component
- `<s-divider>` - Visual separator
- `<s-icon>` - Icon component
- `<s-avatar>` - User avatar
- `<s-thumbnail>` - Image thumbnail
- `<s-progress-bar>` - Progress indicator
- `<s-spinner>` - Loading spinner
- `<s-skeleton-page>` - Loading skeleton
- `<s-empty-state>` - Empty state component

### 6. Build Tool Configuration

#### Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@shopify/polaris']
  },
  build: {
    rollupOptions: {
      external: ['@shopify/polaris']
    }
  }
})
```

#### Webpack Configuration (if needed)
```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@shopify/polaris': '@shopify/polaris/dist/polaris.js'
    }
  }
}
```

### 7. Complete Demo Project Structure

```
polaris-web-components-demo/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ButtonDemo.tsx
│   │   ├── FormDemo.tsx
│   │   ├── LayoutDemo.tsx
│   │   └── ThemeDemo.tsx
│   ├── styles/
│   │   ├── theme.css
│   │   └── custom.css
│   ├── types/
│   │   └── polaris.d.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 8. Demo Component Examples

#### Button Demo Component
```tsx
// src/components/ButtonDemo.tsx
import React from 'react'

export default function ButtonDemo() {
  return (
    <s-card sectioned title="Button Examples">
      <s-stack vertical spacing="loose">
        <div>
          <h3>Button Variants</h3>
          <s-stack spacing="tight">
            <s-button variant="primary">Primary</s-button>
            <s-button variant="secondary">Secondary</s-button>
            <s-button variant="destructive">Destructive</s-button>
            <s-button disabled>Disabled</s-button>
          </s-stack>
        </div>

        <div>
          <h3>Button Sizes</h3>
          <s-stack spacing="tight">
            <s-button size="small">Small</s-button>
            <s-button size="medium">Medium</s-button>
            <s-button size="large">Large</s-button>
          </s-stack>
        </div>

        <div>
          <h3>Loading State</h3>
          <s-button loading>Loading...</s-button>
        </div>
      </s-stack>
    </s-card>
  )
}
```

#### Form Demo Component
```tsx
// src/components/FormDemo.tsx
import React, { useState } from 'react'

export default function FormDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (field: string) => (e: any) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <s-card sectioned title="Form Examples">
      <s-form onSubmit={handleSubmit}>
        <s-stack vertical spacing="loose">
          <s-text-field
            label="Name"
            value={formData.name}
            onChange={handleChange('name')}
            placeholder="Enter your name"
            required
          />

          <s-text-field
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="Enter your email"
            required
          />

          <s-text-area
            label="Message"
            value={formData.message}
            onChange={handleChange('message')}
            placeholder="Enter your message"
            rows={4}
          />

          <s-stack spacing="tight">
            <s-button type="submit" variant="primary">
              Submit
            </s-button>
            <s-button type="reset" variant="secondary">
              Reset
            </s-button>
          </s-stack>
        </s-stack>
      </s-form>
    </s-card>
  )
}
```

### 9. Best Practices

#### Component Usage
1. **Always import the CSS bundle** for proper styling
2. **Use semantic HTML elements** where possible
3. **Follow accessibility guidelines** - include proper ARIA attributes
4. **Handle events properly** - web components use standard DOM events
5. **Use TypeScript definitions** for better development experience

#### Performance Optimization
1. **Lazy load components** when possible
2. **Use proper bundling** configuration to avoid duplicate imports
3. **Minimize custom CSS** to leverage the design system
4. **Test across browsers** - web components have broad support

### 10. Troubleshooting

#### Common Issues
1. **Components not rendering**: Ensure you're importing both JS and CSS bundles
2. **TypeScript errors**: Install `@shopify/polaris-types` and create proper type definitions
3. **Styling issues**: Check CSS custom properties and theme configuration
4. **Event handling**: Use standard DOM event listeners, not React synthetic events

#### Browser Support
- Modern browsers with Custom Elements support
- IE11 not supported (web components requirement)
- Consider using polyfills if needed for older browsers

### 11. Resources and Documentation

- **Official Documentation**: https://shopify.dev/docs/api/app-home/polaris-web-components
- **Type Definitions**: https://www.npmjs.com/package/@shopify/polaris-types
- **GitHub Repository**: https://github.com/Shopify/polaris (deprecated React version)
- **Community Examples**: Check for web components usage in Shopify app templates
- **Polaris Turbo Bridge**: https://github.com/pasilobus/polaris-turbo-bridge (for Rails integration)

### 12. Migration from Polaris React

If migrating from the deprecated Polaris React library:

1. **Update imports**: Replace React component imports with web component usage
2. **Update JSX**: Use `<s-button>` instead of `<Button>`
3. **Handle events**: Use `onClick` instead of `onPress` or React-specific props
4. **Update styling**: Use CSS custom properties instead of React-based theming
5. **Test thoroughly**: Web components have different lifecycle and behavior patterns

This comprehensive guide should help you get started with Shopify Polaris Web Components in any framework, with specific focus on React/Vite integration as requested.