import React, { useState, useEffect } from 'react'
import {
  Card,
  Text,
  Select,
  Checkbox,
  TextField,
  Button,
  Layout,
  VerticalStack,
  HorizontalStack,
  Grid,
  Badge,
  Icon,
  Box,
  Divider,
  BlockStack,
  InlineStack,
  ChoiceList,
  RadioButton,
  FormLayout
} from '@shopify/polaris'
import {
  StorefrontIcon,
  FactoryIcon,
  ShoppingCartIcon,
  BuildingIcon,
  GiftIcon,
  ShirtIcon,
  DevicePhoneIcon,
  HospitalIcon,
  PuzzleIcon,
  CreditCardIcon,
  PackageIcon,
  TruckIcon,
  GlobeIcon,
  StoreIcon,
  ChatIcon,
  MegaphoneIcon
} from '@shopify/polaris-icons'

import { useOnboarding } from '../contexts/OnboardingContext'

const INDUSTRY_OPTIONS = [
  {
    value: 'retail',
    label: 'Retail',
    description: 'Physical stores, showrooms, and in-person sales',
    icon: StorefrontIcon,
    subcategories: ['fashion', 'electronics', 'home-garden', 'specialty', 'convenience']
  },
  {
    value: 'manufacturing',
    label: 'Manufacturing',
    description: 'Production, assembly, and product creation',
    icon: FactoryIcon,
    subcategories: ['food-beverage', 'textiles', 'electronics', 'furniture', 'custom']
  },
  {
    value: 'wholesale',
    label: 'Wholesale & Distribution',
    description: 'B2B sales, bulk ordering, and distribution',
    icon: BuildingIcon,
    subcategories: ['general', 'specialty', 'dropshipping', 'import-export']
  },
  {
    value: 'ecommerce',
    label: 'E-commerce',
    description: 'Online stores and digital marketplaces',
    icon: ShoppingCartIcon,
    subcategories: ['own-website', 'marketplace', 'multi-channel', 'subscription']
  },
  {
    value: 'food-beverage',
    label: 'Food & Beverage',
    description: 'Restaurants, cafes, and food production',
    icon: GiftIcon,
    subcategories: ['restaurant', 'cafe', 'food-production', 'beverage', 'catering']
  },
  {
    value: 'apparel',
    label: 'Apparel & Fashion',
    description: 'Clothing, accessories, and fashion items',
    icon: ShirtIcon,
    subcategories: ['clothing', 'accessories', 'footwear', 'jewelry', 'luxury']
  },
  {
    value: 'electronics',
    label: 'Electronics',
    description: 'Consumer electronics, gadgets, and tech products',
    icon: DevicePhoneIcon,
    subcategories: ['consumer', 'industrial', 'components', 'accessories']
  },
  {
    value: 'healthcare',
    label: 'Healthcare & Medical',
    description: 'Medical supplies, equipment, and healthcare products',
    icon: HospitalIcon,
    subcategories: ['medical-supplies', 'equipment', 'pharmaceutical', 'wellness']
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Businesses not in the above categories',
    icon: PuzzleIcon,
    subcategories: []
  }
]

const BUSINESS_MODELS = [
  {
    value: 'b2c',
    label: 'B2C - Business to Consumer',
    description: 'Selling directly to individual customers'
  },
  {
    value: 'b2b',
    label: 'B2B - Business to Business',
    description: 'Selling to other businesses'
  },
  {
    value: 'b2b2c',
    label: 'B2B2C - Business to Business to Consumer',
    description: 'Selling through intermediaries to end consumers'
  },
  {
    value: 'd2c',
    label: 'D2C - Direct to Consumer',
    description: 'Manufacturers selling directly to consumers'
  },
  {
    value: 'marketplace',
    label: 'Marketplace',
    description: 'Platform connecting buyers and sellers'
  },
  {
    value: 'subscription',
    label: 'Subscription-based',
    description: 'Recurring revenue through subscriptions'
  }
]

const SALES_CHANNELS = [
  {
    value: 'retail-store',
    label: 'Physical Retail Store',
    description: 'Brick-and-mortar storefront',
    icon: StoreIcon
  },
  {
    value: 'online-own-site',
    label: 'Own E-commerce Website',
    description: 'Direct online sales through your website',
    icon: GlobeIcon
  },
  {
    value: 'marketplace',
    label: 'Online Marketplaces',
    description: 'Amazon, eBay, Etsy, etc.',
    icon: ShoppingCartIcon
  },
  {
    value: 'b2b-portal',
    label: 'B2B Customer Portal',
    description: 'Wholesale ordering portal for business customers',
    icon: BuildingIcon
  },
  {
    value: 'phone-sales',
    label: 'Phone/Email Sales',
    description: 'Manual order processing',
    icon: ChatIcon
  },
  {
    value: 'in-person',
    label: 'In-person Sales',
    description: 'Trade shows, events, field sales',
    icon: MegaphoneIcon
  },
  {
    value: 'wholesale-distributors',
    label: 'Wholesale Distributors',
    description: 'Selling through distribution networks',
    icon: TruckIcon
  }
]

const OPERATIONAL_NEEDS = [
  {
    value: 'inventory-management',
    label: 'Inventory Management',
    description: 'Track stock levels, locations, and movements',
    icon: PackageIcon
  },
  {
    value: 'order-processing',
    label: 'Order Processing',
    description: 'Manage orders from creation to fulfillment',
    icon: ShoppingCartIcon
  },
  {
    value: 'shipping-fulfillment',
    label: 'Shipping & Fulfillment',
    description: 'Coordinate shipping and order fulfillment',
    icon: TruckIcon
  },
  {
    value: 'supplier-management',
    label: 'Supplier Management',
    description: 'Manage vendor relationships and purchase orders',
    icon: BuildingIcon
  },
  {
    value: 'production-tracking',
    label: 'Production Tracking',
    description: 'Monitor manufacturing and assembly processes',
    icon: FactoryIcon
  },
  {
    value: 'quality-control',
    label: 'Quality Control',
    description: 'Product quality inspections and compliance',
    icon: HospitalIcon
  },
  {
    value: 'reporting-analytics',
    label: 'Reporting & Analytics',
    description: 'Business intelligence and insights',
    icon: CreditCardIcon
  },
  {
    value: 'multi-channel-sync',
    label: 'Multi-channel Synchronization',
    description: 'Sync inventory across all sales channels',
    icon: GlobeIcon
  },
  {
    value: 'pos-integration',
    label: 'POS Integration',
    description: 'Connect with point-of-sale systems',
    icon: StoreIcon
  },
  {
    value: 'accounting-integration',
    label: 'Accounting Integration',
    description: 'Sync with accounting software',
    icon: CreditCardIcon
  }
]

const INDUSTRY_RECOMMENDATIONS = {
  retail: {
    channels: ['retail-store', 'online-own-site', 'marketplace', 'phone-sales'],
    needs: ['inventory-management', 'order-processing', 'multi-channel-sync', 'pos-integration'],
    features: ['inventory-management', 'order-management', 'customer-management', 'reporting-analytics']
  },
  manufacturing: {
    channels: ['b2b-portal', 'wholesale-distributors', 'phone-sales', 'in-person'],
    needs: ['production-tracking', 'quality-control', 'supplier-management', 'inventory-management'],
    features: ['inventory-management', 'supplier-management', 'production-tracking', 'reporting-analytics']
  },
  wholesale: {
    channels: ['b2b-portal', 'wholesale-distributors', 'phone-sales', 'in-person'],
    needs: ['inventory-management', 'order-processing', 'supplier-management', 'multi-channel-sync'],
    features: ['inventory-management', 'order-management', 'customer-management', 'reporting-analytics']
  },
  ecommerce: {
    channels: ['online-own-site', 'marketplace', 'social-media'],
    needs: ['inventory-management', 'order-processing', 'shipping-fulfillment', 'multi-channel-sync'],
    features: ['inventory-management', 'order-management', 'ecommerce-integration', 'reporting-analytics']
  },
  'food-beverage': {
    channels: ['retail-store', 'online-own-site', 'phone-sales', 'in-person'],
    needs: ['inventory-management', 'quality-control', 'supplier-management', 'order-processing'],
    features: ['inventory-management', 'order-management', 'batch-tracking', 'reporting-analytics']
  },
  apparel: {
    channels: ['retail-store', 'online-own-site', 'marketplace'],
    needs: ['inventory-management', 'order-processing', 'multi-channel-sync', 'reporting-analytics'],
    features: ['inventory-management', 'order-management', 'customer-management', 'multi-location']
  },
  electronics: {
    channels: ['retail-store', 'online-own-site', 'marketplace', 'wholesale-distributors'],
    needs: ['inventory-management', 'serial-tracking', 'quality-control', 'multi-channel-sync'],
    features: ['inventory-management', 'serial-tracking', 'order-management', 'reporting-analytics']
  },
  healthcare: {
    channels: ['b2b-portal', 'phone-sales', 'wholesale-distributors'],
    needs: ['inventory-management', 'quality-control', 'batch-tracking', 'supplier-management'],
    features: ['inventory-management', 'batch-tracking', 'quality-control', 'reporting-analytics']
  }
}

const IndustrySelection = ({ onValidationChange, onSave }) => {
  const { state, updateState } = useOnboarding()
  const [selectedIndustry, setSelectedIndustry] = useState(state.industrySelection.selectedIndustry)
  const [subCategory, setSubCategory] = useState(state.industrySelection.subCategory || '')
  const [businessModel, setBusinessModel] = useState(state.industrySelection.businessModel || [])
  const [salesChannels, setSalesChannels] = useState(state.industrySelection.salesChannels || [])
  const [operationalNeeds, setOperationalNeeds] = useState(state.industrySelection.operationalNeeds || [])
  const [otherIndustry, setOtherIndustry] = useState('')

  // Update state when industry changes
  useEffect(() => {
    const recommendations = INDUSTRY_RECOMMENDATIONS[selectedIndustry]
    if (recommendations) {
      // Auto-select recommended channels and needs
      setSalesChannels(prev => [...new Set([...prev, ...recommendations.channels])])
      setOperationalNeeds(prev => [...new Set([...prev, ...recommendations.needs])])
    }

    updateState({
      industrySelection: {
        selectedIndustry,
        subCategory,
        businessModel,
        salesChannels,
        operationalNeeds
      }
    })
  }, [selectedIndustry, subCategory, businessModel, salesChannels, operationalNeeds, updateState])

  // Validate form
  useEffect(() => {
    const isValid = selectedIndustry !== 'other' || otherIndustry.trim() !== ''
    onValidationChange(isValid)
  }, [selectedIndustry, otherIndustry, onValidationChange])

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSave) {
        onSave()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [selectedIndustry, subCategory, businessModel, salesChannels, operationalNeeds, onSave])

  const selectedIndustryData = INDUSTRY_OPTIONS.find(option => option.value === selectedIndustry)
  const recommendations = INDUSTRY_RECOMMENDATIONS[selectedIndustry]

  return (
    <VerticalStack gap="600">
      {/* Industry Selection */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingLg" as="h2">
              What industry best describes your business?
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              This helps us tailor the setup process and recommend the right features for your specific needs.
            </Text>

            <Grid columns={{ xs: 1, sm: 2, md: 3 }}>
              {INDUSTRY_OPTIONS.map((industry) => (
                <Card
                  key={industry.value}
                  background={selectedIndustry === industry.value ? 'bg-surface-selected' : 'bg-surface'}
                  borderWidth={selectedIndustry === industry.value ? '2px' : '1px'}
                  borderColor={selectedIndustry === industry.value ? 'border-primary' : 'border-transparent'}
                  onClick={() => setSelectedIndustry(industry.value)}
                  padding="400"
                  cursor="pointer"
                >
                  <VerticalStack gap="300">
                    <HorizontalStack gap="300">
                      <Icon source={industry.icon} size="medium" />
                      <Text variant="headingSm" fontWeight="medium">
                        {industry.label}
                      </Text>
                    </HorizontalStack>
                    <Text variant="bodySm" tone="subdued">
                      {industry.description}
                    </Text>
                    {selectedIndustry === industry.value && (
                      <Badge tone="success">Selected</Badge>
                    )}
                  </VerticalStack>
                </Card>
              ))}
            </Grid>

            {/* Other Industry Input */}
            {selectedIndustry === 'other' && (
              <TextField
                label="Please specify your industry"
                value={otherIndustry}
                onChange={setOtherIndustry}
                placeholder="e.g., Agriculture, Construction, Entertainment"
                autoComplete="off"
              />
            )}

            {/* Subcategory Selection */}
            {selectedIndustryData && selectedIndustryData.subcategories.length > 0 && (
              <div>
                <Text variant="headingSm" as="h3" marginBottom="200">
                  Subcategory
                </Text>
                <Select
                  label="Select your specific subcategory"
                  options={selectedIndustryData.subcategories.map(cat => ({
                    label: cat.split('-').map(word =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' '),
                    value: cat
                  }))}
                  value={subCategory}
                  onChange={setSubCategory}
                  placeholder="Select a subcategory"
                />
              </div>
            )}
          </VerticalStack>
        </Box>
      </Card>

      {/* Business Model */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingLg" as="h2">
              What is your primary business model?
            </Text>
            <ChoiceList
              title="Select all that apply"
              titleHidden
              choices={BUSINESS_MODELS.map(model => ({
                label: model.label,
                description: model.description,
                value: model.value
              }))}
              selected={businessModel}
              onChange={setBusinessModel}
              allowMultiple
            />
          </VerticalStack>
        </Box>
      </Card>

      {/* Sales Channels */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingLg" as="h2">
              Where do you sell your products?
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              Select all channels you currently use or plan to use.
            </Text>

            <Grid columns={{ xs: 1, sm: 2, md: 3 }}>
              {SALES_CHANNELS.map((channel) => {
                const isSelected = salesChannels.includes(channel.value)
                const isRecommended = recommendations?.channels?.includes(channel.value)

                return (
                  <Card
                    key={channel.value}
                    background={isSelected ? 'bg-surface-selected' : 'bg-surface'}
                    borderWidth={isSelected ? '2px' : '1px'}
                    borderColor={isSelected ? 'border-primary' : 'border-transparent'}
                    padding="400"
                    cursor="pointer"
                    onClick={() => {
                      if (isSelected) {
                        setSalesChannels(prev => prev.filter(c => c !== channel.value))
                      } else {
                        setSalesChannels(prev => [...prev, channel.value])
                      }
                    }}
                  >
                    <VerticalStack gap="300">
                      <HorizontalStack gap="300" align="start">
                        <Checkbox
                          label=""
                          checked={isSelected}
                          onChange={() => {}}
                        />
                        <Icon source={channel.icon} size="small" />
                        <Text variant="bodySm" fontWeight="medium">
                          {channel.label}
                        </Text>
                        {isRecommended && (
                          <Badge size="small" tone="info">
                            Recommended
                          </Badge>
                        )}
                      </HorizontalStack>
                      <Text variant="bodyXs" tone="subdued">
                        {channel.description}
                      </Text>
                    </VerticalStack>
                  </Card>
                )
              })}
            </Grid>
          </VerticalStack>
        </Box>
      </Card>

      {/* Operational Needs */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingLg" as="h2">
              What are your key operational needs?
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              Select the areas where you need the most support and automation.
            </Text>

            <Grid columns={{ xs: 1, sm: 2 }}>
              {OPERATIONAL_NEEDS.map((need) => {
                const isSelected = operationalNeeds.includes(need.value)
                const isRecommended = recommendations?.needs?.includes(need.value)

                return (
                  <Card
                    key={need.value}
                    background={isSelected ? 'bg-surface-selected' : 'bg-surface'}
                    borderWidth={isSelected ? '2px' : '1px'}
                    borderColor={isSelected ? 'border-primary' : 'border-transparent'}
                    padding="400"
                    cursor="pointer"
                    onClick={() => {
                      if (isSelected) {
                        setOperationalNeeds(prev => prev.filter(n => n !== need.value))
                      } else {
                        setOperationalNeeds(prev => [...prev, need.value])
                      }
                    }}
                  >
                    <VerticalStack gap="300">
                      <HorizontalStack gap="300" align="start">
                        <Checkbox
                          label=""
                          checked={isSelected}
                          onChange={() => {}}
                        />
                        <Icon source={need.icon} size="small" />
                        <Text variant="bodySm" fontWeight="medium">
                          {need.label}
                        </Text>
                        {isRecommended && (
                          <Badge size="small" tone="info">
                            Recommended
                          </Badge>
                        )}
                      </HorizontalStack>
                      <Text variant="bodyXs" tone="subdued">
                        {need.description}
                      </Text>
                    </VerticalStack>
                  </Card>
                )
              })}
            </Grid>

            {/* Industry-Specific Recommendations */}
            {recommendations && (
              <Box padding="400" backgroundColor="bg-surface-secondary" borderRadius="200">
                <VerticalStack gap="200">
                  <Text variant="headingSm" as="h3">
                    Based on your {selectedIndustryData?.label} industry, we recommend:
                  </Text>
                  <HorizontalStack gap="200" wrap>
                    {recommendations.features.map((feature, index) => (
                      <Badge key={index} tone="attention">
                        {feature.split('-').map(word =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </Badge>
                    ))}
                  </HorizontalStack>
                </VerticalStack>
              </Box>
            )}
          </VerticalStack>
        </Box>
      </Card>
    </VerticalStack>
  )
}

export default IndustrySelection