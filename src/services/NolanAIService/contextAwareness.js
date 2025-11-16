export const contextAwareness = {
  // Enhance response based on current context
  enhanceResponse(baseResponse, context, conversationState) {
    let enhancedResponse = baseResponse

    // Add contextual awareness based on current page
    if (context.currentPage) {
      enhancedResponse = this.addPageContext(enhancedResponse, context)
    }

    // Add onboarding-specific context
    if (context.currentPage === '/onboarding' && context.onboardingStep) {
      enhancedResponse = this.addOnboardingContext(enhancedResponse, context)
    }

    // Add industry-specific context
    if (context.userIndustry) {
      enhancedResponse = this.addIndustryContext(enhancedResponse, context)
    }

    // Add conversation history context
    if (conversationState.currentTopic) {
      enhancedResponse = this.addConversationContext(enhancedResponse, conversationState)
    }

    // Add business size context
    if (context.businessSize) {
      enhancedResponse = this.addBusinessSizeContext(enhancedResponse, context)
    }

    // Add progress-based context
    if (context.completedSteps && context.completedSteps.length > 0) {
      enhancedResponse = this.addProgressContext(enhancedResponse, context)
    }

    return enhancedResponse
  },

  // Add page-specific context
  addPageContext(response, context) {
    const pageContexts = {
      '/dashboard': () => {
        return response + '\n\nSince you\'re on the dashboard, I can help you:\n• Interpret your key metrics\n• Set up dashboard alerts\n• Create custom views\n• Export dashboard data'
      },
      '/onboarding': () => {
        return response + '\n\nI\'m here to guide you through the onboarding process. Each step builds upon the previous one to ensure a smooth setup.'
      },
      '/products': () => {
        return response + '\n\nLooking at your products, I can help with:\n• Inventory optimization\n• Product categorization\n• Pricing strategies\n• Product information management'
      },
      '/sales': () => {
        return response + '\n\nFor sales management, I can assist with:\n• Order processing workflows\n• Customer relationship management\n• Sales reporting and analytics\n• Payment processing setup'
      },
      '/inventory': () => {
        return response + '\n\nFor inventory management, I can help with:\n• Stock level optimization\n• Multi-location coordination\n• Reorder point settings\n• Inventory accuracy improvements'
      },
      '/reports': () => {
        return response + '\n\nIn the reports section, I can help you:\n• Create meaningful dashboards\n• Set up automated reports\n• Analyze trends and patterns\n• Export data for presentations'
      }
    }

    const contextHandler = pageContexts[context.currentPage]
    return contextHandler ? contextHandler() : response
  },

  // Add onboarding-specific context
  addOnboardingContext(response, context) {
    const onboardingContexts = {
      'business-info': () => {
        return response + '\n\nAt this stage, focus on providing accurate business information. This helps me tailor recommendations for your specific industry and size.'
      },
      'industry-selection': () => {
        return response + '\n\nYour industry selection will determine the templates and features I recommend. Be sure to select all business models that apply to you.'
      },
      'pain-points': () => {
        return response + '\n\nUnderstanding your current challenges helps me prioritize which features and workflows will provide the most value to your business.'
      },
      'feature-selection': () => {
        return response + '\n\nFor feature configuration, start with the essentials. You can always add more advanced features later as you become more comfortable with the system.'
      },
      'integrations': () => {
        return response + '\n\nIntegrations eliminate manual data entry and improve accuracy. I recommend starting with your accounting and primary sales channel integrations.'
      },
      'workflows': () => {
        return response + '\n\nWorkflow automation saves time and reduces errors. Focus on your most repetitive and error-prone processes first.'
      },
      'reports': () => {
        return response + '\n\nConfigure reports that align with your business goals and decision-making processes. Start with 3-5 key metrics that matter most.'
      }
    }

    const contextHandler = onboardingContexts[context.onboardingStep]
    return contextHandler ? contextHandler() : response
  },

  // Add industry-specific context
  addIndustryContext(response, context) {
    const industryContexts = {
      'retail': () => {
        return response + '\n\n**For retail businesses**: I\'ll focus on multi-channel inventory, POS integration, and customer management to help you streamline operations and prevent stockouts.'
      },
      'manufacturing': () => {
        return response + '\n\n**For manufacturing**: I\'ll emphasize raw material tracking, production planning, and quality control to optimize your supply chain and production efficiency.'
      },
      'wholesale': () => {
        return response + '\n\n**For wholesale distribution**: I\'ll concentrate on bulk purchasing optimization, multi-warehouse management, and B2B customer relationships to improve your margins and service levels.'
      },
      'ecommerce': () => {
        return response + '\n\n**For e-commerce**: I\'ll prioritize multi-channel synchronization, real-time inventory updates, and automated fulfillment to prevent overselling and improve customer satisfaction.'
      }
    }

    const contextHandler = industryContexts[context.userIndustry]
    return contextHandler ? contextHandler() : response
  },

  // Add conversation history context
  addConversationContext(response, conversationState) {
    if (conversationState.previousTopics.length > 0) {
      const previousTopics = conversationState.previousTopics.slice(-3).join(', ')
      return response + `\n\nBuilding on our discussion about ${previousTopics}, let's continue with that context in mind.`
    }

    if (conversationState.currentTopic) {
      return response + `\n\nContinuing our focus on ${conversationState.currentTopic}, here's how this relates to your goals.`
    }

    return response
  },

  // Add business size context
  addBusinessSizeContext(response, context) {
    const sizeContexts = {
      'small': () => {
        return response + '\n\n**For small businesses**: I\'ll recommend streamlined, easy-to-implement solutions that provide quick value without requiring extensive technical resources.'
      },
      'medium': () => {
        return response + '\n\n**For medium businesses**: I\'ll focus on scalable solutions that can grow with your business and improve team collaboration.'
      },
      'large': () => {
        return response + '\n\n**For large businesses**: I\'ll emphasize enterprise-grade features, integration capabilities, and governance for complex operations.'
      }
    }

    const contextHandler = sizeContexts[context.businessSize]
    return contextHandler ? contextHandler() : response
  },

  // Add progress-based context
  addProgressContext(response, context) {
    const completionRate = (context.completedSteps.length / 8) * 100 // Assuming 8 total steps

    if (completionRate < 25) {
      return response + '\n\nYou\'re just getting started! Focus on completing the foundational steps first, and I\'ll help you build a solid foundation.'
    } else if (completionRate < 50) {
      return response + '\n\nYou\'re making good progress! As we advance, we\'ll focus more on customization and optimization features.'
    } else if (completionRate < 75) {
      return response + '\n\nYou\'re more than halfway there! Now we\'re moving into advanced features and workflow automation.'
    } else {
      return response + '\n\nYou\'re almost done! We\'re finalizing your configuration and setting you up for long-term success.'
    }
  },

  // Generate proactive suggestions based on context
  getProactiveSuggestions(context, conversationState) {
    const suggestions = []

    // Based on onboarding progress
    if (context.currentPage === '/onboarding') {
      if (context.onboardingStep === 'feature-selection') {
        suggestions.push({
          text: 'Need help choosing features?',
          action: 'explain-features',
          priority: 'high'
        })
      }

      if (context.onboardingStep === 'integrations') {
        suggestions.push({
          text: 'View recommended integrations',
          action: 'show-integrations',
          priority: 'high'
        })
      }
    }

    // Based on conversation mood
    if (conversationState.userMood === 'confused') {
      suggestions.push({
        text: 'Let me simplify this for you',
        action: 'simplify-explanation',
        priority: 'high'
      })
      suggestions.push({
        text: 'Show me step-by-step guide',
        action: 'step-by-step',
        priority: 'medium'
      })
    }

    // Based on industry
    if (context.userIndustry) {
      suggestions.push({
        text: `${context.userIndustry} best practices?`,
        action: 'industry-best-practices',
        priority: 'medium'
      })
    }

    // Based on time since last interaction
    const timeSinceLastInteraction = Date.now() - (conversationState.lastInteraction ? new Date(conversationState.lastInteraction).getTime() : 0)
    if (timeSinceLastInteraction > 180000) { // 3 minutes
      suggestions.push({
        text: 'Need help continuing?',
        action: 'resume-help',
        priority: 'low'
      })
    }

    // Sort by priority and limit
    return suggestions
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      })
      .slice(0, 3)
  },

  // Get relevant features based on context
  getContextualFeatures(context) {
    const features = []

    // Based on page
    if (context.currentPage === '/dashboard') {
      features.push('custom-dashboards', 'scheduled-reports', 'kpi-alerts')
    }

    if (context.currentPage === '/products') {
      features.push('product-variations', 'barcode-scanning', 'inventory-alerts')
    }

    // Based on industry
    if (context.userIndustry === 'retail') {
      features.push('pos-integration', 'multi-channel-sync', 'customer-loyalty')
    }

    if (context.userIndustry === 'manufacturing') {
      features.push('bill-of-materials', 'production-planning', 'quality-control')
    }

    // Based on business size
    if (context.businessSize === 'small') {
      features.push('quick-setup', 'basic-reporting', 'simple-workflows')
    }

    return [...new Set(features)] // Remove duplicates
  },

  // Determine user expertise level based on interaction
  assessUserExpertise(conversationHistory) {
    if (conversationHistory.length < 5) {
      return 'beginner'
    }

    const technicalTerms = ['api', 'integration', 'workflow', 'automation', 'configuration']
    const advancedTerms = ['customization', 'advanced-settings', 'enterprise', 'scalability']

    let technicalScore = 0
    let advancedScore = 0

    conversationHistory.forEach(message => {
      if (message.type === 'user') {
        const content = message.content.toLowerCase()
        technicalTerms.forEach(term => {
          if (content.includes(term)) technicalScore++
        })
        advancedTerms.forEach(term => {
          if (content.includes(term)) advancedScore++
        })
      }
    })

    if (advancedScore > 2) return 'advanced'
    if (technicalScore > 3) return 'intermediate'
    return 'beginner'
  },

  // Get next logical step in onboarding
  getNextOnboardingStep(currentStep, completedSteps) {
    const stepOrder = [
      'business-info',
      'industry-selection',
      'pain-points',
      'feature-selection',
      'integrations',
      'workflows',
      'reports',
      'review'
    ]

    const currentIndex = stepOrder.indexOf(currentStep)

    // Find next incomplete step
    for (let i = currentIndex + 1; i < stepOrder.length; i++) {
      if (!completedSteps.includes(stepOrder[i])) {
        return stepOrder[i]
      }
    }

    return null // All steps completed
  },

  // Check if user needs help based on behavior
  needsHelp(context, conversationState) {
    // Check for repeated questions
    const recentMessages = conversationState.conversationHistory?.slice(-5) || []
    const userMessages = recentMessages.filter(m => m.type === 'user')

    if (userMessages.length >= 3) {
      // Check if similar questions are being asked
      const uniqueQuestions = new Set(userMessages.map(m => m.content.toLowerCase()))
      if (uniqueQuestions.size < userMessages.length * 0.5) {
        return 'confused'
      }
    }

    // Check for long pauses
    if (conversationState.lastInteraction) {
      const timeSinceLast = Date.now() - new Date(conversationState.lastInteraction).getTime()
      if (timeSinceLast > 300000) { // 5 minutes
        return 'stuck'
      }
    }

    // Check for error indicators
    const errorKeywords = ['error', 'not working', 'broken', 'failed', 'stuck']
    const hasErrorKeywords = userMessages.some(msg =>
      errorKeywords.some(keyword => msg.content.toLowerCase().includes(keyword))
    )

    if (hasErrorKeywords) {
      return 'troubleshooting'
    }

    return null
  }
}