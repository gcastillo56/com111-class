import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <p> Home </p>
            </div>
            <div className="navbar-nav ms-auto">
                <Link href="/dashboard" className="nav-link">
                    Dashboard
                </Link>
                |
                <Link href="/about" className="nav-link">
                    About
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;