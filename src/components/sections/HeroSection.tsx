
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Cyber Decrypt Effect Utility
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const nameRef = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const geometryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // --- 1. Advanced Cyber Decrypt Entrance ---
            const tl = gsap.timeline({ delay: 0.2 });

            const nameElement = nameRef.current;
            if (nameElement) {
                const originalText = nameElement.dataset.value || "Ali Chnitifa";
                let iterations = 0;

                const interval = setInterval(() => {
                    nameElement.innerText = originalText.split("")
                        .map((letter, index) => {
                            if (index < iterations) {
                                return originalText[index];
                            }
                            return letters[Math.floor(Math.random() * 26)];
                        })
                        .join("");

                    if (iterations >= originalText.length) {
                        clearInterval(interval);
                    }

                    iterations += 1 / 3; // Slow down decrypt speed
                }, 30);
            }

            // Elegant high-tech fade up
            tl.from(geometryRef.current, { scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)" })
                .from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=1.2")
                .from(titleRef.current, { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
                .from(descRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
                .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

            // --- 2. Interactive Interactive 3D Geometry ---
            if (geometryRef.current && sectionRef.current) {
                const geo = geometryRef.current;

                sectionRef.current.addEventListener("mousemove", (e) => {
                    const rect = sectionRef.current!.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) / 25;
                    const y = (e.clientY - rect.top - rect.height / 2) / 25;

                    gsap.to(geo, {
                        rotationY: x,
                        rotationX: -y,
                        duration: 1.5,
                        ease: "power2.out"
                    });
                });
            }

            // --- 3. Smooth Parallax Scroll-Out ---
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                animation: gsap.to(containerRef.current, {
                    y: -200,          // Parallax slide up
                    scale: 0.9,       // Recede into background
                    opacity: 0,       // Fade out
                    filter: "blur(10px)", // Add cinematic blur
                    ease: "none"
                })
            });

        }, sectionRef.current!);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden [perspective:1000px]"
        >
            <div
                ref={containerRef}
                className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full will-change-transform"
            >
                {/* Text content */}
                <div className="text-center lg:text-left z-20">
                    <p
                        ref={subtitleRef}
                        className="text-xs md:text-sm text-cyan-400 tracking-[0.4em] uppercase mb-6 font-[family-name:var(--font-space-grotesk)] w-fit mx-auto lg:mx-0 flex items-center gap-3"
                    >
                        <span className="w-8 h-[1px] bg-cyan-400 inline-block" />
                        System Architect & Full Stack Developer
                    </p>
                    <h1
                        ref={titleRef}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-space-grotesk)] leading-[1.1] mb-6 tracking-tight text-white"
                    >
                        Designing the <br />
                        <span
                            ref={nameRef}
                            data-value="Future Web"
                            className="gradient-text drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                        >
                            Future Web
                        </span>
                    </h1>
                    <p
                        ref={descRef}
                        className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light"
                    >
                        I engineer high-performance web applications with striking visual aesthetics. Let's push the boundaries of what's possible in the browser.
                    </p>

                    <div ref={ctaRef} className="flex flex-wrap gap-5 justify-center lg:justify-start">
                        <a href="#projects" className="btn-primary group relative overflow-hidden bg-white/5 border border-cyan-500/30 text-white shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] px-8 py-4 rounded-full transition-all duration-300">
                            <span className="relative z-10 font-[family-name:var(--font-space-grotesk)] tracking-wider flex items-center gap-2">
                                Initialize Sequence
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>

                        <a href="/cv.pdf" download className="btn-outline border-white/20 text-gray-300 hover:text-white hover:border-white/50 px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] tracking-wider">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            Download CV
                        </a>
                    </div>
                </div>

                {/* Advanced 3D Interactive Geometry */}
                <div className="flex items-center justify-center lg:justify-end h-[300px] md:h-[400px] perspective-[1000px] z-10 w-full mt-10 md:mt-0">
                    <div
                        ref={geometryRef}
                        className="relative w-48 h-48 sm:w-64 sm:h-64 transform-style-3d will-change-transform"
                    >
                        {/* Glow Core */}
                        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[60px] animate-pulse-glow" style={{ transform: "translateZ(-50px)" }} />

                        {/* The Profile Photo trapped in the Geometry */}
                        <div className="absolute inset-4 rounded-full border border-cyan-500/50 shadow-[0_0_30px_rgba(0,212,255,0.5)] bg-black overflow-hidden" style={{ transform: "translateZ(1px)" }}>
                            <img
                                src="/profile.jpg"
                                alt="Ali Chnitifa"
                                className="w-full h-full object-cover object-top relative z-0"
                            />
                            {/* Cyber scanline overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,212,255,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />
                        </div>

                        {/* Orbiting Tech Rings */}
                        <div className="absolute -inset-8 rounded-full border-t border-l border-cyan-400/30 animate-[spin_10s_linear_infinite]" style={{ transform: "translateZ(30px) rotateX(60deg) rotateY(20deg)" }} />
                        <div className="absolute -inset-12 rounded-full border-b border-r border-purple-500/30 animate-[spin_15s_linear_infinite_reverse]" style={{ transform: "translateZ(60px) rotateX(45deg) rotateY(-30deg)" }} />

                        {/* 3D Floating Node Data */}
                        <div className="absolute top-0 right-0 glass-fast px-3 py-1 rounded-sm text-[10px] text-cyan-400 font-mono border border-cyan-500/30" style={{ transform: "translateZ(100px) rotateY(-15deg)" }}>
                            SYS.ONLINE // 100%
                        </div>
                        <div className="absolute bottom-4 left-4 glass-fast px-3 py-1 rounded-sm text-[10px] text-purple-400 font-mono border border-purple-500/30" style={{ transform: "translateZ(80px) rotateY(15deg)" }}>
                            REACT.MERN.NEXT
                        </div>
                    </div>
                </div>
            </div>

            {/* High-tech scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-cyan-500/50 z-0">
                <span className="text-[10px] font-mono tracking-[0.5em] uppercase">Scroll_Down</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/50 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-cyan-400 animate-[translate-y_2s_linear_infinite]" style={{ animationName: "slideDown" }} />
                </div>
            </div>

            <style jsx>{`
                @keyframes slideDown {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(200%); opacity: 0; }
                }
            `}</style>
        </section>
    );
}
