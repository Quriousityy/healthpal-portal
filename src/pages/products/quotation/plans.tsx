
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { InsurancePlan, InsuranceBenefit } from "@/lib/types";

const mockPlans: InsurancePlan[] = [
  {
    id: "basic",
    name: "Essential Care",
    type: "individual",
    basePrice: 999,
    description: "Basic coverage for essential health needs",
    minAge: 18,
    maxAge: 65,
    features: [
      "Cashless hospitalization",
      "24/7 customer support",
      "Network hospital coverage",
    ],
    benefits: [
      {
        name: "Hospitalization",
        coverage: 300000,
        description: "Coverage for hospital stays",
        isOptional: false,
        additionalPrice: 0,
      },
      {
        name: "Surgery",
        coverage: 200000,
        description: "Coverage for surgical procedures",
        isOptional: false,
        additionalPrice: 0,
      },
      {
        name: "Room Charges",
        coverage: 100000,
        description: "Coverage for room rent",
        isOptional: false,
        additionalPrice: 0,
      },
    ],
  },
  {
    id: "premium",
    name: "Premium Care",
    type: "individual",
    basePrice: 1499,
    description: "Enhanced coverage with additional benefits",
    minAge: 18,
    maxAge: 65,
    features: [
      "All Essential Care features",
      "International coverage",
      "Alternative treatments",
      "Health checkup",
    ],
    benefits: [
      {
        name: "Hospitalization",
        coverage: 500000,
        description: "Coverage for hospital stays",
        isOptional: false,
        additionalPrice: 0,
      },
      {
        name: "Surgery",
        coverage: 300000,
        description: "Coverage for surgical procedures",
        isOptional: false,
        additionalPrice: 0,
      },
      {
        name: "Room Charges",
        coverage: 150000,
        description: "Coverage for room rent",
        isOptional: false,
        additionalPrice: 0,
      },
      {
        name: "Outpatient Care",
        coverage: 100000,
        description: "Coverage for outpatient treatments",
        isOptional: true,
        additionalPrice: 199,
      },
    ],
  },
  {
    id: "elite",
    name: "Elite Care",
    type: "individual",
    basePrice: 2499,
    description: "Comprehensive coverage for complete peace of mind",
    minAge: 18,
    maxAge: 65,
    features: [
      "All Premium Care features",
      "Global coverage",
      "Personal health concierge",
      "Preventive care",
      "Wellness programs",
    ],
    benefits: [
      {
        name: "Hospitalization",
        coverage: 1000000,
        description: "Coverage for hospital stays",
        isOptional: false,
        additionalPrice: 0,
      },
      {
        name: "Surgery",
        coverage: 500000,
        description: "Coverage for surgical procedures",
        isOptional: false,
        additionalPrice: 0,
      },
      {
        name: "Room Charges",
        coverage: 200000,
        description: "Coverage for room rent",
        isOptional: false,
        additionalPrice: 0,
      },
      {
        name: "Outpatient Care",
        coverage: 150000,
        description: "Coverage for outpatient treatments",
        isOptional: true,
        additionalPrice: 299,
      },
      {
        name: "Diagnostic Tests",
        coverage: 100000,
        description: "Coverage for medical tests",
        isOptional: true,
        additionalPrice: 199,
      },
      {
        name: "Mental Health",
        coverage: 75000,
        description: "Coverage for mental health treatments",
        isOptional: true,
        additionalPrice: 199,
      },
    ],
  },
];

const PlanComparison = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedBenefits, setSelectedBenefits] = useState<{
    [key: string]: string[];
  }>({});

  const handleBenefitToggle = (planId: string, benefitName: string) => {
    setSelectedBenefits((prev) => {
      const benefits = prev[planId] || [];
      if (benefits.includes(benefitName)) {
        return {
          ...prev,
          [planId]: benefits.filter((b) => b !== benefitName),
        };
      }
      return {
        ...prev,
        [planId]: [...benefits, benefitName],
      };
    });
  };

  const calculateTotalPrice = (plan: InsurancePlan) => {
    const benefits = selectedBenefits[plan.id] || [];
    const additionalCost = plan.benefits
      .filter((b) => b.isOptional && benefits.includes(b.name))
      .reduce((sum, b) => sum + b.additionalPrice, 0);
    return plan.basePrice + additionalCost;
  };

  const handlePlanSelection = (plan: InsurancePlan) => {
    navigate("/products/quotation/purchase", {
      state: {
        ...location.state,
        selectedPlan: plan,
        selectedBenefits: selectedBenefits[plan.id] || [],
        totalPrice: calculateTotalPrice(plan),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-semibold tracking-tight">
            Compare Health Insurance Plans
          </h1>
          <p className="text-muted-foreground mt-2">
            Choose the plan that best fits your needs
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {mockPlans.map((plan) => (
            <Card
              key={plan.id}
              className="relative hover:shadow-lg transition-shadow animate-fadeIn"
            >
              <CardHeader>
                <CardTitle className="text-center">{plan.name}</CardTitle>
                <p className="text-center text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-3xl font-bold">
                    ${calculateTotalPrice(plan)}
                    <span className="text-sm font-normal text-muted-foreground">
                      /month
                    </span>
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Key Features</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-sage-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Benefits</h4>
                  {plan.benefits.map((benefit) => (
                    <div
                      key={benefit.name}
                      className="flex items-start justify-between"
                    >
                      <div className="flex items-start gap-2">
                        {benefit.isOptional && (
                          <Checkbox
                            checked={selectedBenefits[plan.id]?.includes(
                              benefit.name
                            )}
                            onCheckedChange={() =>
                              handleBenefitToggle(plan.id, benefit.name)
                            }
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium">{benefit.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Coverage: ${benefit.coverage.toLocaleString()}
                          </p>
                          {benefit.isOptional && (
                            <p className="text-xs text-muted-foreground">
                              +${benefit.additionalPrice}/month
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full bg-sage-600 hover:bg-sage-700"
                  onClick={() => handlePlanSelection(plan)}
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanComparison;
