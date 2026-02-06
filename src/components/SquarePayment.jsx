import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const SquarePayment = ({ orderData, onSuccess, onError, onCancel }) => {
    const [payments, setPayments] = useState(null);
    const [card, setCard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { axios } = useAppContext();

    useEffect(() => {
        const initializeSquare = async () => {
            try {
                if (!window.Square) {
                    console.error('Square SDK not loaded');
                    return;
                }

                const paymentsInstance = window.Square.payments(
                    process.env.REACT_APP_SQUARE_APPLICATION_ID || import.meta.env.VITE_SQUARE_APPLICATION_ID,
                    process.env.REACT_APP_SQUARE_LOCATION_ID || import.meta.env.VITE_SQUARE_LOCATION_ID
                );

                setPayments(paymentsInstance);

                const cardInstance = await paymentsInstance.card();
                await cardInstance.attach('#square-card-container');
                setCard(cardInstance);

            } catch (error) {
                console.error('Failed to initialize Square payments:', error);
                toast.error('Failed to load payment form');
            }
        };

        initializeSquare();

        // Cleanup function
        return () => {
            if (card) {
                card.destroy();
            }
        };
    }, []);

    const handlePayment = async () => {
        if (!card) {
            toast.error('Payment form not ready');
            return;
        }

        setIsLoading(true);

        try {
            // Tokenize card details
            const result = await card.tokenize();

            if (result.status === 'OK') {
                // Send payment token to backend
                const response = await axios.post('/api/order/square', {
                    token: result.token,
                    userId: orderData.userId,
                    items: orderData.items,
                    address: orderData.address,
                    amount: orderData.amount
                });

                if (response.data.success) {
                    toast.success('Payment successful!');
                    onSuccess(response.data.order);
                } else {
                    toast.error(response.data.message || 'Payment failed');
                    onError(response.data.message);
                }
            } else {
                toast.error('Card tokenization failed');
                onError('Card tokenization failed');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Payment processing failed');
            onError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Pay with Square</h3>
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Total Amount: ${orderData.amount}</p>
                    <p className="text-sm text-gray-600 mb-4">Enter your card details below:</p>
                </div>

                {/* Square Card Container */}
                <div id="square-card-container" className="mb-4"></div>

                <div className="flex gap-3">
                    <button
                        onClick={handlePayment}
                        disabled={isLoading || !card}
                        className={`flex-1 py-2 px-4 rounded font-medium transition-colors ${
                            isLoading || !card
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-[#174e1f] hover:bg-[#0f3516] text-white'
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                            </div>
                        ) : (
                            'Pay Now'
                        )}
                    </button>
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="py-2 px-4 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>

                <div className="mt-4 text-xs text-gray-500 text-center">
                    <p>🔒 Your payment information is secure and encrypted</p>
                </div>
            </div>
        </div>
    );
};

export default SquarePayment;