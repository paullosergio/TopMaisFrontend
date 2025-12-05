import { getApiEndpoint } from '../../utils/api'

export async function createPartner(partnerData) {
  try {
    const response = await fetch(getApiEndpoint('/api/partners/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partnerData),
    })

    const data = await response.json()

    if (response.status === 201) {
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

    throw new Error('Erro desconhecido ao criar parceiro.')
  } catch (error) {
    console.error('❌ Erro ao criar parceiro:', error)
    return { success: false, error: error.message }
  }
}
