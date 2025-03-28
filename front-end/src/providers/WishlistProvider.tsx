
import { createContext, useContext, useState } from "react";
import { Product } from "../lib/data";
import { toast } from "sonner";


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
    //   const { toast } = useToast();

    const addToWishlist = (product: Product) => {
        if (!isInWishlist(product.id)) {
            setItems((prevItems) => [...prevItems, product]);
            toast("Added to wishlist", {
                description: `${product.name} has been added to your wishlist`,
            });
        }
    };

    const removeFromWishlist = (productId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
        toast("Removed from wishlist", {
            description: "Item has been removed from your wishlist",
        });
    };

    const isInWishlist = (productId: string) => {
        return items.some((item) => item.id === productId);
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
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