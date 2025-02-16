
import { Policy } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Link } from "react-router-dom";

interface PolicyCardProps {
  policy: Policy;
}

export function PolicyCard({ policy }: PolicyCardProps) {
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
        </div>
      </Card>
    </Link>
  );
}
