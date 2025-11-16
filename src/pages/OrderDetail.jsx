import React, { useState, useEffect } from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Button,
  Badge,
  Icon,
  DataTable,
  InlineStack,
  BlockStack,
  Divider,
  Modal,
  FormLayout,
  TextField,
  Select,
  ButtonGroup,
  Popover,
  ActionList,
  Banner,
  Tabs,
  Grid,
  Spinner
} from '@shopify/polaris'
import {
  ArrowLeftIcon,
  EditIcon,
  DeleteIcon,
  PlusIcon,
  PrintIcon,
  EmailIcon,
  PackageIcon,
  CashDollarIcon,
  DeliveryIcon,
  FileIcon,
  CreditCardIcon,
  NoteIcon,
  LabelPrinterIcon
} from '@shopify/polaris-icons'
import { useNavigate, useParams } from 'react-router-dom'
import OrderStatus, { PaymentStatus, FulfillmentStatus, OrderStatusProgress } from '../components/OrderStatus'

const OrderDetail = () => {
  const navigate = useNavigate()
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState(0)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [fulfillModalOpen, setFulfillModalOpen] = useState(false)
  const [refundModalOpen, setRefundModalOpen] = useState(false)

  // Mock order data - in real app, this would be fetched from API
  const mockOrder = {
    id: orderId,
    orderNumber: '#1001',
    customerId: 'cust_123',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1 (555) 123-4567',
    status: 'processing',
    paymentStatus: 'paid',
    fulfillmentStatus: 'unfulfilled',
    subtotal: 125.99,
    tax: 10.08,
    shipping: 9.99,
    total: 146.06,
    currency: 'USD',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      company: '',
      address1: '123 Main Street',
      address2: 'Apt 4B',
      city: 'New York',
      province: 'NY',
      country: 'United States',
      zip: '10001',
      phone: '+1 (555) 123-4567'
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      company: '',
      address1: '123 Main Street',
      address2: 'Apt 4B',
      city: 'New York',
      province: 'NY',
      country: 'United States',
      zip: '10001',
      phone: '+1 (555) 123-4567'
    },
    items: [
      {
        id: '1',
        productId: 'prod_456',
        productSku: 'TS-BLU-M',
        productName: 'Classic Blue T-Shirt',
        quantity: 2,
        unitPrice: 29.99,
        totalPrice: 59.98,
        weight: 0.3,
        productImage: 'https://via.placeholder.com/60x60'
      },
      {
        id: '2',
        productId: 'prod_789',
        productSku: 'JNS-BLK-32',
        productName: 'Black Denim Jeans',
        quantity: 1,
        unitPrice: 66.01,
        totalPrice: 66.01,
        weight: 0.8,
        productImage: 'https://via.placeholder.com/60x60'
      }
    ],
    notes: 'Customer requested gift wrapping',
    tags: ['VIP', 'Gift Order', 'Rush Delivery'],
    source: 'online',
    paymentMethod: 'credit_card',
    paymentGateway: 'stripe',
    transactions: [
      {
        id: 'txn_123',
        type: 'charge',
        status: 'success',
        amount: 146.06,
        currency: 'USD',
        createdAt: '2024-01-15T10:35:00Z',
        gateway: 'stripe'
      }
    ],
    fulfillments: [],
    refunds: []
  }

  useEffect(() => {
    // Simulate API call
    const fetchOrder = async () => {
      setLoading(true)
      // In real app: const response = await api.getOrder(orderId)
      setTimeout(() => {
        setOrder(mockOrder)
        setLoading(false)
      }, 1000)
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <Page title="Loading...">
        <Layout>
          <Layout.Section>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Spinner size="large" />
              <div style={{ marginTop: '20px' }}>
                <Text as="p">Loading order details...</Text>
              </div>
            </div>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }

  if (!order) {
    return (
      <Page title="Order not found">
        <Layout>
          <Layout.Section>
            <Banner status="critical">
              <p>Order with ID {orderId} could not be found.</p>
            </Banner>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }

  const tabs = [
    {
      id: 'details',
      content: 'Order Details',
      panelID: 'details-content',
    },
    {
      id: 'fulfillment',
      content: 'Fulfillment',
      panelID: 'fulfillment-content',
    },
    {
      id: 'history',
      content: 'History',
      panelID: 'history-content',
    }
  ]

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleStatusUpdate = (newStatus) => {
    setOrder(prev => ({ ...prev, status: newStatus }))
    console.log('Status updated to:', newStatus)
  }

  const handleFulfillOrder = () => {
    setFulfillModalOpen(true)
  }

  const handleRefundOrder = () => {
    setRefundModalOpen(true)
  }

  const handlePrintOrder = () => {
    window.print()
  }

  const handleEmailCustomer = () => {
    console.log('Email customer')
  }

  const itemRows = order.items.map(item => [
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {item.productImage && (
        <img
          src={item.productImage}
          alt={item.productName}
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            borderRadius: '4px'
          }}
        />
      )}
      <div>
        <Text as="p" fontWeight="semibold">{item.productName}</Text>
        <Text as="p" tone="subdued" variant="bodySm">SKU: {item.productSku}</Text>
      </div>
    </div>,
    item.quantity,
    formatCurrency(item.unitPrice, order.currency),
    formatCurrency(item.totalPrice, order.currency)
  ])

  const AddressCard = ({ title, address }) => (
    <Card>
      <div style={{ padding: 'var(--p-space-6)' }}>
        <Text variant="headingMd" as="h2" marginBottom="400">
          {title}
        </Text>
        <BlockStack gap="200">
          <Text as="p">{address.firstName} {address.lastName}</Text>
          {address.company && <Text as="p">{address.company}</Text>}
          <Text as="p">{address.address1}</Text>
          {address.address2 && <Text as="p">{address.address2}</Text>}
          <Text as="p">
            {address.city}, {address.province} {address.zip}
          </Text>
          <Text as="p">{address.country}</Text>
          {address.phone && <Text as="p">{address.phone}</Text>}
        </BlockStack>
      </div>
    </Card>
  )

  return (
    <Page
      title={`Order ${order.orderNumber}`}
      subtitle={`Created on ${formatDate(order.createdAt)}`}
      breadcrumbs={[
        {
          content: 'Orders',
          onAction: () => navigate('/sales')
        }
      ]}
      primaryAction={{
        content: 'Edit order',
        icon: EditIcon,
        onAction: () => setEditModalOpen(true)
      }}
      secondaryActions={[
        {
          content: 'Fulfill order',
          icon: PackageIcon,
          onAction: handleFulfillOrder,
          disabled: order.fulfillmentStatus === 'fulfilled'
        },
        {
          content: 'Refund',
          icon: CashDollarIcon,
          onAction: handleRefundOrder,
          disabled: order.paymentStatus !== 'paid'
        },
        {
          content: 'Print',
          icon: PrintIcon,
          onAction: handlePrintOrder
        },
        {
          content: 'Email customer',
          icon: EmailIcon,
          onAction: handleEmailCustomer
        }
      ]}
    >
      <Layout>
        {/* Order Status Header */}
        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <BlockStack gap="600">
                {/* Status Progress */}
                <OrderStatusProgress
                  currentStatus={order.status}
                  onStatusClick={handleStatusUpdate}
                />

                {/* Status Badges */}
                <InlineStack gap="400" wrap>
                  <div>
                    <Text as="p" tone="subdued">Order Status</Text>
                    <OrderStatus
                      status={order.status}
                      editable
                      onStatusChange={handleStatusUpdate}
                    />
                  </div>
                  <div>
                    <Text as="p" tone="subdued">Payment</Text>
                    <PaymentStatus status={order.paymentStatus} />
                  </div>
                  <div>
                    <Text as="p" tone="subdued">Fulfillment</Text>
                    <FulfillmentStatus status={order.fulfillmentStatus} />
                  </div>
                </InlineStack>

                {/* Order Info */}
                <InlineStack gap="600">
                  <BlockStack gap="200">
                    <Text as="p" tone="subdued">Customer</Text>
                    <Text as="p" fontWeight="semibold">{order.customerName}</Text>
                    <Text as="p">{order.customerEmail}</Text>
                    {order.customerPhone && <Text as="p">{order.customerPhone}</Text>}
                  </BlockStack>
                  <BlockStack gap="200">
                    <Text as="p" tone="subdued">Financial Status</Text>
                    <Text as="p" fontWeight="semibold">{formatCurrency(order.total, order.currency)}</Text>
                    <PaymentStatus status={order.paymentStatus} />
                  </BlockStack>
                  <BlockStack gap="200">
                    <Text as="p" tone="subdued">Fulfillment</Text>
                    <Text as="p" fontWeight="semibold">{order.items.length} items</Text>
                    <FulfillmentStatus status={order.fulfillmentStatus} />
                  </BlockStack>
                </InlineStack>

                {/* Tags */}
                {order.tags.length > 0 && (
                  <InlineStack gap="200" wrap>
                    <Icon source={LabelPrinterIcon} tone="subdued" />
                    {order.tags.map((tag, index) => (
                      <Badge key={index}>{tag}</Badge>
                    ))}
                  </InlineStack>
                )}
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>

        {/* Tabs Content */}
        <Layout.Section>
          <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
            {selectedTab === 0 && (
              <BlockStack gap="600">
                {/* Order Items */}
                <Card>
                  <div style={{ padding: 'var(--p-space-6)' }}>
                    <Text variant="headingMd" as="h2" marginBottom="400">
                      Order Items
                    </Text>
                    <DataTable
                      columnContentTypes={['text', 'numeric', 'numeric', 'numeric']}
                      headings={['Product', 'Quantity', 'Price', 'Total']}
                      rows={itemRows}
                    />
                  </div>
                </Card>

                {/* Addresses */}
                <Grid columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                  <AddressCard title="Shipping Address" address={order.shippingAddress} />
                  <AddressCard title="Billing Address" address={order.billingAddress} />
                </Grid>

                {/* Pricing Summary */}
                <Card>
                  <div style={{ padding: 'var(--p-space-6)' }}>
                    <Text variant="headingMd" as="h2" marginBottom="400">
                      Pricing Summary
                    </Text>
                    <BlockStack gap="300">
                      <InlineStack align="space-between">
                        <Text as="p">Subtotal</Text>
                        <Text as="p">{formatCurrency(order.subtotal, order.currency)}</Text>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text as="p">Tax</Text>
                        <Text as="p">{formatCurrency(order.tax, order.currency)}</Text>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text as="p">Shipping</Text>
                        <Text as="p">{formatCurrency(order.shipping, order.currency)}</Text>
                      </InlineStack>
                      <Divider />
                      <InlineStack align="space-between">
                        <Text as="p" variant="headingMd" fontWeight="bold">Total</Text>
                        <Text as="p" variant="headingMd" fontWeight="bold">
                          {formatCurrency(order.total, order.currency)}
                        </Text>
                      </InlineStack>
                    </BlockStack>
                  </div>
                </Card>

                {/* Order Notes */}
                {order.notes && (
                  <Card>
                    <div style={{ padding: 'var(--p-space-6)' }}>
                      <Text variant="headingMd" as="h2" marginBottom="400">
                        Order Notes
                      </Text>
                      <Text as="p">{order.notes}</Text>
                    </div>
                  </Card>
                )}
              </BlockStack>
            )}

            {selectedTab === 1 && (
              <Card>
                <div style={{ padding: 'var(--p-space-6)' }}>
                  <Text variant="headingMd" as="h2" marginBottom="400">
                    Fulfillment Information
                  </Text>
                  <Text as="p">
                    {order.fulfillmentStatus === 'unfulfilled'
                      ? 'This order has not been fulfilled yet.'
                      : 'Fulfillment details will be shown here.'}
                  </Text>
                  <Button
                    primary
                    onClick={handleFulfillOrder}
                    disabled={order.fulfillmentStatus === 'fulfilled'}
                  >
                    Fulfill Order
                  </Button>
                </div>
              </Card>
            )}

            {selectedTab === 2 && (
              <Card>
                <div style={{ padding: 'var(--p-space-6)' }}>
                  <Text variant="headingMd" as="h2" marginBottom="400">
                    Order History
                  </Text>
                  <Text as="p">
                    Order timeline and history will be displayed here.
                  </Text>
                </div>
              </Card>
            )}
          </Tabs>
        </Layout.Section>
      </Layout>

      {/* Edit Order Modal */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Order"
        primaryAction={{
          content: 'Save changes',
          onAction: () => {
            console.log('Saving order changes...')
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
        <div style={{ padding: 'var(--p-space-6)' }}>
          <FormLayout>
            <TextField
              label="Order notes"
              multiline={3}
              value={order.notes || ''}
              onChange={(value) => console.log('Notes changed:', value)}
            />
            <Select
              label="Tags"
              options={[
                { label: 'VIP', value: 'VIP' },
                { label: 'Gift Order', value: 'Gift Order' },
                { label: 'Rush Delivery', value: 'Rush Delivery' }
              ]}
              value={order.tags}
              onChange={(value) => console.log('Tags changed:', value)}
              multiple
            />
          </FormLayout>
        </div>
      </Modal>

      {/* Fulfill Order Modal */}
      <Modal
        open={fulfillModalOpen}
        onClose={() => setFulfillModalOpen(false)}
        title="Fulfill Order"
        primaryAction={{
          content: 'Create fulfillment',
          onAction: () => {
            console.log('Creating fulfillment...')
            setFulfillModalOpen(false)
          }
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setFulfillModalOpen(false)
          }
        ]}
      >
        <div style={{ padding: 'var(--p-space-6)' }}>
          <Text as="p">
            Fulfillment form with tracking information and shipping details will be shown here.
          </Text>
        </div>
      </Modal>

      {/* Refund Order Modal */}
      <Modal
        open={refundModalOpen}
        onClose={() => setRefundModalOpen(false)}
        title="Refund Order"
        primaryAction={{
          content: 'Process refund',
          onAction: () => {
            console.log('Processing refund...')
            setRefundModalOpen(false)
          }
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setRefundModalOpen(false)
          }
        ]}
      >
        <div style={{ padding: 'var(--p-space-6)' }}>
          <Text as="p">
            Refund form with amount and reason will be shown here.
          </Text>
        </div>
      </Modal>
    </Page>
  )
}

export default OrderDetail