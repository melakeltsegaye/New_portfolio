import { useEffect, useRef } from "react";


export default function ParticleBackground({
  particleCount = 80,
  maxDistance = 140,
  speed = 0.3,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const colors = [
      "hsl(262, 83%, 58%)",
      "hsl(221, 83%, 53%)",
      "hsl(164, 94%, 43%)",
    ];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    }

    function step() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${1 - dist / maxDistance})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(step);
    }

    resize();
    createParticles();
    step();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [particleCount, maxDistance, speed]);

  return (
    <div className={`pointer-events-none ${className}`}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top radial glow */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, hsla(262, 83%, 58%, 0.15), transparent 70%)",
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}