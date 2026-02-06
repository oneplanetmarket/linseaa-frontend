import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { Mail, Trash2, Users, Calendar } from 'lucide-react';

const NewsletterSubscribers = () => {
  const { axios } = useAppContext();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/newsletter/subscribers');
      if (data.success) {
        setSubscribers(data.subscribers);
      } else {
        toast.error(data.message || 'Failed to fetch subscribers');
      }
    } catch (error) {
      console.error('Error fetching newsletter subscribers:', error);
      toast.error('Failed to load newsletter subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscriber = async (email) => {
    if (!window.confirm(`Are you sure you want to unsubscribe ${email}?`)) {
      return;
    }

    try {
      setDeleting(email);
      const { data } = await axios.post('/api/newsletter/unsubscribe', { email });
      if (data.success) {
        toast.success('Subscriber removed successfully');
        fetchSubscribers(); // Refresh the list
      } else {
        toast.error(data.message || 'Failed to remove subscriber');
      }
    } catch (error) {
      console.error('Error removing subscriber:', error);
      toast.error('Failed to remove subscriber');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">Newsletter Subscribers</h1>
          </div>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">Newsletter Subscribers</h1>
          </div>
          <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
            <Users className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-600">{subscribers.length} Total</span>
          </div>
        </div>

        {subscribers.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No Subscribers Yet</h3>
            <p className="text-gray-400">Newsletter subscribers will appear here once people start signing up.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email Address</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date Subscribed</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, index) => (
                  <tr key={subscriber._id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-800">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(subscriber.subscribedAt)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleDeleteSubscriber(subscriber.email)}
                        disabled={deleting === subscriber.email}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deleting === subscriber.email ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="w-3 h-3" />
                        )}
                        <span className="text-xs font-medium">Remove</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {subscribers.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Showing all {subscribers.length} subscribers</span>
              <button
                onClick={fetchSubscribers}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterSubscribers;