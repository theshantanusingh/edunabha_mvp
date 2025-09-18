// Quiz functionality
class QuizSystem {
    constructor() {
        this.mockQuizzes = {
            math: {
                title: 'Mathematics',
                icon: '📐',
                color: 'math',
                quizzes: [
                    {
                        id: 'math-quadratic',
                        title: 'Quadratic Equations',
                        questions: 10,
                        time: '15 min',
                        difficulty: 'easy',
                        data: {
                            title: 'Quadratic Equations Quiz',
                            description: 'Mathematics • Class 10',
                            timeLimit: 15 * 60,
                            questions: [
                                {
                                    question: 'What is the general form of a quadratic equation?',
                                    options: {
                                        A: 'ax² + bx + c = 0',
                                        B: 'ax + b = 0',
                                        C: 'ax³ + bx² + cx + d = 0',
                                        D: 'ax² + b = 0'
                                    },
                                    correct: 'A'
                                },
                                {
                                    question: 'The discriminant of ax² + bx + c = 0 is:',
                                    options: {
                                        A: 'b² - 4ac',
                                        B: 'b² + 4ac', 
                                        C: '4ac - b²',
                                        D: 'b² - 2ac'
                                    },
                                    correct: 'A'
                                },
                                {
                                    question: 'If discriminant = 0, the equation has:',
                                    options: {
                                        A: 'No real roots',
                                        B: 'Two distinct real roots',
                                        C: 'Two equal real roots',
                                        D: 'Infinite roots'
                                    },
                                    correct: 'C'
                                }
                            ]
                        }
                    }
                ]
            },
            science: {
                title: 'Science',
                icon: '🔬',
                color: 'science',
                quizzes: [
                    {
                        id: 'science-light',
                        title: 'Light - Reflection & Refraction',
                        questions: 8,
                        time: '12 min',
                        difficulty: 'medium',
                        data: {
                            title: 'Light - Reflection & Refraction Quiz',
                            description: 'Science • Class 10',
                            timeLimit: 12 * 60,
                            questions: [
                                {
                                    question: 'The angle of incidence equals the angle of reflection. This is:',
                                    options: {
                                        A: 'First law of reflection',
                                        B: 'Second law of reflection',
                                        C: 'Snell\'s law',
                                        D: 'Law of refraction'
                                    },
                                    correct: 'A'
                                },
                                {
                                    question: 'Which is used to make a periscope?',
                                    options: {
                                        A: 'Concave mirror',
                                        B: 'Convex mirror',
                                        C: 'Plane mirror',
                                        D: 'Concave lens'
                                    },
                                    correct: 'C'
                                }
                            ]
                        }
                    }
                ]
            },
            english: {
                title: 'English',
                icon: '📝',
                color: 'english',
                quizzes: [
                    {
                        id: 'english-grammar',
                        title: 'Grammar Basics',
                        questions: 15,
                        time: '20 min',
                        difficulty: 'easy',
                        data: {
                            title: 'English Grammar Quiz',
                            description: 'English • Class 10',
                            timeLimit: 20 * 60,
                            questions: [
                                {
                                    question: 'Choose the correct sentence:',
                                    options: {
                                        A: 'He don\'t like apples',
                                        B: 'He doesn\'t like apples',
                                        C: 'He not like apples',
                                        D: 'He doesn\'t likes apples'
                                    },
                                    correct: 'B'
                                }
                            ]
                        }
                    }
                ]
            }
        };
        
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.timer = null;
        this.startTime = null;
        
        this.init();
    }
    
    init() {
        this.loadQuizCategories();
        this.initQuizButtons();
    }
    
    loadQuizCategories() {
        const container = document.getElementById('quizCategories');
        if (!container) return;
        
        container.innerHTML = Object.entries(this.mockQuizzes).map(([subject, data]) => `
            <div class="quiz-category">
                <div class="category-header">
                    <div class="category-icon ${data.color}">${data.icon}</div>
                    <h3>${data.title}</h3>
                </div>
                
                <div class="quiz-list">
                    ${data.quizzes.map(quiz => `
                        <div class="quiz-item" onclick="startQuiz('${quiz.id}')">
                            <div class="quiz-info">
                                <h4>${quiz.title}</h4>
                                <p>${quiz.questions} questions • Class 10</p>
                            </div>
                            <div class="quiz-stats">
                                <span class="difficulty ${quiz.difficulty}">${quiz.difficulty}</span>
                                <span class="time">${quiz.time}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
    
    initQuizButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousQuestion());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
    }
    
    startQuiz(quizId) {
        // Find quiz data
        let quizData = null;
        for (const subject of Object.values(this.mockQuizzes)) {
            const quiz = subject.quizzes.find(q => q.id === quizId);
            if (quiz) {
                quizData = quiz.data;
                break;
            }
        }
        
        if (!quizData) {
            window.edunabhaApp.showNotification('Quiz not found!', 'error');
            return;
        }
        
        this.currentQuiz = quizData;
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(quizData.questions.length).fill(null);
        this.startTime = Date.now();
        
        // Show quiz interface
        document.getElementById('quizSelection').style.display = 'none';
        document.getElementById('quizInterface').style.display = 'block';
        
        this.loadQuizInterface();
        this.startTimer();
    }
    
    loadQuizInterface() {
        document.getElementById('quizTitle').textContent = this.currentQuiz.title;
        document.getElementById('quizDescription').textContent = this.currentQuiz.description;
        
        this.loadQuestion();
    }
    
    loadQuestion() {
        const question = this.currentQuiz.questions[this.currentQuestionIndex];
        const totalQuestions = this.currentQuiz.questions.length;
        
        // Update progress
        document.getElementById('questionProgress').textContent = `${this.currentQuestionIndex + 1}/${totalQuestions}`;
        document.getElementById('questionNumber').textContent = this.currentQuestionIndex + 1;
        document.getElementById('progressBar').style.width = `${((this.currentQuestionIndex + 1) / totalQuestions) * 100}%`;
        
        // Load question
        document.getElementById('questionText').textContent = question.question;
        
        // Load options
        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = Object.entries(question.options).map(([key, value]) => `
            <div class="option" data-value="${key}">
                <input type="radio" name="answer" value="${key}" id="option${key}" 
                       ${this.userAnswers[this.currentQuestionIndex] === key ? 'checked' : ''}>
                <label for="option${key}">${value}</label>
            </div>
        `).join('');
        
        // Add option click handlers
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', () => {
                const radio = option.querySelector('input[type="radio"]');
                radio.checked = true;
                this.userAnswers[this.currentQuestionIndex] = option.dataset.value;
                
                // Update UI
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
        
        // Update navigation buttons
        document.getElementById('prevBtn').style.display = this.currentQuestionIndex === 0 ? 'none' : 'block';
        document.getElementById('nextBtn').textContent = 
            this.currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next';
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
        } else {
            this.finishQuiz();
        }
    }
    
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.loadQuestion();
        }
    }
    
    startTimer() {
        let timeLeft = this.currentQuiz.timeLimit;
        
        this.timer = setInterval(() => {
            timeLeft--;
            
            if (timeLeft <= 0) {
                this.finishQuiz();
                return;
            }
            
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timer').textContent = 
                `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    finishQuiz() {
        clearInterval(this.timer);
        
        // Calculate results
        let correct = 0;
        this.currentQuiz.questions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correct) {
                correct++;
            }
        });
        
        const total = this.currentQuiz.questions.length;
        const percentage = Math.round((correct / total) * 100);
        const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
        const timeTakenStr = `${Math.floor(timeTaken / 60)}:${(timeTaken % 60).toString().padStart(2, '0')}`;
        
        // Show results
        document.getElementById('quizInterface').style.display = 'none';
        document.getElementById('quizResults').style.display = 'block';
        
        document.getElementById('scorePercentage').textContent = `${percentage}%`;
        document.getElementById('resultsMessage').textContent = 
            `Great job! You scored ${correct} out of ${total} questions correctly.`;
        document.getElementById('correctAnswers').textContent = correct;
        document.getElementById('incorrectAnswers').textContent = total - correct;
        document.getElementById('timeTaken').textContent = timeTakenStr;
    }
}

// Global Functions
function startQuiz(quizId) {
    window.quizSystem.startQuiz(quizId);
}

function retakeQuiz() {
    location.reload();
}

function backToSelection() {
    document.getElementById('quizSelection').style.display = 'block';
    document.getElementById('quizInterface').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quizCategories')) {
        window.quizSystem = new QuizSystem();
    }
});
