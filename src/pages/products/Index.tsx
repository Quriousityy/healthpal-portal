
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Essential Care",
    description: "Basic health coverage for individuals",
    coverage: 250000,
    monthlyPremium: 99,
    benefits: [
      "Basic hospitalization coverage",
      "Emergency room visits",
      "Prescription drugs",
    ],
    type: "individual",
    imagePath: "/individual-health.jpg",
  },
  {
    id: "2",
    name: "Family Shield",
    description: "Comprehensive coverage for the whole family",
    coverage: 500000,
    monthlyPremium: 199,
    benefits: [
      "Full family coverage",
      "Dental and vision included",
      "Maternity benefits",
      "Regular health checkups",
    ],
    type: "family",
    imagePath: "/family-health.jpg",
  },
  {
    id: "3",
    name: "Senior Care Plus",
    description: "Specialized coverage for seniors",
    coverage: 400000,
    monthlyPremium: 149,
    benefits: [
      "Specialized senior care",
      "Chronic condition management",
      "Home healthcare services",
      "Prescription drug coverage",
    ],
    type: "senior",
    imagePath: "/senior-health.jpg",
  },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-semibold tracking-tight">Our Products</h1>
          <p className="text-muted-foreground mt-2">
            Find the perfect health insurance plan for you and your family
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow animate-fadeIn"
            >
              <div className="aspect-video relative">
                <img
                  src={product.imagePath}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-muted-foreground">{product.description}</p>
                <div>
                  <p className="text-sm text-muted-foreground">Coverage</p>
                  <p className="text-2xl font-semibold text-sage-600">
                    ${product.coverage.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Premium</p>
                  <p className="text-xl font-semibold">
                    ${product.monthlyPremium}/month
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Key Benefits:</p>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="h-2 w-2 mt-2 rounded-full bg-sage-500 mr-3" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full bg-sage-600 hover:bg-sage-700">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
