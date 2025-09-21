// Practice Zone - Comprehensive Learning Exercises
// Edunabha Educational Platform

// Global practice variables
let currentPractice = null;
let practiceScore = 0;
let practiceTimer = 0;
let timerInterval = null;
let currentQuestionIndex = 0;
let practiceData = {};

// Practice questions and exercises
const practiceContent = {
    quiz: {
        mathematics: [
            {
                question: "What is the value of x in the equation 2x + 5 = 17?",
                options: ["6", "7", "8", "5"],
                correct: 0,
                explanation: "Subtract 5 from both sides: 2x = 12, then divide by 2: x = 6"
            },
            {
                question: "What is the area of a circle with radius 7 cm? (Use π = 22/7)",
                options: ["154 cm²", "150 cm²", "160 cm²", "140 cm²"],
                correct: 0,
                explanation: "Area = πr² = (22/7) × 7 × 7 = 22 × 7 = 154 cm²"
            },
            {
                question: "Solve: 15% of 200 = ?",
                options: ["30", "25", "35", "20"],
                correct: 0,
                explanation: "15% of 200 = (15/100) × 200 = 0.15 × 200 = 30"
            }
        ],
        science: [
            {
                question: "Which gas do plants absorb during photosynthesis?",
                options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                correct: 1,
                explanation: "Plants absorb carbon dioxide (CO₂) and release oxygen (O₂) during photosynthesis."
            },
            {
                question: "What is the chemical formula for water?",
                options: ["H₂O₂", "CO₂", "H₂O", "O₂"],
                correct: 2,
                explanation: "Water consists of 2 hydrogen atoms and 1 oxygen atom, so its formula is H₂O."
            }
        ],
        english: [
            {
                question: "Identify the correct sentence:",
                options: [
                    "She don't like apples",
                    "She doesn't likes apples",
                    "She doesn't like apples",
                    "She don't likes apples"
                ],
                correct: 2,
                explanation: "'Doesn't' is the correct contraction for 'does not' with 'she'."
            }
        ]
    },
    math: {
        algebra: [
            {
                problem: "Solve for x: 3x - 7 = 14",
                steps: [
                    "Add 7 to both sides: 3x - 7 + 7 = 14 + 7",
                    "3x = 21",
                    "Divide both sides by 3: x = 21 ÷ 3",
                    "x = 7"
                ],
                answer: "x = 7",
                difficulty: "Easy"
            },
            {
                problem: "Factor: x² + 5x + 6",
                steps: [
                    "Find two numbers that multiply to 6 and add to 5: 2 and 3",
                    "(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6",
                    "The factors are (x + 2) and (x + 3)"
                ],
                answer: "(x + 2)(x + 3)",
                difficulty: "Medium"
            }
        ],
        geometry: [
            {
                problem: "Find the area of a triangle with base 10 cm and height 8 cm",
                steps: [
                    "Area of triangle = (1/2) × base × height",
                    "Area = (1/2) × 10 × 8",
                    "Area = (1/2) × 80",
                    "Area = 40 cm²"
                ],
                answer: "40 cm²",
                difficulty: "Easy"
            }
        ]
    },
    reading: [
        {
            passage: "The water cycle is the continuous movement of water on, above, and below the surface of the Earth. It involves evaporation, condensation, precipitation, and collection. When water evaporates from oceans, lakes, and rivers, it rises into the atmosphere as water vapor. As it cools, the vapor condenses into tiny water droplets that form clouds. When the clouds become heavy, precipitation occurs in the form of rain, snow, or hail. The water then collects in rivers, lakes, and oceans, and the cycle begins again.",
            questions: [
                {
                    question: "What are the main processes in the water cycle?",
                    options: ["Evaporation, condensation, precipitation", "Boiling, freezing, melting", "Photosynthesis, respiration, transpiration", "Erosion, weathering, deposition"],
                    correct: 0,
                    explanation: "The passage mentions evaporation, condensation, and precipitation as the main processes."
                },
                {
                    question: "What happens during condensation?",
                    options: ["Water turns into vapor", "Water vapor turns into liquid droplets", "Liquid water turns into ice", "Water falls from clouds"],
                    correct: 1,
                    explanation: "Condensation is when water vapor cools and turns into tiny liquid droplets that form clouds."
                }
            ]
        }
    ],
    writing: [
        {
            prompt: "Write a short paragraph about your favorite season and explain why you like it.",
            guidelines: [
                "Start with a topic sentence",
                "Include specific details and examples",
                "Use descriptive language",
                "End with a concluding sentence"
            ],
            wordLimit: 150,
            rubric: [
                "Content: Clear main idea with supporting details (4 points)",
                "Organization: Logical structure and flow (3 points)",
                "Language: Appropriate vocabulary and grammar (3 points)"
            ]
        },
        {
            prompt: "Describe a person who has influenced your life positively. Explain how they have made a difference.",
            guidelines: [
                "Introduce the person and your relationship",
                "Describe specific qualities or actions",
                "Explain the impact on your life",
                "Use specific examples"
            ],
            wordLimit: 200,
            rubric: [
                "Content: Clear description with specific examples (4 points)",
                "Organization: Well-structured response (3 points)",
                "Language: Varied vocabulary and sentence structure (3 points)"
            ]
        }
    ],
    science: [
        {
            experiment: "Investigating Density",
            objective: "Determine which liquid is more dense: water or oil",
            materials: ["Water", "Vegetable oil", "Clear glass", "Food coloring"],
            procedure: [
                "Fill a glass halfway with water",
                "Add a few drops of food coloring to the water",
                "Slowly pour vegetable oil on top of the water",
                "Observe what happens"
            ],
            expectedResult: "The oil will float on top of the water because oil is less dense than water.",
            explanation: "Density is mass per unit volume. Oil has a lower density than water, so it floats."
        }
    ]
};

// Recent practice sessions (mock data)
const recentSessions = [
    {
        id: 1,
        type: "Mathematics Quiz",
        score: 85,
        timeSpent: "12 min",
        date: "2024-01-15",
        questions: 10,
        correct: 8
    },
    {
        id: 2,
        type: "Reading Comprehension",
        score: 92,
        timeSpent: "18 min",
        date: "2024-01-14",
        questions: 8,
        correct: 7
    },
    {
        id: 3,
        type: "Science Problems",
        score: 78,
        timeSpent: "25 min",
        date: "2024-01-13",
        questions: 12,
        correct: 9
    }
];

// Initialize practice page
document.addEventListener('DOMContentLoaded', function() {
    loadRecentSessions();
});

// Load recent practice sessions
function loadRecentSessions() {
    const sessionsContainer = document.getElementById('recentSessions');

    if (recentSessions.length === 0) {
        sessionsContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-muted);">No practice sessions yet. Start practicing to see your progress!</p>';
        return;
    }

    sessionsContainer.innerHTML = recentSessions.map(session => `
        <div class="practice-session-card">
            <div class="session-header">
                <h4>${session.type}</h4>
                <span class="session-score ${session.score >= 80 ? 'high' : session.score >= 60 ? 'medium' : 'low'}">${session.score}%</span>
            </div>
            <div class="session-details">
                <span>⏱️ ${session.timeSpent}</span>
                <span>📊 ${session.correct}/${session.questions} correct</span>
                <span>📅 ${new Date(session.date).toLocaleDateString()}</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="reviewSession(${session.id})">Review</button>
        </div>
    `).join('');
}

// Start practice session
function startPractice(type) {
    currentPractice = type;
    practiceScore = 0;
    practiceTimer = 0;
    currentQuestionIndex = 0;

    // Show practice modal
    document.getElementById('practiceModal').classList.add('active');

    // Set practice title
    const titles = {
        quiz: 'Quick Quiz Practice',
        math: 'Mathematics Problem Solving',
        reading: 'Reading Comprehension',
        writing: 'Writing Practice',
        science: 'Science Experiments',
        mixed: 'Mixed Practice Session'
    };
    document.getElementById('practiceTitle').textContent = titles[type];

    // Start timer
    startPracticeTimer();

    // Load first content
    loadPracticeContent();
}

// Close practice modal
function closePracticeModal() {
    document.getElementById('practiceModal').classList.remove('active');
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    currentPractice = null;
}

// Start practice timer
function startPracticeTimer() {
    timerInterval = setInterval(() => {
        practiceTimer++;
        updatePracticeStats();
    }, 1000);
}

// Update practice statistics display
function updatePracticeStats() {
    // Update timer display if it exists
    const timerEl = document.querySelector('.practice-timer');
    if (timerEl) {
        const minutes = Math.floor(practiceTimer / 60);
        const seconds = practiceTimer % 60;
        timerEl.textContent = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Load practice content based on type
function loadPracticeContent() {
    const content = document.getElementById('practiceContent');

    switch (currentPractice) {
        case 'quiz':
            loadQuizPractice();
            break;
        case 'math':
            loadMathPractice();
            break;
        case 'reading':
            loadReadingPractice();
            break;
        case 'writing':
            loadWritingPractice();
            break;
        case 'science':
            loadSciencePractice();
            break;
        case 'mixed':
            loadMixedPractice();
            break;
    }
}

// Quiz Practice
function loadQuizPractice() {
    const content = document.getElementById('practiceContent');

    // Select random subject and questions
    const subjects = Object.keys(practiceContent.quiz);
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    const questions = practiceContent.quiz[randomSubject];

    practiceData = {
        subject: randomSubject,
        questions: questions,
        currentIndex: 0,
        answers: []
    };

    loadQuizQuestion();
}

function loadQuizQuestion() {
    const data = practiceData;
    const question = data.questions[data.currentIndex];

    const content = document.getElementById('practiceContent');
    content.innerHTML = `
        <div class="practice-stats-bar">
            <div class="practice-timer">⏱️ 0:00</div>
            <div class="practice-progress">Question ${data.currentIndex + 1} of ${data.questions.length}</div>
            <div class="practice-score">🏆 ${practiceScore} points</div>
        </div>

        <div class="practice-question">
            <h3>${question.question}</h3>
        </div>

        <div class="practice-options">
            ${question.options.map((option, index) => `
                <div class="practice-option" onclick="selectPracticeAnswer(${index})">${option}</div>
            `).join('')}
        </div>

        <div class="practice-controls">
            <button class="btn btn-outline" onclick="closePracticeModal()">End Practice</button>
        </div>
    `;

    updatePracticeStats();
}

function selectPracticeAnswer(selectedIndex) {
    const data = practiceData;
    const question = data.questions[data.currentIndex];

    // Record answer
    data.answers.push({
        question: question.question,
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: selectedIndex === question.correct
    });

    // Update score
    if (selectedIndex === question.correct) {
        practiceScore += 10;
    }

    // Show feedback
    const options = document.querySelectorAll('.practice-option');
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
    });

    // Show explanation
    setTimeout(() => {
        showExplanation(question.explanation);
    }, 1000);
}

function showExplanation(explanation) {
    const content = document.getElementById('practiceContent');
    const existingExplanation = content.querySelector('.practice-explanation');

    if (existingExplanation) {
        existingExplanation.remove();
    }

    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'practice-explanation';
    explanationDiv.innerHTML = `
        <h4>Explanation:</h4>
        <p>${explanation}</p>
        <button class="btn btn-primary" onclick="nextPracticeQuestion()">Next Question</button>
    `;

    content.appendChild(explanationDiv);
}

function nextPracticeQuestion() {
    practiceData.currentIndex++;

    if (practiceData.currentIndex < practiceData.questions.length) {
        loadQuizQuestion();
    } else {
        showPracticeResults();
    }
}

// Math Practice
function loadMathPractice() {
    const problems = [...practiceContent.math.algebra, ...practiceContent.math.geometry];
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];

    practiceData = {
        problem: randomProblem,
        currentStep: 0,
        userAnswers: []
    };

    const content = document.getElementById('practiceContent');
    content.innerHTML = `
        <div class="practice-stats-bar">
            <div class="practice-timer">⏱️ 0:00</div>
            <div class="practice-difficulty">${randomProblem.difficulty}</div>
            <div class="practice-score">🏆 ${practiceScore} points</div>
        </div>

        <div class="math-problem">
            <h3>Solve this problem step by step:</h3>
            <div class="problem-statement">${randomProblem.problem}</div>
        </div>

        <div class="math-workspace">
            <div class="step-display" id="stepDisplay">
                <div class="current-step">
                    <strong>Step 1:</strong> ${randomProblem.steps[0]}
                </div>
            </div>

            <div class="step-controls">
                <button class="btn btn-outline" onclick="previousMathStep()">Previous</button>
                <button class="btn btn-primary" onclick="nextMathStep()">Next Step</button>
            </div>
        </div>

        <div class="practice-controls">
            <button class="btn btn-outline" onclick="closePracticeModal()">End Practice</button>
            <button class="btn btn-primary" onclick="showMathAnswer()">Show Answer</button>
        </div>
    `;

    updatePracticeStats();
}

function nextMathStep() {
    const data = practiceData;
    data.currentStep++;

    if (data.currentStep < data.problem.steps.length) {
        updateStepDisplay();
    } else {
        showMathCompletion();
    }
}

function previousMathStep() {
    const data = practiceData;
    if (data.currentStep > 0) {
        data.currentStep--;
        updateStepDisplay();
    }
}

function updateStepDisplay() {
    const data = practiceData;
    const stepDisplay = document.getElementById('stepDisplay');
    const currentStep = data.problem.steps[data.currentStep];

    stepDisplay.innerHTML = `
        <div class="current-step">
            <strong>Step ${data.currentStep + 1}:</strong> ${currentStep}
        </div>
    `;
}

function showMathAnswer() {
    const data = practiceData;
    const content = document.getElementById('practiceContent');

    const answerDiv = document.createElement('div');
    answerDiv.className = 'math-answer';
    answerDiv.innerHTML = `
        <h4>Final Answer:</h4>
        <p class="answer-highlight">${data.problem.answer}</p>
        <button class="btn btn-primary" onclick="completeMathPractice()">Complete</button>
    `;

    content.appendChild(answerDiv);
    practiceScore += 20;
}

function showMathCompletion() {
    const content = document.getElementById('practiceContent');
    content.innerHTML += `
        <div class="practice-completion">
            <h4>🎉 Problem Solved!</h4>
            <p>You've worked through all the steps. Great job!</p>
            <div class="completion-actions">
                <button class="btn btn-primary" onclick="tryAnotherMathProblem()">Try Another Problem</button>
                <button class="btn btn-outline" onclick="closePracticeModal()">End Practice</button>
            </div>
        </div>
    `;
}

function tryAnotherMathProblem() {
    loadMathPractice();
}

// Reading Practice
function loadReadingPractice() {
    const passage = practiceContent.reading[0]; // Using first passage for now

    practiceData = {
        passage: passage,
        currentQuestion: 0,
        answers: []
    };

    const content = document.getElementById('practiceContent');
    content.innerHTML = `
        <div class="practice-stats-bar">
            <div class="practice-timer">⏱️ 0:00</div>
            <div class="practice-progress">Question 1 of ${passage.questions.length}</div>
            <div class="practice-score">🏆 ${practiceScore} points</div>
        </div>

        <div class="reading-passage">
            <h3>Read the following passage:</h3>
            <div class="passage-text">${passage.passage}</div>
        </div>

        <div class="reading-question" id="readingQuestion">
            <!-- Question will be loaded here -->
        </div>

        <div class="practice-controls">
            <button class="btn btn-outline" onclick="closePracticeModal()">End Practice</button>
        </div>
    `;

    loadReadingQuestion();
    updatePracticeStats();
}

function loadReadingQuestion() {
    const data = practiceData;
    const question = data.passage.questions[data.currentQuestion];

    const questionDiv = document.getElementById('readingQuestion');
    questionDiv.innerHTML = `
        <h4>Question ${data.currentQuestion + 1}:</h4>
        <p>${question.question}</p>

        <div class="practice-options">
            ${question.options.map((option, index) => `
                <div class="practice-option" onclick="selectReadingAnswer(${index})">${option}</div>
            `).join('')}
        </div>
    `;
}

function selectReadingAnswer(selectedIndex) {
    const data = practiceData;
    const question = data.passage.questions[data.currentQuestion];

    // Record answer
    data.answers.push({
        question: question.question,
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: selectedIndex === question.correct
    });

    // Update score
    if (selectedIndex === question.correct) {
        practiceScore += 15;
    }

    // Show feedback
    const options = document.querySelectorAll('.practice-option');
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
    });

    // Move to next question
    setTimeout(() => {
        data.currentQuestion++;
        if (data.currentQuestion < data.passage.questions.length) {
            loadReadingQuestion();
            updateProgress();
        } else {
            showPracticeResults();
        }
    }, 2000);
}

function updateProgress() {
    const progressEl = document.querySelector('.practice-progress');
    if (progressEl) {
        progressEl.textContent = `Question ${practiceData.currentQuestion + 1} of ${practiceData.passage.questions.length}`;
    }
}

// Writing Practice
function loadWritingPractice() {
    const prompt = practiceContent.writing[Math.floor(Math.random() * practiceContent.writing.length)];

    practiceData = {
        prompt: prompt,
        startTime: Date.now(),
        wordCount: 0
    };

    const content = document.getElementById('practiceContent');
    content.innerHTML = `
        <div class="practice-stats-bar">
            <div class="practice-timer">⏱️ 0:00</div>
            <div class="word-count">📝 0 words</div>
            <div class="practice-score">🏆 ${practiceScore} points</div>
        </div>

        <div class="writing-prompt">
            <h3>Writing Prompt:</h3>
            <div class="prompt-text">${prompt.prompt}</div>
            <div class="prompt-details">
                <p><strong>Word Limit:</strong> ${prompt.wordLimit} words</p>
                <p><strong>Guidelines:</strong></p>
                <ul>
                    ${prompt.guidelines.map(guideline => `<li>${guideline}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="writing-area">
            <textarea id="writingInput" placeholder="Start writing your response here..." rows="12" oninput="updateWordCount()"></textarea>
        </div>

        <div class="writing-controls">
            <button class="btn btn-outline" onclick="closePracticeModal()">End Practice</button>
            <button class="btn btn-primary" onclick="submitWriting()">Submit Writing</button>
        </div>
    `;

    updatePracticeStats();
}

function updateWordCount() {
    const text = document.getElementById('writingInput').value;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    practiceData.wordCount = words;

    const wordCountEl = document.querySelector('.word-count');
    if (wordCountEl) {
        wordCountEl.textContent = `📝 ${words} words`;
    }
}

function submitWriting() {
    const writing = document.getElementById('writingInput').value;
    const wordCount = practiceData.wordCount;
    const timeSpent = Math.floor((Date.now() - practiceData.startTime) / 1000 / 60); // minutes

    if (writing.trim().length === 0) {
        alert('Please write something before submitting.');
        return;
    }

    // Calculate score based on word count and time
    let score = 50; // Base score
    if (wordCount >= practiceData.prompt.wordLimit * 0.8) score += 20;
    if (timeSpent >= 10) score += 15; // Took time to think
    practiceScore = score;

    showWritingFeedback(writing, wordCount, timeSpent);
}

function showWritingFeedback(writing, wordCount, timeSpent) {
    const content = document.getElementById('practiceContent');
    content.innerHTML = `
        <div class="writing-feedback">
            <h3>📝 Writing Review</h3>

            <div class="feedback-stats">
                <div class="stat-item">
                    <span>Word Count:</span>
                    <span>${wordCount}</span>
                </div>
                <div class="stat-item">
                    <span>Time Spent:</span>
                    <span>${timeSpent} minutes</span>
                </div>
                <div class="stat-item">
                    <span>Score:</span>
                    <span>${practiceScore}/100</span>
                </div>
            </div>

            <div class="writing-sample">
                <h4>Your Writing:</h4>
                <div class="writing-preview">${writing}</div>
            </div>

            <div class="rubric-feedback">
                <h4>Feedback Based on Rubric:</h4>
                <ul>
                    ${practiceData.prompt.rubric.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>

            <div class="writing-actions">
                <button class="btn btn-primary" onclick="saveWriting()">Save Writing</button>
                <button class="btn btn-outline" onclick="tryAnotherWritingPrompt()">Try Another Prompt</button>
                <button class="btn btn-outline" onclick="closePracticeModal()">End Practice</button>
            </div>
        </div>
    `;
}

function saveWriting() {
    alert('Writing saved successfully! You can review it later in your practice history.');
}

function tryAnotherWritingPrompt() {
    loadWritingPractice();
}

// Science Practice
function loadSciencePractice() {
    const experiment = practiceContent.science[0];

    practiceData = {
        experiment: experiment,
        currentStep: 0
    };

    const content = document.getElementById('practiceContent');
    content.innerHTML = `
        <div class="practice-stats-bar">
            <div class="practice-timer">⏱️ 0:00</div>
            <div class="experiment-title">${experiment.experiment}</div>
            <div class="practice-score">🏆 ${practiceScore} points</div>
        </div>

        <div class="experiment-details">
            <h3>Objective:</h3>
            <p>${experiment.objective}</p>

            <h3>Materials Needed:</h3>
            <ul>
                ${experiment.materials.map(material => `<li>${material}</li>`).join('')}
            </ul>
        </div>

        <div class="experiment-procedure">
            <h3>Procedure:</h3>
            <div class="procedure-steps" id="procedureSteps">
                <div class="current-procedure-step">
                    <strong>Step 1:</strong> ${experiment.procedure[0]}
                </div>
            </div>

            <div class="procedure-controls">
                <button class="btn btn-outline" onclick="previousExperimentStep()">Previous</button>
                <button class="btn btn-primary" onclick="nextExperimentStep()">Next Step</button>
            </div>
        </div>

        <div class="practice-controls">
            <button class="btn btn-outline" onclick="closePracticeModal()">End Practice</button>
            <button class="btn btn-primary" onclick="showExperimentResults()">View Results</button>
        </div>
    `;

    updatePracticeStats();
}

function nextExperimentStep() {
    const data = practiceData;
    data.currentStep++;

    if (data.currentStep < data.experiment.procedure.length) {
        updateProcedureDisplay();
    } else {
        showExperimentCompletion();
    }
}

function previousExperimentStep() {
    const data = practiceData;
    if (data.currentStep > 0) {
        data.currentStep--;
        updateProcedureDisplay();
    }
}

function updateProcedureDisplay() {
    const data = practiceData;
    const stepsDiv = document.getElementById('procedureSteps');
    const currentStep = data.experiment.procedure[data.currentStep];

    stepsDiv.innerHTML = `
        <div class="current-procedure-step">
            <strong>Step ${data.currentStep + 1}:</strong> ${currentStep}
        </div>
    `;
}

function showExperimentResults() {
    const data = practiceData;
    const content = document.getElementById('practiceContent');

    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'experiment-results';
    resultsDiv.innerHTML = `
        <h4>Expected Results:</h4>
        <p>${data.experiment.expectedResult}</p>

        <h4>Scientific Explanation:</h4>
        <p>${data.experiment.explanation}</p>

        <div class="experiment-questions">
            <h4>Think About It:</h4>
            <ul>
                <li>What would happen if you used different liquids?</li>
                <li>How does temperature affect density?</li>
                <li>Can you think of other examples where density matters?</li>
            </ul>
        </div>

        <button class="btn btn-primary" onclick="completeExperiment()">Complete Experiment</button>
    `;

    content.appendChild(resultsDiv);
    practiceScore += 25;
}

function showExperimentCompletion() {
    const content = document.getElementById('practiceContent');
    content.innerHTML += `
        <div class="experiment-completion">
            <h4>🔬 Experiment Complete!</h4>
            <p>You've successfully completed the experiment procedure!</p>
            <button class="btn btn-primary" onclick="showExperimentResults()">View Results</button>
        </div>
    `;
}

function completeExperiment() {
    alert('Experiment completed! Your results have been recorded.');
    closePracticeModal();
}

// Mixed Practice
function loadMixedPractice() {
    // Combine different types of practice
    practiceData = {
        completedSections: [],
        totalScore: 0
    };

    const content = document.getElementById('practiceContent');
    content.innerHTML = `
        <div class="practice-stats-bar">
            <div class="practice-timer">⏱️ 0:00</div>
            <div class="practice-progress">Mixed Practice Session</div>
            <div class="practice-score">🏆 ${practiceScore} points</div>
        </div>

        <div class="mixed-practice-intro">
            <h3>🎯 Mixed Practice Challenge</h3>
            <p>This session combines different types of practice across subjects. Complete all sections to earn bonus points!</p>

            <div class="practice-sections">
                <div class="section-item ${practiceData.completedSections.includes('math') ? 'completed' : ''}" onclick="startMixedSection('math')">
                    <span class="section-icon">🔢</span>
                    <span class="section-name">Math Problem</span>
                    <span class="section-status">${practiceData.completedSections.includes('math') ? '✓' : '○'}</span>
                </div>
                <div class="section-item ${practiceData.completedSections.includes('science') ? 'completed' : ''}" onclick="startMixedSection('science')">
                    <span class="section-icon">🧪</span>
                    <span class="section-name">Science Question</span>
                    <span class="section-status">${practiceData.completedSections.includes('science') ? '✓' : '○'}</span>
                </div>
                <div class="section-item ${practiceData.completedSections.includes('english') ? 'completed' : ''}" onclick="startMixedSection('english')">
                    <span class="section-icon">📖</span>
                    <span class="section-name">English Exercise</span>
                    <span class="section-status">${practiceData.completedSections.includes('english') ? '✓' : '○'}</span>
                </div>
            </div>
        </div>

        <div class="practice-controls">
            <button class="btn btn-outline" onclick="closePracticeModal()">End Practice</button>
        </div>
    `;

    updatePracticeStats();
}

function startMixedSection(section) {
    // This would load a mini-practice session for that section
    alert(`Starting ${section} practice section...`);
}

// Show practice results
function showPracticeResults() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    const minutes = Math.floor(practiceTimer / 60);
    const seconds = practiceTimer % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    const content = document.getElementById('practiceContent');
    content.innerHTML = `
        <div class="practice-results">
            <h3>🎉 Practice Session Complete!</h3>

            <div class="results-stats">
                <div class="result-item">
                    <span class="result-label">Final Score:</span>
                    <span class="result-value">${practiceScore} points</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Time Spent:</span>
                    <span class="result-value">${timeString}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Questions Completed:</span>
                    <span class="result-value">${currentQuestionIndex + 1}</span>
                </div>
            </div>

            <div class="results-feedback">
                <h4>Performance Feedback:</h4>
                <p>${getPerformanceFeedback(practiceScore)}</p>
            </div>

            <div class="results-actions">
                <button class="btn btn-primary" onclick="savePracticeSession()">Save Results</button>
                <button class="btn btn-outline" onclick="practiceAgain()">Practice Again</button>
                <button class="btn btn-outline" onclick="closePracticeModal()">Close</button>
            </div>
        </div>
    `;
}

function getPerformanceFeedback(score) {
    if (score >= 80) return "Excellent work! You're mastering these concepts. Keep up the great practice!";
    if (score >= 60) return "Good job! You're making solid progress. A bit more practice will help you excel.";
    if (score >= 40) return "You're on the right track! Focus on the areas where you struggled and try again.";
    return "Keep practicing! Every expert was once a beginner. Review the material and try again.";
}

function savePracticeSession() {
    alert('Practice session saved! Your progress has been recorded.');
    closePracticeModal();
}

function practiceAgain() {
    startPractice(currentPractice);
}

function reviewSession(sessionId) {
    const session = recentSessions.find(s => s.id === sessionId);
    if (session) {
        alert(`Session: ${session.type}\nScore: ${session.score}%\nTime: ${session.timeSpent}\nDate: ${session.date}\nCorrect: ${session.correct}/${session.questions}`);
    }
}

function viewAllSessions() {
    alert('Full practice history feature coming soon! This will show all your past practice sessions with detailed analytics.');
}