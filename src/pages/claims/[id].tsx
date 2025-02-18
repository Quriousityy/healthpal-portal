
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Claim } from "@/lib/types";

const COLORS = ["#059669", "#E11D48", "#D97706", "#0EA5E9"];

// Mock data for demonstration
const mockClaim: Claim = {
  id: "CLM-001",
  policyId: "1",
  type: "Hospitalization",
  amount: 15000,
  status: "approved",
  createdDate: new Date("2024-02-15"),
  updatedDate: new Date("2024-02-20"),
  diagnosis: "Acute appendicitis",
  icdCode: "K35.80",
  pcsCode: "0DTJ4ZZ",
  hospitalDetails: {
    name: "City General Hospital",
    address: "123 Healthcare Ave, Medical District",
    contact: "+1 (555) 123-4567",
    type: "Network",
  },
  currentStep: 4,
  benefitsClaimed: [
    {
      name: "Room Rent",
      amount: 5000,
      benefitId: "b1",
    },
    {
      name: "Surgery",
      amount: 8000,
      benefitId: "b2",
    },
    {
      name: "Medicines",
      amount: 2000,
      benefitId: "b3",
    },
  ],
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
};

const ClaimDetails = () => {
  const { id } = useParams();
  const benefitsData = mockClaim.benefitsClaimed.map((benefit) => ({
    name: benefit.name,
    value: benefit.amount,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold tracking-tight">
              Claim Details
            </h1>
            <StatusBadge status={mockClaim.status} />
          </div>
          <p className="text-muted-foreground mt-2">
            Claim ID: {mockClaim.id}
          </p>
        </header>

        <div className="grid gap-8">
          <Card className="p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Claim Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium">{mockClaim.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium">${mockClaim.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created Date</p>
                <p className="font-medium">
                  {mockClaim.createdDate.toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">
                  {mockClaim.updatedDate.toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Medical Details</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Diagnosis</p>
                <p className="font-medium">{mockClaim.diagnosis}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ICD Code</p>
                <p className="font-medium">{mockClaim.icdCode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">PCS Code</p>
                <p className="font-medium">{mockClaim.pcsCode}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Hospital Information</h2>
            <div className="grid gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Hospital Name</p>
                <p className="font-medium">{mockClaim.hospitalDetails?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{mockClaim.hospitalDetails?.address}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-medium">{mockClaim.hospitalDetails?.contact}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium">{mockClaim.hospitalDetails?.type} Hospital</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Benefits Claimed</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={benefitsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {benefitsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {mockClaim.benefitsClaimed.map((benefit, index) => (
                  <div key={benefit.benefitId} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{benefit.name}</span>
                    </div>
                    <span className="text-sm font-medium">
                      ${benefit.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Claim Progress</h2>
            <div className="space-y-6">
              {mockClaim.steps.map((step, index) => (
                <div key={step.id} className="flex items-start relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step.completed
                        ? "bg-sage-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < mockClaim.steps.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 w-0.5 h-12 ${
                        step.completed ? "bg-sage-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                  <div className="ml-4">
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                    {step.date && (
                      <p className="text-sm text-sage-600 mt-1">
                        {step.date.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetails;
