import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Cortex App</h1>
          <p className="text-xl text-gray-600 mb-8">
            Plateforme de gestion intelligente et moderne
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard">Accéder au Dashboard</Link>
            </Button>
            <Button variant="outline" size="lg">
              En savoir plus
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Performance</CardTitle>
              <CardDescription>
                Optimisé pour la vitesse et l'efficacité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Construit avec Next.js 15, TypeScript et Tailwind CSS pour des
                performances optimales.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔧 Moderne</CardTitle>
              <CardDescription>Stack technologique de pointe</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Utilise les dernières technologies : App Router, Server
                Components, et plus encore.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⚡ Rapide</CardTitle>
              <CardDescription>
                Développement et déploiement accélérés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Configuration optimisée avec pnpm, Biome, et des outils de
                développement modernes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
