import { Link } from "react-router-dom";

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

function Pujas() {
  return (
    <div className="min-h-screen bg-orange-50 px-6 py-12">
      {/* Header */}
      <div className="mx-auto max-w-4xl text-center">
        <div className="text-5xl">🛕</div>

        <h1 className="mt-4 text-4xl font-bold text-orange-800">
          Available Pujas
        </h1>

        <p className="mt-3 text-lg text-gray-600">
          Choose a Puja and book your preferred date and time.
        </p>
      </div>

      {/* Puja Cards */}
      <div className="mx-auto mt-12 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pujas.map((puja) => (
          <div
            key={puja.id}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Icon */}
            <div className="text-4xl">🛕</div>

            {/* Name */}
            <h2 className="mt-4 text-xl font-bold text-gray-800">
              {puja.name}
            </h2>

            {/* Description */}
            <p className="mt-3 flex-grow text-sm leading-6 text-gray-600">
              {puja.description}
            </p>

            {/* Price */}
            <div className="mt-5">
              <span className="text-sm text-gray-500">
                Starting from
              </span>

              <p className="text-2xl font-bold text-orange-600">
                ₹{puja.price}
              </p>
            </div>

            {/* Book Button */}
            <Link
              to={`/booking/${puja.id}`}
              className="mt-5 w-full rounded-lg bg-orange-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-orange-700"
            >
              Book Puja
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pujas;