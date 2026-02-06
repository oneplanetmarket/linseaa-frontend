import React, { useState } from "react";

const MyVehicle = () => {
  const [vehicle, setVehicle] = useState({
    vehicleNumber: "",
    driverName: "",
    capacity: "",
    status: "active",
  });

  const handleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vehicle Details Submitted:", vehicle);
    alert("Vehicle details updated successfully!");
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">My Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium">Vehicle Number</label>
          <input
            type="text"
            name="vehicleNumber"
            value={vehicle.vehicleNumber}
            onChange={handleChange}
            placeholder="Enter Vehicle Number"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Driver Name</label>
          <input
            type="text"
            name="driverName"
            value={vehicle.driverName}
            onChange={handleChange}
            placeholder="Enter Driver Name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Capacity (in Kg)</label>
          <input
            type="number"
            name="capacity"
            value={vehicle.capacity}
            onChange={handleChange}
            placeholder="Enter Capacity"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Status</label>
          <select
            name="status"
            value={vehicle.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
          >
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Save Vehicle Details
        </button>
      </form>
    </div>
  );
};

export default MyVehicle;
