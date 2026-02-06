import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export default function CreateTask() {
  const { axios } = useAppContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const submit = async () => {
    if (!form.title || !form.description || !form.deadline) {
      return toast.error("All fields are required");
    }

    await axios.post("/api/seller/tasks/create", form, {
      withCredentials: true,
    });

    toast.success("Task created & assigned");
    setForm({ title: "", description: "", deadline: "" });
  };

  return (
    <div className="p-6 text-white max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Create Task</h1>

      <div className="space-y-4">
        <input
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10"
          placeholder="Task Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10"
          placeholder="Task Description"
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="date"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10"
          value={form.deadline}
          onChange={(e) =>
            setForm({ ...form, deadline: e.target.value })
          }
        />

        <button
          onClick={submit}
          className="w-full bg-emerald-500 text-black font-semibold py-3 rounded-lg"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}