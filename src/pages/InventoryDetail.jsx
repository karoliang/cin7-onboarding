import React, { useState, useMemo } from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Button,
  Badge,
  Icon,
  DataTable,
  Pagination,
  Tabs,
  BlockStack,
  InlineStack,
  Grid,
  Select,
  TextField,
  Banner,
  Modal,
  ResourceList,
  Thumbnail,
} from '@shopify/polaris'
import {
  InventoryIcon,
  TransferIcon,
  AdjustIcon,
  ClockIcon,
  LocationIcon,
  PackageIcon,
  AlertTriangleIcon,
  PlusIcon,
  EditIcon,
  BarcodeIcon,
} from '@shopify/polaris-icons'
import { useParams, useNavigate } from 'react-router-dom'
import InventoryStatus from '../components/InventoryStatus'

const InventoryDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [adjustmentModalActive, setAdjustmentModalActive] = useState(false)
  const [transferModalActive, setTransferModalActive] = useState(false)
  const [page, setPage] = useState(1)

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: id || '1',
    title: 'Classic T-Shirt',
    vendor: 'Apparel Co',
    sku: 'TSH-001',
    barcode: '1234567890123',
    price: 29.99,
    cost: 15.50,
    type: 'Clothing',
    image: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
    description: 'Premium quality cotton t-shirt with comfortable fit',
    inventory: {
      total: 150,
      available: 125,
      committed: 25,
      onOrder: 50,
      reorderPoint: 30,
      maxStock: 200,
      averageCost: 15.50,
      totalValue: 2325.00,
      locations: [
        {
          locationId: 'loc_1',
          locationName: 'Main Warehouse',
          quantity: 100,
          reorderPoint: 20,
          maxStock: 150,
          lastUpdated: '2024-01-15T10:30:00Z',
          bins: [
            { binId: 'bin_001', binName: 'A-1-1', quantity: 50 },
            { binId: 'bin_002', binName: 'A-1-2', quantity: 30 },
            { binId: 'bin_003', binName: 'A-2-1', quantity: 20 },
          ]
        },
        {
          locationId: 'loc_2',
          locationName: 'East Coast Store',
          quantity: 30,
          reorderPoint: 5,
          maxStock: 50,
          lastUpdated: '2024-01-14T15:45:00Z',
          bins: [
            { binId: 'bin_101', binName: 'B-1-1', quantity: 20 },
            { binId: 'bin_102', binName: 'B-1-2', quantity: 10 },
          ]
        },
        {
          locationId: 'loc_3',
          locationName: 'West Coast Store',
          quantity: 20,
          reorderPoint: 5,
          maxStock: 40,
          lastUpdated: '2024-01-13T09:20:00Z',
          bins: [
            { binId: 'bin_201', binName: 'C-1-1', quantity: 15 },
            { binId: 'bin_202', binName: 'C-1-2', quantity: 5 },
          ]
        }
      ]
    }
  }

  // Mock stock movements data
  const stockMovements = [
    {
      id: 'mov_001',
      type: 'IN',
      quantity: 50,
      location: 'Main Warehouse',
      bin: 'A-1-1',
      reference: 'PO-2024-001',
      notes: 'New stock arrival from supplier',
      cost: 15.50,
      user: 'John Smith',
      createdAt: '2024-01-15T10:30:00Z',
      balance: 125
    },
    {
      id: 'mov_002',
      type: 'OUT',
      quantity: 15,
      location: 'Main Warehouse',
      bin: 'A-1-1',
      reference: 'SO-2024-045',
      notes: 'Customer order fulfillment',
      user: 'Jane Doe',
      createdAt: '2024-01-14T14:20:00Z',
      balance: 75
    },
    {
      id: 'mov_003',
      type: 'TRANSFER',
      quantity: 30,
      location: 'Main Warehouse',
      bin: 'A-1-2',
      reference: 'TRANSFER-2024-001',
      notes: 'Transfer to East Coast Store',
      user: 'Bob Johnson',
      createdAt: '2024-01-13T11:45:00Z',
      balance: 90,
      destination: 'East Coast Store'
    },
    {
      id: 'mov_004',
      type: 'ADJUSTMENT',
      quantity: -5,
      location: 'East Coast Store',
      bin: 'B-1-1',
      reference: 'ADJ-2024-003',
      notes: 'Damaged items written off',
      user: 'Alice Brown',
      createdAt: '2024-01-12T16:30:00Z',
      balance: 30
    },
    {
      id: 'mov_005',
      type: 'IN',
      quantity: 25,
      location: 'West Coast Store',
      bin: 'C-1-1',
      reference: 'RETURN-2024-012',
      notes: 'Customer returns processed',
      user: 'Charlie Wilson',
      createdAt: '2024-01-11T13:15:00Z',
      balance: 20
    }
  ]

  const tabs = [
    {
      id: 'overview',
      content: 'Overview',
      panelID: 'overview-panel',
    },
    {
      id: 'movements',
      content: 'Stock Movements',
      panelID: 'movements-panel',
    },
    {
      id: 'locations',
      content: 'Locations',
      panelID: 'locations-panel',
    },
    {
      id: 'analytics',
      content: 'Analytics',
      panelID: 'analytics-panel',
    },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getMovementTypeBadge = (type) => {
    const typeConfig = {
      IN: { tone: 'success', icon: PlusIcon, label: 'Stock In' },
      OUT: { tone: 'critical', icon: PackageIcon, label: 'Stock Out' },
      TRANSFER: { tone: 'attention', icon: TransferIcon, label: 'Transfer' },
      ADJUSTMENT: { tone: 'warning', icon: AdjustIcon, label: 'Adjustment' },
      RETURN: { tone: 'info', icon: PackageIcon, label: 'Return' }
    }
    const config = typeConfig[type] || typeConfig.ADJUSTMENT
    return <Badge {...config}>{config.label}</Badge>
  }

  const filteredMovements = useMemo(() => {
    let filtered = [...stockMovements]
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(m => m.location === selectedLocation)
    }
    return filtered
  }, [selectedLocation, stockMovements])

  const locationOptions = [
    { label: 'All Locations', value: 'all' },
    ...product.inventory.locations.map(loc => ({
      label: loc.locationName,
      value: loc.locationId
    }))
  ]

  const movementTableRows = filteredMovements.map(movement => [
    getMovementTypeBadge(movement.type),
    <Text variant="bodyMd" as="span">{movement.quantity > 0 ? '+' : ''}{movement.quantity}</Text>,
    movement.location,
    movement.bin || '-',
    movement.reference || '-',
    movement.notes,
    formatCurrency(Math.abs(movement.quantity * product.averageCost)),
    <Text variant="bodySm" as="span">{formatDate(movement.createdAt)}</Text>,
    movement.user,
  ])

  const handleTabChange = (selectedTabIndex) => {
    setSelectedTab(selectedTabIndex)
  }

  const renderOverviewTab = () => (
    <Layout>
      <Layout.Section>
        <Grid columns={{ xs: 1, sm: 2, md: 4 }}>
          <Card>
            <BlockStack gap="200">
              <Text variant="bodySm" tone="subdued">Total Stock</Text>
              <Text variant="heading2xl" as="h2">{product.inventory.total}</Text>
              <Text variant="bodySm" as="p">across {product.inventory.locations.length} locations</Text>
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap="200">
              <Text variant="bodySm" tone="subdued">Available</Text>
              <Text variant="heading2xl" as="h2">{product.inventory.available}</Text>
              <InventoryStatus
                quantity={product.inventory.available}
                reorderPoint={product.inventory.reorderPoint}
                showText={false}
              />
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap="200">
              <Text variant="bodySm" tone="subdued">Committed</Text>
              <Text variant="heading2xl" as="h2">{product.inventory.committed}</Text>
              <Text variant="bodySm" as="p">Reserved for orders</Text>
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap="200">
              <Text variant="bodySm" tone="subdued">Total Value</Text>
              <Text variant="heading2xl" as="h2">{formatCurrency(product.inventory.totalValue)}</Text>
              <Text variant="bodySm" as="p">Avg cost: {formatCurrency(product.inventory.averageCost)}</Text>
            </BlockStack>
          </Card>
        </Grid>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <Card title="Product Information">
          <BlockStack gap="400">
            <div style={{ textAlign: 'center' }}>
              <Thumbnail
                source={product.image}
                size="large"
                alt={product.title}
              />
            </div>
            <BlockStack gap="200">
              <Text variant="headingLg" as="h3">{product.title}</Text>
              <Text variant="bodyMd" tone="subdued">{product.vendor}</Text>
              <InlineStack gap="200">
                <Text variant="bodySm" tone="subdued">SKU:</Text>
                <Text variant="bodySm" as="span">{product.sku}</Text>
              </InlineStack>
              <InlineStack gap="200">
                <Text variant="bodySm" tone="subdued">Barcode:</Text>
                <Text variant="bodySm" as="span">{product.barcode}</Text>
              </InlineStack>
              <InlineStack gap="200">
                <Text variant="bodySm" tone="subdued">Type:</Text>
                <Text variant="bodySm" as="span">{product.type}</Text>
              </InlineStack>
            </BlockStack>
          </BlockStack>
        </Card>
      </Layout.Section>

      <Layout.Section variant="twoThirds">
        <Card title="Location Breakdown">
          <BlockStack gap="400">
            {product.inventory.locations.map(location => (
              <div key={location.locationId} style={{
                padding: 'var(--p-space-400)',
                border: '1px solid var(--p-color-border)',
                borderRadius: 'var(--p-border-radius-200)'
              }}>
                <InlineStack gap="400" align="center" blockAlign="center">
                  <div style={{ flex: 1 }}>
                    <Text variant="headingMd" as="h4">{location.locationName}</Text>
                    <Text variant="bodySm" tone="subdued">
                      Last updated: {formatDate(location.lastUpdated)}
                    </Text>
                  </div>
                  <InventoryStatus
                    quantity={location.quantity}
                    reorderPoint={location.reorderPoint}
                    maxStock={location.maxStock}
                    showTooltip={true}
                  />
                  <Text variant="headingSm" as="span">
                    {location.quantity} units
                  </Text>
                </InlineStack>
                <div style={{ marginTop: 'var(--p-space-200)' }}>
                  <InlineStack gap="200" wrap>
                    {location.bins?.map(bin => (
                      <div key={bin.binId} style={{
                        padding: 'var(--p-space-200) var(--p-space-300)',
                        backgroundColor: 'var(--p-color-bg-surface-secondary)',
                        borderRadius: 'var(--p-border-radius-200)'
                      }}>
                        <Text variant="bodySm" as="p">
                          {bin.binName}: {bin.quantity}
                        </Text>
                      </div>
                    ))}
                  </InlineStack>
                </div>
              </div>
            ))}
          </BlockStack>
        </Card>
      </Layout.Section>
    </Layout>
  )

  const renderMovementsTab = () => (
    <Layout>
      <Layout.Section>
        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <InlineStack gap="400" align="space-between" blockAlign="center">
              <InlineStack gap="400">
                <Select
                  label="Filter by location"
                  options={locationOptions}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  labelHidden
                />
                <Button
                  icon={TransferIcon}
                  onClick={() => setTransferModalActive(true)}
                >
                  Transfer Stock
                </Button>
                <Button
                  icon={AdjustIcon}
                  onClick={() => setAdjustmentModalActive(true)}
                >
                  Adjust Stock
                </Button>
              </InlineStack>
            </InlineStack>
          </div>

          <DataTable
            columnContentTypes={[
              'text',
              'numeric',
              'text',
              'text',
              'text',
              'text',
              'numeric',
              'text',
              'text',
            ]}
            headings={[
              'Type',
              'Quantity',
              'Location',
              'Bin',
              'Reference',
              'Notes',
              'Value',
              'Date',
              'User',
            ]}
            rows={movementTableRows}
          />
        </Card>
      </Layout.Section>

      <Layout.Section>
        <div style={{ textAlign: 'center' }}>
          <Pagination
            label={`Page ${page} of ${Math.ceil(filteredMovements.length / 20) || 1}`}
            hasPrevious={page > 1}
            onPrevious={() => setPage(page - 1)}
            hasNext={page < Math.ceil(filteredMovements.length / 20)}
            onNext={() => setPage(page + 1)}
          />
        </div>
      </Layout.Section>
    </Layout>
  )

  const renderLocationsTab = () => (
    <Layout>
      <Layout.Section>
        <Card>
          <BlockStack gap="400">
            {product.inventory.locations.map(location => (
              <Card key={location.locationId}>
                <div style={{ padding: 'var(--p-space-6)' }}>
                  <BlockStack gap="400">
                    <InlineStack gap="400" align="space-between" blockAlign="center">
                      <Text variant="headingMd" as="h3">{location.locationName}</Text>
                      <InlineStack gap="200">
                        <Button icon={EditIcon} variant="plain">Edit</Button>
                        <Button icon={TransferIcon} variant="plain">Transfer</Button>
                      </InlineStack>
                    </InlineStack>

                    <Grid columns={{ xs: 1, sm: 3 }}>
                      <BlockStack gap="200">
                        <Text variant="bodySm" tone="subdued">Current Stock</Text>
                        <Text variant="headingLg" as="h4">{location.quantity}</Text>
                      </BlockStack>
                      <BlockStack gap="200">
                        <Text variant="bodySm" tone="subdued">Reorder Point</Text>
                        <Text variant="headingLg" as="h4">{location.reorderPoint}</Text>
                      </BlockStack>
                      <BlockStack gap="200">
                        <Text variant="bodySm" tone="subdued">Max Capacity</Text>
                        <Text variant="headingLg" as="h4">{location.maxStock}</Text>
                      </BlockStack>
                    </Grid>

                    {location.bins && (
                      <BlockStack gap="200">
                        <Text variant="bodyMd" fontWeight="semibold">Bin Locations</Text>
                        <Grid columns={{ xs: 1, sm: 2, md: 3 }}>
                          {location.bins.map(bin => (
                            <div key={bin.binId} style={{
                              padding: 'var(--p-space-300)',
                              border: '1px solid var(--p-color-border)',
                              borderRadius: 'var(--p-border-radius-200)',
                              backgroundColor: 'var(--p-color-bg-surface)'
                            }}>
                              <InlineStack gap="200" align="space-between">
                                <Text variant="bodySm" fontWeight="medium">{bin.binName}</Text>
                                <Text variant="bodySm" tone="subdued">{bin.quantity} units</Text>
                              </InlineStack>
                            </div>
                          ))}
                        </Grid>
                      </BlockStack>
                    )}
                  </BlockStack>
                </div>
              </Card>
            ))}
          </BlockStack>
        </Card>
      </Layout.Section>
    </Layout>
  )

  const renderAnalyticsTab = () => (
    <Layout>
      <Layout.Section>
        <Banner
          title="Inventory Analytics"
          status="info"
          onDismiss={() => {}}
        >
          <p>Advanced analytics and insights for this product's inventory performance.</p>
        </Banner>
      </Layout.Section>

      <Layout.Section>
        <Grid columns={{ xs: 1, sm: 2, md: 3 }}>
          <Card title="30-Day Movement">
            <BlockStack gap="200">
              <Text variant="headingLg" as="h3">125 units</Text>
              <Text variant="bodySm" tone="subdued">Total stock movements in last 30 days</Text>
            </BlockStack>
          </Card>
          <Card title="Average Days in Stock">
            <BlockStack gap="200">
              <Text variant="headingLg" as="h3">45 days</Text>
              <Text variant="bodySm" tone="subdued">Average time inventory stays in stock</Text>
            </BlockStack>
          </Card>
          <Card title="Turnover Rate">
            <BlockStack gap="200">
              <Text variant="headingLg" as="h3">8.1x/year</Text>
              <Text variant="bodySm" tone="subdued">How quickly inventory is sold and replaced</Text>
            </BlockStack>
          </Card>
        </Grid>
      </Layout.Section>

      <Layout.Section>
        <Card title="Seasonal Trends">
          <BlockStack gap="400">
            <Text variant="bodyMd" as="p">
              Historical inventory levels and seasonal patterns for better forecasting.
            </Text>
            <div style={{
              height: '200px',
              backgroundColor: 'var(--p-color-bg-surface)',
              borderRadius: 'var(--p-border-radius-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text variant="bodyMd" tone="subdued">
                📊 Analytics chart would be displayed here
              </Text>
            </div>
          </BlockStack>
        </Card>
      </Layout.Section>
    </Layout>
  )

  const renderTabContent = () => {
    const currentTab = tabs[selectedTab]
    switch (currentTab.id) {
      case 'overview':
        return renderOverviewTab()
      case 'movements':
        return renderMovementsTab()
      case 'locations':
        return renderLocationsTab()
      case 'analytics':
        return renderAnalyticsTab()
      default:
        return renderOverviewTab()
    }
  }

  return (
    <Page
      title={product.title}
      subtitle={`SKU: ${product.sku}`}
      breadcrumbs={[
        {
          content: 'Inventory',
          onAction: () => navigate('/inventory'),
        },
      ]}
      primaryAction={{
        content: 'Adjust Stock',
        icon: AdjustIcon,
        onAction: () => setAdjustmentModalActive(true),
      }}
      secondaryActions={[
        {
          content: 'Transfer Stock',
          icon: TransferIcon,
          onAction: () => setTransferModalActive(true),
        },
        {
          content: 'Print Barcode',
          icon: BarcodeIcon,
          onAction: () => console.log('Print barcode'),
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
              <div style={{ marginTop: 'var(--p-space-6)' }}>
                {renderTabContent()}
              </div>
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>

      {/* Stock Adjustment Modal */}
      <Modal
        open={adjustmentModalActive}
        onClose={() => setAdjustmentModalActive(false)}
        title="Adjust Stock"
        primaryAction={{
          content: 'Adjust',
          onAction: () => setAdjustmentModalActive(false),
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setAdjustmentModalActive(false),
          },
        ]}
      >
        <div style={{ padding: 'var(--p-space-6)' }}>
          <BlockStack gap="400">
            <TextField
              label="Location"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Select location"
            />
            <TextField
              label="Adjustment Type"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Increase/Decrease/Set"
            />
            <TextField
              label="Quantity"
              type="number"
              value=""
              onChange={() => {}}
              placeholder="Enter quantity"
            />
            <TextField
              label="Reason"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Enter adjustment reason"
              multiline={3}
            />
          </BlockStack>
        </div>
      </Modal>

      {/* Stock Transfer Modal */}
      <Modal
        open={transferModalActive}
        onClose={() => setTransferModalActive(false)}
        title="Transfer Stock"
        primaryAction={{
          content: 'Transfer',
          onAction: () => setTransferModalActive(false),
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setTransferModalActive(false),
          },
        ]}
      >
        <div style={{ padding: 'var(--p-space-6)' }}>
          <BlockStack gap="400">
            <Select
              label="From Location"
              options={locationOptions.filter(l => l.value !== 'all')}
              onChange={() => {}}
              value=""
            />
            <Select
              label="To Location"
              options={locationOptions.filter(l => l.value !== 'all')}
              onChange={() => {}}
              value=""
            />
            <TextField
              label="Quantity"
              type="number"
              value=""
              onChange={() => {}}
              placeholder="Enter quantity to transfer"
            />
            <TextField
              label="Notes"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Enter transfer notes"
              multiline={3}
            />
          </BlockStack>
        </div>
      </Modal>
    </Page>
  )
}

export default InventoryDetail