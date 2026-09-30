import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = "https://pujabooking-server.onrender.com";

function YajmanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    locationType: "HOME",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedBooking = localStorage.getItem("pujaBooking");

    if (!savedBooking) {
      navigate(`/booking/${id}`);
      return;
    }

    try {
      const parsedBooking = JSON.parse(savedBooking);

      setBooking(parsedBooking);

      if (
        parsedBooking.yajman &&
        typeof parsedBooking.yajman === "object"
      ) {
        setFormData({
          name: parsedBooking.yajman.name || "",
          mobile: parsedBooking.yajman.mobile || "",
          email: parsedBooking.yajman.email || "",
          address: parsedBooking.yajman.address || "",
          city: parsedBooking.yajman.city || "",
          locationType:
            parsedBooking.yajman.locationType || "HOME",
        });
      }
    } catch (error) {
      console.error("BOOKING DATA ERROR:", error);

      localStorage.removeItem("pujaBooking");
      navigate(`/booking/${id}`);
    }
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setErrorMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const mobile = formData.mobile.trim();
    const email = formData.email.trim();
    const address = formData.address.trim();
    const city = formData.city.trim();

    if (!name) {
      newErrors.name = "Please enter your full name.";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!mobile) {
      newErrors.mobile = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobile =
        "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!address) {
      newErrors.address = "Please enter your address.";
    } else if (address.length < 5) {
      newErrors.address =
        "Please enter a complete address.";
    }

    if (!city) {
      newErrors.city = "Please enter your city.";
    }

    if (!formData.locationType) {
      newErrors.locationType =
        "Please select a location type.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    if (!booking) {
      setErrorMessage(
        "Booking information is missing. Please select the Puja again."
      );
      return;
    }

    try {
      setLoading(true);

      const bookingPayload = {
        pujaId: booking.pujaId,
        pujaName: booking.pujaName,
        price: booking.price,
        date: booking.date,
        time: booking.time,

        yajman: {
          name: formData.name.trim(),
          mobile: formData.mobile.trim(),
          email: formData.email.trim().toLowerCase(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          locationType: formData.locationType,
        },
      };

      console.log(
        "CREATING BOOKING WITH PAYLOAD:",
        bookingPayload
      );

      const response = await fetch(
        `${API_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingPayload),
        }
      );

      console.log(
        "BOOKING RESPONSE STATUS:",
        response.status
      );

      const responseText = await response.text();

      console.log(
        "BOOKING RAW RESPONSE:",
        responseText
      );

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create booking."
        );
      }

      console.log("BOOKING CREATED:", data);

      const createdBooking =
        data.booking || data.data || data;

      const bookingId =
        createdBooking?._id ||
        createdBooking?.id ||
        data.bookingId ||
        data.id;

      if (!bookingId) {
        console.error(
          "BOOKING ID NOT FOUND:",
          data
        );

        throw new Error(
          "Booking was created, but booking ID was not received."
        );
      }

      const updatedBooking = {
        ...booking,
        bookingId: bookingId,
        _id: bookingId,

        pujaId:
          createdBooking?.pujaId ??
          booking.pujaId,

        pujaName:
          createdBooking?.pujaName ??
          booking.pujaName,

        price:
          createdBooking?.price ??
          booking.price,

        date:
          createdBooking?.date ??
          booking.date,

        time:
          createdBooking?.time ??
          booking.time,

        yajman: {
          name: formData.name.trim(),
          mobile: formData.mobile.trim(),
          email: formData.email.trim().toLowerCase(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          locationType: formData.locationType,
        },

        bookingStatus:
          createdBooking?.bookingStatus ||
          "PENDING",

        paymentStatus:
          createdBooking?.paymentStatus ||
          "PENDING",

        utr:
          createdBooking?.utr ||
          "",
      };

      localStorage.setItem(
        "pujaBooking",
        JSON.stringify(updatedBooking)
      );

      console.log(
        "BOOKING SAVED TO LOCAL STORAGE:",
        updatedBooking
      );

      navigate(`/booking/${id}/payment`);
    } catch (error) {
      console.error(
        "CREATE BOOKING ERROR:",
        error
      );

      setErrorMessage(
        error.message ||
          "Something went wrong while creating your booking."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-orange-50">
        <nav className="border-b bg-white px-6 py-4">
          <Link
            to="/"
            className="text-2xl font-bold text-orange-800"
          >
            🛕 PujaBooking
          </Link>
        </nav>

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <div className="text-5xl">🛕</div>

            <p className="mt-4 text-lg font-semibold text-gray-700">
              Loading booking details...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Navbar */}
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

          <Link
            to="/my-bookings"
            className="text-gray-700 hover:text-orange-600"
          >
            My Bookings
          </Link>
        </div>
      </nav>

      {/* Progress */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <div className="flex items-center justify-center gap-2 text-sm sm:gap-4">
            <div className="flex items-center gap-2 font-semibold text-green-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                ✓
              </span>
              <span className="hidden sm:inline">
                Date & Time
              </span>
            </div>

            <div className="h-px w-8 bg-orange-300 sm:w-16" />

            <div className="flex items-center gap-2 font-semibold text-orange-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white">
                2
              </span>
              <span className="hidden sm:inline">
                Yajman Details
              </span>
            </div>

            <div className="h-px w-8 bg-gray-300 sm:w-16" />

            <div className="flex items-center gap-2 text-gray-400">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
                3
              </span>
              <span className="hidden sm:inline">
                Payment
              </span>
            </div>

            <div className="h-px w-8 bg-gray-300 sm:w-16" />

            <div className="flex items-center gap-2 text-gray-400">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
                4
              </span>
              <span className="hidden sm:inline">
                Confirmation
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Link
            to={`/booking/${id}`}
            className="text-sm font-semibold text-orange-600 hover:underline"
          >
            ← Back to Date & Time
          </Link>

          <h1 className="mt-5 text-4xl font-bold text-orange-800">
            Yajman Details
          </h1>

          <p className="mt-2 text-gray-600">
            Enter the details of the person for whom the
            Puja will be performed.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-semibold text-red-700">
              {errorMessage}
            </p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-md md:p-8"
          >
            <h2 className="text-2xl font-bold text-orange-800">
              👤 Yajman Information
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Please enter accurate contact details.
            </p>

            {/* Name */}
            <div className="mt-6">
              <label
                htmlFor="name"
                className="mb-2 block font-semibold text-gray-700"
              >
                Full Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-orange-200 ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 focus:border-orange-500"
                }`}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div className="mt-5">
              <label
                htmlFor="mobile"
                className="mb-2 block font-semibold text-gray-700"
              >
                Mobile Number *
              </label>

              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="numeric"
                maxLength="10"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-orange-200 ${
                  errors.mobile
                    ? "border-red-500"
                    : "border-gray-300 focus:border-orange-500"
                }`}
              />

              {errors.mobile && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mt-5">
              <label
                htmlFor="email"
                className="mb-2 block font-semibold text-gray-700"
              >
                Email Address *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-orange-200 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:border-orange-500"
                }`}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* City */}
            <div className="mt-5">
              <label
                htmlFor="city"
                className="mb-2 block font-semibold text-gray-700"
              >
                City *
              </label>

              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-orange-200 ${
                  errors.city
                    ? "border-red-500"
                    : "border-gray-300 focus:border-orange-500"
                }`}
              />

              {errors.city && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.city}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="mt-5">
              <label
                htmlFor="address"
                className="mb-2 block font-semibold text-gray-700"
              >
                Complete Address *
              </label>

              <textarea
                id="address"
                name="address"
                rows="4"
                value={formData.address}
                onChange={handleChange}
                placeholder="House/Flat, Street, Area, Landmark..."
                className={`w-full resize-none rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-orange-200 ${
                  errors.address
                    ? "border-red-500"
                    : "border-gray-300 focus:border-orange-500"
                }`}
              />

              {errors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address}
                </p>
              )}
            </div>

            {/* Location Type */}
            <div className="mt-5">
              <label className="mb-3 block font-semibold text-gray-700">
                Puja Location *
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label
                  className={`cursor-pointer rounded-xl border p-4 transition ${
                    formData.locationType === "HOME"
                      ? "border-orange-600 bg-orange-50"
                      : "border-gray-300 hover:border-orange-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="locationType"
                    value="HOME"
                    checked={
                      formData.locationType === "HOME"
                    }
                    onChange={handleChange}
                    className="mr-3 accent-orange-600"
                  />

                  <span className="font-semibold text-gray-800">
                    🏠 At My Home
                  </span>

                  <p className="mt-1 pl-6 text-sm text-gray-500">
                    Pandit performs the Puja at your address.
                  </p>
                </label>

                <label
                  className={`cursor-pointer rounded-xl border p-4 transition ${
                    formData.locationType === "ONLINE"
                      ? "border-orange-600 bg-orange-50"
                      : "border-gray-300 hover:border-orange-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="locationType"
                    value="ONLINE"
                    checked={
                      formData.locationType === "ONLINE"
                    }
                    onChange={handleChange}
                    className="mr-3 accent-orange-600"
                  />

                  <span className="font-semibold text-gray-800">
                    💻 Online Puja
                  </span>

                  <p className="mt-1 pl-6 text-sm text-gray-500">
                    Receive online Puja instructions/details.
                  </p>
                </label>
              </div>

              {errors.locationType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.locationType}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="mt-8 border-t pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-orange-600 px-6 py-3.5 font-bold text-white shadow-md transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating Booking..."
                  : "Continue to Payment →"}
              </button>
            </div>
          </form>

          {/* Booking Summary */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold text-orange-800">
              🧾 Booking Summary
            </h2>

            <div className="mt-5 border-b pb-5">
              <p className="text-sm text-gray-500">
                Puja
              </p>

              <p className="mt-1 text-lg font-bold text-gray-800">
                {booking.pujaName}
              </p>
            </div>

            <div className="space-y-4 border-b py-5">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Date
                </span>

                <span className="font-semibold text-gray-800">
                  {booking.date || "Not selected"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Time
                </span>

                <span className="font-semibold text-gray-800">
                  {booking.time || "Not selected"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Location
                </span>

                <span className="font-semibold text-gray-800">
                  {formData.locationType === "ONLINE"
                    ? "Online"
                    : "At Home"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-5">
              <span className="text-lg font-semibold text-gray-700">
                Total
              </span>

              <span className="text-2xl font-bold text-orange-700">
                ₹{booking.price || 0}
              </span>
            </div>

            <div className="mt-5 rounded-xl bg-orange-50 p-4">
              <p className="text-sm leading-6 text-gray-600">
                🔒 Your booking information will be securely
                submitted to PujaBooking for processing.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default YajmanDetails;