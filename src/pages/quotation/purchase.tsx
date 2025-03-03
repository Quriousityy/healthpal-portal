
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
import { InsurancePlan, FamilyMember } from "@/lib/types";
import { 
  Shield, 
  CheckCircle2, 
  Users, 
  User, 
  Calendar, 
  FileText,
  DollarSign,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

const PurchasePage = () => {
  const navigate = useNavigate();
  const [quotationData, setQuotationData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    // Load saved quotation data
    const savedData = sessionStorage.getItem("quotationData");
    if (savedData) {
      setQuotationData(JSON.parse(savedData));
    } else {
      // If no data, go back to the start
      navigate("/quotation");
    }
  }, [navigate]);

  const handlePurchase = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Show success message
      toast({
        title: "Policy Successfully Purchased!",
        description: "Your policy has been successfully created. You will receive confirmation details via email shortly.",
        duration: 5000,
      });
      
      // Clear quotation data
      sessionStorage.removeItem("quotationData");
      
      // Navigate to dashboard
      navigate("/");
    }, 2000);
  };

  if (!quotationData) {
    return <div>Loading...</div>;
  }

  const { primaryApplicant, familyMembers, selectedPlan, totalPremium, sumInsured, planType } = quotationData;

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Review & Purchase Your Health Plan</h1>
        <p className="text-muted-foreground">
          Please review all the details of your selected plan before proceeding with the purchase
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <HeartPulse className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Selected Plan: {selectedPlan.name}</CardTitle>
                <CardDescription>{selectedPlan.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 border-b pb-4">
                  <div>
                    <h3 className="font-medium">Plan Type</h3>
                    <div className="flex items-center mt-1">
                      {planType === "individual" ? (
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      ) : (
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      )}
                      <span className="capitalize">{planType} Plan</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Coverage Period</h3>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>1 Year (Annual)</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Start Date</h3>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{format(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), "MMM dd, yyyy")}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Selected Benefits</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedPlan.benefits
                      .filter((benefit: any) => benefit.selected)
                      .map((benefit: any) => (
                        <div key={benefit.name} className="flex items-start gap-2">
                          <Shield className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <div>
                            <span className="font-medium">{benefit.name}</span>
                            <p className="text-sm text-muted-foreground">${benefit.coverage.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Featured Plan Benefits</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedPlan.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Insured Members</CardTitle>
              <CardDescription>
                People covered under this health insurance policy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="bg-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Primary Applicant (You)</div>
                    <div className="text-sm text-muted-foreground">
                      {primaryApplicant.firstName} {primaryApplicant.lastName}
                    </div>
                    <div className="flex gap-4 mt-1 text-sm">
                      <div>
                        <span className="text-muted-foreground">DOB: </span>
                        {format(new Date(primaryApplicant.dateOfBirth), "MMM dd, yyyy")}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gender: </span>
                        {primaryApplicant.gender.charAt(0).toUpperCase() + primaryApplicant.gender.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {planType === "family" && familyMembers && familyMembers.length > 0 && (
                  <div className="pt-2">
                    <h3 className="font-medium mb-3">Family Members</h3>
                    <div className="space-y-4">
                      {familyMembers.map((member: FamilyMember, idx: number) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="bg-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium capitalize">{member.relation}</div>
                            <div className="text-sm text-muted-foreground">
                              {member.firstName} {member.lastName}
                            </div>
                            <div className="flex gap-4 mt-1 text-sm">
                              <div>
                                <span className="text-muted-foreground">DOB: </span>
                                {format(new Date(member.dateOfBirth), "MMM dd, yyyy")}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Gender: </span>
                                {member.gender.charAt(0).toUpperCase() + member.gender.slice(1)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Plan</span>
                  <span>{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Type</span>
                  <span className="capitalize">{planType}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Coverage Period</span>
                  <span>Annual</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Sum Insured</span>
                  <span>${sumInsured.toLocaleString()}</span>
                </div>
                {planType === "family" && (
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-muted-foreground">Total Members</span>
                    <span>{(familyMembers?.length || 0) + 1}</span>
                  </div>
                )}
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Monthly Premium</span>
                  <span className="font-medium">${totalPremium}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-muted-foreground">Annual Premium</span>
                  <span className="font-medium">${(totalPremium * 12).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handlePurchase} 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Purchase Policy
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">24/7 Customer Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Our dedicated support team is available anytime to assist you
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Easy Claims Process</h3>
                    <p className="text-sm text-muted-foreground">
                      Simple and streamlined digital claims process
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">30-Day Free Look Period</h3>
                    <p className="text-sm text-muted-foreground">
                      Full refund if you cancel within 30 days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
