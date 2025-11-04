'use client'
import { useState } from 'react'
import {
  detectPixFromValue,
  isValidCPFChecksum,
  isValidEmail,
  toIsoDate,
  validateBirthDate,
  validateForm,
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

  const totalSteps = 3

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

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validateForm(formValues)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setSubmitting(true)
    try {
      const payload = { ...formValues, birthDate: toIsoDate(formValues.birthDate) }
      console.log('📦 Payload final:', payload)
      await new Promise(res => setTimeout(res, 800))
      setSuccessMessage('Cadastro realizado com sucesso!')
      //   setFormValues(initial)
      setStep(1)
    } finally {
      setSubmitting(false)
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  const nextStep = () => setStep(s => Math.min(totalSteps, s + 1))
  const prevStep = () => setStep(s => Math.max(1, s - 1))

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-stone-600/20 max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-bold mb-6 text-center text-amber-800">
        Etapa {step} de {totalSteps}
      </h2>

      {/* === ETAPA 1: Dados Pessoais === */}
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
            label="Senha"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>
      )}

      {/* === ETAPA 2: Endereço === */}
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
          <InputField
            label="Rua"
            name="street"
            value={formValues.street}
            onChange={handleChange}
            disabled
          />
          <InputField
            label="Bairro"
            name="neighborhood"
            value={formValues.neighborhood}
            onChange={handleChange}
            disabled
          />
          <InputField
            label="Cidade"
            name="city"
            value={formValues.city}
            onChange={handleChange}
            disabled
          />
          <InputField label="UF" name="uf" value={formValues.uf} onChange={handleChange} disabled />
        </div>
      )}

      {/* === ETAPA 3: PIX === */}
      {step === 3 && (
        <div className="grid md:grid-cols-2 gap-4">
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

      {/* === BOTÕES === */}
      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="cursor-pointer bg-stone-300 text-slate-800 px-6 py-2 rounded-xl"
          >
            Voltar
          </button>
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={nextStep}
            className="cursor-pointer ml-auto bg-amber-800 text-orange-100 font-bold px-6 py-3 rounded-xl hover:bg-amber-700 transition-all"
          >
            Próximo
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="cursor-pointer ml-auto bg-green-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-all disabled:opacity-70"
          >
            {submitting ? 'Enviando...' : 'Cadastrar'}
          </button>
        )}
      </div>

      {successMessage && <p className="mt-4 text-green-700 text-center">{successMessage}</p>}
    </form>
  )
}
