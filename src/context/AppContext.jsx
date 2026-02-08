import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

/* ===================== AXIOS SETUP ===================== */

// 🔥 VERY IMPORTANT: backend runs on 5000
axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.PROD ? "" : "http://localhost:5000");

/* ===================== CONTEXT ===================== */

export const AppContext = createContext();

/* ===================== PROVIDER ===================== */

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = "INR";

  /* ===================== STATE ===================== */

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [isProducer, setIsProducer] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  /* ===================== AUTH ===================== */

  const fetchUser = async () => {
    try {
      setLoadingUser(true);

      // ✅ MATCHES backend: /api/user/is-auth
      const { data } = await axios.get("/api/user/is-auth");

      if (data?.success && data.user) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("fetchUser error:", error);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const fetchSeller = async () => {
    try {
      // ✅ MATCHES backend
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(!!data.success);
    } catch {
      setIsSeller(false);
    }
  };

  /* ===================== PRODUCTS ===================== */

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  /* ===================== CART ===================== */

  const addToCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    if (quantity <= 0) delete cartData[itemId];
    else cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    delete cartData[itemId];
    setCartItems(cartData);
    toast.success("Removed from cart");
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const item = products.find((p) => p._id === id);
      if (item) total += item.offerPrice * cartItems[id];
    }
    return Math.round(total * 100) / 100;
  };

  /* ===================== LOGOUT ===================== */

  const logout = async () => {
    try {
      await axios.post("/api/user/logout");
    } catch {}

    setUser(null);
    setIsSeller(false);
    setIsProducer(false);
    setCartItems({});
    setShowUserLogin(false);

    toast.success("Logged out successfully");
    navigate("/auth");
  };

  /* ===================== EFFECTS ===================== */

  useEffect(() => {
    fetchUser();     // 🔥 REQUIRED
    fetchSeller();
    fetchProducts();
  }, []);

  useEffect(() => {
    const syncCart = async () => {
      try {
        await axios.post("/api/cart/update", { cartItems });
      } catch {
        toast.error("Cart sync failed");
      }
    };

    if (user) syncCart();
  }, [cartItems]);

  /* ===================== CONTEXT VALUE ===================== */

  const value = {
    // global
    axios,
    navigate,
    currency,
    loadingUser,

    // user
    user,
    setUser,
    refetchUser: fetchUser,
    profileStatus: user?.status || "pending",

    // roles
    isSeller,
    setIsSeller,
    isProducer,
    setIsProducer,

    // ui
    showUserLogin,
    setShowUserLogin,
    searchQuery,
    setSearchQuery,

    // products
    products,
    fetchProducts,

    // cart
    cartItems,
    setCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartAmount,
    getCartCount,

    // auth
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

/* ===================== HOOK ===================== */

export const useAppContext = () => useContext(AppContext);