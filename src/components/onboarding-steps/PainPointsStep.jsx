import React, { useEffect, useState } from 'react'
import {
  Card,
  Text,
  Checkbox,
  ChoiceList,
  TextField,
  Button,
  Layout,
  BlockStack,
  InlineStack,
  Grid,
  Badge,
  Icon,
  Box,
  Divider
} from '@shopify/polaris'
import {
  AlertCircleIcon,
  ArrowUpIcon,
  ClockIcon,
  CashDollarIcon,
  PackageIcon,
  PersonIcon,
  MobileIcon,
  ChartVerticalIcon
} from '@shopify/polaris-icons'

import { useOnboarding } from '../../contexts/OnboardingContext'

const COMMON_PAIN_POINTS = [
  {
    value: 'stockouts',
    label: 'Frequent Stockouts',
    description: 'Running out of popular products and losing sales',
    icon: PackageIcon,
    category: 'inventory'
  },
  {
    value: 'overstock',
    label: 'Excess Inventory',
    description: 'Too much capital tied up in unsold products',
    icon: PackageIcon,
    category: 'inventory'
  },
  {
    value: 'manual-processes',
    label: 'Manual Data Entry',
    description: 'Time-consuming manual updates and tracking',
    icon: ClockIcon,
    category: 'efficiency'
  },
  {
    value: 'lack-visibility',
    label: 'Limited Visibility',
    description: 'Can\'t see real-time inventory across locations',
    icon: ChartVerticalIcon,
    category: 'visibility'
  },
  {
    value: 'order-fulfillment',
    label: 'Slow Order Processing',
    description: 'Orders take too long to process and ship',
    icon: ClockIcon,
    category: 'efficiency'
  },
  {
    value: 'customer-service',
    label: 'Customer Service Issues',
    description: 'Inaccurate stock information leading to customer complaints',
    icon: PersonIcon,
    category: 'customer'
  },
  {
    value: 'multi-channel',
    label: 'Multi-channel Complexity',
    description: 'Difficult to sync inventory across different sales channels',
    icon: MobileIcon,
    category: 'integration'
  },
  {
    value: 'cost-control',
    label: 'Rising Costs',
    description: 'Storage and carrying costs are too high',
    icon: CashDollarIcon,
    category: 'financial'
  },
  {
    value: 'growth-scaling',
    label: 'Scaling Challenges',
    description: 'Current systems can\'t handle business growth',
    icon: ArrowUpIcon,
    category: 'growth'
  },
  {
    value: 'data-accuracy',
    label: 'Data Accuracy Issues',
    description: 'Inventory records don\'t match physical stock',
    icon: AlertCircleIcon,
    category: 'accuracy'
  },
  {
    value: 'supplier-management',
    label: 'Supplier Coordination',
    description: 'Poor communication and timing with suppliers',
    icon: PackageIcon,
    category: 'supplier'
  },
  {
    value: 'forecasting',
    label: 'Poor Demand Forecasting',
    description: 'Can\'t predict which products will be popular',
    icon: ChartVerticalIcon,
    category: 'planning'
  }
]

const BUSINESS_GOALS = [
  {
    value: 'reduce-costs',
    label: 'Reduce Operational Costs',
    description: 'Lower inventory carrying and operational costs',
    icon: CashDollarIcon
  },
  {
    value: 'increase-sales',
    label: 'Increase Sales Revenue',
    description: 'Never miss a sale due to stockouts',
    icon: ArrowUpIcon
  },
  {
    value: 'improve-efficiency',
    label: 'Improve Operational Efficiency',
    description: 'Automate manual processes and save time',
    icon: ClockIcon
  },
  {
    value: 'better-decisions',
    label: 'Make Better Decisions',
    description: 'Use real-time data for strategic planning',
    icon: ChartVerticalIcon
  },
  {
    value: 'customer-satisfaction',
    label: 'Enhance Customer Satisfaction',
    description: 'Improve order accuracy and delivery times',
    icon: PersonIcon
  },
  {
    value: 'scale-business',
    label: 'Scale the Business',
    description: 'Support growth and expansion plans',
    icon: ArrowUpIcon
  },
  {
    value: 'multi-channel',
    label: 'Expand Sales Channels',
    description: 'Sell across more platforms seamlessly',
    icon: MobileIcon
  },
  {
    value: 'regain-control',
    label: 'Regain Control',
    description: 'Get complete visibility and control over inventory',
    icon: PackageIcon
  }
]

const PainPointsStep = ({ onValidationChange, onSave }) => {
  const { state, updateState } = useOnboarding()
  const [selectedPainPoints, setSelectedPainPoints] = useState(state.businessInfo.painPoints || [])
  const [selectedGoals, setSelectedGoals] = useState(state.businessInfo.goals || [])
  const [otherPainPoint, setOtherPainPoint] = useState('')
  const [otherGoal, setOtherGoal] = useState('')
  const [showOtherPainPoint, setShowOtherPainPoint] = useState(false)
  const [showOtherGoal, setShowOtherGoal] = useState(false)

  const handlePainPointsChange = (values) => {
    const filteredValues = values.filter(value => value !== 'other')
    setSelectedPainPoints(filteredValues)
    setShowOtherPainPoint(values.includes('other'))

    const allPainPoints = [
      ...filteredValues,
      ...(otherPainPoint.trim() ? [otherPainPoint.trim()] : [])
    ]

    updateState({
      businessInfo: {
        ...state.businessInfo,
        painPoints: allPainPoints
      }
    })

    // Auto-save
    if (onSave) {
      const timer = setTimeout(() => onSave(), 2000)
      return () => clearTimeout(timer)
    }
  }

  const handleGoalsChange = (values) => {
    const filteredValues = values.filter(value => value !== 'other')
    setSelectedGoals(filteredValues)
    setShowOtherGoal(values.includes('other'))

    const allGoals = [
      ...filteredValues,
      ...(otherGoal.trim() ? [otherGoal.trim()] : [])
    ]

    updateState({
      businessInfo: {
        ...state.businessInfo,
        goals: allGoals
      }
    })

    // Auto-save
    if (onSave) {
      const timer = setTimeout(() => onSave(), 2000)
      return () => clearTimeout(timer)
    }
  }

  // Handle other field changes
  const handleOtherPainPointChange = (value) => {
    setOtherPainPoint(value)
    const allPainPoints = [
      ...selectedPainPoints.filter(p => p !== 'other'),
      ...(value.trim() ? [value.trim()] : [])
    ]

    updateState({
      businessInfo: {
        ...state.businessInfo,
        painPoints: allPainPoints
      }
    })
  }

  const handleOtherGoalChange = (value) => {
    setOtherGoal(value)
    const allGoals = [
      ...selectedGoals.filter(g => g !== 'other'),
      ...(value.trim() ? [value.trim()] : [])
    ]

    updateState({
      businessInfo: {
        ...state.businessInfo,
        goals: allGoals
      }
    })
  }

  // Validate form
  useEffect(() => {
    const isValid = selectedPainPoints.length > 0 && selectedGoals.length > 0
    onValidationChange(isValid)
  }, [selectedPainPoints, selectedGoals, onValidationChange])

  // Categorize pain points
  const categorizedPainPoints = COMMON_PAIN_POINTS.reduce((acc, painPoint) => {
    if (!acc[painPoint.category]) {
      acc[painPoint.category] = []
    }
    acc[painPoint.category].push(painPoint)
    return acc
  }, {})

  const categoryLabels = {
    inventory: 'Inventory Management',
    efficiency: 'Efficiency & Productivity',
    visibility: 'Visibility & Control',
    customer: 'Customer Experience',
    integration: 'Integration & Connectivity',
    financial: 'Financial Management',
    growth: 'Growth & Scaling',
    accuracy: 'Data Accuracy',
    supplier: 'Supplier Management',
    planning: 'Planning & Forecasting'
  }

  return (
    <BlockStack gap="600">
      {/* Pain Points Section */}
      <Card>
        <Box padding="500">
          <BlockStack gap="400">
            <Text variant="headingLg" as="h2">
              What challenges are you facing?
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              Select all the pain points that resonate with your current situation. This helps us prioritize the features that will provide the most value.
            </Text>

            {Object.entries(categorizedPainPoints).map(([category, painPoints]) => (
              <Box key={category}>
                <Text variant="headingSm" as="h3" marginBottom="200">
                  {categoryLabels[category] || category}
                </Text>
                <ChoiceList
                  title=""
                  titleHidden
                  choices={painPoints.map(painPoint => ({
                    label: painPoint.label,
                    description: painPoint.description,
                    value: painPoint.value,
                    renderChildren: ({ selected }) => (
                      <InlineStack gap="200">
                        <Icon source={painPoint.icon} size="small" />
                        <Text variant="bodySm" tone="subdued">
                          {painPoint.description}
                        </Text>
                        {selected && (
                          <Badge size="small" tone="attention">
                            Selected
                          </Badge>
                        )}
                      </InlineStack>
                    )
                  }))}
                  selected={[...selectedPainPoints, ...(showOtherPainPoint ? ['other'] : [])]}
                  onChange={handlePainPointsChange}
                  allowMultiple
                />
                {category !== Object.keys(categorizedPainPoints)[Object.keys(categorizedPainPoints).length - 1] && (
                  <Divider />
                )}
              </Box>
            ))}

            {/* Other pain points */}
            <ChoiceList
              choices={[{
                label: 'Other challenges not listed above',
                value: 'other'
              }]}
              selected={[...(showOtherPainPoint ? ['other'] : [])]}
              onChange={(values) => {
                if (values.includes('other') && !showOtherPainPoint) {
                  setShowOtherPainPoint(true)
                  handlePainPointsChange([...selectedPainPoints, 'other'])
                } else if (!values.includes('other') && showOtherPainPoint) {
                  setShowOtherPainPoint(false)
                  setOtherPainPoint('')
                  handlePainPointsChange(selectedPainPoints.filter(p => p !== 'other'))
                }
              }}
            />

            {showOtherPainPoint && (
              <TextField
                label="Please describe other challenges"
                value={otherPainPoint}
                onChange={handleOtherPainPointChange}
                placeholder="Describe other pain points you're experiencing..."
                multiline={2}
              />
            )}
          </BlockStack>
        </Box>
      </Card>

      {/* Business Goals Section */}
      <Card>
        <Box padding="500">
          <BlockStack gap="400">
            <Text variant="headingLg" as="h2">
              What are your business goals?
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              Tell us what you hope to achieve with Cin7 Core. This helps us configure the system to support your objectives.
            </Text>

            <Grid columns={{ xs: 1, sm: 2 }}>
              {BUSINESS_GOALS.map((goal) => {
                const isSelected = selectedGoals.includes(goal.value)

                return (
                  <Card
                    key={goal.value}
                    background={isSelected ? 'bg-surface-selected' : 'bg-surface'}
                    borderWidth={isSelected ? '2px' : '1px'}
                    borderColor={isSelected ? 'border-primary' : 'border-transparent'}
                    padding="400"
                    cursor="pointer"
                    onClick={() => {
                      if (isSelected) {
                        handleGoalsChange(selectedGoals.filter(g => g !== goal.value))
                      } else {
                        handleGoalsChange([...selectedGoals, goal.value])
                      }
                    }}
                  >
                    <BlockStack gap="300">
                      <InlineStack gap="300" align="start">
                        <Checkbox
                          label=""
                          checked={isSelected}
                          onChange={() => {}}
                        />
                        <Icon source={goal.icon} size="small" />
                        <Text variant="bodySm" fontWeight="medium">
                          {goal.label}
                        </Text>
                      </InlineStack>
                      <Text variant="bodyXs" tone="subdued">
                        {goal.description}
                      </Text>
                      {isSelected && (
                        <Badge size="small" tone="success">
                          Selected
                        </Badge>
                      )}
                    </BlockStack>
                  </Card>
                )
              })}
            </Grid>

            {/* Other goals */}
            <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
              <BlockStack gap="300">
                <Checkbox
                  label="I have other specific goals"
                  checked={showOtherGoal}
                  onChange={(checked) => {
                    setShowOtherGoal(checked)
                    if (!checked) {
                      setOtherGoal('')
                    }
                  }}
                />

                {showOtherGoal && (
                  <TextField
                    label="Please describe your other goals"
                    value={otherGoal}
                    onChange={handleOtherGoalChange}
                    placeholder="What other objectives are you trying to achieve?"
                    multiline={3}
                  />
                )}
              </BlockStack>
            </Box>
          </BlockStack>
        </Box>
      </Card>

      {/* Priority Ranking */}
      <Card>
        <Box padding="500">
          <BlockStack gap="400">
            <Text variant="headingLg" as="h2">
              What's most important to you right now?
            </Text>
            <Text variant="bodyLg" tone="subdued" as="p">
              Rank your top priorities so we can focus on what matters most for your immediate success.
            </Text>

            <Box padding="400" backgroundColor="bg-surface-secondary" borderRadius="200">
              <BlockStack gap="200">
                <Text variant="bodySm" fontWeight="medium">
                  Based on your selections, here are your top priorities:
                </Text>
                <BlockStack gap="100">
                  {selectedPainPoints.slice(0, 3).map((painPointId, index) => {
                    const painPoint = COMMON_PAIN_POINTS.find(p => p.value === painPointId)
                    return painPoint ? (
                      <InlineStack key={painPointId} gap="200">
                        <Badge size="small">{index + 1}</Badge>
                        <Text variant="bodySm">{painPoint.label}</Text>
                      </InlineStack>
                    ) : null
                  })}
                </BlockStack>
              </BlockStack>
            </Box>

            <Text variant="bodySm" tone="subdued">
              We'll prioritize features and setup steps that address these challenges first, ensuring you see immediate value from Cin7 Core.
            </Text>
          </BlockStack>
        </Box>
      </Card>
    </BlockStack>
  )
}

export default PainPointsStep