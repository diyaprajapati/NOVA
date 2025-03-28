import { Categories } from "../components/home/Categories";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { Hero } from "../components/home/Hero";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export default function Index() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <FeaturedProducts />
                <Categories />
            </main>
            <Footer />
        </>
    );
}