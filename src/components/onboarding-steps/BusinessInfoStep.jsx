import React, { useEffect } from 'react'
import {
  Card,
  Text,
  TextField,
  Select,
  Button,
  Layout,
  BlockStack,
  InlineStack,
  Grid,
  FormLayout,
  Box
} from '@shopify/polaris'
import {
  StoreIcon,
  PersonIcon,
  EmailIcon,
  PhoneIcon
} from '@shopify/polaris-icons'

import { useOnboarding } from '../../contexts/OnboardingContext'

const BusinessInfoStep = ({ onValidationChange, onSave }) => {
  const { state, updateState } = useOnboarding()
  const { businessInfo } = state

  const handleFieldChange = (field, value) => {
    const updatedBusinessInfo = {
      ...businessInfo,
      [field]: value
    }

    // Handle nested contactInfo
    if (field.startsWith('contactInfo.')) {
      const contactField = field.replace('contactInfo.', '')
      updatedBusinessInfo.contactInfo = {
        ...businessInfo.contactInfo,
        [contactField]: value
      }
    }

    updateState({
      businessInfo: updatedBusinessInfo
    })

    // Auto-save
    if (onSave) {
      const timer = setTimeout(() => onSave(), 2000)
      return () => clearTimeout(timer)
    }
  }

  // Validate form
  useEffect(() => {
    const isValid = businessInfo.companyName.trim() !== '' &&
                   businessInfo.contactInfo.email.trim() !== '' &&
                   businessInfo.contactInfo.name.trim() !== '' &&
                   businessInfo.contactInfo.role.trim() !== ''

    onValidationChange(isValid)
  }, [businessInfo, onValidationChange])

  const industryOptions = [
    { label: 'Retail', value: 'retail' },
    { label: 'Manufacturing', value: 'manufacturing' },
    { label: 'Wholesale', value: 'wholesale' },
    { label: 'E-commerce', value: 'ecommerce' },
    { label: 'Food & Beverage', value: 'food-beverage' },
    { label: 'Apparel', value: 'apparel' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Other', value: 'other' }
  ]

  const businessSizeOptions = [
    { label: 'Startup (1-10 employees)', value: 'startup' },
    { label: 'Small (11-50 employees)', value: 'small' },
    { label: 'Medium (51-200 employees)', value: 'medium' },
    { label: 'Large (201-1000 employees)', value: 'large' },
    { label: 'Enterprise (1000+ employees)', value: 'enterprise' }
  ]

  const revenueOptions = [
    { label: 'Under $100,000', value: 'under-100k' },
    { label: '$100,000 - $500,000', value: '100k-500k' },
    { label: '$500,000 - $1M', value: '500k-1m' },
    { label: '$1M - $5M', value: '1m-5m' },
    { label: '$5M - $10M', value: '5m-10m' },
    { label: '$10M - $50M', value: '10m-50m' },
    { label: 'Over $50M', value: 'over-50m' }
  ]

  const roleOptions = [
    { label: 'Owner/Founder', value: 'owner' },
    { label: 'CEO/President', value: 'ceo' },
    { label: 'Operations Manager', value: 'operations' },
    { label: 'Inventory Manager', value: 'inventory' },
    { label: 'Sales Manager', value: 'sales' },
    { label: 'IT Manager', value: 'it' },
    { label: 'Financial Controller', value: 'finance' },
    { label: 'Other', value: 'other' }
  ]

  return (
    <BlockStack gap="600">
      {/* Company Information */}
      <Card>
        <Box padding="500">
          <BlockStack gap="400">
            <Text variant="headingLg" as="h2">
              Tell us about your business
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              This information helps us tailor Cin7 Core to your specific needs and provide personalized recommendations.
            </Text>

            <FormLayout>
              <TextField
                label="Company name"
                value={businessInfo.companyName}
                onChange={(value) => handleFieldChange('companyName', value)}
                placeholder="Enter your company name"
                autoComplete="organization"
                required
              />

              <Select
                label="Industry"
                options={industryOptions}
                value={businessInfo.industry}
                onChange={(value) => handleFieldChange('industry', value)}
                required
              />

              <Grid columns={{ xs: 1, sm: 2 }}>
                <Select
                  label="Business size"
                  options={businessSizeOptions}
                  value={businessInfo.businessSize}
                  onChange={(value) => handleFieldChange('businessSize', value)}
                  required
                />

                <Select
                  label="Annual revenue"
                  options={revenueOptions}
                  value={businessInfo.annualRevenue}
                  onChange={(value) => handleFieldChange('annualRevenue', value)}
                />
              </Grid>
            </FormLayout>
          </BlockStack>
        </Box>
      </Card>

      {/* Contact Information */}
      <Card>
        <Box padding="500">
          <BlockStack gap="400">
            <Text variant="headingLg" as="h2">
              Your contact information
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              We'll use this to personalize your experience and provide support during setup.
            </Text>

            <FormLayout>
              <Grid columns={{ xs: 1, sm: 2 }}>
                <TextField
                  label="Your name"
                  value={businessInfo.contactInfo.name}
                  onChange={(value) => handleFieldChange('contactInfo.name', value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />

                <TextField
                  label="Email address"
                  value={businessInfo.contactInfo.email}
                  onChange={(value) => handleFieldChange('contactInfo.email', value)}
                  placeholder="your.email@company.com"
                  type="email"
                  autoComplete="email"
                  required
                />
              </Grid>

              <Grid columns={{ xs: 1, sm: 2 }}>
                <Select
                  label="Your role"
                  options={roleOptions}
                  value={businessInfo.contactInfo.role}
                  onChange={(value) => handleFieldChange('contactInfo.role', value)}
                  required
                />

                <TextField
                  label="Phone number (optional)"
                  value={businessInfo.contactInfo.phone || ''}
                  onChange={(value) => handleFieldChange('contactInfo.phone', value)}
                  placeholder="+1 (555) 123-4567"
                  type="tel"
                  autoComplete="tel"
                />
              </Grid>
            </FormLayout>
          </BlockStack>
        </Box>
      </Card>

      {/* Current Systems */}
      <Card>
        <Box padding="500">
          <BlockStack gap="400">
            <Text variant="headingLg" as="h2">
              Current systems (optional)
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              Let us know what systems you're currently using. This helps us plan your migration and integrations.
            </Text>

            <FormLayout>
              <TextField
                label="What inventory or accounting systems are you currently using?"
                value={businessInfo.currentSystems.join(', ')}
                onChange={(value) => handleFieldChange('currentSystems', value.split(',').map(s => s.trim()).filter(s => s))}
                placeholder="e.g., QuickBooks, Excel spreadsheets, Shopify, etc."
                multiline={3}
              />
            </FormLayout>
          </BlockStack>
        </Box>
      </Card>

      {/* Business Goals */}
      <Card>
        <Box padding="500">
          <BlockStack gap="400">
            <Text variant="headingLg" as="h2">
              What are you hoping to achieve?
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              Understanding your goals helps us prioritize the right features and setup for your success.
            </Text>

            <FormLayout>
              <TextField
                label="What are your main business goals for using Cin7 Core?"
                value={businessInfo.goals.join(', ')}
                onChange={(value) => handleFieldChange('goals', value.split(',').map(s => s.trim()).filter(s => s))}
                placeholder="e.g., Reduce inventory costs, improve order fulfillment, scale operations, etc."
                multiline={4}
              />

              <TextField
                label="What challenges are you currently facing with inventory management?"
                value={businessInfo.painPoints.join(', ')}
                onChange={(value) => handleFieldChange('painPoints', value.split(',').map(s => s.trim()).filter(s => s))}
                placeholder="e.g., Stockouts, manual processes, lack of visibility, etc."
                multiline={3}
              />
            </FormLayout>
          </BlockStack>
        </Box>
      </Card>

      {/* Privacy Notice */}
      <Card>
        <Box padding="400" backgroundColor="bg-surface-secondary">
          <Text variant="bodySm" tone="subdued">
            <strong>Privacy Notice:</strong> Your information is secure and will only be used to personalize your Cin7 Core experience.
            We never share your data with third parties without your consent. You can update this information at any time in your account settings.
          </Text>
        </Box>
      </Card>
    </BlockStack>
  )
}

export default BusinessInfoStep