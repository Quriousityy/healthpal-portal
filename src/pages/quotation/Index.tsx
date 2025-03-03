
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuoteProgress } from "@/lib/types";
import QuotationStepper from "@/components/quotation/quotation-stepper";
import { ArrowRight, Users, User } from "lucide-react";

const QuotationJourney = () => {
  const navigate = useNavigate();
  
  const [progress, setProgress] = useState<QuoteProgress>({
    step: 1,
    totalSteps: 4,
    currentSection: "Plan Selection"
  });

  const handleSelectPlanType = (type: "individual" | "family") => {
    navigate(`/quotation/details/${type}`);
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <QuotationStepper progress={progress} />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">Choose Your Health Plan Type</h1>
        <p className="text-muted-foreground mb-8">
          Select the type of health insurance plan that best suits your needs
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Individual Plan
              </CardTitle>
              <CardDescription>
                Health coverage for just you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Personalized coverage for your specific needs</li>
                <li>More affordable for single individuals</li>
                <li>Simplified policy management</li>
                <li>Customizable add-ons and benefits</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full mt-2" 
                onClick={() => handleSelectPlanType("individual")}
              >
                Select Individual Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Family Floater Plan
              </CardTitle>
              <CardDescription>
                Coverage for you and your family members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Single policy covers all family members</li>
                <li>Shared sum insured for the entire family</li>
                <li>More cost-effective than multiple individual plans</li>
                <li>Cover spouse, children and dependent parents</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full mt-2" 
                onClick={() => handleSelectPlanType("family")}
              >
                Select Family Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuotationJourney;
