import React from 'react'
import { Navigation, TopBar, Frame } from '@shopify/polaris'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation()

  const navigationItems = [
    {
      label: 'Home',
      icon: 'HomeMajor',
      url: '/',
      selected: location.pathname === '/'
    },
    {
      label: 'Actions',
      icon: 'ProductsMajor',
      url: '/actions',
      selected: location.pathname === '/actions'
    },
    {
      label: 'Forms',
      icon: 'FormsMajor',
      url: '/forms',
      selected: location.pathname === '/forms'
    },
    {
      label: 'Layout',
      icon: 'LayoutMajor',
      url: '/layout',
      selected: location.pathname === '/layout'
    },
    {
      label: 'Navigation',
      icon: 'NavigationMajor',
      url: '/navigation',
      selected: location.pathname === '/navigation'
    },
    {
      label: 'Feedback',
      icon: 'ChatMajor',
      url: '/feedback',
      selected: location.pathname === '/feedback'
    },
    {
      label: 'Images & Media',
      icon: 'ImageMajor',
      url: '/images',
      selected: location.pathname === '/images'
    },
    {
      label: 'Typography',
      icon: 'TextMajor',
      url: '/typography',
      selected: location.pathname === '/typography'
    },
    {
      label: 'Colors',
      icon: 'ColorMajor',
      url: '/colors',
      selected: location.pathname === '/colors'
    },
    {
      label: 'Spacing',
      icon: 'SpaceMajor',
      url: '/spacing',
      selected: location.pathname === '/spacing'
    }
  ]

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      searchResultsVisible={false}
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