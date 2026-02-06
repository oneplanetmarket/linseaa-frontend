import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import SquarePayment from "../components/SquarePayment";

const Cart = () => {
    const {products, currency, cartItems, removeFromCart, getCartCount, updateCartItem, navigate, getCartAmount, axios, user, setCartItems} = useAppContext()
    const [cartArray, setCartArray] = useState([])
    const [addresses, setAddresses] = useState([])
    const [showAddress, setShowAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentOption, setPaymentOption] = useState("COD")
    const [showSquarePayment, setShowSquarePayment] = useState(false)

    const getCart = ()=>{
        let tempArray = []
        for(const key in cartItems){
            const product = products.find((item)=>item._id === key)
            if (product) {
                product.quantity = cartItems[key]
                tempArray.push(product)
            }
        }
        setCartArray(tempArray)
    }

    const getUserAddress = async ()=>{
        try {
            const {data} = await axios.get('/api/address/get');
            if (data.success){
                setAddresses(data.addresses)
                if(data.addresses.length > 0){
                    setSelectedAddress(data.addresses[0])
                }
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error("Failed to load addresses.")
        }
    }

    const placeOrder = async ()=>{
        try {
            if(!selectedAddress){
                return toast.error("Please select an address")
            }

            // Place Order with COD
            if(paymentOption === "COD"){
                const {data} = await axios.post('/api/order/cod', {
                    userId: user._id,
                    items: cartArray.map(item=> ({product: item._id, quantity: item.quantity})),
                    address: selectedAddress._id
                })

                if(data.success){
                    toast.success(data.message)
                    setCartItems({})
                    navigate('/my-orders')
                }else{
                    toast.error(data.message)
                }
            }else if(paymentOption === "Online"){
                // Place Order with Stripe
                const {data} = await axios.post('/api/order/stripe', {
                    userId: user._id,
                    items: cartArray.map(item=> ({product: item._id, quantity: item.quantity})),
                    address: selectedAddress._id
                })

                if(data.success){
                    window.location.replace(data.url)
                }else{
                    toast.error(data.message)
                }
            }else if(paymentOption === "Square"){
                // Handle Square Payment
                setShowSquarePayment(true)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(products.length > 0 && cartItems){
            getCart()
        }
    },[products, cartItems])

    useEffect(()=>{
        if(user){
            getUserAddress()
        }
    },[user])

    const handleSquarePaymentSuccess = (order) => {
        setShowSquarePayment(false)
        setCartItems({})
        toast.success('Payment successful!')
        navigate('/my-orders')
    }

    const handleSquarePaymentError = (error) => {
        setShowSquarePayment(false)
        toast.error('Payment failed: ' + error)
    }

    const handleSquarePaymentCancel = () => {
        setShowSquarePayment(false)
    }

    const orderData = {
        userId: user?._id,
        items: cartArray.map(item => ({product: item._id, quantity: item.quantity})),
        address: selectedAddress?._id,
        amount: getCartAmount() + Math.floor(getCartAmount() * 0.02)
    }
    
    return products.length > 0 && getCartCount() > 0 ? (
        <div className="flex flex-col md:flex-row mt-28 px-4 sm:px-6 lg:px-8">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product) => (
                    <div key={product._id} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={()=>{
                                navigate(`/products/${product.category.toLowerCase()}/${product._id}`); window.scrollTo(0,0)
                            }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800 text-sm cursor-pointer" onClick={()=>{
                                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`); window.scrollTo(0,0)
                                }}>{product.name}</h3>
                                <p className="text-gray-500">{currency}{product.offerPrice}</p>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => updateCartItem(product._id, product.quantity - 1)}
                                        className="bg-gray-200 text-gray-800 w-7 h-7 rounded text-lg font-bold flex items-center justify-center hover:bg-gray-300 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">{product.quantity}</span>
                                    <button 
                                        onClick={() => updateCartItem(product._id, product.quantity + 1)}
                                        className="bg-gray-200 text-gray-800 w-7 h-7 rounded text-lg font-bold flex items-center justify-center hover:bg-gray-300 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-center font-medium text-gray-800">{currency}{product.offerPrice * product.quantity}</p>
                        <div className="text-center">
                            <img onClick={()=>removeFromCart(product._id)} className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform mx-auto" src={assets.remove_icon} alt="Remove" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="md:w-80 w-full mt-8 md:mt-0 md:ml-8">
                <div className="border border-gray-300 rounded-lg p-6">
                    <h2 className="text-xl font-medium mb-4">Cart Totals</h2>
                    
                    <div className="flex justify-between text-sm mb-2">
                        <p>Subtotal</p>
                        <p>{currency}{getCartAmount()}</p>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-2">
                        <p>Tax (2%)</p>
                        <p>{currency}{Math.floor(getCartAmount() * 0.02)}</p>
                    </div>
                    
                    <hr className="border-gray-300 my-2" />
                    
                    <div className="flex justify-between font-medium mb-4">
                        <p>Total</p>
                        <p>{currency}{getCartAmount() + Math.floor(getCartAmount() * 0.02)}</p>
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={e => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Stripe Payment</option>
                        <option value="Square">Square Payment</option>
                    </select>

                    {showSquarePayment && (
                        <SquarePayment
                            orderData={orderData}
                            onSuccess={handleSquarePaymentSuccess}
                            onError={handleSquarePaymentError}
                            onCancel={handleSquarePaymentCancel}
                        />
                    )}
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Delivery Address</h3>
                    
                    {selectedAddress ? (
                        <div className="border border-gray-300 rounded p-3 mb-3">
                            <p className="font-medium">{selectedAddress.firstName} {selectedAddress.lastName}</p>
                            <p className="text-sm text-gray-600">{selectedAddress.street}</p>
                            <p className="text-sm text-gray-600">{selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipcode}</p>
                            <p className="text-sm text-gray-600">{selectedAddress.phone}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500 mb-3">No address selected</p>
                    )}

                    <button onClick={()=>setShowAddress(!showAddress)} className="text-primary text-sm underline mb-3">
                        {showAddress ? 'Hide addresses' : 'Choose different address'}
                    </button>

                    {showAddress && (
                        <div className="max-h-40 overflow-y-auto">
                            {addresses.map((address) => (
                                <div key={address._id} 
                                     onClick={()=>setSelectedAddress(address)}
                                     className={`border rounded p-3 mb-2 cursor-pointer transition-colors ${
                                         selectedAddress?._id === address._id ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
                                     }`}>
                                    <p className="font-medium">{address.firstName} {address.lastName}</p>
                                    <p className="text-sm text-gray-600">{address.street}</p>
                                    <p className="text-sm text-gray-600">{address.city}, {address.state}, {address.zipcode}</p>
                                    <p className="text-sm text-gray-600">{address.phone}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <button onClick={()=>navigate('/address')} className="w-full border border-gray-300 py-2 px-4 rounded mt-3 hover:bg-gray-50 transition-colors">
                        Add New Address
                    </button>
                </div>

                <button onClick={placeOrder} disabled={!selectedAddress} className={`w-full mt-6 py-3 px-4 rounded font-medium transition-colors ${
                    selectedAddress 
                        ? 'bg-primary text-white hover:bg-primary/90' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}>
                    {selectedAddress ? 'Place Order' : 'Select Address First'}
                </button>
            </div>
        </div>
    ) : (
        <div className="text-center pt-28 pb-16">
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <button onClick={()=>navigate('/collection')} className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors">
                Continue Shopping
            </button>
        </div>
    )
}

export default Cart;