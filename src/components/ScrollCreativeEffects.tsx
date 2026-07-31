"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const codeSnippets = [
    { title: "React Component", lang: "JSX", code: "const Developer = ({ name, stack }) => (\n  <Hero name={name}>\n    {stack.map(tech => <Badge key={tech}>{tech}</Badge>)}\n  </Hero>\n);" },
    { title: "Laravel REST Controller", lang: "PHP", code: "public function getProjects(Request $req) {\n    return Project::where('status', 'live')\n        ->with(['tech_stack', 'metrics'])\n        ->jsonResponse(200);\n}" },
    { title: "GSAP 3D ScrollTrigger", lang: "TS", code: "gsap.to('.cyber-card', {\n  rotateY: 360,\n  z: 200,\n  scrollTrigger: { scrub: 1, trigger: '#section' }\n});" }
];

export default function ScrollCreativeEffects() {
    const [currentSnippet, setCurrentSnippet] = useState(0);
    const [snippetText, setSnippetText] = useState("");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrolledSection, setScrolledSection] = useState("Hero");

    // Interactive Code Terminal Stream floating widget
    useEffect(() => {
        let isCancelled = false;
        let charIndex = 0;
        const targetText = codeSnippets[currentSnippet].code;
        setSnippetText("");

        const interval = setInterval(() => {
            if (isCancelled) return;
            if (charIndex <= targetText.length) {
                setSnippetText(targetText.slice(0, charIndex));
                charIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    if (!isCancelled) {
                        setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
                    }
                }, 3000);
            }
        }, 35);

        return () => {
            isCancelled = true;
            clearInterval(interval);
        };
    }, [currentSnippet]);

    // Track scroll position & current active section
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            setScrollProgress(Math.round(progress));

            const sections = ["hero", "about", "skills", "services", "projects", "experience", "resume", "contact"];
            for (const sec of sections) {
                const el = document.getElementById(sec);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        setScrolledSection(sec.toUpperCase());
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* 1. Creative HUD Matrix Radar & Scroll Telemetry (Fixed Bottom Right) */}
            <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-4 glass-strong p-3.5 rounded-2xl border border-accent-cyan/40 shadow-[0_0_30px_rgba(14,165,233,0.25)] pointer-events-none backdrop-blur-xl transition-all duration-300">
                
                {/* Holographic Radar Ring */}
                <div className="relative w-11 h-11 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-accent-cyan/40 animate-[spin_6s_linear_infinite]" />
                    <div className="absolute inset-1 rounded-full border border-dashed border-accent-purple/50 animate-[spin_10s_linear_infinite_reverse]" />
                    <div className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
                    <span className="text-[9px] font-mono font-bold text-cyan-200 z-10">{scrollProgress}%</span>
                </div>

                {/* Status telemetry readout */}
                <div className="text-left font-mono">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] text-gray-400">ZONE:</span>
                        <span className="text-xs text-accent-cyan font-bold tracking-wider">{scrolledSection}</span>
                    </div>
                    <div className="text-[9px] text-gray-400 mt-0.5">
                        FPS: <span className="text-emerald-400 font-bold">60</span> | SCROLL_SYNC: <span className="text-accent-purple font-bold">OK</span>
                    </div>
                </div>
            </div>

            {/* 2. Floating Cyber Code Stream (Fixed Left Side on Scroll) */}
            <div className="fixed top-1/3 left-6 z-40 hidden lg:block w-72 glass-strong p-4 rounded-2xl border border-accent-purple/40 shadow-[0_0_35px_rgba(129,140,248,0.2)] font-mono text-xs backdrop-blur-xl">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-accent-purple font-semibold">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent-purple animate-ping" />
                        <span>LIVE STREAM</span>
                    </span>
                    <span className="text-gray-400 px-2 py-0.5 bg-white/5 rounded text-[9px]">{codeSnippets[currentSnippet].lang}</span>
                </div>

                <p className="text-[10px] text-gray-400 mb-1">{codeSnippets[currentSnippet].title}:</p>
                <pre className="text-cyan-200 text-[10px] leading-relaxed whitespace-pre-wrap font-mono min-h-[4.5rem]">
                    {snippetText}
                    <span className="inline-block w-1.5 h-3 bg-accent-cyan ml-0.5 animate-pulse" />
                </pre>
            </div>
        </>
    );
}
