'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import InputField from '../../cadastro/components/InputField'
import { createVideo } from '../controllers/video'

export default function VideoForm() {
  const initial = {
    title: '',
    thumbnail: null,
    file: null,
  }
  const thumbnailRef = useRef(null)
  const fileRef = useRef(null)

  const [formValues, setFormValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)

  const handleChange = ({ target: { name, value } }) => {
    setFormValues(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleFileChange = ({ target: { name, files } }) => {
    const file = files[0]
    if (name === 'thumbnail' && file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result)
      }
      reader.readAsDataURL(file)
      setFormValues(prev => ({ ...prev, [name]: file }))
    } else if (name === 'file') {
      setFormValues(prev => ({ ...prev, [name]: file }))
    }
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formValues.title || formValues.title.trim().length === 0) {
      newErrors.title = 'Título é obrigatório'
    }

    if (!formValues.file) {
      newErrors.file = 'Arquivo de vídeo é obrigatório'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) return

    setSubmitting(true)
    try {
      const data = await createVideo({
        title: formValues.title,
        thumbnail: formValues.thumbnail,
        file: formValues.file,
      })

      if (data.success) {
        setSuccessMessage('Vídeo adicionado com sucesso!')
        setShowModal(true)
        setFormValues(initial)
        setThumbnailPreview(null)
        thumbnailRef.current.value = ''
        fileRef.current.value = ''
      } else if (data.errors) {
        const mappedErrors = Object.entries(data.errors).reduce((acc, [key, val]) => {
          acc[key] = Array.isArray(val) ? val.join(', ') : val
          return acc
        }, {})
        setErrors(mappedErrors)
      } else if (data.error) {
        setErrors({ global: data.error })
      }
    } catch (error) {
      console.error('❌ Erro no envio:', error)
      setErrors({ global: error.message || 'Erro inesperado. Tente novamente.' })
    } finally {
      setSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-stone-600/20 max-w-2xl mx-auto"
      >
        <h2 className="text-xl font-bold mb-6 text-center text-amber-800">Adicionar Novo Vídeo</h2>

        <div className="space-y-4">
          <InputField
            label="Título do Vídeo"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="Digite o título do vídeo"
            required
          />

          <div>
            <label htmlFor="thumbnail" className="block text-slate-800 font-semibold mb-1">
              Thumbnail (opcional)
            </label>
            <div className="space-y-2">
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                ref={thumbnailRef}
                onChange={handleFileChange}
                className="w-full text-black rounded-lg border border-stone-600/30 px-4 py-2 outline-none focus:ring-2 focus:ring-orange-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-200 file:text-slate-800 hover:file:bg-orange-300"
              />
              {thumbnailPreview && (
                <div className="mt-2">
                  <Image
                    src={thumbnailPreview}
                    alt="Preview da thumbnail"
                    width={400}
                    height={300}
                    className="max-w-full h-auto max-h-48 rounded-lg border border-stone-600/30"
                  />
                </div>
              )}
            </div>
            {errors.thumbnail && <p className="mt-1 text-sm text-amber-800">{errors.thumbnail}</p>}
          </div>

          <div>
            <label htmlFor="file" className="block text-slate-800 font-semibold mb-1">
              Arquivo de Vídeo <span className="text-red-500">*</span>
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept="video/*"
              ref={fileRef}
              onChange={handleFileChange}
              className="w-full text-black rounded-lg border border-stone-600/30 px-4 py-2 outline-none focus:ring-2 focus:ring-orange-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-200 file:text-slate-800 hover:file:bg-orange-300"
              required
            />
            {formValues.file && (
              <p className="mt-1 text-sm text-slate-600">
                Arquivo selecionado: {formValues.file.name}
              </p>
            )}
            {errors.file && <p className="mt-1 text-sm text-amber-800">{errors.file}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="cursor-pointer bg-green-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? 'Enviando...' : 'Adicionar Vídeo'}
          </button>
        </div>

        {errors.global && (
          <p className="mt-4 text-red-700 text-center font-medium">{errors.global}</p>
        )}
      </form>

      {/* === MODAL DE SUCESSO === */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm">
            <h3 className="text-2xl font-semibold text-green-700 mb-3">🎉 Sucesso!</h3>
            <p className="text-gray-700 mb-6">
              {successMessage || 'Vídeo adicionado com sucesso!'}
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="cursor-pointer bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}
