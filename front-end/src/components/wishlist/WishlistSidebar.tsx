import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../providers/WishlistProvider";
import { useCart } from "../../providers/CardProvider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

export function WishlistSidebar() {
    const { items, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 bg-primary text-primary-foreground text-xs flex items-center justify-center rounded-full">
                            {items.length}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Your Wishlist ({items.length})</SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium mb-2">Your wishlist is empty</p>
                        <p className="text-muted-foreground mb-6">Save items you like to your wishlist</p>
                        <Button asChild>
                            <Link to="/products">Browse Products</Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 -mx-6 px-6">
                            <div className="space-y-4 py-4">
                                {items.map((product) => (
                                    <div key={product.id} className="flex items-center space-x-4">
                                        <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                            <img
                                                src={`${product.image}?w=64&h=64&fit=crop&auto=format`}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/products/${product.id}`}>
                                                <h4 className="text-sm font-medium leading-tight hover:underline">{product.name}</h4>
                                            </Link>
                                            <p className="text-sm text-muted-foreground mt-1">${product.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground"
                                                onClick={() => toggleWishlist(product)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => addToCart(product, 1)}
                                            >
                                                <ShoppingBag className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}