export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to the admin panel. Manage appointments and time slots.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Appointments
          </h3>
          <p className="text-3xl font-bold text-purple-600">24</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Pending Bookings
          </h3>
          <p className="text-3xl font-bold text-orange-600">8</p>
          <p className="text-sm text-gray-500">Need confirmation</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Available Slots
          </h3>
          <p className="text-3xl font-bold text-green-600">12</p>
          <p className="text-sm text-gray-500">Next 7 days</p>
        </div>
      </div>
    </div>
  )
}