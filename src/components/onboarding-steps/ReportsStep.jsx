import React from 'react'
import {
  Card,
  Text,
  Checkbox,
  Layout,
  VerticalStack,
  HorizontalStack,
  Grid,
  Badge,
  Icon,
  Box,
  Divider
} from '@shopify/polaris'
import {
  ChartBarIcon,
  TrendingUpIcon,
  DollarCircleIcon,
  PackageIcon,
  CustomersIcon,
  ClockIcon,
  AlertIcon,
  BuildingIcon
} from '@shopify/polaris-icons'

import { useOnboarding } from '../../contexts/OnboardingContext'

const REPORT_TEMPLATES = [
  {
    id: 'sales-overview',
    name: 'Sales Overview',
    description: 'Track sales performance, trends, and revenue metrics',
    category: 'sales',
    frequency: 'daily',
    icon: TrendingUpIcon,
    essential: true
  },
  {
    id: 'inventory-summary',
    name: 'Inventory Summary',
    description: 'Monitor stock levels, turnover, and product performance',
    category: 'inventory',
    frequency: 'daily',
    icon: PackageIcon,
    essential: true
  },
  {
    id: 'low-stock-alert',
    name: 'Low Stock Alert',
    description: 'Daily report of products needing reordering',
    category: 'inventory',
    frequency: 'daily',
    icon: AlertIcon,
    essential: true
  },
  {
    id: 'customer-analysis',
    name: 'Customer Analysis',
    description: 'Customer behavior, segmentation, and lifetime value',
    category: 'customers',
    frequency: 'weekly',
    icon: CustomersIcon,
    essential: false
  },
  {
    id: 'financial-summary',
    name: 'Financial Summary',
    description: 'Revenue, costs, and profit analysis',
    category: 'financial',
    frequency: 'monthly',
    icon: DollarCircleIcon,
    essential: false
  },
  {
    id: 'best-sellers',
    name: 'Best Sellers Report',
    description: 'Top performing products and categories',
    category: 'sales',
    frequency: 'weekly',
    icon: TrendingUpIcon,
    essential: false
  },
  {
    id: 'order-fulfillment',
    name: 'Order Fulfillment Report',
    description: 'Processing times, shipping performance, and bottlenecks',
    category: 'operations',
    frequency: 'daily',
    icon: ClockIcon,
    essential: false
  },
  {
    id: 'supplier-performance',
    name: 'Supplier Performance',
    description: 'Supplier reliability, costs, and delivery times',
    category: 'procurement',
    frequency: 'monthly',
    icon: BuildingIcon,
    essential: false
  }
]

const ReportsStep = ({ onValidationChange, onSave }) => {
  const { state, updateState } = useOnboarding()
  const [selectedReports, setSelectedReports] = useState(
    state.featureConfiguration.reportingSetup.selectedReports.map(r => r.id) || []
  )
  const [reportFrequency, setReportFrequency] = useState(
    state.featureConfiguration.reportingSetup.reportFrequency || 'monthly'
  )

  const handleReportToggle = (reportId) => {
    const isSelected = selectedReports.includes(reportId)
    const newSelection = isSelected
      ? selectedReports.filter(id => id !== reportId)
      : [...selectedReports, reportId]

    setSelectedReports(newSelection)

    const selectedReportsData = newSelection.map(id => {
      const template = REPORT_TEMPLATES.find(r => r.id === id)
      return {
        id,
        name: template.name,
        category: template.category,
        enabled: true,
        schedule: reportFrequency,
        recipients: []
      }
    })

    updateState({
      featureConfiguration: {
        ...state.featureConfiguration,
        reportingSetup: {
          ...state.featureConfiguration.reportingSetup,
          selectedReports: selectedReportsData,
          reportFrequency
        }
      }
    })
  }

  const handleFrequencyChange = (frequency) => {
    setReportFrequency(frequency)
    updateState({
      featureConfiguration: {
        ...state.featureConfiguration,
        reportingSetup: {
          ...state.featureConfiguration.reportingSetup,
          reportFrequency: frequency
        }
      }
    })
  }

  // Validate form - at least one report must be selected
  React.useEffect(() => {
    const isValid = selectedReports.length >= 1
    onValidationChange(isValid)
  }, [selectedReports, onValidationChange])

  const essentialReports = REPORT_TEMPLATES.filter(r => r.essential)
  const optionalReports = REPORT_TEMPLATES.filter(r => !r.essential)

  const getCategoryColor = (category) => {
    const colors = {
      sales: 'success',
      inventory: 'attention',
      customers: 'info',
      financial: 'critical',
      operations: 'warning',
      procurement: 'subdued'
    }
    return colors[category] || 'info'
  }

  return (
    <VerticalStack gap="600">
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingLg" as="h2">
              Set Up Your Reports
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              Choose the reports that will help you track your business performance. We'll configure the basic templates that you can customize later.
            </Text>

            <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
              <Text variant="bodySm" tone="subdued">
                Reports will be automatically generated based on your data and can be accessed anytime from the dashboard.
              </Text>
            </Box>
          </VerticalStack>
        </Box>
      </Card>

      {/* Essential Reports */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingMd" as="h2">
              Essential Reports
            </Text>
            <Text variant="bodySm" tone="subdued" as="p">
              These reports are recommended for all businesses to get started with basic insights.
            </Text>

            <Grid columns={{ xs: 1, sm: 2, md: 3 }}>
              {essentialReports.map((report) => {
                const isSelected = selectedReports.includes(report.id)

                return (
                  <Card
                    key={report.id}
                    background={isSelected ? 'bg-surface-selected' : 'bg-surface'}
                    borderWidth={isSelected ? '2px' : '1px'}
                    borderColor={isSelected ? 'border-primary' : 'border-transparent'}
                    padding="400"
                    cursor="pointer"
                    onClick={() => handleReportToggle(report.id)}
                  >
                    <VerticalStack gap="300">
                      <HorizontalStack align="space-between">
                        <HorizontalStack gap="200">
                          <Icon source={report.icon} size="small" />
                          <Text variant="bodySm" fontWeight="medium">
                            {report.name}
                          </Text>
                        </HorizontalStack>
                        <Checkbox
                          label=""
                          checked={isSelected}
                          onChange={() => {}}
                        />
                      </HorizontalStack>

                      <Text variant="bodyXs" tone="subdued">
                        {report.description}
                      </Text>

                      <HorizontalStack gap="200" wrap>
                        <Badge size="small" tone={getCategoryColor(report.category)}>
                          {report.category}
                        </Badge>
                        <Badge size="small" tone="info">
                          {report.frequency}
                        </Badge>
                        {isSelected && (
                          <Badge size="small" tone="success">
                            Selected
                          </Badge>
                        )}
                      </HorizontalStack>
                    </VerticalStack>
                  </Card>
                )
              })}
            </Grid>
          </VerticalStack>
        </Box>
      </Card>

      {/* Optional Reports */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingMd" as="h2">
              Optional Reports
            </Text>
            <Text variant="bodySm" tone="subdued" as="p">
              These reports provide additional insights for specific aspects of your business.
            </Text>

            <Grid columns={{ xs: 1, sm: 2, md: 3 }}>
              {optionalReports.map((report) => {
                const isSelected = selectedReports.includes(report.id)

                return (
                  <Card
                    key={report.id}
                    background={isSelected ? 'bg-surface-selected' : 'bg-surface'}
                    borderWidth={isSelected ? '2px' : '1px'}
                    borderColor={isSelected ? 'border-primary' : 'border-transparent'}
                    padding="400"
                    cursor="pointer"
                    onClick={() => handleReportToggle(report.id)}
                  >
                    <VerticalStack gap="300">
                      <HorizontalStack align="space-between">
                        <HorizontalStack gap="200">
                          <Icon source={report.icon} size="small" />
                          <Text variant="bodySm" fontWeight="medium">
                            {report.name}
                          </Text>
                        </HorizontalStack>
                        <Checkbox
                          label=""
                          checked={isSelected}
                          onChange={() => {}}
                        />
                      </HorizontalStack>

                      <Text variant="bodyXs" tone="subdued">
                        {report.description}
                      </Text>

                      <HorizontalStack gap="200" wrap>
                        <Badge size="small" tone={getCategoryColor(report.category)}>
                          {report.category}
                        </Badge>
                        <Badge size="small" tone="info">
                          {report.frequency}
                        </Badge>
                        {isSelected && (
                          <Badge size="small" tone="success">
                            Selected
                          </Badge>
                        )}
                      </HorizontalStack>
                    </VerticalStack>
                  </Card>
                )
              })}
            </Grid>
          </VerticalStack>
        </Box>
      </Card>

      {/* Report Settings */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingMd" as="h2">
              Report Preferences
            </Text>

            <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
              <VerticalStack gap="300">
                <Text variant="bodySm" fontWeight="medium">
                  How often would you like to receive automated reports?
                </Text>
                <HorizontalStack gap="200">
                  {['daily', 'weekly', 'monthly'].map((frequency) => (
                    <Badge
                      key={frequency}
                      size="large"
                      tone={reportFrequency === frequency ? 'primary' : 'subdued'}
                      onClick={() => handleFrequencyChange(frequency)}
                      cursor="pointer"
                    >
                      {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                    </Badge>
                  ))}
                </HorizontalStack>
              </VerticalStack>
            </Box>

            <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
              <VerticalStack gap="200">
                <Text variant="bodySm" tone="subdued">
                  <strong>Note:</strong> You can always access reports manually from the dashboard, regardless of the automated delivery schedule.
                </Text>
              </VerticalStack>
            </Box>
          </VerticalStack>
        </Box>
      </Card>

      {/* Summary */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingMd" as="h2">
              Report Configuration Summary
            </Text>

            <HorizontalStack gap="400">
              <Box>
                <Text variant="bodySm" tone="subdued">Selected Reports:</Text>
                <Text variant="headingLg">{selectedReports.length}</Text>
              </Box>
              <Box>
                <Text variant="bodySm" tone="subdued">Delivery Schedule:</Text>
                <Text variant="headingLg">{reportFrequency}</Text>
              </Box>
              <Box>
                <Text variant="bodySm" tone="subdued">Categories:</Text>
                <Text variant="headingLg">
                  {[...new Set(selectedReports.map(id =>
                    REPORT_TEMPLATES.find(r => r.id === id)?.category
                  ))].length}
                </Text>
              </Box>
            </HorizontalStack>

            {selectedReports.length > 0 && (
              <VerticalStack gap="200">
                <Text variant="bodySm" fontWeight="medium">
                  Reports to be configured:
                </Text>
                <VerticalStack gap="100">
                  {selectedReports.map((reportId) => {
                    const report = REPORT_TEMPLATES.find(r => r.id === reportId)
                    return report ? (
                      <HorizontalStack key={reportId} gap="200">
                        <Icon source={CheckCircleIcon} size="small" tone="success" />
                        <Text variant="bodySm">{report.name}</Text>
                        <Badge size="small" tone={getCategoryColor(report.category)}>
                          {report.category}
                        </Badge>
                      </HorizontalStack>
                    ) : null
                  })}
                </VerticalStack>
              </VerticalStack>
            )}
          </VerticalStack>
        </Box>
      </Card>
    </VerticalStack>
  )
}

export default ReportsStep