"use client";

import { useEffect, useRef } from "react";

export default function StarfieldBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Pre-generate star positions once
        const NUM_STARS = 200;
        const stars: { x: number; y: number; size: number; baseOpacity: number; speed: number }[] = [];

        // Mouse tracking for parallax
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        
        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX - canvas.width / 2) * 0.05; // parallax factor
            mouseY = (e.clientY - canvas.height / 2) * 0.05;
        };
        window.addEventListener("mousemove", onMouseMove);

        const createStars = () => {
            stars.length = 0;
            for (let i = 0; i < NUM_STARS; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5 + 0.3,
                    baseOpacity: Math.random() * 0.7 + 0.3,
                    speed: Math.random() * 0.15 + 0.02,
                });
            }
        };

        let frame = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;
            
            // Smooth mouse interpolation (easing)
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                // Slow upward drift
                s.y -= s.speed;
                if (s.y < -2) {
                    s.y = canvas.height + 2;
                    s.x = Math.random() * canvas.width;
                }

                // Simple twinkle every few frames
                const twinkle = s.baseOpacity + Math.sin(frame * 0.02 + i) * 0.2;
                
                // Add parallax offset for each star based on its speed (closer stars move more)
                const parallaxX = s.x + targetX * s.speed * 20;
                const parallaxY = s.y + targetY * s.speed * 20;

                ctx.beginPath();
                ctx.arc(parallaxX, parallaxY, s.size, 0, 6.283);
                ctx.fillStyle = `rgba(255,255,255,${Math.max(0.1, Math.min(1, twinkle))})`;
                ctx.fill();
            }

            animationId = requestAnimationFrame(animate);
        };

        resize();
        createStars();
        animate();

        const onResize = () => { resize(); createStars(); };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: "#000000" }}
        />
    );
}
