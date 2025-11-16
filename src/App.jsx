import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
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

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Redirect root to dashboard */}
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
          <Route path="/reports" element={<Dashboard />} /> {/* Reuse dashboard temporarily */}
          <Route path="/settings" element={<FormsDemo />} /> {/* Reuse forms demo temporarily */}

          {/* Legacy demo routes - keep for development */}
          <Route path="/demo" element={<Home />} />
          <Route path="/demo/product-listing" element={<ProductListing />} />
          <Route path="/demo/product-detail" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </AppProvider>
  )
}

export default App