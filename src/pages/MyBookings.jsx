import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://pujabooking-server.onrender.com";

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/my-bookings`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch bookings."
        );
      }

      setBookings(
        Array.isArray(data)
          ? data
          : data.bookings || []
      );
    } catch (error) {
      console.error(
        "MY BOOKINGS ERROR:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while loading your bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingId(bookingId);
      setError("");

      const response = await fetch(
        `${API_URL}/api/my-bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to cancel booking."
        );
      }

      if (data.booking) {
        setBookings((previousBookings) =>
          previousBookings.map((booking) =>
            booking._id === bookingId
              ? data.booking
              : booking
          )
        );
      } else {
        setBookings((previousBookings) =>
          previousBookings.map((booking) =>
            booking._id === bookingId
              ? {
                  ...booking,
                  bookingStatus:
                    "CANCELLED",
                }
              : booking
          )
        );
      }
    } catch (error) {
      console.error(
        "CANCEL BOOKING ERROR:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while cancelling the booking."
      );
    } finally {
      setCancellingId(null);
    }
  };

  const getPaymentStatusClass = (status) => {
    if (status === "PAID") {
      return "bg-green-100 text-green-700";
    }

    if (status === "FAILED") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  const getBookingStatusClass = (status) => {
    if (status === "CONFIRMED") {
      return "bg-green-100 text-green-700";
    }

    if (status === "ASSIGNED") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "COMPLETED") {
      return "bg-purple-100 text-purple-700";
    }

    if (status === "CANCELLED") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    // Handles booking date:
    // YYYY-MM-DD
    if (
      typeof date === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(date)
    ) {
      const [year, month, day] =
        date.split("-");

      return `${day}-${month}-${year}`;
    }

    const formattedDate = new Date(date);

    if (
      Number.isNaN(
        formattedDate.getTime()
      )
    ) {
      return date;
    }

    return formattedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50">

        <nav className="flex items-center justify-between border-b bg-white px-6 py-4">
          <Link
            to="/"
            className="text-2xl font-bold text-orange-800"
          >
            🛕 PujaBooking
          </Link>

          <Link
            to="/pujas"
            className="font-semibold text-orange-600 hover:underline"
          >
            Explore Pujas
          </Link>
        </nav>

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">

            <div className="text-5xl">
              🛕
            </div>

            <p className="mt-4 text-lg font-semibold text-gray-700">
              Loading your bookings...
            </p>

          </div>
        </main>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">

      {/* NAVBAR */}

      <nav className="flex items-center justify-between border-b bg-white px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-bold text-orange-800"
        >
          🛕 PujaBooking
        </Link>

        <div className="flex items-center gap-5">

          <Link
            to="/"
            className="text-gray-700 hover:text-orange-600"
          >
            Home
          </Link>

          <Link
            to="/pujas"
            className="text-gray-700 hover:text-orange-600"
          >
            Pujas
          </Link>

        </div>

      </nav>

      {/* MAIN */}

      <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-orange-800">
            My Bookings
          </h1>

          <p className="mt-2 text-gray-600">
            View and manage your Puja bookings.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

            <p className="font-semibold">
              {error}
            </p>

            <button
              onClick={fetchMyBookings}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>

          </div>
        )}

        {/* NO BOOKINGS */}

        {!error &&
          bookings.length === 0 && (
            <div className="rounded-2xl bg-white p-10 text-center shadow">

              <div className="text-6xl">
                🛕
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-800">
                No bookings found
              </h2>

              <p className="mt-2 text-gray-600">
                You haven't booked any Puja yet.
              </p>

              <Link
                to="/pujas"
                className="mt-6 inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
              >
                Explore Pujas
              </Link>

            </div>
          )}

        {/* BOOKING LIST */}

        {bookings.length > 0 && (
          <div className="space-y-6">

            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="overflow-hidden rounded-2xl bg-white shadow-md"
              >

                {/* HEADER */}

                <div className="flex flex-col gap-4 border-b px-6 py-5 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h2 className="text-2xl font-bold text-orange-800">
                      {booking.pujaName}
                    </h2>

                    <p className="mt-1 break-all text-sm text-gray-500">
                      Booking ID:{" "}
                      {booking._id}
                    </p>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${getPaymentStatusClass(
                        booking.paymentStatus
                      )}`}
                    >
                      Payment:{" "}
                      {booking.paymentStatus ||
                        "PENDING"}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${getBookingStatusClass(
                        booking.bookingStatus
                      )}`}
                    >
                      Booking:{" "}
                      {booking.bookingStatus ||
                        "PENDING"}
                    </span>

                  </div>

                </div>

                {/* BOOKING DETAILS */}

                <div className="grid gap-6 px-6 py-6 md:grid-cols-2 lg:grid-cols-3">

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Date
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {formatDate(
                        booking.date
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Time
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {booking.time ||
                        "Not available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Amount
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      ₹
                      {booking.price ||
                        booking.amount ||
                        0}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Yajman
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {booking.yajman?.name ||
                        "Not available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Mobile
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {booking.yajman?.mobile ||
                        "Not available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      City
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {booking.yajman?.city ||
                        "Not available"}
                    </p>
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">

                    <p className="text-sm font-semibold text-gray-500">
                      Address
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {booking.yajman?.address ||
                        "Not available"}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-gray-500">
                      Location Type
                    </p>

                    <p className="mt-1 font-semibold capitalize text-gray-800">
                      {booking.yajman
                        ?.locationType ||
                        booking.locationType ||
                        "Not available"}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-gray-500">
                      UTR
                    </p>

                    <p className="mt-1 break-all font-semibold text-gray-800">
                      {booking.utr ||
                        "Not submitted"}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-gray-500">
                      Booked On
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {formatDate(
                        booking.createdAt
                      )}
                    </p>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex flex-col gap-3 border-t bg-gray-50 px-6 py-5 sm:flex-row sm:justify-end">

                  {booking.bookingStatus !==
                    "CANCELLED" &&
                    booking.bookingStatus !==
                      "COMPLETED" && (
                      <button
                        onClick={() =>
                          handleCancel(
                            booking._id
                          )
                        }
                        disabled={
                          cancellingId ===
                          booking._id
                        }
                        className="rounded-lg border border-red-600 px-5 py-2.5 font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {cancellingId ===
                        booking._id
                          ? "Cancelling..."
                          : "Cancel Booking"}
                      </button>
                    )}

                  <Link
                    to={`/booking/${booking.pujaId}/confirmation`}
                    className="rounded-lg bg-orange-600 px-5 py-2.5 text-center font-semibold text-white hover:bg-orange-700"
                  >
                    View Booking
                  </Link>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* BOTTOM NAVIGATION */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            to="/pujas"
            className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Book Another Puja
          </Link>

          <Link
            to="/"
            className="rounded-lg border border-orange-600 bg-white px-6 py-3 font-semibold text-orange-600 hover:bg-orange-50"
          >
            Back to Home
          </Link>

        </div>

      </main>

    </div>
  );
}

export default MyBookings;