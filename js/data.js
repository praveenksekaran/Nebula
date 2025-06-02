// data.js - Dummy data for the application
const AppData = {
    // Chat responses for different types of queries
    chatResponses: {
        "cost optimization": {
            response: "I can help you optimize your AI costs! Based on industry best practices, here are key areas to consider:\n\n1. **Model Selection**: Choose the right model for each task - not every request needs GPT-4\n2. **Caching Strategy**: Implement intelligent caching to reduce redundant API calls\n3. **Request Batching**: Batch similar requests to improve efficiency\n4. **Usage Monitoring**: Track patterns to identify optimization opportunities\n\nWould you like me to analyze your specific use case and provide detailed recommendations?",
            summary: "AI Cost Optimization Analysis - Ready to proceed with detailed cost breakdown and model recommendations for your specific use case."
        },
        "model comparison": {
            response: "Great question! Here's a comparison of popular AI models:\n\n**GPT-4 Turbo**: Best for complex reasoning, highest cost\n**GPT-3.5 Turbo**: Good balance of performance and cost\n**Claude-3**: Excellent for analysis tasks, competitive pricing\n**Gemini Pro**: Strong multimodal capabilities\n\nThe choice depends on your specific needs: complexity of tasks, response time requirements, and budget constraints.",
            summary: "Model Comparison Analysis - Ready to configure optimal model selection strategy based on your requirements."
        },
        "performance metrics": {
            response: "Let me help you understand AI performance metrics:\n\n**Response Time**: Latency from request to response\n**Throughput**: Requests processed per second\n**Accuracy**: Quality of model outputs for your use case\n**Cost Efficiency**: Performance per dollar spent\n**Availability**: System uptime and reliability\n\nTracking these metrics helps optimize both performance and costs.",
            summary: "Performance Metrics Framework - Ready to set up monitoring and optimization strategy for your AI implementation."
        }
    },

    // Configuration options for the selection phase
    useCaseTypes: [
        "Customer Service Chatbot",
        "Content Generation",
        "Code Assistant",
        "Data Analysis",
        "Document Processing",
        "Translation Services"
    ],

    complexityLevels: ["Low", "Medium", "High"],

    responseTimeOptions: [
        "Standard (< 5s)",
        "Fast (< 2s)", 
        "Ultra Fast (< 1s)"
    ],

    budgetRanges: [
        "$1K - $5K",
        "$5K - $25K", 
        "$25K - $50K",
        "$50K+"
    ],

    // Sample cost analysis data
    costAnalysis: {
        monthlyTotal: "$1,000",
        costPerRequest: "$0.0100",
        costEfficiency: "$5000",
        components: [
            {
                name: "Agent 1: o4 Mini",
                cost: "$1,157",
                percentage: "71.9%",
                color: "blue"
            },
            {
                name: "Agent 2: AWS Bedrock model", 
                cost: "$507",
                percentage: "16.9%",
                color: "green"
            },
            {
                name: "Memory & Storage",
                cost: "$237", 
                percentage: "7.9%",
                color: "orange"
            },
            {
                name: "Monitoring & Analytics",
                cost: "$102",
                percentage: "3.4%", 
                color: "purple"
            }
        ],
        optimizations: [
            {
                title: "Switch to Claude-3 for 40% of requests",
                savings: "$2,680/month (-21.5%)",
                type: "model-switch"
            },
            {
                title: "Implement intelligent caching",
                savings: "$1,890/month (-15.2%)",
                type: "caching"
            }
        ]
    }
};

const projectData = {
    "title": "Ticketing System Blueprint",
    "overview": "A streamlined ticketing solution powered by two AI agents: Agent 1 ingests, classifies, prioritizes and routes incoming tickets; Agent 2 drafts and delivers context-aware replies, maintaining conversational history.",
    "tasksRequired": [
        { "id": "T1",  "description": "Ingest incoming tickets (email, web form, chat)" },
        { "id": "T2",  "description": "Validate and enrich ticket data (customer lookups, metadata)" },
        { "id": "T3",  "description": "Classify tickets by category (Billing, Technical, Feature Request, etc.)" },
        { "id": "T4",  "description": "Prioritize tickets (severity, SLA risk, customer tier)" },
        { "id": "T5",  "description": "Route or assign tickets to the correct team or queue" },
        { "id": "T6",  "description": "Monitor SLA timers and trigger escalations or reminders" },
        { "id": "T7",  "description": "Generate draft responses tailored to ticket context and tone" },
        { "id": "T8",  "description": "Send responses via appropriate channel and update status" },
        { "id": "T9",  "description": "Maintain conversation history for follow-up and continuity" },
        { "id": "T10", "description": "Produce analytics dashboards and performance reports" }
    ],
    "tasksAutomatableWithoutAI": [
        "T1",
        "T2",
        "T5",
        "T6",
        "T10"
    ],
    "tasksRequiringAIAgents": [
        "T3",
        "T4",
        "T7",
        "T9"
    ],
    "numberOfAIAgents": 2,
    "agents": [
        {
            "name": "Agent 1: Ticket-Sorting Agent",
            "assignedTasks": [
                "T3",
                "T4",
                "T5",
                "T6"
            ],
            "capabilities": [
                "NLP classification & clustering of tickets",
                "Predictive prioritization (severity, SLA risk, customer importance)",
                "Dynamic routing decisions and escalation triggers",
                "Integrations with email servers, webhooks, chat APIs, and help-desk systems"
            ],
            "performanceAndMemory": {
                "throughputTicketsPerHour": "200–500",
                "shortTermMemory": "recent ticket trends",
                "auditLogs": "decision history for compliance"
            }
        },
        {
            "name": "Agent 2: Customer-Response Agent",
            "assignedTasks": [
                "T7",
                "T8",
                "T9"
            ],
            "capabilities": [
                "Contextual NLG to draft replies in brand voice",
                "Sentiment analysis to adjust tone and empathy",
                "Multi-turn dialog management with persistent memory",
                "Integrations with email, chat widgets, and SMS gateways"
            ],
            "performanceAndMemory": {
                "responseLatencySeconds": "<2",
                "longTermMemory": "user interactions for continuity",
                "confidenceScoring": "with fallbacks to human review"
            }
        }
    ]
}; 

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppData;
}
