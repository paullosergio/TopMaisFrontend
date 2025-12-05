import { Play } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function VideoCard({ video }) {
  const [imageError, setImageError] = useState(false)

  // Obtém a URL da thumbnail - pode ser uma string ou um objeto com url
  const rawThumbnail = video.thumbnail || video.thumbnail_url || null
  let thumbnailUrl = null

  if (rawThumbnail) {
    if (typeof rawThumbnail === 'string') {
      thumbnailUrl = rawThumbnail
    } else if (rawThumbnail?.url) {
      thumbnailUrl = rawThumbnail.url
    }
  }

  // Se a thumbnail for uma URL relativa, constrói a URL completa
  if (thumbnailUrl && !thumbnailUrl.startsWith('http') && !thumbnailUrl.startsWith('/')) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    thumbnailUrl = `${apiUrl}${thumbnailUrl.startsWith('/') ? '' : '/'}${thumbnailUrl}`
  } else if (thumbnailUrl?.startsWith('/') && !thumbnailUrl.startsWith('http')) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    thumbnailUrl = `${apiUrl}${thumbnailUrl}`
  }

  const videoUrl = video.file || video.video_url || video.url || ''

  const handlePlay = () => {
    if (videoUrl) {
      // Se for URL absoluta, abre em nova aba, senão tenta abrir o arquivo
      if (videoUrl.startsWith('http')) {
        window.open(videoUrl, '_blank')
      } else {
        // Se for URL relativa, constrói a URL completa
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        window.open(`${apiUrl}${videoUrl.startsWith('/') ? '' : '/'}${videoUrl}`, '_blank')
      }
    }
  }

  const hasThumbnail =
    thumbnailUrl && !imageError && thumbnailUrl.trim() !== '' && thumbnailUrl !== '/icon.png'

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-stone-600/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Thumbnail */}
      <button
        type="button"
        className="relative w-full aspect-video bg-gradient-to-br from-teal-600 via-slate-800 to-stone-600 overflow-hidden group cursor-pointer border-0 p-0"
        onClick={handlePlay}
        aria-label={`Reproduzir vídeo: ${video.title || 'Vídeo'}`}
      >
        {hasThumbnail ? (
          <Image
            src={thumbnailUrl}
            alt={video.title || 'Thumbnail do vídeo'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized={thumbnailUrl.startsWith('http')}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
          </div>
        )}
        {/* Overlay com botão de play */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
            <Play className="w-8 h-8 text-teal-600 ml-1" fill="currentColor" />
          </div>
        </div>
      </button>

      {/* Conteúdo */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">{video.title}</h3>
        {video.created_at && (
          <p className="text-sm text-slate-500">
            {new Date(video.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}
      </div>
    </div>
  )
}
