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
import { TimeSlotForm } from '@/components/admin/time-slot-form'
import { type TimeSlotFormData } from '@/lib/validations/time-slot'
import { Plus, Edit, Trash2, Calendar } from 'lucide-react'

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
      </div>

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
            <p className="text-center py-8 text-gray-500">
              No time slots created yet. Add your first time slot above.
            </p>
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