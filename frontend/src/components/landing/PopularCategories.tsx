import Link from "next/link";
import { Coffee, Flame, PackageCheck, Gift, Sparkles, Tag } from "lucide-react";

const categories = [
  {
    name: "Coffee Beans",
    icon: Coffee,
    href: "/products?category=beans",
  },
  {
    name: "Roasted",
    icon: Flame,
    href: "/products?category=roasted",
  },
  {
    name: "Equipment",
    icon: PackageCheck,
    href: "/products?category=equipment",
  },
  {
    name: "Gift Sets",
    icon: Gift,
    href: "/products?category=gifts",
  },
  {
    name: "Premium",
    icon: Sparkles,
    href: "/products?category=premium",
  },
  {
    name: "Special Offers",
    icon: Tag,
    href: "/products?category=offers",
  },
];

export default function PopularCategories() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-coffee-dark">
          Popular Categories
        </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              href={category.href}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-muted flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
                <Icon className="w-10 h-10 md:w-12 md:h-12 text-foreground transition-colors group-hover:text-coffee-dark" />
              </div>
              <span className="text-sm md:text-base font-medium text-center transition-colors group-hover:text-primary">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
      </div>
    </section>
  );
}
