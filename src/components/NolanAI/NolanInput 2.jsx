import React, { useState, useRef, useEffect } from 'react'
import {
  TextField,
  Button,
  BlockStack,
  InlineStack,
  Icon,
  Tooltip
} from '@shopify/polaris'
import {
  SendIcon,
  AttachmentIcon,
  MicrophoneIcon
} from '@shopify/polaris-icons'

const NolanInput = ({ onSendMessage, disabled, inputRef }) => {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    // Focus on mount if ref is provided
    if (inputRef?.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  const handleSubmit = (e) => {
    e?.preventDefault()

    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleAttachment = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real implementation, this would upload and process the file
      console.log('File selected:', file)

      // Create a message about the file
      onSendMessage(`I've uploaded a file: ${file.name}`)
    }

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleVoiceInput = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsRecording(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setMessage(transcript)
      setIsRecording(false)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsRecording(false)

      // Handle specific errors
      if (event.error === 'no-speech') {
        // No speech detected
      } else if (event.error === 'not-allowed') {
        alert('Microphone access was denied. Please allow microphone access to use voice input.')
      } else {
        alert('Speech recognition failed. Please try again.')
      }
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    try {
      recognition.start()
    } catch (error) {
      console.error('Failed to start speech recognition:', error)
      setIsRecording(false)
      alert('Failed to start voice input. Please try again.')
    }
  }

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji)
  }

  // Common suggestions for quick input
  const quickSuggestions = [
    'What can you help with?',
    'How do I set up inventory?',
    'Explain reporting features',
    'I need help with integrations',
    'What are best practices?'
  ]

  return (
    <div style={{ position: 'relative' }}>
      <form onSubmit={handleSubmit}>
        <BlockStack gap="200">
          {/* Quick suggestions (only show when empty) */}
          {message.length === 0 && (
            <div style={{
              display: 'flex',
              gap: '4px',
              flexWrap: 'wrap',
              marginBottom: '8px'
            }}>
              {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setMessage(suggestion)}
                  style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e1e3e5',
                    borderRadius: '16px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    color: '#6d7175',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    maxWidth: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e1e3e5'
                    e.target.style.color = '#202223'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa'
                    e.target.style.color = '#6d7175'
                  }}
                  title={suggestion}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Main input area */}
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-end'
          }}>
            <div style={{ flex: 1 }}>
              <TextField
                ref={inputRef}
                value={message}
                onChange={setMessage}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={disabled}
                multiline={message.length > 50}
                showCharacterCount={message.length > 100}
                maxLength={1000}
                autoComplete="off"
                style={{
                  minHeight: '44px'
                }}
              />
            </div>

            {/* Action buttons */}
            <Stack spacing="tight">
              {/* Attachment button */}
              <Tooltip content="Attach file">
                <Button
                  plain
                  monochrome
                  icon={AttachmentIcon}
                  onClick={handleAttachment}
                  disabled={disabled}
                  size="large"
                  style={{
                    minHeight: '44px',
                    minWidth: '44px'
                  }}
                />
              </Tooltip>

              {/* Voice input button */}
              <Tooltip content={isRecording ? 'Recording...' : 'Voice input'}>
                <Button
                  plain
                  monochrome
                  icon={MicrophoneIcon}
                  onClick={handleVoiceInput}
                  disabled={disabled || isRecording}
                  size="large"
                  style={{
                    minHeight: '44px',
                    minWidth: '44px',
                    color: isRecording ? '#ff4d4f' : undefined
                  }}
                />
              </Tooltip>

              {/* Send button */}
              <Tooltip content="Send message">
                <Button
                  primary
                  icon={SendIcon}
                  onClick={handleSubmit}
                  disabled={!message.trim() || disabled}
                  size="large"
                  style={{
                    minHeight: '44px',
                    minWidth: '44px'
                  }}
                />
              </Tooltip>
            </Stack>
          </div>

          {/* Recording indicator */}
          {isRecording && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              backgroundColor: '#fff2f0',
              border: '1px solid #ffccc7',
              borderRadius: '6px',
              color: '#ff4d4f',
              fontSize: '12px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#ff4d4f',
                borderRadius: '50%',
                animation: 'pulse 1.5s infinite'
              }} />
              Listening... Speak now
            </div>
          )}

          {/* Character count warning */}
          {message.length > 900 && (
            <div style={{
              fontSize: '12px',
              color: message.length > 950 ? '#ff4d4f' : '#faad14',
              textAlign: 'right'
            }}>
              {message.length}/1000 characters
            </div>
          )}
        </Stack>
      </form>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        accept="image/*,.pdf,.doc,.docx,.txt"
        style={{ display: 'none' }}
      />

      {/* Recording animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default NolanInput