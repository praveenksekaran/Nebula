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
        monthlyTotal: "$3,000",
        costPerRequest: "$0.0100",
        costEfficiency: "94.2%",
        components: [
            {
                name: "LLM Processing (GPT-4 Turbo)",
                cost: "$2,157",
                percentage: "71.9%",
                color: "blue"
            },
            {
                name: "Infrastructure & Hosting", 
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

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppData;
}
