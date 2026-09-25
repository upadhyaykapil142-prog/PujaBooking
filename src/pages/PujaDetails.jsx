import { Link, useNavigate, useParams } from "react-router-dom";

const pujas = [
  {
    id: 1,
    name: "Ganesh Puja",
    price: 5100,
    duration: "1.5–2 hours",
    description:
      "A traditional Ganesh Puja performed to seek Lord Ganesha's blessings for wisdom, prosperity, success, and removal of obstacles.",
    benefits: [
      "Removes obstacles",
      "Brings prosperity and success",
      "Seeks blessings of Lord Ganesha",
      "Suitable for new beginnings",
    ],
    samagri: [
      "Ganesh idol",
      "Flowers",
      "Durva",
      "Modak",
      "Fruits",
      "Coconut",
      "Kalash",
      "Puja samagri",
    ],
    includes: [
      "Experienced Pandit",
      "Complete Puja Vidhi",
      "Mantra recitation",
      "Aarti",
      "Puja guidance",
    ],
  },
  {
    id: 2,
    name: "Satyanarayan Puja",
    price: 6100,
    duration: "2–2.5 hours",
    description:
      "A sacred Satyanarayan Puja performed for peace, prosperity, family well-being, and fulfillment of sincere wishes.",
    benefits: [
      "Family prosperity",
      "Peace and harmony",
      "Spiritual well-being",
      "Blessings for wishes and new beginnings",
    ],
    samagri: [
      "Lord Satyanarayan image",
      "Kalash",
      "Flowers",
      "Fruits",
      "Panchamrit",
      "Tulsi",
      "Coconut",
      "Puja samagri",
    ],
    includes: [
      "Pandit Ji",
      "Satyanarayan Katha",
      "Complete Puja",
      "Aarti",
      "Prasad guidance",
    ],
  },
  {
    id: 3,
    name: "Griha Pravesh Puja",
    price: 5100,
    duration: "2–3 hours",
    description:
      "A traditional house-entry Puja performed to purify the new home and seek blessings for peace, happiness, prosperity, and positive energy.",
    benefits: [
      "Purification of the home",
      "Positive energy",
      "Family prosperity",
      "Peace and happiness",
    ],
    samagri: [
      "Kalash",
      "Coconut",
      "Mango leaves",
      "Flowers",
      "Fruits",
      "Havan samagri",
      "Ghee",
      "Puja items",
    ],
    includes: [
      "Experienced Pandit",
      "Griha Pravesh Vidhi",
      "Ganesh Puja",
      "Havan",
      "Aarti",
    ],
  },
  {
    id: 4,
    name: "Mahamrityunjaya Jaap",
    price: 5100,
    duration: "2–3 hours",
    description:
      "A sacred Mahamrityunjaya Mantra Jaap performed with devotion for spiritual strength, peace, and divine blessings.",
    benefits: [
      "Spiritual strength",
      "Peace of mind",
      "Divine blessings",
      "Positive spiritual environment",
    ],
    samagri: [
      "Shivling",
      "Bilva leaves",
      "Flowers",
      "Fruits",
      "Milk",
      "Panchamrit",
      "Kalash",
      "Puja samagri",
    ],
    includes: [
      "Pandit Ji",
      "Mahamrityunjaya Jaap",
      "Shiv Puja",
      "Mantra recitation",
      "Aarti",
    ],
  },
  {
    id: 5,
    name: "Maha Mrityunjaya Havan",
    price: 5100,
    duration: "2–3 hours",
    description:
      "A sacred Havan centered around the Mahamrityunjaya Mantra, performed with Vedic rituals and fire offerings.",
    benefits: [
      "Spiritual purification",
      "Peace and positive energy",
      "Divine blessings",
      "Traditional Vedic Havan",
    ],
    samagri: [
      "Havan kund",
      "Havan samagri",
      "Ghee",
      "Wood",
      "Flowers",
      "Fruits",
      "Kalash",
      "Puja samagri",
    ],
    includes: [
      "Pandit Ji",
      "Complete Havan",
      "Mahamrityunjaya Mantra",
      "Aarti",
      "Puja guidance",
    ],
  },
  {
    id: 6,
    name: "Navagraha Havan",
    price: 5100,
    duration: "2–3 hours",
    description:
      "A traditional Navagraha Havan performed with Vedic mantras and offerings dedicated to the nine planetary deities.",
    benefits: [
      "Traditional Navagraha worship",
      "Spiritual purification",
      "Peace and harmony",
      "Positive environment",
    ],
    samagri: [
      "Navagraha items",
      "Havan kund",
      "Havan samagri",
      "Ghee",
      "Flowers",
      "Fruits",
      "Kalash",
      "Puja items",
    ],
    includes: [
      "Pandit Ji",
      "Navagraha Puja",
      "Havan",
      "Mantra recitation",
      "Aarti",
    ],
  },
  {
    id: 7,
    name: "Hanuman Puja",
    price: 5100,
    duration: "1.5–2 hours",
    description:
      "A devotional Hanuman Puja performed to seek the blessings of Lord Hanuman for courage, devotion, strength, and protection.",
    benefits: [
      "Courage and strength",
      "Devotion",
      "Spiritual protection",
      "Positive energy",
    ],
    samagri: [
      "Hanuman idol/image",
      "Sindoor",
      "Flowers",
      "Jasmine oil",
      "Fruits",
      "Laddu",
      "Coconut",
      "Puja samagri",
    ],
    includes: [
      "Pandit Ji",
      "Hanuman Puja",
      "Mantra recitation",
      "Aarti",
      "Prasad guidance",
    ],
  },
  {
    id: 8,
    name: "Diwali Puja",
    price: 7100,
    duration: "2–2.5 hours",
    description:
      "A traditional Diwali Lakshmi-Ganesh Puja performed for prosperity, wealth, happiness, and auspicious beginnings.",
    benefits: [
      "Prosperity",
      "Wealth and abundance",
      "Auspicious beginnings",
      "Family well-being",
    ],
    samagri: [
      "Lakshmi-Ganesh idols",
      "Flowers",
      "Diyas",
      "Fruits",
      "Sweets",
      "Kalash",
      "Rice",
      "Puja samagri",
    ],
    includes: [
      "Pandit Ji",
      "Lakshmi Puja",
      "Ganesh Puja",
      "Mantra recitation",
      "Aarti",
    ],
  },
  {
    id: 9,
    name: "Durga Puja",
    price: 5100,
    duration: "2–3 hours",
    description:
      "A devotional Durga Puja performed to worship Maa Durga and seek divine blessings, strength, peace, and protection.",
    benefits: [
      "Divine blessings",
      "Inner strength",
      "Peace",
      "Spiritual devotion",
    ],
    samagri: [
      "Maa Durga image/idol",
      "Flowers",
      "Fruits",
      "Coconut",
      "Kalash",
      "Kumkum",
      "Diyas",
      "Puja samagri",
    ],
    includes: [
      "Pandit Ji",
      "Durga Puja",
      "Mantra recitation",
      "Aarti",
      "Puja guidance",
    ],
  },
  {
    id: 10,
    name: "Navratri Puja",
    price: 7100,
    duration: "2–3 hours",
    description:
      "A traditional Navratri Puja dedicated to Maa Durga and her divine forms, performed with devotional rituals and mantras.",
    benefits: [
      "Devotional worship",
      "Divine blessings",
      "Positive spiritual environment",
      "Peace and strength",
    ],
    samagri: [
      "Maa Durga idol/image",
      "Kalash",
      "Flowers",
      "Fruits",
      "Coconut",
      "Diyas",
      "Kumkum",
      "Puja samagri",
    ],
    includes: [
      "Pandit Ji",
      "Navratri Puja",
      "Mantra recitation",
      "Aarti",
      "Puja guidance",
    ],
  },
  {
    id: 11,
    name: "Shiv Puja",
    price: 5100,
    duration: "1.5–2 hours",
    description:
      "A traditional worship of Lord Shiva performed with Abhishek, mantras, offerings, and devotional rituals.",
    benefits: [
      "Devotional worship of Lord Shiva",
      "Peace",
      "Spiritual purification",
      "Divine blessings",
    ],
    samagri: [
      "Shivling",
      "Milk",
      "Water",
      "Bilva leaves",
      "Flowers",
      "Fruits",
      "Panchamrit",
      "Puja samagri",
    ],
    includes: [
      "Pandit Ji",
      "Shiv Puja",
      "Abhishek",
      "Mantra recitation",
      "Aarti",
    ],
  },
  {
    id: 12,
    name: "Rudrabhishek",
    price: 5100,
    duration: "2–3 hours",
    description:
      "A sacred Rudrabhishek performed for Lord Shiva using traditional Abhishek rituals and Vedic mantras.",
    benefits: [
      "Spiritual purification",
      "Peace",
      "Devotional worship",
      "Positive spiritual environment",
    ],
    samagri: [
      "Shivling",
      "Milk",
      "Water",
      "Honey",
      "Curd",
      "Ghee",
      "Bilva leaves",
      "Flowers",
    ],
    includes: [
      "Pandit Ji",
      "Rudrabhishek",
      "Vedic Mantras",
      "Abhishek",
      "Aarti",
    ],
  },
  {
    id: 13,
    name: "Shivling Abhishek",
    price: 5100,
    duration: "1–1.5 hours",
    description:
      "A devotional Abhishek of the Shivling performed with sacred offerings and traditional Shiva mantras.",
    benefits: [
      "Devotional worship",
      "Peace",
      "Spiritual purification",
      "Divine blessings",
    ],
    samagri: [
      "Milk",
      "Water",
      "Bilva leaves",
      "Flowers",
      "Panchamrit",
      "Fruits",
      "Coconut",
      "Puja items",
    ],
    includes: [
      "Pandit Ji",
      "Shivling Abhishek",
      "Mantra recitation",
      "Aarti",
      "Puja guidance",
    ],
  },
  {
    id: 14,
    name: "Vastu Shanti Puja",
    price: 5100,
    duration: "2–3 hours",
    description:
      "A traditional Vastu Shanti Puja performed to worship Vastu Devata and create an auspicious spiritual environment in the home.",
    benefits: [
      "Vastu worship",
      "Peace and harmony",
      "Positive environment",
      "Traditional purification",
    ],
    samagri: [
      "Kalash",
      "Vastu Puja items",
      "Flowers",
      "Fruits",
      "Coconut",
      "Havan samagri",
      "Ghee",
      "Puja items",
    ],
    includes: [
      "Pandit Ji",
      "Vastu Shanti Puja",
      "Havan",
      "Mantra recitation",
      "Aarti",
    ],
  },
  {
    id: 15,
    name: "Navagraha Shanti",
    price: 5100,
    duration: "2–3 hours",
    description:
      "A traditional Navagraha Shanti Puja dedicated to the nine planetary deities through Vedic worship and mantra recitation.",
    benefits: [
      "Navagraha worship",
      "Spiritual peace",
      "Traditional Vedic rituals",
      "Positive environment",
    ],
    samagri: [
      "Navagraha Puja items",
      "Kalash",
      "Flowers",
      "Fruits",
      "Havan samagri",
      "Ghee",
      "Coconut",
      "Puja samagri",
    ],
    includes: [
      "Pandit Ji",
      "Navagraha Shanti Puja",
      "Mantra recitation",
      "Havan",
      "Aarti",
    ],
  },
];

function PujaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const puja = pujas.find(
    (item) => item.id === Number(id)
  );

  if (!puja) {
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
          <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
            <div className="text-6xl">🛕</div>

            <h1 className="mt-5 text-3xl font-bold text-gray-800">
              Puja Not Found
            </h1>

            <p className="mt-3 text-gray-600">
              The Puja you are looking for does not exist.
            </p>

            <Link
              to="/pujas"
              className="mt-6 inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
            >
              View All Pujas
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleBookNow = () => {
    navigate(`/booking/${puja.id}`);
  };

  return (
    <div className="min-h-screen bg-orange-50">
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

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6">
          <Link
            to="/pujas"
            className="text-sm font-semibold text-orange-600 hover:underline"
          >
            ← Back to Pujas
          </Link>
        </div>

        <section className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <div className="bg-gradient-to-r from-orange-700 to-orange-500 px-6 py-10 text-white md:px-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-4 text-6xl">🛕</div>

                <h1 className="text-4xl font-bold md:text-5xl">
                  {puja.name}
                </h1>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-orange-50">
                  {puja.description}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 text-center text-orange-800 shadow-lg md:min-w-[220px]">
                <p className="text-sm font-semibold text-gray-500">
                  Puja Price
                </p>

                <p className="mt-1 text-4xl font-bold">
                  ₹{puja.price}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Complete Puja
                </p>
              </div>
            </div>
          </div>

          <div className="grid border-b md:grid-cols-3">
            <div className="border-b p-6 text-center md:border-b-0 md:border-r">
              <p className="text-sm font-semibold text-gray-500">
                Duration
              </p>

              <p className="mt-2 text-lg font-bold text-gray-800">
                ⏱️ {puja.duration}
              </p>
            </div>

            <div className="border-b p-6 text-center md:border-b-0 md:border-r">
              <p className="text-sm font-semibold text-gray-500">
                Service
              </p>

              <p className="mt-2 text-lg font-bold text-gray-800">
                🪔 Traditional Puja
              </p>
            </div>

            <div className="p-6 text-center">
              <p className="text-sm font-semibold text-gray-500">
                Booking
              </p>

              <p className="mt-2 text-lg font-bold text-gray-800">
                📅 Online Booking
              </p>
            </div>
          </div>

          <div className="px-6 py-8 md:px-10">
            <h2 className="text-2xl font-bold text-orange-800">
              About This Puja
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              {puja.description}
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-2xl font-bold text-orange-800">
              🙏 Benefits
            </h2>

            <ul className="mt-5 space-y-3">
              {puja.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="mt-1 text-green-600">
                    ✓
                  </span>

                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-2xl font-bold text-orange-800">
              🪔 Samagri
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Common Puja items required for the ceremony.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {puja.samagri.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-orange-50 px-4 py-3 text-sm font-medium text-gray-700"
                >
                  • {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-md md:p-8">
          <h2 className="text-2xl font-bold text-orange-800">
            ✨ What's Included
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {puja.includes.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-orange-100 bg-orange-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 font-bold text-white">
                    ✓
                  </span>

                  <span className="font-semibold text-gray-800">
                    {item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-8 text-center shadow-lg md:p-10">
          <h2 className="text-3xl font-bold text-orange-800">
            Book {puja.name}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Select your preferred date and time and complete
            the booking process online.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={handleBookNow}
              className="w-full rounded-lg bg-orange-600 px-8 py-3 font-bold text-white shadow-md hover:bg-orange-700 sm:w-auto"
            >
              Book Now — ₹{puja.price}
            </button>

            <Link
              to="/pujas"
              className="w-full rounded-lg border border-orange-600 bg-white px-8 py-3 font-bold text-orange-600 hover:bg-orange-50 sm:w-auto"
            >
              View Other Pujas
            </Link>
          </div>
        </section>

        <div className="py-8 text-center text-sm text-gray-500">
          🛕 PujaBooking • Traditional Puja Services
        </div>
      </main>
    </div>
  );
}

export default PujaDetails;