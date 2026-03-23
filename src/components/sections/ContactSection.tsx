"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ali-chnitifa-7926b5290/",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: "GitHub",
        href: "https://github.com/ali-chnitifa-12",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        label: "Email",
        href: "mailto:Alichnitifa30@gmail.com",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
            </svg>
        ),
    },
];

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(sectionRef.current, { perspective: 1500 });
            gsap.set(containerRef.current, { transformStyle: "preserve-3d" });

            // 1. Singularity Pull Effect on Scroll
            const isMobile = window.innerWidth < 768;
            gsap.from(containerRef.current, {
                z: isMobile ? -500 : -2000,
                rotateX: isMobile ? -30 : -60,
                scale: isMobile ? 0.5 : 0.2,
                opacity: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "center center",
                    scrub: 1.5,
                }
            });

            // 2. Interactive Singularity Hover Warp
            const handleMouseMove = (e: MouseEvent) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 30; // -15 to +15 deg
                const y = (e.clientY / window.innerHeight - 0.5) * -30;

                // Form tilts away from mouse, emphasizing depth
                gsap.to(containerRef.current, {
                    rotationX: y,
                    rotationY: x,
                    z: 50, // Slight pull towards camera
                    duration: 1,
                    ease: "power2.out"
                });

                // Inner elements tilt opposite to create parallax pop
                gsap.to(formRef.current, {
                    x: -x * 2,
                    y: y * 2,
                    z: 100, // pop out
                    duration: 1,
                    ease: "power2.out"
                });
            };

            const handleMouseLeave = () => {
                gsap.to([containerRef.current, formRef.current], {
                    rotationX: 0,
                    rotationY: 0,
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.3)"
                });
            };

            const sectionEl = sectionRef.current;
            if (sectionEl) {
                sectionEl.addEventListener("mousemove", handleMouseMove);
                sectionEl.addEventListener("mouseleave", handleMouseLeave);
            }

            return () => {
                if (sectionEl) {
                    sectionEl.removeEventListener("mousemove", handleMouseMove);
                    sectionEl.removeEventListener("mouseleave", handleMouseLeave);
                }
            };

        }, sectionRef.current!);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            // Crazy shatter animation on submit ONLY on success
            gsap.to(formRef.current, {
                scale: 0,
                rotationZ: 360,
                opacity: 0,
                duration: 1,
                ease: "back.in(2)",
                onComplete: () => {
                    setSubmitStatus({ type: 'success', message: 'Message seemingly pulled into the singularity! (Sent successfully)' });
                    setFormData({ name: "", email: "", message: "" });

                    // Clear the success message after 5 seconds
                    setTimeout(() => setSubmitStatus({ type: null, message: '' }), 5000);

                    gsap.to(formRef.current, {
                        scale: 1,
                        rotationZ: 0,
                        opacity: 1,
                        duration: 1.5,
                        ease: "elastic.out(1, 0.5)"
                    });
                }
            });
        } catch (error: any) {
            setSubmitStatus({
                type: 'error',
                message: error.message || 'Something went wrong. Please try again.'
            });
            // Error jiggle animation
            gsap.fromTo(formRef.current,
                { x: -10 },
                { x: 10, duration: 0.1, yoyo: true, repeat: 5, ease: "power1.inOut", onComplete: () => { gsap.set(formRef.current, { x: 0 }); } }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section ref={sectionRef} id="contact" className="section-padding relative min-h-screen flex items-center justify-center z-10 [perspective:1500px]">
            {/* Background singularity visualization - Optimized for perf */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border border-cyan-500/20" />
                <div className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full border border-purple-500/20" />
                <div className="absolute w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full bg-black shadow-[0_0_50px_rgba(168,85,247,0.3)]" />
            </div>

            <div ref={containerRef} className="max-w-4xl mx-auto w-full transform-style-3d will-change-transform">
                {/* Section Title */}
                <div className="text-center mb-16 transform-style-3d" style={{ transform: "translateZ(50px)" }}>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4 drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto rounded-full mb-6" />
                    <p className="text-gray-400 font-medium tracking-wide max-w-2xl mx-auto">
                        I&apos;m currently available for <span className="text-accent-cyan">Junior Developer roles</span> and freelance opportunities. Let&apos;s build something exceptional together.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch transform-style-3d">
                    {/* Contact Form - Optimized glass */}
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="lg:col-span-3 glass-strong-fast rounded-3xl p-8 space-y-6 shadow-2xl border border-white/20 transform-style-3d will-change-transform"
                        style={{ transform: "translateZ(100px)" }} // Pop out form
                    >
                        <div>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Your Name"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-300"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Your Email"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-300"
                                required
                            />
                        </div>

                        <div>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Message"
                                rows={5}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-300 resize-none"
                                required
                            />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center group relative overflow-hidden h-14 disabled:opacity-50 disabled:cursor-not-allowed">
                            <span className="relative z-10 font-[family-name:var(--font-space-grotesk)] tracking-wider">
                                {isSubmitting ? "TRANSMITTING..." : "Send Message"}
                            </span>
                            {/* Hover galaxy effect on button */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </button>

                        {submitStatus.message && (
                            <div className={`p-4 rounded-xl text-center font-medium font-[family-name:var(--font-space-grotesk)] transition-all ${submitStatus.type === 'success'
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-red-500/10 text-red-400 border border-red-500/30'
                                }`}>
                                {submitStatus.message}
                            </div>
                        )}
                    </form>

                    {/* Social Links floating in 3D */}
                    <div className="lg:col-span-2 flex flex-col justify-center gap-6 transform-style-3d" style={{ transform: "translateZ(60px)" }}>
                        {socialLinks.map((link, i) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 glass rounded-2xl p-4 group hover:scale-110 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300"
                                style={{ transform: `translateZ(${i * 20}px)` }} // Stagger 3D depth
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent-cyan group-hover:text-white group-hover:bg-purple-500/40 transition-all duration-300 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]">
                                    {link.icon}
                                </div>
                                <div>
                                    <div className="text-lg font-bold font-[family-name:var(--font-space-grotesk)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-cyan group-hover:to-accent-purple transition-all">
                                        {link.label}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
