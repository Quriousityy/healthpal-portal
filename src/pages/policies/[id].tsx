
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Policy } from "@/lib/types";

const COLORS = ["#059669", "#E11D48", "#D97706"];

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

const PolicyDetails = () => {
  const { id } = useParams();
  const benefitsData = mockPolicy.benefits.map((benefit) => ({
    name: benefit.name,
    value: benefit.totalAmount - benefit.consumedAmount,
    total: benefit.totalAmount,
  }));

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
            <h2 className="text-xl font-semibold mb-4">Overall Benefits Usage</h2>
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
            <div className="mt-4 space-y-2">
              {mockPolicy.benefits.map((benefit, index) => (
                <div key={benefit.name} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{benefit.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    ${(benefit.totalAmount - benefit.consumedAmount).toLocaleString()}{" "}
                    left of ${benefit.totalAmount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
