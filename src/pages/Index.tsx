
import { PolicyCard } from "@/components/dashboard/policy-card";
import { ClaimsSection } from "@/components/dashboard/claims-section";
import type { Policy, Claim } from "@/lib/types";

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
};

const mockClaims: Claim[] = [
  {
    id: "CLM-001",
    policyId: "1",
    type: "Medical",
    amount: 2500,
    status: "approved",
    createdDate: new Date("2024-02-15"),
    updatedDate: new Date("2024-02-18"),
    diagnosis: "Routine Checkup",
  },
  {
    id: "CLM-002",
    policyId: "1",
    type: "Dental",
    amount: 800,
    status: "pending",
    createdDate: new Date("2024-03-01"),
    updatedDate: new Date("2024-03-01"),
    diagnosis: "Dental Cleaning",
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
            <PolicyCard policy={mockPolicy} />
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
