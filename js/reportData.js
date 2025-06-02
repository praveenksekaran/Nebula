// Main application logic for AI Cost Optimizer
class AICostOptimizerReport {
    constructor() {    
        this.init();        
    }

    init() {
        this.updateStatus('Ready');

    }

    updateStatus(status) {
        document.getElementById('status-text').textContent = status;
    }

    genReport() {        
        const resultsPanel = document.getElementById('results-panel');
        resultsPanel.innerHTML = this.createCostAnalysis();
    }   

    createCostAnalysis() {
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
                    <div class="text-3xl font-bold mb-1">${data.costEfficiency}</div>
                    <div class="text-blue-100 mb-2">Initial Cost</div>
                    <div class="text-sm text-blue-200 flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                             <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd"/>
                        </svg>
                        ↘ 15% vs Industry benchmark
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
                    <div class="text-3xl font-bold mb-1">${data.monthlyTotal}</div>
                    <div class="text-orange-100 mb-2">Recurring Monthly Cost </div>
                    <div class="text-sm text-orange-200">Much less than Labour Cost</div>
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



    
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AICostOptimizerReport();
});

