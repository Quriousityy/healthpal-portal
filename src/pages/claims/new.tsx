
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import type { Policy } from "@/lib/types";

// Mock policies for demonstration
const mockPolicies: Policy[] = [
  {
    id: "1",
    policyNumber: "POL-2024-001",
    type: "Health Insurance",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    premium: 1200,
    sumInsured: 500000,
    status: "active",
    benefits: [
      {
        name: "Hospitalization",
        totalAmount: 300000,
        consumedAmount: 50000,
        description: "Coverage for hospital stays",
      },
      {
        name: "Outpatient Care",
        totalAmount: 100000,
        consumedAmount: 15000,
        description: "Coverage for outpatient treatments",
      },
    ],
  },
];

interface ClaimFormData {
  policyId: string;
  hospitalName: string;
  admissionDate: string;
  dischargeDate: string;
  diagnosis: string;
  claimType: string;
  estimatedAmount: number;
  documents: FileList | null;
}

const NewClaimPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<ClaimFormData>();

  const totalSteps = 4; // Added a review step

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: ClaimFormData) => {
    console.log("Form submitted:", data);
    toast({
      title: "Claim Submitted",
      description: "Your claim has been successfully submitted.",
    });
    navigate("/claims/1");
  };

  const selectedPolicy = mockPolicies.find(
    (policy) => policy.id === form.watch("policyId")
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-semibold tracking-tight">New Health Claim</h1>
          <p className="text-muted-foreground mt-2">
            Submit a new health insurance claim
          </p>
        </header>

        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex flex-col items-center relative z-10 ${
                  step <= currentStep ? "text-sage-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step <= currentStep
                      ? "border-sage-600 bg-sage-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {step}
                </div>
                <p className="mt-2 text-sm">
                  {step === 1
                    ? "Policy Selection"
                    : step === 2
                    ? "Claim Details"
                    : step === 3
                    ? "Documents"
                    : "Review"}
                </p>
              </div>
            ))}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200">
              <div
                className="h-full bg-sage-600 transition-all duration-300"
                style={{
                  width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <Card className="p-6 animate-fadeIn">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="policyId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Policy</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your policy" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockPolicies.map((policy) => (
                              <SelectItem key={policy.id} value={policy.id}>
                                {policy.policyNumber} - {policy.type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {selectedPolicy && (
                    <div className="mt-4 p-4 bg-sage-50 rounded-lg">
                      <h3 className="font-medium mb-2">Policy Details</h3>
                      <p className="text-sm">Sum Insured: ${selectedPolicy.sumInsured.toLocaleString()}</p>
                      <p className="text-sm">Valid until: {selectedPolicy.endDate.toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="claimType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Claim Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select claim type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hospitalization">Hospitalization</SelectItem>
                            <SelectItem value="surgery">Surgery</SelectItem>
                            <SelectItem value="outpatient">Outpatient Treatment</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hospitalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospital Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter hospital name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="admissionDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admission Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dischargeDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discharge Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="diagnosis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnosis/Treatment</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter diagnosis or treatment details"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label>Required Documents</Label>
                    <ul className="list-disc list-inside text-sm text-muted-foreground mb-4 space-y-1">
                      <li>Hospital Discharge Summary</li>
                      <li>Original Hospital Bills</li>
                      <li>Investigation Reports</li>
                      <li>Doctor's Prescription</li>
                      <li>Previous Medical Records (if any)</li>
                    </ul>
                    <div className="mt-2 space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <Input
                          type="file"
                          multiple
                          className="w-full"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) =>
                            form.setValue("documents", e.target.files)
                          }
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          Upload all relevant documents in PDF or image format
                        </p>
                      </div>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="estimatedAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Claim Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            placeholder="Enter estimated amount"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Review Your Claim</h3>
                  <div className="grid gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Policy Number</p>
                      <p className="font-medium">
                        {selectedPolicy?.policyNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Claim Type</p>
                      <p className="font-medium">
                        {form.getValues("claimType")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hospital Name</p>
                      <p className="font-medium">
                        {form.getValues("hospitalName")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Admission Date</p>
                      <p className="font-medium">
                        {form.getValues("admissionDate")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Discharge Date</p>
                      <p className="font-medium">
                        {form.getValues("dischargeDate")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Amount</p>
                      <p className="font-medium">
                        ${form.getValues("estimatedAmount")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Documents Uploaded</p>
                      <p className="font-medium">
                        {form.getValues("documents")?.length || 0} files
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviousStep}
                  >
                    Previous
                  </Button>
                )}
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    className="bg-sage-600 hover:bg-sage-700 ml-auto"
                    onClick={handleNextStep}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-sage-600 hover:bg-sage-700 ml-auto"
                  >
                    Submit Claim
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default NewClaimPage;
