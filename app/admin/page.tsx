import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Users, Package, AlertCircle, CheckCircle } from 'lucide-react'

async function getDashboardStats() {
  // During build time, return default values to avoid database connection issues
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    return {
      totalAppointments: 0,
      pendingAppointments: 0,
      totalOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
      totalAssessments: 0,
      pendingAssessments: 0,
    }
  }

  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    const [
      totalAppointments,
      pendingAppointments,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalAssessments,
      pendingAssessments
    ] = await Promise.all([
      // Appointments this month
      prisma.appointment.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      }),
      // Pending appointments
      prisma.appointment.count({
        where: {
          status: 'PENDING',
        },
      }),
      // Total orders this month
      prisma.order.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      }),
      // Pending orders (needing medical review)
      prisma.order.count({
        where: {
          medicalReviewStatus: 'PENDING',
        },
      }),
      // Completed orders this month
      prisma.order.count({
        where: {
          status: 'DELIVERED',
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      }),
      // Total risk assessments this month
      prisma.riskAssessment.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      }),
      // Pending risk assessments
      prisma.riskAssessment.count({
        where: {
          status: 'PENDING',
        },
      }),
    ])

    return {
      totalAppointments,
      pendingAppointments,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalAssessments,
      pendingAssessments,
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    // Return default values if database query fails
    return {
      totalAppointments: 0,
      pendingAppointments: 0,
      totalOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
      totalAssessments: 0,
      pendingAssessments: 0,
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const dashboardCards = [
    {
      title: 'Total Appointments',
      value: stats.totalAppointments,
      description: 'This month',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingAppointments,
      description: 'Need confirmation',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      description: 'This month',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Medical Reviews',
      value: stats.pendingOrders,
      description: 'Pending approval',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Completed Orders',
      value: stats.completedOrders,
      description: 'This month',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Risk Assessments',
      value: stats.pendingAssessments,
      description: 'Pending review',
      icon: Users,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to the admin panel. Overview of clinic operations and key metrics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => {
          const IconComponent = card.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <IconComponent className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${card.color}`}>
                  {card.value}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/admin/appointments"
                className="p-3 text-center bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-blue-900">Appointments</p>
              </a>
              <a
                href="/admin/orders"
                className="p-3 text-center bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <Package className="h-6 w-6 text-green-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-green-900">Orders</p>
              </a>
              <a
                href="/admin/risk-assessments"
                className="p-3 text-center bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
              >
                <Users className="h-6 w-6 text-primary-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-primary-900">Assessments</p>
              </a>
              <a
                href="/admin/time-slots"
                className="p-3 text-center bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <Clock className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-orange-900">Time Slots</p>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600">
                  {stats.totalOrders} new orders this month
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <p className="text-sm text-gray-600">
                  {stats.pendingOrders} orders awaiting medical review
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-600">
                  {stats.totalAppointments} appointments scheduled this month
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <p className="text-sm text-gray-600">
                  {stats.pendingAssessments} risk assessments pending review
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}