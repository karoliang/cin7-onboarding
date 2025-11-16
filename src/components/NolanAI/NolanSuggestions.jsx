import React, { useState } from 'react'
import {
  Stack,
  Button,
  Text,
  Icon,
  InlineStack
} from '@shopify/polaris'
import {
  ChevronRightIcon,
  ExternalIcon,
  QuestionCircleIcon,
  ArrowRightIcon
} from '@shopify/polaris-icons'

const NolanSuggestions = ({ suggestions, onSuggestionClick }) => {
  const [dismissedSuggestions, setDismissedSuggestions] = useState(new Set())

  const handleSuggestionClick = (suggestion, index) => {
    if (suggestion.action) {
      // Handle different action types
      switch (suggestion.action) {
        case 'start-live-chat':
          window.open('https://cin7.com/support', '_blank')
          break
        case 'browse-help':
          window.open('https://docs.cin7.com', '_blank')
          break
        case 'contact-support':
          window.open('mailto:support@cin7.com')
          break
        case 'begin-onboarding':
          // This would navigate to onboarding
          console.log('Navigate to onboarding')
          break
        case 'skip-to-integrations':
          // This would skip to integrations step
          console.log('Skip to integrations')
          break
        default:
          // For other actions, send as message
          onSuggestionClick(suggestion)
          return
      }
    } else {
      // Default behavior - send as message
      onSuggestionClick(suggestion)
    }

    // Dismiss this suggestion after clicking
    setDismissedSuggestions(prev => new Set([...prev, index]))
  }

  const handleDismiss = (index) => {
    setDismissedSuggestions(prev => new Set([...prev, index]))
  }

  const getSuggestionIcon = (suggestion) => {
    // Return appropriate icon based on suggestion type or content
    const text = suggestion.text?.toLowerCase() || ''

    if (text.includes('help') || text.includes('explain')) {
      return QuestionCircleIcon
    }

    if (text.includes('contact') || text.includes('support')) {
      return ExternalIcon
    }

    if (text.includes('start') || text.includes('begin') || text.includes('next')) {
      return ArrowRightIcon
    }

    return ChevronRightIcon
  }

  const getSuggestionColor = (suggestion) => {
    const text = suggestion.text?.toLowerCase() || ''

    if (text.includes('contact') || text.includes('support')) {
      return '#ff4d4f' // Red for support
    }

    if (text.includes('start') || text.includes('begin')) {
      return '#52c41a' // Green for actions
    }

    return '#057aff' // Default blue
  }

  const activeSuggestions = suggestions.filter((_, index) => !dismissedSuggestions.has(index))

  if (activeSuggestions.length === 0) {
    return null
  }

  return (
    <div style={{
      marginBottom: '8px'
    }}>
      <Text variant="bodySm" tone="subdued" as="p" style={{
        marginBottom: '8px',
        fontWeight: '500'
      }}>
        Suggested actions:
      </Text>

      <Stack vertical spacing="tight">
        {activeSuggestions.map((suggestion, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #e1e3e5',
              backgroundColor: '#ffffff',
              transition: 'all 0.2s ease',
              opacity: dismissedSuggestions.has(index) ? 0.5 : 1
            }}
          >
            <Button
              fullWidth
              textAlign="left"
              onClick={() => handleSuggestionClick(suggestion, index)}
              style={{
                padding: '12px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                minHeight: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f8f9fa'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flex: 1
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: `${getSuggestionColor(suggestion)}15`,
                  color: getSuggestionColor(suggestion),
                  flexShrink: 0
                }}>
                  <Icon source={getSuggestionIcon(suggestion)} />
                </div>

                <div style={{ flex: 1 }}>
                  <Text variant="bodySm" as="span" fontWeight="500">
                    {suggestion.text}
                  </Text>

                  {suggestion.description && (
                    <Text variant="bodySm" tone="subdued" as="div">
                      {suggestion.description}
                    </Text>
                  )}
                </div>
              </div>

              <Icon
                source={ChevronRightIcon}
                color="subdued"
              />
            </Button>

            {/* Dismiss button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDismiss(index)
              }}
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '0'
              }}
              title="Dismiss suggestion"
            >
              <span style={{
                fontSize: '12px',
                color: '#6d7175',
                lineHeight: '1'
              }}>
                ×
              </span>
            </button>
          </div>
        ))}
      </Stack>

      {/* Quick action suggestions */}
      {activeSuggestions.length >= 3 && (
        <div style={{
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: '1px solid #e1e3e5'
        }}>
          <InlineStack gap="tight" wrap>
            <Button
              size="small"
              onClick={() => onSuggestionClick({ text: "What can you help me with?" })}
            >
              Quick tour
            </Button>
            <Button
              size="small"
              onClick={() => onSuggestionClick({ text: "Show me best practices" })}
            >
              Best practices
            </Button>
            <Button
              size="small"
              onClick={() => onSuggestionClick({ text: "I need technical support" })}
            >
              Get help
            </Button>
          </InlineStack>
        </div>
      )}
    </div>
  )
}

export default NolanSuggestions