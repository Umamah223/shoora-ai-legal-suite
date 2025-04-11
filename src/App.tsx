
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Library from "./pages/Library";
import LegalAssistant from "./pages/LegalAssistant";
import CourtSimulation from "./pages/CourtSimulation";
import Accessibility from "./pages/Accessibility";
import Terms from "./pages/Terms";
import Licensing from "./pages/Licensing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/library" element={<Library />} />
          <Route path="/assistant" element={<LegalAssistant />} />
          <Route path="/court-simulation" element={<CourtSimulation />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/licensing" element={<Licensing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
