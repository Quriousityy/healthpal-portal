
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Claim, PolicyBenefit } from "@/lib/types";

interface ClaimTrackerProps {
  claim: Claim;
  benefits: PolicyBenefit[];
}

const COLORS = ["#059669", "#E11D48", "#D97706"];

export function ClaimTracker({ claim, benefits }: ClaimTrackerProps) {
  const benefitsData = benefits.map((benefit) => ({
    name: benefit.name,
    value: benefit.totalAmount - benefit.consumedAmount,
    total: benefit.totalAmount,
  }));

  return (
    <Tabs defaultValue="progress" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="progress">Claim Progress</TabsTrigger>
        <TabsTrigger value="benefits">Benefits Usage</TabsTrigger>
      </TabsList>
      
      <TabsContent value="progress" className="mt-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Claim Progress</h3>
          <div className="relative">
            {claim.steps.map((step, index) => (
              <div key={step.id} className="flex items-start mb-8 relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-sage-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                {index < claim.steps.length - 1 && (
                  <div
                    className={`absolute left-4 top-8 w-0.5 h-12 -translate-x-1/2 ${
                      step.completed ? "bg-sage-600" : "bg-gray-200"
                    }`}
                  />
                )}
                <div className="ml-4">
                  <h4 className="font-medium">{step.title}</h4>
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
      </TabsContent>
      
      <TabsContent value="benefits" className="mt-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Benefits Usage</h3>
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
            {benefits.map((benefit, index) => (
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
      </TabsContent>
    </Tabs>
  );
}
