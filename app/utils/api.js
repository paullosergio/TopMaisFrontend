/**
 * Utilitário para obter a URL base da API
 * @returns {string} URL base da API
 */
export function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL
}

/**
 * Constrói a URL completa do endpoint da API
 * @param {string} endpoint - Endpoint da API (ex: '/api/partners/')
 * @returns {string} URL completa
 */
export function getApiEndpoint(endpoint) {
  const baseUrl = getApiUrl()
//   const baseUrl = 'http://localhost:8000'
  // Remove barra inicial do endpoint se existir, pois já será adicionada
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  // Garante que a baseUrl não termine com barra
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  return `${cleanBaseUrl}${cleanEndpoint}`
}
