import React, { useEffect } from 'react'
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
  PackageIcon,
  PlusIcon
} from '@shopify/polaris-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useOnboarding, onboardingSteps } from '../contexts/OnboardingContext'
// import { useNolan } from '../contexts/NolanContext'
// import NolanChatWidget from './NolanAI/NolanChatWidget'

const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isDevelopment = (typeof process !== 'undefined' && process.env?.NODE_ENV) === 'development'
  const { state: onboardingState } = useOnboarding()
  // const { actions: nolanActions } = useNolan()

  // Update Nolan AI context based on current page and onboarding state
  // useEffect(() => {
  //   const onboardingStep = location.pathname === '/onboarding'
  //     ? onboardingSteps[onboardingState.currentStep]?.id
  //     : null

  //   nolanActions.updateContext({
  //     currentPage: location.pathname,
  //     onboardingStep,
  //     userIndustry: onboardingState.businessInfo.industry,
  //     businessSize: onboardingState.businessInfo.businessSize,
  //     completedSteps: onboardingState.progress.completedSteps.map(step => step.id)
  //   })
  // }, [location.pathname, onboardingState.currentStep, onboardingState.businessInfo, onboardingState.progress, nolanActions])

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: ViewIcon,
      url: '/',
      selected: location.pathname === '/' || location.pathname === '/dashboard'
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
              { content: 'Start Onboarding', icon: PlusIcon, onAction: () => navigate('/onboarding') },
              { content: 'Settings', icon: SettingsIcon, onAction: () => console.log('Open settings') },
              ...(isDevelopment ? [
                { content: 'Debug Dashboard', icon: ViewIcon, onAction: () => window.location.href = '/debug/dashboard' },
                { content: 'Export Debug Data', icon: ViewIcon, onAction: () => {
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
    <>
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

      {/* Nolan AI Chat Widget */}
      {/* <NolanChatWidget /> */}
    </>
  )
}

export default Layout