import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function YajmanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    locationType: "home",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const savedBooking = localStorage.getItem("pujaBooking");

    if (savedBooking) {
      const parsedBooking = JSON.parse(savedBooking);

      setBookingData(parsedBooking);

      setFormData((previous) => ({
        ...previous,
        name: parsedBooking.name || "",
        mobile: parsedBooking.mobile || "",
      }));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.address.trim() && formData.locationType === "home") {
      setError("Please enter your complete address.");
      return;
    }

    if (!formData.city.trim()) {
      setError("Please enter your city.");
      return;
    }

    if (!bookingData) {
      setError("Booking information not found. Please start again.");
      return;
    }

    const updatedBooking = {
      pujaId: Number(id),
      pujaName: bookingData.pujaName,
      price: Number(bookingData.price),
      date: bookingData.date,
      time: bookingData.time,

      yajman: {
        name: formData.name.trim(),
        mobile: formData.mobile,
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        locationType: formData.locationType,
      },

      paymentStatus: "PENDING",
      bookingStatus: "PENDING",
    };

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBooking),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create booking.");
      }

      console.log("Booking saved in MongoDB:", data.booking);

      // Keep the booking locally for the payment step
      localStorage.setItem(
        "pujaBooking",
        JSON.stringify({
          ...updatedBooking,
          bookingId: data.booking._id,
        })
      );

      navigate(`/booking/${id}/payment`);
    } catch (error) {
      console.error("Booking error:", error);

      setError(
        error.message ||
          "Unable to save booking. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50 px-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="text-5xl">⚠️</div>

          <h1 className="mt-4 text-2xl font-bold text-red-600">
            Booking Information Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            Please start your booking again.
          </p>

          <button
            onClick={() => navigate("/pujas")}
            className="mt-6 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
          >
            View Pujas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">

        {/* Header */}
        <div className="text-center">
          <div className="text-5xl">🙏</div>

          <h1 className="mt-4 text-3xl font-bold text-orange-800">
            Yajman Details
          </h1>

          <p className="mt-3 text-gray-600">
            Please provide your details for the Puja booking.
          </p>
        </div>

        {/* Booking Summary */}
        <div className="mt-8 rounded-xl bg-orange-50 p-5">
          <p className="text-sm text-gray-500">
            Selected Puja
          </p>

          <div className="mt-1 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              {bookingData.pujaName}
            </h2>

            <span className="text-xl font-bold text-orange-600">
              ₹{bookingData.price}
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Date
              </p>

              <p className="font-semibold text-gray-800">
                {bookingData.date}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Time
              </p>

              <p className="font-semibold text-gray-800">
                {bookingData.time}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8">

          {/* Full Name */}
          <div>
            <label className="block font-semibold text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* Mobile */}
          <div className="mt-6">
            <label className="block font-semibold text-gray-700">
              Mobile Number
            </label>

            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* Email */}
          <div className="mt-6">
            <label className="block font-semibold text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* Address */}
          <div className="mt-6">
            <label className="block font-semibold text-gray-700">
              Full Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              rows="4"
              disabled={formData.locationType === "online"}
              className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-400"
            />

            {formData.locationType === "online" && (
              <p className="mt-2 text-sm text-gray-500">
                Address is optional for Online Puja.
              </p>
            )}
          </div>

          {/* City */}
          <div className="mt-6">
            <label className="block font-semibold text-gray-700">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* Location */}
          <div className="mt-6">
            <label className="block font-semibold text-gray-700">
              Puja Location
            </label>

            <div className="mt-3 space-y-3">

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-orange-50">
                <input
                  type="radio"
                  name="locationType"
                  value="home"
                  checked={formData.locationType === "home"}
                  onChange={handleChange}
                />

                <span className="font-medium text-gray-700">
                  🏠 At My Home
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-orange-50">
                <input
                  type="radio"
                  name="locationType"
                  value="online"
                  checked={formData.locationType === "online"}
                  onChange={handleChange}
                />

                <span className="font-medium text-gray-700">
                  💻 Online Puja
                </span>
              </label>

            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving Booking..." : "Continue to Payment"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default YajmanDetails;