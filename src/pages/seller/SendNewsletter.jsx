import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const SendNewsletter = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const { axios } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim()) {
            toast.error('Please enter a newsletter title');
            return;
        }
        
        if (!body.trim()) {
            toast.error('Please enter newsletter content');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('/api/newsletter/send', {
                title: title.trim(),
                body: body.trim()
            });

            if (response.data.success) {
                toast.success(`Newsletter sent successfully to ${response.data.sentCount} subscribers!`);
                setTitle('');
                setBody('');
            } else {
                toast.error(response.data.message || 'Failed to send newsletter');
            }
        } catch (error) {
            console.error('Newsletter send error:', error);
            toast.error('Failed to send newsletter. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageTag = `<img src="${event.target.result}" alt="Newsletter Image" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;" />`;
                setBody(prev => prev + '\n\n' + imageTag);
            };
            reader.readAsDataURL(file);
        }
    };

    const insertFormatting = (format) => {
        const textarea = document.getElementById('newsletter-body');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = body.substring(start, end);
        
        let formattedText = '';
        switch (format) {
            case 'bold':
                formattedText = `<strong>${selectedText || 'Bold Text'}</strong>`;
                break;
            case 'italic':
                formattedText = `<em>${selectedText || 'Italic Text'}</em>`;
                break;
            case 'underline':
                formattedText = `<u>${selectedText || 'Underlined Text'}</u>`;
                break;
            case 'link':
                const url = prompt('Enter URL:');
                if (url) {
                    formattedText = `<a href="${url}" style="color: #174e1f; text-decoration: underline;">${selectedText || 'Link Text'}</a>`;
                }
                break;
            case 'bullet':
                formattedText = `\n<ul>\n<li>${selectedText || 'Bullet point'}</li>\n</ul>\n`;
                break;
            case 'paragraph':
                formattedText = `\n<p>${selectedText || 'New paragraph'}</p>\n`;
                break;
            default:
                return;
        }

        const newBody = body.substring(0, start) + formattedText + body.substring(end);
        setBody(newBody);
        
        // Reset cursor position
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
        }, 0);
    };

    const renderPreview = () => {
        return (
            <div className="bg-white border border-gray-300 rounded-lg p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-black">
                        <span className="text-black">ONE PLANET</span>
                        <span className="text-[#174e1f]">MARKET</span>
                    </h1>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
                <div 
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: body }}
                />
                <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
                    <p>© 2025 One Planet Market - Sustainable Commerce for Everyone</p>
                    <p className="mt-1">
                        <a href="#" className="text-[#174e1f] underline">Unsubscribe</a> | 
                        <a href="#" className="text-[#174e1f] underline ml-2">Visit Website</a>
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="flex-1 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Send Newsletter</h1>
                        <button
                            type="button"
                            onClick={() => setPreviewMode(!previewMode)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            {previewMode ? 'Edit' : 'Preview'}
                        </button>
                    </div>

                    {previewMode ? (
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Newsletter Preview:</h3>
                            {renderPreview()}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Field */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Newsletter Title / Subject Line
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter newsletter subject line..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#174e1f] focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Formatting Toolbar */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Newsletter Content
                                </label>
                                <div className="flex flex-wrap gap-2 mb-3 p-3 border border-gray-300 rounded-t-lg bg-gray-50">
                                    <button
                                        type="button"
                                        onClick={() => insertFormatting('bold')}
                                        className="px-3 py-1 bg-white border border-gray-300 rounded text-sm font-bold hover:bg-gray-100"
                                        title="Bold"
                                    >
                                        B
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertFormatting('italic')}
                                        className="px-3 py-1 bg-white border border-gray-300 rounded text-sm italic hover:bg-gray-100"
                                        title="Italic"
                                    >
                                        I
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertFormatting('underline')}
                                        className="px-3 py-1 bg-white border border-gray-300 rounded text-sm underline hover:bg-gray-100"
                                        title="Underline"
                                    >
                                        U
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertFormatting('link')}
                                        className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-100"
                                        title="Insert Link"
                                    >
                                        🔗
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertFormatting('bullet')}
                                        className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-100"
                                        title="Bullet List"
                                    >
                                        • List
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertFormatting('paragraph')}
                                        className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-100"
                                        title="New Paragraph"
                                    >
                                        ¶
                                    </button>
                                    <div className="flex items-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-100 cursor-pointer"
                                            title="Insert Image"
                                        >
                                            📷 Image
                                        </label>
                                    </div>
                                </div>

                                {/* Body Editor */}
                                <textarea
                                    id="newsletter-body"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    placeholder="Write your newsletter content here... You can use HTML formatting or use the buttons above to format text."
                                    rows="15"
                                    className="w-full px-4 py-3 border border-gray-300 border-t-0 rounded-b-lg focus:ring-2 focus:ring-[#174e1f] focus:border-transparent resize-vertical"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Tip: You can write in HTML or use the formatting buttons above. Images will be embedded directly in the email.
                                </p>
                            </div>

                            {/* Send Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`px-8 py-3 rounded-lg text-white font-medium transition-colors ${
                                        isLoading 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-[#174e1f] hover:bg-[#0f3516]'
                                    }`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sending Newsletter...
                                        </div>
                                    ) : (
                                        'Send Newsletter to All Subscribers'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SendNewsletter;