import React, { useState, useCallback, useEffect } from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Button,
  InlineStack,
  BlockStack,
  Grid,
  Tabs,
  Badge,
  DataTable,
  Icon,
  Modal,
  ActionList,
  ButtonGroup,
  Select,
  Divider,
  Spinner,
} from '@shopify/polaris'
import {
  ChartCohortIcon,
  PlusIcon,
  ImportIcon,
  RefreshIcon,
  ChartVerticalIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  InventoryIcon,
  PersonIcon,
  CashDollarIcon,
  PackageIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from '@shopify/polaris-icons'

import AnalyticsChart from '../components/AnalyticsChart'
import DateRangeSelector from '../components/DateRangeSelector'
import ReportBuilder from '../components/ReportBuilder'
// import { MockDataGenerators } from '../types/analytics'

/**
 * ReportsDashboard Component
 *
 * Comprehensive reports and analytics dashboard providing business intelligence
 * insights across all Cin7 Core modules. Features executive overview, inventory
 * analytics, sales analytics, and custom reporting capabilities.
 */

const ReportsDashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [dateRange, setDateRange] = useState({ preset: 'last30days' })
  const [comparisonRange, setComparisonRange] = useState(null)
  const [showReportBuilder, setShowReportBuilder] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)
  const [expandedWidget, setExpandedWidget] = useState(null)

  // Data states
  const [kpiMetrics, setKpiMetrics] = useState([])
  const [inventoryAnalytics, setInventoryAnalytics] = useState(null)
  const [salesAnalytics, setSalesAnalytics] = useState(null)
  const [customerAnalytics, setCustomerAnalytics] = useState(null)
  const [productPerformance, setProductPerformance] = useState(null)
  const [dashboardWidgets, setDashboardWidgets] = useState([])

  // Tab definitions
  const tabs = [
    {
      id: 'executive',
      content: 'Executive Overview',
      panelID: 'executive-content',
    },
    {
      id: 'inventory',
      content: 'Inventory Analytics',
      panelID: 'inventory-content',
    },
    {
      id: 'sales',
      content: 'Sales Analytics',
      panelID: 'sales-content',
    },
    {
      id: 'customers',
      content: 'Customer Analytics',
      panelID: 'customers-content',
    },
    {
      id: 'custom',
      content: 'Custom Reports',
      panelID: 'custom-content',
    },
  ]

  // Load initial data
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = useCallback(async () => {
    setLoading(true)
    try {
      // Simulate API calls with mock data
      setTimeout(() => {
        setKpiMetrics(MockDataGenerators.generateKPIMetrics())
        setInventoryAnalytics(MockDataGenerators.generateInventoryAnalytics())
        setSalesAnalytics(MockDataGenerators.generateSalesAnalytics())
        setCustomerAnalytics(MockDataGenerators.generateCustomerAnalytics())
        setProductPerformance(MockDataGenerators.generateProductPerformance())
        setDashboardWidgets(MockDataGenerators.generateDashboardWidgets())
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setLoading(false)
    }
  }, [])

  // Refresh data
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }, [loadDashboardData])

  // Export report
  const handleExport = useCallback((format = 'pdf') => {
    console.log(`Exporting report as ${format}`)
    setShowExportModal(false)
    // Implement actual export logic here
  }, [])

  // Create new report
  const handleCreateReport = useCallback(() => {
    setSelectedReport(null)
    setShowReportBuilder(true)
  }, [])

  // Edit existing report
  const handleEditReport = useCallback((report) => {
    setSelectedReport(report)
    setShowReportBuilder(true)
  }, [])

  // Save report
  const handleSaveReport = useCallback((reportData) => {
    console.log('Saving report:', reportData)
    setShowReportBuilder(false)
    // Implement actual save logic here
  }, [])

  // KPICard component
  const KPICard = ({ title, value, change, changeDirection, trend, target, color = 'base' }) => {
    const changeColor = changeDirection === 'up' ? 'success' : changeDirection === 'down' ? 'critical' : 'subdued'

    return (
      <Card>
        <div style={{ padding: 'var(--p-space-5)' }}>
          <BlockStack gap="300">
            <InlineStack align="space-between">
              <Text tone="subdued" as="p">{title}</Text>
              <Icon
                source={
                  changeDirection === 'up' ? ArrowUpIcon :
                  changeDirection === 'down' ? ArrowDownIcon :
                  ClockIcon
                }
                tone={color}
              />
            </InlineStack>

            <Text variant="headingLg" as="h2">{value}</Text>

            <InlineStack gap="200" align="center">
              <Icon
                source={
                  changeDirection === 'up' ? ArrowUpIcon :
                  changeDirection === 'down' ? ArrowDownIcon :
                  ClockIcon
                }
                tone={changeColor}
              />
              <Text tone={changeColor} fontWeight="medium">
                {change}
              </Text>
              <Text tone="subdued">vs last period</Text>
            </InlineStack>

            {target && (
              <div style={{ marginTop: '8px' }}>
                <Text as="p" tone="subdued" variant="bodySm">Target: {target}</Text>
              </div>
            )}
          </BlockStack>
        </div>
      </Card>
    )
  }

  // Render Executive Overview
  const renderExecutiveOverview = () => {
    if (loading) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Spinner size="large" />
          <Text as="p" tone="subdued" style={{ marginTop: '16px' }}>
            Loading executive dashboard...
          </Text>
        </div>
      )
    }

    return (
      <BlockStack gap="600">
        {/* KPI Metrics Grid */}
        <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 4 }}>
          {kpiMetrics.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </Grid>

        {/* Main Analytics Section */}
        <Grid columns={{ xs: 1, md: 2 }}>
          {/* Revenue Trend Chart */}
          <AnalyticsChart
            id="revenue-trend"
            title="Revenue Trend"
            type="line"
            data={MockDataGenerators.generateSalesChartData()}
            height={300}
            showLegend
            onRefresh={handleRefresh}
          />

          {/* Sales by Category Chart */}
          <AnalyticsChart
            id="sales-by-category"
            title="Sales by Category"
            type="doughnut"
            data={{
              labels: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'],
              datasets: [{
                data: [456789, 345678, 234567, 123456, 74077]
              }]
            }}
            height={300}
            showLegend
          />
        </Grid>

        {/* Performance Tables */}
        <Grid columns={{ xs: 1, md: 2 }}>
          {/* Top Products */}
          <Card>
            <div style={{ padding: 'var(--p-space-5)' }}>
              <Text variant="headingMd" as="h2" marginBottom="400">
                Top Performing Products
              </Text>
              <DataTable
                columnContentTypes={['text', 'numeric', 'numeric']}
                headings={['Product', 'Revenue', 'Growth']}
                rows={[
                  ['Wireless Headphones', '$46,789', '+23.5%'],
                  ['Smart Watch', '$62,345', '+18.2%'],
                  ['Laptop Stand', '$12,345', '-12.1%'],
                  ['USB Cable', '$8,890', '+2.3%'],
                ]}
              />
            </div>
          </Card>

          {/* Customer Segments */}
          <Card>
            <div style={{ padding: 'var(--p-space-5)' }}>
              <Text variant="headingMd" as="h2" marginBottom="400">
                Customer Segments
              </Text>
              <DataTable
                columnContentTypes={['text', 'numeric', 'numeric']}
                headings={['Segment', 'Customers', 'Revenue']}
                rows={[
                  ['VIP', '1,567', '$456,789'],
                  ['Regular', '6,789', '$567,890'],
                  ['Occasional', '4,567', '$123,456'],
                  ['New', '2,755', '$86,432'],
                ]}
              />
            </div>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Card>
          <div style={{ padding: 'var(--p-space-5)' }}>
            <Text variant="headingMd" as="h2" marginBottom="400">
              Quick Actions
            </Text>
            <InlineStack gap="300" wrap={true}>
              <Button icon={PlusIcon} onClick={handleCreateReport}>
                Create New Report
              </Button>
              <Button icon={ImportIcon} onClick={() => setShowExportModal(true)}>
                Export Dashboard
              </Button>
              <Button icon={RefreshIcon} onClick={handleRefresh} loading={refreshing}>
                Refresh Data
              </Button>
            </InlineStack>
          </div>
        </Card>
      </BlockStack>
    )
  }

  // Render Inventory Analytics
  const renderInventoryAnalytics = () => {
    if (!inventoryAnalytics) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Spinner size="large" />
        </div>
      )
    }

    return (
      <BlockStack gap="600">
        {/* Inventory KPIs */}
        <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
          <KPICard
            title="Total Products"
            value={inventoryAnalytics.totalProducts.toLocaleString()}
            change="+125"
            changeDirection="up"
            color="success"
          />
          <KPICard
            title="Total Inventory Value"
            value={`$${inventoryAnalytics.totalValue.toLocaleString()}`}
            change="+12.5%"
            changeDirection="up"
            color="success"
          />
          <KPICard
            title="Low Stock Items"
            value={inventoryAnalytics.lowStockItems.toString()}
            change="-8"
            changeDirection="down"
            color="warning"
          />
          <KPICard
            title="Turnover Rate"
            value={`${inventoryAnalytics.turnoverRate}x`}
            change="-0.2"
            changeDirection="down"
            color="critical"
          />
        </Grid>

        {/* Inventory Charts */}
        <Grid columns={{ xs: 1, md: 2 }}>
          <AnalyticsChart
            id="inventory-by-category"
            title="Inventory by Category"
            type="bar"
            data={{
              labels: inventoryAnalytics.categories.map(c => c.name),
              datasets: [{
                label: 'Products',
                data: inventoryAnalytics.categories.map(c => c.count)
              }]
            }}
            height={300}
          />

          <AnalyticsChart
            id="location-capacity"
            title="Location Capacity"
            type="bar"
            data={{
              labels: inventoryAnalytics.locations.map(l => l.name),
              datasets: [
                {
                  label: 'Current Stock',
                  data: inventoryAnalytics.locations.map(l => l.count)
                },
                {
                  label: 'Capacity',
                  data: inventoryAnalytics.locations.map(l => l.capacity)
                }
              ]
            }}
            height={300}
          />
        </Grid>

        {/* Trending Products */}
        <Card>
          <div style={{ padding: 'var(--p-space-5)' }}>
            <Text variant="headingMd" as="h2" marginBottom="400">
              Trending Products
            </Text>
            <DataTable
              columnContentTypes={['text', 'text', 'text']}
              headings={['Product', 'Trend', 'Change']}
              rows={inventoryAnalytics.trendingProducts.map(product => [
                product.name,
                <Badge
                  tone={
                    product.trend === 'up' ? 'success' :
                    product.trend === 'down' ? 'critical' :
                    'info'
                  }
                >
                  {product.trend}
                </Badge>,
                <Text
                  tone={
                    product.change > 0 ? 'success' :
                    product.change < 0 ? 'critical' :
                    'subdued'
                  }
                >
                  {product.change > 0 ? '+' : ''}{product.change}%
                </Text>
              ])}
            />
          </div>
        </Card>
      </BlockStack>
    )
  }

  // Render Sales Analytics
  const renderSalesAnalytics = () => {
    if (!salesAnalytics) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Spinner size="large" />
        </div>
      )
    }

    return (
      <BlockStack gap="600">
        {/* Sales KPIs */}
        <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
          <KPICard
            title="Total Revenue"
            value={`$${salesAnalytics.totalRevenue.toLocaleString()}`}
            change="+15.2%"
            changeDirection="up"
            color="success"
          />
          <KPICard
            title="Total Orders"
            value={salesAnalytics.totalOrders.toLocaleString()}
            change="+8.1%"
            changeDirection="up"
            color="success"
          />
          <KPICard
            title="Average Order Value"
            value={`$${salesAnalytics.averageOrderValue}`}
            change="+3.2%"
            changeDirection="up"
            color="info"
          />
          <KPICard
            title="Conversion Rate"
            value="3.2%"
            change="+0.4%"
            changeDirection="up"
            color="success"
          />
        </Grid>

        {/* Sales Charts */}
        <Grid columns={{ xs: 1, md: 2 }}>
          <AnalyticsChart
            id="sales-by-channel"
            title="Sales by Channel"
            type="pie"
            data={{
              labels: salesAnalytics.salesByChannel.map(c => c.channel),
              datasets: [{
                data: salesAnalytics.salesByChannel.map(c => c.revenue)
              }]
            }}
            height={300}
          />

          <AnalyticsChart
            id="sales-trend"
            title="Sales Trend (Last 12 Months)"
            type="area"
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                label: 'Revenue',
                data: [65000, 72000, 68000, 85000, 92000, 88000, 95000, 102000, 98000, 105000, 112000, 125000],
                type: 'area'
              }]
            }}
            height={300}
          />
        </Grid>

        {/* Top Products Table */}
        <Card>
          <div style={{ padding: 'var(--p-space-5)' }}>
            <Text variant="headingMd" as="h2" marginBottom="400">
              Top Performing Products
            </Text>
            <DataTable
              columnContentTypes={['text', 'numeric', 'numeric', 'numeric', 'text']}
              headings={['Product', 'SKU', 'Quantity', 'Revenue', 'Growth']}
              rows={salesAnalytics.topProducts.map(product => [
                product.name,
                product.sku,
                product.quantity.toLocaleString(),
                `$${product.revenue.toLocaleString()}`,
                <Text tone={product.growth > 0 ? 'success' : 'critical'}>
                  {product.growth > 0 ? '+' : ''}{product.growth}%
                </Text>
              ])}
            />
          </div>
        </Card>
      </BlockStack>
    )
  }

  // Render Customer Analytics
  const renderCustomerAnalytics = () => {
    if (!customerAnalytics) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Spinner size="large" />
        </div>
      )
    }

    return (
      <BlockStack gap="600">
        {/* Customer KPIs */}
        <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
          <KPICard
            title="Total Customers"
            value={customerAnalytics.totalCustomers.toLocaleString()}
            change="+567"
            changeDirection="up"
            color="success"
          />
          <KPICard
            title="Active Customers"
            value={customerAnalytics.activeCustomers.toLocaleString()}
            change="+123"
            changeDirection="up"
            color="success"
          />
          <KPICard
            title="Retention Rate"
            value={`${customerAnalytics.retentionRate}%`}
            change="+2.1%"
            changeDirection="up"
            color="success"
          />
          <KPICard
            title="Customer Lifetime Value"
            value={`$${customerAnalytics.customerLifetimeValue}`}
            change="+8.5%"
            changeDirection="up"
            color="info"
          />
        </Grid>

        {/* Customer Charts */}
        <Grid columns={{ xs: 1, md: 2 }}>
          <AnalyticsChart
            id="customer-segments"
            title="Customer Segments"
            type="doughnut"
            data={{
              labels: customerAnalytics.customerSegments.map(s => s.segment),
              datasets: [{
                data: customerAnalytics.customerSegments.map(s => s.count)
              }]
            }}
            height={300}
          />

          <AnalyticsChart
            id="geographic-distribution"
            title="Geographic Distribution"
            type="bar"
            data={{
              labels: customerAnalytics.geographicDistribution.map(g => g.region),
              datasets: [{
                label: 'Customers',
                data: customerAnalytics.geographicDistribution.map(g => g.count)
              }]
            }}
            height={300}
          />
        </Grid>

        {/* Top Customers */}
        <Card>
          <div style={{ padding: 'var(--p-space-5)' }}>
            <Text variant="headingMd" as="h2" marginBottom="400">
              Top Customers by Revenue
            </Text>
            <DataTable
              columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text']}
              headings={['Customer', 'Email', 'Orders', 'Revenue', 'Last Order']}
              rows={customerAnalytics.topCustomers.map(customer => [
                customer.name,
                customer.email,
                customer.orders,
                `$${customer.revenue.toLocaleString()}`,
                customer.lastOrder.toLocaleDateString()
              ])}
            />
          </div>
        </Card>
      </BlockStack>
    )
  }

  // Render Custom Reports
  const renderCustomReports = () => {
    const mockReports = [
      {
        id: '1',
        name: 'Monthly Executive Summary',
        description: 'High-level business overview for leadership',
        category: 'executive',
        lastRun: new Date('2024-01-15'),
        nextRun: new Date('2024-02-01'),
        isScheduled: true
      },
      {
        id: '2',
        name: 'Inventory Health Report',
        description: 'Detailed inventory analysis and recommendations',
        category: 'operational',
        lastRun: new Date('2024-01-14'),
        nextRun: null,
        isScheduled: false
      },
      {
        id: '3',
        name: 'Customer Performance Analysis',
        description: 'Customer behavior and lifetime value analysis',
        category: 'strategic',
        lastRun: new Date('2024-01-13'),
        nextRun: new Date('2024-01-20'),
        isScheduled: true
      }
    ]

    return (
      <BlockStack gap="600">
        {/* Create New Report */}
        <Card>
          <div style={{ padding: 'var(--p-space-5)' }}>
            <InlineStack align="space-between" wrap={false}>
              <BlockStack gap="200">
                <Text variant="headingMd" as="h2">Custom Reports</Text>
                <Text as="p" tone="subdued">
                  Create and manage custom reports tailored to your business needs
                </Text>
              </BlockStack>
              <Button icon={PlusIcon} onClick={handleCreateReport}>
                Create New Report
              </Button>
            </InlineStack>
          </div>
        </Card>

        {/* Reports List */}
        <Card>
          <div style={{ padding: 'var(--p-space-5)' }}>
            <Text variant="headingMd" as="h2" marginBottom="400">
              Saved Reports
            </Text>
            <DataTable
              columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
              headings={['Name', 'Category', 'Last Run', 'Next Run', 'Schedule', 'Actions']}
              rows={mockReports.map(report => [
                <BlockStack gap="100">
                  <Text as="p" fontWeight="medium">{report.name}</Text>
                  <Text as="p" tone="subdued" variant="bodySm">{report.description}</Text>
                </BlockStack>,
                <Badge>{report.category}</Badge>,
                report.lastRun.toLocaleDateString(),
                report.nextRun ? report.nextRun.toLocaleDateString() : '-',
                report.isScheduled ?
                  <Badge tone="success">Scheduled</Badge> :
                  <Badge tone="subdued">Manual</Badge>,
                <ButtonGroup segmented>
                  <Button size="slim" onClick={() => handleEditReport(report)}>
                    Edit
                  </Button>
                  <Button size="slim" onClick={() => console.log('Run report:', report.id)}>
                    Run
                  </Button>
                  <Button size="slim" onClick={() => console.log('Export report:', report.id)}>
                    Export
                  </Button>
                </ButtonGroup>
              ])}
            />
          </div>
        </Card>

        {/* Report Templates */}
        <Card>
          <div style={{ padding: 'var(--p-space-5)' }}>
            <Text variant="headingMd" as="h2" marginBottom="400">
              Report Templates
            </Text>
            <Grid columns={{ xs: 1, md: 2, lg: 3 }}>
              {MockDataGenerators.generateReportTemplates().map(template => (
                <Card key={template.id}>
                  <div style={{ padding: 'var(--p-space-6)' }}>
                    <BlockStack gap="300">
                      <InlineStack align="space-between">
                        <Text as="h3" variant="headingSm">{template.name}</Text>
                        <Icon source={ChartCohortIcon} tone="info" />
                      </InlineStack>
                      <Text as="p" tone="subdued" variant="bodySm">
                        {template.description}
                      </Text>
                      <InlineStack gap="200">
                        <Badge>{template.category}</Badge>
                        <Badge tone="info">{template.type}</Badge>
                      </InlineStack>
                      <Button
                        size="slim"
                        onClick={() => handleEditReport(template)}
                      >
                        Use Template
                      </Button>
                    </BlockStack>
                  </div>
                </Card>
              ))}
            </Grid>
          </div>
        </Card>
      </BlockStack>
    )
  }

  return (
    <>
      <Page
        title="Reports & Analytics"
        subtitle="Comprehensive business intelligence and reporting"
        primaryAction={{
          content: 'Create Report',
          icon: PlusIcon,
          onAction: handleCreateReport,
        }}
        secondaryActions={[
          {
            content: 'Export',
            icon: ImportIcon,
            onAction: () => setShowExportModal(true),
          },
          {
            content: 'Refresh',
            icon: RefreshIcon,
            onAction: handleRefresh,
            loading: refreshing,
          },
        ]}
      >
        {/* Date Range Selector */}
        <Layout.Section>
          <DateRangeSelector
            value={dateRange}
            onChange={setDateRange}
            showComparison
            comparisonValue={comparisonRange}
            onComparisonChange={setComparisonRange}
            compact
          />
        </Layout.Section>

        {/* Main Content */}
        <Layout.Section>
          <Tabs tabs={tabs} selected={activeTab} onSelect={setActiveTab}>
            {activeTab === 0 && renderExecutiveOverview()}
            {activeTab === 1 && renderInventoryAnalytics()}
            {activeTab === 2 && renderSalesAnalytics()}
            {activeTab === 3 && renderCustomerAnalytics()}
            {activeTab === 4 && renderCustomReports()}
          </Tabs>
        </Layout.Section>
      </Page>

      {/* Report Builder Modal */}
      {showReportBuilder && (
        <ReportBuilder
          initialData={selectedReport}
          templates={MockDataGenerators.generateReportTemplates()}
          onSave={handleSaveReport}
          onCancel={() => setShowReportBuilder(false)}
          isEditing={!!selectedReport}
        />
      )}

      {/* Export Modal */}
      <Modal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Report"
        primaryAction={{
          content: 'Export as PDF',
          onAction: () => handleExport('pdf'),
        }}
        secondaryActions={[
          {
            content: 'Export as Excel',
            onAction: () => handleExport('excel'),
          },
          {
            content: 'Export as CSV',
            onAction: () => handleExport('csv'),
          },
        ]}
      >
        <div style={{ padding: 'var(--p-space-6)' }}>
          <BlockStack gap="400">
            <Text as="p">
              Choose the export format for your report. The current date range and filters will be applied.
            </Text>

            <BlockStack gap="200">
              <Text as="p" fontWeight="medium">Current selection:</Text>
              <Text as="p" tone="subdued">
                Report: {tabs[activeTab].content}
              </Text>
              <Text as="p" tone="subdued">
                Date Range: {dateRange.preset || 'Custom'}
              </Text>
              {comparisonRange && (
                <Text as="p" tone="subdued">
                  Comparison: {comparisonRange.preset || 'Custom'}
                </Text>
              )}
            </BlockStack>
          </BlockStack>
        </div>
      </Modal>
    </>
  )
}

export default ReportsDashboard