export interface InventoryLocation {
  id: string
  name: string
  code: string
  address: {
    street: string
    city: string
    state: string
    country: string
    postalCode: string
  }
  isActive: boolean
  isDefault: boolean
  totalProducts: number
  totalValue: number
}

export interface InventoryBin {
  id: string
  locationId: string
  name: string
  code: string
  zone?: string
  aisle?: string
  shelf?: string
  capacity?: number
  currentUtilization: number
}

export interface StockMovement {
  id: string
  productId: string
  locationId: string
  binId?: string
  type: 'IN' | 'OUT' | 'TRANSFER' | 'ADJUSTMENT' | 'SALE' | 'PURCHASE' | 'RETURN'
  quantity: number
  reference?: string
  notes?: string
  cost?: number
  userId: string
  createdAt: Date
  relatedMovementId?: string // For transfers
}

export interface StockLevel {
  id: string
  productId: string
  locationId: string
  binId?: string
  quantityAvailable: number
  quantityCommitted: number
  quantityOnOrder: number
  quantityIncoming: number
  reorderPoint: number
  maxStock: number
  averageCost: number
  totalValue: number
  lastUpdated: Date
  lastCounted?: Date
}

export interface ProductInventory {
  productId: string
  sku: string
  barcode?: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: 'cm' | 'in'
  }
  stockLevels: StockLevel[]
  totalStock: number
  totalCommitted: number
  totalOnOrder: number
  totalAvailable: number
  lowStockLocations: string[]
  outOfStockLocations: string[]
  averageValue: number
  totalValue: number
}

export interface LowStockAlert {
  id: string
  productId: string
  locationId: string
  currentStock: number
  reorderPoint: number
  severity: 'LOW' | 'CRITICAL' | 'OUT'
  daysOfStockLeft: number
  suggestedOrderQuantity: number
  createdAt: Date
  acknowledgedAt?: Date
  acknowledgedBy?: string
}

export interface InventoryTransfer {
  id: string
  fromLocationId: string
  toLocationId: string
  productId: string
  quantity: number
  status: 'PENDING' | 'IN_TRANSIT' | 'COMPLETED' | 'CANCELLED'
  initiatedBy: string
  initiatedAt: Date
  completedAt?: Date
  notes?: string
  trackingNumber?: string
  estimatedArrival?: Date
}

export interface StockCount {
  id: string
  locationId: string
  binId?: string
  status: 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'VARIANCE_FOUND'
  startedBy: string
  startedAt: Date
  completedAt?: Date
  items: StockCountItem[]
  totalItems: number
  varianceCount: number
  totalValue: number
  varianceValue: number
}

export interface StockCountItem {
  productId: string
  expectedQuantity: number
  countedQuantity: number
  variance: number
  varianceValue: number
  notes?: string
}

export interface InventoryAnalytics {
  totalProducts: number
  totalLocations: number
  totalValue: number
  lowStockAlerts: number
  outOfStockProducts: number
  topMovingProducts: Array<{
    productId: string
    movements: number
    volume: number
  }>
  locationUtilization: Array<{
    locationId: string
    utilization: number
    capacity: number
  }>
  turnoverRate: number
  deadStockValue: number
  deadStockItems: number
}

export interface InventoryFilter {
  status?: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'
  locationIds?: string[]
  category?: string
  searchQuery?: string
  lowStockOnly?: boolean
  hasBarcodesOnly?: boolean
}

export interface ImportExportResult {
  success: boolean
  totalProcessed: number
  successful: number
  failed: number
  errors: Array<{
    row: number
    field: string
    message: string
  }>
}