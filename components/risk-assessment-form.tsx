"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { PersonalInfoStep } from "./risk-assessment/personal-info-step";
import { PhysicalInfoStep } from "./risk-assessment/physical-info-step";
import { QuestionStep } from "./risk-assessment/question-step";
import {
  riskAssessmentQuestions,
  getVisibleQuestions,
  getNextQuestionId,
  getPreviousQuestionId,
  getProgressPercentage,
  type Question,
} from "@/lib/risk-assessment-questions";
import { useUser, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

type Step = "physical" | string; // string for question IDs - removed "personal"

interface FormData {
  // Physical Information (personal info now comes from user account)
  heightFeet?: number;
  heightInches?: number;
  heightCm?: number;
  weightStone?: number;
  weightPounds?: number;
  weightKg?: number;
  unitSystem: "imperial" | "metric";

  // Question Responses
  responses: Record<string, any>;
}

export function RiskAssessmentForm() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [currentStep, setCurrentStep] = useState<Step>("physical");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    unitSystem: "imperial",
    responses: {},
  });

  // Get current question for progress calculation
  const getCurrentQuestion = (): Question | null => {
    if (currentStep === "physical") return null;
    return riskAssessmentQuestions.find((q) => q.id === currentStep) || null;
  };

  // Calculate overall progress
  const getOverallProgress = (): number => {
    const totalSteps = 1 + getVisibleQuestions(formData.responses).length; // physical + questions (no personal step)
    let currentStepIndex = 0;

    if (currentStep === "physical") currentStepIndex = 0;
    else {
      const visibleQuestions = getVisibleQuestions(formData.responses);
      const questionIndex = visibleQuestions.findIndex(
        (q) => q.id === currentStep
      );
      currentStepIndex = 1 + (questionIndex >= 0 ? questionIndex : 0);
    }

    return Math.round((currentStepIndex / totalSteps) * 100);
  };

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateResponse = useCallback((questionId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      responses: { ...prev.responses, [questionId]: value },
    }));
  }, []);

  const goToNextStep = () => {
    if (currentStep === "physical") {
      // Go to first question
      const firstQuestionId = getVisibleQuestions(formData.responses)[0]?.id;
      if (firstQuestionId) {
        setCurrentStep(firstQuestionId);
      }
    } else {
      // Go to next question or submit
      const nextQuestionId = getNextQuestionId(currentStep, formData.responses);
      if (nextQuestionId) {
        setCurrentStep(nextQuestionId);
      } else {
        // This is the last question, submit the form
        handleSubmit();
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep !== "physical") {
      const prevQuestionId = getPreviousQuestionId(
        currentStep,
        formData.responses
      );
      if (prevQuestionId) {
        setCurrentStep(prevQuestionId);
      } else {
        setCurrentStep("physical");
      }
    }
  };

  const canGoNext = (): boolean => {
    if (currentStep === "physical") {
      if (formData.unitSystem === "imperial") {
        return (
          formData.heightFeet !== undefined &&
          formData.heightInches !== undefined &&
          formData.weightStone !== undefined &&
          formData.weightPounds !== undefined
        );
      } else {
        return (
          formData.heightCm !== undefined && formData.weightKg !== undefined
        );
      }
    } else {
      // Check if current question is answered
      const currentQuestion = getCurrentQuestion();
      if (!currentQuestion) return false;

      const response = formData.responses[currentQuestion.id];
      if (
        currentQuestion.required &&
        (!response ||
          response === "" ||
          (Array.isArray(response) && response.length === 0))
      ) {
        return false;
      }

      return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/risk-assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Assessment submitted successfully!");
        router.push("/assessment/thank-you");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to submit assessment");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast.error("Failed to submit assessment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastQuestion = (): boolean => {
    if (currentStep === "physical") return false;
    return getNextQuestionId(currentStep, formData.responses) === null;
  };

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <SignedOut>
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h1>
                <p className="text-gray-600 mb-6">
                  Please sign in to complete your medical assessment. This helps us keep track of your progress and provide personalized care.
                </p>
              </div>
              <div className="space-y-3">
                <SignInButton mode="modal">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    Sign In to Continue
                  </button>
                </SignInButton>
                <p className="text-sm text-gray-500">
                  Don't have an account? Sign up is quick and free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{getOverallProgress()}%</span>
          </div>
          <Progress value={getOverallProgress()} className="h-2" />
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              {currentStep !== "personal" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousStep}
                  className="p-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <CardTitle className="text-xl">
                {currentStep === "physical" && "Physical Information"}
                {currentStep !== "physical" &&
                  `Question ${
                    getVisibleQuestions(formData.responses).findIndex(
                      (q) => q.id === currentStep
                    ) + 1
                  } of ${getVisibleQuestions(formData.responses).length}`}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            {currentStep === "physical" && (
              <PhysicalInfoStep data={formData} onUpdate={updateFormData} />
            )}

            {currentStep !== "physical" && (
              <QuestionStep
                question={getCurrentQuestion()!}
                response={formData.responses[currentStep]}
                onUpdate={(value) => updateResponse(currentStep, value)}
              />
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <div>
                {currentStep !== "physical" && (
                  <Button variant="outline" onClick={goToPreviousStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
              </div>

              <Button
                onClick={goToNextStep}
                disabled={!canGoNext() || isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : isLastQuestion() ? (
                  "Submit Assessment"
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </SignedIn>
    </div>
  );
}
