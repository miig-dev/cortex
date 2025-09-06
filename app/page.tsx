import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Brain,
  Calendar,
  CheckCircle,
  Circle,
  Clock,
  Plus,
  Search,
  Star,
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
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Top Bar */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-300 text-sm">La méthode P.A.R.A / Igor_MigDev</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 text-sm">Dernière modification : 19 août</span>
              <button className="text-slate-400 hover:text-white transition-colors">
                <Star className="w-4 h-4" />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Header Section with Code Background */}
      <div className="relative bg-slate-800 h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700">
          <div className="absolute inset-0 opacity-20">
            <pre className="text-xs text-slate-400 p-4 font-mono">
{`previousElements.length = 0;
for (let i = 0; i < elements.length; i++) {
  const element = elements[i];
  if (element.classList.contains('active')) {
    previousElements.push(element);
  }
}`}
            </pre>
          </div>
        </div>
        <div className="absolute top-8 left-8">
          <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
            <Calendar className="w-8 h-8 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold text-white mb-8">Igor_MigDev</h1>

        {/* Calendrier Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Calendrier</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                Calendrier hebdomadaire
              </button>
              <button className="px-3 py-1 text-slate-400 text-sm rounded hover:bg-slate-800 transition-colors">
                Calendrier mensuel
              </button>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-300 font-medium">août 2025</span>
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 text-sm">Aucune date (1)</span>
                <div className="flex space-x-1">
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                </div>
                <button className="p-1 text-slate-400 hover:text-white">
                  <Search className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center">
                  Nouveau
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'].map((day) => (
                <div key={day} className="text-center text-slate-400 text-sm py-2">
                  {day}
                </div>
              ))}
              {[25, 26, 27, 28, 29, 30, 31].map((day) => (
                <div key={day} className={`text-center py-2 text-sm rounded ${
                  day === 28 ? 'bg-red-500 text-white' : 'text-slate-300 hover:bg-slate-700'
                }`}>
                  {day}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <button className="text-slate-400 text-sm hover:text-white transition-colors">
                Gérer dans le calendrier
              </button>
              <div className="flex items-center space-x-2">
                <button className="text-slate-400 hover:text-white">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <span className="text-slate-300 text-sm">Aujourd'hui</span>
                <button className="text-slate-400 hover:text-white">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Planificateur Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">PLANIFICATEUR</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition-colors">
                Pas de date
              </button>
              <button className="px-3 py-1 text-slate-400 text-sm rounded hover:bg-slate-800 transition-colors">
                Horaire quotidien
              </button>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm">+ Nouvelle page</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                </div>
                <button className="p-1 text-slate-400 hover:text-white">
                  <Search className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center">
                  Nouveau
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-2 hover:bg-slate-700 rounded">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <div className="flex-1 text-slate-300 text-sm">Tâche à accomplir</div>
                <div className="text-slate-400 text-sm">Freelance Work</div>
              </div>
            </div>
          </div>
        </section>

        {/* Projets Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">PROJETS</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition-colors">
                Active
              </button>
              <button className="px-3 py-1 text-slate-400 text-sm rounded hover:bg-slate-800 transition-colors">
                Archivé
              </button>
              <button className="px-3 py-1 text-slate-400 text-sm rounded hover:bg-slate-800 transition-colors">
                All Projets
              </button>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm">+ Nouvelle page</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                </div>
                <button className="p-1 text-slate-400 hover:text-white">
                  <Search className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center">
                  Nouveau
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Areas Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">AREAS</h2>
            <button className="px-3 py-1 text-slate-400 text-sm rounded hover:bg-slate-800 transition-colors">
              All Areas
            </button>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm">+ Nouvelle page</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                  <button className="p-1 text-slate-400 hover:text-white">
                    <div className="w-4 h-4 border border-slate-400 rounded"></div>
                  </button>
                </div>
                <button className="p-1 text-slate-400 hover:text-white">
                  <Search className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center">
                  Nouveau
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'Freelance Work',
                'Marketing', 
                'Web site',
                'Health & Wellness',
                'Admin',
                'Questionnaire avant le rendez-vous',
                'Personal Development',
                'Discussion pendant l\'entretien'
              ].map((area) => (
                <Link
                  key={area}
                  href="/inbox"
                  className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 text-sm transition-colors"
                >
                  {area}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Source Databases */}
        <section className="mb-12">
          <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
            <span className="text-sm">Source Databases</span>
          </button>
        </section>
      </div>
    </div>
  );
}
