
import React, { useState, useEffect, useCallback } from 'react';
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
import NewPublicationPage from "./pages/NewPublicationPage";
import NewProjectPage from "./pages/NewProjectPage";
import { mockResearcherData, mockResearchers } from "./data/mockData";
import { Researcher } from "./types";

const queryClient = new QueryClient();

const App = () => {
  // Estados centrais - dados dos pesquisadores ficam aqui no App
  const [currentResearcher, setCurrentResearcher] = useState<Researcher>(mockResearcherData as Researcher);
  const [allResearchers, setAllResearchers] = useState<Researcher[]>(mockResearchers);
  const [loading, setLoading] = useState(false);

  // useEffect para carregar dados do pesquisador atual via API do ORCID
  useEffect(() => {
    const fetchCurrentResearcherData = async () => {
      setLoading(true);
      try {
        /* TODO: Substituir dados mockados pela busca na API do ORCID
         * 1. Fazer fetch para: https://pub.orcid.org/v3.0/{orcid-id}/record
         * 2. Headers necessários: Accept: application/json
         * 3. Parsear resposta e mapear para interface Researcher
         * 4. Para publicações: https://pub.orcid.org/v3.0/{orcid-id}/works
         * 5. Para cada work, fazer fetch detalhado: https://pub.orcid.org/v3.0/{orcid-id}/work/{put-code}
         * 
         * Exemplo de implementação:
         * const orcidId = 'current-user-orcid-id'; // Pegar do contexto de autenticação
         * const response = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/record`, {
         *   headers: { 'Accept': 'application/json' }
         * });
         * const data = await response.json();
         * 
         * // Mapear dados da API para interface Researcher
         * const researcher = mapOrcidToResearcher(data);
         * setCurrentResearcher(researcher);
         */
        
        // Por enquanto, usando dados mockados
        console.log('Carregando dados do pesquisador atual...');
        setTimeout(() => {
          setCurrentResearcher(mockResearcherData as Researcher);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar dados do pesquisador:', error);
        setLoading(false);
      }
    };

    fetchCurrentResearcherData();
  }, []);

  // useEffect para carregar lista de pesquisadores via busca na API do ORCID
  useEffect(() => {
    const fetchAllResearchers = async () => {
      try {
        /* TODO: Implementar busca de pesquisadores na API do ORCID
         * 1. Usar endpoint de busca: https://pub.orcid.org/v3.0/search/?q=*
         * 2. Ou buscar por instituição específica: ?q=affiliation-org-name:"University Name"
         * 3. Para cada resultado, fazer fetch do perfil completo
         * 4. Cachear resultados para melhor performance
         * 
         * Exemplo:
         * const searchQuery = 'affiliation-org-name:"USP" OR affiliation-org-name:"UNICAMP"';
         * const response = await fetch(`https://pub.orcid.org/v3.0/search/?q=${encodeURIComponent(searchQuery)}`);
         * const searchResults = await response.json();
         * 
         * const researchers = await Promise.all(
         *   searchResults.result.map(async (result) => {
         *     const profileResponse = await fetch(`https://pub.orcid.org/v3.0/${result['orcid-identifier'].path}/record`);
         *     return mapOrcidToResearcher(await profileResponse.json());
         *   })
         * );
         * setAllResearchers(researchers);
         */
        
        // Por enquanto, usando dados mockados
        console.log('Carregando lista de pesquisadores...');
        setAllResearchers(mockResearchers);
      } catch (error) {
        console.error('Erro ao carregar lista de pesquisadores:', error);
      }
    };

    fetchAllResearchers();
  }, []);

  // Função para buscar dados de um pesquisador específico
  const getResearcherById = useCallback((id: string): Researcher | null => {
    if (id === 'current') {
      return currentResearcher;
    }
    return allResearchers.find(r => r.orcidId === id) || null;
  }, [currentResearcher, allResearchers]);

  // Função para simular carregamento de dados com busca na API do ORCID
  const loadResearcherData = useCallback((id: string, callback: (researcher: Researcher | null) => void) => {
    setLoading(true);
    
    const fetchResearcherFromOrcid = async () => {
      try {
        /* TODO: Substituir por busca real na API do ORCID
         * 1. Fazer fetch para: https://pub.orcid.org/v3.0/${id}/record
         * 2. Fazer fetch das publicações: https://pub.orcid.org/v3.0/${id}/works
         * 3. Fazer fetch dos detalhes de cada publicação
         * 4. Mapear dados para interface Researcher
         * 
         * const response = await fetch(`https://pub.orcid.org/v3.0/${id}/record`);
         * const data = await response.json();
         * const researcher = mapOrcidToResearcher(data);
         * callback(researcher);
         */
        
        // Simulação com dados mockados
        setTimeout(() => {
          const researcher = getResearcherById(id);
          callback(researcher);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Erro ao carregar pesquisador:', error);
        callback(null);
        setLoading(false);
      }
    };

    fetchResearcherFromOrcid();
  }, [getResearcherById]);

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
              <Route path="/new-publication" element={<NewPublicationPage />} />
              <Route path="/new-project" element={<NewProjectPage />} />
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
