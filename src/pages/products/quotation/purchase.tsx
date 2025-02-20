
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const PurchasePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { selectedPlan, selectedBenefits, totalPrice } = location.state;
  const form = useForm();

  const handlePurchase = (data: any) => {
    toast({
      title: "Purchase Successful",
      description: "Your policy has been created successfully.",
    });
    navigate("/policies");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-semibold tracking-tight">
            Complete Your Purchase
          </h1>
          <p className="text-muted-foreground mt-2">
            Please provide your payment details
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 animate-fadeIn order-2 md:order-1">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlePurchase)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Details</h3>
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="1234 5678 9012 3456" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="MM/YY" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" placeholder="123" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700">
                  Complete Purchase
                </Button>
              </form>
            </Form>
          </Card>

          <Card className="p-6 animate-fadeIn order-1 md:order-2">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">{selectedPlan.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedPlan.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Selected Benefits</h4>
                <ul className="space-y-1">
                  {selectedPlan.benefits.map((benefit) => (
                    <li
                      key={benefit.name}
                      className={`text-sm ${
                        !benefit.isOptional ||
                        selectedBenefits.includes(benefit.name)
                          ? "text-foreground"
                          : "text-muted-foreground line-through"
                      }`}
                    >
                      {benefit.name} - ${benefit.coverage.toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Monthly Premium</span>
                  <span className="text-xl font-bold">${totalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
