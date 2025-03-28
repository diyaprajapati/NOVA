import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Layout } from "../../components/layout/Layout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { categories } from "../../lib/data";
import { Button } from "../../components/ui/button";

const productFormSchema = z.object({
    name: z.string().min(3, { message: "Product name must be at least 3 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    price: z.coerce.number().positive({ message: "Price must be a positive number." }),
    category: z.string({ required_error: "Please select a category." }),
    image: z.string().url({ message: "Please enter a valid image URL." }),
});

export default function AddProduct() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            category: "",
            image: "",
        },
    });

    async function onSubmit(values: z.infer<typeof productFormSchema>) {
        setIsLoading(true);

        try {
            console.log("Adding product:", values);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Success message
            toast("Product added!", {
                description: `Your product "${values.name}" has been added successfully.`,
            });

            navigate("/brand/dashboard");
        } catch (error) {
            console.error("Error adding product:", error);
            toast("Failed to add product", {
                description: "There was a problem adding your product. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Layout>
            <div className="container max-w-2xl mx-auto py-10">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold">Add New Product</h1>
                        <p className="text-muted-foreground mt-2">Fill in the details to add a new product to your store</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Premium Wireless Headphones" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe your product in detail..."
                                                className="min-h-32"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price ($)</FormLabel>
                                            <FormControl>
                                                <Input type="number" min="0" step="0.01" placeholder="299.99" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.com/image.jpg" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        {field.value && (
                                            <div className="mt-2 border rounded p-2">
                                                <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
                                                <img
                                                    src={field.value}
                                                    alt="Product preview"
                                                    className="w-full max-h-48 object-contain rounded"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Invalid+Image+URL";
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end space-x-4 pt-4">
                                <Button type="button" variant="outline" onClick={() => navigate("/brand/dashboard")}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Adding Product..." : "Add Product"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Layout>
    );
}