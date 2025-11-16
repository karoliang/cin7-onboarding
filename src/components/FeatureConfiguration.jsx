import React, { useState, useEffect } from 'react'
import {
  Card,
  Text,
  Select,
  Checkbox,
  TextField,
  Button,
  Layout,
  BlockStack,
  InlineStack,
  Grid,
  Badge,
  Icon,
  Box,
  Divider,
  ChoiceList,
  RadioButton,
  FormLayout,
  Tabs,
  Popover,
  ActionList,
  Scrollable
} from '@shopify/polaris'
import {
  PackageIcon,
  CartIcon,
  PersonIcon,
  ArchiveIcon,
  ChartCohortIcon,
  StoreIcon,
  GlobeIcon,
  CreditCardIcon,
  BarcodeIcon,
  ClockIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  StarIcon,
  MobileIcon,
  GiftCardIcon,
  LockIcon
} from '@shopify/polaris-icons'

import { useOnboarding } from '../contexts/OnboardingContext'

const CORE_FEATURES = [
  {
    id: 'inventory-management',
    title: 'Inventory Management',
    description: 'Track stock levels, locations, and movements across all your warehouses',
    icon: PackageIcon,
    category: 'essential',
    estimatedSetupTime: 15,
    prerequisites: [],
    benefits: [
      'Real-time inventory tracking',
      'Low stock alerts',
      'Multi-location support',
      'Batch and serial tracking'
    ],
    industryRelevance: {
      retail: 5,
      manufacturing: 5,
      wholesale: 5,
      ecommerce: 5,
      'food-beverage': 5,
      apparel: 5,
      electronics: 5,
      healthcare: 5
    }
  },
  {
    id: 'order-management',
    title: 'Order Management',
    description: 'Process orders from multiple channels in one unified system',
    icon: CartIcon,
    category: 'essential',
    estimatedSetupTime: 20,
    prerequisites: ['inventory-management'],
    benefits: [
      'Multi-channel order processing',
      'Automated order routing',
      'Order status tracking',
      'Customer communication'
    ],
    industryRelevance: {
      retail: 5,
      manufacturing: 3,
      wholesale: 5,
      ecommerce: 5,
      'food-beverage': 4,
      apparel: 5,
      electronics: 5,
      healthcare: 3
    }
  },
  {
    id: 'customer-management',
    title: 'Customer Management',
    description: 'Manage customer information, orders, and communication history',
    icon: PersonIcon,
    category: 'essential',
    estimatedSetupTime: 10,
    prerequisites: [],
    benefits: [
      'Customer database',
      'Order history tracking',
      'Customer segmentation',
      'Communication tools'
    ],
    industryRelevance: {
      retail: 5,
      manufacturing: 2,
      wholesale: 4,
      ecommerce: 5,
      'food-beverage': 3,
      apparel: 5,
      electronics: 4,
      healthcare: 2
    }
  },
  {
    id: 'supplier-management',
    title: 'Supplier Management',
    description: 'Manage vendor relationships, purchase orders, and procurement',
    icon: StoreIcon,
    category: 'business',
    estimatedSetupTime: 15,
    prerequisites: ['inventory-management'],
    benefits: [
      'Supplier database',
      'Purchase order management',
      'Supplier performance tracking',
      'Cost analysis'
    ],
    industryRelevance: {
      retail: 4,
      manufacturing: 5,
      wholesale: 4,
      ecommerce: 3,
      'food-beverage': 5,
      apparel: 5,
      electronics: 5,
      healthcare: 5
    }
  },
  {
    id: 'reporting-analytics',
    title: 'Reporting & Analytics',
    description: 'Get insights into your business performance with detailed reports',
    icon: ChartCohortIcon,
    category: 'intelligence',
    estimatedSetupTime: 10,
    prerequisites: [],
    benefits: [
      'Custom dashboards',
      'Sales analytics',
      'Inventory insights',
      'Performance reports'
    ],
    industryRelevance: {
      retail: 5,
      manufacturing: 4,
      wholesale: 5,
      ecommerce: 5,
      'food-beverage': 4,
      apparel: 5,
      electronics: 5,
      healthcare: 4
    }
  },
  {
    id: 'pos-integration',
    title: 'POS Integration',
    description: 'Connect your point-of-sale systems for real-time inventory sync',
    icon: StoreIcon,
    category: 'integration',
    estimatedSetupTime: 8,
    prerequisites: ['inventory-management', 'order-management'],
    benefits: [
      'Real-time inventory sync',
      'Unified customer data',
      'Sales channel integration',
      'Payment processing'
    ],
    industryRelevance: {
      retail: 5,
      manufacturing: 1,
      wholesale: 2,
      ecommerce: 1,
      'food-beverage': 4,
      apparel: 5,
      electronics: 4,
      healthcare: 1
    }
  },
  {
    id: 'ecommerce-integration',
    title: 'E-commerce Integration',
    description: 'Connect with popular e-commerce platforms and marketplaces',
    icon: GlobeIcon,
    category: 'integration',
    estimatedSetupTime: 12,
    prerequisites: ['inventory-management', 'order-management'],
    benefits: [
      'Multi-platform integration',
      'Automated order import',
      'Inventory synchronization',
      'Product listing management'
    ],
    industryRelevance: {
      retail: 3,
      manufacturing: 2,
      wholesale: 3,
      ecommerce: 5,
      'food-beverage': 3,
      apparel: 5,
      electronics: 5,
      healthcare: 2
    }
  },
  {
    id: 'accounting-integration',
    title: 'Accounting Integration',
    description: 'Sync financial data with your accounting software',
    icon: CreditCardIcon,
    category: 'integration',
    estimatedSetupTime: 10,
    prerequisites: ['order-management'],
    benefits: [
      'Automated financial sync',
      'Tax calculation',
      'Invoice generation',
      'Financial reporting'
    ],
    industryRelevance: {
      retail: 4,
      manufacturing: 4,
      wholesale: 5,
      ecommerce: 4,
      'food-beverage': 4,
      apparel: 4,
      electronics: 4,
      healthcare: 4
    }
  },
  {
    id: 'warehouse-management',
    title: 'Warehouse Management',
    description: 'Advanced warehouse operations and layout optimization',
    icon: ArchiveIcon,
    category: 'advanced',
    estimatedSetupTime: 25,
    prerequisites: ['inventory-management'],
    benefits: [
      'Warehouse layout optimization',
      'Pick and pack workflows',
      'Shipping management',
      'Barcode scanning'
    ],
    industryRelevance: {
      retail: 3,
      manufacturing: 4,
      wholesale: 5,
      ecommerce: 4,
      'food-beverage': 3,
      apparel: 3,
      electronics: 4,
      healthcare: 3
    }
  },
  {
    id: 'barcode-scanning',
    title: 'Barcode Scanning',
    description: 'Mobile barcode scanning for inventory and order management',
    icon: BarcodeIcon,
    category: 'productivity',
    estimatedSetupTime: 8,
    prerequisites: ['inventory-management'],
    benefits: [
      'Mobile scanning app',
      'Quick data entry',
      'Error reduction',
      'Inventory counting'
    ],
    industryRelevance: {
      retail: 4,
      manufacturing: 4,
      wholesale: 4,
      ecommerce: 3,
      'food-beverage': 3,
      apparel: 4,
      electronics: 5,
      healthcare: 4
    }
  },
  {
    id: 'batch-tracking',
    title: 'Batch Tracking',
    description: 'Track products by batch numbers for expiration and recall management',
    icon: ClockIcon,
    category: 'compliance',
    estimatedSetupTime: 12,
    prerequisites: ['inventory-management'],
    benefits: [
      'Expiration tracking',
      'Recall management',
      'Quality control',
      'Compliance reporting'
    ],
    industryRelevance: {
      retail: 2,
      manufacturing: 3,
      wholesale: 2,
      ecommerce: 2,
      'food-beverage': 5,
      apparel: 2,
      electronics: 3,
      healthcare: 5
    }
  },
  {
    id: 'serial-tracking',
    title: 'Serial Tracking',
    description: 'Track individual items by serial numbers for warranty and support',
    icon: LockIcon,
    category: 'compliance',
    estimatedSetupTime: 10,
    prerequisites: ['inventory-management'],
    benefits: [
      'Individual item tracking',
      'Warranty management',
      'Support history',
      'Theft prevention'
    ],
    industryRelevance: {
      retail: 3,
      manufacturing: 2,
      wholesale: 2,
      ecommerce: 3,
      'food-beverage': 1,
      apparel: 2,
      electronics: 5,
      healthcare: 3
    }
  },
  {
    id: 'multi-currency',
    title: 'Multi-Currency Support',
    description: 'Process transactions in multiple currencies',
    icon: GiftCardIcon,
    category: 'business',
    estimatedSetupTime: 8,
    prerequisites: ['order-management'],
    benefits: [
      'Multiple currency support',
      'Automatic rate updates',
      'Currency reporting',
      'International sales'
    ],
    industryRelevance: {
      retail: 3,
      manufacturing: 4,
      wholesale: 5,
      ecommerce: 4,
      'food-beverage': 2,
      apparel: 3,
      electronics: 4,
      healthcare: 2
    }
  },
  {
    id: 'multi-location',
    title: 'Multi-Location Management',
    description: 'Manage inventory across multiple warehouses and stores',
    icon: MobileIcon,
    category: 'advanced',
    estimatedSetupTime: 15,
    prerequisites: ['inventory-management'],
    benefits: [
      'Multiple location support',
      'Location transfer tracking',
          'Regional inventory optimization',
          'Cross-location reporting'
    ],
    industryRelevance: {
      retail: 4,
      manufacturing: 3,
      wholesale: 5,
      ecommerce: 3,
      'food-beverage': 3,
      apparel: 4,
      electronics: 4,
      healthcare: 3
    }
  }
]

const FEATURE_CATEGORIES = [
  { id: 'essential', label: 'Essential', description: 'Core features for any business' },
  { id: 'integration', label: 'Integrations', description: 'Connect with your existing tools' },
  { id: 'business', label: 'Business Operations', description: 'Advanced business management' },
  { id: 'productivity', label: 'Productivity', description: 'Tools to work more efficiently' },
  { id: 'intelligence', label: 'Intelligence', description: 'Analytics and reporting' },
  { id: 'compliance', label: 'Compliance & Safety', description: 'Regulatory and safety features' },
  { id: 'advanced', label: 'Advanced', description: 'Sophisticated operations management' }
]

const RECOMMENDED_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Package',
    description: 'Perfect for small businesses getting started',
    features: ['inventory-management', 'order-management', 'customer-management'],
    price: 'Free',
    industry: ['retail', 'ecommerce', 'apparel']
  },
  {
    id: 'growth',
    name: 'Growth Package',
    description: 'For growing businesses needing advanced features',
    features: [
      'inventory-management',
      'order-management',
      'customer-management',
      'reporting-analytics',
      'barcode-scanning',
      'multi-location'
    ],
    price: '$199/month',
    industry: ['retail', 'wholesale', 'ecommerce', 'apparel', 'electronics']
  },
  {
    id: 'professional',
    name: 'Professional Package',
    description: 'Comprehensive solution for established businesses',
    features: [
      'inventory-management',
      'order-management',
      'customer-management',
      'supplier-management',
      'reporting-analytics',
      'warehouse-management',
      'barcode-scanning',
      'batch-tracking',
      'multi-location'
    ],
    price: '$499/month',
    industry: ['manufacturing', 'wholesale', 'food-beverage', 'healthcare']
  },
  {
    id: 'enterprise',
    name: 'Enterprise Package',
    description: 'All features for large-scale operations',
    features: CORE_FEATURES.map(f => f.id),
    price: 'Custom pricing',
    industry: ['manufacturing', 'wholesale', 'electronics']
  }
]

const FeatureConfiguration = ({ onValidationChange, onSave }) => {
  const { state, updateState } = useOnboarding()
  const [selectedFeatures, setSelectedFeatures] = useState(state.featureConfiguration.selectedFeatures || [])
  const [activeTab, setActiveTab] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [showPackageDetails, setShowPackageDetails] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')

  const { industrySelection } = state

  // Filter features based on industry relevance
  const getRelevantFeatures = () => {
    if (filterCategory === 'all') {
      return CORE_FEATURES.filter(feature => {
        const relevance = feature.industryRelevance[industrySelection.selectedIndustry] || 0
        return relevance >= 3
      })
    }
    return CORE_FEATURES.filter(feature => feature.category === filterCategory)
  }

  // Get recommended package based on business info and industry
  const getRecommendedPackage = () => {
    const { businessSize, annualRevenue } = state.businessInfo

    if (businessSize === 'startup' || businessSize === 'small') {
      return RECOMMENDED_PACKAGES.find(pkg => pkg.id === 'starter')
    } else if (businessSize === 'medium' || annualRevenue === '1m-5m' || annualRevenue === '5m-10m') {
      return RECOMMENDED_PACKAGES.find(pkg => pkg.id === 'growth')
    } else if (businessSize === 'large' || annualRevenue === '10m-50m') {
      return RECOMMENDED_PACKAGES.find(pkg => pkg.id === 'professional')
    } else {
      return RECOMMENDED_PACKAGES.find(pkg => pkg.id === 'enterprise')
    }
  }

  // Handle package selection
  const handlePackageSelect = (packageId) => {
    const pkg = RECOMMENDED_PACKAGES.find(p => p.id === packageId)
    if (pkg) {
      setSelectedFeatures(pkg.features)
      setSelectedPackage(packageId)
      updateState({
        featureConfiguration: {
          ...state.featureConfiguration,
          selectedFeatures: pkg.features
        }
      })
    }
  }

  // Handle individual feature selection
  const handleFeatureToggle = (featureId) => {
    const isSelected = selectedFeatures.includes(featureId)
    const newFeatures = isSelected
      ? selectedFeatures.filter(f => f !== featureId)
      : [...selectedFeatures, featureId]

    setSelectedFeatures(newFeatures)
    setSelectedPackage(null) // Clear package selection when manually selecting features

    updateState({
      featureConfiguration: {
        ...state.featureConfiguration,
        selectedFeatures: newFeatures
      }
    })
  }

  // Calculate total setup time
  const calculateSetupTime = (features) => {
    return features.reduce((total, featureId) => {
      const feature = CORE_FEATURES.find(f => f.id === featureId)
      return total + (feature?.estimatedSetupTime || 0)
    }, 0)
  }

  // Check prerequisites
  const checkPrerequisites = (featureId) => {
    const feature = CORE_FEATURES.find(f => f.id === featureId)
    if (!feature || !feature.prerequisites.length) return true

    return feature.prerequisites.every(prereq => selectedFeatures.includes(prereq))
  }

  // Validate form
  useEffect(() => {
    const isValid = selectedFeatures.length >= 3
    onValidationChange(isValid)
  }, [selectedFeatures, onValidationChange])

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSave) {
        onSave()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [selectedFeatures, onSave])

  const relevantFeatures = getRelevantFeatures()
  const recommendedPackage = getRecommendedPackage()
  const totalSetupTime = calculateSetupTime(selectedFeatures)

  const tabs = [
    {
      id: 'packages',
      content: 'Recommended Packages',
      panelID: 'packages-content'
    },
    {
      id: 'custom',
      content: 'Custom Selection',
      panelID: 'custom-content'
    }
  ]

  return (
    <BlockStack gap="600">
      {/* Header */}
      <Card>
        <Box padding="500">
          <BlockStack gap="300">
            <Text variant="headingLg" as="h2">
              Configure Your Features
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              Choose the features that will help you achieve your business goals. We'll customize the setup based on your {industrySelection.selectedIndustry} industry.
            </Text>

            {/* Quick Stats */}
            <InlineStack gap="400">
              <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
                <BlockStack gap="100">
                  <Text variant="bodySm" tone="subdued">Features Selected</Text>
                  <Text variant="headingLg">{selectedFeatures.length}</Text>
                </BlockStack>
              </Box>
              <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
                <BlockStack gap="100">
                  <Text variant="bodySm" tone="subdued">Est. Setup Time</Text>
                  <Text variant="headingLg">{Math.round(totalSetupTime / 60)}h {totalSetupTime % 60}m</Text>
                </BlockStack>
              </Box>
            </InlineStack>
          </BlockStack>
        </Box>
      </Card>

      {/* Configuration Tabs */}
      <Card>
        <Box padding="0">
          <Tabs tabs={tabs} selected={activeTab} onSelect={setActiveTab}>
            {activeTab === 0 && (
              <Box padding="500">
                <BlockStack gap="600">
                  {/* Recommended Package */}
                  <Box padding="400" backgroundColor="bg-surface-secondary" borderRadius="200">
                    <BlockStack gap="300">
                      <InlineStack gap="200">
                        <Icon source={StarIcon} tone="warning" />
                        <Text variant="headingSm" as="h3">
                          Recommended for Your Business
                        </Text>
                      </InlineStack>
                      <Text variant="bodyLg" fontWeight="medium">
                        {recommendedPackage.name}
                      </Text>
                      <Text variant="bodyMd" tone="subdued">
                        {recommendedPackage.description}
                      </Text>
                      <InlineStack gap="200">
                        <Badge size="large" tone="success">
                          {recommendedPackage.price}
                        </Badge>
                        <Badge size="large">
                          {recommendedPackage.features.length} features
                        </Badge>
                      </InlineStack>
                      <Button
                        primary
                        onClick={() => handlePackageSelect(recommendedPackage.id)}
                      >
                        Select This Package
                      </Button>
                    </BlockStack>
                  </Box>

                  {/* All Packages */}
                  <BlockStack gap="400">
                    <Text variant="headingMd" as="h3">
                      All Available Packages
                    </Text>
                    <Grid columns={{ xs: 1, sm: 2 }}>
                      {RECOMMENDED_PACKAGES.map((pkg) => {
                        const isRecommended = pkg.id === recommendedPackage.id
                        const isSelected = selectedPackage === pkg.id

                        return (
                          <Card
                            key={pkg.id}
                            background={isSelected ? 'bg-surface-selected' : 'bg-surface'}
                            borderWidth={isSelected ? '2px' : '1px'}
                            borderColor={isSelected ? 'border-primary' : 'border-transparent'}
                            padding="400"
                          >
                            <BlockStack gap="300">
                              <InlineStack align="space-between">
                                <Text variant="headingSm" fontWeight="bold">
                                  {pkg.name}
                                </Text>
                                {isRecommended && (
                                  <Badge tone="info">Recommended</Badge>
                                )}
                                {isSelected && (
                                  <Badge tone="success">Selected</Badge>
                                )}
                              </InlineStack>

                              <Text variant="bodySm" tone="subdued">
                                {pkg.description}
                              </Text>

                              <Text variant="headingMd" as="span" tone="success">
                                {pkg.price}
                              </Text>

                              <Text variant="bodySm" as="p">
                                {pkg.features.length} features included
                              </Text>

                              <BlockStack gap="200">
                                {pkg.features.slice(0, 3).map((featureId, index) => {
                                  const feature = CORE_FEATURES.find(f => f.id === featureId)
                                  return feature ? (
                                    <InlineStack gap="200" key={index}>
                                      <Icon source={CheckCircleIcon} size="small" tone="success" />
                                      <Text variant="bodySm">{feature.title}</Text>
                                    </InlineStack>
                                  ) : null
                                })}
                                {pkg.features.length > 3 && (
                                  <Text variant="bodySm" tone="subdued">
                                    +{pkg.features.length - 3} more features
                                  </Text>
                                )}
                              </BlockStack>

                              <Button
                                primary={isSelected}
                                onClick={() => handlePackageSelect(pkg.id)}
                                disabled={isSelected}
                              >
                                {isSelected ? 'Selected' : 'Select Package'}
                              </Button>
                            </BlockStack>
                          </Card>
                        )
                      })}
                    </Grid>
                  </BlockStack>
                </BlockStack>
              </Box>
            )}

            {activeTab === 1 && (
              <Box padding="500">
                <BlockStack gap="600">
                  {/* Category Filter */}
                  <div>
                    <Text variant="headingSm" as="h3" marginBottom="200">
                      Filter by Category
                    </Text>
                    <InlineStack gap="200" wrap>
                      <Button
                        size="small"
                        onClick={() => setFilterCategory('all')}
                        pressed={filterCategory === 'all'}
                      >
                        All Features
                      </Button>
                      {FEATURE_CATEGORIES.map((category) => (
                        <Button
                          key={category.id}
                          size="small"
                          onClick={() => setFilterCategory(category.id)}
                          pressed={filterCategory === category.id}
                        >
                          {category.label}
                        </Button>
                      ))}
                    </InlineStack>
                  </div>

                  {/* Features Grid */}
                  <Grid columns={{ xs: 1, sm: 2, md: 3 }}>
                    {relevantFeatures.map((feature) => {
                      const isSelected = selectedFeatures.includes(feature.id)
                      const canSelect = checkPrerequisites(feature.id)
                      const relevance = feature.industryRelevance[industrySelection.selectedIndustry] || 0

                      return (
                        <Card
                          key={feature.id}
                          background={isSelected ? 'bg-surface-selected' : 'bg-surface'}
                          borderWidth={isSelected ? '2px' : '1px'}
                          borderColor={isSelected ? 'border-primary' : 'border-transparent'}
                          opacity={canSelect ? 1 : 0.6}
                          padding="400"
                          cursor={canSelect ? 'pointer' : 'not-allowed'}
                          onClick={() => canSelect && handleFeatureToggle(feature.id)}
                        >
                          <BlockStack gap="300">
                            <InlineStack align="space-between">
                              <Icon source={feature.icon} size="medium" />
                              <Checkbox
                                label=""
                                checked={isSelected}
                                onChange={() => {}}
                                disabled={!canSelect}
                              />
                            </InlineStack>

                            <Text variant="headingSm" fontWeight="medium">
                              {feature.title}
                            </Text>

                            <Text variant="bodyXs" tone="subdued">
                              {feature.description}
                            </Text>

                            <InlineStack gap="200" wrap>
                              <Badge size="small" tone={relevance >= 5 ? 'success' : relevance >= 4 ? 'attention' : 'info'}>
                                Relevance: {relevance}/5
                              </Badge>
                              <Badge size="small">
                                {feature.estimatedSetupTime} min setup
                              </Badge>
                            </InlineStack>

                            {/* Prerequisites Warning */}
                            {!canSelect && (
                              <Box padding="200" backgroundColor="bg-critical-subdued" borderRadius="200">
                                <InlineStack gap="200">
                                  <Icon source={AlertCircleIcon} size="small" tone="critical" />
                                  <Text variant="bodyXs" tone="critical">
                                    Requires: {feature.prerequisites.map(p =>
                                      CORE_FEATURES.find(f => f.id === p)?.title || p
                                    ).join(', ')}
                                  </Text>
                                </InlineStack>
                              </Box>
                            )}

                            {/* Benefits Preview */}
                            <BlockStack gap="100">
                              <Text variant="bodyXs" tone="subdued">Key benefits:</Text>
                              {feature.benefits.slice(0, 2).map((benefit, index) => (
                                <InlineStack gap="200" key={index}>
                                  <Icon source={CheckCircleIcon} size="extraSmall" tone="success" />
                                  <Text variant="bodyXs">{benefit}</Text>
                                </InlineStack>
                              ))}
                            </BlockStack>
                          </BlockStack>
                        </Card>
                      )
                    })}
                  </Grid>

                  {/* Summary */}
                  <Box padding="400" backgroundColor="bg-surface-secondary" borderRadius="200">
                    <BlockStack gap="300">
                      <Text variant="headingSm" as="h3">
                        Configuration Summary
                      </Text>
                      <InlineStack gap="400">
                        <Box width="50%">
                          <Text variant="bodySm" tone="subdued">Selected Features:</Text>
                          <Text variant="headingMd">{selectedFeatures.length}</Text>
                        </Box>
                        <Box width="50%">
                          <Text variant="bodySm" tone="subdued">Total Setup Time:</Text>
                          <Text variant="headingMd">
                            {Math.round(totalSetupTime / 60)}h {totalSetupTime % 60}m
                          </Text>
                        </Box>
                      </InlineStack>
                    </BlockStack>
                  </Box>
                </BlockStack>
              </Box>
            )}
          </Tabs>
        </Box>
      </Card>

      {/* Industry-Specific Recommendations */}
      <Card>
        <Box padding="500">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h3">
              Industry-Specific Recommendations
            </Text>
            <Text variant="bodyMd" tone="subdued">
              Based on your {industrySelection.selectedIndustry} industry and operational needs:
            </Text>

            <Grid columns={{ xs: 1, sm: 2 }}>
              {CORE_FEATURES
                .filter(feature => {
                  const relevance = feature.industryRelevance[industrySelection.selectedIndustry] || 0
                  return relevance === 5 && !selectedFeatures.includes(feature.id)
                })
                .slice(0, 4)
                .map((feature) => (
                  <Card key={feature.id} padding="400">
                    <InlineStack gap="300">
                      <Icon source={feature.icon} size="small" />
                      <BlockStack gap="100">
                        <Text variant="bodySm" fontWeight="medium">
                          {feature.title}
                        </Text>
                        <Text variant="bodyXs" tone="subdued">
                          {feature.description}
                        </Text>
                        <Button
                          size="small"
                          onClick={() => handleFeatureToggle(feature.id)}
                        >
                          Add Feature
                        </Button>
                      </BlockStack>
                    </InlineStack>
                  </Card>
                ))}
            </Grid>
          </BlockStack>
        </Box>
      </Card>
    </BlockStack>
  )
}

export default FeatureConfiguration