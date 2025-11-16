import React, { useState, useMemo } from 'react'
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
  TextField,
  Pagination,
  InlineStack,
  BlockStack,
  Modal,
  FormLayout,
  DatePicker,
  Checkbox,
  ButtonGroup,
  Popover,
  ActionList,
  Divider
} from '@shopify/polaris'
import {
  SearchIcon,
  PlusIcon,
  FilterIcon,
  ImportIcon,
  ViewIcon,
  EditIcon,
  DeleteIcon,
  CalendarIcon,
  CashDollarIcon
} from '@shopify/polaris-icons'
import { useNavigate } from 'react-router-dom'
import OrderStatus, { PaymentStatus, FulfillmentStatus } from '../components/OrderStatus'

const SalesOrders = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrders, setSelectedOrders] = useState([])
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [createOrderVisible, setCreateOrderVisible] = useState(false)

  const [filters, setFilters] = useState({
    status: [],
    paymentStatus: [],
    fulfillmentStatus: [],
    dateFrom: null,
    dateTo: null,
    totalMin: '',
    totalMax: '',
    source: []
  })

  // Mock order data
  const [orders] = useState([
    {
      id: '1',
      orderNumber: '#1001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      status: 'delivered',
      paymentStatus: 'paid',
      fulfillmentStatus: 'fulfilled',
      total: 125.99,
      currency: 'USD',
      createdAt: '2024-01-15T10:30:00Z',
      itemCount: 3,
      source: 'online'
    },
    {
      id: '2',
      orderNumber: '#1002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      status: 'processing',
      paymentStatus: 'paid',
      fulfillmentStatus: 'unfulfilled',
      total: 89.99,
      currency: 'USD',
      createdAt: '2024-01-15T09:15:00Z',
      itemCount: 2,
      source: 'pos'
    },
    {
      id: '3',
      orderNumber: '#1003',
      customerName: 'Bob Johnson',
      customerEmail: 'bob@example.com',
      status: 'shipped',
      paymentStatus: 'paid',
      fulfillmentStatus: 'fulfilled',
      total: 256.50,
      currency: 'USD',
      createdAt: '2024-01-14T16:45:00Z',
      itemCount: 5,
      source: 'online'
    },
    {
      id: '4',
      orderNumber: '#1004',
      customerName: 'Alice Brown',
      customerEmail: 'alice@example.com',
      status: 'pending',
      paymentStatus: 'pending',
      fulfillmentStatus: 'unfulfilled',
      total: 45.99,
      currency: 'USD',
      createdAt: '2024-01-14T14:20:00Z',
      itemCount: 1,
      source: 'phone'
    },
    {
      id: '5',
      orderNumber: '#1005',
      customerName: 'Charlie Wilson',
      customerEmail: 'charlie@example.com',
      status: 'cancelled',
      paymentStatus: 'refunded',
      fulfillmentStatus: 'restocked',
      total: 178.00,
      currency: 'USD',
      createdAt: '2024-01-13T11:10:00Z',
      itemCount: 4,
      source: 'online'
    }
  ])

  const ordersPerPage = 10

  const filteredOrders = useMemo(() => {
    let filtered = [...orders]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply status filters
    if (filters.status.length > 0) {
      filtered = filtered.filter(order => filters.status.includes(order.status))
    }

    if (filters.paymentStatus.length > 0) {
      filtered = filtered.filter(order => filters.paymentStatus.includes(order.paymentStatus))
    }

    if (filters.fulfillmentStatus.length > 0) {
      filtered = filtered.filter(order => filters.fulfillmentStatus.includes(order.fulfillmentStatus))
    }

    // Apply date filters
    if (filters.dateFrom) {
      filtered = filtered.filter(order => new Date(order.createdAt) >= filters.dateFrom)
    }

    if (filters.dateTo) {
      filtered = filtered.filter(order => new Date(order.createdAt) <= filters.dateTo)
    }

    // Apply total filters
    if (filters.totalMin) {
      filtered = filtered.filter(order => order.total >= parseFloat(filters.totalMin))
    }

    if (filters.totalMax) {
      filtered = filtered.filter(order => order.total <= parseFloat(filters.totalMax))
    }

    // Apply source filters
    if (filters.source.length > 0) {
      filtered = filtered.filter(order => filters.source.includes(order.source))
    }

    return filtered
  }, [orders, searchQuery, filters])

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ordersPerPage
    return filteredOrders.slice(startIndex, startIndex + ordersPerPage)
  }, [filteredOrders, currentPage])

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleOrderSelect = (orderId, selected) => {
    if (selected) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId))
    }
  }

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action}`, selectedOrders)
    // Implement bulk actions logic
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const clearFilters = () => {
    setFilters({
      status: [],
      paymentStatus: [],
      fulfillmentStatus: [],
      dateFrom: null,
      dateTo: null,
      totalMin: '',
      totalMax: '',
      source: []
    })
    setCurrentPage(1)
  }

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0
    return value !== null && value !== '' && value !== undefined
  }).length

  const tableRows = paginatedOrders.map(order => [
    <Checkbox
      checked={selectedOrders.includes(order.id)}
      onChange={(checked) => handleOrderSelect(order.id, checked)}
      label={`Select order ${order.orderNumber}`}
      labelHidden
    />,
    <Button
      variant="plain"
      onClick={() => navigate(`/sales/orders/${order.id}`)}
    >
      {order.orderNumber}
    </Button>,
    order.customerName,
    formatCurrency(order.total, order.currency),
    <OrderStatus status={order.status} />,
    <PaymentStatus status={order.paymentStatus} />,
    <FulfillmentStatus status={order.fulfillmentStatus} />,
    <Badge>{order.itemCount} items</Badge>,
    formatDate(order.createdAt),
    <ButtonGroup>
      <Button
        icon={ViewIcon}
        variant="plain"
        onClick={() => navigate(`/sales/orders/${order.id}`)}
      />
      <Button
        icon={EditIcon}
        variant="plain"
        onClick={() => console.log('Edit order:', order.id)}
      />
      <Button
        icon={DeleteIcon}
        variant="plain"
        tone="critical"
        onClick={() => console.log('Delete order:', order.id)}
      />
    </ButtonGroup>
  ])

  return (
    <Page
      title="Sales Orders"
      subtitle="Manage and track all customer orders"
      primaryAction={{
        content: 'Create order',
        icon: PlusIcon,
        onAction: () => setCreateOrderVisible(true)
      }}
      secondaryActions={[
        {
          content: 'Export',
          icon: ImportIcon,
          onAction: () => console.log('Export orders')
        }
      ]}
    >
      <Layout>
        {/* Search and Filters */}
        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <BlockStack gap="400">
                <InlineStack gap="400" align="space-between">
                  <div style={{ flex: 1 }}>
                    <TextField
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={setSearchQuery}
                      prefix={<Icon source={SearchIcon} />}
                      clearButton
                      onClearButtonClick={() => setSearchQuery('')}
                    />
                  </div>
                  <Popover
                    active={filtersVisible}
                    activator={
                      <Button
                        icon={FilterIcon}
                        onClick={() => setFiltersVisible(!filtersVisible)}
                        disclosure
                      >
                        Filters
                        {activeFiltersCount > 0 && (
                          <Badge>{activeFiltersCount}</Badge>
                        )}
                      </Button>
                    }
                    onClose={() => setFiltersVisible(false)}
                  >
                    <div style={{ padding: 'var(--p-space-400)', minWidth: '300px' }}>
                      <BlockStack gap="400">
                        <Text variant="headingMd" as="h3">Filter Orders</Text>

                        <FormLayout>
                          <Select
                            label="Order Status"
                            options={[
                              { label: 'All statuses', value: '' },
                              { label: 'Pending', value: 'pending' },
                              { label: 'Confirmed', value: 'confirmed' },
                              { label: 'Processing', value: 'processing' },
                              { label: 'Shipped', value: 'shipped' },
                              { label: 'Delivered', value: 'delivered' },
                              { label: 'Cancelled', value: 'cancelled' }
                            ]}
                            value={filters.status}
                            onChange={(value) => handleFilterChange('status', value)}
                            multiple
                          />

                          <Select
                            label="Payment Status"
                            options={[
                              { label: 'All payment statuses', value: '' },
                              { label: 'Pending', value: 'pending' },
                              { label: 'Authorized', value: 'authorized' },
                              { label: 'Paid', value: 'paid' },
                              { label: 'Partially Paid', value: 'partially_paid' },
                              { label: 'Refunded', value: 'refunded' }
                            ]}
                            value={filters.paymentStatus}
                            onChange={(value) => handleFilterChange('paymentStatus', value)}
                            multiple
                          />

                          <Select
                            label="Fulfillment Status"
                            options={[
                              { label: 'All fulfillment statuses', value: '' },
                              { label: 'Unfulfilled', value: 'unfulfilled' },
                              { label: 'Partially Fulfilled', value: 'partially_fulfilled' },
                              { label: 'Fulfilled', value: 'fulfilled' },
                              { label: 'Restocked', value: 'restocked' }
                            ]}
                            value={filters.fulfillmentStatus}
                            onChange={(value) => handleFilterChange('fulfillmentStatus', value)}
                            multiple
                          />

                          <Select
                            label="Source"
                            options={[
                              { label: 'All sources', value: '' },
                              { label: 'Online', value: 'online' },
                              { label: 'POS', value: 'pos' },
                              { label: 'Phone', value: 'phone' },
                              { label: 'Email', value: 'email' },
                              { label: 'Manual', value: 'manual' }
                            ]}
                            value={filters.source}
                            onChange={(value) => handleFilterChange('source', value)}
                            multiple
                          />

                          <InlineStack gap="400">
                            <div style={{ flex: 1 }}>
                              <TextField
                                label="Min Total"
                                type="number"
                                value={filters.totalMin}
                                onChange={(value) => handleFilterChange('totalMin', value)}
                                prefix="$"
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <TextField
                                label="Max Total"
                                type="number"
                                value={filters.totalMax}
                                onChange={(value) => handleFilterChange('totalMax', value)}
                                prefix="$"
                              />
                            </div>
                          </InlineStack>

                          <ButtonGroup>
                            <Button onClick={clearFilters}>Clear filters</Button>
                            <Button primary onClick={() => setFiltersVisible(false)}>
                              Apply filters
                            </Button>
                          </ButtonGroup>
                        </FormLayout>
                      </BlockStack>
                    </div>
                  </Popover>
                </InlineStack>

                {/* Bulk Actions */}
                {selectedOrders.length > 0 && (
                  <InlineStack gap="400" align="space-between">
                    <Text as="p">
                      {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected
                    </Text>
                    <ButtonGroup>
                      <Button onClick={() => handleBulkAction('fulfill')}>Fulfill selected</Button>
                      <Button onClick={() => handleBulkAction('cancel')}>Cancel selected</Button>
                      <Button onClick={() => handleBulkAction('export')}>Export selected</Button>
                    </ButtonGroup>
                  </InlineStack>
                )}
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>

        {/* Orders Table */}
        <Layout.Section>
          <Card>
            <DataTable
              columnContentTypes={[
                'checkbox',
                'text',
                'text',
                'numeric',
                'text',
                'text',
                'text',
                'numeric',
                'text',
                'text'
              ]}
              headings={[
                '',
                'Order',
                'Customer',
                'Total',
                'Status',
                'Payment',
                'Fulfillment',
                'Items',
                'Date',
                'Actions'
              ]}
              rows={tableRows}
              footerContent={
                filteredOrders.length > ordersPerPage && (
                  <div style={{ padding: 'var(--p-space-4) 0' }}>
                    <Pagination
                      label={`Page ${currentPage} of ${totalPages}`}
                      hasPrevious={currentPage > 1}
                      onPrevious={() => setCurrentPage(currentPage - 1)}
                      hasNext={currentPage < totalPages}
                      onNext={() => setCurrentPage(currentPage + 1)}
                    />
                  </div>
                )
              }
            />
          </Card>
        </Layout.Section>

        {/* Order Stats */}
        <Layout.Section variant="oneThird">
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2" marginBottom="400">
                Order Summary
              </Text>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text as="p">Total Orders</Text>
                  <Text as="p" fontWeight="semibold">
                    {filteredOrders.length}
                  </Text>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text as="p">Total Revenue</Text>
                  <Text as="p" fontWeight="semibold">
                    {formatCurrency(
                      filteredOrders.reduce((sum, order) => sum + order.total, 0)
                    )}
                  </Text>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text as="p">Average Order Value</Text>
                  <Text as="p" fontWeight="semibold">
                    {formatCurrency(
                      filteredOrders.length > 0
                        ? filteredOrders.reduce((sum, order) => sum + order.total, 0) / filteredOrders.length
                        : 0
                    )}
                  </Text>
                </InlineStack>
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>
      </Layout>

      {/* Create Order Modal */}
      <Modal
        open={createOrderVisible}
        onClose={() => setCreateOrderVisible(false)}
        title="Create New Order"
        primaryAction={{
          content: 'Create order',
          onAction: () => {
            console.log('Creating order...')
            setCreateOrderVisible(false)
          }
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setCreateOrderVisible(false)
          }
        ]}
      >
        <div style={{ padding: 'var(--p-space-6)' }}>
          <Text as="p">
            Order creation form will be implemented here with customer selection, product selection, and order details.
          </Text>
        </div>
      </Modal>
    </Page>
  )
}

export default SalesOrders