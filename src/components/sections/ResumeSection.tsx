"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const resumeData = {
    name: "ALI CHNITIFA",
    title: "Développeur Web Full-Stack",
    subtitle: "React · Laravel · MySQL · Node.js · Next.js",
    location: "Safi, Maroc",
    email: "alichnitifa30@gmail.com",
    linkedin: "linkedin.com/in/ali-chnitifa-7926b5290",
    github: "github.com/ali-chnitifa-12",
    profile: "Développeur Web Full-Stack junior avec expérience pratique dans la création d'applications end-to-end avec React et Laravel. Je conçois des API REST fiables, des bases de données MySQL et des interfaces responsives orientées utilisateur.",
    skills: {
        frontend: ["React.js", "Next.js", "JavaScript", "TypeScript", "TailwindCSS", "Redux", "GSAP", "Framer Motion"],
        backend: ["Laravel", "PHP", "Node.js", "Express.js", "REST API", "Laravel Sanctum"],
        database: ["MySQL", "MongoDB", "PostgreSQL", "Oracle Admin"],
        tools: ["Git", "GitHub", "Postman", "UML", "Agile/Scrum", "WordPress", "n8n", "OpenAI API"]
    },
    experience: [
        {
            company: "Freelance",
            role: "Freelance Full-Stack Developer",
            date: "2024 – Présent",
            bullets: [
                "Développement d'applications web modernes avec React, Next.js, Node.js et MongoDB.",
                "Création d'interfaces responsives et animées avec TailwindCSS, GSAP et Framer Motion.",
            ],
            stack: ["React", "Next.js", "Node.js", "MongoDB", "TailwindCSS", "GSAP", "Framer Motion"]
        },
        {
            company: "MarsaMaroc, Safi",
            role: "Stagiaire Développeur Web",
            date: "Mars – Mai 2024",
            bullets: [
                "Développement d'une application web interne pour le suivi et la gestion des employés.",
                "Mise en place de l'authentification par rôles et du contrôle d'accès avec Laravel Sanctum.",
                "Conception d'API REST consommées par un frontend React et structuration d'une base MySQL normalisée.",
            ],
            stack: ["React.js", "Laravel", "MySQL", "Tailwind CSS"]
        }
    ],
    projects: [
        {
            name: "Hanibal Games - Pack Builder",
            desc: "Plateforme e-commerce gaming avec catalogue de +200 jeux, filtres par catégorie (Denuvo, 3rd Party, Simulators), calcul automatique de pack et commande instantanée via WhatsApp.",
            stack: ["React", "Next.js", "TailwindCSS", "E-Commerce", "REST API"],
            link: "https://hanibal-games.vercel.app/",
            highlight: true,
        },
        {
            name: "FitTrack AI Fitness Dashboard",
            desc: "Application fitness avec calories/macros, routines personnalisées, challenges et analytics. Intégration OpenAI pour recommandations nutritionnelles et AI Food Scanner basé image.",
            stack: ["React", "Node.js", "Express.js", "TailwindCSS", "Framer Motion", "OpenAI API"],
            link: "https://fiitnesstracking.vercel.app/dashboard",
            highlight: false,
        },
        {
            name: "E-Commerce Ecosystem",
            desc: "Plateforme e-commerce avec JWT auth, admin dashboard, Product CRUD, panier et API REST. Base de données MySQL et interface responsive orientée expérience utilisateur.",
            stack: ["React", "Laravel", "MySQL", "Redux", "REST API"],
            link: "https://ecommerce-app-nine-gules.vercel.app",
            highlight: false,
        },
        {
            name: "Luxury Hotel Booking Engine",
            desc: "Système de réservation premium avec flow en 5 étapes, gestion d'état temps réel et animations immersives.",
            stack: ["React", "Redux", "GSAP", "TailwindCSS"],
            link: "https://hotel-booking-three-xi.vercel.app",
            highlight: false,
        },
    ],
    personalProjects: [
        { name: "Hanibal Games", desc: "Catalogue de 200+ jeux, pack builder et WhatsApp Checkout." },
        { name: "Car Rental Platform", desc: "Pricing dynamique, UI 3D et responsive." },
        { name: "Snapchat Men Luxury Store", desc: "Filtres, recherche, stock badges et animations." },
        { name: "Klawdz Vaping Shop", desc: "Catalogue, panier, filtres de prix et commande WhatsApp." }
    ],
    education: [
        {
            school: "École High Tech, Rabat",
            degree: "Licence professionnelle en Génie Informatique",
            date: "2025 – Présent",
            detail: "Formation supérieure spécialisée en ingénierie informatique et développement logiciel."
        },
        {
            school: "ISTA NTIC, Safi",
            degree: "Technicien spécialisé en Développement Digital, option Full-Stack",
            date: "2022 – 2024",
            detail: "Développement web full-stack, bases de données, UML, méthodologies Agile."
        },
        {
            school: "Lycée Mohamed Ben Hassan El Ouazzani, Safi",
            degree: "Baccalauréat en Sciences Physiques",
            date: "2020 – 2021",
            detail: "Formation scientifique axée sur la physique-chimie et les mathématiques."
        }
    ],
    certifications: [
        {
            title: "Developing Front-End Apps with React",
            issuer: "IBM",
            date: "Apr 2026",
            id: "M2FG36DXDWOJ"
        },
        {
            title: "Maximize Productivity With AI Tools",
            issuer: "Google",
            date: "Apr 2026",
            id: "N3QYRCNT85JO"
        }
    ],
    softSkills: ["Gestion du temps", "Travail en équipe", "Résolution de problèmes", "Adaptabilité"],
    languages: [
        { lang: "Arabe", level: "Langue maternelle" },
        { lang: "Français", level: "Intermédiaire" },
        { lang: "Anglais", level: "Intermédiaire" },
    ]
};

export default function ResumeSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".resume-item", {
                y: 40,
                opacity: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 82%",
                }
            });
        }, sectionRef.current!);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="resume" className="section-padding relative overflow-hidden">
            <div ref={containerRef} className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Section Label */}
                <div className="resume-item text-center mb-16">
                    <p className="text-xs sm:text-sm text-accent-cyan tracking-[0.5em] uppercase mb-4 font-[family-name:var(--font-space-grotesk)]">
                        Digital Resume
                    </p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] mb-3 text-white">
                        {resumeData.name}
                    </h2>
                    <p className="text-xl text-accent-cyan font-medium mb-1">{resumeData.title}</p>
                    <p className="text-sm text-gray-500 font-mono tracking-widest">{resumeData.subtitle}</p>

                    {/* Contact Bar */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
                        <a href={`mailto:${resumeData.email}`} className="flex items-center gap-1.5 hover:text-accent-cyan transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {resumeData.email}
                        </a>
                        <a href={`https://${resumeData.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-accent-cyan transition-colors">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            LinkedIn
                        </a>
                        <a href={`https://${resumeData.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-accent-cyan transition-colors">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            GitHub
                        </a>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {resumeData.location}
                        </span>
                    </div>

                    {/* Download CTA */}
                    <div className="mt-8">
                        <a
                            href="/cv.pdf"
                            download
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue text-white font-semibold text-sm hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all duration-300 hover:-translate-y-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            Télécharger CV (PDF)
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── Left Column ── */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Profile */}
                        <div className="resume-item glass-fast rounded-2xl p-7 border border-white/8 hover:border-accent-cyan/20 transition-colors">
                            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
                                <span className="w-2 h-2 bg-accent-cyan rounded-full shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                                Profil
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{resumeData.profile}</p>
                        </div>

                        {/* Skills */}
                        <div className="resume-item glass-fast rounded-2xl p-7 border border-white/8 hover:border-accent-purple/20 transition-colors">
                            <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest">
                                <span className="w-2 h-2 bg-accent-purple rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                                Compétences Techniques
                            </h4>
                            <div className="space-y-5">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2 font-bold">Frontend</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {resumeData.skills.frontend.map(s => (
                                            <span key={s} className="px-2.5 py-1 bg-accent-cyan/10 rounded-lg text-[11px] text-accent-cyan border border-accent-cyan/20 font-mono">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2 font-bold">Backend</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {resumeData.skills.backend.map(s => (
                                            <span key={s} className="px-2.5 py-1 bg-accent-purple/10 rounded-lg text-[11px] text-purple-300 border border-purple-500/20 font-mono">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2 font-bold">Bases de données</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {resumeData.skills.database.map(s => (
                                            <span key={s} className="px-2.5 py-1 bg-blue-500/10 rounded-lg text-[11px] text-blue-300 border border-blue-500/20 font-mono">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2 font-bold">Outils</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {resumeData.skills.tools.map(s => (
                                            <span key={s} className="px-2.5 py-1 bg-white/5 rounded-lg text-[11px] text-gray-400 border border-white/10 font-mono">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="resume-item glass-fast rounded-2xl p-7 border border-white/8 hover:border-yellow-500/20 transition-colors">
                            <h4 className="text-sm font-bold text-white mb-5 flex items-center gap-2 uppercase tracking-widest">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                                Certifications
                            </h4>
                            <div className="space-y-4">
                                {resumeData.certifications.map((c, idx) => (
                                    <div key={idx} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                        <p className="text-xs font-bold text-white">{c.title}</p>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-[11px] text-accent-cyan">{c.issuer} ({c.date})</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 font-mono mt-0.5">ID: {c.id}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Soft Skills */}
                        <div className="resume-item glass-fast rounded-2xl p-7 border border-white/8">
                            <h4 className="text-sm font-bold text-white mb-5 flex items-center gap-2 uppercase tracking-widest">
                                <span className="w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                                Soft Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {resumeData.softSkills.map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-teal-500/10 rounded-lg text-xs text-teal-300 border border-teal-500/20 font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="resume-item glass-fast rounded-2xl p-7 border border-white/8">
                            <h4 className="text-sm font-bold text-white mb-5 flex items-center gap-2 uppercase tracking-widest">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                Langues
                            </h4>
                            <div className="space-y-3">
                                {resumeData.languages.map(l => (
                                    <div key={l.lang} className="flex justify-between items-center">
                                        <span className="text-sm text-gray-300 font-medium">{l.lang}</span>
                                        <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 font-mono uppercase">{l.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* ── Right Column ── */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Education */}
                        <div className="resume-item glass-fast rounded-2xl p-7 border border-white/8">
                            <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest">
                                <span className="w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
                                Formations
                            </h4>
                            <div className="space-y-6">
                                {resumeData.education.map((edu, idx) => (
                                    <div key={idx} className="relative pl-6 border-l border-white/10">
                                        <div className="absolute top-1.5 left-[-4.5px] w-[8px] h-[8px] bg-orange-400 rounded-full" />
                                        <div className="flex flex-wrap justify-between items-start gap-1">
                                            <h5 className="text-base font-bold text-white">{edu.degree}</h5>
                                            <span className="text-[10px] text-gray-500 font-mono bg-white/5 px-2.5 py-0.5 rounded border border-white/10">{edu.date}</span>
                                        </div>
                                        <p className="text-sm font-semibold text-accent-cyan mt-0.5">{edu.school}</p>
                                        <p className="text-xs text-gray-400 mt-1">{edu.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="resume-item glass-fast rounded-2xl p-7 border border-white/8 hover:border-blue-500/20 transition-colors">
                            <h4 className="text-sm font-bold text-white mb-7 flex items-center gap-2 uppercase tracking-widest">
                                <span className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                                Expériences Professionnelles
                            </h4>
                            <div className="space-y-8">
                                {resumeData.experience.map((exp, idx) => (
                                    <div key={idx} className="relative pl-8 border-l border-white/10">
                                        <div className="absolute top-1 left-[-5px] w-[9px] h-[9px] bg-blue-400 rounded-full shadow-[0_0_12px_rgba(96,165,250,0.7)]" />
                                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                            <div>
                                                <h5 className="text-lg font-bold text-white">{exp.role}</h5>
                                                <p className="text-accent-cyan text-sm font-medium">{exp.company}</p>
                                            </div>
                                            <span className="text-[11px] text-gray-500 font-mono bg-white/5 px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">{exp.date}</span>
                                        </div>
                                        <ul className="space-y-2 mb-4 mt-3">
                                            {exp.bullets.map((b, bi) => (
                                                <li key={bi} className="flex items-start gap-2 text-sm text-gray-400">
                                                    <span className="w-1 h-1 bg-accent-cyan rounded-full mt-2 shrink-0" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-wrap gap-1.5">
                                            {exp.stack.map(t => (
                                                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 font-mono">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Flagship Projects */}
                        <div className="resume-item">
                            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
                                <span className="w-2 h-2 bg-pink-400 rounded-full shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
                                Projets Phares
                            </h4>
                            <div className="space-y-4">
                                {resumeData.projects.map((proj, idx) => (
                                    <div key={idx} className={`glass-fast rounded-2xl p-6 border transition-all duration-300 ${proj.highlight ? "border-accent-cyan/25 bg-accent-cyan/5 hover:border-accent-cyan/40" : "border-white/8 hover:border-white/15"}`}>
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-white hover:text-accent-cyan transition-colors flex items-center gap-2">
                                                {proj.name}
                                                <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                            </a>
                                            {proj.highlight && (
                                                <span className="text-[9px] text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/30 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider shrink-0">
                                                    Flagship
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-400 text-sm mb-3 leading-relaxed">{proj.desc}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {proj.stack.map(t => (
                                                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10 font-mono">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Personal Projects */}
                        <div className="resume-item glass-fast rounded-2xl p-7 border border-white/8">
                            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
                                <span className="w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                                Projets Personnels
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {resumeData.personalProjects.map((p, idx) => (
                                    <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <p className="text-xs font-bold text-white mb-1">{p.name}</p>
                                        <p className="text-[11px] text-gray-400 leading-relaxed">{p.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Background glow elements */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
