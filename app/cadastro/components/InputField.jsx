// app/cadastro/components/InputField.jsx
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
  return (
    <div>
      <label htmlFor={id} className="block text-slate-800 font-semibold mb-1">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full text-black rounded-lg border border-stone-600/30 px-4 py-2 outline-none focus:ring-2 focus:ring-orange-200 ${
          disabled ? 'bg-gray-200' : ''
        }`}
      />
      {error && <p className="mt-1 text-sm text-amber-800">{error}</p>}
    </div>
  )
}
