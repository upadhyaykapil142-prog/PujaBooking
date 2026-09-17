import { useNavigate, useParams } from "react-router-dom";

const pujas = [
  {
    id: 1,
    name: "Ganesh Puja",
    price: 5100,
  },
  {
    id: 2,
    name: "Satyanarayan Puja",
    price: 6100,
  },
  {
    id: 3,
    name: "Griha Pravesh Puja",
    price: 5100,
  },
  {
    id: 4,
    name: "Mahamrityunjaya Jaap",
    price: 5100,
  },
  {
    id: 5,
    name: "Maha Mrityunjaya Havan",
    price: 5100,
  },
  {
    id: 6,
    name: "Navagraha Havan",
    price: 5100,
  },
  {
    id: 7,
    name: "Hanuman Puja",
    price: 5100,
  },
  {
    id: 8,
    name: "Diwali Puja",
    price: 7100,
  },
  {
    id: 9,
    name: "Durga Puja",
    price: 5100,
  },
  {
    id: 10,
    name: "Navratri Puja",
    price: 7100,
  },
  {
    id: 11,
    name: "Shiv Puja",
    price: 5100,
  },
  {
    id: 12,
    name: "Rudrabhishek",
    price: 5100,
  },
  {
    id: 13,
    name: "Shivling Abhishek",
    price: 5100,
  },
  {
    id: 14,
    name: "Vastu Shanti Puja",
    price: 5100,
  },
  {
    id: 15,
    name: "Navagraha Shanti",
    price: 5100,
  },
];

function Confirmation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const puja = pujas.find((item) => item.id === Number(id));

  if (!puja) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="text-5xl">❌</div>

          <h1 className="mt-4 text-2xl font-bold text-red-600">
            Booking Not Found
          </h1>

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

  const bookingId = `PB-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-12">

      <div className="mx-auto max-w-3xl">

        {/* Success Header */}
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-5xl text-green-600">
              ✓
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-green-700">
            Booking Confirmed!
          </h1>

          <p className="mt-3 text-gray-600">
            Your Puja booking has been successfully received.
          </p>

          <div className="mt-6 inline-block rounded-lg bg-green-50 px-5 py-3">
            <p className="text-sm text-gray-500">
              Booking ID
            </p>

            <p className="mt-1 text-lg font-bold text-green-700">
              {bookingId}
            </p>
          </div>

        </div>

        {/* Booking Summary */}
        <div className="mt-6 rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="text-2xl font-bold text-orange-800">
            Booking Summary
          </h2>

          <div className="mt-6 space-y-5">

            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-500">
                Puja
              </span>

              <span className="font-semibold text-gray-800">
                {puja.name}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-500">
                Booking Status
              </span>

              <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                Confirmed
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-500">
                Payment Status
              </span>

              <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                Paid
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-semibold text-gray-700">
                Total Amount
              </span>

              <span className="text-2xl font-bold text-orange-600">
                ₹{puja.price}
              </span>
            </div>

          </div>

        </div>

        {/* Schedule */}
        <div className="mt-6 rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="text-2xl font-bold text-orange-800">
            Puja Schedule
          </h2>

          <div className="mt-6 space-y-4">

            <div className="flex items-center gap-4 rounded-xl bg-orange-50 p-4">
              <span className="text-2xl">
                📅
              </span>

              <div>
                <p className="text-sm text-gray-500">
                  Puja Date
                </p>

                <p className="font-semibold text-gray-800">
                  Will be confirmed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-orange-50 p-4">
              <span className="text-2xl">
                🕐
              </span>

              <div>
                <p className="text-sm text-gray-500">
                  Puja Time
                </p>

                <p className="font-semibold text-gray-800">
                  Will be confirmed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-orange-50 p-4">
              <span className="text-2xl">
                📍
              </span>

              <div>
                <p className="text-sm text-gray-500">
                  Puja Location
                </p>

                <p className="font-semibold text-gray-800">
                  As provided by Yajman
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Information */}
        <div className="mt-6 rounded-2xl bg-white p-8 shadow-lg">

          <div className="rounded-xl bg-green-50 p-5">

            <p className="font-semibold text-green-700">
              🙏 Thank you for choosing PujaBooking.
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Your booking details will be available in your
              account. Our team will contact you regarding the
              Puja schedule and Pandit assignment.
            </p>

          </div>

        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Go to Home
          </button>

          <button
            onClick={() => navigate("/pujas")}
            className="w-full rounded-lg border border-orange-600 px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            Book Another Puja
          </button>

        </div>

      </div>
    </div>
  );
}

export default Confirmation;