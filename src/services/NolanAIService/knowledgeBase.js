export const knowledgeBase = {
  // Greeting responses
  greetings: [
    "Hello! I'm Nolan, your AI assistant for Cin7 Core. I'm here to help you get the most out of your inventory management system. What can I help you with today?",
    "Hi there! I'm Nolan, your Cin7 Core assistant. Whether you're just getting started or need advanced guidance, I'm here to help. What would you like to work on?",
    "Welcome! I'm Nolan, and I'm excited to help you with Cin7 Core. I can assist with onboarding, feature setup, best practices, and troubleshooting. How can I help you today?"
  ],

  // Help responses
  helpResponses: [
    "I can help you with several areas:\n\n• **Onboarding**: Guided setup and configuration\n• **Features**: Inventory, sales, reports, and integrations\n• **Best Practices**: Industry-specific recommendations\n• **Troubleshooting**: Common issues and solutions\n• **Workflows**: Automation and process optimization\n\nWhat specific area would you like help with?",
    "Here's how I can assist you:\n\n**Getting Started**:\n- Onboarding guidance\n- Initial setup\n- Data import\n\n**Feature Help**:\n- Inventory management\n- Sales processing\n- Reporting and analytics\n- Integrations\n\n**Advanced Support**:\n- Workflow automation\n- Industry best practices\n- Troubleshooting\n\nWhat would you like to explore?"
  ],

  // Industry-specific guidance
  industryGuidance: {
    retail: {
      setup: "For retail businesses, I recommend focusing on:\n\n• **Multi-channel inventory**: Sync stock across stores and online\n• **POS integration**: Connect your payment systems\n• **Seasonal planning**: Set up reorder points for busy periods\n• **Customer management**: Track purchasing patterns\n• **E-commerce sync**: Real-time inventory updates\n\nWould you like me to guide you through setting up any of these?",
      bestPractices: "Retail best practices:\n\n• **Daily stock reconciliation** to prevent overselling\n• **Automated reordering** when stock hits minimum levels\n• **Customer segmentation** for targeted marketing\n• **Sales trend analysis** for better forecasting\n• **Staff training** on inventory processes",
      commonIssues: "Common retail challenges I can help with:\n\n• **Overselling**: Prevent with real-time sync\n• **Stockouts**: Set up automated alerts\n• **Returns management**: Streamline reverse logistics\n• **Multi-store coordination**: Centralized inventory control"
    },
    manufacturing: {
      setup: "For manufacturing, prioritize these features:\n\n• **Raw material tracking**: Bill of materials management\n• **Work-in-progress**: Track production stages\n• **Quality control**: Inspection and compliance\n• **Batch/lot tracking**: Essential for recalls\n• **Production planning**: Schedule and resource optimization\n\nShall I walk you through the manufacturing setup?",
      bestPractices: "Manufacturing best practices:\n\n• **Just-in-time inventory** to reduce carrying costs\n• **Supplier relationship management** for reliable materials\n• **Production bottleneck analysis** for efficiency\n• **Quality assurance at each stage**\n• **Predictive maintenance** scheduling",
      commonIssues: "Manufacturing challenges I can help solve:\n\n• **Material shortages** with automated reordering\n• **Production delays** through better scheduling\n• **Quality issues** with inspection workflows\n• **Cost overruns** via detailed tracking"
    },
    wholesale: {
      setup: "For wholesale distribution, focus on:\n\n• **Bulk purchasing**: Volume discount management\n• **Multi-warehouse**: Centralized distribution\n• **B2B ordering**: Customer portals and pricing tiers\n• **Logistics optimization**: Shipping and carrier management\n• **Credit management**: Customer account limits\n\nReady to optimize your wholesale operations?",
      bestPractices: "Wholesale best practices:\n\n• **ABC inventory analysis** for stock prioritization\n• **Economic order quantity** calculations\n• **Supplier performance tracking**\n• **Customer profitability analysis**\n• **Demand forecasting** accuracy",
      commonIssues: "Wholesale challenges I can address:\n\n• **Carrying costs** through better inventory turns\n• **Stock allocation** across multiple customers\n• **Seasonal demand** fluctuations\n• **Payment terms** and cash flow management"
    },
    ecommerce: {
      setup: "E-commerce businesses should focus on:\n\n• **Multi-channel sync**: Amazon, Shopify, eBay integration\n• **Real-time inventory**: Prevent overselling\n• **Order fulfillment**: Automated shipping and tracking\n• **Returns processing**: Reverse logistics automation\n• **Customer experience**: Order status and notifications\n\nLet me help you integrate your sales channels?",
      bestPractices: "E-commerce best practices:\n\n• **Automated inventory sync** across all channels\n• **Shipping cost optimization** with carrier comparisons\n• **Customer lifetime value** tracking\n• **Abandoned cart recovery** workflows\n• **Review management** integration",
      commonIssues: "E-commerce challenges I can solve:\n\n• **Channel conflict** and overselling\n• **Shipping delays** with better fulfillment\n• **Return management** automation\n• **Customer service** integration"
    }
  },

  // Feature explanations
  features: {
    inventory: {
      overview: "Cin7 Core's inventory management provides:\n\n• **Real-time tracking** across all locations\n• **Automated reordering** when stock runs low\n• **Batch/lot tracking** for traceability\n• **Multi-warehouse** management\n• **Barcode scanning** for efficiency\n• **Mobile access** for on-the-go management\n\nThis helps you maintain optimal stock levels, reduce costs, and prevent stockouts.",
      setup: "To set up inventory management:\n\n1. **Add your products** with SKUs and descriptions\n2. **Set stock levels** for each location\n3. **Configure reorder points** for automatic alerts\n4. **Add suppliers** for purchase orders\n5. **Setup categories** for better organization\n\nWould you like me to guide you through any of these steps?",
      tips: "Inventory optimization tips:\n\n• Use **ABC analysis** to focus on high-value items\n• Set **safety stock** levels for critical products\n• Implement **cycle counting** instead of full physical counts\n• Use **forecasting** for seasonal demand\n• **Monitor turnover ratios** regularly"
    },
    sales: {
      overview: "Sales management in Cin7 Core includes:\n\n• **Order processing** from multiple channels\n• **Pricing rules** and discounts\n• **Customer management** and history\n• **Invoicing** and payment processing\n• **Shipping integration** with major carriers\n• **Sales reporting** and analytics\n\nStreamline your entire sales process from quote to cash.",
      setup: "Configure your sales workflow:\n\n1. **Setup payment methods** and gateways\n2. **Configure tax settings** for your jurisdictions\n3. **Create pricing tiers** for different customer types\n4. **Setup shipping methods** and carriers\n5. **Configure email templates** for order updates\n\nNeed help with any of these configurations?",
      tips: "Sales optimization strategies:\n\n• **Automated order processing** for faster fulfillment\n• **Customer segmentation** for targeted marketing\n• **Upselling workflows** at checkout\n• **Sales performance dashboards** for insights\n• **Integration with marketing** platforms"
    },
    reports: {
      overview: "Cin7 Core reporting provides:\n\n• **Real-time dashboards** for key metrics\n• **Inventory reports** for stock analysis\n• **Sales analytics** and trend identification\n• **Financial reporting** for business insights\n• **Custom reports** tailored to your needs\n• **Automated scheduling** for regular updates\n\nMake data-driven decisions with comprehensive business intelligence.",
      setup: "Set up your reporting:\n\n1. **Choose key metrics** for your dashboard\n2. **Configure report schedules** for stakeholders\n3. **Setup custom reports** for specific needs\n4. **Configure export settings** for data sharing\n5. **Set up alerts** for important changes\n\nWhat reports would be most valuable for your business?",
      tips: "Reporting best practices:\n\n• **Track KPIs** relevant to your industry\n• **Set up alerts** for critical thresholds\n• **Regularly review** reports with your team\n• **Use trends** for forecasting\n• **Share insights** across departments"
    }
  },

  // Onboarding guidance
  onboarding: {
    steps: {
      'business-info': {
        title: "Business Information",
        guidance: "This step helps me understand your business context. I'll use this information to:\n\n• **Personalize recommendations** for your industry\n• **Suggest relevant features** based on your size\n• **Configure appropriate settings** from the start\n• **Provide industry-specific best practices**\n\nThe more accurate information you provide, the better I can tailor your Cin7 Core experience.",
        tips: [
          "Be specific about your industry for best recommendations",
          "Include your current systems to identify integration opportunities",
          "Set realistic goals to measure your success"
        ]
      },
      'industry-selection': {
        title: "Industry Configuration",
        guidance: "Your industry selection helps me provide:\n\n• **Pre-configured templates** for common workflows\n• **Industry-specific features** and settings\n• **Relevant integrations** for your business type\n• **Best practice recommendations** from similar businesses\n• **Compliance requirements** for your sector",
        tips: [
          "Choose your primary business activity",
          "Select all sales channels you use",
          "Consider future expansion plans"
        ]
      },
      'feature-selection': {
        title: "Feature Configuration",
        guidance: "Here we'll configure the core features:\n\n• **Inventory settings** for stock management\n• **Sales workflows** for order processing\n• **Customer management** for relationship tracking\n• **Reporting setup** for business insights\n• **Integration preferences** for connected systems\n\nFocus on essential features first - you can always add more later.",
        tips: [
          "Start with core inventory and sales features",
          "Enable automation for repetitive tasks",
          "Consider your team's technical skill level"
        ]
      },
      'integrations': {
        title: "System Integrations",
        guidance: "Connect your existing tools:\n\n• **Accounting software** (QuickBooks, Xero)\n• **E-commerce platforms** (Shopify, Amazon)\n• **Payment processors** (Stripe, PayPal)\n• **Shipping carriers** (UPS, FedEx)\n• **Marketing tools** (Mailchimp, HubSpot)\n\nIntegrations eliminate double data entry and improve accuracy.",
        tips: [
          "Prioritize accounting and e-commerce integrations",
          "Start with one system at a time",
          "Test integrations before full deployment"
        ]
      },
      'workflows': {
        title: "Workflow Automation",
        guidance: "Automate your business processes:\n\n• **Order processing** workflows\n• **Inventory reorder** automation\n• **Report generation** schedules\n• **Customer communication** templates\n• **Approval processes** for critical actions\n\nAutomation saves time and reduces errors.",
        tips: [
          "Map your current processes first",
          "Start with simple, high-impact automations",
          "Test workflows with small batches first"
        ]
      },
      'reports': {
        title: "Reports and Dashboards",
        guidance: "Configure your business intelligence:\n\n• **Executive dashboards** for overview metrics\n• **Operational reports** for daily management\n• **Trend analysis** for strategic planning\n• **Exception reports** for problem identification\n• **Scheduled distributions** for team updates",
        tips: [
          "Include metrics you actually use for decisions",
          "Set up mobile access for field teams",
          "Schedule reports at appropriate frequencies"
        ]
      }
    }
  },

  // Troubleshooting help
  troubleshooting: {
    commonIssues: [
      {
        problem: "Inventory not syncing across locations",
        solutions: [
          "Check your internet connection at all locations",
          "Verify location settings in inventory configuration",
          "Ensure proper permissions are set for each location",
          "Run a manual sync to refresh data",
          "Contact support if issue persists"
        ]
      },
      {
        problem: "Orders not processing correctly",
        solutions: [
          "Verify payment gateway configuration",
          "Check inventory levels for ordered items",
          "Review order processing workflow settings",
          "Ensure customer information is complete",
          "Check for any system notifications or errors"
        ]
      },
      {
        problem: "Reports showing incorrect data",
        solutions: [
          "Verify date ranges and filters applied",
          "Check if all transactions are completed",
          "Run a data sync to update information",
          "Verify user permissions for data access",
          "Check for any data import issues"
        ]
      },
      {
        problem: "Integration not working with external system",
        solutions: [
          "Verify API credentials and access permissions",
          "Check if external system is accessible",
          "Review integration configuration settings",
          "Test connection with sample data",
          "Check for recent updates to either system"
        ]
      }
    ]
  },

  // Best practices
  bestPractices: {
    general: [
      "Start with a pilot group of users before full deployment",
      "Document your processes and workflows",
      "Train your team on new systems before go-live",
      "Set up regular data backups",
      "Monitor key performance indicators weekly",
      "Schedule regular system reviews and optimizations"
    ],
    inventory: [
      "Conduct regular cycle counts instead of annual physical counts",
      "Set reorder points based on lead time and demand variability",
      "Use ABC analysis to prioritize inventory management efforts",
      "Implement barcode scanning to reduce data entry errors",
      "Regularly review and update safety stock levels"
    ],
    sales: [
      "Standardize order entry processes",
      "Set up automated order confirmations",
      "Use customer segmentation for targeted pricing",
      "Monitor sales team performance with dashboards",
      "Regularly review and update pricing strategies"
    ]
  },

  // Main response method
  getResponse(intent, context) {
    const responses = []

    // Handle greetings
    if (intent.type === 'greeting') {
      responses.push(this.getRandomElement(this.greetings))
      return responses.join('\n\n')
    }

    // Handle help requests
    if (intent.type === 'help_request') {
      responses.push(this.getRandomElement(this.helpResponses))

      // Add contextual help based on current page/step
      if (context.currentPage === '/onboarding' && context.onboardingStep) {
        const stepInfo = this.onboarding.steps[context.onboardingStep]
        if (stepInfo) {
          responses.push(`\n\nSince you're on the ${stepInfo.title} step:\n\n${stepInfo.guidance}`)
        }
      }

      return responses.join('\n\n')
    }

    // Handle industry-specific questions
    if (intent.type === 'industry_specific' && context.userIndustry) {
      const industryInfo = this.industryGuidance[context.userIndustry]
      if (industryInfo) {
        responses.push(industryInfo.setup)
        responses.push('\n\n' + industryInfo.bestPractices)
        return responses.join('\n\n')
      }
    }

    // Handle feature questions
    if (intent.type === 'feature_question') {
      const featureInfo = this.features[intent.topic]
      if (featureInfo) {
        responses.push(featureInfo.overview)
        responses.push('\n\n' + featureInfo.setup)
        return responses.join('\n\n')
      }
    }

    // Handle troubleshooting
    if (intent.type === 'troubleshooting') {
      const issue = this.getRandomElement(this.troubleshooting.commonIssues)
      responses.push(`**${issue.problem}**\n\nHere are some solutions to try:\n\n${issue.solutions.map(sol => `• ${sol}`).join('\n')}`)
      responses.push('\n\nIf none of these work, I can connect you with our support team.')
      return responses.join('\n\n')
    }

    // Handle best practices
    if (intent.type === 'best_practices') {
      const practices = this.bestPractices[intent.topic] || this.bestPractices.general
      responses.push("Here are some best practices I recommend:\n\n" +
        practices.map(practice => `• ${practice}`).join('\n'))
      return responses.join('\n\n')
    }

    // Handle onboarding navigation
    if (intent.type === 'onboarding_navigation') {
      responses.push("I can help you navigate the onboarding process. Each step is designed to build on the previous one:")

      Object.entries(this.onboarding.steps).forEach(([stepId, stepInfo]) => {
        responses.push(`\n**${stepInfo.title}**: ${stepInfo.guidance.split('\n')[0]}`)
      })

      responses.push("\n\nWhich step would you like to focus on, or do you have questions about a specific part of the process?")
      return responses.join('\n\n')
    }

    // Default response
    return "I'm here to help with Cin7 Core! I can assist with onboarding, feature setup, best practices, and troubleshooting. Could you tell me more about what you'd like to work on, or would you like me to suggest some areas where I can help?"
  },

  // Feature explanation helper
  getFeatureExplanation(feature, context) {
    const featureInfo = this.features[feature]
    if (!featureInfo) return `I don't have specific information about the ${feature} feature yet. Let me connect you with our documentation team.`

    let response = featureInfo.overview + '\n\n' + featureInfo.setup

    // Add industry-specific guidance if available
    if (context.userIndustry && this.industryGuidance[context.userIndustry]) {
      response += '\n\n**Industry-specific tips for ' + context.userIndustry + ':**\n' +
        this.industryGuidance[context.userIndustry].setup
    }

    return response
  },

  // Helper method to get random element
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}