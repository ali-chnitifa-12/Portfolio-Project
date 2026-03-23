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
    // Frontend
    { name: "React", level: 92, color: "#61DAFB", icon: SiReact, desc: "Hooks, Context, Redux", category: "Frontend" },
    { name: "Next.js", level: 90, color: "#ffffff", icon: SiNextdotjs, desc: "App Router, SSR, API", category: "Frontend" },
    { name: "TailwindCSS", level: 95, color: "#06B6D4", icon: SiTailwindcss, desc: "Responsive, Themes", category: "Frontend" },
    { name: "GSAP", level: 85, color: "#88CE02", icon: SiGreensock, desc: "ScrollTrigger, 3D", category: "Frontend" },
    
    // Backend
    { name: "Laravel", level: 88, color: "#FF2D20", icon: SiLaravel, desc: "PHP Framework, Eloquent", category: "Backend" },
    { name: "Node.js", level: 85, color: "#339933", icon: SiNodedotjs, desc: "Express, APIs, Auth", category: "Backend" },
    { name: "Express.js", level: 88, color: "#000000", icon: SiNodedotjs, desc: "RESTful APIs, Middleware", category: "Backend" },
    
    // Database
    { name: "MySQL", level: 85, color: "#4479A1", icon: SiMysql, desc: "Relational DB, Queries", category: "Database" },
    { name: "MongoDB", level: 80, color: "#47A248", icon: SiMongodb, desc: "Mongoose, Aggregation", category: "Database" },
    
    // Tools
    { name: "Git", level: 85, color: "#F05032", icon: SiGit, desc: "Version Control, GitHub", category: "Tools" },
    { name: "Postman", level: 90, color: "#FF6C37", icon: SiPostman, desc: "API Design & Testing", category: "Tools" },
];

const categories = ["Frontend", "Backend", "Database", "Tools"];

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

                {/* Categorized Layout */}
                <div className="space-y-20 transform-style-3d">
                    {categories.map((cat) => (
                        <div key={cat} className="space-y-10 transform-style-3d">
                            {/* Category Title */}
                            <div className="flex items-center gap-6 px-6 transform-style-3d" style={{ transform: "translateZ(40px)" }}>
                                <h3 className="text-2xl md:text-3xl font-bold text-accent-cyan font-mono tracking-tighter uppercase">
                                    {cat}<span className="text-white/20">_STK</span>
                                </h3>
                                <div className="h-[1px] flex-grow bg-gradient-to-r from-accent-cyan/50 to-transparent" />
                            </div>

                            <div
                                ref={containerRef}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 px-6 perspective-[3000px] transform-style-3d"
                            >
                                {skills.filter(s => s.category === cat).map((skill, index) => (
                                    <div
                                        key={skill.name}
                                        className="skill-card relative h-[360px] glass-strong rounded-[2.5rem] p-8 group cursor-pointer border border-white/5 hover:border-accent-cyan/30 transition-all duration-700 transform-style-3d flex flex-col items-center justify-between"
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        {/* Background Ambient Glow */}
                                        <div 
                                            className={`absolute -inset-4 rounded-[3rem] blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`} 
                                            style={{ background: `radial-gradient(circle, ${skill.color}33 0%, transparent 70%)` }}
                                        />

                                        {/* Extreme Icon Container Section */}
                                        <div className="relative mt-4 transform-style-3d h-32 flex items-center justify-center w-full" style={{ transform: "translateZ(80px)" }}>
                                            
                                            {/* Orbital Rings */}
                                            <div className="absolute w-24 h-24 rounded-full border border-accent-cyan/10 group-hover:border-accent-cyan/30 animate-[spin_10s_linear_infinite] opacity-40" />
                                            <div className="absolute w-28 h-28 rounded-full border-t border-accent-purple/20 group-hover:animate-[spin_15s_linear_infinite_reverse] opacity-30" style={{ transform: "rotateX(60deg)" }} />

                                            {/* THE HEXAGON CORE */}
                                            <div className="relative w-20 h-20 transform-style-3d group-hover:scale-110 transition-transform duration-700">
                                                <div 
                                                    className="absolute inset-0 animate-pulse-glow rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                                                    style={{ backgroundColor: `${skill.color}33` }}
                                                />
                                                <div 
                                                    className="absolute inset-0 glass-strong border-2 transition-all duration-700 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
                                                    style={{ 
                                                        clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                                                        borderColor: `${skill.color}55`,
                                                        background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, ${skill.color}11 100%)`
                                                    }}
                                                />
                                                <div 
                                                    className="absolute inset-0 flex items-center justify-center text-3xl transition-all duration-700 group-hover:rotate-[360deg] z-10"
                                                    style={{ color: skill.color }}
                                                >
                                                    <skill.icon className="drop-shadow-[0_0_15px_currentColor]" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="text-center transform-style-3d mb-4" style={{ transform: "translateZ(60px)" }}>
                                            <h3 className="text-2xl font-black text-white group-hover:text-accent-cyan transition-colors tracking-tight mb-2 uppercase">
                                                {skill.name}
                                            </h3>
                                            <p className="text-gray-400 text-[10px] leading-relaxed font-medium tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                                                {skill.desc}
                                            </p>
                                        </div>

                                        {/* High-Tech Mastery Meter */}
                                        <div className="w-full space-y-3 transform-style-3d px-2" style={{ transform: "translateZ(40px)" }}>
                                            <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold">
                                                <span>Level</span>
                                                <span className="text-accent-cyan">{skill.level}%</span>
                                            </div>
                                            <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                                <div
                                                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-1500 ease-out"
                                                    style={{
                                                        width: `${skill.level}%`,
                                                        background: `linear-gradient(90deg, ${skill.color}44, ${skill.color})`,
                                                        boxShadow: `0 0 10px ${skill.color}44`
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Background Index Number */}
                                        <div className="absolute top-4 right-8 text-7xl font-black text-white/5 pointer-events-none group-hover:text-white/10 transition-colors duration-1000 select-none -z-10">
                                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </section>
    );
}
