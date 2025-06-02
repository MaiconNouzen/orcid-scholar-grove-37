
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Publications from "./pages/Publications";
import Projects from "./pages/Projects";
import EditProfile from "./pages/EditProfile";
import Navigation from "./components/Navigation";
import ResearcherProfilePage from "./pages/ResearcherProfilePage";
import EditPublicationPage from "./pages/EditPublicationPage";
import EditProjectPage from "./pages/EditProjectPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { mockResearcherData, mockResearchers } from "./data/mockData";
import { Researcher } from "./types";

const queryClient = new QueryClient();

const App = () => {
  // Estado central - dados dos pesquisadores ficam aqui no App
  const [currentResearcher, setCurrentResearcher] = useState<Researcher>(mockResearcherData as Researcher);
  const [allResearchers, setAllResearchers] = useState<Researcher[]>(mockResearchers);
  const [loading, setLoading] = useState(false);

  // Função para buscar dados de um pesquisador específico
  const getResearcherById = (id: string): Researcher | null => {
    if (id === 'current') {
      return currentResearcher;
    }
    return allResearchers.find(r => r.orcidId === id) || null;
  };

  // Função para simular carregamento de dados
  const loadResearcherData = (id: string, callback: (researcher: Researcher | null) => void) => {
    setLoading(true);
    // Simula uma chamada de API com delay
    setTimeout(() => {
      const researcher = getResearcherById(id);
      callback(researcher);
      setLoading(false);
    }, 500);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Passa os dados centralizados como props para cada página */}
              <Route 
                path="/profile" 
                element={
                  <Index 
                    researcher={currentResearcher}
                    loading={loading}
                  />
                } 
              />
              <Route 
                path="/search" 
                element={
                  <Search 
                    researchers={allResearchers}
                    loading={loading}
                  />
                } 
              />
              <Route 
                path="/publications" 
                element={
                  <Publications 
                    publications={currentResearcher.publications}
                    loading={loading}
                  />
                } 
              />
              <Route 
                path="/projects" 
                element={
                  <Projects 
                    projects={currentResearcher.projects}
                    publications={currentResearcher.publications}
                    loading={loading}
                  />
                } 
              />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route 
                path="/researcher/:id" 
                element={
                  <ResearcherProfilePage 
                    getResearcherById={getResearcherById}
                    loadResearcherData={loadResearcherData}
                    loading={loading}
                  />
                } 
              />
              <Route path="/edit-publication/:id" element={<EditPublicationPage />} />
              <Route path="/edit-project/:id" element={<EditProjectPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
