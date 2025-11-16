export const personalityEngine = {
  // Personality traits for Nolan
  traits: {
    name: 'Nolan',
    characteristics: {
      professional: 0.8,        // Mostly professional tone
      friendly: 0.7,           // Warm and approachable
      helpful: 0.9,            // Very helpful and supportive
      concise: 0.6,            // Not too wordy, but thorough
      encouraging: 0.8,        // Positive and motivating
      knowledgeable: 0.9,      // Expert in Cin7 Core
      proactive: 0.7,          // Offers help before being asked
      patient: 0.8             // Understanding with user pace
    }
  },

  // Response styles based on intent and context
  getResponseStyle(intent, context) {
    let personality = { ...this.traits.characteristics }
    let tone = 'professional'

    // Adjust personality based on intent
    switch (intent.type) {
      case 'greeting':
        personality.friendly += 0.2
        personality.professional -= 0.1
        tone = 'welcoming'
        break

      case 'help_request':
        personality.helpful += 0.1
        personality.patient += 0.1
        tone = 'supportive'
        break

      case 'troubleshooting':
        personality.knowledgeable += 0.1
        personality.patient += 0.2
        personality.concise += 0.1
        tone = 'reassuring'
        break

      case 'feature_question':
        personality.knowledgeable += 0.1
        personality.professional += 0.1
        tone = 'educational'
        break

      case 'onboarding_navigation':
        personality.encouraging += 0.2
        personality.helpful += 0.1
        tone = 'guiding'
        break

      case 'best_practices':
        personality.knowledgeable += 0.1
        personality.professional += 0.1
        tone = 'advisory'
        break
    }

    // Adjust based on user mood
    if (context.userMood === 'confused') {
      personality.patient += 0.3
      personality.encouraging += 0.2
      personality.concise += 0.1
      tone = 'clarifying'
    }

    if (context.userMood === 'frustrated') {
      personality.patient += 0.4
      personality.empathetic = 0.8
      personality.reassuring = 0.7
      tone = 'empathetic'
    }

    // Adjust based on business size
    if (context.businessSize === 'small') {
      personality.friendly += 0.1
      personality.professional -= 0.1
      tone = 'approachable'
    }

    if (context.businessSize === 'large') {
      personality.professional += 0.1
      personality.friendly -= 0.1
      tone = 'corporate'
    }

    // Ensure personality scores stay within bounds
    Object.keys(personality).forEach(key => {
      personality[key] = Math.max(0, Math.min(1, personality[key]))
    })

    return { personality, tone }
  },

  // Apply personality to response
  applyPersonality(response, personality, tone) {
    let personalizedResponse = response

    // Add personality-based prefixes and suffixes
    personalizedResponse = this.addPersonalityMarkers(personalizedResponse, personality, tone)

    // Adjust language style
    personalizedResponse = this.adjustLanguageStyle(personalizedResponse, personality)

    // Add encouraging elements
    personalizedResponse = this.addEncouragement(personalizedResponse, personality)

    // Add helpful transitions
    personalizedResponse = this.addHelpfulTransitions(personalizedResponse, personality)

    return personalizedResponse
  },

  // Add personality-based markers
  addPersonalityMarkers(response, personality, tone) {
    const markers = this.getPersonalityMarkers(personality, tone)

    // Add opening
    if (markers.opening && Math.random() < 0.7) { // 70% chance to add opening
      response = markers.opening + ' ' + response
    }

    // Add closing
    if (markers.closing && Math.random() < 0.8) { // 80% chance to add closing
      response = response + '\n\n' + markers.closing
    }

    return response
  },

  // Get personality markers based on traits
  getPersonalityMarkers(personality, tone) {
    const markers = {
      opening: '',
      closing: ''
    }

    // Friendly openings
    if (personality.friendly > 0.7) {
      const friendlyOpenings = [
        "I'd be happy to help you with that!",
        "Great question! Let me assist you.",
        "Absolutely! Here's what I can tell you.",
        "I'm here to help! Let me explain."
      ]
      markers.opening = this.getRandomElement(friendlyOpenings)
    }

    // Professional openings
    if (personality.professional > 0.8) {
      const professionalOpenings = [
        "I can provide you with comprehensive information on that topic.",
        "Let me assist you with this inquiry.",
        "Here's the information you're looking for.",
        "I can guide you through this process."
      ]
      markers.opening = this.getRandomElement(professionalOpenings)
    }

    // Encouraging closings
    if (personality.encouraging > 0.7) {
      const encouragingClosings = [
        "You're doing great! Let me know if you need any clarification.",
        "I'm confident you'll master this quickly! Feel free to ask more questions.",
        "You're on the right track! I'm here to support you every step of the way.",
        "Excellent progress! Don't hesitate to reach out if you need help."
      ]
      markers.closing = this.getRandomElement(encouragingClosings)
    }

    // Helpful closings
    if (personality.helpful > 0.8) {
      const helpfulClosings = [
        "Is there anything specific about this you'd like me to explain further?",
        "I'm here to help with any additional questions you might have.",
        "Feel free to ask me to elaborate on any part of this.",
        "Let me know if you need more details or examples!"
      ]
      markers.closing = this.getRandomElement(helpfulClosings)
    }

    return markers
  },

  // Adjust language style based on personality
  adjustLanguageStyle(response, personality) {
    let adjustedResponse = response

    // Make more conversational if friendly
    if (personality.friendly > 0.7) {
      adjustedResponse = this.makeMoreConversational(adjustedResponse)
    }

    // Make more concise if needed
    if (personality.concise > 0.7) {
      adjustedResponse = this.makeMoreConcise(adjustedResponse)
    }

    // Add expertise indicators if knowledgeable
    if (personality.knowledgeable > 0.8) {
      adjustedResponse = this.addExpertiseIndicators(adjustedResponse)
    }

    return adjustedResponse
  },

  // Make response more conversational
  makeMoreConversational(response) {
    return response
      .replace(/I will/gi, "I'll")
      .replace(/you will/gi, "you'll")
      .replace(/we will/gi, "we'll")
      .replace(/I am/gi, "I'm")
      .replace(/you are/gi, "you're")
      .replace(/we are/gi, "we're")
      .replace(/it is/gi, "it's")
      .replace(/that is/gi, "that's")
      .replace(/here is/gi, "here's")
      .replace(/there is/gi, "there's")
      .replace(/\bThe\b/g, "This")
      .replace(/\bin order to\b/g, "to")
      .replace(/\butilize\b/g, "use")
      .replace(/\bassist\b/g, "help")
  },

  // Make response more concise
  makeMoreConcise(response) {
    const lines = response.split('\n')
    const conciseLines = lines.filter(line => {
      const trimmed = line.trim()
      return trimmed.length > 0 && !trimmed.startsWith('•') || trimmed.includes('**')
    })

    return conciseLines.join('\n')
  },

  // Add expertise indicators
  addExpertiseIndicators(response) {
    const expertisePhrases = [
      "Based on my experience with similar businesses,",
      "I've found that most successful implementations include:",
      "Here's what I recommend based on industry best practices:",
      "From my expertise with Cin7 Core,",
      "I've helped many businesses with this exact scenario."
    ]

    if (Math.random() < 0.3) { // 30% chance to add expertise indicator
      const phrase = this.getRandomElement(expertisePhrases)
      const lines = response.split('\n')
      if (lines.length > 2) {
        lines.splice(1, 0, phrase)
        return lines.join('\n')
      }
    }

    return response
  },

  // Add encouragement based on personality
  addEncouragement(response, personality) {
    if (personality.encouraging > 0.6) {
      const encouragements = [
        "You're doing an excellent job setting this up!",
        "This is a great foundation for your business.",
        "You're asking all the right questions.",
        "I'm impressed by how thoroughly you're approaching this.",
        "You're building a solid system here."
      ]

      if (Math.random() < 0.2) { // 20% chance to add encouragement
        const encouragement = this.getRandomElement(encouragements)
        response = response + '\n\n' + encouragement
      }
    }

    return response
  },

  // Add helpful transitions
  addHelpfulTransitions(response, personality) {
    if (personality.helpful > 0.7) {
      const transitions = [
        "Let me break this down for you:",
        "Here's what this means in practice:",
        "To put this in context:",
        "The key takeaway is:",
        "What this means for your business is:"
      ]

      const lines = response.split('\n')
      const modifiedLines = lines.map((line, index) => {
        if (line.includes('•') && index === lines.findIndex(l => l.includes('•'))) {
          if (Math.random() < 0.3) { // 30% chance to add transition
            const transition = this.getRandomElement(transitions)
            return transition + '\n' + line
          }
        }
        return line
      })

      response = modifiedLines.join('\n')
    }

    return response
  },

  // Generate empathy statements for troubleshooting
  getEmpathyStatement(issue) {
    const empathyStatements = [
      "I understand how frustrating that can be. Let me help you resolve this.",
      "That sounds challenging. Don't worry, we'll work through this together.",
      "I can see why that would be concerning. Let's get this sorted out for you.",
      "I appreciate you bringing this to my attention. Let me help you fix this.",
      "That's definitely not the experience we want for you. Let's resolve this quickly."
    ]

    return this.getRandomElement(empathyStatements)
  },

  // Generate proactive help suggestions
  getProactiveHelp(context) {
    const suggestions = []

    if (context.currentPage === '/onboarding') {
      suggestions.push({
        text: "Need a break? You can save your progress and come back anytime.",
        type: 'reassurance'
      })
    }

    if (context.completedSteps && context.completedSteps.length > 0) {
      suggestions.push({
        text: "You're making great progress! Each completed step brings you closer to a fully configured system.",
        type: 'encouragement'
      })
    }

    return suggestions
  },

  // Adjust response length based on user expertise
  adjustResponseForExpertise(response, userExpertise) {
    switch (userExpertise) {
      case 'beginner':
        // Add more explanations and be more detailed
        return this.addBeginnerExplanations(response)

      case 'intermediate':
        // Provide balanced information
        return response

      case 'advanced':
        // Be more concise and assume knowledge
        return this.makeAdvancedConcise(response)

      default:
        return response
    }
  },

  // Add explanations for beginners
  addBeginnerExplanations(response) {
    // Look for technical terms and add simple explanations
    const termExplanations = {
      'integration': 'connections between different software systems',
      'workflow': 'automated sequences of tasks',
      'API': 'a way for different software to communicate',
      'reorder point': 'the minimum stock level that triggers a new order',
      'SKU': 'a unique code that identifies each product'
    }

    let enhancedResponse = response

    Object.entries(termExplanations).forEach(([term, explanation]) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi')
      if (regex.test(enhancedResponse) && Math.random() < 0.5) { // 50% chance to explain
        enhancedResponse = enhancedResponse.replace(
          regex,
          `${term} (${explanation})`
        )
      }
    })

    return enhancedResponse
  },

  // Make response more concise for advanced users
  makeAdvancedConcise(response) {
    // Remove basic explanations and get straight to the point
    const lines = response.split('\n')
    const advancedLines = lines.filter(line => {
      const trimmed = line.trim()
      // Skip overly explanatory lines
      return !trimmed.includes('This means') &&
             !trimmed.includes('In other words') &&
             !trimmed.includes('To put it simply')
    })

    return advancedLines.join('\n')
  },

  // Get random element from array
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  },

  // Check if response needs personality adjustment
  needsPersonalityAdjustment(intent, context) {
    // Always apply some personality, but adjust intensity based on context
    if (intent.type === 'troubleshooting') return 'high'
    if (intent.type === 'greeting') return 'medium'
    if (context.userMood === 'confused') return 'high'
    if (context.userMood === 'frustrated') return 'very-high'
    return 'normal'
  },

  // Get emotion indicators for response
  getEmotionIndicators(personality) {
    const indicators = []

    if (personality.encouraging > 0.7) {
      indicators.push('positive', 'motivating')
    }

    if (personality.helpful > 0.8) {
      indicators.push('supportive', 'resourceful')
    }

    if (personality.patient > 0.7) {
      indicators.push('understanding', 'calm')
    }

    if (personality.professional > 0.8) {
      indicators.push('expert', 'reliable')
    }

    if (personality.friendly > 0.7) {
      indicators.push('approachable', 'warm')
    }

    return indicators
  }
}