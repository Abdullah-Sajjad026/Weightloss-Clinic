'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Calendar, Search, Filter, Eye, Edit } from 'lucide-react'
import { AppointmentDetailsModal } from '@/components/admin/appointment-details-modal'

const STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-200',
  COMPLETED: 'bg-green-100 text-green-800 border-green-200',
  CANCELLED: 'bg-red-100 text-red-800 border-red-200',
  NO_SHOW: 'bg-gray-100 text-gray-800 border-gray-200',
}

const CONSULTATION_TYPES = {
  INJECTIONS: 'Weight Loss Injections',
  PILLS: 'Weight Loss Pills',
  SURGERY: 'Bariatric Surgery',
  GENERAL: 'General Consultation',
}

const DAYS_OF_WEEK = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
}

interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  consultationType: keyof typeof CONSULTATION_TYPES
  preferredDate: string
  status: string
  notes?: string
  timezone?: string
  meetingLink?: string
  meetingId?: string
  createdAt: string
  timeSlot: {
    dayOfWeek: number
    startTime: string
    endTime: string
    duration: number
  }
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [consultationFilter, setConsultationFilter] = useState<string>('all')
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/admin/appointments')
      if (response.ok) {
        const data = await response.json()
        setAppointments(data)
        setFilteredAppointments(data)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  useEffect(() => {
    let filtered = appointments

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.phone.includes(searchTerm)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === statusFilter)
    }

    // Consultation type filter
    if (consultationFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.consultationType === consultationFilter)
    }

    setFilteredAppointments(filtered)
  }, [appointments, searchTerm, statusFilter, consultationFilter])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}:00`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const getStatusCounts = () => {
    return {
      total: appointments.length,
      pending: appointments.filter(a => a.status === 'PENDING').length,
      confirmed: appointments.filter(a => a.status === 'CONFIRMED').length,
      completed: appointments.filter(a => a.status === 'COMPLETED').length,
      cancelled: appointments.filter(a => a.status === 'CANCELLED').length,
      noShow: appointments.filter(a => a.status === 'NO_SHOW').length,
    }
  }

  const counts = getStatusCounts()

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }

  const handleAppointmentUpdate = (updatedAppointment: Appointment) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === updatedAppointment.id ? updatedAppointment : apt
      )
    )
    setSelectedAppointment(updatedAppointment)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">
            Manage and track all appointment bookings
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{counts.total}</div>
            <div className="text-sm text-gray-500">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{counts.pending}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{counts.confirmed}</div>
            <div className="text-sm text-gray-500">Confirmed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{counts.completed}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{counts.cancelled}</div>
            <div className="text-sm text-gray-500">Cancelled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">{counts.noShow}</div>
            <div className="text-sm text-gray-500">No Show</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="NO_SHOW">No Show</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Consultation Type</label>
              <Select value={consultationFilter} onValueChange={setConsultationFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="INJECTIONS">Weight Loss Injections</SelectItem>
                  <SelectItem value="PILLS">Weight Loss Pills</SelectItem>
                  <SelectItem value="SURGERY">Bariatric Surgery</SelectItem>
                  <SelectItem value="GENERAL">General Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Appointments ({filteredAppointments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading appointments...</p>
          ) : filteredAppointments.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No appointments found matching your criteria.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Preferred Date</TableHead>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        {appointment.name}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{appointment.email}</div>
                          <div className="text-gray-500">{appointment.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {CONSULTATION_TYPES[appointment.consultationType]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatDate(appointment.preferredDate)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {DAYS_OF_WEEK[appointment.timeSlot.dayOfWeek as keyof typeof DAYS_OF_WEEK]}s
                          </div>
                          <div className="text-gray-500">
                            {formatTime(appointment.timeSlot.startTime)} - {formatTime(appointment.timeSlot.endTime)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={STATUS_COLORS[appointment.status as keyof typeof STATUS_COLORS] || STATUS_COLORS.PENDING}>
                          {appointment.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500">
                          {formatDate(appointment.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAppointmentClick(appointment)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAppointmentClick(appointment)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status update message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Status updates are for your records only. Remember to contact patients directly to confirm appointments and provide video call details.
        </p>
      </div>

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedAppointment(null)
        }}
        onAppointmentUpdate={handleAppointmentUpdate}
      />
    </div>
  )
}