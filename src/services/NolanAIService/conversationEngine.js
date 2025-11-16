import { knowledgeBase } from './knowledgeBase.js'
import { contextAwareness } from './contextAwareness.js'
import { personalityEngine } from './personalityEngine.js'

class NolanAIService {
  constructor() {
    this.isInitialized = false
    this.callbacks = {
      onTypingStart: null,
      onTypingEnd: null,
      onSuggestion: null
    }
    this.conversationState = {
      previousTopics: [],
      userIntentions: [],
      currentTopic: null,
      userMood: 'neutral'
    }
  }

  initialize(callbacks = {}) {
    this.callbacks = { ...this.callbacks, ...callbacks }
    this.isInitialized = true
  }

  async processMessage(message, context = {}) {
    if (!this.isInitialized) {
      throw new Error('Nolan AI service not initialized')
    }

    // Start typing indicator
    this.callbacks.onTypingStart?.()

    try {
      // Simulate processing delay for realism
      await this.simulateProcessingDelay()

      // Analyze message intent
      const intent = this.analyzeIntent(message, context)

      // Generate contextual response
      const response = this.generateResponse(message, intent, context)

      // Generate suggestions based on context and conversation
      const suggestions = this.generateSuggestions(intent, context)

      // Update conversation state
      this.updateConversationState(intent, message)

      // End typing indicator
      this.callbacks.onTypingEnd?.()

      return {
        content: response,
        suggestions,
        context: {
          intent: intent.type,
          confidence: intent.confidence,
          topic: intent.topic
        }
      }
    } catch (error) {
      this.callbacks.onTypingEnd?.()
      throw error
    }
  }

  analyzeIntent(message, context) {
    const lowerMessage = message.toLowerCase()

    // Check for specific intents
    const intents = [
      {
        type: 'greeting',
        keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
        confidence: 0,
        topic: 'general'
      },
      {
        type: 'help_request',
        keywords: ['help', 'stuck', 'confused', 'how do i', 'what is', 'explain'],
        confidence: 0,
        topic: 'general'
      },
      {
        type: 'onboarding_navigation',
        keywords: ['next step', 'previous step', 'skip step', 'go to', 'navigate'],
        confidence: 0,
        topic: 'onboarding'
      },
      {
        type: 'feature_question',
        keywords: ['feature', 'inventory', 'sales', 'reports', 'integrations', 'settings'],
        confidence: 0,
        topic: 'features'
      },
      {
        type: 'industry_specific',
        keywords: ['retail', 'manufacturing', 'wholesale', 'ecommerce', 'industry'],
        confidence: 0,
        topic: 'industry'
      },
      {
        type: 'workflow_help',
        keywords: ['workflow', 'process', 'automate', 'setup', 'configure'],
        confidence: 0,
        topic: 'workflows'
      },
      {
        type: 'troubleshooting',
        keywords: ['error', 'problem', 'issue', 'not working', 'broken', 'fix'],
        confidence: 0,
        topic: 'support'
      },
      {
        type: 'best_practices',
        keywords: ['best practice', 'recommendation', 'advice', 'tip', 'optimize'],
        confidence: 0,
        topic: 'advice'
      }
    ]

    // Calculate confidence scores
    intents.forEach(intent => {
      intent.keywords.forEach(keyword => {
        if (lowerMessage.includes(keyword)) {
          intent.confidence += 1
        }
      })
      intent.confidence = intent.confidence / intent.keywords.length
    })

    // Find best match
    const bestIntent = intents.reduce((best, current) =>
      current.confidence > best.confidence ? current : best
    )

    // If low confidence, default to general help
    if (bestIntent.confidence < 0.2) {
      return {
        type: 'general_query',
        confidence: 0.5,
        topic: 'general'
      }
    }

    return bestIntent
  }

  generateResponse(message, intent, context) {
    const { personality, tone } = personalityEngine.getResponseStyle(intent, context)

    // Get knowledge base response
    const kbResponse = knowledgeBase.getResponse(intent, context)

    // Add context awareness
    const contextResponse = contextAwareness.enhanceResponse(kbResponse, context, this.conversationState)

    // Apply personality
    const finalResponse = personalityEngine.applyPersonality(contextResponse, personality, tone)

    return finalResponse
  }

  generateSuggestions(intent, context) {
    const suggestions = []

    // Context-aware suggestions
    if (context.currentPage === '/onboarding') {
      if (context.onboardingStep === 'feature-selection') {
        suggestions.push(
          { text: 'Explain inventory features', action: 'explain-inventory' },
          { text: 'Show best practices', action: 'best-practices' },
          { text: 'Skip to integrations', action: 'skip-to-integrations' }
        )
      } else if (context.onboardingStep === 'integrations') {
        suggestions.push(
          { text: 'Popular integrations', action: 'popular-integrations' },
          { text: 'Setup guides', action: 'setup-guides' },
          { text: 'Skip integrations', action: 'skip-integrations' }
        )
      }
    }

    // Intent-specific suggestions
    switch (intent.type) {
      case 'greeting':
        suggestions.push(
          { text: 'Start onboarding', action: 'start-onboarding' },
          { text: 'Tour features', action: 'tour-features' },
          { text: 'What can you help with?', action: 'show-capabilities' }
        )
        break

      case 'help_request':
        suggestions.push(
          { text: 'Onboarding help', action: 'onboarding-help' },
          { text: 'Feature guides', action: 'feature-guides' },
          { text: 'Contact support', action: 'contact-support' }
        )
        break

      case 'feature_question':
        if (intent.topic === 'inventory') {
          suggestions.push(
            { text: 'Setup guide', action: 'inventory-setup' },
            { text: 'Best practices', action: 'inventory-best-practices' },
            { text: 'Common issues', action: 'inventory-issues' }
          )
        } else if (intent.topic === 'reports') {
          suggestions.push(
            { text: 'Create dashboard', action: 'create-dashboard' },
            { text: 'Popular reports', action: 'popular-reports' },
            { text: 'Schedule reports', action: 'schedule-reports' }
          )
        }
        break

      case 'troubleshooting':
        suggestions.push(
          { text: 'View error logs', action: 'view-errors' },
          { text: 'Common solutions', action: 'common-solutions' },
          { text: 'Contact support', action: 'contact-support' }
        )
        break

      default:
        suggestions.push(
          { text: 'Tell me more', action: 'tell-more' },
          { text: 'Show examples', action: 'show-examples' },
          { text: 'Contact support', action: 'contact-support' }
        )
    }

    return suggestions.slice(0, 3) // Limit to 3 suggestions
  }

  getProactiveSuggestions(context) {
    const suggestions = []

    // Based on current onboarding step
    if (context.currentPage === '/onboarding') {
      if (context.onboardingStep === 'business-info') {
        suggestions.push({
          text: 'Need help with business info?',
          action: 'help-business-info'
        })
      } else if (context.onboardingStep === 'industry-selection') {
        suggestions.push({
          text: 'Questions about industry setup?',
          action: 'help-industry'
        })
      }
    }

    // Based on user industry
    if (context.userIndustry) {
      suggestions.push({
        text: `${context.userIndustry} best practices?`,
        action: 'industry-best-practices'
      })
    }

    return suggestions.slice(0, 2)
  }

  updateConversationState(intent, message) {
    // Track conversation topic
    if (intent.topic && intent.topic !== this.conversationState.currentTopic) {
      if (this.conversationState.currentTopic) {
        this.conversationState.previousTopics.push(this.conversationState.currentTopic)
      }
      this.conversationState.currentTopic = intent.topic
    }

    // Track user intentions (simplified)
    if (intent.type === 'help_request') {
      this.conversationState.userMood = 'confused'
    } else if (intent.type === 'greeting') {
      this.conversationState.userMood = 'friendly'
    } else {
      this.conversationState.userMood = 'neutral'
    }

    // Keep conversation history manageable
    if (this.conversationState.previousTopics.length > 5) {
      this.conversationState.previousTopics.shift()
    }
  }

  simulateProcessingDelay() {
    // Simulate realistic AI processing time
    const delay = Math.random() * 1500 + 500 // 500-2000ms
    return new Promise(resolve => setTimeout(resolve, delay))
  }

  // Helper methods for specific actions
  async handleSuggestion(action, context) {
    const actions = {
      'start-onboarding': () => ({
        content: "I'll guide you through the onboarding process! Let's start with some basic information about your business. This will help me personalize your Cin7 Core experience.",
        suggestions: [
          { text: 'Let\'s begin', action: 'begin-onboarding' },
          { text: 'What will you ask?', action: 'explain-onboarding' },
          { text: 'Skip onboarding', action: 'skip-onboarding' }
        ]
      }),

      'explain-inventory': () => ({
        content: knowledgeBase.getFeatureExplanation('inventory', context),
        suggestions: [
          { text: 'Setup inventory', action: 'setup-inventory' },
          { text: 'Best practices', action: 'inventory-best-practices' },
          { text: 'Advanced features', action: 'inventory-advanced' }
        ]
      }),

      'popular-integrations': () => ({
        content: "Based on your industry, here are the most popular integrations:\n\n• **Shopify** - For e-commerce sales channels\n• **QuickBooks** - For accounting automation\n• **Xero** - Alternative accounting solution\n• **Amazon** - For marketplace sales\n• **ShipStation** - For shipping management\n\nWould you like me to guide you through setting up any of these?",
        suggestions: [
          { text: 'Setup Shopify', action: 'setup-shopify' },
          { text: 'Setup QuickBooks', action: 'setup-quickbooks' },
          { text: 'Browse all integrations', action: 'browse-integrations' }
        ]
      }),

      'contact-support': () => ({
        content: "I can connect you with our support team! Here are your options:\n\n• **Live Chat**: Available 24/7 for immediate help\n• **Email**: support@cin7.com (responses within 24 hours)\n• **Phone**: 1-800-CIN7-HELP (business hours)\n• **Help Center**: docs.cin7.com for self-service\n\nHow would you like to proceed?",
        suggestions: [
          { text: 'Start live chat', action: 'start-live-chat' },
          { text: 'Browse help center', action: 'browse-help' },
          { text: 'Schedule callback', action: 'schedule-callback' }
        ]
      })
    }

    return actions[action]?.() || {
      content: "I'm not sure how to handle that request. Let me connect you with additional resources.",
      suggestions: [
        { text: 'Contact support', action: 'contact-support' },
        { text: 'Browse help center', action: 'browse-help' }
      ]
    }
  }

  // Reset conversation state (useful for testing or fresh starts)
  reset() {
    this.conversationState = {
      previousTopics: [],
      userIntentions: [],
      currentTopic: null,
      userMood: 'neutral'
    }
  }
}

export default NolanAIService

export const NolanAIServiceInstance = new NolanAIService()