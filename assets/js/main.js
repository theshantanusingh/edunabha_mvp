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
        return new Promise((resolve) => {
            setTimeout(() => {
                const lowerQ = question.toLowerCase();
                const response = this.getEducationalResponse(lowerQ);
                resolve(response);
            }, 1500);
        });
    }

    getEducationalResponse(question) {
        // Mathematics Topics
        if (this.matchesKeywords(question, ['polynomial', 'polynomials'])) {
            return `**Polynomials - Simple Explanation** 📐

**What is a Polynomial?**
A polynomial is a mathematical expression with variables and coefficients.

**General Form:** ax^n + bx^(n-1) + ... + cx + d

**Examples:**
• **Linear:** 2x + 3 (degree 1)
• **Quadratic:** x² + 5x + 6 (degree 2)  
• **Cubic:** x³ + 2x² + x + 4 (degree 3)

**Key Parts:**
• **Coefficient:** Numbers like 2, 5, 6
• **Variable:** Usually x, y, z
• **Degree:** Highest power of variable

**Real Life:** Used in calculating area, profit, population growth!

Need help with a specific polynomial problem?`;
        }

        if (this.matchesKeywords(question, ['linear equation', 'linear equations', 'linear'])) {
            return `**Linear Equations Made Easy** 📊

**What is Linear Equation?**
An equation where the highest power of variable is 1.

**Standard Form:** ax + b = c

**Examples:**
• 2x + 5 = 11  →  x = 3
• 3y - 7 = 8   →  y = 5
• 5x = 20      →  x = 4

**How to Solve:**
1. **Isolate the variable** (get x alone)
2. **Same operation both sides**
3. **Check your answer**

**Example Step-by-Step:**
2x + 6 = 14
2x = 14 - 6  (subtract 6)
2x = 8
x = 4        (divide by 2)

**Check:** 2(4) + 6 = 8 + 6 = 14 ✅

Want me to solve a specific equation?`;
        }

        if (this.matchesKeywords(question, ['quadratic', 'quadratics'])) {
            return `**Quadratic Equations Complete Guide** 🔢

**Standard Form:** ax² + bx + c = 0 (where a ≠ 0)

**Quadratic Formula:** x = (-b ± √(b² - 4ac)) / 2a

**Example:** x² - 5x + 6 = 0
• a = 1, b = -5, c = 6
• x = (5 ± √(25-24)) / 2 = (5 ± 1) / 2
• **Solutions:** x = 3 or x = 2

**Other Methods:**
1. **Factoring:** (x-2)(x-3) = 0
2. **Completing the square**
3. **Graphing**

**Discriminant (b² - 4ac):**
• > 0: Two real roots
• = 0: One real root  
• < 0: No real roots

Ready to solve a quadratic equation together?`;
        }

        // Science Topics
        if (this.matchesKeywords(question, ['photosynthesis'])) {
            return `**Photosynthesis - How Plants Make Food** 🌱

**Simple Equation:**
6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂

**Step by Step Process:**
1. **Light Absorption:** Chlorophyll captures sunlight
2. **Water Split:** H₂O → H⁺ + OH⁻ 
3. **CO₂ Fixation:** Carbon dioxide enters through stomata
4. **Glucose Formation:** Sugar is made for plant food
5. **Oxygen Release:** O₂ released as byproduct

**Where it happens:**
• **Chloroplasts:** Green parts in leaf cells
• **Chlorophyll:** Green pigment that captures light

**Importance:**
• Plants get energy to grow
• Animals get oxygen to breathe  
• Food chain starts here
• Removes CO₂ from atmosphere

Want to know about any specific part of photosynthesis?`;
        }

        if (this.matchesKeywords(question, ['light', 'reflection', 'refraction', 'optics'])) {
            return `**Light - Reflection & Refraction** 💡

**Laws of Reflection:**
1. Incident ray = Reflected ray (same angle)
2. All rays in same plane

**Examples:**
• **Plane Mirror:** Virtual, same size image
• **Concave Mirror:** Can form real/virtual images
• **Convex Mirror:** Always virtual, smaller images

**Refraction:** Light bending when changing medium
• **Snell's Law:** n₁sinθ₁ = n₂sinθ₂
• **Examples:** Pencil looks bent in water, rainbow formation

**Applications:**
• Mirrors in periscope (plane mirrors)
• Car headlights (concave mirrors)  
• Security mirrors (convex mirrors)
• Glasses/contact lenses

Which part would you like me to explain more?`;
        }

        // English Topics
        if (this.matchesKeywords(question, ['active', 'passive', 'voice'])) {
            return `**Active vs Passive Voice** 📝

**Active Voice:** Subject performs action
• Structure: Subject + Verb + Object
• Example: "Ram ate the apple"

**Passive Voice:** Subject receives action  
• Structure: Object + be + Past Participle + by + Subject
• Example: "The apple was eaten by Ram"

**Quick Recognition Test:**
Can you add "by someone" at the end? → It's passive!

**More Examples:**
• Active: "Students solve problems"
• Passive: "Problems are solved by students"

**When to Use:**
• **Active:** Direct, clear, stronger
• **Passive:** Focus on action, formal writing

**Common Forms:**
• is/am/are + Past Participle (present)
• was/were + Past Participle (past)

Try converting this: "The teacher teaches the lesson" - what's the passive form?`;
        }

        if (this.matchesKeywords(question, ['grammar', 'tense', 'tenses'])) {
            return `**English Grammar - Tenses Made Simple** ✍️

**Present Tense:**
• Simple: I eat (daily habit)
• Continuous: I am eating (now)
• Perfect: I have eaten (completed recently)

**Past Tense:**  
• Simple: I ate (yesterday)
• Continuous: I was eating (ongoing in past)
• Perfect: I had eaten (before another past action)

**Future Tense:**
• Simple: I will eat (tomorrow)
• Continuous: I will be eating (ongoing in future)
• Perfect: I will have eaten (before future time)

**Quick Tips:**
• **Present:** Use for facts, habits, current actions
• **Past:** Use for completed actions
• **Future:** Use for planned/predicted actions

**Signal Words:**
• Present: usually, always, every day
• Past: yesterday, last week, ago
• Future: tomorrow, next week, will

Which specific tense confuses you most?`;
        }

        // General Math Help
        if (this.matchesKeywords(question, ['math', 'mathematics', 'maths', 'solve', 'problem', 'equation', 'formula'])) {
            return `**Math Help Available** 🔢

I can help you with:

**Algebra:**
• Linear equations (2x + 5 = 11)
• Quadratic equations (x² + 3x + 2 = 0)
• Polynomials (x³ + 2x² + x + 1)
• Factoring and simplification

**Geometry:**
• Area and perimeter formulas
• Triangles and their properties
• Circles and their measurements
• Coordinate geometry

**Arithmetic:**  
• Fractions and decimals
• Percentages and ratios
• Square roots and powers

**Ask me specifically like:**
• "Solve 2x + 5 = 11"  
• "What is the area of a circle?"
• "How to factor x² + 5x + 6?"

What specific math topic do you need help with?`;
        }

        // General Science Help  
        if (this.matchesKeywords(question, ['science', 'physics', 'chemistry', 'biology'])) {
            return `**Science Help Available** 🔬

I can explain:

**Physics:**
• Light, sound, electricity
• Motion and force
• Heat and energy
• Simple machines

**Chemistry:**
• Acids, bases, and salts
• Metals and non-metals  
• Chemical reactions
• Periodic table basics

**Biology:**
• Life processes (nutrition, respiration)
• Plants and photosynthesis
• Human body systems
• Heredity and evolution

**Ask me things like:**
• "What is photosynthesis?"
• "Explain Newton's laws"
• "How do acids and bases react?"

Which science topic interests you most?`;
        }

        // English Help
        if (this.matchesKeywords(question, ['english', 'grammar', 'writing', 'essay'])) {
            return `**English Help Available** 📚

I can help with:

**Grammar:**
• Tenses (present, past, future)
• Active and passive voice
• Parts of speech
• Sentence structure

**Writing:**
• Essay structure
• Letter writing
• Paragraph development
• Vocabulary building

**Literature:**
• Poetry analysis
• Story comprehension  
• Character analysis
• Themes and meanings

**Ask me questions like:**
• "How to write a good essay?"
• "What's the difference between present and past tense?"
• "Help me with active/passive voice"

What specific English topic do you need help with?`;
        }

        // Encouragement for unclear questions
        if (this.matchesKeywords(question, ['help', 'explain', 'what is', 'how to', 'tell me'])) {
            return `**I'm here to help! 🤔**

I notice you want an explanation! I'm great at helping with:

**📐 Mathematics:** equations, formulas, problem solving
**🔬 Science:** physics, chemistry, biology concepts  
**📝 English:** grammar, writing, literature

**To get the best help, try asking:**
• "What is photosynthesis?"
• "How to solve linear equations?"
• "Explain active and passive voice"
• "What are polynomials?"

**Or share a specific problem:**
• "Solve: 2x + 5 = 11"
• "Find area of circle with radius 7"

What subject would you like to explore? Just be specific with your question! 😊`;
        }

        // Default helpful response (much better than current one)
        return `**Let me help you learn! 📚**

I can see you have a question about **"${question}"**

I'm your AI study assistant and I'm best at helping with:

**🔢 Math Topics:**
• Algebra (equations, polynomials)
• Geometry (shapes, area, perimeter)  
• Arithmetic (fractions, percentages)

**🧪 Science Topics:**
• Physics (light, motion, electricity)
• Chemistry (acids, metals, reactions)
• Biology (plants, human body, life processes)

**📖 English Topics:**  
• Grammar (tenses, voice, parts of speech)
• Writing (essays, letters, paragraphs)
• Literature (stories, poems, analysis)

**💡 Try asking me:**
• "What is [specific topic]?"
• "How to solve [specific problem]?"  
• "Explain [concept] with examples"

**For example:** "What is photosynthesis?" or "How to solve 2x + 5 = 11?"

What specific topic would you like me to explain? 🎯`;
    }

    matchesKeywords(question, keywords) {
        return keywords.some(keyword => question.includes(keyword.toLowerCase()));
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