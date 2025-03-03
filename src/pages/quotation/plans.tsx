import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  InsurancePlan, 
  InsuranceBenefit, 
  QuoteProgress 
} from "@/lib/types";
import QuotationStepper from "@/components/quotation/quotation-stepper";
import { 
  Check, 
  CheckCircle2, 
  Shield, 
  Award, 
  Clock, 
  Heart,
  ThumbsUp,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Users,
  User,
  Baby,
  PersonStanding,
  UserPlus,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const mockPlans: InsurancePlan[] = [
  {
    id: "plan-1",
    name: "Essential Care",
    type: "individual",
    basePrice: 250,
    description: "Basic coverage for essential healthcare needs at an affordable price",
    benefits: [
      {
        name: "Hospitalization",
        coverage: 300000,
        description: "Coverage for hospital stays, including room charges",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Surgery",
        coverage: 200000,
        description: "Coverage for surgical procedures",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Medications",
        coverage: 50000,
        description: "Coverage for prescribed medicines",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Outpatient Care",
        coverage: 75000,
        description: "Coverage for outpatient treatments and consultations",
        isOptional: true,
        additionalPrice: 25,
        selected: false,
      },
      {
        name: "Diagnostic Tests",
        coverage: 50000,
        description: "Coverage for medical tests and diagnostics",
        isOptional: true,
        additionalPrice: 15,
        selected: false,
      },
      {
        name: "Maternity",
        coverage: 50000,
        description: "Coverage for pregnancy and childbirth",
        isOptional: true,
        additionalPrice: 60,
        selected: false,
      },
      {
        name: "Emergency Transport",
        coverage: 20000,
        description: "Coverage for ambulance services",
        isOptional: true,
        additionalPrice: 10,
        selected: false,
      },
    ],
    features: [
      "No waiting period for accidents",
      "30-day waiting period for illnesses",
      "24/7 customer support",
      "Cashless treatment at network hospitals",
    ],
    minAge: 18,
    maxAge: 65,
  },
  {
    id: "plan-2",
    name: "Premium Care",
    type: "individual",
    basePrice: 450,
    description: "Comprehensive coverage with additional benefits for complete peace of mind",
    benefits: [
      {
        name: "Hospitalization",
        coverage: 500000,
        description: "Enhanced coverage for hospital stays, including room charges",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Surgery",
        coverage: 400000,
        description: "Enhanced coverage for surgical procedures",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Medications",
        coverage: 100000,
        description: "Enhanced coverage for prescribed medicines",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Outpatient Care",
        coverage: 150000,
        description: "Enhanced coverage for outpatient treatments and consultations",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Diagnostic Tests",
        coverage: 100000,
        description: "Enhanced coverage for medical tests and diagnostics",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Maternity",
        coverage: 100000,
        description: "Coverage for pregnancy and childbirth",
        isOptional: true,
        additionalPrice: 45,
        selected: false,
      },
      {
        name: "Emergency Transport",
        coverage: 40000,
        description: "Enhanced coverage for ambulance services",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Dental Care",
        coverage: 35000,
        description: "Coverage for dental procedures and treatments",
        isOptional: true,
        additionalPrice: 30,
        selected: false,
      },
      {
        name: "Vision Care",
        coverage: 25000,
        description: "Coverage for eye examinations and eyewear",
        isOptional: true,
        additionalPrice: 25,
        selected: false,
      },
      {
        name: "Mental Health",
        coverage: 40000,
        description: "Coverage for mental health consultations and treatments",
        isOptional: true,
        additionalPrice: 35,
        selected: false,
      },
    ],
    features: [
      "No waiting period for accidents",
      "15-day waiting period for illnesses",
      "24/7 premium customer support",
      "Cashless treatment at all network hospitals",
      "Health check-up once a year",
      "Wellness program membership",
    ],
    minAge: 18,
    maxAge: 70,
    recommended: true,
  },
  {
    id: "plan-3",
    name: "Elite Care",
    type: "individual",
    basePrice: 750,
    description: "Our most exclusive plan with maximum coverage and premium benefits",
    benefits: [
      {
        name: "Hospitalization",
        coverage: 1000000,
        description: "Premium coverage for hospital stays, including room charges",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Surgery",
        coverage: 800000,
        description: "Premium coverage for surgical procedures",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Medications",
        coverage: 200000,
        description: "Premium coverage for prescribed medicines",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Outpatient Care",
        coverage: 300000,
        description: "Premium coverage for outpatient treatments and consultations",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Diagnostic Tests",
        coverage: 200000,
        description: "Premium coverage for medical tests and diagnostics",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Maternity",
        coverage: 250000,
        description: "Premium coverage for pregnancy and childbirth",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Emergency Transport",
        coverage: 100000,
        description: "Premium coverage for ambulance services",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Dental Care",
        coverage: 100000,
        description: "Premium coverage for dental procedures and treatments",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Vision Care",
        coverage: 75000,
        description: "Premium coverage for eye examinations and eyewear",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "Mental Health",
        coverage: 100000,
        description: "Premium coverage for mental health consultations and treatments",
        isOptional: false,
        additionalPrice: 0,
        selected: true,
      },
      {
        name: "International Coverage",
        coverage: 500000,
        description: "Coverage for medical treatments outside of the country",
        isOptional: true,
        additionalPrice: 100,
        selected: false,
      },
      {
        name: "Alternative Treatments",
        coverage: 50000,
        description: "Coverage for alternative treatments like acupuncture, chiropractic, etc.",
        isOptional: true,
        additionalPrice: 40,
        selected: false,
      },
    ],
    features: [
      "No waiting period for any condition",
      "24/7 dedicated concierge service",
      "Cashless treatment at premium hospitals worldwide",
      "Comprehensive health check-up twice a year",
      "Premium wellness program membership",
      "Personal health manager",
      "Home healthcare services",
    ],
    minAge: 18,
    maxAge: 75,
  },
];

const QuotationPlansPage = () => {
  const navigate = useNavigate();
  const [quotationData, setQuotationData] = useState<any>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [sumInsured, setSumInsured] = useState<number>(500000);
  
  const [progress, setProgress] = useState<QuoteProgress>({
    step: 4,
    totalSteps: 4,
    currentSection: "Coverage Options"
  });

  useEffect(() => {
    // Load saved quotation data
    const savedData = sessionStorage.getItem("quotationData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setQuotationData(parsedData);
      
      // Clone the mock plans for modification
      let adjustedPlans = JSON.parse(JSON.stringify(mockPlans));
      
      // Adjust prices for family plans
      if (parsedData.planType === "family") {
        const familyMemberCount = (parsedData.familyMembers?.length || 0) + 1; // +1 for primary
        adjustedPlans = adjustedPlans.map((plan: InsurancePlan) => ({
          ...plan,
          type: "family",
          basePrice: Math.round(plan.basePrice * (1 + (familyMemberCount - 1) * 0.7)), // 30% discount per additional member
          benefits: plan.benefits.map(benefit => ({
            ...benefit,
            additionalPrice: benefit.additionalPrice * (1 + (familyMemberCount - 1) * 0.7),
          }))
        }));
      }
      
      setPlans(adjustedPlans);
      // Set Premium Care as default selected plan
      setSelectedPlanId("plan-2");
    } else {
      // If no data, go back to the start
      navigate("/quotation");
    }
  }, [navigate]);

  useEffect(() => {
    
  }, [selectedPlanId]);

  const calculatePremium = (plan: InsurancePlan): number => {
    const selectedBenefits = plan.benefits.filter(benefit => benefit.selected);
    const basePrice = plan.basePrice;
    const additionalPrice = selectedBenefits.reduce(
      (total, benefit) => benefit.isOptional ? total + benefit.additionalPrice : total, 
      0
    );
    
    return basePrice + additionalPrice;
  };
  
  const calculateSumInsured = (plan: InsurancePlan): number => {
    const selectedBenefits = plan.benefits.filter(benefit => benefit.selected);
    return selectedBenefits.reduce(
      (total, benefit) => total + benefit.coverage, 
      0
    );
  };

  const toggleBenefit = (planId: string, benefitName: string) => {
    setPlans(prevPlans => 
      prevPlans.map(plan => {
        if (plan.id === planId) {
          return {
            ...plan,
            benefits: plan.benefits.map(benefit => {
              if (benefit.name === benefitName && benefit.isOptional) {
                return { ...benefit, selected: !benefit.selected };
              }
              return benefit;
            })
          };
        }
        return plan;
      })
    );
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const handleContinue = () => {
    const selectedPlan = plans.find(plan => plan.id === selectedPlanId);
    
    if (selectedPlan) {
      const selectedBenefits = selectedPlan.benefits
        .filter(benefit => benefit.selected)
        .map(benefit => benefit.name);
      
      const totalPremium = calculatePremium(selectedPlan);
      
      // Update quotation data
      const updatedQuotationData = {
        ...quotationData,
        selectedPlanId,
        selectedPlan,
        selectedBenefits,
        totalPremium,
        sumInsured: calculateSumInsured(selectedPlan),
      };
      
      sessionStorage.setItem("quotationData", JSON.stringify(updatedQuotationData));
      
      // Navigate to the next page
      navigate("/quotation/purchase");
    }
  };

  const getSelectedPlan = (): InsurancePlan | null => {
    return selectedPlanId ? plans.find(plan => plan.id === selectedPlanId) || null : null;
  };

  const getFamilyMemberIcon = (relation: string) => {
    switch (relation?.toLowerCase()) {
      case 'spouse':
        return <Users className="h-5 w-5 text-sage-600" />;
      case 'child':
        return <Baby className="h-5 w-5 text-sage-600" />;
      case 'parent':
        return <PersonStanding className="h-5 w-5 text-sage-600" />;
      default:
        return <UserPlus className="h-5 w-5 text-sage-600" />;
    }
  };

  if (!quotationData || plans.length === 0) {
    return <div>Loading...</div>;
  }

  const selectedPlan = getSelectedPlan();

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <QuotationStepper progress={progress} />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">Choose Your Health Insurance Plan</h1>
        <p className="text-muted-foreground mb-8">
          Based on your information, we've selected the best plans for you. Compare and customize to find your perfect match.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Plan selection column */}
          <div className="lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
            <div className="grid grid-cols-1 gap-4">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`relative h-full transition-all duration-200 
                    ${selectedPlanId === plan.id 
                      ? 'border-sage-500 shadow-[0_4px_15px_rgba(0,0,0,0.1)] bg-sage-50/30' 
                      : 'border-border hover:border-sage-400 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 inset-x-0 mx-auto w-fit px-3 py-1 bg-sage-500 text-white rounded-full text-xs font-medium">
                      Recommended
                    </div>
                  )}
                  
                  <CardHeader className={`pb-2 ${plan.recommended ? 'pt-6' : ''}`}>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-0">
                    <div className="mb-4">
                      <p className="text-3xl font-bold text-sage-700">${calculatePremium(plan)}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                      <p className="text-sm text-muted-foreground">Total sum insured: ${calculateSumInsured(plan).toLocaleString()}</p>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <h3 className="font-medium">Key Features:</h3>
                      <ul className="space-y-1">
                        {plan.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-sage-600 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {plan.features.length > 4 && (
                          <li className="text-sm text-sage-600">+{plan.features.length - 4} more features</li>
                        )}
                      </ul>
                    </div>
                    
                    <h3 className="font-medium mb-2">Top Coverages:</h3>
                    <ul className="space-y-1 mb-6">
                      {plan.benefits
                        .filter(benefit => !benefit.isOptional)
                        .slice(0, 3)
                        .map((benefit) => (
                          <li key={benefit.name} className="flex items-start gap-2 text-sm">
                            <Shield className="h-4 w-4 text-sage-600 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-medium">{benefit.name}</span>: ${benefit.coverage.toLocaleString()}
                            </div>
                          </li>
                        ))}
                      {plan.benefits.filter(benefit => !benefit.isOptional).length > 3 && (
                        <li className="text-sm text-sage-600">
                          +{plan.benefits.filter(benefit => !benefit.isOptional).length - 3} more coverages
                        </li>
                      )}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="flex-col items-stretch gap-2">
                    <Button 
                      variant={selectedPlanId === plan.id ? "default" : "outline"}
                      className={`w-full ${selectedPlanId === plan.id ? 'bg-sage-600 hover:bg-sage-700' : 'border-sage-200 text-sage-700 hover:bg-sage-50'}`}
                      onClick={() => handleSelectPlan(plan.id)}
                    >
                      {selectedPlanId === plan.id ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Selected
                        </>
                      ) : "Select Plan"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Customization column */}
          <div className="lg:w-1/2">
            {!selectedPlan ? (
              <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                <div className="text-center text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-medium mb-2">Select a Plan</h3>
                  <p>Choose a plan from the left to customize your coverage options</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Customize Your Coverage</h2>
                  <div>
                    <p className="text-sm text-muted-foreground">Selected: <span className="font-medium text-sage-700">{selectedPlan.name}</span></p>
                  </div>
                </div>
                
                <Card className="shadow-[0_4px_15px_rgba(0,0,0,0.07)] border-sage-100">
                  <CardHeader className="bg-sage-50/50 rounded-t-lg border-b border-sage-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-sage-800">Coverage Options</CardTitle>
                        <CardDescription>Customize your plan by selecting additional benefits</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-sage-700">
                          ${calculatePremium(selectedPlan)}
                          <span className="text-sm font-normal text-muted-foreground">/month</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Sum insured: ${calculateSumInsured(selectedPlan).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[calc(100vh-380px)] overflow-y-auto">
                    <div className="space-y-6 py-2">
                      <div>
                        <h3 className="text-lg font-medium mb-2 text-sage-800">Required Benefits</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedPlan.benefits
                            .filter(benefit => !benefit.isOptional)
                            .map((benefit) => (
                              <Card key={benefit.name} className="border border-sage-200/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                                <CardContent className="p-3">
                                  <div className="flex items-start gap-3">
                                    <div className="bg-sage-100 p-2 rounded-full h-8 w-8 flex items-center justify-center mt-0.5">
                                      <Shield className="h-4 w-4 text-sage-600" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-sage-800">{benefit.name}</h4>
                                      <p className="text-sm text-muted-foreground mb-1">{benefit.description}</p>
                                      <Badge variant="outline" className="bg-white border-sage-200 text-sage-700">
                                        ${benefit.coverage.toLocaleString()}
                                      </Badge>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2 text-sage-800">Optional Benefits</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Select additional benefits to enhance your coverage
                        </p>
                        
                        <div className="grid grid-cols-1 gap-3">
                          {selectedPlan.benefits
                            .filter(benefit => benefit.isOptional)
                            .map((benefit) => (
                              <Card 
                                key={benefit.name} 
                                className={`border transition-all cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-[0_2px_10px_rgba(0,0,0,0.07)] 
                                  ${benefit.selected ? 'border-sage-500 bg-sage-50/50' : 'border-sage-200/80'}`}
                                onClick={() => toggleBenefit(selectedPlanId!, benefit.name)}
                              >
                                <CardContent className="p-3">
                                  <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-full h-8 w-8 flex items-center justify-center mt-0.5
                                      ${benefit.selected ? 'bg-sage-500 text-white' : 'bg-sage-100 text-sage-500'}`}>
                                      <Checkbox 
                                        checked={benefit.selected}
                                        className="h-4 w-4"
                                      />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-sage-800">{benefit.name}</h4>
                                      <p className="text-sm text-muted-foreground mb-1">{benefit.description}</p>
                                      <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline" className="bg-white border-sage-200 text-sage-700">
                                          ${benefit.coverage.toLocaleString()}
                                        </Badge>
                                        <Badge variant="outline" className="bg-white border-sage-200 text-sage-600">
                                          +${benefit.additionalPrice}/month
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end bg-sage-50/50 rounded-b-lg border-t border-sage-100 mt-2">
                    <Button onClick={handleContinue} className="bg-sage-600 hover:bg-sage-700">
                      Continue to Purchase
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Family members section for family plans */}
        {quotationData.planType === "family" && quotationData.familyMembers && quotationData.familyMembers.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Family Members Covered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Primary member */}
              <Card className="border border-sage-200 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-sage-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-sage-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sage-800">Primary Insured</h4>
                      <p className="text-sm text-muted-foreground">
                        {quotationData.firstName} {quotationData.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Age: {quotationData.age || 'N/A'}</p>
                    <p>Gender: {quotationData.gender || 'N/A'}</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Family members */}
              {quotationData.familyMembers.map((member: any, index: number) => (
                <Card key={index} className="border border-sage-200 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-sage-100 p-2 rounded-full">
                        {getFamilyMemberIcon(member.relation)}
                      </div>
                      <div>
                        <h4 className="font-medium text-sage-800">{member.relation}</h4>
                        <p className="text-sm text-muted-foreground">
                          {member.firstName} {member.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Age: {member.age || 'N/A'}</p>
                      <p>Gender: {member.gender || 'N/A'}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationPlansPage;
