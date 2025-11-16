import React, { useState } from 'react'
import {
  Stack,
  Text,
  Avatar,
  Button,
  Popover,
  ActionList,
  Badge
} from '@shopify/polaris'
import {
  CheckCircleIcon,
  XCircleIcon,
  MenuHorizontalIcon
} from '@shopify/polaris-icons'

const NolanMessage = ({ message }) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const isNolan = message.type === 'nolan'
  const isUser = message.type === 'user'

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content)
    setIsActionsOpen(false)
  }

  const handleSpeakMessage = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message.content)
      utterance.rate = 0.9
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
    setIsActionsOpen(false)
  }

  const handleFeedback = (isHelpful) => {
    // In a real implementation, this would send feedback to improve the AI
    console.log(`Feedback: ${isHelpful ? 'helpful' : 'not helpful'} for message ${message.id}`)
    setIsActionsOpen(false)
  }

  const formatMessageContent = (content) => {
    // Convert markdown-like formatting to styled components
    return content
      .split('\n')
      .map((line, index) => {
        // Handle bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

        // Handle bullet points
        if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
          return (
            <div key={index} style={{
              marginLeft: '16px',
              marginBottom: '4px',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                left: '-16px',
                color: '#057aff'
              }}>•</span>
              <span dangerouslySetInnerHTML={{ __html: line.replace(/^[•\-\*]\s*/, '') }} />
            </div>
          )
        }

        // Handle numbered lists
        if (/^\d+\.\s/.test(line.trim())) {
          return (
            <div key={index} style={{
              marginLeft: '16px',
              marginBottom: '4px',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                left: '-16px',
                fontWeight: 'bold',
                color: '#057aff'
              }}>
                {line.match(/^\d+\./)[0]}
              </span>
              <span dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s/, '') }} />
            </div>
          )
        }

        // Handle empty lines
        if (line.trim() === '') {
          return <div key={index} style={{ height: '8px' }} />
        }

        // Regular text
        return (
          <div key={index} style={{ marginBottom: '4px' }}>
            <span dangerouslySetInnerHTML={{ __html: line }} />
          </div>
        )
      })
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString()
  }

  const messageActions = [
    {
      content: 'Copy message',
      icon: CheckCircleIcon,
      onAction: handleCopyMessage
    },
    {
      content: 'Speak message',
      icon: CheckCircleIcon,
      onAction: handleSpeakMessage,
      disabled: !('speechSynthesis' in window)
    }
  ]

  if (isNolan) {
    return (
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        <Avatar
          size="small"
          initials="N"
          style={{
            backgroundColor: '#057aff',
            color: 'white',
            fontWeight: 'bold',
            flexShrink: 0
          }}
        />

        <div style={{
          flex: 1,
          minWidth: 0
        }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '12px 16px',
            borderRadius: '12px',
            borderTopLeftRadius: '4px',
            border: '1px solid #e1e3e5'
          }}>
            <Stack vertical spacing="tight">
              <div style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#202223'
              }}>
                {formatMessageContent(message.content)}
              </div>

              {/* Message context indicators */}
              {message.context && (
                <div style={{
                  display: 'flex',
                  gap: '6px',
                  flexWrap: 'wrap',
                  marginTop: '8px'
                }}>
                  {message.context.topic && (
                    <Badge size="small" tone="info">
                      {message.context.topic}
                    </Badge>
                  )}
                  {message.context.confidence && (
                    <Badge size="small">
                      {Math.round(message.context.confidence * 100)}% match
                    </Badge>
                  )}
                </div>
              )}
            </Stack>
          </div>

          {/* Message footer with timestamp and actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '4px',
            padding: '0 4px'
          }}>
            <Text variant="bodySm" tone="subdued">
              {formatTimestamp(message.timestamp)}
            </Text>

            <Popover
              active={isActionsOpen}
              activator={
                <Button
                  plain
                  monochrome
                  icon={MenuHorizontalIcon}
                  onClick={() => setIsActionsOpen(!isActionsOpen)}
                  size="small"
                />
              }
              onClose={() => setIsActionsOpen(false)}
            >
              <ActionList
                items={[
                  ...messageActions,
                  {
                    content: 'This was helpful',
                    icon: CheckCircleIcon,
                    onAction: () => handleFeedback(true)
                  },
                  {
                    content: 'This wasn\'t helpful',
                    icon: XCircleIcon,
                    onAction: () => handleFeedback(false),
                    destructive: true
                  }
                ]}
              />
            </Popover>
          </div>

          {/* Suggestions attached to this message */}
          {message.suggestions && message.suggestions.length > 0 && (
            <div style={{
              marginTop: '8px',
              padding: '0 4px'
            }}>
              <Stack spacing="tight">
                {message.suggestions.slice(0, 2).map((suggestion, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#e3f2fd',
                      color: '#057aff',
                      padding: '6px 10px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      border: '1px solid #bbdefb',
                      transition: 'all 0.2s ease',
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                    onClick={() => {
                      // In a real implementation, this would trigger the suggestion action
                      console.log('Suggestion clicked:', suggestion)
                    }}
                    title={suggestion.text}
                  >
                    {suggestion.text}
                  </div>
                ))}
              </Stack>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (isUser) {
    return (
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        marginBottom: '16px',
        flexDirection: 'row-reverse'
      }}>
        <div style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}>
          <div style={{
            backgroundColor: '#057aff',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '12px',
            borderTopRightRadius: '4px',
            maxWidth: '85%',
            wordWrap: 'break-word'
          }}>
            <Text variant="bodyMd" as="p" color="white">
              {message.content}
            </Text>
          </div>

          <Text variant="bodySm" tone="subdued" style={{
            marginTop: '4px',
            marginRight: '4px'
          }}>
            {formatTimestamp(message.timestamp)}
          </Text>
        </div>

        <Avatar
          size="small"
          initials="U"
          style={{
            backgroundColor: '#6d7175',
            color: 'white',
            fontWeight: 'bold',
            flexShrink: 0
          }}
        />
      </div>
    )
  }

  return null
}

export default NolanMessage