import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  User,
  Users,
  ThumbsUp,
  ThumbsDown,
  Meh,
  Check,
  X,
  MessageCircle,
  MapPin,
  Star,
} from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date?: string;
  time?: string;
  location?: string;
  host: string;
  category: "social" | "house" | "food" | "entertainment";
  status: "active" | "confirmed" | "cancelled" | "past";
  responses: { [key: string]: "yes" | "no" | "maybe" };
  userResponse?: "yes" | "no" | "maybe";
  demoType?: "roommate" | "couples" | "student";
  onRespond?: (eventId: string, response: "yes" | "no" | "maybe") => void;
  maxParticipants?: number;
}

export default function EventCard({
  id,
  title,
  description,
  date,
  time,
  location,
  host,
  category,
  status,
  responses,
  userResponse,
  demoType = "roommate",
  onRespond,
  maxParticipants,
}: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

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

  const getCategoryIcon = () => {
    switch (category) {
      case "entertainment":
        return <Star className="w-4 h-4" />;
      case "food":
        return <Users className="w-4 h-4" />;
      case "house":
        return <Calendar className="w-4 h-4" />;
      case "social":
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case "entertainment":
        return "bg-purple-100 text-purple-600";
      case "food":
        return "bg-orange-100 text-orange-600";
      case "house":
        return "bg-blue-100 text-blue-600";
      case "social":
      default:
        return "bg-green-100 text-green-600";
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case "confirmed":
        return {
          badge: "bg-green-100 text-green-800",
          border: "border-green-200",
          bgColor: "bg-green-50",
        };
      case "cancelled":
        return {
          badge: "bg-red-100 text-red-800",
          border: "border-red-200",
          bgColor: "bg-red-50",
          opacity: "opacity-60",
        };
      case "past":
        return {
          badge: "bg-gray-100 text-gray-800",
          border: "border-gray-200",
          bgColor: "bg-gray-50",
          opacity: "opacity-75",
        };
      default:
        return {
          badge: "bg-blue-100 text-blue-800",
          border: "border-blue-200",
          bgColor: "bg-blue-50",
        };
    }
  };

  const statusConfig = getStatusConfig();

  const getResponseCounts = () => {
    const counts = { yes: 0, no: 0, maybe: 0 };
    Object.values(responses).forEach((response) => {
      counts[response]++;
    });
    return counts;
  };

  const responseCounts = getResponseCounts();
  const totalResponses = Object.keys(responses).length;

  const handleResponse = (response: "yes" | "no" | "maybe") => {
    if (onRespond && status === "active") {
      onRespond(id, response);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card
      className={`${statusConfig.border} ${statusConfig.bgColor} ${statusConfig.opacity || ""} border-2 transition-all duration-300 card-hover`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className={`w-10 h-10 rounded-xl ${getCategoryColor()} flex items-center justify-center flex-shrink-0`}
            >
              {getCategoryIcon()}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
                {title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>by {host}</span>
                </div>
                {date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(date)}</span>
                  </div>
                )}
                {time && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{time}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-700 text-sm line-clamp-2 mb-2">
                {description}
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={statusConfig.badge} variant="secondary">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>

                <Badge variant="outline" className={getCategoryColor()}>
                  {category}
                </Badge>

                {location && (
                  <Badge variant="outline" className="text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {location}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Response Summary */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Responses</span>
            <span className="text-gray-500">
              {totalResponses} {totalResponses === 1 ? "person" : "people"}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1 text-green-600">
              <ThumbsUp className="w-3 h-3" />
              <span>{responseCounts.yes} Yes</span>
            </div>
            <div className="flex items-center gap-1 text-amber-600">
              <Meh className="w-3 h-3" />
              <span>{responseCounts.maybe} Maybe</span>
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <ThumbsDown className="w-3 h-3" />
              <span>{responseCounts.no} No</span>
            </div>
          </div>

          {/* Progress bar */}
          {maxParticipants && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((responseCounts.yes / maxParticipants) * 100, 100)}%`,
                  }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {responseCounts.yes} / {maxParticipants} spots filled
              </div>
            </div>
          )}
        </div>

        {/* User Response Buttons */}
        {status === "active" && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Your response:
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "yes", icon: ThumbsUp, label: "Yes", color: "green" },
                {
                  value: "maybe",
                  icon: Meh,
                  label: "Maybe",
                  color: "amber",
                },
                { value: "no", icon: ThumbsDown, label: "No", color: "red" },
              ].map(({ value, icon: Icon, label, color }) => (
                <Button
                  key={value}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResponse(value as "yes" | "no" | "maybe");
                  }}
                  variant={userResponse === value ? "default" : "outline"}
                  size="sm"
                  className={`h-9 ${
                    userResponse === value
                      ? color === "green"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : color === "amber"
                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      : `border-${color}-200 text-${color}-700 hover:bg-${color}-50`
                  } button-feedback`}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Expanded details */}
        {isExpanded && (
          <div className="pt-3 border-t border-gray-200 space-y-3 animate-expand-card">
            {/* Participant list */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Who's going:
              </div>
              <div className="space-y-1">
                {Object.entries(responses).map(([person, response]) => (
                  <div
                    key={person}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700">{person}</span>
                    <div className="flex items-center gap-1">
                      {response === "yes" ? (
                        <ThumbsUp className="w-3 h-3 text-green-500" />
                      ) : response === "maybe" ? (
                        <Meh className="w-3 h-3 text-amber-500" />
                      ) : (
                        <ThumbsDown className="w-3 h-3 text-red-500" />
                      )}
                      <span
                        className={`capitalize ${
                          response === "yes"
                            ? "text-green-600"
                            : response === "maybe"
                              ? "text-amber-600"
                              : "text-red-600"
                        }`}
                      >
                        {response}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments section */}
            <div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowComments(!showComments);
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {showComments ? "Hide Comments" : "Show Comments"}
              </Button>

              {showComments && (
                <div className="mt-3 space-y-2 animate-expand-card">
                  <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded-lg">
                    Comments feature coming soon! You'll be able to coordinate
                    details here.
                  </div>
                </div>
              )}
            </div>

            {status === "cancelled" && (
              <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg">
                This event has been cancelled.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
