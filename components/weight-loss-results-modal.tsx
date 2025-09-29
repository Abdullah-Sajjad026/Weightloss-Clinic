"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WeightLossTimelineChart } from "./weight-loss-timeline-chart";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface WeightLossResult {
  currentBMI: number;
  targetBMI: number;
  category: string;
  weightLossKg: number;
  weightLossDisplay: string;
  weightLossPercentage: number;
  timeline: Array<{
    month: string;
    weight: number;
    displayWeight: string;
    rawWeight: number;
  }>;
  unitSystem: "imperial" | "metric";
}

interface WeightLossResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: WeightLossResult | null;
}

export function WeightLossResultsModal({
  isOpen,
  onClose,
  results,
}: WeightLossResultsModalProps) {
  const router = useRouter();

  if (!results) return null;

  const handleStartAssessment = () => {
    onClose();
    router.push("/book-appointment");
  };

  // Calculate timeline milestones
  const getTimelineMilestone = () => {
    if (results.timeline.length < 3) return null;

    const thirdMonthData = results.timeline[2];
    const firstMonthLoss = results.timeline[0].weight - thirdMonthData.weight;

    let lossDisplay = "";
    if (results.unitSystem === "imperial") {
      const stone = Math.floor(firstMonthLoss / 14);
      const pounds = Math.round(firstMonthLoss % 14);
      lossDisplay = stone > 0 ? `${stone}st ${pounds}lb` : `${pounds}lb`;
    } else {
      lossDisplay = `${Math.round(firstMonthLoss)}kg`;
    }

    return {
      loss: lossDisplay,
      date: thirdMonthData.month,
    };
  };

  const milestone = getTimelineMilestone();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0 w-full">
        <div className="relative bg-white rounded-lg">

          <div className="p-6 space-y-6">
            {/* Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Weight Loss Card */}
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-6 text-center">
                  <p className="text-amber-800 text-sm font-medium mb-2">
                    You could lose
                  </p>
                  <p className="text-4xl font-bold text-amber-900 mb-1">
                    {results.weightLossDisplay}
                  </p>
                </CardContent>
              </Card>

              {/* Weight Change Percentage */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    Weight change
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    -{results.weightLossPercentage}%
                  </p>
                </CardContent>
              </Card>

              {/* BMI Card */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 text-sm font-medium mb-2">BMI</p>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    {results.currentBMI}
                  </p>
                  <p className="text-sm text-gray-600">({results.category})</p>
                </CardContent>
              </Card>
            </div>

            {/* Weight Loss Timeline Chart */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Weight Loss Journey
                </h3>
                <WeightLossTimelineChart
                  data={results.timeline}
                  unitSystem={results.unitSystem}
                />
              </CardContent>
            </Card>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-primary-50 rounded-lg border border-primary-200">
              <div className="text-center sm:text-left">
                <Button
                  onClick={handleStartAssessment}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-full text-lg transition-colors"
                >
                  Start assessment
                </Button>
              </div>

              {milestone && (
                <div className="flex items-center gap-3 text-primary-800">
                  <ArrowRight className="h-5 w-5" />
                  <span className="font-medium">
                    Start today, lose {milestone.loss} by {milestone.date}
                  </span>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-gray-500 text-center px-4">
              <p>
                Results are projections based on clinical study data and may
                vary by individual. Consult with healthcare professionals before
                starting any weight loss program.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
