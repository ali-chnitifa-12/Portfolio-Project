"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
    { name: "React", short: "Re", color: "#61DAFB", glow: "rgba(97,218,251,0.5)" },
    { name: "Next.js", short: "Nx", color: "#ffffff", glow: "rgba(255,255,255,0.5)" },
    { name: "Laravel", short: "Lv", color: "#FF2D20", glow: "rgba(255,45,32,0.5)" },
    { name: "Node.js", short: "No", color: "#339933", glow: "rgba(51,153,51,0.5)" },
    { name: "MongoDB", short: "Mg", color: "#47A248", glow: "rgba(71,162,72,0.5)" },
    { name: "TailwindCSS", short: "Tw", color: "#06B6D4", glow: "rgba(6,182,212,0.5)" },
    { name: "GSAP", short: "Gs", color: "#88CE02", glow: "rgba(136,206,2,0.5)" },
    { name: "Git", short: "Gt", color: "#F05032", glow: "rgba(240,80,50,0.5)" },
    { name: "MySQL", short: "My", color: "#4479A1", glow: "rgba(68,121,161,0.5)" },
    { name: "PL/SQL", short: "Pl", color: "#f80000", glow: "rgba(248,0,0,0.5)" },
    { name: "REST API", short: "Api", color: "#009688", glow: "rgba(0,150,136,0.5)" },
    { name: "Postman", short: "Pm", color: "#FF6C37", glow: "rgba(255,108,55,0.5)" },
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const bioCardRef = useRef<HTMLDivElement>(null);
    const techContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(sectionRef.current, { perspective: 2000 });
            gsap.set([titleRef.current, bioCardRef.current, techContainerRef.current], {
                transformStyle: "preserve-3d"
            });

            const isMobile = window.innerWidth < 768;

            // 1. Cinematic Slide-in Entrance
            // Bio card slides in from the left and rotates into place
            gsap.from(bioCardRef.current, {
                x: isMobile ? -100 : -300,
                z: isMobile ? -200 : -800,
                rotateY: isMobile ? -15 : -45,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
            });

            // Tech container slides in from the right
            gsap.from(techContainerRef.current, {
                x: isMobile ? 100 : 300,
                z: isMobile ? -200 : -800,
                rotateY: isMobile ? 15 : 45,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
            });

            // Title drops down
            gsap.from(titleRef.current, {
                y: isMobile ? -50 : -100,
                z: isMobile ? -100 : -500,
                rotateX: isMobile ? -15 : -45,
                opacity: 0,
                duration: 1.2,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                },
            });

            // Tech icons pop in sequentially
            gsap.from(".tech-item", {
                scale: 0,
                z: -200,
                rotationZ: 45,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: techContainerRef.current,
                    start: "top 80%",
                },
            });

            // Interactive Parallax on the Bio Card
            const bioCard = bioCardRef.current;
            if (bioCard) {
                bioCard.addEventListener("mousemove", (e) => {
                    const rect = bioCard.getBoundingClientRect();
                    const rx = (e.clientY - rect.top - rect.height / 2) / 20;
                    const ry = -(e.clientX - rect.left - rect.width / 2) / 20;

                    gsap.to(bioCard, {
                        rotationX: rx,
                        rotationY: ry,
                        z: 50,
                        duration: 0.5,
                        ease: "power1.out"
                    });
                });

                bioCard.addEventListener("mouseleave", () => {
                    gsap.to(bioCard, {
                        rotationX: 0,
                        rotationY: 0,
                        z: 0,
                        duration: 1,
                        ease: "elastic.out(1, 0.3)"
                    });
                });
            }

            // Magnetic Tech Icons
            const techItems = document.querySelectorAll(".tech-item");
            techItems.forEach((item) => {
                const icon = item.querySelector(".icon-cube");
                item.addEventListener("mousemove", (e: Event) => {
                    const evt = e as MouseEvent;
                    const rect = item.getBoundingClientRect();
                    const x = (evt.clientX - rect.left - rect.width / 2) * 0.5;
                    const y = (evt.clientY - rect.top - rect.height / 2) * 0.5;

                    gsap.to(icon, {
                        x: x,
                        y: y,
                        rotationX: -y,
                        rotationY: x,
                        z: 30,
                        scale: 1.1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                item.addEventListener("mouseleave", () => {
                    gsap.to(icon, {
                        x: 0,
                        y: 0,
                        rotationX: 0,
                        rotationY: 0,
                        z: 0,
                        scale: 1,
                        duration: 0.7,
                        ease: "elastic.out(1, 0.3)"
                    });
                });
            });

            // 2. Premium "Float Away" on Scroll Out
            gsap.to(containerRef.current, {
                y: -150,
                z: -500,
                opacity: 0.2,
                filter: "blur(10px)",
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "bottom 80%",
                    end: "bottom top",
                    scrub: 1,
                },
            });

        }, sectionRef.current!);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="section-padding relative z-10 min-h-screen flex items-center bg-transparent [perspective:2000px] overflow-hidden">
            {/* Ambient Background Glows - Reduced blur radius and opacity for performance */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[50px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[50px] pointer-events-none" />

            <div ref={containerRef} className="max-w-7xl mx-auto w-full transform-style-3d will-change-transform pt-20">
                {/* Section Title */}
                <div ref={titleRef} className="text-center mb-20 transform-style-3d text-white">
                    <h2 className="text-5xl md:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6 drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto rounded-full shadow-[0_0_15px_rgba(168,85,247,0.7)]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start transform-style-3d">

                    {/* Bio Card - Premium Glassmorphism (Optimized) */}
                    <div ref={bioCardRef} className="lg:col-span-7 glass-strong-fast rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden group shadow-2xl border border-white/20 transform-style-3d hover:border-cyan-500/40 transition-colors duration-500 will-change-transform">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                            <h3 className="text-3xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)] text-white">
                                Passionate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Architect</span> of the Web
                            </h3>

                            <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
                                <p>
                                    I am a <strong className="text-white font-semibold">Full Stack Developer</strong> dedicated to crafting digital experiences that blur the line between software and art. I specialize in modern JavaScript frameworks and love breathing life into creative designs with clean, robust code.
                                </p>
                                <p>
                                    Whether architecting scalable backends or fine-tuning <strong className="text-white font-semibold">cinematic 3D animations</strong> on the frontend, I build holistic solutions that are visually arresting and highly performant.
                                </p>
                                <p>
                                    Beyond the editor, I am constantly exploring the bleeding edge of web technologies, eager to push boundaries and build applications that inspire.
                                </p>
                            </div>

                            {/* Floating Stats Orbs */}
                            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10">
                                {[
                                    { value: "2+", label: "Years Exp.", color: "from-cyan-400 to-blue-500" },
                                    { value: "15+", label: "Projects", color: "from-purple-400 to-pink-500" },
                                    { value: "10+", label: "Technologies", color: "from-green-400 to-cyan-500" }
                                ].map((stat, i) => (
                                    <div key={i} className="text-center relative group/stat cursor-default">
                                        <div className="absolute inset-0 bg-black/20 rounded-2xl blur-xl group-hover/stat:bg-white/5 transition-colors duration-300" />
                                        <div className={`text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color} group-hover/stat:scale-110 transition-transform duration-300 inline-block`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack - Magnetic Gems */}
                    <div ref={techContainerRef} className="lg:col-span-5 transform-style-3d will-change-transform">
                        <div className="glass-fast rounded-[2.5rem] p-10 border border-white/10 shadow-2xl h-full flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-8 font-[family-name:var(--font-space-grotesk)] text-center text-white tracking-wide">
                                Core Arsenal
                            </h3>

                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-6 transform-style-3d">
                                {techStack.map((tech) => (
                                    <div
                                        key={tech.name}
                                        className="tech-item relative aspect-square flex flex-col items-center justify-center group transform-style-3d perspective-[500px]"
                                    >
                                        {/* Name tooltip */}
                                        <span className="absolute -top-8 text-xs font-bold px-3 py-1 bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 whitespace-nowrap z-20 pointer-events-none backdrop-blur-md border border-white/10">
                                            {tech.name}
                                        </span>

                                        {/* The Magnetic 3D Cube/Gem */}
                                        <div
                                            className="icon-cube w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold font-[family-name:var(--font-space-grotesk)] transition-shadow duration-300 relative will-change-transform"
                                            style={{
                                                background: `linear-gradient(135deg, rgba(255,255,255,0.1), ${tech.color}40)`,
                                                color: "#fff",
                                                border: `1px solid ${tech.color}80`,
                                                boxShadow: `0 10px 30px -10px ${tech.glow}, inset 0 2px 20px ${tech.glow}`,
                                            }}
                                        >
                                            {/* Inner reflection */}
                                            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl pointer-events-none" />
                                            <span style={{ textShadow: `0 0 10px ${tech.color}` }}>{tech.short}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
