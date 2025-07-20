import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Users,
  AlertTriangle,
  TrendingUp,
  ArrowLeft,
  User,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  GraduationCap,
  Calendar,
  Sparkles,
  BarChart3,
  Home,
  MessageCircle,
  Shield,
  Bell,
  Settings,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Activity,
  Target,
  Zap,
  Heart,
  Globe,
  Phone,
  Mail,
  AlertCircleIcon,
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  dorm: string;
  room: string;
  floor: number;
  compatibility_score: number;
  profile_completion: number;
  status: string;
  major: string;
  year: string;
  last_checkin: string;
  flagged: boolean;
  roommate_feedback: number;
}

interface Message {
  id: number;
  dorm: string;
  floor: number;
  message: string;
  sentiment_score: number;
  flagged: boolean;
  status: string;
  timestamp: string;
  category: string;
  priority: string;
}

interface DormStats {
  dorm: string;
  floors: number[];
  totalStudents: number;
  averageCompatibility: number;
  flaggedMessages: number;
  healthScore: number;
  healthStatus: "excellent" | "good" | "warning" | "critical";
}

type ViewLevel = "campus" | "dorm" | "floor" | "student";

interface ViewState {
  level: ViewLevel;
  selectedDorm?: string;
  selectedFloor?: number;
  selectedStudent?: Student;
}

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [viewState, setViewState] = useState<ViewState>({ level: "campus" });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Load data from CSV files
  useEffect(() => {
    const loadData = async () => {
      try {
        // Parse CSV data (in a real app, this would be an API call)
        const studentsData: Student[] = [
          {
            id: 1,
            name: "Jordan Reed",
            dorm: "Harrison Hall",
            room: "247",
            floor: 2,
            compatibility_score: 54,
            profile_completion: 78,
            status: "flagged",
            major: "Computer Science",
            year: "Junior",
            last_checkin: "2024-11-15",
            flagged: true,
            roommate_feedback: -2,
          },
          {
            id: 2,
            name: "Alex Martinez",
            dorm: "Harrison Hall",
            room: "312",
            floor: 3,
            compatibility_score: 92,
            profile_completion: 100,
            status: "active",
            major: "Psychology",
            year: "Sophomore",
            last_checkin: "2024-11-16",
            flagged: false,
            roommate_feedback: 4,
          },
          {
            id: 3,
            name: "Taylor Park",
            dorm: "Harrison Hall",
            room: "304",
            floor: 3,
            compatibility_score: 89,
            profile_completion: 95,
            status: "active",
            major: "Engineering",
            year: "Junior",
            last_checkin: "2024-11-16",
            flagged: false,
            roommate_feedback: 3,
          },
          {
            id: 4,
            name: "Sarah Kim",
            dorm: "Harrison Hall",
            room: "156",
            floor: 1,
            compatibility_score: 96,
            profile_completion: 100,
            status: "active",
            major: "Biology",
            year: "Freshman",
            last_checkin: "2024-11-16",
            flagged: false,
            roommate_feedback: 5,
          },
          {
            id: 5,
            name: "Marcus Johnson",
            dorm: "Harrison Hall",
            room: "201",
            floor: 2,
            compatibility_score: 67,
            profile_completion: 85,
            status: "flagged",
            major: "Business",
            year: "Sophomore",
            last_checkin: "2024-11-14",
            flagged: true,
            roommate_feedback: 1,
          },
          {
            id: 11,
            name: "Ryan Thompson",
            dorm: "Kennedy Tower",
            room: "412",
            floor: 4,
            compatibility_score: 76,
            profile_completion: 83,
            status: "active",
            major: "Physics",
            year: "Junior",
            last_checkin: "2024-11-16",
            flagged: false,
            roommate_feedback: 3,
          },
          {
            id: 12,
            name: "Olivia Garcia",
            dorm: "Kennedy Tower",
            room: "387",
            floor: 3,
            compatibility_score: 82,
            profile_completion: 90,
            status: "active",
            major: "Nursing",
            year: "Sophomore",
            last_checkin: "2024-11-16",
            flagged: false,
            roommate_feedback: 4,
          },
          {
            id: 16,
            name: "Madison Taylor",
            dorm: "Wilson Commons",
            room: "145",
            floor: 1,
            compatibility_score: 93,
            profile_completion: 98,
            status: "active",
            major: "Environmental Science",
            year: "Sophomore",
            last_checkin: "2024-11-16",
            flagged: false,
            roommate_feedback: 4,
          },
        ];

        const messagesData: Message[] = [
          {
            id: 1,
            dorm: "Harrison Hall",
            floor: 2,
            message: "Someone's throwing a party in Harrison Hall.",
            sentiment_score: 2,
            flagged: true,
            status: "unreviewed",
            timestamp: "2024-11-16T14:30:00Z",
            category: "noise",
            priority: "high",
          },
          {
            id: 2,
            dorm: "Harrison Hall",
            floor: 1,
            message:
              "Really appreciate how fair the chore system is. My roommates and I finally found balance!",
            sentiment_score: 5,
            flagged: false,
            status: "resolved",
            timestamp: "2024-11-15T10:15:00Z",
            category: "positive",
            priority: "low",
          },
          {
            id: 3,
            dorm: "Harrison Hall",
            floor: 2,
            message:
              "My roommate never cleans the kitchen and it's getting gross.",
            sentiment_score: 1,
            flagged: true,
            status: "unreviewed",
            timestamp: "2024-11-16T09:45:00Z",
            category: "cleanliness",
            priority: "medium",
          },
          {
            id: 4,
            dorm: "Kennedy Tower",
            floor: 4,
            message: "The noise from next door is keeping me up at night.",
            sentiment_score: 1,
            flagged: true,
            status: "unreviewed",
            timestamp: "2024-11-16T11:20:00Z",
            category: "noise",
            priority: "high",
          },
          {
            id: 6,
            dorm: "Wilson Commons",
            floor: 2,
            message: "Someone keeps eating my food from the shared fridge.",
            sentiment_score: 2,
            flagged: true,
            status: "unreviewed",
            timestamp: "2024-11-16T13:15:00Z",
            category: "conflict",
            priority: "medium",
          },
        ];

        setStudents(studentsData);
        setMessages(messagesData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate dorm statistics
  const calculateDormStats = (): DormStats[] => {
    const dormMap = new Map<string, DormStats>();

    students.forEach((student) => {
      if (!dormMap.has(student.dorm)) {
        dormMap.set(student.dorm, {
          dorm: student.dorm,
          floors: [],
          totalStudents: 0,
          averageCompatibility: 0,
          flaggedMessages: 0,
          healthScore: 0,
          healthStatus: "good",
        });
      }

      const stats = dormMap.get(student.dorm)!;
      stats.totalStudents++;
      stats.averageCompatibility += student.compatibility_score;

      if (!stats.floors.includes(student.floor)) {
        stats.floors.push(student.floor);
      }
    });

    messages.forEach((message) => {
      const stats = dormMap.get(message.dorm);
      if (stats && message.flagged) {
        stats.flaggedMessages++;
      }
    });

    // Calculate final stats
    dormMap.forEach((stats) => {
      stats.averageCompatibility = Math.round(
        stats.averageCompatibility / stats.totalStudents,
      );
      stats.healthScore = Math.max(
        0,
        stats.averageCompatibility - stats.flaggedMessages * 5,
      );

      if (stats.healthScore >= 85) stats.healthStatus = "excellent";
      else if (stats.healthScore >= 75) stats.healthStatus = "good";
      else if (stats.healthScore >= 60) stats.healthStatus = "warning";
      else stats.healthStatus = "critical";

      stats.floors.sort((a, b) => a - b);
    });

    return Array.from(dormMap.values());
  };

  const dormStats = calculateDormStats();

  // Get health color
  const getHealthColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "good":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "warning":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  // Filter data based on current view
  const getFilteredStudents = () => {
    let filtered = students;
    if (viewState.selectedDorm) {
      filtered = filtered.filter((s) => s.dorm === viewState.selectedDorm);
    }
    if (viewState.selectedFloor) {
      filtered = filtered.filter((s) => s.floor === viewState.selectedFloor);
    }
    return filtered;
  };

  const getFilteredMessages = () => {
    let filtered = messages;
    if (viewState.selectedDorm) {
      filtered = filtered.filter((m) => m.dorm === viewState.selectedDorm);
    }
    if (viewState.selectedFloor) {
      filtered = filtered.filter((m) => m.floor === viewState.selectedFloor);
    }
    return filtered;
  };

  // Navigation functions
  const navigateToDorm = (dorm: string) => {
    setViewState({ level: "dorm", selectedDorm: dorm });
  };

  const navigateToFloor = (floor: number) => {
    setViewState({ ...viewState, level: "floor", selectedFloor: floor });
  };

  const navigateToStudent = (student: Student) => {
    setViewState({ ...viewState, level: "student", selectedStudent: student });
  };

  const navigateBack = () => {
    if (viewState.level === "student") {
      setViewState({
        ...viewState,
        level: "floor",
        selectedStudent: undefined,
      });
    } else if (viewState.level === "floor") {
      setViewState({ level: "dorm", selectedDorm: viewState.selectedDorm });
    } else if (viewState.level === "dorm") {
      setViewState({ level: "campus" });
    }
  };

  const getBreadcrumb = () => {
    const parts = ["Campus"];
    if (viewState.selectedDorm) parts.push(viewState.selectedDorm);
    if (viewState.selectedFloor) parts.push(`Floor ${viewState.selectedFloor}`);
    if (viewState.selectedStudent) parts.push(viewState.selectedStudent.name);
    return parts.join(" › ");
  };

  // Calculate summary stats
  const totalStudents = students.length;
  const flaggedStudents = students.filter((s) => s.flagged).length;
  const avgCompatibility = Math.round(
    students.reduce((sum, s) => sum + s.compatibility_score, 0) /
      students.length,
  );
  const urgentMessages = messages.filter(
    (m) => m.priority === "high" && m.status === "unreviewed",
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-400/20 animate-pulse"></div>
        <div className="absolute top-4 left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 right-4 w-24 h-24 bg-purple-400/20 rounded-full blur-xl"></div>

        <div className="relative z-10 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  {viewState.level !== "campus" && (
                    <Button
                      variant="ghost"
                      onClick={navigateBack}
                      className="flex items-center gap-2 text-white hover:bg-white/20 rounded-xl"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">CoHabitly Admin</h1>
                      <p className="text-indigo-100">
                        Housing Management Dashboard
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-indigo-100">
                  <Home className="w-4 h-4" />
                  <span className="text-sm">{getBreadcrumb()}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live System</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-indigo-100">
                    {currentTime.toLocaleDateString()}
                  </div>
                  <div className="text-lg font-bold">
                    {currentTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 rounded-xl"
                  >
                    <Bell className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 rounded-xl"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Campus Overview */}
        {viewState.level === "campus" && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {totalStudents}
                      </div>
                      <div className="text-sm text-gray-600">
                        Total Students
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {avgCompatibility}%
                      </div>
                      <div className="text-sm text-gray-600">
                        Avg Compatibility
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                      style={{ width: `${avgCompatibility}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {flaggedStudents}
                      </div>
                      <div className="text-sm text-gray-600">
                        Students Flagged
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-amber-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
                      style={{
                        width: `${(flaggedStudents / totalStudents) * 100}%`,
                      }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-red-50 to-pink-50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <AlertCircleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {urgentMessages}
                      </div>
                      <div className="text-sm text-gray-600">Urgent Alerts</div>
                    </div>
                  </div>
                  <div className="w-full bg-red-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* High Priority Alerts */}
            {urgentMessages > 0 && (
              <Card className="border-0 bg-gradient-to-br from-red-50 to-pink-50 shadow-lg border-l-4 border-l-red-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-800">
                        Urgent Attention Required
                      </h3>
                      <p className="text-sm text-red-600">
                        High priority issues requiring immediate review
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messages
                      .filter(
                        (m) =>
                          m.priority === "high" && m.status === "unreviewed",
                      )
                      .map((message) => (
                        <div
                          key={message.id}
                          className="bg-white rounded-xl p-4 border border-red-200 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 mb-2">
                                {message.message}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Building className="w-4 h-4" />
                                  {message.dorm}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  Floor {message.floor}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {new Date(
                                    message.timestamp,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-red-100 text-red-700 border-red-200">
                                {message.category}
                              </Badge>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                              >
                                Review
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dorm Cards */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Campus Buildings
                </h2>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Report
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {dormStats.map((dorm) => (
                  <Card
                    key={dorm.dorm}
                    className={`cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-0 shadow-lg ${
                      dorm.healthStatus === "excellent"
                        ? "bg-gradient-to-br from-emerald-50 to-teal-50"
                        : dorm.healthStatus === "good"
                          ? "bg-gradient-to-br from-blue-50 to-indigo-50"
                          : dorm.healthStatus === "warning"
                            ? "bg-gradient-to-br from-amber-50 to-orange-50"
                            : "bg-gradient-to-br from-red-50 to-pink-50"
                    }`}
                    onClick={() => navigateToDorm(dorm.dorm)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                              dorm.healthStatus === "excellent"
                                ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                                : dorm.healthStatus === "good"
                                  ? "bg-gradient-to-br from-blue-500 to-indigo-500"
                                  : dorm.healthStatus === "warning"
                                    ? "bg-gradient-to-br from-amber-500 to-orange-500"
                                    : "bg-gradient-to-br from-red-500 to-pink-500"
                            }`}
                          >
                            <Building className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {dorm.dorm}
                            </h3>
                            <p className="text-gray-600">
                              {dorm.floors.length} floors
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-3xl font-bold ${
                              dorm.healthStatus === "excellent"
                                ? "text-emerald-600"
                                : dorm.healthStatus === "good"
                                  ? "text-blue-600"
                                  : dorm.healthStatus === "warning"
                                    ? "text-amber-600"
                                    : "text-red-600"
                            }`}
                          >
                            {dorm.healthScore}%
                          </div>
                          <Badge
                            className={`${
                              dorm.healthStatus === "excellent"
                                ? "bg-emerald-100 text-emerald-700"
                                : dorm.healthStatus === "good"
                                  ? "bg-blue-100 text-blue-700"
                                  : dorm.healthStatus === "warning"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                          >
                            {dorm.healthStatus}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-gray-900">
                              {dorm.totalStudents}
                            </div>
                            <div className="text-xs text-gray-600">
                              Students
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-gray-900">
                              {dorm.averageCompatibility}%
                            </div>
                            <div className="text-xs text-gray-600">
                              Compatibility
                            </div>
                          </div>
                          <div>
                            <div
                              className={`text-lg font-bold ${dorm.flaggedMessages > 3 ? "text-red-600" : "text-gray-900"}`}
                            >
                              {dorm.flaggedMessages}
                            </div>
                            <div className="text-xs text-gray-600">Issues</div>
                          </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              dorm.healthStatus === "excellent"
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                                : dorm.healthStatus === "good"
                                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                                  : dorm.healthStatus === "warning"
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500"
                                    : "bg-gradient-to-r from-red-500 to-pink-500"
                            }`}
                            style={{ width: `${dorm.healthScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dorm View */}
        {viewState.level === "dorm" && viewState.selectedDorm && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {viewState.selectedDorm} Overview
                </h2>
                <p className="text-gray-600">
                  Floor-by-floor breakdown and student insights
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Send Notice
                </Button>
              </div>
            </div>

            {/* Dorm Summary Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              {(() => {
                const dorm = dormStats.find(
                  (d) => d.dorm === viewState.selectedDorm,
                );
                return dorm ? (
                  <>
                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {dorm.totalStudents}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total Students
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {dorm.averageCompatibility}%
                        </div>
                        <div className="text-sm text-gray-600">
                          Avg Compatibility
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {dorm.flaggedMessages}
                        </div>
                        <div className="text-sm text-gray-600">
                          Flagged Messages
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {dorm.healthScore}%
                        </div>
                        <div className="text-sm text-gray-600">
                          Health Score
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : null;
              })()}
            </div>

            {/* Floor Cards */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Floor Overview
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(() => {
                  const dorm = dormStats.find(
                    (d) => d.dorm === viewState.selectedDorm,
                  );
                  return dorm?.floors.map((floor) => {
                    const floorStudents = students.filter(
                      (s) =>
                        s.dorm === viewState.selectedDorm && s.floor === floor,
                    );
                    const floorMessages = messages.filter(
                      (m) =>
                        m.dorm === viewState.selectedDorm && m.floor === floor,
                    );
                    const avgCompatibility = Math.round(
                      floorStudents.reduce(
                        (sum, s) => sum + s.compatibility_score,
                        0,
                      ) / floorStudents.length,
                    );
                    const flaggedCount = floorMessages.filter(
                      (m) => m.flagged,
                    ).length;

                    return (
                      <Card
                        key={floor}
                        className="border-0 bg-white shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all"
                        onClick={() => navigateToFloor(floor)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {floor}
                                </span>
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-gray-900">
                                  Floor {floor}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {floorStudents.length} students
                                </p>
                              </div>
                            </div>
                            <Badge
                              className={
                                avgCompatibility >= 80
                                  ? "bg-emerald-100 text-emerald-700"
                                  : avgCompatibility >= 60
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-red-100 text-red-700"
                              }
                            >
                              {avgCompatibility}%
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                Health Score
                              </span>
                              <span className="font-medium text-gray-900">
                                {avgCompatibility}%
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Issues</span>
                              <span
                                className={`font-medium ${flaggedCount > 0 ? "text-red-600" : "text-emerald-600"}`}
                              >
                                {flaggedCount || "None"}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  avgCompatibility >= 80
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                                    : avgCompatibility >= 60
                                      ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                                      : "bg-gradient-to-r from-red-500 to-pink-500"
                                }`}
                                style={{ width: `${avgCompatibility}%` }}
                              ></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Floor View */}
        {viewState.level === "floor" &&
          viewState.selectedDorm &&
          viewState.selectedFloor && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {viewState.selectedDorm} - Floor {viewState.selectedFloor}
                </h2>
                <p className="text-gray-600">
                  Student profiles and room assignments
                </p>
              </div>

              <Tabs defaultValue="students" className="space-y-6">
                <TabsList className="bg-white border border-gray-200 p-1 rounded-xl">
                  <TabsTrigger
                    value="students"
                    className="px-6 py-3 rounded-lg"
                  >
                    Students
                  </TabsTrigger>
                  <TabsTrigger
                    value="messages"
                    className="px-6 py-3 rounded-lg"
                  >
                    Messages
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="students">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredStudents().map((student) => (
                      <Card
                        key={student.id}
                        className={`border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all ${
                          student.flagged
                            ? "bg-gradient-to-br from-red-50 to-pink-50 border-l-4 border-l-red-500"
                            : "bg-white hover:scale-105"
                        }`}
                        onClick={() => navigateToStudent(student)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                                student.compatibility_score >= 80
                                  ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                                  : student.compatibility_score >= 60
                                    ? "bg-gradient-to-br from-blue-500 to-indigo-500"
                                    : "bg-gradient-to-br from-red-500 to-pink-500"
                              }`}
                            >
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 text-lg">
                                {student.name}
                              </h4>
                              <p className="text-gray-600">
                                Room {student.room}
                              </p>
                              <p className="text-sm text-gray-500">
                                {student.major} • {student.year}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Compatibility
                              </span>
                              <Badge
                                className={
                                  student.compatibility_score >= 80
                                    ? "bg-emerald-100 text-emerald-700"
                                    : student.compatibility_score >= 60
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-red-100 text-red-700"
                                }
                              >
                                {student.compatibility_score}%
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Profile
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {student.profile_completion}%
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Status
                              </span>
                              <Badge
                                className={
                                  student.status === "active"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-700"
                                }
                              >
                                {student.status}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="messages">
                  <div className="space-y-4">
                    {getFilteredMessages().map((message) => (
                      <Card
                        key={message.id}
                        className={`border-0 shadow-lg ${
                          message.flagged
                            ? "bg-gradient-to-br from-red-50 to-pink-50 border-l-4 border-l-red-500"
                            : "bg-white"
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">
                                  Floor {message.floor}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(message.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Badge
                                className={
                                  message.priority === "high"
                                    ? "bg-red-100 text-red-700"
                                    : message.priority === "medium"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-blue-100 text-blue-700"
                                }
                              >
                                {message.priority}
                              </Badge>
                              <Badge
                                className={
                                  message.status === "resolved"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-gray-100 text-gray-700"
                                }
                              >
                                {message.status}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-gray-900 mb-4 leading-relaxed">
                            {message.message}
                          </p>

                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className="border-purple-200 text-purple-700"
                            >
                              {message.category}
                            </Badge>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                            >
                              Review & Respond
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

        {/* Student Detail View */}
        {viewState.level === "student" && viewState.selectedStudent && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {viewState.selectedStudent.name}
              </h2>
              <p className="text-gray-600">
                Detailed student profile and living situation insights
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Summary */}
              <Card className="lg:col-span-2 border-0 bg-white shadow-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl">Profile Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                          <span className="text-sm text-gray-600">Room:</span>
                          <div className="font-bold text-gray-900">
                            {viewState.selectedStudent.room}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-gray-500" />
                        <div>
                          <span className="text-sm text-gray-600">Major:</span>
                          <div className="font-bold text-gray-900">
                            {viewState.selectedStudent.major}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                          <span className="text-sm text-gray-600">
                            Academic Year:
                          </span>
                          <div className="font-bold text-gray-900">
                            {viewState.selectedStudent.year}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-sm text-gray-600">
                          Compatibility Score
                        </span>
                        <div className="mt-2">
                          <Badge
                            className={`text-lg px-3 py-1 ${
                              viewState.selectedStudent.compatibility_score >=
                              80
                                ? "bg-emerald-100 text-emerald-700"
                                : viewState.selectedStudent
                                      .compatibility_score >= 60
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {viewState.selectedStudent.compatibility_score}%
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">
                          Profile Completion
                        </span>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
                              style={{
                                width: `${viewState.selectedStudent.profile_completion}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-900">
                            {viewState.selectedStudent.profile_completion}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">
                          Last Check-in
                        </span>
                        <div className="mt-1 font-bold text-gray-900">
                          {new Date(
                            viewState.selectedStudent.last_checkin,
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {viewState.selectedStudent.flagged && (
                    <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-red-800 text-lg">
                          Requires Attention
                        </span>
                      </div>
                      <p className="text-red-700 leading-relaxed">
                        This student has been flagged due to low compatibility
                        scores or negative feedback patterns. Consider
                        scheduling a check-in meeting or reviewing recent
                        roommate interactions.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                    <MessageCircle className="w-5 h-5 mr-3" />
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <Home className="w-5 h-5 mr-3" />
                    Room Reassignment
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    <Users className="w-5 h-5 mr-3" />
                    View Roommates
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 border-amber-200 text-amber-700 hover:bg-amber-50"
                  >
                    <Clock className="w-5 h-5 mr-3" />
                    Check-in History
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 border-red-200 text-red-700 hover:bg-red-50"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    Schedule Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
