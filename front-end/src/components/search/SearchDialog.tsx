import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "../ui/command";
import { products } from "../../lib/data";
import { Dialog, DialogContent } from "../ui/dialog";

export interface SearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children?: React.ReactNode;
}

export function SearchDialog({ open, onOpenChange, children }: SearchDialogProps) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(products);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults(products);
            return;
        }

        const filteredResults = products.filter((product) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower) ||
                product.category.toLowerCase().includes(searchLower)
            );
        });

        setSearchResults(filteredResults);
    }, [searchQuery]);

    const handleProductSelect = (productId: string) => {
        navigate(`/products/${productId}`);
        onOpenChange(false);
    };

    return (
        <>
            {children}
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="p-0 max-w-2xl">
                    <Command className="rounded-lg border shadow-md">
                        <CommandInput
                            placeholder="Search for products..."
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            className="h-12"
                        />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Products">
                                {searchResults.map((product) => (
                                    <CommandItem
                                        key={product.id}
                                        onSelect={() => handleProductSelect(product.id)}
                                        className="flex items-center gap-2 p-2 cursor-pointer"
                                    >
                                        <div className="h-12 w-12 rounded overflow-hidden bg-muted">
                                            <img
                                                src={`${product.image}?w=100&h=100&fit=crop&auto=format`}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <span className="font-medium">{product.name}</span>
                                            <span className="text-sm text-muted-foreground truncate max-w-md">
                                                {product.description.substring(0, 50)}...
                                            </span>
                                        </div>
                                        <div className="font-semibold">${product.price}</div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    );
}