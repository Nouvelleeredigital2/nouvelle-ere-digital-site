import { AdvancedThemeSelector } from "@/components/ui/AdvancedThemeSelector";

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <AdvancedThemeSelector />
      </div>
    </div>
  );
}
