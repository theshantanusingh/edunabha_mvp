// Main App JavaScript
class EdunabhaApp {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    init() {
        this.initNavigation();
        this.initAuth();
        this.loadUserData();
        console.log('✅ Edunabha App initialized successfully!');
    }
    
    initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    initAuth() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e.target);
            });
        }
    }
    
    handleLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Mock authentication
        if (email && password) {
            this.showNotification('Logging in...', 'info');
            
            setTimeout(() => {
                this.setCurrentUser({
                    id: '1',
                    name: 'Rajesh Singh',
                    email: email,
                    role: 'student'
                });
                
                this.showNotification('Login successful!', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }, 1500);
        } else {
            this.showNotification('Please fill all fields', 'error');
        }
    }
    
    loadUserData() {
        const userData = localStorage.getItem('edunabha_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }
    
    setCurrentUser(user) {
        this.currentUser = user;
        localStorage.setItem('edunabha_user', JSON.stringify(user));
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global Functions
function loginAsStudent() {
    window.edunabhaApp.setCurrentUser({
        id: '1',
        name: 'Rajesh Singh',
        email: 'rajesh@example.com',
        role: 'student'
    });
    
    window.edunabhaApp.showNotification('Logged in as Student!', 'success');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

function loginAsTeacher() {
    window.edunabhaApp.setCurrentUser({
        id: '2',
        name: 'Priya Kaur',
        email: 'priya@example.com',
        role: 'teacher'
    });
    
    window.edunabhaApp.showNotification('Logged in as Teacher!', 'success');
    setTimeout(() => {
        window.location.href = 'teacher.html';
    }, 1000);
}

function playDemo() {
    window.edunabhaApp.showNotification('Demo video coming soon!', 'info');
}

function showProfile() {
    window.edunabhaApp.showNotification('Profile page coming soon!', 'info');
}

function showSettings() {
    window.edunabhaApp.showNotification('Settings page coming soon!', 'info');
}

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    window.edunabhaApp = new EdunabhaApp();
});

// AI Chat System
class AITutor {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.apiEndpoint = 'YOUR_BACKEND_URL/api/ai-chat'; // Replace with your backend
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadChatHistory();
    }
    
    bindEvents() {
        const toggle = document.getElementById('aiChatToggle');
        const modal = document.getElementById('aiChatModal');
        const closeBtn = document.getElementById('aiCloseBtn');
        const sendBtn = document.getElementById('aiSendBtn');
        const input = document.getElementById('aiQuestionInput');
        const quickQuestions = document.querySelectorAll('.quick-question');
        
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleChat());
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeChat());
        }
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            // Auto-resize textarea
            input.addEventListener('input', this.autoResize);
        }
        
        // Quick questions
        quickQuestions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                this.sendQuickQuestion(question);
            });
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !modal?.contains(e.target) && !toggle?.contains(e.target)) {
                this.closeChat();
            }
        });
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        const modal = document.getElementById('aiChatModal');
        if (modal) {
            modal.classList.add('active');
            this.isOpen = true;
            
            // Focus input
            setTimeout(() => {
                const input = document.getElementById('aiQuestionInput');
                if (input) input.focus();
            }, 300);
        }
    }
    
    closeChat() {
        const modal = document.getElementById('aiChatModal');
        if (modal) {
            modal.classList.remove('active');
            this.isOpen = false;
        }
    }
    
    async sendMessage() {
        const input = document.getElementById('aiQuestionInput');
        const question = input?.value?.trim();
        
        if (!question) return;
        
        // Clear input
        input.value = '';
        this.autoResize({ target: input });
        
        // Add user message
        this.addMessage(question, 'user');
        
        // Show typing indicator
        this.showTyping();
        
        try {
            // Send to AI API
            const response = await this.callGeminiAPI(question);
            
            // Hide typing and show response
            this.hideTyping();
            this.addMessage(response, 'ai');
            
        } catch (error) {
            console.error('AI API Error:', error);
            this.hideTyping();
            this.showError('Sorry, I\'m having trouble understanding right now. Please try again or contact your teacher for help.');
        }
    }
    
    sendQuickQuestion(question) {
        const input = document.getElementById('aiQuestionInput');
        if (input) {
            input.value = question;
            this.sendMessage();
        }
    }
    
    async callGeminiAPI(question) {
        // For demo purposes, return mock responses
        // Replace this with actual API call to your backend
        return this.getMockResponse(question);
        
        /* Actual API call would be:
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: question,
                context: 'educational', // Help AI understand this is for students
                subject: this.detectSubject(question),
                grade: '10' // Can be dynamic based on user
            })
        });
        
        const data = await response.json();
        return data.answer;
        */
    }
    
    getMockResponse(question) {
        // Simulate AI thinking time
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simple keyword-based responses for demo
                const lowerQ = question.toLowerCase();
                
                if (lowerQ.includes('quadratic')) {
                    resolve("A quadratic equation is a polynomial equation of degree 2, written as ax² + bx + c = 0, where 'a' cannot be zero.\n\nThe quadratic formula is: x = (-b ± √(b² - 4ac)) / 2a\n\nExample: For x² - 5x + 6 = 0:\n• a = 1, b = -5, c = 6\n• x = (5 ± √(25-24)) / 2 = (5 ± 1) / 2\n• So x = 3 or x = 2\n\nWould you like me to solve a specific quadratic equation for you?");
                } else if (lowerQ.includes('photosynthesis')) {
                    resolve("Photosynthesis is the process by which plants make food using sunlight! 🌱\n\n**Simple Equation:**\n6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂\n\n**What happens:**\n1. Plants take in CO₂ from air\n2. Roots absorb water (H₂O)\n3. Chlorophyll captures sunlight\n4. Plants make glucose (food) and release oxygen\n\n**Why it's important:**\n• Plants get energy to grow\n• We get oxygen to breathe\n• Food chain starts here\n\nDo you want to know more about any specific part?");
                } else if (lowerQ.includes('active') && lowerQ.includes('passive')) {
                    resolve("**Active vs Passive Voice** - Easy way to remember! 📝\n\n**Active Voice:**\n• Subject DOES the action\n• Example: \"Ram ate the apple\"\n• Structure: Subject + Verb + Object\n\n**Passive Voice:**\n• Subject RECEIVES the action\n• Example: \"The apple was eaten by Ram\"\n• Structure: Object + was/were + Past Participle + by + Subject\n\n**Quick Test:**\nIf you can add \"by someone\" at the end, it's passive!\n\n**More Examples:**\n• Active: \"Teacher teaches students\"\n• Passive: \"Students are taught by teacher\"\n\nTry converting a sentence - I'll help you check!");
                } else {
                    resolve(`I understand you're asking about "${question}". This is a great question!\n\nWhile I try to help with most topics, for the best detailed explanation, I'd recommend:\n\n1. **Check your textbook** - Chapter summaries are very helpful\n2. **Ask your teacher** - They can give personalized examples\n3. **Try breaking down** the question into smaller parts\n\nIs there a specific part of this topic you'd like me to explain? I work best with focused questions like \"What is...\" or \"How do you solve...\"?`);
                }
            }, 1500); // Simulate thinking time
        });
    }
    
    detectSubject(question) {
        const lowerQ = question.toLowerCase();
        if (lowerQ.match(/math|equation|algebra|geometry|triangle|quadratic|formula/)) return 'mathematics';
        if (lowerQ.match(/science|physics|chemistry|biology|photosynthesis|atom/)) return 'science';
        if (lowerQ.match(/english|grammar|voice|tense|essay|writing/)) return 'english';
        return 'general';
    }
    
    addMessage(content, type) {
        const messagesContainer = document.getElementById('aiChatMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'user' ? 'user-message' : 'ai-message';
        
        if (type === 'user') {
            messageDiv.innerHTML = `
                <div class="user-message-content">
                    <p>${this.formatMessage(content)}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="ai-avatar-small">🤖</div>
                <div class="ai-message-content">
                    <p>${this.formatMessage(content)}</p>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Store message
        this.messages.push({ content, type, timestamp: Date.now() });
        this.saveChatHistory();
    }
    
    showTyping() {
        if (this.isTyping) return;
        
        const messagesContainer = document.getElementById('aiChatMessages');
        if (!messagesContainer) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-typing';
        typingDiv.id = 'ai-typing-indicator';
        typingDiv.innerHTML = `
            <div class="ai-avatar-small">🤖</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        this.isTyping = true;
    }
    
    hideTyping() {
        const typingIndicator = document.getElementById('ai-typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }
    
    showError(message) {
        const messagesContainer = document.getElementById('aiChatMessages');
        if (!messagesContainer) return;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'ai-error-message';
        errorDiv.textContent = message;
        
        messagesContainer.appendChild(errorDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    formatMessage(content) {
        // Convert newlines to <br> and format bold text
        return content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }
    
    autoResize(e) {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 80) + 'px';
    }
    
    saveChatHistory() {
        localStorage.setItem('edunabha_chat_history', JSON.stringify(this.messages));
    }
    
    loadChatHistory() {
        const saved = localStorage.getItem('edunabha_chat_history');
        if (saved) {
            this.messages = JSON.parse(saved);
            // Restore recent messages (last 5)
            const recentMessages = this.messages.slice(-5);
            recentMessages.forEach(msg => {
                // Don't re-add the welcome message if it exists
                if (msg.content.includes("Hello! I'm your AI Study Assistant")) return;
                this.addMessageSilent(msg.content, msg.type);
            });
        }
    }
    
    addMessageSilent(content, type) {
        const messagesContainer = document.getElementById('aiChatMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'user' ? 'user-message' : 'ai-message';
        
        if (type === 'user') {
            messageDiv.innerHTML = `
                <div class="user-message-content">
                    <p>${this.formatMessage(content)}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="ai-avatar-small">🤖</div>
                <div class="ai-message-content">
                    <p>${this.formatMessage(content)}</p>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
    }
}

// Initialize AI Tutor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if chat elements exist
    if (document.getElementById('aiChatToggle')) {
        window.aiTutor = new AITutor();
        console.log('✅ AI Tutor initialized successfully!');
    }
});
