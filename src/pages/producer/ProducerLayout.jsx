import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { User, BookPlus, BookOpen, Truck, ClipboardList, Home } from 'lucide-react';

const ProducerLayout = () => {
  const { axios, setIsProducer } = useAppContext();
  const navigate = useNavigate();

  const sidebarLinks = [
    { name: "Dashboard", path: "/producer", icon: Home, end: true },
    { name: "Courses", path: "/producer/courses", icon: BookPlus },
    { name: "Enrolled Courses", path: "/producer/enrolled-courses", icon: BookOpen },
    { name: "My Vehicle", path: "/producer/my-vehicle", icon: Truck },
    { name: "Work Update", path: "/producer/work-update", icon: ClipboardList },
  ];

  const handleLogout = async () => {
    try {
      const { data } = await axios.get('/api/producer-auth/logout');
      if (data.success) {
        setIsProducer(false);
        toast.success('Logged out successfully');
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 md:px-8 py-3">
          <NavLink to='/' className="text-xl font-black tracking-tight">
            <span className="text-black">ONE PLANET</span>
            <span className="text-[#174e1f]">MARKET</span>
          </NavLink>
          <div className="flex items-center gap-5 text-gray-500">
            <p>Karamchari Panel</p>
            <button 
              onClick={handleLogout} 
              className='border rounded-full text-sm px-4 py-1 hover:bg-gray-50 transition-colors'
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-[calc(100vh-73px)] text-base border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink 
              to={item.path} 
              key={item.name} 
              end={item.end}
              className={({isActive}) => `flex items-center py-3 px-4 gap-3 
                ${isActive ? "border-r-4 md:border-r-[6px] bg-green-50 border-green-600 text-green-600"
                  : "hover:bg-gray-100/90 border-white text-gray-600"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <p className="md:block hidden">{item.name}</p>
            </NavLink>
          ))}
        </div> 

        {/* Main Content */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProducerLayout;
