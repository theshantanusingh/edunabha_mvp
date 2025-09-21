// AI Learning Assistant - Comprehensive JavaScript
// Edunabha Educational Platform

// Global AI variables
let currentAIModal = null;
let currentTeacherTab = 'analytics';
let studentsData = JSON.parse(localStorage.getItem('edunabha_students')) || [];
let teachersData = JSON.parse(localStorage.getItem('edunabha_teachers')) || [];

// Initialize AI features
document.addEventListener('DOMContentLoaded', function() {
    initializeAIFeatures();
    loadMockData();
});

// Initialize AI features
function initializeAIFeatures() {
    // Initialize students and teachers data if empty
    if (studentsData.length === 0) {
        initializeMockStudents();
    }
    if (teachersData.length === 0) {
        initializeMockTeachers();
    }
}

// Load mock data for demonstration
function loadMockData() {
    // This would normally load from a database
    console.log('AI features initialized');
}

// Initialize mock students data
function initializeMockStudents() {
    studentsData = [
        {
            id: 1,
            name: 'Rajesh Kumar',
            grade: 10,
            email: 'rajesh@example.com',
            progress: 85,
            subjects: ['Mathematics', 'Science', 'English'],
            lastActive: '2024-01-15',
            completedLessons: 45,
            averageScore: 82
        },
        {
            id: 2,
            name: 'Priya Sharma',
            grade: 9,
            email: 'priya@example.com',
            progress: 78,
            subjects: ['Mathematics', 'Science', 'English', 'Hindi'],
            lastActive: '2024-01-14',
            completedLessons: 38,
            averageScore: 79
        },
        {
            id: 3,
            name: 'Amit Singh',
            grade: 11,
            email: 'amit@example.com',
            progress: 92,
            subjects: ['Mathematics', 'Science', 'English'],
            lastActive: '2024-01-15',
            completedLessons: 52,
            averageScore: 88
        }
    ];
    localStorage.setItem('edunabha_students', JSON.stringify(studentsData));
}

// Initialize mock teachers data
function initializeMockTeachers() {
    teachersData = [
        {
            id: 1,
            name: 'Dr. Sunita Verma',
            subject: 'Mathematics',
            email: 'sunita.verma@school.edu',
            classes: ['Grade 10-A', 'Grade 11-B'],
            experience: 12,
            qualifications: 'M.Sc Mathematics, B.Ed',
            studentsCount: 45
        },
        {
            id: 2,
            name: 'Mr. Ramesh Gupta',
            subject: 'Science',
            email: 'ramesh.gupta@school.edu',
            classes: ['Grade 9-A', 'Grade 10-B'],
            experience: 8,
            qualifications: 'M.Sc Physics, B.Ed',
            studentsCount: 38
        }
    ];
    localStorage.setItem('edunabha_teachers', JSON.stringify(teachersData));
}

// Student AI Tutor Functions
function openStudentTutor() {
    currentAIModal = 'tutor';
    document.getElementById('aiTutorModal').classList.add('active');
}

function closeAIModal() {
    document.querySelectorAll('.ai-modal').forEach(modal => {
        modal.classList.remove('active');
    });
    currentAIModal = null;
}

async function sendTutorQuestion() {
    const questionInput = document.getElementById('aiTutorQuestion');
    const question = questionInput.value.trim();

    if (!question) return;

    // Add user message
    addTutorMessage(question, 'user');

    // Clear input
    questionInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    try {
        // Simulate AI response (in real app, this would call the backend)
        const response = await simulateAIResponse(question);
        hideTypingIndicator();
        addTutorMessage(response, 'ai');
    } catch (error) {
        hideTypingIndicator();
        addTutorMessage('Sorry, I\'m having trouble right now. Please try again later.', 'ai');
    }
}

function quickTutorQuestion(question) {
    document.getElementById('aiTutorQuestion').value = question;
    sendTutorQuestion();
}

function addTutorMessage(message, type) {
    const messagesContainer = document.getElementById('aiTutorMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'user' ? 'user-message' : 'ai-message';

    if (type === 'ai') {
        messageDiv.innerHTML = `
            <div class="ai-avatar-small">🤖</div>
            <div class="ai-message-content">
                <p>${message}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="user-message-content">
                <p>${message}</p>
            </div>
        `;
    }

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('aiTutorMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-typing';
    typingDiv.id = 'typingIndicator';
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
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function simulateAIResponse(question) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simple response simulation based on keywords
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('quadratic') || lowerQuestion.includes('equation')) {
        return `The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a, where ax² + bx + c = 0.

For example, to solve 2x² + 5x - 3 = 0:
a = 2, b = 5, c = -3
x = (-5 ± √(25 + 24)) / 4
x = (-5 ± √49) / 4
x = (-5 ± 7) / 4
x = 2/4 = 0.5 or x = -12/4 = -3

Would you like me to explain any part in more detail?`;
    }

    if (lowerQuestion.includes('photosynthesis')) {
        return `Photosynthesis is the process by which plants convert light energy into chemical energy. Here's how it works:

1. **Light Reaction**: Chlorophyll absorbs sunlight, splitting water molecules and producing oxygen and energy-rich molecules (ATP and NADPH).

2. **Dark Reaction (Calvin Cycle)**: CO₂ from air combines with the energy-rich molecules to produce glucose.

**Equation**: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

Key requirements:
- Sunlight (especially blue and red wavelengths)
- Chlorophyll in chloroplasts
- Water and minerals from roots
- Carbon dioxide from air

This process is crucial for life on Earth as it produces oxygen and forms the base of most food chains!`;
    }

    if (lowerQuestion.includes('solve') && lowerQuestion.includes('=')) {
        return `Let me help you solve that equation! I'll show you step-by-step:

${question}

First, let's isolate the variable. I'll move all terms without the variable to one side:

[Step-by-step solution would go here]

The solution is: x = [answer]

Try solving similar equations yourself, and let me know if you need help with any step!`;
    }

    // Generic helpful response
    return `That's a great question! Let me help you understand this concept.

Based on what you've asked about "${question}", here's what I can tell you:

[This would contain a detailed, educational response tailored to the specific question]

If you'd like me to explain any part in more detail or show you examples, just let me know!`;
}

// Teacher Dashboard Functions
function openTeacherDashboard() {
    currentAIModal = 'teacher';
    document.getElementById('teacherDashboardModal').classList.add('active');
    loadTeacherTab('analytics');
}

function switchTeacherTab(tabName) {
    currentTeacherTab = tabName;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Load tab content
    loadTeacherTab(tabName);
}

function loadTeacherTab(tabName) {
    const tabContent = document.getElementById('teacherTabContent');

    switch (tabName) {
        case 'analytics':
            tabContent.innerHTML = generateAnalyticsContent();
            break;
        case 'lesson-planner':
            tabContent.innerHTML = generateLessonPlannerContent();
            break;
        case 'quiz-generator':
            tabContent.innerHTML = generateQuizGeneratorContent();
            break;
        case 'content-creator':
            tabContent.innerHTML = generateContentCreatorContent();
            break;
        case 'class-management':
            tabContent.innerHTML = generateClassManagementContent();
            break;
        case 'manage-students':
            tabContent.innerHTML = generateManageStudentsContent();
            break;
        case 'manage-content':
            tabContent.innerHTML = generateManageContentContent();
            break;
    }
}

function generateAnalyticsContent() {
    const totalStudents = studentsData.length;
    const averageProgress = studentsData.reduce((sum, s) => sum + s.progress, 0) / totalStudents;
    const averageScore = studentsData.reduce((sum, s) => sum + s.averageScore, 0) / totalStudents;
    const totalLessons = studentsData.reduce((sum, s) => sum + s.completedLessons, 0);

    return `
        <div class="analytics-content">
            <div class="analytics-card">
                <h4>📊 Class Overview</h4>
                <div class="analytics-metric">
                    <span class="metric-label">Total Students</span>
                    <span class="metric-value">${totalStudents}</span>
                </div>
                <div class="analytics-metric">
                    <span class="metric-label">Average Progress</span>
                    <span class="metric-value">${Math.round(averageProgress)}%</span>
                </div>
                <div class="analytics-metric">
                    <span class="metric-label">Average Score</span>
                    <span class="metric-value">${Math.round(averageScore)}%</span>
                </div>
                <div class="analytics-metric">
                    <span class="metric-label">Total Lessons Completed</span>
                    <span class="metric-value">${totalLessons}</span>
                </div>
            </div>

            <div class="analytics-card">
                <h4>🎯 Performance Insights</h4>
                <div class="analytics-metric">
                    <span class="metric-label">High Performers (90%+)</span>
                    <span class="metric-value">${studentsData.filter(s => s.averageScore >= 90).length}</span>
                </div>
                <div class="analytics-metric">
                    <span class="metric-label">Need Attention (<70%)</span>
                    <span class="metric-value">${studentsData.filter(s => s.averageScore < 70).length}</span>
                </div>
                <div class="analytics-metric">
                    <span class="metric-label">Most Studied Subject</span>
                    <span class="metric-value">Mathematics</span>
                </div>
                <div class="analytics-metric">
                    <span class="metric-label">Active Today</span>
                    <span class="metric-value">${studentsData.filter(s => s.lastActive === '2024-01-15').length}</span>
                </div>
            </div>

            <div class="analytics-card">
                <h4>📈 Trends</h4>
                <p>Student engagement has increased by 15% this week. Mathematics shows the highest improvement with an average score increase of 8 points.</p>
                <button class="btn btn-primary" onclick="generateDetailedReport()">Generate Detailed Report</button>
            </div>
        </div>
    `;
}

function generateLessonPlannerContent() {
    return `
        <div class="lesson-planner-content">
            <div class="lesson-form-group">
                <label for="lessonSubject">Subject</label>
                <select id="lessonSubject">
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                </select>

                <label for="lessonGrade">Grade Level</label>
                <select id="lessonGrade">
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                </select>

                <label for="lessonTopic">Topic</label>
                <input type="text" id="lessonTopic" placeholder="e.g., Quadratic Equations">

                <label for="lessonDuration">Duration (minutes)</label>
                <select id="lessonDuration">
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                </select>

                <label for="lessonObjectives">Learning Objectives</label>
                <textarea id="lessonObjectives" placeholder="What should students learn by the end of this lesson?"></textarea>
            </div>

            <div class="lesson-form-group">
                <h4>🤖 AI-Generated Lesson Plan</h4>
                <div id="generatedLessonPlan" style="background: var(--surface-secondary); padding: 1rem; border-radius: var(--radius-lg); min-height: 200px;">
                    <p style="color: var(--text-muted); font-style: italic;">Click "Generate Plan" to create an AI-powered lesson plan</p>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button class="btn btn-primary" onclick="generateLessonPlan()">Generate Plan</button>
                    <button class="btn btn-outline" onclick="saveLessonPlan()">Save Plan</button>
                    <button class="btn btn-outline" onclick="printLessonPlan()">Print Plan</button>
                </div>
            </div>
        </div>
    `;
}

function generateQuizGeneratorContent() {
    return `
        <div class="quiz-generator-content">
            <div class="lesson-form-group">
                <label for="quizSubject">Subject</label>
                <select id="quizSubject">
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                </select>

                <label for="quizGrade">Grade Level</label>
                <select id="quizGrade">
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                </select>

                <label for="quizDifficulty">Difficulty</label>
                <select id="quizDifficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <label for="quizQuestions">Number of Questions</label>
                <select id="quizQuestions">
                    <option value="5">5 Questions</option>
                    <option value="10">10 Questions</option>
                    <option value="15">15 Questions</option>
                </select>

                <button class="btn btn-primary" onclick="generateQuiz()" style="margin-top: 1rem;">Generate Quiz</button>
            </div>

            <div class="quiz-preview">
                <h4>📝 Generated Quiz Preview</h4>
                <div id="quizPreviewContent">
                    <p style="color: var(--text-muted); font-style: italic;">Quiz will appear here after generation</p>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button class="btn btn-outline" onclick="saveQuiz()">Save Quiz</button>
                    <button class="btn btn-outline" onclick="assignQuiz()">Assign to Class</button>
                </div>
            </div>
        </div>
    `;
}

function generateClassManagementContent() {
    const studentsList = studentsData.map(student => `
        <div class="student-item">
            <div class="student-info">
                <h5>${student.name}</h5>
                <p>Grade ${student.grade} • ${student.subjects.join(', ')}</p>
            </div>
            <div class="student-actions">
                <button class="btn btn-sm" onclick="viewStudentProgress(${student.id})">📊</button>
                <button class="btn btn-sm" onclick="contactStudent(${student.id})">💬</button>
            </div>
        </div>
    `).join('');

    return `
        <div class="class-management-content">
            <div class="students-list">
                <div class="students-header">
                    <h4>👥 My Students (${studentsData.length})</h4>
                </div>
                <div class="students-body">
                    ${studentsList}
                </div>
            </div>

            <div class="student-stats">
                <h4>📈 Class Statistics</h4>
                <div class="stat-item">
                    <span>Total Students</span>
                    <span>${studentsData.length}</span>
                </div>
                <div class="stat-item">
                    <span>Average Progress</span>
                    <span>${Math.round(studentsData.reduce((sum, s) => sum + s.progress, 0) / studentsData.length)}%</span>
                </div>
                <div class="stat-item">
                    <span>High Performers</span>
                    <span>${studentsData.filter(s => s.averageScore >= 90).length}</span>
                </div>
                <div class="stat-item">
                    <span>Need Support</span>
                    <span>${studentsData.filter(s => s.averageScore < 70).length}</span>
                </div>

                <div style="margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="exportStudentData()">Export Data</button>
                    <button class="btn btn-outline" onclick="sendClassAnnouncement()">Send Announcement</button>
                </div>
            </div>
        </div>
    `;
}

function generateContentCreatorContent() {
    return `
        <div class="content-creator-content">
            <div class="lesson-form-group">
                <label for="contentType">Content Type</label>
                <select id="contentType">
                    <option value="worksheet">Worksheet</option>
                    <option value="presentation">Presentation</option>
                    <option value="assessment">Assessment</option>
                    <option value="activity">Activity Guide</option>
                </select>

                <label for="contentSubject">Subject</label>
                <select id="contentSubject">
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                </select>

                <label for="contentTopic">Topic</label>
                <input type="text" id="contentTopic" placeholder="e.g., Introduction to Algebra">

                <label for="contentGrade">Grade Level</label>
                <select id="contentGrade">
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                </select>

                <button class="btn btn-primary" onclick="generateContent()" style="margin-top: 1rem;">Generate Content</button>
            </div>

            <div class="content-preview">
                <h4>📄 Generated Content Preview</h4>
                <div class="content-preview-area" id="contentPreviewArea">
                    <p style="color: var(--text-muted); font-style: italic;">Generated content will appear here</p>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button class="btn btn-outline" onclick="editContent()">Edit Content</button>
                    <button class="btn btn-outline" onclick="downloadContent()">Download</button>
                    <button class="btn btn-outline" onclick="shareContent()">Share</button>
                </div>
            </div>
        </div>
    `;
}

function generateManageStudentsContent() {
    const studentsList = studentsData.map(student => `
        <div class="student-management-item">
            <div class="student-info">
                <div class="student-avatar">${student.name.charAt(0)}</div>
                <div class="student-details">
                    <h4>${student.name}</h4>
                    <p>Class ${student.grade} • ${student.email}</p>
                    <div class="student-stats">
                        <span>Progress: ${student.progress}%</span>
                        <span>Avg Score: ${student.averageScore}%</span>
                        <span>Lessons: ${student.completedLessons}</span>
                    </div>
                </div>
            </div>
            <div class="student-actions">
                <button class="btn btn-sm" onclick="viewStudentDetails(${student.id})">👁️ View</button>
                <button class="btn btn-sm" onclick="editStudent(${student.id})">✏️ Edit</button>
                <button class="btn btn-sm" onclick="contactStudent(${student.id})">💬 Contact</button>
                <button class="btn btn-sm btn-danger" onclick="removeStudent(${student.id})">🗑️ Remove</button>
            </div>
        </div>
    `).join('');

    return `
        <div class="manage-students-content">
            <div class="section-header">
                <h3>👥 Manage Students</h3>
                <button class="btn btn-primary" onclick="addNewStudent()">+ Add New Student</button>
            </div>

            <div class="students-filters">
                <div class="filter-group">
                    <label>Filter by Grade:</label>
                    <select id="gradeFilter" onchange="filterStudents()">
                        <option value="all">All Grades</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Search:</label>
                    <input type="text" id="studentSearch" placeholder="Search students..." onkeyup="filterStudents()">
                </div>
            </div>

            <div class="students-list" id="studentsManagementList">
                ${studentsList}
            </div>

            <div class="bulk-actions">
                <button class="btn btn-outline" onclick="exportStudents()">📊 Export Students</button>
                <button class="btn btn-outline" onclick="sendBulkMessage()">📧 Send Message</button>
                <button class="btn btn-outline" onclick="generateReport()">📈 Generate Report</button>
            </div>
        </div>
    `;
}

function generateManageContentContent() {
    // Mock content data
    const contentItems = [
        { id: 1, title: "Quadratic Equations - Introduction", type: "Video", subject: "Mathematics", grade: 10, status: "Published", views: 245 },
        { id: 2, title: "Photosynthesis Worksheet", type: "Worksheet", subject: "Science", grade: 9, status: "Draft", views: 0 },
        { id: 3, title: "English Grammar Quiz", type: "Quiz", subject: "English", grade: 10, status: "Published", views: 189 },
        { id: 4, title: "Light Reflection Lab", type: "Activity", subject: "Science", grade: 10, status: "Published", views: 156 }
    ];

    const contentList = contentItems.map(item => `
        <div class="content-management-item">
            <div class="content-info">
                <div class="content-icon">${getContentIcon(item.type)}</div>
                <div class="content-details">
                    <h4>${item.title}</h4>
                    <p>${item.subject} • Grade ${item.grade} • ${item.type}</p>
                    <div class="content-meta">
                        <span class="status status-${item.status.toLowerCase()}">${item.status}</span>
                        <span>${item.views} views</span>
                    </div>
                </div>
            </div>
            <div class="content-actions">
                <button class="btn btn-sm" onclick="viewContent(${item.id})">👁️ View</button>
                <button class="btn btn-sm" onclick="editContentItem(${item.id})">✏️ Edit</button>
                <button class="btn btn-sm" onclick="duplicateContent(${item.id})">📋 Duplicate</button>
                <button class="btn btn-sm btn-danger" onclick="deleteContent(${item.id})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');

    return `
        <div class="manage-content-content">
            <div class="section-header">
                <h3>📚 Manage Content</h3>
                <button class="btn btn-primary" onclick="createNewContent()">+ Create Content</button>
            </div>

            <div class="content-filters">
                <div class="filter-group">
                    <label>Filter by Type:</label>
                    <select id="contentTypeFilter" onchange="filterContent()">
                        <option value="all">All Types</option>
                        <option value="video">Videos</option>
                        <option value="worksheet">Worksheets</option>
                        <option value="quiz">Quizzes</option>
                        <option value="activity">Activities</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Subject:</label>
                    <select id="contentSubjectFilter" onchange="filterContent()">
                        <option value="all">All Subjects</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="science">Science</option>
                        <option value="english">English</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Status:</label>
                    <select id="contentStatusFilter" onchange="filterContent()">
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>

            <div class="content-list" id="contentManagementList">
                ${contentList}
            </div>

            <div class="content-stats">
                <div class="stat-card">
                    <h4>Total Content</h4>
                    <div class="stat-number">${contentItems.length}</div>
                </div>
                <div class="stat-card">
                    <h4>Published</h4>
                    <div class="stat-number">${contentItems.filter(c => c.status === 'Published').length}</div>
                </div>
                <div class="stat-card">
                    <h4>Total Views</h4>
                    <div class="stat-number">${contentItems.reduce((sum, c) => sum + c.views, 0)}</div>
                </div>
            </div>
        </div>
    `;
}

function getContentIcon(type) {
    const icons = {
        'Video': '🎥',
        'Worksheet': '📄',
        'Quiz': '❓',
        'Activity': '🎯'
    };
    return icons[type] || '📚';
}

// AI Feature Functions
function generateLessonPlan() {
    const subject = document.getElementById('lessonSubject').value;
    const grade = document.getElementById('lessonGrade').value;
    const topic = document.getElementById('lessonTopic').value;
    const duration = document.getElementById('lessonDuration').value;
    const objectives = document.getElementById('lessonObjectives').value;

    const lessonPlan = `
        <h4>📚 Lesson Plan: ${topic}</h4>
        <p><strong>Subject:</strong> ${subject.charAt(0).toUpperCase() + subject.slice(1)}</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <p><strong>Duration:</strong> ${duration} minutes</p>

        <h5>🎯 Learning Objectives</h5>
        <p>${objectives || 'Students will understand and apply the concepts of ' + topic.toLowerCase()}</p>

        <h5>📖 Materials Needed</h5>
        <ul>
            <li>Whiteboard and markers</li>
            <li>Textbook: Chapter on ${topic}</li>
            <li>Practice worksheets</li>
            <li>Interactive online resources</li>
        </ul>

        <h5>⏰ Lesson Structure</h5>
        <ol>
            <li><strong>Introduction (10 min):</strong> Review previous concepts and introduce ${topic}</li>
            <li><strong>Direct Instruction (15 min):</strong> Explain key concepts with examples</li>
            <li><strong>Guided Practice (15 min):</strong> Work through problems together</li>
            <li><strong>Independent Practice (10 min):</strong> Students solve problems individually</li>
            <li><strong>Closure (5 min):</strong> Review key points and assign homework</li>
        </ol>

        <h5>✅ Assessment</h5>
        <p>Formative assessment through observation and questioning during guided practice.</p>
        <p>Summative assessment via exit ticket and homework completion.</p>
    `;

    document.getElementById('generatedLessonPlan').innerHTML = lessonPlan;
}

function generateQuiz() {
    const subject = document.getElementById('quizSubject').value;
    const grade = document.getElementById('quizGrade').value;
    const difficulty = document.getElementById('quizDifficulty').value;
    const numQuestions = parseInt(document.getElementById('quizQuestions').value);

    let quizContent = `<h4>📝 ${subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz - Grade ${grade}</h4>`;

    // Generate sample questions based on subject
    for (let i = 1; i <= numQuestions; i++) {
        quizContent += `
            <div class="quiz-question">
                <p><strong>Q${i}:</strong> ${generateSampleQuestion(subject, difficulty)}</p>
                <div class="quiz-options">
                    <div class="quiz-option">A) Option 1</div>
                    <div class="quiz-option">B) Option 2</div>
                    <div class="quiz-option">C) Option 3</div>
                    <div class="quiz-option">D) Option 4</div>
                </div>
            </div>
        `;
    }

    document.getElementById('quizPreviewContent').innerHTML = quizContent;
}

function generateSampleQuestion(subject, difficulty) {
    const questions = {
        mathematics: {
            easy: ['What is 2 + 2?', 'What is 5 × 3?', 'What is 10 ÷ 2?'],
            medium: ['Solve: 2x + 5 = 15', 'What is the area of a square with side 5cm?', 'Simplify: 12/18'],
            hard: ['Solve the quadratic equation: x² + 5x + 6 = 0', 'Find the derivative of f(x) = x³ + 2x²', 'Calculate the volume of a sphere with radius 3cm']
        },
        science: {
            easy: ['What color is chlorophyll?', 'What gas do plants need for photosynthesis?', 'What is H2O?'],
            medium: ['Explain the water cycle', 'What are the three states of matter?', 'How does photosynthesis work?'],
            hard: ['Explain the theory of relativity', 'Describe the structure of an atom', 'How does natural selection work?']
        },
        english: {
            easy: ['What is a noun?', 'What is the past tense of "run"?', 'What is an adjective?'],
            medium: ['Identify the subject in: "The cat sat on the mat"', 'What is a metaphor?', 'Correct this sentence: "She dont like apples"'],
            hard: ['Analyze the theme in Romeo and Juliet', 'Explain the difference between active and passive voice', 'Identify literary devices in a given passage']
        }
    };

    const subjectQuestions = questions[subject] || questions.mathematics;
    const difficultyQuestions = subjectQuestions[difficulty] || subjectQuestions.medium;
    return difficultyQuestions[Math.floor(Math.random() * difficultyQuestions.length)];
}

function generateContent() {
    const type = document.getElementById('contentType').value;
    const subject = document.getElementById('contentSubject').value;
    const topic = document.getElementById('contentTopic').value;
    const grade = document.getElementById('contentGrade').value;

    let content = '';

    switch (type) {
        case 'worksheet':
            content = generateWorksheet(subject, topic, grade);
            break;
        case 'presentation':
            content = generatePresentation(subject, topic, grade);
            break;
        case 'assessment':
            content = generateAssessment(subject, topic, grade);
            break;
        case 'activity':
            content = generateActivity(subject, topic, grade);
            break;
    }

    document.getElementById('contentPreviewArea').innerHTML = content;
}

function generateWorksheet(subject, topic, grade) {
    return `
        <h4>📄 Worksheet: ${topic}</h4>
        <p><strong>Subject:</strong> ${subject} | <strong>Grade:</strong> ${grade}</p>

        <h5>📝 Instructions</h5>
        <p>Complete the following exercises. Show all your work clearly.</p>

        <h5>🔢 Exercises</h5>
        <ol>
            <li>Exercise 1: [Generated exercise based on topic]</li>
            <li>Exercise 2: [Generated exercise based on topic]</li>
            <li>Exercise 3: [Generated exercise based on topic]</li>
            <li>Exercise 4: [Generated exercise based on topic]</li>
            <li>Exercise 5: [Generated exercise based on topic]</li>
        </ol>

        <h5>📊 Answer Key</h5>
        <p>(For teacher use only)</p>
        <ol>
            <li>Answer 1</li>
            <li>Answer 2</li>
            <li>Answer 3</li>
            <li>Answer 4</li>
            <li>Answer 5</li>
        </ol>
    `;
}

function generatePresentation(subject, topic, grade) {
    return `
        <h4>🎬 Presentation: ${topic}</h4>
        <p><strong>Subject:</strong> ${subject} | <strong>Grade:</strong> ${grade}</p>

        <h5>📊 Slide Outline</h5>
        <ol>
            <li><strong>Title Slide:</strong> ${topic} - An Introduction</li>
            <li><strong>Learning Objectives:</strong> What students will learn</li>
            <li><strong>Main Content:</strong> Key concepts and explanations</li>
            <li><strong>Examples:</strong> Real-world applications</li>
            <li><strong>Practice:</strong> Interactive exercises</li>
            <li><strong>Summary:</strong> Key takeaways</li>
            <li><strong>Assessment:</strong> Quick quiz</li>
        </ol>

        <h5>🎨 Visual Elements</h5>
        <ul>
            <li>Diagrams and illustrations</li>
            <li>Color-coded important terms</li>
            <li>Interactive polls</li>
            <li>Video clips (if applicable)</li>
        </ul>
    `;
}

function generateAssessment(subject, topic, grade) {
    return `
        <h4>📊 Assessment: ${topic}</h4>
        <p><strong>Subject:</strong> ${subject} | <strong>Grade:</strong> ${grade} | <strong>Time:</strong> 30 minutes</p>

        <h5>📝 Multiple Choice (2 points each)</h5>
        <ol>
            <li>Question 1: [Multiple choice question]</li>
            <li>Question 2: [Multiple choice question]</li>
            <li>Question 3: [Multiple choice question]</li>
        </ol>

        <h5>✍️ Short Answer (5 points each)</h5>
        <ol>
            <li>Question 4: [Short answer question]</li>
            <li>Question 5: [Short answer question]</li>
        </ol>

        <h5>📐 Problem Solving (10 points each)</h5>
        <ol>
            <li>Question 6: [Problem solving question]</li>
        </ol>

        <h5>🎯 Rubric</h5>
        <ul>
            <li><strong>90-100%:</strong> Excellent understanding and application</li>
            <li><strong>80-89%:</strong> Good understanding with minor errors</li>
            <li><strong>70-79%:</strong> Basic understanding shown</li>
            <li><strong>Below 70%:</strong> Needs additional support</li>
        </ul>
    `;
}

function generateActivity(subject, topic, grade) {
    return `
        <h4>🎯 Activity Guide: ${topic}</h4>
        <p><strong>Subject:</strong> ${subject} | <strong>Grade:</strong> ${grade} | <strong>Duration:</strong> 45 minutes</p>

        <h5>📋 Materials Needed</h5>
        <ul>
            <li>Activity worksheets</li>
            <li>Art supplies (if applicable)</li>
            <li>Group discussion materials</li>
            <li>Technology devices (tablets/laptops)</li>
        </ul>

        <h5>⏰ Activity Steps</h5>
        <ol>
            <li><strong>Introduction (10 min):</strong> Explain the activity and objectives</li>
            <li><strong>Group Work (20 min):</strong> Students work in groups</li>
            <li><strong>Sharing (10 min):</strong> Groups present their work</li>
            <li><strong>Reflection (5 min):</strong> Discuss what was learned</li>
        </ol>

        <h5>🎲 Variations</h5>
        <ul>
            <li>Individual work version</li>
            <li>Advanced extension activities</li>
            <li>Modified version for different learning styles</li>
        </ul>
    `;
}

// Quick Actions
function quickAction(action) {
    switch (action) {
        case 'math':
            openStudentTutor();
            setTimeout(() => {
                document.getElementById('aiTutorQuestion').value = 'Help me solve a math problem';
            }, 500);
            break;
        case 'quiz':
            openTeacherDashboard();
            setTimeout(() => {
                switchTeacherTab('quiz-generator');
            }, 500);
            break;
        case 'explain':
            openStudentTutor();
            break;
        case 'grade':
            openTeacherDashboard();
            setTimeout(() => {
                switchTeacherTab('analytics');
            }, 500);
            break;
    }
}

// Other AI Tools
function openStudyPlanner() {
    alert('Study Planner feature coming soon! This will help create personalized study schedules.');
}

function openWritingAssistant() {
    alert('Writing Assistant feature coming soon! This will help with essay writing and grammar.');
}

function openContentCreator() {
    openTeacherDashboard();
    setTimeout(() => {
        switchTeacherTab('content-creator');
    }, 500);
}

function openClassManagement() {
    openTeacherDashboard();
    setTimeout(() => {
        switchTeacherTab('class-management');
    }, 500);
}

// Utility Functions
function viewStudentProgress(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (student) {
        alert(`Student: ${student.name}\nGrade: ${student.grade}\nProgress: ${student.progress}%\nAverage Score: ${student.averageScore}%\nCompleted Lessons: ${student.completedLessons}`);
    }
}

function contactStudent(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (student) {
        alert(`Contacting ${student.name} at ${student.email}`);
    }
}

function generateDetailedReport() {
    alert('Generating detailed analytics report... This would create a comprehensive PDF report.');
}

function saveLessonPlan() {
    alert('Lesson plan saved successfully!');
}

function printLessonPlan() {
    window.print();
}

function saveQuiz() {
    alert('Quiz saved to your content library!');
}

function assignQuiz() {
    alert('Quiz assigned to selected classes!');
}

function exportStudentData() {
    alert('Student data exported as CSV file!');
}

function sendClassAnnouncement() {
    alert('Class announcement sent to all students!');
}

function editContent() {
    alert('Content editor opened. You can now modify the generated content.');
}

function downloadContent() {
    alert('Content downloaded as PDF file!');
}

function shareContent() {
    alert('Content sharing options opened. Share with other teachers or students.');
}

// Student Management Functions
function viewStudentDetails(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (student) {
        const details = `
Student Details:
Name: ${student.name}
Grade: ${student.grade}
Email: ${student.email}
Progress: ${student.progress}%
Average Score: ${student.averageScore}%
Completed Lessons: ${student.completedLessons}
Subjects: ${student.subjects.join(', ')}
Last Active: ${student.lastActive}
        `;
        alert(details);
    }
}

function editStudent(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (student) {
        const newName = prompt('Edit student name:', student.name);
        const newEmail = prompt('Edit student email:', student.email);
        const newGrade = prompt('Edit student grade:', student.grade);

        if (newName && newEmail && newGrade) {
            student.name = newName;
            student.email = newEmail;
            student.grade = parseInt(newGrade);
            localStorage.setItem('edunabha_students', JSON.stringify(studentsData));
            alert('Student updated successfully!');
            // Refresh the current tab
            switchTeacherTab('manage-students');
        }
    }
}

function addNewStudent() {
    const name = prompt('Enter student name:');
    const email = prompt('Enter student email:');
    const grade = prompt('Enter student grade (9-12):');

    if (name && email && grade) {
        const newStudent = {
            id: Date.now(),
            name: name,
            grade: parseInt(grade),
            email: email,
            progress: 0,
            subjects: ['Mathematics', 'Science', 'English'],
            lastActive: new Date().toISOString().split('T')[0],
            completedLessons: 0,
            averageScore: 0
        };

        studentsData.push(newStudent);
        localStorage.setItem('edunabha_students', JSON.stringify(studentsData));
        alert('Student added successfully!');
        switchTeacherTab('manage-students');
    }
}

function removeStudent(studentId) {
    if (confirm('Are you sure you want to remove this student?')) {
        studentsData = studentsData.filter(s => s.id !== studentId);
        localStorage.setItem('edunabha_students', JSON.stringify(studentsData));
        alert('Student removed successfully!');
        switchTeacherTab('manage-students');
    }
}

function filterStudents() {
    const gradeFilter = document.getElementById('gradeFilter').value;
    const searchTerm = document.getElementById('studentSearch').value.toLowerCase();

    let filteredStudents = studentsData;

    if (gradeFilter !== 'all') {
        filteredStudents = filteredStudents.filter(s => s.grade === parseInt(gradeFilter));
    }

    if (searchTerm) {
        filteredStudents = filteredStudents.filter(s =>
            s.name.toLowerCase().includes(searchTerm) ||
            s.email.toLowerCase().includes(searchTerm)
        );
    }

    const studentsList = filteredStudents.map(student => `
        <div class="student-management-item">
            <div class="student-info">
                <div class="student-avatar">${student.name.charAt(0)}</div>
                <div class="student-details">
                    <h4>${student.name}</h4>
                    <p>Class ${student.grade} • ${student.email}</p>
                    <div class="student-stats">
                        <span>Progress: ${student.progress}%</span>
                        <span>Avg Score: ${student.averageScore}%</span>
                        <span>Lessons: ${student.completedLessons}</span>
                    </div>
                </div>
            </div>
            <div class="student-actions">
                <button class="btn btn-sm" onclick="viewStudentDetails(${student.id})">👁️ View</button>
                <button class="btn btn-sm" onclick="editStudent(${student.id})">✏️ Edit</button>
                <button class="btn btn-sm" onclick="contactStudent(${student.id})">💬 Contact</button>
                <button class="btn btn-sm btn-danger" onclick="removeStudent(${student.id})">🗑️ Remove</button>
            </div>
        </div>
    `).join('');

    document.getElementById('studentsManagementList').innerHTML = studentsList;
}

function exportStudents() {
    alert('Student data exported as CSV file! (Feature would generate and download CSV)');
}

function sendBulkMessage() {
    const message = prompt('Enter message to send to all filtered students:');
    if (message) {
        alert(`Message sent to ${studentsData.length} students: "${message}"`);
    }
}

function generateReport() {
    alert('Student progress report generated! (Feature would create detailed PDF report)');
}

// Content Management Functions
function viewContent(contentId) {
    alert(`Viewing content item ${contentId} (Feature would open content viewer)`);
}

function editContentItem(contentId) {
    alert(`Editing content item ${contentId} (Feature would open content editor)`);
}

function duplicateContent(contentId) {
    alert(`Content item ${contentId} duplicated! (Feature would create copy of content)`);
}

function deleteContent(contentId) {
    if (confirm('Are you sure you want to delete this content?')) {
        alert(`Content item ${contentId} deleted!`);
        // In real app, would remove from content array
        switchTeacherTab('manage-content');
    }
}

function createNewContent() {
    alert('Create new content modal would open here (Feature would show content creation wizard)');
}

function filterContent() {
    // This would filter the content list based on selected filters
    alert('Content filtering applied (Feature would update content list)');
}

// Utility Functions
function showProfile() {
    alert('Profile page would open here');
}

function showSettings() {
    alert('Settings page would open here');
}