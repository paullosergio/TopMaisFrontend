'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getVideos } from '../adicionar-videos/controllers/video'
import VideoCard from './components/VideoCard'

export default function VideosPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await getVideos()
        if (result.success) {
          setVideos(result.data)
        } else {
          setError(result.error || 'Erro ao carregar vídeos')
        }
      } catch (err) {
        setError('Erro inesperado ao carregar vídeos')
        console.error('Erro:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-600 via-slate-800 to-stone-600">
      {/* Header */}
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

      {/* Conteúdo Principal */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Nossos Vídeos</h1>
          <p className="text-white/80 text-lg">Confira nossa coleção de vídeos</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <p className="text-white/80">Carregando vídeos...</p>
            </div>
          </div>
        )}

        {/* Erro */}
        {error && !loading && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6 text-center">
            <p className="text-white font-semibold">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Grid de Vídeos */}
        {!loading &&
          !error &&
          (videos.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/20">
              <div className="text-6xl mb-4">📹</div>
              <h2 className="text-2xl font-bold text-white mb-2">Nenhum vídeo encontrado</h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map(video => (
                <VideoCard key={video.id || video.title} video={video} />
              ))}
            </div>
          ))}
      </section>
    </main>
  )
}
