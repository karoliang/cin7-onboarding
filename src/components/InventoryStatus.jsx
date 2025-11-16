import React from 'react'
import { Badge, InlineStack, Text, Tooltip, Icon } from '@shopify/polaris'
import {
  InventoryIcon,
  AlertTriangleIcon,
  XCircleIcon,
  InfoIcon
} from '@shopify/polaris-icons'

const InventoryStatus = ({
  quantity,
  reorderPoint,
  maxStock,
  showText = true,
  showTooltip = false,
  size = 'medium'
}) => {
  const getStockStatus = (quantity, reorderPoint, maxStock) => {
    if (quantity === 0) {
      return {
        status: 'OUT_OF_STOCK',
        tone: 'critical',
        label: 'Out of stock',
        icon: XCircleIcon,
        color: '#E03F3F',
        description: 'No items available in stock'
      }
    }

    if (quantity <= reorderPoint) {
      return {
        status: 'LOW_STOCK',
        tone: 'warning',
        label: 'Low stock',
        icon: AlertTriangleIcon,
        color: '#E09B00',
        description: `Only ${quantity} items left. Reorder point is ${reorderPoint}.`
      }
    }

    if (maxStock && quantity >= maxStock * 0.9) {
      return {
        status: 'HIGH_STOCK',
        tone: 'attention',
        label: 'High stock',
        icon: InventoryIcon,
        color: '#D58300',
        description: `Stock level is at ${quantity} (${maxStock} capacity)`
      }
    }

    return {
      status: 'IN_STOCK',
      tone: 'success',
      label: 'In stock',
      icon: InventoryIcon,
      color: '#067B46',
      description: `${quantity} items available`
    }
  }

  const stockInfo = getStockStatus(quantity, reorderPoint, maxStock)

  const getBadgeSize = (size) => {
    switch (size) {
      case 'small':
        return 'small'
      case 'large':
        return 'large'
      default:
        return undefined
    }
  }

  const getStatusIcon = (IconComponent) => {
    return <IconComponent tone={stockInfo.tone} />
  }

  const badgeContent = showText
    ? `${quantity} ${stockInfo.label.toLowerCase()}`
    : quantity.toString()

  const statusBadge = (
    <Badge
      tone={stockInfo.tone}
      size={getBadgeSize(size)}
      icon={getStatusIcon(stockInfo.icon)}
    >
      {badgeContent}
    </Badge>
  )

  if (showTooltip) {
    return (
      <Tooltip content={stockInfo.description}>
        <span style={{ cursor: 'pointer' }}>
          {statusBadge}
        </span>
      </Tooltip>
    )
  }

  return statusBadge
}

const InventoryStatusWithProgress = ({
  quantity,
  reorderPoint,
  maxStock,
  showText = true
}) => {
  const getProgressPercentage = () => {
    if (!maxStock) return 0
    return Math.min((quantity / maxStock) * 100, 100)
  }

  const getProgressTone = () => {
    if (quantity === 0) return 'critical'
    if (quantity <= reorderPoint) return 'warning'
    if (maxStock && quantity >= maxStock * 0.9) return 'attention'
    return 'success'
  }

  const progressPercentage = getProgressPercentage()
  const progressTone = getProgressTone()

  return (
    <div style={{ width: '100%' }}>
      <InlineStack gap="200" align="center" blockAlign="center">
        <InventoryStatus
          quantity={quantity}
          reorderPoint={reorderPoint}
          maxStock={maxStock}
          showText={showText}
          size="small"
        />
        {maxStock && (
          <Text variant="bodySm" tone="subdued">
            {progressPercentage.toFixed(0)}% full
          </Text>
        )}
      </InlineStack>
      {maxStock && (
        <div style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#E5E5E5',
          borderRadius: '2px',
          marginTop: '4px',
          overflow: 'hidden'
        }}>
          <div
            style={{
              width: `${progressPercentage}%`,
              height: '100%',
              backgroundColor: getProgressColor(progressTone),
              transition: 'width 0.3s ease',
              borderRadius: '2px'
            }}
          />
        </div>
      )}
    </div>
  )
}

const getProgressColor = (tone) => {
  const colors = {
    success: '#067B46',
    warning: '#E09B00',
    attention: '#D58300',
    critical: '#E03F3F'
  }
  return colors[tone] || '#067B46'
}

const MultiLocationInventoryStatus = ({
  stockLevels = [],
  showSummary = true,
  maxLocationsToShow = 3
}) => {
  const totalStock = stockLevels.reduce((sum, level) => sum + level.quantityAvailable, 0)
  const totalCommitted = stockLevels.reduce((sum, level) => sum + level.quantityCommitted, 0)
  const availableStock = totalStock - totalCommitted
  const lowStockCount = stockLevels.filter(level =>
    level.quantityAvailable <= level.reorderPoint && level.quantityAvailable > 0
  ).length
  const outOfStockCount = stockLevels.filter(level => level.quantityAvailable === 0).length

  const getStatusSummary = () => {
    if (outOfStockCount > 0) {
      return {
        tone: 'critical',
        label: `${outOfStockCount} out of stock`,
        description: `${outOfStockCount} locations out of stock`
      }
    }

    if (lowStockCount > 0) {
      return {
        tone: 'warning',
        label: `${lowStockCount} low stock`,
        description: `${lowStockCount} locations with low stock`
      }
    }

    return {
      tone: 'success',
      label: 'All locations stocked',
      description: 'All locations have adequate stock'
    }
  }

  const statusSummary = getStatusSummary()
  const displayLocations = stockLevels.slice(0, maxLocationsToShow)

  return (
    <div style={{ width: '100%' }}>
      {showSummary && (
        <div style={{ marginBottom: 'var(--p-space-200)' }}>
          <InlineStack gap="200" align="center">
            <Text variant="bodyMd" fontWeight="medium">
              Total Available: {availableStock}
            </Text>
            <Badge tone={statusSummary.tone}>
              {statusSummary.label}
            </Badge>
          </InlineStack>
        </div>
      )}

      <InlineStack gap="200" wrap={false}>
        {displayLocations.map((level) => (
          <div key={level.locationId} style={{ minWidth: '120px' }}>
            <Text variant="bodySm" tone="subdued" as="p">
              {level.locationId.replace('loc_', 'Location ')}
            </Text>
            <InventoryStatus
              quantity={level.quantityAvailable}
              reorderPoint={level.reorderPoint}
              showText={false}
              size="small"
            />
          </div>
        ))}

        {stockLevels.length > maxLocationsToShow && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 var(--p-space-200)',
            borderLeft: '1px solid var(--p-color-border)'
          }}>
            <Text variant="bodySm" tone="subdued">
              +{stockLevels.length - maxLocationsToShow} more
            </Text>
          </div>
        )}
      </InlineStack>
    </div>
  )
}

InventoryStatus.Progress = InventoryStatusWithProgress
InventoryStatus.MultiLocation = MultiLocationInventoryStatus

export default InventoryStatus