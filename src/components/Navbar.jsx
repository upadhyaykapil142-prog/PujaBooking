import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/me", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to check login:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleLogout = () => {
    window.location.href = "http://localhost:5000/auth/logout";
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      {/* Logo */}
      <a href="/" className="text-2xl font-bold text-orange-800">
        🛕 PujaBooking
      </a>

      {/* Navigation */}
      <div className="flex items-center gap-6">
        <a
          href="/"
          className="text-gray-700 hover:text-orange-600"
        >
          Home
        </a>

        <a
          href="/pujas"
          className="text-gray-700 hover:text-orange-600"
        >
          Pujas
        </a>

        {!loading && !user && (
          <a
            href="/login"
            className="rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-700"
          >
            Login
          </a>
        )}

        {!loading && user && (
          <div className="flex items-center gap-3">
            {user.profilePicture && (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="h-9 w-9 rounded-full"
              />
            )}

            <span className="font-semibold text-gray-800">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-orange-600 px-4 py-2 font-semibold text-orange-600 hover:bg-orange-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;