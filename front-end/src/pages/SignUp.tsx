import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Layout } from "../components/layout/Layout";
import { toast } from "sonner";

const userFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const brandFormSchema = z.object({
    brandName: z.string().min(2, { message: "Brand name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    brandDescription: z.string().min(10, { message: "Description must be at least 10 characters." }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export default function SignUp() {
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState<"user" | "brand">("user");
    const [isLoading, setIsLoading] = useState(false);

    const userForm = useForm<z.infer<typeof userFormSchema>>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const brandForm = useForm<z.infer<typeof brandFormSchema>>({
        resolver: zodResolver(brandFormSchema),
        defaultValues: {
            brandName: "",
            email: "",
            password: "",
            confirmPassword: "",
            brandDescription: "",
        },
    });

    async function onUserSubmit(values: z.infer<typeof userFormSchema>) {
        setIsLoading(true);

        try {
            // This would be replaced with actual registration logic
            console.log("Registering user with:", values);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Success message
            toast("Account created!", {
                description: `Welcome, ${values.name}! Your user account was created successfully.`,
            });

            navigate("/sign-in");
        } catch (error) {
            console.error("Registration error:", error);
            toast("Registration failed", {
                description: "There was a problem creating your account.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function onBrandSubmit(values: z.infer<typeof brandFormSchema>) {
        setIsLoading(true);

        try {
            // This would be replaced with actual registration logic
            console.log("Registering brand with:", values);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Success message
            toast("Brand account created!", {
                description: `Your brand account for ${values.brandName} was created successfully.`,
            });

            navigate("/sign-in");
        } catch (error) {
            console.error("Registration error:", error);
            toast("Registration failed", {
                description: "There was a problem creating your brand account.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Layout>
            <div className="container max-w-md mx-auto py-16">
                <div className="space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Create an Account</h1>
                        <p className="text-muted-foreground">Choose the type of account you want to create</p>
                    </div>

                    <Tabs
                        value={accountType}
                        onValueChange={(value) => setAccountType(value as "user" | "brand")}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="user">Customer</TabsTrigger>
                            <TabsTrigger value="brand">Brand</TabsTrigger>
                        </TabsList>

                        <TabsContent value="user" className="pt-4">
                            <Form {...userForm}>
                                <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
                                    <FormField
                                        control={userForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={userForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="your.email@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={userForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={userForm.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? "Creating account..." : "Create Customer Account"}
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>

                        <TabsContent value="brand" className="pt-4">
                            <Form {...brandForm}>
                                <form onSubmit={brandForm.handleSubmit(onBrandSubmit)} className="space-y-4">
                                    <FormField
                                        control={brandForm.control}
                                        name="brandName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Brand Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your Brand" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={brandForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Business Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="contact@yourbrand.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={brandForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={brandForm.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={brandForm.control}
                                        name="brandDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Brand Description</FormLabel>
                                                <FormControl>
                                                    <textarea
                                                        className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                        placeholder="Tell us about your brand..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? "Creating account..." : "Create Brand Account"}
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>

                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/sign-in" className="underline text-primary">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}