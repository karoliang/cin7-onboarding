import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Text,
  Button,
  Badge,
  Avatar,
  InlineStack,
  BlockStack,
  Icon,
  Tooltip,
} from '@shopify/polaris'
import {
  ViewIcon,
  EditIcon,
  EmailIcon,
  PhoneIcon,
  DollarDiscountIcon,
  ClockIcon,
  NoteIcon,
} from '@shopify/polaris-icons'
import { CustomerStatus, CustomerTier, CustomerSegment } from '../types/customer'

const CustomerCard = ({
  customer,
  onEdit,
  onDelete,
  onEmail,
  onCall,
  showActions = true,
  compact = false,
  onClick,
  ...props
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick(customer)
    } else {
      navigate(`/customers/${customer.id}`)
    }
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    if (onEdit) {
      onEdit(customer)
    } else {
      navigate(`/customers/${customer.id}/edit`)
    }
  }

  const handleEmail = (e) => {
    e.stopPropagation()
    if (onEmail) {
      onEmail(customer)
    } else {
      window.open(`mailto:${customer.email}`, '_blank')
    }
  }

  const handleCall = (e) => {
    e.stopPropagation()
    if (onCall) {
      onCall(customer)
    } else if (customer.phone) {
      window.open(`tel:${customer.phone}`, '_blank')
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      [CustomerStatus.ACTIVE]: { tone: 'success', content: 'Active' },
      [CustomerStatus.INACTIVE]: { tone: 'warning', content: 'Inactive' },
      [CustomerStatus.PROSPECT]: { tone: 'attention', content: 'Prospect' },
      [CustomerStatus.BLOCKED]: { tone: 'critical', content: 'Blocked' }
    }
    const config = statusMap[status] || statusMap[CustomerStatus.ACTIVE]
    return <Badge {...config}>{config.content}</Badge>
  }

  const getTierBadge = (tier) => {
    const tierMap = {
      [CustomerTier.STANDARD]: { tone: 'base', content: 'Standard' },
      [CustomerTier.PREMIUM]: { tone: 'info', content: 'Premium' },
      [CustomerTier.VIP]: { tone: 'magic', content: 'VIP' },
      [CustomerTier.WHOLESALE]: { tone: 'new', content: 'Wholesale' }
    }
    const config = tierMap[tier] || tierMap[CustomerTier.STANDARD]
    return <Badge {...config}>{config.content}</Badge>
  }

  const getSegmentBadge = (segment) => {
    const segmentMap = {
      [CustomerSegment.NEW]: { tone: 'new', content: 'New' },
      [CustomerSegment.REPEAT]: { tone: 'info', content: 'Repeat' },
      [CustomerSegment.LOYAL]: { tone: 'success', content: 'Loyal' },
      [CustomerSegment.VIP]: { tone: 'magic', content: 'VIP' },
      [CustomerSegment.AT_RISK]: { tone: 'warning', content: 'At Risk' },
      [CustomerSegment.CHURNED]: { tone: 'critical', content: 'Churned' }
    }
    const config = segmentMap[segment] || segmentMap[CustomerSegment.NEW]
    return <Badge {...config}>{config.content}</Badge>
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (date) => {
    if (!date) return 'Never'
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date))
  }

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    if (score >= 40) return 'attention'
    return 'critical'
  }

  const healthScore = customer.customerHealthScore || 75

  if (compact) {
    return (
      <Card onClick={handleClick} {...props}>
        <div style={{
          padding: 'var(--p-space-4)',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out'
        }}>
          <InlineStack gap="300" align="center" blockAlign="center">
            <Avatar
              source={customer.avatar}
              name={`${customer.firstName} ${customer.lastName}`}
              size="small"
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <BlockStack gap="100">
                <Text variant="bodySm" fontWeight="semibold" as="h3" truncate>
                  {customer.firstName} {customer.lastName}
                </Text>
                {customer.company && (
                  <Text variant="bodyXs" as="p" tone="subdued" truncate>
                    {customer.company}
                  </Text>
                )}
              </BlockStack>
            </div>
            <InlineStack gap="200">
              {getStatusBadge(customer.status)}
              <Text variant="bodySm" fontWeight="medium" as="span">
                {formatCurrency(customer.totalSpent || 0)}
              </Text>
            </InlineStack>
            <Button variant="plain" icon={ViewIcon} />
          </InlineStack>
        </div>
      </Card>
    )
  }

  return (
    <Card onClick={handleClick} {...props}>
      <div style={{
        padding: 'var(--p-space-6)',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out'
      }}>
        <BlockStack gap="400">
          {/* Header with Avatar and Basic Info */}
          <InlineStack gap="400" align="start" blockAlign="start">
            <Avatar
              source={customer.avatar}
              name={`${customer.firstName} ${customer.lastName}`}
              size="large"
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <BlockStack gap="200">
                <Text variant="headingMd" as="h2" truncate>
                  {customer.firstName} {customer.lastName}
                </Text>
                {customer.company && (
                  <Text variant="bodyMd" as="p" tone="subdued" truncate>
                    {customer.company}
                  </Text>
                )}
                <Text variant="bodySm" as="p" tone="subdued" truncate>
                  {customer.email}
                </Text>
                <InlineStack gap="200" wrap>
                  {getStatusBadge(customer.status)}
                  {getTierBadge(customer.tier)}
                  {getSegmentBadge(customer.segment)}
                </InlineStack>
              </BlockStack>
            </div>
            {showActions && (
              <BlockStack gap="200">
                <Tooltip content="View details">
                  <Button variant="plain" icon={ViewIcon} />
                </Tooltip>
                <Tooltip content="Edit customer">
                  <Button variant="plain" icon={EditIcon} onClick={handleEdit} />
                </Tooltip>
                <Tooltip content="Send email">
                  <Button variant="plain" icon={EmailIcon} onClick={handleEmail} />
                </Tooltip>
                {customer.phone && (
                  <Tooltip content="Make call">
                    <Button variant="plain" icon={PhoneIcon} onClick={handleCall} />
                  </Tooltip>
                )}
              </BlockStack>
            )}
          </InlineStack>

          {/* Customer Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 'var(--p-space-400)'
          }}>
            <BlockStack gap="100">
              <Text tone="subdued" as="p">Total Orders</Text>
              <Text variant="headingLg" as="p">
                {customer.totalOrders || 0}
              </Text>
            </BlockStack>
            <BlockStack gap="100">
              <Text tone="subdued" as="p">Total Spent</Text>
              <Text variant="headingLg" as="p">
                {formatCurrency(customer.totalSpent || 0)}
              </Text>
            </BlockStack>
            <BlockStack gap="100">
              <Text tone="subdued" as="p">Avg Order Value</Text>
              <Text variant="headingLg" as="p">
                {formatCurrency(customer.averageOrderValue || 0)}
              </Text>
            </BlockStack>
            <BlockStack gap="100">
              <Text tone="subdued" as="p">Health Score</Text>
              <Text variant="headingLg" as="p" tone={getHealthScoreColor(healthScore)}>
                {healthScore}%
              </Text>
            </BlockStack>
          </div>

          {/* Customer Tags */}
          {customer.tags && customer.tags.length > 0 && (
            <BlockStack gap="200">
              <Text variant="bodySm" as="p" tone="subdued">Tags</Text>
              <InlineStack gap="200" wrap>
                {customer.tags.map((tag, index) => (
                  <Badge key={index} tone="base">{tag}</Badge>
                ))}
              </InlineStack>
            </BlockStack>
          )}

          {/* Last Order Info */}
          <InlineStack gap="400" align="space-between">
            <InlineStack gap="200">
              <Icon source={ClockIcon} tone="base" />
              <Text variant="bodySm" as="p" tone="subdued">
                Last order: {formatDate(customer.lastOrderDate)}
              </Text>
            </InlineStack>
            <Text variant="bodySm" as="p" tone="subdued">
              Customer since: {formatDate(customer.createdAt)}
            </Text>
          </InlineStack>

          {/* Notes Preview */}
          {customer.notes && (
            <BlockStack gap="100">
              <InlineStack gap="200">
                <Icon source={NoteIcon} tone="base" />
                <Text variant="bodySm" as="p" tone="subdued">Notes</Text>
              </InlineStack>
              <Text variant="bodySm" as="p" lineClamp={2}>
                {customer.notes}
              </Text>
            </BlockStack>
          )}
        </BlockStack>
      </div>
    </Card>
  )
}

export default CustomerCard