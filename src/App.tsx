import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import InfluencerProfile from "./pages/InfluencerProfile";
import CreateCampaign from "./pages/CreateCampaign";
import SavedInfluencers from "./pages/SavedInfluencers";
import AccountSettings from "./pages/AccountSettings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import MyCampaigns from "./pages/MyCampaigns";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/search" element={<Index />} />
            <Route path="/influencer/:id" element={<InfluencerProfile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/saved" element={<SavedInfluencers />} />
            <Route path="/campaigns" element={<MyCampaigns />} />
            <Route path="/settings" element={<AccountSettings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
