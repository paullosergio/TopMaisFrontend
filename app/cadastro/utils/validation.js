// app/cadastro/utils/validation.js

export const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
export const isValidUUIDv4 = v =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)

export const isValidCPFChecksum = raw => {
  const cpf = String(raw).replace(/\D/g, '')
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
  const calc = len =>
    ([...Array(len)].reduce((sum, _, i) => sum + parseInt(cpf[i], 10) * (len + 1 - i), 0) * 10) % 11
  const d1 = calc(9) % 10
  const d2 = calc(10) % 10
  return d1 === parseInt(cpf[9], 10) && d2 === parseInt(cpf[10], 10)
}

export const toIsoDate = ddmmyyyy => {
  const m = String(ddmmyyyy || '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!m) return ''
  const [, dd, mm, yyyy] = m
  return `${yyyy}-${mm}-${dd}`
}

export const computePixType = (type, valor) => {
  if (!valor) return ''
  const str = String(valor)
  switch (type) {
    case 'email':
      return str.trim().toLowerCase()
    case 'cpf':
      return str.replace(/\D/g, '')
    case 'phone':
      return str.replace(/\D/g, '').slice(-11)
    case 'aleatoria':
      return str.toLowerCase()
    default:
      return ''
  }
}

export const detectPixFromValue = value => {
  const trimmed = String(value).trim()
  const lower = trimmed.toLowerCase()
  const digits = trimmed.replace(/\D/g, '')

  if (isValidEmail(lower)) return { type: 'email', chave: computePixType('email', lower) }
  if (isValidUUIDv4(lower)) return { type: 'aleatoria', chave: computePixType('aleatoria', lower) }
  if (isValidCPFChecksum(trimmed)) return { type: 'cpf', chave: computePixType('cpf', trimmed) }
  if (digits.length === 11) return { type: 'telefone', chave: computePixType('phone', trimmed) }
  return { type: '', chave: '' }
}

export const validateBirthDate = ddmmyyyy => {
  if (!ddmmyyyy) return 'Informe a data de nascimento'

  const match = ddmmyyyy.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return 'Use o formato dd/mm/aaaa'

  const [, dd, mm, yyyy] = match
  const day = parseInt(dd, 10)
  const month = parseInt(mm, 10) - 1 // zero-based
  const year = parseInt(yyyy, 10)

  const date = new Date(year, month, day)
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return 'Data inválida'
  }

  const today = new Date()
  if (date > today) return 'Data não pode ser no futuro'

  const age =
    today.getFullYear() -
    year -
    (today.getMonth() < month || (today.getMonth() === month && today.getDate() < day) ? 1 : 0)

  if (age < 18) return 'É necessário ter pelo menos 18 anos'
  if (age > 120) return 'Idade acima do limite permitido'

  return ''
}

const validators = {
  name: v =>
    !v.trim() ? 'Informe seu nome completo' : v.trim().length < 3 ? 'Nome muito curto' : '',
  email: v => (!v.trim() ? 'Informe seu e-mail' : !isValidEmail(v) ? 'E-mail inválido' : ''),
  phone: v => (!v.trim() ? 'Informe seu telefone' : !/^\d{11}$/.test(v) ? 'Telefone inválido' : ''),
  cpf: v =>
    !v.trim()
      ? 'Informe seu CPF'
      : !/^\d{11}$/.test(v)
        ? 'CPF deve ter 11 dígitos'
        : !isValidCPFChecksum(v)
          ? 'CPF inválido'
          : '',
  rg: v => (!v.trim() ? 'Informe seu RG' : ''),
  birthDate: validateBirthDate,
  zipCode: v =>
    !v.trim() ? 'Informe seu CEP' : !/^\d{8}$/.test(v) ? 'CEP deve ter 8 dígitos' : '',
  uf: v => (!v.trim() ? 'Informe seu estado' : ''),
  city: v => (!v.trim() ? 'Informe sua cidade' : ''),
  number: v => (!v.trim() ? 'Informe o número' : ''),
  street: v => (!v.trim() ? 'Informe a rua' : ''),
  neighborhood: v => (!v.trim() ? 'Informe o bairro' : ''),
  pix: v => (!v.trim() ? 'Informe a chave PIX' : ''),
  password: v => (!v.trim() ? 'Informe sua senha' : ''),
}

export const validateForm = values => {
  const e = {}

  Object.keys(validators).forEach(k => {
    const err = validators[k]?.(values[k])
    if (err) e[k] = err
  })

  if (values.pixType) {
    const pixErrors = {
      email: !isValidEmail(values.pix) ? 'E-mail PIX inválido' : '',
      cpf: !/^\d{11}$/.test(values.pix) ? 'CPF PIX deve ter 11 dígitos' : '',
      telefone: !/^\d{11}$/.test(values.pix) ? 'Telefone PIX deve ter 11 dígitos' : '',
      aleatoria: !isValidUUIDv4(values.pix) ? 'Chave aleatória inválida' : '',
    }
    if (pixErrors[values.pixType]) e.pix = pixErrors[values.pixType]
  } else {
    e.pixType = 'Não foi possível detectar o tipo da chave PIX'
  }

  return e
}
