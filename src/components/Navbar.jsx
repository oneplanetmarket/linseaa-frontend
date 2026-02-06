import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { assets } from '../assets/assets'

const Navbar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const {
    user,
    setUser,
    navigate,
    axios
  } = useAppContext()

  // 🔒 KEEP DROPDOWN LOGIC (UNCHANGED)
  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout')
      if (data.success) {
        toast.success(data.message)
        setUser(null)
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#020617] via-[#020617] to-[#022c22] border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT: LOGO */}
        <button
          onClick={() => navigate(user ? '/dashboard' : '/')}
          className="flex items-center"
        >
          <img
            src={assets.logo}
            alt="LinkedRent"
            className="h-8 w-auto object-contain"
          />
        </button>

        {/* RIGHT: AUTH ACTIONS */}
        {!user ? (
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/auth')}
              className="text-gray-300 hover:text-white transition"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate('/auth')}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-black rounded-lg font-medium transition"
            >
              Get Started →
            </button>
          </div>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(prev => !prev)}
              className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center font-semibold"
            >
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>

                <button
                  onClick={() => {
                    navigate('/dashboard')
                    setProfileDropdownOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    logout()
                    setProfileDropdownOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar
