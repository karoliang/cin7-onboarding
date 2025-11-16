import React, { useState, useEffect } from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Button,
  ButtonGroup,
  ProgressBar,
  Badge,
  Modal,
  Stack,
  VerticalStack,
  HorizontalStack,
  Divider,
  Bleed,
  Box,
  Avatar,
  Icon,
  InlineError,
  Scrollable
} from '@shopify/polaris'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SaveIcon,
  XIcon,
  CheckIcon,
  ClockIcon,
  InfoIcon,
  PlusIcon,
  TrophyIcon
} from '@shopify/polaris-icons'

import { useOnboarding, onboardingSteps } from '../contexts/OnboardingContext'
import IndustrySelection from './IndustrySelection'
import FeatureConfiguration from './FeatureConfiguration'
import OnboardingProgress from './OnboardingProgress'
import GuidedTour from './GuidedTour'

// Import step components
import WelcomeStep from './onboarding-steps/WelcomeStep'
import BusinessInfoStep from './onboarding-steps/BusinessInfoStep'
import PainPointsStep from './onboarding-steps/PainPointsStep'
import IntegrationsStep from './onboarding-steps/IntegrationsStep'
import WorkflowsStep from './onboarding-steps/WorkflowsStep'
import ReportsStep from './onboarding-steps/ReportsStep'
import ReviewStep from './onboarding-steps/ReviewStep'

const OnboardingWizard = ({
  onStart,
  onComplete,
  onPause,
  onResume,
  initialStep = 0,
  allowSkip = true,
  allowSaveProgress = true,
  industrySpecificPaths = true
}) => {
  const {
    state,
    updateState,
    saveProgress,
    resetProgress,
    nextStep,
    previousStep,
    goToStep,
    completeStep,
    skipStep,
    calculateProgress
  } = useOnboarding()

  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showPauseModal, setShowPauseModal] = useState(false)
  const [currentStepValid, setCurrentStepValid] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [autoSaveTimer, setAutoSaveTimer] = useState(null)

  const currentStepData = onboardingSteps[state.currentStep]
  const progressPercentage = calculateProgress()

  // Set initial step if provided
  useEffect(() => {
    if (initialStep > 0 && initialStep < onboardingSteps.length) {
      goToStep(initialStep)
    }
  }, [initialStep, goToStep])

  // Auto-save progress periodically
  useEffect(() => {
    if (allowSaveProgress && !state.isCompleted && !state.isPaused) {
      const timer = setTimeout(() => {
        handleAutoSave()
      }, 60000) // Auto-save every minute

      setAutoSaveTimer(timer)

      return () => {
        if (timer) clearTimeout(timer)
      }
    }
  }, [state, allowSaveProgress])

  // Handle auto-save
  const handleAutoSave = async () => {
    if (allowSaveProgress) {
      setIsSaving(true)
      try {
        await saveProgress()
      } catch (error) {
        console.error('Auto-save failed:', error)
      } finally {
        setIsSaving(false)
      }
    }
  }

  // Step validation
  const validateCurrentStep = () => {
    // Basic validation - can be extended per step
    switch (currentStepData.id) {
      case 'business-info':
        return state.businessInfo.companyName.trim() !== '' &&
               state.businessInfo.contactInfo.email.trim() !== ''
      case 'industry-selection':
        return state.industrySelection.selectedIndustry !== 'other' ||
               state.industrySelection.businessModel.length > 0
      case 'feature-selection':
        return state.featureConfiguration.selectedFeatures.length > 0
      default:
        return true
    }
  }

  // Navigation handlers
  const handleNext = async () => {
    const isValid = validateCurrentStep()

    if (!isValid) {
      setCurrentStepValid(false)
      return
    }

    setCurrentStepValid(true)

    // Mark current step as completed
    completeStep(currentStepData.id)

    if (state.currentStep < onboardingSteps.length - 1) {
      nextStep()
    } else {
      // Onboarding complete
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (state.currentStep > 0) {
      previousStep()
    }
  }

  const handleSkip = () => {
    if (currentStepData.isOptional) {
      skipStep(currentStepData.id)
      if (state.currentStep < onboardingSteps.length - 1) {
        nextStep()
      }
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await saveProgress()
      setShowSaveModal(true)
    } catch (error) {
      console.error('Save failed:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleComplete = async () => {
    completeStep(currentStepData.id)
    updateState({ isCompleted: true })

    if (onComplete) {
      onComplete(state)
    }

    // Save final state
    await saveProgress()
  }

  const handlePause = () => {
    setShowPauseModal(true)
  }

  const confirmPause = () => {
    updateState({ isPaused: true })
    setShowPauseModal(false)
    if (onPause) {
      onPause()
    }
    handleSave()
  }

  const handleResume = () => {
    updateState({ isPaused: false })
    if (onResume) {
      onResume()
    }
  }

  // Render current step component
  const renderCurrentStep = () => {
    const stepProps = {
      onValidationChange: setCurrentStepValid,
      onSave: handleAutoSave
    }

    switch (currentStepData.id) {
      case 'welcome':
        return <WelcomeStep {...stepProps} />
      case 'business-info':
        return <BusinessInfoStep {...stepProps} />
      case 'industry-selection':
        return <IndustrySelection {...stepProps} />
      case 'pain-points':
        return <PainPointsStep {...stepProps} />
      case 'feature-selection':
        return <FeatureConfiguration {...stepProps} />
      case 'integrations':
        return <IntegrationsStep {...stepProps} />
      case 'workflows':
        return <WorkflowsStep {...stepProps} />
      case 'reports':
        return <ReportsStep {...stepProps} />
      case 'review':
        return <ReviewStep {...stepProps} />
      default:
        return <div>Step not found</div>
    }
  }

  // Get step indicator
  const getStepIndicator = (index) => {
    const step = onboardingSteps[index]
    const isCompleted = state.progress.completedSteps.some(
      completedStep => completedStep.id === step.id && completedStep.status === 'completed'
    )
    const isSkipped = state.progress.completedSteps.some(
      completedStep => completedStep.id === step.id && completedStep.status === 'skipped'
    )
    const isCurrent = index === state.currentStep

    return (
      <Box
        width="32px"
        height="32px"
        borderRadius="full"
        backgroundColor={isCompleted ? 'bg-success' : isCurrent ? 'bg-primary' : 'bg-surface'}
        borderColor={isCurrent ? 'border-primary' : 'border-transparent'}
        borderWidth="1px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {isCompleted ? (
          <Icon source={CheckIcon} tone="base" />
        ) : isSkipped ? (
          <Icon source={XIcon} tone="base" />
        ) : (
          <Text tone={isCurrent ? 'inverse' : 'subdued'} as="span">
            {index + 1}
          </Text>
        )}
      </Box>
    )
  }

  return (
    <Page
      title="Cin7 Core Onboarding"
      subtitle={`Step ${state.currentStep + 1} of ${onboardingSteps.length}: ${currentStepData.title}`}
      primaryAction={
        allowSaveProgress ? (
          <Button
            icon={SaveIcon}
            onClick={handleSave}
            loading={isSaving}
            disabled={state.isCompleted}
          >
            Save Progress
          </Button>
        ) : null
      }
      secondaryActions={[
        {
          content: state.isPaused ? 'Resume' : 'Pause',
          onAction: state.isPaused ? handleResume : handlePause,
          disabled: state.isCompleted
        },
        {
          content: 'Reset',
          destructive: true,
          onAction: resetProgress,
          disabled: state.isCompleted
        }
      ]}
      breadcrumb={{
        content: 'Back to Dashboard',
        url: '/dashboard'
      }}
    >
      <Layout>
        {/* Progress Section */}
        <Layout.Section>
          <Card>
            <Box padding="400">
              <VerticalStack gap="400">
                {/* Progress Bar */}
                <div>
                  <HorizontalStack align="space-between" gap="200">
                    <Text variant="headingSm" as="h3">
                      Overall Progress
                    </Text>
                    <Text variant="headingSm" as="span">
                      {progressPercentage}%
                    </Text>
                  </HorizontalStack>
                  <ProgressBar
                    progress={progressPercentage}
                    size="small"
                    tone="primary"
                  />
                </div>

                {/* Step Indicators */}
                <HorizontalStack gap="200">
                  {onboardingSteps.map((step, index) => (
                    <Box key={step.id} position="relative">
                      {getStepIndicator(index)}
                      {index < onboardingSteps.length - 1 && (
                        <Box
                          position="absolute"
                          top="50%"
                          left="32px"
                          width="40px"
                          height="1px"
                          backgroundColor="border"
                          transform="translateY(-50%)"
                        />
                      )}
                    </Box>
                  ))}
                </HorizontalStack>

                {/* Current Step Info */}
                <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
                  <HorizontalStack gap="200">
                    <Icon source={ClockIcon} tone="subdued" />
                    <Text variant="bodySm" tone="subdued">
                      {currentStepData.description}
                    </Text>
                    <Badge tone={currentStepData.isOptional ? 'attention' : 'info'}>
                      {currentStepData.isOptional ? 'Optional' : 'Required'}
                    </Badge>
                    <Text variant="bodySm" tone="subdued">
                      ~{currentStepData.estimatedDuration} min
                    </Text>
                  </HorizontalStack>
                </Box>

                {/* Milestone Progress */}
                <OnboardingProgress compact />
              </VerticalStack>
            </Box>
          </Card>
        </Layout.Section>

        {/* Main Content */}
        <Layout.Section>
          <Card>
            <Box padding="600" minHeight="500px">
              <VerticalStack gap="600">
                {/* Error Display */}
                {!currentStepValid && (
                  <InlineError
                    message="Please complete all required fields before proceeding."
                    fieldID="validation-error"
                  />
                )}

                {/* Current Step Content */}
                <div id="onboarding-step-content">
                  {renderCurrentStep()}
                </div>

                {/* Navigation Buttons */}
                <HorizontalStack align="space-between" gap="200">
                  <ButtonGroup>
                    <Button
                      icon={ChevronLeftIcon}
                      onClick={handlePrevious}
                      disabled={state.currentStep === 0 || state.isCompleted}
                    >
                      Previous
                    </Button>

                    {allowSkip && currentStepData.isOptional && (
                      <Button onClick={handleSkip}>
                        Skip
                      </Button>
                    )}
                  </ButtonGroup>

                  <Button
                    icon={ChevronRightIcon}
                    primary
                    onClick={handleNext}
                    disabled={state.isCompleted}
                  >
                    {state.currentStep === onboardingSteps.length - 1 ? 'Complete' : 'Next'}
                  </Button>
                </HorizontalStack>
              </VerticalStack>
            </Box>
          </Card>
        </Layout.Section>

        {/* Sidebar */}
        <Layout.Section variant="oneThird">
          <VerticalStack gap="400">
            {/* Quick Tips */}
            <Card>
              <Box padding="400">
                <VerticalStack gap="300">
                  <HorizontalStack gap="200">
                    <Icon source={InfoIcon} tone="primary" />
                    <Text variant="headingSm" as="h3">
                      Quick Tips
                    </Text>
                  </HorizontalStack>
                  <Text variant="bodySm" as="p">
                    {currentStepData.id === 'welcome' &&
                      "Take your time to provide accurate information. This helps us tailor Cin7 Core to your specific needs."}
                    {currentStepData.id === 'business-info' &&
                      "Your information is secure and will only be used to personalize your experience."}
                    {currentStepData.id === 'industry-selection' &&
                      "Choose the industry that best represents your primary business activities."}
                    {currentStepData.id === 'feature-selection' &&
                      "Start with essential features. You can always add more later as your needs evolve."}
                    {currentStepData.id === 'integrations' &&
                      "Connect the tools you already use to streamline your workflow from day one."}
                    {currentStepData.id === 'workflows' &&
                      "Automate repetitive tasks to save time and reduce manual errors."}
                    {currentStepData.id === 'reports' &&
                      "Set up the reports you need to track your business performance from the start."}
                    {currentStepData.id === 'review' &&
                      "Review your configuration and make any final adjustments before completing setup."}
                  </Text>
                </VerticalStack>
              </Box>
            </Card>

            {/* Help Section */}
            <Card>
              <Box padding="400">
                <VerticalStack gap="300">
                  <HorizontalStack gap="200">
                    <Icon source={PlusIcon} tone="primary" />
                    <Text variant="headingSm" as="h3">
                      Need Help?
                    </Text>
                  </HorizontalStack>
                  <VerticalStack gap="200">
                    <Button variant="plain" onClick={() => window.open('#', '_blank')}>
                      Documentation
                    </Button>
                    <Button variant="plain" onClick={() => window.open('#', '_blank')}>
                      Video Tutorials
                    </Button>
                    <Button variant="plain" onClick={() => window.open('#', '_blank')}>
                      Contact Support
                    </Button>
                  </VerticalStack>
                </VerticalStack>
              </Box>
            </Card>

            {/* Achievement Preview */}
            {state.progress.currentMilestone.rewards.length > 0 && (
              <Card>
                <Box padding="400">
                  <VerticalStack gap="300">
                    <HorizontalStack gap="200">
                      <Icon source={TrophyIcon} tone="warning" />
                      <Text variant="headingSm" as="h3">
                        Next Reward
                      </Text>
                    </HorizontalStack>
                    {state.progress.currentMilestone.rewards[0] && (
                      <VerticalStack gap="100">
                        <Text variant="bodySm" fontWeight="medium">
                          {state.progress.currentMilestone.rewards[0].name}
                        </Text>
                        <Text variant="bodySm" tone="subdued">
                          {state.progress.currentMilestone.rewards[0].description}
                        </Text>
                      </VerticalStack>
                    )}
                  </VerticalStack>
                </Box>
              </Card>
            )}
          </VerticalStack>
        </Layout.Section>
      </Layout>

      {/* Save Success Modal */}
      <Modal
        open={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Progress Saved"
        primaryAction={{
          content: 'Continue',
          onAction: () => setShowSaveModal(false)
        }}
      >
        <Modal.Section>
          <Text>
            Your onboarding progress has been saved successfully. You can return to this wizard at any time to continue where you left off.
          </Text>
        </Modal.Section>
      </Modal>

      {/* Pause Confirmation Modal */}
      <Modal
        open={showPauseModal}
        onClose={() => setShowPauseModal(false)}
        title="Pause Onboarding"
        primaryAction={{
          content: 'Pause & Save',
          onAction: confirmPause
        }}
        secondaryActions={[
          {
            content: 'Continue',
            onAction: () => setShowPauseModal(false)
          }
        ]}
      >
        <Modal.Section>
          <Text>
            Your progress will be saved and you can return to the onboarding wizard anytime from the dashboard.
          </Text>
        </Modal.Section>
      </Modal>
    </Page>
  )
}

export default OnboardingWizard