function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <h2 className="text-2xl font-bold">
        🛕 PujaBooking
      </h2>

      <div className="flex gap-6">
        <a href="/">Home</a>
        <a href="/pujas">Pujas</a>
        <a href="/login">Login</a>
      </div>
    </nav>
  );
}

export default Navbar;