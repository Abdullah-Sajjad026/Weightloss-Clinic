"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, User, Phone, Mail, Scale, Ruler } from "lucide-react";
import Link from "next/link";
import { riskAssessmentQuestions } from "@/lib/risk-assessment-questions";

interface RiskAssessmentDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  heightFeet?: number;
  heightInches?: number;
  heightCm?: number;
  weightStone?: number;
  weightPounds?: number;
  weightKg?: number;
  unitSystem: string;
  responses: Record<string, any>;
  status: string;
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  canPurchaseMounjaro: boolean;
  authorizationExpiry?: string;
}

export default function RiskAssessmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [assessment, setAssessment] = useState<RiskAssessmentDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [canPurchaseMounjaro, setCanPurchaseMounjaro] = useState(false);
  const [authorizationExpiry, setAuthorizationExpiry] = useState("");
  const [reviewedBy, setReviewedBy] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchAssessment(params.id as string);
    }
  }, [params.id]);

  useEffect(() => {
    if (assessment) {
      setStatus(assessment.status);
      setAdminNotes(assessment.adminNotes || "");
      setReviewedBy(assessment.reviewedBy || "");
      setCanPurchaseMounjaro(assessment.canPurchaseMounjaro || false);
      setAuthorizationExpiry(assessment.authorizationExpiry || "");
    }
  }, [assessment]);

  const fetchAssessment = async (id: string) => {
    try {
      const response = await fetch(`/api/risk-assessments/${id}`);
      const data = await response.json();
      setAssessment(data.assessment);
    } catch (error) {
      console.error("Error fetching assessment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!assessment) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/risk-assessments/${assessment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          adminNotes,
          reviewedBy: reviewedBy || "Admin User",
          canPurchaseMounjaro,
          authorizationExpiry: authorizationExpiry || null,
        }),
      });

      if (response.ok) {
        // Refresh the data
        await fetchAssessment(assessment.id);
        toast.success("Assessment updated successfully");
      } else {
        toast.error("Failed to update assessment");
      }
    } catch (error) {
      console.error("Error updating assessment:", error);
      toast.error("Failed to update assessment");
    } finally {
      setSaving(false);
    }
  };

  const formatPhysicalInfo = () => {
    if (!assessment) return "";

    if (assessment.unitSystem === "imperial") {
      const height = `${assessment.heightFeet}'${assessment.heightInches}"`;
      const weight = `${assessment.weightStone}st ${assessment.weightPounds}lb`;
      return `${height}, ${weight}`;
    } else {
      return `${assessment.heightCm}cm, ${assessment.weightKg}kg`;
    }
  };

  const getQuestionLabel = (questionId: string) => {
    const question = riskAssessmentQuestions.find((q) => q.id === questionId);
    return question?.title || questionId;
  };

  const formatResponse = (questionId: string, response: any) => {
    const question = riskAssessmentQuestions.find((q) => q.id === questionId);

    if (!question) return String(response);

    if (question.type === "checkbox_list" && Array.isArray(response)) {
      return response
        .map((value) => {
          const option = question.options?.find((opt) => opt.value === value);
          return option?.label || value;
        })
        .join(", ");
    }

    if (question.type === "multiple_choice") {
      const option = question.options?.find((opt) => opt.value === response);
      return option?.label || response;
    }

    if (question.type === "yes_no") {
      return response === "yes" ? "Yes" : "No";
    }

    return String(response);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Assessment Not Found
          </h1>
          <Button asChild>
            <Link href="/admin/risk-assessments">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Assessments
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/admin/risk-assessments">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Assessments
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Risk Assessment Review
              </h1>
              <p className="text-gray-600">
                Submitted {new Date(assessment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Badge
              className={`${
                assessment.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : assessment.status === "APPROVED"
                  ? "bg-green-100 text-green-800"
                  : assessment.status === "REJECTED"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {assessment.status.replace("_", " ")}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Full Name
                    </Label>
                    <p className="text-gray-900">{assessment.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Physical Info
                    </Label>
                    <p className="text-gray-900">{formatPhysicalInfo()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Email
                    </Label>
                    <p className="text-gray-900">{assessment.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Phone
                    </Label>
                    <p className="text-gray-900">{assessment.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Responses */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(assessment.responses).map(
                    ([questionId, response]) => (
                      <div
                        key={questionId}
                        className="border-b border-gray-200 pb-4 last:border-b-0"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">
                          {getQuestionLabel(questionId)}
                        </h4>
                        <p className="text-gray-600 whitespace-pre-wrap">
                          {formatResponse(questionId, response)}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Review Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="REVIEWED">Reviewed</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                      <SelectItem value="REQUIRES_FOLLOWUP">
                        Requires Follow-up
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="reviewedBy">Reviewed By</Label>
                  <input
                    id="reviewedBy"
                    type="text"
                    value={reviewedBy}
                    onChange={(e) => setReviewedBy(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <Label htmlFor="adminNotes">Admin Notes</Label>
                  <Textarea
                    id="adminNotes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes about this assessment..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                {/* Mounjaro Authorization Section */}
                <div className="border-t pt-4 space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Mounjaro Authorization</Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Grant permission for this patient to purchase Mounjaro injections
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="canPurchaseMounjaro"
                      checked={canPurchaseMounjaro}
                      onChange={(e) => setCanPurchaseMounjaro(e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="canPurchaseMounjaro" className="text-sm font-medium">
                      Authorize Mounjaro purchase
                    </Label>
                  </div>

                  {canPurchaseMounjaro && (
                    <div>
                      <Label htmlFor="authorizationExpiry">Authorization Expiry (Optional)</Label>
                      <input
                        id="authorizationExpiry"
                        type="date"
                        value={authorizationExpiry}
                        onChange={(e) => setAuthorizationExpiry(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty for no expiration
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full"
                >
                  {saving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Contact Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Patient</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={`mailto:${assessment.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={`tel:${assessment.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Patient
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
