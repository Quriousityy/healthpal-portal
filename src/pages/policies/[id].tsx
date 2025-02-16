
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { ClaimTracker } from "@/components/claims/claim-tracker";
import type { Policy, Claim, PolicyBenefit } from "@/lib/types";

// Mock data for demonstration
const mockPolicy: Policy = {
  id: "1",
  policyNumber: "POL-2024-001",
  type: "Health Insurance",
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-12-31"),
  premium: 1200,
  sumInsured: 500000,
  status: "active",
  benefits: [
    {
      name: "Hospitalization",
      totalAmount: 300000,
      consumedAmount: 50000,
      description: "Coverage for hospital stays",
    },
    {
      name: "Outpatient Care",
      totalAmount: 100000,
      consumedAmount: 15000,
      description: "Coverage for outpatient treatments",
    },
    {
      name: "Medications",
      totalAmount: 100000,
      consumedAmount: 10000,
      description: "Coverage for prescribed medications",
    },
  ],
};

const mockClaim: Claim = {
  id: "CLM-001",
  policyId: "1",
  type: "Hospitalization",
  amount: 25000,
  status: "processing",
  createdDate: new Date("2024-03-01"),
  updatedDate: new Date("2024-03-05"),
  hospitalId: "H123",
  currentStep: 2,
  steps: [
    {
      id: 1,
      title: "Claim Submitted",
      description: "Your claim has been successfully submitted",
      date: new Date("2024-03-01"),
      completed: true,
    },
    {
      id: 2,
      title: "Document Verification",
      description: "We are reviewing your submitted documents",
      date: new Date("2024-03-03"),
      completed: true,
    },
    {
      id: 3,
      title: "Hospital Verification",
      description: "Verifying details with the hospital",
      date: new Date("2024-03-05"),
      completed: false,
    },
    {
      id: 4,
      title: "Payment Processing",
      description: "Processing your claim payment",
      completed: false,
    },
  ],
};

const PolicyDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold tracking-tight">
              Policy Details
            </h1>
            <StatusBadge status={mockPolicy.status} />
          </div>
          <p className="text-muted-foreground mt-2">
            Policy Number: {mockPolicy.policyNumber}
          </p>
        </header>

        <div className="grid gap-8">
          <Card className="p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Coverage Details</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Policy Type</p>
                <p className="font-medium">{mockPolicy.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sum Insured</p>
                <p className="font-medium">
                  ${mockPolicy.sumInsured.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Premium</p>
                <p className="font-medium">
                  ${mockPolicy.premium.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">
                  {mockPolicy.startDate.toLocaleDateString()} -{" "}
                  {mockPolicy.endDate.toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Claims & Benefits</h2>
            <ClaimTracker claim={mockClaim} benefits={mockPolicy.benefits} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
