import Link from 'next/link'
import VideoForm from './components/VideoForm'

export default function AdicionarVideosPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-600 via-slate-800 to-stone-600 p-8">
      <header className="w-full px-6 py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center text-slate-800 font-bold text-xl">
              T
            </div>
            <span className="font-bold text-xl">Top Mais Top</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-orange-200 transition-colors">
              Início
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-3xl w-full mt-10">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Adicionar Vídeo</h1>
        <VideoForm />
      </section>
    </main>
  )
}

