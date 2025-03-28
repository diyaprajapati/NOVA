import { useParams } from "react-router-dom";
import { useState } from "react";

import {
    Heart,
    Star,
    Share2,
    Truck,
    RotateCcw,
    ShieldCheck,
    MinusIcon,
    PlusIcon
} from "lucide-react";
import { products } from "../lib/data";
import { Header } from "../components/layout/Header";
import { Button } from "../components/ui/button";
import { Footer } from "../components/layout/Footer";
import { ProductCard } from "../components/ui/ProductCard";
import { useCart } from "../providers/CardProvider";
import { useWishlist } from "../providers/WishlistProvider";


export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <>
                <Header />
                <main className="min-h-screen pt-24">
                    <div className="page-container text-center py-20">
                        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
                        <p className="text-muted-foreground mb-6">
                            Sorry, the product you are looking for does not exist.
                        </p>
                        <Button asChild>
                            <a href="/products">View All Products</a>
                        </Button>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const isLiked = isInWishlist(product.id);

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24">
                <div className="page-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        {/* Product images */}
                        <div className="rounded-2xl overflow-hidden neo-morphism">
                            <div className="aspect-[4/3] bg-muted/30">
                                <img
                                    src={`${product.image}?w=1200&h=900&fit=crop&auto=format`}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Product details */}
                        <div className="flex flex-col">
                            <div>
                                <div className="flex space-x-2 mb-2">
                                    {product.new && (
                                        <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                                            New
                                        </span>
                                    )}
                                    {product.bestseller && (
                                        <span className="bg-amber-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                                            Bestseller
                                        </span>
                                    )}
                                    {product.featured && (
                                        <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight mb-2">{product.name}</h1>

                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        {Array(5).fill(0).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < Math.floor(product.rating)
                                                    ? "text-amber-400 fill-amber-400"
                                                    : "text-muted"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground ml-2">
                                        {product.rating} ({product.reviews} reviews)
                                    </span>
                                </div>

                                <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>

                                <p className="text-muted-foreground mb-8">{product.description}</p>

                                <div className="flex flex-col space-y-4 mb-8">
                                    <div className="flex items-center">
                                        <button
                                            className="flex items-center justify-center h-10 w-10 rounded-l-md border border-r-0"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        >
                                            <MinusIcon className="h-4 w-4" />
                                        </button>
                                        <div className="flex items-center justify-center h-10 w-12 border-y text-center">
                                            {quantity}
                                        </div>
                                        <button
                                            className="flex items-center justify-center h-10 w-10 rounded-r-md border border-l-0"
                                            onClick={() => setQuantity(quantity + 1)}
                                        >
                                            <PlusIcon className="h-4 w-4" />
                                        </button>

                                        <div className="ml-auto flex items-center space-x-2">
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className={`rounded-full ${isLiked ? 'text-red-500 hover:text-red-600' : ''}`}
                                                onClick={() => toggleWishlist(product)}
                                            >
                                                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                                                <span className="sr-only">Add to wishlist</span>
                                            </Button>
                                            <Button size="icon" variant="outline" className="rounded-full">
                                                <Share2 className="h-5 w-5" />
                                                <span className="sr-only">Share product</span>
                                            </Button>
                                        </div>
                                    </div>

                                    <Button
                                        size="lg"
                                        className="w-full"
                                        onClick={() => addToCart(product, quantity)}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-b py-6 mb-6">
                                    <div className="flex items-center">
                                        <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
                                        <span className="text-sm">Free shipping</span>
                                    </div>
                                    <div className="flex items-center">
                                        <RotateCcw className="h-5 w-5 mr-2 text-muted-foreground" />
                                        <span className="text-sm">30-day returns</span>
                                    </div>
                                    <div className="flex items-center">
                                        <ShieldCheck className="h-5 w-5 mr-2 text-muted-foreground" />
                                        <span className="text-sm">2-year warranty</span>
                                    </div>
                                </div>

                                <div className="text-sm text-muted-foreground">
                                    <p>Category: <span className="text-foreground">{product.category}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related products section */}
                    {relatedProducts.length > 0 && (
                        <div className="mb-20">
                            <h2 className="text-2xl font-bold tracking-tight mb-6">Related Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}