
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  contact: string;
}

export interface PolicyBenefit {
  name: string;
  totalAmount: number;
  consumedAmount: number;
  description: string;
}

export interface Policy {
  id: string;
  policyNumber: string;
  type: string;
  startDate: Date;
  endDate: Date;
  premium: number;
  sumInsured: number;
  status: PolicyStatus;
  benefits: PolicyBenefit[];
}

export interface Claim {
  id: string;
  policyId: string;
  type: string;
  amount: number;
  status: ClaimStatus;
  createdDate: Date;
  updatedDate: Date;
  hospitalId?: string;
  diagnosis?: string;
  currentStep: number;
  steps: ClaimStep[];
  icdCode?: string;
  pcsCode?: string;
  hospitalDetails?: HospitalDetails;
  benefitsClaimed: ClaimedBenefit[];
}

export interface HospitalDetails {
  name: string;
  address: string;
  contact: string;
  type: "Network" | "Non-Network";
}

export interface ClaimedBenefit {
  name: string;
  amount: number;
  benefitId: string;
}

export interface ClaimStep {
  id: number;
  title: string;
  description: string;
  date?: Date;
  completed: boolean;
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
  imagePath: string;
}
