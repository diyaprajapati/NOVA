import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Layout } from "../components/layout/Layout";
import { useAuth } from "../providers/AuthProvider";

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export default function SignIn() {
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState<"user" | "brand">("user");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        try {
            await login(values.email, values.password, accountType);

            // Redirect to appropriate dashboard
            if (accountType === "brand") {
                navigate("/brand/dashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Sign in error:", error);
            toast("Sign in failed", {
                description: "Please check your credentials and try again.",
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
                        <h1 className="text-3xl font-bold">Sign In</h1>
                        <p className="text-muted-foreground">Enter your credentials to sign in to your account</p>
                    </div>

                    <Tabs
                        value={accountType}
                        //@ts-ignore
                        onValueChange={(value) => setAccountType(value as "user" | "brand")}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="user">Customer</TabsTrigger>
                            <TabsTrigger value="brand">Brand</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                //@ts-ignore
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
                                control={form.control}
                                name="password"
                                //@ts-ignore
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

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    </Form>

                    <div className="text-center text-sm">
                        Don't have an account?{" "}
                        <Link to="/sign-up" className="underline text-primary">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}