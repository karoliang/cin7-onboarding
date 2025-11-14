import React, { useState } from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Button,
  Select,
  Badge,
  Icon,
  DataTable,
  ProgressBar,
  Divider,
  InlineStack,
  BlockStack,
  Grid,
  VerticalStack,
  Tabs,
  ButtonGroup,
} from '@shopify/polaris'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CashDollarIcon,
  ProductIcon,
  PersonIcon,
  PackageIcon,
  ViewIcon,
  ClockIcon,
  AlertCircleIcon
} from '@shopify/polaris-icons'

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [dateRange, setDateRange] = useState('last30days')

  const tabs = [
    {
      id: 'overview',
      content: 'Overview',
      panelID: 'overview-content',
    },
    {
      id: 'sales',
      content: 'Sales',
      panelID: 'sales-content',
    },
    {
      id: 'customers',
      content: 'Customers',
      panelID: 'customers-content',
    },
    {
      id: 'products',
      content: 'Products',
      panelID: 'products-content',
    },
  ]

  const dateRanges = [
    {label: 'Last 7 days', value: 'last7days'},
    {label: 'Last 30 days', value: 'last30days'},
    {label: 'Last 90 days', value: 'last90days'},
    {label: 'Last year', value: 'lastyear'},
  ]

  // Mock KPI data
  const kpiData = [
    {
      title: 'Total Sales',
      value: '$24,567',
      change: '+12.5%',
      changeDirection: 'up',
      icon: CashDollarIcon,
      color: 'success',
    },
    {
      title: 'Orders',
      value: '156',
      change: '+8.2%',
      changeDirection: 'up',
      icon: ProductIcon,
      color: 'success',
    },
    {
      title: 'Customers',
      value: '1,234',
      change: '-2.1%',
      changeDirection: 'down',
      icon: PersonIcon,
      color: 'attention',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      changeDirection: 'up',
      icon: ViewIcon,
      color: 'success',
    },
  ]

  // Mock sales chart data
  const salesData = [
    ['Date', 'Sales', 'Orders'],
    ['Jan 1', '$2,340', '12'],
    ['Jan 2', '$1,890', '10'],
    ['Jan 3', '$3,456', '18'],
    ['Jan 4', '$2,789', '15'],
    ['Jan 5', '$4,123', '22'],
    ['Jan 6', '$3,456', '19'],
    ['Jan 7', '$2,890', '16'],
  ]

  // Mock top products data
  const topProducts = [
    ['Product', 'Sales', 'Revenue', 'Stock'],
    ['Classic T-Shirt', '45', '$1,349', '150'],
    ['Denim Jeans', '32', '$2,879', '85'],
    ['Leather Wallet', '28', '$1,399', '0'],
    ['Coffee Mug', '22', '$329', '200'],
    ['Wireless Headphones', '18', '$3,599', '45'],
  ]

  // Mock recent orders
  const recentOrders = [
    ['Order', 'Customer', 'Total', 'Status', 'Date'],
    ['#1001', 'John Doe', '$89.99', 'Fulfilled', '2024-01-15'],
    ['#1002', 'Jane Smith', '$29.99', 'Processing', '2024-01-15'],
    ['#1003', 'Bob Johnson', '$199.99', 'Fulfilled', '2024-01-14'],
    ['#1004', 'Alice Brown', '$14.99', 'Pending', '2024-01-14'],
    ['#1005', 'Charlie Wilson', '$49.99', 'Fulfilled', '2024-01-13'],
  ]

  const KPICard = ({ title, value, change, changeDirection, icon: Icon, color }) => (
    <Card>
      <div style={{ padding: 'var(--p-space-6)' }}>
        <VerticalStack gap="400">
          <InlineStack align="space-between">
            <Text tone="subdued" as="p">{title}</Text>
            <Icon source={Icon} tone={color} />
          </InlineStack>
          <Text variant="headingLg" as="h2">{value}</Text>
          <InlineStack gap="200">
            <Icon
              source={changeDirection === 'up' ? ArrowUpIcon : ArrowDownIcon}
              tone={changeDirection === 'up' ? 'success' : 'critical'}
            />
            <Text
              tone={changeDirection === 'up' ? 'success' : 'critical'}
              fontWeight="medium"
            >
              {change}
            </Text>
            <Text tone="subdued">vs last period</Text>
          </InlineStack>
        </VerticalStack>
      </div>
    </Card>
  )

  const getOrderStatusBadge = (status) => {
    const statusMap = {
      'Fulfilled': { tone: 'success' },
      'Processing': { tone: 'attention' },
      'Pending': { tone: 'warning' },
      'Cancelled': { tone: 'critical' }
    }
    const config = statusMap[status] || statusMap.Pending
    return <Badge {...config}>{status}</Badge>
  }

  const getStockBadge = (stock) => {
    if (stock === '0') return <Badge tone="critical">Out of stock</Badge>
    if (parseInt(stock) < 20) return <Badge tone="warning">Low stock</Badge>
    return <Badge tone="success">{stock} in stock</Badge>
  }

  return (
    <Page
      title="Dashboard"
      subtitle="Business overview and analytics"
      primaryAction={{
        content: 'Export report',
        onAction: () => console.log('Export report clicked'),
      }}
    >
      <Layout>
        {/* Date Range Selector */}
        <Layout.Section>
          <InlineStack align="space-between">
            <div />
            <Select
              options={dateRanges}
              value={dateRange}
              onChange={setDateRange}
              label="Date range"
              labelHidden
            />
          </InlineStack>
        </Layout.Section>

        {/* KPI Cards */}
        <Layout.Section>
          <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 4 }}>
            {kpiData.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </Grid>
        </Layout.Section>

        {/* Tabs Navigation */}
        <Layout.Section>
          <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
            {selectedTab === 0 && (
              <VerticalStack gap="600">
                {/* Sales Chart */}
                <Card>
                  <div style={{ padding: 'var(--p-space-6)' }}>
                    <Text variant="headingMd" as="h2" marginBottom="400">
                      Sales Overview
                    </Text>
                    <DataTable
                      columnContentTypes={[
                        'text',
                        'numeric',
                        'numeric',
                      ]}
                      headings={[
                        'Date',
                        'Sales',
                        'Orders',
                      ]}
                      rows={salesData}
                    />
                  </div>
                </Card>

                <InlineStack gap="400">
                  {/* Top Products */}
                  <Card>
                    <div style={{ padding: 'var(--p-space-6)', width: '100%' }}>
                      <Text variant="headingMd" as="h2" marginBottom="400">
                        Top Products
                      </Text>
                      <DataTable
                        columnContentTypes={[
                          'text',
                          'numeric',
                          'numeric',
                          'text',
                        ]}
                        headings={[
                          'Product',
                          'Sales',
                          'Revenue',
                          'Stock',
                        ]}
                        rows={topProducts.map(row => [
                          row[0],
                          row[1],
                          row[2],
                          getStockBadge(row[3])
                        ])}
                      />
                    </div>
                  </Card>

                  {/* Recent Orders */}
                  <Card>
                    <div style={{ padding: 'var(--p-space-6)', width: '100%' }}>
                      <Text variant="headingMd" as="h2" marginBottom="400">
                        Recent Orders
                      </Text>
                      <DataTable
                        columnContentTypes={[
                          'text',
                          'text',
                          'numeric',
                          'text',
                          'text',
                        ]}
                        headings={[
                          'Order',
                          'Customer',
                          'Total',
                          'Status',
                          'Date',
                        ]}
                        rows={recentOrders.map(row => [
                          row[0],
                          row[1],
                          row[2],
                          getOrderStatusBadge(row[3]),
                          row[4]
                        ])}
                      />
                    </div>
                  </Card>
                </InlineStack>
              </VerticalStack>
            )}

            {selectedTab === 1 && (
              <Card>
                <div style={{ padding: 'var(--p-space-6)' }}>
                  <Text variant="headingMd" as="h2">
                    Sales Analytics
                  </Text>
                  <Text as="p">
                    Detailed sales performance metrics and trends will be displayed here.
                  </Text>
                </div>
              </Card>
            )}

            {selectedTab === 2 && (
              <Card>
                <div style={{ padding: 'var(--p-space-6)' }}>
                  <Text variant="headingMd" as="h2">
                    Customer Analytics
                  </Text>
                  <Text as="p">
                    Customer behavior, segmentation, and lifetime value insights.
                  </Text>
                </div>
              </Card>
            )}

            {selectedTab === 3 && (
              <Card>
                <div style={{ padding: 'var(--p-space-6)' }}>
                  <Text variant="headingMd" as="h2">
                    Product Performance
                  </Text>
                  <Text as="p">
                    Product analytics, inventory insights, and performance metrics.
                  </Text>
                </div>
              </Card>
            )}
          </Tabs>
        </Layout.Section>

        {/* Quick Actions */}
        <Layout.Section variant="oneThird">
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2" marginBottom="400">
                Quick Actions
              </Text>
              <VerticalStack gap="300">
                <Button fullWidth onClick={() => console.log('New order clicked')}>
                  Create new order
                </Button>
                <Button fullWidth onClick={() => console.log('Add product clicked')}>
                  Add product
                </Button>
                <Button fullWidth onClick={() => console.log('View reports clicked')}>
                  View reports
                </Button>
                <Button fullWidth onClick={() => console.log('Manage inventory clicked')}>
                  Manage inventory
                </Button>
              </VerticalStack>
            </div>
          </Card>
        </Layout.Section>

        {/* System Status */}
        <Layout.Section variant="oneThird">
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2" marginBottom="400">
                System Status
              </Text>
              <VerticalStack gap="400">
                <InlineStack align="space-between">
                  <Text as="p">API Status</Text>
                  <Badge tone="success">Operational</Badge>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text as="p">Database</Text>
                  <Badge tone="success">Healthy</Badge>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text as="p">Processing Queue</Text>
                  <Badge tone="attention">5 items</Badge>
                </InlineStack>
                <Divider />
                <InlineStack gap="200">
                  <Icon source={ClockIcon} />
                  <Text tone="subdued" as="p">
                    Last updated: 2 minutes ago
                  </Text>
                </InlineStack>
              </VerticalStack>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default Dashboard