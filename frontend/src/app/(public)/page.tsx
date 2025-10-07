import FeaturedProducts from "@/components/landing/FeaturedProducts";
import Features from "@/components/landing/Features";
import HeroSection from "@/components/landing/HeroSection";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      {/* Features Section */}
      <Features />
      {/* Featured Products Section */}
      <FeaturedProducts />
    </>
  )
}
