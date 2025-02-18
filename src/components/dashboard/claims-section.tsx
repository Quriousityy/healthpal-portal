
import { Claim } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ClaimsSectionProps {
  claims: Claim[];
}

const COLORS = ["#059669", "#E11D48", "#D97706", "#0EA5E9"];

export function ClaimsSection({ claims }: ClaimsSectionProps) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Claims</h2>
        <Link to="/claims/new">
          <Button className="bg-sage-500 hover:bg-sage-600">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Claim
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-4">
        {claims.map((claim) => {
          const benefitsData = claim.benefitsClaimed.map((benefit) => ({
            name: benefit.name,
            value: benefit.amount,
          }));

          return (
            <Card key={claim.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Claim ID</p>
                  <p className="font-medium">{claim.id}</p>
                </div>
                <StatusBadge status={claim.status} />
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-medium">${claim.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {new Date(claim.createdDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-medium">{claim.type}</p>
                    </div>
                    {claim.icdCode && (
                      <div>
                        <p className="text-sm text-muted-foreground">ICD Code</p>
                        <p className="font-medium">{claim.icdCode}</p>
                      </div>
                    )}
                    {claim.pcsCode && (
                      <div>
                        <p className="text-sm text-muted-foreground">PCS Code</p>
                        <p className="font-medium">{claim.pcsCode}</p>
                      </div>
                    )}
                    {claim.hospitalDetails && (
                      <div>
                        <p className="text-sm text-muted-foreground">Hospital</p>
                        <p className="font-medium">{claim.hospitalDetails.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {claim.hospitalDetails.type} Hospital
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Benefits Claimed</h4>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={benefitsData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
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
                </div>

                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium mb-3">Claim Progress</h4>
                  <div className="space-y-4">
                    {claim.steps.map((step, index) => (
                      <div key={step.id} className="flex items-start relative">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                            step.completed
                              ? "bg-sage-600 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                        {index < claim.steps.length - 1 && (
                          <div
                            className={`absolute left-3 top-6 w-0.5 h-8 ${
                              step.completed ? "bg-sage-600" : "bg-gray-200"
                            }`}
                          />
                        )}
                        <div className="ml-3">
                          <p className="text-sm font-medium">{step.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {step.description}
                          </p>
                          {step.date && (
                            <p className="text-xs text-sage-600 mt-1">
                              {step.date.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Link
                    to={`/claims/${claim.id}`}
                    className="text-sage-600 hover:text-sage-700 text-sm font-medium mt-2 inline-block"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
