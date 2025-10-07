import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sprout, Flame, TruckIcon } from "lucide-react";

const features = [
  {
    icon: Sprout,
    title: "Ethically Sourced",
    description:
      "Direct trade relationships with farmers ensuring fair wages and sustainable practices.",
  },
  {
    icon: Flame,
    title: "Fresh Roasted",
    description:
      "Small batch roasting ensures peak freshness and flavor in every cup you brew.",
  },
  {
    icon: TruckIcon,
    title: "Fast Delivery",
    description:
      "Free shipping on orders over $50 with delivery within 2-3 business days.",
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="text-primary">NEXASTORE</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            We're committed to delivering the finest coffee experience from bean
            to cup
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
