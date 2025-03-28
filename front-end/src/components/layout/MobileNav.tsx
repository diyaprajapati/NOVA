import { Link } from "react-router-dom";
import { ShieldCheck, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "../ui/ThemeToggle";

interface MobileNavProps {
    open: boolean;
    onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="left" className="w-full sm:max-w-sm">
                <SheetHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        <span className="font-bold text-xl">DarkLight</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </SheetHeader>

                <ScrollArea className="h-[calc(100vh-8rem)] py-6">
                    <div className="flex flex-col space-y-4">
                        <Link to="/" className="text-lg font-medium" onClick={onClose}>
                            Home
                        </Link>
                        <Link to="/products" className="text-lg font-medium" onClick={onClose}>
                            Products
                        </Link>
                        <Link to="/categories" className="text-lg font-medium" onClick={onClose}>
                            Categories
                        </Link>
                        <Link to="/about" className="text-lg font-medium" onClick={onClose}>
                            About
                        </Link>

                        <Separator className="my-2" />

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Theme</span>
                            <ThemeToggle />
                        </div>

                        <Separator className="my-2" />

                        <div className="grid grid-cols-2 gap-2 pt-4">
                            <Button variant="outline" asChild>
                                <Link to="/sign-in" onClick={onClose}>Sign In</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/sign-up" onClick={onClose}>Sign Up</Link>
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}