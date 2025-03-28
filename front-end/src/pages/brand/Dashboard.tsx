import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "../../lib/data";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";

// Mock data for brand products
const brandProducts: Product[] = [
    {
        id: "b1",
        name: "Brand Premium Headphones",
        description: "High-quality headphones with noise cancellation",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        category: "audio",
        rating: 4.6,
        reviews: 52
    },
    {
        id: "b2",
        name: "Brand Wireless Earbuds",
        description: "Compact and powerful earbuds with great battery life",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
        category: "audio",
        rating: 4.4,
        reviews: 38
    }
];

export default function BrandDashboard() {
    const [products, setProducts] = useState<Product[]>(brandProducts);
    console.log(setProducts);
    return (
        <Layout>
            <div className="container py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Brand Dashboard</h1>
                    <Link to="/brand/products/add">
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6">
                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="text-xl font-semibold mb-4">Your Products</h2>

                        {products.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="py-3 px-4 text-left">Product</th>
                                            <th className="py-3 px-4 text-left">Category</th>
                                            <th className="py-3 px-4 text-left">Price</th>
                                            <th className="py-3 px-4 text-left">Rating</th>
                                            <th className="py-3 px-4 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product.id} className="border-b">
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <span className="font-medium">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 capitalize">{product.category}</td>
                                                <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                                                <td className="py-3 px-4">{product.rating} ★ ({product.reviews})</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex space-x-2">
                                                        <Button variant="outline" size="sm">Edit</Button>
                                                        <Button variant="destructive" size="sm">Delete</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <p>You haven't added any products yet.</p>
                                <Link to="/brand/products/add">
                                    <Button variant="outline" className="mt-4">
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Product
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                            <div className="p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground">Total Views</p>
                                <p className="text-2xl font-bold">1,245</p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground">Total Orders</p>
                                <p className="text-2xl font-bold">28</p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground">Revenue</p>
                                <p className="text-2xl font-bold">$4,285.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}