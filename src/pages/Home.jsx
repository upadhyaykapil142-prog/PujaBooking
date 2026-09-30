import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000";

const fallingDecorations = [
  {
    symbol: "🌸",
    left: "3%",
    delay: "0s",
    duration: "9s",
    size: "24px",
  },
  {
    symbol: "🌼",
    left: "10%",
    delay: "2s",
    duration: "11s",
    size: "20px",
  },
  {
    symbol: "✨",
    left: "18%",
    delay: "4s",
    duration: "8s",
    size: "18px",
  },
  {
    symbol: "🌺",
    left: "27%",
    delay: "1s",
    duration: "10s",
    size: "23px",
  },
  {
    symbol: "✨",
    left: "36%",
    delay: "5s",
    duration: "9s",
    size: "17px",
  },
  {
    symbol: "🌸",
    left: "45%",
    delay: "3s",
    duration: "12s",
    size: "22px",
  },
  {
    symbol: "✨",
    left: "54%",
    delay: "6s",
    duration: "8s",
    size: "18px",
  },
  {
    symbol: "🌼",
    left: "63%",
    delay: "2s",
    duration: "10s",
    size: "22px",
  },
  {
    symbol: "🌺",
    left: "72%",
    delay: "5s",
    duration: "11s",
    size: "24px",
  },
  {
    symbol: "✨",
    left: "81%",
    delay: "1s",
    duration: "9s",
    size: "17px",
  },
  {
    symbol: "🌸",
    left: "90%",
    delay: "4s",
    duration: "10s",
    size: "23px",
  },
  {
    symbol: "✨",
    left: "97%",
    delay: "7s",
    duration: "8s",
    size: "18px",
  },
];

function Home() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      setLoadingUser(true);

      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Check user error:", error);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUser(null);
    window.location.href = "/";
  };

  if (loadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2b0d05]">
        <div className="text-center">
          <div className="text-6xl">🛕</div>

          <p className="mt-5 font-semibold text-amber-200">
            Loading PujaBooking...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#2b0d05] text-[#fff7df]">

      <style>
        {`
          /* =====================================================
             FLOWERS FALLING
          ====================================================== */

          @keyframes flowerFall {
            0% {
              transform: translateY(-120px) rotate(0deg);
              opacity: 0;
            }

            10% {
              opacity: 1;
            }

            50% {
              transform: translateY(50vh) rotate(180deg);
            }

            100% {
              transform: translateY(110vh) rotate(360deg);
              opacity: 0;
            }
          }


          /* =====================================================
             SPARKLE
          ====================================================== */

          @keyframes sparkle {
            0%,
            100% {
              opacity: 0.3;
              transform: scale(0.8);
            }

            50% {
              opacity: 1;
              transform: scale(1.35);
            }
          }


          /* =====================================================
             MAIN OM GLOW
          ====================================================== */

          @keyframes omGlow {
            0%,
            100% {
              opacity: 0.9;

              text-shadow:
                0 0 8px rgba(255, 190, 50, 0.55),
                0 0 20px rgba(255, 150, 20, 0.35),
                0 0 35px rgba(255, 120, 0, 0.15);
            }

            50% {
              opacity: 1;

              text-shadow:
                0 0 10px rgba(255, 225, 130, 0.95),
                0 0 25px rgba(255, 180, 30, 0.75),
                0 0 45px rgba(255, 120, 0, 0.4);
            }
          }


          /* =====================================================
             MANTRA GLOW
          ====================================================== */

          @keyframes mantraGlow {
            0%,
            100% {
              opacity: 0.9;

              text-shadow:
                0 0 6px rgba(255, 190, 50, 0.4),
                0 0 14px rgba(255, 150, 20, 0.25);
            }

            50% {
              opacity: 1;

              text-shadow:
                0 0 10px rgba(255, 235, 150, 0.95),
                0 0 24px rgba(255, 180, 30, 0.65),
                0 0 38px rgba(255, 110, 0, 0.35);
            }
          }


          /* =====================================================
             FULL TRISHUL
          ====================================================== */

          @keyframes fullTrishulGlow {
            0%,
            100% {
              opacity: 0.6;

              transform:
                translateY(0)
                scale(0.96);

              filter:
                drop-shadow(
                  0 0 5px rgba(255, 200, 60, 0.55)
                )
                drop-shadow(
                  0 0 14px rgba(255, 150, 20, 0.35)
                );
            }

            50% {
              opacity: 1;

              transform:
                translateY(-7px)
                scale(1.08);

              filter:
                drop-shadow(
                  0 0 9px rgba(255, 250, 190, 1)
                )
                drop-shadow(
                  0 0 20px rgba(255, 215, 80, 1)
                )
                drop-shadow(
                  0 0 35px rgba(255, 160, 20, 0.9)
                )
                drop-shadow(
                  0 0 50px rgba(255, 100, 0, 0.5)
                );
            }
          }


          .trishul-full-glow {
            animation:
              fullTrishulGlow
              3s
              ease-in-out
              infinite;

            will-change:
              transform,
              opacity,
              filter;
          }


          .trishul-full-glow-delay {
            animation:
              fullTrishulGlow
              3s
              ease-in-out
              infinite;

            animation-delay: 1.5s;

            will-change:
              transform,
              opacity,
              filter;
          }


          /* =====================================================
             TRADITIONAL LIGHT
          ====================================================== */

          @keyframes traditionalLight {
            0%,
            100% {
              opacity: 0.65;

              filter:
                drop-shadow(
                  0 0 4px rgba(255, 180, 40, 0.4)
                )
                drop-shadow(
                  0 0 10px rgba(255, 140, 20, 0.2)
                );
            }

            50% {
              opacity: 1;

              filter:
                drop-shadow(
                  0 0 8px rgba(255, 235, 150, 1)
                )
                drop-shadow(
                  0 0 18px rgba(255, 190, 40, 0.9)
                )
                drop-shadow(
                  0 0 30px rgba(255, 120, 0, 0.45)
                );
            }
          }


          .traditional-light {
            animation:
              traditionalLight
              2.5s
              ease-in-out
              infinite;
          }


          /* =====================================================
             SERVICE OM
          ====================================================== */

          @keyframes serviceOmGlow {
            0%,
            100% {
              opacity: 0.7;

              text-shadow:
                0 0 5px rgba(255, 190, 40, 0.5),
                0 0 12px rgba(255, 140, 20, 0.3);
            }

            50% {
              opacity: 1;

              text-shadow:
                0 0 8px rgba(255, 245, 180, 1),
                0 0 18px rgba(255, 215, 80, 1),
                0 0 32px rgba(255, 160, 20, 0.85),
                0 0 45px rgba(255, 100, 0, 0.45);
            }
          }


          .service-om-glow {
            animation:
              serviceOmGlow
              2.8s
              ease-in-out
              infinite;
          }


          /* =====================================================
             PANDIT JI HANDS GLOW
          ====================================================== */

          @keyframes panditHandsGlow {
            0%,
            100% {
              transform: scale(0.96);

              opacity: 0.75;

              filter:
                drop-shadow(
                  0 0 5px rgba(255, 190, 40, 0.45)
                )
                drop-shadow(
                  0 0 12px rgba(255, 140, 20, 0.25)
                );
            }

            50% {
              transform: scale(1.08);

              opacity: 1;

              filter:
                drop-shadow(
                  0 0 7px rgba(255, 245, 190, 1)
                )
                drop-shadow(
                  0 0 16px rgba(255, 215, 80, 1)
                )
                drop-shadow(
                  0 0 28px rgba(255, 160, 20, 0.8)
                )
                drop-shadow(
                  0 0 40px rgba(255, 100, 0, 0.4)
                );
            }
          }


          .pandit-hands-glow {
            animation:
              panditHandsGlow
              2.7s
              ease-in-out
              infinite;
          }


          /* =====================================================
             BOOKING ICON GLOW
          ====================================================== */

          @keyframes bookingIconGlow {
            0%,
            100% {
              transform: scale(0.96);

              filter:
                drop-shadow(
                  0 0 5px rgba(255, 180, 20, 0.45)
                )
                drop-shadow(
                  0 0 12px rgba(255, 130, 0, 0.2)
                );
            }

            50% {
              transform: scale(1.08);

              filter:
                drop-shadow(
                  0 0 8px rgba(255, 240, 160, 1)
                )
                drop-shadow(
                  0 0 18px rgba(255, 200, 40, 0.95)
                )
                drop-shadow(
                  0 0 32px rgba(255, 130, 0, 0.55)
                );
            }
          }


          .booking-icon-glow {
            animation:
              bookingIconGlow
              2.5s
              ease-in-out
              infinite;
          }


          /* =====================================================
             PANDIT CARD GLOW
          ====================================================== */

          @keyframes panditGlow {
            0%,
            100% {
              box-shadow:
                0 0 18px rgba(255, 170, 30, 0.18);
            }

            50% {
              box-shadow:
                0 0 35px rgba(255, 180, 40, 0.38);
            }
          }


          .pandit-glow {
            animation:
              panditGlow
              3s
              ease-in-out
              infinite;
          }


          /* =====================================================
             DIYA GLOW
          ====================================================== */

          @keyframes diyaGlow {
            0%,
            100% {
              filter:
                drop-shadow(
                  0 0 4px rgba(255, 180, 0, 0.4)
                );
            }

            50% {
              filter:
                drop-shadow(
                  0 0 10px rgba(255, 200, 0, 0.9)
                )
                drop-shadow(
                  0 0 20px rgba(255, 120, 0, 0.5)
                );
            }
          }


          .diya-glow {
            animation:
              diyaGlow
              2.5s
              ease-in-out
              infinite;
          }


          /* =====================================================
             TRADITIONAL CARD
          ====================================================== */

          .traditional-card {
            position: relative;
          }


          .traditional-card::before {
            content: "";

            position: absolute;

            top: 0;
            left: 50%;

            width: 65%;
            height: 1px;

            transform: translateX(-50%);

            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(255, 220, 120, 0.9),
                transparent
              );

            box-shadow:
              0 0 10px rgba(255, 190, 40, 0.6),
              0 0 20px rgba(255, 140, 20, 0.3);
          }


          .traditional-card::after {
            content: "";

            position: absolute;

            inset: 8px;

            pointer-events: none;

            border-radius: 1.7rem;

            border:
              1px solid
              rgba(255, 200, 80, 0.08);
          }


          /* =====================================================
             FALLING DECORATION
          ====================================================== */

          .falling-decoration {
            position: fixed;
            top: -80px;

            pointer-events: none;

            z-index: 50;

            animation-name: flowerFall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }


          /* =====================================================
             SPARKLE CLASS
          ====================================================== */

          .sparkle {
            animation:
              sparkle
              2s
              ease-in-out
              infinite;
          }


          /* =====================================================
             MAIN ANIMATION CLASSES
          ====================================================== */

          .om-glow {
            animation:
              omGlow
              3s
              ease-in-out
              infinite;
          }


          .mantra-glow {
            animation:
              mantraGlow
              3s
              ease-in-out
              infinite;
          }


          /* =====================================================
             ACCESSIBILITY
          ====================================================== */

          @media (prefers-reduced-motion: reduce) {
            .falling-decoration,
            .sparkle,
            .om-glow,
            .mantra-glow,
            .trishul-full-glow,
            .trishul-full-glow-delay,
            .traditional-light,
            .service-om-glow,
            .pandit-hands-glow,
            .booking-icon-glow,
            .pandit-glow,
            .diya-glow {
              animation: none;
            }
          }


          /* =====================================================
             RESPONSIVE ADDITIONS
             Existing JSX, content, API logic, routes and design
             are preserved. These rules only improve fitting on
             phones and tablets.
          ====================================================== */

          html,
          body {
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
          }

          #root {
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
          }

          @media (max-width: 640px) {
            nav > div {
              width: 100%;
              padding-left: 1rem !important;
              padding-right: 1rem !important;
              padding-top: 0.75rem !important;
              padding-bottom: 0.75rem !important;
              gap: 0.75rem !important;
            }

            nav > div > a:first-child {
              width: 100%;
              text-align: center;
              font-size: 1.25rem !important;
            }

            nav > div > div {
              width: 100%;
              justify-content: center;
              gap: 0.75rem !important;
              font-size: 0.875rem !important;
            }

            nav > div > div a,
            nav > div > div button {
              white-space: nowrap;
            }

            nav + section > div {
              padding-left: 0.75rem !important;
              padding-right: 0.75rem !important;
              padding-top: 1.5rem !important;
              padding-bottom: 2.5rem !important;
            }

            nav + section > div > div:first-child > div:last-child {
              gap: 0.5rem !important;
              max-width: 100%;
            }

            nav + section > div > div:first-child > div:last-child > div {
              flex-shrink: 1;
              min-width: 0;
            }

            nav + section > div > div:first-child > div:last-child > div:nth-child(2) span {
              font-size: clamp(4.75rem, 25vw, 6.25rem) !important;
            }

            nav + section > div > div:first-child > div:last-child > div:nth-child(2) > div {
              width: clamp(5rem, 23vw, 8rem) !important;
              height: clamp(5rem, 23vw, 8rem) !important;
            }

            nav + section h1 {
              font-size: clamp(2rem, 10vw, 3rem) !important;
              line-height: 1.1 !important;
              overflow-wrap: anywhere;
            }

            nav + section h1 + p {
              font-size: clamp(0.95rem, 4vw, 1.25rem) !important;
              letter-spacing: 0.12em !important;
              line-height: 1.6 !important;
            }

            nav + section h2 {
              max-width: 100%;
            }

            nav + section > div > div:nth-of-type(4) {
              width: 100%;
            }

            nav + section > div > div:nth-of-type(4) > div {
              max-width: 100%;
              padding-left: 1rem !important;
              padding-right: 1rem !important;
              border-radius: 1rem !important;
            }

            nav + section > div > div:nth-of-type(4) h2 {
              font-size: 1rem !important;
              line-height: 1.5 !important;
              overflow-wrap: anywhere;
            }

            nav + section img {
              max-width: 100%;
              height: auto;
            }

            nav + section > div > div:nth-of-type(6) > div {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }

            nav + section > div > div:nth-of-type(6) h2 {
              font-size: clamp(1.6rem, 7vw, 2.25rem) !important;
              overflow-wrap: anywhere;
            }

            nav + section a[class*="rounded-full"] {
              max-width: 100%;
              white-space: normal;
              text-align: center;
            }

            nav ~ section {
              min-width: 0;
            }

            nav ~ section > div {
              min-width: 0;
              max-width: 100%;
            }

            nav ~ section h2,
            nav ~ section h3,
            nav ~ section p {
              overflow-wrap: anywhere;
            }

            nav ~ section h2[class*="whitespace-nowrap"] {
              white-space: normal !important;
              line-height: 1.25 !important;
            }

            nav ~ section a,
            nav ~ section button {
              max-width: 100%;
            }

            footer {
              min-width: 0;
            }

            footer p,
            footer a {
              overflow-wrap: anywhere;
            }
          }

          @media (max-width: 400px) {
            nav > div > div {
              gap: 0.5rem !important;
            }

            nav > div > div a,
            nav > div > div button {
              font-size: 0.8rem !important;
            }

            nav + section > div > div:first-child > div:last-child {
              gap: 0.25rem !important;
            }

            nav + section > div > div:first-child > div:last-child > div:first-child > div,
            nav + section > div > div:first-child > div:last-child > div:last-child > div {
              font-size: 1.25rem !important;
            }

            nav + section > div > div:nth-of-type(3) {
              font-size: 0.9rem;
            }

            nav + section > div > div:nth-of-type(4) > div {
              padding-top: 0.75rem !important;
              padding-bottom: 0.75rem !important;
            }
          }

          @media (min-width: 641px) and (max-width: 1024px) {
            nav > div {
              padding-left: 1.5rem !important;
              padding-right: 1.5rem !important;
            }

            nav + section > div {
              padding-left: 1.5rem !important;
              padding-right: 1.5rem !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              scroll-behavior: auto !important;
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>


      {/* =====================================================
          FALLING DECORATIONS
      ====================================================== */}

      {fallingDecorations.map((item, index) => (
        <div
          key={index}
          className="falling-decoration"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size,
          }}
        >
          {item.symbol}
        </div>
      ))}


      {/* =====================================================
          TOP MANTRA
      ====================================================== */}

      <div className="relative z-30 border-b border-amber-400/30 bg-[#3a1006]/95">

        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-4">

          <div className="relative text-center">

            <div className="absolute inset-0 blur-xl">
              <span className="text-2xl font-bold text-amber-500 opacity-50 sm:text-4xl">
                ॐ गणपते नमः
              </span>
            </div>

            <div className="mantra-glow relative whitespace-nowrap font-serif text-xl font-bold tracking-wide text-yellow-100 sm:text-3xl">
              ॐ गणपते नमः
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="relative z-30 border-b border-amber-400/20 bg-[#250b04]/95 backdrop-blur-md">

        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">

          <Link
            to="/"
            className="text-xl font-bold text-amber-300 sm:text-2xl"
          >
            🛕 PujaBooking
          </Link>


          <div className="flex flex-wrap items-center gap-5 text-sm font-semibold sm:gap-8 sm:text-base">

            <Link
              to="/"
              className="text-amber-300 transition hover:text-yellow-200"
            >
              Home
            </Link>

            <Link
              to="/pujas"
              className="transition hover:text-amber-300"
            >
              Pujas
            </Link>

            {user && (
              <Link
                to="/my-bookings"
                className="transition hover:text-amber-300"
              >
                My Bookings
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="rounded-full border border-red-400/60 px-4 py-2 text-red-200 transition hover:bg-red-600 hover:text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-full border border-amber-400/50 px-4 py-2 text-amber-200 transition hover:bg-amber-500 hover:text-white"
              >
                Login
              </Link>
            )}

          </div>

        </div>

      </nav>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,177,0,0.22),_transparent_58%)]" />


        <div className="relative mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-16">


          {/* =================================================
              FULL TRISHUL + SHUBH + OM + LABH
          ================================================== */}

          <div className="relative flex items-center justify-center">


            {/* LEFT FULL TRISHUL */}

            <div className="pointer-events-none absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block xl:left-16">

              <div className="trishul-full-glow flex flex-col items-center">

                <div className="text-6xl text-amber-300 xl:text-7xl">
                  🔱
                </div>


              </div>

            </div>


            {/* RIGHT FULL TRISHUL */}

            <div className="pointer-events-none absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block xl:right-16">

              <div className="trishul-full-glow-delay flex flex-col items-center">

                <div className="text-6xl text-amber-300 xl:text-7xl">
                  🔱
                </div>


              </div>

            </div>


            {/* SHUBH - OM - LABH */}

            <div className="flex items-center justify-center gap-5 sm:gap-16 md:gap-28 lg:gap-40">


              {/* SHUBH */}

              <div className="text-center">

                <div className="font-serif text-2xl font-bold tracking-wide text-amber-300 sm:text-4xl">
                  शुभ
                </div>

                <div className="mx-auto mt-2 h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent sm:w-20" />

              </div>


              {/* MAIN OM */}

              <div className="relative flex items-center justify-center">

                <div className="absolute h-32 w-32 rounded-full bg-amber-500/20 blur-3xl sm:h-48 sm:w-48" />

                <span
                  className="
                    om-glow
                    relative
                    select-none
                    font-serif
                    text-[100px]
                    font-semibold
                    leading-none
                    text-transparent
                    bg-gradient-to-b
                    from-yellow-100
                    via-amber-300
                    to-orange-500
                    bg-clip-text
                    sm:text-[145px]
                  "
                >
                  ॐ
                </span>

              </div>


              {/* LABH */}

              <div className="text-center">

                <div className="font-serif text-2xl font-bold tracking-wide text-amber-300 sm:text-4xl">
                  लाभ
                </div>

                <div className="mx-auto mt-2 h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent sm:w-20" />

              </div>

            </div>

          </div>


          {/* FLOWERS */}

          <div className="mt-2 text-center text-xl tracking-[0.4em] text-pink-200">
            🌸 🌼 🌸
          </div>


          {/* BRAND */}

          <h1 className="mt-6 text-center text-4xl font-extrabold tracking-wide text-amber-300 drop-shadow-lg sm:text-6xl">
            🛕 PujaBooking 🛕
          </h1>


          <p className="mt-4 text-center text-lg font-semibold tracking-[0.2em] text-amber-100 sm:text-2xl">
            परंपरा • श्रद्धा • संस्कार
          </p>


          {/* BOOKING MESSAGE */}

          <div className="mx-auto mt-8 max-w-3xl text-center">

            <div className="inline-flex rounded-full border border-amber-400/70 bg-gradient-to-r from-red-900 via-orange-700 to-red-900 px-6 py-3 shadow-[0_0_30px_rgba(255,145,0,0.3)] sm:px-10 sm:py-4">

              <h2 className="text-lg font-bold text-white sm:text-2xl">
                🙏 Book Traditional Puja Services 🙏
              </h2>

            </div>


            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-orange-100 sm:text-lg">
              Book authentic Vedic Puja services with experienced
              Pandit Ji from the comfort of your home.
            </p>

          </div>


          {/* =================================================
              MAHADEV IMAGE
          ================================================== */}

          <div className="relative mx-auto mt-10 max-w-5xl">

            <div className="absolute inset-0 rounded-[2rem] bg-orange-500/20 blur-3xl" />


            <div className="relative overflow-hidden rounded-[2rem] border border-amber-400/60 bg-[#180704] p-2 shadow-[0_0_60px_rgba(255,150,0,0.35)] sm:p-3">

              <img
                src="/mahadev-home.png"
                alt="Lord Shiva devotional PujaBooking artwork"
                className="h-auto w-full rounded-[1.5rem] object-cover"
              />

            </div>


            {/* SMALL OM */}

            <div className="absolute left-3 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/50 bg-[#3b1007]/90 shadow-lg backdrop-blur sm:left-6 sm:top-6 sm:h-16 sm:w-16">

              <span className="font-serif text-3xl font-bold text-amber-300 sm:text-4xl">
                ॐ
              </span>

            </div>


            {/* DIYA */}

            <div className="absolute right-3 top-4 text-3xl sm:right-6 sm:top-6 sm:text-4xl">
              🪔
            </div>

          </div>


          {/* =================================================
              PANDIT JI
          ================================================== */}

          <div className="mx-auto mt-8 max-w-xl text-center">

            <div className="pandit-glow rounded-2xl border border-amber-400/40 bg-gradient-to-r from-[#3d1007] via-[#5a1909] to-[#3d1007] px-6 py-5">

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Pandit Ji
              </p>


              <h2 className="mt-2 font-serif text-3xl font-bold text-yellow-100 sm:text-4xl">
                Kishan Upadhyay
              </h2>


              <div className="mx-auto mt-3 flex items-center justify-center gap-3">

                <span className="h-px w-12 bg-amber-400/50" />

                <span className="font-serif text-xl text-amber-300">
                  ॐ
                </span>

                <span className="h-px w-12 bg-amber-400/50" />

              </div>


              <p className="mt-2 text-sm text-orange-100">
                Traditional Puja • Vedic Rituals • Mantra & Havan
              </p>

            </div>

          </div>


          {/* EXPLORE PUJAS */}

          <div className="mt-8 text-center">

            <Link
              to="/pujas"
              className="inline-flex items-center gap-3 rounded-full border-2 border-yellow-300 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 px-8 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(255,166,0,0.45)] transition hover:scale-105 hover:shadow-[0_0_45px_rgba(255,190,0,0.7)] sm:px-12"
            >
              Explore Pujas
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          SACRED PUJA SERVICES
      ====================================================== */}

      <section className="relative overflow-hidden border-y border-amber-400/30 bg-gradient-to-b from-[#431306] via-[#5a1b08] to-[#351006] px-6 py-16">


        {/* Background Golden Lights */}

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[100px]" />

        <div className="pointer-events-none absolute left-10 top-20 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="pointer-events-none absolute bottom-20 right-10 h-32 w-32 rounded-full bg-yellow-500/10 blur-3xl" />


        <div className="relative mx-auto max-w-6xl">


          {/* =================================================
              TRADITIONAL HEADING
          ================================================== */}

          <div className="text-center">

            <div className="flex items-center justify-center gap-4 sm:gap-5">


              <span className="traditional-light text-3xl">
                🪔
              </span>


              <div className="h-px w-10 bg-gradient-to-r from-transparent via-amber-300 to-amber-500 sm:w-28" />


              <div className="relative">

                <div className="absolute inset-0 blur-lg">

                  <span className="text-amber-400 opacity-50">
                    Sacred Puja Services
                  </span>

                </div>


                <h2 className="relative whitespace-nowrap font-serif text-2xl font-bold tracking-wide text-yellow-100 sm:text-4xl">
                  Sacred Puja Services
                </h2>

              </div>


              <div className="h-px w-10 bg-gradient-to-l from-transparent via-amber-300 to-amber-500 sm:w-28" />


              <span className="traditional-light text-3xl">
                🪔
              </span>

            </div>


            {/* Decorative Om */}

            <div className="service-om-glow mt-4 font-serif text-3xl font-bold text-amber-300">
              ॐ
            </div>


            <p className="mx-auto mt-4 max-w-2xl font-serif text-base leading-7 text-orange-100 sm:text-lg">
              Traditional rituals, experienced Pandit Ji and convenient
              online booking.
            </p>

          </div>


          {/* =================================================
              SERVICE CARDS
          ================================================== */}

          <div className="mt-12 grid gap-7 md:grid-cols-3">


            {/* =================================================
                VEDIC CARD
            ================================================== */}

            <div className="traditional-card group relative overflow-hidden rounded-[2rem] border border-amber-400/50 bg-gradient-to-b from-[#651d09] via-[#4b1307] to-[#300b04] p-8 text-center shadow-[0_0_30px_rgba(255,160,30,0.12)] transition duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-[0_0_45px_rgba(255,180,40,0.35)]">


              <div className="mx-auto flex items-center justify-center gap-3">

                <span className="h-px w-10 bg-amber-400/50" />

                <span className="text-amber-300">
                  ✦
                </span>

                <span className="h-px w-10 bg-amber-400/50" />

              </div>


              <div className="service-om-glow mt-6 font-serif text-7xl font-bold text-amber-300">
                ॐ
              </div>


              <h3 className="mt-5 font-serif text-2xl font-bold text-yellow-100">
                Vedic Puja
              </h3>


              <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />


              <p className="mt-5 text-sm leading-7 text-orange-100">
                Authentic Vedic rituals, sacred mantras and traditional
                Puja vidhi performed according to Sanatan traditions.
              </p>


              <div className="mt-6 text-amber-400/80">
                ✦ ॐ ✦
              </div>

            </div>


            {/* =================================================
                PANDIT JI CARD
            ================================================== */}

            <div className="traditional-card group relative overflow-hidden rounded-[2rem] border border-amber-400/50 bg-gradient-to-b from-[#651d09] via-[#4b1307] to-[#300b04] p-8 text-center shadow-[0_0_30px_rgba(255,160,30,0.12)] transition duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-[0_0_45px_rgba(255,180,40,0.35)]">


              <div className="mx-auto flex items-center justify-center gap-3">

                <span className="h-px w-10 bg-amber-400/50" />

                <span className="text-amber-300">
                  ✦
                </span>

                <span className="h-px w-10 bg-amber-400/50" />

              </div>


              {/* Hands Glow */}

              <div className="pandit-hands-glow mt-6 inline-block text-7xl">
                🙏
              </div>


              <h3 className="mt-5 font-serif text-2xl font-bold text-yellow-100">
                Pandit Ji
              </h3>


              <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />


              <h4 className="mt-5 font-serif text-xl font-bold text-amber-300">
                Kishan Upadhyay
              </h4>


              <p className="mt-3 text-sm leading-7 text-orange-100">
                Traditional Puja, Vedic rituals, Mantra, Havan and
                sacred ceremonies performed with devotion.
              </p>


              <div className="mt-6 text-amber-400/80">
                ✦ 🙏 ✦
              </div>

            </div>


            {/* =================================================
                EASY BOOKING CARD
            ================================================== */}

            <div className="traditional-card group relative overflow-hidden rounded-[2rem] border border-amber-400/50 bg-gradient-to-b from-[#651d09] via-[#4b1307] to-[#300b04] p-8 text-center shadow-[0_0_30px_rgba(255,160,30,0.12)] transition duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-[0_0_45px_rgba(255,180,40,0.35)]">


              <div className="mx-auto flex items-center justify-center gap-3">

                <span className="h-px w-10 bg-amber-400/50" />

                <span className="text-amber-300">
                  ✦
                </span>

                <span className="h-px w-10 bg-amber-400/50" />

              </div>


              <div className="booking-icon-glow mt-6 text-7xl">
                🪔
              </div>


              <h3 className="mt-5 font-serif text-2xl font-bold text-yellow-100">
                Easy Booking
              </h3>


              <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />


              <p className="mt-5 text-sm leading-7 text-orange-100">
                Select your Puja, choose a suitable date and time,
                provide Yajman details and complete your booking easily.
              </p>


              <div className="mt-6 text-amber-400/80">
                ✦ 🪔 ✦
              </div>

            </div>

          </div>


          {/* =================================================
              BOTTOM DECORATION
          ================================================== */}

          <div className="mt-10 flex items-center justify-center gap-4">

            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400/60 sm:w-32" />

            <span className="text-xl text-amber-300">
              🌸
            </span>

            <span className="font-serif text-2xl font-bold text-amber-300">
              ॐ
            </span>

            <span className="text-xl text-amber-300">
              🌸
            </span>

            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400/60 sm:w-32" />

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY PUJABOOKING
      ====================================================== */}

      <section className="bg-[#f8e7bc] px-6 py-16 text-[#5b1708]">

        <div className="mx-auto max-w-6xl rounded-[2rem] border-4 border-[#b97816] bg-[#fff4d6] p-8 shadow-2xl sm:p-12">


          <div className="text-center">

            <p className="text-sm font-bold tracking-[0.3em] text-[#a33a12]">
              WHY PUJABOOKING
            </p>


            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Simple & Traditional
            </h2>


            <p className="mx-auto mt-4 max-w-2xl text-[#7a4327]">
              Everything you need to book your Puja conveniently online.
            </p>

          </div>


          <div className="mt-12 grid gap-10 md:grid-cols-3">


            <div className="text-center">

              <div className="text-5xl">
                📅
              </div>

              <h3 className="mt-4 text-xl font-bold">
                Easy Booking
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#7a4327]">
                Choose your Puja, date and preferred time in a few
                simple steps.
              </p>

            </div>


            <div className="text-center">

              <div className="text-5xl">
                🙏
              </div>

              <h3 className="mt-4 text-xl font-bold">
                Experienced Pandit Ji
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#7a4327]">
                Kishan Upadhyay — 15 Years of Experience in traditional
                Vedic Puja. He has knowledge of all four Vedas, sacred
                mantras for various Puja rituals, and proper knowledge of
                traditional Puja Vidhi, Havan, Mantra, Aarti and other
                Vedic ceremonies.
              </p>

            </div>


            <div className="text-center">

              <div className="font-serif text-5xl text-[#a33a12]">
                ॐ
              </div>

              <h3 className="mt-4 text-xl font-bold">
                Traditional Rituals
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#7a4327]">
                Authentic Puja, mantra recitation, Havan and Aarti.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-b from-[#7c2109] to-[#390d05] px-6 py-16 text-center">


        <div className="absolute left-5 top-8 text-4xl">
          🪔
        </div>


        <div className="absolute right-5 top-8 text-4xl">
          🪔
        </div>


        <div className="sparkle absolute left-[15%] top-10 text-xl">
          ✨
        </div>


        <div className="sparkle absolute right-[15%] top-16 text-xl">
          ✨
        </div>


        <div className="relative">

          <div className="mantra-glow font-serif text-3xl font-bold text-amber-300 sm:text-4xl">
            ॐ गणपते नमः
          </div>


          <h2 className="mt-5 text-3xl font-bold text-amber-300 sm:text-4xl">
            Begin Your Sacred Journey
          </h2>


          <p className="mx-auto mt-4 max-w-xl text-orange-100">
            Choose a Puja and book your preferred date and time today.
          </p>


          <Link
            to="/pujas"
            className="mt-8 inline-flex rounded-full border-2 border-yellow-300 bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 font-bold text-white shadow-xl transition hover:scale-105"
          >
            View All Pujas →
          </Link>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-amber-400/20 bg-[#210802] px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">


          <div>

            <p className="text-xl font-bold text-amber-300">
              🛕 PujaBooking
            </p>


            <p className="mt-1 text-sm text-orange-200">
              Traditional Puja Services
            </p>


            <p className="mt-1 text-sm text-amber-300/80">
              Pandit Ji — Kishan Upadhyay
            </p>

          </div>


          <p className="text-sm text-orange-200">
            © {new Date().getFullYear()} PujaBooking. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;