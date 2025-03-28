import { ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../providers/CardProvider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";


export function CartSidebar() {
    const { items, removeFromCart, updateQuantity, cartCount } = useCart();

    const subtotal = items.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 bg-primary text-primary-foreground text-xs flex items-center justify-center rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Your Cart ({cartCount})</SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium mb-2">Your cart is empty</p>
                        <p className="text-muted-foreground mb-6">Add items to your cart to see them here</p>
                        <Button asChild>
                            <Link to="/products">Browse Products</Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 -mx-6 px-6">
                            <div className="space-y-4 py-4">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex items-center space-x-4">
                                        <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                            <img
                                                src={`${item.product.image}?w=64&h=64&fit=crop&auto=format`}
                                                alt={item.product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium leading-tight">{item.product.name}</h4>
                                            <div className="flex items-center mt-1">
                                                <button
                                                    className="text-xs px-1.5"
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm mx-1.5">{item.quantity}</span>
                                                <button
                                                    className="text-xs px-1.5"
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground"
                                            onClick={() => removeFromCart(item.product.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="border-t pt-4 space-y-4">
                            <div className="flex justify-between">
                                <span className="font-medium">Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Shipping and taxes calculated at checkout
                            </p>
                            <Button asChild className="w-full">
                                <Link to="/checkout">Proceed to Checkout</Link>
                            </Button>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}