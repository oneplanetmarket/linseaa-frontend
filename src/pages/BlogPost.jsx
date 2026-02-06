import React, { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const BlogPost = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ name: '', message: '' });
    const [submittingComment, setSubmittingComment] = useState(false);
    const { axios, navigate } = useAppContext();

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            const response = await axios.get(`/api/blog/${id}`);
            if (response.data.success) {
                setBlog(response.data.blog);
                setComments(response.data.blog.comments || []);
            } else {
                toast.error('Blog not found');
                navigate('/');
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
            toast.error('Error loading blog');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        
        if (!newComment.name.trim() || !newComment.message.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        setSubmittingComment(true);
        try {
            const response = await axios.post('/api/blog/comment', {
                blogId: id,
                name: newComment.name.trim(),
                message: newComment.message.trim()
            });

            if (response.data.success) {
                setComments([response.data.comment, ...comments]);
                setNewComment({ name: '', message: '' });
                toast.success('Comment added successfully');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error('Error adding comment');
        } finally {
            setSubmittingComment(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-8 w-1/3"></div>
                    <div className="h-64 bg-gray-200 rounded mb-8"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 mt-16 text-center">
                <h1 className="text-2xl font-medium text-gray-800 mb-4">Blog not found</h1>
                <button
                    onClick={() => navigate('/')}
                    className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
            {/* Blog Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate('/')}
                    className="text-primary hover:text-primary/80 transition-colors mb-4 flex items-center gap-2"
                >
                    ← Back to Home
                </button>
                
                <h1 className="text-3xl md:text-4xl font-medium text-gray-800 mb-4 leading-tight">
                    {blog.title}
                </h1>
                
                <div className="flex items-center gap-4 text-gray-600">
                    {blog.producer?.profileImage && (
                        <img
                            src={blog.producer.profileImage}
                            alt={blog.producer.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    )}
                    <div>
                        <p className="font-medium">by {blog.producer?.name}</p>
                        <p className="text-sm">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Blog Image */}
            {blog.image && (
                <div className="mb-8 rounded-lg overflow-hidden">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-auto max-h-96 object-cover"
                    />
                </div>
            )}

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none mb-12">
                <div 
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                    className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                />
            </div>

            <hr className="border-gray-300 mb-8" />

            {/* Comments Section */}
            <div className="mb-8">
                <h3 className="text-2xl font-medium text-gray-800 mb-6">
                    Comments ({comments.length})
                </h3>

                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit} className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-medium text-gray-800 mb-4">Leave a Comment</h4>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name *
                        </label>
                        <input
                            type="text"
                            value={newComment.name}
                            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Message *
                        </label>
                        <textarea
                            value={newComment.message}
                            onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                            placeholder="Write your comment here..."
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={submittingComment}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submittingComment ? 'Posting...' : 'Post Comment'}
                    </button>
                </form>

                {/* Comments List */}
                {comments.length > 0 ? (
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <div key={comment._id} className="bg-white rounded-lg p-6 border border-gray-200">
                                <div className="flex items-center justify-between mb-3">
                                    <h5 className="font-medium text-gray-800">{comment.name}</h5>
                                    <p className="text-sm text-gray-500">
                                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {comment.message}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>No comments yet. Be the first to leave a comment!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPost;