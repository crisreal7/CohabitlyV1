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
        // Transition to admin (2.5vh-4vh)
        const sectionProgress =
          (scrollY - windowHeight * 2.5) / (windowHeight * 1.5);
        progress = 0.45 + sectionProgress * 0.25; // 0.45 to 0.7
      } else if (scrollY < windowHeight * 5.5) {
        // Admin section (4vh-5.5vh)
        progress = 0.75; // Admin theme
      } else {
        // Roadmap transition (5.5vh+)
        const sectionProgress = Math.min(
          (scrollY - windowHeight * 5.5) / (windowHeight * 1.5),
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

  // Calculate gradient stops based on scroll progress - conditional admin section
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
    } else if (showAdminSection) {
      // Admin section is shown - go through purple transition
      if (scrollProgress <= 0.7) {
        // Demo to Admin transition (45-70%)
        const sectionProgress = (scrollProgress - 0.45) / 0.25;

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
      } else if (scrollProgress <= 0.85) {
        // Admin section (70-85%)
        return `
          linear-gradient(135deg, 
            hsl(${adminColors.primary}) 0%,
            hsl(${adminColors.secondary}) 50%,
            hsl(${adminColors.accent}) 100%
          )
        `;
      } else {
        // Admin to Roadmap transition (85-100%)
        const sectionProgress = (scrollProgress - 0.85) / 0.15;

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
    } else {
      // No admin section - go directly from demo colors to white
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
    } else if (showAdminSection && scrollProgress <= 0.85) {
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
