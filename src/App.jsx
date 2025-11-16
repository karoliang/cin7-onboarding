import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json'
import { OnboardingProvider } from './contexts/OnboardingContext'
// import { NolanProvider } from './contexts/NolanContext'
import Layout from './components/Layout'
import OnboardingWizard from './components/OnboardingWizard'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ReportsDashboard from './pages/ReportsDashboard'
import ProductListing from './pages/ProductListing'
import ProductDetail from './pages/ProductDetail'
import InventoryDetail from './pages/InventoryDetail'
import SalesOrders from './pages/SalesOrders'
import OrderDetail from './pages/OrderDetail'
// Customer Management Components
import CustomerManagement from './pages/CustomerManagement'
import CustomerDetail from './pages/CustomerDetail'
// Cin7 Core modules - reuse existing components initially
import FormsDemo from './pages/FormsDemo' // Will be repurposed for Settings
import ErrorDashboard from './components/ErrorDashboard'
import ErrorBoundary from './components/ErrorBoundary'

// Import monitoring services
import errorMonitor from './services/ErrorMonitor'
import performanceLogger from './utils/PerformanceLogger'
import devConsole from './services/DevConsole'

function App() {
  useEffect(() => {
    // Initialize monitoring systems
    errorMonitor.log('info', 'Cin7 Core Application starting', {
      version: '1.0.0',
      environment: (typeof process !== 'undefined' && process.env?.NODE_ENV) || 'development'
    });

    // Initialize DevConsole in development
    if ((typeof process !== 'undefined' && process.env?.NODE_ENV) === 'development') {
      devConsole.initialize();
    }

    // Start performance monitoring for the entire app
    performanceLogger.startMeasure('app_lifecycle', {
      component: 'App',
      phase: 'initialization'
    });

    return () => {
      performanceLogger.endMeasure('app_lifecycle', {
        component: 'App',
        phase: 'cleanup'
      });
    };
  }, []);

  return (
    <ErrorBoundary componentName="AppRoot">
      <AppProvider i18n={enTranslations}>
        <OnboardingProvider>
          {/* <NolanProvider> */}
          <Routes>
            {/* Onboarding Wizard */}
            <Route path="/onboarding" element={<OnboardingWizard />} />

            {/* Main Application with Layout */}
            <Route path="/*" element={
              <Layout>
                    <ErrorBoundary componentName="AppRoutes">
                      <Routes>
                        {/* Monitoring & Debugging Routes */}
                        <Route path="/debug/dashboard" element={<ErrorDashboard />} />

                        {/* Main Dashboard */}
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />

                        {/* Cin7 Core Modules */}
                        <Route path="/sales" element={<SalesOrders />} />
                        <Route path="/sales/orders/:orderId" element={<OrderDetail />} />
                        <Route path="/inventory" element={<ProductListing />} /> {/* Reuse product listing */}
                        <Route path="/inventory/:id" element={<InventoryDetail />} />
                        <Route path="/products" element={<ProductListing />} /> {/* Reuse product listing */}
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/customers" element={<CustomerManagement />} />
                        <Route path="/customers/:customerId" element={<CustomerDetail />} />
                        <Route path="/reports" element={<ReportsDashboard />} />
                        <Route path="/settings" element={<FormsDemo />} /> {/* Reuse forms demo temporarily */}

                        {/* Legacy demo routes - keep for development */}
                        <Route path="/demo" element={<Home />} />
                        <Route path="/demo/product-listing" element={<ProductListing />} />
                        <Route path="/demo/product-detail" element={<ProductDetail />} />
                      </Routes>
                    </ErrorBoundary>
                  </Layout>
                } />
          </Routes>

          {/* Development Console (only in development) */}
          {(typeof process !== 'undefined' && process.env?.NODE_ENV) === 'development' && (
            <React.Suspense fallback={null}>
              {React.createElement(
                React.lazy(() => import('./services/DevConsole').then(mod => ({
                  default: mod.DevConsoleUI
                })))
              )}
            </React.Suspense>
          )}
          {/* </NolanProvider> */}
        </OnboardingProvider>
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App