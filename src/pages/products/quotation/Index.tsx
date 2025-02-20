
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuotationIndex = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-semibold tracking-tight">
            Get Health Insurance Quote
          </h1>
          <p className="text-muted-foreground mt-2">
            Choose the right health insurance plan for you and your family
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-all cursor-pointer animate-fadeIn">
            <CardHeader className="text-center">
              <CardTitle>Individual Health Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Comprehensive health coverage for individuals
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sage-500" />
                  <span>Tailored coverage for your needs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sage-500" />
                  <span>Flexible benefit options</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sage-500" />
                  <span>No claim bonus benefits</span>
                </li>
              </ul>
              <Button
                className="w-full bg-sage-600 hover:bg-sage-700"
                onClick={() => navigate("/products/quotation/details/individual")}
              >
                Get Individual Quote
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer animate-fadeIn">
            <CardHeader className="text-center">
              <CardTitle>Family Floater Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Single policy covering your entire family
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sage-500" />
                  <span>Coverage for the whole family</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sage-500" />
                  <span>Cost-effective premium</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sage-500" />
                  <span>Shared sum insured</span>
                </li>
              </ul>
              <Button
                className="w-full bg-sage-600 hover:bg-sage-700"
                onClick={() => navigate("/products/quotation/details/family")}
              >
                Get Family Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuotationIndex;
