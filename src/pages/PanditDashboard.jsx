import { useEffect, useState } from "react";

const API_URL = "https://pujabooking-server.onrender.com";

function PanditDashboard() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPanditDashboard();
  }, []);

  const loadPanditDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [userResponse, bookingsResponse] =
        await Promise.all([
          fetch(`${API_URL}/auth/me`, {
            credentials: "include",
          }),

          fetch(`${API_URL}/api/pandit/bookings`, {
            credentials: "include",
          }),
        ]);

      const userData = await userResponse.json();
      const bookingsData =
        await bookingsResponse.json();

      if (!userResponse.ok) {
        throw new Error(
          userData.message ||
            "Unable to verify login."
        );
      }

      if (!bookingsResponse.ok) {
        throw new Error(
          bookingsData.message ||
            "Unable to load Pandit bookings."
        );
      }

      if (userData.user?.role !== "PANDIT") {
        throw new Error(
          "Pandit access required."
        );
      }

      setUser(userData.user);

      setBookings(
        Array.isArray(bookingsData)
          ? bookingsData
          : bookingsData.bookings || []
      );
    } catch (error) {
      console.error(
        "Pandit dashboard error:",
        error
      );

      setError(
        error.message ||
          "Unable to load Pandit dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (bookingId) => {
    const confirmed = window.confirm(
      "Mark this Puja booking as completed?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingId(bookingId);

      const response = await fetch(
        `${API_URL}/api/pandit/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: "COMPLETED",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update booking."
        );
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? data.booking
            : booking
        )
      );
    } catch (error) {
      console.error(
        "Mark completed error:",
        error
      );

      alert(
        error.message ||
          "Unable to complete booking."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusClass = (status) => {
    if (status === "ASSIGNED") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "COMPLETED") {
      return "bg-green-100 text-green-700";
    }

    if (status === "CANCELLED") {
      return "bg-red-100 text-red-700";
    }

    if (status === "CONFIRMED") {
      return "bg-purple-100 text-purple-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parts = date.split("-");

    if (parts.length !== 3) {
      return date;
    }

    const [year, month, day] = parts;

    return `${day}-${month}-${year}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="text-5xl">
            🙏
          </div>

          <p className="mt-4 font-semibold text-gray-700">
            Loading Pandit dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-5 rounded-2xl bg-white p-6 shadow-lg sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Pandit Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold text-orange-800">
              🙏 Namaste,{" "}
              {user?.name || "Pandit Ji"}
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your assigned Puja bookings.
            </p>

            {user?.email && (
              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>
            )}
          </div>

          <button
            onClick={loadPanditDashboard}
            className="rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Refresh
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
            <p className="font-semibold">
              {error}
            </p>

            <button
              onClick={loadPanditDashboard}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!error && (
          <>
            {/* SUMMARY */}
            <div className="mt-8 grid gap-5 sm:grid-cols-3">

              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <p className="text-sm font-semibold text-gray-500">
                  Total Assigned
                </p>

                <p className="mt-2 text-3xl font-bold text-orange-600">
                  {
                    bookings.filter(
                      (booking) =>
                        booking.bookingStatus !==
                        "CANCELLED"
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <p className="text-sm font-semibold text-gray-500">
                  Pending Puja
                </p>

                <p className="mt-2 text-3xl font-bold text-blue-600">
                  {
                    bookings.filter(
                      (booking) =>
                        booking.bookingStatus ===
                        "ASSIGNED"
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <p className="text-sm font-semibold text-gray-500">
                  Completed
                </p>

                <p className="mt-2 text-3xl font-bold text-green-600">
                  {
                    bookings.filter(
                      (booking) =>
                        booking.bookingStatus ===
                        "COMPLETED"
                    ).length
                  }
                </p>
              </div>

            </div>

            {/* BOOKINGS */}
            <div className="mt-8">

              {bookings.length === 0 ? (
                <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
                  <div className="text-5xl">
                    📋
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-gray-800">
                    No Assigned Bookings
                  </h2>

                  <p className="mt-2 text-gray-600">
                    You currently have no Puja bookings assigned to you.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">

                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="rounded-2xl bg-white p-6 shadow-lg"
                    >

                      {/* BOOKING HEADER */}
                      <div className="flex flex-col justify-between gap-4 border-b pb-5 lg:flex-row lg:items-center">

                        <div>
                          <h2 className="text-2xl font-bold text-orange-800">
                            {booking.pujaName}
                          </h2>

                          <p className="mt-1 break-all text-xs text-gray-500">
                            Booking ID:{" "}
                            {booking._id}
                          </p>
                        </div>

                        <span
                          className={`w-fit rounded-full px-4 py-2 text-xs font-bold ${getStatusClass(
                            booking.bookingStatus
                          )}`}
                        >
                          {booking.bookingStatus}
                        </span>
                      </div>

                      {/* DETAILS */}
                      <div className="mt-6 grid gap-6 lg:grid-cols-3">

                        {/* PUJA DETAILS */}
                        <div className="rounded-xl bg-orange-50 p-5">
                          <h3 className="font-bold text-gray-800">
                            Puja Details
                          </h3>

                          <div className="mt-4 space-y-3 text-sm">

                            <p>
                              <span className="font-semibold">
                                Puja:
                              </span>{" "}
                              {booking.pujaName}
                            </p>

                            <p>
                              <span className="font-semibold">
                                Date:
                              </span>{" "}
                              {formatDate(
                                booking.date
                              )}
                            </p>

                            <p>
                              <span className="font-semibold">
                                Time:
                              </span>{" "}
                              {booking.time}
                            </p>

                            <p>
                              <span className="font-semibold">
                                Amount:
                              </span>{" "}
                              <span className="font-bold text-orange-600">
                                ₹{booking.price}
                              </span>
                            </p>

                          </div>
                        </div>

                        {/* YAJMAN DETAILS */}
                        <div className="rounded-xl bg-gray-50 p-5">
                          <h3 className="font-bold text-gray-800">
                            Yajman Details
                          </h3>

                          <div className="mt-4 space-y-3 text-sm">

                            <p>
                              <span className="font-semibold">
                                Name:
                              </span>{" "}
                              {booking.yajman?.name ||
                                "-"}
                            </p>

                            <p>
                              <span className="font-semibold">
                                Mobile:
                              </span>{" "}
                              {booking.yajman?.mobile ||
                                "-"}
                            </p>

                            <p className="break-all">
                              <span className="font-semibold">
                                Email:
                              </span>{" "}
                              {booking.yajman?.email ||
                                "-"}
                            </p>

                            <p>
                              <span className="font-semibold">
                                City:
                              </span>{" "}
                              {booking.yajman?.city ||
                                "-"}
                            </p>

                            <p>
                              <span className="font-semibold">
                                Location:
                              </span>{" "}
                              {booking.yajman
                                ?.locationType ===
                              "online"
                                ? "Online Puja"
                                : "At Yajman's Home"}
                            </p>

                          </div>
                        </div>

                        {/* PAYMENT */}
                        <div className="rounded-xl bg-gray-50 p-5">
                          <h3 className="font-bold text-gray-800">
                            Payment Details
                          </h3>

                          <div className="mt-4 space-y-3 text-sm">

                            <p className="break-all">
                              <span className="font-semibold">
                                Payment:
                              </span>{" "}
                              {booking.paymentStatus ||
                                "-"}
                            </p>

                            <p className="break-all">
                              <span className="font-semibold">
                                UTR:
                              </span>{" "}
                              {booking.utr ||
                                "Not available"}
                            </p>

                            <p>
                              <span className="font-semibold">
                                Booking:
                              </span>{" "}
                              {booking.bookingStatus ||
                                "-"}
                            </p>

                          </div>
                        </div>

                      </div>

                      {/* HOME ADDRESS */}
                      {booking.yajman
                        ?.locationType ===
                        "home" &&
                        booking.yajman
                          ?.address && (
                          <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-5">
                            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                              Puja Address
                            </p>

                            <p className="mt-2 text-gray-800">
                              {
                                booking.yajman
                                  .address
                              }
                            </p>

                            {booking.yajman
                              ?.city && (
                              <p className="mt-1 text-sm text-gray-600">
                                {
                                  booking.yajman
                                    .city
                                }
                              </p>
                            )}
                          </div>
                        )}

                      {/* ACTION */}
                      {booking.bookingStatus ===
                        "ASSIGNED" && (
                        <div className="mt-6 flex justify-end border-t pt-5">

                          <button
                            disabled={
                              updatingId ===
                              booking._id
                            }
                            onClick={() =>
                              markCompleted(
                                booking._id
                              )
                            }
                            className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                          >
                            {updatingId ===
                            booking._id
                              ? "Completing..."
                              : "Mark Puja Completed"}
                          </button>

                        </div>
                      )}

                      {booking.bookingStatus ===
                        "COMPLETED" && (
                        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
                          <p className="font-semibold text-green-700">
                            ✅ Puja completed successfully
                          </p>
                        </div>
                      )}

                      {booking.bookingStatus ===
                        "CANCELLED" && (
                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                          <p className="font-semibold text-red-700">
                            ❌ This booking has been cancelled
                          </p>
                        </div>
                      )}

                    </div>
                  ))}

                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default PanditDashboard;