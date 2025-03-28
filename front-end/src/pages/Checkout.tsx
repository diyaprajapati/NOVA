import { useState } from "react";
import { Check, CreditCard, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../providers/CardProvider";
import { toast } from "sonner";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export default function Checkout() {
    const { items, clearCart } = useCart();
    const navigate = useNavigate();
    const [paymentStep, setPaymentStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Calculate totals
    const subtotal = items.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);

    const shipping = 10.00;
    const tax = subtotal * 0.07;
    const total = subtotal + shipping + tax;

    const handleSubmitOrder = () => {
        setProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setProcessing(false);
            setPaymentSuccess(true);
            clearCart();

            toast("Order placed successfully!", {
                description: "Your order has been placed and will be shipped soon.",
            });

            // Redirect to home after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }, 1500);
    };

    // Redirect if cart is empty
    if (items.length === 0 && !paymentSuccess) {
        return (
            <Layout>
                <div className="max-w-lg mx-auto py-16 text-center">
                    <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8">
                        You need to add items to your cart before proceeding to checkout.
                    </p>
                    <Button asChild>
                        <Link to="/products">Browse Products</Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    // Show success message
    if (paymentSuccess) {
        return (
            <Layout>
                <div className="max-w-lg mx-auto py-16 text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
                        <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
                    <p className="text-muted-foreground mb-8">
                        Your order has been placed and will be shipped soon. You will receive an email confirmation shortly.
                    </p>
                    <Button asChild>
                        <Link to="/">Return to Home</Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="shipping" value={paymentStep} onValueChange={(value) => setPaymentStep(value as any)}>
                            <TabsList className="w-full grid grid-cols-3 mb-8">
                                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                                <TabsTrigger value="payment" disabled={paymentStep === 'shipping'}>Payment</TabsTrigger>
                                <TabsTrigger value="review" disabled={paymentStep !== 'review'}>Review</TabsTrigger>
                            </TabsList>

                            <TabsContent value="shipping" className="mt-0">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Shipping Address</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="first-name">First Name</Label>
                                                <Input id="first-name" placeholder="John" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="last-name">Last Name</Label>
                                                <Input id="last-name" placeholder="Doe" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="your@email.com" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Input id="address" placeholder="123 Main St" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City</Label>
                                                <Input id="city" placeholder="New York" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state">State</Label>
                                                <Input id="state" placeholder="NY" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="zip">ZIP Code</Label>
                                                <Input id="zip" placeholder="10001" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="country">Country</Label>
                                                <Input id="country" placeholder="United States" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" placeholder="(123) 456-7890" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="notes">Order Notes (Optional)</Label>
                                            <Textarea id="notes" placeholder="Special instructions for delivery" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={() => setPaymentStep('payment')}>Continue to Payment</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="payment" className="mt-0">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Method</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="card-name">Name on Card</Label>
                                            <Input id="card-name" placeholder="John Doe" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="card-number">Card Number</Label>
                                            <Input id="card-number" placeholder="4242 4242 4242 4242" />
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-1 space-y-2">
                                                <Label htmlFor="exp-month">Month</Label>
                                                <Input id="exp-month" placeholder="MM" />
                                            </div>
                                            <div className="col-span-1 space-y-2">
                                                <Label htmlFor="exp-year">Year</Label>
                                                <Input id="exp-year" placeholder="YY" />
                                            </div>
                                            <div className="col-span-1 space-y-2">
                                                <Label htmlFor="cvc">CVC</Label>
                                                <Input id="cvc" placeholder="123" />
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="save-card" />
                                            <label
                                                htmlFor="save-card"
                                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Save card for future purchases
                                            </label>
                                        </div>

                                        <Alert className="bg-muted/50">
                                            <CreditCard className="h-4 w-4" />
                                            <AlertTitle>Secure Payment</AlertTitle>
                                            <AlertDescription>
                                                Your payment information is encrypted and secure. We never store your full card details.
                                            </AlertDescription>
                                        </Alert>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline" onClick={() => setPaymentStep('shipping')}>
                                            Back
                                        </Button>
                                        <Button onClick={() => setPaymentStep('review')}>
                                            Review Order
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="review" className="mt-0">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Review Order</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="font-medium mb-2">Order Items</h3>
                                                <div className="space-y-4">
                                                    {items.map((item) => (
                                                        <div key={item.product.id} className="flex items-center space-x-4">
                                                            <div className="h-16 w-16 rounded-md overflow-hidden bg-muted">
                                                                <img
                                                                    src={`${item.product.image}?w=64&h=64&fit=crop&auto=format`}
                                                                    alt={item.product.name}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="text-sm font-medium">{item.product.name}</h4>
                                                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                                            </div>
                                                            <div className="text-sm font-medium">
                                                                ${(item.product.price * item.quantity).toFixed(2)}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="border-t pt-4">
                                                <h3 className="font-medium mb-2">Payment Details</h3>
                                                <div className="rounded-lg bg-muted/50 p-4 flex items-center space-x-3">
                                                    <CreditCard className="h-6 w-6" />
                                                    <div>
                                                        <p className="text-sm font-medium">Credit Card</p>
                                                        <p className="text-xs text-muted-foreground">**** **** **** 4242</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t pt-4">
                                                <h3 className="font-medium mb-2">Shipping Address</h3>
                                                <p className="text-sm">
                                                    John Doe<br />
                                                    123 Main St<br />
                                                    New York, NY 10001<br />
                                                    United States
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline" onClick={() => setPaymentStep('payment')}>
                                            Back
                                        </Button>
                                        <Button
                                            onClick={handleSubmitOrder}
                                            disabled={processing}
                                            className="min-w-[120px]"
                                        >
                                            {processing ? "Processing..." : "Place Order"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex justify-between text-sm">
                                            <span>
                                                {item.product.name} × {item.quantity}
                                            </span>
                                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between font-medium">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                        <ShieldCheck className="h-5 w-5" />
                                        <span>Secure checkout powered by DarkLight</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}