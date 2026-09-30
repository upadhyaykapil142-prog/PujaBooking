import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import naviQr from "../assets/navi-qr.png";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState(null);
  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedBooking =
      localStorage.getItem("pujaBooking");

    if (!savedBooking) {
      setError(
        "Booking information not found. Please start again."
      );
      return;
    }

    try {
      const parsedBooking =
        JSON.parse(savedBooking);

      setBookingData(parsedBooking);
    } catch (error) {
      console.error(
        "Failed to read booking data:",
        error
      );

      setError(
        "Booking information is invalid. Please start again."
      );
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!utr.trim()) {
      setError(
        "Please enter your UTR / Transaction ID."
      );
      return;
    }

    if (!bookingData) {
      setError(
        "Booking information not found."
      );
      return;
    }

    const bookingId =
      bookingData.bookingId;

    if (!bookingId) {
      setError(
        "Booking ID not found. Please start the booking again."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://pujabooking-server.onrender.com/api/bookings/${bookingId}/payment`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            utr: utr.trim(),
          }),
        }
      );

      const data = await response.json();

      console.log(
        "Payment response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to submit payment."
        );
      }

      const updatedBooking = {
        ...bookingData,

        utr: utr.trim(),

        paymentStatus:
          data.booking?.paymentStatus ||
          "PENDING",

        bookingStatus:
          data.booking?.bookingStatus ||
          "PENDING",
      };

      localStorage.setItem(
        "pujaBooking",
        JSON.stringify(updatedBooking)
      );

      navigate(
        `/booking/${id}/confirmation`
      );
    } catch (error) {
      console.error(
        "Payment submission error:",
        error
      );

      setError(
        error.message ||
          "Unable to submit payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50 px-6">

        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

          <div className="text-5xl">
            ⚠️
          </div>

          <h1 className="mt-4 text-2xl font-bold text-red-600">
            Booking Information Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            {error ||
              "Please start your booking again."}
          </p>

          <button
            onClick={() =>
              navigate("/pujas")
            }
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

      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">

        {/* HEADER */}

        <div className="text-center">

          <div className="text-5xl">
            💳
          </div>

          <h1 className="mt-4 text-3xl font-bold text-orange-800">
            Payment
          </h1>

          <p className="mt-3 text-gray-600">
            Complete your payment and submit
            the transaction ID.
          </p>

        </div>

        {/* BOOKING SUMMARY */}

        <div className="mt-8 rounded-xl bg-orange-50 p-5">

          <p className="text-sm text-gray-500">
            Booking Summary
          </p>

          <div className="mt-3 space-y-3">

            <div className="flex justify-between gap-4">

              <span className="text-gray-600">
                Puja
              </span>

              <span className="font-semibold text-gray-800">
                {bookingData.pujaName}
              </span>

            </div>

            <div className="flex justify-between gap-4">

              <span className="text-gray-600">
                Date
              </span>

              <span className="font-semibold text-gray-800">
                {bookingData.date}
              </span>

            </div>

            <div className="flex justify-between gap-4">

              <span className="text-gray-600">
                Time
              </span>

              <span className="font-semibold text-gray-800">
                {bookingData.time}
              </span>

            </div>

            <div className="flex justify-between gap-4 border-t pt-3">

              <span className="font-semibold text-gray-700">
                Total Amount
              </span>

              <span className="text-xl font-bold text-orange-600">
                ₹{bookingData.price}
              </span>

            </div>

          </div>

        </div>

        {/* PAYMENT INSTRUCTIONS */}

        <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-5">

          <h2 className="text-lg font-bold text-orange-800">
            Payment Instructions
          </h2>

          <p className="mt-3 text-gray-700">
            Please complete the payment using
            the payment method provided by
            PujaBooking.
          </p>

          {/* AMOUNT TO PAY */}

          <div className="mt-4 rounded-lg bg-white p-4">

            <p className="text-sm text-gray-500">
              Amount to Pay
            </p>

            <p className="mt-1 text-2xl font-bold text-orange-600">
              ₹{bookingData.price}
            </p>

          </div>

          {/* NAVI QR CODE */}

          <div className="mt-6 rounded-xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-5 text-center shadow-md">

            <h3 className="text-xl font-bold text-orange-800">
              Scan & Pay
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Scan the QR code using your UPI app
              to complete the payment.
            </p>

            <div className="mt-5 flex justify-center">

              <div className="rounded-2xl border-4 border-orange-400 bg-white p-3 shadow-lg">

                <img
                  src={naviQr}
                  alt="Navi UPI QR Code"
                  className="h-64 w-64 rounded-lg object-contain"
                />

              </div>

            </div>

            <div className="mt-4 inline-block rounded-full bg-orange-100 px-5 py-2">

              <p className="text-sm font-bold text-orange-700">
                Pay ₹{bookingData.price}
              </p>

            </div>

          </div>

          <p className="mt-4 text-sm text-gray-600">
            After completing the payment,
            enter the UTR / Transaction ID below.
          </p>

        </div>

        {/* PAYMENT FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          <div>

            <label className="block font-semibold text-gray-700">
              UTR / Transaction ID
            </label>

            <input
              type="text"
              value={utr}
              onChange={(event) => {
                setUtr(event.target.value);
                setError("");
              }}
              placeholder="Enter your UTR / Transaction ID"
              autoComplete="off"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />

            <p className="mt-2 text-sm text-gray-500">
              This will be used to verify your payment.
            </p>

          </div>

          {/* ERROR */}

          {error && (

            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
              {error}
            </div>

          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Submitting Payment..."
              : "Submit Payment"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Payment;