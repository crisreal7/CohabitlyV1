import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Users,
  Heart,
  GraduationCap,
  MessageCircle,
  Edit,
  Lightbulb,
} from "lucide-react";

interface SafeTalkHeroProps {
  onDemoSelect: (type: "roommate" | "couples" | "student") => void;
  currentDemo: "roommate" | "couples" | "student";
  onScenarioChange?: (type: "roommate" | "couples" | "student") => void;
  shouldRestartAnimation?: boolean;
  onAnimationRestarted?: () => void;
}

interface ChatMessage {
  type: "user" | "ai";
  content: string;
  timestamp?: number;
}

export default function SafeTalkHero({
  onDemoSelect,
  currentDemo,
  onScenarioChange,
  shouldRestartAnimation = false,
  onAnimationRestarted,
}: SafeTalkHeroProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCTAs, setShowCTAs] = useState(false);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  const [animationLoopActive, setAnimationLoopActive] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const scenarios = [
    {
      type: "couples" as const,
      userMessage:
        "You just ignored me all day. I felt invisible and like I don't matter.",
      aiResponse:
        "It sounds like you felt disconnected. Want to explore why that hit hard?",
      finalMessage:
        "Hey, I felt really disconnected today. Can we talk about what happened?",
      color: "from-rose-400 to-pink-500",
      bgColor: "bg-rose-500/10",
    },
    {
      type: "roommate" as const,
      userMessage:
        "You keep leaving your dishes in the sink. I'm not your f*cking maid.",
      aiResponse:
        "Let's create a chore list or message your roommate about expectations.",
      finalMessage:
        "Hey, could we work out a system for keeping the kitchen clean?",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-500/10",
    },
    {
      type: "student" as const,
      userMessage:
        "I feel like no one gets me in this dorm. I'm homesick as hell.",
      aiResponse:
        "How about we draft something for your RA, or talk through it together first?",
      finalMessage:
        "I've been struggling with homesickness. Could we chat about resources?",
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-500/10",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / window.innerHeight),
      );
      setScrollProgress(progress);

      // Break animation loop immediately on any scroll down
      if (window.scrollY > 50 && animationLoopActive) {
        setAnimationLoopActive(false);
        setHasUserScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [animationLoopActive]);

  useEffect(() => {
    if (!animationLoopActive) return;

    const scenario = scenarios[currentScenario];
    setChatMessages([]);
    setIsTyping(false);
    setShowCTAs(false);

    // Notify parent of scenario change
    onScenarioChange?.(scenario.type);

    // Strict timing sequence as requested:
    // 1. Typing bubble pops up, plays for 1.5s, disappears
    // 2. Half second later: user message pops up
    // 3. Wait 3 seconds: AI response pops up
    // 4. Wait 2 seconds: AI button options pop up
    const sequence = [
      // Step 1: Show typing bubble for 1.5 seconds
      { delay: 0, action: () => setIsTyping(true) },
      // Step 2: Hide typing bubble and show user message (after 1.5s + 0.5s)
      {
        delay: 2000, // 1500ms typing + 500ms wait
        action: () => {
          setIsTyping(false);
          setChatMessages([{ type: "user", content: scenario.userMessage }]);
        },
      },
      // Step 3: Show AI response (after 3 seconds)
      {
        delay: 5000, // 2000ms + 3000ms wait
        action: () => {
          setChatMessages((prev) => [
            ...prev,
            { type: "ai", content: scenario.aiResponse },
          ]);
        },
      },
      // Step 4: Show AI button options (after 2 seconds)
      { delay: 7000, action: () => setShowCTAs(true) }, // 5000ms + 2000ms wait
    ];

    const timeouts: NodeJS.Timeout[] = [];
    sequence.forEach(({ delay, action }) => {
      timeouts.push(setTimeout(action, delay));
    });

    // Auto-cycle: 7s for full sequence + 3s display time = 10s total
    const cycleTimer = setTimeout(() => {
      if (animationLoopActive) {
        const nextScenario = (currentScenario + 1) % scenarios.length;
        setCurrentScenario(nextScenario);
        onScenarioChange?.(scenarios[nextScenario].type);
      }
    }, 10000); // 7000ms sequence + 3000ms display time
    timeouts.push(cycleTimer);

    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, [currentScenario, animationLoopActive]);

  // Handle restart animation from parent
  useEffect(() => {
    if (shouldRestartAnimation) {
      // Reset all states and restart the animation
      setAnimationLoopActive(true);
      setHasUserScrolled(false);
      setChatMessages([]);
      setIsTyping(false);
      setShowCTAs(false);
      onAnimationRestarted?.();

      // Trigger a new animation sequence by forcing the scenario to update
      // This will cause the animation useEffect to run again
      setCurrentScenario((prev) => {
        const next = prev; // Keep same scenario but force re-render
        return next;
      });
    }
  }, [shouldRestartAnimation, onAnimationRestarted]);

  // Force animation to restart when animationLoopActive becomes true again
  useEffect(() => {
    if (
      animationLoopActive &&
      hasUserScrolled === false &&
      chatMessages.length === 0
    ) {
      // This is a restart scenario - force the animation to begin
      const scenario = scenarios[currentScenario];
      onScenarioChange?.(scenario.type);
    }
  }, [
    animationLoopActive,
    hasUserScrolled,
    chatMessages.length,
    currentScenario,
    scenarios,
    onScenarioChange,
  ]);

  // Sync scenario with currentDemo when demo selection changes externally
  useEffect(() => {
    const targetScenarioIndex = scenarios.findIndex(
      (s) => s.type === currentDemo,
    );
    if (
      targetScenarioIndex !== -1 &&
      targetScenarioIndex !== currentScenario &&
      !animationLoopActive
    ) {
      setCurrentScenario(targetScenarioIndex);
    }
  }, [currentDemo, currentScenario, animationLoopActive, scenarios]);

  const handleCTAClick = (action: string) => {
    const scenario = scenarios[currentScenario];
    setShowCTAs(false);

    // Immediate response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { type: "ai", content: scenario.finalMessage },
      ]);

      // Follow-up message after 2 seconds
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content:
              "SafeTalk is a space to let your voice out—without damaging your relationships.",
          },
        ]);

        // Continue animation cycle after 3 seconds if still active
        setTimeout(() => {
          if (animationLoopActive) {
            setCurrentScenario((prev) => (prev + 1) % scenarios.length);
          }
        }, 3000);
      }, 2000);
    }, 500);
  };

  const handleJoinWaitlist = () => {
    const footer = document.getElementById("early-access-section");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentScenarioData = scenarios[currentScenario];

  return (
    <div
      ref={heroRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "transparent", // `linear-gradient(135deg, 
          ${
            currentScenarioData.type === "couples"
              ? "hsl(350, 82%, 82%)"
              : currentScenarioData.type === "roommate"
                ? "hsl(217, 91%, 60%)"
                : "hsl(142, 70%, 45%)"
          } 0%, 
          ${
            currentScenarioData.type === "couples"
              ? "hsl(340, 70%, 70%)"
              : currentScenarioData.type === "roommate"
                ? "hsl(200, 85%, 50%)"
                : "hsl(160, 75%, 35%)"
          } 100%)`,
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className={`absolute rounded-full blur-3xl animate-float ${
              currentScenarioData.type === "couples"
                ? "bg-rose-300/20"
                : currentScenarioData.type === "roommate"
                  ? "bg-blue-300/20"
                  : "bg-emerald-300/20"
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${(4 + i) * 1.3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Messaging & Chat Animation */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Sometimes you just need to
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent animate-text-glow">
                say it like it is.
              </span>
            </h1>

            {/* Chat Interface */}
            <div className="max-w-lg mx-auto lg:mx-0 space-y-4 mb-8">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div
                    className={`max-w-xs px-6 py-4 rounded-2xl glass-card-enhanced ${
                      message.type === "user"
                        ? "bg-white/90 text-gray-900"
                        : "bg-white/95 text-gray-900 border border-white/30"
                    }`}
                  >
                    <p className="text-sm font-medium">{message.content}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in-up">
                  <div className="px-6 py-4 rounded-2xl bg-white/20 text-white border border-white/30 glass-card-enhanced">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-typing-dots"></div>
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-typing-dots"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-typing-dots"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {showCTAs && (
                <div className="flex flex-wrap gap-3 mt-6 animate-fade-in-up">
                  <Button
                    onClick={() => handleCTAClick("explore")}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm button-feedback"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Dive Deeper
                  </Button>
                  <Button
                    onClick={() => handleCTAClick("draft")}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm button-feedback"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Draft Message
                  </Button>
                  <Button
                    onClick={() => handleCTAClick("suggestions")}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm button-feedback"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Get Suggestions
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Demo CTAs */}
          <div className="flex flex-col items-center lg:items-end space-y-6">
            <div className="text-center lg:text-right mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Experience SafeTalk
              </h2>
              <p className="text-white/80 text-lg max-w-md">
                Choose your living situation to see how SafeTalk helps you
                communicate better.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-sm">
              <Button
                onClick={() => {
                  const demoSection =
                    document.getElementById("interactive-demo");
                  if (demoSection) {
                    demoSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="h-16 px-8 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 button-feedback bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                <Users className="w-5 h-5 mr-3" />
                Try Demo
              </Button>

              <Button
                onClick={handleJoinWaitlist}
                className="h-16 px-8 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 button-feedback bg-white/20 text-white hover:bg-white/30 border border-white/30"
              >
                <Heart className="w-5 h-5 mr-3" />
                Join Wait List
              </Button>
            </div>

            {/* Scenario indicator */}
            <div className="flex space-x-2 mt-8">
              {scenarios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScenario(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentScenario
                      ? "bg-white scale-125"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}