// ===========================
// CHATBOT - Resume-Focused AI Assistant
// Powered by Gemini API
// ===========================

const GEMINI_API_KEY = 'AIzaSyBZ5IxVJMZjBWW-bNkjszED7HL3TiEsdHg';
const GEMINI_MODEL = 'gemini-2.5-flash';

// ===========================
// 📄 PASTE YOUR RESUME CONTENT BELOW
// ===========================
const RESUME_CONTENT = `
=== RUHANI GERA ===
AI Engineer & Data Science Enthusiast
📍 Chandigarh, India
📧 ruhanigera7@gmail.com
🔗 GitHub: https://github.com/CodeWithRuhani
🔗 LinkedIn: https://www.linkedin.com/in/ruhani-gera-851454300/
🌐 Portfolio: https://ruhaniportfolio.netlify.app

=== PROFESSIONAL SUMMARY ===
AI Engineer with hands-on experience in building LLM-powered applications, RAG systems, autonomous AI agents, and scalable backend APIs, Automation Workflows . Skilled in Python, TypeScript, FastAPI, LangChain, OpenAI SDK, and Generative AI technologies. Experienced in developing production-grade AI workflows, semantic search systems, and AI-powered automation solutions. Passionate about solving real-world problems through intelligent systems and continuously improving expertise in AI engineering, machine learning, and software development.

SKILLS
Programming

Python, TypeScript, JavaScript, SQL, HTML

AI/ML & Generative AI

Machine Learning, Deep Learning, NLP, Generative AI, LLMs, RAG Systems, AI Agents, Semantic Search, Embeddings, Autonomous Agents

Frameworks & Libraries

FastAPI, Flask, Streamlit, LangChain, TensorFlow, Scikit-learn, Hugging Face Transformers, NumPy, Pandas, Matplotlib, Seaborn

Computer Vision

OpenCV, MediaPipe, Tesseract OCR

Databases & Vector Stores

SQL, MongoDB, FAISS, ChromaDB, Pinecone

Tools & Platforms

Git, GitHub, VS Code, PyCharm, Jupyter Notebook, Google Colab, Power BI, Cursor

APIs & SDKs

OpenAI SDK, Gemini API

Soft Skills

Strong Communication, Public Speaking, Teamwork, Leadership, Active Listening

EXPERIENCE

42Works — AI Engineer

April 2026 – Present | Mohali, Punjab, India

Collaborated with engineering teams to optimize AI inference pipelines and backend APIs.
Built AI automation workflows and integrated OpenAI-based solutions into business applications.
Worked on vector databases, embeddings workflows, semantic search, and contextual AI memory systems.
Developed scalable AI-powered applications using LLMs, RAG pipelines, and FastAPI backend systems.

Relinns Technologies — AI Engineer Intern
Nov 2025 – March 2026 | Mohali, Punjab, India

Designed and developed autonomous AI agents capable of multi-step reasoning and complex task execution using OpenAI SDK with TypeScript and Node.js.
Built production-grade agentic pipelines with tool usage, dynamic memory management, and context orchestration.
Integrated RAG systems with LangChain to improve contextual retrieval and response accuracy.
Worked with FastAPI, Git, LangChain, Python, and Node.js in production-oriented AI workflows.

PROJECTS 

1. AI Voice Interviewer
Developed an AI-driven voice-based interview platform that analyzes resumes and conducts personalized interviews dynamically.
Generated context-aware interview questions using Gemini API and converted them into voice interactions using TTS.
Implemented semantic document retrieval using FAISS and orchestrated LLM workflows with LangChain.
Integrated OCR-based resume parsing using Tesseract OCR.
Tech Stack: Python, Streamlit, Gemini API, LangChain, FAISS, PyMuPDF, gTTS

2. Hand-Gesture Based Calculator
Built a real-time hand-gesture-controlled calculator using OpenCV and MediaPipe.
Enabled gesture recognition and seamless interaction through computer vision tracking.
Developed a lightweight GUI for enhanced user experience.
Tech Stack: Python, OpenCV, MediaPipe, NumPy, PyAutoGUI

EDUCATION
B.Sc. (Hons.) Artificial Intelligence & Data Science

Sri Guru Teg Bahadur Khalsa College, Sri Anandpur Sahib, Punjab
2023 – 2026

CGPA: 8.80
Ambassador, New Education Policy
12th Standard

Govt. Girls Senior Secondary School, Nangal, Punjab
2022 – 2023

10th Standard

Govt. Girls Senior Secondary School, Nangal, Punjab
2020 – 2021

CERTIFICATIONS
Artificial Intelligence Fundamentals — IBM
Web Development Fundamentals — IBM
Career Management Essentials — IBM

ACHIEVEMENTS
Built production-grade AI agents and RAG-based applications during internship and full-time AI engineering roles.
Developed real-world AI automation workflows integrating OpenAI and Generative AI technologies.
Maintained strong academic performance with an 8.80 CGPA in Artificial Intelligence & Data Science.

=== LANGUAGES ===
English, Hindi, Punjabi
`;

// ===========================
// 🤖 SYSTEM INSTRUCTION
// ===========================
const SYSTEM_CONTEXT = `
You are Ruhani Gera's personal AI portfolio assistant. Your name is "Ruhani's Assistant".

🎯 YOUR ONLY JOB:
Answer questions about Ruhani using ONLY the resume information provided below. Be warm, friendly, and conversational — like a helpful receptionist who knows Ruhani well.

📄 RUHANI'S RESUME:
${RESUME_CONTENT}

✅ WHAT YOU CAN DO:
- Answer questions about Ruhani's skills, projects, experience, education, certifications, achievements
- Share her contact details (email, GitHub, LinkedIn) when asked
- Briefly explain her background and what she's passionate about
- Help visitors understand if she's a good fit for a role

❌ WHAT YOU MUST NOT DO:
- NEVER answer questions unrelated to Ruhani (no general knowledge, coding help, jokes, weather, math, opinions on other topics, etc.)
- NEVER make up information not in the resume
- NEVER pretend to be Ruhani herself — you are her assistant
- NEVER answer "what do you think about..." style questions on external topics

🚫 WHEN A QUESTION IS OFF-TOPIC OR NOT IN THE RESUME:
Politely decline and redirect. Vary your wording so it doesn't sound robotic. Use phrases like these (mix it up naturally):

Example 1: "Sorry , I can't answer that! 😊 I'm here just to chat about Ruhani's work and experience. But if you'd like to connect with her directly, you can reach out on LinkedIn or drop a message through the contact form below — she'd love to hear from you!"

Example 2: "Hmm, I'd rather not guess on that one! I'm built specifically to share info about Ruhani. For anything else, the best way is to message her directly — scroll down to the contact form, or find her on LinkedIn. She usually responds within a day! ✨"

Example 3: "That's a bit beyond my scope! 😊 I stick to topics about Ruhani's portfolio, projects, and skills. If you have a specific question for her, the contact form below is the quickest way — or feel free to connect on LinkedIn!"

📝 RESPONSE STYLE:
- Keep replies short and warm (2-4 sentences usually)
- Use occasional emojis to feel friendly, not overdone
- Speak in third person about Ruhani ("She has experience in...", "Ruhani's projects include...")
- End with a small invitation to ask more, when natural ("Want to know about her projects too?")
- For contact questions, mention BOTH LinkedIn AND the contact form on the page

🎨 TONE: Friendly, professional, warm, slightly enthusiastic about Ruhani's work — like a proud teammate.
`;

// ===========================
// DOM ELEMENTS
// ===========================
const toggle = document.getElementById('chatbot-toggle');
const chatWindow = document.getElementById('chatbot-window');
const closeBtn = document.getElementById('chatbot-close');
const form = document.getElementById('chatbot-form');
const input = document.getElementById('chatbot-input');
const messagesContainer = document.getElementById('chatbot-messages');
const suggestionChips = document.querySelectorAll('.suggestion-chip');

let conversationHistory = [];
let isWaitingForResponse = false;

// ===========================
// EVENT LISTENERS
// ===========================
toggle.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) {
        input.focus();
    }
});

closeBtn.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
});

suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
        if (isWaitingForResponse) return;
        sendMessage(chip.textContent);
        document.getElementById('chatbot-suggestions').style.display = 'none';
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isWaitingForResponse) return;
    const message = input.value.trim();
    if (!message) return;
    sendMessage(message);
    input.value = '';
});

// ===========================
// CORE FUNCTIONS
// ===========================
async function sendMessage(userMessage) {
    isWaitingForResponse = true;
    input.disabled = true;
    document.getElementById('chatbot-send').disabled = true;

    addMessage(userMessage, 'user');
    const typingEl = showTyping();

    try {
        const reply = await getGeminiResponse(userMessage);
        typingEl.remove();
        addMessage(reply, 'bot');
    } catch (error) {
        typingEl.remove();
        console.error('Chatbot error:', error);
        addMessage(
            "Oops, something went wrong on my end! 😅 You can reach Ruhani directly at ruhanigera7@gmail.com or use the contact form below.",
            'bot'
        );
    } finally {
        isWaitingForResponse = false;
        input.disabled = false;
        document.getElementById('chatbot-send').disabled = false;
        input.focus();
    }
}

function addMessage(text, sender) {
    const msgEl = document.createElement('div');
    msgEl.className = sender === 'user' ? 'user-message' : 'bot-message';

    if (sender === 'bot') {
        const p = document.createElement('p');
        // Render line breaks naturally
        p.innerHTML = text.replace(/\n/g, '<br>');
        msgEl.appendChild(p);
    } else {
        msgEl.textContent = text;
    }

    messagesContainer.appendChild(msgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping() {
    const el = document.createElement('div');
    el.className = 'typing-indicator';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(el);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return el;
}

async function getGeminiResponse(userMessage) {
    conversationHistory.push({
        role: 'user',
        parts: [{ text: userMessage }]
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            system_instruction: {
                parts: [{ text: SYSTEM_CONTEXT }]
            },
            contents: conversationHistory,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 250,
                topP: 0.9
            }
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Gemini API error:', errorData);
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
        || "Hmm, I didn't quite catch that. Could you rephrase? 😊";

    conversationHistory.push({
        role: 'model',
        parts: [{ text: reply }]
    });

    // Keep conversation history manageable
    if (conversationHistory.length > 20) {
        conversationHistory = conversationHistory.slice(-20);
    }

    return reply;
}

