import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import ReportsPage from "./pages/Reports";
import MapPage from "./pages/MapRoute";
import GovernancePage from "./pages/Governance";
import CircularPage from "./pages/Circular";
import ChatbotPage from "./pages/Chatbot";
import InspectorPage from "./pages/Inspector";
import IntelligencePage from "./pages/Intelligence";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/inspector" element={<InspectorPage />} />
              <Route path="/intelligence" element={<IntelligencePage />} />
              <Route path="/governance" element={<GovernancePage />} />
              <Route path="/circular" element={<CircularPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
