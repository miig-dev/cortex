import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle,
  Circle,
  Clock,
  Target,
  Zap,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cortex Project - Votre centre de commande mental',
  description:
    'Organisez vos pensées, gérez vos tâches et atteignez vos objectifs avec le Cortex Project.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Cortex Project</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/inbox"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Inbox
              </Link>
              <Link
                href="/quartier-general"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Quartier Général
              </Link>
              <Link
                href="/focus"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Dashboard Focus
              </Link>
              <Link
                href="/statistiques"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Statistiques
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Votre{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              centre de commande
            </span>{' '}
            mental
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Organisez vos pensées, gérez vos tâches et atteignez vos objectifs
            avec un système de productivité intelligent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inbox"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/focus"
              className="inline-flex items-center px-8 py-4 border border-slate-600 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-200"
            >
              Mode Focus
              <Clock className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Vos outils de productivité
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Inbox */}
            <Link href="/inbox" className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-200 hover:transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  L'Inbox
                </h4>
                <p className="text-slate-400 text-sm">
                  Capturez vos idées instantanément avec auto-tagging
                  intelligent
                </p>
              </div>
            </Link>

            {/* Quartier Général */}
            <Link href="/quartier-general" className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-200 hover:transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Quartier Général
                </h4>
                <p className="text-slate-400 text-sm">
                  Matrice Eisenhower avec drag & drop pour organiser vos tâches
                </p>
              </div>
            </Link>

            {/* Dashboard Focus */}
            <Link href="/focus" className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-200 hover:transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Dashboard Focus
                </h4>
                <p className="text-slate-400 text-sm">
                  Mode Zen avec Pomodoro et gestion des distractions
                </p>
              </div>
            </Link>

            {/* Statistiques */}
            <Link href="/statistiques" className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-200 hover:transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Statistiques
                </h4>
                <p className="text-slate-400 text-sm">
                  Gamification avec badges, niveaux et métriques de productivité
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Votre progression
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">12</h4>
              <p className="text-slate-400">Tâches terminées</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Circle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">5</h4>
              <p className="text-slate-400">En cours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">3</h4>
              <p className="text-slate-400">Urgentes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Prêt à transformer votre productivité ?
          </h3>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui ont déjà révolutionné leur
            façon de travailler.
          </p>
          <Link
            href="/inbox"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
          >
            Commencer gratuitement
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">Cortex Project</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2024 Cortex Project. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
