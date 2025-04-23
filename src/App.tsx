
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Todos from "./pages/Todos";
import NotFound from "./pages/NotFound";
import { TimerButton } from "@/components/TimerButton";
import { TopNavigation } from "@/components/TopNavigation";
import { ScreenFlash } from "@/components/ScreenFlash";
import { MouseOrb } from "@/components/MouseOrb";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <TopNavigation />
        <div>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Fixed bottom left: Timer */}
          <div className="fixed bottom-8 left-8 z-50">
            <TimerButton />
          </div>
          <ScreenFlash />
          <MouseOrb />
        </div>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
