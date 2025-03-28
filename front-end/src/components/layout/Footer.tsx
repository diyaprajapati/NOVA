import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


export function Footer() {
    return (
        <footer className="border-t">
            <div className="page-container py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div>
                        <Link to="/" className="text-xl font-bold tracking-tighter mb-4 inline-block">
                            NOVA
                        </Link>
                        <p className="text-muted-foreground max-w-[300px] mt-2 mb-4">
                            Redefining the tech shopping experience with premium products for the modern lifestyle.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                                <Facebook className="h-4 w-4" />
                                <span className="sr-only">Facebook</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                                <Instagram className="h-4 w-4" />
                                <span className="sr-only">Instagram</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                                <Twitter className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                                <Youtube className="h-4 w-4" />
                                <span className="sr-only">Youtube</span>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Shop</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link to="/products" className="hover:text-foreground transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories" className="hover:text-foreground transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?filter=featured" className="hover:text-foreground transition-colors">
                                    Featured
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?filter=bestsellers" className="hover:text-foreground transition-colors">
                                    Bestsellers
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?filter=new" className="hover:text-foreground transition-colors">
                                    New Arrivals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Company</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link to="/about" className="hover:text-foreground transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-foreground transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:text-foreground transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="hover:text-foreground transition-colors">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Stay Updated</h3>
                        <p className="text-muted-foreground mb-4">
                            Subscribe to our newsletter to receive updates and exclusive offers.
                        </p>
                        <div className="flex">
                            <Input
                                type="email"
                                placeholder="Your email"
                                className="rounded-l-full rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <Button className="rounded-l-none rounded-r-full">
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} NOVA. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Terms
                        </a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Sitemap
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}