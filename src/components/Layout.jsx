import React from 'react'
import { Navigation, TopBar, Frame } from '@shopify/polaris'
import {
  HomeIcon,
  ProductIcon,
  ViewIcon,
  MenuIcon,
  ChatIcon,
  ImageIcon,
  TextIcon,
  ColorIcon,
  GlobeIcon,
  SettingsIcon,
  PackageIcon
} from '@shopify/polaris-icons'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation()
  const isDevelopment = process.env.NODE_ENV === 'development'

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: ViewIcon,
      url: '/dashboard',
      selected: location.pathname === '/dashboard'
    },
    {
      label: 'Sales',
      icon: PackageIcon,
      url: '/sales',
      selected: location.pathname === '/sales'
    },
    {
      label: 'Inventory',
      icon: PackageIcon,
      url: '/inventory',
      selected: location.pathname === '/inventory'
    },
    {
      label: 'Products',
      icon: ProductIcon,
      url: '/products',
      selected: location.pathname === '/products'
    },
    {
      label: 'Customers',
      icon: ChatIcon,
      url: '/customers',
      selected: location.pathname === '/customers'
    },
    {
      label: 'Reports',
      icon: ViewIcon,
      url: '/reports',
      selected: location.pathname === '/reports'
    },
    {
      label: 'Settings',
      icon: SettingsIcon,
      url: '/settings',
      selected: location.pathname === '/settings'
    },
    ...(isDevelopment ? [{
      label: 'Debug Dashboard',
      icon: ViewIcon,
      url: '/debug/dashboard',
      selected: location.pathname === '/debug/dashboard',
      badge: 'DEV'
    }] : [])
  ]

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      searchResultsVisible={false}
      userMenu={{
        initials: 'C7',
        name: 'Cin7 Core',
        detail: 'Admin',
        actions: [
          {
            items: [
              { content: 'Start Onboarding', icon: PlusCircleIcon, onAction: () => console.log('Navigate to onboarding') },
              { content: 'Settings', icon: SettingsIcon, onAction: () => console.log('Open settings') },
              ...(isDevelopment ? [
                { content: 'Debug Dashboard', icon: AnalyticsIcon, onAction: () => window.location.href = '/debug/dashboard' },
                { content: 'Export Debug Data', icon: AnalyticsIcon, onAction: () => {
                  const errorMonitor = require('../services/ErrorMonitor').default;
                  errorMonitor.generateReport();
                } }
              ] : []),
              { content: 'Help & Support', icon: ChatIcon, onAction: () => console.log('Open help') }
            ]
          }
        ]
      }}
    />
  )

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={navigationItems}
        separator
      />
    </Navigation>
  )

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={true}
    >
      <main style={{
        padding: 'var(--p-space-6)'
      }}>
        {children}
      </main>
    </Frame>
  )
}

export default Layout