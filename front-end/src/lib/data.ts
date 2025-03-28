export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    bestseller?: boolean;
    featured?: boolean;
    new?: boolean;
    rating: number;
    reviews: number;
  };
  
  export const products: Product[] = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      description: "Immersive sound quality with active noise cancellation for the ultimate listening experience.",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      category: "audio",
      bestseller: true,
      featured: true,
      rating: 4.8,
      reviews: 342
    },
    {
      id: "2",
      name: "Ultra-Thin Laptop",
      description: "Powerful performance in an incredibly thin and light design for maximum portability.",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      category: "computers",
      featured: true,
      rating: 4.7,
      reviews: 218
    },
    {
      id: "3",
      name: "Smart Watch Series 5",
      description: "Stay connected and monitor your health with this advanced smartwatch.",
      price: 429.99,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
      category: "wearables",
      new: true,
      rating: 4.6,
      reviews: 156
    },
    {
      id: "4",
      name: "Professional Camera",
      description: "Capture stunning photos and videos with this high-performance digital camera.",
      price: 1899.99,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      category: "cameras",
      bestseller: true,
      rating: 4.9,
      reviews: 89
    },
    {
      id: "5",
      name: "Wireless Earbuds",
      description: "Crystal clear sound with extended battery life in a compact design.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
      category: "audio",
      new: true,
      featured: true,
      rating: 4.5,
      reviews: 276
    },
    {
      id: "6",
      name: "Gaming Console Pro",
      description: "Next-generation gaming with stunning graphics and lightning-fast performance.",
      price: 499.99,
      image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42",
      category: "gaming",
      bestseller: true,
      rating: 4.7,
      reviews: 312
    },
    {
      id: "7",
      name: "4K Smart TV",
      description: "Immersive viewing experience with vibrant colors and smart features.",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      category: "tv",
      featured: true,
      rating: 4.6,
      reviews: 198
    },
    {
      id: "8",
      name: "Portable Bluetooth Speaker",
      description: "Powerful sound in a compact, waterproof design for music anywhere.",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
      category: "audio",
      rating: 4.4,
      reviews: 231
    }
  ];
  
  export const categories = [
    {
      id: "audio",
      name: "Audio",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
      count: 15
    },
    {
      id: "computers",
      name: "Computers",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      count: 23
    },
    {
      id: "wearables",
      name: "Wearables",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
      count: 12
    },
    {
      id: "cameras",
      name: "Cameras",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      count: 8
    },
    {
      id: "gaming",
      name: "Gaming",
      image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42",
      count: 19
    },
    {
      id: "tv",
      name: "TVs",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      count: 7
    }
  ];