import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import {
  OnboardingState,
  OnboardingContextType,
  BusinessInfo,
  IndustrySelection,
  FeatureConfiguration,
  OnboardingProgress,
  OnboardingStep,
  Milestone,
  Achievement
} from '../types/onboarding'

// Initial state for the onboarding wizard
const initialState: OnboardingState = {
  currentStep: 0,
  totalSteps: 8,
  isCompleted: false,
  isPaused: false,
  lastSavedAt: null,

  businessInfo: {
    companyName: '',
    industry: 'retail',
    businessSize: 'small',
    annualRevenue: '100k-500k',
    primaryMarkets: [],
    currentSystems: [],
    painPoints: [],
    goals: [],
    contactInfo: {
      name: '',
      email: '',
      role: '',
      phone: ''
    }
  },

  industrySelection: {
    selectedIndustry: 'retail',
    businessModel: [],
    salesChannels: [],
    operationalNeeds: []
  },

  featureConfiguration: {
    selectedFeatures: [],
    moduleSettings: {
      inventory: {
        enableLowStockAlerts: true,
        enableBatchTracking: false,
        enableSerialTracking: false,
        enableMultiLocation: false,
        defaultReorderPoint: 10,
        categories: [],
        suppliers: [],
        warehouses: []
      },
      sales: {
        enableOrderProcessing: true,
        enableInvoicing: true,
        enableShippingIntegration: false,
        enableTaxCalculation: true,
        enableDiscountRules: false,
        paymentMethods: [],
        shippingMethods: [],
        taxSettings: {
          enabled: true,
          taxEngine: 'manual',
          defaultTaxRate: 0,
          taxClasses: [],
          nexusJurisdictions: []
        }
      },
      customers: {
        enableCustomerGroups: false,
        enableCreditLimits: false,
        enableCustomerPortal: false,
        enableEmailNotifications: true,
        defaultCustomerType: '',
        customFields: []
      },
      reports: {
        enableScheduledReports: false,
        enableCustomDashboards: false,
        enableDataExport: true,
        defaultReports: [],
        reportFrequency: 'monthly'
      },
      settings: {
        enableMultiCurrency: false,
        enableMultiWarehouse: false,
        enableApiAccess: false,
        enableAuditTrail: false,
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY',
        numberFormat: 'en-US'
      }
    },
    integrations: {
      enabledIntegrations: [],
      customIntegrations: []
    },
    workflowConfiguration: {
      orderProcessingWorkflow: {
        steps: [],
        autoProcessing: false,
        approvalRequired: false,
        notificationRules: []
      },
      inventoryWorkflow: {
        reorderWorkflows: [],
        stockAdjustmentWorkflow: [],
        lowStockWorkflow: []
      },
      reportingWorkflow: {
        scheduledReports: [],
        dashboardUpdates: [],
        alertConfigurations: []
      },
      customWorkflows: []
    },
    reportingSetup: {
      selectedReports: [],
      customReports: [],
      dashboards: [],
      exportSettings: {
        format: 'csv',
        includeHeaders: true,
        compression: false,
        encryption: false,
        destination: 'download'
      }
    }
  },

  progress: {
    completedSteps: [],
    currentMilestone: {
      id: 'welcome',
      title: 'Welcome to Cin7 Core',
      description: 'Let\'s get your inventory management system set up',
      requirements: [],
      progress: 0,
      rewards: []
    },
    achievements: [],
    timeSpent: 0,
    estimatedTimeRemaining: 30, // 30 minutes estimated
    lastActivityAt: new Date().toISOString()
  }
}

// Define all onboarding steps
const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Cin7 Core',
    description: 'Let\'s get you set up with a powerful inventory management system',
    type: 'information',
    status: 'not-started',
    estimatedDuration: 2,
    dependencies: [],
    isOptional: false
  },
  {
    id: 'business-info',
    title: 'Tell us about your business',
    description: 'Help us understand your business context to personalize your setup',
    type: 'information',
    status: 'not-started',
    estimatedDuration: 5,
    dependencies: ['welcome'],
    isOptional: false
  },
  {
    id: 'industry-selection',
    title: 'Industry and Business Model',
    description: 'Select your industry and business model for tailored recommendations',
    type: 'configuration',
    status: 'not-started',
    estimatedDuration: 3,
    dependencies: ['business-info'],
    isOptional: false
  },
  {
    id: 'pain-points',
    title: 'Current Challenges and Goals',
    description: 'What challenges are you trying to solve and what are your goals?',
    type: 'information',
    status: 'not-started',
    estimatedDuration: 4,
    dependencies: ['industry-selection'],
    isOptional: false
  },
  {
    id: 'feature-selection',
    title: 'Feature Configuration',
    description: 'Configure the features that are most important for your business',
    type: 'configuration',
    status: 'not-started',
    estimatedDuration: 8,
    dependencies: ['pain-points'],
    isOptional: false
  },
  {
    id: 'integrations',
    title: 'Integrations Setup',
    description: 'Connect your existing tools and systems',
    type: 'integration',
    status: 'not-started',
    estimatedDuration: 6,
    dependencies: ['feature-selection'],
    isOptional: true
  },
  {
    id: 'workflows',
    title: 'Workflow Configuration',
    description: 'Set up automated workflows to streamline your operations',
    type: 'configuration',
    status: 'not-started',
    estimatedDuration: 5,
    dependencies: ['feature-selection'],
    isOptional: true
  },
  {
    id: 'reports',
    title: 'Reports and Dashboards',
    description: 'Configure the reports and insights you need to track your business',
    type: 'configuration',
    status: 'not-started',
    estimatedDuration: 3,
    dependencies: ['workflows'],
    isOptional: false
  },
  {
    id: 'review',
    title: 'Review and Complete',
    description: 'Review your configuration and complete the setup',
    type: 'verification',
    status: 'not-started',
    estimatedDuration: 2,
    dependencies: ['reports', 'integrations'],
    isOptional: false
  }
]

// Define milestones
const milestones: Milestone[] = [
  {
    id: 'welcome',
    title: 'Getting Started',
    description: 'Welcome to Cin7 Core! Let\'s begin your journey.',
    requirements: ['welcome'],
    progress: 0,
    rewards: [
      {
        type: 'template',
        name: 'Welcome Checklist',
        description: 'A checklist to guide you through setup',
        claimed: false
      }
    ]
  },
  {
    id: 'business-setup',
    title: 'Business Setup',
    description: 'Your business profile is configured',
    requirements: ['business-info', 'industry-selection'],
    progress: 0,
    rewards: [
      {
        type: 'feature',
        name: 'Industry Templates',
        description: 'Pre-configured templates for your industry',
        claimed: false
      }
    ]
  },
  {
    id: 'core-features',
    title: 'Core Features Configured',
    description: 'Essential features are set up and ready to use',
    requirements: ['feature-selection'],
    progress: 0,
    rewards: [
      {
        type: 'integration',
        name: 'Quick Start API Access',
        description: 'API credentials for immediate integrations',
        claimed: false
      }
    ]
  },
  {
    id: 'automation-ready',
    title: 'Automation Ready',
    description: 'Workflows and integrations are configured',
    requirements: ['integrations', 'workflows'],
    progress: 0,
    rewards: [
      {
        type: 'support',
        name: 'Priority Support',
        description: 'One month of priority support',
        claimed: false
      }
    ]
  },
  {
    id: 'onboarding-complete',
    title: 'Onboarding Complete',
    description: 'Congratulations! You\'re ready to use Cin7 Core',
    requirements: ['review'],
    progress: 0,
    rewards: [
      {
        type: 'template',
        name: 'Success Dashboard',
        description: 'Pre-configured dashboard to track your success',
        claimed: false
      }
    ]
  }
]

// Action types for the reducer
type OnboardingAction =
  | { type: 'UPDATE_STATE'; payload: Partial<OnboardingState> }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'GO_TO_STEP'; payload: number }
  | { type: 'COMPLETE_STEP'; payload: string }
  | { type: 'SKIP_STEP'; payload: string }
  | { type: 'UPDATE_BUSINESS_INFO'; payload: Partial<BusinessInfo> }
  | { type: 'UPDATE_INDUSTRY_SELECTION'; payload: Partial<IndustrySelection> }
  | { type: 'UPDATE_FEATURE_CONFIGURATION'; payload: Partial<FeatureConfiguration> }
  | { type: 'SAVE_PROGRESS' }
  | { type: 'LOAD_PROGRESS'; payload: OnboardingState }
  | { type: 'RESET_PROGRESS' }
  | { type: 'UPDATE_ACHIEVEMENTS'; payload: Achievement[] }

// Reducer function
function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, ...action.payload }

    case 'NEXT_STEP':
      const nextStep = Math.min(state.currentStep + 1, state.totalSteps - 1)
      return {
        ...state,
        currentStep: nextStep,
        lastActivityAt: new Date().toISOString()
      }

    case 'PREVIOUS_STEP':
      const prevStep = Math.max(state.currentStep - 1, 0)
      return {
        ...state,
        currentStep: prevStep,
        lastActivityAt: new Date().toISOString()
      }

    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: Math.max(0, Math.min(action.payload, state.totalSteps - 1)),
        lastActivityAt: new Date().toISOString()
      }

    case 'COMPLETE_STEP':
      const updatedCompletedSteps = state.progress.completedSteps.map(step =>
        step.id === action.payload
          ? {
              ...step,
              status: 'completed' as const,
              completedAt: new Date().toISOString()
            }
          : step
      )

      // Check if step exists in completedSteps, if not add it
      const stepExists = state.progress.completedSteps.some(step => step.id === action.payload)
      if (!stepExists) {
        const stepToComplete = onboardingSteps.find(step => step.id === action.payload)
        if (stepToComplete) {
          updatedCompletedSteps.push({
            ...stepToComplete,
            status: 'completed' as const,
            completedAt: new Date().toISOString()
          })
        }
      }

      return {
        ...state,
        progress: {
          ...state.progress,
          completedSteps: updatedCompletedSteps,
          lastActivityAt: new Date().toISOString()
        }
      }

    case 'SKIP_STEP':
      const updatedSteps = state.progress.completedSteps.map(step =>
        step.id === action.payload
          ? { ...step, status: 'skipped' as const }
          : step
      )

      // Add step if it doesn't exist
      const stepToSkip = onboardingSteps.find(step => step.id === action.payload)
      if (stepToSkip && !updatedSteps.some(step => step.id === action.payload)) {
        updatedSteps.push({
          ...stepToSkip,
          status: 'skipped' as const
        })
      }

      return {
        ...state,
        progress: {
          ...state.progress,
          completedSteps: updatedSteps,
          lastActivityAt: new Date().toISOString()
        }
      }

    case 'UPDATE_BUSINESS_INFO':
      return {
        ...state,
        businessInfo: { ...state.businessInfo, ...action.payload }
      }

    case 'UPDATE_INDUSTRY_SELECTION':
      return {
        ...state,
        industrySelection: { ...state.industrySelection, ...action.payload }
      }

    case 'UPDATE_FEATURE_CONFIGURATION':
      return {
        ...state,
        featureConfiguration: { ...state.featureConfiguration, ...action.payload }
      }

    case 'SAVE_PROGRESS':
      return {
        ...state,
        lastSavedAt: new Date().toISOString()
      }

    case 'LOAD_PROGRESS':
      return action.payload

    case 'RESET_PROGRESS':
      return {
        ...initialState,
        totalSteps: state.totalSteps
      }

    case 'UPDATE_ACHIEVEMENTS':
      return {
        ...state,
        progress: {
          ...state.progress,
          achievements: action.payload
        }
      }

    default:
      return state
  }
}

// Create the context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

// Provider component
export function OnboardingProvider({ children }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState)

  // Calculate progress percentage
  const calculateProgress = useCallback(() => {
    const requiredSteps = onboardingSteps.filter(step => !step.isOptional)
    const completedRequiredSteps = state.progress.completedSteps.filter(step =>
      requiredSteps.some(requiredStep => requiredStep.id === step.id) &&
      step.status === 'completed'
    )

    if (requiredSteps.length === 0) return 0
    return Math.round((completedRequiredSteps.length / requiredSteps.length) * 100)
  }, [state.progress.completedSteps])

  // Update milestones based on completed steps
  useEffect(() => {
    const updatedMilestones = milestones.map(milestone => {
      const completedRequirements = milestone.requirements.filter(req =>
        state.progress.completedSteps.some(step =>
          step.id === req && step.status === 'completed'
        )
      )

      const progress = (completedRequirements.length / milestone.requirements.length) * 100
      const isUnlocked = progress === 100

      return {
        ...milestone,
        progress,
        unlockedAt: isUnlocked ? new Date().toISOString() : milestone.unlockedAt
      }
    })

    const currentMilestoneIndex = updatedMilestones.findIndex(
      milestone => milestone.progress < 100
    )

    const currentMilestone = currentMilestoneIndex >= 0
      ? updatedMilestones[currentMilestoneIndex]
      : updatedMilestones[updatedMilestones.length - 1]

    if (JSON.stringify(currentMilestone) !== JSON.stringify(state.progress.currentMilestone)) {
      dispatch({
        type: 'UPDATE_STATE',
        payload: {
          progress: {
            ...state.progress,
            currentMilestone
          }
        }
      })
    }
  }, [state.progress.completedSteps])

  // Save progress to localStorage
  const saveProgress = useCallback(async () => {
    try {
      localStorage.setItem('cin7-onboarding-progress', JSON.stringify(state))
      dispatch({ type: 'SAVE_PROGRESS' })
    } catch (error) {
      console.error('Failed to save onboarding progress:', error)
    }
  }, [state])

  // Load progress from localStorage
  const loadProgress = useCallback(async () => {
    try {
      const savedProgress = localStorage.getItem('cin7-onboarding-progress')
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress)
        dispatch({ type: 'LOAD_PROGRESS', payload: parsedProgress })
      }
    } catch (error) {
      console.error('Failed to load onboarding progress:', error)
    }
  }, [])

  // Reset progress
  const resetProgress = useCallback(() => {
    dispatch({ type: 'RESET_PROGRESS' })
    localStorage.removeItem('cin7-onboarding-progress')
  }, [])

  // Navigation functions
  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' })
  }, [])

  const previousStep = useCallback(() => {
    dispatch({ type: 'PREVIOUS_STEP' })
  }, [])

  const goToStep = useCallback((stepIndex: number) => {
    dispatch({ type: 'GO_TO_STEP', payload: stepIndex })
  }, [])

  // Step management functions
  const completeStep = useCallback((stepId: string) => {
    dispatch({ type: 'COMPLETE_STEP', payload: stepId })
  }, [])

  const skipStep = useCallback((stepId: string) => {
    dispatch({ type: 'SKIP_STEP', payload: stepId })
  }, [])

  // Auto-save progress
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (!state.isCompleted && !state.isPaused) {
        saveProgress()
      }
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval)
  }, [state, saveProgress])

  // Load progress on mount
  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  const value: OnboardingContextType = {
    state,
    updateState: (updates) => dispatch({ type: 'UPDATE_STATE', payload: updates }),
    saveProgress,
    loadProgress,
    resetProgress,
    nextStep,
    previousStep,
    goToStep,
    completeStep,
    skipStep,
    calculateProgress
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

// Hook to use the onboarding context
export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}

export { OnboardingContext, onboardingSteps, milestones }