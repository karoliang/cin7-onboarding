/**
 * TypeScript interfaces for Cin7 Core Onboarding Wizard
 * Defines the data structures and types used throughout the onboarding experience
 */

export interface OnboardingState {
  // Current wizard state
  currentStep: number
  totalSteps: number
  isCompleted: boolean
  isPaused: boolean
  lastSavedAt: string | null

  // User business information
  businessInfo: BusinessInfo
  industrySelection: IndustrySelection
  featureConfiguration: FeatureConfiguration
  progress: OnboardingProgress
}

export interface BusinessInfo {
  companyName: string
  industry: IndustryType
  businessSize: BusinessSize
  annualRevenue: RevenueRange
  primaryMarkets: string[]
  currentSystems: string[]
  painPoints: string[]
  goals: string[]
  contactInfo: {
    name: string
    email: string
    role: string
    phone?: string
  }
}

export type IndustryType =
  | 'retail'
  | 'manufacturing'
  | 'wholesale'
  | 'ecommerce'
  | 'food-beverage'
  | 'apparel'
  | 'electronics'
  | 'healthcare'
  | 'other'

export type BusinessSize =
  | 'startup' // 1-10 employees
  | 'small'   // 11-50 employees
  | 'medium'  // 51-200 employees
  | 'large'   // 201-1000 employees
  | 'enterprise' // 1000+ employees

export type RevenueRange =
  | 'under-100k'
  | '100k-500k'
  | '500k-1m'
  | '1m-5m'
  | '5m-10m'
  | '10m-50m'
  | 'over-50m'

export interface IndustrySelection {
  selectedIndustry: IndustryType
  subCategory?: string
  businessModel: string[]
  salesChannels: SalesChannel[]
  operationalNeeds: OperationalNeed[]
}

export type SalesChannel =
  | 'retail-store'
  | 'online-own-site'
  | 'marketplace'
  | 'b2b-portal'
  | 'phone-sales'
  | 'in-person'
  | 'wholesale-distributors'

export type OperationalNeed =
  | 'inventory-management'
  | 'order-processing'
  | 'shipping-fulfillment'
  | 'supplier-management'
  | 'production-tracking'
  | 'quality-control'
  | 'reporting-analytics'
  | 'multi-channel-sync'
  | 'pos-integration'
  | 'accounting-integration'

export interface FeatureConfiguration {
  selectedFeatures: CoreFeature[]
  moduleSettings: ModuleSettings
  integrations: IntegrationSettings
  workflowConfiguration: WorkflowSettings
  reportingSetup: ReportingSettings
}

export type CoreFeature =
  | 'inventory-management'
  | 'order-management'
  | 'customer-management'
  | 'supplier-management'
  | 'production-tracking'
  | 'reporting-analytics'
  | 'pos-integration'
  | 'ecommerce-integration'
  | 'accounting-integration'
  | 'warehouse-management'
  | 'barcode-scanning'
  | 'batch-tracking'
  | 'serial-tracking'
  | 'multi-currency'
  | 'multi-location'

export interface ModuleSettings {
  inventory: InventoryModuleSettings
  sales: SalesModuleSettings
  customers: CustomerModuleSettings
  reports: ReportsModuleSettings
  settings: SettingsModuleSettings
}

export interface InventoryModuleSettings {
  enableLowStockAlerts: boolean
  enableBatchTracking: boolean
  enableSerialTracking: boolean
  enableMultiLocation: boolean
  defaultReorderPoint: number
  categories: string[]
  suppliers: string[]
  warehouses: string[]
}

export interface SalesModuleSettings {
  enableOrderProcessing: boolean
  enableInvoicing: boolean
  enableShippingIntegration: boolean
  enableTaxCalculation: boolean
  enableDiscountRules: boolean
  paymentMethods: string[]
  shippingMethods: string[]
  taxSettings: TaxSettings
}

export interface CustomerModuleSettings {
  enableCustomerGroups: boolean
  enableCreditLimits: boolean
  enableCustomerPortal: boolean
  enableEmailNotifications: boolean
  defaultCustomerType: string
  customFields: CustomField[]
}

export interface ReportsModuleSettings {
  enableScheduledReports: boolean
  enableCustomDashboards: boolean
  enableDataExport: boolean
  defaultReports: string[]
  reportFrequency: 'daily' | 'weekly' | 'monthly'
}

export interface SettingsModuleSettings {
  enableMultiCurrency: boolean
  enableMultiWarehouse: boolean
  enableApiAccess: boolean
  enableAuditTrail: boolean
  timezone: string
  dateFormat: string
  numberFormat: string
}

export interface IntegrationSettings {
  enabledIntegrations: Integration[]
  accountingIntegration?: AccountingIntegration
  ecommerceIntegration?: EcommerceIntegration
  shippingIntegration?: ShippingIntegration
  paymentIntegration?: PaymentIntegration
  customIntegrations: CustomIntegration[]
}

export interface Integration {
  id: string
  name: string
  type: IntegrationType
  status: 'connected' | 'pending' | 'error' | 'not-connected'
  configuration: Record<string, any>
  lastSyncAt?: string
}

export type IntegrationType =
  | 'accounting'
  | 'ecommerce'
  | 'shipping'
  | 'payment'
  | 'crm'
  | 'pos'
  | 'marketplace'
  | 'custom'

export interface AccountingIntegration {
  provider: 'quickbooks' | 'xero' | 'sage' | 'netsuite' | 'other'
  syncFrequency: 'realtime' | 'hourly' | 'daily'
  syncProducts: boolean
  syncCustomers: boolean
  syncOrders: boolean
  syncInvoices: boolean
}

export interface EcommerceIntegration {
  platform: 'shopify' | 'woocommerce' | 'magento' | 'bigcommerce' | 'custom'
  syncInventory: boolean
  syncProducts: boolean
  syncOrders: boolean
  enableDropshipping: boolean
  inventoryBuffer: number
}

export interface ShippingIntegration {
  provider: 'fedex' | 'ups' | 'dhl' | 'usps' | 'shipstation' | 'other'
  enableTracking: boolean
  enableLabelPrinting: boolean
  enableRateComparison: boolean
  defaultBoxSize: string
}

export interface PaymentIntegration {
  provider: 'stripe' | 'paypal' | 'square' | 'authorize' | 'other'
  enableOnlinePayments: boolean
  enableRecurringPayments: boolean
  enableCardStorage: boolean
}

export interface CustomIntegration {
  name: string
  endpoint: string
  authentication: 'api-key' | 'oauth' | 'basic'
  configuration: Record<string, any>
}

export interface WorkflowSettings {
  orderProcessingWorkflow: OrderWorkflow
  inventoryWorkflow: InventoryWorkflow
  reportingWorkflow: ReportingWorkflow
  customWorkflows: CustomWorkflow[]
}

export interface OrderWorkflow {
  steps: WorkflowStep[]
  autoProcessing: boolean
  approvalRequired: boolean
  notificationRules: NotificationRule[]
}

export interface InventoryWorkflow {
  reorderWorkflows: ReorderWorkflow[]
  stockAdjustmentWorkflow: WorkflowStep[]
  lowStockWorkflow: WorkflowStep[]
  batchExpirationWorkflow?: WorkflowStep[]
}

export interface ReportingWorkflow {
  scheduledReports: ScheduledReport[]
  dashboardUpdates: DashboardUpdate[]
  alertConfigurations: AlertConfiguration[]
}

export interface WorkflowStep {
  id: string
  name: string
  type: 'manual' | 'automated' | 'conditional'
  action: string
  conditions?: WorkflowCondition[]
  notifications?: NotificationRule[]
  order: number
  enabled: boolean
}

export interface WorkflowCondition {
  field: string
  operator: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'contains'
  value: any
}

export interface NotificationRule {
  trigger: string
  recipients: string[]
  channels: ('email' | 'sms' | 'slack' | 'in-app')[]
  template?: string
  enabled: boolean
}

export interface ReorderWorkflow {
  productId?: string
  categoryId?: string
  supplierId?: string
  reorderPoint: number
  reorderQuantity: number
  approvalRequired: boolean
  autoOrder: boolean
}

export interface ScheduledReport {
  id: string
  name: string
  type: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  recipients: string[]
  format: 'pdf' | 'excel' | 'csv'
  enabled: boolean
}

export interface DashboardUpdate {
  dashboardId: string
  frequency: 'realtime' | 'hourly' | 'daily'
  metrics: string[]
  enabled: boolean
}

export interface AlertConfiguration {
  name: string
  metric: string
  threshold: number
  operator: 'above' | 'below' | 'equals'
  notificationChannels: ('email' | 'sms' | 'slack' | 'in-app')[]
  recipients: string[]
  enabled: boolean
}

export interface CustomWorkflow {
  name: string
  trigger: string
  steps: WorkflowStep[]
  enabled: boolean
}

export interface ReportingSettings {
  selectedReports: ReportTemplate[]
  customReports: CustomReport[]
  dashboards: Dashboard[]
  exportSettings: ExportSettings
}

export interface ReportTemplate {
  id: string
  name: string
  category: 'inventory' | 'sales' | 'customers' | 'financial' | 'operations'
  enabled: boolean
  schedule?: 'daily' | 'weekly' | 'monthly'
  recipients: string[]
}

export interface CustomReport {
  id: string
  name: string
  description: string
  query: string
  parameters: ReportParameter[]
  format: 'table' | 'chart' | 'pivot'
  enabled: boolean
}

export interface Dashboard {
  id: string
  name: string
  layout: 'grid' | 'list' | 'custom'
  widgets: Widget[]
  refreshInterval: number
  isDefault: boolean
}

export interface Widget {
  id: string
  type: 'kpi' | 'chart' | 'table' | 'list'
  title: string
  dataSource: string
  configuration: Record<string, any>
  position: { x: number; y: number; width: number; height: number }
}

export interface ReportParameter {
  name: string
  type: 'string' | 'number' | 'date' | 'boolean'
  required: boolean
  defaultValue?: any
}

export interface ExportSettings {
  format: 'csv' | 'excel' | 'pdf' | 'json'
  includeHeaders: boolean
  compression: boolean
  encryption: boolean
  destination: 'download' | 'email' | 'ftp' | 's3'
}

export interface OnboardingProgress {
  completedSteps: OnboardingStep[]
  currentMilestone: Milestone
  achievements: Achievement[]
  timeSpent: number // minutes
  estimatedTimeRemaining: number // minutes
  lastActivityAt: string
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  type: 'information' | 'configuration' | 'integration' | 'verification'
  status: 'not-started' | 'in-progress' | 'completed' | 'skipped'
  startedAt?: string
  completedAt?: string
  estimatedDuration: number // minutes
  dependencies: string[]
  isOptional: boolean
}

export interface Milestone {
  id: string
  title: string
  description: string
  requirements: string[]
  progress: number // 0-100
  unlockedAt?: string
  rewards: MilestoneReward[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  category: 'setup' | 'integration' | 'configuration' | 'exploration'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface MilestoneReward {
  type: 'feature' | 'template' | 'integration' | 'support'
  name: string
  description: string
  claimed: boolean
  claimedAt?: string
}

export interface CustomField {
  id: string
  name: string
  type: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multiselect'
  required: boolean
  options?: string[]
  defaultValue?: any
  validation?: ValidationRule[]
}

export interface TaxSettings {
  enabled: boolean
  taxEngine: 'avalara' | 'taxjar' | 'manual' | 'other'
  defaultTaxRate: number
  taxClasses: TaxClass[]
  nexusJurisdictions: string[]
}

export interface TaxClass {
  id: string
  name: string
  rate: number
  description: string
}

export interface ValidationRule {
  type: 'required' | 'min-length' | 'max-length' | 'pattern' | 'custom'
  value: any
  message: string
}

export interface GuidedTour {
  id: string
  name: string
  description: string
  steps: TourStep[]
  targetPages: string[]
  isActive: boolean
  completionRate: number
}

export interface TourStep {
  id: string
  title: string
  content: string
  target: string // CSS selector
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
  type: 'info' | 'action' | 'verification'
  action?: TourAction
  validation?: TourValidation
  order: number
  isOptional: boolean
}

export interface TourAction {
  type: 'click' | 'input' | 'navigate' | 'wait'
  target: string
  value?: any
  delay?: number
}

export interface TourValidation {
  type: 'element-exists' | 'element-visible' | 'value-equals' | 'custom'
  target: string
  value?: any
  customFunction?: string
}

export interface OnboardingContextType {
  state: OnboardingState
  updateState: (updates: Partial<OnboardingState>) => void
  saveProgress: () => Promise<void>
  loadProgress: () => Promise<void>
  resetProgress: () => void
  nextStep: () => void
  previousStep: () => void
  goToStep: (stepIndex: number) => void
  completeStep: (stepId: string) => void
  skipStep: (stepId: string) => void
  calculateProgress: () => number
}

export interface OnboardingWizardProps {
  onStart?: () => void
  onComplete?: (state: OnboardingState) => void
  onPause?: () => void
  onResume?: () => void
  initialStep?: number
  allowSkip?: boolean
  allowSaveProgress?: boolean
  industrySpecificPaths?: boolean
}

export interface IndustrySpecificConfig {
  industry: IndustryType
  recommendedFeatures: CoreFeature[]
  suggestedIntegrations: IntegrationType[]
  defaultWorkflows: WorkflowSettings
  commonPainPoints: string[]
  recommendedReports: string[]
  setupPriority: CoreFeature[]
}