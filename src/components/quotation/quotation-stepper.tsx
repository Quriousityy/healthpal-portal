
import React from "react";
import { QuoteProgress } from "@/lib/types";
import { Check } from "lucide-react";

interface QuotationStepperProps {
  progress: QuoteProgress;
}

const QuotationStepper: React.FC<QuotationStepperProps> = ({ progress }) => {
  const steps = [
    { label: "Plan Selection", completed: progress.step > 1 },
    { label: "Personal Details", completed: progress.step > 2 },
    { label: "Medical Questions", completed: progress.step > 3 },
    { label: "Coverage Options", completed: progress.step > 4 },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`rounded-full flex items-center justify-center h-10 w-10 border-2 
              ${index + 1 === progress.step 
                ? "border-primary bg-primary text-primary-foreground" 
                : step.completed 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-gray-300 text-gray-400"}`}
            >
              {step.completed ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span 
              className={`text-xs mt-2 text-center
              ${index + 1 === progress.step 
                ? "text-primary font-medium" 
                : step.completed 
                  ? "text-primary" 
                  : "text-gray-400"}`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative flex h-0.5 mt-5">
        <div className="absolute inset-0 flex w-full">
          {steps.map((_, index) => (
            <React.Fragment key={index}>
              {index < steps.length - 1 && (
                <div 
                  className={`h-0.5 flex-1 
                  ${index < progress.step - 1 
                    ? "bg-primary" 
                    : "bg-gray-200"}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuotationStepper;
