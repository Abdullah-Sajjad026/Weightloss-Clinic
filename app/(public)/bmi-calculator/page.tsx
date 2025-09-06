"use client";

import { useState } from "react";
import { Calculator, Info } from "lucide-react";

export default function BMICalculatorPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric"); // metric or imperial
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    let heightInMeters: number;
    let weightInKg: number;

    if (unit === "metric") {
      heightInMeters = parseFloat(height) / 100; // convert cm to meters
      weightInKg = parseFloat(weight);
    } else {
      // Convert feet and inches to meters, pounds to kg
      const feet = Math.floor(parseFloat(height));
      const inches = (parseFloat(height) - feet) * 12;
      heightInMeters = (feet * 12 + inches) * 0.0254;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    if (heightInMeters > 0 && weightInKg > 0) {
      const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
      setBMI(parseFloat(calculatedBMI.toFixed(1)));

      // Determine category
      if (calculatedBMI < 18.5) {
        setCategory("Underweight");
      } else if (calculatedBMI < 25) {
        setCategory("Normal weight");
      } else if (calculatedBMI < 30) {
        setCategory("Overweight");
      } else {
        setCategory("Obese");
      }
    }
  };

  const getBMIColor = () => {
    if (!bmi) return "text-gray-600";
    if (bmi < 18.5) return "text-blue-600";
    if (bmi < 25) return "text-green-600";
    if (bmi < 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getBMIBackground = () => {
    if (!bmi) return "bg-gray-50";
    if (bmi < 18.5) return "bg-blue-50";
    if (bmi < 25) return "bg-green-50";
    if (bmi < 30) return "bg-yellow-50";
    return "bg-red-50";
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBMI(null);
    setCategory("");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            BMI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your Body Mass Index (BMI) to understand if you might be eligible for our weight loss treatments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Calculate Your BMI</h2>
            
            {/* Unit Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setUnit("metric")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    unit === "metric"
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Metric (cm, kg)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("imperial")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    unit === "imperial"
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Imperial (ft, lbs)
                </button>
              </div>
            </div>

            {/* Height Input */}
            <div className="mb-4">
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                Height {unit === "metric" ? "(cm)" : "(ft)"}
              </label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === "metric" ? "170" : "5.8"}
                step={unit === "metric" ? "1" : "0.1"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Weight Input */}
            <div className="mb-6">
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                Weight {unit === "metric" ? "(kg)" : "(lbs)"}
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === "metric" ? "70" : "154"}
                step={unit === "metric" ? "0.1" : "1"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={calculateBMI}
                disabled={!height || !weight}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Calculate BMI
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            {bmi && (
              <div className={`${getBMIBackground()} border border-gray-200 rounded-lg p-6 mb-6`}>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your BMI Result</h3>
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getBMIColor()} mb-2`}>
                    {bmi}
                  </div>
                  <div className={`text-xl font-semibold ${getBMIColor()}`}>
                    {category}
                  </div>
                </div>
              </div>
            )}

            {/* BMI Categories */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">BMI Categories</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Underweight</span>
                  <span className="text-blue-600">Below 18.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Normal weight</span>
                  <span className="text-green-600">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Overweight</span>
                  <span className="text-yellow-600">25.0 - 29.9</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Obese</span>
                  <span className="text-red-600">30.0 and above</span>
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
              <div className="flex items-start space-x-3">
                <Info className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">Important Note</h4>
                  <p className="text-blue-800 text-sm">
                    BMI is a useful screening tool, but it doesn't directly measure body fat or account for muscle mass. 
                    For a comprehensive assessment of your health and weight loss options, consult with our medical professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {bmi && bmi >= 27 && (
          <div className="mt-12 bg-primary-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">You May Be Eligible for Treatment</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              With a BMI of {bmi}, you may be eligible for our medically supervised weight loss treatments. 
              Take our comprehensive assessment to learn more about your options.
            </p>
            <a
              href="/assessment"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Check Your Eligibility
            </a>
          </div>
        )}

        {/* General CTA */}
        {!bmi && (
          <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Start Your Weight Loss Journey?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Regardless of your BMI, our medical team can help you explore safe and effective weight loss options tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/assessment"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                Take Assessment
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}