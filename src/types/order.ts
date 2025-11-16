export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerEmail: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  fulfillmentStatus: FulfillmentStatus
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: string
  createdAt: string
  updatedAt: string
  shippingAddress: Address
  billingAddress: Address
  items: OrderItem[]
  notes?: string
  tags: string[]
  source: OrderSource
  internalNote?: string
}

export interface OrderItem {
  id: string
  productId: string
  productSku: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  weight?: number
  productImage?: string
}

export interface Address {
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  province: string
  country: string
  zip: string
  phone?: string
}

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  createdAt: string
  totalSpent: number
  orderCount: number
  addresses: Address[]
  tags: string[]
  customerType: CustomerType
  discount?: number
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus =
  | 'pending'
  | 'authorized'
  | 'partially_paid'
  | 'paid'
  | 'partially_refunded'
  | 'refunded'
  | 'voided'

export type FulfillmentStatus =
  | 'unfulfilled'
  | 'partially_fulfilled'
  | 'fulfilled'
  | 'restocked'

export type OrderSource =
  | 'online'
  | 'pos'
  | 'phone'
  | 'email'
  | 'manual'

export type CustomerType =
  | 'retail'
  | 'wholesale'
  | 'vip'

export interface OrderFilters {
  status?: OrderStatus[]
  paymentStatus?: PaymentStatus[]
  fulfillmentStatus?: FulfillmentStatus[]
  customerId?: string
  dateFrom?: string
  dateTo?: string
  totalMin?: number
  totalMax?: number
  search?: string
  source?: OrderSource[]
}

export interface OrderStats {
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  ordersByStatus: Record<OrderStatus, number>
  revenueByPeriod: Array<{
    period: string
    revenue: number
    orders: number
  }>
  topProducts: Array<{
    productId: string
    productName: string
    quantity: number
    revenue: number
  }>
}

export interface CreateOrderRequest {
  customerId?: string
  customer: Partial<Customer>
  items: Array<{
    productId: string
    quantity: number
  }>
  shippingAddress: Address
  billingAddress?: Address
  notes?: string
  tags?: string[]
  source: OrderSource
}