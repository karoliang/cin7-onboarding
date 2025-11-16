// Mock order service for API calls
// In a real application, this would make actual HTTP requests to your backend

import { orderData } from '../data/mockData'

export const orderService = {
  // Get all orders with optional filters
  async getOrders(filters = {}) {
    console.log('Fetching orders with filters:', filters)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    let filteredOrders = [...orderData]

    // Apply filters
    if (filters.status?.length > 0) {
      filteredOrders = filteredOrders.filter(order =>
        filters.status.includes(order.status)
      )
    }

    if (filters.paymentStatus?.length > 0) {
      filteredOrders = filteredOrders.filter(order =>
        filters.paymentStatus.includes(order.paymentStatus)
      )
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredOrders = filteredOrders.filter(order =>
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.customerName.toLowerCase().includes(searchLower) ||
        order.customerEmail.toLowerCase().includes(searchLower)
      )
    }

    return {
      data: filteredOrders,
      total: filteredOrders.length,
      success: true
    }
  },

  // Get single order by ID
  async getOrder(orderId) {
    console.log('Fetching order:', orderId)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const order = orderData.find(o => o.id === orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    return {
      data: order,
      success: true
    }
  },

  // Create new order
  async createOrder(orderData) {
    console.log('Creating order:', orderData)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // In a real app, this would save to your database
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `#${Math.floor(Math.random() * 10000)}`,
      ...orderData,
      status: 'pending',
      paymentStatus: 'pending',
      fulfillmentStatus: 'unfulfilled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return {
      data: newOrder,
      success: true,
      message: 'Order created successfully'
    }
  },

  // Update order
  async updateOrder(orderId, updates) {
    console.log('Updating order:', orderId, updates)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))

    const orderIndex = orderData.findIndex(o => o.id === orderId)
    if (orderIndex === -1) {
      throw new Error('Order not found')
    }

    orderData[orderIndex] = {
      ...orderData[orderIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    return {
      data: orderData[orderIndex],
      success: true,
      message: 'Order updated successfully'
    }
  },

  // Delete order
  async deleteOrder(orderId) {
    console.log('Deleting order:', orderId)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const orderIndex = orderData.findIndex(o => o.id === orderId)
    if (orderIndex === -1) {
      throw new Error('Order not found')
    }

    orderData.splice(orderIndex, 1)

    return {
      success: true,
      message: 'Order deleted successfully'
    }
  },

  // Get order statistics
  async getOrderStats(dateRange = '30days') {
    console.log('Fetching order stats for:', dateRange)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))

    const stats = {
      totalOrders: orderData.length,
      totalRevenue: orderData.reduce((sum, order) => sum + order.total, 0),
      averageOrderValue: orderData.reduce((sum, order) => sum + order.total, 0) / orderData.length,
      ordersByStatus: orderData.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      }, {}),
      recentOrders: orderData.slice(0, 5)
    }

    return {
      data: stats,
      success: true
    }
  },

  // Fulfill order
  async fulfillOrder(orderId, fulfillmentData) {
    console.log('Fulfilling order:', orderId, fulfillmentData)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600))

    const orderIndex = orderData.findIndex(o => o.id === orderId)
    if (orderIndex === -1) {
      throw new Error('Order not found')
    }

    orderData[orderIndex] = {
      ...orderData[orderIndex],
      status: 'shipped',
      fulfillmentStatus: 'fulfilled',
      updatedAt: new Date().toISOString(),
      fulfillmentData
    }

    return {
      data: orderData[orderIndex],
      success: true,
      message: 'Order fulfilled successfully'
    }
  },

  // Process refund
  async processRefund(orderId, refundData) {
    console.log('Processing refund:', orderId, refundData)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700))

    const orderIndex = orderData.findIndex(o => o.id === orderId)
    if (orderIndex === -1) {
      throw new Error('Order not found')
    }

    orderData[orderIndex] = {
      ...orderData[orderIndex],
      paymentStatus: 'refunded',
      status: 'refunded',
      updatedAt: new Date().toISOString(),
      refundData
    }

    return {
      data: orderData[orderIndex],
      success: true,
      message: 'Refund processed successfully'
    }
  }
}