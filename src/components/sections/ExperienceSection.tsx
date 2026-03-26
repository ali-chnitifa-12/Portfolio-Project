"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        year: "Mar 2024 – May 2024",
        title: "Web Development Intern",
        company: "MarsaMaroc",
        description: "Developed an internal web application for employee tracking and management. Built a REST API with Laravel, implemented role-based authentication and access control, and integrated a React frontend with the backend. Designed normalized MySQL schemas for employee records.",
        tech: ["React.js", "Laravel", "MySQL", "Tailwind CSS"],
    },
    {
        year: "2024 – Present",
        title: "Freelance Full-Stack Developer",
        company: "Freelance",
        description: "Building modern web applications for clients using React, Next.js, Node.js, and MongoDB. Implementing advanced animations and 3D effects with GSAP. Focused on delivering high-quality, performant solutions.",
        tech: ["React", "Next.js", "Node.js", "MongoDB", "GSAP"],
    },
    {
        year: "2023 – 2024",
        title: "Personal Projects",
        company: "Self-Directed",
        description: "Built a full-stack E-Commerce platform with JWT authentication, admin dashboard, product CRUD, and a custom REST API. Also developed a Luxury Hotel Booking Engine with a 5-step booking flow and a Car Rental platform with a 3D interactive UI.",
        tech: ["React", "Laravel", "MySQL", "Redux", "Three.js"],
    },
    {
        year: "2022 – 2024",
        title: "Diploma in Digital Development",
        company: "ISTA NTIC — Safi, Morocco",
        description: "Completed a comprehensive program in full-stack web development, covering databases, UML modeling, and Agile/Scrum methodologies. Graduated with hands-on project experience in both frontend and backend technologies.",
        tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    },
    {
        year: "2021 – 2022",
        title: "Self-Taught Developer",
        company: "Self-Directed",
        description: "Started the web development journey through online courses and personal projects. Focused on mastering JavaScript fundamentals and gradually progressing into React, building a strong foundation for full-stack development.",
        tech: ["HTML", "CSS", "JavaScript", "React"],
    },
];

export default function ExperienceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(sectionRef.current, { perspective: 2000 });
            gsap.set(cardsContainerRef.current, { transformStyle: "preserve-3d" });

            // Title entrance
            gsap.from(titleRef.current, {
                y: -100,
                z: -500,
                rotateX: -45,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });

            // The main Timeline 3D Scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1, // smooth scrub
                }
            });

            // 1. Draw the neon line in 3D
            gsap.from(lineRef.current, {
                scaleY: 0,
                transformOrigin: "top",
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: lineRef.current,
                    start: "top 70%",
                    end: "bottom 80%",
                    scrub: true,
                },
            });

            // 2. Animate cards flying in from 3D space as you hit them
            const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");

            cards.forEach((card, i) => {
                const direction = i % 2 === 0 ? 1 : -1;
                const isMobile = window.innerWidth < 768;

                gsap.from(card, {
                    x: (isMobile ? 100 : 300) * direction, // Smaller fly-in for mobile
                    z: isMobile ? -500 : -1000,           // closer starting point
                    rotateY: (isMobile ? 25 : 45) * direction, // tilted
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "top 40%",
                        scrub: 1, // scrub to lock it into place
                    }
                });

                // Subtle parallax float on the card itself based on mouse
                card.addEventListener("mousemove", (e) => {
                    const rect = card.getBoundingClientRect();
                    const rx = (e.clientY - rect.top - rect.height / 2) / 10;
                    const ry = -(e.clientX - rect.left - rect.width / 2) / 10;

                    gsap.to(card, {
                        rotationX: rx,
                        rotationY: ry,
                        z: 50,
                        duration: 0.5,
                        ease: "power1.out"
                    });
                });

                card.addEventListener("mouseleave", () => {
                    gsap.to(card, {
                        rotationX: 0,
                        rotationY: 0,
                        z: 0,
                        duration: 0.5,
                        ease: "power1.out"
                    });
                });
            });

            // Make dots pop out in 3D
            gsap.from(".timeline-dot", {
                scale: 0,
                z: -200,
                duration: 0.5,
                stagger: 0.3,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: ".timeline-dot",
                    start: "top 80%",
                },
            });

        }, sectionRef.current!);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="section-padding relative z-10 overflow-x-hidden [perspective:2000px]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 transform-style-3d">
                {/* Section Title */}
                <div className="text-center mb-24 transform-style-3d text-white">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    >
                        My <span className="gradient-text">Experience</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-accent-purple mx-auto rounded-full" />
                </div>

                {/* Timeline Container */}
                <div ref={cardsContainerRef} className="relative transform-style-3d">
                    {/* 3D Vertical Neon Line */}
                    <div
                        ref={lineRef}
                        className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-cyan via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] rounded-full hidden md:block"
                        style={{ transform: "translateX(-50%) translateZ(-50px)" }} // pushed back slightly
                    />

                    {/* Mobile Line */}
                    <div
                        className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-cyan via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] rounded-full md:hidden"
                        style={{ transform: "translateZ(-50px)" }}
                    />

                    <div className="space-y-24 transform-style-3d">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className={`timeline-card relative flex flex-col md:flex-row items-center gap-12 group transform-style-3d ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Card Content */}
                                <div
                                    className={`w-full md:w-[calc(50%-3rem)] pl-12 md:pl-0 ${index % 2 === 0 ? "md:text-right" : "md:text-left"
                                    }`}
                                >
                                    {/* 3D Glass Pane */}
                                    <div className="glass-strong rounded-3xl p-5 sm:p-8 relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-white/20 hover:border-accent-cyan/50 hover:shadow-[0_0_60px_rgba(0,212,255,0.3)] transition-colors duration-500 transform-style-3d">

                                        {/* Subtle internal gradient glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                        {/* Content inside pane */}
                                        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                                            {/* Year badge */}
                                            <span className="inline-block text-xs px-4 py-1.5 rounded-full bg-cyan-500/20 text-accent-cyan border border-cyan-500/30 mb-4 font-[family-name:var(--font-space-grotesk)] shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                                                {exp.year}
                                            </span>

                                            <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)] text-white group-hover:text-accent-cyan transition-colors">
                                                {exp.title}
                                            </h3>
                                            <p className="text-purple-400 text-sm font-semibold mb-4 tracking-wider">{exp.company}</p>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                                {exp.description}
                                            </p>

                                            {/* Tech tags */}
                                            <div
                                                className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                                                    }`}
                                            >
                                                {exp.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="text-xs px-3 py-1 rounded-lg bg-white/10 text-gray-300 border border-white/5"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Center 3D glowing dot */}
                                <div
                                    className="timeline-dot absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black border-2 border-accent-cyan shadow-[0_0_20px_rgba(0,212,255,0.8)] z-10 hidden md:flex items-center justify-center transform-style-3d group-hover:scale-125 group-hover:border-purple-400 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all duration-500"
                                >
                                    <div className="w-2 h-2 bg-accent-cyan rounded-full group-hover:bg-purple-400 transition-colors" />
                                </div>

                                {/* Mobile dot */}
                                <div className="timeline-dot absolute left-[22px] top-10 w-4 h-4 rounded-full bg-accent-cyan shadow-[0_0_15px_rgba(0,212,255,0.8)] z-10 md:hidden" />

                                {/* Spacer for opposite side */}
                                <div className="hidden md:block w-[calc(50%-3rem)] pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
