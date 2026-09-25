import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Pujas from "./pages/Pujas";
import PujaDetails from "./pages/PujaDetails";
import Booking from "./pages/Booking";
import YajmanDetails from "./pages/YajmanDetails";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import MyBookings from "./pages/MyBookings";
import Admin from "./pages/Admin";
import PanditDashboard from "./pages/PanditDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        {/* Puja Pages */}
        <Route path="/pujas" element={<Pujas />} />

        <Route
          path="/puja/:id"
          element={<PujaDetails />}
        />

        {/* Booking Flow */}
        <Route
          path="/booking/:id"
          element={<Booking />}
        />

        <Route
          path="/booking/:id/yajman"
          element={<YajmanDetails />}
        />

        <Route
          path="/booking/:id/payment"
          element={<Payment />}
        />

        <Route
          path="/booking/:id/confirmation"
          element={<Confirmation />}
        />

        {/* User */}
        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={<Admin />}
        />

        {/* Pandit */}
        <Route
          path="/pandit"
          element={<PanditDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;