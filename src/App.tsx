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
import PrestadoresPorCategoria from "./pages/PrestadoresPorCategoria";
import Sobre from "./pages/Sobre";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermosDeUso from "./pages/TermosDeUso";
import SearchResults from "./pages/SearchResults";
import LimpezaService from "./pages/services/LimpezaService";
import EletricaService from "./pages/services/EletricaService";
import PinturaService from "./pages/services/PinturaService";
import HidraulicaService from "./pages/services/HidraulicaService";
import JardinagemService from "./pages/services/JardinagemService";
import MontagemMoveisService from "./pages/services/MontagemMoveisService";

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
            <Route path="/prestadores/:categoria" element={<PrestadoresPorCategoria />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Sobre />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/busca" element={<SearchResults />} />
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
            <Route path="/privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos" element={<TermosDeUso />} />
            <Route path="/servicos/limpeza" element={<LimpezaService />} />
            <Route path="/servicos/eletrica" element={<EletricaService />} />
            <Route path="/servicos/pintura" element={<PinturaService />} />
            <Route path="/servicos/hidraulica" element={<HidraulicaService />} />
            <Route path="/servicos/jardinagem" element={<JardinagemService />} />
            <Route path="/servicos/montagem-moveis" element={<MontagemMoveisService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
