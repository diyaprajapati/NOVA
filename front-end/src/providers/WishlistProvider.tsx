
import { createContext, useContext, useState } from "react";
import { Product } from "../lib/data";
import { toast } from "sonner";
import { useAuth } from "./AuthProvider";


type WishlistContextType = {
    items: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    toggleWishlist: (product: Product) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<Product[]>([]);
    const { requireAuth, isAuthenticated } = useAuth();

    const addToWishlist = (product: Product) => {
        requireAuth(() => {
            if (!isInWishlist(product.id)) {
                setItems((prevItems) => [...prevItems, product]);
                toast("Added to wishlist", {
                    description: `${product.name} has been added to your wishlist`,
                });
            }
        });
    };

    const removeFromWishlist = (productId: string) => {
        if (isAuthenticated) {
            setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
            toast("Removed from wishlist", {
                description: "Item has been removed from your wishlist",
            });
        }
    };

    const isInWishlist = (productId: string) => {
        if (!isAuthenticated) return false;
        return items.some((item) => item.id === productId);
    };

    const toggleWishlist = (product: Product) => {
        requireAuth(() => {
            if (isInWishlist(product.id)) {
                removeFromWishlist(product.id);
            } else {
                addToWishlist(product);
            }
        });
    };

    return (
        <WishlistContext.Provider value={{
            items,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            toggleWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};