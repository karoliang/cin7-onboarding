import React from 'react'
import { Navigation, TopBar, Frame } from '@shopify/polaris'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

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
      searchField={{
        placeholder: 'Search components...',
        onChange: () => {},
        onBlur: () => {},
        onFocus: () => {},
        value: '',
      }}
      userMenu={{
        initials: 'U',
        actions: [
          {
            items: [
              { content: 'Community forums' },
              { content: 'Support' },
            ],
          },
        ],
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

  const logo = {
    width: 124,
    topBarSource:
      'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
    url: '/',
    accessibilityLabel: 'Polaris Demo',
  }

  return (
    <Frame
      topBar={
        <TopBar
          showNavigationToggle
          searchResultsVisible={false}
          searchField={{
            placeholder: 'Search components...',
            onChange: () => {},
            value: '',
          }}
          userMenu={{
            initials: 'U',
            actions: [
              {
                items: [
                  { content: 'Community forums' },
                  { content: 'Support' },
                ],
              },
            ],
          }}
        />
      }
      navigation={
        <Navigation location="/">
          <Navigation.Section
            items={navigationItems}
            separator
          />
        </Navigation>
      }
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