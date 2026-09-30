import { useEffect, useState } from "react";

const API_URL = "https://pujabooking-server.onrender.com";

function Login() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Login check error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleSwitchAccount = async () => {
    try {
      setLoggingOut(true);

      await fetch(`${API_URL}/auth/logout`, {
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      window.location.href = "/login";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="text-5xl mb-4">🙏</div>
          <h2 className="text-xl font-semibold text-orange-900">
            Checking login...
          </h2>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center border border-orange-100">
          <div className="text-5xl mb-4">🙏</div>

          <h1 className="text-3xl font-bold text-orange-900">
            PujaBooking
          </h1>

          <p className="mt-2 text-gray-600">
            You are already logged in.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-orange-50 border border-orange-100">
            {user.profilePicture && (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-16 h-16 rounded-full mx-auto mb-3"
              />
            )}

            <h2 className="text-lg font-semibold text-gray-900">
              {user.name}
            </h2>

            <p className="text-sm text-gray-600 mt-1">
              {user.email}
            </p>

            <div className="mt-3 inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-semibold">
              Role: {user.role}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleSwitchAccount}
              disabled={loggingOut}
              className="w-full rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 transition"
            >
              {loggingOut
                ? "Logging out..."
                : "Logout & Switch Google Account"}
            </button>

            <button
              onClick={() => {
                if (user.role === "ADMIN") {
                  window.location.href = "/admin";
                } else if (user.role === "PANDIT") {
                  window.location.href = "/pandit";
                } else {
                  window.location.href = "/";
                }
              }}
              className="w-full rounded-xl border border-orange-300 text-orange-800 hover:bg-orange-50 font-semibold py-3 transition"
            >
              Continue as {user.role}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center border border-orange-100">
        <div className="text-6xl mb-4">🙏</div>

        <h1 className="text-3xl font-bold text-orange-900">
          PujaBooking
        </h1>

        <p className="mt-2 text-gray-600">
          Login to manage your Puja bookings
        </p>

        <button
          onClick={handleGoogleLogin}
          className="mt-8 w-full flex items-center justify-center gap-3 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 shadow-sm py-3 px-4 font-semibold text-gray-800 transition"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285F4"
              d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4z"
            />
            <path
              fill="#34A853"
              d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.55 0-4.71-1.72-5.49-4.04H3.27v2.52A9.75 9.75 0 0 0 12 21.75z"
            />
            <path
              fill="#FBBC05"
              d="M6.51 13.83A5.86 5.86 0 0 1 6.2 12c0-.64.11-1.26.31-1.83V7.65H3.27A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.02 4.35l3.24-2.52z"
            />
            <path
              fill="#EA4335"
              d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.1 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.73 5.4l3.24 2.52c.78-2.32 2.94-4.04 5.49-4.04z"
            />
          </svg>

          Continue with Google
        </button>

        <p className="mt-6 text-xs text-gray-500">
          Secure login powered by Google
        </p>
      </div>
    </div>
  );
}

export default Login;