
import { Policy } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface PolicyCardProps {
  policy: Policy;
  claimsCount?: number;
}

const COLORS = ["#059669", "#E11D48", "#D97706", "#0EA5E9"];

export function PolicyCard({ policy, claimsCount = 0 }: PolicyCardProps) {
  const benefitsData = policy.benefits.map((benefit) => [
    {
      name: "Consumed",
      value: benefit.consumedAmount,
    },
    {
      name: "Remaining",
      value: benefit.totalAmount - benefit.consumedAmount,
    },
  ]);

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
            <p className="text-sm text-muted-foreground mb-4">Benefits Usage</p>
            <div className="grid gap-6">
              {policy.benefits.map((benefit, index) => (
                <div key={benefit.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{benefit.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ${(benefit.totalAmount - benefit.consumedAmount).toLocaleString()} remaining
                    </span>
                  </div>
                  <div className="h-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={benefitsData[index]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          fill="#8884d8"
                        >
                          <Cell fill={COLORS[index % COLORS.length]} />
                          <Cell fill={`${COLORS[index % COLORS.length]}33`} />
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => `$${value.toLocaleString()}`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Used: ${benefit.consumedAmount.toLocaleString()}</span>
                    <span>Total: ${benefit.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
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
