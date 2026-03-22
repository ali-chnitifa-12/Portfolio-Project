"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Frontend Development",
    desc: "Building extremely fast, interactive, and premium user interfaces using React, Next.js, and advanced animations (GSAP, Framer Motion).",
    icon: "✨",
    color: "from-cyan-500/20 to-blue-500/5",
    border: "border-cyan-500/30",
  },
  {
    title: "Backend Architecture",
    desc: "Designing robust, scalable, and secure server-side applications and APIs with Node.js, Express, and Laravel.",
    icon: "⚙️",
    color: "from-purple-500/20 to-pink-500/5",
    border: "border-purple-500/30",
  },
  {
    title: "Database Design",
    desc: "Structuring highly optimized database schemas using MongoDB, MySQL, and PostgreSQL for maximum performance and reliability.",
    icon: "🗄️",
    color: "from-green-500/20 to-emerald-500/5",
    border: "border-green-500/30",
  },
  {
    title: "UI/UX & 3D Web",
    desc: "Crafting immersive visual experiences and futuristic layouts with TailwindCSS, absolute glassmorphism, and 3D web elements.",
    icon: "🎨",
    color: "from-orange-500/20 to-amber-500/5",
    border: "border-orange-500/30",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation for the section
      gsap.from(".service-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".service-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      // 2. 3D Hover Effect on Cards
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const onMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left; // x position within the element.
          const y = e.clientY - rect.top;  // y position within the element.

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -15; // Max rotation 15deg
          const rotateY = ((x - centerX) / centerX) * 15;

          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 1000,
            transformOrigin: "center",
          });
          
          // Glow follow mouse
          const glow = card.querySelector(".hover-glow") as HTMLElement;
          if (glow) {
            gsap.to(glow, {
              x: x - rect.width / 2,
              y: y - rect.height / 2,
              opacity: 1,
              duration: 0.2,
            });
          }
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          });
          
          const glow = card.querySelector(".hover-glow") as HTMLElement;
          if (glow) {
            gsap.to(glow, { opacity: 0, duration: 0.4 });
          }
        };

        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseleave", onMouseLeave);

        return () => {
          card.removeEventListener("mousemove", onMouseMove);
          card.removeEventListener("mouseleave", onMouseLeave);
        };
      });

    }, sectionRef.current!);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 service-header">
          <h2 className="text-sm text-accent-cyan tracking-[0.5em] uppercase mb-4 font-[family-name:var(--font-space-grotesk)] flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-accent-cyan/50 block"></span>
            What I Do
            <span className="w-12 h-[1px] bg-accent-cyan/50 block"></span>
          </h2>
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-[family-name:var(--font-space-grotesk)] mb-6">
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">Services</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            I engineer modern web solutions combining technical excellence with premium visual aesthetics.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-[1200px]">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`service-card relative w-full rounded-2xl p-px transform-style-3d will-change-transform group cursor-pointer`}
            >
              {/* Animated Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className={`relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl border ${service.border} rounded-2xl p-10 overflow-hidden`}>
                {/* Mouse Follow Glow */}
                <div className="hover-glow absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-[60px] pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2 mix-blend-screen" />

                <div className="relative z-10">
                  <div className="text-5xl mb-6 bg-white/5 w-20 h-20 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-space-grotesk)] group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>

                {/* Cyber accent lines */}
                <div className="absolute bottom-0 right-10 w-32 h-[1px] bg-gradient-to-r from-transparent to-white/20 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute right-0 bottom-10 w-[1px] h-32 bg-gradient-to-b from-transparent to-white/20 transform translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
