import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RejectedProducers = () => {
  const [rejectedProducers, setRejectedProducers] = useState([]);

  useEffect(() => {
    const fetchRejected = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/producer/applications');
        const rejected = res.data.filter(p => p.status === 'rejected');
        setRejectedProducers(rejected);
      } catch (err) {
        console.error('Failed to fetch rejected producers:', err);
      }
    };
    fetchRejected();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-700">Rejected Producers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-red-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Country</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Story</th>
              <th className="p-2 border">Profile URL</th>
              <th className="p-2 border">Cover URL</th>
              <th className="p-2 border">Years</th>
              <th className="p-2 border">Specialties</th>
            </tr>
          </thead>
          <tbody>
            {rejectedProducers.map((p, i) => (
              <tr key={i} className="border-b hover:bg-red-50">
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.location}</td>
                <td className="p-2 border">{p.country}</td>
                <td className="p-2 border">{p.email}</td>
                <td className="p-2 border">{p.mobileNumber}</td>
                <td className="p-2 border text-xs">{p.story}</td>
                <td className="p-2 border text-blue-600 underline break-all">{p.profileImageUrl}</td>
                <td className="p-2 border text-blue-600 underline break-all">{p.coverImageUrl}</td>
                <td className="p-2 border">{p.yearsInBusiness}</td>
                <td className="p-2 border">{p.specialties.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rejectedProducers.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No rejected producers found.</p>
        )}
      </div>
    </div>
  );
};

export default RejectedProducers;
