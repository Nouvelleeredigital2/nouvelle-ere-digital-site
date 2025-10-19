'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { LoadingButton, SkeletonTable } from '@/components/ui/LoadingStates';
import { toast } from 'sonner';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Archive,
  Settings as SettingsIcon,
  Check,
  X
} from 'lucide-react';

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  features: string[];
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface ServiceFormData {
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  order: number;
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    description: '',
    icon: '',
    image: '',
    features: [],
    status: 'ACTIVE',
    order: 0,
  });
  const [featureInput, setFeatureInput] = useState('');
  const [saving, setSaving] = useState(false);

  // Charger les services
  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('Erreur lors du chargement');

      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Erreur chargement services:', error);
      toast.error('Erreur lors du chargement des services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  // Ouvrir le modal pour créer/éditer
  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon || '',
        image: service.image || '',
        features: service.features || [],
        status: service.status,
        order: service.order,
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        icon: '',
        image: '',
        features: [],
        status: 'ACTIVE',
        order: services.length,
      });
    }
    setShowModal(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      icon: '',
      image: '',
      features: [],
      status: 'ACTIVE',
      order: 0,
    });
    setFeatureInput('');
  };

  // Sauvegarder le service
  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setSaving(true);
    try {
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
      const method = editingService ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la sauvegarde');
      }

      toast.success(editingService ? 'Service mis à jour' : 'Service créé');
      closeModal();
      loadServices();
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      toast.error((error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  // Supprimer un service
  const handleDelete = async (service: Service) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le service "${service.title}" ?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/services/${service.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression');
      }

      toast.success('Service supprimé');
      loadServices();
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast.error((error as Error).message);
    }
  };

  // Ajouter une fonctionnalité
  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  // Supprimer une fonctionnalité
  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Changer le statut
  const toggleStatus = async (service: Service) => {
    const newStatus = service.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    
    try {
      const response = await fetch(`/api/services/${service.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors du changement de statut');
      }

      toast.success(`Service ${newStatus === 'ACTIVE' ? 'activé' : 'désactivé'}`);
      loadServices();
    } catch (error) {
      console.error('Erreur changement statut:', error);
      toast.error('Erreur lors du changement de statut');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'INACTIVE':
        return <X className="w-4 h-4 text-red-600" />;
      case 'ARCHIVED':
        return <Archive className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-red-100 text-red-800';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SettingsIcon className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Gestion des services</h1>
            </div>
            <Button
              onClick={() => openModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau service
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Liste des services</h2>
          </div>
          
          {loading ? (
            <div className="p-6">
              <SkeletonTable rows={5} columns={6} />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <SettingsIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Aucun service trouvé</p>
              <p className="text-gray-400 mt-2">
                Commencez par créer votre premier service
              </p>
              <Button
                onClick={() => openModal()}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer un service
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fonctionnalités
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ordre
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {service.icon && (
                            <span className="text-2xl mr-3">{service.icon}</span>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {service.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              /{service.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {service.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {service.features.length} fonctionnalité{service.features.length > 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                          {getStatusIcon(service.status)}
                          <span className="ml-1 capitalize">{service.status.toLowerCase()}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {service.order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStatus(service)}
                            title={service.status === 'ACTIVE' ? 'Désactiver' : 'Activer'}
                          >
                            {service.status === 'ACTIVE' ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openModal(service)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(service)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de création/édition */}
      <Modal isOpen={showModal} onClose={closeModal} size="lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            {editingService ? 'Modifier le service' : 'Nouveau service'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Nom du service"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description du service"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icône
                </label>
                <Input
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="🔧"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image (URL)
                </label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fonctionnalités
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Ajouter une fonctionnalité"
                    onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                  />
                  <Button onClick={addFeature} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {feature}
                      <button
                        onClick={() => removeFeature(index)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">Actif</option>
                  <option value="INACTIVE">Inactif</option>
                  <option value="ARCHIVED">Archivé</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordre
                </label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={closeModal}>
              Annuler
            </Button>
            <LoadingButton
              loading={saving}
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingService ? 'Mettre à jour' : 'Créer'}
            </LoadingButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}