"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeContext";
import { Gift, Award, CreditCard, TrendingUp, ChevronRight, Check, Star } from "lucide-react";
import AuthenticatedNavbar from "@/components/authenticatedNavbar";

export default function LoyaltyProgram() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [pointsData, setPointsData] = useState({
    totalPoints: 1250,
    level: "Silver",
    nextLevel: "Gold",
    pointsToNextLevel: 750,
    pointsHistory: [
      { id: 1, activity: "Completed Ride", points: 50, date: "Feb 20, 2025" },
      { id: 2, activity: "Referred a Friend", points: 200, date: "Feb 15, 2025" },
      { id: 3, activity: "Weekly Bonus", points: 100, date: "Feb 10, 2025" },
      { id: 4, activity: "Completed Ride", points: 50, date: "Feb 05, 2025" },
      { id: 5, activity: "Completed Ride", points: 50, date: "Jan 28, 2025" },
    ],
    availableRewards: [
      { id: 1, name: "10% Off Next Ride", points: 200, isAvailable: true },
      { id: 2, name: "Free Ride (up to $15)", points: 500, isAvailable: true },
      { id: 3, name: "Priority Driver Matching", points: 300, isAvailable: true },
      { id: 4, name: "Airport Pickup Upgrade", points: 400, isAvailable: true },
      { id: 5, name: "Weekend Surge Protection", points: 450, isAvailable: true },
    ]
  });

  const levelInfo = {
    Bronze: { min: 0, max: 999, color: "bg-amber-700", textColor: "text-amber-700" },
    Silver: { min: 1000, max: 1999, color: "bg-gray-400", textColor: "text-gray-400" },
    Gold: { min: 2000, max: 4999, color: "bg-yellow-500", textColor: "text-yellow-500" },
    Platinum: { min: 5000, max: 9999, color: "bg-blue-400", textColor: "text-blue-400" },
    Diamond: { min: 10000, max: Infinity, color: "bg-purple-500", textColor: "text-purple-500" }
  };

  const currentLevel = levelInfo[pointsData.level as keyof typeof levelInfo];

  const progress = ((pointsData.totalPoints - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100;

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
        <div className="fixed top-0 left-0 w-full z-50">
                <AuthenticatedNavbar />
              </div>
        
      <div className="container mx-auto px-4 py-16">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">RideOn Rewards</h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl p-6 mb-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Your Rewards Balance</h2>
              <div className="flex items-center">
                <span className="text-3xl font-bold">{pointsData.totalPoints}</span>
                <span className="ml-2 text-yellow-500">points</span>
              </div>
              <div className="flex items-center mt-2">
                <Award className={`w-5 h-5 ${ levelInfo[pointsData.level as keyof typeof levelInfo].textColor} mr-2`} />
                <span className="font-medium">{pointsData.level} Member</span>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="flex justify-between text-sm mb-1">
                <span>{pointsData.level}</span>
                <span>{pointsData.nextLevel}</span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${currentLevel.color}`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                {pointsData.pointsToNextLevel} more points to reach {pointsData.nextLevel}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex mb-6 overflow-x-auto border-b border-gray-300 dark:border-gray-700">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === "overview" ? 
              (theme === "dark" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-yellow-600 border-b-2 border-yellow-600") : 
              "text-gray-600 dark:text-gray-400"}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab("earn")}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === "earn" ? 
              (theme === "dark" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-yellow-600 border-b-2 border-yellow-600") : 
              "text-gray-600 dark:text-gray-400"}`}
          >
            Earn Points
          </button>
          <button 
            onClick={() => setActiveTab("redeem")}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === "redeem" ? 
              (theme === "dark" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-yellow-600 border-b-2 border-yellow-600") : 
              "text-gray-600 dark:text-gray-400"}`}
          >
            Redeem Rewards
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === "history" ? 
              (theme === "dark" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-yellow-600 border-b-2 border-yellow-600") : 
              "text-gray-600 dark:text-gray-400"}`}
          >
            History
          </button>
        </div>

      
        <div className="mb-8">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`rounded-xl p-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow`}>
                  <div className="flex items-center mb-2">
                    <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Membership Tiers</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {Object.entries(levelInfo).map(([level, info]) => (
                      <li key={level} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${info.color} mr-2`}></div>
                        <span>{level}: {info.min.toLocaleString()}+ points</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`rounded-xl p-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow`}>
                  <div className="flex items-center mb-2">
                    <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Your Benefits</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Exclusive {pointsData.level} promotions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Priority customer support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Points never expire</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Bonus points on weekends</span>
                    </li>
                  </ul>
                </div>

                <div className={`rounded-xl p-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow`}>
                  <div className="flex items-center mb-2">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                      <Gift className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Quick Redeem</h3>
                  </div>
                  <div className="space-y-3">
                    {pointsData.availableRewards.slice(0, 2).map(reward => (
                      <div key={reward.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{reward.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{reward.points} points</p>
                        </div>
                        <button className={`px-3 py-1 rounded-full text-sm ${theme === "dark" ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-500 text-white"}`}>
                          Redeem
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => setActiveTab("redeem")}
                      className="text-sm font-medium flex items-center text-blue-500"
                    >
                      View all rewards
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              <div className={`rounded-xl p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow mb-6`}>
                <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {pointsData.pointsHistory.slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.activity}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                      </div>
                      <span className="font-semibold text-green-500">+{item.points}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab("history")}
                  className="mt-4 text-sm font-medium flex items-center text-blue-500"
                >
                  View all activity
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "earn" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`rounded-xl p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow mb-6`}>
                <h3 className="text-xl font-semibold mb-4">Ways to Earn Points</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-yellow-100"} mr-3`}>
                        <CreditCard className="w-5 h-5 text-yellow-500" />
                      </div>
                      <h4 className="font-medium">Book Rides</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Earn points every time you ride with us</p>
                    <ul className="ml-6 list-disc text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Standard Ride: 50 points</li>
                      <li>Premium Ride: 75 points</li>
                      <li>Long distance (10+ miles): +25 bonus points</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-yellow-100"} mr-3`}>
                        <Gift className="w-5 h-5 text-yellow-500" />
                      </div>
                      <h4 className="font-medium">Refer Friends</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Share the RideOn experience</p>
                    <ul className="ml-6 list-disc text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Friend signs up: 100 points</li>
                      <li>Friend completes first ride: +100 bonus points</li>
                      <li>No limit on referrals!</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-yellow-100"} mr-3`}>
                        <Star className="w-5 h-5 text-yellow-500" />
                      </div>
                      <h4 className="font-medium">Complete Challenges</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Earn bonus points through special challenges</p>
                    <ul className="ml-6 list-disc text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li>3 rides in a week: 100 bonus points</li>
                      <li>5 rides in a week: 250 bonus points</li>
                      <li>Monthly special challenges: up to 500 points</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-yellow-100"} mr-3`}>
                        <Award className="w-5 h-5 text-yellow-500" />
                      </div>
                      <h4 className="font-medium">Special Occasions</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Celebrate with bonus points</p>
                    <ul className="ml-6 list-disc text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Birthday bonus: 200 points</li>
                      <li>Anniversary with RideOn: 100-500 points</li>
                      <li>Seasonal promotions: varies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "redeem" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`rounded-xl p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow mb-6`}>
                <h3 className="text-xl font-semibold mb-4">Available Rewards</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">You have <span className="font-bold text-yellow-500">{pointsData.totalPoints}</span> points to redeem</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pointsData.availableRewards.map(reward => (
                    <div 
                      key={reward.id} 
                      className={`border rounded-lg p-4 flex items-center justify-between ${
                        pointsData.totalPoints >= reward.points
                          ? "border-green-200 dark:border-green-900"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div>
                        <div className="flex items-center">
                          <Gift className={`w-5 h-5 mr-2 ${
                            pointsData.totalPoints >= reward.points
                              ? "text-green-500" 
                              : "text-gray-400"
                          }`} />
                          <h4 className="font-medium">{reward.name}</h4>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{reward.points} points</p>
                      </div>
                      <button 
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          pointsData.totalPoints >= reward.points
                            ? theme === "dark" 
                              ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30" 
                              : "bg-yellow-500 text-white hover:bg-yellow-600"
                            : "bg-gray-200 text-gray-500 dark:bg-gray-700 cursor-not-allowed"
                        }`}
                        disabled={pointsData.totalPoints < reward.points}
                      >
                        {pointsData.totalPoints >= reward.points ? "Redeem Now" : "Not Enough Points"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`rounded-xl p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow mb-6`}>
                <h3 className="text-xl font-semibold mb-4">Points History</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className={`${theme === "dark" ? "border-b border-gray-700" : "border-b border-gray-200"}`}>
                        <th className="text-left py-3 px-4">Activity</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-right py-3 px-4">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pointsData.pointsHistory.map(item => (
                        <tr 
                          key={item.id}
                          className={`${theme === "dark" ? "border-b border-gray-700" : "border-b border-gray-200"} hover:bg-gray-50 dark:hover:bg-gray-700/50`}
                        >
                          <td className="py-3 px-4">{item.activity}</td>
                          <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{item.date}</td>
                          <td className="py-3 px-4 text-right font-medium text-green-500">+{item.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}