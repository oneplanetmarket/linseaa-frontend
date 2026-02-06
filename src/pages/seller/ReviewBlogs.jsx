import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ReviewBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('pending');
    const [searchTerm, setSearchTerm] = useState('');
    const [actionLoading, setActionLoading] = useState('');
    const { axios } = useAppContext();

    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
        filterBlogs();
    }, [blogs, activeTab, searchTerm]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blog/admin/all');
            if (response.data.success) {
                setBlogs(response.data.blogs);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
            toast.error('Error loading blogs');
        } finally {
            setLoading(false);
        }
    };

    const filterBlogs = () => {
        let filtered = blogs.filter(blog => blog.status === activeTab);
        
        if (searchTerm) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.producer.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        setFilteredBlogs(filtered);
    };

    const handleApprove = async (blogId) => {
        setActionLoading(blogId);
        try {
            const response = await axios.put(`/api/blog/admin/approve/${blogId}`);
            if (response.data.success) {
                setBlogs(blogs.map(blog => 
                    blog._id === blogId ? { ...blog, status: 'approved' } : blog
                ));
                toast.success('Blog approved successfully');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error approving blog:', error);
            toast.error('Error approving blog');
        } finally {
            setActionLoading('');
        }
    };

    const handleReject = async (blogId) => {
        setActionLoading(blogId);
        try {
            const response = await axios.put(`/api/blog/admin/reject/${blogId}`);
            if (response.data.success) {
                setBlogs(blogs.map(blog => 
                    blog._id === blogId ? { ...blog, status: 'rejected' } : blog
                ));
                toast.success('Blog rejected successfully');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error rejecting blog:', error);
            toast.error('Error rejecting blog');
        } finally {
            setActionLoading('');
        }
    };

    const handleDelete = async (blogId) => {
        if (!window.confirm('Are you sure you want to delete this blog permanently?')) {
            return;
        }

        setActionLoading(blogId);
        try {
            const response = await axios.delete(`/api/blog/admin/${blogId}`);
            if (response.data.success) {
                setBlogs(blogs.filter(blog => blog._id !== blogId));
                toast.success('Blog deleted successfully');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            toast.error('Error deleting blog');
        } finally {
            setActionLoading('');
        }
    };

    const getTabCounts = () => {
        const pending = blogs.filter(blog => blog.status === 'pending').length;
        const approved = blogs.filter(blog => blog.status === 'approved').length;
        const rejected = blogs.filter(blog => blog.status === 'rejected').length;
        return { pending, approved, rejected };
    };

    const tabCounts = getTabCounts();

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                    <div className="flex gap-4 mb-6">
                        {[1, 2, 3].map(item => (
                            <div key={item} className="h-10 bg-gray-200 rounded w-32"></div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map(item => (
                            <div key={item} className="bg-gray-200 h-40 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-medium text-gray-800 mb-2">Review Blogs</h1>
                <p className="text-gray-600">Manage blog posts from producers</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by blog title or producer name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'pending'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Pending ({tabCounts.pending})
                </button>
                <button
                    onClick={() => setActiveTab('approved')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'approved'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Approved ({tabCounts.approved})
                </button>
                <button
                    onClick={() => setActiveTab('rejected')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'rejected'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Rejected ({tabCounts.rejected})
                </button>
            </div>

            {/* Blogs List */}
            {filteredBlogs.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-800 mb-2">
                        No {activeTab} blogs found
                    </h3>
                    <p className="text-gray-600">
                        {searchTerm ? 'Try adjusting your search terms' : `No blogs with ${activeTab} status`}
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredBlogs.map((blog) => (
                        <div key={blog._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-medium text-gray-800 mb-2">{blog.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                            <span>By: {blog.producer?.name}</span>
                                            <span>
                                                Created: {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                                        blog.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                        blog.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' :
                                        'bg-red-100 text-red-800 border-red-200'
                                    }`}>
                                        {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                                    </span>
                                </div>

                                {blog.image && (
                                    <div className="mb-4">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full max-h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                )}

                                <div className="mb-6">
                                    <div 
                                        className="text-gray-700 line-clamp-4"
                                        dangerouslySetInnerHTML={{ 
                                            __html: blog.content.substring(0, 300) + (blog.content.length > 300 ? '...' : '')
                                        }}
                                    />
                                </div>

                                <div className="flex gap-3">
                                    {blog.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(blog._id)}
                                                disabled={actionLoading === blog._id}
                                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                                            >
                                                {actionLoading === blog._id ? 'Processing...' : 'Approve'}
                                            </button>
                                            <button
                                                onClick={() => handleReject(blog._id)}
                                                disabled={actionLoading === blog._id}
                                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                                            >
                                                {actionLoading === blog._id ? 'Processing...' : 'Reject'}
                                            </button>
                                        </>
                                    )}
                                    
                                    {blog.status === 'approved' && (
                                        <button
                                            onClick={() => handleReject(blog._id)}
                                            disabled={actionLoading === blog._id}
                                            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors disabled:opacity-50"
                                        >
                                            {actionLoading === blog._id ? 'Processing...' : 'Reject'}
                                        </button>
                                    )}
                                    
                                    {blog.status === 'rejected' && (
                                        <button
                                            onClick={() => handleApprove(blog._id)}
                                            disabled={actionLoading === blog._id}
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                                        >
                                            {actionLoading === blog._id ? 'Processing...' : 'Approve'}
                                        </button>
                                    )}
                                    
                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        disabled={actionLoading === blog._id}
                                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
                                    >
                                        {actionLoading === blog._id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewBlogs;