
import { Policy, Claim } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooth,
  Stethoscope,
  Pill,
  Building,
  Activity,
  TestTube,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";

interface PolicyCardProps {
  policy: Policy;
  claimsCount?: number;
  claims?: Claim[];
}

// Function to get the appropriate icon for each benefit type
const getBenefitIcon = (benefitName: string) => {
  const iconProps = { className: "mr-2 h-5 w-5" };
  
  switch (benefitName.toLowerCase()) {
    case "hospitalization":
      return <Building {...iconProps} />;
    case "surgery":
      return <Activity {...iconProps} />;
    case "room charges":
      return <Building {...iconProps} />;
    case "medications":
      return <Pill {...iconProps} />;
    case "outpatient care":
      return <Stethoscope {...iconProps} />;
    case "diagnostic tests":
      return <TestTube {...iconProps} />;
    default:
      return <ShieldCheck {...iconProps} />;
  }
};

export function PolicyCard({ policy, claimsCount = 0, claims = [] }: PolicyCardProps) {
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null);

  // Function to get claims related to a specific benefit
  const getClaimsForBenefit = (benefitName: string) => {
    return claims.filter(claim => 
      claim.benefitsClaimed.some(benefit => benefit.name.toLowerCase() === benefitName.toLowerCase())
    );
  };

  // Function to get claimed amount for a specific benefit from a claim
  const getClaimedAmount = (claim: Claim, benefitName: string) => {
    const benefit = claim.benefitsClaimed.find(
      b => b.name.toLowerCase() === benefitName.toLowerCase()
    );
    return benefit?.amount || 0;
  };

  return (
    <Link to={`/policies/${policy.id}`}>
      <Card className="p-6 hover:shadow-lg transition-shadow animate-fadeIn">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Policy Number</p>
            <h3 className="text-lg font-semibold">{policy.policyNumber}</h3>
          </div>
          <StatusBadge status={policy.status} />
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Premium</p>
              <p className="font-medium">${policy.premium.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sum Insured</p>
              <p className="font-medium">${policy.sumInsured.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-medium">
                {new Date(policy.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">End Date</p>
              <p className="font-medium">
                {new Date(policy.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Coverage Benefits</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {policy.benefits.map((benefit) => (
                <Card key={benefit.name} className="p-3 hover:bg-sage-50 transition-colors">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={benefit.name} className="border-none">
                      <AccordionTrigger className="py-1 px-0 hover:no-underline">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-sage-100 rounded-full">
                            {getBenefitIcon(benefit.name)}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium">{benefit.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${(benefit.totalAmount - benefit.consumedAmount).toLocaleString()} remaining
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-10 space-y-2 mt-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Coverage:</span>
                            <span className="font-medium">${benefit.totalAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Used:</span>
                            <span className="font-medium">${benefit.consumedAmount.toLocaleString()}</span>
                          </div>
                          
                          <div className="h-2 bg-sage-100 rounded-full mt-1">
                            <div 
                              className="h-2 bg-sage-600 rounded-full" 
                              style={{ 
                                width: `${(benefit.consumedAmount / benefit.totalAmount) * 100}%` 
                              }}
                            ></div>
                          </div>
                          
                          {getClaimsForBenefit(benefit.name).length > 0 && (
                            <div className="mt-3 pt-3 border-t">
                              <p className="text-sm font-medium mb-2">Claim History</p>
                              {getClaimsForBenefit(benefit.name).map((claim) => (
                                <div key={claim.id} className="flex justify-between text-sm py-1">
                                  <span className="text-muted-foreground">
                                    {new Date(claim.createdDate).toLocaleDateString()} ({claim.status})
                                  </span>
                                  <span className="font-medium">
                                    ${getClaimedAmount(claim, benefit.name).toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Active Claims</p>
            <p className="font-medium text-sage-600">{claimsCount} claims</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
