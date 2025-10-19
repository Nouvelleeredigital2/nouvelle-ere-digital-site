import Link from "next/link";

export function AccueilPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16">
        <div className="text-center py-20">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Nouvelle Ère Digital
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Bienvenue sur notre site
          </p>
          <Link
            href="/admin/studio"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Aller au Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
