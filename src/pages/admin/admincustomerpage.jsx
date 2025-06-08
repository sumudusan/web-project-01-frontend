import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export function AdminCustomerPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/users/all", {
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
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      const message = err.response?.data?.message || "Error deleting user";
      toast.error(message);
    }
  };

  if (loading) return <p className="p-4 text-text">Loading users...</p>;

  return (
    <div className="flex flex-col items-center w-full h-full p-4 bg-background text-text">
      <h2 className="mb-4 text-xl font-bold text-heading">Customer List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full max-w-4xl border border-accent rounded-lg shadow-sm bg-surface text-text">
          <thead className="bg-surface">
            <tr>
              <th className="p-2 text-left border-b border-accent">Name</th>
              <th className="p-2 text-left border-b border-accent">Email</th>
              <th className="p-2 text-left border-b border-accent">Type</th>
              <th className="p-2 text-left border-b border-accent">Blocked</th>
              <th className="p-2 text-left border-b border-accent">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="p-2 border-b border-accent">
                  {user.firstName} {user.lastName}
                </td>
                <td className="p-2 border-b border-accent">{user.email}</td>
                <td className="p-2 border-b border-accent capitalize">{user.type}</td>
                <td className="p-2 border-b border-accent">
                  {user.isBlocked ? "Yes" : "No"}
                </td>
                <td className="p-2 border-b border-accent">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 hover:scale-105 transition-transform"
                  >
                    <FaTrash className="text-xs" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
