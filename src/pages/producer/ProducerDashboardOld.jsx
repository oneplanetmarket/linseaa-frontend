import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { User, Package, Settings, BarChart, Plus } from 'lucide-react';

const ProducerDashboard = () => {
  const { axios, navigate } = useAppContext();
  const [producer, setProducer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0
  });

  const fetchProducerProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/producer-auth/profile');
      
      if (data.success) {
        setProducer(data.producer);
        await fetchProductStats(); // Fetch product stats after getting producer info
      } else {
        toast.error(data.message);
        // If unauthorized, redirect to login
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

  const fetchProductStats = async () => {
    try {
      const { data } = await axios.get('/api/producer/my-products');
      if (data.success) {
        const products = data.products;
        setStats({
          totalProducts: products.length,
          activeProducts: products.filter(p => p.stock > 0).length
        });
      }
    } catch (error) {
      console.error('Error fetching product stats:', error);
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
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, {producer?.name}!</h1>
            <p className="text-gray-600">Manage your products and track your sales</p>
          </div>
        </div>
      </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
                <p className="text-2xl font-bold text-gray-800">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Active Products</h3>
                <p className="text-2xl font-bold text-gray-800">{stats.activeProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Status</h3>
                <p className="text-lg font-semibold text-green-600">
                  {producer?.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Producer Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                <p className="text-gray-800 font-medium">{producer?.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <p className="text-gray-800">{producer?.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                <p className="text-gray-800">{producer?.address}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Profile Image</label>
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                  <img 
                    src={producer?.profileImageUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                <p className="text-gray-800">
                  {new Date(producer?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/producer/my-products')}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Package className="w-5 h-5" />
              My Products
            </button>
            <button
              onClick={() => navigate('/producer/add-product')}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <BarChart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium text-gray-600">Sales Analytics</h3>
              <p className="text-sm text-gray-500 mt-1">Track your sales performance</p>
            </div>
            
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium text-gray-600">Account Settings</h3>
              <p className="text-sm text-gray-500 mt-1">Manage your account preferences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboard;