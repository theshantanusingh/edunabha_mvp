const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`🚀 AI Backend running on port ${PORT}`);
});