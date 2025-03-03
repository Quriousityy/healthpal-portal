
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuotationStepper from "@/components/quotation/quotation-stepper";
import { QuoteProgress, FamilyMember, MedicalHistory } from "@/lib/types";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Form schema
const applicantSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  dateOfBirth: z.date({ required_error: "Date of birth is required." }),
  gender: z.enum(["male", "female", "other"], { required_error: "Please select gender." }),
  occupation: z.string().min(2, { message: "Occupation is required." }),
  annualIncome: z.string().min(1, { message: "Annual income is required." }),
});

const QuotationDetails = () => {
  const params = useParams<{ type: string }>();
  const planType = params.type as "individual" | "family";
  const navigate = useNavigate();

  const [progress, setProgress] = useState<QuoteProgress>({
    step: 2,
    totalSteps: 4,
    currentSection: "Personal Details",
  });

  const [familyMembers, setFamilyMembers] = useState<Partial<FamilyMember>[]>([]);

  const form = useForm<z.infer<typeof applicantSchema>>({
    resolver: zodResolver(applicantSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      occupation: "",
      annualIncome: "",
    },
  });

  const relations = ["Spouse", "Child", "Parent", "Sibling"];

  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      {
        relation: "",
        firstName: "",
        lastName: "",
        gender: "male",
        occupation: "",
        annualIncome: 0,
      },
    ]);
  };

  const removeFamilyMember = (index: number) => {
    const updatedMembers = [...familyMembers];
    updatedMembers.splice(index, 1);
    setFamilyMembers(updatedMembers);
  };

  const updateFamilyMember = (index: number, field: string, value: any) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFamilyMembers(updatedMembers);
  };

  const onSubmit = (data: z.infer<typeof applicantSchema>) => {
    // Create a properly typed primary applicant that meets FamilyMember requirements
    const primaryApplicant: FamilyMember = {
      relation: "Self",
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      occupation: data.occupation,
      annualIncome: parseFloat(data.annualIncome),
      medicalHistory: {
        hasExistingConditions: false,
        hasSurgeries: false,
        smokingStatus: "never",
        alcoholConsumption: "never",
      },
    };

    // Ensure all family members have required properties before proceeding
    let validFamilyMembers: FamilyMember[] = [];
    if (planType === "family" && familyMembers.length > 0) {
      // Filter out any incomplete family members
      validFamilyMembers = familyMembers
        .filter(member => 
          member.firstName && 
          member.lastName && 
          member.dateOfBirth &&
          member.gender &&
          member.relation &&
          member.occupation
        )
        .map(member => ({
          relation: member.relation!,
          firstName: member.firstName!,
          lastName: member.lastName!,
          dateOfBirth: member.dateOfBirth!,
          gender: member.gender!,
          occupation: member.occupation!,
          annualIncome: member.annualIncome || 0,
          medicalHistory: {
            hasExistingConditions: false,
            hasSurgeries: false,
            smokingStatus: "never",
            alcoholConsumption: "never",
          }
        }));
    }

    // Save to session storage or state management
    const quotationData = {
      planType,
      primaryApplicant,
      familyMembers: planType === "family" ? validFamilyMembers : [],
      selectedBenefits: [],
      totalPremium: 0,
    };

    sessionStorage.setItem("quotationData", JSON.stringify(quotationData));
    navigate("/quotation/medical-questions");
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <QuotationStepper progress={progress} />

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">
          {planType === "individual" ? "Individual" : "Family"} Plan - Personal Details
        </h1>
        <p className="text-muted-foreground mb-8">
          Please provide your personal information to customize your health plan quote
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Primary Applicant Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <FormControl>
                          <Input placeholder="Software Developer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="annualIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Income (in $)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="50000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {planType === "family" && (
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Family Members</h3>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addFamilyMember}
                        className="flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Family Member
                      </Button>
                    </div>

                    {familyMembers.length === 0 && (
                      <p className="text-muted-foreground text-sm italic">
                        Add family members to include in your insurance plan
                      </p>
                    )}

                    {familyMembers.map((member, index) => (
                      <Card key={index} className="mb-4">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium">Family Member {index + 1}</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => removeFamilyMember(index)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <FormLabel>Relation</FormLabel>
                              <Select
                                value={member.relation}
                                onValueChange={(value) =>
                                  updateFamilyMember(index, "relation", value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select relation" />
                                </SelectTrigger>
                                <SelectContent>
                                  {relations.map((relation) => (
                                    <SelectItem key={relation} value={relation.toLowerCase()}>
                                      {relation}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <FormLabel>First Name</FormLabel>
                              <Input
                                value={member.firstName || ""}
                                onChange={(e) =>
                                  updateFamilyMember(index, "firstName", e.target.value)
                                }
                                placeholder="First Name"
                              />
                            </div>

                            <div className="space-y-2">
                              <FormLabel>Last Name</FormLabel>
                              <Input
                                value={member.lastName || ""}
                                onChange={(e) =>
                                  updateFamilyMember(index, "lastName", e.target.value)
                                }
                                placeholder="Last Name"
                              />
                            </div>

                            <div className="space-y-2">
                              <FormLabel>Gender</FormLabel>
                              <Select
                                value={member.gender}
                                onValueChange={(value) =>
                                  updateFamilyMember(index, "gender", value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <FormLabel>Date of Birth</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn("w-full pl-3 text-left font-normal")}
                                  >
                                    {member.dateOfBirth ? (
                                      format(new Date(member.dateOfBirth), "PPP")
                                    ) : (
                                      <span className="text-muted-foreground">Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={member.dateOfBirth ? new Date(member.dateOfBirth) : undefined}
                                    onSelect={(date) =>
                                      updateFamilyMember(index, "dateOfBirth", date)
                                    }
                                    disabled={(date) =>
                                      date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button type="submit">
                    Continue to Medical Questions
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuotationDetails;
