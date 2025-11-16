import React from 'react'
import {
  Card,
  Text,
  Button,
  Checkbox,
  Layout,
  VerticalStack,
  HorizontalStack,
  Grid,
  Badge,
  Icon,
  Box
} from '@shopify/polaris'
import {
  StoreIcon,
  GlobeIcon,
  CreditCardIcon,
  TruckIcon,
  BuildingIcon,
  MobileIcon
} from '@shopify/polaris-icons'

import { useOnboarding } from '../../contexts/OnboardingContext'

const INTEGRATION_OPTIONS = [
  {
    category: 'Accounting',
    icon: CreditCardIcon,
    integrations: [
      { id: 'quickbooks', name: 'QuickBooks', description: 'Sync invoices, expenses, and financial data' },
      { id: 'xero', name: 'Xero', description: 'Automated accounting and bookkeeping' },
      { id: 'sage', name: 'Sage', description: 'Business management and accounting' }
    ]
  },
  {
    category: 'E-commerce',
    icon: GlobeIcon,
    integrations: [
      { id: 'shopify', name: 'Shopify', description: 'Sync products, orders, and inventory' },
      { id: 'woocommerce', name: 'WooCommerce', description: 'WordPress e-commerce integration' },
      { id: 'amazon', name: 'Amazon', description: 'Multi-channel marketplace selling' },
      { id: 'ebay', name: 'eBay', description: 'Online auction and marketplace' }
    ]
  },
  {
    category: 'Shipping',
    icon: TruckIcon,
    integrations: [
      { id: 'fedex', name: 'FedEx', description: 'Real-time rates and label printing' },
      { id: 'ups', name: 'UPS', description: 'Package shipping and tracking' },
      { id: 'shipstation', name: 'ShipStation', description: 'Multi-carrier shipping solution' }
    ]
  },
  {
    category: 'Point of Sale',
    icon: StoreIcon,
    integrations: [
      { id: 'square', name: 'Square', description: 'In-person payments and inventory' },
      { id: 'shopify-pos', name: 'Shopify POS', description: 'Unified retail and online selling' },
      { id: 'lightspeed', name: 'Lightspeed', description: 'Retail POS and inventory management' }
    ]
  },
  {
    category: 'CRM',
    icon: MobileIcon,
    integrations: [
      { id: 'salesforce', name: 'Salesforce', description: 'Customer relationship management' },
      { id: 'hubspot', name: 'HubSpot', description: 'Marketing, sales, and service' }
    ]
  },
  {
    category: 'Payment Processing',
    icon: CreditCardIcon,
    integrations: [
      { id: 'stripe', name: 'Stripe', description: 'Online payment processing' },
      { id: 'paypal', name: 'PayPal', description: 'Digital payments and invoicing' }
    ]
  }
]

const IntegrationsStep = ({ onValidationChange, onSave }) => {
  const { state, updateState } = useOnboarding()
  const [selectedIntegrations, setSelectedIntegrations] = useState(
    state.featureConfiguration.integrations.enabledIntegrations.map(i => i.id) || []
  )

  const handleIntegrationToggle = (integrationId) => {
    const isSelected = selectedIntegrations.includes(integrationId)
    const newSelection = isSelected
      ? selectedIntegrations.filter(id => id !== integrationId)
      : [...selectedIntegrations, integrationId]

    setSelectedIntegrations(newSelection)

    const enabledIntegrations = newSelection.map(id => ({
      id,
      name: INTEGRATION_OPTIONS
        .flatMap(cat => cat.integrations)
        .find(integration => integration.id === id)?.name || id,
      type: 'other',
      status: 'not-connected',
      configuration: {}
    }))

    updateState({
      featureConfiguration: {
        ...state.featureConfiguration,
        integrations: {
          ...state.featureConfiguration.integrations,
          enabledIntegrations
        }
      }
    })
  }

  // This step is optional - always valid
  React.useEffect(() => {
    onValidationChange(true)
  }, [onValidationChange])

  return (
    <VerticalStack gap="600">
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingLg" as="h2">
              Connect Your Tools
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              Select the tools you currently use. We'll help you connect them to Cin7 Core for seamless data flow.
            </Text>

            <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
              <Text variant="bodySm" tone="subdued">
                Don't worry if you don't see your favorite tool here - we support many more integrations and can set up custom connections as needed.
              </Text>
            </Box>
          </VerticalStack>
        </Box>
      </Card>

      {INTEGRATION_OPTIONS.map((category) => (
        <Card key={category.category}>
          <Box padding="500">
            <VerticalStack gap="400">
              <HorizontalStack gap="300">
                <Icon source={category.icon} size="medium" />
                <Text variant="headingMd" as="h2">
                  {category.category}
                </Text>
              </HorizontalStack>

              <Grid columns={{ xs: 1, sm: 2, md: 3 }}>
                {category.integrations.map((integration) => {
                  const isSelected = selectedIntegrations.includes(integration.id)

                  return (
                    <Card
                      key={integration.id}
                      background={isSelected ? 'bg-surface-selected' : 'bg-surface'}
                      borderWidth={isSelected ? '2px' : '1px'}
                      borderColor={isSelected ? 'border-primary' : 'border-transparent'}
                      padding="400"
                      cursor="pointer"
                      onClick={() => handleIntegrationToggle(integration.id)}
                    >
                      <VerticalStack gap="300">
                        <HorizontalStack align="space-between">
                          <Text variant="bodySm" fontWeight="medium">
                            {integration.name}
                          </Text>
                          <Checkbox
                            label=""
                            checked={isSelected}
                            onChange={() => {}}
                          />
                        </HorizontalStack>

                        <Text variant="bodyXs" tone="subdued">
                          {integration.description}
                        </Text>

                        {isSelected && (
                          <Badge size="small" tone="success">
                            Will Connect
                          </Badge>
                        )}
                      </VerticalStack>
                    </Card>
                  )
                })}
              </Grid>
            </VerticalStack>
          </Box>
        </Card>
      ))}

      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingMd" as="h2">
              Selected Integrations ({selectedIntegrations.length})
            </Text>

            {selectedIntegrations.length > 0 ? (
              <VerticalStack gap="200">
                {selectedIntegrations.map((integrationId) => {
                  const integration = INTEGRATION_OPTIONS
                    .flatMap(cat => cat.integrations)
                    .find(i => i.id === integrationId)

                  return integration ? (
                    <HorizontalStack key={integrationId} gap="200">
                      <Icon source={CheckCircleIcon} size="small" tone="success" />
                      <Text variant="bodySm">{integration.name}</Text>
                      <Badge size="small" tone="info">Setup Later</Badge>
                    </HorizontalStack>
                  ) : null
                })}
              </VerticalStack>
            ) : (
              <Text variant="bodySm" tone="subdued">
                No integrations selected. You can always add them later from the settings.
              </Text>
            )}
          </VerticalStack>
        </Box>
      </Card>
    </VerticalStack>
  )
}

export default IntegrationsStep