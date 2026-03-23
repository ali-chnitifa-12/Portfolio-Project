"use client";

import { useState, useEffect, useRef } from "react";

// =============================================
// KNOWLEDGE BASE — All of Ali's portfolio data
// =============================================
const knowledgeBase: { id: string; question: string; answer: string; tags: string[] }[] = [
    {
        id: "intro",
        question: "Who are you?",
        answer: "I'm Ali Chnitifa, a Junior Full-Stack Developer based in Morocco. I specialize in building robust web applications using React on the frontend and Laravel on the backend. I'm passionate about clean architecture and creating seamless user experiences.",
        tags: ["who", "name", "about", "yourself", "introduce"],
    },
    {
        id: "projects",
        question: "What projects have you built?",
        answer: "My flagship project is a full-stack **E-Commerce Ecosystem** built with React + Laravel + MySQL. It features JWT authentication, an admin dashboard with full product management, a real-time cart system, and a REST API I designed from scratch. I've also built a Luxury Hotel Booking Engine with a 5-step reservation flow, and a Car Rental platform with 3D interactive UI.",
        tags: ["project", "built", "work", "portfolio", "app", "application"],
    },
    {
        id: "ecommerce",
        question: "Tell me about your E-Commerce app",
        answer: "It's my most complete project. I built the entire backend in Laravel — including RESTful API endpoints, Eloquent models, and JWT-based authentication for secure login and registration. The React frontend handles state with Redux, displays product listings dynamically, includes a functioning cart system, and has a protected admin panel for product CRUD operations. The database is MySQL with a normalized schema I designed myself.",
        tags: ["ecommerce", "e-commerce", "shop", "store", "commerce", "cart", "shop"],
    },
    {
        id: "stack",
        question: "What technologies do you use?",
        answer: "My core stack is **React** (frontend) and **Laravel** (backend) with **MySQL** as my database. I'm also comfortable with Next.js, Node.js, Redux, TailwindCSS, REST APIs, and Git. For animations I use GSAP. I work with Postman for API testing and design systems with Figma.",
        tags: ["tech", "technologies", "stack", "use", "skills", "know", "languages", "tools"],
    },
    {
        id: "hire",
        question: "Why should we hire you?",
        answer: "Because I ship real things. I've built end-to-end full-stack applications independently — from designing the database schema to building the API and wiring up the React frontend. I move fast, I learn even faster, and I write clean, maintainable code. I'm not just looking for a job — I'm looking for a team where I can contribute and grow.",
        tags: ["hire", "why", "value", "choose", "pick", "good", "benefit"],
    },
    {
        id: "experience",
        question: "Do you have any professional experience?",
        answer: "I've been building full-stack applications independently throughout my studies. My most significant experience is my E-Commerce project which mirrors a real production environment — API design, auth, database modeling, and frontend state management all done solo. I'm currently available and actively looking for a Junior Developer role to join a professional team.",
        tags: ["experience", "professional", "work", "job", "internship", "worked"],
    },
    {
        id: "available",
        question: "Are you available? Open to work?",
        answer: "Yes, absolutely! I'm currently available for Junior Developer roles (full-time or contract) and selective freelance opportunities. I'm ready to start immediately and can adapt to both remote and on-site environments.",
        tags: ["available", "open", "hire", "looking", "work", "freelance", "remote"],
    },
    {
        id: "contact",
        question: "How can I contact you?",
        answer: "The easiest way is via email: **Alichnitifa30@gmail.com**. You can also connect with me on LinkedIn at linkedin.com/in/ali-chnitifa-7926b5290 or check out my code on GitHub at github.com/ali-chnitifa-12. I typically respond within a few hours.",
        tags: ["contact", "email", "reach", "linkedin", "github", "message", "talk"],
    },
    {
        id: "learning",
        question: "What are you currently learning?",
        answer: "Right now I'm deepening my knowledge in Cloud infrastructure (especially AWS basics), advanced Laravel patterns like repositories and service layers, and TypeScript for enterprise-grade React apps. I also spend time on system design concepts to think more architecturally about solutions.",
        tags: ["learn", "studying", "currently", "improving", "grow"],
    },
    {
        id: "cv",
        question: "Can I see your CV?",
        answer: "You can download my CV directly from the Hero section of this portfolio — there's a download button right there. It covers my full education, projects, and technical skills in a clean one-page format.",
        tags: ["cv", "resume", "download", "pdf"],
    },
];

const quickReplies = [
    "What projects have you built?",
    "What technologies do you use?",
    "Tell me about your E-Commerce app",
    "Why should we hire you?",
    "Are you available? Open to work?",
    "How can I contact you?",
];

interface Message {
    from: "user" | "bot";
    text: string;
    id: number;
}

function findAnswer(userInput: string): string {
    const lower = userInput.toLowerCase();
    
    // Find best matching entry
    let bestMatch: (typeof knowledgeBase)[0] | null = null;
    let bestScore = 0;

    for (const entry of knowledgeBase) {
        const score = entry.tags.reduce((acc, tag) => {
            return acc + (lower.includes(tag) ? 1 : 0);
        }, 0);
        if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
        }
    }

    if (bestMatch && bestScore > 0) return bestMatch.answer;
    
    return "That's a great question! I might not have a specific answer for that, but feel free to reach out directly at Alichnitifa30@gmail.com — I'd love to chat!";
}

// Convert **bold** markdown to HTML
function formatText(text: string): React.ReactNode[] {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
    });
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            from: "bot",
            text: "Hey! 👋 I'm Ali's AI assistant. Ask me anything about his skills, projects, or availability — or pick a quick question below.",
            id: 0,
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [hasNotification, setHasNotification] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const idRef = useRef(1);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Delay appearance for smoother page load
        const t = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setHasNotification(false);
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const sendMessage = (text: string) => {
        if (!text.trim() || isTyping) return;

        const userMsg: Message = { from: "user", text: text.trim(), id: idRef.current++ };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate natural typing delay
        const delay = 800 + Math.random() * 600;
        setTimeout(() => {
            const answer = findAnswer(text);
            const botMsg: Message = { from: "bot", text: answer, id: idRef.current++ };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, delay);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") sendMessage(input);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3">
            {/* Chat Window */}
            <div
                className={`transition-all duration-500 origin-bottom-right ${
                    isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-90 translate-y-4 pointer-events-none"
                }`}
                style={{ filter: isOpen ? "none" : "blur(4px)" }}
            >
                <div className="w-[340px] sm:w-[380px] h-[520px] flex flex-col rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(14,165,233,0.15)] overflow-hidden"
                    style={{ background: "linear-gradient(145deg, rgba(10,10,26,0.97), rgba(5,5,16,0.99))" }}>
                    
                    {/* Header */}
                    <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/3">
                        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-lg font-bold text-white shadow-[0_0_20px_rgba(14,165,233,0.4)] shrink-0">
                            A
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#05050f] animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-sm tracking-tight">Ali Chnitifa</p>
                            <p className="text-accent-cyan text-[10px] font-mono tracking-wider uppercase">AI Portfolio Assistant • Online</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-gray-400 hover:text-white shrink-0"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} gap-2`}
                            >
                                {msg.from === "bot" && (
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-xs font-bold text-white shrink-0 mt-1">
                                        A
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                        msg.from === "user"
                                            ? "bg-gradient-to-br from-accent-cyan to-accent-blue text-white rounded-br-sm"
                                            : "bg-white/7 text-gray-200 rounded-bl-sm border border-white/8"
                                    }`}
                                >
                                    {msg.from === "bot" ? formatText(msg.text) : msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-xs font-bold text-white shrink-0">
                                    A
                                </div>
                                <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/7 border border-white/8 flex gap-1.5 items-center">
                                    <span className="w-1.5 h-1.5 bg-accent-cyan/70 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-1.5 h-1.5 bg-accent-cyan/70 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-1.5 h-1.5 bg-accent-cyan/70 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}

                        {/* Quick Replies */}
                        {!isTyping && messages.length <= 1 && (
                            <div className="pt-2">
                                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2 pl-1">Quick questions</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickReplies.slice(0, 4).map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => sendMessage(q)}
                                            className="text-[11px] px-3 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan/20 transition-colors text-left"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!isTyping && messages.length > 1 && (
                            <div className="pt-1">
                                <div className="flex flex-wrap gap-1.5">
                                    {quickReplies.slice(0, 3).map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => sendMessage(q)}
                                            className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-white/10 bg-white/2">
                        <div className="flex gap-2 items-center">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan/50 focus:bg-white/8 transition-all"
                                disabled={isTyping}
                            />
                            <button
                                onClick={() => sendMessage(input)}
                                disabled={isTyping || !input.trim()}
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center shrink-0 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-purple shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:shadow-[0_0_50px_rgba(14,165,233,0.6)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
                aria-label="Open AI Chat"
            >
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-purple opacity-30 animate-ping" />
                
                {/* Icon */}
                <div className={`transition-all duration-300 ${isOpen ? "rotate-90 scale-90" : "rotate-0 scale-100"}`}>
                    {isOpen ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3C6.5 3 2 6.58 2 11c0 2.89 1.79 5.42 4.5 6.87-.5 1.5-1.7 2.8-1.72 2.83-.1.11-.12.27-.06.41.06.13.19.22.33.22.05 0 3.25-.5 5.32-2.12.53.07 1.08.12 1.63.12C17.5 19 22 15.42 22 11S17.5 3 12 3z" />
                        </svg>
                    )}
                </div>

                {/* Notification badge */}
                {hasNotification && !isOpen && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-pink rounded-full text-[9px] text-white font-bold flex items-center justify-center border-2 border-[#050510] animate-bounce">
                        1
                    </span>
                )}
            </button>
        </div>
    );
}
