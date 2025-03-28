import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "./components/ui/sonner";
import Index from "./pages/Index";
import { CartProvider } from "./providers/CardProvider";
import { WishlistProvider } from "./providers/WishlistProvider";
import Categories from "./pages/Categories";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BrandDashboard from "./pages/brand/Dashboard";
import AddProduct from "./pages/brand/AddProduct";
import Checkout from "./pages/Checkout";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <WishlistProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:id" element={<Categories />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/brand/dashboard" element={<BrandDashboard />} />
                <Route path="/brand/products/add" element={<AddProduct />} />
                <Route path="/checkout" element={<Checkout />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                {/* <Route path="*" element={<NotFound />} /> */}
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;