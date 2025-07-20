import { useEffect, useState } from "react";

interface ProgressiveBackgroundProps {
  currentSection: "hero" | "demo" | "admin" | "roadmap";
  heroTheme: "roommate" | "couples" | "student";
}

export default function ProgressiveBackground({
  currentSection,
  heroTheme,
}: ProgressiveBackgroundProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / totalHeight, 1);
      setScrollProgress(progress);
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
          transition: {
            primary: "320, 65%, 65%", // Moving towards purple
            secondary: "310, 70%, 60%", // Deeper pink-purple
            accent: "300, 75%, 70%", // Purple accent
          },
        };
      case "student":
        return {
          hero: {
            primary: "142, 70%, 45%", // Emerald green
            secondary: "160, 75%, 50%", // Teal green
            accent: "180, 98%, 39%", // Cyan accent
          },
          transition: {
            primary: "200, 80%, 55%", // Moving towards blue
            secondary: "220, 85%, 60%", // Blue-green
            accent: "240, 90%, 65%", // Blue accent
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
          transition: {
            primary: "240, 85%, 65%", // Moving towards purple
            secondary: "250, 80%, 60%", // Blue-purple
            accent: "260, 85%, 70%", // Purple accent
          },
        };
    }
  };

  const adminColors = {
    primary: "259, 94%, 51%", // Deep purple
    secondary: "280, 87%, 66%", // Light purple
    accent: "270, 90%, 58%", // Medium purple
  };

  const roadmapColors = {
    primary: "0, 0%, 100%", // White
    secondary: "220, 13%, 95%", // Very light gray
    accent: "220, 13%, 91%", // Light gray
  };

  const themeColors = getThemeColors();

  // Calculate gradient stops based on scroll progress
  const getProgressiveGradient = () => {
    if (scrollProgress <= 0.25) {
      // Hero section (0-25%)
      const sectionProgress = scrollProgress / 0.25;
      return `
        linear-gradient(135deg, 
          hsl(${themeColors.hero.primary}) 0%,
          hsl(${themeColors.hero.secondary}) 50%,
          hsl(${themeColors.hero.accent}) 100%
        )
      `;
    } else if (scrollProgress <= 0.5) {
      // Hero to Admin transition (25-50%)
      const sectionProgress = (scrollProgress - 0.25) / 0.25;

      // Interpolate between hero and admin colors
      const interpolateHSL = (
        color1: string,
        color2: string,
        progress: number,
      ) => {
        const [h1, s1, l1] = color1
          .split(", ")
          .map((v) => parseFloat(v.replace("%", "")));
        const [h2, s2, l2] = color2
          .split(", ")
          .map((v) => parseFloat(v.replace("%", "")));

        const h = h1 + (h2 - h1) * progress;
        const s = s1 + (s2 - s1) * progress;
        const l = l1 + (l2 - l1) * progress;

        return `${h}, ${s}%, ${l}%`;
      };

      const primaryColor = interpolateHSL(
        themeColors.hero.primary,
        adminColors.primary,
        sectionProgress,
      );
      const secondaryColor = interpolateHSL(
        themeColors.hero.secondary,
        adminColors.secondary,
        sectionProgress,
      );
      const accentColor = interpolateHSL(
        themeColors.hero.accent,
        adminColors.accent,
        sectionProgress,
      );

      return `
        linear-gradient(135deg, 
          hsl(${primaryColor}) 0%,
          hsl(${secondaryColor}) 50%,
          hsl(${accentColor}) 100%
        )
      `;
    } else if (scrollProgress <= 0.75) {
      // Admin section (50-75%)
      return `
        linear-gradient(135deg, 
          hsl(${adminColors.primary}) 0%,
          hsl(${adminColors.secondary}) 50%,
          hsl(${adminColors.accent}) 100%
        )
      `;
    } else {
      // Admin to Roadmap transition (75-100%)
      const sectionProgress = (scrollProgress - 0.75) / 0.25;

      // Interpolate from admin to roadmap (white)
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
        adminColors.primary,
        sectionProgress,
      );
      const secondaryColor = interpolateToWhite(
        adminColors.secondary,
        sectionProgress,
      );
      const accentColor = interpolateToWhite(
        adminColors.accent,
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
    if (scrollProgress <= 0.25) {
      return {
        color1: `hsl(${themeColors.hero.primary})`,
        color2: `hsl(${themeColors.hero.secondary})`,
        color3: `hsl(${themeColors.hero.accent})`,
      };
    } else if (scrollProgress <= 0.75) {
      return {
        color1: `hsl(${adminColors.primary})`,
        color2: `hsl(${adminColors.secondary})`,
        color3: `hsl(${adminColors.accent})`,
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
      className="fixed inset-0 pointer-events-none transition-all duration-1000 ease-in-out"
      style={{
        background: getProgressiveGradient(),
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
            background: `radial-gradient(circle, ${
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
          background: `
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
          background: `
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
