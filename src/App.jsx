import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Pujas from "./pages/Pujas";
import Booking from "./pages/Booking";
import YajmanDetails from "./pages/YajmanDetails";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* All Pujas */}
        <Route
          path="/pujas"
          element={<Pujas />}
        />

        {/* Puja Booking */}
        <Route
          path="/booking/:id"
          element={<Booking />}
        />

        {/* Yajman Details */}
        <Route
          path="/booking/:id/yajman"
          element={<YajmanDetails />}
        />

        {/* Payment */}
        <Route
          path="/booking/:id/payment"
          element={<Payment />}
        />

        {/* Booking Confirmation */}
        <Route
          path="/booking/:id/confirmation"
          element={<Confirmation />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;