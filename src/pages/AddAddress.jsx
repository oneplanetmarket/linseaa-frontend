import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, value }) => (
    <input
        className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={value}
        required
    />
);

const AddAddress = () => {
    const { axios, user, navigate } = useAppContext();

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    // IMPROVEMENT: Added better user feedback and error handling
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        toast.loading('Saving address...');

        try {
            const { data } = await axios.post('/api/address/add', address);
            toast.dismiss();

            if (data.success) {
                toast.success(data.message || 'Address saved!');
                navigate('/cart');
            } else {
                toast.error(data.message || 'Failed to save address.');
            }
        } catch (error) {
            toast.dismiss();
            console.error("API Error saving address:", error);
            const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred.";
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/cart');
        }
    }, [user, navigate]);

    return (
        <div className='mt-28 pb-16 px-4'>
            <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
            <div className='flex flex-col-reverse md:flex-row justify-between items-start mt-10'>
                <div className='flex-1 max-w-md w-full'>
                    <form onSubmit={onSubmitHandler} className='space-y-4 mt-6 text-sm'>
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} value={address.firstName} name='firstName' type="text" placeholder="First Name"/>
                            <InputField handleChange={handleChange} value={address.lastName} name='lastName' type="text" placeholder="Last Name"/>
                        </div>

                        <InputField handleChange={handleChange} value={address.email} name='email' type="email" placeholder="Email address" />
                        <InputField handleChange={handleChange} value={address.street} name='street' type="text" placeholder="Street" />

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} value={address.city} name='city' type="text" placeholder="City" />
                            <InputField handleChange={handleChange} value={address.state} name='state' type="text" placeholder="State" />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            {/* FIX: Changed type to "text" to prevent browser validation issues */}
                            <InputField handleChange={handleChange} value={address.zipcode} name='zipcode' type="text" placeholder="Zip code" />
                            <InputField handleChange={handleChange} value={address.country} name='country' type="text" placeholder="Country" />
                        </div>

                        <InputField handleChange={handleChange} value={address.phone} name='phone' type="tel" placeholder="Phone" />

                        <button type='submit' className='w-full mt-6 bg-primary text-white py-3 rounded hover:bg-primary-dull transition cursor-pointer uppercase font-semibold'>
                            Save Address
                        </button>
                    </form>
                </div>
                <div className='md:ml-16 mb-10 md:mb-0'>
                    <img className='max-w-xs md:max-w-sm' src={assets.add_address_iamge} alt="Add Address" />
                </div>
            </div>
        </div>
    );
};

export default AddAddress;