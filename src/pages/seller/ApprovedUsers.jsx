import { useEffect, useState } from "react";
import axios from "axios";

export default function ApprovedUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/seller/approved-users", { withCredentials: true })
      .then((res) => setUsers(res.data.users));
  }, []);

  if (!users.length) return <p>No approved users</p>;

  return (
    <div className="space-y-4">
      {users.map((u) => (
        <div key={u._id} className="glass-card">
          <p><b>Name:</b> {u.name}</p>
          <p><b>Email:</b> {u.email}</p>
          <p><b>Contact:</b> {u.contactEmail} | {u.contactMobile}</p>
          <p><b>LinkedIn:</b> {u.linkedinUrl}</p>
          <p><b>Connections:</b> {u.linkedinConnections}</p>
          <p><b>Payment:</b> {u.paymentMethod} – {u.paymentIdentifier}</p>
        </div>
      ))}
    </div>
  );
}