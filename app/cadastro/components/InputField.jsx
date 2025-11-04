import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function InputField({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  type = 'text',
}) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => setShowPassword(prev => !prev)
  return (
    <div>
      <label htmlFor={id} className="block text-slate-800 font-semibold mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full text-black rounded-lg border border-stone-600/30 px-4 py-2 outline-none focus:ring-2 focus:ring-orange-200 ${
            disabled ? 'bg-gray-200' : ''
          }`}
        />
        {/* 👁️ Ícone do olho */}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-2.5 text-stone-500 hover:text-stone-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-amber-800">{error}</p>}
    </div>
  )
}
