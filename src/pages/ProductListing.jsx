import React, { useState } from 'react'
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
} from '@shopify/polaris'
import { SearchIcon, FilterIcon, PlusIcon, EditIcon, DeleteIcon } from '@shopify/polaris-icons'

const ProductListing = () => {
  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState([])
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC')
  const [queryValue, setQueryValue] = useState(null)
  const [page, setPage] = useState(1)

  // Mock product data
  const products = [
    {
      id: '1',
      title: 'Classic T-Shirt',
      vendor: 'Apparel Co',
      status: 'active',
      inventory: 150,
      price: '$29.99',
      type: 'Clothing',
      image: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
      dateModified: '2024-01-15'
    },
    {
      id: '2',
      title: 'Denim Jeans',
      vendor: 'Fashion Brand',
      status: 'active',
      inventory: 85,
      price: '$89.99',
      type: 'Clothing',
      image: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
      dateModified: '2024-01-14'
    },
    {
      id: '3',
      title: 'Leather Wallet',
      vendor: 'Accessories Inc',
      status: 'draft',
      inventory: 0,
      price: '$49.99',
      type: 'Accessories',
      image: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
      dateModified: '2024-01-13'
    },
    {
      id: '4',
      title: 'Wireless Headphones',
      vendor: 'Tech Gear',
      status: 'active',
      inventory: 45,
      price: '$199.99',
      type: 'Electronics',
      image: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
      dateModified: '2024-01-12'
    },
    {
      id: '5',
      title: 'Coffee Mug',
      vendor: 'Home Goods',
      status: 'archived',
      inventory: 200,
      price: '$14.99',
      type: 'Home & Garden',
      image: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
      dateModified: '2024-01-11'
    }
  ]

  const sortOptions = [
    {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
    {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
    {label: 'Title A-Z', value: 'ALPHABETICAL_ASC'},
    {label: 'Title Z-A', value: 'ALPHABETICAL_DESC'},
    {label: 'Highest price', value: 'PRICE_DESC'},
    {label: 'Lowest price', value: 'PRICE_ASC'},
  ]

  const statusFilters = [
    {key: 'active', label: 'Active'},
    {key: 'draft', label: 'Draft'},
    {key: 'archived', label: 'Archived'},
  ]

  const inventoryFilters = [
    {key: 'in_stock', label: 'In stock'},
    {key: 'out_of_stock', label: 'Out of stock'},
    {key: 'low_stock', label: 'Low stock'},
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
  ]

  const appliedFilters = []

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

  const getInventoryBadge = (inventory) => {
    if (inventory === 0) return <Badge tone="critical">Out of stock</Badge>
    if (inventory < 10) return <Badge tone="warning">Low stock</Badge>
    return <Badge tone="success">{inventory} in stock</Badge>
  }

  const rowMarkup = products.map(
    ({id, title, vendor, status, inventory, price, type, image}, index) => (
      <ResourceList.Item
        id={id}
        key={id}
        accessibilityLabel={`View details for ${title}`}
      >
        <InlineStack gap="400" align="center">
          <Thumbnail
            source={image}
            size="small"
            alt={title}
          />
          <BlockStack gap="200">
            <Text variant="bodyMd" fontWeight="semibold" as="h3">
              {title}
            </Text>
            <Text tone="subdued" as="p">
              {vendor} • {type}
            </Text>
          </BlockStack>
        </InlineStack>
        <InlineStack gap="200">
          {getStatusBadge(status)}
          {getInventoryBadge(inventory)}
        </InlineStack>
        <Text variant="bodyMd" fontWeight="medium" as="span">
          {price}
        </Text>
        <InlineStack gap="200">
          <Button variant="plain" icon={EditIcon} />
          <Button variant="plain" icon={DeleteIcon} />
        </InlineStack>
      </ResourceList.Item>
    ),
  )

  const emptyStateMarkup = (
    <EmptyState
      heading="No products found"
      action={{content: 'Add product'}}
      image="https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg"
    >
      <p>Get started by adding your first product.</p>
    </EmptyState>
  )

  return (
    <Page
      title="Products"
      subtitle="Manage your product catalog"
      primaryAction={{
        content: 'Add product',
        icon: PlusIcon,
        onAction: () => console.log('Add product clicked'),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <BlockStack gap="400">
                <InlineStack gap="400">
                  <TextField
                    placeholder="Search products"
                    value={queryValue}
                    onChange={handleSearchChange}
                    onBlur={handleSearchBlur}
                    prefix={<Icon source={SearchIcon} />}
                    autoComplete="off"
                  />
                  <Select
                    options={sortOptions}
                    value={sortValue}
                    onChange={setSortValue}
                    label="Sort by"
                    labelHidden
                  />
                </InlineStack>

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

        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={products}
              renderItem={({id, title, vendor, status, inventory, price, type, image}) => (
                <ResourceList.Item
                  id={id}
                  key={id}
                  accessibilityLabel={`View details for ${title}`}
                >
                  <div style={{ padding: 'var(--p-space-4) var(--p-space-6)' }}>
                    <InlineStack gap="400" align="center" blockAlign="center">
                      <Thumbnail
                        source={image}
                        size="small"
                        alt={title}
                      />
                      <div style={{ flex: 1 }}>
                        <BlockStack gap="100">
                          <Text variant="bodyMd" fontWeight="semibold" as="h3">
                            {title}
                          </Text>
                          <Text tone="subdued" as="p">
                            {vendor} • {type}
                          </Text>
                        </BlockStack>
                      </div>
                      <InlineStack gap="200">
                        {getStatusBadge(status)}
                        {getInventoryBadge(inventory)}
                      </InlineStack>
                      <Text variant="bodyMd" fontWeight="medium" as="span">
                        {price}
                      </Text>
                      <InlineStack gap="200">
                        <Button variant="plain" icon={EditIcon} />
                        <Button variant="plain" icon={DeleteIcon} />
                      </InlineStack>
                    </InlineStack>
                  </div>
                </ResourceList.Item>
              )}
              emptyState={emptyStateMarkup}
              showHeader
              selectable
              selectedItems={selected}
              onSelectionChange={setSelected}
            />
          </Card>
        </Layout.Section>

        <Layout.Section>
          <div style={{ textAlign: 'center' }}>
            <Pagination
              label={`Page ${page} of 10`}
              hasPrevious={page > 1}
              onPrevious={() => setPage(page - 1)}
              hasNext={page < 10}
              onNext={() => setPage(page + 1)}
            />
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default ProductListing