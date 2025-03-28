import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../providers/ThemeProvider";
import { Button } from "../ui/button";

export function Hero() {
    const { theme } = useTheme();

    return (
        <section className="relative min-h-screen flex items-center pt-20">
            {/* Background gradient effect */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className={`
          absolute top-0 left-0 right-0 h-[500px] 
          ${theme === 'dark'
                        ? 'bg-gradient-to-br from-blue-500/20 via-violet-800/10 to-background'
                        : 'bg-gradient-to-br from-blue-100 via-indigo-50 to-background'}
          blur-3xl opacity-50 transform-gpu
        `} />
            </div>

            <div className="page-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-16">
                <div className="flex flex-col justify-center animate-fade-in">
                    <div className="space-y-5">
                        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm mb-2">
                            New Collection 2024
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight animate-slide-up [animation-delay:200ms]">
                            Redefining the<br /> future of tech
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed animate-slide-up [animation-delay:400ms]">
                            Discover our curated collection of premium tech products designed for the modern lifestyle.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4 animate-slide-up [animation-delay:600ms]">
                            <Button size="lg" className="rounded-full gap-2 group">
                                Shop Now
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full">
                                Learn More
                            </Button>
                        </div>
                        <div className="flex items-center gap-x-8 gap-y-2 flex-wrap pt-8 text-sm text-muted-foreground animate-slide-up [animation-delay:800ms]">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                Free shipping
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                Secure payment
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-amber-500" />
                                Money-back guarantee
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative flex items-center justify-center">
                    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden neo-morphism animate-fade-in [animation-delay:400ms]">
                        <img
                            src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=1200&h=1600&fit=crop&auto=format"
                            alt="Featured Product"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="bg-background/30 backdrop-blur-xl p-5 rounded-xl glass-morphism">
                                <h3 className="text-lg font-medium">Premium Wireless Headphones</h3>
                                <p className="text-sm opacity-80 mb-3">Immersive sound quality with active noise cancellation</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">$349.99</span>
                                    <Link to="/products/1">
                                        <Button size="sm" variant="secondary" className="rounded-full">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -z-10 top-[20%] right-[10%] h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="absolute -z-10 bottom-[10%] left-[5%] h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
                </div>
            </div>
        </section>
    );
}