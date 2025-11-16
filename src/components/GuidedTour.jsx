import React, { useState, useEffect, useRef, useCallback } from 'react'
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
  Popover,
  ActionList,
  Tooltip,
  Modal,
  RadioButton,
  Checkbox,
  TextStyle
} from '@shopify/polaris'
import {
  InfoIcon,
  PlayIcon,
  PauseIcon,
  SkipIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  QuestionMarkIcon,
  SmileIcon,
  TrophyIcon,
  ClockIcon,
  SparklesIcon,
  ExternalIcon
} from '@shopify/polaris-icons'

const TOUR_DEFINITIONS = {
  'getting-started': {
    id: 'getting-started',
    name: 'Getting Started Tour',
    description: 'Learn the basics of Cin7 Core and get familiar with the main features',
    duration: '10 minutes',
    difficulty: 'beginner',
    steps: [
      {
        id: 'welcome',
        title: 'Welcome to Cin7 Core!',
        content: 'Let\'s take a quick tour of the main features. We\'ll show you around the dashboard and key areas you\'ll be using every day.',
        target: '.dashboard-welcome',
        position: 'center',
        type: 'info',
        action: { type: 'wait', delay: 2000 }
      },
      {
        id: 'navigation',
        title: 'Navigation Menu',
        content: 'This is your main navigation. You can access all modules like Inventory, Sales, Customers, and Reports from here.',
        target: '[data-tour="navigation"]',
        position: 'right',
        type: 'action',
        action: { type: 'click', target: '[data-tour="nav-inventory"]' }
      },
      {
        id: 'kpi-cards',
        title: 'Key Performance Indicators',
        content: 'These cards show your most important metrics at a glance. They update in real-time to help you track your business performance.',
        target: '[data-tour="kpi-cards"]',
        position: 'bottom',
        type: 'info'
      },
      {
        id: 'add-product',
        title: 'Quick Actions',
        content: 'Here you can quickly add products, create orders, or access frequently used features. This is your productivity shortcut center.',
        target: '[data-tour="quick-actions"]',
        position: 'left',
        type: 'action',
        action: { type: 'click', target: '[data-tour="add-product-btn"]' }
      },
      {
        id: 'search',
        title: 'Global Search',
        content: 'Use this search bar to quickly find products, customers, orders, or anything else in your system.',
        target: '[data-tour="search-bar"]',
        position: 'bottom',
        type: 'info'
      }
    ],
    targetPages: ['/dashboard'],
    completionRate: 0
  },
  'inventory-management': {
    id: 'inventory-management',
    name: 'Inventory Management Deep Dive',
    description: 'Master inventory tracking, stock management, and product organization',
    duration: '15 minutes',
    difficulty: 'intermediate',
    steps: [
      {
        id: 'inventory-overview',
        title: 'Inventory Overview',
        content: 'Here you can see all your inventory across all locations, track stock levels, and identify items that need attention.',
        target: '[data-tour="inventory-overview"]',
        position: 'right',
        type: 'info'
      },
      {
        id: 'add-inventory',
        title: 'Adding New Products',
        content: 'Click here to add new products to your inventory. You can add them one by one or import in bulk.',
        target: '[data-tour="add-product"]',
        position: 'bottom',
        type: 'action',
        action: { type: 'click', target: '[data-tour="add-inventory-btn"]' }
      },
      {
        id: 'stock-levels',
        title: 'Stock Level Management',
        content: 'Monitor your stock levels and get alerts when items are running low. You can set custom reorder points for each product.',
        target: '[data-tour="stock-levels"]',
        position: 'left',
        type: 'info'
      },
      {
        id: 'multi-location',
        title: 'Multi-Location Inventory',
        content: 'If you have multiple warehouses or stores, you can track inventory across all locations and manage transfers between them.',
        target: '[data-tour="multi-location"]',
        position: 'top',
        type: 'info'
      },
      {
        id: 'low-stock-alerts',
        title: 'Low Stock Alerts',
        content: 'This section shows you products that are running low and need to be reordered. Click on any product to create a purchase order.',
        target: '[data-tour="low-stock-alerts"]',
        position: 'bottom',
        type: 'action',
        action: { type: 'click', target: '[data-tour="low-stock-item"]' }
      }
    ],
    targetPages: ['/inventory', '/products'],
    completionRate: 0
  },
  'sales-processing': {
    id: 'sales-processing',
    name: 'Sales Order Processing',
    description: 'Learn how to efficiently process orders from creation to fulfillment',
    duration: '12 minutes',
    difficulty: 'intermediate',
    steps: [
      {
        id: 'sales-dashboard',
        title: 'Sales Dashboard',
        content: 'This is your sales command center. Here you can see all active orders, track fulfillment progress, and monitor sales performance.',
        target: '[data-tour="sales-dashboard"]',
        position: 'center',
        type: 'info'
      },
      {
        id: 'create-order',
        title: 'Creating New Orders',
        content: 'Start by clicking here to create a new order. You can add products, apply discounts, and choose shipping methods.',
        target: '[data-tour="create-order"]',
        position: 'bottom',
        type: 'action',
        action: { type: 'click', target: '[data-tour="create-order-btn"]' }
      },
      {
        id: 'order-status',
        title: 'Order Status Tracking',
        content: 'Track your orders through every stage: pending, processing, shipped, and delivered. Each status update can trigger automated notifications.',
        target: '[data-tour="order-status"]',
        position: 'left',
        type: 'info'
      },
      {
        id: 'payment-processing',
        title: 'Payment Processing',
        content: 'View and manage payment status for all orders. You can process refunds and handle payment issues from this section.',
        target: '[data-tour="payment-processing"]',
        position: 'top',
        type: 'info'
      },
      {
        id: 'shipping-fulfillment',
        title: 'Shipping & Fulfillment',
        content: 'Once an order is ready, you can generate shipping labels, track packages, and update customers with delivery information.',
        target: '[data-tour="shipping-fulfillment"]',
        position: 'right',
        type: 'action',
        action: { type: 'click', target: '[data-tour="generate-label"]' }
      }
    ],
    targetPages: ['/sales'],
    completionRate: 0
  },
  'reporting-analytics': {
    id: 'reporting-analytics',
    name: 'Reporting & Analytics',
    description: 'Unlock business insights with powerful reporting and analytics tools',
    duration: '20 minutes',
    difficulty: 'advanced',
    steps: [
      {
        id: 'reports-overview',
        title: 'Reports Dashboard',
        content: 'Welcome to your business intelligence hub. Here you can access all reports, create custom dashboards, and gain insights into your operations.',
        target: '[data-tour="reports-overview"]',
        position: 'center',
        type: 'info'
      },
      {
        id: 'sales-reports',
        title: 'Sales Analytics',
        content: 'View detailed sales reports, track trends, and analyze performance by product, customer, or time period.',
        target: '[data-tour="sales-reports"]',
        position: 'left',
        type: 'action',
        action: { type: 'click', target: '[data-tour="sales-report-btn"]' }
      },
      {
        id: 'inventory-reports',
        title: 'Inventory Insights',
        content: 'Monitor inventory turnover, identify slow-moving products, and optimize stock levels with predictive analytics.',
        target: '[data-tour="inventory-reports"]',
        position: 'right',
        type: 'info'
      },
      {
        id: 'custom-dashboards',
        title: 'Custom Dashboards',
        content: 'Create your own dashboards with the metrics that matter most to your business. Drag and drop widgets to build your perfect view.',
        target: '[data-tour="custom-dashboards"]',
        position: 'bottom',
        type: 'action',
        action: { type: 'click', target: '[data-tour="create-dashboard"]' }
      },
      {
        id: 'export-data',
        title: 'Data Export',
        content: 'Export any report to CSV, Excel, or PDF. You can also schedule automatic exports to be sent to your email.',
        target: '[data-tour="export-data"]',
        position: 'top',
        type: 'info'
      }
    ],
    targetPages: ['/reports'],
    completionRate: 0
  },
  'integration-setup': {
    id: 'integration-setup',
    name: 'Integration Setup Guide',
    description: 'Connect your favorite tools and automate your workflow',
    duration: '25 minutes',
    difficulty: 'intermediate',
    steps: [
      {
        id: 'integration-hub',
        title: 'Integration Hub',
        content: 'This is where you can connect all your external tools like accounting software, e-commerce platforms, and shipping carriers.',
        target: '[data-tour="integration-hub"]',
        position: 'center',
        type: 'info'
      },
      {
        id: 'accounting-integration',
        title: 'Accounting Integration',
        content: 'Connect with QuickBooks, Xero, or other accounting software to automatically sync financial data and eliminate manual entry.',
        target: '[data-tour="accounting-integration"]',
        position: 'left',
        type: 'action',
        action: { type: 'click', target: '[data-tour="connect-accounting"]' }
      },
      {
        id: 'ecommerce-sync',
        title: 'E-commerce Sync',
        content: 'Connect your online store to automatically sync products, inventory, and orders. Supports Shopify, WooCommerce, Amazon, and more.',
        target: '[data-tour="ecommerce-sync"]',
        position: 'right',
        type: 'info'
      },
      {
        id: 'shipping-integration',
        title: 'Shipping Integration',
        content: 'Connect with shipping carriers to get real-time rates, print labels, and track packages automatically.',
        target: '[data-tour="shipping-integration"]',
        position: 'bottom',
        type: 'action',
        action: { type: 'click', target: '[data-tour="connect-shipping"]' }
      },
      {
        id: 'webhooks-automation',
        title: 'Webhooks & Automation',
        content: 'Set up webhooks to trigger custom workflows and integrations with other systems using our API.',
        target: '[data-tour="webhooks-automation"]',
        position: 'top',
        type: 'info'
      }
    ],
    targetPages: ['/settings', '/integrations'],
    completionRate: 0
  }
}

const TOUR_STYLES = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9998,
    pointerEvents: 'none'
  },
  spotlight: {
    position: 'absolute',
    border: '3px solid #007ace',
    borderRadius: '8px',
    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    transition: 'all 0.3s ease'
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    zIndex: 10000,
    maxWidth: '350px',
    minWidth: '250px'
  }
}

const GuidedTour = ({ onTourComplete, onTourSkip, autoStart = false, availableTours = Object.keys(TOUR_DEFINITIONS) }) => {
  const [activeTour, setActiveTour] = useState(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showTourMenu, setShowTourMenu] = useState(false)
  const [completedTours, setCompletedTours] = useState([])
  const [highlightedElement, setHighlightedElement] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [showSkipConfirm, setShowSkipConfirm] = useState(false)
  const [tourSettings, setTourSettings] = useState({
    showKeyboardShortcuts: true,
    autoAdvance: false,
    showProgress: true,
    allowSkip: true
  })

  const spotlightRef = useRef(null)
  const tooltipRef = useRef(null)

  // Auto-start tour if requested
  useEffect(() => {
    if (autoStart && availableTours.length > 0 && !activeTour) {
      startTour(availableTours[0])
    }
  }, [autoStart, availableTours])

  // Calculate tooltip position based on target element
  const calculateTooltipPosition = useCallback((target, position) => {
    if (!target) return { top: 0, left: 0 }

    const rect = target.getBoundingClientRect()
    const tooltipWidth = 350
    const tooltipHeight = 200
    const padding = 20

    const positions = {
      top: {
        top: rect.top - tooltipHeight - padding,
        left: rect.left + (rect.width - tooltipWidth) / 2
      },
      bottom: {
        top: rect.bottom + padding,
        left: rect.left + (rect.width - tooltipWidth) / 2
      },
      left: {
        top: rect.top + (rect.height - tooltipHeight) / 2,
        left: rect.left - tooltipWidth - padding
      },
      right: {
        top: rect.top + (rect.height - tooltipHeight) / 2,
        left: rect.right + padding
      },
      center: {
        top: window.innerHeight / 2 - tooltipHeight / 2,
        left: window.innerWidth / 2 - tooltipWidth / 2
      }
    }

    const calculatedPos = positions[position] || positions.bottom

    // Adjust if tooltip goes outside viewport
    if (calculatedPos.left < padding) {
      calculatedPos.left = padding
    }
    if (calculatedPos.left + tooltipWidth > window.innerWidth - padding) {
      calculatedPos.left = window.innerWidth - tooltipWidth - padding
    }
    if (calculatedPos.top < padding) {
      calculatedPos.top = padding
    }
    if (calculatedPos.top + tooltipHeight > window.innerHeight - padding) {
      calculatedPos.top = window.innerHeight - tooltipHeight - padding
    }

    return calculatedPos
  }, [])

  // Start a tour
  const startTour = useCallback((tourId) => {
    const tour = TOUR_DEFINITIONS[tourId]
    if (!tour) return

    setActiveTour(tour)
    setCurrentStepIndex(0)
    setIsPaused(false)
    setShowTourMenu(false)

    // Check if we're on a valid page for this tour
    const currentPath = window.location.pathname
    if (!tour.targetPages.includes(currentPath)) {
      // Redirect to the first valid page
      window.location.href = tour.targetPages[0]
    }
  }, [])

  // Stop the current tour
  const stopTour = useCallback(() => {
    setActiveTour(null)
    setCurrentStepIndex(0)
    setIsPaused(false)
    setHighlightedElement(null)
  }, [])

  // Skip current step
  const skipStep = useCallback(() => {
    if (activeTour && currentStepIndex < activeTour.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    }
  }, [activeTour, currentStepIndex])

  // Go to previous step
  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }, [currentStepIndex])

  // Execute tour step action
  const executeStepAction = useCallback(async (action) => {
    if (!action) return

    switch (action.type) {
      case 'click':
        const target = document.querySelector(action.target)
        if (target) {
          target.click()
          await new Promise(resolve => setTimeout(resolve, 500))
        }
        break
      case 'wait':
        await new Promise(resolve => setTimeout(resolve, action.delay || 1000))
        break
      case 'navigate':
        window.location.href = action.target
        break
      default:
        break
    }
  }, [])

  // Validate step completion
  const validateStep = useCallback((validation) => {
    if (!validation) return true

    switch (validation.type) {
      case 'element-exists':
        return !!document.querySelector(validation.target)
      case 'element-visible':
        const element = document.querySelector(validation.target)
        return element && element.offsetParent !== null
      case 'value-equals':
        const input = document.querySelector(validation.target)
        return input && input.value === validation.value
      default:
        return true
    }
  }, [])

  // Handle step advancement
  const nextStep = useCallback(async () => {
    if (!activeTour) return

    const currentStep = activeTour.steps[currentStepIndex]
    if (!currentStep) return

    // Execute action if present
    if (currentStep.action) {
      await executeStepAction(currentStep.action)
    }

    // Validate if validation is required
    if (currentStep.validation) {
      const isValid = validateStep(currentStep.validation)
      if (!isValid) {
        // Show error message and don't advance
        return
      }
    }

    // Move to next step or complete tour
    if (currentStepIndex < activeTour.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    } else {
      completeTour()
    }
  }, [activeTour, currentStepIndex, executeStepAction, validateStep])

  // Complete the current tour
  const completeTour = useCallback(() => {
    if (activeTour) {
      setCompletedTours(prev => [...prev, activeTour.id])
      if (onTourComplete) {
        onTourComplete(activeTour.id)
      }
    }
    stopTour()
  }, [activeTour, onTourComplete, stopTour])

  // Update highlighted element and tooltip position
  useEffect(() => {
    if (!activeTour || isPaused) {
      setHighlightedElement(null)
      return
    }

    const currentStep = activeTour.steps[currentStepIndex]
    if (!currentStep) return

    let target = null
    if (currentStep.target && currentStep.target !== '.dashboard-welcome') {
      target = document.querySelector(currentStep.target)
    }

    setHighlightedElement(target)

    if (target && currentStep.position !== 'center') {
      const position = calculateTooltipPosition(target, currentStep.position)
      setTooltipPosition(position)
    } else {
      setTooltipPosition({
        top: window.innerHeight / 2 - 100,
        left: window.innerWidth / 2 - 175
      })
    }
  }, [activeTour, currentStepIndex, isPaused, calculateTooltipPosition])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!activeTour || isPaused) return

      switch (event.key) {
        case 'ArrowRight':
          nextStep()
          break
        case 'ArrowLeft':
          previousStep()
          break
        case 'Escape':
          setShowSkipConfirm(true)
          break
        case ' ':
          event.preventDefault()
          setIsPaused(prev => !prev)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [activeTour, isPaused, nextStep, previousStep])

  if (!activeTour) {
    // Tour menu/show available tours
    return (
      <Box>
        <Button
          icon={QuestionMarkIcon}
          onClick={() => setShowTourMenu(true)}
          accessibilityLabel="Start guided tour"
        >
          Take a Tour
        </Button>

        {showTourMenu && (
          <Modal
            open={showTourMenu}
            onClose={() => setShowTourMenu(false)}
            title="Guided Tours"
            primaryAction={{
              content: 'Close',
              onAction: () => setShowTourMenu(false)
            }}
          >
            <Modal.Section>
              <VerticalStack gap="400">
                <Text variant="bodyMd" as="p">
                  Choose a tour to learn more about Cin7 Core features. Each tour is designed to help you master specific aspects of the system.
                </Text>

                <Grid columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
                  {availableTours.map(tourId => {
                    const tour = TOUR_DEFINITIONS[tourId]
                    const isCompleted = completedTours.includes(tourId)
                    const difficultyColors = {
                      beginner: 'success',
                      intermediate: 'attention',
                      advanced: 'critical'
                    }

                    return (
                      <Card key={tourId} padding="400">
                        <VerticalStack gap="300">
                          <HorizontalStack align="space-between">
                            <Text variant="headingSm" fontWeight="bold">
                              {tour.name}
                            </Text>
                            {isCompleted && (
                              <Badge tone="success">Completed</Badge>
                            )}
                          </HorizontalStack>

                          <Text variant="bodySm" tone="subdued">
                            {tour.description}
                          </Text>

                          <HorizontalStack gap="200">
                            <Badge size="small" tone={difficultyColors[tour.difficulty]}>
                              {tour.difficulty}
                            </Badge>
                            <HorizontalStack gap="100">
                              <Icon source={ClockIcon} size="small" />
                              <Text variant="bodyXs" tone="subdued">
                                {tour.duration}
                              </Text>
                            </HorizontalStack>
                          </HorizontalStack>

                          <Button
                            fullWidth
                            onClick={() => startTour(tourId)}
                            disabled={isCompleted}
                          >
                            {isCompleted ? 'Completed' : 'Start Tour'}
                          </Button>
                        </VerticalStack>
                      </Card>
                    )
                  })}
                </Grid>

                {/* Tour Settings */}
                <Divider />
                <VerticalStack gap="300">
                  <Text variant="headingSm" as="h3">
                    Tour Preferences
                  </Text>
                  <Checkbox
                    label="Show keyboard shortcuts"
                    checked={tourSettings.showKeyboardShortcuts}
                    onChange={(checked) => setTourSettings(prev => ({ ...prev, showKeyboardShortcuts: checked }))}
                  />
                  <Checkbox
                    label="Auto-advance between steps"
                    checked={tourSettings.autoAdvance}
                    onChange={(checked) => setTourSettings(prev => ({ ...prev, autoAdvance: checked }))}
                  />
                  <Checkbox
                    label="Show progress indicator"
                    checked={tourSettings.showProgress}
                    onChange={(checked) => setTourSettings(prev => ({ ...prev, showProgress: checked }))}
                  />
                  <Checkbox
                    label="Allow skipping steps"
                    checked={tourSettings.allowSkip}
                    onChange={(checked) => setTourSettings(prev => ({ ...prev, allowSkip: checked }))}
                  />
                </VerticalStack>

                {/* Keyboard Shortcuts */}
                {tourSettings.showKeyboardShortcuts && (
                  <>
                    <Divider />
                    <VerticalStack gap="200">
                      <Text variant="headingSm" as="h3">
                        Keyboard Shortcuts
                      </Text>
                      <Box padding="200" backgroundColor="bg-surface-secondary" borderRadius="200">
                        <VerticalStack gap="100">
                          <Text variant="bodyXs"><strong>→</strong> Next step</Text>
                          <Text variant="bodyXs"><strong>←</strong> Previous step</Text>
                          <Text variant="bodyXs"><strong>Space</strong> Pause/Resume</Text>
                          <Text variant="bodyXs"><strong>Esc</strong> Exit tour</Text>
                        </VerticalStack>
                      </Box>
                    </VerticalStack>
                  </>
                )}
              </VerticalStack>
            </Modal.Section>
          </Modal>
        )}
      </Box>
    )
  }

  // Active tour rendering
  const currentStep = activeTour.steps[currentStepIndex]
  const progress = ((currentStepIndex + 1) / activeTour.steps.length) * 100

  return (
    <>
      {/* Overlay */}
      <div style={TOUR_STYLES.overlay} />

      {/* Spotlight on target element */}
      {highlightedElement && (
        <div
          ref={spotlightRef}
          style={{
            ...TOUR_STYLES.spotlight,
            top: highlightedElement.offsetTop - 4,
            left: highlightedElement.offsetLeft - 4,
            width: highlightedElement.offsetWidth + 8,
            height: highlightedElement.offsetHeight + 8
          }}
        />
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        style={{
          ...TOUR_STYLES.tooltip,
          ...tooltipPosition
        }}
      >
        <VerticalStack gap="300">
          {/* Header */}
          <HorizontalStack align="space-between">
            <Text variant="headingSm" fontWeight="bold">
              {currentStep.title}
            </Text>
            <Button
              icon={XCircleIcon}
              variant="plain"
              onClick={() => setShowSkipConfirm(true)}
              accessibilityLabel="Exit tour"
            />
          </HorizontalStack>

          {/* Content */}
          <Text variant="bodySm">
            {currentStep.content}
          </Text>

          {/* Progress */}
          {tourSettings.showProgress && (
            <div>
              <HorizontalStack align="space-between" gap="200" marginBottom="100">
                <Text variant="bodyXs" tone="subdued">
                  Step {currentStepIndex + 1} of {activeTour.steps.length}
                </Text>
                <Text variant="bodyXs" tone="subdued">
                  {Math.round(progress)}%
                </Text>
              </HorizontalStack>
              <div
                style={{
                  height: '4px',
                  backgroundColor: '#f1f3f5',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: '#007ace',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <HorizontalStack gap="200">
            {currentStepIndex > 0 && (
              <Button onClick={previousStep}>
                <Icon source={ArrowLeftIcon} />
                Previous
              </Button>
            )}

            <Button primary onClick={nextStep}>
              {currentStepIndex < activeTour.steps.length - 1 ? (
                <>
                  Next
                  <Icon source={ArrowRightIcon} />
                </>
              ) : (
                <>
                  Complete
                  <Icon source={CheckCircleIcon} />
                </>
              )}
            </Button>

            {tourSettings.allowSkip && currentStep.isOptional && (
              <Button onClick={skipStep}>
                Skip
              </Button>
            )}
          </HorizontalStack>

          {/* Tour Info */}
          <Box padding="200" backgroundColor="bg-surface-secondary" borderRadius="200">
            <HorizontalStack gap="200">
              <Icon source={SparklesIcon} size="small" tone="attention" />
              <Text variant="bodyXs" tone="subdued">
                {activeTour.name} • {activeTour.duration}
              </Text>
            </HorizontalStack>
          </Box>
        </VerticalStack>
      </div>

      {/* Skip Confirmation Modal */}
      {showSkipConfirm && (
        <Modal
          open={showSkipConfirm}
          onClose={() => setShowSkipConfirm(false)}
          title="Exit Tour?"
          primaryAction={{
            content: 'Yes, Exit Tour',
            onAction: () => {
              setShowSkipConfirm(false)
              stopTour()
              if (onTourSkip) {
                onTourSkip(activeTour.id)
              }
            }
          }}
          secondaryActions={[
            {
              content: 'Continue Tour',
              onAction: () => setShowSkipConfirm(false)
            }
          ]}
        >
          <Modal.Section>
            <Text>
              Are you sure you want to exit this tour? You can always restart it later from the help menu.
            </Text>
          </Modal.Section>
        </Modal>
      )}
    </>
  )
}

export { GuidedTour, TOUR_DEFINITIONS }
export default GuidedTour