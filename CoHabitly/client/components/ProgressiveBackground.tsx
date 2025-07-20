import { useEffect, useState } from "react";

interface ProgressiveBackgroundProps {
  currentSection: "hero" | "demo" | "admin" | "roadmap";
  heroTheme: "roommate" | "couples" | "student";
  showAdminSection?: boolean;
}

export default function ProgressiveBackground({
  currentSection,
  heroTheme,
  showAdminSection = false,
}: ProgressiveBackgroundProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate progress based on viewport heights instead of total document height
      // This gives more predictable transitions
      let progress = 0;

      if (scrollY < windowHeight * 0.8) {
        // Hero section (0-0.8vh)
        progress = 0.1; // Keep hero theme
      } else if (scrollY < windowHeight * 2.5) {
        // Demo section (0.8vh-2.5vh)
        progress = 0.3; // Still hero theme
      } else if (scrollY < windowHeight * 4) {
        // Transition to white (2.5vh-4vh)
        const sectionProgress =
          (scrollY - windowHeight * 2.5) / (windowHeight * 1.5);
        progress = 0.45 + sectionProgress * 0.25; // 0.45 to 0.7
      } else if (scrollY < windowHeight * 5.5) {
        // Admin/Partnership section (4vh-5.5vh)
        progress = 0.75; // White theme
      } else {
        // Roadmap transition (4.5vh+)
        const sectionProgress = Math.min(
          (scrollY - windowHeight * 4.5) / (windowHeight * 1.5),
          1,
        );
        progress = 0.85 + sectionProgress * 0.15; // 0.85 to 1.0
      }

      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define theme color palettes
  const getThemeColors = () => {
    switch (heroTheme) {
      case "couples":
        return {
          hero: {
            primary: "350, 82%, 82%", // Light blush pink
            secondary: "340, 70%, 70%", // Medium pink
            accent: "15, 77%, 76%", // Coral accent
          },
        };
      case "student":
        return {
          hero: {
            primary: "142, 70%, 45%", // Emerald green
            secondary: "160, 75%, 50%", // Teal green
            accent: "180, 98%, 39%", // Cyan accent
          },
        };
      case "roommate":
      default:
        return {
          hero: {
            primary: "217, 91%, 60%", // Royal blue
            secondary: "200, 98%, 39%", // Cyan blue
            accent: "230, 85%, 65%", // Indigo accent
          },
        };
    }
  };

  const roadmapColors = {
    primary: "0, 0%, 100%", // White
    secondary: "220, 13%, 95%", // Very light gray
    accent: "220, 13%, 91%", // Light gray
  };

  const themeColors = getThemeColors();

  // Calculate gradient stops based on scroll progress - always fade to white
  const getProgressiveGradient = () => {
    if (scrollProgress <= 0.45) {
      // Hero and Demo sections (0-45%) - maintain hero theme seamlessly
      return `
        linear-gradient(135deg, 
          hsl(${themeColors.hero.primary}) 0%,
          hsl(${themeColors.hero.secondary}) 50%,
          hsl(${themeColors.hero.accent}) 100%
        )
      `;
    } else {
      // All sections after demo - fade directly from hero colors to white
      const sectionProgress = Math.min((scrollProgress - 0.45) / 0.4, 1); // 45% to 85% progress

      // Interpolate directly from hero to white
      const interpolateToWhite = (color: string, progress: number) => {
        const [h, s, l] = color
          .split(", ")
          .map((v) => parseFloat(v.replace("%", "")));
        const targetL = parseFloat(
          roadmapColors.primary.split(", ")[2].replace("%", ""),
        );
        const targetS = parseFloat(
          roadmapColors.secondary.split(", ")[1].replace("%", ""),
        );

        const newS = s + (targetS - s) * progress;
        const newL = l + (targetL - l) * progress;

        return `${h}, ${newS}%, ${newL}%`;
      };

      const primaryColor = interpolateToWhite(
        themeColors.hero.primary,
        sectionProgress,
      );
      const secondaryColor = interpolateToWhite(
        themeColors.hero.secondary,
        sectionProgress,
      );
      const accentColor = interpolateToWhite(
        themeColors.hero.accent,
        sectionProgress,
      );

      return `
        linear-gradient(135deg, 
          hsl(${primaryColor}) 0%,
          hsl(${secondaryColor}) 50%,
          hsl(${accentColor}) 100%
        )
      `;
    }
  };

  // Enhanced floating particles based on current theme
  const getParticleColors = () => {
    if (scrollProgress <= 0.45) {
      return {
        color1: `hsl(${themeColors.hero.primary})`,
        color2: `hsl(${themeColors.hero.secondary})`,
        color3: `hsl(${themeColors.hero.accent})`,
      };
    } else {
      return {
        color1: `hsl(${roadmapColors.accent})`,
        color2: `hsl(${roadmapColors.secondary})`,
        color3: `hsl(${roadmapColors.primary})`,
      };
    }
  };

  const particleColors = getParticleColors();

  return (
    <div
      className="fixed inset-0 pointer-events-none transition-all duration-2000 ease-in-out"
      style={{
        backgroundImage: getProgressiveGradient(),
        zIndex: -1,
      }}
    >
      {/* Enhanced floating particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-complex opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${150 + Math.random() * 200}px`,
            height: `${150 + Math.random() * 200}px`,
            backgroundImage: `radial-gradient(circle, ${
              i % 3 === 0
                ? particleColors.color1
                : i % 3 === 1
                  ? particleColors.color2
                  : particleColors.color3
            }40 0%, transparent 70%)`,
            filter: `blur(${20 + Math.random() * 30}px)`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 6}s`,
          }}
        />
      ))}

      {/* Gradient overlays for smooth transitions */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 40% at 20% 30%, ${particleColors.color1}30 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 80% 20%, ${particleColors.color2}25 0%, transparent 50%),
            radial-gradient(ellipse 40% 80% at 40% 80%, ${particleColors.color3}20 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle animated mesh gradient */}
      <div
        className="absolute inset-0 opacity-40 animate-gradient-shift"
        style={{
          backgroundImage: `
            conic-gradient(from ${scrollProgress * 360}deg at 50% 50%, 
              ${particleColors.color1}20 0deg,
              transparent 60deg,
              ${particleColors.color2}25 120deg,
              transparent 180deg,
              ${particleColors.color3}20 240deg,
              transparent 300deg,
              ${particleColors.color1}20 360deg
            )
          `,
          backgroundSize: "400% 400%",
        }}
      />
    </div>
  );
}
