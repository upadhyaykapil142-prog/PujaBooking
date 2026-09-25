import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Confirmation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const savedBooking =
      localStorage.getItem("pujaBooking");

    if (!savedBooking) {
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
    }
  }, []);

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
            We could not find your booking information.
          </p>

          <button
            onClick={() =>
              navigate("/pujas")
            }
            className="mt-6 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Book a Puja
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-12">

      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">

        {/* SUCCESS HEADER */}

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-5xl">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-bold text-green-700">
            Booking Submitted Successfully
          </h1>

          <p className="mt-3 text-gray-600">
            Your Puja booking has been submitted successfully.
          </p>

        </div>

        {/* BOOKING ID */}

        <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-5">

          <p className="text-sm text-gray-500">
            Booking ID
          </p>

          <p className="mt-1 break-all font-bold text-gray-800">
            {bookingData.bookingId || id}
          </p>

        </div>

        {/* BOOKING DETAILS */}

        <div className="mt-6 rounded-xl bg-orange-50 p-5">

          <h2 className="text-lg font-bold text-orange-800">
            Booking Details
          </h2>

          <div className="mt-4 space-y-4">

            <div className="flex justify-between gap-4">
              <span className="text-gray-600">
                Puja
              </span>

              <span className="text-right font-semibold text-gray-800">
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

            <div className="flex justify-between gap-4">
              <span className="text-gray-600">
                Amount
              </span>

              <span className="font-semibold text-orange-600">
                ₹{bookingData.price}
              </span>
            </div>

          </div>

        </div>

        {/* YAJMAN DETAILS */}

        <div className="mt-6 rounded-xl bg-gray-50 p-5">

          <h2 className="text-lg font-bold text-gray-800">
            Yajman Details
          </h2>

          <div className="mt-4 space-y-3">

            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="font-semibold text-gray-800">
                {bookingData.yajman?.name ||
                  bookingData.name ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Mobile
              </p>

              <p className="font-semibold text-gray-800">
                {bookingData.yajman?.mobile ||
                  bookingData.mobile ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="break-all font-semibold text-gray-800">
                {bookingData.yajman?.email ||
                  bookingData.email ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                City
              </p>

              <p className="font-semibold text-gray-800">
                {bookingData.yajman?.city ||
                  bookingData.city ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Puja Location
              </p>

              <p className="font-semibold text-gray-800">
                {bookingData.yajman?.locationType ===
                "online"
                  ? "Online Puja"
                  : "At My Home"}
              </p>
            </div>

            {bookingData.yajman?.locationType !==
              "online" &&
              bookingData.yajman?.address && (
                <div>
                  <p className="text-sm text-gray-500">
                    Address
                  </p>

                  <p className="font-semibold text-gray-800">
                    {bookingData.yajman.address}
                  </p>
                </div>
              )}

          </div>

        </div>

        {/* PAYMENT STATUS */}

        <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-5">

          <h2 className="font-bold text-yellow-800">
            Payment Status
          </h2>

          <p className="mt-2 text-sm text-gray-700">
            {bookingData.paymentStatus ===
            "PAID"
              ? "Payment has been verified."
              : "Payment has been submitted and is waiting for verification."}
          </p>

          {bookingData.utr && (
            <p className="mt-2 text-sm text-gray-700">
              UTR / Transaction ID:{" "}
              <span className="font-semibold">
                {bookingData.utr}
              </span>
            </p>
          )}

        </div>

        {/* ACTION BUTTONS */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <button
            onClick={() =>
              navigate("/my-bookings")
            }
            className="w-full rounded-lg border border-orange-600 px-6 py-3 font-semibold text-orange-600 hover:bg-orange-50"
          >
            My Bookings
          </button>

          <button
            onClick={() =>
              navigate("/")
            }
            className="w-full rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Back to Home
          </button>

        </div>

      </div>

    </div>
  );
}

export default Confirmation;