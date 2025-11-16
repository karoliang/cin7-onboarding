import React, { useState, useEffect, useRef } from 'react'
import {
  Card,
  Button,
  Icon,
  Stack,
  Badge,
  Text,
  Divider,
  Scrollable,
  Avatar
} from '@shopify/polaris'
import {
  ChatMinor,
  MobileHorizontalDotsMajor,
  MicrophoneMajor,
  SettingsMajor,
  CircleCancelMinor
} from '@shopify/polaris-icons'
import { useNolan } from '../../contexts/NolanContext'
import NolanMessage from './NolanMessage'
import NolanInput from './NolanInput'
import NolanSuggestions from './NolanSuggestions'
import NolanVoiceControls from './NolanVoiceControls'

const NolanChatWidget = () => {
  const { state, actions } = useNolan()
  const [isMinimized, setIsMinimized] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [state.messages])

  // Update unread count when chat is closed
  useEffect(() => {
    if (!state.isOpen && state.messages.length > 0) {
      const lastReadIndex = state.messages.findIndex(msg =>
        new Date(msg.timestamp) > new Date(state.lastInteraction || 0)
      )
      setUnreadCount(state.messages.length - Math.max(0, lastReadIndex))
    } else {
      setUnreadCount(0)
    }
  }, [state.messages, state.isOpen, state.lastInteraction])

  // Focus input when chat opens
  useEffect(() => {
    if (state.isOpen && !state.isTyping && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300)
    }
  }, [state.isOpen, state.isTyping])

  const handleToggleChat = () => {
    if (state.isOpen) {
      actions.closeChat()
    } else {
      actions.openChat()
      setIsMinimized(false)
    }
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleSendMessage = async (message) => {
    await actions.sendMessage(message)
  }

  const handleSuggestionClick = async (suggestion) => {
    await actions.sendMessage(suggestion.text)
  }

  const handleVoiceCommand = async (command) => {
    if (command) {
      await actions.sendMessage(command)
    }
  }

  // Render closed state (floating button)
  if (!state.isOpen) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999
      }}>
        <div style={{ position: 'relative' }}>
          <Button
            onClick={handleToggleChat}
            primary
            size="large"
            icon={ChatMinor}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              backgroundColor: '#057aff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Icon source={ChatMinor} color="base" />
          </Button>

          {unreadCount > 0 && (
            <Badge
              status="new"
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: '#ff4d4f',
                color: 'white',
                fontSize: '12px',
                minWidth: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </div>
      </div>
    )
  }

  // Render open state
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '380px',
      height: isMinimized ? '60px' : '600px',
      zIndex: 9999,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <Card>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: '#057aff',
          color: 'white',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          cursor: 'pointer'
        }}
        onClick={handleMinimize}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar
              size="small"
              initials="N"
              style={{
                backgroundColor: 'white',
                color: '#057aff',
                fontWeight: 'bold'
              }}
            />
            <div>
              <Text variant="bodySm" as="h3" color="white">
                Nolan - Your AI Assistant
              </Text>
              <Text variant="bodySm" as="p" color="white" tone="subdued">
                {state.isTyping ? 'Typing...' : 'Always here to help'}
              </Text>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
            <Button
              plain
              monochrome
              icon={SettingsMajor}
              onClick={() => setShowSettings(!showSettings)}
              style={{ color: 'white' }}
            />
            <Button
              plain
              monochrome
              icon={isMinimized ? ChatMinor : MobileHorizontalDotsMajor}
              onClick={handleMinimize}
              style={{ color: 'white' }}
            />
            <Button
              plain
              monochrome
              icon={CircleCancelMinor}
              onClick={handleToggleChat}
              style={{ color: 'white' }}
            />
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && !isMinimized && (
          <div style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e1e3e5'
          }}>
            <Stack vertical spacing="tight">
              <Text variant="bodySm" as="p">Response Style:</Text>
              <Stack>
                <Button
                  size="small"
                  pressed={state.userPreferences.responseStyle === 'professional'}
                  onClick={() => actions.updatePreferences({ responseStyle: 'professional' })}
                >
                  Professional
                </Button>
                <Button
                  size="small"
                  pressed={state.userPreferences.responseStyle === 'casual'}
                  onClick={() => actions.updatePreferences({ responseStyle: 'casual' })}
                >
                  Casual
                </Button>
                <Button
                  size="small"
                  pressed={state.userPreferences.responseStyle === 'detailed'}
                  onClick={() => actions.updatePreferences({ responseStyle: 'detailed' })}
                >
                  Detailed
                </Button>
              </Stack>

              <div style={{ marginTop: '8px' }}>
                <Stack spacing="tight">
                  <input
                    type="checkbox"
                    id="autoSuggestions"
                    checked={state.userPreferences.autoSuggestions}
                    onChange={(e) => actions.updatePreferences({ autoSuggestions: e.target.checked })}
                  />
                  <label htmlFor="autoSuggestions">
                    <Text variant="bodySm">Auto-suggestions</Text>
                  </label>
                </Stack>

                <Stack spacing="tight">
                  <input
                    type="checkbox"
                    id="proactiveHelp"
                    checked={state.userPreferences.proactiveHelp}
                    onChange={(e) => actions.updatePreferences({ proactiveHelp: e.target.checked })}
                  />
                  <label htmlFor="proactiveHelp">
                    <Text variant="bodySm">Proactive help</Text>
                  </label>
                </Stack>
              </div>

              <Button
                size="small"
                onClick={actions.clearConversation}
                tone="critical"
              >
                Clear Conversation
              </Button>
            </Stack>
          </div>
        )}

        {/* Messages Area */}
        {!isMinimized && (
          <>
            <div style={{
              height: '350px',
              overflow: 'hidden'
            }}>
              <Scrollable shadow style={{ height: '100%' }}>
                <div style={{ padding: '16px' }}>
                  {state.messages.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '40px 20px',
                      color: '#6d7175'
                    }}>
                      <Avatar
                        size="large"
                        initials="N"
                        style={{
                          backgroundColor: '#057aff',
                          color: 'white',
                          fontWeight: 'bold',
                          marginBottom: '16px'
                        }}
                      />
                      <Text variant="headingMd" as="h2">
                        Hi! I'm Nolan
                      </Text>
                      <Text variant="bodyMd" as="p" tone="subdued">
                        Your AI assistant for Cin7 Core. I can help you with onboarding, feature setup, best practices, and troubleshooting.
                      </Text>
                      <Text variant="bodySm" as="p" tone="subdued" style={{ marginTop: '16px' }}>
                        Try asking me: "How do I set up inventory?" or "What's the best way to start?"
                      </Text>
                    </div>
                  ) : (
                    <Stack vertical spacing="loose">
                      {state.messages.map((message) => (
                        <NolanMessage
                          key={message.id}
                          message={message}
                        />
                      ))}
                      {state.isTyping && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '12px',
                          maxWidth: '80%'
                        }}>
                          <Avatar
                            size="small"
                            initials="N"
                            style={{
                              backgroundColor: '#057aff',
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          />
                          <div style={{
                            display: 'flex',
                            gap: '4px',
                            alignItems: 'center'
                          }}>
                            <div style={{
                              width: '8px',
                              height: '8px',
                              backgroundColor: '#6d7175',
                              borderRadius: '50%',
                              animation: 'bounce 1.4s infinite ease-in-out'
                            }} />
                            <div style={{
                              width: '8px',
                              height: '8px',
                              backgroundColor: '#6d7175',
                              borderRadius: '50%',
                              animation: 'bounce 1.4s infinite ease-in-out',
                              animationDelay: '0.2s'
                            }} />
                            <div style={{
                              width: '8px',
                              height: '8px',
                              backgroundColor: '#6d7175',
                              borderRadius: '50%',
                              animation: 'bounce 1.4s infinite ease-in-out',
                              animationDelay: '0.4s'
                            }} />
                          </div>
                        </div>
                      )}
                    </Stack>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </Scrollable>
            </div>

            {/* Suggestions */}
            {state.suggestions.length > 0 && !state.isTyping && (
              <div style={{
                padding: '0 16px 8px'
              }}>
                <NolanSuggestions
                  suggestions={state.suggestions}
                  onSuggestionClick={handleSuggestionClick}
                />
              </div>
            )}

            {/* Voice Controls */}
            {state.userPreferences.voiceEnabled && (
              <div style={{
                padding: '8px 16px 0'
              }}>
                <NolanVoiceControls
                  isListening={state.isListening}
                  isSpeaking={state.isSpeaking}
                  onVoiceCommand={handleVoiceCommand}
                  setListening={actions.setListening}
                  setSpeaking={actions.setSpeaking}
                />
              </div>
            )}

            {/* Input Area */}
            <div style={{
              padding: '16px',
              borderTop: '1px solid #e1e3e5',
              backgroundColor: '#ffffff'
            }}>
              <NolanInput
                onSendMessage={handleSendMessage}
                disabled={state.isTyping}
                inputRef={inputRef}
              />
            </div>
          </>
        )}
      </Card>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default NolanChatWidget