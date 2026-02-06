import React from "react";
import { Link } from "react-router-dom";
import { assets, features } from '../assets/assets'

import { Globe, Leaf, Users, Heart, Award, TreePine } from "lucide-react";

const Mission = () => {
  return (
    <div className="mt-20 px-4 sm:px-12 md:px-24 lg:px-32 text-center text-gray-800">

      {/* Section: Our Mission */}
      <section className="mb-20">
        <h1 className="text-4xl font-extrabold">
          Our <span className="text-green-700">Mission</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          To transform urban waste into resources — by empowering local workers, modernizing collection, and creating measurable environmental & social impact.
          We build practical, people-first systems so every neighbourhood becomes cleaner, healthier and more circular.
        </p>
      </section>

      {/* Section: Core Values (adapted to waste management) */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold">Our Core Values</h2>
        <p className="text-gray-600 mt-2 mb-10">
          Every decision we make in the field and platform reflects these commitments.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            { icon: <Globe />, title: "Local Impact", text: "Deliver measurable cleanliness improvements in cities and towns by strengthening local collection networks and worker livelihoods." },
            { icon: <Leaf />, title: "Circularity First", text: "Prioritize segregation at source, recycling, composting and responsible disposal — turning waste into materials and energy." },
            { icon: <Users />, title: "Empower Workers", text: "Provide training, digital tools and fair compensation to waste workers so they lead the transition to sustainable systems." },
            { icon: <Heart />, title: "Health & Safety", text: "Protect workers and communities with safety protocols, PPE, and health-first collection standards." },
            { icon: <Award />, title: "Transparency & Quality", text: "Track collection metrics, material flows and outcomes publicly to build trust and continuous improvement." },
            { icon: <TreePine />, title: "Regenerative Future", text: "Support reforestation and community programs funded by recycling revenues to restore ecosystems and livelihoods." },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-green-800 text-white p-4 rounded-full mb-4">{item.icon}</div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-2 max-w-xs">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Impact Numbers (Waste Management focused) */}
      <section className="bg-black text-white py-16 rounded-xl mb-20">
        <h2 className="text-2xl font-bold">Our Impact by Numbers</h2>
        <p className="text-sm text-gray-400 mt-2">Concrete outcomes from our waste management programs</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-green-400 font-bold text-lg">
          <div>
            <p className="text-2xl">52,430</p>
            <p className="text-white text-sm font-normal">Households Reached</p>
          </div>
          <div>
            <p className="text-2xl">8,320</p>
            <p className="text-white text-sm font-normal">Tonnes Diverted</p>
          </div>
          <div>
            <p className="text-2xl">15,200</p>
            <p className="text-white text-sm font-normal">Collection Events</p>
          </div>
          <div>
            <p className="text-2xl">4,150</p>
            <p className="text-white text-sm font-normal">Workers Trained</p>
          </div>
          <div>
            <p className="text-2xl">1,240</p>
            <p className="text-white text-sm font-normal">Recycling Partners</p>
          </div>
          <div>
            <p className="text-2xl">2.1M</p>
            <p className="text-white text-sm font-normal">Kg Compost Produced</p>
          </div>
          <div>
            <p className="text-2xl">94%</p>
            <p className="text-white text-sm font-normal">Segregation Accuracy</p>
          </div>
          <div>
            <p className="text-2xl">100%</p>
            <p className="text-white text-sm font-normal">Worker Coverage in Pilot Areas</p>
          </div>
        </div>
      </section>

      {/* Section: Our Story (focused on waste management) */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-20">
        <div className="text-left max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            We started with a simple problem: urban waste systems were out of sync with people’s daily lives.
            Streets and public spaces were overflowing while recyclable and compostable material went to landfill.
            Our approach: design local collection systems that work for workers, residents and municipal partners.
          </p>
          <p className="text-gray-600 mb-4">
            Since launching our waste program, we've partnered with municipalities, social enterprises and informal worker groups to professionalize collection, introduce data-driven routes, and scale source-segregation.
          </p>
          <p className="text-gray-600 mb-4">
            We believe the transition to circular cities depends on three things: people, tools, and incentives. We provide all three — training for workers, digital tools for operations and transparent incentive flows that reward proper segregation and recycling.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-full mt-2 hover:bg-gray-800">Meet Our Team</button>
        </div>
        <img src={assets.mission} alt="Team working in waste management" className="w-full max-w-md rounded-2xl" />
      </section>

      {/* Section: Sustainability Commitments (waste focused) */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">Our Waste Management Commitments</h2>
        <p className="text-gray-600 mb-10">Concrete, measurable actions driving city-level change</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h4 className="font-bold">Segregation at Source</h4>
            <p className="text-gray-600 mt-1">We work with communities to establish dry/wet separation at household level, supported by educational campaigns and incentives for compliance.</p>
            <p className="text-green-600 mt-2 font-medium">Target: 95% household segregation in pilot zones</p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h4 className="font-bold">Decentralized Processing</h4>
            <p className="text-gray-600 mt-1">Small-scale composting and material recovery facilities close to collection points reduce transport emissions and increase material value.</p>
            <p className="text-green-600 mt-2 font-medium">Current: 24 active decentralised units</p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h4 className="font-bold">Worker Welfare & Safety</h4>
            <p className="text-gray-600 mt-1">Every worker is trained, registered and supplied with PPE. We track health & safety metrics and offer emergency support.</p>
            <p className="text-green-600 mt-2 font-medium">Commitment: 100% PPE coverage</p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h4 className="font-bold">Circular Revenue Sharing</h4>
            <p className="text-gray-600 mt-1">Recycling revenues are shared with workers and community projects — creating transparent incentives for recovery and proper disposal.</p>
            <p className="text-green-600 mt-2 font-medium">Model: revenue share + performance bonus</p>
          </div>
        </div>
      </section>

      {/* Section: Call to Action */}
      <section className="text-center mb-20">
        <h2 className="text-2xl font-bold">
          Join the <span className="text-green-700">Waste Management</span> movement
        </h2>
        <p className="text-gray-600 mt-2 mb-6">
          Help us scale cleaner, safer, and more circular neighbourhoods — one collection at a time.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/products">
            <button className="bg-black text-white px-6 py-2 rounded-full">
              Explore Sustainable Products
            </button>
          </Link>
          <Link to="/producerform">
            <button className="border border-black text-black px-6 py-2 rounded-full">
              Partner With Us (Waste Partners)
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Mission;
