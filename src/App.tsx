
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Import pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import SolicitarServico from "./pages/SolicitarServico";
import PerfilPrestador from "./pages/PerfilPrestador";
import NotFound from "./pages/NotFound";
import ComoFunciona from "./pages/ComoFunciona";
import Categorias from "./pages/Categorias";
import PrestadoresPorCategoria from "./pages/PrestadoresPorCategoria";
import Sobre from "./pages/Sobre";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/prestadores/:categoria" element={<PrestadoresPorCategoria />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Sobre />} /> {/* Temporarily pointing to Sobre until we create the Contact page */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/solicitar-servico" element={
              <ProtectedRoute>
                <SolicitarServico />
              </ProtectedRoute>
            } />
            <Route path="/prestador/:id" element={<PerfilPrestador />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
