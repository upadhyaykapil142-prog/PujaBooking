import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />

      <main className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-6">
        <h1 className="text-5xl font-bold text-orange-800 text-center">
          Book Your Puja Online
        </h1>

        <p className="mt-4 text-lg text-gray-600 text-center">
          Book trusted Pandits for your Puja and religious ceremonies.
        </p>

        <a
          href="/pujas"
          className="mt-8 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
        >
          Explore Pujas
        </a>
      </main>
    </div>
  );
}

export default Home;