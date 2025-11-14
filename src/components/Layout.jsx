import React from 'react'
import { Navigation, TopBar, Frame } from '@shopify/polaris'
import { HomeIcon, ProductIcon, FormsIcon, ViewIcon, MenuIcon, ChatIcon, ImageIcon, TextIcon, ColorIcon, GlobeIcon } from '@shopify/polaris-icons'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation()

  const navigationItems = [
    {
      label: 'Home',
      icon: HomeIcon,
      url: '/',
      selected: location.pathname === '/'
    },
    {
      label: 'Dashboard',
      icon: ViewIcon,
      url: '/dashboard',
      selected: location.pathname === '/dashboard'
    },
    {
      label: 'Product Listing',
      icon: ProductIcon,
      url: '/product-listing',
      selected: location.pathname === '/product-listing'
    },
    {
      label: 'Product Detail',
      icon: ImageIcon,
      url: '/product-detail',
      selected: location.pathname === '/product-detail'
    },
    {
      label: 'Forms',
      icon: FormsIcon,
      url: '/forms',
      selected: location.pathname === '/forms'
    },
    {
      label: 'Layout',
      icon: ViewIcon,
      url: '/layout',
      selected: location.pathname === '/layout'
    },
    {
      label: 'Navigation',
      icon: MenuIcon,
      url: '/navigation',
      selected: location.pathname === '/navigation'
    },
    {
      label: 'Feedback',
      icon: ChatIcon,
      url: '/feedback',
      selected: location.pathname === '/feedback'
    },
    {
      label: 'Images & Media',
      icon: ImageIcon,
      url: '/images',
      selected: location.pathname === '/images'
    },
    {
      label: 'Typography',
      icon: TextIcon,
      url: '/typography',
      selected: location.pathname === '/typography'
    },
    {
      label: 'Colors',
      icon: ColorIcon,
      url: '/colors',
      selected: location.pathname === '/colors'
    },
    {
      label: 'Spacing',
      icon: GlobeIcon,
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