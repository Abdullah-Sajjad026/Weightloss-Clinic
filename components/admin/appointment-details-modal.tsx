"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AppointmentStatusUpdate } from "./appointment-status-update";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  FileText,
  Copy,
  ExternalLink,
} from "lucide-react";

const CONSULTATION_TYPES = {
  INJECTIONS: "Weight Loss Injections",
  PILLS: "Weight Loss Pills",
  SURGERY: "Bariatric Surgery",
  GENERAL: "General Consultation",
};

const DAYS_OF_WEEK = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  consultationType: keyof typeof CONSULTATION_TYPES;
  preferredDate: string;
  status: string;
  notes?: string;
  createdAt: string;
  timeSlot: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    duration: number;
  };
}

interface AppointmentDetailsModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onAppointmentUpdate: (updatedAppointment: Appointment) => void;
}

export function AppointmentDetailsModal({
  appointment,
  isOpen,
  onClose,
  onAppointmentUpdate,
}: AppointmentDetailsModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!appointment) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}:00`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleStatusUpdate = async (status: string, notes?: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `/api/admin/appointments/${appointment.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, notes }),
        }
      );

      if (response.ok) {
        const updatedAppointment = await response.json();
        onAppointmentUpdate(updatedAppointment);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update appointment");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment");
    } finally {
      setIsUpdating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-7xl max-h-[90vh] overflow-y-auto w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Appointment Details - {appointment.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient & Appointment Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information */}
            <div className="rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-4 w-4" />
                Patient Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-gray-900">{appointment.name}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(appointment.name)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email Address
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900">{appointment.email}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(appointment.email)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          window.open(`mailto:${appointment.email}`)
                        }
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900">{appointment.phone}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(appointment.phone)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`tel:${appointment.phone}`)}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Consultation Type
                    </label>
                    <div className="mt-1">
                      <Badge variant="outline">
                        {CONSULTATION_TYPES[appointment.consultationType]}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Appointment Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Preferred Date
                    </label>
                    <p className="text-gray-900 font-medium">
                      {formatDate(appointment.preferredDate)}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Time Slot
                    </label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-900 font-medium">
                          {
                            DAYS_OF_WEEK[
                              appointment.timeSlot
                                .dayOfWeek as keyof typeof DAYS_OF_WEEK
                            ]
                          }
                          s
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatTime(appointment.timeSlot.startTime)} -{" "}
                          {formatTime(appointment.timeSlot.endTime)} (
                          {appointment.timeSlot.duration} min)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Request Submitted
                    </label>
                    <p className="text-gray-900">
                      {formatDateTime(appointment.createdAt)}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Appointment ID
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-white px-2 py-1 rounded border">
                        {appointment.id}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(appointment.id)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Notes */}
            {appointment.notes && (
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Patient Notes
                </h3>
                <div className="bg-white rounded p-3 border">
                  <p className="text-gray-800 italic">"{appointment.notes}"</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Status Management */}
          <div className="lg:col-span-1">
            <AppointmentStatusUpdate
              currentStatus={appointment.status}
              currentNotes={appointment.notes}
              onStatusUpdate={handleStatusUpdate}
              isLoading={isUpdating}
            />
          </div>
        </div>

        <Separator className="my-6" />

        {/* Footer Actions */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Last updated: {formatDateTime(appointment.createdAt)}
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
