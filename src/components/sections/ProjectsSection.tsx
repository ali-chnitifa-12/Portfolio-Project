"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "E-Commerce Ecosystem",
        description: "A professional full-stack commerce solution. I engineered a custom REST API in Laravel to power a dynamic React frontend, featuring secure JWT authentication and a sophisticated admin control panel.",
        image: "/projects/ecommerce.png",
        tech: ["React", "Laravel", "MySQL", "REST API", "Redux"],
        features: ["JWT Auth", "Admin Dashboard", "Product CRUD", "Cart System"],
        liveLink: "#",
        githubLink: "https://github.com/ali-chnitifa-12",
        gradient: "from-blue-600/30 to-purple-600/30",
    },
    {
        title: "Luxury Hotel Engine",
        description: "Architected a premium reservation system focusing on high-end UI animations. Implemented a complex 5-step booking algorithm with real-time state synchronization.",
        image: "/projects/hotel.png",
        tech: ["React", "Tailwind", "GSAP", "Redux"],
        features: ["3D Room Tours", "Booking Logic", "State Persistence"],
        liveLink: "#",
        githubLink: "https://github.com/ali-chnitifa-12",
        gradient: "from-cyan-500/20 to-blue-500/20",
    },
    {
        title: "Futuristic Car Rental",
        description: "Built a high-performance localized car rental platform. Focused on optimizing asset loading for 3D models and ensuring sub-second page transitions.",
        image: "/projects/carrental.png",
        tech: ["React", "Three.js", "TailwindCSS"],
        features: ["3D Car Config", "Dynamic Pricing", "Responsive UI"],
        liveLink: "#",
        githubLink: "https://github.com/ali-chnitifa-12",
        gradient: "from-emerald-500/20 to-cyan-500/20",
    },
    {
        title: "Restaurant Platform",
        description: "Designed and built a modern restaurant showcase platform with rich menu displays, table reservation flow, and an immersive visual experience to drive customer engagement.",
        image: "/projects/restaurant.png",
        tech: ["React", "TailwindCSS", "GSAP", "Node.js"],
        features: ["Menu Management", "Table Booking", "Smooth Animations", "Responsive UI"],
        liveLink: "#",
        githubLink: "https://github.com/ali-chnitifa-12",
        gradient: "from-orange-500/20 to-red-500/20",
    },
    {
        title: "FitTrack",
        description: "A comprehensive fitness & wellness platform covering nutrition, supplements, flexibility, mindfulness, progress tracking, and community support — all in one sleek dashboard.",
        image: "/projects/fittrack.png",
        tech: ["React", "TailwindCSS", "Chart.js", "Node.js"],
        features: ["Progress Tracking", "Nutrition Guide", "Community", "Mindfulness"],
        liveLink: "#",
        githubLink: "https://github.com/ali-chnitifa-12",
        gradient: "from-teal-500/20 to-green-500/20",
    },
];

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(sectionRef.current, { perspective: 2500 });
            gsap.set(carouselRef.current, { transformStyle: "preserve-3d" });

            // Initialize cards in a 3D Rolodex/Carousel stack
            const totalCards = projects.length;
            const isMobile = window.innerWidth < 768;
            const radius = isMobile ? 320 : 600; // Smaller radius for mobile
            const cardScale = isMobile ? 0.85 : 1;

            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                // Distribute evenly around a circle across X axis
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

            // Rolodex scroll animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                }
            });

            // Entrance: Title fades in and drops down
            gsap.from(titleRef.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // The main rotation of the entire carousel
            // Rotate only (n-1)/n of a full circle so the first card doesn't reappear at the end
            const maxRotation = -360 * ((totalCards - 1) / totalCards);
            tl.to(carouselRef.current, {
                rotationY: maxRotation,
                ease: "none",
                duration: 1
            });

            // Add simple mouse movement over the section to slightly tilt the entire carousel
            const handleMouseMove = (e: MouseEvent) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10 deg
                const y = (e.clientY / window.innerHeight - 0.5) * -20;
                gsap.to(carouselRef.current, {
                    rotationX: y,
                    rotationZ: x * 0.2,
                    duration: 1,
                    ease: "power2.out"
                });
            };

            window.addEventListener("mousemove", handleMouseMove);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };

        }, sectionRef.current!);

        return () => ctx.revert();
    }, []);

    const setCardRef = (el: HTMLDivElement | null, index: number) => {
        cardsRef.current[index] = el;
    };

    return (
        <section ref={sectionRef} id="projects" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent">
            {/* Title */}
            <div ref={titleRef} className="text-center mb-12 sm:mb-16 transform-style-3d px-6 absolute top-16 sm:top-20 z-50 pointer-events-none" style={{ transform: "translateZ(50px)" }}>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4 drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">
                    My <span className="gradient-text">Projects</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto rounded-full mb-6" />
                <p className="text-sm sm:text-base text-gray-400 font-medium tracking-wide max-w-2xl mx-auto bg-black/50 backdrop-blur-md px-4 sm:px-6 py-2 rounded-full border border-white/10">
                    Scroll to rotate the 3D Carousel
                </p>
            </div>

            {/* 3D Carousel Container */}
            <div className="relative w-full max-w-[85vw] sm:max-w-md h-[400px] sm:h-[450px] mt-10 perspective-[2500px]">
                <div ref={carouselRef} className="absolute inset-0 flex items-center justify-center transform-style-3d will-change-transform">
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            ref={(el) => setCardRef(el, i)}
                            className="absolute w-full h-full glass-strong-fast rounded-3xl overflow-hidden pointer-events-auto shadow-2xl border border-white/20 transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-[0_0_40px_rgba(14,165,233,0.3)] group backface-hidden will-change-transform"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`} />

                            <div className="relative h-1/2 w-full flex items-center justify-center border-b border-white/10 bg-black/40 overflow-hidden">
                                {project.image && (
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                )}
                                <div className="text-6xl font-bold font-[family-name:var(--font-space-grotesk)] text-white/20 group-hover:text-accent-cyan/40 transition-colors duration-500 relative z-10 pointer-events-none mix-blend-overlay">
                                    {project.title.charAt(0)}
                                </div>
                            </div>

                            <div className="relative h-1/2 p-6 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)]">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="space-y-4 mt-4">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                                        {(project as any).features?.map((f: string) => (
                                            <li key={f} className="text-[10px] text-gray-400 flex items-center gap-1.5">
                                                <span className="w-1 h-1 bg-accent-cyan rounded-full" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Actions hover */}
                                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                                    <a href={project.githubLink} className="p-4 rounded-full bg-white/10 text-white hover:bg-white/30 hover:scale-110 transition-all border border-white/20">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
