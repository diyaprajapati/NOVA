import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../../lib/data";
import { Button } from "../ui/button";
import { ProductCard } from "../ui/ProductCard";

export function FeaturedProducts() {
    const featuredProducts = products.filter(product => product.featured);

    return (
        <section className="py-20">
            <div className="page-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-3">Featured Products</h2>
                        <p className="text-muted-foreground max-w-[600px]">
                            Discover our handpicked selection of premium tech products that stand out for their exceptional quality and innovation.
                        </p>
                    </div>
                    <Link to="/products">
                        <Button variant="link" className="font-medium gap-1.5 group">
                            View all products
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}