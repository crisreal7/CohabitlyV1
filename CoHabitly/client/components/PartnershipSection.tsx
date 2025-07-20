import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingCart,
  Heart,
  GraduationCap,
  Users,
  ArrowRight,
  Target,
  RotateCcw,
  MessageCircle,
} from "lucide-react";

interface PartnershipSectionProps {
  currentDemoType: "roommate" | "couples" | "student";
}

type UserType = "student" | "roommate" | "couple";

interface OfferCard {
  userType: UserType;
  title: string;
  subtitle: string;
  brandName: string;
  offerDescription: string;
  ctaText: string;
  promoCode?: string;
  color: {
    primary: string;
    secondary: string;
    bg: string;
    text: string;
  };
  image: string;
  brandLogo: string;
}

export default function PartnershipSection({
  currentDemoType,
}: PartnershipSectionProps) {
  const [selectedUserType, setSelectedUserType] = useState<UserType>(
    currentDemoType === "couples" ? "couple" : currentDemoType,
  );
  const [isVisible, setIsVisible] = useState(false);

  // Update selected type when demo type changes
  useEffect(() => {
    setSelectedUserType(
      currentDemoType === "couples" ? "couple" : currentDemoType,
    );
  }, [currentDemoType]);

  // Scroll animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    const section = document.getElementById("partnership-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const offerCards: OfferCard[] = [
    {
      userType: "student",
      title: "Move In, Feel at Home",
      subtitle: "Dorm Essentials by IKEA",
      brandName: "IKEA",
      offerDescription:
        "Curated bundles for dorm life starting at $59. Smart design for students who love organized spaces.",
      ctaText: "Shop IKEA Dorm Kits",
      color: {
        primary: "emerald-500",
        secondary: "emerald-600",
        bg: "emerald-50",
        text: "emerald-700",
      },
      image: "/api/placeholder/400/300",
      brandLogo: "/api/placeholder/100/40",
    },
    {
      userType: "roommate",
      title: "Groceries split evenly?",
      subtitle: "Instacart x CoHabitly",
      brandName: "Instacart",
      offerDescription:
        "Get free delivery on your first order. Perfect for roommates who want to split and skip the trip.",
      ctaText: "Try Instacart Now",
      promoCode: "COHABITLY",
      color: {
        primary: "blue-500",
        secondary: "blue-600",
        bg: "blue-50",
        text: "blue-700",
      },
      image: "/api/placeholder/400/300",
      brandLogo: "/api/placeholder/100/40",
    },
    {
      userType: "couple",
      title: "Romantic nights, delivered.",
      subtitle: "HelloFresh for Couples",
      brandName: "HelloFresh",
      offerDescription:
        "You've done enough dishes this week. Let dinner be the easy part. Exclusive $50 off your first box designed for two.",
      ctaText: "Claim Offer",
      color: {
        primary: "pink-500",
        secondary: "pink-600",
        bg: "pink-50",
        text: "pink-700",
      },
      image: "/api/placeholder/400/300",
      brandLogo: "/api/placeholder/100/40",
    },
  ];

  const currentCard =
    offerCards.find((card) => card.userType === selectedUserType) ||
    offerCards[0];

  return (
    <section
      id="partnership-section"
      className="px-6 py-32 relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-8">
            <Target className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700 text-sm font-medium">
              Partnership Offers
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Targeted Offers That
            <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text block">
              Feel Personal
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
            Discover context-aware promotions tailored to your life stage. These
            aren't just ads — they're helpful boosts for your lifestyle.
          </p>

          {/* User Type Toggle */}
          <div className="flex justify-center gap-4 mb-12">
            {[
              {
                type: "student" as UserType,
                label: "Student",
                icon: GraduationCap,
              },
              { type: "roommate" as UserType, label: "Roommate", icon: Users },
              { type: "couple" as UserType, label: "Couple", icon: Heart },
            ].map(({ type, label, icon: Icon }) => (
              <Button
                key={type}
                variant={selectedUserType === type ? "default" : "outline"}
                className={`h-12 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedUserType === type
                    ? type === "student"
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg"
                      : type === "roommate"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                        : "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg"
                    : "border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedUserType(type)}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Offer Card */}
        <div
          className={`transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Card
            className={`max-w-6xl mx-auto border-2 border-${currentCard.color.primary}/20 hover:border-${currentCard.color.primary}/40 hover:shadow-2xl transition-all duration-300 overflow-hidden`}
          >
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Side - Image */}
                <div className="relative overflow-hidden">
                  <div
                    className={`w-full h-96 lg:h-full bg-gradient-to-br from-${currentCard.color.primary}/20 to-${currentCard.color.secondary}/30 flex items-center justify-center`}
                  >
                    <div className="text-center space-y-4">
                      <div
                        className={`w-20 h-20 bg-gradient-to-br from-${currentCard.color.primary} to-${currentCard.color.secondary} rounded-2xl flex items-center justify-center mx-auto`}
                      >
                        {currentCard.userType === "student" && (
                          <GraduationCap className="w-10 h-10 text-white" />
                        )}
                        {currentCard.userType === "roommate" && (
                          <ShoppingCart className="w-10 h-10 text-white" />
                        )}
                        {currentCard.userType === "couple" && (
                          <Heart className="w-10 h-10 text-white" />
                        )}
                      </div>
                      <div
                        className={`text-${currentCard.color.text} font-medium text-lg`}
                      >
                        {currentCard.userType === "student" &&
                          "Dorm Life Made Easy"}
                        {currentCard.userType === "roommate" &&
                          "Shared Shopping, Simplified"}
                        {currentCard.userType === "couple" &&
                          "Meals Made for Two"}
                      </div>
                    </div>
                  </div>

                  {/* Floating animation elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full animate-float-slow"></div>
                  <div className="absolute bottom-6 right-6 w-12 h-12 bg-white/10 rounded-full animate-float-complex"></div>
                  <div className="absolute top-1/2 left-8 w-6 h-6 bg-white/15 rounded-full animate-bounce"></div>
                </div>

                {/* Right Side - Content */}
                <div
                  className={`p-12 bg-gradient-to-br from-${currentCard.color.bg} to-white relative`}
                >
                  {/* Brand Logo */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
                      <div
                        className={`w-8 h-8 bg-${currentCard.color.primary} rounded`}
                      ></div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">
                        Partnership with
                      </div>
                      <div
                        className={`text-xl font-bold text-${currentCard.color.text}`}
                      >
                        {currentCard.brandName}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {currentCard.title}
                  </h3>

                  <h4
                    className={`text-xl font-semibold text-${currentCard.color.text} mb-6`}
                  >
                    {currentCard.subtitle}
                  </h4>

                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {currentCard.offerDescription}
                  </p>

                  {currentCard.promoCode && (
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 bg-${currentCard.color.primary}/10 rounded-lg mb-6`}
                    >
                      <span className="text-sm text-gray-500">Code:</span>
                      <span
                        className={`font-bold text-${currentCard.color.text}`}
                      >
                        {currentCard.promoCode}
                      </span>
                    </div>
                  )}

                  <Button
                    className={`w-full h-14 bg-gradient-to-r from-${currentCard.color.primary} to-${currentCard.color.secondary} hover:from-${currentCard.color.secondary} hover:to-${currentCard.color.primary} text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  >
                    {currentCard.ctaText}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  {/* Decorative elements */}
                  <div
                    className={`absolute top-4 right-4 w-16 h-16 bg-${currentCard.color.primary}/10 rounded-full animate-pulse`}
                  ></div>
                  <div
                    className={`absolute bottom-4 left-4 w-8 h-8 bg-${currentCard.color.secondary}/20 rounded-full animate-ping`}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partner With Us Section */}
        <div className="mt-24">
          <Card className="border-2 border-purple-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-12 text-center bg-gradient-to-br from-purple-50 to-indigo-50">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Target className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Want to Partner with CoHabitly?
              </h3>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Let your brand be part of how people live, share space, and
                solve real-life stress.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="flex items-center gap-3 justify-center">
                  <Target className="w-6 h-6 text-purple-500" />
                  <span className="text-gray-700 font-medium">
                    Context-aware targeting
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <MessageCircle className="w-6 h-6 text-purple-500" />
                  <span className="text-gray-700 font-medium">
                    Sentiment-aware ad delivery
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <RotateCcw className="w-6 h-6 text-purple-500" />
                  <span className="text-gray-700 font-medium">
                    Repeat lifestyle use
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="h-14 px-8 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Apply for Partnership
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="h-14 px-8 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-2xl font-semibold transition-all duration-300"
                >
                  Download Brand Deck
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
