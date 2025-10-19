import { AdminNav } from '@/components/layout/AdminNav';
import { GlobalToolbar } from '@/components/admin/GlobalToolbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      
      {/* Barre d'outils globale */}
      <div className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="max-w-7xl mx-auto flex justify-end">
          <GlobalToolbar />
        </div>
      </div>
      
      {children}
    </div>
  );
}
