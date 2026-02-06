import { useEffect, useState } from "react";
import axios from "axios";

export default function RejectedUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/seller/rejected-users", { withCredentials: true })
      .then((res) => setUsers(res.data.users));
  }, []);

  return users.map((u) => (
    <div key={u._id} className="glass-card">
      <p><b>Name:</b> {u.name}</p>
      <p><b>Email:</b> {u.email}</p>
      <p className="text-red-400">
        <b>Reason:</b> {u.rejectionReason}
      </p>
    </div>
  ));
}