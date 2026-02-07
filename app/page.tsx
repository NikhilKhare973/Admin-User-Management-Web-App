import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-10 max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to Galaxy System
        </h1>
        <p className="text-xl text-gray-600">
          This is the assignment submission for the Full Stack Developer Role.
          It includes User Management, Admin Dashboards, and Secure APIs.
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Link href="/dashboard">
            <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Go to Admin Dashboard
            </button>
          </Link>

          <Link href="/about">
            <button className="px-8 py-3 bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition">
              About Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
