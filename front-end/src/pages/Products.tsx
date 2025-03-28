import { useState } from "react";

import { FilterIcon, Grid3x3, Layers3 } from "lucide-react";
import { products } from "../lib/data";
import { Header } from "../components/layout/Header";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ui/ProductCard";
import { Footer } from "../components/layout/Footer";

export default function Products() {
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const [filter, setFilter] = useState("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredProducts = filter === "all"
        ? products
        : filter === "featured"
            ? products.filter(p => p.featured)
            : filter === "bestsellers"
                ? products.filter(p => p.bestseller)
                : filter === "new"
                    ? products.filter(p => p.new)
                    : products;

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24">
                <div className="page-container">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">All Products</h1>
                        <p className="text-muted-foreground">
                            Explore our complete collection of premium tech products
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Filters sidebar */}
                        <aside className={`
              w-full md:w-[240px] lg:w-[280px] h-fit sticky top-20
              ${isFilterOpen ? 'block' : 'hidden md:block'}
              bg-background md:bg-transparent
              border rounded-xl p-4 md:p-5
            `}>
                            <div className="mb-6">
                                <h3 className="font-medium mb-3">Category</h3>
                                <div className="space-y-2">
                                    <Button
                                        variant={filter === "all" ? "default" : "ghost"}
                                        className="w-full justify-start"
                                        onClick={() => setFilter("all")}
                                    >
                                        All Products
                                    </Button>
                                    <Button
                                        variant={filter === "featured" ? "default" : "ghost"}
                                        className="w-full justify-start"
                                        onClick={() => setFilter("featured")}
                                    >
                                        Featured
                                    </Button>
                                    <Button
                                        variant={filter === "bestsellers" ? "default" : "ghost"}
                                        className="w-full justify-start"
                                        onClick={() => setFilter("bestsellers")}
                                    >
                                        Bestsellers
                                    </Button>
                                    <Button
                                        variant={filter === "new" ? "default" : "ghost"}
                                        className="w-full justify-start"
                                        onClick={() => setFilter("new")}
                                    >
                                        New Arrivals
                                    </Button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-medium mb-3">Price Range</h3>
                                <div className="flex items-center gap-2">
                                    <Input type="number" min="0" placeholder="Min" />
                                    <span>-</span>
                                    <Input type="number" min="0" placeholder="Max" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-medium mb-3">Rating</h3>
                                <div className="space-y-2">
                                    {[5, 4, 3, 2, 1].map((rating) => (
                                        <div key={rating} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`rating-${rating}`}
                                                className="mr-2 h-4 w-4"
                                            />
                                            <label htmlFor={`rating-${rating}`} className="flex items-center">
                                                {Array(5).fill(0).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${i < rating
                                                            ? "text-amber-400 fill-amber-400"
                                                            : "text-muted"
                                                            }`}
                                                    />
                                                ))}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button className="w-full">Apply Filters</Button>
                        </aside>

                        {/* Product grid */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-6">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="md:hidden flex items-center gap-1.5"
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                >
                                    <FilterIcon className="h-4 w-4" />
                                    Filters
                                </Button>

                                <p className="text-sm text-muted-foreground">
                                    Showing {filteredProducts.length} products
                                </p>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant={layout === "grid" ? "default" : "outline"}
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => setLayout("grid")}
                                    >
                                        <Grid3x3 className="h-4 w-4" />
                                        <span className="sr-only">Grid view</span>
                                    </Button>
                                    <Button
                                        variant={layout === "list" ? "default" : "outline"}
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => setLayout("list")}
                                    >
                                        <Layers3 className="h-4 w-4" />
                                        <span className="sr-only">List view</span>
                                    </Button>
                                </div>
                            </div>

                            {layout === "grid" ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex flex-col sm:flex-row gap-4 border rounded-xl p-3 neo-morphism"
                                        >
                                            <div className="sm:w-[180px] rounded-lg overflow-hidden">
                                                <img
                                                    src={`${product.image}?w=400&h=400&fit=crop&auto=format`}
                                                    alt={product.name}
                                                    className="aspect-square object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col">
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-lg">{product.name}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                                                    <div className="flex items-center mt-2">
                                                        {Array(5).fill(0).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < Math.floor(product.rating)
                                                                    ? "text-amber-400 fill-amber-400"
                                                                    : "text-muted"
                                                                    }`}
                                                            />
                                                        ))}
                                                        <span className="text-xs text-muted-foreground ml-2">
                                                            ({product.reviews})
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <p className="font-semibold">${product.price.toFixed(2)}</p>
                                                    <Button>Add to Cart</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    );
}

function Star(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}