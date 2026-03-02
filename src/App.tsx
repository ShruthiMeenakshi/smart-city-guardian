import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { RoleProvider, useRole } from "@/contexts/RoleContext";
import { AppSidebar } from "@/components/AppSidebar";
import { FloatingChatWidget } from "@/components/FloatingChatWidget";
import Login from "./pages/Login";
import Index from "./pages/Index";
import ReportsPage from "./pages/Reports";
import MapPage from "./pages/MapRoute";
import GovernancePage from "./pages/Governance";
import CircularPage from "./pages/Circular";
import ChatbotPage from "./pages/Chatbot";
import InspectorPage from "./pages/Inspector";
import IntelligencePage from "./pages/Intelligence";
import PublicDashboard from "./pages/PublicDashboard";
import NotFound from "./pages/NotFound";
import RevenueCalculator from "./pages/RevenueCalculator";
import WardRewards from "./pages/WardRewards";

const queryClient = new QueryClient();

function AuthenticatedLayout() {
  return (
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
          <Route path="/public" element={<PublicDashboard />} />
          <Route path="/revenue-calculator" element={<RevenueCalculator />} />
          <Route path="/rewards" element={<WardRewards />} />
          <Route path="/ward-rewards" element={<Navigate to="/rewards" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <FloatingChatWidget />
    </div>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useRole();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/*" element={isAuthenticated ? <AuthenticatedLayout /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <RoleProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
    </RoleProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
