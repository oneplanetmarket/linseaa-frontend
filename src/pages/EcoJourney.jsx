import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { 
  Leaf, Award, Target, TrendingUp, Users, 
  Calendar, BarChart3, Zap, Globe, Heart,
  ChevronRight, Star, Trophy, Settings
} from 'lucide-react';

const EcoJourney = () => {
  const { axios, user, navigate } = useAppContext();
  const [ecoJourney, setEcoJourney] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchEcoJourney = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/eco-journey');
      
      if (data.success) {
        setEcoJourney(data.ecoJourney);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching eco journey:', error);
      toast.error('Failed to load eco journey data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAchievements = async () => {
    try {
      const { data } = await axios.get('/api/eco-journey/achievements');
      if (data.success) {
        setAchievements(data.achievements);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const { data } = await axios.get('/api/eco-journey/leaderboard?type=level');
      if (data.success) {
        setLeaderboard(data.leaderboard);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchEcoJourney();
    fetchAchievements();
    fetchLeaderboard();
  }, [user]);

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getNextLevelXP = (currentLevel) => {
    return (currentLevel * currentLevel) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!ecoJourney) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500">No eco journey data found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Eco Journey</h1>
              <p className="text-green-100">Track your sustainable shopping impact</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">Level {ecoJourney.level}</div>
              <div className="text-green-100">
                {ecoJourney.experiencePoints} XP
              </div>
            </div>
          </div>
          
          {/* Level Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Level {ecoJourney.level}</span>
              <span>Level {ecoJourney.level + 1}</span>
            </div>
            <div className="w-full bg-green-700 rounded-full h-3">
              <div 
                className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                style={{ 
                  width: `${getProgressPercentage(
                    ecoJourney.experiencePoints % getNextLevelXP(ecoJourney.level),
                    getNextLevelXP(ecoJourney.level)
                  )}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'achievements', name: 'Achievements', icon: Award },
                { id: 'goals', name: 'Goals', icon: Target },
                { id: 'leaderboard', name: 'Leaderboard', icon: Trophy }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{ecoJourney.totalOrders}</h3>
                    <p className="text-gray-600">Total Orders</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{ecoJourney.carbonFootprintSaved.toFixed(1)}kg</h3>
                    <p className="text-gray-600">CO₂ Saved</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{ecoJourney.localProducers.length}</h3>
                    <p className="text-gray-600">Local Producers</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{ecoJourney.streaks.currentSustainableStreak}</h3>
                    <p className="text-gray-600">Current Streak</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ecoJourney.achievements.slice(-6).map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-800">{achievement.name}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Progress */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">This Month's Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{ecoJourney.monthlyStats[ecoJourney.monthlyStats.length - 1]?.orders || 0}</div>
                  <p className="text-gray-600">Orders This Month</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">₹{ecoJourney.monthlyStats[ecoJourney.monthlyStats.length - 1]?.spent || 0}</div>
                  <p className="text-gray-600">Amount Spent</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{ecoJourney.monthlyStats[ecoJourney.monthlyStats.length - 1]?.carbonSaved?.toFixed(1) || 0}kg</div>
                  <p className="text-gray-600">CO₂ Saved</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Achievements Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${achievement.achieved ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h3 className={`font-medium ${achievement.achieved ? 'text-green-800' : 'text-gray-800'}`}>
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    {achievement.achieved && <Star className="w-6 h-6 text-yellow-500 fill-current" />}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.current}/{achievement.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          achievement.achieved ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Monthly Goals</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Monthly Spending Goal</h3>
                  <div className="text-2xl font-bold text-green-600 mb-2">₹{ecoJourney.goals.monthlySpending}</div>
                  <div className="text-sm text-gray-600">
                    Current: ₹{ecoJourney.monthlyStats[ecoJourney.monthlyStats.length - 1]?.spent || 0}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ 
                        width: `${getProgressPercentage(
                          ecoJourney.monthlyStats[ecoJourney.monthlyStats.length - 1]?.spent || 0,
                          ecoJourney.goals.monthlySpending
                        )}%` 
                      }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Carbon Reduction Goal</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{ecoJourney.goals.carbonReduction}kg CO₂</div>
                  <div className="text-sm text-gray-600">
                    Current: {ecoJourney.monthlyStats[ecoJourney.monthlyStats.length - 1]?.carbonSaved?.toFixed(1) || 0}kg
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ 
                        width: `${getProgressPercentage(
                          ecoJourney.monthlyStats[ecoJourney.monthlyStats.length - 1]?.carbonSaved || 0,
                          ecoJourney.goals.carbonReduction
                        )}%` 
                      }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Local Support Goal</h3>
                  <div className="text-2xl font-bold text-purple-600 mb-2">{ecoJourney.goals.localSupport} producers</div>
                  <div className="text-sm text-gray-600">
                    Current: {ecoJourney.localProducers.length} producers
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ 
                        width: `${getProgressPercentage(
                          ecoJourney.localProducers.length,
                          ecoJourney.goals.localSupport
                        )}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Community Leaderboard</h2>
            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <div key={entry._id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-gray-300 text-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{entry.userId?.name || 'Anonymous'}</h3>
                    <p className="text-sm text-gray-600">Level {entry.level} • {entry.experiencePoints} XP</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">{entry.totalOrders} orders</div>
                    <div className="text-sm text-gray-600">{entry.carbonFootprintSaved.toFixed(1)}kg CO₂ saved</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcoJourney;