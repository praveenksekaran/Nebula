// Main application logic for AI Cost Optimizer
class AICostOptimizer {
    constructor() {
        this.currentStep = 'chat';
        this.chatHistory = [];
        this.currentSummary = '';
        this.configData = {};
        this.init();        
    }

    init() {
        this.bindEvents();
        //this.populateConfigOptions();
        this.updateStatus('Ready');      
    }

    bindEvents() {
        // Chat events
        document.getElementById('send-button').addEventListener('click', () => this.sendChatMessageLyzr());
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessageLyzr();
        });

        // Quick action events
        document.querySelectorAll('.quick-action').forEach(button => {
            button.addEventListener('click', (e) => {
                const query = e.target.dataset.query;
                this.handleQuickAction(query);
            });
        });

        // Summary events
        document.getElementById('show-summary-button').addEventListener('click', () => this.showSummary());
        document.getElementById('chat-again-button').addEventListener('click', () => this.returnToChat());
        document.getElementById('proceed-button').addEventListener('click', () => this.showConfiguration());
        document.getElementById('choose-model-button').addEventListener('click', () => this.showModelpanel());
        // Configuration events gen-report-button
        //document.getElementById('generate-report-button').addEventListener('click', () => this.generateReport());

    }

    populateConfigOptions() {
        // Populate use case types
        const useCaseSelect = document.getElementById('use-case-type');
        AppData.useCaseTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            useCaseSelect.appendChild(option);
        });

        // Populate complexity buttons
    const complexityContainer = document.getElementById('complexity-buttons');
    AppData.complexityLevels.forEach((level, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 complexity-btn ${index === 1 ? 'bg-blue-500 text-white' : ''}`;
            button.textContent = level;
            button.dataset.level = level;
            button.addEventListener('click', (e) => this.selectComplexity(e.target));
            complexityContainer.appendChild(button);
        });

        // Populate response time options
        const responseTimeSelect = document.getElementById('response-time');
        AppData.responseTimeOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            responseTimeSelect.appendChild(optionElement);
        });

        // Populate budget range options
        const budgetSelect = document.getElementById('budget-range');
        AppData.budgetRanges.forEach(range => {
            const option = document.createElement('option');
            option.value = range;
            option.textContent = range;
            budgetSelect.appendChild(option);
        });
    }

    updateStatus(status) {
        document.getElementById('status-text').textContent = status;
    }

    //chat Function from Lyzer 
    async sendChatMessageLyzr() { 
        this.addMessageToChat('user', document.getElementById('chat-input').value);             
        this.updateStatus('Thinking...');
        this.showTypingIndicator();

        var jsonData;

        const url = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';
        
        const headers = {
          'Content-Type': 'application/json',
          'x-api-key': 'sk-default-b8BlfVaJO2ISTOVXXW6ABKVXMO2ZS7EB'
        };
        
        const body = {
          user_id: "praveen.k.s@hotmail.com",
          agent_id: "683ae97784eab878b4b50152",
          session_id: "683ae97784eab878b4b50152-2n0fj4nrc22",
          message: document.getElementById('chat-input').value
        };

        console.log('Request body:', body);
        
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          });        
        

          //Inserting 
          // Option 1: For fetch API
            if (response.text) {
                
                const responseText = await response.text();
                jsonData = JSON.parse(responseText);
                console.log(jsonData.response);
            } 
            else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }     
         
          //return data;
        } catch (error) {
          console.log('all catch failed');
          console.error('Error sending chat message:', error);
          throw error;
        }
        
        const message = jsonData.response;        
        if (!message) return;

        this.addMessageToChat('ai', message);
        document.getElementById('chat-input').value = '';

        // Simulate AI response delay
        setTimeout(() => {
            //this.handleAIResponse(message);
            //document.getElementById('chat-input').value = message;
            this.hideTypingIndicator();
            this.updateStatus('Ready');
        }, 10);

        //chat Function from Lyze
      }

    addMessageToChat(sender, message) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex items-start space-x-3 message-animation';

        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <div class="bg-blue-500 text-white rounded-lg p-4 shadow-sm max-w-md ml-auto">
                    <p>${message}</p>
                </div>
            `;
            messageDiv.style.flexDirection = 'row-reverse';
        } else {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
                    </svg>
                </div>
                <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 max-w-md">
                    <p class="text-gray-900 whitespace-pre-line">${message}</p>
                </div>
            `;
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Store in chat history
        this.chatHistory.push({ sender, message, timestamp: new Date() });

        // Show summary button after AI response
        if (message.includes('#$#$#$report.md#$#$#$')) {
            document.getElementById('summary-button-container').classList.remove('hidden');
        }
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex items-start space-x-3';
        typingDiv.innerHTML = `
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
                </svg>
            </div>
            <div class="typing-indicator">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
                <span class="ml-3 text-gray-500">AI is thinking...</span>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    handleAIResponse(userMessage) {
        let response = '';
        let summary = '';

        // Simple keyword matching for demo
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('cost') || lowerMessage.includes('optimization')) {
            response = AppData.chatResponses['cost optimization'].response;
            summary = AppData.chatResponses['cost optimization'].summary;
        } else if (lowerMessage.includes('model') || lowerMessage.includes('comparison')) {
            response = AppData.chatResponses['model comparison'].response;
            summary = AppData.chatResponses['model comparison'].summary;
        } else if (lowerMessage.includes('performance') || lowerMessage.includes('metrics')) {
            response = AppData.chatResponses['performance metrics'].response;
            summary = AppData.chatResponses['performance metrics'].summary;
        } else {
            response = "I understand you're interested in AI cost optimization. I can help you with cost analysis, model selection, and performance optimization. What specific aspect would you like to explore?";
            summary = "General AI optimization consultation - Ready to proceed with detailed analysis.";
        }

        this.currentSummary = summary;
        this.addMessageToChat('ai', response);
    }

    showSummary() {
        document.getElementById('chat-section').classList.add('hidden');
        document.getElementById('summary-section').classList.remove('hidden');
        document.getElementById('summary-content').innerHTML = `
            <p class="mb-4">${this.currentSummary}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 class="font-medium text-gray-900 mb-2">💡 Overview </h4>
                    <p>A streamlined ticketing solution powered by two AI agents:
                        - **Agent 1: Ticket-Sorting Agent**
                        Automatically ingests, classifies, prioritizes, and routes incoming tickets.
                        - **Agent 2: Customer-Response Agent**
                        Drafts and delivers context-aware replies, maintaining conversational history.
                    </p>
                </div>
                <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 class="font-medium text-gray-900 mb-2">📊 All Tasks Required</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li>• T1. Ingest incoming tickets (email, web form, chat)</li>
                        <li>• T2. Validate and enrich ticket data (customer lookups, metadata)</li>
                        <li>• T3. Classify tickets by category (Billing, Technical, Feature Request, etc.)</li>
                         <li>• T4. Prioritize tickets (severity, SLA risk, customer tier)</li>
                          <li>• T5. Route or assign tickets to the correct team or queue</li>
                           <li>• T6. Monitor SLA timers and trigger escalations or reminders</li>
                            <li>• T7. Generate draft responses tailored to ticket context and tone</li>
                             <li>• T8. Send responses via appropriate channel and update status</li>
                              <li>• T9. Maintain conversation history for follow-up and continuity</li>
                               <li>• T10. Produce analytics dashboards and performance reports  </li>
                    </ul>                
                </div>
            </div>
        `;

        document.getElementById('summary-content1').innerHTML = `
            <p class="mb-4">${this.currentSummary}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 class="font-medium text-gray-900 mb-2">💡 Tasks Automatable Without AI Agents</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li>• T1: Ticket ingestion via standard connectors (SMTP, REST webhooks)</li>
                        <li>• T2: Data validation & enrichment using rule-based scripts</li>
                        <li>• T5: Rule-based routing (e.g., “Billing → Billing Team”)</li>
                        <li>• T6: SLA monitoring & alerting via scheduled jobs</li>
                        <li>• T10: Basic dashboard generation from database queries</li>
                    </ul>
                </div>
                <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 class="font-medium text-gray-900 mb-2">📊 Tasks Requiring AI Agents</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li>• T3: NLP-based ticket classification</li>
                        <li>• T4: ML-driven priority scoring and SLA-risk prediction</li>
                        <li>• T7: Natural-language generation for personalized replies</li>
                        <li>• T9: Context management for coherent multi-turn dialogs</li>
                    </ul>
                </div>
            </div>
        `;
        document.getElementById('summary-content2').innerHTML = `
            <p class="mb-4">${this.currentSummary}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div class="bg-white rounded-lg p-4 border border-gray-200">                   
                    <p>2 agents<p>
                </div>                
            </div>
        `;

        document.getElementById('summary-content3').innerHTML = `
            <p class="mb-4">${this.currentSummary}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 class="font-medium text-gray-900 mb-2">💡 Agent 1: Ticket-Sorting Agent</h4>
                    Capabilities:
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li>• NLP classification & clustering of tickets</li>
                        <li>• Predictive prioritization (severity, SLA risk, customer importance)</li>
                        <li>• Dynamic routing decisions and escalation triggers</li>
                        <li>• Integrations with email servers, webhooks, chat APIs, and help-desk systems</li>                       
                    </ul>
                    <p> Assigned Tasks: T3, T4, T5 (dynamic), T6 (escalations)</p>
                    Performance & Memory Needs:
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li>• Throughput: 200–500 tickets/hour</li>
                        <li>• Short-term memory of recent ticket trends</li>
                        <li>• Audit logs of decisions for compliance</li>                    
                    </ul>
                    
                </div>
                <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 class="font-medium text-gray-900 mb-2">💡 Agent 2: Customer-Response Agent</h4>
                        Capabilities:
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li>• Contextual NLG to draft replies in brand voice</li>
                            <li>• Sentiment analysis to adjust tone and empathy</li>
                            <li>• Multi-turn dialog management with persistent memory</li>
                            <li>• Integrations with email, chat widgets, and SMS gateways</li>                       
                        </ul>
                        <p> Assigned Tasks: T7, T8, T9</p>
                        Performance & Memory Needs:
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li>• Latency: <2 seconds for real-time responses</li>
                            <li>• Long-term memory of user interactions for continuity</li>
                            <li>• Confidence scoring with fallbacks to human review</li>                    
                        </ul>
                </div>
            </div>
        `;

        this.currentStep = 'summary';
    }

    returnToChat() {
        document.getElementById('summary-section').classList.add('hidden');
        document.getElementById('chat-section').classList.remove('hidden');
        this.currentStep = 'chat';
    }

    showConfiguration() {
        document.getElementById('summary-section').classList.add('hidden');
        document.getElementById('config-section').classList.remove('hidden');
        this.currentStep = 'configuration';
        //this.generateInitialReport();
        //this.showDownloadButton();
        this.populateAgentDropdown();
    }

    populateAgentDropdown() {
        // Populate use case types
        const agentSelect = document.getElementById('use-case-type');
        projectData.agents.forEach(agent => {
            const option = document.createElement('option');
            option.value = agent.name;
            option.textContent = agent.name;
            agentSelect.appendChild(option);
        });
    }

    selectComplexity(button) {
        // Remove active state from all buttons
        document.querySelectorAll('.complexity-btn').forEach(btn => {
            btn.classList.remove('bg-blue-500', 'text-white');
            btn.classList.add('text-gray-600');
        });

        // Add active state to clicked button
        button.classList.add('bg-blue-500', 'text-white');
        button.classList.remove('text-gray-600');
    }

    async showModelpanel(){
        const agentSelect = document.getElementById('use-case-type');
        const selectedAgent = projectData.agents.find(agent => agent.name === agentSelect.value);       
                  
        this.updateStatus('Thinking...');     

        var jsonData;

        const url = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';
        
        const headers = {
          'Content-Type': 'application/json',
          'x-api-key': 'sk-default-b8BlfVaJO2ISTOVXXW6ABKVXMO2ZS7EB'
        };
        
        const body = {
          user_id: "praveen.k.s@hotmail.com",
          agent_id: "683b360f06e05ef78261af99",
          session_id: "683b360f06e05ef78261af99-xtm08ury49d",
          message: JSON.stringify(selectedAgent)
        };       
        
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          });         
         
            if (response.text) {                
                const responseText = await response.text();
                jsonData = JSON.parse(responseText);                               
            } 
            else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }            
       
        } catch (error) {         
          console.error('Error sending chat message:', error);
          throw error;
        }

        this.updateStatus('Ready');         
        this.showModelOptions(jsonData.response,selectedAgent);     
      }

    showModelOptions(modelOptions,inputOptions){ 
        const myData = inputOptions;
        const jsonString = modelOptions.replace(/```json\n?/, '').replace(/\n?```$/, '');
        const data = JSON.parse(jsonString);               
        document.getElementById('model-panel').classList.remove('hidden');
        document.getElementById('model-panel').innerHTML = `<div class="bg-white rounded-lg shadow-lg p-6">
                                <h2 class="text-2xl font-bold text-gray-900 mb-4">Model Recommendations</h2> 
                                <div class="flex justify-end mb-6">
                                    <button type="button" id="gen-report-button" onclick="window.location.href='../pages/report.html'" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                        </svg>
                                        Generate Report
                                    </button>
                                </div>
                                <!-- Requirements Section -->
                                <div class="mb-6">
                                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <h4 class="font-medium text-gray-900 mb-2">💡 ${myData.name}</h4>
                                        <div class="space-y-3">
                                            <div>
                                                <h5 class="text-sm font-medium text-gray-700">Capabilities:</h5>
                                                ${myData.capabilities}
                                            </div>
                                            <div>
                                                <h5 class="text-sm font-medium text-gray-700">Performance Requirements:</h5>
                                                ${myData.performanceAndMemory}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Options Section -->
                            <div class="space-y-6">
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h4 class="font-medium text-gray-900 mb-4">Model Options</h4>
                                    ${data.options.map((option, index) => `
                                        <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
                                            <div class="flex justify-between items-start mb-3">
                                                <div>
                                                    <h5 class="text-lg font-semibold text-gray-900">${option.model}</h5>
                                                    <span class="inline-block px-2 py-1 text-xs font-medium rounded-full ${option.role === 'Best Fit' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">${option.role}</span>
                                                </div>
                                                <button class="select-model-btn px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" data-model="${option.model}">
                                                    Select
                                                </button>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 mb-3">
                                                <div class="text-sm">
                                                    <span class="font-medium text-gray-700">Provider:</span> ${option.provider}
                                                </div>
                                                <div class="text-sm">
                                                    <span class="font-medium text-gray-700">Cost:</span> $${option.cost}/month
                                                </div>
                                                <div class="text-sm">
                                                    <span class="font-medium text-gray-700">Cost per token:</span> $${option.cost_per_token}
                                                </div>
                                                <div class="text-sm">
                                                    <span class="font-medium text-gray-700">Speed:</span> ${option.speed}/5
                                                </div>
                                            </div>
                                            <div class="text-sm text-gray-600">
                                                <span class="font-medium text-gray-700">Justification:</span> ${option.justification}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <!-- Options code -->
                        </div>
                `

    }

    generateInitialReport() {
        const resultsPanel = document.getElementById('results-panel');
        resultsPanel.innerHTML = this.createCostAnalysisHTML();
    }

    generateReport() {
        // Collect configuration data
        this.configData = {
            useCase: document.getElementById('use-case-type').value,

            complexity: document.querySelector('.complexity-btn.bg-blue-500').dataset.level,
            expectedUsers: document.getElementById('expected-users').value,
            dailyRequests: document.getElementById('daily-requests').value,
            responseTime: document.getElementById('response-time').value,
            budget: document.getElementById('budget-range').value
        };

        this.updateStatus('Generating report...');

        // Simulate report generation
        setTimeout(() => {
            this.showDownloadButton();
            this.updateStatus('Report ready');
        }, 2000);
    }

    createCostAnalysisHTML() {
        const data = AppData.costAnalysis;
        return `
            <!-- Cost Analysis Header -->
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Cost Breakdown Analysis</h2>
                <p class="text-gray-600">Real-time cost calculations based on your parameters</p>
            </div>

            <!-- Top Metrics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl card-hover">
                    <div class="text-3xl font-bold mb-1">${data.monthlyTotal}</div>
                    <div class="text-blue-100 mb-2">Monthly Total</div>
                    <div class="text-sm text-blue-200 flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
                        </svg>
                        ↗ 15% vs last month
                    </div>
                </div>

                <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl card-hover">
                    <div class="text-3xl font-bold mb-1">${data.costPerRequest}</div>
                    <div class="text-green-100 mb-2">Cost per Request</div>
                    <div class="text-sm text-green-200 flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd"/>
                        </svg>
                        ↘ 8% optimization
                    </div>
                </div>

                <div class="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 rounded-xl card-hover">
                    <div class="text-3xl font-bold mb-1">${data.costEfficiency}</div>
                    <div class="text-orange-100 mb-2">Cost Efficiency</div>
                    <div class="text-sm text-orange-200">Industry benchmark: 87%</div>
                </div>
            </div>

            <!-- Cost Components -->
            <div class="bg-white rounded-xl border border-gray-200 p-6 mb-8 card-hover">
                <div class="flex items-center mb-6">
                    <svg class="w-5 h-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                    </svg>
                    <h3 class="text-lg font-semibold text-gray-900">Cost Components</h3>
                </div>

                <div class="space-y-4">
                    ${data.components.map(component => `
                        <div class="flex items-center justify-between p-4 bg-${component.color}-50 rounded-lg cost-component">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-${component.color}-500 rounded-full mr-3"></div>
                                <span class="font-medium text-gray-900">${component.name}</span>
                            </div>
                            <div class="text-right">
                                <div class="font-semibold text-gray-900">${component.cost}</div>
                                <div class="text-sm text-gray-500">${component.percentage}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Optimization Opportunities -->
            <div class="bg-white rounded-xl border border-gray-200 p-6 card-hover">
                <div class="flex items-center mb-6">
                    <svg class="w-5 h-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1z" clip-rule="evenodd"/>
                    </svg>
                    <h3 class="text-lg font-semibold text-gray-900">Cost Optimization Opportunities</h3>
                </div>

                <div class="space-y-4">
                    ${data.optimizations.map((opt, index) => `
                        <div class="p-4 bg-${index === 0 ? 'green' : 'blue'}-50 border border-${index === 0 ? 'green' : 'blue'}-200 rounded-lg optimization-card">
                            <div class="flex items-start">
                                <div class="w-6 h-6 bg-${index === 0 ? 'green' : 'blue'}-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-medium text-gray-900 mb-1">${opt.title}</h4>
                                    <p class="text-sm text-gray-600">Potential savings: ${opt.savings}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    showDownloadButton() {
        const generateButton = document.getElementById('generate-report-button');
        generateButton.innerHTML = `
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-4-8V4"/>
            </svg>
            Download Complete Report
        `;
        generateButton.classList.remove('bg-blue-500', 'hover:bg-blue-600');
        generateButton.classList.add('bg-green-500', 'hover:bg-green-600');
        
        generateButton.onclick = () => this.downloadReport();
    }

    downloadReport() {
        // Create a comprehensive report
        const reportContent = this.generateFullReport();
        
        // Create and download file
        const blob = new Blob([reportContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `AI-Cost-Analysis-Report-${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.updateStatus('Report downloaded successfully');
        
        // Show success message
        this.showSuccessMessage();
    }

    generateFullReport() {
        const config = this.configData;
        const data = AppData.costAnalysis;
        
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Cost Analysis Report</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @media print {
            .no-print { display: none !important; }
            .print-break { page-break-before: always; }
        }
    </style>
</head>
<body class="bg-gray-50 font-sans print-container">
    <div class="max-w-4xl mx-auto py-8 px-6">
        <!-- Report Header -->
        <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div class="text-center mb-6">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">AI Cost Analysis Report</h1>
                <p class="text-gray-600">Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            
            <!-- Configuration Summary -->
            <div class="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h3 class="font-semibold text-gray-900 mb-3">Configuration</h3>
                    <ul class="space-y-2 text-sm">
                        <li><strong>Use Case:</strong> ${config.useCase || 'Customer Service Chatbot'}</li>
                        <li><strong>Complexity:</strong> ${config.complexity || 'Medium'}</li>
                        <li><strong>Expected Users:</strong> ${(config.expectedUsers || '1000').toLocaleString()}</li>
                        <li><strong>Daily Requests:</strong> ${(config.dailyRequests || '10000').toLocaleString()}</li>
                        <li><strong>Response Time:</strong> ${config.responseTime || 'Standard (< 5s)'}</li>
                        <li><strong>Budget Range:</strong> ${config.budget || '$5K - $25K'}</li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-900 mb-3">Key Metrics</h3>
                    <ul class="space-y-2 text-sm">
                        <li><strong>Monthly Total:</strong> ${data.monthlyTotal}</li>
                        <li><strong>Cost per Request:</strong> ${data.costPerRequest}</li>
                        <li><strong>Cost Efficiency:</strong> ${data.costEfficiency}</li>
                        <li><strong>Potential Savings:</strong> Up to 36.7%</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Cost Breakdown -->
        <div class="bg-white rounded-xl shadow-lg p-8 mb-8 print-break">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Cost Breakdown Analysis</h2>
            ${data.components.map(component => `
                <div class="flex justify-between items-center py-3 border-b border-gray-200">
                    <span class="font-medium">${component.name}</span>
                    <div class="text-right">
                        <div class="font-semibold">${component.cost}</div>
                        <div class="text-sm text-gray-500">${component.percentage}</div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Recommendations -->
        <div class="bg-white rounded-xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Optimization Recommendations</h2>
            ${data.optimizations.map((opt, index) => `
                <div class="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h3 class="font-semibold text-gray-900 mb-2">${index + 1}. ${opt.title}</h3>
                    <p class="text-gray-600">Potential savings: ${opt.savings}</p>
                </div>
            `).join('')}
        </div>

        <!-- Footer -->
        <div class="text-center mt-8 text-gray-500 text-sm no-print">
            <p>Generated by AI Cost Optimizer | © ${new Date().getFullYear()}</p>
        </div>
    </div>
</body>
</html>`;
    }

    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
        successDiv.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                Report downloaded successfully!
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AICostOptimizer();
});

