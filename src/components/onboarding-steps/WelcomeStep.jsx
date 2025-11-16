import React from 'react'
import {
  Card,
  Text,
  Button,
  Layout,
  BlockStack,
  InlineStack,
  Grid,
  Badge,
  Icon,
  Box,
  Avatar,
  Divider
} from '@shopify/polaris'
import {
  PlusIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  StarFilledIcon,
  ChartVerticalIcon,
  PackageIcon,
  DeliveryIcon,
  PersonIcon
} from '@shopify/polaris-icons'

import { useOnboarding } from '../../contexts/OnboardingContext'

const WelcomeStep = ({ onValidationChange, onSave }) => {
  const { state } = useOnboarding()

  // This step is always valid
  React.useEffect(() => {
    onValidationChange(true)
  }, [onValidationChange])

  const highlights = [
    {
      icon: ChartVerticalIcon,
      title: 'Real-time Analytics',
      description: 'Track inventory, sales, and business performance with live dashboards'
    },
    {
      icon: PackageIcon,
      title: 'Smart Inventory',
      description: 'Automated stock management with AI-powered forecasting and low stock alerts'
    },
    {
      icon: DeliveryIcon,
      title: 'Multi-channel Selling',
      description: 'Sell seamlessly across retail, online, and wholesale channels'
    },
    {
      icon: PersonIcon,
      title: 'Customer Management',
      description: 'Complete CRM with order history and personalized customer experiences'
    }
  ]

  const quickStats = [
    { label: 'Products Managed', value: '2.8M+' },
    { label: 'Orders Processed', value: '45M+' },
    { label: 'Countries', value: '120+' },
    { label: 'Customer Satisfaction', value: '98%' }
  ]

  return (
    <BlockStack gap="600">
      {/* Welcome Header */}
      <Card>
        <Box padding="600" textAlign="center">
          <BlockStack gap="400">
            <Box textAlign="center">
              <Avatar customer size="extraLarge" name="Cin7" />
            </Box>

            <Text variant="headingLg" as="h1">
              Welcome to Cin7 Core
            </Text>

            <Text variant="bodyLg" tone="subdued" as="p">
              The complete inventory management platform designed to help you grow your business,
              streamline operations, and make data-driven decisions.
            </Text>

            <Badge size="large" tone="success">
              <Icon source={StarIcon} />
              <Box padding="100">
                <Text variant="bodySm" fontWeight="medium">
                  Trusted by 15,000+ businesses worldwide
                </Text>
              </Box>
            </Badge>
          </BlockStack>
        </Box>
      </Card>

      {/* Platform Highlights */}
      <Card>
        <Box padding="500">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2" textAlign="center">
              What makes Cin7 Core different?
            </Text>

            <Grid columns={{ xs: 1, sm: 2 }}>
              {highlights.map((highlight, index) => (
                <Box key={index} padding="300">
                  <BlockStack gap="200">
                    <InlineStack gap="300">
                      <Icon source={highlight.icon} size="medium" tone="primary" />
                      <Text variant="headingSm" fontWeight="medium">
                        {highlight.title}
                      </Text>
                    </InlineStack>
                    <Text variant="bodySm" tone="subdued">
                      {highlight.description}
                    </Text>
                  </BlockStack>
                </Box>
              ))}
            </Grid>
          </BlockStack>
        </Box>
      </Card>

      {/* Success Metrics */}
      <Card>
        <Box padding="500">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2" textAlign="center">
              Join thousands of successful businesses
            </Text>

            <Grid columns={{ xs: 2, sm: 4 }}>
              {quickStats.map((stat, index) => (
                <Box key={index} textAlign="center" padding="200">
                  <Text variant="headingLg" tone="primary">
                    {stat.value}
                  </Text>
                  <Text variant="bodySm" tone="subdued">
                    {stat.label}
                  </Text>
                </Box>
              ))}
            </Grid>

            <Divider />

            <Box padding="300" backgroundColor="bg-surface-secondary" borderRadius="200">
              <Text variant="bodySm" textAlign="center" tone="subdued">
                "Cin7 Core helped us reduce inventory costs by 40% and improve order fulfillment speed by 3x."
                <br />
                <Text variant="bodySm" fontWeight="medium">
                  – Sarah Johnson, Retail Business Owner
                </Text>
              </Text>
            </Box>
          </BlockStack>
        </Box>
      </Card>

      {/* What to Expect */}
      <Card>
        <Box padding="500">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">
              What to Expect from This Onboarding
            </Text>

            <BlockStack gap="300">
              <InlineStack gap="300">
                <Icon source={ClockIcon} size="small" tone="subdued" />
                <Text variant="bodySm">
                  <strong>30-45 minutes</strong> to complete the full setup
                </Text>
              </InlineStack>

              <InlineStack gap="300">
                <Icon source={PackageIcon} size="small" tone="subdued" />
                <Text variant="bodySm">
                  <strong>Industry-tailored</strong> configuration for your specific needs
                </Text>
              </InlineStack>

              <InlineStack gap="300">
                <Icon source={CheckCircleIcon} size="small" tone="subdued" />
                <Text variant="bodySm">
                  <strong>Step-by-step guidance</strong> with no technical knowledge required
                </Text>
              </InlineStack>

              <InlineStack gap="300">
                <Icon source={StarFilledIcon} size="small" tone="subdued" />
                <Text variant="bodySm">
                  <strong>Instant value</strong> - start seeing benefits immediately
                </Text>
              </InlineStack>
            </BlockStack>

            <Box padding="400" backgroundColor="bg-surface-tertiary" borderRadius="200">
              <InlineStack gap="300">
                <Icon source={PlusIcon} size="small" tone="attention" />
                <BlockStack gap="100">
                  <Text variant="bodySm" fontWeight="medium">
                    Pro Tip
                  </Text>
                  <Text variant="bodySm" tone="subdued">
                    You can save your progress at any time and return later to complete the setup.
                    All your information will be securely stored.
                  </Text>
                </BlockStack>
              </InlineStack>
            </Box>
          </BlockStack>
        </Box>
      </Card>

      {/* Getting Started */}
      <Card>
        <Box padding="500">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2" textAlign="center">
              Ready to get started?
            </Text>

            <Text variant="bodyLg" tone="subdued" textAlign="center">
              We'll guide you through each step to personalize Cin7 Core for your business.
            </Text>

            <Box padding="400" backgroundColor="bg-surface-secondary" borderRadius="200" textAlign="center">
              <BlockStack gap="200">
                <Icon source={StarIcon} size="large" tone="attention" />
                <Text variant="bodySm" fontWeight="medium">
                  Let's begin with understanding your business
                </Text>
                <Text variant="bodyXs" tone="subdued">
                  This helps us recommend the right features and configuration for your specific needs
                </Text>
              </BlockStack>
            </Box>
          </BlockStack>
        </Box>
      </Card>
    </BlockStack>
  )
}

export default WelcomeStep