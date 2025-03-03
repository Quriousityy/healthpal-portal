
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import Index from "./pages/Index";
import ProfilePage from "./pages/profile/Index";
import PolicyDetails from "./pages/policies/[id]";
import ProductsPage from "./pages/products/Index";
import NewClaimPage from "./pages/claims/new";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/NotFound";
import AppointmentsPage from "./pages/appointments/Index";
import QuotationJourney from "./pages/quotation/Index";
import QuotationDetails from "./pages/quotation/details/[type]";
import MedicalQuestionsPage from "./pages/quotation/medical-questions";
import QuotationPlansPage from "./pages/quotation/plans";
import PurchasePage from "./pages/quotation/purchase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/policies/:id" element={<PolicyDetails />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/claims/new" element={<NewClaimPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/quotation" element={<QuotationJourney />} />
            <Route path="/quotation/details/:type" element={<QuotationDetails />} />
            <Route path="/quotation/medical-questions" element={<MedicalQuestionsPage />} />
            <Route path="/quotation/plans" element={<QuotationPlansPage />} />
            <Route path="/quotation/purchase" element={<PurchasePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
