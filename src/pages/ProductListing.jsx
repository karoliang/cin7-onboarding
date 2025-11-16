import React, { useState, useCallback, useMemo } from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Button,
  TextField,
  Select,
  Badge,
  Icon,
  DataTable,
  Pagination,
  Filters,
  ResourceList,
  Avatar,
  Thumbnail,
  InlineStack,
  BlockStack,
  Grid,
  EmptyState,
  Modal,
  OptionList,
  Tabs,
  IndexTable,
  useIndexResourceState,
  Spinner,
  Banner,
  Popover,
  ActionList,
} from '@shopify/polaris'
import { useNavigate } from 'react-router-dom'
import {
  SearchIcon,
  FilterIcon,
  PlusIcon,
  EditIcon,
  DeleteIcon,
  InventoryIcon,
  PackageIcon,
  AlertTriangleIcon,
  ImportIcon,
  ExportIcon,
  AdjustIcon,
  TransferIcon,
  BarcodeIcon,
  LocationIcon,
} from '@shopify/polaris-icons'
import InventoryStatus from '../components/InventoryStatus'
import InventoryImportExport from '../components/InventoryImportExport'

const ProductListing = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState([])
  const [sortValue, setSortValue] = useState('INVENTORY_DESC')
  const [queryValue, setQueryValue] = useState('')
  const [page, setPage] = useState(1)
  const [selectedTab, setSelectedTab] = useState(0)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [transferModalActive, setTransferModalActive] = useState(false)
  const [adjustmentModalActive, setAdjustmentModalActive] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('all')

  // Mock inventory locations
  const locations = [
    { id: 'all', name: 'All Locations', totalProducts: 5 },
    { id: 'loc_1', name: 'Main Warehouse', totalProducts: 5 },
    { id: 'loc_2', name: 'East Coast Store', totalProducts: 3 },
    { id: 'loc_3', name: 'West Coast Store', totalProducts: 4 },
  ]

  // Enhanced product data with inventory details
  const products = [
    {
      id: '1',
      title: 'Classic T-Shirt',
      vendor: 'Apparel Co',
      status: 'active',
      sku: 'TSH-001',
      barcode: '1234567890123',
      price: 29.99,
      type: 'Clothing',
      image: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
      dateModified: '2024-01-15',
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
          { locationId: 'loc_1', locationName: 'Main Warehouse', quantity: 100, reorderPoint: 20 },
          { locationId: 'loc_2', locationName: 'East Coast Store', quantity: 30, reorderPoint: 5 },
          { locationId: 'loc_3', locationName: 'West Coast Store', quantity: 20, reorderPoint: 5 }
        ]
      }
    },
    {
      id: '2',
      title: 'Denim Jeans',
      vendor: 'Fashion Brand',
      status: 'active',
      sku: 'JEA-002',
      barcode: '2345678901234',
      price: 89.99,
      type: 'Clothing',
      image: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
      dateModified: '2024-01-14',
      inventory: {
        total: 85,
        available: 75,
        committed: 10,
        onOrder: 25,
        reorderPoint: 25,
        maxStock: 150,
        averageCost: 45.00,
        totalValue: 3825.00,
        locations: [
          { locationId: 'loc_1', locationName: 'Main Warehouse', quantity: 60, reorderPoint: 15 },
          { locationId: 'loc_2', locationName: 'East Coast Store', quantity: 15, reorderPoint: 5 },
          { locationId: 'loc_3', locationName: 'West Coast Store', quantity: 10, reorderPoint: 5 }
        ]
      }
    },
    {
      id: '3',
      title: 'Leather Wallet',
      vendor: 'Accessories Inc',
      status: 'active',
      sku: 'WAL-003',
      barcode: '3456789012345',
      price: 49.99,
      type: 'Accessories',
      image: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
      dateModified: '2024-01-13',
      inventory: {
        total: 0,
        available: 0,
        committed: 0,
        onOrder: 100,
        reorderPoint: 15,
        maxStock: 100,
        averageCost: 25.00,
        totalValue: 0.00,
        locations: [
          { locationId: 'loc_1', locationName: 'Main Warehouse', quantity: 0, reorderPoint: 10 },
          { locationId: 'loc_2', locationName: 'East Coast Store', quantity: 0, reorderPoint: 5 }
        ]
      }
    },
    {
      id: '4',
      title: 'Wireless Headphones',
      vendor: 'Tech Gear',
      status: 'active',
      sku: 'HEA-004',
      barcode: '4567890123456',
      price: 199.99,
      type: 'Electronics',
      image: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
      dateModified: '2024-01-12',
      inventory: {
        total: 45,
        available: 35,
        committed: 10,
        onOrder: 20,
        reorderPoint: 20,
        maxStock: 80,
        averageCost: 120.00,
        totalValue: 5400.00,
        locations: [
          { locationId: 'loc_1', locationName: 'Main Warehouse', quantity: 30, reorderPoint: 15 },
          { locationId: 'loc_3', locationName: 'West Coast Store', quantity: 15, reorderPoint: 5 }
        ]
      }
    },
    {
      id: '5',
      title: 'Coffee Mug',
      vendor: 'Home Goods',
      status: 'active',
      sku: 'MUG-005',
      barcode: '5678901234567',
      price: 14.99,
      type: 'Home & Garden',
      image: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
      dateModified: '2024-01-11',
      inventory: {
        total: 200,
        available: 185,
        committed: 15,
        onOrder: 0,
        reorderPoint: 50,
        maxStock: 250,
        averageCost: 8.00,
        totalValue: 1600.00,
        locations: [
          { locationId: 'loc_1', locationName: 'Main Warehouse', quantity: 120, reorderPoint: 30 },
          { locationId: 'loc_2', locationName: 'East Coast Store', quantity: 40, reorderPoint: 10 },
          { locationId: 'loc_3', locationName: 'West Coast Store', quantity: 40, reorderPoint: 10 }
        ]
      }
    }
  ]

  // Enhanced sort options for inventory
  const sortOptions = [
    { label: 'Most inventory', value: 'INVENTORY_DESC' },
    { label: 'Least inventory', value: 'INVENTORY_ASC' },
    { label: 'Highest value', value: 'VALUE_DESC' },
    { label: 'Lowest value', value: 'VALUE_ASC' },
    { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
    { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
    { label: 'Title A-Z', value: 'ALPHABETICAL_ASC' },
    { label: 'Title Z-A', value: 'ALPHABETICAL_DESC' },
    { label: 'SKU A-Z', value: 'SKU_ASC' },
    { label: 'Highest price', value: 'PRICE_DESC' },
    { label: 'Lowest price', value: 'PRICE_ASC' },
  ]

  const statusFilters = [
    { key: 'active', label: 'Active' },
    { key: 'draft', label: 'Draft' },
    { key: 'archived', label: 'Archived' },
  ]

  const inventoryFilters = [
    { key: 'in_stock', label: 'In stock' },
    { key: 'out_of_stock', label: 'Out of stock' },
    { key: 'low_stock', label: 'Low stock' },
    { key: 'overstocked', label: 'Overstocked' },
  ]

  const locationFilters = locations.map(loc => ({
    key: loc.id,
    label: loc.name,
  }))

  const productTypeFilters = [
    { key: 'clothing', label: 'Clothing' },
    { key: 'electronics', label: 'Electronics' },
    { key: 'accessories', label: 'Accessories' },
    { key: 'home', label: 'Home & Garden' },
  ]

  // Tab configuration
  const tabs = [
    {
      id: 'all',
      content: 'All Products',
      panelID: 'all-products-panel',
    },
    {
      id: 'low-stock',
      content: 'Low Stock',
      panelID: 'low-stock-panel',
      badge: products.filter(p => p.inventory.available <= p.inventory.reorderPoint && p.inventory.available > 0).length,
    },
    {
      id: 'out-of-stock',
      content: 'Out of Stock',
      panelID: 'out-of-stock-panel',
      badge: products.filter(p => p.inventory.available === 0).length,
    },
    {
      id: 'overstocked',
      content: 'Overstocked',
      panelID: 'overstocked-panel',
      badge: products.filter(p => p.inventory.total >= p.inventory.maxStock * 0.9).length,
    },
  ]

  const filters = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <Select
          label="Status"
          options={statusFilters}
          onChange={() => {}}
          value=""
          labelHidden
        />
      ),
    },
    {
      key: 'inventory',
      label: 'Inventory',
      filter: (
        <Select
          label="Inventory"
          options={inventoryFilters}
          onChange={() => {}}
          value=""
          labelHidden
        />
      ),
    },
    {
      key: 'location',
      label: 'Location',
      filter: (
        <Select
          label="Location"
          options={locationFilters}
          onChange={() => {}}
          value=""
          labelHidden
        />
      ),
    },
    {
      key: 'type',
      label: 'Product Type',
      filter: (
        <Select
          label="Product Type"
          options={productTypeFilters}
          onChange={() => {}}
          value=""
          labelHidden
        />
      ),
    },
  ]

  const appliedFilters = []

  // Filter products based on selected tab and filters
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Apply tab filtering
    const currentTab = tabs[selectedTab]
    if (currentTab.id === 'low-stock') {
      filtered = filtered.filter(p =>
        p.inventory.available > 0 && p.inventory.available <= p.inventory.reorderPoint
      )
    } else if (currentTab.id === 'out-of-stock') {
      filtered = filtered.filter(p => p.inventory.available === 0)
    } else if (currentTab.id === 'overstocked') {
      filtered = filtered.filter(p => p.inventory.total >= p.inventory.maxStock * 0.9)
    }

    // Apply search filtering
    if (queryValue) {
      const searchLower = queryValue.toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchLower) ||
        p.sku.toLowerCase().includes(searchLower) ||
        p.vendor.toLowerCase().includes(searchLower) ||
        p.type.toLowerCase().includes(searchLower)
      )
    }

    // Apply location filtering
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(p =>
        p.inventory.locations.some(loc => loc.locationId === selectedLocation)
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortValue) {
        case 'INVENTORY_DESC':
          return b.inventory.available - a.inventory.available
        case 'INVENTORY_ASC':
          return a.inventory.available - b.inventory.available
        case 'VALUE_DESC':
          return b.inventory.totalValue - a.inventory.totalValue
        case 'VALUE_ASC':
          return a.inventory.totalValue - b.inventory.totalValue
        case 'DATE_MODIFIED_DESC':
          return new Date(b.dateModified) - new Date(a.dateModified)
        case 'DATE_MODIFIED_ASC':
          return new Date(a.dateModified) - new Date(b.dateModified)
        case 'ALPHABETICAL_ASC':
          return a.title.localeCompare(b.title)
        case 'ALPHABETICAL_DESC':
          return b.title.localeCompare(a.title)
        case 'SKU_ASC':
          return a.sku.localeCompare(b.sku)
        case 'PRICE_DESC':
          return b.price - a.price
        case 'PRICE_ASC':
          return a.price - b.price
        default:
          return 0
      }
    })

    return filtered
  }, [products, selectedTab, queryValue, selectedLocation, sortValue])

  const handleFiltersChange = (filters) => {
    console.log('Filters changed:', filters)
  }

  const handleSearchChange = (value) => {
    setQueryValue(value)
  }

  const handleSearch = () => {
    setSearchValue(queryValue)
  }

  const handleSearchBlur = () => {
    handleSearch()
  }

  const handleTabChange = (selectedTabIndex) => {
    setSelectedTab(selectedTabIndex)
  }

  const handleLocationChange = (value) => {
    setSelectedLocation(value)
  }

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on ${selected.length} items`)
    if (action === 'transfer') {
      setTransferModalActive(true)
    } else if (action === 'adjust') {
      setAdjustmentModalActive(true)
    }
  }

  const handleRowClick = (id) => {
    navigate(`/inventory/${id}`)
  }

  const resourceName = {
    singular: 'product',
    plural: 'products',
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { tone: 'success', content: 'Active' },
      draft: { tone: 'attention', content: 'Draft' },
      archived: { tone: 'warning', content: 'Archived' }
    }
    const config = statusMap[status] || statusMap.draft
    return <Badge {...config} />
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  
  const tableHeadings = [
    { title: 'Product' },
    { title: 'SKU' },
    { title: 'Inventory Status' },
    { title: 'Available' },
    { title: 'Committed' },
    { title: 'Value' },
    { title: 'Price' },
    { title: 'Status' },
  ]

  // Calculate inventory summary stats
  const inventoryStats = useMemo(() => {
    const totalValue = products.reduce((sum, p) => sum + p.inventory.totalValue, 0)
    const lowStockCount = products.filter(p =>
      p.inventory.available > 0 && p.inventory.available <= p.inventory.reorderPoint
    ).length
    const outOfStockCount = products.filter(p => p.inventory.available === 0).length
    const totalAvailable = products.reduce((sum, p) => sum + p.inventory.available, 0)

    return {
      totalValue,
      lowStockCount,
      outOfStockCount,
      totalAvailable,
      totalProducts: products.length
    }
  }, [products])

  return (
    <Page
      title="Cin7 Core - Inventory Management"
      subtitle="Track stock levels, manage locations, and optimize inventory"
      primaryAction={{
        content: 'Adjust Stock',
        icon: AdjustIcon,
        onAction: () => setAdjustmentModalActive(true),
      }}
      secondaryActions={[
        <InventoryImportExport
          onImport={(results) => console.log('Import completed:', results)}
          onExport={(data) => console.log('Export completed:', data)}
        />
      ]}
      className="cin7-page-header"
    >
      <Layout>
        {/* Inventory Summary Cards */}
        <Layout.Section>
          <Grid columns={{ xs: 1, sm: 2, md: 4 }}>
            <Card className="cin7-enhanced-card">
              <BlockStack gap="200">
                <Text variant="bodySm" tone="subdued">Total Value</Text>
                <Text variant="heading2xl" as="h2" className="cin7-page-title">
                  {formatCurrency(inventoryStats.totalValue)}
                </Text>
              </BlockStack>
            </Card>
            <Card className="cin7-enhanced-card">
              <BlockStack gap="200">
                <Text variant="bodySm" tone="subdued">Total Available</Text>
                <Text variant="heading2xl" as="h2" className="cin7-page-title">
                  {inventoryStats.totalAvailable.toLocaleString()}
                </Text>
              </BlockStack>
            </Card>
            <Card className="cin7-enhanced-card">
              <BlockStack gap="200">
                <InlineStack gap="200" align="center">
                  <Text variant="bodySm" tone="subdued">Low Stock</Text>
                  <Badge tone="warning">{inventoryStats.lowStockCount}</Badge>
                </InlineStack>
                <Text variant="heading2xl" as="h2" tone="warning" className="cin7-page-title">
                  {inventoryStats.lowStockCount}
                </Text>
              </BlockStack>
            </Card>
            <Card className="cin7-enhanced-card">
              <BlockStack gap="200">
                <InlineStack gap="200" align="center">
                  <Text variant="bodySm" tone="subdued">Out of Stock</Text>
                  <Badge tone="critical">{inventoryStats.outOfStockCount}</Badge>
                </InlineStack>
                <Text variant="heading2xl" as="h2" tone="critical" className="cin7-page-title">
                  {inventoryStats.outOfStockCount}
                </Text>
              </BlockStack>
            </Card>
          </Grid>
        </Layout.Section>

        {/* Filters and Controls */}
        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <BlockStack gap="400">
                <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
                  <div style={{ padding: 'var(--p-space-4) 0' }}>
                    <InlineStack gap="400" align="center">
                      <TextField
                        placeholder="Search products, SKUs, or vendors..."
                        value={queryValue}
                        onChange={handleSearchChange}
                        onBlur={handleSearchBlur}
                        prefix={<Icon source={SearchIcon} />}
                        autoComplete="off"
                        connectedLeft={
                          <Select
                            options={locationFilters}
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            label="Location"
                            labelHidden
                          />
                        }
                        connectedRight={
                          <Select
                            options={sortOptions}
                            value={sortValue}
                            onChange={(value) => setSortValue(value)}
                            label="Sort by"
                            labelHidden
                          />
                        }
                      />
                    </InlineStack>
                  </div>
                </Tabs>

                <Filters
                  queryValue={queryValue}
                  filters={filters}
                  appliedFilters={appliedFilters}
                  onFiltersChange={handleFiltersChange}
                  onQueryChange={handleSearchChange}
                  onQueryBlur={handleSearchBlur}
                  filterAction={{
                    label: 'Filter',
                    icon: FilterIcon,
                  }}
                />
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>

        {/* Inventory Table */}
        <Layout.Section>
          <Card>
            <IndexTable
              resourceName={resourceName}
              itemCount={filteredProducts.length}
              headings={tableHeadings}
              selectable
              onRowClick={handleRowClick}
              promotedBulkActions={[
                {
                  content: 'Transfer stock',
                  icon: TransferIcon,
                  onAction: () => handleBulkAction('transfer'),
                },
                {
                  content: 'Adjust stock',
                  icon: AdjustIcon,
                  onAction: () => handleBulkAction('adjust'),
                },
                {
                  content: 'Print barcodes',
                  icon: BarcodeIcon,
                  onAction: () => handleBulkAction('barcode'),
                },
              ]}
            >
              {filteredProducts.map((product, index) => (
                <IndexTable.Row
                  id={product.id}
                  key={product.id}
                  position={index}
                  selected={selected.includes(product.id)}
                >
                  <IndexTable.Cell>
                    <InlineStack gap="300" align="center">
                      <Thumbnail
                        source="https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg"
                        size="small"
                        alt={product.title}
                      />
                      <BlockStack gap="100">
                        <Text variant="bodyMd" fontWeight="semibold" as="span">
                          {product.title}
                        </Text>
                        <Text variant="bodySm" tone="subdued" as="span">
                          SKU: {product.sku}
                        </Text>
                      </BlockStack>
                    </InlineStack>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <Text variant="bodyMd" as="span">{product.sku}</Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <InventoryStatus
                      quantity={product.inventory.available}
                      reorderPoint={product.inventory.reorderPoint}
                      maxStock={product.inventory.maxStock}
                      showText={true}
                      showTooltip={true}
                    />
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <Text variant="bodyMd" as="span">{product.inventory.available}</Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <Text variant="bodyMd" as="span">{product.inventory.committed}</Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <Text variant="bodyMd" as="span">
                      {formatCurrency(product.inventory.totalValue)}
                    </Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <Text variant="bodyMd" as="span">
                      {formatCurrency(product.price)}
                    </Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    {getStatusBadge(product.status)}
                  </IndexTable.Cell>
                </IndexTable.Row>
              ))}
            </IndexTable>
          </Card>
        </Layout.Section>

        {/* Pagination */}
        <Layout.Section>
          <div style={{ textAlign: 'center' }}>
            <Pagination
              label={`Page ${page} of ${Math.ceil(filteredProducts.length / 20) || 1}`}
              hasPrevious={page > 1}
              onPrevious={() => setPage(page - 1)}
              hasNext={page < Math.ceil(filteredProducts.length / 20)}
              onNext={() => setPage(page + 1)}
            />
          </div>
        </Layout.Section>
      </Layout>

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
        <div style={{ padding: 'var(--p-space-5)' }}>
          <BlockStack gap="400">
            <Text as="p">
              Transfer stock from one location to another. Select the products, quantity, and destination location.
            </Text>
            <Select
              label="From Location"
              options={locations.filter(l => l.id !== 'all')}
              onChange={() => {}}
              value=""
            />
            <Select
              label="To Location"
              options={locations.filter(l => l.id !== 'all')}
              onChange={() => {}}
              value=""
            />
          </BlockStack>
        </div>
      </Modal>

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
        <div style={{ padding: 'var(--p-space-5)' }}>
          <BlockStack gap="400">
            <Text as="p">
              Make manual adjustments to inventory levels. Select products and specify adjustment quantities.
            </Text>
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
    </Page>
  )
}

export default ProductListing