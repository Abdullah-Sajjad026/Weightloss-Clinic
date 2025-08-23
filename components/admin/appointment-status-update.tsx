"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, XCircle, UserX } from "lucide-react";

const STATUS_OPTIONS = [
  {
    value: "PENDING",
    label: "Pending",
    description: "Appointment request received, awaiting confirmation",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
  },
  {
    value: "CONFIRMED",
    label: "Confirmed",
    description: "Appointment confirmed with patient, video call scheduled",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: CheckCircle,
  },
  {
    value: "COMPLETED",
    label: "Completed",
    description: "Video consultation successfully completed",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
    description: "Appointment cancelled by patient or clinic",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
  },
  {
    value: "NO_SHOW",
    label: "No Show",
    description: "Patient did not attend scheduled appointment",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: UserX,
  },
];

interface AppointmentStatusUpdateProps {
  currentStatus: string;
  currentNotes?: string;
  onStatusUpdate: (status: string, notes?: string) => Promise<void>;
  isLoading?: boolean;
}

export function AppointmentStatusUpdate({
  currentStatus,
  currentNotes,
  onStatusUpdate,
  isLoading = false,
}: AppointmentStatusUpdateProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    if (selectedStatus === currentStatus && notes === (currentNotes || "")) {
      return; // No changes
    }

    setIsUpdating(true);
    try {
      await onStatusUpdate(selectedStatus, notes);
    } finally {
      setIsUpdating(false);
    }
  };

  const getCurrentStatus = () => {
    return STATUS_OPTIONS.find((option) => option.value === currentStatus);
  };

  const getSelectedStatus = () => {
    return STATUS_OPTIONS.find((option) => option.value === selectedStatus);
  };

  const currentStatusInfo = getCurrentStatus();
  const selectedStatusInfo = getSelectedStatus();
  const hasChanges =
    selectedStatus !== currentStatus || notes !== (currentNotes || "");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Status Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="space-y-2">
          <Label>Current Status</Label>
          <div className="flex items-center gap-2">
            {currentStatusInfo && (
              <>
                <currentStatusInfo.icon className="h-4 w-4" />
                <Badge className={currentStatusInfo.color}>
                  {currentStatusInfo.label}
                </Badge>
                <span className="text-sm text-gray-500">
                  {currentStatusInfo.description}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Status Selection */}
        <div className="space-y-2">
          <Label htmlFor="status">Update Status</Label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="whitespace-normal h-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <option.icon className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Preview */}
        {selectedStatus !== currentStatus && selectedStatusInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <selectedStatusInfo.icon className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">
                Preview New Status:
              </span>
            </div>
            <Badge className={selectedStatusInfo.color}>
              {selectedStatusInfo.label}
            </Badge>
            <p className="text-sm text-blue-700 mt-1">
              {selectedStatusInfo.description}
            </p>
          </div>
        )}

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Internal Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add internal notes about this appointment..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
          <p className="text-xs text-gray-500">
            These notes are for internal use only and not visible to patients.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-600">
            {hasChanges ? (
              <span className="text-orange-600 font-medium">
                Unsaved changes detected
              </span>
            ) : (
              <span>No changes to save</span>
            )}
          </div>

          <div className="flex gap-2">
            {hasChanges && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedStatus(currentStatus);
                  setNotes(currentNotes || "");
                }}
              >
                Reset
              </Button>
            )}
            <Button
              onClick={handleUpdate}
              disabled={!hasChanges || isUpdating || isLoading}
            >
              {isUpdating ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Important Reminder</p>
              <p>
                Status updates are for internal tracking only. You must contact
                the patient directly to confirm appointments and provide video
                call details.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
