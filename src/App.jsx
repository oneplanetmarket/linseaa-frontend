import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";

import { useAppContext } from "./context/AppContext";

/* ===== USER PAGES ===== */
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import Mission from "./pages/Mission";
import EcoJourney from "./pages/EcoJourney";
import AllBlogs from "./pages/AllBlogs";
import BlogPost from "./pages/BlogPost";
import Terms from "./pages/Terms";

/* ===== USER DASHBOARD ===== */
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Profile from "./pages/dashboard/Profile";
import LinkedInPage from "./pages/dashboard/LinkedInPage";
import Tasks from "./pages/dashboard/Tasks";
import Wallet from "./pages/dashboard/Wallet";
import Settings from "./pages/dashboard/Settings";

/* ===== SELLER ===== */
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import SellerDashboard from "./pages/seller/SellerDashboard";

import UserSignups from "./pages/seller/UserSignups";
import UserProfileVerifications from "./pages/seller/UserProfileVerifications";
import AdminApplications from "./pages/seller/AdminApplications";
import ApprovedUsers from "./pages/seller/ApprovedUsers";
import RejectedUsers from "./pages/seller/RejectedUsers";
import Payments from "./pages/seller/Payments";
import LinkedInSubmissions from "./pages/seller/LinkedInSubmissions";
import NewsletterSubscribers from "./pages/seller/NewsletterSubscribers";
import SendNewsletter from "./pages/seller/SendNewsletter";
import Withdrawals from "./pages/seller/Withdrawals";
import CreateTask from "./pages/seller/CreateTask";

/* ===== PRODUCER ===== */
import ProducerLogin from "./pages/producer/ProducerLogin";
import ProducerLayout from "./pages/producer/ProducerLayout";
import ProducerDashboard from "./pages/producer/ProducerDashboard";
import WasteManagementCourses from "./pages/producer/WasteManagementCourses";
import EnrolledCourses from "./pages/producer/EnrolledCourses";
import MyVehicle from "./pages/producer/MyVehicle";
import WorkerWasteUpdate from "./pages/producer/WorkerWasteUpdate";
import ProducerForm from "./pages/producerform";

const App = () => {
  const location = useLocation();

  const isSellerPath = location.pathname.startsWith("/seller");
  const isDashboardPath = location.pathname.startsWith("/dashboard");
  const isAuthPage = location.pathname === "/auth";
  const isHomePage = location.pathname === "/";

  const { showUserLogin, isSeller, isProducer } = useAppContext();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ===== NAVBAR ===== */}
      {!isSellerPath && !isAuthPage && !isDashboardPath && <Navbar />}

      {/* ===== USER LOGIN MODAL ===== */}
      {showUserLogin && <Login />}

      <Toaster />

      <div
        className={
          isSellerPath || isHomePage || isAuthPage || isDashboardPath
            ? ""
            : "px-6 md:px-16 lg:px-24 xl:px-32"
        }
      >
        <Routes>
          {/* ===== PUBLIC ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/loader" element={<Loading />} />

          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route
            path="/products/:category/:id"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/eco-journey" element={<EcoJourney />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/producerform" element={<ProducerForm />} />

          {/* ===== USER DASHBOARD ===== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="linkedin" element={<LinkedInPage />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* ===== SELLER PANEL ===== */}
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={<SellerDashboard />} />
            <Route path="user-signups" element={<UserSignups />} />
            <Route
              path="user-verifications"
              element={<UserProfileVerifications />}
            />
            <Route
              path="producer-applications"
              element={<AdminApplications />}
            />
            <Route path="approved-users" element={<ApprovedUsers />} />
            <Route path="rejected-users" element={<RejectedUsers />} />
            <Route path="payments" element={<Payments />} />
            <Route
              path="linkedin-submissions"
              element={<LinkedInSubmissions />}
            />
            <Route path="withdrawals" element={<Withdrawals />} />
            <Route path="tasks" element={<CreateTask />} />
            <Route
              path="newsletter-subscribers"
              element={<NewsletterSubscribers />}
            />
            <Route path="send-newsletter" element={<SendNewsletter />} />
          </Route>

          {/* ===== PRODUCER ===== */}
          <Route
            path="/producer"
            element={isProducer ? <ProducerLayout /> : <ProducerLogin />}
          >
            <Route index element={<ProducerDashboard />} />
            <Route path="courses" element={<WasteManagementCourses />} />
            <Route path="enrolled-courses" element={<EnrolledCourses />} />
            <Route path="my-vehicle" element={<MyVehicle />} />
            <Route path="work-update" element={<WorkerWasteUpdate />} />
          </Route>

          {/* ===== 🔥 CATCH ALL (FIXES 404) ===== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* ===== FOOTER ===== */}
      {!isSellerPath && !isAuthPage && !isDashboardPath && <Footer />}
    </div>
  );
};

export default App;