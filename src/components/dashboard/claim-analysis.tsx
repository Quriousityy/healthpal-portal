
import React, { useState } from "react";
import { Claim } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Hospital, FileSearch2, Calendar, ArrowRight } from "lucide-react";

interface ClaimAnalysisProps {
  claims: Claim[];
  buttonVariant?: "default" | "outline" | "ghost";
  buttonSize?: "default" | "sm" | "lg" | "icon";
}

export function ClaimAnalysis({ 
  claims, 
  buttonVariant = "ghost", 
  buttonSize = "sm" 
}: ClaimAnalysisProps) {
  const [activeClaimId, setActiveClaimId] = useState<string>(claims[0]?.id || "");

  if (claims.length === 0) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize}>
          <FileSearch2 className="h-4 w-4 mr-2" />
          Analyse
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-sage-700">
            Claim Analysis
            {claims.length > 1 && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                {claims.length} claims found
              </span>
            )}
          </DialogTitle>
          <DialogDescription>
            View details of all claims related to this policy
          </DialogDescription>
        </DialogHeader>
        
        {claims.length > 1 ? (
          <Tabs defaultValue={activeClaimId} onValueChange={setActiveClaimId} className="mt-4">
            <TabsList className="mb-4 w-full">
              {claims.map((claim) => (
                <TabsTrigger key={claim.id} value={claim.id} className="flex-1">
                  {claim.type} - {new Date(claim.createdDate).toLocaleDateString()}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {claims.map((claim) => (
              <TabsContent key={claim.id} value={claim.id}>
                {renderClaimDetails(claim)}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          renderClaimDetails(claims[0])
        )}
      </DialogContent>
    </Dialog>
  );
}

function renderClaimDetails(claim: Claim) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="bg-sage-100 p-2 rounded-full">
            <Hospital className="h-5 w-5 text-sage-700" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Hospital Details</h4>
            {claim.hospitalDetails ? (
              <div className="space-y-2 mt-2">
                <p className="font-semibold">{claim.hospitalDetails.name}</p>
                <p className="text-sm text-muted-foreground">{claim.hospitalDetails.address}</p>
                <p className="text-sm text-muted-foreground">
                  Type: {claim.hospitalDetails.type}
                </p>
                <p className="text-sm text-muted-foreground">
                  Contact: {claim.hospitalDetails.contact}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">No hospital details available</p>
            )}
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-sage-100 p-2 rounded-full">
            <Activity className="h-5 w-5 text-sage-700" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Treatment Details</h4>
            <div className="space-y-2 mt-2">
              <p className="font-semibold">{claim.type}</p>
              {claim.diagnosis && (
                <p className="text-sm text-muted-foreground">Diagnosis: {claim.diagnosis}</p>
              )}
              {claim.icdCode && (
                <p className="text-sm text-muted-foreground">ICD Code: {claim.icdCode}</p>
              )}
              {claim.pcsCode && (
                <p className="text-sm text-muted-foreground">PCS Code: {claim.pcsCode}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="bg-sage-100 p-2 rounded-full">
            <Calendar className="h-5 w-5 text-sage-700" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Timeline</h4>
            <div className="space-y-2 mt-2">
              <p className="text-sm text-muted-foreground">
                Claim Date: {new Date(claim.createdDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Last Updated: {new Date(claim.updatedDate).toLocaleDateString()}
              </p>
              <p className="font-semibold capitalize">Status: {claim.status}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-sage-100 p-2 rounded-full">
            <ArrowRight className="h-5 w-5 text-sage-700" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Claimed Benefits</h4>
            <div className="space-y-2 mt-2">
              {claim.benefitsClaimed.map((benefit, index) => (
                <div key={index} className="flex justify-between">
                  <span>{benefit.name}</span>
                  <span className="font-medium">${benefit.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 mt-2 border-t">
                <span className="font-medium">Total</span>
                <span className="font-semibold">
                  ${claim.amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2 mt-4">
        <h4 className="font-medium mb-4">Claim Progress</h4>
        <div className="space-y-6">
          {claim.steps.map((step, index) => (
            <div key={step.id} className="flex items-start relative">
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
      </div>
    </div>
  );
}
