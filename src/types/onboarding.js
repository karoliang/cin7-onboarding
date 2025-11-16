/**
 * TypeScript interfaces for Cin7 Core Onboarding Wizard
 * Defines the data structures and types used throughout the onboarding experience
 */

// Export interfaces as const objects for runtime compatibility
export const OnboardingState = {}
export const OnboardingContextType = {}
export const BusinessInfo = {}
export const IndustrySelection = {}
export const FeatureConfiguration = {}
export const OnboardingProgress = {}
export const OnboardingStep = {}
export const Milestone = {}
export const Achievement = {}

/**
 * @typedef {Object} OnboardingState
 * @property {number} currentStep - Current wizard step
 * @property {number} totalSteps - Total number of steps
 * @property {boolean} isCompleted - Whether onboarding is completed
 * @property {boolean} isPaused - Whether onboarding is paused
 * @property {string|null} lastSavedAt - Last save timestamp
 * @property {BusinessInfo} businessInfo - User business information
 * @property {IndustrySelection} industrySelection - Industry configuration
 * @property {FeatureConfiguration} featureConfiguration - Feature settings
 * @property {OnboardingProgress} progress - Progress tracking
 */

/**
 * @typedef {Object} BusinessInfo
 * @property {string} companyName - Company name
 * @property {IndustryType} industry - Industry type
 * @property {BusinessSize} businessSize - Business size
 * @property {RevenueRange} annualRevenue - Annual revenue range
 * @property {string[]} primaryMarkets - Primary markets
 * @property {string[]} currentSystems - Current systems used
 * @property {string[]} painPoints - Current pain points
 * @property {string[]} goals - Business goals
 * @property {Object} contactInfo - Contact information
 * @property {string} contactInfo.name - Contact name
 * @property {string} contactInfo.email - Contact email
 * @property {string} contactInfo.role - Contact role
 * @property {string} [contactInfo.phone] - Contact phone
 */

/**
 * @typedef {'retail'|'manufacturing'|'wholesale'|'ecommerce'|'food-beverage'|'apparel'|'electronics'|'healthcare'|'other'} IndustryType
 */

/**
 * @typedef {'startup'|'small'|'medium'|'large'|'enterprise'} BusinessSize
 */

/**
 * @typedef {'under-100k'|'100k-500k'|'500k-1m'|'1m-5m'|'5m-10m'|'10m-50m'|'over-50m'} RevenueRange
 */

/**
 * @typedef {Object} IndustrySelection
 * @property {IndustryType} selectedIndustry - Selected industry
 * @property {string} [subCategory] - Industry subcategory
 * @property {string[]} businessModel - Business model(s)
 * @property {SalesChannel[]} salesChannels - Sales channels
 * @property {OperationalNeed[]} operationalNeeds - Operational needs
 */

/**
 * @typedef {'retail-store'|'online-own-site'|'marketplace'|'b2b-portal'|'phone-sales'|'in-person'|'wholesale-distributors'} SalesChannel
 */

/**
 * @typedef {'inventory-management'|'order-processing'|'shipping-fulfillment'|'supplier-management'|'production-tracking'|'quality-control'|'reporting-analytics'|'multi-channel-sync'|'pos-integration'|'accounting-integration'} OperationalNeed
 */

/**
 * @typedef {Object} FeatureConfiguration
 * @property {CoreFeature[]} selectedFeatures - Selected features
 * @property {ModuleSettings} moduleSettings - Module configurations
 * @property {IntegrationSettings} integrations - Integration settings
 * @property {WorkflowSettings} workflowConfiguration - Workflow settings
 * @property {ReportingSettings} reportingSetup - Reporting configuration
 */

/**
 * @typedef {'inventory-management'|'order-management'|'customer-management'|'supplier-management'|'production-tracking'|'reporting-analytics'|'pos-integration'|'ecommerce-integration'|'accounting-integration'|'warehouse-management'|'barcode-scanning'|'batch-tracking'|'serial-tracking'|'multi-currency'|'multi-location'} CoreFeature
 */

/**
 * @typedef {Object} ModuleSettings
 * @property {InventoryModuleSettings} inventory - Inventory settings
 * @property {SalesModuleSettings} sales - Sales settings
 * @property {CustomerModuleSettings} customers - Customer settings
 * @property {ReportsModuleSettings} reports - Reports settings
 * @property {SettingsModuleSettings} settings - General settings
 */

/**
 * @typedef {Object} InventoryModuleSettings
 * @property {boolean} enableLowStockAlerts - Enable low stock alerts
 * @property {boolean} enableBatchTracking - Enable batch tracking
 * @property {boolean} enableSerialTracking - Enable serial tracking
 * @property {boolean} enableMultiLocation - Enable multi-location
 * @property {number} defaultReorderPoint - Default reorder point
 * @property {string[]} categories - Product categories
 * @property {string[]} suppliers - Supplier list
 * @property {string[]} warehouses - Warehouse list
 */

/**
 * @typedef {Object} SalesModuleSettings
 * @property {boolean} enableOrderProcessing - Enable order processing
 * @property {boolean} enableInvoicing - Enable invoicing
 * @property {boolean} enableShippingIntegration - Enable shipping integration
 * @property {boolean} enableTaxCalculation - Enable tax calculation
 * @property {boolean} enableDiscountRules - Enable discount rules
 * @property {string[]} paymentMethods - Available payment methods
 * @property {string[]} shippingMethods - Available shipping methods
 * @property {TaxSettings} taxSettings - Tax configuration
 */

/**
 * @typedef {Object} CustomerModuleSettings
 * @property {boolean} enableCustomerGroups - Enable customer groups
 * @property {boolean} enableCreditLimits - Enable credit limits
 * @property {boolean} enableCustomerPortal - Enable customer portal
 * @property {boolean} enableEmailNotifications - Enable email notifications
 * @property {string} defaultCustomerType - Default customer type
 * @property {CustomField[]} customFields - Custom fields
 */

/**
 * @typedef {Object} ReportsModuleSettings
 * @property {boolean} enableScheduledReports - Enable scheduled reports
 * @property {boolean} enableCustomDashboards - Enable custom dashboards
 * @property {boolean} enableDataExport - Enable data export
 * @property {string[]} defaultReports - Default reports
 * @property {'daily'|'weekly'|'monthly'} reportFrequency - Report frequency
 */

/**
 * @typedef {Object} SettingsModuleSettings
 * @property {boolean} enableMultiCurrency - Enable multi-currency
 * @property {boolean} enableMultiWarehouse - Enable multi-warehouse
 * @property {boolean} enableApiAccess - Enable API access
 * @property {boolean} enableAuditTrail - Enable audit trail
 * @property {string} timezone - Timezone
 * @property {string} dateFormat - Date format
 * @property {string} numberFormat - Number format
 */

/**
 * @typedef {Object} IntegrationSettings
 * @property {Integration[]} enabledIntegrations - Enabled integrations
 * @property {AccountingIntegration} [accountingIntegration] - Accounting integration
 * @property {EcommerceIntegration} [ecommerceIntegration] - E-commerce integration
 * @property {ShippingIntegration} [shippingIntegration] - Shipping integration
 * @property {PaymentIntegration} [paymentIntegration] - Payment integration
 * @property {CustomIntegration[]} customIntegrations - Custom integrations
 */

/**
 * @typedef {Object} Integration
 * @property {string} id - Integration ID
 * @property {string} name - Integration name
 * @property {IntegrationType} type - Integration type
 * @property {'connected'|'pending'|'error'|'not-connected'} status - Integration status
 * @property {Record<string, any>} configuration - Configuration object
 * @property {string} [lastSyncAt] - Last sync timestamp
 */

/**
 * @typedef {'accounting'|'ecommerce'|'shipping'|'payment'|'crm'|'pos'|'marketplace'|'custom'} IntegrationType
 */

/**
 * @typedef {Object} AccountingIntegration
 * @property {'quickbooks'|'xero'|'sage'|'netsuite'|'other'} provider - Accounting provider
 * @property {'realtime'|'hourly'|'daily'} syncFrequency - Sync frequency
 * @property {boolean} syncProducts - Sync products
 * @property {boolean} syncCustomers - Sync customers
 * @property {boolean} syncOrders - Sync orders
 * @property {boolean} syncInvoices - Sync invoices
 */

/**
 * @typedef {Object} EcommerceIntegration
 * @property {'shopify'|'woocommerce'|'magento'|'bigcommerce'|'custom'} platform - E-commerce platform
 * @property {boolean} syncInventory - Sync inventory
 * @property {boolean} syncProducts - Sync products
 * @property {boolean} syncOrders - Sync orders
 * @property {boolean} enableDropshipping - Enable dropshipping
 * @property {number} inventoryBuffer - Inventory buffer percentage
 */

/**
 * @typedef {Object} ShippingIntegration
 * @property {'fedex'|'ups'|'dhl'|'usps'|'shipstation'|'other'} provider - Shipping provider
 * @property {boolean} enableTracking - Enable tracking
 * @property {boolean} enableLabelPrinting - Enable label printing
 * @property {boolean} enableRateComparison - Enable rate comparison
 * @property {string} defaultBoxSize - Default box size
 */

/**
 * @typedef {Object} PaymentIntegration
 * @property {'stripe'|'paypal'|'square'|'authorize'|'other'} provider - Payment provider
 * @property {boolean} enableOnlinePayments - Enable online payments
 * @property {boolean} enableRecurringPayments - Enable recurring payments
 * @property {boolean} enableCardStorage - Enable card storage
 */

/**
 * @typedef {Object} CustomIntegration
 * @property {string} name - Integration name
 * @property {string} endpoint - API endpoint
 * @property {'api-key'|'oauth'|'basic'} authentication - Authentication method
 * @property {Record<string, any>} configuration - Configuration object
 */

/**
 * @typedef {Object} WorkflowSettings
 * @property {OrderWorkflow} orderProcessingWorkflow - Order processing workflow
 * @property {InventoryWorkflow} inventoryWorkflow - Inventory workflow
 * @property {ReportingWorkflow} reportingWorkflow - Reporting workflow
 * @property {CustomWorkflow[]} customWorkflows - Custom workflows
 */

/**
 * @typedef {Object} OrderWorkflow
 * @property {WorkflowStep[]} steps - Workflow steps
 * @property {boolean} autoProcessing - Enable auto-processing
 * @property {boolean} approvalRequired - Require approval
 * @property {NotificationRule[]} notificationRules - Notification rules
 */

/**
 * @typedef {Object} InventoryWorkflow
 * @property {ReorderWorkflow[]} reorderWorkflows - Reorder workflows
 * @property {WorkflowStep[]} stockAdjustmentWorkflow - Stock adjustment workflow
 * @property {WorkflowStep[]} lowStockWorkflow - Low stock workflow
 * @property {WorkflowStep[]} [batchExpirationWorkflow] - Batch expiration workflow
 */

/**
 * @typedef {Object} ReportingWorkflow
 * @property {ScheduledReport[]} scheduledReports - Scheduled reports
 * @property {DashboardUpdate[]} dashboardUpdates - Dashboard updates
 * @property {AlertConfiguration[]} alertConfigurations - Alert configurations
 */

/**
 * @typedef {Object} WorkflowStep
 * @property {string} id - Step ID
 * @property {string} name - Step name
 * @property {'manual'|'automated'|'conditional'} type - Step type
 * @property {string} action - Action to perform
 * @property {WorkflowCondition[]} [conditions] - Step conditions
 * @property {NotificationRule[]} [notifications] - Step notifications
 * @property {number} order - Step order
 * @property {boolean} enabled - Whether step is enabled
 */

/**
 * @typedef {Object} WorkflowCondition
 * @property {string} field - Field to check
 * @property {'equals'|'not-equals'|'greater-than'|'less-than'|'contains'} operator - Comparison operator
 * @property {any} value - Value to compare against
 */

/**
 * @typedef {Object} NotificationRule
 * @property {string} trigger - Trigger condition
 * @property {string[]} recipients - Notification recipients
 * @property {('email'|'sms'|'slack'|'in-app')[]} channels - Notification channels
 * @property {string} [template] - Message template
 * @property {boolean} enabled - Whether rule is enabled
 */

/**
 * @typedef {Object} ReorderWorkflow
 * @property {string} [productId] - Product ID
 * @property {string} [categoryId] - Category ID
 * @property {string} [supplierId] - Supplier ID
 * @property {number} reorderPoint - Reorder point
 * @property {number} reorderQuantity - Reorder quantity
 * @property {boolean} approvalRequired - Require approval
 * @property {boolean} autoOrder - Enable auto-order
 */

/**
 * @typedef {Object} ScheduledReport
 * @property {string} id - Report ID
 * @property {string} name - Report name
 * @property {string} type - Report type
 * @property {'daily'|'weekly'|'monthly'|'quarterly'} frequency - Report frequency
 * @property {string[]} recipients - Report recipients
 * @property {'pdf'|'excel'|'csv'} format - Report format
 * @property {boolean} enabled - Whether report is enabled
 */

/**
 * @typedef {Object} DashboardUpdate
 * @property {string} dashboardId - Dashboard ID
 * @property {'realtime'|'hourly'|'daily'} frequency - Update frequency
 * @property {string[]} metrics - Metrics to update
 * @property {boolean} enabled - Whether update is enabled
 */

/**
 * @typedef {Object} AlertConfiguration
 * @property {string} name - Alert name
 * @property {string} metric - Metric to monitor
 * @property {number} threshold - Alert threshold
 * @property {'above'|'below'|'equals'} operator - Comparison operator
 * @property {('email'|'sms'|'slack'|'in-app')[]} notificationChannels - Notification channels
 * @property {string[]} recipients - Alert recipients
 * @property {boolean} enabled - Whether alert is enabled
 */

/**
 * @typedef {Object} CustomWorkflow
 * @property {string} name - Workflow name
 * @property {string} trigger - Workflow trigger
 * @property {WorkflowStep[]} steps - Workflow steps
 * @property {boolean} enabled - Whether workflow is enabled
 */

/**
 * @typedef {Object} ReportingSettings
 * @property {ReportTemplate[]} selectedReports - Selected reports
 * @property {CustomReport[]} customReports - Custom reports
 * @property {Dashboard[]} dashboards - Dashboards
 * @property {ExportSettings} exportSettings - Export settings
 */

/**
 * @typedef {Object} ReportTemplate
 * @property {string} id - Report ID
 * @property {string} name - Report name
 * @property {'inventory'|'sales'|'customers'|'financial'|'operations'} category - Report category
 * @property {boolean} enabled - Whether report is enabled
 * @property {'daily'|'weekly'|'monthly'} [schedule] - Report schedule
 * @property {string[]} recipients - Report recipients
 */

/**
 * @typedef {Object} CustomReport
 * @property {string} id - Report ID
 * @property {string} name - Report name
 * @property {string} description - Report description
 * @property {string} query - Report query
 * @property {ReportParameter[]} parameters - Report parameters
 * @property {'table'|'chart'|'pivot'} format - Report format
 * @property {boolean} enabled - Whether report is enabled
 */

/**
 * @typedef {Object} Dashboard
 * @property {string} id - Dashboard ID
 * @property {string} name - Dashboard name
 * @property {'grid'|'list'|'custom'} layout - Dashboard layout
 * @property {Widget[]} widgets - Dashboard widgets
 * @property {number} refreshInterval - Refresh interval in seconds
 * @property {boolean} isDefault - Whether this is the default dashboard
 */

/**
 * @typedef {Object} Widget
 * @property {string} id - Widget ID
 * @property {'kpi'|'chart'|'table'|'list'} type - Widget type
 * @property {string} title - Widget title
 * @property {string} dataSource - Data source
 * @property {Record<string, any>} configuration - Widget configuration
 * @property {Object} position - Widget position and size
 * @property {number} position.x - X coordinate
 * @property {number} position.y - Y coordinate
 * @property {number} position.width - Widget width
 * @property {number} position.height - Widget height
 */

/**
 * @typedef {Object} ReportParameter
 * @property {string} name - Parameter name
 * @property {'string'|'number'|'date'|'boolean'} type - Parameter type
 * @property {boolean} required - Whether parameter is required
 * @property {any} [defaultValue] - Default value
 */

/**
 * @typedef {Object} ExportSettings
 * @property {'csv'|'excel'|'pdf'|'json'} format - Export format
 * @property {boolean} includeHeaders - Include headers in export
 * @property {boolean} compression - Enable compression
 * @property {boolean} encryption - Enable encryption
 * @property {'download'|'email'|'ftp'|'s3'} destination - Export destination
 */

/**
 * @typedef {Object} OnboardingProgress
 * @property {OnboardingStep[]} completedSteps - Completed steps
 * @property {Milestone} currentMilestone - Current milestone
 * @property {Achievement[]} achievements - Achievements earned
 * @property {number} timeSpent - Time spent in minutes
 * @property {number} estimatedTimeRemaining - Estimated remaining time in minutes
 * @property {string} lastActivityAt - Last activity timestamp
 */

/**
 * @typedef {Object} OnboardingStep
 * @property {string} id - Step ID
 * @property {string} title - Step title
 * @property {string} description - Step description
 * @property {'information'|'configuration'|'integration'|'verification'} type - Step type
 * @property {'not-started'|'in-progress'|'completed'|'skipped'} status - Step status
 * @property {string} [startedAt] - Start timestamp
 * @property {string} [completedAt] - Completion timestamp
 * @property {number} estimatedDuration - Estimated duration in minutes
 * @property {string[]} dependencies - Step dependencies
 * @property {boolean} isOptional - Whether step is optional
 */

/**
 * @typedef {Object} Milestone
 * @property {string} id - Milestone ID
 * @property {string} title - Milestone title
 * @property {string} description - Milestone description
 * @property {string[]} requirements - Milestone requirements
 * @property {number} progress - Progress percentage (0-100)
 * @property {string} [unlockedAt] - Unlock timestamp
 * @property {MilestoneReward[]} rewards - Milestone rewards
 */

/**
 * @typedef {Object} Achievement
 * @property {string} id - Achievement ID
 * @property {string} title - Achievement title
 * @property {string} description - Achievement description
 * @property {string} icon - Achievement icon
 * @property {string} unlockedAt - Unlock timestamp
 * @property {'setup'|'integration'|'configuration'|'exploration'} category - Achievement category
 * @property {'common'|'rare'|'epic'|'legendary'} rarity - Achievement rarity
 */

/**
 * @typedef {Object} MilestoneReward
 * @property {'feature'|'template'|'integration'|'support'} type - Reward type
 * @property {string} name - Reward name
 * @property {string} description - Reward description
 * @property {boolean} claimed - Whether reward has been claimed
 * @property {string} [claimedAt] - Claim timestamp
 */

/**
 * @typedef {Object} CustomField
 * @property {string} id - Field ID
 * @property {string} name - Field name
 * @property {'text'|'number'|'date'|'boolean'|'select'|'multiselect'} type - Field type
 * @property {boolean} required - Whether field is required
 * @property {string[]} [options] - Field options
 * @property {any} [defaultValue] - Default value
 * @property {ValidationRule[]} [validation] - Validation rules
 */

/**
 * @typedef {Object} TaxSettings
 * @property {boolean} enabled - Whether tax is enabled
 * @property {'avalara'|'taxjar'|'manual'|'other'} taxEngine - Tax engine
 * @property {number} defaultTaxRate - Default tax rate
 * @property {TaxClass[]} taxClasses - Tax classes
 * @property {string[]} nexusJurisdictions - Nexus jurisdictions
 */

/**
 * @typedef {Object} TaxClass
 * @property {string} id - Tax class ID
 * @property {string} name - Tax class name
 * @property {number} rate - Tax rate
 * @property {string} description - Tax class description
 */

/**
 * @typedef {Object} ValidationRule
 * @property {'required'|'min-length'|'max-length'|'pattern'|'custom'} type - Validation type
 * @property {any} value - Validation value
 * @property {string} message - Validation message
 */

/**
 * @typedef {Object} GuidedTour
 * @property {string} id - Tour ID
 * @property {string} name - Tour name
 * @property {string} description - Tour description
 * @property {TourStep[]} steps - Tour steps
 * @property {string[]} targetPages - Target pages
 * @property {boolean} isActive - Whether tour is active
 * @property {number} completionRate - Completion rate percentage
 */

/**
 * @typedef {Object} TourStep
 * @property {string} id - Step ID
 * @property {string} title - Step title
 * @property {string} content - Step content
 * @property {string} target - CSS selector target
 * @property {'top'|'bottom'|'left'|'right'|'center'} position - Tooltip position
 * @property {'info'|'action'|'verification'} type - Step type
 * @property {TourAction} [action] - Step action
 * @property {TourValidation} [validation] - Step validation
 * @property {number} order - Step order
 * @property {boolean} isOptional - Whether step is optional
 */

/**
 * @typedef {Object} TourAction
 * @property {'click'|'input'|'navigate'|'wait'} type - Action type
 * @property {string} target - Action target
 * @property {any} [value] - Action value
 * @property {number} [delay] - Action delay in milliseconds
 */

/**
 * @typedef {Object} TourValidation
 * @property {'element-exists'|'element-visible'|'value-equals'|'custom'} type - Validation type
 * @property {string} target - Validation target
 * @property {any} [value] - Expected value
 * @property {string} [customFunction] - Custom validation function
 */

/**
 * @typedef {Object} OnboardingContextType
 * @property {OnboardingState} state - Current onboarding state
 * @property {function(Partial<OnboardingState>): void} updateState - Update state function
 * @property {function(): Promise<void>} saveProgress - Save progress function
 * @property {function(): Promise<void>} loadProgress - Load progress function
 * @property {function(): void} resetProgress - Reset progress function
 * @property {function(): void} nextStep - Go to next step
 * @property {function(): void} previousStep - Go to previous step
 * @property {function(number): void} goToStep - Go to specific step
 * @property {function(string): void} completeStep - Complete a step
 * @property {function(string): void} skipStep - Skip a step
 * @property {function(): number} calculateProgress - Calculate progress percentage
 */

/**
 * @typedef {Object} OnboardingWizardProps
 * @property {function(): void} [onStart] - Start callback
 * @property {function(OnboardingState): void} [onComplete] - Completion callback
 * @property {function(): void} [onPause] - Pause callback
 * @property {function(): void} [onResume] - Resume callback
 * @property {number} [initialStep] - Initial step number
 * @property {boolean} [allowSkip] - Allow skipping steps
 * @property {boolean} [allowSaveProgress] - Allow saving progress
 * @property {boolean} [industrySpecificPaths] - Enable industry-specific paths
 */

/**
 * @typedef {Object} IndustrySpecificConfig
 * @property {IndustryType} industry - Industry type
 * @property {CoreFeature[]} recommendedFeatures - Recommended features
 * @property {IntegrationType[]} suggestedIntegrations - Suggested integrations
 * @property {WorkflowSettings} defaultWorkflows - Default workflows
 * @property {string[]} commonPainPoints - Common pain points
 * @property {string[]} recommendedReports - Recommended reports
 * @property {CoreFeature[]} setupPriority - Setup priority
 */