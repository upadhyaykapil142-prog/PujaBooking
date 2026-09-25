import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [assigningId, setAssigningId] = useState(null);
  const [selectedPandit, setSelectedPandit] = useState({});

  // Create Pandit form
  const [panditName, setPanditName] = useState("");
  const [panditEmail, setPanditEmail] = useState("");
  const [creatingPandit, setCreatingPandit] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const [bookingsResponse, panditsResponse] =
        await Promise.all([
          fetch(`${API_URL}/api/admin/bookings`, {
            credentials: "include",
          }),

          fetch(`${API_URL}/api/admin/pandits`, {
            credentials: "include",
          }),
        ]);

      const bookingsData = await bookingsResponse.json();
      const panditsData = await panditsResponse.json();

      if (!bookingsResponse.ok) {
        throw new Error(
          bookingsData.message ||
            "Failed to fetch bookings."
        );
      }

      if (!panditsResponse.ok) {
        throw new Error(
          panditsData.message ||
            "Failed to fetch Pandits."
        );
      }

      setBookings(
        Array.isArray(bookingsData)
          ? bookingsData
          : bookingsData.bookings || []
      );

      setPandits(
        Array.isArray(panditsData)
          ? panditsData
          : panditsData.pandits || []
      );
    } catch (error) {
      console.error("Fetch admin data error:", error);

      setError(
        error.message ||
          "Unable to load admin data."
      );
    } finally {
      setLoading(false);
    }
  };

  // Create Pandit Account
  const createPandit = async (event) => {
    event.preventDefault();

    const name = panditName.trim();
    const email = panditEmail.trim().toLowerCase();

    if (!name) {
      alert("Please enter Pandit name.");
      return;
    }

    if (!email) {
      alert("Please enter Pandit Gmail.");
      return;
    }

    try {
      setCreatingPandit(true);

      const response = await fetch(
        `${API_URL}/api/admin/pandits`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create Pandit account."
        );
      }

      alert(
        "Pandit account created successfully."
      );

      setPanditName("");
      setPanditEmail("");

      // Refresh Pandit list
      await fetchAdminData();
    } catch (error) {
      console.error(
        "Create Pandit error:",
        error
      );

      alert(
        error.message ||
          "Unable to create Pandit account."
      );
    } finally {
      setCreatingPandit(false);
    }
  };

  const verifyPayment = async (bookingId) => {
    const confirmed = window.confirm(
      "Verify this payment and confirm the booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/bookings/${bookingId}/verify-payment`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to verify payment."
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
        "Verify payment error:",
        error
      );

      alert(
        error.message ||
          "Unable to verify payment."
      );
    }
  };

  const cancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to cancel booking."
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
        "Cancel booking error:",
        error
      );

      alert(
        error.message ||
          "Unable to cancel booking."
      );
    }
  };

  const assignPandit = async (bookingId) => {
    const panditId = selectedPandit[bookingId];

    if (!panditId) {
      alert("Please select a Pandit first.");
      return;
    }

    const confirmed = window.confirm(
      "Assign this Pandit to the booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setAssigningId(bookingId);

      const response = await fetch(
        `${API_URL}/api/admin/bookings/${bookingId}/assign-pandit`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            panditId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to assign Pandit."
        );
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? data.booking
            : booking
        )
      );

      setSelectedPandit((previous) => ({
        ...previous,
        [bookingId]: "",
      }));
    } catch (error) {
      console.error(
        "Assign Pandit error:",
        error
      );

      alert(
        error.message ||
          "Unable to assign Pandit."
      );
    } finally {
      setAssigningId(null);
    }
  };

  const unassignPandit = async (bookingId) => {
    const confirmed = window.confirm(
      "Remove the assigned Pandit from this booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setAssigningId(bookingId);

      const response = await fetch(
        `${API_URL}/api/admin/bookings/${bookingId}/unassign-pandit`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to unassign Pandit."
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
        "Unassign Pandit error:",
        error
      );

      alert(
        error.message ||
          "Unable to unassign Pandit."
      );
    } finally {
      setAssigningId(null);
    }
  };

  const getPaymentClass = (status) => {
    if (status === "PAID") {
      return "bg-green-100 text-green-700";
    }

    if (status === "FAILED") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  const getBookingClass = (status) => {
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="text-5xl">
            🛕
          </div>

          <p className="mt-4 font-semibold text-gray-700">
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-orange-800">
              PujaBooking Admin
            </h1>

            <p className="mt-2 text-gray-600">
              Manage Puja bookings, payments and Pandit assignments.
            </p>
          </div>

          <button
            onClick={fetchAdminData}
            className="rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
            <p className="font-semibold">
              {error}
            </p>

            <button
              onClick={fetchAdminData}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!error && (
          <>
            {/* Create Pandit Account */}
            <div className="mt-8 rounded-2xl border border-purple-200 bg-white p-6 shadow-lg">
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-purple-900">
                  Create Pandit Account
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Add a Pandit who can later log in with Google and receive assigned Puja bookings.
                </p>
              </div>

              <form
                onSubmit={createPandit}
                className="grid gap-4 md:grid-cols-3"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Pandit Name
                  </label>

                  <input
                    type="text"
                    value={panditName}
                    onChange={(event) =>
                      setPanditName(event.target.value)
                    }
                    placeholder="Kishan Upadhyay"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Pandit Gmail
                  </label>

                  <input
                    type="email"
                    value={panditEmail}
                    onChange={(event) =>
                      setPanditEmail(event.target.value)
                    }
                    placeholder="pandit@gmail.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={creatingPandit}
                    className="w-full rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {creatingPandit
                      ? "Creating..."
                      : "Create Pandit Account"}
                  </button>
                </div>
              </form>

              {/* Existing Pandits */}
              <div className="mt-6 border-t pt-5">
                <h3 className="font-bold text-gray-800">
                  Pandit Accounts
                </h3>

                {pandits.length === 0 ? (
                  <p className="mt-2 text-sm text-gray-500">
                    No Pandit accounts created yet.
                  </p>
                ) : (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {pandits.map((pandit) => (
                      <div
                        key={pandit._id}
                        className="rounded-xl border border-purple-100 bg-purple-50 p-4"
                      >
                        <p className="font-bold text-purple-900">
                          🙏 {pandit.name}
                        </p>

                        <p className="mt-1 break-all text-sm text-purple-700">
                          {pandit.email}
                        </p>

                        <p className="mt-2 text-xs font-semibold text-purple-600">
                          Role: {pandit.role}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bookings */}
            <div className="mt-8 grid gap-6">
              {bookings.length === 0 ? (
                <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
                  <div className="text-5xl">
                    📋
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-gray-800">
                    No Bookings
                  </h2>

                  <p className="mt-2 text-gray-600">
                    There are no bookings available.
                  </p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="rounded-2xl bg-white p-6 shadow-lg"
                  >

                    {/* Booking Header */}
                    <div className="flex flex-col justify-between gap-4 border-b pb-5 lg:flex-row">
                      <div>
                        <h2 className="text-xl font-bold text-orange-800">
                          {booking.pujaName}
                        </h2>

                        <p className="mt-1 break-all text-xs text-gray-500">
                          Booking ID: {booking._id}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getPaymentClass(
                            booking.paymentStatus
                          )}`}
                        >
                          Payment: {booking.paymentStatus}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getBookingClass(
                            booking.bookingStatus
                          )}`}
                        >
                          Booking: {booking.bookingStatus}
                        </span>
                      </div>
                    </div>

                    {/* Main Details */}
                    <div className="mt-6 grid gap-6 lg:grid-cols-3">

                      {/* Puja */}
                      <div className="rounded-xl bg-orange-50 p-5">
                        <h3 className="font-bold text-gray-800">
                          Puja Details
                        </h3>

                        <div className="mt-4 space-y-2 text-sm">
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
                            {booking.date}
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

                      {/* Yajman */}
                      <div className="rounded-xl bg-gray-50 p-5">
                        <h3 className="font-bold text-gray-800">
                          Yajman Details
                        </h3>

                        <div className="mt-4 space-y-2 text-sm">
                          <p>
                            <span className="font-semibold">
                              Name:
                            </span>{" "}
                            {booking.yajman?.name || "-"}
                          </p>

                          <p>
                            <span className="font-semibold">
                              Mobile:
                            </span>{" "}
                            {booking.yajman?.mobile || "-"}
                          </p>

                          <p className="break-all">
                            <span className="font-semibold">
                              Email:
                            </span>{" "}
                            {booking.yajman?.email || "-"}
                          </p>

                          <p>
                            <span className="font-semibold">
                              City:
                            </span>{" "}
                            {booking.yajman?.city || "-"}
                          </p>

                          <p>
                            <span className="font-semibold">
                              Location:
                            </span>{" "}
                            {booking.yajman
                              ?.locationType === "online"
                              ? "Online Puja"
                              : "At My Home"}
                          </p>
                        </div>
                      </div>

                      {/* Payment */}
                      <div className="rounded-xl bg-gray-50 p-5">
                        <h3 className="font-bold text-gray-800">
                          Payment Details
                        </h3>

                        <div className="mt-4 space-y-2 text-sm">
                          <p className="break-all">
                            <span className="font-semibold">
                              UTR:
                            </span>{" "}
                            {booking.utr || "Not submitted"}
                          </p>

                          <p>
                            <span className="font-semibold">
                              Payment:
                            </span>{" "}
                            {booking.paymentStatus}
                          </p>

                          <p>
                            <span className="font-semibold">
                              Booking:
                            </span>{" "}
                            {booking.bookingStatus}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    {booking.yajman?.locationType === "home" &&
                      booking.yajman?.address && (
                        <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4">
                          <p className="text-sm font-semibold text-gray-500">
                            Puja Address
                          </p>

                          <p className="mt-1 text-gray-800">
                            {booking.yajman.address}
                          </p>
                        </div>
                      )}

                    {/* Pandit Assignment */}
                    <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50 p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
                            Pandit Assignment
                          </p>

                          {booking.pandit ? (
                            <div className="mt-2">
                              <p className="text-lg font-bold text-purple-900">
                                🙏{" "}
                                {booking.pandit.name ||
                                  booking.pandit.email ||
                                  "Pandit Ji"}
                              </p>

                              {booking.pandit.email && (
                                <p className="text-sm text-purple-700">
                                  {booking.pandit.email}
                                </p>
                              )}

                              {booking.panditAssignedAt && (
                                <p className="mt-1 text-xs text-purple-600">
                                  Assigned:{" "}
                                  {new Date(
                                    booking.panditAssignedAt
                                  ).toLocaleString()}
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="mt-2 text-gray-700">
                              No Pandit assigned yet.
                            </p>
                          )}
                        </div>

                        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

                          {!booking.pandit &&
                            booking.bookingStatus !== "CANCELLED" &&
                            booking.bookingStatus !== "COMPLETED" && (
                              <>
                                <select
                                  value={
                                    selectedPandit[booking._id] ||
                                    ""
                                  }
                                  onChange={(event) =>
                                    setSelectedPandit(
                                      (previous) => ({
                                        ...previous,
                                        [booking._id]:
                                          event.target.value,
                                      })
                                    )
                                  }
                                  className="rounded-lg border border-purple-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-purple-500"
                                >
                                  <option value="">
                                    Select Pandit
                                  </option>

                                  {pandits.map((pandit) => (
                                    <option
                                      key={pandit._id}
                                      value={pandit._id}
                                    >
                                      {pandit.name ||
                                        pandit.email}
                                    </option>
                                  ))}
                                </select>

                                <button
                                  disabled={
                                    assigningId === booking._id ||
                                    pandits.length === 0
                                  }
                                  onClick={() =>
                                    assignPandit(
                                      booking._id
                                    )
                                  }
                                  className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {assigningId === booking._id
                                    ? "Assigning..."
                                    : "Assign Pandit"}
                                </button>
                              </>
                            )}

                          {booking.pandit &&
                            booking.bookingStatus !== "COMPLETED" &&
                            booking.bookingStatus !== "CANCELLED" && (
                              <button
                                disabled={
                                  assigningId === booking._id
                                }
                                onClick={() =>
                                  unassignPandit(
                                    booking._id
                                  )
                                }
                                className="rounded-lg border border-red-500 px-5 py-3 font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {assigningId === booking._id
                                  ? "Removing..."
                                  : "Unassign Pandit"}
                              </button>
                            )}
                        </div>
                      </div>

                      {pandits.length === 0 && (
                        <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
                          No Pandit accounts are currently available.
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:justify-end">

                      {booking.paymentStatus === "PENDING" &&
                        booking.utr &&
                        booking.bookingStatus !== "CANCELLED" && (
                          <button
                            onClick={() =>
                              verifyPayment(booking._id)
                            }
                            className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                          >
                            Verify Payment
                          </button>
                        )}

                      {booking.bookingStatus !== "CANCELLED" &&
                        booking.bookingStatus !== "COMPLETED" && (
                          <button
                            onClick={() =>
                              cancelBooking(booking._id)
                            }
                            className="rounded-lg border border-red-500 px-5 py-3 font-semibold text-red-600 hover:bg-red-50"
                          >
                            Cancel Booking
                          </button>
                        )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;