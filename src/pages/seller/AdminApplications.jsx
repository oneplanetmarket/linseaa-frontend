import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { User, MapPin, Globe, Mail, Phone, Calendar, Award, FileText, CheckCircle, XCircle } from 'lucide-react';

const AdminApplications = () => {
  const { axios } = useAppContext();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/producer/applications');
      setApplications(data.filter((app) => app.status === 'pending'));
    } catch (err) {
      console.error('Error fetching applications:', err);
      toast.error('Failed to fetch producer applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this application?`)) {
      return;
    }

    try {
      setUpdating(id);
      await axios.patch(`/api/producer/status/${id}`, { status });
      toast.success(`Application ${status} successfully`);
      fetchApplications(); // Refresh the list
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Failed to update application status');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Producer Applications</h1>
          </div>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
            <FileText className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Producer Applications</h1>
          </div>
          <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
            <User className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-600">{applications.length} Pending</span>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No Pending Applications</h3>
            <p className="text-gray-400">New producer applications will appear here for review.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Basic Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-600" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{app.name}</h3>
                        <p className="text-sm text-gray-500">Producer Applicant</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{app.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{app.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{app.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{app.mobileNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{app.yearsInBusiness} years in business</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-gray-500" />
                        <h4 className="font-medium text-gray-800">Specialties</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {app.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Story</h4>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{app.story}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <h5 className="text-xs font-medium text-gray-500 mb-1">Profile Image</h5>
                        <a 
                          href={app.profileImageUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 break-all"
                        >
                          View Image
                        </a>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-500 mb-1">Cover Image</h5>
                        <a 
                          href={app.coverImageUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 break-all"
                        >
                          View Image
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => updateStatus(app._id, 'approved')}
                    disabled={updating === app._id}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating === app._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, 'rejected')}
                    disabled={updating === app._id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating === app._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {applications.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Showing {applications.length} pending applications</span>
              <button
                onClick={fetchApplications}
                className="text-blue-600 hover:text-blue-700 font-medium"
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

export default AdminApplications;