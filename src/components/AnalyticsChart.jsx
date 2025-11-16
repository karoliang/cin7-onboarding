import React, { useState } from 'react'
import {
  Card,
  Text,
  Button,
  InlineStack,
  BlockStack,
  Select,
  Badge,
  Icon,
  Spinner,
} from '@shopify/polaris'
import {
  ViewIcon,
  HideIcon,
  DownloadIcon,
  RefreshIcon,
  SettingsIcon,
} from '@shopify/polaris-icons'

/**
 * AnalyticsChart Component
 *
 * A versatile chart component that can render different types of charts
 * using mock data visualization. In a production environment, this would
 * integrate with a charting library like Chart.js, D3.js, or Recharts.
 */

const AnalyticsChart = ({
  id,
  title,
  type = 'line',
  data,
  height = 300,
  width = '100%',
  showLegend = true,
  showGrid = true,
  interactive = true,
  loading = false,
  error = null,
  onRefresh,
  onExport,
  onSettings,
  customizable = true,
  className = '',
  style = {}
}) => {
  const [chartType, setChartType] = useState(type)
  const [showDataLabels, setShowDataLabels] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Chart type options
  const chartTypes = [
    { label: 'Line Chart', value: 'line' },
    { label: 'Bar Chart', value: 'bar' },
    { label: 'Area Chart', value: 'area' },
    { label: 'Pie Chart', value: 'pie' },
    { label: 'Doughnut Chart', value: 'doughnut' },
    { label: 'Scatter Plot', value: 'scatter' },
  ]

  // Color palette for charts
  const colorPalette = [
    '#007ACE', // Polaris Blue
    '#059669', // Success Green
    '#DC2626', // Critical Red
    '#D97706', // Warning Orange
    '#7C3AED', // Purple
    '#0891B2', // Cyan
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#6366F1', // Indigo
  ]

  // Mock chart rendering based on type
  const renderMockChart = () => {
    const { labels = [], datasets = [] } = data || {}

    if (loading) {
      return (
        <div style={{
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Spinner size="large" />
        </div>
      )
    }

    if (error) {
      return (
        <div style={{
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <Text tone="critical" as="p">Failed to load chart data</Text>
          <Button onClick={onRefresh}>Retry</Button>
        </div>
      )
    }

    // Different mock visualizations based on chart type
    switch (chartType) {
      case 'line':
      case 'area':
        return renderLineChart()
      case 'bar':
        return renderBarChart()
      case 'pie':
      case 'doughnut':
        return renderPieChart()
      case 'scatter':
        return renderScatterChart()
      default:
        return <div style={{ height: `${height}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text as="p">Unsupported chart type</Text>
        </div>
    }
  }

  // Mock line chart rendering
  const renderLineChart = () => {
    const maxValue = Math.max(...(data.datasets[0]?.data || [100]))

    return (
      <div style={{
        height: `${height}px`,
        padding: '20px',
        position: 'relative',
        background: 'linear-gradient(to right, #f8f9fa 0%, #f8f9fa 100%)'
      }}>
        {/* Grid lines */}
        {showGrid && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 60,
            right: 20,
            bottom: 40,
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 39px, #e1e3e5 39px, #e1e3e5 40px)'
          }} />
        )}

        {/* Y-axis labels */}
        <div style={{
          position: 'absolute',
          left: 10,
          top: 10,
          bottom: 40,
          width: 40,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#6D7175'
        }}>
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.75)}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>{Math.round(maxValue * 0.25)}</span>
          <span>0</span>
        </div>

        {/* Chart lines */}
        <svg style={{
          position: 'absolute',
          left: 60,
          right: 20,
          top: 10,
          bottom: 40,
          width: 'calc(100% - 80px)',
          height: 'calc(100% - 50px)'
        }}>
          {data.datasets?.map((dataset, datasetIndex) => {
            const points = dataset.data.map((value, index) => {
              const x = (index / (dataset.data.length - 1)) * 100
              const y = 100 - (value / maxValue) * 100
              return `${x},${y}`
            }).join(' L ')

            return (
              <g key={datasetIndex}>
                <polyline
                  points={points}
                  fill={chartType === 'area' ? dataset.backgroundColor || colorPalette[datasetIndex] + '20' : 'none'}
                  stroke={dataset.borderColor || colorPalette[datasetIndex]}
                  strokeWidth="2"
                />
                {showDataLabels && dataset.data.map((value, index) => {
                  const x = (index / (dataset.data.length - 1)) * 100
                  const y = 100 - (value / maxValue) * 100
                  return (
                    <circle
                      key={index}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="4"
                      fill={dataset.borderColor || colorPalette[datasetIndex]}
                    />
                  )
                })}
              </g>
            )
          })}
        </svg>

        {/* X-axis labels */}
        <div style={{
          position: 'absolute',
          left: 60,
          right: 20,
          bottom: 10,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#6D7175'
        }}>
          {data.labels?.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
      </div>
    )
  }

  // Mock bar chart rendering
  const renderBarChart = () => {
    const maxValue = Math.max(...(data.datasets[0]?.data || [100]))
    const barWidth = `calc(${100 / data.labels.length}% - 10px)`

    return (
      <div style={{
        height: `${height}px`,
        padding: '20px',
        position: 'relative'
      }}>
        {/* Y-axis labels */}
        <div style={{
          position: 'absolute',
          left: 10,
          top: 10,
          bottom: 40,
          width: 40,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#6D7175'
        }}>
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.75)}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>{Math.round(maxValue * 0.25)}</span>
          <span>0</span>
        </div>

        {/* Bars */}
        <div style={{
          position: 'absolute',
          left: 60,
          right: 20,
          top: 10,
          bottom: 40,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          gap: '5px'
        }}>
          {data.labels?.map((label, index) => (
            <div key={index} style={{
              width: barWidth,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                width: '100%',
                height: `${(data.datasets[0]?.data[index] || 0) / maxValue * 100}%`,
                backgroundColor: data.datasets[0]?.backgroundColor || colorPalette[0],
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.3s ease'
              }}>
                {showDataLabels && (
                  <div style={{
                    textAlign: 'center',
                    padding: '4px',
                    fontSize: '12px',
                    color: '#ffffff',
                    fontWeight: 'bold'
                  }}>
                    {data.datasets[0]?.data[index]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div style={{
          position: 'absolute',
          left: 60,
          right: 20,
          bottom: 10,
          display: 'flex',
          justifyContent: 'space-around',
          fontSize: '12px',
          color: '#6D7175'
        }}>
          {data.labels?.map((label, index) => (
            <span key={index} style={{ textAlign: 'center' }}>{label}</span>
          ))}
        </div>
      </div>
    )
  }

  // Mock pie chart rendering
  const renderPieChart = () => {
    const total = data.datasets[0]?.data?.reduce((sum, value) => sum + value, 0) || 0
    let currentAngle = -90 // Start from top

    return (
      <div style={{
        height: `${height}px`,
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          {/* Pie */}
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              {data.labels?.map((label, index) => {
                const value = data.datasets[0]?.data[index] || 0
                const percentage = (value / total) * 100
                const angle = (percentage / 100) * 360

                const startX = 100 + 90 * Math.cos((currentAngle * Math.PI) / 180)
                const startY = 100 + 90 * Math.sin((currentAngle * Math.PI) / 180)

                const endAngle = currentAngle + angle
                const endX = 100 + 90 * Math.cos((endAngle * Math.PI) / 180)
                const endY = 100 + 90 * Math.sin((endAngle * Math.PI) / 180)

                const largeArcFlag = angle > 180 ? 1 : 0

                const pathData = [
                  `M 100 100`,
                  `L ${startX} ${startY}`,
                  `A 90 90 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                  'Z'
                ].join(' ')

                currentAngle = endAngle

                return (
                  <g key={index}>
                    <path
                      d={pathData}
                      fill={colorPalette[index % colorPalette.length]}
                      stroke="white"
                      strokeWidth="2"
                      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)'
                        e.target.style.filter = 'brightness(1.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)'
                        e.target.style.filter = 'brightness(1)'
                      }}
                    />
                    {showDataLabels && (
                      <text
                        x={100 + 60 * Math.cos(((currentAngle - angle/2) * Math.PI) / 180)}
                        y={100 + 60 * Math.sin(((currentAngle - angle/2) * Math.PI) / 180)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {`${percentage.toFixed(1)}%`}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Legend */}
          {showLegend && (
            <div>
              <BlockStack gap="300">
                {data.labels?.map((label, index) => {
                  const value = data.datasets[0]?.data[index] || 0
                  const percentage = ((value / total) * 100).toFixed(1)

                  return (
                    <InlineStack key={index} gap="200" align="center">
                      <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: colorPalette[index % colorPalette.length],
                        borderRadius: '3px'
                      }} />
                      <Text as="span">{label}</Text>
                      <Text tone="subdued" as="span">
                        {value} ({percentage}%)
                      </Text>
                    </InlineStack>
                  )
                })}
              </BlockStack>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Mock scatter plot rendering
  const renderScatterPlot = () => {
    return (
      <div style={{
        height: `${height}px`,
        padding: '20px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '300px',
          height: '300px',
          border: '2px solid #e1e3e5',
          borderRadius: '8px',
          position: 'relative',
          background: 'linear-gradient(to right, #f8f9fa 0%, #f8f9fa 100%)'
        }}>
          {/* Mock scatter points */}
          {data.datasets[0]?.data?.map((point, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${Math.random() * 90 + 5}%`,
                top: `${Math.random() * 90 + 5}%`,
                width: '8px',
                height: '8px',
                backgroundColor: colorPalette[0],
                borderRadius: '50%',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          ))}
          <Text as="p" tone="subdued" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}>
            Scatter Plot Visualization
          </Text>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <div style={{ padding: 'var(--p-space-6)' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <Text variant="headingMd" as="h2">{title}</Text>

          <InlineStack gap="200">
            {/* Chart type selector */}
            {customizable && (
              <Select
                options={chartTypes}
                value={chartType}
                onChange={setChartType}
                label="Chart type"
                labelHidden
              />
            )}

            {/* Action buttons */}
            {onRefresh && (
              <Button
                icon={RefreshIcon}
                variant="plain"
                onClick={onRefresh}
                accessibilityLabel="Refresh chart"
              />
            )}

            {onExport && (
              <Button
                icon={DownloadIcon}
                variant="plain"
                onClick={onExport}
                accessibilityLabel="Export chart"
              />
            )}

            {onSettings && (
              <Button
                icon={SettingsIcon}
                variant="plain"
                onClick={onSettings}
                accessibilityLabel="Chart settings"
              />
            )}

            <Button
              icon={isExpanded ? HideIcon : ViewIcon}
              variant="plain"
              onClick={() => setIsExpanded(!isExpanded)}
              accessibilityLabel={isExpanded ? "Collapse chart" : "Expand chart"}
            />
          </InlineStack>
        </div>

        {/* Chart visualization */}
        <div className={className} style={{ ...style }}>
          {renderMockChart()}
        </div>

        {/* Footer with metrics */}
        {!loading && !error && data.datasets?.[0] && (
          <div style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #e1e3e5'
          }}>
            <InlineStack gap="400" wrap={false}>
              <div>
                <Text tone="subdued" as="p">Total</Text>
                <Text variant="headingSm" as="p">
                  {data.datasets[0].data.reduce((sum, val) => sum + val, 0).toLocaleString()}
                </Text>
              </div>
              <div>
                <Text tone="subdued" as="p">Average</Text>
                <Text variant="headingSm" as="p">
                  {Math.round(
                    data.datasets[0].data.reduce((sum, val) => sum + val, 0) /
                    data.datasets[0].data.length
                  ).toLocaleString()}
                </Text>
              </div>
              <div>
                <Text tone="subdued" as="p">Data Points</Text>
                <Text variant="headingSm" as="p">{data.datasets[0].data.length}</Text>
              </div>
            </InlineStack>
          </div>
        )}
      </div>
    </Card>
  )
}

export default AnalyticsChart