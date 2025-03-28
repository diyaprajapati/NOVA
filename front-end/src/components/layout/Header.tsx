import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, X } from "lucide-react";

import { useState, useEffect } from "react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/button";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-lg shadow-md py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="page-container flex items-center justify-between">
                <Link
                    to="/"
                    className="text-xl md:text-2xl font-bold tracking-tighter transition-all hover:opacity-90"
                >
                    NOVA
                </Link>

                <nav className="hidden md:flex items-center space-x-8 text-sm">
                    <Link to="/" className="hover:text-primary/80 transition-colors">
                        Home
                    </Link>
                    <Link to="/products" className="hover:text-primary/80 transition-colors">
                        Shop
                    </Link>
                    <Link to="/categories" className="hover:text-primary/80 transition-colors">
                        Categories
                    </Link>
                    <Link to="/about" className="hover:text-primary/80 transition-colors">
                        About
                    </Link>
                </nav>

                <div className="flex items-center space-x-2">
                    <ThemeToggle />

                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </Button>

                    <Button variant="ghost" size="icon" className="rounded-full relative">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                            3
                        </span>
                        <span className="sr-only">Shopping cart</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden rounded-full"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 top-16 z-50 bg-background animate-fade-in">
                    <div className="flex flex-col space-y-4 p-6 text-lg">
                        <Link
                            to="/"
                            className="p-3 hover:bg-primary/5 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="p-3 hover:bg-primary/5 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            to="/categories"
                            className="p-3 hover:bg-primary/5 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Categories
                        </Link>
                        <Link
                            to="/about"
                            className="p-3 hover:bg-primary/5 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}