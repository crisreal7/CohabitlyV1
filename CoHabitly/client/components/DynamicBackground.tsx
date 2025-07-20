import { useEffect, useState } from "react";

interface DynamicBackgroundProps {
  demoType: "roommate" | "couples" | "student" | "admin";
  intensity?: "low" | "medium" | "high";
  className?: string;
}

export default function DynamicBackground({
  demoType,
  intensity = "medium",
  className = "",
}: DynamicBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeConfig = () => {
    switch (demoType) {
      case "couples":
        return {
          primary: "hsl(350, 82%, 82%)",
          secondary: "hsl(15, 77%, 76%)",
          accent: "hsl(340, 65%, 70%)",
          particles: "hsl(350, 70%, 85%)",
          glow: "hsl(345, 75%, 80%)",
        };
      case "roommate":
        return {
          primary: "hsl(217, 91%, 60%)",
          secondary: "hsl(200, 98%, 39%)",
          accent: "hsl(230, 85%, 65%)",
          particles: "hsl(220, 90%, 70%)",
          glow: "hsl(210, 95%, 65%)",
        };
      case "student":
        return {
          primary: "hsl(142, 70%, 45%)",
          secondary: "hsl(180, 98%, 39%)",
          accent: "hsl(160, 75%, 50%)",
          particles: "hsl(150, 80%, 55%)",
          glow: "hsl(170, 85%, 50%)",
        };
      case "admin":
        return {
          primary: "hsl(259, 94%, 51%)",
          secondary: "hsl(280, 87%, 66%)",
          accent: "hsl(270, 90%, 58%)",
          particles: "hsl(265, 92%, 63%)",
          glow: "hsl(275, 88%, 68%)",
        };
      default:
        return {
          primary: "hsl(217, 91%, 60%)",
          secondary: "hsl(200, 98%, 39%)",
          accent: "hsl(230, 85%, 65%)",
          particles: "hsl(220, 90%, 70%)",
          glow: "hsl(210, 95%, 65%)",
        };
    }
  };

  const theme = getThemeConfig();
  const intensityMap = {
    low: { opacity: 0.05, blur: 40, size: 0.8 },
    medium: { opacity: 0.1, blur: 30, size: 1 },
    high: { opacity: 0.15, blur: 20, size: 1.2 },
  };

  const config = intensityMap[intensity];

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none transition-all duration-1000 ease-in-out ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 20% 30%, ${theme.primary}${Math.round(
            config.opacity * 255,
          )
            .toString(16)
            .padStart(2, "0")} 0%, transparent 50%),
          radial-gradient(ellipse 60% 70% at 80% 20%, ${theme.secondary}${Math.round(
            config.opacity * 200,
          )
            .toString(16)
            .padStart(2, "0")} 0%, transparent 50%),
          radial-gradient(ellipse 40% 80% at 40% 80%, ${theme.accent}${Math.round(
            config.opacity * 150,
          )
            .toString(16)
            .padStart(2, "0")} 0%, transparent 50%),
          radial-gradient(ellipse 90% 40% at 70% 70%, ${theme.glow}${Math.round(
            config.opacity * 100,
          )
            .toString(16)
            .padStart(2, "0")} 0%, transparent 50%),
          linear-gradient(135deg, 
            ${theme.primary}${Math.round(config.opacity * 50)
              .toString(16)
              .padStart(2, "0")} 0%, 
            transparent 25%, 
            ${theme.secondary}${Math.round(config.opacity * 30)
              .toString(16)
              .padStart(2, "0")} 50%, 
            transparent 75%, 
            ${theme.accent}${Math.round(config.opacity * 40)
              .toString(16)
              .padStart(2, "0")} 100%
          )
        `,
      }}
    >
      {/* Animated particles */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${(Math.random() * 300 + 100) * config.size}px`,
            height: `${(Math.random() * 300 + 100) * config.size}px`,
            backgroundImage: `radial-gradient(circle, ${theme.particles}${Math.round(
              config.opacity * 80,
            )
              .toString(16)
              .padStart(2, "0")} 0%, transparent 70%)`,
            filter: `blur(${config.blur}px)`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Flowing gradient overlay */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          backgroundImage: `conic-gradient(from ${Math.random() * 360}deg at 50% 50%, 
            ${theme.primary}${Math.round(config.opacity * 60)
              .toString(16)
              .padStart(2, "0")} 0deg,
            transparent 90deg,
            ${theme.secondary}${Math.round(config.opacity * 80)
              .toString(16)
              .padStart(2, "0")} 180deg,
            transparent 270deg,
            ${theme.accent}${Math.round(config.opacity * 70)
              .toString(16)
              .padStart(2, "0")} 360deg
          )`,
          backgroundSize: "400% 400%",
        }}
      />
    </div>
  );
}
