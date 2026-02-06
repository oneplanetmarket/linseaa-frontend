import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const LatestBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { axios, navigate } = useAppContext();

    useEffect(() => {
        fetchLatestBlogs();
    }, []);

    const fetchLatestBlogs = async () => {
        try {
            const response = await axios.get('/api/blog/approved');
            if (response.data.success) {
                setBlogs(response.data.blogs.slice(0, 6)); // Show only first 6 blogs
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlogClick = (blogId) => {
        navigate(`/blog/${blogId}`);
        window.scrollTo(0, 0);
    };

    if (loading) {
        return (
            <div className="py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-medium text-gray-800">Latest Blogs</h2>
                    <p className="text-gray-600 mt-2">Discover insights from our community of producers</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-gray-200 rounded-lg h-48 animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (blogs.length === 0) {
        return null;
    }

    return (
        <div className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-medium text-gray-800">Latest Blogs</h2>
                <p className="text-gray-600 mt-2">Discover insights from our community of producers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        onClick={() => handleBlogClick(blog._id)}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden border border-gray-100"
                    >
                        {blog.image && (
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}
                        
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-3 line-clamp-2 leading-6">
                                {blog.title}
                            </h3>
                            
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    by {blog.producer?.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <button
                    onClick={() => navigate('/blogs')}
                    className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                    View All Blogs
                </button>
            </div>
        </div>
    );
};

export default LatestBlogs;