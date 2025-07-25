import { useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
    const [open, setOpen] = useState(false)

    return (
        <header className="bg-neutral-900 text-gray-100 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="text-2xl font-bold tracking-wide text-white">
                        MyBrand
                    </div>
                    <nav className="hidden md:flex space-x-8 text-lg font-medium">
                        <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
                        <Link to="/about" className="hover:text-gray-300 transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
                    </nav>
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-neutral-800 transition"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {open && (
                <div className="md:hidden bg-neutral-800">
                    <nav className="px-4 pt-4 pb-4 space-y-3 text-base font-medium">
                        <Link to="/" onClick={() => setOpen(false)} className="block hover:text-gray-300 transition-colors">Home</Link>
                        <Link to="/about" onClick={() => setOpen(false)} className="block hover:text-gray-300 transition-colors">About</Link>
                        <Link to="/contact" onClick={() => setOpen(false)} className="block hover:text-gray-300 transition-colors">Contact</Link>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Header
