export default function HomePage() {
  return (
    <div className="container py-12">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to NexaStore
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover premium coffee beans and brewing equipment for the perfect cup.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/products"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90"
          >
            Shop Now
          </a>
          <a
            href="/about"
            className="px-6 py-3 border border-input rounded-md font-medium hover:bg-accent"
          >
            Learn More
          </a>
        </div>
      </section>
    </div>
  )
}
