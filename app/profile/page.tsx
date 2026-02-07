"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // 1. Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login"); // If not logged in, kick them out!
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 2. Handle Password Change
  async function handleChangePassword(e: any) {
    e.preventDefault(); // It stops the page from reloading (e.preventDefault()).
    setMessage("");

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, password: newPassword }),
    });

    if (res.ok) {
      setMessage("✅ Password changed successfully!");
      setNewPassword("");
    } else {
      setMessage("❌ Error changing password");
    }
  }

  // 3. Logout Function --- it deletes the saved user data from your browser (localStorage.removeItem).
  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  if (!user) return <div className="p-10">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            👤
          </div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-gray-500">{user.email}</p>
          <span className="inline-block bg-gray-200 rounded px-2 py-1 text-xs mt-2">
            Role: {user.role}
          </span>
        </div>

        <hr className="my-6" />

        {/* Change Password Section */}
        <h2 className="font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <input
            type="text"
            placeholder="New Password"
            className="w-full border p-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Update Password
          </button>
        </form>

        {/* Success/Error Message */}
        {message && (
          <p className="mt-4 text-center text-sm font-medium">{message}</p>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 border border-red-500 text-red-500 py-2 rounded hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
