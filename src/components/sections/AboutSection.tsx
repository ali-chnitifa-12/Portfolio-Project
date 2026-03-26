"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const bioCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // --- 0. Setup 3D Space ---
            gsap.set(sectionRef.current, { perspective: 2000 });
            gsap.set(bioCardRef.current, { transformStyle: "preserve-3d" });

            // --- 1. Reveal Animation (3D Drop-in) ---
            gsap.from(bioCardRef.current, {
                z: -800,
                rotationX: -60,
                opacity: 0,
                duration: 2,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // --- 2. Hyper-Immersive 3D Parallax ---
            const handleMouseMove = (e: MouseEvent) => {
                if (!bioCardRef.current) return;
                const rect = bioCardRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2); // -1 to 1
                const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

                gsap.to(bioCardRef.current, {
                    rotationY: x * 20,
                    rotationX: -y * 20,
                    z: 60,
                    duration: 1,
                    ease: "power2.out"
                });

                // Multi-layer parallax for inner elements
                gsap.to(".parallax-depth-1", { x: x * 15, y: y * 15, z: 40, duration: 1.2, ease: "power2.out" });
                gsap.to(".parallax-depth-2", { x: x * 30, y: y * 30, z: 80, duration: 1.4, ease: "power2.out" });
                gsap.to(".parallax-depth-3", { x: x * 45, y: y * 45, z: 120, duration: 1.6, ease: "power2.out" });
            };

            const handleMouseLeave = () => {
                gsap.to([bioCardRef.current, ".parallax-depth-1", ".parallax-depth-2", ".parallax-depth-3"], {
                    rotationX: 0,
                    rotationY: 0,
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.4)"
                });
            };

            sectionRef.current?.addEventListener("mousemove", handleMouseMove);
            sectionRef.current?.addEventListener("mouseleave", handleMouseLeave);

            // --- 3. Titular Entrance ---
            gsap.from(titleRef.current, {
                y: 100,
                opacity: 0,
                rotationX: -45,
                duration: 1.2,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%",
                }
            });

        }, sectionRef.current!);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="section-padding relative z-10 min-h-screen flex items-center bg-transparent [perspective:2000px] overflow-hidden py-24">
            <div ref={containerRef} className="max-w-7xl mx-auto w-full transform-style-3d will-change-transform">
                
                {/* Title Section */}
                <div ref={titleRef} className="text-center mb-12 sm:mb-24 transform-style-3d text-white px-6">
                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6 drop-shadow-[0_0_20px_rgba(14,165,233,0.5)]">
                        Vision & <span className="gradient-text">Identity</span>
                    </h2>
                    <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-accent-cyan via-accent-purple to-pink-500 mx-auto rounded-full shadow-[0_0_20px_rgba(14,165,233,0.6)]" />
                </div>

                <div className="max-w-5xl mx-auto transform-style-3d px-6">
                    {/* Immersive Bio Card */}
                    <div 
                        ref={bioCardRef} 
                        className="glass-strong rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 relative overflow-hidden group shadow-2xl border border-white/20 transform-style-3d transition-all duration-700 hover:border-accent-cyan/40"
                    >
                        {/* Background Aura Layers */}
                        <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none parallax-depth-1" />
                        <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none parallax-depth-1" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 transform-style-3d">
                            
                            {/* Main Narrative Column */}
                            <div className="lg:col-span-8 space-y-10 transform-style-3d parallax-depth-2">
                                <div className="space-y-4 transform-style-3d">
                                    <h3 className="text-2xl sm:text-4xl md:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] leading-tight text-white">
                                        Crafting the <span className="gradient-text">Digital Nexus</span>
                                    </h3>
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <span className="h-[2px] w-8 sm:w-12 bg-accent-cyan rounded-full" />
                                        <p className="text-base sm:text-xl text-accent-cyan font-mono tracking-widest uppercase">Full Stack Architect</p>
                                    </div>
                                </div>

                                <div className="space-y-6 text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                                    <p>
                                        I am a <span className="text-white font-medium">Junior Full-Stack Developer</span> on a mission to build high-scale, impactful web applications. My journey is defined by a deep curiosity for how the modern web works and a commitment to mastering the <span className="text-accent-cyan font-medium">React + Laravel</span> stack.
                                    </p>
                                    <p>
                                        I bridge the gap between technical complexity and intuitive user experiences. Currently, I'm focusing on architecting robust REST APIs and building performant frontends that solve real-world problems. I'm actively looking for a team where I can contribute my skills and continue growing as a professional engineer.
                                    </p>
                                </div>

                                {/* Dynamic Skill Highlights */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10 transform-style-3d parallax-depth-3">
                                    {[
                                        { label: "Location", val: "Morocco" },
                                        { label: "Core Stack", val: "Laravel & React" },
                                        { label: "Learning", val: "Cloud Scaling" },
                                        { label: "Availability", val: "Junior Roles" }
                                    ].map((item) => (
                                        <div key={item.label} className="space-y-2 transform-style-3d">
                                            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">{item.label}</p>
                                            <p className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">{item.val}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Impact/Stats Column */}
                             <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col justify-center gap-6 md:gap-8 transform-style-3d parallax-depth-3">
                                <div className="glass-fast p-4 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 text-center space-y-2 group/stat hover:bg-white/5 transition-all duration-500 transform-style-3d hover:translate-z-20">
                                    <p className="text-2xl sm:text-4xl md:text-5xl font-bold gradient-text drop-shadow-sm">3+</p>
                                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-mono">Full-Stack Projects</p>
                                </div>
                                <div className="glass-fast p-4 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 text-center space-y-2 group/stat hover:bg-white/5 transition-all duration-500 transform-style-3d hover:translate-z-20">
                                    <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-accent-cyan">1+</p>
                                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-mono">Year Professional XP</p>
                                </div>
                                <div className="glass-fast p-4 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 text-center space-y-2 group/stat hover:bg-white/5 transition-all duration-500 transform-style-3d hover:translate-z-20">
                                    <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-accent-purple">Open</p>
                                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-mono">To Work Globally</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
