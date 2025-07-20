import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  MessageCircle,
  Target,
  Send,
  ArrowLeft,
  AlertTriangle,
  LifeBuoy,
} from "lucide-react";

interface SafeTalkProps {
  demoType?: "roommate" | "couples" | "student";
  onClose: () => void;
}

export default function SafeTalk({
  demoType = "couples",
  onClose,
}: SafeTalkProps) {
  const [input, setInput] = useState("");
  const [step, setStep] = useState<"input" | "actions" | "response">("input");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showEscalation, setShowEscalation] = useState(false);

  const themeColors = {
    couples: {
      primary: "from-couples-primary to-couples-accent",
      text: "text-couples-primary",
      bg: "bg-couples-surface",
      border: "border-couples-primary",
    },
    roommate: {
      primary: "from-roommates-primary to-roommates-accent",
      text: "text-roommates-primary",
      bg: "bg-roommates-surface",
      border: "border-roommates-primary",
    },
    student: {
      primary: "from-students-primary to-students-accent",
      text: "text-students-primary",
      bg: "bg-students-surface",
      border: "border-students-primary",
    },
  };

  const theme = themeColors[demoType];

  const handleInputSubmit = () => {
    if (input.trim()) {
      setStep("actions");
      // Check for strong sentiment to trigger escalation
      const strongWords = [
        "hate",
        "angry",
        "furious",
        "devastated",
        "can't take it",
      ];
      if (strongWords.some((word) => input.toLowerCase().includes(word))) {
        setShowEscalation(true);
      }
    }
  };

  const handleActionSelect = (action: string) => {
    setSelectedAction(action);
    setStep("response");
  };

  const getAIResponse = () => {
    switch (selectedAction) {
      case "dive":
        return "It sounds like you're carrying a lot of weight emotionally. Want to explore what's really bothering you or what you wish they understood?";
      case "draft":
        return "Here's a gentler way to express how you're feeling: \"I've been feeling overwhelmed lately and could really use some support with household responsibilities. Can we talk about how to make things work better for both of us?\"";
      case "suggestions":
        return "Here are some ways to move forward: • Schedule a calm conversation tonight • Create a shared responsibility chart • Start with appreciation before discussing concerns • Set up regular check-ins";
      default:
        return "I'm here to help you process these feelings and find a constructive path forward.";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg glass-card-enhanced animate-scale-in">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.primary} flex items-center justify-center`}
              >
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">SafeTalk</h3>
                <p className="text-sm text-gray-600">
                  AI-powered emotional support
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>

          {step === "input" && (
            <div className="space-y-4 animate-fade-in-up">
              <div className="text-center">
                <h4 className={`text-lg font-semibold ${theme.text} mb-2`}>
                  Say what you're really feeling...
                </h4>
                <p className="text-sm text-gray-600">
                  Express yourself freely. I'll help you communicate
                  constructively.
                </p>
              </div>

              <div className="space-y-3">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="I'm feeling frustrated because..."
                  className={`w-full h-32 p-4 border-2 ${theme.border}/20 rounded-xl resize-none focus:${theme.border} focus:ring-2 focus:ring-${theme.text}/20 transition-all`}
                />

                {input.trim() && (
                  <Button
                    onClick={handleInputSubmit}
                    className={`w-full bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white animate-fade-in-up button-feedback`}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Continue
                  </Button>
                )}
              </div>
            </div>
          )}

          {step === "actions" && (
            <div className="space-y-4 animate-fade-in-up">
              <div className="text-center">
                <h4 className={`text-lg font-semibold ${theme.text} mb-2`}>
                  How would you like to move forward?
                </h4>
                <p className="text-sm text-gray-600">
                  Choose what feels most helpful right now.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => handleActionSelect("dive")}
                  variant="outline"
                  className={`w-full justify-start h-auto p-4 border-2 ${theme.border}/20 hover:${theme.bg} transition-all card-hover`}
                >
                  <MessageCircle className={`w-5 h-5 mr-3 ${theme.text}`} />
                  <div className="text-left">
                    <div className="font-semibold">Dive Deeper</div>
                    <div className="text-xs text-gray-600">
                      Explore your feelings with AI guidance
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleActionSelect("draft")}
                  variant="outline"
                  className={`w-full justify-start h-auto p-4 border-2 ${theme.border}/20 hover:${theme.bg} transition-all card-hover`}
                >
                  <Send className={`w-5 h-5 mr-3 ${theme.text}`} />
                  <div className="text-left">
                    <div className="font-semibold">Draft a Message</div>
                    <div className="text-xs text-gray-600">
                      AI helps rephrase your feelings constructively
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleActionSelect("suggestions")}
                  variant="outline"
                  className={`w-full justify-start h-auto p-4 border-2 ${theme.border}/20 hover:${theme.bg} transition-all card-hover`}
                >
                  <Target className={`w-5 h-5 mr-3 ${theme.text}`} />
                  <div className="text-left">
                    <div className="font-semibold">Get Suggestions</div>
                    <div className="text-xs text-gray-600">
                      Actionable steps to resolve the situation
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          )}

          {step === "response" && (
            <div className="space-y-4 animate-fade-in-up">
              <div
                className={`p-4 rounded-xl ${theme.bg} border-l-4 ${theme.border}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${theme.primary} flex items-center justify-center flex-shrink-0`}
                  >
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      AI Response:
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {getAIResponse()}
                    </p>
                  </div>
                </div>
              </div>

              {showEscalation && (
                <Card className="border-amber-200 bg-amber-50 animate-fade-in-up">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-amber-800 mb-1">
                          This sounds serious
                        </h5>
                        <p className="text-sm text-amber-700 mb-3">
                          Want help from a relationship coach or trusted
                          support?
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-300 text-amber-700 hover:bg-amber-100"
                        >
                          <LifeBuoy className="w-4 h-4 mr-2" />
                          Find Support Resources
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep("input")}
                  variant="outline"
                  className="flex-1"
                >
                  Start Over
                </Button>
                <Button
                  onClick={onClose}
                  className={`flex-1 bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white`}
                >
                  Done
                </Button>
              </div>
            </div>
          )}

          <div className="text-center">
            <span className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <MessageCircle className="w-3 h-3" />
              End-to-end encrypted
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
