export default function UserSignups() {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">User Signups</h1>
  
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-white/60 border-b border-white/10">
              <tr>
                <th className="text-left py-3">Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-3">Nishan</td>
                <td>nishan2004@gmail.com</td>
                <td className="text-yellow-400">New</td>
                <td>Today</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  