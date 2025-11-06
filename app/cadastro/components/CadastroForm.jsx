'use client'
import { useState } from 'react'
import { createPartner } from '../controllers/partner'
import {
  detectPixFromValue,
  isValidCPFChecksum,
  isValidEmail,
  toIsoDate,
  validateBirthDate,
} from '../utils/validation'
import InputField from './InputField'
import MaskedInputField from './MaskedInputField'

export default function CadastroForm() {
  const initial = {
    name: '',
    email: '',
    phone: '',
    password: '',
    cpf: '',
    rg: '',
    birthDate: '',
    zipCode: '',
    city: '',
    number: '',
    street: '',
    neighborhood: '',
    uf: '',
    pix: '',
    pixType: '',
  }

  const [formValues, setFormValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [showModal, setShowModal] = useState(false)

  const totalSteps = 3

  const stepFields = {
    1: ['name', 'phone', 'cpf', 'birthDate', 'email', 'pix'],
    2: ['zipCode', 'number'],
    3: ['password'],
  }

  const handleChange = ({ target: { name, value } }) => {
    let normalized = value
    if (['phone', 'cpf', 'zipCode', 'number'].includes(name)) normalized = value.replace(/\D/g, '')

    setFormValues(prev => ({ ...prev, [name]: normalized }))
    setErrors(prev => ({ ...prev, [name]: '' }))

    const validations = {
      email: v => (v && !isValidEmail(v) ? 'E-mail inválido' : ''),
      cpf: v => (v && !isValidCPFChecksum(v) ? 'CPF inválido' : ''),
      password: v => (v && v.length < 6 ? 'Senha muito curta' : ''),
      phone: v => (v && v.length < 11 ? 'Telefone incompleto' : ''),
      zipCode: v => (v && v.length !== 8 ? 'CEP inválido' : ''),
      birthDate: v => validateBirthDate(v),
      name: v => (v && v.trim().length < 3 ? 'Nome muito curto' : ''),
      number: v => (!v ? 'Número obrigatório' : ''),
      pix: v => (!v ? 'Chave PIX obrigatória' : ''),
    }

    const error = validations[name]?.(normalized) || ''
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }))
    } else {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev
        return rest
      })
    }

    if (name === 'zipCode') handleZipCode(normalized)
    if (name === 'pix') handlePix(normalized)
  }

  const handleZipCode = async zip => {
    if (zip.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${zip}/json/`)
        const data = await res.json()
        if (!data.erro) {
          setFormValues(prev => ({
            ...prev,
            street: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade || '',
            uf: data.uf || '',
          }))
          setErrors(prev => ({ ...prev, zipCode: '' }))
        }
      } catch (_e) {}
    }
  }

  const handlePix = value => {
    const detected = detectPixFromValue(value)
    setFormValues(prev => ({ ...prev, pixType: detected.type }))
  }

  const validateStep = stepNumber => {
    const requiredFields = stepFields[stepNumber]
    const newErrors = {}

    for (const field of requiredFields) {
      const value = formValues[field]
      if (!value) newErrors[field] = 'Campo obrigatório'
      else {
        const validations = {
          email: v => !isValidEmail(v) && 'E-mail inválido',
          cpf: v => !isValidCPFChecksum(v) && 'CPF inválido',
          password: v => v.length < 6 && 'Senha muito curta',
          phone: v => v.length < 11 && 'Telefone incompleto',
          zipCode: v => v.length !== 8 && 'CEP inválido',
          birthDate: v => validateBirthDate(v),
          name: v => v.trim().length < 3 && 'Nome muito curto',
        }
        const error = validations[field]?.(value)
        if (error) newErrors[field] = error
      }
    }

    setErrors(prev => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) setStep(s => Math.min(totalSteps, s + 1))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateStep(3)) return

    setSubmitting(true)
    try {
      const payload = { ...formValues, birthDate: toIsoDate(formValues.birthDate) }
        const data = await createPartner(payload)

      if (data.success) {
        setSuccessMessage('Cadastro realizado com sucesso!')
        setShowModal(true)
        setFormValues(initial)
        setStep(1)
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

  const isStepValid = step => {
    const requiredFields = stepFields[step]
    return requiredFields.every(f => formValues[f] && !errors[f])
  }

  const closeModal = () => {
    setShowModal(false)
    window.location.href = '/' // redireciona para a página raiz
  }

  return (
    <>
      <form
        onSubmit={e => e.preventDefault()}
        className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-stone-600/20 max-w-2xl mx-auto"
      >
        <h2 className="text-xl font-bold mb-6 text-center text-amber-800">
          Etapa {step} de {totalSteps}
        </h2>

        {/* === ETAPA 1 === */}
        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Nome completo"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              error={errors.name}
            />
            <MaskedInputField
              label="Telefone"
              name="phone"
              mask="(00) 00000-0000"
              value={formValues.phone}
              onAccept={v => handleChange({ target: { name: 'phone', value: v } })}
              error={errors.phone}
            />
            <MaskedInputField
              label="CPF"
              name="cpf"
              mask="000.000.000-00"
              value={formValues.cpf}
              onAccept={v => handleChange({ target: { name: 'cpf', value: v } })}
              error={errors.cpf}
            />
            <InputField
              label="RG"
              name="rg"
              value={formValues.rg}
              onChange={handleChange}
              error={errors.rg}
            />
            <MaskedInputField
              label="Data de nascimento"
              name="birthDate"
              mask="00/00/0000"
              unmask={false}
              value={formValues.birthDate}
              onAccept={v => handleChange({ target: { name: 'birthDate', value: v } })}
              error={errors.birthDate}
            />
            <InputField
              label="E-mail"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              error={errors.email}
            />

            <InputField
              label="Chave PIX"
              name="pix"
              value={formValues.pix}
              onChange={handleChange}
              error={errors.pix}
            />
            <InputField
              label="Tipo Chave PIX"
              name="pixType"
              value={(formValues.pixType || '').toUpperCase()}
              disabled
            />
          </div>
        )}

        {/* === ETAPA 2 === */}
        {step === 2 && (
          <div className="grid md:grid-cols-2 gap-4">
            <MaskedInputField
              label="CEP"
              name="zipCode"
              mask="00000-000"
              value={formValues.zipCode}
              onAccept={v => handleChange({ target: { name: 'zipCode', value: v } })}
              error={errors.zipCode}
            />
            <InputField
              label="Número"
              name="number"
              value={formValues.number}
              onChange={handleChange}
              error={errors.number}
            />
            <InputField label="Rua" name="street" value={formValues.street} disabled />
            <InputField
              label="Bairro"
              name="neighborhood"
              value={formValues.neighborhood}
              disabled
            />
            <InputField label="Cidade" name="city" value={formValues.city} disabled />
            <InputField label="UF" name="uf" value={formValues.uf} disabled />
          </div>
        )}

        {/* === ETAPA 3 === */}
        {step === 3 && (
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Senha"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>
        )}

        {/* === BOTÕES === */}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="cursor-pointer bg-stone-300 text-slate-800 px-6 py-2 rounded-xl"
            >
              Voltar
            </button>
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid(step)}
              className={`cursor-pointer ml-auto font-bold px-6 py-3 rounded-xl transition-all ${
                isStepValid(step)
                  ? 'bg-amber-800 text-orange-100 hover:bg-amber-700'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              Próximo
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isStepValid(3) || submitting}
              className="cursor-pointer ml-auto bg-green-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-all disabled:opacity-70"
            >
              {submitting ? 'Enviando...' : 'Cadastrar'}
            </button>
          )}
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
            <p className="text-gray-700 mb-6">{successMessage || 'Cadastro concluído!'}</p>
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
