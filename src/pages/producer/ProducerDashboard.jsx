import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { User, BarChart, Truck, ClipboardCheck } from 'lucide-react';

const ProducerDashboard = () => {
  const { axios, navigate } = useAppContext();
  const [producer, setProducer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy progress values (replace with real API data later)
  const [progress, setProgress] = useState({
    wasteManagement: 65,
    vehicleUsage: 80,
    workUpdates: 50,
  });

  const fetchProducerProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/producer-auth/profile');

      if (data.success) {
        setProducer(data.producer);
      } else {
        toast.error(data.message);
        if (data.message.includes('authorized')) {
          navigate('/producer-login');
        }
      }
    } catch (error) {
      console.error('Error fetching producer profile:', error);
      toast.error('Failed to fetch profile');
      navigate('/producer-login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducerProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {producer?.name}!
            </h1>
            <p className="text-gray-600">
              Let's track waste management progress and keep the city clean.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bars Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Waste Management Progress */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Waste Management Progress
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-600 h-4 rounded-full"
              style={{ width: `${progress.wasteManagement}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-600 mt-1">
            {progress.wasteManagement}%
          </p>
        </div>

        {/* Vehicle Usage */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Vehicle Usage
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${progress.vehicleUsage}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-600 mt-1">
            {progress.vehicleUsage}%
          </p>
        </div>

        {/* Work Updates */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Work Updates
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-purple-600 h-4 rounded-full"
              style={{ width: `${progress.workUpdates}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-600 mt-1">
            {progress.workUpdates}%
          </p>
        </div>
      </div>

      {/* Producer Profile */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Producer Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Name
              </label>
              <p className="text-gray-800 font-medium">{producer?.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Email
              </label>
              <p className="text-gray-800">{producer?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Address
              </label>
              <p className="text-gray-800">{producer?.address}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Profile Image
              </label>
              <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src={producer?.profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/80x80?text=No+Image';
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Member Since
              </label>
              <p className="text-gray-800">
                {new Date(producer?.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Work Analytics Section */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Work Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <Truck className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-600">Vehicle Tracking</h3>
            <p className="text-sm text-gray-500 mt-1">
              Monitor vehicle movement and completed drives
            </p>
          </div>

          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <ClipboardCheck className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-600">Work Summary</h3>
            <p className="text-sm text-gray-500 mt-1">
              Review completed tasks and waste collection stats
            </p>
          </div>

          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <BarChart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-600">Performance Trends</h3>
            <p className="text-sm text-gray-500 mt-1">
              Analyze efficiency over time and improve operations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboard;
