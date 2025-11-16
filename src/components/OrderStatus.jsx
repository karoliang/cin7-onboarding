import React from 'react'
import { Badge, Select, InlineStack, BlockStack, Text, Icon } from '@shopify/polaris'
import {
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
  DeliveryIcon,
  PackageIcon,
  CashDollarIcon
} from '@shopify/polaris-icons'

const OrderStatus = ({ status, showLabel = true, size = 'medium', editable = false, onStatusChange }) => {
  const statusConfig = {
    pending: {
      label: 'Pending',
      tone: 'warning',
      icon: ClockIcon,
      description: 'Order is pending confirmation'
    },
    confirmed: {
      label: 'Confirmed',
      tone: 'info',
      icon: CheckCircleIcon,
      description: 'Order has been confirmed'
    },
    processing: {
      label: 'Processing',
      tone: 'attention',
      icon: PackageIcon,
      description: 'Order is being processed'
    },
    shipped: {
      label: 'Shipped',
      tone: 'success',
      icon: DeliveryIcon,
      description: 'Order has been shipped'
    },
    delivered: {
      label: 'Delivered',
      tone: 'success',
      icon: CheckCircleIcon,
      description: 'Order has been delivered'
    },
    cancelled: {
      label: 'Cancelled',
      tone: 'critical',
      icon: XCircleIcon,
      description: 'Order has been cancelled'
    },
    refunded: {
      label: 'Refunded',
      tone: 'critical',
      icon: CashDollarIcon,
      description: 'Order has been refunded'
    }
  }

  const currentStatusConfig = statusConfig[status] || statusConfig.pending

  const statusOptions = Object.entries(statusConfig).map(([value, config]) => ({
    label: config.label,
    value: value,
    description: config.description
  }))

  const handleStatusChange = (newStatus) => {
    if (onStatusChange && newStatus !== status) {
      onStatusChange(newStatus)
    }
  }

  if (editable) {
    return (
      <InlineStack gap="200">
        <Select
          options={statusOptions}
          value={status}
          onChange={handleStatusChange}
          label="Order Status"
          labelHidden
        />
        <Icon source={currentStatusConfig.icon} tone={currentStatusConfig.tone} />
      </InlineStack>
    )
  }

  return (
    <InlineStack gap="200" blockAlign="center">
      {showLabel && (
        <Badge tone={currentStatusConfig.tone} size={size}>
          {currentStatusConfig.label}
        </Badge>
      )}
      <Icon
        source={currentStatusConfig.icon}
        tone={currentStatusConfig.tone}
        accessibilityLabel={currentStatusConfig.description}
      />
    </InlineStack>
  )
}

export default OrderStatus

// Payment Status Component
export const PaymentStatus = ({ status, showLabel = true, size = 'medium', editable = false, onStatusChange }) => {
  const statusConfig = {
    pending: {
      label: 'Pending',
      tone: 'warning',
      icon: ClockIcon,
      description: 'Payment is pending'
    },
    authorized: {
      label: 'Authorized',
      tone: 'info',
      icon: CheckCircleIcon,
      description: 'Payment has been authorized'
    },
    partially_paid: {
      label: 'Partially Paid',
      tone: 'attention',
      icon: CashDollarIcon,
      description: 'Payment is partially complete'
    },
    paid: {
      label: 'Paid',
      tone: 'success',
      icon: CashDollarIcon,
      description: 'Payment is complete'
    },
    partially_refunded: {
      label: 'Partially Refunded',
      tone: 'attention',
      icon: CashDollarIcon,
      description: 'Payment is partially refunded'
    },
    refunded: {
      label: 'Refunded',
      tone: 'critical',
      icon: CashDollarIcon,
      description: 'Payment has been refunded'
    },
    voided: {
      label: 'Voided',
      tone: 'critical',
      icon: XCircleIcon,
      description: 'Payment has been voided'
    }
  }

  const currentStatusConfig = statusConfig[status] || statusConfig.pending

  const statusOptions = Object.entries(statusConfig).map(([value, config]) => ({
    label: config.label,
    value: value,
    description: config.description
  }))

  const handleStatusChange = (newStatus) => {
    if (onStatusChange && newStatus !== status) {
      onStatusChange(newStatus)
    }
  }

  if (editable) {
    return (
      <InlineStack gap="200">
        <Select
          options={statusOptions}
          value={status}
          onChange={handleStatusChange}
          label="Payment Status"
          labelHidden
        />
        <Icon source={currentStatusConfig.icon} tone={currentStatusConfig.tone} />
      </InlineStack>
    )
  }

  return (
    <InlineStack gap="200" blockAlign="center">
      {showLabel && (
        <Badge tone={currentStatusConfig.tone} size={size}>
          {currentStatusConfig.label}
        </Badge>
      )}
      <Icon
        source={currentStatusConfig.icon}
        tone={currentStatusConfig.tone}
        accessibilityLabel={currentStatusConfig.description}
      />
    </InlineStack>
  )
}

// Fulfillment Status Component
export const FulfillmentStatus = ({ status, showLabel = true, size = 'medium', editable = false, onStatusChange }) => {
  const statusConfig = {
    unfulfilled: {
      label: 'Unfulfilled',
      tone: 'warning',
      icon: ClockIcon,
      description: 'Order has not been fulfilled yet'
    },
    partially_fulfilled: {
      label: 'Partially Fulfilled',
      tone: 'attention',
      icon: PackageIcon,
      description: 'Order is partially fulfilled'
    },
    fulfilled: {
      label: 'Fulfilled',
      tone: 'success',
      icon: CheckCircleIcon,
      description: 'Order has been fulfilled'
    },
    restocked: {
      label: 'Restocked',
      tone: 'info',
      icon: PackageIcon,
      description: 'Items have been restocked'
    }
  }

  const currentStatusConfig = statusConfig[status] || statusConfig.unfulfilled

  const statusOptions = Object.entries(statusConfig).map(([value, config]) => ({
    label: config.label,
    value: value,
    description: config.description
  }))

  const handleStatusChange = (newStatus) => {
    if (onStatusChange && newStatus !== status) {
      onStatusChange(newStatus)
    }
  }

  if (editable) {
    return (
      <InlineStack gap="200">
        <Select
          options={statusOptions}
          value={status}
          onChange={handleStatusChange}
          label="Fulfillment Status"
          labelHidden
        />
        <Icon source={currentStatusConfig.icon} tone={currentStatusConfig.tone} />
      </InlineStack>
    )
  }

  return (
    <InlineStack gap="200" blockAlign="center">
      {showLabel && (
        <Badge tone={currentStatusConfig.tone} size={size}>
          {currentStatusConfig.label}
        </Badge>
      )}
      <Icon
        source={currentStatusConfig.icon}
        tone={currentStatusConfig.tone}
        accessibilityLabel={currentStatusConfig.description}
      />
    </InlineStack>
  )
}

// Status Progress Tracker Component
export const OrderStatusProgress = ({ currentStatus, onStatusClick }) => {
  const statusFlow = [
    { key: 'pending', label: 'Pending', icon: ClockIcon },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircleIcon },
    { key: 'processing', label: 'Processing', icon: PackageIcon },
    { key: 'shipped', label: 'Shipped', icon: DeliveryIcon },
    { key: 'delivered', label: 'Delivered', icon: CheckCircleIcon }
  ]

  const currentStatusIndex = statusFlow.findIndex(status => status.key === currentStatus)

  const getStatusTone = (index) => {
    if (index < currentStatusIndex) return 'success'
    if (index === currentStatusIndex) return 'attention'
    return 'subdued'
  }

  return (
    <BlockStack gap="400">
      <Text variant="headingMd" as="h3">Order Progress</Text>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--p-space-4) 0'
      }}>
        {statusFlow.map((status, index) => {
          const isActive = index === currentStatusIndex
          const isCompleted = index < currentStatusIndex
          const tone = getStatusTone(index)

          return (
            <div key={status.key} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              flex: 1
            }}>
              <button
                onClick={() => onStatusClick && onStatusClick(status.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: onStatusClick ? 'pointer' : 'default',
                  padding: 'var(--p-space-2)'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? 'var(--p-color-bg-surface-attention)' :
                                  isCompleted ? 'var(--p-color-bg-surface-success)' :
                                  'var(--p-color-bg-surface-subdued)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--p-space-2)'
                }}>
                  <Icon
                    source={status.icon}
                    tone={tone}
                  />
                </div>
                <Text
                  variant="bodySm"
                  tone={tone}
                  fontWeight={isActive ? 'semibold' : 'regular'}
                >
                  {status.label}
                </Text>
              </button>

              {index < statusFlow.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '-50%',
                  width: '100%',
                  height: '2px',
                  backgroundColor: index < currentStatusIndex ?
                    'var(--p-color-border-success)' :
                    'var(--p-color-border-subdued)',
                  zIndex: -1
                }} />
              )}
            </div>
          )
        })}
      </div>
    </BlockStack>
  )
}