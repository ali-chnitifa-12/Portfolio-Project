// Web Audio API Synthesizer for futuristic UI sound effects (Zero external dependencies)

class SoundSystem {
    private ctx: AudioContext | null = null;
    private isMuted: boolean = false;

    constructor() {
        if (typeof window !== "undefined") {
            const savedMute = localStorage.getItem("portfolio_sound_muted");
            this.isMuted = savedMute === "true";
        }
    }

    private initCtx() {
        if (!this.ctx && typeof window !== "undefined") {
            const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    }

    public toggleMute(): boolean {
        this.isMuted = !this.isMuted;
        if (typeof window !== "undefined") {
            localStorage.setItem("portfolio_sound_muted", String(this.isMuted));
        }
        return this.isMuted;
    }

    public getIsMuted(): boolean {
        return this.isMuted;
    }

    public playHover() {
        if (this.isMuted) return;
        try {
            this.initCtx();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(440, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

            gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch {
            // Ignore audio context autoplay errors
        }
    }

    public playClick() {
        if (this.isMuted) return;
        try {
            this.initCtx();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch {
            // Ignore audio context autoplay errors
        }
    }

    public playSuccess() {
        if (this.isMuted) return;
        try {
            this.initCtx();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now + i * 0.06);

                gain.gain.setValueAtTime(0.03, now + i * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.2);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now + i * 0.06);
                osc.stop(now + i * 0.06 + 0.2);
            });
        } catch {
            // Ignore audio context autoplay errors
        }
    }
}

export const sound = new SoundSystem();
