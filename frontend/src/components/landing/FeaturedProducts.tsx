import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description:
      "Bright floral notes with hints of bergamot and citrus. Light roast.",
    price: 24.99,
    image: "/images/products/img-one.jpg",
  },
  {
    id: 2,
    name: "Colombian Supremo",
    description: "Rich and balanced with caramel sweetness. Medium roast.",
    price: 22.99,
    image: "/images/products/img-two.jpg",
  },
  {
    id: 3,
    name: "Sumatra Mandheling",
    description: "Full-bodied with earthy notes and low acidity. Dark roast.",
    price: 26.99,
    image: "/images/products/img-three.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24 bg-background" id="products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Collections</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of premium coffee beans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col p-0 pb-6"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardFooter className="mt-auto flex items-center justify-between pt-4">
                <span className="text-2xl font-bold text-primary">
                  ${product.price}
                </span>
                <Button size="sm" className="gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
