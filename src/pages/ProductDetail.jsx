import React, { useState } from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  Button,
  Select,
  Badge,
  Icon,
  Thumbnail,
  InlineStack,
  BlockStack,
  Grid,
    Tabs,
  TextField,
  RadioButton,
  ChoiceList,
  Divider,
  Scrollable,
  Modal,
} from '@shopify/polaris'
import {
  EditIcon,
  DeleteIcon,
  DuplicateIcon,
  ViewIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  PackageIcon,
  ShareIcon,
  ClockIcon,
  PlusIcon,
  MinusIcon,
  ImageIcon,
  HeartIcon,
} from '@shopify/polaris-icons'

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState('medium')
  const [selectedColor, setSelectedColor] = useState('blue')
  const [activeModal, setActiveModal] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)

  const tabs = [
    {
      id: 'details',
      content: 'Details',
      panelID: 'details-content',
    },
    {
      id: 'inventory',
      content: 'Inventory',
      panelID: 'inventory-content',
    },
    {
      id: 'variants',
      content: 'Variants',
      panelID: 'variants-content',
    },
    {
      id: 'analytics',
      content: 'Analytics',
      panelID: 'analytics-content',
    },
  ]

  // Mock product data
  const product = {
    id: '1',
    title: 'Premium Classic T-Shirt',
    vendor: 'Fashion Brand Inc',
    type: 'Clothing',
    status: 'active',
    price: '$29.99',
    compareAtPrice: '$49.99',
    description: 'A premium quality t-shirt made from 100% organic cotton. Features a comfortable fit and timeless design that works for any occasion.',
    tags: ['cotton', 'organic', 'premium', 'casual'],
    sku: 'TSH-PREM-001',
    weight: '0.2 kg',
    created: '2024-01-01',
    updated: '2024-01-15',
  }

  const images = [
    'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
    'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
    'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
    'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
    'https://cdn.shopify.com/shopifycloud/web/assets/v1/8e8f4f6c7e3f1f1b/logo-light.svg',
  ]

  const variants = [
    { label: 'Small', value: 'small', price: '$29.99', inventory: 50 },
    { label: 'Medium', value: 'medium', price: '$29.99', inventory: 150 },
    { label: 'Large', value: 'large', price: '$32.99', inventory: 85 },
    { label: 'X-Large', value: 'xlarge', price: '$34.99', inventory: 25 },
  ]

  const colors = [
    { label: 'Blue', value: 'blue', available: true },
    { label: 'Red', value: 'red', available: true },
    { label: 'Green', value: 'green', available: false },
    { label: 'Black', value: 'black', available: true },
    { label: 'White', value: 'white', available: true },
  ]

  const reviews = [
    { id: 1, author: 'John D.', rating: 5, comment: 'Excellent quality t-shirt!', date: '2024-01-10' },
    { id: 2, author: 'Sarah M.', rating: 4, comment: 'Great fit, very comfortable.', date: '2024-01-08' },
    { id: 3, author: 'Mike R.', rating: 5, comment: 'Best t-shirt I\'ve ever owned.', date: '2024-01-05' },
  ]

  const ImageGallery = () => (
    <Card>
      <div style={{ padding: 'var(--p-space-6)' }}>
        <BlockStack gap="400">
          {/* Main Image */}
          <div style={{ textAlign: 'center' }}>
            <Thumbnail
              source={images[selectedImage]}
              size="large"
              alt={product.title}
              style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
            />
          </div>

          {/* Image Thumbnails */}
          <InlineStack gap="200" justify="center">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                style={{
                  border: selectedImage === index ? '2px solid var(--p-color-bg-surface-selected)' : '2px solid transparent',
                  borderRadius: 'var(--p-border-radius-base)',
                  padding: 'var(--p-space-100)',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                <Thumbnail
                  source={image}
                  size="small"
                  alt={`${product.title} ${index + 1}`}
                />
              </button>
            ))}
          </InlineStack>

          {/* Image Navigation */}
          <InlineStack gap="200" justify="center">
            <Button
              icon={ChevronLeftIcon}
              onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
              disabled={selectedImage === 0}
            />
            <Text tone="subdued" as="p">
              {selectedImage + 1} of {images.length}
            </Text>
            <Button
              icon={ChevronRightIcon}
              onClick={() => setSelectedImage(Math.min(images.length - 1, selectedImage + 1))}
              disabled={selectedImage === images.length - 1}
            />
          </InlineStack>
        </BlockStack>
      </div>
    </Card>
  )

  const ProductInfo = () => (
    <BlockStack gap="600">
      {/* Title and Status */}
      <BlockStack gap="200">
        <InlineStack align="space-between">
          <Text variant="headingLg" as="h1">{product.title}</Text>
          <InlineStack gap="200">
            <Button icon={EditIcon} onClick={() => console.log('Edit product')}>
              Edit
            </Button>
            <Button icon={DuplicateIcon} onClick={() => console.log('Duplicate product')}>
              Duplicate
            </Button>
          </InlineStack>
        </InlineStack>
        <InlineStack gap="200">
          <Text tone="subdued" as="p">{product.vendor}</Text>
          <Text tone="subdued" as="p">•</Text>
          <Text tone="subdued" as="p">{product.type}</Text>
          <Badge tone="success">Active</Badge>
        </InlineStack>
      </BlockStack>

      {/* Price */}
      <InlineStack gap="400" align="baseline">
        <Text variant="headingLg" as="span">{product.price}</Text>
        <Text variant="bodyMd" tone="subdued" textDecoration="line-through" as="span">
          {product.compareAtPrice}
        </Text>
        <Badge tone="success">Save 40%</Badge>
      </InlineStack>

      {/* Description */}
      <Text as="p">{product.description}</Text>

      {/* Variant Selection */}
      <BlockStack gap="400">
        <Text variant="headingMd" as="h3">Size</Text>
        <RadioButton
          label={variants[0].label}
          checked={selectedVariant === variants[0].value}
          name="size"
          onChange={() => setSelectedVariant(variants[0].value)}
        />
        <RadioButton
          label={variants[1].label}
          checked={selectedVariant === variants[1].value}
          name="size"
          onChange={() => setSelectedVariant(variants[1].value)}
        />
        <RadioButton
          label={variants[2].label}
          checked={selectedVariant === variants[2].value}
          name="size"
          onChange={() => setSelectedVariant(variants[2].value)}
        />
        <RadioButton
          label={variants[3].label}
          checked={selectedVariant === variants[3].value}
          name="size"
          onChange={() => setSelectedVariant(variants[3].value)}
        />
      </BlockStack>

      {/* Color Selection */}
      <BlockStack gap="400">
        <Text variant="headingMd" as="h3">Color</Text>
        <ChoiceList
          title="Color"
          choices={colors}
          selected={[selectedColor]}
          onChange={(value) => setSelectedColor(value[0])}
          titleHidden
        />
      </BlockStack>

      {/* Quantity */}
      <BlockStack gap="400">
        <Text variant="headingMd" as="h3">Quantity</Text>
        <InlineStack gap="200">
          <Button
            icon={MinusIcon}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          />
          <TextField
            type="number"
            value={quantity.toString()}
            onChange={(value) => setQuantity(Math.max(1, parseInt(value) || 1))}
            min={1}
            max={999}
          />
          <Button
            icon={PlusIcon}
            onClick={() => setQuantity(quantity + 1)}
          />
        </InlineStack>
      </BlockStack>

      {/* Action Buttons */}
      <BlockStack gap="300">
        <Button size="large" primary onClick={() => console.log('Add to cart')}>
          Add to cart
        </Button>
        <Button size="large" onClick={() => console.log('Buy now')}>
          Buy now
        </Button>
        <InlineStack gap="200">
          <Button icon={HeartIcon} onClick={() => console.log('Add to wishlist')}>
            Save for later
          </Button>
          <Button icon={ShareIcon} onClick={() => console.log('Share product')}>
            Share
          </Button>
        </InlineStack>
      </BlockStack>

      {/* Product Details */}
      <Card>
        <div style={{ padding: 'var(--p-space-6)' }}>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h3">Product Details</Text>
            <InlineStack gap="400">
              <Text tone="subdued" as="p">SKU:</Text>
              <Text as="p">{product.sku}</Text>
            </InlineStack>
            <InlineStack gap="400">
              <Text tone="subdued" as="p">Weight:</Text>
              <Text as="p">{product.weight}</Text>
            </InlineStack>
            <InlineStack gap="400">
              <Text tone="subdued" as="p">Created:</Text>
              <Text as="p">{product.created}</Text>
            </InlineStack>
            <InlineStack gap="400">
              <Text tone="subdued" as="p">Last updated:</Text>
              <Text as="p">{product.updated}</Text>
            </InlineStack>
          </BlockStack>
        </div>
      </Card>
    </BlockStack>
  )

  const ReviewsSection = () => (
    <Card>
      <div style={{ padding: 'var(--p-space-6)' }}>
        <BlockStack gap="600">
          <Text variant="headingMd" as="h3">Customer Reviews</Text>

          {/* Overall Rating */}
          <InlineStack gap="200" align="center">
            <InlineStack gap="100">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  source={StarIcon}
                  tone="subdued"
                />
              ))}
            </InlineStack>
            <Text as="p">4.7 out of 5</Text>
            <Text tone="subdued" as="p">(127 reviews)</Text>
          </InlineStack>

          <Divider />

          {/* Individual Reviews */}
          {reviews.map((review) => (
            <BlockStack key={review.id} gap="200">
              <InlineStack gap="200" align="center">
                <InlineStack gap="100">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      source={StarIcon}
                      tone={star <= review.rating ? 'warning' : 'subdued'}
                    />
                  ))}
                </InlineStack>
                <Text fontWeight="medium" as="p">{review.author}</Text>
                <Text tone="subdued" as="p">{review.date}</Text>
              </InlineStack>
              <Text as="p">{review.comment}</Text>
              <Divider />
            </BlockStack>
          ))}
        </BlockStack>
      </div>
    </Card>
  )

  return (
    <Page
      title={product.title}
      subtitle="Product details and management"
      breadcrumbs={[{ content: 'Products', url: '/product-listing' }]}
      primaryAction={{
        content: 'Edit product',
        icon: EditIcon,
        onAction: () => console.log('Edit product clicked'),
      }}
      secondaryActions={[
        {
          content: 'Duplicate',
          icon: DuplicateIcon,
          onAction: () => console.log('Duplicate product clicked'),
        },
        {
          content: 'Delete',
          icon: DeleteIcon,
          destructive: true,
          onAction: () => setActiveModal(true),
        },
      ]}
    >
      <Layout>
        {/* Left Column - Image Gallery */}
        <Layout.Section variant="oneHalf">
          <ImageGallery />
        </Layout.Section>

        {/* Right Column - Product Info */}
        <Layout.Section variant="oneHalf">
          <ProductInfo />
        </Layout.Section>

        {/* Full Width Sections */}
        <Layout.Section>
          <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
            {selectedTab === 0 && (
              <BlockStack gap="600">
                <Card>
                  <div style={{ padding: 'var(--p-space-6)' }}>
                    <Text variant="headingMd" as="h2" marginBottom="400">
                      Product Description
                    </Text>
                    <Text as="p">{product.description}</Text>
                    <Divider />
                    <BlockStack gap="300" marginTop="400">
                      <Text fontWeight="semibold" as="h4">Features:</Text>
                      <ul style={{ margin: 0, paddingLeft: 'var(--p-space-600)' }}>
                        <li>100% organic cotton</li>
                        <li>Machine washable</li>
                        <li>Premium quality stitching</li>
                        <li>Comfortable fit</li>
                      </ul>
                    </BlockStack>
                  </div>
                </Card>
                <ReviewsSection />
              </BlockStack>
            )}

            {selectedTab === 1 && (
              <Card>
                <div style={{ padding: 'var(--p-space-6)' }}>
                  <Text variant="headingMd" as="h2">
                    Inventory Management
                  </Text>
                  <Text as="p">
                    Track inventory levels, set reorder points, and manage stock across multiple locations.
                  </Text>
                </div>
              </Card>
            )}

            {selectedTab === 2 && (
              <Card>
                <div style={{ padding: 'var(--p-space-6)' }}>
                  <Text variant="headingMd" as="h2">
                    Product Variants
                  </Text>
                  <Text as="p">
                    Manage different sizes, colors, and other product variations.
                  </Text>
                </div>
              </Card>
            )}

            {selectedTab === 3 && (
              <Card>
                <div style={{ padding: 'var(--p-space-6)' }}>
                  <Text variant="headingMd" as="h2">
                    Product Analytics
                  </Text>
                  <Text as="p">
                    View sales performance, customer behavior, and conversion metrics.
                  </Text>
                </div>
              </Card>
            )}
          </Tabs>
        </Layout.Section>
      </Layout>

      {/* Delete Confirmation Modal */}
      <Modal
        open={activeModal}
        onClose={() => setActiveModal(false)}
        title="Delete product"
        primaryAction={{
          content: 'Delete product',
          destructive: true,
          onAction: () => {
            console.log('Product deleted')
            setActiveModal(false)
          },
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setActiveModal(false),
          },
        ]}
      >
        <Modal.Section>
          <Text>
            Are you sure you want to delete "{product.title}"? This action cannot be undone.
          </Text>
        </Modal.Section>
      </Modal>
    </Page>
  )
}

export default ProductDetail