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
  Box,
  Divider
} from '@shopify/polaris'
import {
  AutomationIcon,
  AlertIcon,
  PackageIcon,
  ClockIcon,
  CheckCircleIcon
} from '@shopify/polaris-icons'

import { useOnboarding } from '../../contexts/OnboardingContext'

const WORKFLOW_TEMPLATES = [
  {
    id: 'low-stock-alerts',
    name: 'Low Stock Alerts',
    description: 'Automatically notify when inventory levels drop below reorder points',
    category: 'inventory',
    difficulty: 'easy',
    estimatedTime: '5 min',
    icon: AlertIcon
  },
  {
    id: 'auto-reorder',
    name: 'Automatic Reordering',
    description: 'Generate purchase orders when stock reaches specified levels',
    category: 'inventory',
    difficulty: 'medium',
    estimatedTime: '10 min',
    icon: PackageIcon
  },
  {
    id: 'order-confirmation',
    name: 'Order Confirmation Emails',
    description: 'Send automatic order confirmations to customers',
    category: 'sales',
    difficulty: 'easy',
    estimatedTime: '5 min',
    icon: AutomationIcon
  },
  {
    id: 'shipping-notifications',
    name: 'Shipping Notifications',
    description: 'Notify customers when orders ship with tracking information',
    category: 'sales',
    difficulty: 'easy',
    estimatedTime: '5 min',
    icon: ClockIcon
  },
  {
    id: 'multi-channel-sync',
    name: 'Multi-Channel Sync',
    description: 'Automatically sync inventory across all sales channels',
    category: 'integration',
    difficulty: 'medium',
    estimatedTime: '15 min',
    icon: AutomationIcon
  },
  {
    id: 'price-updates',
    name: 'Automated Price Updates',
    description: 'Update prices across channels based on rules or supplier costs',
    category: 'pricing',
    difficulty: 'advanced',
    estimatedTime: '20 min',
    icon: AutomationIcon
  }
]

const WorkflowsStep = ({ onValidationChange, onSave }) => {
  const { state, updateState } = useOnboarding()
  const [selectedWorkflows, setSelectedWorkflows] = useState([])

  const handleWorkflowToggle = (workflowId) => {
    const isSelected = selectedWorkflows.includes(workflowId)
    const newSelection = isSelected
      ? selectedWorkflows.filter(id => id !== workflowId)
      : [...selectedWorkflows, workflowId]

    setSelectedWorkflows(newSelection)

    const customWorkflows = newSelection.map(id => {
      const template = WORKFLOW_TEMPLATES.find(w => w.id === id)
      return {
        name: template.name,
        trigger: id,
        steps: [
          {
            id: `${id}-step-1`,
            name: template.name,
            type: 'automated',
            action: id,
            order: 1,
            enabled: true
          }
        ],
        enabled: true
      }
    })

    updateState({
      featureConfiguration: {
        ...state.featureConfiguration,
        workflowConfiguration: {
          ...state.featureConfiguration.workflowConfiguration,
          customWorkflows
        }
      }
    })
  }

  // This step is optional - always valid
  React.useEffect(() => {
    onValidationChange(true)
  }, [onValidationChange])

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'success',
      medium: 'attention',
      advanced: 'critical'
    }
    return colors[difficulty] || 'info'
  }

  const getRecommendedWorkflows = () => {
    const industry = state.industrySelection.selectedIndustry
    const operationalNeeds = state.industrySelection.operationalNeeds

    const recommendations = []

    if (operationalNeeds.includes('inventory-management')) {
      recommendations.push('low-stock-alerts')
    }

    if (operationalNeeds.includes('order-processing')) {
      recommendations.push('order-confirmation', 'shipping-notifications')
    }

    if (operationalNeeds.includes('multi-channel-sync')) {
      recommendations.push('multi-channel-sync')
    }

    if (['manufacturing', 'wholesale'].includes(industry)) {
      recommendations.push('auto-reorder')
    }

    return recommendations
  }

  const recommendedWorkflows = getRecommendedWorkflows()

  return (
    <VerticalStack gap="600">
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingLg" as="h2">
              Automate Your Workflow
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              Choose automated workflows to save time and reduce manual work. We'll set up the basic templates that you can customize later.
            </Text>

            <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
              <VerticalStack gap="200">
                <Text variant="bodySm" fontWeight="medium">
                  Recommended for your {state.industrySelection.selectedIndustry} business:
                </Text>
                <HorizontalStack gap="200" wrap>
                  {recommendedWorkflows.map(workflowId => {
                    const workflow = WORKFLOW_TEMPLATES.find(w => w.id === workflowId)
                    return workflow ? (
                      <Badge key={workflowId} tone="info">
                        {workflow.name}
                      </Badge>
                    ) : null
                  })}
                </HorizontalStack>
              </VerticalStack>
            </Box>
          </VerticalStack>
        </Box>
      </Card>

      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingMd" as="h2">
              Available Workflow Templates
            </Text>

            <Grid columns={{ xs: 1, sm: 2 }}>
              {WORKFLOW_TEMPLATES.map((workflow) => {
                const isSelected = selectedWorkflows.includes(workflow.id)
                const isRecommended = recommendedWorkflows.includes(workflow.id)

                return (
                  <Card
                    key={workflow.id}
                    background={isSelected ? 'bg-surface-selected' : 'bg-surface'}
                    borderWidth={isSelected ? '2px' : '1px'}
                    borderColor={isSelected ? 'border-primary' : 'border-transparent'}
                    padding="400"
                    cursor="pointer"
                    onClick={() => handleWorkflowToggle(workflow.id)}
                  >
                    <VerticalStack gap="300">
                      <HorizontalStack align="space-between">
                        <HorizontalStack gap="200">
                          <Icon source={workflow.icon} size="small" />
                          <Text variant="bodySm" fontWeight="medium">
                            {workflow.name}
                          </Text>
                        </HorizontalStack>
                        <Checkbox
                          label=""
                          checked={isSelected}
                          onChange={() => {}}
                        />
                      </HorizontalStack>

                      <Text variant="bodyXs" tone="subdued">
                        {workflow.description}
                      </Text>

                      <HorizontalStack gap="200" wrap>
                        <Badge size="small" tone={getDifficultyColor(workflow.difficulty)}>
                          {workflow.difficulty}
                        </Badge>
                        <Badge size="small" tone="info">
                          {workflow.estimatedTime}
                        </Badge>
                        {isRecommended && (
                          <Badge size="small" tone="success">
                            Recommended
                          </Badge>
                        )}
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

      {selectedWorkflows.length > 0 && (
        <Card>
          <Box padding="500">
            <VerticalStack gap="400">
              <Text variant="headingMd" as="h2">
                Selected Workflows ({selectedWorkflows.length})
              </Text>

              <VerticalStack gap="200">
                {selectedWorkflows.map((workflowId) => {
                  const workflow = WORKFLOW_TEMPLATES.find(w => w.id === workflowId)
                  return workflow ? (
                    <HorizontalStack key={workflowId} gap="200">
                      <Icon source={CheckCircleIcon} size="small" tone="success" />
                      <Text variant="bodySm">{workflow.name}</Text>
                      <Badge size="small" tone="info">
                        {workflow.estimatedTime} setup
                      </Badge>
                    </HorizontalStack>
                  ) : null
                })}
              </VerticalStack>

              <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
                <Text variant="bodySm" tone="subdued">
                  These workflows will be automatically configured during setup. You can modify them anytime from the automation settings.
                </Text>
              </Box>
            </VerticalStack>
          </Box>
        </Card>
      )}

      <Card>
        <Box padding="400" backgroundColor="bg-surface-tertiary">
          <HorizontalStack gap="300">
            <Icon source={AutomationIcon} size="small" tone="attention" />
            <Text variant="bodySm" tone="subdued">
              <strong>Pro Tip:</strong> Start with a few simple workflows and add more as you get comfortable with the system. You can always create custom workflows later.
            </Text>
          </HorizontalStack>
        </Box>
      </Card>
    </VerticalStack>
  )
}

export default WorkflowsStep