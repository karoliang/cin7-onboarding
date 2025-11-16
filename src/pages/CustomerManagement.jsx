import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    ResourceList,
  Avatar,
  InlineStack,
  BlockStack,
  Grid,
  EmptyState,
  Modal,
  Checkbox,
  Banner,
  Divider,
} from '@shopify/polaris'
import {
  SearchIcon,
  FilterIcon,
  PlusIcon,
  EditIcon,
  DeleteIcon,
  ViewIcon,
  EmailIcon,
  PhoneIcon,
  CashDollarIcon,
  ClockIcon,
  PersonIcon,
  ExportIcon,
  ImportIcon,
  LabelPrinterIcon,
} from '@shopify/polaris-icons'
import { CustomerStatus, CustomerTier, CustomerSegment } from '../types/customer'

const CustomerManagement = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState([])
  const [sortValue, setSortValue] = useState('CREATED_DESC')
  const [queryValue, setQueryValue] = useState(null)
  const [page, setPage] = useState(1)
  const [bulkModalOpen, setBulkModalOpen] = useState(false)
  const [selectedBulkAction, setSelectedBulkAction] = useState('')

  // Mock customer data
  const customers = [
    {
      id: '1',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Doe Enterprises',
      phone: '+1 555-0123',
      status: CustomerStatus.ACTIVE,
      tier: CustomerTier.PREMIUM,
      segment: CustomerSegment.LOYAL,
      createdAt: new Date('2023-06-15'),
      updatedAt: new Date('2024-01-15'),
      lastOrderDate: new Date('2024-01-10'),
      totalOrders: 24,
      totalSpent: 3542.89,
      averageOrderValue: 147.62,
      lifetimeValue: 3542.89,
      tags: ['vip', 'repeat', 'wholesale'],
      notes: 'Prefers email communication',
      avatar: 'https://picsum.photos/seed/john/40/40'
    },
    {
      id: '2',
      email: 'jane.smith@company.com',
      firstName: 'Jane',
      lastName: 'Smith',
      company: 'Smith Corp',
      phone: '+1 555-0124',
      status: CustomerStatus.ACTIVE,
      tier: CustomerTier.STANDARD,
      segment: CustomerSegment.REPEAT,
      createdAt: new Date('2023-08-22'),
      updatedAt: new Date('2024-01-12'),
      lastOrderDate: new Date('2024-01-08'),
      totalOrders: 15,
      totalSpent: 1245.50,
      averageOrderValue: 83.03,
      lifetimeValue: 1245.50,
      tags: ['repeat'],
      notes: 'Regular customer',
      avatar: 'https://picsum.photos/seed/jane/40/40'
    },
    {
      id: '3',
      email: 'robert.johnson@email.com',
      firstName: 'Robert',
      lastName: 'Johnson',
      company: '',
      phone: '+1 555-0125',
      status: CustomerStatus.PROSPECT,
      tier: CustomerTier.STANDARD,
      segment: CustomerSegment.NEW,
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2024-01-14'),
      lastOrderDate: null,
      totalOrders: 0,
      totalSpent: 0,
      averageOrderValue: 0,
      lifetimeValue: 0,
      tags: ['prospect'],
      notes: 'Interested in wholesale pricing',
      avatar: 'https://picsum.photos/seed/robert/40/40'
    },
    {
      id: '4',
      email: 'alice.brown@business.com',
      firstName: 'Alice',
      lastName: 'Brown',
      company: 'Brown Industries',
      phone: '+1 555-0126',
      status: CustomerStatus.ACTIVE,
      tier: CustomerTier.VIP,
      segment: CustomerSegment.VIP,
      createdAt: new Date('2023-03-10'),
      updatedAt: new Date('2024-01-13'),
      lastOrderDate: new Date('2024-01-11'),
      totalOrders: 67,
      totalSpent: 12456.78,
      averageOrderValue: 185.92,
      lifetimeValue: 12456.78,
      tags: ['vip', 'high-value', 'enterprise'],
      notes: 'Key account - priority support',
      avatar: 'https://picsum.photos/seed/alice/40/40'
    },
    {
      id: '5',
      email: 'charlie.wilson@startup.io',
      firstName: 'Charlie',
      lastName: 'Wilson',
      company: 'Wilson Tech',
      phone: '+1 555-0127',
      status: CustomerStatus.INACTIVE,
      tier: CustomerTier.STANDARD,
      segment: CustomerSegment.AT_RISK,
      createdAt: new Date('2023-05-15'),
      updatedAt: new Date('2023-11-20'),
      lastOrderDate: new Date('2023-10-15'),
      totalOrders: 8,
      totalSpent: 456.32,
      averageOrderValue: 57.04,
      lifetimeValue: 456.32,
      tags: ['at-risk'],
      notes: 'No recent purchases - re-engagement needed',
      avatar: 'https://picsum.photos/seed/charlie/40/40'
    }
  ]

  const sortOptions = [
    {label: 'Newest first', value: 'CREATED_DESC'},
    {label: 'Oldest first', value: 'CREATED_ASC'},
    {label: 'Name A-Z', value: 'ALPHABETICAL_ASC'},
    {label: 'Name Z-A', value: 'ALPHABETICAL_DESC'},
    {label: 'Total spent: High to low', value: 'TOTAL_SPENT_DESC'},
    {label: 'Total spent: Low to high', value: 'TOTAL_SPENT_ASC'},
    {label: 'Orders: High to low', value: 'ORDERS_DESC'},
    {label: 'Orders: Low to high', value: 'ORDERS_ASC'},
    {label: 'Last order: Recent first', value: 'LAST_ORDER_DESC'},
    {label: 'Last order: Oldest first', value: 'LAST_ORDER_ASC'},
  ]

  
  const bulkActions = [
    {
      content: 'Export customers',
      icon: ExportIcon,
      onAction: () => handleBulkAction('export')
    },
    {
      content: 'Add tags',
      icon: LabelPrinterIcon,
      onAction: () => handleBulkAction('tag')
    },
    {
      content: 'Update segment',
      onAction: () => handleBulkAction('segment')
    },
    {
      content: 'Send email',
      icon: EmailIcon,
      onAction: () => handleBulkAction('email')
    }
  ]

  
  const handleSearchChange = (value) => {
    setQueryValue(value)
  }

  const handleSearch = () => {
    setSearchValue(queryValue)
  }

  const handleSearchBlur = () => {
    handleSearch()
  }

  const handleBulkAction = (action) => {
    setSelectedBulkAction(action)
    setBulkModalOpen(true)
  }

  const handleCustomerClick = (customerId) => {
    navigate(`/customers/${customerId}`)
  }

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
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

  const rowMarkup = customers.map(
    ({id, firstName, lastName, email, company, phone, status, tier, segment, totalOrders, totalSpent, lastOrderDate, avatar}) => (
      <ResourceList.Item
        id={id}
        key={id}
        accessibilityLabel={`View details for ${firstName} ${lastName}`}
        onClick={() => handleCustomerClick(id)}
      >
        <div style={{ padding: 'var(--p-space-4) var(--p-space-6)' }}>
          <InlineStack gap="400" align="center" blockAlign="center">
            <Avatar
              source={avatar}
              name={`${firstName} ${lastName}`}
              size="medium"
            />
            <div style={{ flex: 1 }}>
              <BlockStack gap="100">
                <Text variant="bodyMd" fontWeight="semibold" as="h3">
                  {firstName} {lastName}
                </Text>
                <InlineStack gap="200">
                  <Text tone="subdued" as="p">
                    {email}
                  </Text>
                  {company && (
                    <>
                      <Text tone="subdued">•</Text>
                      <Text tone="subdued">{company}</Text>
                    </>
                  )}
                </InlineStack>
              </BlockStack>
            </div>
            <InlineStack gap="200">
              {getStatusBadge(status)}
              {getTierBadge(tier)}
              {getSegmentBadge(segment)}
            </InlineStack>
            <BlockStack gap="100" align="end">
              <Text variant="bodyMd" fontWeight="medium" as="span">
                {formatCurrency(totalSpent)}
              </Text>
              <Text tone="subdued" as="p">
                {totalOrders} orders
              </Text>
            </BlockStack>
            <BlockStack gap="100" align="end">
              <Text variant="bodySm" as="span">
                {formatDate(lastOrderDate)}
              </Text>
              <Text tone="subdued" as="p">
                Last order
              </Text>
            </BlockStack>
            <InlineStack gap="200">
              <Button variant="plain" icon={ViewIcon} />
              <Button variant="plain" icon={EditIcon} />
            </InlineStack>
          </InlineStack>
        </div>
      </ResourceList.Item>
    ),
  )

  const emptyStateMarkup = (
    <EmptyState
      heading="No customers found"
      action={{content: 'Add customer', icon: PlusIcon}}
      image="https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg"
    >
      <p>Get started by adding your first customer.</p>
    </EmptyState>
  )

  const bulkModalMarkup = selectedBulkAction === 'export' ? (
    <Modal
      open={bulkModalOpen}
      onClose={() => setBulkModalOpen(false)}
      title="Export customers"
      primaryAction={{
        content: 'Export',
        onAction: () => {
          console.log('Exporting customers:', selected)
          setBulkModalOpen(false)
        }
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => setBulkModalOpen(false)
        }
      ]}
    >
      <div style={{ padding: 'var(--p-space-6)' }}>
        <Text as="p">
          Export {selected.length} selected customers to CSV format.
        </Text>
        <div style={{marginTop: 'var(--p-space-400)'}}>
          <Checkbox
            label="Include order history"
            checked={false}
            onChange={() => {}}
          />
          <Checkbox
            label="Include customer analytics"
            checked={false}
            onChange={() => {}}
          />
        </div>
      </div>
    </Modal>
  ) : (
    <Modal
      open={bulkModalOpen}
      onClose={() => setBulkModalOpen(false)}
      title={`Bulk ${selectedBulkAction}`}
      primaryAction={{
        content: 'Apply',
        onAction: () => {
          console.log(`Applying ${selectedBulkAction} to:`, selected)
          setBulkModalOpen(false)
        }
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => setBulkModalOpen(false)
        }
      ]}
    >
      <div style={{ padding: 'var(--p-space-6)' }}>
        <Text as="p">
          Apply {selectedBulkAction} to {selected.length} selected customers.
        </Text>
      </div>
    </Modal>
  )

  return (
    <Page
      title="Customer Management"
      subtitle="Manage your customer relationships and data"
      primaryAction={{
        content: 'Add customer',
        icon: PlusIcon,
        onAction: () => navigate('/customers/new'),
      }}
      secondaryActions={[
        {
          content: 'Import customers',
          icon: ImportIcon,
          onAction: () => console.log('Import customers clicked'),
        }
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <BlockStack gap="400">
                <InlineStack gap="400">
                  <TextField
                    placeholder="Search customers by name, email, or company"
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
                  <Button
                    icon={FilterIcon}
                    onClick={() => console.log('Filters clicked')}
                  >
                    Filter
                  </Button>
                </InlineStack>
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>

        {selected.length > 0 && (
          <Layout.Section>
            <Banner title={`${selected.length} customers selected`} tone="info">
              <InlineStack gap="200">
                {bulkActions.map((action, index) => (
                  <Button key={index} variant="plain" {...action}>
                    {action.content}
                  </Button>
                ))}
                <Button
                  variant="plain"
                  tone="critical"
                  onClick={() => setSelected([])}
                >
                  Clear selection
                </Button>
              </InlineStack>
            </Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={customers}
              renderItem={rowMarkup}
              emptyState={emptyStateMarkup}
              showHeader
              selectable
              selectedItems={selected}
              onSelectionChange={setSelected}
              bulkActions={bulkActions}
            />
          </Card>
        </Layout.Section>

        <Layout.Section>
          <div style={{ textAlign: 'center' }}>
            <Pagination
              label={`Page ${page} of ${Math.ceil(customers.length / 20)}`}
              hasPrevious={page > 1}
              onPrevious={() => setPage(page - 1)}
              hasNext={page < Math.ceil(customers.length / 20)}
              onNext={() => setPage(page + 1)}
            />
          </div>
        </Layout.Section>
      </Layout>

      {bulkModalMarkup}
    </Page>
  )
}

export default CustomerManagement