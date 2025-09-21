// Games JavaScript - Edunabha Gamified Learning Platform

// Global game variables
let currentGame = null;
let gameScore = 0;
let gameTimer = 0;
let timerInterval = null;
let currentQuestionIndex = 0;
let gameData = {};

// Game questions and data
const gameQuestions = {
    math: [
        {
            question: "What is the value of π (pi) to 2 decimal places?",
            options: ["3.14", "3.15", "3.16", "3.13"],
            correct: 0,
            points: 10
        },
        {
            question: "Solve: 2x + 5 = 17. What is x?",
            options: ["6", "7", "8", "5"],
            correct: 0,
            points: 15
        },
        {
            question: "What is the area of a circle with radius 5 units? (Use π = 3.14)",
            options: ["78.5", "31.4", "15.7", "25.0"],
            correct: 0,
            points: 20
        },
        {
            question: "What is the square root of 144?",
            options: ["12", "14", "16", "10"],
            correct: 0,
            points: 10
        },
        {
            question: "In a right triangle, if one angle is 30°, what is the other acute angle?",
            options: ["60°", "45°", "90°", "30°"],
            correct: 0,
            points: 15
        }
    ],
    word: [
        {
            clue: "A large body of water surrounded by land",
            answer: "LAKE",
            position: { row: 0, col: 0, direction: "across" },
            points: 20
        },
        {
            clue: "The study of plants",
            answer: "BOTANY",
            position: { row: 1, col: 0, direction: "across" },
            points: 25
        },
        {
            clue: "A person who writes books",
            answer: "AUTHOR",
            position: { row: 2, col: 0, direction: "across" },
            points: 20
        },
        {
            clue: "The largest planet in our solar system",
            answer: "JUPITER",
            position: { row: 3, col: 0, direction: "across" },
            points: 25
        },
        {
            clue: "To make something clean",
            answer: "WASH",
            position: { row: 0, col: 5, direction: "down" },
            points: 15
        }
    ],
    memory: [
        { id: 1, content: "Photosynthesis", pair: "Process where plants make food" },
        { id: 2, content: "Process where plants make food", pair: "Photosynthesis" },
        { id: 3, content: "H2O", pair: "Chemical formula for water" },
        { id: 4, content: "Chemical formula for water", pair: "H2O" },
        { id: 5, content: "Newton", pair: "Discovered gravity" },
        { id: 6, content: "Discovered gravity", pair: "Newton" },
        { id: 7, content: "DNA", pair: "Carries genetic information" },
        { id: 8, content: "Carries genetic information", pair: "DNA" }
    ],
    trivia: [
        {
            question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            correct: 1,
            subject: "Science",
            points: 15
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correct: 1,
            subject: "English",
            points: 15
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correct: 2,
            subject: "Science",
            points: 20
        },
        {
            question: "In which year did India gain independence?",
            options: ["1945", "1947", "1950", "1948"],
            correct: 1,
            subject: "History",
            points: 15
        },
        {
            question: "What is the largest organ in the human body?",
            options: ["Heart", "Brain", "Liver", "Skin"],
            correct: 3,
            subject: "Science",
            points: 20
        }
    ]
};

// Leaderboard data (stored in localStorage)
let leaderboard = JSON.parse(localStorage.getItem('edunabha_leaderboard')) || [];

// Initialize games page
document.addEventListener('DOMContentLoaded', function() {
    loadLeaderboard();
});

// Start a game
function startGame(gameType) {
    currentGame = gameType;
    gameScore = 0;
    gameTimer = 0;
    currentQuestionIndex = 0;

    // Reset game data
    gameData = {
        flippedCards: [],
        matchedPairs: 0,
        puzzleGrid: createEmptyGrid(5, 10),
        answers: {}
    };

    // Show game modal
    document.getElementById('gameModal').classList.add('active');

    // Set game title
    const titles = {
        math: 'Math Quiz Challenge',
        word: 'Word Puzzle Quest',
        memory: 'Science Memory Match',
        trivia: 'Knowledge Trivia'
    };
    document.getElementById('gameTitle').textContent = titles[gameType];

    // Start timer
    startTimer();

    // Load first question/content
    loadGameContent();
}

// Close game modal
function closeGame() {
    document.getElementById('gameModal').classList.remove('active');
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    currentGame = null;
}

// Start game timer
function startTimer() {
    timerInterval = setInterval(() => {
        gameTimer++;
        updateGameStats();
    }, 1000);
}

// Update game statistics display
function updateGameStats() {
    const minutes = Math.floor(gameTimer / 60);
    const seconds = gameTimer % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Update timer and score display
    const statsBar = document.querySelector('.game-stats-bar');
    if (statsBar) {
        statsBar.innerHTML = `
            <div class="game-timer">⏱️ ${timeString}</div>
            <div class="game-score">🏆 ${gameScore} points</div>
        `;
    }
}

// Load game content based on current game
function loadGameContent() {
    const gameContent = document.getElementById('gameContent');

    switch (currentGame) {
        case 'math':
        case 'trivia':
            loadQuizGame();
            break;
        case 'word':
            loadWordPuzzle();
            break;
        case 'memory':
            loadMemoryGame();
            break;
    }
}

// Load quiz game (Math and Trivia)
function loadQuizGame() {
    const questions = gameQuestions[currentGame];
    const question = questions[currentQuestionIndex];

    const gameContent = document.getElementById('gameContent');
    gameContent.innerHTML = `
        <div class="game-stats-bar">
            <div class="game-timer">⏱️ 0:00</div>
            <div class="game-score">🏆 0 points</div>
        </div>

        <div class="game-question">
            <h3>${question.question}</h3>
        </div>

        <div class="game-options">
            ${question.options.map((option, index) => `
                <div class="game-option" onclick="selectAnswer(${index})">${option}</div>
            `).join('')}
        </div>

        <div class="game-controls">
            <button class="btn btn-outline" onclick="closeGame()">Quit Game</button>
        </div>
    `;

    updateGameStats();
}

// Select answer in quiz
function selectAnswer(selectedIndex) {
    const questions = gameQuestions[currentGame];
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.game-option');

    // Disable all options
    options.forEach(option => option.style.pointerEvents = 'none');

    // Show correct/incorrect
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        gameScore += question.points;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
    }

    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuizGame();
        } else {
            showGameResult();
        }
    }, 1500);
}

// Load word puzzle game
function loadWordPuzzle() {
    const gameContent = document.getElementById('gameContent');
    gameContent.innerHTML = `
        <div class="game-stats-bar">
            <div class="game-timer">⏱️ 0:00</div>
            <div class="game-score">🏆 0 points</div>
        </div>

        <div class="word-puzzle">
            <div class="puzzle-grid" id="puzzleGrid">
                ${createPuzzleGrid()}
            </div>

            <div class="puzzle-clues">
                <div class="clue-section">
                    <h4>Across</h4>
                    <div class="clue-list" id="acrossClues">
                        ${gameQuestions.word.filter(q => q.position.direction === 'across')
                            .map((q, i) => `<div class="clue-item">${i + 1}. ${q.clue}</div>`).join('')}
                    </div>
                </div>

                <div class="clue-section">
                    <h4>Down</h4>
                    <div class="clue-list" id="downClues">
                        ${gameQuestions.word.filter(q => q.position.direction === 'down')
                            .map((q, i) => `<div class="clue-item">${i + 1}. ${q.clue}</div>`).join('')}
                    </div>
                </div>
            </div>
        </div>

        <div class="game-controls">
            <button class="btn btn-primary" onclick="checkWordPuzzle()">Check Answers</button>
            <button class="btn btn-outline" onclick="closeGame()">Quit Game</button>
        </div>
    `;

    updateGameStats();
}

// Create puzzle grid
function createPuzzleGrid() {
    const grid = createEmptyGrid(5, 10);
    let html = '';

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 10; col++) {
            const cellId = `cell-${row}-${col}`;
            const isActive = grid[row][col] !== null;
            html += `<div class="puzzle-cell ${isActive ? '' : 'inactive'}" id="${cellId}" ${
                isActive ? `onclick="selectCell(${row}, ${col})"` : ''
            }>${grid[row][col] || ''}</div>`;
        }
    }

    return html;
}

// Create empty grid for word puzzle
function createEmptyGrid(rows, cols) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = null;
        }
    }

    // Fill with word positions
    gameQuestions.word.forEach(word => {
        const { row, col, direction } = word.position;
        for (let i = 0; i < word.answer.length; i++) {
            if (direction === 'across') {
                grid[row][col + i] = '';
            } else {
                grid[row + i][col] = '';
            }
        }
    });

    return grid;
}

// Select cell in word puzzle
function selectCell(row, col) {
    // Remove previous selection
    document.querySelectorAll('.puzzle-cell').forEach(cell => cell.classList.remove('selected'));
    document.getElementById(`cell-${row}-${col}`).classList.add('selected');

    // Focus input (you could add an input field for typing)
}

// Check word puzzle answers
function checkWordPuzzle() {
    let correctWords = 0;
    gameQuestions.word.forEach(word => {
        const { row, col, direction, answer } = word.position;
        let isCorrect = true;

        for (let i = 0; i < answer.length; i++) {
            let cellValue = '';
            if (direction === 'across') {
                cellValue = gameData.puzzleGrid[row][col + i] || '';
            } else {
                cellValue = gameData.puzzleGrid[row + i][col] || '';
            }

            if (cellValue.toUpperCase() !== answer[i]) {
                isCorrect = false;
                break;
            }
        }

        if (isCorrect) {
            correctWords++;
            gameScore += word.points;
        }
    });

    showGameResult();
}

// Load memory match game
function loadMemoryGame() {
    const cards = [...gameQuestions.memory];
    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    const gameContent = document.getElementById('gameContent');
    gameContent.innerHTML = `
        <div class="game-stats-bar">
            <div class="game-timer">⏱️ 0:00</div>
            <div class="game-score">🏆 0 points</div>
        </div>

        <div class="game-header">
            <h3>Match the scientific terms with their descriptions!</h3>
        </div>

        <div class="memory-grid">
            ${cards.map((card, index) => `
                <div class="memory-card" onclick="flipCard(${index})" data-id="${card.id}" data-content="${card.content}">
                    <span class="card-front">?</span>
                    <span class="card-back">${card.content}</span>
                </div>
            `).join('')}
        </div>

        <div class="game-controls">
            <button class="btn btn-outline" onclick="closeGame()">Quit Game</button>
        </div>
    `;

    updateGameStats();
}

// Flip card in memory game
function flipCard(index) {
    const card = document.querySelectorAll('.memory-card')[index];

    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('flipped');
    gameData.flippedCards.push({ index, content: card.dataset.content, id: card.dataset.id });

    if (gameData.flippedCards.length === 2) {
        setTimeout(checkMemoryMatch, 1000);
    }
}

// Check for match in memory game
function checkMemoryMatch() {
    const [card1, card2] = gameData.flippedCards;
    const cards = document.querySelectorAll('.memory-card');

    if (card1.id !== card2.id && card1.content === gameQuestions.memory.find(c => c.id == card2.id)?.pair) {
        // Match found
        cards[card1.index].classList.add('matched');
        cards[card2.index].classList.add('matched');
        gameData.matchedPairs++;
        gameScore += 50;

        if (gameData.matchedPairs === gameQuestions.memory.length / 2) {
            setTimeout(showGameResult, 1000);
        }
    } else {
        // No match
        cards[card1.index].classList.remove('flipped');
        cards[card2.index].classList.remove('flipped');
    }

    gameData.flippedCards = [];
}

// Show game result
function showGameResult() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    const gameContent = document.getElementById('gameContent');
    gameContent.innerHTML = `
        <div class="game-result">
            <h3>🎉 Game Complete!</h3>
            <div class="score">${gameScore} points</div>
            <p>Time taken: ${Math.floor(gameTimer / 60)}:${(gameTimer % 60).toString().padStart(2, '0')}</p>
        </div>

        <div class="game-controls">
            <button class="btn btn-primary" onclick="saveScore()">Save Score</button>
            <button class="btn btn-outline" onclick="closeGame()">Close</button>
        </div>
    `;
}

// Save score to leaderboard
function saveScore() {
    const playerName = prompt('Enter your name for the leaderboard:') || 'Anonymous';
    const scoreEntry = {
        name: playerName,
        score: gameScore,
        game: currentGame,
        time: gameTimer,
        date: new Date().toISOString()
    };

    leaderboard.push(scoreEntry);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10); // Keep top 10

    localStorage.setItem('edunabha_leaderboard', JSON.stringify(leaderboard));
    loadLeaderboard();
    closeGame();
}

// Load and display leaderboard
function loadLeaderboard() {
    const leaderboardEl = document.getElementById('leaderboard');
    if (!leaderboardEl) return;

    if (leaderboard.length === 0) {
        leaderboardEl.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-muted);">No scores yet. Play a game to be the first!</p>';
        return;
    }

    leaderboardEl.innerHTML = leaderboard.slice(0, 5).map((entry, index) => `
        <div class="leaderboard-item ${index < 3 ? 'top-3' : ''}">
            <div class="player-info">
                <div class="player-rank rank-${index + 1}">${index + 1}</div>
                <div class="player-details">
                    <h4>${entry.name}</h4>
                    <p>${entry.game} • ${Math.floor(entry.time / 60)}:${(entry.time % 60).toString().padStart(2, '0')}</p>
                </div>
            </div>
            <div class="player-score">${entry.score}</div>
        </div>
    `).join('');
}

// Show full leaderboard
function showFullLeaderboard() {
    alert('Full leaderboard feature coming soon!');
}

// Utility functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}