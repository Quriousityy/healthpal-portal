
import { Claim } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ClaimsSectionProps {
  claims: Claim[];
}

export function ClaimsSection({ claims }: ClaimsSectionProps) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Claims</h2>
        <Button className="bg-sage-500 hover:bg-sage-600">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Claim
        </Button>
      </div>
      
      <div className="grid gap-4">
        {claims.map((claim) => (
          <Card key={claim.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Claim ID</p>
                <p className="font-medium">{claim.id}</p>
              </div>
              <StatusBadge status={claim.status} />
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
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
          </Card>
        ))}
      </div>
    </div>
  );
}
