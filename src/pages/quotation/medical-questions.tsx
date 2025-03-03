
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  UnderwritingQuestion, 
  UnderwritingAnswer, 
  QuoteProgress,
  FamilyMember
} from "@/lib/types";
import QuotationStepper from "@/components/quotation/quotation-stepper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";

// Mock underwriting questions
const mockMedicalQuestions: UnderwritingQuestion[] = [
  {
    id: "m1",
    question: "Do you have any pre-existing medical conditions?",
    type: "yes-no",
    category: "medical",
    required: true,
  },
  {
    id: "m2",
    question: "Have you ever been diagnosed with or treated for any of the following conditions?",
    type: "multi-select",
    options: [
      "Diabetes",
      "High Blood Pressure",
      "Heart Disease",
      "Cancer",
      "Respiratory Disease",
      "Kidney Disease",
      "Liver Disease",
      "Neurological Disorder",
      "Autoimmune Disease",
      "Mental Health Condition"
    ],
    category: "medical",
    required: true,
  },
  {
    id: "m3",
    question: "Have you undergone any surgeries in the past 5 years?",
    type: "yes-no",
    category: "medical",
    required: true,
  },
  {
    id: "m4",
    question: "If yes, please provide details about your surgeries:",
    type: "input",
    category: "medical",
    required: false,
  },
  {
    id: "m5",
    question: "Are you currently taking any medications?",
    type: "yes-no",
    category: "medical",
    required: true,
  },
  {
    id: "m6",
    question: "If yes, please list your current medications:",
    type: "input",
    category: "medical",
    required: false,
  },
  {
    id: "m7",
    question: "What is your smoking status?",
    type: "select",
    options: ["Never", "Former", "Current"],
    category: "lifestyle",
    required: true,
  },
  {
    id: "m8",
    question: "How often do you consume alcohol?",
    type: "select",
    options: ["Never", "Occasional", "Regular"],
    category: "lifestyle",
    required: true,
  },
];

const mockFinancialQuestions: UnderwritingQuestion[] = [
  {
    id: "f1",
    question: "Do you have any existing health insurance policies?",
    type: "yes-no",
    category: "financial",
    required: true,
  },
  {
    id: "f2",
    question: "Have you made any health insurance claims in the last 3 years?",
    type: "yes-no",
    category: "financial",
    required: true,
  },
  {
    id: "f3",
    question: "What is your current employment status?",
    type: "select",
    options: ["Full-time", "Part-time", "Self-employed", "Unemployed", "Retired"],
    category: "financial",
    required: true,
  },
];

// Form schema for validation
const createFormSchema = (questions: UnderwritingQuestion[]) => {
  const schemaObject: any = {};
  
  questions.forEach(question => {
    if (question.required) {
      if (question.type === "yes-no") {
        schemaObject[question.id] = z.boolean({
          required_error: "Please answer this question"
        });
      } else if (question.type === "select") {
        schemaObject[question.id] = z.string({
          required_error: "Please select an option"
        });
      } else if (question.type === "input") {
        schemaObject[question.id] = z.string().optional();
      } else if (question.type === "multi-select") {
        schemaObject[question.id] = z.array(z.string()).optional();
      }
    } else {
      if (question.type === "input") {
        schemaObject[question.id] = z.string().optional();
      } else if (question.type === "multi-select") {
        schemaObject[question.id] = z.array(z.string()).optional();
      } else if (question.type === "select") {
        schemaObject[question.id] = z.string().optional();
      } else {
        schemaObject[question.id] = z.boolean().optional();
      }
    }
  });

  return z.object(schemaObject);
};

const MedicalQuestionsPage = () => {
  const navigate = useNavigate();
  const [quotationData, setQuotationData] = useState<any>(null);
  const [primaryApplicant, setPrimaryApplicant] = useState<FamilyMember | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [currentMember, setCurrentMember] = useState<string>("primary");
  const [memberAnswers, setMemberAnswers] = useState<{[key: string]: UnderwritingAnswer[]}>({});

  const [progress, setProgress] = useState<QuoteProgress>({
    step: 3,
    totalSteps: 4,
    currentSection: "Medical Questions"
  });

  const allQuestions = [...mockMedicalQuestions, ...mockFinancialQuestions];
  const formSchema = createFormSchema(allQuestions);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Initialize with empty/default values
    },
  });

  useEffect(() => {
    // Load saved quotation data
    const savedData = sessionStorage.getItem("quotationData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setQuotationData(parsedData);
      setPrimaryApplicant(parsedData.primaryApplicant);
      
      if (parsedData.familyMembers && parsedData.familyMembers.length > 0) {
        setFamilyMembers(parsedData.familyMembers);
      }
      
      // Initialize member answers
      const initialAnswers: {[key: string]: UnderwritingAnswer[]} = {
        primary: []
      };
      
      if (parsedData.familyMembers) {
        parsedData.familyMembers.forEach((_: any, index: number) => {
          initialAnswers[`family_${index}`] = [];
        });
      }
      
      setMemberAnswers(initialAnswers);
    } else {
      // If no data, go back to the start
      navigate("/quotation");
    }
  }, [navigate]);

  const handleMemberChange = (memberKey: string) => {
    // Save current answers before switching
    const currentAnswers = form.getValues();
    
    saveMemberAnswers(currentMember, currentAnswers);
    
    // Switch to new member
    setCurrentMember(memberKey);
    
    // Load the selected member's answers
    const selectedMemberAnswers = memberAnswers[memberKey] || [];
    
    // Reset form with the selected member's answers
    const newDefaultValues: any = {};
    allQuestions.forEach(question => {
      const answer = selectedMemberAnswers.find(a => a.questionId === question.id);
      if (answer) {
        newDefaultValues[question.id] = answer.answer;
      } else {
        // Set default values based on question type
        if (question.type === "yes-no") {
          newDefaultValues[question.id] = false;
        } else if (question.type === "multi-select") {
          newDefaultValues[question.id] = [];
        } else {
          newDefaultValues[question.id] = "";
        }
      }
    });
    
    form.reset(newDefaultValues);
  };

  const saveMemberAnswers = (memberKey: string, formValues: any) => {
    // Create properly typed answers array
    const answers: UnderwritingAnswer[] = Object.entries(formValues).map(([questionId, value]) => ({
      questionId,
      // Ensure the answer type matches what's expected in UnderwritingAnswer
      answer: value as string | string[] | boolean | number
    }));
    
    setMemberAnswers(prev => ({
      ...prev,
      [memberKey]: answers,
    }));
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Save the current member's answers
    saveMemberAnswers(currentMember, data);
    
    // Update the quotation data with all answers
    const updatedQuotationData = {
      ...quotationData,
      underwritingAnswers: memberAnswers,
    };
    
    sessionStorage.setItem("quotationData", JSON.stringify(updatedQuotationData));
    
    // Navigate to the next page
    navigate("/quotation/plans");
  };

  if (!primaryApplicant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <QuotationStepper progress={progress} />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">Medical & Financial Underwriting</h1>
        <p className="text-muted-foreground mb-8">
          Please answer the following questions to help us determine your coverage options
        </p>
        
        {quotationData?.planType === "family" && familyMembers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Family Member Selection</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Please answer questions for each family member
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={currentMember === "primary" ? "default" : "outline"}
                onClick={() => handleMemberChange("primary")}
                className="mb-2"
              >
                Primary ({primaryApplicant.firstName} {primaryApplicant.lastName})
              </Button>
              
              {familyMembers.map((member, index) => (
                <Button
                  key={index}
                  variant={currentMember === `family_${index}` ? "default" : "outline"}
                  onClick={() => handleMemberChange(`family_${index}`)}
                  className="mb-2"
                >
                  {member.relation}: {member.firstName} {member.lastName}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Accordion type="single" collapsible className="w-full mb-8">
              <AccordionItem value="medical">
                <AccordionTrigger>
                  <span className="text-lg font-medium">Medical Questions</span>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="border-0 shadow-none">
                    <CardContent className="pt-6">
                      {mockMedicalQuestions.map((question) => (
                        <FormField
                          key={question.id}
                          control={form.control}
                          name={question.id as any}
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel>
                                {question.question}
                                {question.required && <span className="text-destructive ml-1">*</span>}
                              </FormLabel>
                              
                              {question.type === "yes-no" && (
                                <div className="flex items-center space-x-4 mt-2">
                                  <FormControl>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        checked={field.value === true}
                                        onCheckedChange={() => field.onChange(true)}
                                        id={`${question.id}-yes`}
                                      />
                                      <label
                                        htmlFor={`${question.id}-yes`}
                                        className="text-sm font-medium leading-none cursor-pointer"
                                      >
                                        Yes
                                      </label>
                                    </div>
                                  </FormControl>
                                  <FormControl>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        checked={field.value === false}
                                        onCheckedChange={() => field.onChange(false)}
                                        id={`${question.id}-no`}
                                      />
                                      <label
                                        htmlFor={`${question.id}-no`}
                                        className="text-sm font-medium leading-none cursor-pointer"
                                      >
                                        No
                                      </label>
                                    </div>
                                  </FormControl>
                                </div>
                              )}
                              
                              {question.type === "select" && question.options && (
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value as string}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {question.options.map((option) => (
                                      <SelectItem key={option} value={option.toLowerCase()}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              
                              {question.type === "input" && (
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    rows={3}
                                    placeholder="Enter details here..."
                                  />
                                </FormControl>
                              )}
                              
                              {question.type === "multi-select" && question.options && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                  {question.options.map((option) => (
                                    <div 
                                      key={option} 
                                      className="flex items-center space-x-2"
                                    >
                                      <Checkbox
                                        id={`${question.id}-${option}`}
                                        checked={(field.value as string[] || []).includes(option)}
                                        onCheckedChange={(checked) => {
                                          const currentValue = field.value as string[] || [];
                                          if (checked) {
                                            field.onChange([...currentValue, option]);
                                          } else {
                                            field.onChange(
                                              currentValue.filter((val) => val !== option)
                                            );
                                          }
                                        }}
                                      />
                                      <label
                                        htmlFor={`${question.id}-${option}`}
                                        className="text-sm font-medium leading-none cursor-pointer"
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="financial">
                <AccordionTrigger>
                  <span className="text-lg font-medium">Financial Questions</span>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="border-0 shadow-none">
                    <CardContent className="pt-6">
                      {mockFinancialQuestions.map((question) => (
                        <FormField
                          key={question.id}
                          control={form.control}
                          name={question.id as any}
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel>
                                {question.question}
                                {question.required && <span className="text-destructive ml-1">*</span>}
                              </FormLabel>
                              
                              {question.type === "yes-no" && (
                                <div className="flex items-center space-x-4 mt-2">
                                  <FormControl>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        checked={field.value === true}
                                        onCheckedChange={() => field.onChange(true)}
                                        id={`${question.id}-yes`}
                                      />
                                      <label
                                        htmlFor={`${question.id}-yes`}
                                        className="text-sm font-medium leading-none cursor-pointer"
                                      >
                                        Yes
                                      </label>
                                    </div>
                                  </FormControl>
                                  <FormControl>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        checked={field.value === false}
                                        onCheckedChange={() => field.onChange(false)}
                                        id={`${question.id}-no`}
                                      />
                                      <label
                                        htmlFor={`${question.id}-no`}
                                        className="text-sm font-medium leading-none cursor-pointer"
                                      >
                                        No
                                      </label>
                                    </div>
                                  </FormControl>
                                </div>
                              )}
                              
                              {question.type === "select" && question.options && (
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value as string}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {question.options.map((option) => (
                                      <SelectItem key={option} value={option.toLowerCase()}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="flex justify-end pt-4">
              <Button type="submit">
                Continue to Plans
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MedicalQuestionsPage;
