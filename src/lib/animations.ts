import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (
    targets: gsap.TweenTarget,
    options?: {
        delay?: number;
        duration?: number;
        y?: number;
        stagger?: number;
        scrollTrigger?: ScrollTrigger.Vars;
    }
) => {
    const { delay = 0, duration = 1, y = 60, stagger = 0.15, scrollTrigger } = options || {};
    return gsap.from(targets, {
        y,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger,
    });
};

export const staggerReveal = (
    targets: gsap.TweenTarget,
    options?: {
        delay?: number;
        duration?: number;
        stagger?: number;
        scrollTrigger?: ScrollTrigger.Vars;
    }
) => {
    const { delay = 0, duration = 0.8, stagger = 0.1, scrollTrigger } = options || {};
    return gsap.from(targets, {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration,
        delay,
        stagger,
        ease: "power2.out",
        scrollTrigger,
    });
};

export const textReveal = (
    targets: gsap.TweenTarget,
    options?: {
        delay?: number;
        duration?: number;
        scrollTrigger?: ScrollTrigger.Vars;
    }
) => {
    const { delay = 0, duration = 1.2, scrollTrigger } = options || {};
    return gsap.from(targets, {
        y: 100,
        opacity: 0,
        skewY: 5,
        duration,
        delay,
        ease: "power4.out",
        scrollTrigger,
    });
};

export const parallaxFloat = (
    targets: gsap.TweenTarget,
    options?: {
        y?: number;
        duration?: number;
        scrollTrigger?: ScrollTrigger.Vars;
    }
) => {
    const { y = -50, duration = 1, scrollTrigger } = options || {};
    return gsap.to(targets, {
        y,
        duration,
        ease: "none",
        scrollTrigger: scrollTrigger || {
            scrub: true,
        },
    });
};

export const scaleIn = (
    targets: gsap.TweenTarget,
    options?: {
        delay?: number;
        duration?: number;
        scrollTrigger?: ScrollTrigger.Vars;
    }
) => {
    const { delay = 0, duration = 1, scrollTrigger } = options || {};
    return gsap.from(targets, {
        scale: 0,
        opacity: 0,
        duration,
        delay,
        ease: "back.out(1.7)",
        scrollTrigger,
    });
};
