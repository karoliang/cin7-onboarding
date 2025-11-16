import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
  Tabs,
  Avatar,
  InlineStack,
  BlockStack,
  Grid,
  ButtonGroup,
  Divider,
  Scrollable,
  Modal,
  TextContainer,
  Banner,
  IndexTable,
} from '@shopify/polaris'
import {
  EditIcon,
  DeleteIcon,
  ArrowLeftIcon,
  EmailIcon,
  PhoneIcon,
  DollarDiscountIcon,
  ClockIcon,
  PersonIcon,
  NoteIcon,
  OrderIcon,
  TagIcon,
  AnalyticsIcon,
  SettingsIcon,
  PlusIcon,
  ExportIcon,
  PrintIcon,
} from '@shopify/polaris-icons'
import { CustomerStatus, CustomerTier, CustomerSegment } from '../types/customer'

const CustomerDetail = () => {
  const { customerId } = useParams()
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState(0)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  // Mock customer data
  const customer = {
    id: customerId || '1',
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
    notes: 'Prefers email communication. Key account with regular monthly orders.',
    avatar: 'https://picsum.photos/seed/john/80/80',
    addresses: [
      {
        id: '1',
        type: 'shipping',
        firstName: 'John',
        lastName: 'Doe',
        company: 'Doe Enterprises',
        address1: '123 Business Ave',
        address2: 'Suite 456',
        city: 'New York',
        province: 'NY',
        country: 'United States',
        postalCode: '10001',
        phone: '+1 555-0123',
        isDefault: true
      },
      {
        id: '2',
        type: 'billing',
        firstName: 'John',
        lastName: 'Doe',
        company: 'Doe Enterprises',
        address1: '456 Billing Street',
        address2: '',
        city: 'New York',
        province: 'NY',
        country: 'United States',
        postalCode: '10002',
        phone: '+1 555-0124',
        isDefault: true
      }
    ]
  }

  // Mock order history
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-10',
      status: 'Delivered',
      total: 234.50,
      items: 3,
      paymentStatus: 'Paid'
    },
    {
      id: 'ORD-002',
      date: '2023-12-28',
      status: 'Delivered',
      total: 156.25,
      items: 2,
      paymentStatus: 'Paid'
    },
    {
      id: 'ORD-003',
      date: '2023-12-15',
      status: 'Processing',
      total: 412.99,
      items: 5,
      paymentStatus: 'Paid'
    }
  ]

  // Mock communication logs
  const communications = [
    {
      id: '1',
      type: 'email',
      direction: 'outbound',
      subject: 'Order Confirmation - ORD-003',
      content: 'Your order has been confirmed and is being processed.',
      date: '2024-01-10',
      createdBy: 'System'
    },
    {
      id: '2',
      type: 'phone',
      direction: 'inbound',
      subject: 'Product Inquiry',
      content: 'Customer called to ask about product availability.',
      date: '2024-01-08',
      createdBy: 'Support Team'
    }
  ]

  // Mock analytics data
  const analytics = {
    purchaseFrequency: 2.4, // orders per month
    averageTimeBetweenOrders: 12, // days
    churnRisk: 0.15, // 15% risk
    engagementScore: 85,
    satisfactionScore: 4.5, // out of 5
    predictedNextOrder: new Date('2024-02-05'),
    customerHealthScore: 92
  }

  const tabs = [
    {
      id: 'overview',
      content: 'Overview',
      panelID: 'overview-content',
    },
    {
      id: 'orders',
      content: 'Order History',
      panelID: 'orders-content',
    },
    {
      id: 'communications',
      content: 'Communications',
      panelID: 'communications-content',
    },
    {
      id: 'analytics',
      content: 'Analytics',
      panelID: 'analytics-content',
    },
    {
      id: 'addresses',
      content: 'Addresses',
      panelID: 'addresses-content',
    }
  ]

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

  const getOrderStatusBadge = (status) => {
    const statusMap = {
      'Delivered': { tone: 'success' },
      'Processing': { tone: 'attention' },
      'Pending': { tone: 'warning' },
      'Cancelled': { tone: 'critical' }
    }
    const config = statusMap[status] || statusMap['Pending']
    return <Badge {...config}>{status}</Badge>
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const handleDeleteCustomer = () => {
    console.log('Deleting customer:', customer.id)
    setDeleteModalOpen(false)
    navigate('/customers')
  }

  const renderOverviewTab = () => (
    <Layout>
      <Layout.Section variant="oneThird">
        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <BlockStack gap="400">
              <InlineStack align="center" gap="400">
                <Avatar
                  source={customer.avatar}
                  name={`${customer.firstName} ${customer.lastName}`}
                  size="extraLarge"
                />
                <BlockStack gap="200">
                  <Text variant="headingLg" as="h2">
                    {customer.firstName} {customer.lastName}
                  </Text>
                  {customer.company && (
                    <Text variant="bodyMd" as="p" tone="subdued">
                      {customer.company}
                    </Text>
                  )}
                  <InlineStack gap="200">
                    {getStatusBadge(customer.status)}
                    {getTierBadge(customer.tier)}
                    {getSegmentBadge(customer.segment)}
                  </InlineStack>
                </BlockStack>
              </InlineStack>

              <Divider />

              <BlockStack gap="300">
                <InlineStack gap="200">
                  <Icon source={EmailIcon} tone="base" />
                  <Text>{customer.email}</Text>
                </InlineStack>
                {customer.phone && (
                  <InlineStack gap="200">
                    <Icon source={PhoneIcon} tone="base" />
                    <Text>{customer.phone}</Text>
                  </InlineStack>
                )}
                <InlineStack gap="200">
                  <Icon source={ClockIcon} tone="base" />
                  <Text>Joined {formatDate(customer.createdAt)}</Text>
                </InlineStack>
              </BlockStack>

              <Divider />

              <BlockStack gap="200">
                <Text variant="headingMd" as="h3">Customer Value</Text>
                <Text variant="headingLg" as="p">
                  {formatCurrency(customer.lifetimeValue)}
                </Text>
                <Text tone="subdued" as="p">
                  Lifetime value across {customer.totalOrders} orders
                </Text>
              </BlockStack>
            </BlockStack>
          </div>
        </Card>

        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <Text variant="headingMd" as="h3" marginBottom="400">
              Quick Actions
            </Text>
            <BlockStack gap="200">
              <Button fullWidth onClick={() => console.log('Create order clicked')}>
                Create new order
              </Button>
              <Button fullWidth onClick={() => console.log('Send email clicked')}>
                Send email
              </Button>
              <Button fullWidth onClick={() => console.log('Make call clicked')}>
                Make call
              </Button>
              <Button fullWidth onClick={() => console.log('Add note clicked')}>
                Add note
              </Button>
            </BlockStack>
          </div>
        </Card>
      </Layout.Section>

      <Layout.Section>
        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <Text variant="headingMd" as="h3" marginBottom="400">
              Customer Overview
            </Text>
            <Grid columns={{ xs: 1, sm: 2, lg: 4 }}>
              <BlockStack gap="200">
                <Text tone="subdued" as="p">Total Orders</Text>
                <Text variant="headingLg" as="p">{customer.totalOrders}</Text>
              </BlockStack>
              <BlockStack gap="200">
                <Text tone="subdued" as="p">Average Order Value</Text>
                <Text variant="headingLg" as="p">{formatCurrency(customer.averageOrderValue)}</Text>
              </BlockStack>
              <BlockStack gap="200">
                <Text tone="subdued" as="p">Last Order</Text>
                <Text variant="headingLg" as="p">{formatDate(customer.lastOrderDate)}</Text>
              </BlockStack>
              <BlockStack gap="200">
                <Text tone="subdued" as="p">Customer Health</Text>
                <Text variant="headingLg" as="p">{analytics.customerHealthScore}%</Text>
              </BlockStack>
            </Grid>
          </div>
        </Card>

        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <Text variant="headingMd" as="h3" marginBottom="400">
              Customer Tags
            </Text>
            <InlineStack gap="200" wrap>
              {customer.tags.map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
              <Button variant="plain" icon={PlusIcon}>
                Add tag
              </Button>
            </InlineStack>
          </div>
        </Card>

        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <Text variant="headingMd" as="h3" marginBottom="400">
              Notes
            </Text>
            <Text as="p">{customer.notes}</Text>
            <Button variant="plain" icon={EditIcon}>
              Edit notes
            </Button>
          </div>
        </Card>

        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <Text variant="headingMd" as="h3" marginBottom="400">
              Recent Orders
            </Text>
            <DataTable
              columnContentTypes={['text', 'text', 'text', 'numeric', 'text']}
              headings={['Order ID', 'Date', 'Status', 'Total', 'Items']}
              rows={orders.map(order => [
                order.id,
                formatDate(order.date),
                getOrderStatusBadge(order.status),
                formatCurrency(order.total),
                order.items.toString()
              ])}
            />
            <div style={{ marginTop: 'var(--p-space-400)' }}>
              <Button onClick={() => setSelectedTab(1)}>View all orders</Button>
            </div>
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  )

  const renderOrdersTab = () => (
    <Layout>
      <Layout.Section>
        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <InlineStack align="space-between" marginBottom="400">
              <Text variant="headingMd" as="h3">
                Order History ({orders.length} orders)
              </Text>
              <ButtonGroup>
                <Button icon={ExportIcon}>Export</Button>
                <Button icon={PrintIcon}>Print</Button>
              </ButtonGroup>
            </InlineStack>
            <DataTable
              columnContentTypes={['text', 'text', 'text', 'numeric', 'numeric', 'text']}
              headings={['Order ID', 'Date', 'Status', 'Total', 'Items', 'Payment']}
              rows={orders.map(order => [
                order.id,
                formatDate(order.date),
                getOrderStatusBadge(order.status),
                formatCurrency(order.total),
                order.items.toString(),
                order.paymentStatus
              ])}
            />
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  )

  const renderCommunicationsTab = () => (
    <Layout>
      <Layout.Section>
        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <InlineStack align="space-between" marginBottom="400">
              <Text variant="headingMd" as="h3">
                Communication History ({communications.length} entries)
              </Text>
              <Button icon={PlusIcon}>Add communication</Button>
            </InlineStack>
            <BlockStack gap="400">
              {communications.map((comm, index) => (
                <div key={index} style={{ padding: 'var(--p-space-400)', border: '1px solid var(--p-color-border)', borderRadius: 'var(--p-border-radius-200)' }}>
                  <InlineStack align="space-between" marginBottom="200">
                    <InlineStack gap="200">
                      <Text variant="headingSm" as="h4">
                        {comm.subject}
                      </Text>
                      <Badge tone={comm.direction === 'inbound' ? 'info' : 'success'}>
                        {comm.direction}
                      </Badge>
                    </InlineStack>
                    <Text variant="bodySm" as="p" tone="subdued">
                      {formatDate(comm.date)}
                    </Text>
                  </InlineStack>
                  <Text as="p">{comm.content}</Text>
                  <Text variant="bodySm" as="p" tone="subdued" marginTop="200">
                    By {comm.createdBy} • {comm.type}
                  </Text>
                </div>
              ))}
            </BlockStack>
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  )

  const renderAnalyticsTab = () => (
    <Layout>
      <Layout.Section>
        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <Text variant="headingMd" as="h3" marginBottom="400">
              Customer Analytics
            </Text>
            <Grid columns={{ xs: 1, sm: 2, lg: 3 }}>
              <Card>
                <div style={{ padding: 'var(--p-space-4)' }}>
                  <BlockStack gap="200">
                    <Text tone="subdued" as="p">Purchase Frequency</Text>
                    <Text variant="headingLg" as="p">
                      {analytics.purchaseFrequency} orders/month
                    </Text>
                  </BlockStack>
                </div>
              </Card>
              <Card>
                <div style={{ padding: 'var(--p-space-4)' }}>
                  <BlockStack gap="200">
                    <Text tone="subdued" as="p">Average Time Between Orders</Text>
                    <Text variant="headingLg" as="p">
                      {analytics.averageTimeBetweenOrders} days
                    </Text>
                  </BlockStack>
                </div>
              </Card>
              <Card>
                <div style={{ padding: 'var(--p-space-4)' }}>
                  <BlockStack gap="200">
                    <Text tone="subdued" as="p">Churn Risk</Text>
                    <Text variant="headingLg" as="p">
                      {(analytics.churnRisk * 100).toFixed(0)}%
                    </Text>
                  </BlockStack>
                </div>
              </Card>
              <Card>
                <div style={{ padding: 'var(--p-space-4)' }}>
                  <BlockStack gap="200">
                    <Text tone="subdued" as="p">Engagement Score</Text>
                    <Text variant="headingLg" as="p">
                      {analytics.engagementScore}/100
                    </Text>
                  </BlockStack>
                </div>
              </Card>
              <Card>
                <div style={{ padding: 'var(--p-space-4)' }}>
                  <BlockStack gap="200">
                    <Text tone="subdued" as="p">Satisfaction Score</Text>
                    <Text variant="headingLg" as="p">
                      {analytics.satisfactionScore}/5
                    </Text>
                  </BlockStack>
                </div>
              </Card>
              <Card>
                <div style={{ padding: 'var(--p-space-4)' }}>
                  <BlockStack gap="200">
                    <Text tone="subdued" as="p">Predicted Next Order</Text>
                    <Text variant="headingLg" as="p">
                      {formatDate(analytics.predictedNextOrder)}
                    </Text>
                  </BlockStack>
                </div>
              </Card>
            </Grid>
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  )

  const renderAddressesTab = () => (
    <Layout>
      <Layout.Section>
        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <InlineStack align="space-between" marginBottom="400">
              <Text variant="headingMd" as="h3">
                Customer Addresses
              </Text>
              <Button icon={PlusIcon}>Add address</Button>
            </InlineStack>
            <Grid columns={{ xs: 1, sm: 2 }}>
              {customer.addresses.map((address, index) => (
                <Card key={index}>
                  <div style={{ padding: 'var(--p-space-4)' }}>
                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Text variant="headingSm" as="h4">
                          {address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address
                        </Text>
                        {address.isDefault && (
                          <Badge tone="success">Default</Badge>
                        )}
                      </InlineStack>
                      <Text as="p">
                        {address.firstName} {address.lastName}
                        {address.company && <><br />{address.company}</>}
                        <br />{address.address1}
                        {address.address2 && <><br />{address.address2}</>}
                        <br />{address.city}, {address.province} {address.postalCode}
                        <br />{address.country}
                        {address.phone && <><br />{address.phone}</>}
                      </Text>
                      <InlineStack gap="200">
                        <Button variant="plain" icon={EditIcon}>Edit</Button>
                        {!address.isDefault && (
                          <Button variant="plain" tone="critical" icon={DeleteIcon}>Delete</Button>
                        )}
                      </InlineStack>
                    </BlockStack>
                  </div>
                </Card>
              ))}
            </Grid>
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  )

  return (
    <Page
      title={`${customer.firstName} ${customer.lastName}`}
      subtitle="Customer details and management"
      breadcrumbs={[
        {
          content: 'Customers',
          onAction: () => navigate('/customers')
        }
      ]}
      primaryAction={{
        content: 'Edit customer',
        icon: EditIcon,
        onAction: () => setEditModalOpen(true),
      }}
      secondaryActions={[
        {
          content: 'Delete',
          icon: DeleteIcon,
          tone: 'critical',
          onAction: () => setDeleteModalOpen(true),
        },
        {
          content: 'Export',
          icon: ExportIcon,
          onAction: () => console.log('Export customer clicked'),
        }
      ]}
    >
      <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
        {selectedTab === 0 && renderOverviewTab()}
        {selectedTab === 1 && renderOrdersTab()}
        {selectedTab === 2 && renderCommunicationsTab()}
        {selectedTab === 3 && renderAnalyticsTab()}
        {selectedTab === 4 && renderAddressesTab()}
      </Tabs>

      {/* Edit Modal */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit customer"
        primaryAction={{
          content: 'Save',
          onAction: () => {
            console.log('Saving customer changes')
            setEditModalOpen(false)
          }
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setEditModalOpen(false)
          }
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <Text as="p">
              Edit customer information and preferences.
            </Text>
          </TextContainer>
        </Modal.Section>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete customer"
        primaryAction={{
          content: 'Delete',
          destructive: true,
          onAction: handleDeleteCustomer
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setDeleteModalOpen(false)
          }
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <Text as="p">
              Are you sure you want to delete {customer.firstName} {customer.lastName}? This action cannot be undone.
            </Text>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </Page>
  )
}

export default CustomerDetail