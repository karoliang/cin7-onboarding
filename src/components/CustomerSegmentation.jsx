import React, { useState } from 'react'
import {
  Card,
  Text,
  Button,
  Select,
  Badge,
  Icon,
  Banner,
  Modal,
  TextField,
  Checkbox,
  InlineStack,
  BlockStack,
  Grid,
  Divider,
  RadioButton,
} from '@shopify/polaris'
import {
  LabelPrinterIcon,
  PlusIcon,
  EditIcon,
  DeleteIcon,
  SearchIcon,
  FilterIcon,
  SaveIcon,
  XIcon,
} from '@shopify/polaris-icons'
import { CustomerStatus, CustomerTier, CustomerSegment } from '../types/customer'

const CustomerSegmentation = ({
  customers = [],
  segments = [],
  onSegmentCreate,
  onSegmentUpdate,
  onSegmentDelete,
  onCustomersSegmented,
  ...props
}) => {
  const [selectedSegment, setSelectedSegment] = useState(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedCustomers, setSelectedCustomers] = useState([])
  const [searchValue, setSearchValue] = useState('')

  // Form states for creating/editing segments
  const [segmentForm, setSegmentForm] = useState({
    name: '',
    description: '',
    rules: [],
    color: 'base',
    isAutoUpdate: false
  })

  // Predefined segment templates
  const segmentTemplates = [
    {
      name: 'High Value Customers',
      description: 'Customers with total spend > $1000',
      rules: [
        { field: 'totalSpent', operator: '>', value: 1000 }
      ]
    },
    {
      name: 'New Customers (30 days)',
      description: 'Customers who joined in the last 30 days',
      rules: [
        { field: 'createdAt', operator: '>', value: '30 days ago' }
      ]
    },
    {
      name: 'Inactive Customers',
      description: 'No orders in the last 90 days',
      rules: [
        { field: 'lastOrderDate', operator: '<', value: '90 days ago' }
      ]
    },
    {
      name: 'Frequent Buyers',
      description: 'More than 10 orders total',
      rules: [
        { field: 'totalOrders', operator: '>', value: 10 }
      ]
    }
  ]

  // Mock segments data
  const defaultSegments = [
    {
      id: '1',
      name: 'VIP Customers',
      description: 'High-value customers with premium tier',
      customerCount: 45,
      color: 'magic',
      isAutoUpdate: true,
      rules: [
        { field: 'tier', operator: '=', value: 'vip' },
        { field: 'totalSpent', operator: '>', value: 5000 }
      ],
      createdAt: new Date('2024-01-01'),
      lastCalculated: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'At Risk',
      description: 'Customers who haven\'t ordered in 60+ days',
      customerCount: 23,
      color: 'warning',
      isAutoUpdate: true,
      rules: [
        { field: 'lastOrderDate', operator: '<', value: '60 days ago' }
      ],
      createdAt: new Date('2024-01-01'),
      lastCalculated: new Date('2024-01-15')
    },
    {
      id: '3',
      name: 'New Customers',
      description: 'Customers joined in last 30 days',
      customerCount: 67,
      color: 'new',
      isAutoUpdate: true,
      rules: [
        { field: 'createdAt', operator: '>', value: '30 days ago' }
      ],
      createdAt: new Date('2024-01-01'),
      lastCalculated: new Date('2024-01-15')
    }
  ]

  const allSegments = segments.length > 0 ? segments : defaultSegments

  const ruleFields = [
    { label: 'Customer Status', value: 'status' },
    { label: 'Customer Tier', value: 'tier' },
    { label: 'Total Orders', value: 'totalOrders' },
    { label: 'Total Spent', value: 'totalSpent' },
    { label: 'Average Order Value', value: 'averageOrderValue' },
    { label: 'Last Order Date', value: 'lastOrderDate' },
    { label: 'Customer Since', value: 'createdAt' },
    { label: 'Has Tag', value: 'hasTag' },
  ]

  const ruleOperators = {
    status: [
      { label: 'Equals', value: '=' },
      { label: 'Not equals', value: '!=' }
    ],
    tier: [
      { label: 'Equals', value: '=' },
      { label: 'Not equals', value: '!=' }
    ],
    totalOrders: [
      { label: 'Equals', value: '=' },
      { label: 'Not equals', value: '!=' },
      { label: 'Greater than', value: '>' },
      { label: 'Less than', value: '<' },
      { label: 'Greater than or equal', value: '>=' },
      { label: 'Less than or equal', value: '<=' }
    ],
    totalSpent: [
      { label: 'Equals', value: '=' },
      { label: 'Greater than', value: '>' },
      { label: 'Less than', value: '<' },
      { label: 'Greater than or equal', value: '>=' },
      { label: 'Less than or equal', value: '<=' }
    ],
    averageOrderValue: [
      { label: 'Equals', value: '=' },
      { label: 'Greater than', value: '>' },
      { label: 'Less than', value: '<' },
      { label: 'Greater than or equal', value: '>=' },
      { label: 'Less than or equal', value: '<=' }
    ],
    lastOrderDate: [
      { label: 'Before', value: '<' },
      { label: 'After', value: '>' },
      { label: 'Within', value: '=' }
    ],
    createdAt: [
      { label: 'Before', value: '<' },
      { label: 'After', value: '>' },
      { label: 'Within', value: '=' }
    ],
    hasTag: [
      { label: 'Contains', value: 'contains' },
      { label: 'Does not contain', value: '!contains' }
    ]
  }

  const getColorBadge = (color) => {
    return <Badge tone={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</Badge>
  }

  const handleCreateSegment = () => {
    setSegmentForm({
      name: '',
      description: '',
      rules: [{ field: 'status', operator: '=', value: 'active' }],
      color: 'base',
      isAutoUpdate: false
    })
    setCreateModalOpen(true)
  }

  const handleEditSegment = (segment) => {
    setSegmentForm({
      ...segment,
      rules: [...segment.rules]
    })
    setSelectedSegment(segment)
    setEditModalOpen(true)
  }

  const handleSaveSegment = () => {
    const segmentData = {
      ...segmentForm,
      customerCount: Math.floor(Math.random() * 100), // Mock count
      createdAt: new Date(),
      lastCalculated: new Date()
    }

    if (editModalOpen && selectedSegment) {
      onSegmentUpdate && onSegmentUpdate({ ...selectedSegment, ...segmentData })
    } else {
      onSegmentCreate && onSegmentCreate(segmentData)
    }

    setCreateModalOpen(false)
    setEditModalOpen(false)
    setSelectedSegment(null)
  }

  const handleDeleteSegment = (segmentId) => {
    onSegmentDelete && onSegmentDelete(segmentId)
  }

  const addRule = () => {
    setSegmentForm({
      ...segmentForm,
      rules: [...segmentForm.rules, { field: 'status', operator: '=', value: 'active' }]
    })
  }

  const updateRule = (index, field, value) => {
    const newRules = [...segmentForm.rules]
    newRules[index] = { ...newRules[index], [field]: value }

    // Reset value when field changes
    if (field === 'field') {
      newRules[index].operator = ruleOperators[value][0].value
      newRules[index].value = ''
    }

    setSegmentForm({ ...segmentForm, rules: newRules })
  }

  const removeRule = (index) => {
    const newRules = segmentForm.rules.filter((_, i) => i !== index)
    setSegmentForm({ ...segmentForm, rules: newRules })
  }

  const applySegmentToCustomers = (segmentId) => {
    if (selectedCustomers.length > 0) {
      onCustomersSegmented && onCustomersSegmented(selectedCustomers, segmentId)
      setSelectedCustomers([])
    }
  }

  const renderRuleBuilder = (rules) => (
    <BlockStack gap="400">
      {rules.map((rule, index) => (
        <div key={index}>
          <InlineStack gap="400" align="center">
            <Select
              label="Field"
              options={ruleFields}
              value={rule.field}
              onChange={(value) => updateRule(index, 'field', value)}
              labelHidden
            />
            <Select
              label="Operator"
              options={ruleOperators[rule.field] || []}
              value={rule.operator}
              onChange={(value) => updateRule(index, 'operator', value)}
              labelHidden
            />
            <TextField
              label="Value"
              value={rule.value}
              onChange={(value) => updateRule(index, 'value', value)}
              placeholder="Enter value..."
              labelHidden
              autoComplete="off"
            />
            {rules.length > 1 && (
              <Button
                variant="plain"
                tone="critical"
                icon={DeleteIcon}
                onClick={() => removeRule(index)}
              />
            )}
          </InlineStack>
          {index < rules.length - 1 && (
            <Text as="p" tone="subdued" alignment="center">AND</Text>
          )}
        </div>
      ))}
      <Button onClick={addRule} icon={PlusIcon}>
        Add rule
      </Button>
    </BlockStack>
  )

  const renderCreateEditModal = (isEdit = false) => (
    <Modal
      open={isEdit ? editModalOpen : createModalOpen}
      onClose={() => {
        isEdit ? setEditModalOpen(false) : setCreateModalOpen(false)
        setSelectedSegment(null)
      }}
      title={isEdit ? 'Edit Segment' : 'Create Customer Segment'}
      primaryAction={{
        content: 'Save',
        icon: SaveIcon,
        onAction: handleSaveSegment,
        disabled: !segmentForm.name
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          icon: XIcon,
          onAction: () => {
            isEdit ? setEditModalOpen(false) : setCreateModalOpen(false)
            setSelectedSegment(null)
          }
        }
      ]}
      size="large"
    >
      <Modal.Section>
        <BlockStack gap="400">
          <TextField
            label="Segment Name"
            value={segmentForm.name}
            onChange={(value) => setSegmentForm({ ...segmentForm, name: value })}
            placeholder="e.g., VIP Customers"
            autoComplete="off"
          />

          <TextField
            label="Description"
            value={segmentForm.description}
            onChange={(value) => setSegmentForm({ ...segmentForm, description: value })}
            placeholder="Describe what this segment represents"
            multiline={3}
          />

          <Card>
            <div style={{ padding: 'var(--p-space-4)' }}>
              <Text variant="headingMd" as="h3" marginBottom="400">
                Segment Rules
              </Text>
              {renderRuleBuilder(segmentForm.rules)}
            </div>
          </Card>

          <InlineStack gap="400">
            <div style={{ flex: 1 }}>
              <Select
                label="Color"
                options={[
                  { label: 'Base', value: 'base' },
                  { label: 'Success', value: 'success' },
                  { label: 'Warning', value: 'warning' },
                  { label: 'Attention', value: 'attention' },
                  { label: 'Critical', value: 'critical' },
                  { label: 'Info', value: 'info' },
                  { label: 'New', value: 'new' },
                  { label: 'Magic', value: 'magic' },
                ]}
                value={segmentForm.color}
                onChange={(value) => setSegmentForm({ ...segmentForm, color: value })}
              />
            </div>
            <Checkbox
              label="Auto-update"
              checked={segmentForm.isAutoUpdate}
              onChange={(checked) => setSegmentForm({ ...segmentForm, isAutoUpdate: checked })}
              helpText="Automatically update this segment based on rules"
            />
          </InlineStack>
        </BlockStack>
      </Modal.Section>
    </Modal>
  )

  return (
    <Card {...props}>
      <div style={{ padding: 'var(--p-space-6)' }}>
        <BlockStack gap="600">
          {/* Header */}
          <InlineStack align="space-between" blockAlign="center">
            <Text variant="headingLg" as="h2">
              Customer Segmentation
            </Text>
            <Button icon={PlusIcon} onClick={handleCreateSegment}>
              Create Segment
            </Button>
          </InlineStack>

          {/* Templates */}
          <Card>
            <div style={{ padding: 'var(--p-space-4)' }}>
              <Text variant="headingMd" as="h3" marginBottom="400">
                Quick Templates
              </Text>
              <Grid columns={{ xs: 1, sm: 2, lg: 4 }}>
                {segmentTemplates.map((template, index) => (
                  <Card key={index}>
                    <div style={{ padding: 'var(--p-space-4)' }}>
                      <BlockStack gap="200">
                        <Text variant="headingSm" as="h4">
                          {template.name}
                        </Text>
                        <Text variant="bodySm" as="p" tone="subdued">
                          {template.description}
                        </Text>
                        <Button
                          size="small"
                          onClick={() => {
                            setSegmentForm({
                              name: template.name,
                              description: template.description,
                              rules: [...template.rules],
                              color: 'base',
                              isAutoUpdate: true
                            })
                            setCreateModalOpen(true)
                          }}
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

          {/* Existing Segments */}
          <BlockStack gap="400">
            <Text variant="headingMd" as="h3">
              Existing Segments
            </Text>
            {allSegments.length > 0 ? (
              <Grid columns={{ xs: 1, sm: 2, lg: 3 }}>
                {allSegments.map((segment) => (
                  <Card key={segment.id}>
                    <div style={{ padding: 'var(--p-space-4)' }}>
                      <BlockStack gap="300">
                        <InlineStack align="space-between" blockAlign="start">
                          <div style={{ flex: 1 }}>
                            <Text variant="headingSm" as="h4" fontWeight="semibold">
                              {segment.name}
                            </Text>
                            <Text variant="bodySm" as="p" tone="subdued">
                              {segment.description}
                            </Text>
                          </div>
                          <InlineStack gap="200">
                            <Button
                              variant="plain"
                              icon={EditIcon}
                              onClick={() => handleEditSegment(segment)}
                            />
                            <Button
                              variant="plain"
                              tone="critical"
                              icon={DeleteIcon}
                              onClick={() => handleDeleteSegment(segment.id)}
                            />
                          </InlineStack>
                        </InlineStack>

                        <InlineStack gap="200" align="center">
                          <Badge>{segment.customerCount} customers</Badge>
                          {getColorBadge(segment.color)}
                          {segment.isAutoUpdate && (
                            <Badge tone="info">Auto-update</Badge>
                          )}
                        </InlineStack>

                        <Divider />

                        <BlockStack gap="200">
                          <Text variant="bodySm" as="p" tone="subdued">
                            Rules:
                          </Text>
                          {segment.rules.map((rule, ruleIndex) => (
                            <Text key={ruleIndex} variant="bodyXs" as="p">
                              {rule.field} {rule.operator} {rule.value}
                            </Text>
                          ))}
                        </BlockStack>

                        <Text variant="bodyXs" as="p" tone="subdued">
                          Last calculated: {new Intl.DateTimeFormat('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }).format(segment.lastCalculated)}
                        </Text>
                      </BlockStack>
                    </div>
                  </Card>
                ))}
              </Grid>
            ) : (
              <Banner status="info">
                <p>No customer segments created yet. Create your first segment to get started.</p>
              </Banner>
            )}
          </BlockStack>
        </BlockStack>
      </div>

      {/* Create/Edit Modal */}
      {renderCreateEditModal()}
      {renderCreateEditModal(true)}
    </Card>
  )
}

export default CustomerSegmentation