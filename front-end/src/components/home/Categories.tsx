import { Link } from "react-router-dom";
import { categories } from "../../lib/data";

export function Categories() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="page-container">
                <div className="max-w-[800px] mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-3">Shop by Category</h2>
                    <p className="text-muted-foreground">
                        Browse our extensive collection of tech products organized by category to find exactly what you're looking for.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/categories/${category.id}`}
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
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}