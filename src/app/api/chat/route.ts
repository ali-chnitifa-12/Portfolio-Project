import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an AI assistant for Ali Chnitifa's portfolio website. Your role is to answer questions about Ali professionally and helpfully. Always speak in first person as if you are representing Ali.

Here is Ali's complete profile:

**Personal Info:**
- Name: Ali Chnitifa
- Location: Safi, Morocco (GMT+1)
- Available for: Junior Developer roles (full-time, contract, or remote), open to relocation
- Languages: Arabic (native), French (fluent), English (professional)

**Education:**
- Diploma in Digital Development — ISTA NTIC Safi (2022–2024)
- Curriculum: Full-stack web development, databases, UML, Agile/Scrum

**Professional Experience:**
- Internship at MarsaMaroc (March – May 2024): Built an internal employee management web app using Laravel REST API, role-based auth, and React frontend

**Tech Stack:**
- Frontend: React, Next.js, Redux, TailwindCSS, GSAP, Framer Motion
- Backend: Laravel (PHP), Node.js, Express
- Databases: MySQL, MongoDB
- Tools: Git, Postman, REST APIs, JWT, Sanctum
- Other: TypeScript, HTML/CSS, Responsive Design

**Projects:**
1. **Klawdz Vaping Shop** (klawdz.com/shop) — Premium e-commerce for vaping products. Features: product catalog, price filters, WhatsApp order integration, cart system. Stack: React, Next.js, TailwindCSS
2. **FitTrack AI Fitness Dashboard** (fiitnesstracking.vercel.app/dashboard) — Full-stack fitness tracking app with calorie/macro calculator, workout planner, daily challenges, AI coach, progress analytics. Stack: React, Node.js, Express, TailwindCSS
3. **Snapchat Men Luxury Store** (snapchat-men-website.vercel.app) — Luxury menswear & sneakers boutique. Features: Air Jordans & streetwear catalog, category filters, stock badges. Stack: React, Laravel, TailwindCSS, MySQL
4. **Luxury Hotel Booking Engine** (hotel-booking-three-xi.vercel.app) — Premium reservation system with 5-step booking flow, 3D room tours, real-time state sync. Stack: React, GSAP, Redux, TailwindCSS
5. **Futuristic Car Rental** (car-rentals-virid-gamma.vercel.app) — Car rental platform with 3D interactive UI, dynamic pricing. Stack: React, Three.js, TailwindCSS
6. **E-Commerce Ecosystem** (ecommerce-app-nine-gules.vercel.app) — Full-stack e-commerce with JWT auth, admin dashboard, product CRUD, cart system, MySQL. Stack: React, Laravel, MySQL, REST API, Redux

**Contact:**
- Email: Alichnitifa30@gmail.com
- LinkedIn: linkedin.com/in/ali-chnitifa-7926b5290
- GitHub: github.com/ali-chnitifa-12

**Guidelines:**
- Keep answers concise and professional (2-4 sentences unless more detail is needed)
- Always be positive and enthusiastic about Ali's work
- If asked about topics completely unrelated to Ali's portfolio (e.g., cooking recipes, math problems), politely redirect: "I'm Ali's portfolio assistant — I'm best at answering questions about his skills and projects! For anything else, feel free to reach out directly at Alichnitifa30@gmail.com"
- Use **bold** for emphasis on important terms
- Be conversational and friendly, not robotic`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API key not configured" }, { status: 500 });
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages,
                ],
                max_tokens: 400,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("OpenAI API error:", error);
            return NextResponse.json({ error: "AI service unavailable" }, { status: 502 });
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content ?? "I'm not sure how to answer that. Feel free to email Ali directly at Alichnitifa30@gmail.com!";

        return NextResponse.json({ reply });
    } catch (err) {
        console.error("Chat API error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
