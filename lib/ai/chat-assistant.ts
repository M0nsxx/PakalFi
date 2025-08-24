export interface ChatResponse {
  content: string
  type: 'text' | 'quote' | 'product' | 'contact' | 'claims'
  actions?: string[]
}

export class AIChatAssistant {
  private static responses = {
    greeting: {
      content: `Hello! I'm your PakalFi AI assistant. How can I help you today? I can help you with:

• Insurance quotes and coverage
• Product information  
• Claims assistance
• General questions about our services

What would you like to know?`,
      type: 'text' as const
    },

    quote: {
      content: `I'd be happy to help you get an insurance quote! We offer several types of micro-insurance:

🩺 **Micro-Health**: Medical coverage starting at $5/month
• Covers consultations, medications, and emergencies
• No deductibles, instant coverage

🌦️ **Micro-Climate**: Weather protection for $3/month  
• Protects against crop damage from weather events
• Automatic payouts based on weather data

🛡️ **Micro-Security**: Personal safety coverage for $4/month
• Covers accidents, theft, and personal damage
• 24/7 protection anywhere in Mexico

🚗 **Micro-Mobility**: Transportation protection for $6/month
• Covers drivers and delivery workers
• Accident and vehicle damage protection

Would you like me to:
• Connect you with our calculator for a personalized quote
• Transfer you to a human agent
• Show you detailed product information`,
      type: 'quote' as const,
      actions: ['Use Calculator', 'Contact Agent', 'Product Details']
    },

    product: {
      content: `Our micro-insurance products are designed to be accessible and affordable for everyone:

🩺 **Micro-Health** - $5/month
• Medical consultations and emergency care
• Prescription medication coverage
• Hospital stays and procedures
• Telemedicine services included

🌦️ **Micro-Climate** - $3/month
• Automatic weather event detection
• Crop damage protection for farmers
• Instant payouts based on weather data
• No claims process required

🛡️ **Micro-Security** - $4/month
• Personal accident coverage
• Theft and property damage
• Legal assistance
• 24/7 emergency support

🚗 **Micro-Mobility** - $6/month
• Vehicle accident protection
• Driver injury coverage
• Delivery worker protection
• Roadside assistance

All products use blockchain technology for:
• Instant claims processing
• Transparent pricing
• No hidden fees
• Automatic payouts`,
      type: 'product' as const,
      actions: ['Get Quote', 'Learn More', 'Compare Plans']
    },

    claims: {
      content: `I can help you with claims assistance. Here's what I need to know:

**For New Claims:**
• Policy number (if you have one)
• Type of incident (health, weather, accident, theft)
• Date and location of the incident
• Description of what happened

**For Existing Claims:**
• Claim number
• Current status check
• Additional documentation needed

**Our Claims Process:**
1. **Report**: Tell us what happened
2. **Verify**: We check the details automatically
3. **Pay**: Instant payout if conditions are met
4. **Support**: We're here if you need help

Most claims are processed automatically within minutes using our blockchain technology.

Would you like to:
• File a new claim
• Check existing claim status
• Speak with claims specialist`,
      type: 'claims' as const,
      actions: ['File Claim', 'Check Status', 'Contact Specialist']
    },

    contact: {
      content: `Here are all the ways you can reach us:

📞 **Phone Support**: 800-MICRO-SEGURO
• Available 24/7
• Multi-language support
• Direct connection to specialists

      📧 **Email**: info@pakalfi.com
• Response within 24 hours
• Detailed assistance
• Document submission

💬 **WhatsApp**: Available for instant support
• Quick questions and quotes
• File sharing for documents
• Real-time chat support

🏢 **Office**: CDMX, Mexico
• In-person consultations
• Document processing
• Training and workshops

**Best Contact Method:**
• **Urgent issues**: Phone or WhatsApp
• **Detailed questions**: Email
• **In-person help**: Office visit
• **Quick quotes**: WhatsApp or AI chat

I can also connect you directly with a human agent right now if you prefer.`,
      type: 'contact' as const,
      actions: ['Call Now', 'Send Email', 'WhatsApp', 'Visit Office']
    },

    calculator: {
      content: `Great! Let me help you calculate your insurance needs. Our calculator considers:

**Personal Information:**
• Age and health status
• Occupation and risk level
• Location and weather patterns
• Family size and dependents

**Coverage Options:**
• Health: Medical needs and budget
• Climate: Local weather risks
• Security: Personal safety concerns
• Mobility: Transportation usage

**Pricing Factors:**
• Coverage amount selected
• Risk level assessment
• Payment frequency (monthly/quarterly)
• Family discounts available

The calculator will give you:
• Personalized quote
• Coverage recommendations
• Payment options
• Instant policy activation

Would you like me to:
• Open our calculator tool
• Ask you some questions for a quick estimate
• Connect you with an agent for personalized help`,
      type: 'text' as const,
      actions: ['Open Calculator', 'Quick Estimate', 'Agent Help']
    },

    default: {
      content: `Thank you for your message! I'm here to help with any questions about PakalFi. 

You can ask me about:
• Insurance quotes and coverage options
• Our products and services
• Claims and support
• General information about micro-insurance
• Payment and billing questions

If I can't answer your question, I'll connect you with a human agent who can help.

How can I assist you today?`,
      type: 'text' as const
    },

    emergency: {
      content: `🚨 **Emergency Contact Information:**

📞 **24/7 Emergency Hotline**: 800-MICRO-EMERGENCY
• Available 24/7 for urgent situations
• Direct connection to emergency specialists
• Immediate assistance for accidents and claims

📱 **WhatsApp Emergency**: +52-55-1234-5678
• Instant messaging for urgent matters
• Photo/video sharing for damage assessment
• Real-time support

🏥 **Medical Emergencies**: 911 (Mexico Emergency Services)
• For life-threatening situations
• Coordinate with local emergency services
• We'll follow up immediately after

**What to do in an emergency:**
1. **Stay safe** - Your safety comes first
2. **Call emergency services** if needed (911)
3. **Contact us** immediately after
4. **Document everything** - photos, videos, witness info
5. **Don't admit fault** - let us handle the investigation

We're here to help you through any emergency situation.`,
      type: 'contact' as const,
      actions: ['Call Emergency', 'WhatsApp Support', 'File Emergency Claim']
    },

    policy: {
      content: `📋 **Policy Status & Information:**

To check your policy status, I'll need:
• Policy number (if you have one)
• Your full name
• Email or phone number

**What I can help you with:**
• Current policy status
• Coverage details and limits
• Payment history and due dates
• Policy renewal information
• Coverage modifications

**Quick Policy Actions:**
• View current coverage
• Update personal information
• Request policy documents
• Add or remove coverage
• Change payment method

Please provide your policy number or contact information so I can assist you with your specific policy details.`,
      type: 'text' as const,
      actions: ['Check Policy', 'Update Information', 'Request Documents']
    }
  }

  static async generateResponse(userMessage: string): Promise<ChatResponse> {
    const lowerMessage = userMessage.toLowerCase()
    
    // Enhanced keyword detection
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('start')) {
      return this.responses.greeting
    }
    
    if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost') || 
        lowerMessage.includes('how much') || lowerMessage.includes('pricing')) {
      return this.responses.quote
    }
    
    if (lowerMessage.includes('product') || lowerMessage.includes('coverage') || lowerMessage.includes('plan') ||
        lowerMessage.includes('insurance') || lowerMessage.includes('policy') || lowerMessage.includes('what coverage')) {
      return this.responses.product
    }
    
    if (lowerMessage.includes('claim') || lowerMessage.includes('damage') || lowerMessage.includes('accident') ||
        lowerMessage.includes('incident') || lowerMessage.includes('problem') || lowerMessage.includes('file a claim') ||
        lowerMessage.includes('check policy status')) {
      return this.responses.claims
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help') ||
        lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('office') ||
        lowerMessage.includes('emergency contact')) {
      return this.responses.contact
    }
    
    if (lowerMessage.includes('calculator') || lowerMessage.includes('calculate') || lowerMessage.includes('estimate') ||
        lowerMessage.includes('use calculator')) {
      return this.responses.calculator
    }

    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('accident')) {
      return this.responses.emergency
    }

    if (lowerMessage.includes('policy status') || lowerMessage.includes('check policy') || lowerMessage.includes('my policy')) {
      return this.responses.policy
    }
    
    // Fallback response
    return this.responses.default
  }

  static getQuickReplies(): string[] {
    return [
      'Get insurance quote',
      'Product information',
      'Claims assistance', 
      'Contact support',
      'Use calculator'
    ]
  }
}
