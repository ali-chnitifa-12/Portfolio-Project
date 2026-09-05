"use client";

import { useEffect, useRef, useState } from "react";
import { sound } from "@/lib/sounds";

const navLinks = [
    { labelEn: "Home", labelFr: "Accueil", href: "#hero" },
    { labelEn: "About", labelFr: "À propos", href: "#about" },
    { labelEn: "Skills", labelFr: "Compétences", href: "#skills" },
    { labelEn: "Services", labelFr: "Services", href: "#services" },
    { labelEn: "Projects", labelFr: "Projets", href: "#projects" },
    { labelEn: "Experience", labelFr: "Parcours", href: "#experience" },
    { labelEn: "Contact", labelFr: "Contact", href: "#contact" },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [lang, setLang] = useState<"FR" | "EN">("FR");

    useEffect(() => {
        setIsMuted(sound.getIsMuted());
        const savedLang = localStorage.getItem("portfolio_lang") as "FR" | "EN";
        if (savedLang) setLang(savedLang);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleSound = () => {
        const muted = sound.toggleMute();
        setIsMuted(muted);
        if (!muted) sound.playClick();
    };

    const toggleLang = () => {
        const newLang = lang === "FR" ? "EN" : "FR";
        setLang(newLang);
        localStorage.setItem("portfolio_lang", newLang);
        sound.playClick();
        window.dispatchEvent(new CustomEvent("langChange", { detail: newLang }));
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        sound.playClick();
        const el = document.querySelector(href);
        setIsMobileOpen(false);
        
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "glass-strong py-3 shadow-xl border-b border-white/10"
                : "py-5 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => handleClick(e, "#hero")}
                    onMouseEnter={() => sound.playHover()}
                    className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text tracking-wider"
                >
                    &lt;Ali /&gt;
                </a>

                {/* Desktop Links & Controls */}
                <div className="hidden md:flex items-center gap-7">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleClick(e, link.href)}
                            onMouseEnter={() => sound.playHover()}
                            className="text-sm text-gray-300 hover:text-accent-cyan transition-colors duration-300 relative group font-medium"
                        >
                            {lang === "FR" ? link.labelFr : link.labelEn}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-cyan to-accent-purple transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}

                    <div className="h-4 w-[1px] bg-white/20 mx-1" />

                    {/* Language Switcher Button */}
                    <button
                        onClick={toggleLang}
                        onMouseEnter={() => sound.playHover()}
                        className="px-2.5 py-1 rounded-full glass-fast border border-white/15 text-xs font-mono font-bold text-accent-cyan hover:border-accent-cyan/50 hover:bg-accent-cyan/10 transition-all duration-300 flex items-center gap-1"
                        title="Changer la langue / Switch language"
                    >
                        <span>{lang === "FR" ? "🇫🇷 FR" : "🇬🇧 EN"}</span>
                    </button>

                    {/* Sound Mute/Unmute Toggle Button */}
                    <button
                        onClick={toggleSound}
                        onMouseEnter={() => sound.playHover()}
                        className="p-2 rounded-full glass-fast border border-white/15 text-gray-300 hover:text-accent-cyan hover:border-accent-cyan/50 transition-all duration-300"
                        title={isMuted ? "Activer le son" : "Désactiver le son"}
                    >
                        {isMuted ? (
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                        ) : (
                            <svg className="w-4 h-4 text-accent-cyan animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        )}
                    </button>
                </div>

                {/* Mobile Controls & Toggle */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        onClick={toggleLang}
                        className="px-2 py-1 rounded-lg glass-fast border border-white/15 text-xs font-mono font-bold text-accent-cyan"
                    >
                        {lang}
                    </button>

                    <button
                        onClick={toggleSound}
                        className="p-1.5 rounded-lg glass-fast border border-white/15 text-gray-300"
                    >
                        {isMuted ? "🔇" : "🔊"}
                    </button>

                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="flex flex-col gap-1.5 p-2 z-50"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileOpen ? "rotate-45 translate-y-2 text-accent-cyan" : ""
                                }`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileOpen ? "-rotate-45 -translate-y-2" : ""
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isMobileOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col gap-8 items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleClick(e, link.href)}
                            className="text-gray-300 hover:text-accent-cyan transition-colors text-3xl font-bold tracking-widest font-[family-name:var(--font-space-grotesk)]"
                        >
                            {lang === "FR" ? link.labelFr : link.labelEn}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
