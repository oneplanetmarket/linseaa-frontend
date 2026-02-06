import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { MapPin, Droplets, Trash2 } from "lucide-react";

const WorkerWasteUpdate = () => {
  const { axios } = useAppContext();
  const [dryWaste, setDryWaste] = useState("");
  const [wetWaste, setWetWaste] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = `${latitude}, ${longitude}`;
        setLocation(coords);
        toast.success("Location captured!");
      },
      (err) => {
        console.error("Location error:", err);
        toast.error("Failed to get location.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dryWaste || !wetWaste || !location) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/worker/waste-update", {
        dryWaste,
        wetWaste,
        location,
      });

      if (data.success) {
        toast.success("Waste data submitted successfully!");
        setDryWaste("");
        setWetWaste("");
        setLocation("");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting waste update:", error);
      toast.error("Error submitting waste data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Update Waste Collection
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-6"
      >
        {/* Dry Waste */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Dry Waste Collected (kg)
          </label>
          <div className="flex items-center gap-3">
            <Trash2 className="text-blue-600" />
            <input
              type="number"
              value={dryWaste}
              onChange={(e) => setDryWaste(e.target.value)}
              placeholder="Enter dry waste in kg"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>

        {/* Wet Waste */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Wet Waste Collected (kg)
          </label>
          <div className="flex items-center gap-3">
            <Droplets className="text-green-600" />
            <input
              type="number"
              value={wetWaste}
              onChange={(e) => setWetWaste(e.target.value)}
              placeholder="Enter wet waste in kg"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Location
          </label>
          <div className="flex items-center gap-3">
            <MapPin className="text-red-600" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter or capture location"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              onClick={handleGetLocation}
              className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Use GPS
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Update"}
        </button>
      </form>
    </div>
  );
};

export default WorkerWasteUpdate;
