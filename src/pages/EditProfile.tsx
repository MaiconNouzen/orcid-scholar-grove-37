import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Researcher } from '../types';
import { mockResearcherData } from '../data/mockData';
import { toast } from '@/hooks/use-toast';

const EditProfile = () => {
  const [researcher, setResearcher] = useState<Researcher>(mockResearcherData as Researcher);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newArea, setNewArea] = useState('');
  const [newLink, setNewLink] = useState({ name: '', url: '' });

  // useEffect para carregar dados do perfil via API do ORCID
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        /* TODO: Substituir por busca real na API do ORCID
         * 1. Fazer fetch para: https://pub.orcid.org/v3.0/{orcid-id}/record
         * 2. Headers: Authorization: Bearer {access-token}, Accept: application/json
         * 3. Mapear dados para interface Researcher
         * 
         * Exemplo:
         * const orcidId = getCurrentUserOrcidId(); // Pegar do contexto de auth
         * const accessToken = getAccessToken(); // Token de acesso do usuário
         * 
         * const response = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/record`, {
         *   headers: {
         *     'Authorization': `Bearer ${accessToken}`,
         *     'Accept': 'application/json'
         *   }
         * });
         * const data = await response.json();
         * setResearcher(mapOrcidToResearcher(data));
         */
        
        // Simulação com dados mockados
        console.log('Carregando dados do perfil para edição...');
        setTimeout(() => {
          setResearcher(mockResearcherData as Researcher);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do perfil.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      /* TODO: Implementar salvamento via API do ORCID
       * 1. Mapear dados da interface Researcher para formato ORCID
       * 2. Fazer PUT request para: https://api.orcid.org/v3.0/{orcid-id}/record
       * 3. Headers: Authorization: Bearer {access-token}, Content-Type: application/json
       * 4. Diferentes endpoints para diferentes seções:
       *    - /person para dados pessoais
       *    - /biography para biografia
       *    - /researcher-urls para links externos
       *    - /keywords para áreas de pesquisa
       * 
       * Exemplo:
       * const updates = mapResearcherToOrcidFormat(researcher);
       * 
       * // Atualizar biografia
       * await fetch(`https://api.orcid.org/v3.0/${orcidId}/biography`, {
       *   method: 'PUT',
       *   headers: {
       *     'Authorization': `Bearer ${accessToken}`,
       *     'Content-Type': 'application/json'
       *   },
       *   body: JSON.stringify(updates.biography)
       * });
       * 
       * // Atualizar URLs do pesquisador
       * await fetch(`https://api.orcid.org/v3.0/${orcidId}/researcher-urls`, {
       *   method: 'PUT',
       *   headers: {
       *     'Authorization': `Bearer ${accessToken}`,
       *     'Content-Type': 'application/json'
       *   },
       *   body: JSON.stringify(updates.researcherUrls)
       * });
       */
      
      // Simulação de salvamento
      console.log('Salvando alterações do perfil...', researcher);
      setTimeout(() => {
        toast({
          title: "Perfil salvo",
          description: "As alterações foram salvas com sucesso.",
        });
        setSaving(false);
      }, 1000);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
      setSaving(false);
    }
  };

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResearcher((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addResearchArea = () => {
    if (!newArea.trim()) return;
    setResearcher((prev) => ({
      ...prev,
      researchAreas: [...prev.researchAreas, newArea]
    }));
    setNewArea('');
  };

  const removeResearchArea = (index: number) => {
    setResearcher((prev) => ({
      ...prev,
      researchAreas: prev.researchAreas.filter((_, i) => i !== index)
    }));
  };

  const addExternalLink = () => {
    if (!newLink.name.trim() || !newLink.url.trim()) return;
    setResearcher((prev) => ({
      ...prev,
      externalLinks: [...prev.externalLinks, { ...newLink }]
    }));
    setNewLink({ name: '', url: '' });
  };

  const removeExternalLink = (index: number) => {
    setResearcher((prev) => ({
      ...prev,
      externalLinks: prev.externalLinks.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Carregando dados do perfil...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Editar Perfil</h1>
      
      <form onSubmit={handleSave}>
        <Card className="p-6 mb-6 bg-white border-blue-100">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Informações Básicas</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <Input
                name="name"
                value={researcher.name}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ORCID ID</label>
              <Input
                name="orcidId"
                value={researcher.orcidId}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
              <Input
                name="institution"
                value={researcher.institution}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
              <Input
                name="department"
                value={researcher.department || ''}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cargo / Função</label>
              <Input
                name="role"
                value={researcher.role || ''}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                name="email"
                type="email"
                value={researcher.email || ''}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
              <Textarea
                name="bio"
                value={researcher.bio}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
                rows={4}
              />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 mb-6 bg-white border-blue-100">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Áreas de Pesquisa</h2>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {researcher.researchAreas.map((area, index) => (
                <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                  <span>{area}</span>
                  <button 
                    type="button" 
                    onClick={() => removeResearchArea(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                placeholder="Adicionar área de pesquisa"
                className="border-blue-200"
              />
              <Button 
                type="button" 
                onClick={addResearchArea}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 mb-6 bg-white border-blue-100">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Links Externos</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Página Institucional</label>
              <Input
                name="institutionalPage"
                value={researcher.institutionalPage}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div className="space-y-2">
              {researcher.externalLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={link.name} disabled className="flex-1 border-blue-200 bg-gray-50" />
                  <Input value={link.url} disabled className="flex-1 border-blue-200 bg-gray-50" />
                  <Button 
                    type="button" 
                    variant="destructive"
                    onClick={() => removeExternalLink(index)}
                    size="icon"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={newLink.name}
                onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                placeholder="Nome do link"
                className="border-blue-200"
              />
              <Input
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                placeholder="URL"
                className="border-blue-200"
              />
              <Button 
                type="button" 
                onClick={addExternalLink}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
