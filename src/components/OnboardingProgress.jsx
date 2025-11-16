import React, { useState, useEffect } from 'react'
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
  BlockStack,
  InlineStack,
  ProgressBar,
  Avatar,
  Scrollable,
  Tooltip,
  Banner
} from '@shopify/polaris'
import {
  TrophyIcon,
  CheckCircleIcon,
  ClockIcon,
  SparklesIcon,
  StarIcon,
  GiftIcon,
  LightningBoltIcon,
  FlagIcon,
  DiamondIcon,
  LockIcon,
  ChartBarIcon,
  SmileIcon,
  ExternalIcon
} from '@shopify/polaris-icons'

import { useOnboarding, milestones } from '../contexts/OnboardingContext'

const ACHIEVEMENT_DEFINITIONS = {
  'quick-starter': {
    id: 'quick-starter',
    title: 'Quick Starter',
    description: 'Complete first 3 steps within 30 minutes',
    icon: LightningBoltIcon,
    category: 'setup',
    rarity: 'common',
    points: 10,
    condition: (state) => {
      const completedRequired = state.progress.completedSteps.filter(
        step => step.status === 'completed'
      ).length
      return completedRequired >= 3
    }
  },
  'industry-expert': {
    id: 'industry-expert',
    title: 'Industry Expert',
    description: 'Complete all recommended features for your industry',
    icon: TrophyIcon,
    category: 'configuration',
    rarity: 'epic',
    points: 50,
    condition: (state) => {
      const industryFeatures = getIndustryRecommendedFeatures(state.industrySelection.selectedIndustry)
      const selectedFeatures = state.featureConfiguration.selectedFeatures
      return industryFeatures.every(feature => selectedFeatures.includes(feature))
    }
  },
  'integration-master': {
    id: 'integration-master',
    title: 'Integration Master',
    description: 'Set up 3 or more integrations',
    icon: DiamondIcon,
    category: 'integration',
    rarity: 'rare',
    points: 30,
    condition: (state) => {
      return state.featureConfiguration.integrations.enabledIntegrations.length >= 3
    }
  },
  'workflow-wizard': {
    id: 'workflow-wizard',
    title: 'Workflow Wizard',
    description: 'Create and configure 2 automated workflows',
    icon: SparklesIcon,
    category: 'configuration',
    rarity: 'rare',
    points: 35,
    condition: (state) => {
      const totalWorkflows = [
        ...state.featureConfiguration.workflowConfiguration.orderProcessingWorkflow.steps,
        ...state.featureConfiguration.workflowConfiguration.inventoryWorkflow.reorderWorkflows,
        ...state.featureConfiguration.workflowConfiguration.customWorkflows
      ].length
      return totalWorkflows >= 2
    }
  },
  'data-driven': {
    id: 'data-driven',
    title: 'Data Driven',
    description: 'Set up 5 or more reports and dashboards',
    icon: ChartBarIcon,
    category: 'exploration',
    rarity: 'common',
    points: 15,
    condition: (state) => {
      const totalReports = [
        state.featureConfiguration.reportingSetup.selectedReports.length,
        state.featureConfiguration.reportingSetup.customReports.length,
        state.featureConfiguration.reportingSetup.dashboards.length
      ].reduce((sum, count) => sum + count, 0)
      return totalReports >= 5
    }
  },
  'speed-demon': {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete onboarding in under 45 minutes',
    icon: LightningBoltIcon,
    category: 'setup',
    rarity: 'legendary',
    points: 100,
    condition: (state) => {
      return state.progress.timeSpent <= 45 && state.isCompleted
    }
  },
  'perfectionist': {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete every single step without skipping',
    icon: StarIcon,
    category: 'setup',
    rarity: 'rare',
    points: 40,
    condition: (state) => {
      const totalSteps = state.progress.completedSteps.length
      const completedSteps = state.progress.completedSteps.filter(
        step => step.status === 'completed'
      ).length
      return totalSteps === completedSteps && state.isCompleted
    }
  },
  'early-adopter': {
    id: 'early-adopter',
    title: 'Early Adopter',
    description: 'Start onboarding within 24 hours of account creation',
    icon: GiftIcon,
    category: 'setup',
    rarity: 'common',
    points: 20,
    condition: (state) => {
      // This would need to be implemented with account creation timestamp
      return true // Placeholder
    }
  },
  'explorer': {
    id: 'explorer',
    title: 'Explorer',
    description: 'Try out the guided tour feature',
    icon: SmileIcon,
    category: 'exploration',
    rarity: 'common',
    points: 10,
    condition: (state) => {
      // This would need to be tracked in guided tour state
      return false // Placeholder
    }
  }
}

// Helper function to get industry recommended features
function getIndustryRecommendedFeatures(industry) {
  const recommendations = {
    retail: ['inventory-management', 'order-management', 'customer-management', 'pos-integration'],
    manufacturing: ['inventory-management', 'supplier-management', 'production-tracking', 'batch-tracking'],
    wholesale: ['inventory-management', 'order-management', 'customer-management', 'multi-location'],
    ecommerce: ['inventory-management', 'order-management', 'ecommerce-integration', 'customer-management'],
    'food-beverage': ['inventory-management', 'batch-tracking', 'supplier-management', 'quality-control'],
    apparel: ['inventory-management', 'order-management', 'customer-management', 'multi-location'],
    electronics: ['inventory-management', 'serial-tracking', 'order-management', 'supplier-management'],
    healthcare: ['inventory-management', 'batch-tracking', 'quality-control', 'supplier-management']
  }
  return recommendations[industry] || []
}

// Helper function to get rarity styling
function getRarityConfig(rarity) {
  const configs = {
    common: { badge: 'info', color: 'base', bg: 'bg-surface-secondary' },
    rare: { badge: 'attention', color: 'purple', bg: 'bg-purple-subdued' },
    epic: { badge: 'warning', color: 'warning', bg: 'bg-yellow-subdued' },
    legendary: { badge: 'success', color: 'success', bg: 'bg-success-subdued' }
  }
  return configs[rarity] || configs.common
}

const OnboardingProgress = ({ compact = false, showAchievements = true, showMilestones = true }) => {
  const { state, calculateProgress } = useOnboarding()
  const [unlockedAchievements, setUnlockedAchievements] = useState([])
  const [showRewardModal, setShowRewardModal] = useState(null)

  const overallProgress = calculateProgress()

  // Check for newly unlocked achievements
  useEffect(() => {
    const newAchievements = []

    Object.values(ACHIEVEMENT_DEFINITIONS).forEach(achievement => {
      const alreadyUnlocked = state.progress.achievements.some(a => a.id === achievement.id)
      const isNowUnlocked = achievement.condition(state)

      if (isNowUnlocked && !alreadyUnlocked) {
        newAchievements.push({
          id: achievement.id,
          title: achievement.title,
          description: achievement.description,
          icon: achievement.icon,
          unlockedAt: new Date().toISOString(),
          category: achievement.category,
          rarity: achievement.rarity,
          points: achievement.points
        })
      }
    })

    if (newAchievements.length > 0) {
      setUnlockedAchievements(newAchievements)
      // Update state with new achievements
      const updatedAchievements = [...state.progress.achievements, ...newAchievements]
      // This would update the context in a real implementation
    }
  }, [state])

  const currentMilestone = state.progress.currentMilestone
  const completedMilestones = milestones.filter(m => m.progress === 100)
  const upcomingMilestones = milestones.filter(m => m.progress < 100)

  // Calculate estimated time remaining
  const calculateTimeRemaining = () => {
    const completedSteps = state.progress.completedSteps.filter(
      step => step.status === 'completed'
    ).length

    const remainingSteps = state.totalSteps - completedSteps
    const averageTimePerStep = state.progress.timeSpent / Math.max(completedSteps, 1)

    return Math.ceil(remainingSteps * averageTimePerStep)
  }

  const timeRemaining = calculateTimeRemaining()

  if (compact) {
    return (
      <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
        <HorizontalStack gap="300" align="center">
          <Icon source={currentMilestone.progress === 100 ? TrophyIcon : ClockIcon} size="small" />
          <VerticalStack gap="100">
            <Text variant="bodySm" fontWeight="medium">
              {currentMilestone.title}
            </Text>
            <ProgressBar size="small" progress={currentMilestone.progress} tone="primary" />
          </VerticalStack>
          <Text variant="bodySm" tone="subdued">
            {currentMilestone.progress}%
          </Text>
        </HorizontalStack>
      </Box>
    )
  }

  return (
    <VerticalStack gap="500">
      {/* Current Milestone */}
      {showMilestones && (
        <Card>
          <Box padding="500">
            <VerticalStack gap="400">
              <HorizontalStack gap="300">
                <Icon source={currentMilestone.progress === 100 ? TrophyIcon : FlagIcon} size="large" />
                <VerticalStack gap="200">
                  <Text variant="headingLg" as="h2">
                    {currentMilestone.title}
                  </Text>
                  <Text variant="bodyLg" tone="subdued">
                    {currentMilestone.description}
                  </Text>
                </VerticalStack>
              </HorizontalStack>

              <div>
                <HorizontalStack align="space-between" gap="200" marginBottom="200">
                  <Text variant="headingSm" as="h3">
                    Milestone Progress
                  </Text>
                  <Text variant="headingSm" as="span">
                    {currentMilestone.progress}%
                  </Text>
                </HorizontalStack>
                <ProgressBar
                  progress={currentMilestone.progress}
                  size="medium"
                  tone={currentMilestone.progress === 100 ? 'success' : 'primary'}
                />
              </div>

              {/* Milestone Requirements */}
              <VerticalStack gap="200">
                <Text variant="bodySm" fontWeight="medium">
                  Requirements:
                </Text>
                {currentMilestone.requirements.map((requirement, index) => {
                  const isCompleted = state.progress.completedSteps.some(
                    step => step.id === requirement && step.status === 'completed'
                  )

                  return (
                    <HorizontalStack key={index} gap="200">
                      <Icon
                        source={isCompleted ? CheckCircleIcon : ClockIcon}
                        size="small"
                        tone={isCompleted ? 'success' : 'subdued'}
                      />
                      <Text
                        variant="bodySm"
                        tone={isCompleted ? 'base' : 'subdued'}
                        fontWeight={isCompleted ? 'medium' : 'regular'}
                      >
                        {requirement.split('-').map(word =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </Text>
                    </HorizontalStack>
                  )
                })}
              </VerticalStack>

              {/* Milestone Rewards */}
              {currentMilestone.rewards.length > 0 && (
                <Box padding="300" backgroundColor="bg-surface-tertiary" borderRadius="200">
                  <VerticalStack gap="200">
                    <Text variant="bodySm" fontWeight="medium">
                      🎁 Unlock Reward:
                    </Text>
                    {currentMilestone.rewards.map((reward, index) => (
                      <HorizontalStack key={index} gap="200" align="start">
                        <Icon source={GiftIcon} size="small" tone="attention" />
                        <VerticalStack gap="100">
                          <Text variant="bodySm" fontWeight="medium">
                            {reward.name}
                          </Text>
                          <Text variant="bodyXs" tone="subdued">
                            {reward.description}
                          </Text>
                          {currentMilestone.progress === 100 && !reward.claimed && (
                            <Button size="small" onClick={() => setShowRewardModal(reward)}>
                              Claim Reward
                            </Button>
                          )}
                          {reward.claimed && (
                            <Badge tone="success">Claimed</Badge>
                          )}
                        </VerticalStack>
                      </HorizontalStack>
                    ))}
                  </VerticalStack>
                </Box>
              )}
            </VerticalStack>
          </Box>
        </Card>
      )}

      {/* Overall Progress Stats */}
      <Card>
        <Box padding="500">
          <VerticalStack gap="400">
            <Text variant="headingLg" as="h2">
              Overall Progress
            </Text>

            <Grid columns={{ xs: 1, sm: 3 }}>
              <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
                <VerticalStack gap="200">
                  <Icon source="ChartBar" tone="primary" />
                  <Text variant="bodySm" tone="subdued">Completion</Text>
                  <Text variant="headingLg">{overallProgress}%</Text>
                </VerticalStack>
              </Box>

              <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
                <VerticalStack gap="200">
                  <Icon source={ClockIcon} tone="primary" />
                  <Text variant="bodySm" tone="subdued">Time Spent</Text>
                  <Text variant="headingLg">{Math.floor(state.progress.timeSpent / 60)}h {state.progress.timeSpent % 60}m</Text>
                </VerticalStack>
              </Box>

              <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
                <VerticalStack gap="200">
                  <Icon source={LightningBoltIcon} tone="primary" />
                  <Text variant="bodySm" tone="subdued">Est. Remaining</Text>
                  <Text variant="headingLg">{Math.floor(timeRemaining / 60)}h {timeRemaining % 60}m</Text>
                </VerticalStack>
              </Box>
            </Grid>

            {/* Progress Bar */}
            <div>
              <HorizontalStack align="space-between" gap="200" marginBottom="200">
                <Text variant="bodySm" fontWeight="medium">
                  Overall Completion
                </Text>
                <Text variant="bodySm" as="span">
                  {overallProgress}%
                </Text>
              </HorizontalStack>
              <ProgressBar progress={overallProgress} size="large" tone="primary" />
            </div>
          </VerticalStack>
        </Box>
      </Card>

      {/* Achievements */}
      {showAchievements && (
        <Card>
          <Box padding="500">
            <VerticalStack gap="400">
              <HorizontalStack gap="300">
                <Icon source={TrophyIcon} size="large" />
                <Text variant="headingLg" as="h2">
                  Achievements
                </Text>
                <Badge size="large">
                  {state.progress.achievements.length}/{Object.keys(ACHIEVEMENT_DEFINITIONS).length}
                </Badge>
              </HorizontalStack>

              {/* Recently Unlocked */}
              {unlockedAchievements.length > 0 && (
                <Banner status="success">
                  <VerticalStack gap="200">
                    <Text variant="bodySm" fontWeight="bold">
                      🎉 New Achievement{unlockedAchievements.length > 1 ? 's' : ''} Unlocked!
                    </Text>
                    {unlockedAchievements.map((achievement, index) => {
                      const rarityConfig = getRarityConfig(achievement.rarity)
                      return (
                        <HorizontalStack key={index} gap="200">
                          <Icon source={achievement.icon} size="small" tone="success" />
                          <Text variant="bodySm" fontWeight="medium">
                            {achievement.title}
                          </Text>
                          <Badge size="small" tone={rarityConfig.badge}>
                            +{achievement.points} pts
                          </Badge>
                        </HorizontalStack>
                      )
                    })}
                  </VerticalStack>
                </Banner>
              )}

              {/* Achievements Grid */}
              <Grid columns={{ xs: 2, sm: 3, md: 4 }}>
                {Object.values(ACHIEVEMENT_DEFINITIONS).map((achievement) => {
                  const isUnlocked = state.progress.achievements.some(a => a.id === achievement.id)
                  const rarityConfig = getRarityConfig(achievement.rarity)

                  return (
                    <Tooltip
                      key={achievement.id}
                      content={
                        <VerticalStack gap="200">
                          <Text variant="bodySm" fontWeight="bold">
                            {achievement.title}
                          </Text>
                          <Text variant="bodyXs">
                            {achievement.description}
                          </Text>
                          <HorizontalStack gap="200">
                            <Badge size="small" tone={rarityConfig.badge}>
                              {achievement.rarity}
                            </Badge>
                            <Badge size="small">
                              +{achievement.points} pts
                            </Badge>
                          </HorizontalStack>
                        </VerticalStack>
                      }
                      preferredPosition="above"
                    >
                      <Box
                        padding="300"
                        backgroundColor={isUnlocked ? rarityConfig.bg : 'bg-surface-disabled'}
                        borderRadius="200"
                        textAlign="center"
                        opacity={isUnlocked ? 1 : 0.5}
                        cursor={isUnlocked ? 'default' : 'not-allowed'}
                      >
                        <VerticalStack gap="200">
                          <Box>
                            {isUnlocked ? (
                              <Icon source={achievement.icon} size="large" tone={rarityConfig.color} />
                            ) : (
                              <Icon source={LockIcon} size="large" tone="subdued" />
                            )}
                          </Box>
                          <Text variant="bodyXs" fontWeight={isUnlocked ? 'medium' : 'regular'}>
                            {achievement.title}
                          </Text>
                          {isUnlocked && (
                            <Badge size="small" tone={rarityConfig.badge}>
                              {achievement.rarity}
                            </Badge>
                          )}
                        </VerticalStack>
                      </Box>
                    </Tooltip>
                  )
                })}
              </Grid>

              {/* Achievement Stats */}
              <HorizontalStack gap="400" justify="center">
                <Box textAlign="center">
                  <Text variant="headingLg" tone="success">
                    {state.progress.achievements.reduce((sum, a) => {
                      const achievement = ACHIEVEMENT_DEFINITIONS[a.id]
                      return sum + (achievement?.points || 0)
                    }, 0)}
                  </Text>
                  <Text variant="bodySm" tone="subdued">Total Points</Text>
                </Box>
                <Divider orientation="vertical" />
                <Box textAlign="center">
                  <Text variant="headingLg">
                    {state.progress.achievements.filter(a =>
                      ACHIEVEMENT_DEFINITIONS[a.id]?.rarity === 'legendary'
                    ).length}
                  </Text>
                  <Text variant="bodySm" tone="subdued">Legendary</Text>
                </Box>
                <Divider orientation="vertical" />
                <Box textAlign="center">
                  <Text variant="headingLg">
                    {state.progress.achievements.filter(a =>
                      ACHIEVEMENT_DEFINITIONS[a.id]?.rarity === 'epic'
                    ).length}
                  </Text>
                  <Text variant="bodySm" tone="subdued">Epic</Text>
                </Box>
              </HorizontalStack>
            </VerticalStack>
          </Box>
        </Card>
      )}

      {/* All Milestones */}
      {showMilestones && (
        <Card>
          <Box padding="500">
            <VerticalStack gap="400">
              <Text variant="headingLg" as="h2">
                All Milestones
              </Text>

              <Grid columns={{ xs: 1, sm: 2 }}>
                {milestones.map((milestone) => {
                  const isCompleted = milestone.progress === 100
                  const isCurrent = milestone.id === currentMilestone.id

                  return (
                    <Card
                      key={milestone.id}
                      background={
                        isCurrent ? 'bg-surface-selected' :
                        isCompleted ? 'bg-surface-secondary' :
                        'bg-surface'
                      }
                      borderWidth={isCurrent ? '2px' : '1px'}
                      borderColor={isCurrent ? 'border-primary' : 'border-transparent'}
                      padding="400"
                    >
                      <VerticalStack gap="300">
                        <HorizontalStack align="space-between">
                          <Icon
                            source={isCompleted ? TrophyIcon : FlagIcon}
                            tone={isCompleted ? 'success' : isCurrent ? 'primary' : 'subdued'}
                          />
                          {isCompleted && (
                            <Badge tone="success">Completed</Badge>
                          )}
                          {isCurrent && (
                            <Badge tone="info">Current</Badge>
                          )}
                        </HorizontalStack>

                        <Text variant="headingSm" fontWeight="medium">
                          {milestone.title}
                        </Text>

                        <Text variant="bodyXs" tone="subdued">
                          {milestone.description}
                        </Text>

                        <ProgressBar
                          progress={milestone.progress}
                          size="small"
                          tone={isCompleted ? 'success' : isCurrent ? 'primary' : 'subdued'}
                        />

                        {milestone.rewards.length > 0 && (
                          <HorizontalStack gap="200">
                            <Icon source={GiftIcon} size="small" tone="attention" />
                            <Text variant="bodyXs" tone="subdued">
                              {milestone.rewards.length} reward{milestone.rewards.length > 1 ? 's' : ''}
                            </Text>
                          </HorizontalStack>
                        )}
                      </VerticalStack>
                    </Card>
                  )
                })}
              </Grid>
            </VerticalStack>
          </Box>
        </Card>
      )}

      {/* Reward Claim Modal */}
      {showRewardModal && (
        <Card>
          <Box padding="500">
            <VerticalStack gap="400">
              <Text variant="headingLg" as="h2">
                Claim Your Reward
              </Text>
              <Text variant="bodyLg">
                {showRewardModal.name}
              </Text>
              <Text variant="bodyMd" tone="subdued">
                {showRewardModal.description}
              </Text>
              <HorizontalStack gap="200">
                <Button primary onClick={() => {
                  // This would handle the reward claiming logic
                  setShowRewardModal(null)
                }}>
                  Claim Reward
                </Button>
                <Button onClick={() => setShowRewardModal(null)}>
                  Maybe Later
                </Button>
              </HorizontalStack>
            </VerticalStack>
          </Box>
        </Card>
      )}
    </VerticalStack>
  )
}

export default OnboardingProgress