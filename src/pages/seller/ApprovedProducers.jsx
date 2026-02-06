import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApprovedProducers = () => {
  const [approvedProducers, setApprovedProducers] = useState([]);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/producer/applications');
        const approved = res.data.filter(p => p.status === 'approved');
        setApprovedProducers(approved);
      } catch (err) {
        console.error('Failed to fetch approved producers:', err);
      }
    };
    fetchApproved();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Approved Producers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-green-100">
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
            {approvedProducers.map((p, i) => (
              <tr key={i} className="border-b hover:bg-green-50">
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
        {approvedProducers.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No approved producers found.</p>
        )}
      </div>
    </div>
  );
};

export default ApprovedProducers;
