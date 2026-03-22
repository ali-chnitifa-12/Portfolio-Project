"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const resumeData = {
    name: "ALI CHNITIFA",
    title: "Développeur Web FullStack",
    location: "Safi, Maroc",
    email: "Alichnitifa30@gmail.com",
    profile: "Développeur Web Full Stack spécialisé en React.js et Laravel, avec une expérience dans le développement d'applications web modernes, d'API REST et de systèmes backend évolutifs. Orienté qualité, performance et expérience utilisateur.",
    skills: {
        frontend: ["React.js", "Next.js", "JavaScript", "Tailwind CSS", "Framer Motion", "GSAP"],
        backend: ["PHP", "Laravel", "Node.js", "Express.js"],
        database: ["MySQL", "MongoDB"],
        tools: ["Git", "GitHub", "API REST", "Postman", "UML", "Scrum"]
    },
    experience: [
        {
            company: "MarsaMarocCompany",
            role: "Stagiaire Développeur Web",
            date: "Mars 2024 – Mai 2024",
            desc: "Développement d’une application web interne pour la gestion et le suivi des employés. Mise en place de l'authentification et de la gestion des rôles. Création d’API REST et intégration du frontend React avec le backend Laravel.",
            stack: "React.js, Laravel, MySQL, Tailwind CSS."
        }
    ],
    projects: [
        {
            name: "Application Fitness Tracker",
            desc: "Suivi des calories et du progrès quotidien, avec génération de programmes d'entraînement personnalisés. Animations et transitions UI fluides avec Framer Motion.",
            stack: "React.js, Node.js, Express.js, Framer Motion."
        },
        {
            name: "Plateforme E-Commerce",
            desc: "Application e-commerce full stack avec catalogue produits et flux panier/commande. Interface moderne et responsive avec animations GSAP.",
            stack: "Laravel, React.js, MySQL, Tailwind CSS, GSAP."
        }
    ],
    education: [
        {
            school: "ISTANTICSafi",
            degree: "Diplôme en Développement Digital",
            date: "2022 – 2024"
        }
    ],
    languages: ["Arabe (Avancé)", "Français (Intermédiaire)", "Anglais (Intermédiaire)"]
};

export default function ResumeSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".resume-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, sectionRef.current!);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="resume" className="section-padding relative overflow-hidden">
            <div ref={containerRef} className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="resume-item text-center mb-16">
                    <h2 className="text-xs sm:text-sm text-accent-cyan tracking-[0.5em] uppercase mb-4 font-[family-name:var(--font-space-grotesk)]">Digital Resume</h2>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-2">{resumeData.name}</h3>
                    <p className="text-lg sm:text-xl text-gray-400 font-light">{resumeData.title}</p>
                    <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">📍 {resumeData.location}</span>
                        <span className="flex items-center gap-2">📧 {resumeData.email}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column: Profile & Skills */}
                    <div className="lg:col-span-1 space-y-10">
                        <div className="resume-item glass-fast glass-shimmer rounded-2xl p-8 border border-white/5">
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-accent-cyan rounded-full" />
                                Profil Professionnel
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {resumeData.profile}
                            </p>
                        </div>

                        <div className="resume-item glass-fast glass-shimmer rounded-2xl p-8 border border-white/5">
                            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                                Compétences
                            </h4>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Frontend</p>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.frontend.map(s => <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-xs text-accent-cyan border border-accent-cyan/20">{s}</span>)}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Backend</p>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.backend.map(s => <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-xs text-purple-300 border border-purple-500/20">{s}</span>)}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Outils</p>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.tools.map(s => <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">{s}</span>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Experience, Projects, Education */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Experience */}
                        <div className="resume-item glass-fast glass-shimmer rounded-2xl p-8 border border-white/5">
                            <h4 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                Expérience Professionnelle
                            </h4>
                            {resumeData.experience.map((exp, idx) => (
                                <div key={idx} className="relative pl-8 border-l border-white/10">
                                    <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    <h5 className="text-xl font-bold text-white">{exp.company}</h5>
                                    <p className="text-accent-cyan text-sm mb-4">{exp.role} | {exp.date}</p>
                                    <p className="text-gray-400 text-sm mb-4">{exp.desc}</p>
                                    <p className="text-xs text-gray-500 font-mono">Stack: {exp.stack}</p>
                                </div>
                            ))}
                        </div>

                        {/* Projects */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {resumeData.projects.map((proj, idx) => (
                                <div key={idx} className="resume-item glass-fast glass-shimmer rounded-2xl p-6 border border-white/5">
                                    <h5 className="text-lg font-bold text-white mb-3">{proj.name}</h5>
                                    <p className="text-gray-400 text-xs mb-4">{proj.desc}</p>
                                    <p className="text-[10px] text-gray-500 font-mono">Stack: {proj.stack}</p>
                                </div>
                            ))}
                        </div>

                        {/* Formation & Languages */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="resume-item glass-fast glass-shimmer rounded-2xl p-6 border border-white/5">
                                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Formation</h4>
                                {resumeData.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <p className="text-sm font-bold text-accent-cyan">{edu.school}</p>
                                        <p className="text-xs text-gray-300">{edu.degree}</p>
                                        <p className="text-[10px] text-gray-500 mt-1">{edu.date}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="resume-item glass-fast glass-shimmer rounded-2xl p-6 border border-white/5">
                                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Langues</h4>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.languages.map(l => <span key={l} className="text-xs text-gray-400 px-3 py-1 bg-white/5 rounded-lg">{l}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            {/* Background elements */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
