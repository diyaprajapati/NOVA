import { Headphones, Truck, Shield, Gift, Clock, RefreshCw } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export default function About() {
    return (
        <>
            <Header />
            <main className="pt-24 pb-20">
                <section className="page-container">
                    <div className="max-w-[800px] mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">About NOVA</h1>
                        <p className="text-muted-foreground">
                            Discover our story, mission, and what makes us the leading tech retailer.
                        </p>
                    </div>

                    <div className="grid gap-12 mb-20">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4 order-2 md:order-1">
                                <h2 className="text-3xl font-semibold">Our Story</h2>
                                <p className="text-muted-foreground">
                                    Founded in 2015, NOVA began with a simple mission: to provide premium tech products with exceptional customer service. What started as a small online store has grown into a trusted destination for tech enthusiasts around the world.
                                </p>
                                <p className="text-muted-foreground">
                                    Our team of passionate tech experts carefully curates each product in our catalog, ensuring we offer only the highest quality devices that enhance your digital lifestyle.
                                </p>
                            </div>
                            <div className="order-1 md:order-2">
                                <img
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"
                                    alt="Modern tech store interior"
                                    className="rounded-lg shadow-lg w-full h-auto"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <img
                                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1000&q=80"
                                    alt="Tech products display"
                                    className="rounded-lg shadow-lg w-full h-auto"
                                />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-semibold">Our Mission</h2>
                                <p className="text-muted-foreground">
                                    We believe that technology should enhance and simplify your life. Our mission is to connect you with innovative products that are not only beautiful and functional but also reliable and user-friendly.
                                </p>
                                <p className="text-muted-foreground">
                                    We're committed to exceptional customer service, offering personalized support to help you find the perfect tech solutions for your needs. Your satisfaction is our top priority.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-20">
                        <h2 className="text-3xl font-semibold text-center mb-12">Why Choose NOVA?</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center mb-4">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <Shield className="text-primary h-6 w-6" />
                                    </div>
                                    <h3 className="font-semibold text-xl">Premium Quality</h3>
                                </div>
                                <p className="text-muted-foreground">We carefully select each product in our catalog, ensuring only the highest quality tech reaches our customers.</p>
                            </div>

                            <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center mb-4">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <Truck className="text-primary h-6 w-6" />
                                    </div>
                                    <h3 className="font-semibold text-xl">Fast Shipping</h3>
                                </div>
                                <p className="text-muted-foreground">Enjoy free, fast delivery on all orders with optional express shipping for those urgent tech needs.</p>
                            </div>

                            <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center mb-4">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <Headphones className="text-primary h-6 w-6" />
                                    </div>
                                    <h3 className="font-semibold text-xl">Expert Support</h3>
                                </div>
                                <p className="text-muted-foreground">Our knowledgeable team is available 7 days a week to assist with any questions or technical issues.</p>
                            </div>

                            <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center mb-4">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <RefreshCw className="text-primary h-6 w-6" />
                                    </div>
                                    <h3 className="font-semibold text-xl">Easy Returns</h3>
                                </div>
                                <p className="text-muted-foreground">We offer a hassle-free 30-day return policy, giving you peace of mind with every purchase.</p>
                            </div>

                            <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center mb-4">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <Gift className="text-primary h-6 w-6" />
                                    </div>
                                    <h3 className="font-semibold text-xl">Loyalty Rewards</h3>
                                </div>
                                <p className="text-muted-foreground">Earn points with every purchase that you can redeem for discounts on future shopping.</p>
                            </div>

                            <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center mb-4">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <Clock className="text-primary h-6 w-6" />
                                    </div>
                                    <h3 className="font-semibold text-xl">Latest Innovations</h3>
                                </div>
                                <p className="text-muted-foreground">Stay ahead with our constantly updated catalog featuring the newest tech releases and innovations.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card p-8 rounded-lg border border-border">
                        <h2 className="text-2xl font-semibold text-center mb-6">Get in Touch</h2>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div>
                                <h3 className="font-medium mb-2">Email</h3>
                                <p className="text-muted-foreground">support@novatech.com</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Phone</h3>
                                <p className="text-muted-foreground">+1 (800) 555-NOVA</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Hours</h3>
                                <p className="text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}