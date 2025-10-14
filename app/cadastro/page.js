import CadastroForm from './components/CadastroForm'

export default function CadastroPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-600 via-slate-800 to-stone-600 p-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Crie sua conta</h1>
        <CadastroForm />
      </div>
    </main>
  )
}
