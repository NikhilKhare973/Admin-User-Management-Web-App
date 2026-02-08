"use client";
// Must use this because we are checking the browser URL and localStorage, which only exist on the client side. This tells Next.js to render this component on the client instead of the server.

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "./globals.css";

// The Next.js Way (layout.tsx + page.tsx) to create a NAVBAR that appears on ALL PAGES! <--- VERY IMPORTANT!

// This RootLayout component wraps around all the pages in the app. It contains the navbar and also checks if the user is logged in by looking at localStorage.
// Depending on the login status, it conditionally renders different links in the navbar (like Dashboard, My Profile, Logout for logged-in users and Login for guests).  The handleLogout function clears the user from localStorage and redirects to the login page.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check login status whenever the page changes
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="p-4 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm">
          <div className="font-bold text-xl text-blue-600">
            Galaxy Assignment
          </div>
          <div className="space-x-6 text-sm font-medium flex items-center">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>

            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="hover:text-blue-600 font-bold text-blue-500"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
        {/* all the pages is parent of ALL pages  --- > YOUR PAGE CONTENT GOES HERE AUTOMATICALLY */}
        {children}
      </body>
    </html>
  );
}
