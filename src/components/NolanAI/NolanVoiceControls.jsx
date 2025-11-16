import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  Stack,
  Text,
  Icon,
  ProgressBar,
  Badge
} from '@shopify/polaris'
import {
  MicrophoneMajor,
  MicrophoneOffMajor,
  PlayMinor,
  PauseMinor,
  VolumeUpMajor,
  VolumeOffMajor,
  SettingsMinor
} from '@shopify/polaris-icons'

const NolanVoiceControls = ({
  isListening,
  isSpeaking,
  onVoiceCommand,
  setListening,
  setSpeaking
}) => {
  const [isSupported, setIsSupported] = useState(false)
  const [volume, setVolume] = useState(1)
  const [voiceSettings, setVoiceSettings] = useState({
    rate: 1,
    pitch: 1,
    voice: null
  })
  const [showSettings, setShowSettings] = useState(false)
  const recognitionRef = useRef(null)
  const utteranceRef = useRef(null)

  useEffect(() => {
    // Check for speech support
    const hasSpeechRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
    const hasSpeechSynthesis = 'speechSynthesis' in window
    setIsSupported(hasSpeechRecognition && hasSpeechSynthesis)

    // Load available voices
    if (hasSpeechSynthesis) {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices()
        if (voices.length > 0 && !voiceSettings.voice) {
          // Find a good English voice
          const englishVoice = voices.find(voice =>
            voice.lang.includes('en') && voice.name.includes('Google') || voice.name.includes('Samantha')
          ) || voices[0]

          setVoiceSettings(prev => ({ ...prev, voice: englishVoice }))
        }
      }

      loadVoices()
      speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [voiceSettings.voice])

  const startListening = () => {
    if (!isSupported) {
      alert('Voice control is not supported in your browser. Please try Chrome or Edge.')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setListening(true)
    }

    recognition.onresult = (event) => {
      const current = event.resultIndex
      const transcript = event.results[current][0].transcript

      if (event.results[current].isFinal) {
        // Final result - send as command
        if (onVoiceCommand) {
          onVoiceCommand(transcript)
        }
      }
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setListening(false)

      if (event.error === 'not-allowed') {
        alert('Microphone access was denied. Please allow microphone access to use voice control.')
      } else if (event.error === 'no-speech') {
        // No speech detected, continue listening
      }
    }

    recognition.onend = () => {
      if (isListening) {
        // Restart if we're still supposed to be listening
        recognition.start()
      } else {
        setListening(false)
      }
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setListening(false)
  }

  const speak = (text) => {
    if (!isSupported || !text) return

    // Stop any current speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = voiceSettings.rate
    utterance.pitch = voiceSettings.pitch
    utterance.volume = volume

    if (voiceSettings.voice) {
      utterance.voice = voiceSettings.voice
    }

    utterance.onstart = () => {
      setSpeaking(true)
    }

    utterance.onend = () => {
      setSpeaking(false)
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error)
      setSpeaking(false)
    }

    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    speechSynthesis.cancel()
    setSpeaking(false)
    utteranceRef.current = null
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const toggleSpeaking = () => {
    if (isSpeaking) {
      stopSpeaking()
    }
  }

  const getAvailableVoices = () => {
    if (!('speechSynthesis' in window)) return []
    return speechSynthesis.getVoices()
  }

  const adjustVolume = (newVolume) => {
    setVolume(newVolume)
    // Update current utterance if speaking
    if (utteranceRef.current) {
      utteranceRef.current.volume = newVolume
    }
  }

  if (!isSupported) {
    return (
      <div style={{
        padding: '12px',
        backgroundColor: '#fff2f0',
        border: '1px solid #ffccc7',
        borderRadius: '6px',
        textAlign: 'center'
      }}>
        <Text variant="bodySm" tone="critical">
          Voice control is not supported in your browser. Please use Chrome or Edge for the best experience.
        </Text>
      </div>
    )
  }

  return (
    <div style={{
      padding: '12px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #e1e3e5',
      borderRadius: '8px'
    }}>
      <Stack vertical spacing="tight">
        {/* Main voice controls */}
        <Stack distribution="equalSpacing" alignment="center">
          <Text variant="bodySm" fontWeight="500">
            Voice Control
          </Text>

          <Stack spacing="tight">
            {/* Listening toggle */}
            <Button
              size="small"
              icon={isListening ? MicrophoneOffMajor : MicrophoneMajor}
              onClick={toggleListening}
              tone={isListening ? 'critical' : 'primary'}
              pressed={isListening}
            >
              {isListening ? 'Listening...' : 'Voice Input'}
            </Button>

            {/* Settings */}
            <Button
              size="small"
              icon={SettingsMinor}
              onClick={() => setShowSettings(!showSettings)}
              pressed={showSettings}
            />
          </Stack>
        </Stack>

        {/* Status indicators */}
        <Stack spacing="tight" wrap>
          {isListening && (
            <Badge status="info" tone="attention">
              <Stack spacing="tight" alignment="center">
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#ff4d4f',
                  borderRadius: '50%',
                  animation: 'pulse 1.5s infinite'
                }} />
                <span>Listening</span>
              </Stack>
            </Badge>
          )}

          {isSpeaking && (
            <Badge status="info">
              <Stack spacing="tight" alignment="center">
                <Icon source={VolumeUpMajor} />
                <span>Speaking</span>
              </Stack>
            </Badge>
          )}
        </Stack>

        {/* Voice settings panel */}
        {showSettings && (
          <div style={{
            marginTop: '12px',
            padding: '12px',
            backgroundColor: 'white',
            border: '1px solid #e1e3e5',
            borderRadius: '6px'
          }}>
            <Stack vertical spacing="tight">
              <Text variant="bodySm" fontWeight="500">
                Voice Settings
              </Text>

              {/* Volume control */}
              <div>
                <Text variant="bodySm" tone="subdued">
                  Volume: {Math.round(volume * 100)}%
                </Text>
                <ProgressBar
                  progress={volume * 100}
                  size="small"
                  color="primary"
                  onInteraction={(value) => adjustVolume(value / 100)}
                />
              </div>

              {/* Voice selection */}
              <div>
                <Text variant="bodySm" tone="subdued">
                  Voice:
                </Text>
                <select
                  value={voiceSettings.voice?.name || ''}
                  onChange={(e) => {
                    const selectedVoice = getAvailableVoices().find(v => v.name === e.target.value)
                    setVoiceSettings(prev => ({ ...prev, voice: selectedVoice }))
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid #e1e3e5',
                    borderRadius: '4px',
                    marginTop: '4px'
                  }}
                >
                  {getAvailableVoices().map((voice, index) => (
                    <option key={index} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              {/* Rate control */}
              <div>
                <Text variant="bodySm" tone="subdued">
                  Speed: {voiceSettings.rate}x
                </Text>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={voiceSettings.rate}
                  onChange={(e) => setVoiceSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
                  style={{
                    width: '100%',
                    marginTop: '4px'
                  }}
                />
              </div>

              {/* Test voice button */}
              <Button
                size="small"
                onClick={() => speak("Hello! This is a test of the voice system. I sound like this when I speak to you.")}
                disabled={isSpeaking}
              >
                Test Voice
              </Button>
            </Stack>
          </div>
        )}

        {/* Voice commands help */}
        <div style={{
          fontSize: '12px',
          color: '#6d7175',
          lineHeight: '1.4'
        }}>
          <strong>Voice commands:</strong> Try saying "help", "explain inventory", "what's next", or "show me reports"
        </div>
      </Stack>

      {/* Pulse animation */}
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

export default NolanVoiceControls