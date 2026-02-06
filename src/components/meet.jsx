import React from 'react'
import { assets } from '../assets/assets'
import { Link } from "react-router-dom";

const producers = [
  {
    name: 'Maria Santos',
    location: 'Antigua, Guatemala',
    story: 'I learned basket weaving from my grandmother. Each piece connects our traditional techniques with modern sustainable practices, supporting 12 families in our village.',
    avatarColor: 'bg-green-300',
  },
  {
    name: 'Kenji Nakamura',
    location: 'Kamazawa, Japan',
    story: 'My ceramic work celebrates the wabi-sabi philosophy. Using locally sourced clay and traditional firing methods, each piece reflects the beauty of imperfection.',
    avatarColor: 'bg-red-300',
  },
]

const Producers = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-8">
      {/* Left: Text content */}
      <div className="max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-black">Meet Our <span className="text-green-800">Producers</span></h2>
        <p className="text-gray-600 text-sm">
          Every product tells a story. Every purchase empowers a community. Connect directly with the artisans behind the craftsmanship.
        </p>
        
        {producers.map((producer, index) => (
          <div key={index} className="border-l-4 border-green-700 pl-3 mt-4">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${producer.avatarColor}`}>
                {producer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-sm font-semibold">{producer.name}</h4>
                <p className="text-xs text-gray-500">{producer.location}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">{producer.story}</p>
          </div>
        ))}
        
        <Link to="/producerform">
        <button className="bg-black text-white text-xs px-4 py-2 rounded-full mt-4">
        Explore All Producers
        </button>
        </Link>
      </div>

      {/* Right: Image */}
      <div className="relative">
        <img src={assets.mission} alt="Team" className="w-full max-w-md rounded-2xl shadow-xl" />
        <div className="absolute bottom-4 right-4 bg-green-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          <span className="block font-bold text-lg">2,847</span>
          <span className="text-xs">Families Supported</span>
        </div>
      </div>
    </div>
  )
}

export default Producers
