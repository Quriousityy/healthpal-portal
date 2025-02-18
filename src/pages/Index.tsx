
import { PolicyCard } from "@/components/dashboard/policy-card";
import { ClaimsSection } from "@/components/dashboard/claims-section";
import type { Policy, Claim } from "@/lib/types";

// Mock data for demonstration
const mockPolicies: Policy[] = [
  {
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
    ],
  },
];

const mockClaims: Claim[] = [
  {
    id: "CLM-001",
    policyId: "1",
    type: "Hospitalization",
    amount: 15000,
    status: "approved",
    createdDate: new Date("2024-02-15"),
    updatedDate: new Date("2024-02-20"),
    diagnosis: "Acute appendicitis",
    currentStep: 4,
    steps: [
      {
        id: 1,
        title: "Claim Submitted",
        description: "Initial claim details submitted",
        completed: true,
        date: new Date("2024-02-15"),
      },
      {
        id: 2,
        title: "Documents Verified",
        description: "All submitted documents verified",
        completed: true,
        date: new Date("2024-02-17"),
      },
      {
        id: 3,
        title: "Hospital Verification",
        description: "Hospital details verified",
        completed: true,
        date: new Date("2024-02-18"),
      },
      {
        id: 4,
        title: "Claim Approved",
        description: "Claim approved and processed",
        completed: true,
        date: new Date("2024-02-20"),
      },
    ],
  },
  {
    id: "CLM-002",
    policyId: "1",
    type: "Hospitalization",
    amount: 25000,
    status: "pending",
    createdDate: new Date("2024-03-01"),
    updatedDate: new Date("2024-03-01"),
    diagnosis: "Knee surgery",
    currentStep: 1,
    steps: [
      {
        id: 1,
        title: "Claim Submitted",
        description: "Initial claim details submitted",
        completed: true,
        date: new Date("2024-03-01"),
      },
      {
        id: 2,
        title: "Documents Verification",
        description: "Verifying submitted documents",
        completed: false,
      },
      {
        id: 3,
        title: "Hospital Verification",
        description: "Pending hospital verification",
        completed: false,
      },
      {
        id: 4,
        title: "Final Processing",
        description: "Claim processing and payment",
        completed: false,
      },
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-semibold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Manage your health insurance policies and claims
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-3">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              Your Active Policy
            </h2>
            <PolicyCard 
              policy={mockPolicies[0]} 
              claimsCount={mockClaims.length} 
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <ClaimsSection claims={mockClaims} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
