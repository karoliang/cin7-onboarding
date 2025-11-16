import React, { useState, useCallback } from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Button,
  FormLayout,
  TextField,
  Select,
  Checkbox,
  RadioButton,
  InlineStack,
  BlockStack,
  Divider,
  Modal,
  Badge,
  Icon,
  DataTable,
  ButtonGroup,
  Tabs,
  Thumbnail,
} from '@shopify/polaris'
import {
  PlusIcon,
  DeleteIcon,
  DragHandleIcon,
  ChartVerticalIcon,
  FileIcon,
  EmailIcon,
  ClockIcon,
  SettingsIcon,
  NoteAddIcon,
} from '@shopify/polaris-icons'

/**
 * ReportBuilder Component
 *
 * A comprehensive report builder interface that allows users to create custom reports
 * with various metrics, filters, visualizations, and scheduling options.
 */

const ReportBuilder = ({
  onSave,
  onCancel,
  initialData = null,
  templates = [],
  availableMetrics = [],
  availableFilters = [],
  availableChartTypes = [],
  loading = false,
  isEditing = false
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  // Basic report information
  const [reportName, setReportName] = useState(initialData?.name || '')
  const [reportDescription, setReportDescription] = useState(initialData?.description || '')
  const [reportCategory, setReportCategory] = useState(initialData?.category || 'operational')
  const [reportType, setReportType] = useState(initialData?.type || 'custom')

  // Selected metrics and filters
  const [selectedMetrics, setSelectedMetrics] = useState(initialData?.metrics || [])
  const [selectedFilters, setSelectedFilters] = useState(initialData?.filters || [])

  // Visualizations
  const [visualizations, setVisualizations] = useState(initialData?.visualizations || [])

  // Scheduling
  const [isScheduled, setIsScheduled] = useState(initialData?.isScheduled || false)
  const [schedule, setSchedule] = useState(initialData?.schedule || {
    frequency: 'monthly',
    dayOfMonth: 1,
    recipients: []
  })

  // Export settings
  const [exportFormat, setExportFormat] = useState(initialData?.exportFormat || 'pdf')
  const [exportRecipients, setExportRecipients] = useState(initialData?.exportRecipients || [])

  // Tab definitions
  const tabs = [
    { id: 'basics', content: 'Basic Info' },
    { id: 'metrics', content: 'Metrics & Filters' },
    { id: 'visualizations', content: 'Visualizations' },
    { id: 'schedule', content: 'Schedule & Export' },
  ]

  // Report categories
  const categories = [
    { label: 'Executive', value: 'executive' },
    { label: 'Operational', value: 'operational' },
    { label: 'Strategic', value: 'strategic' },
    { label: 'Compliance', value: 'compliance' },
  ]

  // Report types
  const reportTypes = [
    { label: 'Custom Report', value: 'custom' },
    { label: 'Inventory Report', value: 'inventory' },
    { label: 'Sales Report', value: 'sales' },
    { label: 'Customer Report', value: 'customer' },
    { label: 'Product Report', value: 'product' },
  ]

  // Chart types
  const chartTypes = [
    { label: 'Line Chart', value: 'line' },
    { label: 'Bar Chart', value: 'bar' },
    { label: 'Area Chart', value: 'area' },
    { label: 'Pie Chart', value: 'pie' },
    { label: 'Table', value: 'table' },
    { label: 'Metric Card', value: 'metric' },
  ]

  // Available metrics (mock data)
  const defaultMetrics = [
    { id: 'totalRevenue', label: 'Total Revenue', category: 'Sales' },
    { id: 'totalOrders', label: 'Total Orders', category: 'Sales' },
    { id: 'averageOrderValue', label: 'Average Order Value', category: 'Sales' },
    { id: 'totalProducts', label: 'Total Products', category: 'Inventory' },
    { id: 'lowStockItems', label: 'Low Stock Items', category: 'Inventory' },
    { id: 'inventoryValue', label: 'Inventory Value', category: 'Inventory' },
    { id: 'totalCustomers', label: 'Total Customers', category: 'Customer' },
    { id: 'customerLifetimeValue', label: 'Customer Lifetime Value', category: 'Customer' },
    { id: 'retentionRate', label: 'Retention Rate', category: 'Customer' },
  ]

  // Available filters (mock data)
  const defaultFilters = [
    { id: 'dateRange', label: 'Date Range', type: 'date' },
    { id: 'productCategory', label: 'Product Category', type: 'select' },
    { id: 'salesChannel', label: 'Sales Channel', type: 'select' },
    { id: 'customerSegment', label: 'Customer Segment', type: 'select' },
    { id: 'location', label: 'Location', type: 'select' },
    { id: 'minOrderValue', label: 'Minimum Order Value', type: 'number' },
    { id: 'stockLevel', label: 'Stock Level', type: 'select' },
  ]

  // Handle metric selection
  const handleMetricToggle = (metricId) => {
    setSelectedMetrics(prev =>
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    )
  }

  // Handle filter addition
  const handleAddFilter = (filterId) => {
    const filter = defaultFilters.find(f => f.id === filterId)
    if (filter) {
      setSelectedFilters(prev => [...prev, {
        id: Date.now().toString(),
        field: filter.id,
        label: filter.label,
        type: filter.type,
        operator: 'equals',
        value: ''
      }])
    }
  }

  // Handle filter update
  const handleFilterUpdate = (filterId, updates) => {
    setSelectedFilters(prev =>
      prev.map(filter =>
        filter.id === filterId ? { ...filter, ...updates } : filter
      )
    )
  }

  // Handle filter removal
  const handleFilterRemove = (filterId) => {
    setSelectedFilters(prev => prev.filter(filter => filter.id !== filterId))
  }

  // Handle visualization addition
  const handleAddVisualization = () => {
    setVisualizations(prev => [...prev, {
      id: Date.now().toString(),
      title: `Visualization ${prev.length + 1}`,
      type: 'bar',
      metric: selectedMetrics[0] || '',
      groupBy: '',
      filters: []
    }])
  }

  // Handle visualization update
  const handleVisualizationUpdate = (vizId, updates) => {
    setVisualizations(prev =>
      prev.map(viz => viz.id === vizId ? { ...viz, ...updates } : viz)
    )
  }

  // Handle visualization removal
  const handleVisualizationRemove = (vizId) => {
    setVisualizations(prev => prev.filter(viz => viz.id !== vizId))
  }

  // Template selection handler
  const handleTemplateSelect = (template) => {
    setReportName(template.name)
    setReportDescription(template.description)
    setReportCategory(template.category)
    setReportType(template.type)
    setSelectedMetrics(template.metrics)
    setVisualizations(template.visualizations || [])
    setShowTemplateModal(false)
  }

  // Save report handler
  const handleSave = () => {
    const reportData = {
      id: initialData?.id || Date.now().toString(),
      name: reportName,
      description: reportDescription,
      category: reportCategory,
      type: reportType,
      metrics: selectedMetrics,
      filters: selectedFilters,
      visualizations: visualizations,
      isScheduled,
      schedule,
      exportFormat,
      exportRecipients,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
    }

    onSave(reportData)
  }

  // Render metrics selection
  const renderMetricsSelection = () => {
    const metrics = availableMetrics.length > 0 ? availableMetrics : defaultMetrics
    const categories = [...new Set(metrics.map(m => m.category))]

    return (
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">Select Metrics</Text>

        {categories.map(category => (
          <Card key={category}>
            <div style={{ padding: 'var(--p-space-4)' }}>
              <Text as="h4" variant="headingSm">{category} Metrics</Text>
              <div style={{ marginTop: '12px' }}>
                {metrics
                  .filter(m => m.category === category)
                  .map(metric => (
                    <Checkbox
                      key={metric.id}
                      label={metric.label}
                      checked={selectedMetrics.includes(metric.id)}
                      onChange={() => handleMetricToggle(metric.id)}
                    />
                  ))}
              </div>
            </div>
          </Card>
        ))}
      </BlockStack>
    )
  }

  // Render filters configuration
  const renderFiltersConfiguration = () => {
    const available = defaultFilters.filter(
      f => !selectedFilters.some(sf => sf.field === f.id)
    )

    return (
      <BlockStack gap="400">
        <InlineStack align="space-between">
          <Text as="h3" variant="headingMd">Filters</Text>
          <Select
            placeholder="Add filter"
            options={available.map(f => ({ label: f.label, value: f.id }))}
            onChange={handleAddFilter}
          />
        </InlineStack>

        {selectedFilters.length === 0 ? (
          <Card>
            <div style={{ padding: 'var(--p-space-6)', textAlign: 'center' }}>
              <Text as="p" tone="subdued">No filters added. Add filters to refine your report data.</Text>
            </div>
          </Card>
        ) : (
          <BlockStack gap="300">
            {selectedFilters.map(filter => (
              <Card key={filter.id}>
                <div style={{ padding: 'var(--p-space-4)' }}>
                  <InlineStack align="space-between" wrap={false}>
                    <BlockStack gap="200" style={{ flex: 1 }}>
                      <Text as="p" fontWeight="medium">{filter.label}</Text>
                      <InlineStack gap="200" wrap={false}>
                        <Select
                          label="Operator"
                          labelHidden
                          options={[
                            { label: 'Equals', value: 'equals' },
                            { label: 'Not equals', value: 'not_equals' },
                            { label: 'Contains', value: 'contains' },
                            { label: 'Greater than', value: 'greater_than' },
                            { label: 'Less than', value: 'less_than' },
                          ]}
                          value={filter.operator}
                          onChange={(value) => handleFilterUpdate(filter.id, { operator: value })}
                        />
                        <TextField
                          label="Value"
                          labelHidden
                          placeholder="Enter value"
                          value={filter.value}
                          onChange={(value) => handleFilterUpdate(filter.id, { value })}
                        />
                      </InlineStack>
                    </BlockStack>
                    <Button
                      icon={DeleteIcon}
                      variant="plain"
                      onClick={() => handleFilterRemove(filter.id)}
                      accessibilityLabel="Remove filter"
                    />
                  </InlineStack>
                </div>
              </Card>
            ))}
          </BlockStack>
        )}
      </BlockStack>
    )
  }

  // Render visualizations configuration
  const renderVisualizationsConfiguration = () => {
    return (
      <BlockStack gap="400">
        <InlineStack align="space-between">
          <Text as="h3" variant="headingMd">Visualizations</Text>
          <Button
            icon={PlusIcon}
            onClick={handleAddVisualization}
            disabled={selectedMetrics.length === 0}
          >
            Add Visualization
          </Button>
        </InlineStack>

        {visualizations.length === 0 ? (
          <Card>
            <div style={{ padding: 'var(--p-space-6)', textAlign: 'center' }}>
              <Text as="p" tone="subdued">
                No visualizations added. Add charts and tables to visualize your report data.
              </Text>
            </div>
          </Card>
        ) : (
          <BlockStack gap="300">
            {visualizations.map(viz => (
              <Card key={viz.id}>
                <div style={{ padding: 'var(--p-space-4)' }}>
                  <InlineStack align="space-between" wrap={false}>
                    <FormLayout style={{ flex: 1 }}>
                      <TextField
                        label="Title"
                        value={viz.title}
                        onChange={(value) => handleVisualizationUpdate(viz.id, { title: value })}
                      />
                      <InlineStack gap="200" wrap={false}>
                        <Select
                          label="Chart Type"
                          labelHidden
                          options={chartTypes}
                          value={viz.type}
                          onChange={(value) => handleVisualizationUpdate(viz.id, { type: value })}
                        />
                        <Select
                          label="Metric"
                          labelHidden
                          placeholder="Select metric"
                          options={selectedMetrics.map(id => {
                            const metric = defaultMetrics.find(m => m.id === id)
                            return { label: metric?.label || id, value: id }
                          })}
                          value={viz.metric}
                          onChange={(value) => handleVisualizationUpdate(viz.id, { metric: value })}
                        />
                      </InlineStack>
                    </FormLayout>
                    <Button
                      icon={DeleteIcon}
                      variant="plain"
                      onClick={() => handleVisualizationRemove(viz.id)}
                      accessibilityLabel="Remove visualization"
                    />
                  </InlineStack>
                </div>
              </Card>
            ))}
          </BlockStack>
        )}
      </BlockStack>
    )
  }

  // Render scheduling configuration
  const renderSchedulingConfiguration = () => {
    return (
      <BlockStack gap="400">
        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">Report Scheduling</Text>

              <Checkbox
                label="Schedule this report"
                checked={isScheduled}
                onChange={setIsScheduled}
              />

              {isScheduled && (
                <FormLayout>
                  <Select
                    label="Frequency"
                    options={[
                      { label: 'Daily', value: 'daily' },
                      { label: 'Weekly', value: 'weekly' },
                      { label: 'Monthly', value: 'monthly' },
                      { label: 'Quarterly', value: 'quarterly' },
                    ]}
                    value={schedule.frequency}
                    onChange={(value) => setSchedule(prev => ({ ...prev, frequency: value }))}
                  />

                  <TextField
                    label="Recipients (comma-separated emails)"
                    placeholder="user@example.com, manager@example.com"
                    value={schedule.recipients.join(', ')}
                    onChange={(value) => setSchedule(prev => ({
                      ...prev,
                      recipients: value.split(',').map(r => r.trim()).filter(r => r)
                    }))}
                  />
                </FormLayout>
              )}
            </BlockStack>
          </div>
        </Card>

        <Card>
          <div style={{ padding: 'var(--p-space-6)' }}>
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">Export Settings</Text>

              <FormLayout>
                <Select
                  label="Default Export Format"
                  options={[
                    { label: 'PDF', value: 'pdf' },
                    { label: 'Excel', value: 'excel' },
                    { label: 'CSV', value: 'csv' },
                    { label: 'JSON', value: 'json' },
                  ]}
                  value={exportFormat}
                  onChange={setExportFormat}
                />

                <TextField
                  label="Additional Export Recipients"
                  placeholder="user@example.com, manager@example.com"
                  value={exportRecipients.join(', ')}
                  onChange={(value) => setExportRecipients(
                    value.split(',').map(r => r.trim()).filter(r => r)
                  )}
                />
              </FormLayout>
            </BlockStack>
          </div>
        </Card>
      </BlockStack>
    )
  }

  // Render basic info section
  const renderBasicInfo = () => {
    return (
      <FormLayout>
        <TextField
          label="Report Name"
          value={reportName}
          onChange={setReportName}
          placeholder="Enter report name"
          required
        />

        <TextField
          label="Description"
          value={reportDescription}
          onChange={setReportDescription}
          multiline={3}
          placeholder="Describe what this report shows"
        />

        <Select
          label="Report Category"
          options={categories}
          value={reportCategory}
          onChange={setReportCategory}
        />

        <Select
          label="Report Type"
          options={reportTypes}
          value={reportType}
          onChange={setReportType}
        />

        {templates.length > 0 && (
          <Button
            onClick={() => setShowTemplateModal(true)}
            icon={FileIcon}
          >
            Start from template
          </Button>
        )}
      </FormLayout>
    )
  }

  return (
    <Page
      title={isEditing ? "Edit Report" : "Create New Report"}
      breadcrumbs={[{ content: 'Reports', url: '/reports' }]}
      primaryAction={{
        content: 'Save Report',
        onAction: handleSave,
        loading,
        disabled: !reportName || selectedMetrics.length === 0
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: onCancel,
        },
        {
          content: 'Preview',
          onAction: () => setShowPreviewModal(true),
          disabled: selectedMetrics.length === 0
        }
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Tabs tabs={tabs} selected={activeTab} onSelect={setActiveTab}>
                {activeTab === 0 && renderBasicInfo()}
                {activeTab === 1 && (
                  <BlockStack gap="600">
                    {renderMetricsSelection()}
                    <Divider />
                    {renderFiltersConfiguration()}
                  </BlockStack>
                )}
                {activeTab === 2 && renderVisualizationsConfiguration()}
                {activeTab === 3 && renderSchedulingConfiguration()}
              </Tabs>
            </div>
          </Card>
        </Layout.Section>

        {/* Summary sidebar */}
        <Layout.Section variant="oneThird">
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <BlockStack gap="400">
                <Text as="h3" variant="headingMd">Report Summary</Text>

                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text as="p" tone="subdued">Name</Text>
                    <Text as="p" fontWeight="medium">
                      {reportName || 'Unnamed report'}
                    </Text>
                  </InlineStack>

                  <InlineStack align="space-between">
                    <Text as="p" tone="subdued">Category</Text>
                    <Badge>{reportCategory}</Badge>
                  </InlineStack>

                  <InlineStack align="space-between">
                    <Text as="p" tone="subdued">Metrics</Text>
                    <Badge status="info">{selectedMetrics.length}</Badge>
                  </InlineStack>

                  <InlineStack align="space-between">
                    <Text as="p" tone="subdued">Filters</Text>
                    <Badge status="info">{selectedFilters.length}</Badge>
                  </InlineStack>

                  <InlineStack align="space-between">
                    <Text as="p" tone="subdued">Visualizations</Text>
                    <Badge status="info">{visualizations.length}</Badge>
                  </InlineStack>

                  {isScheduled && (
                    <InlineStack align="space-between">
                      <Text as="p" tone="subdued">Scheduled</Text>
                      <Badge status="success">{schedule.frequency}</Badge>
                    </InlineStack>
                  )}
                </BlockStack>

                <Divider />

                <BlockStack gap="300">
                  <Text as="p" variant="headingSm">Quick Actions</Text>
                  <Button
                    fullWidth
                    onClick={() => setShowPreviewModal(true)}
                    disabled={selectedMetrics.length === 0}
                  >
                    Preview Report
                  </Button>
                  <Button
                    fullWidth
                    onClick={handleSave}
                    disabled={!reportName || selectedMetrics.length === 0}
                    loading={loading}
                  >
                    Save Report
                  </Button>
                </BlockStack>
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>
      </Layout>

      {/* Template Selection Modal */}
      <Modal
        open={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        title="Choose a Template"
        large
      >
        <Modal.Section>
          <BlockStack gap="300">
            {templates.map(template => (
              <Card key={template.id} sectioned>
                <InlineStack align="space-between" wrap={false}>
                  <BlockStack gap="200" style={{ flex: 1 }}>
                    <Text as="h3" variant="headingSm">{template.name}</Text>
                    <Text as="p" tone="subdued">{template.description}</Text>
                    <InlineStack gap="200">
                      <Badge>{template.category}</Badge>
                      <Badge status="info">{template.type}</Badge>
                    </InlineStack>
                  </BlockStack>
                  <Button onClick={() => handleTemplateSelect(template)}>
                    Use Template
                  </Button>
                </InlineStack>
              </Card>
            ))}
          </BlockStack>
        </Modal.Section>
      </Modal>

      {/* Preview Modal */}
      <Modal
        open={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Report Preview"
        large
      >
        <Modal.Section>
          <BlockStack gap="400">
            <Text as="p">This is a preview of how your report will look when generated.</Text>

            <Card sectioned>
              <Text as="h3" variant="headingMd">{reportName || 'Untitled Report'}</Text>
              {reportDescription && (
                <Text as="p" tone="subdued">{reportDescription}</Text>
              )}
            </Card>

            <Card sectioned>
              <Text as="h4" variant="headingSm">Selected Metrics</Text>
              {selectedMetrics.map(metricId => {
                const metric = defaultMetrics.find(m => m.id === metricId)
                return metric ? <Badge key={metricId}>{metric.label}</Badge> : null
              })}
            </Card>

            <Card sectioned>
              <Text as="h4" variant="headingSm">Visualizations</Text>
              <Text as="p" tone="subdued">
                {visualizations.length} visualization(s) will be generated
              </Text>
            </Card>
          </BlockStack>
        </Modal.Section>
      </Modal>
    </Page>
  )
}

export default ReportBuilder