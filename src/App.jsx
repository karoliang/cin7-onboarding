import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ProductListing from './pages/ProductListing'
import ProductDetail from './pages/ProductDetail'
import ActionsDemo from './pages/ActionsDemo'
import FormsDemo from './pages/FormsDemo'
import LayoutDemo from './pages/LayoutDemo'
import NavigationDemo from './pages/NavigationDemo'
import FeedbackDemo from './pages/FeedbackDemo'
import ImagesDemo from './pages/ImagesDemo'
import TypographyDemo from './pages/TypographyDemo'
import ColorsDemo from './pages/ColorsDemo'
import SpacingDemo from './pages/SpacingDemo'

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product-listing" element={<ProductListing />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/actions" element={<ActionsDemo />} />
          <Route path="/forms" element={<FormsDemo />} />
          <Route path="/layout" element={<LayoutDemo />} />
          <Route path="/navigation" element={<NavigationDemo />} />
          <Route path="/feedback" element={<FeedbackDemo />} />
          <Route path="/images" element={<ImagesDemo />} />
          <Route path="/typography" element={<TypographyDemo />} />
          <Route path="/colors" element={<ColorsDemo />} />
          <Route path="/spacing" element={<SpacingDemo />} />
        </Routes>
      </Layout>
    </AppProvider>
  )
}

export default App