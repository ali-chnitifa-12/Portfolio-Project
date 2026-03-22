"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
    SiNextdotjs, 
    SiReact, 
    SiNodedotjs, 
    SiMongodb, 
    SiTailwindcss, 
    SiGreensock, 
    SiLaravel, 
    SiGit, 
    SiMysql, 
    SiPostman,
    SiTypescript,
    SiJavascript
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: "Next.js", level: 90, color: "#ffffff", icon: SiNextdotjs, desc: "App Router, SSR, API", border: "border-white/20", glow: "from-white/20 to-transparent" },
    { name: "React", level: 92, color: "#61DAFB", icon: SiReact, desc: "Hooks, Context, Redux", border: "border-sky-400/30", glow: "from-sky-400/20 to-transparent" },
    { name: "TypeScript", level: 88, color: "#3178C6", icon: SiTypescript, desc: "Type Safety, Interfaces", border: "border-blue-500/30", glow: "from-blue-500/20 to-transparent" },
    { name: "Node.js", level: 85, color: "#339933", icon: SiNodedotjs, desc: "Express, APIs, Auth", border: "border-green-500/30", glow: "from-green-500/20 to-transparent" },
    { name: "Laravel", level: 88, color: "#FF2D20", icon: SiLaravel, desc: "PHP Framework, REST APIs", border: "border-red-500/30", glow: "from-red-500/20 to-transparent" },
    { name: "MongoDB", level: 80, color: "#47A248", icon: SiMongodb, desc: "Mongoose, Aggregation", border: "border-emerald-500/30", glow: "from-emerald-500/20 to-transparent" },
    { name: "TailwindCSS", level: 95, color: "#06B6D4", icon: SiTailwindcss, desc: "Responsive, Themes", border: "border-cyan-400/30", glow: "from-cyan-400/20 to-transparent" },
    { name: "GSAP", level: 85, color: "#88CE02", icon: SiGreensock, desc: "ScrollTrigger, 3D", border: "border-lime-400/30", glow: "from-lime-400/20 to-transparent" },
    { name: "MySQL", level: 85, color: "#4479A1", icon: SiMysql, desc: "Relational DB, Queries", border: "border-blue-600/30", glow: "from-blue-600/20 to-transparent" },
    { name: "PL/SQL", level: 80, color: "#f80000", icon: FaDatabase, desc: "Oracle DB, Procedures", border: "border-red-600/30", glow: "from-red-600/20 to-transparent" },
    { name: "Git", level: 85, color: "#F05032", icon: SiGit, desc: "Version Control, CI/CD", border: "border-orange-600/30", glow: "from-orange-600/20 to-transparent" },
    { name: "Postman", level: 90, color: "#FF6C37", icon: SiPostman, desc: "API Testing, Mocking", border: "border-orange-400/30", glow: "from-orange-400/20 to-transparent" },
];

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Entrance animation (3D scatter/fly-in)
            // Use fromTo for better reliability and set a clearer start trigger
            gsap.fromTo(".skill-card", 
                { 
                    opacity: 0, 
                    z: -400,
                    rotationX: () => Math.random() * 90 - 45,
                    rotationY: () => Math.random() * 90 - 45,
                    x: () => Math.random() * 200 - 100,
                    y: () => Math.random() * 200 - 100
                },
                {
                    opacity: 1,
                    z: 0,
                    rotationX: 0,
                    rotationY: 0,
                    x: 0,
                    y: 0,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%", // Trigger earlier
                        toggleActions: "play none none none"
                    },
                }
            );

            // 2. High-depth interactive rotation for the grid
            const handleMouseMove = (e: MouseEvent) => {
                const { innerWidth, innerHeight } = window;
                const x = (e.clientX / innerWidth - 0.5) * 2;
                const y = (e.clientY / innerHeight - 0.5) * 2;

                gsap.to(containerRef.current, {
                    rotationY: x * 20,
                    rotationX: -y * 20,
                    duration: 1.2,
                    ease: "power2.out"
                });
            };

            window.addEventListener("mousemove", handleMouseMove);

            // 3. Constant floating motion
            gsap.to(".skill-card", {
                y: "random(-15, 15)",
                rotationZ: "random(-3, 3)",
                duration: "random(2.5, 4.5)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 0.2,
                    from: "random"
                }
            });

        }, sectionRef.current!);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="skills" className="section-padding relative z-10 min-h-screen flex items-center bg-transparent overflow-hidden py-20">
            <div className="max-w-7xl mx-auto w-full transform-style-3d">

                {/* Title */}
                <div ref={titleRef} className="text-center mb-24 relative z-50 transform-style-3d">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6 text-white" style={{ transform: "translateZ(80px)" }}>
                        My <span className="gradient-text drop-shadow-[0_0_25px_rgba(0,165,233,0.6)]">Skills</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-accent-cyan via-accent-purple to-pink-500 mx-auto rounded-full shadow-[0_0_20px_rgba(14,165,233,0.5)]" style={{ transform: "translateZ(50px)" }} />
                </div>

                {/* 3D Grid Layout */}
                <div
                    ref={containerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 perspective-[2000px] transform-style-3d"
                >
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            className="skill-card relative glass-strong-fast rounded-3xl p-8 group cursor-pointer border border-white/10 hover:border-accent-cyan/40 transition-all duration-500 transform-style-3d"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Inner Depth Layer */}
                            <div className="relative z-10 transform-style-3d" style={{ transform: "translateZ(40px)" }}>
                                <div className="flex items-center gap-5 mb-6">
                                    <div 
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 bg-gradient-to-br ${skill.glow} border ${skill.border} shadow-2xl`}
                                        style={{ color: skill.color }}
                                    >
                                        <skill.icon />
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-accent-cyan transition-colors">{skill.name}</h3>
                                </div>

                                <p className="text-gray-400 text-xs leading-relaxed mb-6 font-light">
                                    {skill.desc}
                                </p>

                                {/* Progress Bar in 3D */}
                                <div className="space-y-2 transform-style-3d" style={{ transform: "translateZ(20px)" }}>
                                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-500">
                                        <span>Mastery</span>
                                        <span className="text-accent-cyan">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-1 border border-white/10 overflow-hidden relative">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000 ease-out"
                                            style={{
                                                width: `${skill.level}%`,
                                                background: `linear-gradient(90deg, transparent, ${skill.color})`,
                                                boxShadow: `0 0 10px ${skill.color}`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Background Element */}
                            <div className="absolute top-4 right-6 text-6xl font-bold text-white/5 pointer-events-none group-hover:text-white/10 transition-colors duration-500 select-none">
                                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
