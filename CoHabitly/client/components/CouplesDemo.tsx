import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  CheckCircle,
  Plus,
  Send,
  Settings,
  Calendar,
  Star,
  Lock,
  Smile,
  Home,
  ShoppingCart,
  Bell,
  User,
  MoreHorizontal,
  Sparkles,
  TrendingUp,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Zap,
  Target,
  Users,
  Meh,
  Frown,
  ArrowLeft,
  X,
  ThumbsUp,
  Edit3,
  Camera,
  Mic,
  Phone,
  Video,
  Coffee,
  Timer,
  Trash2,
  Archive,
  Flag,
  Share,
  BookOpen,
  MapPin,
  Gift,
  Music,
  Palette,
  Flower,
} from "lucide-react";

type CouplesTabType =
  | "home"
  | "groceries"
  | "tasks"
  | "goals"
  | "communicate"
  | "preferences";
type ViewLevel = "main" | "detail" | "compose" | "profile" | "settings";

interface ViewState {
  level: ViewLevel;
  activeTab: CouplesTabType;
  selectedGoal?: SharedGoal;
  selectedMessage?: Message;
  isComposingMessage?: boolean;
  settingsCategory?: string;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  isAnonymous?: boolean;
  mood?: "happy" | "thoughtful" | "concerned" | "excited";
  replies: Reply[];
  isLiked: boolean;
  likes: number;
}

interface Reply {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface SharedItem {
  id: string;
  text: string;
  isCompleted: boolean;
  addedBy: "You" | "Partner";
  category: "groceries" | "tasks" | "goals" | "dates";
  priority: "high" | "medium" | "low";
  dueDate?: string;
  notes?: string;
}

interface SharedGoal {
  id: string;
  title: string;
  description: string;
  category: "relationship" | "lifestyle" | "travel" | "financial";
  progress: number;
  targetDate: string;
  milestones: Milestone[];
  createdBy: "You" | "Partner";
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  completedDate?: string;
}

interface MoodData {
  date: string;
  yourMood: number;
  partnerMood: number;
  note?: string;
}

interface CouplesPreference {
  category: string;
  settings: { [key: string]: any };
}

interface CouplesDemoProps {
  activeTab?: CouplesTabType;
}

export default function CouplesDemo({ activeTab = "home" }: CouplesDemoProps) {
  const [viewState, setViewState] = useState<ViewState>({
    level: "main",
    activeTab: activeTab,
  });
  const [newMessage, setNewMessage] = useState("");
  const [newItem, setNewItem] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "groceries" | "tasks" | "goals" | "dates"
  >("groceries");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [messages, setMessages] = useState<Message[]>([]);
  const [sharedItems, setSharedItems] = useState<SharedItem[]>([]);
  const [sharedGoals, setSharedGoals] = useState<SharedGoal[]>([]);

  const [weeklyMoods] = useState<MoodData[]>([
    { date: "Mon", yourMood: 8, partnerMood: 7, note: "Great start to week" },
    { date: "Tue", yourMood: 6, partnerMood: 8, note: "Bit stressed" },
    { date: "Wed", yourMood: 9, partnerMood: 9, note: "Amazing date night!" },
    { date: "Thu", yourMood: 7, partnerMood: 6, note: "Work pressure" },
    { date: "Fri", yourMood: 9, partnerMood: 8, note: "Weekend plans" },
    { date: "Sat", yourMood: 10, partnerMood: 9, note: "Perfect day" },
    { date: "Sun", yourMood: 8, partnerMood: 8, note: "Relaxed together" },
  ]);

  const preferences: CouplesPreference[] = [
    {
      category: "Communication",
      settings: {
        "Gentle reminders": true,
        "Conflict style": "Talk it through",
        "Check-in frequency": "Daily",
        "Anonymous mode": false,
      },
    },
    {
      category: "Lifestyle",
      settings: {
        "Morning person": true,
        "Quiet hours": "10 PM - 7 AM",
        "Social energy": 70,
        "Cleanliness level": 85,
      },
    },
    {
      category: "Relationship",
      settings: {
        "Love language": "Quality time",
        "Date frequency": "Weekly",
        "Future planning": true,
        "Shared goals": true,
      },
    },
  ];

  // Initialize data
  useEffect(() => {
    setMessages([
      {
        id: "1",
        text: "💌 Scheduled Love Note: You looked so peaceful this morning while you slept. I made your favorite coffee for when you wake up. Have an amazing day, beautiful! ☕️💕",
        timestamp: "8:30 AM",
        isOwn: false,
        isAnonymous: false,
        mood: "happy",
        replies: [
          {
            id: "r1",
            text: "This just made my whole day! How did you know I needed this today? 🥰",
            timestamp: "9:15 AM",
            isOwn: true,
          },
        ],
        likes: 5,
        isLiked: true,
      },
      {
        id: "2",
        text: "🤖 AI Insight: Your partner mentioned feeling overwhelmed lately. Here's a gentle suggestion: Maybe surprise them with their favorite takeout tonight? They love Thai food when stressed.",
        timestamp: "2 hours ago",
        isOwn: false,
        isAnonymous: false,
        mood: "thoughtful",
        replies: [
          {
            id: "r2",
            text: "Perfect timing! I was wondering how to help. Ordering from Bangkok Garden now 🍜",
            timestamp: "1:45 PM",
            isOwn: true,
          },
        ],
        likes: 3,
        isLiked: true,
      },
      {
        id: "3",
        text: "I talked to the AI today about feeling anxious about work. It gave me some great breathing exercises and asked if you could give me extra cuddles tonight 🤗",
        timestamp: "4:30 PM",
        isOwn: true,
        mood: "thoughtful",
        replies: [],
        likes: 4,
        isLiked: false,
      },
      {
        id: "4",
        text: "📅 Tomorrow's Love Note Preview: 'Remember when we danced in the kitchen last week? Your laugh is my favorite sound in the world.'",
        timestamp: "5:00 PM",
        isOwn: false,
        isAnonymous: false,
        mood: "excited",
        replies: [],
        likes: 2,
        isLiked: true,
      },
    ]);

    setSharedItems([
      {
        id: "1",
        text: "Organic blueberries",
        isCompleted: true,
        addedBy: "You",
        category: "groceries",
        priority: "medium",
        notes: "For weekend pancakes",
      },
      {
        id: "2",
        text: "Oat milk (vanilla)",
        isCompleted: false,
        addedBy: "Partner",
        category: "groceries",
        priority: "high",
      },
      {
        id: "3",
        text: "Fresh basil for pasta",
        isCompleted: false,
        addedBy: "You",
        category: "groceries",
        priority: "low",
      },
      {
        id: "4",
        text: "Plan anniversary dinner",
        isCompleted: false,
        addedBy: "Partner",
        category: "dates",
        priority: "high",
        dueDate: "2024-12-01",
      },
      {
        id: "5",
        text: "Book couples massage",
        isCompleted: true,
        addedBy: "You",
        category: "dates",
        priority: "medium",
      },
      {
        id: "6",
        text: "Deep clean bathroom together",
        isCompleted: false,
        addedBy: "Partner",
        category: "tasks",
        priority: "medium",
        dueDate: "2024-11-20",
      },
    ]);

    setSharedGoals([
      {
        id: "1",
        title: "Save for European Trip",
        description: "Plan and save for our dream 2-week Europe adventure",
        category: "travel",
        progress: 65,
        targetDate: "2025-06-01",
        createdBy: "You",
        milestones: [
          {
            id: "m1",
            title: "Research destinations",
            completed: true,
            completedDate: "2024-10-15",
          },
          {
            id: "m2",
            title: "Set budget ($8000)",
            completed: true,
            completedDate: "2024-10-20",
          },
          { id: "m3", title: "Save $5000", completed: false },
          { id: "m4", title: "Book flights", completed: false },
        ],
      },
      {
        id: "2",
        title: "Weekly Date Nights",
        description: "Commit to regular quality time together",
        category: "relationship",
        progress: 80,
        targetDate: "2024-12-31",
        createdBy: "Partner",
        milestones: [
          { id: "m5", title: "Choose recurring day", completed: true },
          { id: "m6", title: "Create date idea list", completed: true },
          { id: "m7", title: "Complete 10 dates", completed: false },
        ],
      },
      {
        id: "3",
        title: "Healthy Cooking Together",
        description: "Learn to cook nutritious meals as a team",
        category: "lifestyle",
        progress: 45,
        targetDate: "2024-12-31",
        createdBy: "You",
        milestones: [
          { id: "m8", title: "Buy cookbook", completed: true },
          { id: "m9", title: "Plan weekly menus", completed: false },
          { id: "m10", title: "Cook 20 meals together", completed: false },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Sync activeTab prop with internal state
  useEffect(() => {
    setViewState((prev) => ({
      ...prev,
      activeTab: activeTab,
      level: "main", // Reset to main level when tab changes
    }));
  }, [activeTab]);

  // Interactive functions
  const toggleItem = (id: string) => {
    setSharedItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
      ),
    );
  };

  const addNewItem = () => {
    if (newItem.trim()) {
      const newSharedItem: SharedItem = {
        id: Date.now().toString(),
        text: newItem.trim(),
        isCompleted: false,
        addedBy: "You",
        category: selectedCategory,
        priority: "medium",
      };
      setSharedItems([...sharedItems, newSharedItem]);
      setNewItem("");
      setShowAddForm(false);
    }
  };

  const deleteItem = (id: string) => {
    setSharedItems(sharedItems.filter((item) => item.id !== id));
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        timestamp: "Just now",
        isOwn: true,
        isAnonymous,
        mood: "happy",
        replies: [],
        likes: 0,
        isLiked: false,
      };
      setMessages([message, ...messages]);
      setNewMessage("");
    }
  };

  const likeMessage = (id: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              likes: msg.isLiked ? msg.likes - 1 : msg.likes + 1,
              isLiked: !msg.isLiked,
            }
          : msg,
      ),
    );
  };

  const navigateToDetail = (tab: CouplesTabType, data?: any) => {
    setViewState({
      level: "detail",
      activeTab: tab,
      selectedGoal: data?.type === "goal" ? data.goal : undefined,
      selectedMessage: data?.type === "message" ? data.message : undefined,
    });
  };

  const navigateBack = () => {
    if (
      viewState.level === "detail" ||
      viewState.level === "compose" ||
      viewState.level === "settings"
    ) {
      setViewState({ level: "main", activeTab: viewState.activeTab });
    } else if (viewState.level === "profile") {
      setViewState({ level: "detail", activeTab: "preferences" });
    }
  };

  const navigateToCompose = () => {
    setViewState({
      ...viewState,
      level: "compose",
      isComposingMessage: true,
    });
  };

  const navigateToSettings = (category: string) => {
    setViewState({
      ...viewState,
      level: "settings",
      settingsCategory: category,
    });
  };

  const getFilteredItems = () => {
    return sharedItems.filter((item) => item.category === selectedCategory);
  };

  const getMoodIcon = (mood: number) => {
    if (mood >= 9) return { icon: Heart, color: "text-rose-500" };
    if (mood >= 7) return { icon: Smile, color: "text-green-500" };
    if (mood >= 5) return { icon: Meh, color: "text-gray-500" };
    return { icon: Frown, color: "text-red-500" };
  };

  const averageMood = Math.round(
    weeklyMoods.reduce((sum, day) => sum + day.yourMood + day.partnerMood, 0) /
      (weeklyMoods.length * 2),
  );

  const renderMainContent = () => {
    switch (viewState.activeTab) {
      case "home":
        return (
          <div className="p-4 space-y-4 h-full overflow-y-auto">
            {/* Relationship Harmony */}
            <Card
              className="border-0 bg-gradient-to-br from-rose-50 to-pink-50 shadow-md cursor-pointer hover:shadow-lg transition-all"
              onClick={() => navigateToDetail("home")}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-rose-500" />
                    <h3 className="font-bold text-gray-900">
                      Relationship Harmony
                    </h3>
                  </div>
                  <span className="text-2xl font-bold text-rose-600">
                    {averageMood}/10
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">This week's vibe</span>
                    <span className="text-rose-600 font-medium">
                      Flourishing
                    </span>
                  </div>
                  <div className="w-full bg-rose-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${averageMood * 10}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Daily check-ins help strengthen your bond
                    </span>
                    <div className="flex gap-1">
                      {weeklyMoods.slice(-3).map((day, index) => (
                        <span
                          key={index}
                          className="text-lg cursor-pointer"
                          title={day.note}
                        >
                          {(() => {
                            const { icon: Icon, color } = getMoodIcon(
                              Math.round((day.yourMood + day.partnerMood) / 2),
                            );
                            return <Icon className={`w-5 h-5 ${color}`} />;
                          })()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Card
                className="border-0 bg-white/70 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                onClick={() => navigateToCompose()}
              >
                <CardContent className="p-3 text-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Check In
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Share how you're feeling
                  </p>
                </CardContent>
              </Card>

              <Card
                className="border-0 bg-white/70 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                onClick={() => navigateToDetail("goals")}
              >
                <CardContent className="p-3 text-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <Target className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Set Goal
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">Plan together</p>
                </CardContent>
              </Card>
            </div>

            {/* Shared Goals Preview */}
            <Card className="border-0 bg-white/70 shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Shared Goals</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateToDetail("goals")}
                    className="text-rose-600 hover:bg-rose-50"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {sharedGoals.slice(0, 2).map((goal) => (
                    <div
                      key={goal.id}
                      className="p-3 bg-white rounded-lg border hover:shadow-sm transition-all cursor-pointer"
                      onClick={() =>
                        navigateToDetail("goals", { type: "goal", goal })
                      }
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {goal.title}
                        </h4>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            goal.category === "travel"
                              ? "bg-blue-100 text-blue-700"
                              : goal.category === "relationship"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {goal.category}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{goal.progress}% complete</span>
                        <span>
                          Due {new Date(goal.targetDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 bg-white/70 shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Recent Together</h3>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Shared grocery list completed
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-rose-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Love note sent
                      </p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Date night planned
                      </p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "groceries":
        return (
          <div className="p-4 space-y-4 h-full overflow-y-auto">
            {/* Add Item */}
            {showAddForm ? (
              <Card className="border-2 border-rose-200 bg-rose-50/50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <Input
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder="Add new grocery item..."
                      className="border-rose-200 focus:border-rose-400"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setSelectedCategory("groceries");
                          addNewItem();
                        }}
                        className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white h-8"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                      <Button
                        onClick={() => setShowAddForm(false)}
                        variant="outline"
                        size="sm"
                        className="h-8"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Button
                onClick={() => setShowAddForm(true)}
                className="w-full h-10 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Grocery Item
              </Button>
            )}

            {/* Grocery Items */}
            <div className="space-y-3">
              {sharedItems
                .filter((item) => item.category === "groceries")
                .map((item) => (
                  <Card
                    key={item.id}
                    className={`border-0 cursor-pointer transition-all hover:shadow-md group ${
                      item.isCompleted
                        ? "bg-gray-50 opacity-75"
                        : "bg-white shadow-sm"
                    }`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            item.isCompleted
                              ? "bg-rose-500 border-rose-500"
                              : "border-gray-300 hover:border-rose-400"
                          }`}
                        >
                          {item.isCompleted && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              item.isCompleted
                                ? "line-through text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {item.text}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Added by {item.addedBy}</span>
                            {item.notes && (
                              <>
                                <span>•</span>
                                <span>{item.notes}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              item.priority === "high"
                                ? "border-red-200 text-red-700"
                                : item.priority === "medium"
                                  ? "border-amber-200 text-amber-700"
                                  : "border-green-200 text-green-700"
                            }`}
                          >
                            {item.priority}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteItem(item.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        );

      case "tasks":
        return (
          <div className="p-4 space-y-4 h-full overflow-y-auto">
            {/* Add Item */}
            {showAddForm ? (
              <Card className="border-2 border-rose-200 bg-rose-50/50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <Input
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder="Add new task..."
                      className="border-rose-200 focus:border-rose-400"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setSelectedCategory("tasks");
                          addNewItem();
                        }}
                        className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white h-8"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                      <Button
                        onClick={() => setShowAddForm(false)}
                        variant="outline"
                        size="sm"
                        className="h-8"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Button
                onClick={() => setShowAddForm(true)}
                className="w-full h-10 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            )}

            {/* Task Items */}
            <div className="space-y-3">
              {sharedItems
                .filter((item) => item.category === "tasks")
                .map((item) => (
                  <Card
                    key={item.id}
                    className={`border-0 cursor-pointer transition-all hover:shadow-md group ${
                      item.isCompleted
                        ? "bg-gray-50 opacity-75"
                        : "bg-white shadow-sm"
                    }`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            item.isCompleted
                              ? "bg-rose-500 border-rose-500"
                              : "border-gray-300 hover:border-rose-400"
                          }`}
                        >
                          {item.isCompleted && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              item.isCompleted
                                ? "line-through text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {item.text}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Added by {item.addedBy}</span>
                            {item.dueDate && (
                              <>
                                <span>•</span>
                                <span>
                                  Due{" "}
                                  {new Date(item.dueDate).toLocaleDateString()}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              item.priority === "high"
                                ? "border-red-200 text-red-700"
                                : item.priority === "medium"
                                  ? "border-amber-200 text-amber-700"
                                  : "border-green-200 text-green-700"
                            }`}
                          >
                            {item.priority}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteItem(item.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        );

      case "goals":
        return (
          <div className="p-4 space-y-4 h-full overflow-y-auto">
            {/* Goals List */}
            <div className="space-y-3">
              {sharedGoals.map((goal) => (
                <Card
                  key={goal.id}
                  className="border-0 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    navigateToDetail("goals", { type: "goal", goal })
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {goal.title}
                      </h4>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          goal.category === "travel"
                            ? "bg-blue-100 text-blue-700"
                            : goal.category === "relationship"
                              ? "bg-rose-100 text-rose-700"
                              : goal.category === "lifestyle"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {goal.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {goal.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium text-rose-600">
                          {goal.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Created by {goal.createdBy}</span>
                        <span>
                          Due {new Date(goal.targetDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "communicate":
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-pink-50">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span className="text-sm font-medium text-gray-700">
                  HeartSpace
                </span>
                <span className="text-xs text-gray-500">
                  • Love notes & AI support
                </span>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] cursor-pointer ${message.isOwn ? "order-2" : "order-1"}`}
                    onClick={() =>
                      navigateToDetail("communicate", {
                        type: "message",
                        message,
                      })
                    }
                  >
                    <div
                      className={`p-3 rounded-2xl ${
                        message.isOwn
                          ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white"
                          : "bg-white border border-gray-200 text-gray-900"
                      }`}
                    >
                      {message.isAnonymous && !message.isOwn && (
                        <div className="flex items-center gap-1 mb-2 opacity-75">
                          <Lock className="w-3 h-3" />
                          <span className="text-xs">Anonymous</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1 px-2">
                      <span className="text-xs text-gray-500">
                        {message.timestamp}
                      </span>
                      {message.mood && (
                        <span className="text-sm flex items-center">
                          {message.mood === "happy" ? (
                            <Smile className="w-4 h-4 text-green-500" />
                          ) : message.mood === "thoughtful" ? (
                            <MessageCircle className="w-4 h-4 text-blue-500" />
                          ) : message.mood === "excited" ? (
                            <Zap className="w-4 h-4 text-yellow-500" />
                          ) : (
                            <Frown className="w-4 h-4 text-red-500" />
                          )}
                        </span>
                      )}
                      {message.likes > 0 && (
                        <div className="flex items-center gap-1">
                          <Heart
                            className={`w-3 h-3 ${message.isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                          />
                          <span className="text-xs text-gray-500">
                            {message.likes}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-rose-100 bg-white">
              <div className="flex gap-2 mb-3">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Send a love note, chat with AI, or share feelings..."
                  className="flex-1 border-rose-200 focus:border-rose-400"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* HeartSpace quick actions */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  💌 Love Note
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  🤖 Ask AI
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  📅 Schedule
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <button
                    className="p-2 hover:scale-110 transition-transform rounded-lg hover:bg-green-50"
                    title="Happy"
                  >
                    <Smile className="w-5 h-5 text-green-500" />
                  </button>
                  <button
                    className="text-lg hover:scale-110 transition-transform"
                    title="Love"
                  >
                    💕
                  </button>
                  <button
                    className="text-lg hover:scale-110 transition-transform"
                    title="Hug"
                  >
                    ���
                  </button>
                  <button
                    className="p-2 hover:scale-110 transition-transform rounded-lg hover:bg-blue-50"
                    title="Support"
                  >
                    <Users className="w-5 h-5 text-blue-500" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  End-to-end encrypted
                </span>
              </div>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="p-6 space-y-6 h-full overflow-y-auto">
            {preferences.map((pref, index) => (
              <Card
                key={index}
                className={`border-0 shadow-md cursor-pointer hover:shadow-lg transition-all ${
                  pref.category === "Communication"
                    ? "bg-gradient-to-br from-blue-50 to-indigo-50"
                    : pref.category === "Lifestyle"
                      ? "bg-gradient-to-br from-emerald-50 to-teal-50"
                      : "bg-gradient-to-br from-purple-50 to-pink-50"
                }`}
                onClick={() => navigateToSettings(pref.category)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        pref.category === "Communication"
                          ? "bg-blue-500"
                          : pref.category === "Lifestyle"
                            ? "bg-emerald-500"
                            : "bg-purple-500"
                      }`}
                    >
                      {pref.category === "Communication" && (
                        <MessageCircle className="w-5 h-5 text-white" />
                      )}
                      {pref.category === "Lifestyle" && (
                        <Home className="w-5 h-5 text-white" />
                      )}
                      {pref.category === "Relationship" && (
                        <Heart className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900">{pref.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(pref.settings)
                      .slice(0, 2)
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-gray-700">{key}</span>
                          <span
                            className={`text-sm font-medium ${
                              pref.category === "Communication"
                                ? "text-blue-600"
                                : pref.category === "Lifestyle"
                                  ? "text-emerald-600"
                                  : "text-purple-600"
                            }`}
                          >
                            {typeof value === "boolean"
                              ? value
                                ? "On"
                                : "Off"
                              : value}
                          </span>
                        </div>
                      ))}
                    <div className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${
                          pref.category === "Communication"
                            ? "text-blue-600 hover:bg-blue-50"
                            : pref.category === "Lifestyle"
                              ? "text-emerald-600 hover:bg-emerald-50"
                              : "text-purple-600 hover:bg-purple-50"
                        }`}
                      >
                        View All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const renderDetailContent = () => {
    if (viewState.selectedGoal) {
      const goal = viewState.selectedGoal;
      return (
        <div className="space-y-6 p-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={navigateBack}
              className="rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{goal.title}</h2>
              <p className="text-gray-600">{goal.description}</p>
            </div>
            <Badge
              className={`${
                goal.category === "travel"
                  ? "bg-blue-100 text-blue-700"
                  : goal.category === "relationship"
                    ? "bg-rose-100 text-rose-700"
                    : goal.category === "lifestyle"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
              }`}
            >
              {goal.category}
            </Badge>
          </div>

          <Card className="border-0 bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Progress</h3>
                <span className="text-2xl font-bold text-rose-600">
                  {goal.progress}%
                </span>
              </div>
              <div className="w-full bg-rose-200 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Created by {goal.createdBy}</span>
                <span>
                  Target: {new Date(goal.targetDate).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Milestones
              </h3>
              <div className="space-y-3">
                {goal.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        milestone.completed
                          ? "bg-rose-500 border-rose-500"
                          : "border-gray-300"
                      }`}
                    >
                      {milestone.completed && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          milestone.completed
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {milestone.title}
                      </p>
                      {milestone.completedDate && (
                        <p className="text-xs text-gray-500">
                          Completed{" "}
                          {new Date(
                            milestone.completedDate,
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateBack}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-bold text-gray-900">
            {viewState.activeTab === "home"
              ? "Harmony Details"
              : viewState.activeTab === "groceries"
                ? "Grocery Details"
                : viewState.activeTab === "tasks"
                  ? "Task Details"
                  : viewState.activeTab === "goals"
                    ? "Goal Details"
                    : viewState.activeTab === "communicate"
                      ? "Message Details"
                      : "Preference Details"}
          </h2>
        </div>
        <Card className="border-0 bg-white shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Detailed View
            </h3>
            <p className="text-gray-600">
              This would show expanded details and insights for the selected
              item.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderComposeContent = () => {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateBack}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-bold text-gray-900">
            HeartSpace Message
          </h2>
        </div>

        <Card className="border-0 bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like to do?
                </label>
                <div className="grid grid-cols-1 gap-3 mb-4">
                  {[
                    {
                      emoji: "💌",
                      label: "Send Love Note",
                      desc: "Share something sweet",
                    },
                    {
                      emoji: "🤖",
                      label: "Chat with AI",
                      desc: "Private emotional support",
                    },
                    {
                      emoji: "📅",
                      label: "Schedule Message",
                      desc: "Send when they need it",
                    },
                    {
                      emoji: "💕",
                      label: "Share Feelings",
                      desc: "Open communication",
                    },
                  ].map(({ emoji, label, desc }) => (
                    <Button
                      key={label}
                      variant="outline"
                      className="h-16 flex items-center gap-3 border-rose-200 text-rose-700 hover:bg-rose-50 text-left"
                    >
                      <span className="text-2xl">{emoji}</span>
                      <div>
                        <div className="font-semibold">{label}</div>
                        <div className="text-xs text-gray-500">{desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your message
                </label>
                <textarea
                  placeholder="Express your feelings, send love, or ask the AI for support..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full h-32 p-4 border border-rose-200 focus:border-rose-400 rounded-xl resize-none"
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-rose-500 rounded"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                  Send anonymously
                </label>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={navigateBack}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Send to HeartSpace
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderSettingsContent = () => {
    const category = preferences.find(
      (p) => p.category === viewState.settingsCategory,
    );
    if (!category) return null;

    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateBack}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-bold text-gray-900">
            {category.category} Settings
          </h2>
        </div>

        <Card className="border-0 bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-6">
              {Object.entries(category.settings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">{key}</span>
                    {key === "Love language" && (
                      <p className="text-sm text-gray-500">
                        How you prefer to give and receive love
                      </p>
                    )}
                  </div>
                  <div>
                    {typeof value === "boolean" ? (
                      <div
                        className={`w-12 h-6 rounded-full relative cursor-pointer ${
                          value ? "bg-rose-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                            value ? "right-1" : "left-1"
                          }`}
                        ></div>
                      </div>
                    ) : typeof value === "number" ? (
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">
                          {value}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-rose-600">
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      {viewState.level === "main" && renderMainContent()}
      {viewState.level === "detail" && renderDetailContent()}
      {viewState.level === "compose" && renderComposeContent()}
      {viewState.level === "settings" && renderSettingsContent()}
    </>
  );
}
