import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Flame,
  X,
  Calendar,
  MoreHorizontal,
} from "lucide-react";

interface ChoreCardProps {
  id: string;
  title: string;
  dueDate: string;
  assignedTo: string;
  status: "pending" | "completed" | "overdue" | "skipped";
  difficulty: 1 | 2 | 3;
  streak: number;
  points: number;
  completedBy?: string[];
  demoType?: "roommate" | "couples" | "student";
  onComplete?: (id: string) => void;
  onSkip?: (id: string, reason: string) => void;
  isAssignedToUser?: boolean;
}

export default function ChoreCard({
  id,
  title,
  dueDate,
  assignedTo,
  status,
  difficulty,
  streak,
  points,
  completedBy = [],
  demoType = "roommate",
  onComplete,
  onSkip,
  isAssignedToUser = false,
}: ChoreCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSkipForm, setShowSkipForm] = useState(false);
  const [skipReason, setSkipReason] = useState("");

  const themeColors = {
    couples: "border-couples-primary text-couples-primary bg-couples-surface",
    roommate:
      "border-roommates-primary text-roommates-primary bg-roommates-surface",
    student:
      "border-students-primary text-students-primary bg-students-surface",
  };

  const getStatusConfig = () => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          badge: "bg-green-100 text-green-800",
        };
      case "overdue":
        return {
          icon: AlertCircle,
          color: "text-red-500",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          badge: "bg-red-100 text-red-800",
          animation: "animate-pulse",
        };
      case "skipped":
        return {
          icon: X,
          color: "text-amber-500",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          badge: "bg-amber-100 text-amber-800",
        };
      default:
        return {
          icon: Clock,
          color: "text-blue-500",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          badge: "bg-blue-100 text-blue-800",
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  const handleComplete = () => {
    if (onComplete && isAssignedToUser) {
      onComplete(id);
    }
  };

  const handleSkip = () => {
    if (onSkip && skipReason.trim()) {
      onSkip(id, skipReason);
      setShowSkipForm(false);
      setSkipReason("");
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
      className={`${statusConfig.borderColor} ${statusConfig.bgColor} border-2 transition-all duration-300 card-hover ${statusConfig.animation || ""}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${statusConfig.color === "text-green-500" ? "bg-green-500" : statusConfig.color === "text-red-500" ? "bg-red-500" : statusConfig.color === "text-amber-500" ? "bg-amber-500" : "bg-blue-500"}`}
            >
              <StatusIcon className="w-5 h-5 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
                {title}
              </h3>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{assignedTo}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(dueDate)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={statusConfig.badge} variant="secondary">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>

                <Badge variant="outline" className="text-xs">
                  {"★".repeat(difficulty)} {points}pts
                </Badge>

                {streak > 0 && (
                  <Badge
                    variant="outline"
                    className="text-orange-600 border-orange-200"
                  >
                    <Flame className="w-3 h-3 mr-1" />
                    {streak} streak
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Completion tracking */}
        {completedBy.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-xs text-gray-600 mb-2">Completed by:</div>
            <div className="flex gap-1">
              {completedBy.map((person, index) => (
                <div
                  key={index}
                  className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium text-green-700"
                >
                  {person.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons for user's chores */}
        {isAssignedToUser && status === "pending" && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex gap-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleComplete();
                }}
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white flex-1 button-feedback"
              >
                <CheckCircle className="w-4 h-4 mr-1 animate-check-bounce" />
                Mark Done
              </Button>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSkipForm(true);
                }}
                variant="outline"
                size="sm"
                className="px-4"
              >
                Skip
              </Button>
            </div>
          </div>
        )}

        {/* Skip form */}
        {showSkipForm && (
          <div className="mt-4 pt-3 border-t border-gray-200 animate-expand-card">
            <div className="space-y-3">
              <textarea
                value={skipReason}
                onChange={(e) => setSkipReason(e.target.value)}
                placeholder="Why are you skipping this chore?"
                className="w-full h-20 p-2 border border-gray-200 rounded-lg text-sm resize-none"
              />
              <div className="flex gap-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSkip();
                  }}
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  disabled={!skipReason.trim()}
                >
                  Skip Chore
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSkipForm(false);
                    setSkipReason("");
                  }}
                  size="sm"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Expanded details */}
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-gray-200 space-y-3 animate-expand-card">
            <div className="text-sm text-gray-600">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Difficulty:</span>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`w-2 h-2 rounded-full ${
                          level <= difficulty ? "bg-blue-500" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Points:</span>
                  <div className="text-blue-600 font-bold">+{points}</div>
                </div>
              </div>
            </div>

            {status === "overdue" && (
              <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg">
                This chore is overdue. Please complete it or let your roommates
                know if you need help.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
