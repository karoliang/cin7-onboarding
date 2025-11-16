import React, { useState, useCallback } from 'react'
import {
  Card,
  Text,
  Button,
  Select,
  TextField,
  InlineStack,
  BlockStack,
  Popover,
  ActionList,
  Badge,
  Icon,
} from '@shopify/polaris'
import {
  CalendarIcon,
  ChevronDownIcon,
  XIcon,
} from '@shopify/polaris-icons'

/**
 * DateRangeSelector Component
 *
 * A flexible date range selector component that provides multiple ways to select
 * date ranges for reports and analytics. Supports preset ranges, custom date
 * selection, and comparison periods.
 */

const DateRangeSelector = ({
  value,
  onChange,
  showComparison = false,
  compact = false,
  allowCustom = true,
  presetRanges = [],
  onComparisonChange,
  comparisonValue,
  maxRange = 365, // Maximum days in range
  minRange = 1,   // Minimum days in range
  disabled = false,
  label = "Date range",
  labelHidden = false,
  placeholder = "Select date range"
}) => {
  const [popoverActive, setPopoverActive] = useState(false)
  const [comparisonPopoverActive, setComparisonPopoverActive] = useState(false)
  const [customStartActive, setCustomStartActive] = useState(false)
  const [customEndActive, setCustomEndActive] = useState(false)

  // Default preset ranges
  const defaultPresetRanges = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: 'last7days' },
    { label: 'Last 30 days', value: 'last30days' },
    { label: 'Last 90 days', value: 'last90days' },
    { label: 'Last 12 months', value: 'last12months' },
    { label: 'This month', value: 'thisMonth' },
    { label: 'Last month', value: 'lastMonth' },
    { label: 'This quarter', value: 'thisQuarter' },
    { label: 'Last quarter', value: 'lastQuarter' },
    { label: 'This year', value: 'thisYear' },
    { label: 'Last year', value: 'lastYear' },
    { label: 'Custom range', value: 'custom' }
  ]

  const ranges = presetRanges.length > 0 ? presetRanges : defaultPresetRanges

  // Get current date information
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // Helper functions to calculate date ranges
  const getDateRange = useCallback((preset) => {
    const end = new Date(today)
    const start = new Date(today)

    switch (preset) {
      case 'today':
        return { start: today, end: today }

      case 'yesterday':
        return { start: yesterday, end: yesterday }

      case 'last7days':
        start.setDate(start.getDate() - 7)
        end.setDate(end.getDate() - 1)
        return { start, end }

      case 'last30days':
        start.setDate(start.getDate() - 30)
        end.setDate(end.getDate() - 1)
        return { start, end }

      case 'last90days':
        start.setDate(start.getDate() - 90)
        end.setDate(end.getDate() - 1)
        return { start, end }

      case 'last12months':
        start.setFullYear(start.getFullYear() - 1)
        end.setDate(end.getDate() - 1)
        return { start, end }

      case 'thisMonth':
        start.setDate(1)
        return { start, end }

      case 'lastMonth':
        start.setMonth(start.getMonth() - 1, 1)
        end.setMonth(end.getMonth(), 0)
        return { start, end }

      case 'thisQuarter':
        const currentQuarter = Math.floor(start.getMonth() / 3)
        start.setMonth(currentQuarter * 3, 1)
        end.setMonth((currentQuarter + 1) * 3, 0)
        return { start, end }

      case 'lastQuarter':
        const lastQuarter = Math.floor((start.getMonth() - 3) / 3)
        start.setMonth(lastQuarter * 3, 1)
        end.setMonth((lastQuarter + 1) * 3, 0)
        return { start, end }

      case 'thisYear':
        start.setMonth(0, 1)
        return { start, end }

      case 'lastYear':
        start.setFullYear(start.getFullYear() - 1, 0, 1)
        end.setFullYear(end.getFullYear() - 1, 11, 31)
        return { start, end }

      default:
        return { start: today, end: today }
    }
  }, [])

  // Parse current value
  const currentValue = typeof value === 'string' ? value : 'last30days'
  const { start: currentStart, end: currentEnd } = getDateRange(currentValue)

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Format range for display
  const formatRange = (start, end) => {
    if (start.getTime() === end.getTime()) {
      return formatDate(start)
    }
    return `${formatDate(start)} - ${formatDate(end)}`
  }

  // Get range label
  const getRangeLabel = () => {
    if (typeof value === 'string') {
      const range = ranges.find(r => r.value === value)
      if (range && value !== 'custom') {
        return range.label
      }
    }

    if (typeof value === 'object' && value.start && value.end) {
      return formatRange(new Date(value.start), new Date(value.end))
    }

    return placeholder
  }

  // Get comparison range label
  const getComparisonLabel = () => {
    if (!comparisonValue) return 'Compare to previous period'

    if (typeof comparisonValue === 'string') {
      const range = ranges.find(r => r.value === comparisonValue)
      if (range && comparisonValue !== 'custom') {
        return `vs ${range.label}`
      }
    }

    return 'vs custom range'
  }

  // Handle preset selection
  const handlePresetSelect = (preset) => {
    if (preset === 'custom' && allowCustom) {
      setCustomStartActive(true)
      setCustomEndActive(false)
    } else {
      const { start, end } = getDateRange(preset)
      onChange({ preset, start, end })
    }
    setPopoverActive(false)
  }

  // Handle comparison preset selection
  const handleComparisonSelect = (preset) => {
    const { start, end } = getDateRange(preset)
    onComparisonChange?.({ preset, start, end })
    setComparisonPopoverActive(false)
  }

  // Handle custom date selection
  const handleCustomDateChange = (field, date) => {
    const currentRange = typeof value === 'object' ? value : { start: currentStart, end: currentEnd }

    if (field === 'start') {
      if (customStartActive) {
        setCustomStartActive(false)
        setCustomEndActive(true)
      }
    } else if (field === 'end') {
      setCustomEndActive(false)
    }

    const newRange = {
      ...currentRange,
      preset: 'custom',
      [field]: date
    }

    // Validate range
    if (newRange.start && newRange.end) {
      const daysDiff = Math.ceil((newRange.end - newRange.start) / (1000 * 60 * 60 * 24))

      if (daysDiff > maxRange) {
        alert(`Maximum range is ${maxRange} days`)
        return
      }

      if (daysDiff < minRange) {
        alert(`Minimum range is ${minRange} day(s)`)
        return
      }
    }

    onChange(newRange)
    setPopoverActive(false)
  }

  // Render preset selector
  const renderPresetSelector = () => {
    return (
      <Popover
        active={popoverActive}
        activator={
          <Button
            onClick={() => setPopoverActive(!popoverActive)}
            disclosure
            disabled={disabled}
            size={compact ? 'slim' : 'medium'}
          >
            {labelHidden ? '' : label}
            {!labelHidden && ': '}
            {getRangeLabel()}
          </Button>
        }
        onClose={() => setPopoverActive(false)}
      >
        <ActionList
          items={ranges.map(range => ({
            content: range.label,
            onAction: () => handlePresetSelect(range.value),
            active: currentValue === range.value
          }))}
        />
      </Popover>
    )
  }

  // Render comparison selector
  const renderComparisonSelector = () => {
    if (!showComparison) return null

    return (
      <Popover
        active={comparisonPopoverActive}
        activator={
          <Button
            onClick={() => setComparisonPopoverActive(!comparisonPopoverActive)}
            disclosure
            disabled={disabled}
            size={compact ? 'slim' : 'medium'}
            outline
          >
            {getComparisonLabel()}
          </Button>
        }
        onClose={() => setComparisonPopoverActive(false)}
      >
        <ActionList
          items={[
            { content: 'Previous period', onAction: () => handleComparisonSelect('previous') },
            { content: 'Same period last year', onAction: () => handleComparisonSelect('lastYear') },
            ...defaultPresetRanges.slice(0, -2).map(range => ({
              content: range.label,
              onAction: () => handleComparisonSelect(range.value)
            }))
          ]}
        />
      </Popover>
    )
  }

  // Render custom date picker
  const renderCustomDatePicker = () => {
    if (!allowCustom) return null

    return (
      <>
        <Popover
          active={customStartActive}
          activator={<div />}
          onClose={() => setCustomStartActive(false)}
          preferredAlignment="left"
        >
          <Card>
            <div style={{ padding: '16px' }}>
              <Text as="h3" variant="headingSm">Select start date</Text>
              {/* <Calendar
                selected={new Date(currentStart)}
                onSelect={(date) => handleCustomDateChange('start', date)}
                month={new Date(currentStart)}
                year={new Date(currentStart).getFullYear()}
              /> */}
              <Text>Calendar component placeholder</Text>
            </div>
          </Card>
        </Popover>

        <Popover
          active={customEndActive}
          activator={<div />}
          onClose={() => setCustomEndActive(false)}
          preferredAlignment="left"
        >
          <Card>
            <div style={{ padding: '16px' }}>
              <Text as="h3" variant="headingSm">Select end date</Text>
              {/* <Calendar
                selected={new Date(currentEnd)}
                onSelect={(date) => handleCustomDateChange('end', date)}
                month={new Date(currentEnd)}
                year={new Date(currentEnd).getFullYear()}
              /> */}
              <Text>Calendar component placeholder</Text>
            </div>
          </Card>
        </Popover>
      </>
    )
  }

  // Compact mode rendering
  if (compact) {
    return (
      <InlineStack gap="200">
        {renderPresetSelector()}
        {renderComparisonSelector()}
        {renderCustomDatePicker()}
      </InlineStack>
    )
  }

  // Full card mode rendering
  return (
    <Card>
      <div style={{ padding: 'var(--p-space-6)' }}>
        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">{label}</Text>

          <InlineStack gap="400" wrap={false}>
            {renderPresetSelector()}
            {renderComparisonSelector()}
          </InlineStack>

          {/* Display current selection details */}
          {typeof value === 'object' && value.start && value.end && (
            <div style={{
              padding: '12px',
              backgroundColor: 'var(--p-color-bg-surface-secondary)',
              borderRadius: '4px',
              border: '1px solid var(--p-color-border-secondary)'
            }}>
              <InlineStack align="space-between" wrap={false}>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Selected range</Text>
                  <Text as="p" fontWeight="medium">
                    {formatRange(new Date(value.start), new Date(value.end))}
                  </Text>
                  <Text as="p" tone="subdued" variant="bodySm">
                    {Math.ceil((new Date(value.end) - new Date(value.start)) / (1000 * 60 * 60 * 24))} days
                  </Text>
                </BlockStack>

                {allowCustom && (
                  <div>
                    <Button
                      icon={CalendarIcon}
                      variant="plain"
                      onClick={() => {
                        setCustomStartActive(true)
                        setCustomEndActive(false)
                      }}
                      accessibilityLabel="Edit custom dates"
                    />
                  </div>
                )}
              </InlineStack>
            </div>
          )}

          {/* Comparison period details */}
          {showComparison && comparisonValue && typeof comparisonValue === 'object' && (
            <div style={{
              padding: '12px',
              backgroundColor: 'var(--p-color-bg-surface-tertiary)',
              borderRadius: '4px',
              border: '1px solid var(--p-color-border-tertiary)'
            }}>
              <InlineStack align="space-between" wrap={false}>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Comparison period</Text>
                  <Text as="p" fontWeight="medium">
                    {formatRange(new Date(comparisonValue.start), new Date(comparisonValue.end))}
                  </Text>
                </BlockStack>

                <div>
                  <Button
                    icon={XIcon}
                    variant="plain"
                    onClick={() => onComparisonChange?.(null)}
                    accessibilityLabel="Remove comparison"
                  />
                </div>
              </InlineStack>
            </div>
          )}

          {/* Quick presets */}
          <InlineStack gap="200" wrap={true}>
            {defaultPresetRanges.slice(0, 6).map(range => (
              <Button
                key={range.value}
                size="slim"
                onClick={() => handlePresetSelect(range.value)}
                variant={currentValue === range.value ? 'primary' : 'secondary'}
              >
                {range.label}
              </Button>
            ))}
          </InlineStack>

          {renderCustomDatePicker()}
        </BlockStack>
      </div>
    </Card>
  )
}

export default DateRangeSelector