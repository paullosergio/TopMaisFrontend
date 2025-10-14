// app/cadastro/components/MaskedInputField.jsx
import { IMaskInput } from 'react-imask'

export default function MaskedInputField({
  id,
  name,
  label,
  value,
  mask,
  placeholder,
  onAccept,
  error,
  unmask = 'typed',
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-slate-800 font-semibold mb-1">
        {label}
      </label>
      <IMaskInput
        id={id}
        name={name}
        value={value}
        mask={mask}
        unmask={unmask}
        onAccept={onAccept}
        placeholder={placeholder}
        className="w-full text-black rounded-lg border border-stone-600/30 px-4 py-2 outline-none focus:ring-2 focus:ring-orange-200"
      />
      {error && <p className="mt-1 text-sm text-amber-800">{error}</p>}
    </div>
  )
}
