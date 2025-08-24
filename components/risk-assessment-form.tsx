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

type Step = "personal" | "physical" | string; // string for question IDs

interface FormData {
  // Personal Information
  name: string;
  email: string;
  phone: string;

  // Physical Information
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
  const [currentStep, setCurrentStep] = useState<Step>("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    unitSystem: "imperial",
    responses: {},
  });

  // Get current question for progress calculation
  const getCurrentQuestion = (): Question | null => {
    if (currentStep === "personal" || currentStep === "physical") return null;
    return riskAssessmentQuestions.find((q) => q.id === currentStep) || null;
  };

  // Calculate overall progress
  const getOverallProgress = (): number => {
    const totalSteps = 2 + getVisibleQuestions(formData.responses).length; // personal + physical + questions
    let currentStepIndex = 0;

    if (currentStep === "personal") currentStepIndex = 0;
    else if (currentStep === "physical") currentStepIndex = 1;
    else {
      const visibleQuestions = getVisibleQuestions(formData.responses);
      const questionIndex = visibleQuestions.findIndex(
        (q) => q.id === currentStep
      );
      currentStepIndex = 2 + (questionIndex >= 0 ? questionIndex : 0);
    }

    return Math.round(((currentStepIndex + 1) / totalSteps) * 100);
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
    if (currentStep === "personal") {
      setCurrentStep("physical");
    } else if (currentStep === "physical") {
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
    if (currentStep === "physical") {
      setCurrentStep("personal");
    } else if (currentStep !== "personal") {
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
    if (currentStep === "personal") {
      return (
        formData.name.length >= 2 &&
        formData.email.includes("@") &&
        formData.phone.length >= 10
      );
    } else if (currentStep === "physical") {
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
    if (currentStep === "personal" || currentStep === "physical") return false;
    return getNextQuestionId(currentStep, formData.responses) === null;
  };

  return (
    <div className="py-8">
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
                {currentStep === "personal" && "Personal Information"}
                {currentStep === "physical" && "Physical Information"}
                {currentStep !== "personal" &&
                  currentStep !== "physical" &&
                  `Question ${
                    getVisibleQuestions(formData.responses).findIndex(
                      (q) => q.id === currentStep
                    ) + 1
                  } of ${getVisibleQuestions(formData.responses).length}`}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            {currentStep === "personal" && (
              <PersonalInfoStep data={formData} onUpdate={updateFormData} />
            )}

            {currentStep === "physical" && (
              <PhysicalInfoStep data={formData} onUpdate={updateFormData} />
            )}

            {currentStep !== "personal" && currentStep !== "physical" && (
              <QuestionStep
                question={getCurrentQuestion()!}
                response={formData.responses[currentStep]}
                onUpdate={(value) => updateResponse(currentStep, value)}
              />
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <div>
                {currentStep !== "personal" && (
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
    </div>
  );
}
