import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
            EB
          </span>
          <span className="text-lg font-bold text-gray-950">Excaliboard</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <a href="/#features" className="hover:text-gray-950">
            Features
          </a>
          <Link to="/dashboard" className="hover:text-gray-950">
            Dashboard
          </Link>
          <Link to="/login" className="hover:text-gray-950">
            Login
          </Link>
        </nav>

        <Link
          to="/signup"
          className="hidden min-h-11 items-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 sm:inline-flex"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}

export default Header;
