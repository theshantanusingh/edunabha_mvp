// Continue Learning - Comprehensive Learning Continuation System
// Edunabha Educational Platform

// Mock data for current courses and progress
const currentCoursesData = [
    {
        id: 1,
        title: "Mathematics - Algebra Fundamentals",
        subject: "Mathematics",
        progress: 75,
        lastLesson: "Solving Quadratic Equations",
        nextLesson: "Applications of Quadratic Equations",
        totalLessons: 24,
        completedLessons: 18,
        estimatedTime: "15 min",
        difficulty: "Intermediate",
        thumbnail: "📐",
        color: "math"
    },
    {
        id: 2,
        title: "Science - Physics Basics",
        subject: "Science",
        progress: 60,
        lastLesson: "Newton's Laws of Motion",
        nextLesson: "Work and Energy",
        totalLessons: 20,
        completedLessons: 12,
        estimatedTime: "20 min",
        difficulty: "Beginner",
        thumbnail: "⚛️",
        color: "science"
    },
    {
        id: 3,
        title: "English - Reading Comprehension",
        subject: "English",
        progress: 85,
        lastLesson: "Analyzing Poetry",
        nextLesson: "Literary Devices in Prose",
        totalLessons: 18,
        completedLessons: 15,
        estimatedTime: "12 min",
        difficulty: "Advanced",
        thumbnail: "📖",
        color: "english"
    }
];

const recommendedContentData = [
    {
        id: 1,
        type: "course",
        title: "Advanced Mathematics",
        description: "Build on your algebra skills with calculus basics",
        reason: "Based on your progress in Algebra Fundamentals",
        estimatedTime: "45 min",
        difficulty: "Advanced",
        thumbnail: "🔢"
    },
    {
        id: 2,
        type: "practice",
        title: "Math Problem Solving",
        description: "Practice real-world math applications",
        reason: "Complements your current algebra course",
        estimatedTime: "25 min",
        difficulty: "Intermediate",
        thumbnail: "🧮"
    },
    {
        id: 3,
        type: "quiz",
        title: "Science Knowledge Check",
        description: "Test your understanding of physics concepts",
        reason: "Review what you've learned in Physics Basics",
        estimatedTime: "15 min",
        difficulty: "Intermediate",
        thumbnail: "🧪"
    },
    {
        id: 4,
        type: "game",
        title: "Math Challenge Game",
        description: "Fun math puzzles and brain teasers",
        reason: "Gamified learning to reinforce concepts",
        estimatedTime: "10 min",
        difficulty: "Intermediate",
        thumbnail: "🎯"
    }
];

const activityTimelineData = [
    {
        id: 1,
        type: "lesson",
        title: "Completed: Solving Quadratic Equations",
        subject: "Mathematics",
        time: "2 hours ago",
        score: 85,
        icon: "📚"
    },
    {
        id: 2,
        type: "practice",
        title: "Math Practice Session",
        subject: "Mathematics",
        time: "5 hours ago",
        score: 92,
        icon: "✍️"
    },
    {
        id: 3,
        type: "lesson",
        title: "Completed: Newton's Laws of Motion",
        subject: "Science",
        time: "1 day ago",
        score: 78,
        icon: "📚"
    },
    {
        id: 4,
        type: "game",
        title: "Won Math Quiz Game",
        subject: "Mathematics",
        time: "2 days ago",
        score: 95,
        icon: "🎮"
    },
    {
        id: 5,
        type: "ai",
        title: "AI Tutor Session",
        subject: "English",
        time: "3 days ago",
        score: null,
        icon: "🤖"
    }
];

// Initialize continue learning page
document.addEventListener('DOMContentLoaded', function() {
    loadCurrentCourses();
    loadRecommendedContent();
    loadActivityTimeline();
});

// Load current courses
function loadCurrentCourses() {
    const coursesContainer = document.getElementById('currentCourses');

    const coursesHTML = currentCoursesData.map(course => `
        <div class="continue-course-card">
            <div class="course-header">
                <div class="course-icon ${course.color}">${course.thumbnail}</div>
                <div class="course-info">
                    <h3>${course.title}</h3>
                    <p>${course.subject} • ${course.difficulty}</p>
                </div>
            </div>

            <div class="course-progress">
                <div class="progress-info">
                    <span>${course.progress}% Complete</span>
                    <span>${course.completedLessons}/${course.totalLessons} lessons</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${course.progress}%"></div>
                </div>
            </div>

            <div class="course-next">
                <h4>Next: ${course.nextLesson}</h4>
                <p>Last completed: ${course.lastLesson}</p>
            </div>

            <div class="course-actions">
                <button class="btn btn-primary" onclick="continueCourse(${course.id})">
                    Continue Learning (${course.estimatedTime})
                </button>
                <button class="btn btn-outline" onclick="viewCourseProgress(${course.id})">
                    View Progress
                </button>
            </div>
        </div>
    `).join('');

    coursesContainer.innerHTML = coursesHTML;
}

// Load recommended content
function loadRecommendedContent() {
    const recommendationsContainer = document.getElementById('recommendedContent');

    const recommendationsHTML = recommendedContentData.map(item => `
        <div class="recommendation-card">
            <div class="recommendation-header">
                <div class="recommendation-icon">${item.thumbnail}</div>
                <div class="recommendation-type">${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</div>
            </div>

            <div class="recommendation-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <div class="recommendation-reason">
                    <small>💡 ${item.reason}</small>
                </div>
            </div>

            <div class="recommendation-meta">
                <span class="difficulty ${item.difficulty.toLowerCase()}">${item.difficulty}</span>
                <span class="duration">⏱️ ${item.estimatedTime}</span>
            </div>

            <div class="recommendation-actions">
                <button class="btn btn-primary btn-full" onclick="startRecommendation(${item.id})">
                    Start Now
                </button>
            </div>
        </div>
    `).join('');

    recommendationsContainer.innerHTML = recommendationsHTML;
}

// Load activity timeline
function loadActivityTimeline() {
    const timelineContainer = document.getElementById('activityTimeline');

    const timelineHTML = activityTimelineData.map(activity => `
        <div class="timeline-item">
            <div class="timeline-icon">${activity.icon}</div>
            <div class="timeline-content">
                <h4>${activity.title}</h4>
                <div class="timeline-meta">
                    <span>${activity.subject}</span>
                    <span>${activity.time}</span>
                    ${activity.score ? `<span class="score">Score: ${activity.score}%</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    timelineContainer.innerHTML = timelineHTML;
}

// Course continuation functions
function continueCourse(courseId) {
    const course = currentCoursesData.find(c => c.id === courseId);
    if (course) {
        // In a real app, this would navigate to the specific lesson
        alert(`Continuing with: ${course.nextLesson}\n\nThis would open the lesson in your course.`);
    }
}

function viewCourseProgress(courseId) {
    const course = currentCoursesData.find(c => c.id === courseId);
    if (course) {
        const progressDetails = `
Course: ${course.title}
Progress: ${course.progress}%
Completed Lessons: ${course.completedLessons}/${course.totalLessons}
Last Lesson: ${course.lastLesson}
Next Lesson: ${course.nextLesson}
Difficulty: ${course.difficulty}
        `;
        alert(progressDetails);
    }
}

// Recommendation functions
function startRecommendation(recommendationId) {
    const recommendation = recommendedContentData.find(r => r.id === recommendationId);
    if (recommendation) {
        switch (recommendation.type) {
            case 'course':
                alert(`Starting course: ${recommendation.title}\n\nThis would enroll you in the course.`);
                break;
            case 'practice':
                window.location.href = 'practice.html';
                break;
            case 'quiz':
                alert(`Starting quiz: ${recommendation.title}\n\nThis would open the quiz.`);
                break;
            case 'game':
                window.location.href = 'games.html';
                break;
        }
    }
}

// Quick access functions
function quickAccess(type) {
    switch (type) {
        case 'practice':
            window.location.href = 'practice.html';
            break;
        case 'games':
            window.location.href = 'games.html';
            break;
        case 'ai':
            window.location.href = 'ai.html';
            break;
        case 'progress':
            showProgressReport();
            break;
    }
}

// Progress report function
function showProgressReport() {
    const totalLessons = currentCoursesData.reduce((sum, course) => sum + course.totalLessons, 0);
    const completedLessons = currentCoursesData.reduce((sum, course) => sum + course.completedLessons, 0);
    const averageProgress = Math.round(currentCoursesData.reduce((sum, course) => sum + course.progress, 0) / currentCoursesData.length);

    const report = `
📊 Learning Progress Report

Current Courses: ${currentCoursesData.length}
Total Lessons: ${totalLessons}
Completed Lessons: ${completedLessons}
Overall Progress: ${averageProgress}%

Subject Breakdown:
${currentCoursesData.map(course => `• ${course.subject}: ${course.progress}% (${course.completedLessons}/${course.totalLessons} lessons)`).join('\n')}

Recent Achievements:
• 7-day learning streak
• Completed 3 courses
• Average quiz score: 85%

Keep up the great work! 🎉
    `;

    alert(report);
}

// Utility functions
function formatTimeAgo(timeString) {
    // Simple time formatting
    return timeString;
}

function getDifficultyColor(difficulty) {
    const colors = {
        'Beginner': 'beginner',
        'Intermediate': 'intermediate',
        'Advanced': 'advanced'
    };
    return colors[difficulty] || 'intermediate';
}