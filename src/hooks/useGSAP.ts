"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GSAPCallback = (ctx: gsap.Context) => void;

export function useGSAP(callback: GSAPCallback, deps: unknown[] = []) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            callback(ctx as unknown as gsap.Context);
        }, ref.current);

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return ref;
}
