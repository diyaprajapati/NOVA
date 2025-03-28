import { useParams } from "react-router-dom";
import { categories, products } from "../lib/data";
import { Header } from "../components/layout/Header";
import { ProductCard } from "../components/ui/ProductCard";
import { Footer } from "../components/layout/Footer";


export default function Categories() {
    const { id } = useParams<{ id: string }>();
    const category = id ? categories.find(c => c.id === id) : null;

    // Filter products by category if a category ID is provided
    const filteredProducts = id
        ? products.filter(product => product.category === id)
        : products;

    return (
        <>
            <Header />
            <main className="pt-24 pb-20">
                <section className="page-container">
                    <div className="max-w-[800px] mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">
                            {category ? category.name : "All Categories"}
                        </h1>
                        <p className="text-muted-foreground">
                            {category
                                ? `Browse our collection of ${category.name.toLowerCase()} products.`
                                : "Browse our extensive collection of tech products organized by category."}
                        </p>
                    </div>

                    {!id && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
                            {categories.map((category) => (
                                <a
                                    key={category.id}
                                    href={`/categories/${category.id}`}
                                    className="group relative overflow-hidden rounded-xl neo-morphism transition-all duration-500 hover:-translate-y-1"
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={`${category.image}?w=400&h=400&fit=crop&auto=format`}
                                            alt={category.name}
                                            className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                            <h3 className="font-medium text-lg">{category.name}</h3>
                                            <p className="text-sm text-muted-foreground">{category.count} Products</p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}

                    {id && filteredProducts.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {id && filteredProducts.length === 0 && (
                        <div className="text-center py-16">
                            <h2 className="text-xl font-medium mb-2">No products found</h2>
                            <p className="text-muted-foreground">There are no products available in this category.</p>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}