"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  // if user try to access dashboard without logging in or if they are not admin, kick them out!
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login"); // Not logged in? Go to login.
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.role === "USER") {
      alert("Access Denied: You are not an Admin!");
      router.push("/"); // Normal user? Send them back to Home.
    }
  }, []);

  async function fetchUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    // If we are editing, send a PUT request. If creating, send POST.
    const method = isEditing ? "PUT" : "POST";

    await fetch("/api/users", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ id: "", email: "", password: "", role: "USER" });
    setIsEditing(false);
    fetchUsers();
  }

  // When "Edit" is clicked, fill the form with that user's data
  function handleEdit(user: any) {
    setForm({
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure?")) return;
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  }

  // Filter users based on search term (by email) - this is a bonus feature to make it easier to find users in a long list!
  const filteredUsers = users.filter((user: any) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-10 font-sans max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Management Dashboard</h1>

      {/* Form Card */}
      <div className="mb-10 border border-gray-200 p-6 rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit User" : "Add New User"}
        </h2>

        <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap">
          <input
            className="border p-2 rounded flex-1"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded flex-1"
            type="text"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <select
            className="border p-2 rounded"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="USER">USER</option>
            <option value="MANAGER">MANAGER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button
            type="submit"
            className={`px-6 py-2 rounded text-white font-medium ${isEditing ? "bg-blue-600 hover:bg-blue-700" : "bg-black hover:bg-gray-800"}`}
          >
            {isEditing ? "Update User" : "Create User"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setForm({ id: "", email: "", password: "", role: "USER" });
              }}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Search Bar -  */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users by email..."
          className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User List */}
      <h2 className="text-xl font-semibold mb-4">Current Users</h2>
      <ul className="space-y-3">
        {filteredUsers.map((user: any) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded border hover:bg-gray-100 transition"
          >
            <div>
              <span className="font-bold">{user.email}</span>
              <span className="mx-2 text-sm px-2 py-1 bg-gray-200 rounded">
                {user.role}
              </span>
              <span
                className={`text-sm ${user.isVerified ? "text-green-600" : "text-red-600"}`}
              >
                {user.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>

            <div className="flex gap-2">
              {/* EDIT BUTTON */}
              <button
                onClick={() => handleEdit(user)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
              >
                Edit
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
