import React, { useState, useCallback } from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Button,
  Modal,
  DataTable,
  Banner,
  InlineStack,
  BlockStack,
  Select,
  TextField,
  Badge,
  DropZone,
  Grid,
  Divider,
} from '@shopify/polaris'
import {
  ImportIcon,
  ExportIcon,
  NoteIcon,
  CheckIcon,
  XCircleIcon,
  AlertIcon,
} from '@shopify/polaris-icons'

const InventoryImportExport = ({ onClose, onImport, onExport }) => {
  const [activeModal, setActiveModal] = useState(null)
  const [importFile, setImportFile] = useState(null)
  const [importResults, setImportResults] = useState(null)
  const [exportFormat, setExportFormat] = useState('csv')
  const [exportFilter, setExportFilter] = useState('all')
  const [isProcessing, setIsProcessing] = useState(false)

  const exportFormats = [
    { label: 'CSV (Comma Separated Values)', value: 'csv' },
    { label: 'Excel (.xlsx)', value: 'xlsx' },
    { label: 'JSON', value: 'json' },
    { label: 'PDF Report', value: 'pdf' },
  ]

  const exportFilters = [
    { label: 'All Products', value: 'all' },
    { label: 'Low Stock Only', value: 'low_stock' },
    { label: 'Out of Stock Only', value: 'out_of_stock' },
    { label: 'Specific Location', value: 'location' },
    { label: 'Custom Filter', value: 'custom' },
  ]

  const mockImportPreview = [
    {
      row: 1,
      sku: 'TSH-001',
      title: 'Classic T-Shirt',
      quantity: '100',
      location: 'Main Warehouse',
      bin: 'A-1-1',
      status: 'valid',
      errors: []
    },
    {
      row: 2,
      sku: 'JEA-002',
      title: 'Denim Jeans',
      quantity: 'invalid',
      location: 'East Coast Store',
      bin: '',
      status: 'error',
      errors: ['Quantity must be a number', 'Bin location is required']
    },
    {
      row: 3,
      sku: 'WAL-003',
      title: 'Leather Wallet',
      quantity: '50',
      location: 'Main Warehouse',
      bin: 'B-2-1',
      status: 'valid',
      errors: []
    },
    {
      row: 4,
      sku: '',
      title: 'New Product',
      quantity: '25',
      location: 'West Coast Store',
      bin: 'C-1-1',
      status: 'warning',
      errors: ['SKU is required for new products']
    }
  ]

  const handleFileDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImportFile(acceptedFiles[0])
      // Simulate file processing
      setTimeout(() => {
        setImportResults(mockImportPreview)
      }, 1000)
    }
  }, [])

  const handleImport = async () => {
    setIsProcessing(true)

    // Simulate import processing
    setTimeout(() => {
      const results = {
        success: true,
        totalProcessed: 4,
        successful: 2,
        failed: 2,
        warnings: 1,
        errors: [
          { row: 2, field: 'quantity', message: 'Invalid quantity format' },
          { row: 4, field: 'sku', message: 'SKU cannot be empty' }
        ]
      }
      setImportResults(results)
      setIsProcessing(false)

      if (onImport) {
        onImport(results)
      }
    }, 2000)
  }

  const handleExport = async () => {
    setIsProcessing(true)

    // Simulate export processing
    setTimeout(() => {
      const exportData = {
        format: exportFormat,
        filter: exportFilter,
        timestamp: new Date().toISOString(),
        recordCount: 150,
        filename: `inventory_export_${new Date().toISOString().split('T')[0]}.${exportFormat}`
      }

      // Create download link
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: exportFormat === 'csv' ? 'text/csv' : 'application/json'
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = exportData.filename
      link.click()

      setIsProcessing(false)
      setActiveModal(null)

      if (onExport) {
        onExport(exportData)
      }
    }, 1500)
  }

  const renderImportModal = () => (
    <Modal
      open={activeModal === 'import'}
      onClose={() => {
        setActiveModal(null)
        setImportFile(null)
        setImportResults(null)
      }}
      title="Import Inventory"
      primaryAction={{
        content: isProcessing ? 'Processing...' : 'Import',
        onAction: handleImport,
        loading: isProcessing,
        disabled: !importFile || isProcessing,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => {
            setActiveModal(null)
            setImportFile(null)
            setImportResults(null)
          },
        },
      ]}
      size="large"
    >
      <Modal.Section>
        <BlockStack gap="400">
          <Banner
            title="Import requirements"
            status="info"
          >
            <p>
              Upload a CSV or Excel file with the following columns: SKU, Title, Quantity,
              Location, Bin, Reorder Point. Maximum file size: 10MB.
            </p>
          </Banner>

          {!importFile ? (
            <DropZone onDrop={handleFileDrop} accept=".csv,.xlsx,.xls">
              <DropZone.FileUpload actionHint="or drop files to upload" />
            </DropZone>
          ) : (
            <Card sectioned>
              <BlockStack gap="200">
                <InlineStack gap="200" align="center">
                  <Text variant="bodyMd" fontWeight="semibold">Selected file:</Text>
                  <Text variant="bodyMd">{importFile.name}</Text>
                  <Badge tone="success">
                    {(importFile.size / 1024 / 1024).toFixed(2)} MB
                  </Badge>
                </InlineStack>

                {!importResults && (
                  <Text variant="bodySm" tone="subdued">
                    Processing file and validating data...
                  </Text>
                )}

                {importResults && !importResults.totalProcessed && (
                  <DataTable
                    columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text', 'text']}
                    headings={['Row', 'SKU', 'Title', 'Quantity', 'Location', 'Bin', 'Status']}
                    rows={importResults.map(item => [
                      item.row,
                      item.sku || '-',
                      item.title || '-',
                      item.quantity || '-',
                      item.location || '-',
                      item.bin || '-',
                      item.status === 'valid' ?
                        <Badge tone="success">✓ Valid</Badge> :
                        item.status === 'warning' ?
                        <Badge tone="attention">⚠ Warning</Badge> :
                        <Badge tone="critical">✗ Error</Badge>
                    ])}
                  />
                )}
              </BlockStack>
            </Card>
          )}

          {importResults && importResults.errors && (
            <Card sectioned>
              <Text variant="headingMd" as="h3">Validation Errors</Text>
              <BlockStack gap="200" style={{ marginTop: 'var(--p-space-300)' }}>
                {importResults.errors.map((error, index) => (
                  <div key={index} style={{
                    padding: 'var(--p-space-300)',
                    backgroundColor: 'var(--p-color-bg-surface-critical)',
                    borderRadius: 'var(--p-border-radius-200)'
                  }}>
                    <InlineStack gap="200">
                      <Icon source={AlertIcon} tone="critical" />
                      <Text variant="bodySm">
                        Row {error.row}: {error.field} - {error.message}
                      </Text>
                    </InlineStack>
                  </div>
                ))}
              </BlockStack>
            </Card>
          )}
        </BlockStack>
      </Modal.Section>
    </Modal>
  )

  const renderExportModal = () => (
    <Modal
      open={activeModal === 'export'}
      onClose={() => setActiveModal(null)}
      title="Export Inventory"
      primaryAction={{
        content: isProcessing ? 'Exporting...' : 'Export',
        onAction: handleExport,
        loading: isProcessing,
        disabled: isProcessing,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => setActiveModal(null),
        },
      ]}
    >
      <Modal.Section>
        <BlockStack gap="400">
          <div>
            <Select
              label="Export Format"
              options={exportFormats}
              value={exportFormat}
              onChange={setExportFormat}
            />
          </div>

          <div>
            <Select
              label="Data Filter"
              options={exportFilters}
              value={exportFilter}
              onChange={setExportFilter}
            />
          </div>

          {exportFilter === 'location' && (
            <TextField
              label="Location"
              placeholder="Select specific location"
              value=""
              onChange={() => {}}
            />
          )}

          {exportFilter === 'custom' && (
            <TextField
              label="Custom Filters"
              placeholder="e.g., quantity < 10 AND location = 'Main Warehouse'"
              value=""
              onChange={() => {}}
              multiline={2}
            />
          )}

          <Divider />

          <Banner
            title="Export includes"
            status="info"
          >
            <ul style={{ margin: 0, paddingLeft: 'var(--p-space-400)' }}>
              <li>Product information (SKU, title, vendor)</li>
              <li>Inventory levels by location</li>
              <li>Stock movements (last 30 days)</li>
              <li>Reorder points and max stock levels</li>
              <li>Inventory value calculations</li>
            </ul>
          </Banner>
        </BlockStack>
      </Modal.Section>
    </Modal>
  )

  return (
    <>
      <InlineStack gap="200">
        <Button
          icon={ImportIcon}
          onClick={() => setActiveModal('import')}
        >
          Import Inventory
        </Button>
        <Button
          icon={ExportIcon}
          onClick={() => setActiveModal('export')}
          variant="plain"
        >
          Export
        </Button>
      </InlineStack>

      {renderImportModal()}
      {renderExportModal()}
    </>
  )
}

export default InventoryImportExport