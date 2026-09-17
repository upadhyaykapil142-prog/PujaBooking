import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const pujas = [
  {
    id: 1,
    name: "Ganesh Puja",
    description:
      "Lord Ganesha Puja for blessings, prosperity and removing obstacles.",
    price: 5100,
  },
  {
    id: 2,
    name: "Satyanarayan Puja",
    description:
      "A traditional Puja performed for peace, prosperity and well-being.",
    price: 6100,
  },
  {
    id: 3,
    name: "Griha Pravesh Puja",
    description:
      "Complete Puja ceremony for entering a new home.",
    price: 5100,
  },
  {
    id: 4,
    name: "Mahamrityunjaya Jaap",
    description:
      "Traditional Jaap performed with proper Vedic rituals.",
    price: 5100,
  },
  {
    id: 5,
    name: "Maha Mrityunjaya Havan",
    description:
      "Traditional Havan performed with Vedic rituals and sacred offerings.",
    price: 5100,
  },
  {
    id: 6,
    name: "Navagraha Havan",
    description:
      "A traditional Havan performed for Navagraha worship and peace.",
    price: 5100,
  },
  {
    id: 7,
    name: "Hanuman Puja",
    description:
      "Devotional Hanuman Puja performed with traditional rituals.",
    price: 5100,
  },
  {
    id: 8,
    name: "Diwali Puja",
    description:
      "Traditional Diwali Puja dedicated to prosperity and auspiciousness.",
    price: 7100,
  },
  {
    id: 9,
    name: "Durga Puja",
    description:
      "Traditional Maa Durga Puja performed with proper rituals.",
    price: 5100,
  },
  {
    id: 10,
    name: "Navratri Puja",
    description:
      "Special Navratri Puja dedicated to Maa Durga and the Nav Durga.",
    price: 7100,
  },
  {
    id: 11,
    name: "Shiv Puja",
    description:
      "Traditional Lord Shiva Puja performed with devotional rituals.",
    price: 5100,
  },
  {
    id: 12,
    name: "Rudrabhishek",
    description:
      "Traditional Rudrabhishek of Lord Shiva performed with sacred offerings.",
    price: 5100,
  },
  {
    id: 13,
    name: "Shivling Abhishek",
    description:
      "Sacred Abhishek of Shivling performed according to traditional rituals.",
    price: 5100,
  },
  {
    id: 14,
    name: "Vastu Shanti Puja",
    description:
      "Traditional Vastu Shanti Puja for a peaceful and auspicious home.",
    price: 5100,
  },
  {
    id: 15,
    name: "Navagraha Shanti",
    description:
      "Traditional Navagraha Shanti Puja performed with Vedic rituals.",
    price: 5100,
  },
];

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const puja = pujas.find((item) => item.id === Number(id));

  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
    time: "",
    name: "",
    mobile: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.day) {
      setError("Please select the Puja day.");
      return;
    }

    if (!formData.month) {
      setError("Please select the Puja month.");
      return;
    }

    if (!formData.year) {
      setError("Please select the Puja year.");
      return;
    }

    if (!formData.time) {
      setError("Please select a Puja time.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Create date safely as YYYY-MM-DD.
    const selectedDate = `${formData.year}-${String(
      formData.month
    ).padStart(2, "0")}-${String(formData.day).padStart(2, "0")}`;

    // Validate that the selected date is real.
    const dateObject = new Date(
      Number(formData.year),
      Number(formData.month) - 1,
      Number(formData.day)
    );

    if (
      dateObject.getFullYear() !== Number(formData.year) ||
      dateObject.getMonth() !== Number(formData.month) - 1 ||
      dateObject.getDate() !== Number(formData.day)
    ) {
      setError("Please select a valid calendar date.");
      return;
    }

    // Validate date is not in the past.
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    dateObject.setHours(0, 0, 0, 0);

    if (dateObject < today) {
      setError("Puja date cannot be in the past.");
      return;
    }

    const bookingData = {
      pujaId: puja.id,
      pujaName: puja.name,
      price: puja.price,
      date: selectedDate,
      time: formData.time,
      name: formData.name.trim(),
      mobile: formData.mobile,
    };

    console.log("================================");
    console.log("FINAL DATE:", selectedDate);
    console.log("BOOKING DATA:", bookingData);
    console.log("================================");

    localStorage.setItem(
      "pujaBooking",
      JSON.stringify(bookingData)
    );

    navigate(`/booking/${id}/yajman`);
  };

  if (!puja) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50">
        <h1 className="text-2xl font-bold text-red-600">
          Puja not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">

        {/* Header */}
        <div className="text-center">
          <div className="text-5xl">
            🛕
          </div>

          <h1 className="mt-4 text-3xl font-bold text-orange-800">
            Book {puja.name}
          </h1>

          <p className="mt-3 text-gray-600">
            {puja.description}
          </p>
        </div>

        {/* Price */}
        <div className="mt-8 rounded-xl bg-orange-50 p-6">
          <p className="text-sm text-gray-500">
            Starting Price
          </p>

          <p className="mt-1 text-3xl font-bold text-orange-600">
            ₹{puja.price}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          {/* Date */}
          <div>
            <label className="block font-semibold text-gray-700">
              Select Puja Date
            </label>

            <div className="mt-2 grid grid-cols-3 gap-3">

              {/* Day */}
              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              >
                <option value="">
                  Day
                </option>

                {Array.from({ length: 31 }, (_, index) => {
                  const day = index + 1;

                  return (
                    <option key={day} value={day}>
                      {String(day).padStart(2, "0")}
                    </option>
                  );
                })}
              </select>

              {/* Month */}
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              >
                <option value="">
                  Month
                </option>

                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>

              {/* Year */}
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              >
                <option value="">
                  Year
                </option>

                {Array.from(
                  { length: 11 },
                  (_, index) => currentYear + index
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Select Day, Month and Year.
            </p>
          </div>

          {/* Time */}
          <div className="mt-6">
            <label className="block font-semibold text-gray-700">
              Select Puja Time
            </label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* Name */}
          <div className="mt-6">
            <label className="block font-semibold text-gray-700">
              Your Name
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
              inputMode="numeric"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />
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
            className="mt-8 w-full rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Continue Booking
          </button>

        </form>
      </div>
    </div>
  );
}

export default Booking;