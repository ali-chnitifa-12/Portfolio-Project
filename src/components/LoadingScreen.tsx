"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [typedText, setTypedText] = useState("");
    const loadingRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const fullMessage = "Hello, I'm Ali. I am a full-stack developer specialized in React, Laravel & REST APIs.";

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < fullMessage.length) {
                setTypedText(fullMessage.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
                // Pause slightly after typing completes then fade out loading screen
                setTimeout(() => {
                    if (loadingRef.current) {
                        gsap.to(loadingRef.current, {
                            yPercent: -100,
                            duration: 0.9,
                            ease: "power4.inOut",
                            onComplete: () => setIsLoading(false),
                        });
                    } else {
                        setIsLoading(false);
                    }
                }, 900);
            }
        }, 35);

        return () => clearInterval(typingInterval);
    }, []);

    if (!isLoading) return null;

    return (
        <div 
            ref={loadingRef} 
            className="fixed inset-0 z-[99999] bg-[#030712] flex flex-col items-center justify-center px-6 overflow-hidden select-none"
        >
            {/* Background glowing ambient light */}
            <div className="absolute w-96 h-96 bg-accent-cyan/20 rounded-full blur-[120px] pointer-events-none" />

            <div ref={containerRef} className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
                {/* Glowing Hex/Cyber Ring */}
                <div className="relative mb-8 w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-cyan/60 animate-[spin_8s_linear_infinite]" />
                    <div className="absolute inset-2 rounded-full border border-accent-purple/50 animate-[spin_4s_linear_infinite_reverse]" />
                    <span className="text-xl font-bold font-mono gradient-text">&lt;A/&gt;</span>
                </div>

                {/* Cyber Terminal Box displaying the intro typewriter */}
                <div className="w-full glass-strong rounded-2xl border border-accent-cyan/40 p-6 shadow-[0_0_50px_rgba(14,165,233,0.2)] text-left relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10 font-mono text-xs text-accent-cyan">
                        <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                        <span className="ml-2 text-gray-400">ali_chnitifa_intro.sh</span>
                    </div>

                    <p className="text-white text-base sm:text-xl font-mono leading-relaxed min-h-[4rem]">
                        <span className="text-accent-purple font-bold mr-2">&gt;</span>
                        <span className="text-cyan-200 drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]">{typedText}</span>
                        <span className="inline-block w-2.5 h-6 bg-accent-cyan ml-1 animate-pulse align-middle" />
                    </p>
                </div>

                <p className="text-gray-500 text-xs font-mono tracking-[0.3em] uppercase mt-6 animate-pulse">
                    LOADING PORTFOLIO...
                </p>
            </div>

            {/* Floating Cyber Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-accent-cyan/40 animate-pulse"
                        style={{
                            top: `${(i * 7 + 12) % 100}%`,
                            left: `${(i * 11 + 5) % 100}%`,
                            animationDuration: `${1.5 + (i % 3)}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

