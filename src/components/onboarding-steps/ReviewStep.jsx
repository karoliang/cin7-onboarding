import React from 'react'
import {
  Card,
  Text,
  Button,
  Layout,
  VerticalStack,
  HorizontalStack,
  Grid,
  Badge,
  Icon,
  Box,
  Divider,
  Avatar
} from '@shopify/polaris'
import {
  CheckCircleIcon,
  EditIcon,
  PackageIcon,
  StorefrontIcon,
  TrendingUpIcon,
  ChartBarIcon,
  GlobeIcon,
  TruckIcon,
  BuildingIcon
} from '@shopify/polaris-icons'

import { useOnboarding } from '../../contexts/OnboardingContext'

const ReviewStep = ({ onValidationChange, onSave }) => {
  const { state } = useOnboarding()

  // This step is always valid
  React.useEffect(() => {
    onValidationChange(true)
  }, [onValidationChange])

  const { businessInfo, industrySelection, featureConfiguration } = state

  const getFeatureIcon = (featureId) => {
    const iconMap = {
      'inventory-management': PackageIcon,
      'order-management': StorefrontIcon,
      'customer-management': TrendingUpIcon,
      'reporting-analytics': ChartBarIcon,
      'ecommerce-integration': GlobeIcon,
      'pos-integration': StorefrontIcon,
      'accounting-integration': BuildingIcon,
      'supplier-management': TruckIcon
    }
    return iconMap[featureId] || PackageIcon
  }

  const getFeatureLabel = (featureId) => {
    const labelMap = {
      'inventory-management': 'Inventory Management',
      'order-management': 'Order Management',
      'customer-management': 'Customer Management',
      'reporting-analytics': 'Reporting & Analytics',
      'ecommerce-integration': 'E-commerce Integration',
      'pos-integration': 'POS Integration',
      'accounting-integration': 'Accounting Integration',
      'supplier-management': 'Supplier Management',
      'warehouse-management': 'Warehouse Management',
      'barcode-scanning': 'Barcode Scanning',
      'batch-tracking': 'Batch Tracking',
      'serial-tracking': 'Serial Tracking',
      'multi-currency': 'Multi-Currency',
      'multi-location': 'Multi-Location'
    }
    return labelMap[featureId] || featureId
  }

  const formatIndustry = (industry) => {
    return industry.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const formatBusinessSize = (size) => {
    const sizeMap = {
      startup: 'Startup (1-10 employees)',
      small: 'Small (11-50 employees)',
      medium: 'Medium (51-200 employees)',
      large: 'Large (201-1000 employees)',
      enterprise: 'Enterprise (1000+ employees)'
    }
    return sizeMap[size] || size
  }

  const calculateSetupTime = () => {
    const baseTime = 15 // Base setup time
    const featureTime = featureConfiguration.selectedFeatures.length * 5 // 5 min per feature
    const integrationTime = featureConfiguration.integrations.enabledIntegrations.length * 10 // 10 min per integration
    const workflowTime = featureConfiguration.workflowConfiguration.customWorkflows.length * 8 // 8 min per workflow
    const reportTime = featureConfiguration.reportingSetup.selectedReports.length * 3 // 3 min per report

    return baseTime + featureTime + integrationTime + workflowTime + reportTime
  }

  const totalSetupTime = calculateSetupTime()

  return (
    <VerticalStack gap="600">
      {/* Success Header */}
      <Card>
        <Box padding="600" textAlign="center">
          <VerticalStack gap="400">
            <Box textAlign="center">
              <Avatar customer size="extraLarge" name="Cin7 Core" />
            </Box>

            <Text variant="headingLg" as="h1">
              You're All Set!
            </Text>

            <Text variant="bodyLg" tone="subdued" as="p">
              Congratulations! Your Cin7 Core configuration is complete. Let's review everything one final time before we finish.
            </Text>

            <Badge size="large" tone="success">
              <Icon source={CheckCircleIcon} />
              <Box padding="100">
                <Text variant="bodySm" fontWeight="medium">
                  Ready to transform your inventory management
                </Text>
              </Box>
            </Badge>
          </VerticalStack>
        </Box>
      </Card>

      {/* Business Information Review */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <HorizontalStack gap="300">
              <Icon source={BuildingIcon} size="medium" />
              <Text variant="headingMd" as="h2">
                Business Profile
              </Text>
            </HorizontalStack>

            <Grid columns={{ xs: 1, sm: 2 }}>
              <VerticalStack gap="300">
                <Box>
                  <Text variant="bodySm" tone="subdued">Company Name</Text>
                  <Text variant="bodyMd" fontWeight="medium">
                    {businessInfo.companyName}
                  </Text>
                </Box>

                <Box>
                  <Text variant="bodySm" tone="subdued">Industry</Text>
                  <Text variant="bodyMd" fontWeight="medium">
                    {formatIndustry(industrySelection.selectedIndustry)}
                  </Text>
                </Box>

                <Box>
                  <Text variant="bodySm" tone="subdued">Business Size</Text>
                  <Text variant="bodyMd" fontWeight="medium">
                    {formatBusinessSize(businessInfo.businessSize)}
                  </Text>
                </Box>
              </VerticalStack>

              <VerticalStack gap="300">
                <Box>
                  <Text variant="bodySm" tone="subdued">Contact Person</Text>
                  <Text variant="bodyMd" fontWeight="medium">
                    {businessInfo.contactInfo.name}
                  </Text>
                </Box>

                <Box>
                  <Text variant="bodySm" tone="subdued">Email</Text>
                  <Text variant="bodyMd" fontWeight="medium">
                    {businessInfo.contactInfo.email}
                  </Text>
                </Box>

                <Box>
                  <Text variant="bodySm" tone="subdued">Role</Text>
                  <Text variant="bodyMd" fontWeight="medium">
                    {businessInfo.contactInfo.role.charAt(0).toUpperCase() + businessInfo.contactInfo.role.slice(1)}
                  </Text>
                </Box>
              </VerticalStack>
            </Grid>
          </VerticalStack>
        </Box>
      </Card>

      {/* Selected Features Review */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <HorizontalStack gap="300">
              <Icon source={PackageIcon} size="medium" />
              <Text variant="headingMd" as="h2">
                Selected Features ({featureConfiguration.selectedFeatures.length})
              </Text>
            </HorizontalStack>

            <Grid columns={{ xs: 1, sm: 2, md: 3 }}>
              {featureConfiguration.selectedFeatures.map((featureId) => {
                const IconComponent = getFeatureIcon(featureId)

                return (
                  <Box key={featureId} padding="200">
                    <HorizontalStack gap="200">
                      <IconComponent size="small" tone="primary" />
                      <Text variant="bodySm" fontWeight="medium">
                        {getFeatureLabel(featureId)}
                      </Text>
                    </HorizontalStack>
                  </Box>
                )
              })}
            </Grid>

            {featureConfiguration.selectedFeatures.length === 0 && (
              <Text variant="bodySm" tone="subdued">
                No features selected. You can add features later from the settings.
              </Text>
            )}
          </VerticalStack>
        </Box>
      </Card>

      {/* Integrations Review */}
      {featureConfiguration.integrations.enabledIntegrations.length > 0 && (
        <Card>
          <Box padding="500">
            <VerticalStack gap="400">
              <HorizontalStack gap="300">
                <Icon source={GlobeIcon} size="medium" />
                <Text variant="headingMd" as="h2">
                  Integrations ({featureConfiguration.integrations.enabledIntegrations.length})
                </Text>
              </HorizontalStack>

              <Grid columns={{ xs: 1, sm: 2, md: 3 }}>
                {featureConfiguration.integrations.enabledIntegrations.map((integration) => (
                  <Box key={integration.id} padding="200">
                    <HorizontalStack gap="200">
                      <Icon source={CheckCircleIcon} size="small" tone="success" />
                      <Text variant="bodySm" fontWeight="medium">
                        {integration.name}
                      </Text>
                      <Badge size="small" tone="info">
                        Setup Later
                      </Badge>
                    </HorizontalStack>
                  </Box>
                ))}
              </Grid>
            </VerticalStack>
          </Box>
        </Card>
      )}

      {/* Workflows Review */}
      {featureConfiguration.workflowConfiguration.customWorkflows.length > 0 && (
        <Card>
          <Box padding="500">
            <VerticalStack gap="400">
              <HorizontalStack gap="300">
                <Icon source={TrendingUpIcon} size="medium" />
                <Text variant="headingMd" as="h2">
                  Automated Workflows ({featureConfiguration.workflowConfiguration.customWorkflows.length})
                </Text>
              </HorizontalStack>

              <VerticalStack gap="200">
                {featureConfiguration.workflowConfiguration.customWorkflows.map((workflow) => (
                  <HorizontalStack key={workflow.name} gap="200">
                    <Icon source={CheckCircleIcon} size="small" tone="success" />
                    <Text variant="bodySm" fontWeight="medium">
                      {workflow.name}
                    </Text>
                    <Badge size="small" tone="success">
                      Active
                    </Badge>
                  </HorizontalStack>
                ))}
              </VerticalStack>
            </VerticalStack>
          </Box>
        </Card>
      )}

      {/* Reports Review */}
      {featureConfiguration.reportingSetup.selectedReports.length > 0 && (
        <Card>
          <Box padding="500">
            <VerticalStack gap="400">
              <HorizontalStack gap="300">
                <Icon source={ChartBarIcon} size="medium" />
                <Text variant="headingMd" as="h2">
                  Reports ({featureConfiguration.reportingSetup.selectedReports.length})
                </Text>
              </HorizontalStack>

              <Grid columns={{ xs: 1, sm: 2, md: 3 }}>
                {featureConfiguration.reportingSetup.selectedReports.map((report) => (
                  <Box key={report.id} padding="200">
                    <HorizontalStack gap="200">
                      <Icon source={CheckCircleIcon} size="small" tone="success" />
                      <Text variant="bodySm" fontWeight="medium">
                        {report.name}
                      </Text>
                      <Badge size="small" tone="info">
                        {report.schedule}
                      </Badge>
                    </HorizontalStack>
                  </Box>
                ))}
              </Grid>
            </VerticalStack>
          </Box>
        </Card>
      )}

      {/* Setup Summary */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingMd" as="h2">
              Setup Summary
            </Text>

            <Grid columns={{ xs: 1, sm: 3 }}>
              <Box textAlign="center" padding="200">
                <Text variant="headingLg" tone="primary">
                  {Math.round(totalSetupTime / 60)}h {totalSetupTime % 60}m
                </Text>
                <Text variant="bodySm" tone="subdued">
                  Estimated Setup Time
                </Text>
              </Box>

              <Box textAlign="center" padding="200">
                <Text variant="headingLg" tone="primary">
                  {featureConfiguration.selectedFeatures.length}
                </Text>
                <Text variant="bodySm" tone="subdued">
                  Features Configured
                </Text>
              </Box>

              <Box textAlign="center" padding="200">
                <Text variant="headingLg" tone="primary">
                  {featureConfiguration.integrations.enabledIntegrations.length +
                   featureConfiguration.workflowConfiguration.customWorkflows.length +
                   featureConfiguration.reportingSetup.selectedReports.length}
                </Text>
                <Text variant="bodySm" tone="subdued">
                  Automations Added
                </Text>
              </Box>
            </Grid>

            <Box padding="400" backgroundColor="bg-surface-secondary" borderRadius="200">
              <VerticalStack gap="300">
                <Text variant="bodySm" fontWeight="medium" textAlign="center">
                  What happens next?
                </Text>
                <VerticalStack gap="200">
                  <HorizontalStack gap="200">
                    <Icon source={CheckCircleIcon} size="small" tone="success" />
                    <Text variant="bodySm">Your configuration will be saved and applied</Text>
                  </HorizontalStack>
                  <HorizontalStack gap="200">
                    <Icon source={CheckCircleIcon} size="small" tone="success" />
                    <Text variant="bodySm">You'll be redirected to your dashboard</Text>
                  </HorizontalStack>
                  <HorizontalStack gap="200">
                    <Icon source={CheckCircleIcon} size="small" tone="success" />
                    <Text variant="bodySm">Start using Cin7 Core immediately</Text>
                  </HorizontalStack>
                  <HorizontalStack gap="200">
                    <Icon source={CheckCircleIcon} size="small" tone="success" />
                    <Text variant="bodySm">Access guided tours and help resources anytime</Text>
                  </HorizontalStack>
                </VerticalStack>
              </VerticalStack>
            </Box>
          </VerticalStack>
        </Box>
      </Card>

      {/* Final Confirmation */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingLg" as="h2" textAlign="center">
              Ready to Get Started?
            </Text>

            <Text variant="bodyLg" tone="subdued" textAlign="center">
              Click "Complete Setup" to finalize your Cin7 Core configuration and start managing your inventory more efficiently.
            </Text>

            <Box padding="400" backgroundColor="bg-success-subdued" borderRadius="200" textAlign="center">
              <VerticalStack gap="200">
                <Icon source={CheckCircleIcon} size="large" tone="success" />
                <Text variant="bodySm" fontWeight="medium">
                  Congratulations! You've successfully configured Cin7 Core for your business.
                </Text>
                <Text variant="bodySm" tone="subdued">
                  You can modify any of these settings later from the configuration panel.
                </Text>
              </VerticalStack>
            </Box>
          </VerticalStack>
        </Box>
      </Card>
    </VerticalStack>
  )
}

export default ReviewStep