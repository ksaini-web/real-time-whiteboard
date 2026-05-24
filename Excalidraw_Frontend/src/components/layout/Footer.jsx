import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© 2026 Excaliboard. Collaborative whiteboarding for focused teams.</p>
        <div className="flex gap-5">
          <a href="/#features" className="hover:text-gray-900">
            Features
          </a>
          <Link to="/login" className="hover:text-gray-900">
            Login
          </Link>
          <Link to="/signup" className="hover:text-gray-900">
            Signup
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
