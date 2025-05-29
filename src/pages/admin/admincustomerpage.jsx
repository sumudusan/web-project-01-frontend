import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export function AdminCustomerPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.list) {
          setUsers(res.data.list);
        } else {
          toast.error(res.data.message || "Failed to fetch users");
        }
        setLoading(false);
      })
      .catch((err) => {
        const message = err.response?.data?.message || "Error fetching users";
        toast.error(message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading customers...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer List</h2>
      {users.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Blocked</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.isBlocked ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
