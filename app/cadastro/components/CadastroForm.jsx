'use client'
import { useState } from 'react'
import InputField from './InputField'
import MaskedInputField from './MaskedInputField'
import {
  isValidEmail,
  isValidCPFChecksum,
  toIsoDate,
  detectPixFromValue,
  validateBirthDate,
  validateForm,
} from '../utils/validation'

export default function CadastroForm() {
  const initial = {
    name: '',
    email: '',
    phone: '',
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

  const handleChange = ({ target: { name, value } }) => {
    let normalized = value
    if (['phone', 'cpf', 'zipCode', 'number'].includes(name)) normalized = value.replace(/\D/g, '')

    // Atualiza o valor
    setFormValues(prev => ({ ...prev, [name]: normalized }))
    setErrors(prev => ({ ...prev, [name]: '' }))

    // Validação em tempo real
    const validations = {
      email: v => (v && !isValidEmail(v) ? 'E-mail inválido' : ''),
      cpf: v => (v && !isValidCPFChecksum(v) ? 'CPF inválido' : ''),
      phone: v => (v && v.length < 11 ? 'Telefone incompleto' : ''),
      zipCode: v => (v && v.length !== 8 ? 'CEP inválido' : ''),
      birthDate: v => validateBirthDate(v),
      name: v => (v && v.trim().length < 3 ? 'Nome muito curto' : ''),
    }

    const error =
      validations[name]?.(normalized) ||
      (requiredFields.includes(name) && !normalized.trim() ? 'Campo obrigatório' : '')

    setErrors(prev => ({ ...prev, [name]: error }))

    // Tratamentos especiais
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
    } else {
      setFormValues(prev => ({ ...prev, street: '', neighborhood: '', city: '', uf: '' }))
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
      console.log(payload)
      return
      await new Promise(res => setTimeout(() => res(payload), 900))
      setSuccessMessage('Cadastro realizado com sucesso!')
      setFormValues(initial)
      setErrors({})
    } finally {
      setSubmitting(false)
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  const hasAnyError = Object.values(errors || {}).some(Boolean)
  const requiredFields = [
    'name',
    'email',
    'phone',
    'cpf',
    'rg',
    'birthDate',
    'zipCode',
    'city',
    'number',
    'street',
    'neighborhood',
    'uf',
    'pix',
    'pixType',
  ]
  const hasEmptyRequired = requiredFields.some(f => String(formValues[f] ?? '').trim() === '')
  const disableSubmit = submitting || hasAnyError || hasEmptyRequired

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-stone-600/20"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          label="Nome completo"
          name="name"
          id="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Ex.: Maria dos Santos"
          error={errors.name}
        />
        <MaskedInputField
          label="Telefone"
          id="phone"
          name="phone"
          mask="(00) 00000-0000"
          value={formValues.phone}
          onAccept={v => handleChange({ target: { name: 'phone', value: v } })}
          placeholder="(11) 99999-9999"
          error={errors.phone}
        />

        <MaskedInputField
          label="CPF"
          id="cpf"
          name="cpf"
          mask="000.000.000-00"
          value={formValues.cpf}
          onAccept={v => handleChange({ target: { name: 'cpf', value: v } })}
          placeholder="000.000.000-00"
          error={errors.cpf}
        />
        <InputField
          label="E-mail"
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="seuemail@exemplo.com"
          error={errors.email}
        />

        <InputField
          label="Chave PIX"
          id="pix"
          name="pix"
          value={formValues.pix}
          onChange={handleChange}
          placeholder="E-mail, CPF, telefone ou chave aleatória"
          error={errors.pix}
        />
        <InputField
          label="Tipo Chave PIX"
          id="pixType"
          name="pixType"
          value={(formValues.pixType || '').toUpperCase()}
          disabled
          placeholder="Tipo detectado"
        />

        <InputField
          label="RG"
          id="rg"
          name="rg"
          value={formValues.rg}
          onChange={handleChange}
          placeholder="Documento de identidade"
          error={errors.rg}
        />
        <MaskedInputField
          label="Data de nascimento"
          id="birthDate"
          name="birthDate"
          mask="00/00/0000"
          unmask={false}
          value={formValues.birthDate}
          onAccept={v => handleChange({ target: { name: 'birthDate', value: v } })}
          placeholder="dd/mm/aaaa"
          error={errors.birthDate}
        />

        <MaskedInputField
          label="CEP"
          id="zipCode"
          name="zipCode"
          mask="00000-000"
          value={formValues.zipCode}
          onAccept={v => handleChange({ target: { name: 'zipCode', value: v } })}
          placeholder="00000-000"
          error={errors.zipCode}
        />
        <InputField
          label="UF"
          id="uf"
          name="uf"
          value={formValues.uf}
          onChange={handleChange}
          disabled
          placeholder="Estado"
          error={errors.uf}
        />

        <InputField
          label="Cidade"
          id="city"
          name="city"
          value={formValues.city}
          onChange={handleChange}
          disabled
          placeholder="Cidade"
          error={errors.city}
        />
        <InputField
          label="Número"
          id="number"
          name="number"
          value={formValues.number}
          onChange={handleChange}
          placeholder="Ex.: 123"
          error={errors.number}
        />

        <InputField
          label="Rua"
          id="street"
          name="street"
          value={formValues.street}
          onChange={handleChange}
          disabled
          placeholder="Rua"
          error={errors.street}
        />
        <InputField
          label="Bairro"
          id="neighborhood"
          name="neighborhood"
          value={formValues.neighborhood}
          onChange={handleChange}
          disabled
          placeholder="Bairro"
          error={errors.neighborhood}
        />
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={disableSubmit}
          className="bg-amber-800 text-orange-200 font-bold px-6 py-3 rounded-xl hover:bg-white/70 hover:text-slate-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 shadow border cursor-pointer"
        >
          {submitting ? 'Enviando...' : 'Criar conta'}
        </button>
      </div>

      {successMessage && <p className="mt-4 text-green-700">{successMessage}</p>}
    </form>
  )
}
