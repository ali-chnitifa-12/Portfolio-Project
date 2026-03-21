"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: "Next.js", level: 90, color: "#ffffff", desc: "App Router, SSR, API" },
    { name: "React", level: 92, color: "#61DAFB", desc: "Hooks, Context, Redux" },
    { name: "Node.js", level: 85, color: "#339933", desc: "Express, APIs, Auth" },
    { name: "MongoDB", level: 80, color: "#47A248", desc: "Mongoose, Aggregation" },
    { name: "TailwindCSS", level: 95, color: "#06B6D4", desc: "Responsive, Themes" },
    { name: "GSAP", level: 85, color: "#88CE02", desc: "ScrollTrigger, 3D" },
    { name: "Laravel", level: 88, color: "#FF2D20", desc: "PHP Framework, REST APIs" },
    { name: "Git", level: 85, color: "#F05032", desc: "Version Control, CI/CD" },
    { name: "MySQL", level: 85, color: "#4479A1", desc: "Relational DB, Queries" },
    { name: "PL/SQL", level: 80, color: "#f80000", desc: "Oracle DB, Procedures" },
    { name: "REST API", level: 95, color: "#009688", desc: "Design, Integration" },
    { name: "Postman", level: 90, color: "#FF6C37", desc: "API Testing, Mocking" },
];

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Title fade in
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Grid cards stagger fade up
            gsap.fromTo(".skill-card",
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                    }
                }
            );

        }, sectionRef.current!);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="skills" className="section-padding relative z-10 min-h-screen flex items-center bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto w-full pt-10">

                {/* Title */}
                <div ref={titleRef} className="text-center mb-16 relative z-50">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4 text-white">
                        My <span className="gradient-text drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">Skills</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
                </div>

                {/* Premium Grid Layout */}
                <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                    {skills.map((skill, i) => (
                        <div
                            key={skill.name}
                            className="skill-card relative glass-strong-fast glass-shimmer rounded-2xl p-6 group overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            style={{ "--skill-color": skill.color } as React.CSSProperties}
                        >
                            {/* Subtle Ambient Glow */}
                            <div
                                className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-xl opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                                style={{ background: skill.color }}
                            />

                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)] text-white group-hover:text-[var(--skill-color)] transition-colors">
                                    {skill.name}
                                </h3>

                                <p className="text-sm text-gray-400 mb-6 flex-grow">
                                    {skill.desc}
                                </p>

                                {/* Progress Bar */}
                                <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/5">
                                    <div
                                        className="h-full rounded-full opacity-80 group-hover:opacity-100 transition-all duration-1000 ease-out"
                                        style={{
                                            width: `${skill.level}%`,
                                            background: `linear-gradient(90deg, transparent, ${skill.color})`,
                                            boxShadow: `0 0 10px ${skill.color}`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
