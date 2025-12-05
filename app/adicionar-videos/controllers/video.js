import { getApiEndpoint } from '../../utils/api'

export async function getVideos() {
  try {
    const response = await fetch(getApiEndpoint('/api/videos/'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true, data: Array.isArray(data) ? data : data.results || [] }
    }

    throw new Error(data.error || 'Erro ao buscar vídeos.')
  } catch (error) {
    console.error('❌ Erro ao buscar vídeos:', error)
    return { success: false, error: error.message, data: [] }
  }
}

export async function createVideo(videoData) {
  try {
    const formData = new FormData()
    formData.append('title', videoData.title)

    if (videoData.thumbnail) {
      formData.append('thumbnail', videoData.thumbnail)
    }

    if (videoData.file) {
      formData.append('file', videoData.file)
    }

    const response = await fetch(getApiEndpoint('/api/videos/'), {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (response.status === 201 || response.status === 200) {
      return { success: true, data }
    }

    // Erros de validação do serializer
    if (response.status === 400 && typeof data === 'object' && !data.error) {
      return { success: false, errors: data }
    }

    // Erros genéricos capturados no try/except
    if (data.error) {
      throw new Error(data.error)
    }

    throw new Error('Erro desconhecido ao criar vídeo.')
  } catch (error) {
    console.error('❌ Erro ao criar vídeo:', error)
    return { success: false, error: error.message }
  }
}
