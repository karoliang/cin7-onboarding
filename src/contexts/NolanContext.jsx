import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react'
import { NolanAIService } from '../services/NolanAIService/conversationEngine'

// Initial state for Nolan AI
const initialState = {
  isOpen: false,
  isTyping: false,
  isVoiceEnabled: false,
  isListening: false,
  isSpeaking: false,
  messages: [],
  suggestions: [],
  currentContext: {
    currentPage: '',
    onboardingStep: null,
    userIndustry: '',
    businessSize: '',
    completedSteps: []
  },
  conversationHistory: [],
  userPreferences: {
    responseStyle: 'professional', // 'professional', 'casual', 'detailed'
    voiceEnabled: false,
    autoSuggestions: true,
    proactiveHelp: true
  },
  lastInteraction: null,
  sessionStartTime: null
}

// Action types
const NOLAN_ACTIONS = {
  TOGGLE_CHAT: 'TOGGLE_CHAT',
  OPEN_CHAT: 'OPEN_CHAT',
  CLOSE_CHAT: 'CLOSE_CHAT',
  SET_TYPING: 'SET_TYPING',
  ADD_MESSAGE: 'ADD_MESSAGE',
  ADD_USER_MESSAGE: 'ADD_USER_MESSAGE',
  ADD_NOLAN_MESSAGE: 'ADD_NOLAN_MESSAGE',
  SET_SUGGESTIONS: 'SET_SUGGESTIONS',
  UPDATE_CONTEXT: 'UPDATE_CONTEXT',
  SET_VOICE_ENABLED: 'SET_VOICE_ENABLED',
  SET_LISTENING: 'SET_LISTENING',
  SET_SPEAKING: 'SET_SPEAKING',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  SET_LAST_INTERACTION: 'SET_LAST_INTERACTION',
  LOAD_CONVERSATION: 'LOAD_CONVERSATION',
  SAVE_CONVERSATION: 'SAVE_CONVERSATION'
}

// Reducer function
function nolanReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_CHAT':
      return {
        ...state,
        isOpen: !state.isOpen,
        lastInteraction: new Date().toISOString()
      }

    case 'OPEN_CHAT':
      return {
        ...state,
        isOpen: true,
        lastInteraction: new Date().toISOString()
      }

    case 'CLOSE_CHAT':
      return {
        ...state,
        isOpen: false,
        isListening: false,
        isSpeaking: false
      }

    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload
      }

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        conversationHistory: [...state.conversationHistory, action.payload],
        lastInteraction: new Date().toISOString()
      }

    case 'ADD_USER_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, {
          id: Date.now(),
          type: 'user',
          content: action.payload,
          timestamp: new Date().toISOString()
        }],
        lastInteraction: new Date().toISOString()
      }

    case 'ADD_NOLAN_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, {
          id: Date.now(),
          type: 'nolan',
          content: action.payload.content,
          timestamp: new Date().toISOString(),
          suggestions: action.payload.suggestions,
          context: action.payload.context
        }],
        suggestions: action.payload.suggestions || [],
        isTyping: false,
        lastInteraction: new Date().toISOString()
      }

    case 'SET_SUGGESTIONS':
      return {
        ...state,
        suggestions: action.payload
      }

    case 'UPDATE_CONTEXT':
      return {
        ...state,
        currentContext: {
          ...state.currentContext,
          ...action.payload
        }
      }

    case 'SET_VOICE_ENABLED':
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          voiceEnabled: action.payload
        }
      }

    case 'SET_LISTENING':
      return {
        ...state,
        isListening: action.payload
      }

    case 'SET_SPEAKING':
      return {
        ...state,
        isSpeaking: action.payload
      }

    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: [],
        suggestions: []
      }

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...action.payload
        }
      }

    case 'SET_LAST_INTERACTION':
      return {
        ...state,
        lastInteraction: new Date().toISOString()
      }

    case 'LOAD_CONVERSATION':
      return {
        ...state,
        ...action.payload,
        sessionStartTime: new Date().toISOString()
      }

    case 'SAVE_CONVERSATION':
      // This is handled by useEffect, but we can add state logging here
      return state

    default:
      return state
  }
}

// Create the context
const NolanContext = createContext()

// Provider component
export function NolanProvider({ children }) {
  const [state, dispatch] = useReducer(nolanReducer, initialState)
  const nolanService = useRef(new NolanAIService())

  // Initialize Nolan service
  useEffect(() => {
    nolanService.current.initialize({
      onTypingStart: () => dispatch({ type: 'SET_TYPING', payload: true }),
      onTypingEnd: () => dispatch({ type: 'SET_TYPING', payload: false }),
      onSuggestion: (suggestions) => dispatch({ type: 'SET_SUGGESTIONS', payload: suggestions })
    })
  }, [])

  // Load conversation history from localStorage
  useEffect(() => {
    const loadConversation = () => {
      try {
        const savedConversation = localStorage.getItem('nolan-conversation-history')
        const savedPreferences = localStorage.getItem('nolan-user-preferences')

        if (savedConversation) {
          const conversation = JSON.parse(savedConversation)
          dispatch({ type: 'LOAD_CONVERSATION', payload: conversation })
        }

        if (savedPreferences) {
          const preferences = JSON.parse(savedPreferences)
          dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences })
        }
      } catch (error) {
        console.error('Failed to load Nolan conversation:', error)
      }
    }

    loadConversation()
  }, [])

  // Auto-save conversation to localStorage
  useEffect(() => {
    const saveConversation = () => {
      try {
        const conversationToSave = {
          messages: state.messages.slice(-50), // Save last 50 messages
          conversationHistory: state.conversationHistory.slice(-100), // Save last 100 messages
          userPreferences: state.userPreferences
        }

        localStorage.setItem('nolan-conversation-history', JSON.stringify(conversationToSave))
        localStorage.setItem('nolan-user-preferences', JSON.stringify(state.userPreferences))
        dispatch({ type: 'SAVE_CONVERSATION' })
      } catch (error) {
        console.error('Failed to save Nolan conversation:', error)
      }
    }

    // Auto-save every 30 seconds or when messages change
    const saveInterval = setInterval(saveConversation, 30000)

    return () => clearInterval(saveInterval)
  }, [state.messages, state.userPreferences])

  // Context functions
  const toggleChat = useCallback(() => {
    dispatch({ type: 'TOGGLE_CHAT' })
  }, [])

  const openChat = useCallback(() => {
    dispatch({ type: 'OPEN_CHAT' })
  }, [])

  const closeChat = useCallback(() => {
    dispatch({ type: 'CLOSE_CHAT' })
  }, [])

  const sendMessage = useCallback(async (message) => {
    dispatch({ type: 'ADD_USER_MESSAGE', payload: message })

    try {
      const response = await nolanService.current.processMessage(message, state.currentContext)
      dispatch({ type: 'ADD_NOLAN_MESSAGE', payload: response })
    } catch (error) {
      console.error('Nolan AI error:', error)
      dispatch({
        type: 'ADD_NOLAN_MESSAGE',
        payload: {
          content: 'I apologize, but I\'m having trouble processing your request right now. Please try again or contact support if the issue persists.',
          suggestions: [
            { text: 'Try again', action: () => {} },
            { text: 'Contact support', action: () => window.open('mailto:support@cin7.com') }
          ]
        }
      })
    }
  }, [state.currentContext])

  const updateContext = useCallback((context) => {
    dispatch({ type: 'UPDATE_CONTEXT', payload: context })
  }, [])

  const updatePreferences = useCallback((preferences) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences })
  }, [])

  const clearConversation = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' })
  }, [])

  const setVoiceEnabled = useCallback((enabled) => {
    dispatch({ type: 'SET_VOICE_ENABLED', payload: enabled })
  }, [])

  const setListening = useCallback((listening) => {
    dispatch({ type: 'SET_LISTENING', payload: listening })
  }, [])

  const setSpeaking = useCallback((speaking) => {
    dispatch({ type: 'SET_SPEAKING', payload: speaking })
  }, [])

  // Proactive help based on context
  useEffect(() => {
    if (state.userPreferences.proactiveHelp && state.isOpen && state.messages.length > 0) {
      const lastMessage = state.messages[state.messages.length - 1]
      const timeSinceLastMessage = Date.now() - new Date(lastMessage.timestamp).getTime()

      // Offer help if user has been inactive for 2 minutes
      if (timeSinceLastMessage > 120000 && state.suggestions.length === 0) {
        const proactiveSuggestions = nolanService.current.getProactiveSuggestions(state.currentContext)
        if (proactiveSuggestions.length > 0) {
          dispatch({ type: 'SET_SUGGESTIONS', payload: proactiveSuggestions })
        }
      }
    }
  }, [state.messages, state.isOpen, state.suggestions, state.userPreferences.proactiveHelp, state.currentContext])

  const value = {
    state,
    actions: {
      toggleChat,
      openChat,
      closeChat,
      sendMessage,
      updateContext,
      updatePreferences,
      clearConversation,
      setVoiceEnabled,
      setListening,
      setSpeaking
    }
  }

  return (
    <NolanContext.Provider value={value}>
      {children}
    </NolanContext.Provider>
  )
}

// Hook to use Nolan context
export function useNolan() {
  const context = useContext(NolanContext)
  if (context === undefined) {
    throw new Error('useNolan must be used within a NolanProvider')
  }
  return context
}

export { NolanContext }