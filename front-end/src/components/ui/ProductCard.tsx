import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { Product } from "../../lib/data";
import { Button } from "./button";
import { useCart } from "../../providers/CardProvider";
import { useWishlist } from "../../providers/WishlistProvider";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist, removeFromWishlist } = useWishlist();

    const isLiked = isInWishlist(product.id);

    const handleAddToCart = () => {
        addToCart(product);
        if (isLiked) {
            removeFromWishlist(product.id);
        }
    };

    return (
        <div
            className="group relative overflow-hidden rounded-xl neo-morphism transition-all duration-300 hover:translate-y-[-5px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {(product.new || product.bestseller || product.featured) && (
                <div className="absolute top-3 left-3 z-10 flex space-x-2">
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
            )}

            <Link
                to={`/products/${product.id}`}
                className="block aspect-square overflow-hidden"
            >
                <div className={`w-full h-full relative transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                    {isLoading && (
                        <div className="absolute inset-0 bg-muted animate-pulse" />
                    )}
                    <img
                        src={`${product.image}?w=600&h=600&fit=crop&auto=format`}
                        alt={product.name}
                        className={`object-cover w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsLoading(false)}
                    />
                </div>
            </Link>

            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                        <Link to={`/products/${product.id}`} className="block">
                            <h3 className="font-medium text-lg leading-tight hover:underline">
                                {product.name}
                            </h3>
                        </Link>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full -mt-1 -mr-2 h-9 w-9 transition-all ${isLiked ? 'opacity-100 text-red-500 hover:text-red-600' : 'opacity-0 group-hover:opacity-100'}`}
                        onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product);
                        }}
                    >
                        <Heart className={`h-[18px] w-[18px] ${isLiked ? 'fill-current' : ''}`} />
                        <span className="sr-only">Add to wishlist</span>
                    </Button>
                </div>

                <div className="flex items-center mt-1 mb-3">
                    <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating)
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-muted"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                        ({product.reviews})
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <p className="font-semibold">${product.price.toFixed(2)}</p>
                    <Button
                        size="sm"
                        className="rounded-full py-1.5 h-auto text-sm transition-all transform hover:scale-105"
                        onClick={(e) => {
                            e.preventDefault();
                            // addToCart(product);
                            handleAddToCart();
                        }}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}