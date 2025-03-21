
import React from "react";
import { Claim } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Activity, Hospital, FileSearch2, Plus, Calendar } from "lucide-react";

interface ClaimAnalysisProps {
  claim: Claim;
  buttonVariant?: "default" | "outline" | "ghost";
  buttonSize?: "default" | "sm" | "lg" | "icon";
}

export function ClaimAnalysis({ 
  claim, 
  buttonVariant = "ghost", 
  buttonSize = "sm" 
}: ClaimAnalysisProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize}>
          <FileSearch2 className="h-4 w-4 mr-2" />
          Analyse
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="end">
        <div className="bg-sage-50 p-3 rounded-t-md border-b">
          <h3 className="font-semibold text-sage-700">Claim Analysis</h3>
          <p className="text-xs text-muted-foreground">ID: {claim.id}</p>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-sage-100 p-2 rounded-full">
              <Hospital className="h-4 w-4 text-sage-700" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Hospital Details</h4>
              {claim.hospitalDetails ? (
                <div className="text-sm space-y-1 mt-1">
                  <p>{claim.hospitalDetails.name}</p>
                  <p className="text-xs text-muted-foreground">{claim.hospitalDetails.address}</p>
                  <p className="text-xs text-muted-foreground">
                    Type: {claim.hospitalDetails.type}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Contact: {claim.hospitalDetails.contact}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">No hospital details available</p>
              )}
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-sage-100 p-2 rounded-full">
              <Activity className="h-4 w-4 text-sage-700" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Treatment Details</h4>
              <div className="text-sm space-y-1 mt-1">
                <p>{claim.type}</p>
                {claim.diagnosis && (
                  <p className="text-xs text-muted-foreground">Diagnosis: {claim.diagnosis}</p>
                )}
                {claim.icdCode && (
                  <p className="text-xs text-muted-foreground">ICD Code: {claim.icdCode}</p>
                )}
                {claim.pcsCode && (
                  <p className="text-xs text-muted-foreground">PCS Code: {claim.pcsCode}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-sage-100 p-2 rounded-full">
              <Calendar className="h-4 w-4 text-sage-700" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Timeline</h4>
              <div className="text-sm space-y-1 mt-1">
                <p className="text-xs text-muted-foreground">
                  Claim Date: {new Date(claim.createdDate).toLocaleDateString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Last Updated: {new Date(claim.updatedDate).toLocaleDateString()}
                </p>
                <p className="text-xs">Status: <span className="font-medium capitalize">{claim.status}</span></p>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-sage-100 p-2 rounded-full">
              <Plus className="h-4 w-4 text-sage-700" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Claimed Benefits</h4>
              <div className="space-y-1 mt-1">
                {claim.benefitsClaimed.map((benefit, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span>{benefit.name}</span>
                    <span className="font-medium">${benefit.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs pt-1 mt-1 border-t">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">
                    ${claim.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
