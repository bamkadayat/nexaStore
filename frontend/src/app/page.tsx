import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center max-w-[600px] mx-auto">
          Welcome to NexaStore!
        </h1>
        <p className="text-center text-lg text-muted-foreground max-w-[600px] mx-auto">
          Your one-stop shop for premium coffee beans and brewing equipment.
          Explore our wide selection of products and elevate your coffee
          experience.
        </p>
      </main>
    </div>
  );
}
