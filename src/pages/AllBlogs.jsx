// AllBlogs.jsx
import React, { useCallback, useRef, useState } from "react";
import { Camera, MapPin, Send } from "lucide-react";

/**
 * AllBlogs.jsx
 * - Previously SubmitReport.jsx — renamed to AllBlogs per request
 * - Tailwind-based UI that matches the provided screenshot
 * - Features: drag/drop + file picker, location (manual or GPS), description, submit
 * - Props:
 *    onSubmit?: async function({imageFile, location, description}) => { ... }
 *
 * Usage:
 *   <AllBlogs onSubmit={async (payload) => { await api.post('/reports', payload) }} />
 */

const AllBlogs = ({ onSubmit }) => {
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFiles = useCallback((files) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
  }, []);

  const onFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const captureLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;
        setLocation(coords);
      },
      (err) => {
        console.error(err);
        alert("Unable to retrieve location. Please allow location access or enter manually.");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && description.trim() === "" && location.trim() === "") {
      alert("Please provide a photo, location or description.");
      return;
    }

    setLoading(true);
    try {
      const payload = { imageFile: file, location, description };

      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // Default demo behavior (replace with your API call)
        const form = new FormData();
        if (file) form.append("photo", file);
        form.append("location", location);
        form.append("description", description);

        console.log("Submit payload (demo):", { location, description, file });
        await new Promise((r) => setTimeout(r, 900));
        alert("Report submitted (demo). Check console for payload.");
      }

      // Clear UI
      setFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl("");
      }
      setLocation("");
      setDescription("");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8">
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Submit New Report</h3>

        {/* Upload area */}
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") openFilePicker();
          }}
          className={`w-full rounded-lg border-dashed border-2 ${dragOver ? "border-green-400 bg-green-50/40" : "border-gray-300 bg-white"} p-6 flex flex-col items-center justify-center cursor-pointer`}
          role="button"
          aria-label="Upload photo"
          onClick={openFilePicker}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="max-h-44 object-contain rounded-md" />
          ) : (
            <>
              <div className="text-gray-400 mb-2">
                <div className="p-3 rounded-full bg-gray-100 inline-block">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <div className="text-sm text-gray-600">Upload Photo</div>
              <div className="text-sm text-blue-600 underline mt-2">Browse Files</div>
              <div className="text-xs text-gray-400 mt-2">or drag & drop here</div>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
            aria-hidden
          />
        </div>

        {/* Location field */}
        <div className="mt-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="flex gap-2">
            <input
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            <button
              type="button"
              onClick={captureLocation}
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              aria-label="Capture current location"
            >
              <MapPin className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the waste issue..."
            rows={4}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold rounded-md ${loading ? "bg-orange-300" : "bg-orange-600 hover:bg-orange-700"}`}
          >
            <Send className="w-4 h-4" />
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AllBlogs;
