import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const { axios } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }
        
        try {
            const response = await axios.post('/api/newsletter/subscribe', { email });
            if (response.data.success) {
                toast.success('Successfully subscribed to newsletter!');
                setEmail('');
            } else {
                toast.error(response.data.message || 'Subscription failed');
            }
        } catch (error) {
            toast.error('Newsletter subscription failed. Please try again.');
            console.error(error);
        }
    };
    
    return (
        <section className="relative w-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#022c22] overflow-hidden -mb-24">
            
            {/* Glow Effects */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 px-6">

                <h1 className="md:text-4xl text-2xl text-white font-bold">
                    Stay Connected
                </h1>

                <p className="md:text-lg text-gray-400 max-w-xl">
                    Get updates on earning oppurtunities.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 flex items-center max-w-2xl w-full md:h-14 h-12 bg-white/5 border border-white/10 rounded-xl backdrop-blur"
                >
                    <input
                        className="h-full w-full bg-transparent px-4 text-gray-200 placeholder-gray-500 outline-none rounded-l-xl"
                        type="email"
                        placeholder="Enter your email id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="md:px-12 px-8 h-full text-black bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer rounded-xl rounded-l-none font-semibold"
                    >
                        Subscribe
                    </button>
                </form>

            </div>
        </section>
    )
}

export default NewsLetter;
