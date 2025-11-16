/**
 * TypeScript interfaces and types for Customer Management Module
 * These interfaces define the structure for customer-related data in the Cin7 Core platform
 */

/**
 * Customer status enum
 */
export const CustomerStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PROSPECT: 'prospect',
  BLOCKED: 'blocked'
}

/**
 * Customer tier/pricing level enum
 */
export const CustomerTier = {
  STANDARD: 'standard',
  PREMIUM: 'premium',
  VIP: 'vip',
  WHOLESALE: 'wholesale'
}

/**
 * Customer segmentation categories
 */
export const CustomerSegment = {
  NEW: 'new',
  REPEAT: 'repeat',
  LOYAL: 'loyal',
  AT_RISK: 'at_risk',
  CHURNED: 'churned',
  VIP: 'vip'
}

/**
 * Base customer interface
 */
export const CustomerInterface = {
  id: 'string',
  email: 'string',
  firstName: 'string',
  lastName: 'string',
  company: 'string?',
  phone: 'string?',
  status: 'CustomerStatus',
  tier: 'CustomerTier',
  segment: 'CustomerSegment',
  createdAt: 'Date',
  updatedAt: 'Date',
  lastOrderDate: 'Date?',
  totalOrders: 'number',
  totalSpent: 'number',
  averageOrderValue: 'number',
  lifetimeValue: 'number',
  tags: '[string]',
  notes: 'string?',
  avatar: 'string?'
}

/**
 * Customer address interface
 */
export const CustomerAddressInterface = {
  id: 'string',
  customerId: 'string',
  type: 'shipping|billing',
  firstName: 'string',
  lastName: 'string',
  company: 'string?',
  address1: 'string',
  address2: 'string?',
  city: 'string',
  province: 'string',
  country: 'string',
  postalCode: 'string',
  phone: 'string?',
  isDefault: 'boolean'
}

/**
 * Customer communication log interface
 */
export const CustomerCommunicationInterface = {
  id: 'string',
  customerId: 'string',
  type: 'email|phone|sms|note|meeting',
  subject: 'string',
  content: 'string',
  direction: 'inbound|outbound',
  createdAt: 'Date',
  createdBy: 'string',
  tags: '[string]'
}

/**
 * Customer order summary interface
 */
export const CustomerOrderSummaryInterface = {
  customerId: 'string',
  totalOrders: 'number',
  totalRevenue: 'number',
  averageOrderValue: 'number',
  firstOrderDate: 'Date',
  lastOrderDate: 'Date',
  orderFrequency: 'number',
  favoriteProducts: '[string]',
  orderStatus: {
    pending: 'number',
    processing: 'number',
    shipped: 'number',
    delivered: 'number',
    cancelled: 'number'
  }
}

/**
 * Customer analytics interface
 */
export const CustomerAnalyticsInterface = {
  customerId: 'string',
  lifetimeValue: 'number',
  purchaseFrequency: 'number',
  averageTimeBetweenOrders: 'number',
  churnRisk: 'number',
  engagementScore: 'number',
  satisfactionScore: 'number?',
  predictedNextOrder: 'Date?',
  customerHealthScore: 'number'
}

/**
 * Customer preference interface
 */
export const CustomerPreferenceInterface = {
  customerId: 'string',
  communicationPreferences: {
    email: 'boolean',
    sms: 'boolean',
    phone: 'boolean',
    newsletter: 'boolean'
  },
  preferredContactMethod: 'email|phone|sms',
  timezone: 'string',
  language: 'string',
  currency: 'string'
}

/**
 * Customer search filters interface
 */
export const CustomerSearchFiltersInterface = {
  query: 'string?',
  status: '[CustomerStatus]?',
  tier: '[CustomerTier]?',
  segment: '[CustomerSegment]?',
  tags: '[string]?',
  dateRange: {
    start: 'Date?',
    end: 'Date?'
  },
  orderValueRange: {
    min: 'number?',
    max: 'number?'
  },
  orderCountRange: {
    min: 'number?',
    max: 'number?'
  },
  location: '[string]?'
}

/**
 * Customer bulk operation interface
 */
export const CustomerBulkOperationInterface = {
  operation: 'export|update|delete|tag|segment|merge',
  customerIds: '[string]',
  data: 'any?',
  options: 'any?'
}