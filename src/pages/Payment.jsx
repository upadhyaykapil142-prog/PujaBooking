import { useParams, useNavigate } from "react-router-dom";

const pujas = [
  { id: 1, name: "Ganesh Puja", price: 5100 },
  { id: 2, name: "Satyanarayan Puja", price: 6100 },
  { id: 3, name: "Griha Pravesh Puja", price: 5100 },
  { id: 4, name: "Mahamrityunjaya Jaap", price: 5100 },
  { id: 5, name: "Maha Mrityunjaya Havan", price: 5100 },
  { id: 6, name: "Navagraha Havan", price: 5100 },
  { id: 7, name: "Hanuman Puja", price: 5100 },
  { id: 8, name: "Diwali Puja", price: 7100 },
  { id: 9, name: "Durga Puja", price: 5100 },
  { id: 10, name: "Navratri Puja", price: 7100 },
  { id: 11, name: "Shiv Puja", price: 5100 },
  { id: 12, name: "Rudrabhishek", price: 5100 },
  { id: 13, name: "Shivling Abhishek", price: 5100 },
  { id: 14, name: "Vastu Shanti Puja", price: 5100 },
  { id: 15, name: "Navagraha Shanti", price: 5100 },
];

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const puja = pujas.find((item) => item.id === Number(id));

  if (!puja) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50">
        <h1 className="text-2xl font-bold text-red-600">
          Puja not found
        </h1>
      </div>
    );
  }

  const handlePayment = () => {
    alert("Payment gateway will be connected in the next step.");
  };

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">

        <div className="text-center">
          <div className="text-5xl">💳</div>

          <h1 className="mt-4 text-3xl font-bold text-orange-800">
            Payment
          </h1>

          <p className="mt-3 text-gray-600">
            Review your booking and complete the payment.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-6">

          <h2 className="text-xl font-bold text-gray-800">
            Booking Summary
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600">
                Puja
              </span>

              <span className="font-semibold text-gray-800">
                {puja.name}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600">
                Booking Status
              </span>

              <span className="font-semibold text-orange-600">
                Pending Payment
              </span>
            </div>

            <div className="flex justify-between pt-2">
              <span className="text-lg font-semibold text-gray-700">
                Total Amount
              </span>

              <span className="text-2xl font-bold text-orange-600">
                ₹{puja.price}
              </span>
            </div>

          </div>
        </div>

        <div className="mt-8">

          <h2 className="text-xl font-bold text-gray-800">
            Payment Method
          </h2>

          <div className="mt-4 rounded-xl border border-gray-200 p-5">
            <label className="flex cursor-pointer items-center gap-4">

              <input
                type="radio"
                name="payment"
                value="online"
                defaultChecked
              />

              <div>
                <p className="font-semibold text-gray-800">
                  💳 Online Payment
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  UPI, Debit Card, Credit Card & Net Banking
                </p>
              </div>

            </label>
          </div>

        </div>

        <div className="mt-8 rounded-xl bg-gray-50 p-5">

          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              Puja Amount
            </span>

            <span className="font-semibold">
              ₹{puja.price}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t pt-3">
            <span className="text-lg font-bold text-gray-800">
              Total
            </span>

            <span className="text-2xl font-bold text-orange-600">
              ₹{puja.price}
            </span>
          </div>

        </div>

        <button
          onClick={handlePayment}
          className="mt-8 w-full rounded-lg bg-orange-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-orange-700"
        >
          Pay ₹{puja.price}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="mt-3 w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Go Back
        </button>

      </div>
    </div>
  );
}

export default Payment;