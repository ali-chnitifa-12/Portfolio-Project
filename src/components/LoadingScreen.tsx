"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const loadingRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsLoading(false),
        });

        tl.from(textRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
        })
            .to(textRef.current, {
                opacity: 0,
                y: -30,
                duration: 0.5,
                delay: 0.8,
                ease: "power3.in",
            })
            .to(loadingRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
            });
    }, []);

    if (!isLoading) return null;

    return (
        <div ref={loadingRef} className="loading-screen">
            {/* Animated ring */}
            <div className="loading-ring mb-8" />

            <div ref={textRef} className="text-center">
                <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-2">
                    &lt;Ali /&gt;
                </div>
                <p className="text-gray-500 text-sm tracking-[0.3em] uppercase">
                    Initializing Universe
                </p>
            </div>

            {/* Decorative stars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white/20 animate-pulse-glow"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
