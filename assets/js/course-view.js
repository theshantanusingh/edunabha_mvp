// Course View - Comprehensive Course Navigation and Learning System
// Edunabha Educational Platform

// Mock course data
const courseData = {
    id: 1,
    title: "Mathematics - Algebra Fundamentals",
    subject: "Mathematics",
    description: "Master the basics of algebra with step-by-step lessons and practice problems",
    totalLessons: 24,
    totalHours: 8,
    difficulty: "Intermediate",
    rating: 4.8,
    progress: 75,
    completedLessons: 18,
    instructor: "Dr. Sunita Verma",
    modules: [
        {
            id: 1,
            title: "Introduction to Algebra",
            lessons: [
                { id: 1, title: "What is Algebra?", completed: true, duration: "10 min" },
                { id: 2, title: "Variables and Constants", completed: true, duration: "12 min" },
                { id: 3, title: "Basic Algebraic Expressions", completed: true, duration: "15 min" }
            ]
        },
        {
            id: 2,
            title: "Solving Equations",
            lessons: [
                { id: 4, title: "One-Step Equations", completed: true, duration: "18 min" },
                { id: 5, title: "Two-Step Equations", completed: true, duration: "20 min" },
                { id: 6, title: "Multi-Step Equations", completed: true, duration: "25 min" },
                { id: 7, title: "Equations with Variables on Both Sides", completed: true, duration: "22 min" }
            ]
        },
        {
            id: 3,
            title: "Linear Equations and Inequalities",
            lessons: [
                { id: 8, title: "Graphing Linear Equations", completed: true, duration: "20 min" },
                { id: 9, title: "Slope and Y-Intercept", completed: true, duration: "18 min" },
                { id: 10, title: "Writing Linear Equations", completed: true, duration: "25 min" },
                { id: 11, title: "Solving Linear Inequalities", completed: true, duration: "15 min" }
            ]
        },
        {
            id: 4,
            title: "Systems of Equations",
            lessons: [
                { id: 12, title: "Solving by Substitution", completed: true, duration: "22 min" },
                { id: 13, title: "Solving by Elimination", completed: true, duration: "25 min" },
                { id: 14, title: "Word Problems with Systems", completed: true, duration: "20 min" }
            ]
        },
        {
            id: 5,
            title: "Quadratic Equations",
            lessons: [
                { id: 15, title: "Introduction to Quadratics", completed: true, duration: "18 min" },
                { id: 16, title: "Factoring Quadratics", completed: true, duration: "25 min" },
                { id: 17, title: "Quadratic Formula", completed: true, duration: "22 min" },
                { id: 18, title: "Applications of Quadratics", completed: false, duration: "20 min" }
            ]
        },
        {
            id: 6,
            title: "Advanced Topics",
            lessons: [
                { id: 19, title: "Rational Expressions", completed: false, duration: "25 min" },
                { id: 20, title: "Radical Expressions", completed: false, duration: "22 min" },
                { id: 21, title: "Complex Numbers", completed: false, duration: "20 min" },
                { id: 22, title: "Sequences and Series", completed: false, duration: "18 min" },
                { id: 23, title: "Logarithms", completed: false, duration: "25 min" },
                { id: 24, title: "Final Review", completed: false, duration: "30 min" }
            ]
        }
    ]
};

// Current lesson tracking
let currentModuleId = 5;
let currentLessonId = 18;

// Initialize course view
document.addEventListener('DOMContentLoaded', function() {
    loadCourseModules();
    loadCurrentLesson();
    updateNavigationButtons();
});

// Load course modules in sidebar
function loadCourseModules() {
    const modulesContainer = document.getElementById('courseModules');

    const modulesHTML = courseData.modules.map(module => `
        <div class="module">
            <div class="module-header" onclick="toggleModule(${module.id})">
                <h4>${module.title}</h4>
                <span class="module-toggle">▼</span>
            </div>
            <div class="module-lessons" id="module-${module.id}">
                ${module.lessons.map(lesson => `
                    <div class="lesson-item ${lesson.completed ? 'completed' : ''} ${lesson.id === currentLessonId ? 'current' : ''}"
                         onclick="loadLesson(${lesson.id})">
                        <div class="lesson-status">
                            ${lesson.completed ? '✓' : lesson.id === currentLessonId ? '▶' : '○'}
                        </div>
                        <div class="lesson-info">
                            <h5>${lesson.title}</h5>
                            <span class="lesson-duration">${lesson.duration}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    modulesContainer.innerHTML = modulesHTML;
}

// Toggle module expansion
function toggleModule(moduleId) {
    const moduleLessons = document.getElementById(`module-${moduleId}`);
    const toggleIcon = moduleLessons.previousElementSibling.querySelector('.module-toggle');

    if (moduleLessons.style.display === 'none' || !moduleLessons.style.display) {
        moduleLessons.style.display = 'block';
        toggleIcon.textContent = '▼';
    } else {
        moduleLessons.style.display = 'none';
        toggleIcon.textContent = '▶';
    }
}

// Load a specific lesson
function loadLesson(lessonId) {
    // Find the lesson
    let lesson = null;
    let module = null;

    for (const mod of courseData.modules) {
        lesson = mod.lessons.find(l => l.id === lessonId);
        if (lesson) {
            module = mod;
            break;
        }
    }

    if (lesson) {
        currentLessonId = lessonId;
        currentModuleId = module.id;

        // Update UI
        updateLessonSelection();
        loadLessonContent(lesson, module);
        updateNavigationButtons();
    }
}

// Update lesson selection in sidebar
function updateLessonSelection() {
    // Remove current class from all lessons
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.classList.remove('current');
    });

    // Add current class to selected lesson
    const currentLessonElement = document.querySelector(`[onclick="loadLesson(${currentLessonId})"]`);
    if (currentLessonElement) {
        currentLessonElement.classList.add('current');
    }
}

// Load lesson content
function loadLessonContent(lesson, module) {
    const contentContainer = document.getElementById('lessonContent');

    const lessonContent = getLessonContent(lesson, module);

    contentContainer.innerHTML = `
        <div class="lesson-header">
            <div class="lesson-breadcrumb">
                <span>${module.title}</span> > <span>${lesson.title}</span>
            </div>
            <h2>${lesson.title}</h2>
            <div class="lesson-meta">
                <span>📚 ${courseData.subject}</span>
                <span>⏱️ ${lesson.duration}</span>
                <span>🎯 ${courseData.difficulty}</span>
            </div>
        </div>

        <div class="lesson-body">
            ${lessonContent}
        </div>

        <div class="lesson-objectives">
            <h3>Learning Objectives</h3>
            <ul>
                ${getLessonObjectives(lesson).map(obj => `<li>${obj}</li>`).join('')}
            </ul>
        </div>

        <div class="lesson-practice">
            <h3>Practice Exercise</h3>
            <div class="practice-content">
                ${getLessonPractice(lesson)}
            </div>
        </div>
    `;
}

// Get lesson content based on lesson
function getLessonContent(lesson, module) {
    const lessonContents = {
        18: `
            <div class="lesson-text">
                <h3>Real-World Applications of Quadratic Equations</h3>
                <p>Quadratic equations appear in many real-world situations. Understanding how to solve them allows us to solve practical problems in physics, engineering, and everyday life.</p>

                <h4>Projectile Motion</h4>
                <p>When an object is thrown into the air, its height can be modeled by a quadratic equation:</p>
                <div class="math-equation">h(t) = -16t² + v₀t + h₀</div>
                <p>Where:<br>
                • h(t) = height at time t<br>
                • v₀ = initial velocity<br>
                • h₀ = initial height<br>
                • t = time in seconds</p>

                <h4>Business Applications</h4>
                <p>Companies use quadratic equations to maximize profit or minimize costs. For example, finding the optimal price point for a product often involves solving a quadratic equation.</p>

                <h4>Area Optimization</h4>
                <p>Gardeners and farmers use quadratic equations to determine optimal dimensions for maximum area with limited fencing.</p>
            </div>

            <div class="lesson-examples">
                <h4>Example: Projectile Motion</h4>
                <p>A ball is thrown upward with an initial velocity of 32 ft/s from a height of 6 feet. Find when it hits the ground.</p>
                <div class="math-equation">h(t) = -16t² + 32t + 6</div>
                <p>Set h(t) = 0 and solve: -16t² + 32t + 6 = 0</p>
                <p>Using quadratic formula: t = [ -32 ± √(32² - 4(-16)(6)) ] / (2(-16))</p>
                <p>t = [ -32 ± √(1024 + 384) ] / (-32) = [ -32 ± √1408 ] / (-32)</p>
                <p>t ≈ 2.2 seconds (taking the positive root)</p>
            </div>
        `,
        19: `
            <div class="lesson-text">
                <h3>Rational Expressions</h3>
                <p>Rational expressions are fractions where both numerator and denominator are polynomials. They follow the same rules as regular fractions but require special attention to domain restrictions.</p>

                <h4>Domain Restrictions</h4>
                <p>The domain of a rational expression excludes values that make the denominator zero.</p>
                <div class="math-example">
                    <p>Expression: (x + 2)/(x - 3)</p>
                    <p>Domain: All real numbers except x = 3</p>
                </div>

                <h4>Simplifying Rational Expressions</h4>
                <p>Factor both numerator and denominator, then cancel common factors:</p>
                <div class="math-example">
                    <p>(x² - 1)/(x² - 2x + 1) = (x - 1)(x + 1)/(x - 1)² = (x + 1)/(x - 1)</p>
                    <p>Domain: x ≠ 1</p>
                </div>
            </div>
        `
    };

    return lessonContents[lesson.id] || `
        <div class="lesson-text">
            <h3>${lesson.title}</h3>
            <p>This lesson covers important concepts in ${module.title.toLowerCase()}. The content includes theoretical explanations, worked examples, and practice problems to help you master the material.</p>

            <div class="lesson-key-points">
                <h4>Key Points:</h4>
                <ul>
                    <li>Understanding the core concepts</li>
                    <li>Applying formulas and methods</li>
                    <li>Solving practice problems</li>
                    <li>Real-world applications</li>
                </ul>
            </div>

            <div class="lesson-note">
                <p><strong>Note:</strong> Make sure to complete the practice exercises at the end of this lesson before moving to the next one.</p>
            </div>
        </div>
    `;
}

// Get lesson objectives
function getLessonObjectives(lesson) {
    const objectives = {
        18: [
            "Identify real-world situations that can be modeled with quadratic equations",
            "Apply quadratic equations to solve projectile motion problems",
            "Understand how quadratic equations are used in optimization problems",
            "Interpret solutions in the context of real-world applications"
        ],
        19: [
            "Define rational expressions and identify their components",
            "Determine domain restrictions for rational expressions",
            "Simplify rational expressions by factoring and canceling",
            "Identify when rational expressions are undefined"
        ]
    };

    return objectives[lesson.id] || [
        "Understand the core concepts presented in this lesson",
        "Apply the learned methods to solve problems",
        "Complete practice exercises to reinforce learning",
        "Connect concepts to real-world applications"
    ];
}

// Get lesson practice
function getLessonPractice(lesson) {
    const practices = {
        18: `
            <div class="practice-problems">
                <h4>Practice Problems:</h4>
                <ol>
                    <li>A ball is thrown upward with initial velocity 40 m/s from height 5m. How long until it hits ground?</li>
                    <li>A farmer has 200m of fencing. What dimensions maximize rectangular garden area?</li>
                    <li>Company profit: P(x) = -x² + 100x - 1000. Find price for maximum profit.</li>
                </ol>
                <button class="btn btn-primary" onclick="checkAnswers(18)">Check Answers</button>
            </div>
        `,
        19: `
            <div class="practice-problems">
                <h4>Simplify these rational expressions:</h4>
                <ol>
                    <li>(x² - 4)/(x² - 5x + 6)</li>
                    <li>(2x² - 8)/(x² - 4x + 4)</li>
                    <li>(x³ - 1)/(x² - 1)</li>
                </ol>
                <button class="btn btn-primary" onclick="checkAnswers(19)">Check Answers</button>
            </div>
        `
    };

    return practices[lesson.id] || `
        <div class="practice-problems">
            <p>Complete the following practice exercises to reinforce your understanding:</p>
            <ol>
                <li>Review the key concepts from this lesson</li>
                <li>Work through the example problems</li>
                <li>Attempt additional practice questions</li>
                <li>Check your understanding with self-assessment</li>
            </ol>
            <button class="btn btn-primary" onclick="completePractice()">Mark Practice Complete</button>
        </div>
    `;
}

// Load current lesson on page load
function loadCurrentLesson() {
    const currentModule = courseData.modules.find(m => m.id === currentModuleId);
    const currentLesson = currentModule?.lessons.find(l => l.id === currentLessonId);

    if (currentLesson) {
        loadLessonContent(currentLesson, currentModule);
    }
}

// Navigation functions
function nextLesson() {
    const currentModule = courseData.modules.find(m => m.id === currentModuleId);
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLessonId);

    if (currentLessonIndex < currentModule.lessons.length - 1) {
        // Next lesson in same module
        const nextLesson = currentModule.lessons[currentLessonIndex + 1];
        loadLesson(nextLesson.id);
    } else {
        // Next module
        const nextModuleIndex = courseData.modules.findIndex(m => m.id === currentModuleId) + 1;
        if (nextModuleIndex < courseData.modules.length) {
            const nextModule = courseData.modules[nextModuleIndex];
            const firstLesson = nextModule.lessons[0];
            loadLesson(firstLesson.id);
        }
    }
}

function previousLesson() {
    const currentModule = courseData.modules.find(m => m.id === currentModuleId);
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLessonId);

    if (currentLessonIndex > 0) {
        // Previous lesson in same module
        const prevLesson = currentModule.lessons[currentLessonIndex - 1];
        loadLesson(prevLesson.id);
    } else {
        // Previous module
        const prevModuleIndex = courseData.modules.findIndex(m => m.id === currentModuleId) - 1;
        if (prevModuleIndex >= 0) {
            const prevModule = courseData.modules[prevModuleIndex];
            const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
            loadLesson(lastLesson.id);
        }
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevLesson');
    const nextBtn = document.getElementById('nextLesson');

    // Check if previous lesson exists
    const currentModule = courseData.modules.find(m => m.id === currentModuleId);
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLessonId);

    const hasPrevious = currentLessonIndex > 0 ||
        courseData.modules.findIndex(m => m.id === currentModuleId) > 0;

    const hasNext = currentLessonIndex < currentModule.lessons.length - 1 ||
        courseData.modules.findIndex(m => m.id === currentModuleId) < courseData.modules.length - 1;

    prevBtn.disabled = !hasPrevious;
    nextBtn.disabled = !hasNext;

    if (!hasPrevious) prevBtn.style.opacity = '0.5';
    else prevBtn.style.opacity = '1';

    if (!hasNext) nextBtn.style.opacity = '0.5';
    else nextBtn.style.opacity = '1';
}

// Other functions
function continueCourse() {
    nextLesson();
}

function viewCertificate() {
    alert('Certificate feature coming soon! Complete the course to earn your certificate.');
}

function markComplete() {
    // Mark current lesson as complete
    const currentModule = courseData.modules.find(m => m.id === currentModuleId);
    const currentLesson = currentModule.lessons.find(l => l.id === currentLessonId);

    if (currentLesson && !currentLesson.completed) {
        currentLesson.completed = true;
        courseData.completedLessons++;
        courseData.progress = Math.round((courseData.completedLessons / courseData.totalLessons) * 100);

        // Update UI
        loadCourseModules();
        updateProgressDisplay();

        alert('Lesson marked as complete! 🎉');
    }
}

function updateProgressDisplay() {
    // Update progress bar and text
    const progressBar = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-summary h3');

    if (progressBar) {
        progressBar.style.width = `${courseData.progress}%`;
    }

    if (progressText) {
        progressText.textContent = `Your Progress: ${courseData.progress}% Complete`;
    }
}

function downloadResource(resourceType) {
    const resources = {
        'formula-sheet': 'Algebra Formula Sheet',
        'worksheets': 'Practice Worksheets'
    };

    alert(`${resources[resourceType]} downloaded successfully!`);
}

function openVideos() {
    alert('Video tutorials will open in a new window. Feature coming soon!');
}

function openAITutor() {
    window.location.href = 'ai.html';
}

function enrollCourse(courseId) {
    alert(`Enrolling in ${courseId.replace('-', ' ')}... This will add the course to your learning dashboard.`);
}

function checkAnswers(lessonId) {
    alert('Answer checking feature coming soon! For now, try solving the problems and check your work manually.');
}

function completePractice() {
    alert('Practice exercises completed! Great job on finishing the lesson activities.');
}