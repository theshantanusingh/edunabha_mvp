// Dashboard specific functionality
class Dashboard {
    constructor() {
        this.mockData = {
            courses: [
                {
                    id: 1,
                    title: 'Mathematics',
                    class: '10',
                    progress: 65,
                    currentTopic: 'Quadratic Equations',
                    lessonsComplete: 8,
                    lessonsTotal: 12,
                    icon: '📐',
                    color: 'math'
                },
                {
                    id: 2,
                    title: 'Science',
                    class: '10',
                    progress: 45,
                    currentTopic: 'Light - Reflection',
                    lessonsComplete: 5,
                    lessonsTotal: 11,
                    icon: '🔬',
                    color: 'science'
                },
                {
                    id: 3,
                    title: 'English',
                    class: '10',
                    progress: 78,
                    currentTopic: 'Active & Passive Voice',
                    lessonsComplete: 9,
                    lessonsTotal: 10,
                    icon: '📝',
                    color: 'english'
                }
            ],
            activities: [
                {
                    id: 1,
                    icon: '✅',
                    title: 'Completed: Quadratic Equations Practice',
                    description: 'Score: 8/10 • Mathematics • 2 hours ago'
                },
                {
                    id: 2,
                    icon: '📖',
                    title: 'Studied: Light - Laws of Reflection',
                    description: 'Science • 5 hours ago'
                },
                {
                    id: 3,
                    icon: '🎯',
                    title: 'Achievement: 7-Day Learning Streak!',
                    description: 'Keep it up! • 1 day ago'
                }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.loadCurrentCourses();
        this.loadRecentActivity();
        this.initCourseButtons();
    }
    
    loadCurrentCourses() {
        const container = document.getElementById('currentCourses');
        if (!container) return;
        
        container.innerHTML = this.mockData.courses.map(course => `
            <div class="course-card">
                <div class="course-header">
                    <div class="course-icon ${course.color}">${course.icon}</div>
                    <div class="course-meta">
                        <h3>${course.title}</h3>
                        <span class="course-class">Class ${course.class}</span>
                        <div class="progress-info">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${course.progress}%"></div>
                            </div>
                            <span class="progress-text">${course.progress}% Complete</span>
                        </div>
                    </div>
                </div>
                <div class="course-content">
                    <p class="current-topic">Current: ${course.currentTopic}</p>
                    <p class="lesson-count">${course.lessonsComplete} of ${course.lessonsTotal} lessons completed</p>
                </div>
                <div class="course-actions">
                    <button class="btn btn-primary continue-btn" data-course="${course.id}">Continue Learning</button>
                    <button class="btn btn-outline practice-btn" data-course="${course.id}">Practice MCQs</button>
                </div>
            </div>
        `).join('');
    }
    
    loadRecentActivity() {
        const container = document.getElementById('recentActivity');
        if (!container) return;
        
        container.innerHTML = this.mockData.activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                </div>
            </div>
        `).join('');
    }
    
    initCourseButtons() {
        // Continue Learning buttons
        document.querySelectorAll('.continue-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const courseId = e.target.dataset.course;
                const course = this.mockData.courses.find(c => c.id == courseId);
                window.edunabhaApp.showNotification(`Opening ${course.title} - ${course.currentTopic}...`, 'info');
            });
        });
        
        // Practice buttons
        document.querySelectorAll('.practice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const courseId = e.target.dataset.course;
                const course = this.mockData.courses.find(c => c.id == courseId);
                window.edunabhaApp.showNotification(`Opening ${course.title} practice...`, 'info');
                setTimeout(() => {
                    window.location.href = 'practice.html';
                }, 1000);
            });
        });
    }
}

// Initialize dashboard when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('currentCourses')) {
        window.dashboard = new Dashboard();
    }
});
