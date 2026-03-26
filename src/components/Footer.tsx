"use client";

export default function Footer() {
    const socialLinks = [
        {
            label: "GitHub",
            href: "https://github.com/ali-chnitifa-12",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            ),
        },
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
            label: "Email",
            href: "mailto:Alichnitifa30@gmail.com",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
    ];

    const navLinks = [
        { label: "About", href: "#about" },
        { label: "Skills", href: "#skills" },
        { label: "Services", href: "#services" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <footer className="relative z-10 border-t border-white/5">
            {/* Top glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mb-12">
                    {/* Brand */}
                    <div className="space-y-3">
                        <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text">
                            &lt;Ali /&gt;
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                            Junior Full-Stack Developer building high-quality web experiences with React &amp; Laravel.
                        </p>
                    </div>

                    {/* Quick Nav */}
                    <div className="space-y-4">
                        <p className="text-xs text-gray-500 uppercase tracking-[0.3em] font-bold font-[family-name:var(--font-space-grotesk)]">Navigation</p>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-accent-cyan transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-px bg-accent-cyan group-hover:w-4 transition-all duration-300" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact / Social */}
                    <div className="space-y-4">
                        <p className="text-xs text-gray-500 uppercase tracking-[0.3em] font-bold font-[family-name:var(--font-space-grotesk)]">Connect</p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:border-accent-cyan/30 border border-white/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]"
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                        <a href="mailto:Alichnitifa30@gmail.com" className="text-sm text-gray-500 hover:text-accent-cyan transition-colors block">
                            Alichnitifa30@gmail.com
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-600">
                        © {new Date().getFullYear()} Ali Chnitifa. Crafted with React &amp; Next.js
                    </p>
                    <a
                        href="#hero"
                        className="text-xs text-gray-500 hover:text-accent-cyan transition-colors flex items-center gap-1.5 group"
                    >
                        Back to top
                        <svg className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
