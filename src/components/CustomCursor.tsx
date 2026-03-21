"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only show custom cursor on desktop
        if (typeof window === "undefined") return;
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1,
                ease: "power2.out",
            });
            gsap.to(follower, {
                x: e.clientX - 20,
                y: e.clientY - 20,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleHover = () => {
            gsap.to(cursor, {
                scale: 0.5,
                opacity: 0,
                duration: 0.3
            });
            gsap.to(follower, {
                scale: 2.5,
                backgroundColor: "rgba(0, 212, 255, 0.1)",
                borderColor: "rgba(0, 212, 255, 0.5)",
                borderWidth: "2px",
                duration: 0.4,
                ease: "power2.out"
            });
        };

        const handleLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                opacity: 1,
                duration: 0.3
            });
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "transparent",
                borderColor: "rgba(0, 212, 255, 0.3)",
                borderWidth: "1px",
                duration: 0.4,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", moveCursor);

        const interactiveElements = document.querySelectorAll("a, button, input, textarea");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleHover);
            el.addEventListener("mouseleave", handleLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleHover);
                el.removeEventListener("mouseleave", handleLeave);
            });
        };
    }, []);

    // Force show for now to debug visibility
    // if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    //     return null;
    // }

    return (
        <>
            <div ref={cursorRef} className="custom-cursor hidden md:block" />
            <div ref={followerRef} className="cursor-follower hidden md:block" />
        </>
    );
}
