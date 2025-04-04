import { Link } from "react-router-dom";
import { Search, Menu, User, LogOut } from "lucide-react";

import { useState } from "react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/button";
import { SearchDialog } from "../search/SearchDialog";
import { CartSidebar } from "../cart/CartSidebar";
import { WishlistSidebar } from "../wishlist/WishlistSidebar";
import { MobileNav } from "./MobileNav";
import { useAuth } from "../../providers/AuthProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function Header() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    // const { items: wishlistItems } = useWishlist();
    const [searchOpen, setSearchOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 h-20 border-b bg-background/80 backdrop-blur-md z-50">
            <div className="page-container h-full flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/" className="mr-10">
                        <div className="flex items-center space-x-2">
                            <img src="./logo.png" width={30} />
                            <span className="font-bold text-xl">NOVA</span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-sm font-medium hover:text-primary">
                            Home
                        </Link>
                        <Link to="/products" className="text-sm font-medium hover:text-primary">
                            Products
                        </Link>
                        <Link to="/categories" className="text-sm font-medium hover:text-primary">
                            Categories
                        </Link>
                        <Link to="/about" className="text-sm font-medium hover:text-primary">
                            About
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden sm:flex"
                        onClick={() => setSearchOpen(true)}
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    <SearchDialog
                        open={searchOpen}
                        onOpenChange={setSearchOpen}
                    />

                    <WishlistSidebar />
                    <CartSidebar />

                    <div className="hidden sm:block">
                        <ThemeToggle />
                    </div>

                    <div className="hidden sm:flex items-center space-x-2">
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        {user?.type === "brand" && (
                                            <DropdownMenuItem asChild>
                                                <Link to="/brand/dashboard">Dashboard</Link>
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button variant="outline" asChild>
                                    <Link to="/sign-in">Sign In</Link>
                                </Button>
                                <Button asChild>
                                    <Link to="/sign-up">Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </div>

                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileNavOpen(true)}>
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
        </header>
    );
}