export default function CustomerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Card */}
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-sm font-medium text-muted-foreground">Wishlist Items</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-sm font-medium text-muted-foreground">Total Spent</h3>
          <p className="text-3xl font-bold mt-2">NOK 0</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="border rounded-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="p-6">
          <p className="text-muted-foreground text-center py-8">
            No orders yet. Start shopping to see your orders here!
          </p>
        </div>
      </div>
    </div>
  )
}
