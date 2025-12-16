import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

export default function HeroSpider() {
  const particlesInit = useCallback(
    async (engine: unknown) => {
      await loadSlim(engine as any);
    },
    []
  );

  return (
    <div className="hero-spider-container">
      <Particles
        id="hero-spider"
        init={particlesInit}
        options={{
          fullScreen: { enable: true },
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: {
              value: 120,
              density: { 
                enable: true, 
                area: 800 
              },
            },
            color: { 
              value: "#ffffff" 
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.6,
              random: false,
              animation: {
                enable: false,
              },
            },
            size: {
              value: 3,
              random: {
                enable: true,
                minimumValue: 1,
              },
            },
            links: {
              enable: true,
              distance: 180,
              color: "#ffffff",
              opacity: 0.5,
              width: 1.5,
              triangles: {
                enable: false,
              },
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              random: false,
              straight: false,
              outModes: {
                default: "bounce",
              },
              attract: {
                enable: false,
              },
            },
            collisions: {
              enable: true,
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 200,
                links: {
                  opacity: 0.8,
                  blink: false,
                  consent: false,
                },
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}