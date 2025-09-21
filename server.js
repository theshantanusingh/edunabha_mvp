require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve pages directory for HTML files
app.use(express.static(path.join(__dirname, 'pages')));

// Routes for HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'dashboard.html'));
});

app.get('/courses.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'courses.html'));
});

app.get('/course-view.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'course-view.html'));
});

app.get('/practice.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'practice.html'));
});

app.get('/games.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'games.html'));
});

app.get('/ai.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'ai.html'));
});

app.get('/teacher.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'teacher.html'));
});

app.get('/continue-learning.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'continue-learning.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

// AI Chat endpoint
app.post('/api/ai-chat', async (req, res) => {
    try {
        const { question, subject, grade } = req.body;
        
        // Create educational context prompt
        const educationalPrompt = `You are an AI tutor for Indian students. 
        Student is in grade ${grade || '10'} studying ${subject || 'general'} subject.
        
        Guidelines:
        - Explain concepts clearly with examples
        - Use simple language appropriate for the grade level  
        - Provide step-by-step solutions for problems
        - Relate to Indian curriculum (CBSE/NCERT)
        - Be encouraging and supportive
        - If unsure, suggest asking teacher or checking textbook
        
        Student Question: ${question}`;
        
        // Get AI model
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        
        // Generate response
        const result = await model.generateContent(educationalPrompt);
        const response = await result.response;
        const answer = response.text();
        
        res.json({
            success: true,
            answer: answer,
            subject: subject,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({
            success: false,
            error: 'AI service temporarily unavailable. Please try again.',
            fallback: "I'm having trouble right now. Please ask your teacher or check your textbook for this topic."
        });
    }
});

// API endpoints for additional functionality
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Edunabha server is running' });
});

// Mock API for courses data
app.get('/api/courses', (req, res) => {
    // This would normally fetch from a database
    res.json({
        success: true,
        courses: [
            { id: 1, title: 'Mathematics', description: 'Complete math curriculum', lessons: 150 },
            { id: 2, title: 'Science', description: 'Physics, Chemistry, Biology', lessons: 120 },
            { id: 3, title: 'English', description: 'Grammar, literature, writing', lessons: 100 }
        ]
    });
});

// Mock API for user data
app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    // Mock user data
    res.json({
        success: true,
        user: {
            id: userId,
            name: 'Rajesh Kumar',
            grade: 10,
            progress: 85,
            avatar: 'R'
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Edunabha Full Application Server running on port ${PORT}`);
    console.log(`📱 Access your app at: http://localhost:${PORT}`);
    console.log(`🤖 AI features available at: http://localhost:${PORT}/api/ai-chat`);
});