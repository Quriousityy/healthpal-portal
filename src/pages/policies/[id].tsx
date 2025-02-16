
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Policy } from "@/lib/types";

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
            <h2 className="text-xl font-semibold mb-4">Benefits Overview</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="h-2 w-2 mt-2 rounded-full bg-sage-500 mr-3" />
                <div>
                  <p className="font-medium">Hospitalization Coverage</p>
                  <p className="text-sm text-muted-foreground">
                    Covers room charges, ICU, medical practitioner fees
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 mt-2 rounded-full bg-sage-500 mr-3" />
                <div>
                  <p className="font-medium">Pre & Post Hospitalization</p>
                  <p className="text-sm text-muted-foreground">
                    30 days before and 60 days after hospitalization
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 mt-2 rounded-full bg-sage-500 mr-3" />
                <div>
                  <p className="font-medium">Day Care Treatment</p>
                  <p className="text-sm text-muted-foreground">
                    Coverage for treatments that require less than 24 hours
                  </p>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
