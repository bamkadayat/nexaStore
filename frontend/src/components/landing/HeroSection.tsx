import Link from "next/link";
export default function HeroSection() {
  return (
    <section className="container py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Column - Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Brew Your Perfect
            <span className="block text-coffee-cream mt-2">Moment</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            From farm to cup, experience the finest artisan coffee beans,
            roasted to perfection for coffee lovers who demand excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              Explore Collection
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border-2 border-input text-foreground rounded-md font-semibold hover:bg-accent transition-colors text-center"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="w-full max-w-xs mx-auto">
          <img
            src="/images/landing/hero-img.png"
            alt="Coffee beans and brewing"
            className="w-full h-auto"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
