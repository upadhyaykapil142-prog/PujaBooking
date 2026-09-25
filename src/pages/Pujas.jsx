import { Link } from "react-router-dom";

const IMAGE_BASE =
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/";

const deityImages = {
  // 🐘 Ganesh Puja
  ganesh:
    `${IMAGE_BASE}Ganesh%20Murti%20-%20Traditional%20Idol%20of%20Lord%20Ganesha%20011.jpg`,

  // 🪷 Satyanarayan Puja
  vishnu:
    `${IMAGE_BASE}Vishnu_statue.jpg`,

  // 🔱 Traditional Lord Shiva
  shiva:
    "https://staticimg.publishstory.co/thumb/126164486.cms?height=900&imgsize=2668962&resizemode=8&width=1200",

  // ☀️ Navagraha
  navagraha:
    `${IMAGE_BASE}Navagraha.jpg`,

  // 🚩 Hanuman Puja
  hanuman:
    `${IMAGE_BASE}A%20Hanuman%20sculpture%20in%20Singapore.jpg`,

  // 🌺 Maa Durga
  durga:
    `${IMAGE_BASE}Durga%20Puja%20Pandal%20-%20Biswamilani%20Club%20-%20Padmapukur%20Water%20Treatment%20Plant%20Road%20-%20Howrah%202013-10-14%203456.JPG`,

  // 🪷 Maa Lakshmi - Diwali Puja
  lakshmiGanesh:
    "https://img.haribhoomi.com/uploadimage/library/free_files/jpg/Mahala_2024_10_30_121027.jpg",

  // 🏠 Vastu Shanti
  vastu:
    `${IMAGE_BASE}Ganesh_statue_at_The_Shivogam_temple_01.jpg`,
};

const pujas = [
  {
    id: 1,
    number: "01",
    title: "Ganesh Puja",
    deity: "Lord Ganesha",
    deityKey: "ganesh",
    price: "₹5100",
    duration: "1.5–2 hours",
    description:
      "A traditional Ganesh Puja performed to seek Lord Ganesha's blessings for wisdom, prosperity, success, and removal of obstacles.",
    fallback: "🐘",
  },

  {
    id: 2,
    number: "02",
    title: "Satyanarayan Puja",
    deity: "Lord Vishnu",
    deityKey: "vishnu",
    price: "₹6100",
    duration: "2–3 hours",
    description:
      "A sacred Satyanarayan Puja performed for peace, prosperity, happiness, and fulfillment of wishes.",
    fallback: "🪷",
  },

  {
    id: 3,
    number: "03",
    title: "Griha Pravesh Puja",
    deity: "Lord Ganesha",
    deityKey: "ganesh",
    price: "₹5100",
    duration: "2–3 hours",
    description:
      "Traditional house-entry ceremony performed to bring positivity, peace, prosperity, and divine blessings to the new home.",
    fallback: "🏠",
  },

  {
    id: 4,
    number: "04",
    title: "Mahamrityunjaya Jaap",
    deity: "Lord Shiva",
    deityKey: "shiva",
    price: "₹5100",
    duration: "2–3 hours",
    description:
      "Powerful Vedic chanting dedicated to Lord Shiva for spiritual protection, peace, and well-being.",
    fallback: "🔱",
  },

  {
    id: 5,
    number: "05",
    title: "Maha Mrityunjaya Havan",
    deity: "Lord Shiva",
    deityKey: "shiva",
    price: "₹5100",
    duration: "2–3 hours",
    description:
      "Sacred Maha Mrityunjaya Havan performed with Vedic mantras and offerings for peace, protection, and positive energy.",
    fallback: "🔱",
  },

  {
    id: 6,
    number: "06",
    title: "Navagraha Havan",
    deity: "Navagraha",
    deityKey: "navagraha",
    price: "₹5100",
    duration: "2–3 hours",
    description:
      "A traditional Havan performed to seek blessings of the nine planetary deities and promote harmony and positivity.",
    fallback: "☀️",
  },

  {
    id: 7,
    number: "07",
    title: "Hanuman Puja",
    deity: "Lord Hanuman",
    deityKey: "hanuman",
    price: "₹5100",
    duration: "1.5–2 hours",
    description:
      "Devotional Hanuman Puja performed for strength, courage, protection, and removal of negative influences.",
    fallback: "🚩",
  },

  {
    id: 8,
    number: "08",
    title: "Diwali Puja",
    deity: "Maa Lakshmi",
    deityKey: "lakshmiGanesh",
    price: "₹7100",
    duration: "1.5–2 hours",
    description:
      "Special Diwali Lakshmi Puja performed to seek blessings for wealth, prosperity, happiness, and success.",
    fallback: "🪷",
  },

  {
    id: 9,
    number: "09",
    title: "Durga Puja",
    deity: "Maa Durga",
    deityKey: "durga",
    price: "₹5100",
    duration: "2–3 hours",
    description:
      "Traditional Durga Puja performed to seek the blessings of Maa Durga for strength, protection, peace, and prosperity.",
    fallback: "🌺",
  },

  {
    id: 10,
    number: "10",
    title: "Navratri Puja",
    deity: "Maa Durga",
    deityKey: "durga",
    price: "₹7100",
    duration: "2–3 hours",
    description:
      "Sacred Navratri Puja dedicated to Maa Durga and her divine forms for spiritual growth, protection, and prosperity.",
    fallback: "🌺",
  },

  {
    id: 11,
    number: "11",
    title: "Shiv Puja",
    deity: "Lord Shiva",
    deityKey: "shiva",
    price: "₹5100",
    duration: "1.5–2 hours",
    description:
      "Traditional Lord Shiva Puja performed for peace, spiritual strength, prosperity, and divine blessings.",
    fallback: "🔱",
  },

  {
    id: 12,
    number: "12",
    title: "Rudrabhishek",
    deity: "Lord Shiva",
    deityKey: "shiva",
    price: "₹5100",
    duration: "2–3 hours",
    description:
      "Sacred Rudrabhishek performed with Vedic mantras and Abhishek of Lord Shiva for peace, prosperity, and spiritual purification.",
    fallback: "🔱",
  },

  {
    id: 13,
    number: "13",
    title: "Shivling Abhishek",
    deity: "Lord Shiva",
    deityKey: "shiva",
    price: "₹5100",
    duration: "1.5–2 hours",
    description:
      "Traditional Shivling Abhishek performed with sacred offerings to seek Lord Shiva's blessings and inner peace.",
    fallback: "🔱",
  },

  {
    id: 14,
    number: "14",
    title: "Vastu Shanti Puja",
    deity: "Vastu Devata",
    deityKey: "vastu",
    price: "₹5100",
    duration: "2–3 hours",
    description:
      "Vastu Shanti Puja performed to create positive energy, peace, harmony, and balance within the home.",
    fallback: "🏠",
  },

  {
    id: 15,
    number: "15",
    title: "Navagraha Shanti",
    deity: "Navagraha",
    deityKey: "navagraha",
    price: "₹5100",
    duration: "2–3 hours",
    description:
      "Traditional Navagraha Shanti Puja performed for planetary harmony, peace, and removal of negative influences.",
    fallback: "☀️",
  },
];

function Pujas() {
  return (
    <div className="min-h-screen bg-[#160b06] text-white">

      <style>{`
        @keyframes deityGlow {
          0%, 100% {
            filter:
              drop-shadow(0 0 5px rgba(255, 183, 77, 0.35))
              drop-shadow(0 0 12px rgba(255, 152, 0, 0.20));
            transform: translateY(0) scale(1);
          }

          50% {
            filter:
              drop-shadow(0 0 10px rgba(255, 215, 120, 0.85))
              drop-shadow(0 0 24px rgba(255, 166, 0, 0.60));
            transform: translateY(-3px) scale(1.025);
          }
        }

        @keyframes cardGlow {
          0%, 100% {
            box-shadow:
              0 12px 35px rgba(0, 0, 0, 0.35),
              0 0 0 rgba(255, 180, 60, 0);
          }

          50% {
            box-shadow:
              0 16px 45px rgba(0, 0, 0, 0.48),
              0 0 24px rgba(255, 178, 61, 0.13);
          }
        }

        @keyframes sparkleFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.55;
          }

          50% {
            transform: translateY(-7px) scale(1.15);
            opacity: 1;
          }
        }

        @keyframes imageShimmer {
          0% {
            transform: translateX(-120%);
          }

          100% {
            transform: translateX(120%);
          }
        }

        .deity-image-glow {
          animation: deityGlow 3.5s ease-in-out infinite;
        }

        .puja-card-glow {
          animation: cardGlow 4s ease-in-out infinite;
        }

        .puja-card:hover .deity-image-glow {
          filter:
            drop-shadow(0 0 12px rgba(255, 215, 120, 1))
            drop-shadow(0 0 28px rgba(255, 166, 0, 0.75));
          transform: translateY(-7px) scale(1.06);
        }

        .puja-card:hover {
          transform: translateY(-7px);
          border-color: rgba(255, 196, 90, 0.80);
          background:
            linear-gradient(
              145deg,
              rgba(76, 36, 13, 0.98),
              rgba(39, 17, 8, 0.98)
            );
          box-shadow:
            0 20px 55px rgba(0, 0, 0, 0.60),
            0 0 30px rgba(255, 175, 55, 0.22);
        }

        .puja-card:active {
          transform: translateY(-1px) scale(0.985);
          border-color: rgba(255, 219, 140, 1);
          box-shadow:
            0 8px 25px rgba(0, 0, 0, 0.55),
            0 0 38px rgba(255, 190, 70, 0.42);
        }

        .sparkle {
          animation: sparkleFloat 2.8s ease-in-out infinite;
        }

        .image-shimmer {
          position: absolute;
          inset: 0;
          width: 45%;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.16),
              transparent
            );
          transform: translateX(-120%);
          animation: imageShimmer 5s ease-in-out infinite;
          pointer-events: none;
        }

        .traditional-image {
          transition:
            transform 0.45s ease,
            filter 0.45s ease;
        }

        .gold-text {
          background:
            linear-gradient(
              90deg,
              #fff0b3,
              #ffc34d,
              #fff0b3
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .puja-card {
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease,
            background 0.35s ease;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-orange-300/10 bg-[#1c0d07]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-yellow-400/30 bg-gradient-to-br from-yellow-300/20 to-orange-500/10 shadow-[0_0_20px_rgba(255,180,60,0.12)]">
              <span className="text-2xl text-yellow-300">
                ॐ
              </span>
            </div>

            <div>
              <div className="text-lg font-bold text-orange-100">
                PujaBooking
              </div>

              <div className="text-[10px] tracking-[0.25em] text-orange-300/60">
                TRADITIONAL PUJA SERVICES
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">

            <Link
              to="/"
              className="text-sm font-semibold text-orange-100/75 transition hover:text-yellow-300"
            >
              Home
            </Link>

            <Link
              to="/pujas"
              className="rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-300 shadow-[0_0_18px_rgba(255,190,60,0.10)]"
            >
              Pujas
            </Link>

            <Link
              to="/login"
              className="text-sm font-semibold text-orange-100/75 transition hover:text-yellow-300"
            >
              Login
            </Link>

          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section className="relative overflow-hidden px-6 pb-10 pt-16">

        <div className="pointer-events-none absolute left-[8%] top-12 text-2xl text-yellow-300/50 sparkle">
          ✦
        </div>

        <div
          className="pointer-events-none absolute right-[10%] top-20 text-xl text-orange-300/50 sparkle"
          style={{ animationDelay: "0.8s" }}
        >
          ✨
        </div>

        <div className="pointer-events-none absolute left-[20%] top-32 text-lg text-yellow-200/40 sparkle">
          🌸
        </div>

        <div
          className="pointer-events-none absolute right-[20%] top-36 text-lg text-orange-200/40 sparkle"
          style={{ animationDelay: "1.3s" }}
        >
          🌼
        </div>

        <div className="mx-auto max-w-5xl text-center">

          <div className="mb-5 text-5xl">
            🛕
          </div>

          <p className="mb-3 text-sm font-semibold tracking-[0.35em] text-yellow-400/80">
            ॐ श्री गणेशाय नमः
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            <span className="gold-text">
              Choose Your Puja
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-orange-100/65 sm:text-lg">
            Select a traditional Puja and book an experienced
            Pandit for your religious ceremony.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3 text-yellow-300/80">
            <span>🌸</span>
            <span>✦</span>
            <span>🌼</span>
            <span>✦</span>
            <span>🌸</span>
          </div>

        </div>
      </section>

      {/* PUJA GRID */}
      <main className="mx-auto max-w-7xl px-6 pb-20">

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

          {pujas.map((puja) => (

            <Link
              key={puja.id}
              to={`/puja/${puja.id}`}
              className="group block"
            >

              <article className="puja-card puja-card-glow relative h-full overflow-hidden rounded-3xl border border-orange-300/15 bg-gradient-to-br from-[#3a1b0d] to-[#211008]">

                {/* IMAGE AREA */}
                <div className="relative h-72 overflow-hidden bg-gradient-to-b from-[#4a2410] via-[#2d1309] to-[#160905]">

                  <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

                  <div className="absolute left-5 top-5 z-10 text-yellow-300/70 sparkle">
                    ✦
                  </div>

                  <div
                    className="absolute right-5 top-5 z-10 text-orange-200/60 sparkle"
                    style={{ animationDelay: "0.7s" }}
                  >
                    ✨
                  </div>

                  <div className="relative z-10 flex h-full items-center justify-center px-10 py-6">

                    <div className="relative h-full w-full max-w-[230px] overflow-hidden rounded-2xl">

                      <img
                        src={deityImages[puja.deityKey]}
                        alt={`${puja.deity} for ${puja.title}`}
                        className="traditional-image deity-image-glow h-full w-full object-cover object-center"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";

                          const fallback =
                            event.currentTarget.parentElement?.querySelector(
                              ".image-fallback"
                            );

                          if (fallback) {
                            fallback.style.display = "flex";
                          }
                        }}
                      />

                      <div className="image-fallback absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-orange-950 to-yellow-950">
                        <span className="text-7xl drop-shadow-[0_0_20px_rgba(255,200,80,0.8)]">
                          {puja.fallback}
                        </span>
                      </div>

                      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-yellow-300/25" />

                      <div className="image-shimmer" />

                    </div>

                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#211008] to-transparent" />

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <div className="flex items-center justify-between">

                    <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-[10px] font-black tracking-[0.22em] text-yellow-300">
                      PUJA {puja.number}
                    </span>

                    <span className="text-sm text-yellow-300/60">
                      ✦
                    </span>

                  </div>

                  <p className="mt-4 text-sm font-semibold text-orange-300/80">
                    {puja.deity}
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-orange-50 transition group-hover:text-yellow-200">
                    {puja.title}
                  </h2>

                  <p className="mt-4 min-h-[88px] text-sm leading-6 text-orange-100/60">
                    {puja.description}
                  </p>

                  <div className="my-5 h-px bg-gradient-to-r from-transparent via-orange-300/20 to-transparent" />

                  <div className="grid grid-cols-2 gap-4">

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-300/50">
                        Starting Price
                      </p>

                      <p className="mt-1 text-xl font-black text-yellow-300">
                        {puja.price}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-300/50">
                        Duration
                      </p>

                      <p className="mt-1 text-sm font-bold text-orange-100/80">
                        ⏱️ {puja.duration}
                      </p>
                    </div>

                  </div>

                  <div className="mt-6 flex items-center justify-between rounded-xl border border-yellow-400/15 bg-yellow-400/5 px-4 py-3 transition group-hover:border-yellow-300/40 group-hover:bg-yellow-300/10">

                    <span className="text-sm font-bold text-yellow-300">
                      View Puja Details
                    </span>

                    <span className="text-lg text-yellow-300 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>

                  </div>

                </div>

              </article>

            </Link>

          ))}

        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-orange-300/10 bg-[#110804] px-6 py-10">

        <div className="mx-auto max-w-7xl text-center">

          <div className="text-3xl text-yellow-300">
            🌸 ॐ 🌸
          </div>

          <h3 className="mt-3 text-xl font-bold text-orange-100">
            PujaBooking
          </h3>

          <p className="mt-2 text-sm text-orange-200/50">
            Traditional Puja Services
          </p>

          <p className="mt-3 text-sm font-semibold text-orange-300/70">
            Pandit Ji — Kishan Upadhyay
          </p>

          <p className="mt-5 text-xs text-orange-200/35">
            © 2026 PujaBooking. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Pujas;