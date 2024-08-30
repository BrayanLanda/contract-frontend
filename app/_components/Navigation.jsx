import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className="hover:text-accent-400 transition-colors"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            href="/register"
            className="hover:text-accent-400 transition-colors"
          >
            Register
          </Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}

export default Navigation;
