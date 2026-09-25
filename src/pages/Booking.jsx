import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const times = [
  { value: "06:00", label: "06:00 AM" },
  { value: "07:00", label: "07:00 AM" },
  { value: "08:00", label: "08:00 AM" },
  { value: "09:00", label: "09:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "01:00 PM" },
  { value: "14:00", label: "02:00 PM" },
  { value: "15:00", label: "03:00 PM" },
  { value: "16:00", label: "04:00 PM" },
  { value: "17:00", label: "05:00 PM" },
  { value: "18:00", label: "06:00 PM" },
  { value: "19:00", label: "07:00 PM" },
  { value: "20:00", label: "08:00 PM" },
];

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [puja, setPuja] = useState(null);

  const today = new Date();

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const years = [
    currentYear,
    currentYear + 1,
    currentYear + 2,
  ];

  const days = Array.from(
    { length: 31 },
    (_, index) => index + 1
  );

  useEffect(() => {
    const pujaId = Number(id);

    const selectedPuja = pujas.find(
      (item) => item.id === pujaId
    );

    if (selectedPuja) {
      setPuja(selectedPuja);
    } else {
      setPuja(null);
    }
  }, [id]);

  const handleDayChange = (event) => {
    setDay(event.target.value);
    setError("");
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    setError("");
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
    setError("");
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
    setError("");
  };

  const getBookingDate = () => {
    if (!day || !month || !year) {
      return "";
    }

    return `${year}-${month}-${String(day).padStart(
      2,
      "0"
    )}`;
  };

  const validateDate = () => {
    if (!day || !month || !year) {
      return false;
    }

    const selectedDay = Number(day);
    const selectedMonth = Number(month);
    const selectedYear = Number(year);

    const selectedDate = new Date(
      selectedYear,
      selectedMonth - 1,
      selectedDay
    );

    if (
      selectedDate.getFullYear() !== selectedYear ||
      selectedDate.getMonth() !== selectedMonth - 1 ||
      selectedDate.getDate() !== selectedDay
    ) {
      return false;
    }

    const selectedTime = selectedDate.getTime();

    const todayOnly = new Date(
      currentYear,
      currentMonth - 1,
      currentDay
    ).getTime();

    return selectedTime >= todayOnly;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!day || !month || !year) {
      setError("Please select a booking date.");
      return;
    }

    if (!validateDate()) {
      setError(
        "Please select today or a future date."
      );
      return;
    }

    if (!time) {
      setError("Please select a booking time.");
      return;
    }

    if (!puja) {
      setError(
        "Puja information not found. Please start again."
      );
      return;
    }

    const bookingDate = getBookingDate();

    const bookingData = {
      pujaId: puja.id,
      pujaName: puja.name,
      price: puja.price,
      date: bookingDate,
      time: time,
    };

    console.log(
      "FINAL BOOKING DATA:",
      bookingData
    );

    localStorage.setItem(
      "pujaBooking",
      JSON.stringify(bookingData)
    );

    navigate(
      `/booking/${puja.id}/yajman`
    );
  };

  if (!puja) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="text-5xl">⚠️</div>

          <h1 className="mt-4 text-2xl font-bold text-red-600">
            Puja Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            The selected Puja could not be found.
          </p>

          <button
            onClick={() => navigate("/pujas")}
            className="mt-6 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Back to Pujas
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
          <div className="text-5xl">🙏</div>

          <h1 className="mt-4 text-3xl font-bold text-orange-800">
            Book {puja.name}
          </h1>

          <p className="mt-3 text-gray-600">
            Select your preferred date and time.
          </p>
        </div>

        {/* PRICE */}

        <div className="mt-8 rounded-xl bg-orange-50 p-5 text-center">
          <p className="text-sm text-gray-500">
            Puja Price
          </p>

          <p className="mt-1 text-3xl font-bold text-orange-600">
            ₹{puja.price}
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          {/* DATE */}

          <div>
            <label className="block font-semibold text-gray-700">
              Booking Date
            </label>

            <div className="mt-2 grid grid-cols-3 gap-3">

              {/* DAY */}

              <select
                value={day}
                onChange={handleDayChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
                <option value="">
                  Day
                </option>

                {days.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {String(item).padStart(2, "0")}
                  </option>
                ))}
              </select>

              {/* MONTH */}

              <select
                value={month}
                onChange={handleMonthChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
                <option value="">
                  Month
                </option>

                {months.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>

              {/* YEAR */}

              <select
                value={year}
                onChange={handleYearChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
                <option value="">
                  Year
                </option>

                {years.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>

            <p className="mt-2 text-sm text-gray-500">
              Select today or any future date.
            </p>
          </div>

          {/* TIME */}

          <div className="mt-6">
            <label className="block font-semibold text-gray-700">
              Booking Time
            </label>

            <select
              value={time}
              onChange={handleTimeChange}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              <option value="">
                Select time
              </option>

              {times.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
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
            className="mt-8 w-full rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Continue to Yajman Details
          </button>

        </form>
      </div>
    </div>
  );
}

export default Booking;