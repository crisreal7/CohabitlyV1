import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  ShoppingCart,
  Users,
  MessageCircle,
  Plus,
  Check,
  Star,
  Calendar,
  DollarSign,
  Send,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Settings,
  Sparkles,
  TrendingUp,
  BarChart3,
  Zap,
  Target,
  Bell,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  X,
  Edit3,
  Trash2,
  Flag,
  Volume2,
  VolumeX,
  Coffee,
  Moon,
  Sun,
  Timer,
  PartyPopper,
  Gamepad,
  Pizza,
  Film,
  Music,
  Heart,
  Shield,
  Flame,
  Award,
  RefreshCw,
  MessageSquare,
  Phone,
  Video,
  Smile,
  Frown,
  Meh,
  Filter,
  Search,
  Calendar1,
  CalendarDays,
  GraduationCap,
  Building,
  AlertTriangle,
  BookOpen,
  MapPin,
  UserPlus,
  UserCheck,
  FileText,
  Megaphone,
  ClipboardList,
  Trophy,
} from "lucide-react";

type TabType =
  | "overview"
  | "grocery"
  | "events"
  | "chores"
  | "vibe"
  | "messages"
  | "profile";

interface StudentDemoProps {
  activeTab?: TabType;
}

interface RAContact {
  id: string;
  name: string;
  avatar: string;
  shiftHours: string;
  isOnDuty: boolean;
  floorsCovered: string[];
}

interface DormTransferOption {
  id: string;
  dormName: string;
  compatibility: number;
  distance: string;
  features: string[];
  waitlist: number;
}

interface IncidentReport {
  id: string;
  category: "noise" | "safety" | "conflict" | "maintenance";
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  isAnonymous: boolean;
  timestamp: string;
  status: "submitted" | "under_review" | "resolved";
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  category: "social" | "study" | "food" | "wellness";
  hasRSVP: boolean;
}

export default function StudentDemo({
  activeTab = "overview",
}: StudentDemoProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  const raContact: RAContact = {
    id: "ra1",
    name: "Sarah Martinez",
    avatar: "SM",
    shiftHours: "6 PM - 2 AM",
    isOnDuty: true,
    floorsCovered: ["2nd Floor", "3rd Floor"],
  };

  const transferOptions: DormTransferOption[] = [
    {
      id: "dorm1",
      dormName: "Harmony Hall",
      compatibility: 92,
      distance: "0.2 miles",
      features: [
        "Quiet Study Floors",
        "24/7 Library Access",
        "Wellness Center",
      ],
      waitlist: 3,
    },
    {
      id: "dorm2",
      dormName: "Innovation House",
      compatibility: 88,
      distance: "0.4 miles",
      features: ["Tech Labs", "Collaborative Spaces", "Maker Studio"],
      waitlist: 8,
    },
    {
      id: "dorm3",
      dormName: "Serenity Suites",
      compatibility: 85,
      distance: "0.3 miles",
      features: ["Single Rooms", "Meditation Garden", "Quiet Hours"],
      waitlist: 12,
    },
  ];

  const communityEvents: CommunityEvent[] = [
    {
      id: "event1",
      title: "Late Night Study Session",
      description: "Group study with snacks and coffee",
      organizer: "Academic Success Center",
      date: "2024-11-20",
      time: "9:00 PM",
      location: "2nd Floor Study Lounge",
      attendees: 12,
      maxAttendees: 20,
      category: "study",
      hasRSVP: true,
    },
    {
      id: "event2",
      title: "Pizza & Game Night",
      description: "Board games, video games, and free pizza!",
      organizer: "Floor 3 Residents",
      date: "2024-11-22",
      time: "7:00 PM",
      location: "Common Room",
      attendees: 8,
      maxAttendees: 15,
      category: "social",
      hasRSVP: false,
    },
    {
      id: "event3",
      title: "Mindfulness Workshop",
      description: "Learn stress management techniques",
      organizer: "Wellness Team",
      date: "2024-11-23",
      time: "2:00 PM",
      location: "Wellness Center",
      attendees: 6,
      maxAttendees: 12,
      category: "wellness",
      hasRSVP: false,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-4 p-4">
            {/* Student Profile Card */}
            <Card className="border-0 bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Welcome Back!
                    </h3>
                    <p className="text-sm text-gray-600">
                      Room 247B • Psychology Major
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600">
                      87%
                    </div>
                    <div className="text-xs text-gray-600">
                      Dorm Compatibility
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      Junior
                    </div>
                    <div className="text-xs text-gray-600">Academic Year</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-3 text-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Contact RA
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">Get help now</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-3 text-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Report Issue
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">Anonymous & safe</p>
                </CardContent>
              </Card>
            </div>

            {/* RA Contact Card */}
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">Your RA</h3>
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    On Duty
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {raContact.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm">
                      {raContact.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {raContact.shiftHours}
                    </div>
                    <div className="text-xs text-gray-500">
                      Covers: {raContact.floorsCovered.join(", ")}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-xs h-8 px-3"
                  >
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Dorm Transfer Card */}
            <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm">
                      Feeling misaligned with your dorm?
                    </h3>
                    <p className="text-xs text-gray-600">
                      Find better matches nearby
                    </p>
                  </div>
                </div>
                <div className="space-y-1 mb-3">
                  <div className="text-xs text-gray-600">
                    Current:{" "}
                    <span className="font-semibold text-amber-600">67%</span>{" "}
                    compatibility
                  </div>
                  <div className="text-xs text-gray-600">
                    Better options:{" "}
                    <span className="font-semibold text-emerald-600">
                      92%, 88%, 85%
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 text-xs h-8"
                >
                  <Search className="w-4 h-4 mr-1" />
                  View Transfer Options
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "events":
        return (
          <div className="space-y-4 p-4">
            {/* Community Events Header */}
            <Card className="border-0 bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                    <PartyPopper className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      Community Events
                    </h3>
                    <p className="text-sm text-gray-600">
                      Join dorm activities & socials
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Feed */}
            <div className="space-y-3">
              {communityEvents.map((event) => (
                <Card
                  key={event.id}
                  className="border-0 bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          event.category === "study"
                            ? "bg-blue-100"
                            : event.category === "social"
                              ? "bg-purple-100"
                              : event.category === "wellness"
                                ? "bg-green-100"
                                : "bg-orange-100"
                        }`}
                      >
                        {event.category === "study" && (
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        )}
                        {event.category === "social" && (
                          <PartyPopper className="w-5 h-5 text-purple-600" />
                        )}
                        {event.category === "wellness" && (
                          <Heart className="w-5 h-5 text-green-600" />
                        )}
                        {event.category === "food" && (
                          <Pizza className="w-5 h-5 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm">
                            {event.title}
                          </span>
                          {event.hasRSVP && (
                            <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                              RSVP'd
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                          {event.description}
                        </p>
                        <div className="grid grid-cols-1 gap-1 text-xs text-gray-500 mb-3">
                          <span>
                            📅 {new Date(event.date).toLocaleDateString()} • 🕐{" "}
                            {event.time}
                          </span>
                          <span>📍 {event.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {event.attendees}/{event.maxAttendees} attending
                          </span>
                          <Button
                            size="sm"
                            variant={event.hasRSVP ? "outline" : "default"}
                            className={
                              event.hasRSVP
                                ? "border-emerald-300 text-emerald-700 text-xs h-7 px-3"
                                : "bg-emerald-500 hover:bg-emerald-600 text-white text-xs h-7 px-3"
                            }
                          >
                            {event.hasRSVP ? "Cancel" : "RSVP"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "messages":
        return (
          <div className="space-y-4 p-4">
            {/* RA Contact Priority */}
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Contact Your RA</h3>
                    <p className="text-sm text-gray-600">Get help & support</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {raContact.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm">
                      {raContact.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {raContact.shiftHours} •{" "}
                      {raContact.isOnDuty ? "On Duty" : "Off Duty"}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-xs h-8 px-4"
                  >
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Incident Reporting */}
            <Card className="border-0 bg-gradient-to-br from-red-50 to-pink-50 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Report an Issue</h3>
                    <p className="text-sm text-gray-600">
                      Anonymous & confidential
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 text-xs h-9"
                  >
                    <Volume2 className="w-4 h-4 mr-1" />
                    Noise
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-50 text-xs h-9"
                  >
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Safety
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50 text-xs h-9"
                  >
                    <Users className="w-4 h-4 mr-1" />
                    Conflict
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 text-xs h-9"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Maintenance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "vibe":
        return (
          <div className="space-y-4 p-4">
            {/* Dorm Vibe Check */}
            <Card className="border-0 bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Smile className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Dorm Vibe Check
                    </h3>
                    <p className="text-sm text-gray-600">
                      Weekly community mood
                    </p>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    8.2/10
                  </div>
                  <div className="text-sm text-gray-600">
                    This week's average
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white h-9">
                  <Smile className="w-4 h-4 mr-2" />
                  Submit This Week's Vibe
                </Button>
              </CardContent>
            </Card>

            {/* Anonymous Feedback */}
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 mb-3">
                  Recent Anonymous Feedback
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      "Love the new quiet hours policy! Makes studying so much
                      easier."
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      2 days ago • Positive feedback
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      "Could we get more social events on weekends? Would love
                      to meet more people."
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      3 days ago • Suggestion
                    </div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      "Kitchen needs better cleaning schedule - dishes pile up
                      too often."
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      1 week ago • Maintenance request
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "chores":
        return (
          <div className="space-y-4 p-4">
            {/* Dorm Cleaning Leaderboard */}
            <Card className="border-0 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Floor Leaderboard
                    </h3>
                    <p className="text-sm text-gray-600">
                      This month's top contributors
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Alex Chen", room: "247A", points: 850, rank: 1 },
                    { name: "You", room: "247B", points: 720, rank: 2 },
                    { name: "Jordan Kim", room: "248A", points: 680, rank: 3 },
                    { name: "Sam Taylor", room: "246B", points: 590, rank: 4 },
                  ].map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-white rounded-lg"
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                          student.rank === 1
                            ? "bg-yellow-500"
                            : student.rank === 2
                              ? "bg-gray-400"
                              : student.rank === 3
                                ? "bg-amber-600"
                                : "bg-gray-300"
                        }`}
                      >
                        {student.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-semibold text-sm ${student.name === "You" ? "text-emerald-600" : "text-gray-900"}`}
                        >
                          {student.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          Room {student.room}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600 text-sm">
                          {student.points}
                        </div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Chore Schedule */}
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 mb-3">
                  Your Chores This Week
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      task: "Common Room Vacuum",
                      day: "Wednesday",
                      status: "completed",
                      points: 15,
                    },
                    {
                      task: "Kitchen Deep Clean",
                      day: "Friday",
                      status: "pending",
                      points: 25,
                    },
                    {
                      task: "Bathroom Restock",
                      day: "Sunday",
                      status: "pending",
                      points: 10,
                    },
                  ].map((chore, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        chore.status === "completed"
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              chore.status === "completed"
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300"
                            }`}
                          >
                            {chore.status === "completed" && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div
                              className={`font-semibold text-sm ${chore.status === "completed" ? "line-through text-gray-500" : "text-gray-900"}`}
                            >
                              {chore.task}
                            </div>
                            <div className="text-xs text-gray-600">
                              Due: {chore.day}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-600 text-sm">
                            +{chore.points}
                          </div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-600">This feature is in development</p>
          </div>
        );
    }
  };

  return <>{renderTabContent()}</>;
}
