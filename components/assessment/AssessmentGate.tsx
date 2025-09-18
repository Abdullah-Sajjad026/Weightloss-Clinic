"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AssessmentGateProps {
  onEligibilityConfirmed: () => void;
  productName?: string;
}

interface VerificationResult {
  eligible: boolean;
  reason?: string;
  message: string;
  status?: string;
  assessmentDate?: string;
  approvedBy?: string;
  approvedAt?: string;
  expiresAt?: string;
}

export default function AssessmentGate({ 
  onEligibilityConfirmed, 
  productName = "Mounjaro" 
}: AssessmentGateProps) {
  const [email, setEmail] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [showEmailInput, setShowEmailInput] = useState(true);

  const checkAssessment = async () => {
    if (!email.trim()) return;

    setIsChecking(true);
    try {
      const response = await fetch('/api/assessment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();
      setResult(data);

      if (data.eligible) {
        setShowEmailInput(false);
        onEligibilityConfirmed();
      }
    } catch (error) {
      console.error('Assessment check failed:', error);
      setResult({
        eligible: false,
        message: 'Failed to verify assessment. Please try again.',
      });
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusIcon = (reason?: string) => {
    switch (reason) {
      case 'NO_ASSESSMENT':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'NOT_APPROVED':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'NOT_AUTHORIZED':
      case 'EXPIRED':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  const getStatusColor = (reason?: string) => {
    switch (reason) {
      case 'NO_ASSESSMENT':
        return "bg-amber-100 text-amber-800 border-amber-200";
      case 'NOT_APPROVED':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'NOT_AUTHORIZED':
      case 'EXPIRED':
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  if (!showEmailInput && result?.eligible) {
    return (
      <div className="space-y-4">
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Assessment Verified</p>
              <p className="text-sm text-green-700">
                You are authorized to purchase {productName}
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 border-amber-200 bg-amber-50">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 mb-2">
              Medical Assessment Required
            </h3>
            <p className="text-sm text-amber-700 mb-4">
              {productName} is a prescription medication that requires a completed and approved 
              medical assessment before purchase. Please verify your eligibility below.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Mail className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold">Verify Assessment Status</h3>
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                id="email"
                type="email"
                placeholder="Enter the email used for your assessment"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkAssessment()}
                disabled={isChecking}
              />
              <Button 
                onClick={checkAssessment}
                disabled={!email.trim() || isChecking}
              >
                {isChecking ? "Checking..." : "Verify"}
              </Button>
            </div>
          </div>

          {result && (
            <div className={`p-4 rounded-lg border ${getStatusColor(result.reason)}`}>
              <div className="flex items-start space-x-3">
                {getStatusIcon(result.reason)}
                <div className="flex-1">
                  <p className="font-medium">{result.message}</p>
                  
                  {result.reason === 'NO_ASSESSMENT' && (
                    <div className="mt-3">
                      <Link href="/assessment">
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                          Complete Assessment Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )}
                  
                  {result.reason === 'NOT_APPROVED' && (
                    <div className="mt-2">
                      <p className="text-sm">
                        Status: <Badge variant="outline">{result.status}</Badge>
                      </p>
                      <p className="text-sm mt-1">
                        Our medical team is reviewing your assessment. You'll be notified once approved.
                      </p>
                    </div>
                  )}
                  
                  {(result.reason === 'NOT_AUTHORIZED' || result.reason === 'EXPIRED') && (
                    <div className="mt-3">
                      <Link href="/assessment">
                        <Button size="sm" variant="outline">
                          Complete New Assessment
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="text-sm text-blue-700">
          <p className="font-medium mb-1">Haven't completed an assessment yet?</p>
          <p>Our medical assessment takes 5-10 minutes and helps ensure {productName} is right for you.</p>
          <Link href="/assessment" className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800">
            Start Assessment
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </Card>
    </div>
  );
}