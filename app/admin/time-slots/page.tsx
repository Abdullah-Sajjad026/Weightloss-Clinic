'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { TimeSlotForm } from '@/components/admin/time-slot-form'
import { type TimeSlotFormData } from '@/lib/validations/time-slot'
import { Plus, Edit, Trash2, Calendar, AlertTriangle } from 'lucide-react'

const DAYS_OF_WEEK = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
}

interface TimeSlot {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  duration: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count: {
    appointments: number
  }
}

export default function TimeSlotsPage() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null)
  const [bankHolidayMode, setBankHolidayMode] = useState(false)
  const [updatingBankHoliday, setUpdatingBankHoliday] = useState(false)
  const [settingUpInitialData, setSettingUpInitialData] = useState(false)

  const fetchTimeSlots = async () => {
    try {
      const response = await fetch('/api/admin/time-slots')
      if (response.ok) {
        const data = await response.json()
        setTimeSlots(data)
      }
    } catch (error) {
      console.error('Error fetching time slots:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTimeSlots()
  }, [])

  const handleCreateTimeSlot = async (data: TimeSlotFormData) => {
    const response = await fetch('/api/admin/time-slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      await fetchTimeSlots()
      setIsDialogOpen(false)
    } else {
      const error = await response.json()
      toast.error(error.error || 'Failed to create time slot')
    }
  }

  const handleUpdateTimeSlot = async (data: TimeSlotFormData) => {
    if (!editingSlot) return

    const response = await fetch(`/api/admin/time-slots/${editingSlot.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      await fetchTimeSlots()
      setEditingSlot(null)
    } else {
      const error = await response.json()
      toast.error(error.error || 'Failed to update time slot')
    }
  }

  const handleDeleteTimeSlot = async (id: string) => {
    const response = await fetch(`/api/admin/time-slots/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      await fetchTimeSlots()
    } else {
      const error = await response.json()
      toast.error(error.error || 'Failed to delete time slot')
    }
  }

  const handleBankHolidayToggle = async (enabled: boolean) => {
    setUpdatingBankHoliday(true)
    setBankHolidayMode(enabled)
    
    try {
      // Toggle time slots for bank holiday hours
      const slotsToUpdate = timeSlots.filter(slot => {
        if (enabled) {
          // Activate only 10AM-4PM slots, deactivate others
          const startHour = parseInt(slot.startTime.split(':')[0])
          return startHour < 10 || startHour >= 16
        } else {
          // Reactivate all normal business hour slots
          return true
        }
      })

      for (const slot of slotsToUpdate) {
        const newStatus = enabled ? 
          (parseInt(slot.startTime.split(':')[0]) >= 10 && parseInt(slot.startTime.split(':')[0]) < 16) :
          true

        await fetch(`/api/admin/time-slots/${slot.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...slot,
            isActive: newStatus
          })
        })
      }
      
      await fetchTimeSlots()
      toast.success(`Bank holiday mode ${enabled ? 'enabled' : 'disabled'}`)
    } catch (error) {
      console.error('Error updating bank holiday mode:', error)
      toast.error('Failed to update bank holiday mode')
      setBankHolidayMode(!enabled)
    } finally {
      setUpdatingBankHoliday(false)
    }
  }

  const handleSetupInitialData = async () => {
    setSettingUpInitialData(true)
    try {
      const response = await fetch('/api/admin/setup/initial-data', {
        method: 'POST'
      })
      const result = await response.json()
      
      if (result.success) {
        toast.success(`Created ${result.created} time slots successfully!`)
        await fetchTimeSlots()
      } else {
        toast.error(result.message || 'Failed to create time slots')
      }
    } catch (error) {
      console.error('Error setting up initial data:', error)
      toast.error('Failed to setup initial data')
    } finally {
      setSettingUpInitialData(false)
    }
  }

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}:00`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Time Slots</h1>
          <p className="text-gray-600">
            Manage available appointment time slots
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Bank Holiday Toggle */}
          <Card className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <div>
                  <div className="font-medium text-sm">Bank Holiday Mode</div>
                  <div className="text-xs text-gray-600">Only 10AM-4PM slots</div>
                </div>
              </div>
              <Switch
                checked={bankHolidayMode}
                onCheckedChange={handleBankHolidayToggle}
                disabled={updatingBankHoliday}
              />
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Time Slot
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Time Slot</DialogTitle>
          </DialogHeader>
          <TimeSlotForm onSubmit={handleCreateTimeSlot} />
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Available Time Slots
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading time slots...</p>
          ) : timeSlots.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No time slots found.</p>
              <Button onClick={handleSetupInitialData} disabled={settingUpInitialData}>
                {settingUpInitialData ? 'Setting up...' : 'Setup Initial Time Slots'}
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Appointments</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell className="font-medium">
                      {DAYS_OF_WEEK[slot.dayOfWeek as keyof typeof DAYS_OF_WEEK]}
                    </TableCell>
                    <TableCell>
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </TableCell>
                    <TableCell>{slot.duration} min</TableCell>
                    <TableCell>
                      <Badge variant={slot.isActive ? 'default' : 'secondary'}>
                        {slot.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {slot._count.appointments}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSlot(slot)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Time Slot</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this time slot?
                                {slot._count.appointments > 0 && (
                                  <span className="text-red-600 block mt-2">
                                    This slot has {slot._count.appointments} existing appointments and cannot be deleted.
                                  </span>
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteTimeSlot(slot.id)}
                                disabled={slot._count.appointments > 0}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {editingSlot && (
        <Dialog open={!!editingSlot} onOpenChange={() => setEditingSlot(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Time Slot</DialogTitle>
            </DialogHeader>
            <TimeSlotForm
              onSubmit={handleUpdateTimeSlot}
              initialData={{
                dayOfWeek: editingSlot.dayOfWeek,
                startTime: editingSlot.startTime,
                endTime: editingSlot.endTime,
                duration: editingSlot.duration,
                isActive: editingSlot.isActive,
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}