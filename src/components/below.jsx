import React from 'react';
import { Leaf, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";


const MissionSection = () => {
  return (
    <div className="bg-black text-white py-20 mt-20 pt-20 px-4 text-center rounded-xl">
      <h1 className="text-3xl md:text-5xl font-extrabold font-sans">
        Commerce with <span className="text-green-400">Purpose</span>
      </h1>
      <p className="mt-4 text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
        One Planet Market exists to democratize global commerce while protecting our planet.
        We believe that every purchase decision is a vote for the kind of world we want to live in.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-16 max-w-5xl mx-auto">
        {/* Card 1 */}
        <div className="flex flex-col items-center">
          <div className="bg-green-400 p-4 rounded-full text-black text-2xl">
          <Globe className="text-black w-8 h-8" />
          </div>
          <h3 className="text-white font-bold mt-4">Global Impact</h3>
          <p className="text-sm text-gray-400 mt-2 max-w-xs">
            Supporting producers across 67 countries with fair wages and sustainable practices.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center">
          <div className="bg-green-400 p-4 rounded-full text-black text-2xl">
          <Leaf className="text-black w-8 h-8" />
          </div>
          <h3 className="text-white font-bold mt-4">Eco-Friendly</h3>
          <p className="text-sm text-gray-400 mt-2 max-w-xs">
            Carbon-neutral shipping and packaging made from recycled materials.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center">
          <div className="bg-green-400 p-4 rounded-full text-black text-2xl">
          <Users className="text-black w-8 h-8" />
          </div>
          <h3 className="text-white font-bold mt-4">Community First</h3>
          <p className="text-sm text-gray-400 mt-2 max-w-xs">
            85% of profits go directly to producers and community development programs.
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-10">
     <Link to="/mission">
      <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
      Learn More About Our Mission
      </button>
      </Link>
      </div>
    </div>
  );
};

export default MissionSection;