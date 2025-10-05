export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your store and monitor performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">NOK 0</p>
          <p className="text-xs text-green-600 mt-1">+0% from last month</p>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-sm font-medium text-muted-foreground">Orders</h3>
          <p className="text-3xl font-bold mt-2">0</p>
          <p className="text-xs text-muted-foreground mt-1">0 pending</p>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-sm font-medium text-muted-foreground">Products</h3>
          <p className="text-3xl font-bold mt-2">0</p>
          <p className="text-xs text-muted-foreground mt-1">0 out of stock</p>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-sm font-medium text-muted-foreground">Customers</h3>
          <p className="text-3xl font-bold mt-2">0</p>
          <p className="text-xs text-green-600 mt-1">+0 new this month</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="border rounded-lg bg-card">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="p-6">
          <p className="text-muted-foreground text-center py-8">
            No orders yet.
          </p>
        </div>
      </div>

      {/* Low Stock Products */}
      <div className="border rounded-lg bg-card">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Low Stock Products</h2>
        </div>
        <div className="p-6">
          <p className="text-muted-foreground text-center py-8">
            All products are well stocked.
          </p>
        </div>
      </div>
    </div>
  )
}
