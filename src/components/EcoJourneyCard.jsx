import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Leaf, Award, TrendingUp, ChevronRight } from 'lucide-react';

const EcoJourneyCard = () => {
  const { axios, user, navigate } = useAppContext();
  const [ecoJourney, setEcoJourney] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEcoJourney = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data } = await axios.get('/api/eco-journey');
      
      if (data.success) {
        setEcoJourney(data.ecoJourney);
      }
    } catch (error) {
      console.error('Error fetching eco journey:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEcoJourney();
  }, [user]);

  if (!user || loading) {
    return null;
  }

  if (!ecoJourney) {
    return (
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <Leaf className="w-8 h-8 text-green-600" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">Start Your Eco Journey</h3>
            <p className="text-sm text-gray-600">Track your sustainable shopping impact</p>
          </div>
          <button
            onClick={() => navigate('/eco-journey')}
            className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium"
          >
            Begin <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-600" />
          <h3 className="font-semibold text-gray-800">Your Eco Journey</h3>
        </div>
        <button
          onClick={() => navigate('/eco-journey')}
          className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium text-sm"
        >
          View Details <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">Level {ecoJourney.level}</div>
          <div className="text-xs text-gray-600">{ecoJourney.experiencePoints} XP</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{ecoJourney.totalOrders}</div>
          <div className="text-xs text-gray-600">Orders</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">{ecoJourney.carbonFootprintSaved.toFixed(1)}kg</div>
          <div className="text-xs text-gray-600">CO₂ Saved</div>
        </div>
      </div>

      {/* Recent Achievement */}
      {ecoJourney.achievements.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-white bg-opacity-50 rounded">
          <Award className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-gray-700">
            Latest: {ecoJourney.achievements[ecoJourney.achievements.length - 1].name}
          </span>
        </div>
      )}

      {/* Progress Bar for Next Level */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Level {ecoJourney.level}</span>
          <span>Level {ecoJourney.level + 1}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${Math.min((ecoJourney.experiencePoints % ((ecoJourney.level * ecoJourney.level) * 100)) / ((ecoJourney.level * ecoJourney.level) * 100) * 100, 100)}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EcoJourneyCard;