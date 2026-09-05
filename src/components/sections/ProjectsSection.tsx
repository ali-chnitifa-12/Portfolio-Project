"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sound } from "@/lib/sounds";

gsap.registerPlugin(ScrollTrigger);

interface Project {
    title: string;
    description: string;
    image: string;
    tech: string[];
    features: string[];
    liveLink: string;
    githubLink: string;
    gradient: string;
    category: "E-Commerce" | "AI & WebApp" | "3D & Interactive";
}

const projects: Project[] = [
    {
        title: "Hanibal Games - Pack Builder",
        description: "A custom digital gaming store & custom pack builder platform featuring 200+ game catalog titles, game genre filters (Denuvo, 3rd Party, Simulators), real-time pack price calculator, and instant WhatsApp checkout integration.",
        image: "/projects/hanibal.png",
        tech: ["React", "Next.js", "TailwindCSS", "E-Commerce", "REST API"],
        features: ["200+ Games Catalog", "Category Filter", "Pack Builder", "WhatsApp Checkout"],
        liveLink: "https://hanibal-games.vercel.app/",
        githubLink: "https://github.com/ali-chnitifa-12",
        gradient: "from-purple-600/30 to-cyan-600/30",
        category: "E-Commerce",
    },
    {
        title: "Klawdz Vaping Shop",
        description: "A premium e-commerce store built for Klawdz Vaping Products featuring product categories, custom search filtering, interactive cart system, price range slider, and instant WhatsApp order integration.",
        image: "/projects/klawdz.png",
        tech: ["React", "Next.js", "TailwindCSS", "E-Commerce", "REST API"],
        features: ["Shop Catalog", "Price Filter", "WhatsApp Order", "Cart System"],
        liveLink: "https://klawdz.com/shop",
        githubLink: "https://github.com/ali-chnitifa-12",
        gradient: "from-red-600/30 to-purple-600/30",
        category: "E-Commerce",
    },
    {
        title: "FitTrack AI Fitness Dashboard",
        description: "An advanced full-stack fitness tracking web application featuring interactive calorie/macro calculation, customized workout routine planner, daily challenge logs, AI Coach, and progress analytics.",
        image: "/projects/fittrack.png",
        tech: ["React", "Node.js", "Express", "TailwindCSS", "Framer Motion", "OpenAI API"],
        features: ["AI Coach", "Macro Calculator", "Daily Challenge Log", "Progress Analytics"],
        liveLink: "https://fiitnesstracking.vercel.app/dashboard",
        githubLink: "https://github.com/ali-chnitifa-12",
        gradient: "from-emerald-500/20 to-teal-500/20",
        category: "AI & WebApp",
    },
    {
        title: "Snapchat Men Luxury Store",
        description: "Exclusive luxury menswear and sneakers boutique platform. Features collection filters for Air Jordans & streetwear, interactive search, stock badges, and smooth animations.",
        image: "/projects/snapchatmen.png",
        tech: ["React", "Laravel", "TailwindCSS", "GSAP", "MySQL"],
        features: ["Luxury Collection", "Category Filter", "Stock Management", "Responsive UI"],
        liveLink: "https://snapchat-men-website.vercel.app/",
        githubLink: "https://github.com/ali-chnitifa-12",
        gradient: "from-amber-500/20 to-orange-500/20",
        category: "E-Commerce",
    },
    {
        title: "Luxury Hotel Booking Engine",
        description: "Architected a premium reservation system focusing on high-end UI animations. Implemented a complex 5-step booking algorithm with real-time state synchronization.",
        image: "/projects/hotel.png",
        tech: ["React", "Tailwind", "GSAP", "Redux"],
        features: ["3D Room Tours", "Booking Logic", "State Persistence"],
        liveLink: "https://hotel-booking-three-xi.vercel.app",
        githubLink: "https://github.com/ali-chnitifa-12",
        gradient: "from-cyan-500/20 to-blue-500/20",
        category: "3D & Interactive",
    },
    {
        title: "Futuristic Car Rental",
        description: "Built a high-performance localized car rental platform. Focused on optimizing asset loading for 3D models and ensuring sub-second page transitions.",
        image: "/projects/carrental.png",
        tech: ["React", "Three.js", "TailwindCSS"],
        features: ["3D Car Config", "Dynamic Pricing", "Responsive UI"],
        liveLink: "https://car-rentals-virid-gamma.vercel.app",
        githubLink: "https://github.com/ali-chnitifa-12",
        gradient: "from-blue-500/20 to-purple-500/20",
        category: "3D & Interactive",
    },
    {
        title: "E-Commerce Ecosystem",
        description: "Designed and built a modern full-stack commerce showcase platform with rich menu displays, cart system, product CRUD, and JWT REST API.",
        image: "/projects/ecommerce.png",
        tech: ["React", "Laravel", "MySQL", "REST API", "Redux"],
        features: ["JWT Auth", "Admin Dashboard", "Product CRUD", "Cart System"],
        liveLink: "https://ecommerce-app-nine-gules.vercel.app",
        githubLink: "https://github.com/ali-chnitifa-12",
        gradient: "from-orange-500/20 to-red-500/20",
        category: "E-Commerce",
    },
];

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const [viewMode, setViewMode] = useState<"3D" | "GRID">("3D");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        if (viewMode !== "3D") return;

        const ctx = gsap.context(() => {
            gsap.set(sectionRef.current, { perspective: 2500 });
            gsap.set(carouselRef.current, { transformStyle: "preserve-3d" });

            const totalCards = projects.length;
            const isMobile = window.innerWidth < 768;
            const radius = isMobile ? 320 : 600;
            const cardScale = isMobile ? 0.85 : 1;

            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                const theta = (i / totalCards) * (Math.PI * 2);

                gsap.set(card, {
                    rotationY: (i / totalCards) * 360,
                    z: Math.cos(theta) * radius,
                    x: Math.sin(theta) * radius,
                    scale: cardScale,
                    transformOrigin: "50% 50%",
                    backfaceVisibility: "hidden"
                });
            });

            const maxRotation = -360 * ((totalCards - 1) / totalCards);
            gsap.to(carouselRef.current, {
                rotationY: maxRotation,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                }
            });

            const handleMouseMove = (e: MouseEvent) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * -20;
                gsap.to(carouselRef.current, {
                    rotationX: y,
                    rotationZ: x * 0.2,
                    duration: 1,
                    ease: "power2.out"
                });
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }, sectionRef.current!);

        return () => ctx.revert();
    }, [viewMode]);

    const setCardRef = (el: HTMLDivElement | null, index: number) => {
        cardsRef.current[index] = el;
    };

    const filteredProjects = selectedCategory === "All"
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    const openModal = (project: Project) => {
        sound.playClick();
        setSelectedProject(project);
    };

    const closeModal = () => {
        sound.playClick();
        setSelectedProject(null);
    };

    return (
        <section ref={sectionRef} id="projects" className={`relative w-full overflow-hidden bg-transparent ${viewMode === "3D" ? "h-screen flex flex-col items-center justify-center" : "py-24"}`}>
            
            {/* Title & View Switcher Controls */}
            <div ref={titleRef} className={`text-center px-6 z-40 ${viewMode === "3D" ? "absolute top-12 sm:top-16 z-50 pointer-events-auto" : "mb-12"}`}>
                <h2 className="text-3xl sm:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-3 text-white drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">
                    My <span className="gradient-text">Projects</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto rounded-full mb-6" />

                {/* View Mode Toggle Pill */}
                <div className="inline-flex items-center p-1 rounded-full glass-strong border border-white/20 gap-1 backdrop-blur-md">
                    <button
                        onClick={() => { sound.playClick(); setViewMode("3D"); }}
                        onMouseEnter={() => sound.playHover()}
                        className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${viewMode === "3D" ? "bg-accent-cyan text-black shadow-[0_0_15px_rgba(14,165,233,0.5)]" : "text-gray-400 hover:text-white"}`}
                    >
                        🔄 3D Carousel
                    </button>
                    <button
                        onClick={() => { sound.playClick(); setViewMode("GRID"); }}
                        onMouseEnter={() => sound.playHover()}
                        className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${viewMode === "GRID" ? "bg-accent-cyan text-black shadow-[0_0_15px_rgba(14,165,233,0.5)]" : "text-gray-400 hover:text-white"}`}
                    >
                        🎛️ Grid & Filters
                    </button>
                </div>
            </div>

            {/* 3D Rolodex Mode */}
            {viewMode === "3D" && (
                <div className="relative w-full max-w-[85vw] sm:max-w-md h-[400px] sm:h-[450px] mt-16 perspective-[2500px]">
                    <div ref={carouselRef} className="absolute inset-0 flex items-center justify-center transform-style-3d will-change-transform">
                        {projects.map((project, i) => (
                            <div
                                key={i}
                                ref={(el) => setCardRef(el, i)}
                                onClick={() => openModal(project)}
                                className="absolute w-full h-full glass-strong-fast rounded-3xl overflow-hidden pointer-events-auto shadow-2xl border border-white/20 transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-[0_0_40px_rgba(14,165,233,0.3)] group backface-hidden will-change-transform cursor-pointer"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`} />

                                <div className="relative h-1/2 w-full flex items-center justify-center border-b border-white/10 bg-black/40 overflow-hidden">
                                    {project.image && (
                                        <img 
                                            src={project.image} 
                                            alt={project.title} 
                                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    )}
                                    <div className="text-6xl font-bold font-[family-name:var(--font-space-grotesk)] text-white/20 group-hover:text-accent-cyan/40 transition-colors duration-500 relative z-10 pointer-events-none mix-blend-overlay">
                                        {project.title.charAt(0)}
                                    </div>
                                </div>

                                <div className="relative h-1/2 p-6 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1 font-[family-name:var(--font-space-grotesk)] text-white">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="space-y-3 mt-2">
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech.slice(0, 4).map((t) => (
                                                <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-2 flex justify-between items-center text-[10px] text-accent-cyan font-mono font-bold">
                                        <span>Click for details</span>
                                        <span>↗</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Grid View Mode */}
            {viewMode === "GRID" && (
                <div className="max-w-7xl mx-auto px-6 w-full relative z-20 space-y-10">
                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {["All", "E-Commerce", "AI & WebApp", "3D & Interactive"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { sound.playClick(); setSelectedCategory(cat); }}
                                onMouseEnter={() => sound.playHover()}
                                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 border ${selectedCategory === cat ? "bg-accent-cyan text-black font-bold border-accent-cyan shadow-[0_0_15px_rgba(14,165,233,0.4)]" : "glass-fast text-gray-300 border-white/10 hover:border-white/30"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, i) => (
                            <div
                                key={i}
                                onClick={() => openModal(project)}
                                onMouseEnter={() => sound.playHover()}
                                className="glass-strong rounded-3xl overflow-hidden border border-white/10 hover:border-accent-cyan/40 hover:shadow-[0_0_35px_rgba(14,165,233,0.25)] transition-all duration-500 group cursor-pointer flex flex-col justify-between"
                            >
                                <div>
                                    {/* Thumbnail Banner */}
                                    <div className="relative h-48 w-full bg-black/40 border-b border-white/10 overflow-hidden">
                                        <img 
                                            src={project.image} 
                                            alt={project.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-100"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                        <span className="absolute top-3 right-3 text-[10px] font-mono uppercase bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-accent-cyan border border-white/15">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 space-y-4">
                                        <h3 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-white group-hover:text-accent-cyan transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 pt-2">
                                            {project.tech.map((t) => (
                                                <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                                    <span className="text-xs text-gray-500 font-mono">Tap to view specs</span>
                                    <span className="text-sm text-accent-cyan font-bold group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Project Lightbox Modal */}
            {selectedProject && (
                <div 
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
                    onClick={closeModal}
                >
                    <div 
                        className="glass-strong max-w-3xl w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative my-auto animate-scaleUp text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Banner */}
                        <div className="relative h-64 sm:h-72 w-full bg-black">
                            <img 
                                src={selectedProject.image} 
                                alt={selectedProject.title} 
                                className="w-full h-full object-cover opacity-80"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                            
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                onMouseEnter={() => sound.playHover()}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white hover:bg-black/90 transition-all border border-white/20"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="inline-block text-xs font-mono uppercase bg-accent-cyan/20 text-accent-cyan px-3 py-1 rounded-full border border-accent-cyan/30 mb-2 font-bold">
                                    {selectedProject.category}
                                </span>
                                <h3 className="text-2xl sm:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] text-white">
                                    {selectedProject.title}
                                </h3>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                            <div>
                                <h4 className="text-xs uppercase tracking-widest font-mono text-gray-400 font-bold mb-2">Overview</h4>
                                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                                    {selectedProject.description}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xs uppercase tracking-widest font-mono text-gray-400 font-bold mb-3">Key Features</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {selectedProject.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5 text-xs text-gray-300 font-medium">
                                            <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                                            {feat}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs uppercase tracking-widest font-mono text-gray-400 font-bold mb-3">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tech.map((t) => (
                                        <span key={t} className="text-xs font-mono px-3 py-1 rounded-lg bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer Actions */}
                        <div className="p-6 bg-black/50 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                            <button
                                onClick={closeModal}
                                className="px-5 py-2.5 rounded-full text-xs font-mono text-gray-400 hover:text-white transition-colors"
                            >
                                Close Modal
                            </button>

                            <div className="flex items-center gap-3">
                                <a
                                    href={selectedProject.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => sound.playHover()}
                                    onClick={() => sound.playClick()}
                                    className="px-5 py-2.5 rounded-full glass-fast text-white text-xs font-semibold hover:bg-white/10 transition-all border border-white/20 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    GitHub Code
                                </a>

                                <a
                                    href={selectedProject.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => sound.playHover()}
                                    onClick={() => sound.playSuccess()}
                                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue text-black font-bold text-xs hover:shadow-[0_0_25px_rgba(14,165,233,0.6)] transition-all hover:scale-105 flex items-center gap-2"
                                >
                                    Live Demo ↗
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
