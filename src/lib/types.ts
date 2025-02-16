export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  contact: string;
}

export interface Policy {
  id: string;
  policyNumber: string;
  type: string;
  startDate: Date;
  endDate: Date;
  premium: number;
  sumInsured: number;
  status: string;
}

export interface Claim {
  id: string;
  policyId: string;
  type: string;
  amount: number;
  status: string;
  createdDate: Date;
  updatedDate: Date;
  hospitalId?: string;
  diagnosis?: string;
}

export type PolicyStatus = "active" | "expired" | "pending";
export type ClaimStatus = "pending" | "approved" | "rejected" | "processing";

export interface Product {
  id: string;
  name: string;
  description: string;
  coverage: number;
  monthlyPremium: number;
  benefits: string[];
  type: "individual" | "family" | "senior";
}
