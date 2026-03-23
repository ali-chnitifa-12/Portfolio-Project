
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Cyber Decrypt Effect Utility
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const nameRef = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const geometryRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // --- 0. Setup 3D Space ---
            gsap.set(sectionRef.current, { perspective: 2000 });
            gsap.set(containerRef.current, { transformStyle: "preserve-3d" });

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
                            return letters[Math.floor(Math.random() * letters.length)];
                        })
                        .join("");

                    if (iterations >= originalText.length) {
                        clearInterval(interval);
                    }

                    iterations += 1 / 3;
                }, 30);
            }

            // Elegant high-tech fade up
            tl.from(geometryRef.current, { 
                scale: 0, 
                z: -1000, 
                rotationY: 180,
                opacity: 0, 
                duration: 2, 
                ease: "expo.out" 
            })
            .from(contentRef.current, { 
                x: -100, 
                opacity: 0, 
                duration: 1.5, 
                ease: "power4.out" 
            }, "-=1.5")
            .from([subtitleRef.current, titleRef.current, descRef.current, ctaRef.current], { 
                y: 50, 
                rotateX: -45,
                opacity: 0, 
                duration: 1, 
                stagger: 0.1,
                ease: "power3.out" 
            }, "-=1");

            // --- 2. Hyper-Interactive 3D Mouse Tracking ---
            const handleMouseMove = (e: MouseEvent) => {
                const { innerWidth, innerHeight } = window;
                const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
                const y = (e.clientY / innerHeight - 0.5) * 2;

                // Move content in 3D
                gsap.to(contentRef.current, {
                    rotationY: x * 15,
                    rotationX: -y * 10,
                    x: x * 30,
                    y: y * 20,
                    duration: 1,
                    ease: "power2.out"
                });

                // Move geometry with more depth
                gsap.to(geometryRef.current, {
                    rotationY: 20 + x * 40,
                    rotationX: -y * 40,
                    z: 50 + Math.abs(x) * 50,
                    duration: 1.5,
                    ease: "power3.out"
                });

                // Parallax background nodes
                gsap.to(".flying-node", {
                    x: (i) => x * (50 + i * 20),
                    y: (i) => y * (50 + i * 20),
                    duration: 2,
                    ease: "power1.out"
                });
            };

            window.addEventListener("mousemove", handleMouseMove);

            // --- 3. Smooth Parallax Scroll-Out ---
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                animation: gsap.to(containerRef.current, {
                    rotationX: -45,
                    scale: 0.7,
                    z: -500,
                    opacity: 0,
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
            className="relative min-h-screen flex items-center justify-center bg-transparent"
        >
            {/* Ambient Particles - Only render on client to avoid hydration mismatch */}
            {isMounted && [...Array(6)].map((_, i) => (
                <div 
                    key={i} 
                    className="flying-node absolute w-1 h-1 bg-accent-cyan/30 rounded-full blur-[1px] pointer-events-none"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        transform: `translateZ(${Math.random() * 200}px)`
                    }}
                />
            ))}

            <div
                ref={containerRef}
                className="relative z-10 max-w-7xl mx-auto px-6 pt-24 sm:pt-32 lg:pt-0 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full transform-style-3d will-change-transform"
            >
                {/* Text content */}
                <div ref={contentRef} className="text-center lg:text-left z-20 transform-style-3d">
                    <p
                        ref={subtitleRef}
                        className="text-[10px] sm:text-xs md:text-sm text-accent-cyan tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-6 font-[family-name:var(--font-space-grotesk)] w-fit mx-auto lg:mx-0 flex items-center gap-2 leading-relaxed"
                    >
                        <span className="w-6 sm:w-8 h-[1px] bg-accent-cyan inline-block shrink-0" />
                        <span>Junior Full-Stack Developer<br className="sm:hidden" /> (React &amp; Laravel)</span>
                    </p>
                    <h1
                        ref={titleRef}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-[family-name:var(--font-space-grotesk)] leading-[1.1] mb-6 tracking-tight text-white transform-style-3d"
                    >
                        <span
                            ref={nameRef}
                            data-value="I Build Scalable Web Solutions"
                            className="gradient-text drop-shadow-[0_0_30px_rgba(14,165,233,0.6)] inline-block"
                            style={{ transform: "translateZ(50px)" }}
                        >
                            I Build Scalable Web Solutions
                        </span>
                    </h1>
                    <p
                        ref={descRef}
                        className="text-gray-400 text-base md:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light px-2 sm:px-0"
                    >
                        Specializing in building robust full-stack applications with React and Laravel. I focus on high-performance, user-centric solutions that provide real business value.
                    </p>

                    <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start transform-style-3d">
                        <a href="#projects" className="btn-primary group relative overflow-hidden bg-white/5 border border-accent-cyan/30 text-white shadow-[0_0_20px_rgba(0,165,233,0.2)] hover:shadow-[0_0_50px_rgba(0,165,233,0.5)] px-8 py-4 rounded-full transition-all duration-500 hover:-translate-y-2 text-center" style={{ transform: "translateZ(30px)" }}>
                            <span className="relative z-10 font-[family-name:var(--font-space-grotesk)] tracking-wider flex items-center justify-center gap-2">
                                View Projects
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 to-accent-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>

                        <a href="#contact" className="btn-outline border-white/20 text-gray-300 hover:text-white hover:border-white/50 px-8 py-4 rounded-full transition-all duration-500 flex items-center justify-center gap-2 font-[family-name:var(--font-space-grotesk)] tracking-wider hover:-translate-y-2 text-center" style={{ transform: "translateZ(20px)" }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            Contact Me
                        </a>
                    </div>
                </div>

                {/* Advanced 3D Interactive Geometry */}
                <div className="flex items-center justify-center lg:justify-end h-[300px] sm:h-[380px] md:h-[480px] perspective-[2000px] z-10 w-full mt-8 md:mt-0 transform-style-3d overflow-visible">
                    <div
                        ref={geometryRef}
                        className="relative w-56 h-56 sm:w-72 sm:h-72 transform-style-3d will-change-transform"
                    >
                        {/* Glow Core */}
                        <div className="absolute inset-0 bg-accent-cyan/30 rounded-full blur-[80px] animate-pulse-glow" style={{ transform: "translateZ(-100px)" }} />

                        {/* The Profile Photo trapped in the Geometry */}
                        <div className="absolute inset-4 rounded-3xl border border-accent-cyan/50 shadow-[0_0_50px_rgba(0,165,233,0.4)] bg-black overflow-hidden" style={{ transform: "translateZ(1px)" }}>
                            <img
                                src="/profile.jpg"
                                alt="Ali Chnitifa"
                                className="w-full h-full object-cover object-top relative z-0"
                            />
                            {/* Cyber scanline overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(14,165,233,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />
                        </div>

                        {/* Orbiting Tech Rings - More dynamic */}
                        <div className="absolute -inset-10 rounded-full border-t border-l border-accent-cyan/40 animate-[spin_8s_linear_infinite]" style={{ transform: "translateZ(50px) rotateX(70deg) rotateY(10deg)" }} />
                        <div className="absolute -inset-16 rounded-full border-b border-r border-accent-purple/40 animate-[spin_12s_linear_infinite_reverse]" style={{ transform: "translateZ(80px) rotateX(-45deg) rotateY(-20deg)" }} />
                        <div className="absolute -inset-24 rounded-full border border-pink-500/20 animate-[spin_20s_linear_infinite]" style={{ transform: "translateZ(120px) rotateX(15deg) rotateY(45deg)" }} />

                        {/* 3D Floating Node Data */}
                        <div className="absolute -top-8 right-0 sm:-top-10 sm:-right-5 md:-right-10 glass-strong px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[9px] sm:text-[11px] text-accent-cyan font-mono border border-accent-cyan/30 shadow-[0_0_20px_rgba(14,165,233,0.2)] z-20" style={{ transform: "translateZ(150px) rotateY(-20deg)" }}>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
                                SYS: CORE_ONLINE
                            </div>
                        </div>
                        <div className="absolute -bottom-8 left-0 sm:-bottom-10 sm:-left-5 md:-left-10 glass-strong px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[9px] sm:text-[11px] text-accent-purple font-mono border border-accent-purple/30 shadow-[0_0_20px_rgba(129,140,248,0.2)] z-20" style={{ transform: "translateZ(130px) rotateY(20deg)" }}>
                            STATUS: ENHANCED_3D
                        </div>
                    </div>
                </div>
            </div>

            {/* High-tech scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-accent-cyan/50 z-0">
                <span className="text-[10px] font-mono tracking-[0.5em] uppercase">Scroll_Down</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent-cyan/50 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-accent-cyan animate-[translate-y_2s_linear_infinite]" style={{ animationName: "slideDown" }} />
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
