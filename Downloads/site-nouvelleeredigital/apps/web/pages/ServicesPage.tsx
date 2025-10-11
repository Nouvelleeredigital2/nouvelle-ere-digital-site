'use client';

// Exemple d'intégration des nouveaux composants dans une page de services
import React, { useState } from 'react';
import {
  SectionHeader,
  ServiceList,
  ServiceDetailSheet,
  Toast,
  SearchBox,
  NeedCaptureForm,
  OrbitBreadcrumbs,
  ThemeSwitch,
  SkipLink
} from '@/components/ui';

const ServicesPage = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const services = [
    { id: '1', title: 'Service 1', description: 'Description 1', status: 'active' as const, features: ['Feature 1', 'Feature 2'] },
    { id: '2', title: 'Service 2', description: 'Description 2', status: 'inactive' as const, features: ['Feature 3'] },
  ];

  const handleServiceSelect = (id: string) => {
    setSelectedServiceId(id);
    setIsSheetOpen(true);
  };

  const handleServiceAdd = (id: string) => {
    setToastMessage(`Service ${id} ajouté !`);
  };

  return (
    <>
      <SkipLink href="#main-content" label="Aller au contenu principal" />
      <OrbitBreadcrumbs
        items={[
          { id: 'home', label: 'Accueil', href: '/', level: 1 },
          { id: 'services', label: 'Services', level: 2 },
        ]}
        currentId="services"
      />
      <ThemeSwitch
        themes={[
          { id: 'light', label: 'Clair' },
          { id: 'dark', label: 'Sombre' },
        ]}
        currentTheme="light"
        variant="toggle"
      />
      <div id="main-content">
        <SectionHeader
          title="Nos Services"
          subtitle="Découvrez nos offres"
          actions={[
            { id: 'add', label: 'Ajouter un service' },
            { id: 'filter', label: 'Filtrer' },
          ]}
          variant="default"
          onSelect={(id) => console.log(`Action: ${id}`)}
        />
        <SearchBox
          placeholder="Rechercher un service..."
          suggestions={[
            { id: '1', label: 'Service 1' },
            { id: '2', label: 'Service 2' },
          ]}
          onSearch={(query) => console.log(`Recherche: ${query}`)}
          onSelect={(id) => handleServiceSelect(id)}
        />
        <ServiceList
          services={services}
          selectedIds={selectedServiceId ? [selectedServiceId] : []}
          variant="card"
          onSelect={handleServiceSelect}
          onAdd={handleServiceAdd}
        />
        <ServiceDetailSheet
          service={services.find(s => s.id === selectedServiceId) || services[0]}
          isOpen={isSheetOpen && selectedServiceId !== null && services.some(s => s.id === selectedServiceId)}
          onClose={() => setIsSheetOpen(false)}
          onSelect={(id) => handleServiceSelect(id)}
        />
        {toastMessage && (
          <Toast
            message={toastMessage}
            type="success"
            duration={3000}
            onDismiss={() => setToastMessage(null)}
          />
        )}
      </div>
    </>
  );
};

export default ServicesPage;
