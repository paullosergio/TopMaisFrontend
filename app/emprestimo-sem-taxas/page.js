'use client'

import { AlertTriangle, BadgeCheck, Mail, ShieldCheck, Siren } from 'lucide-react'
import Image from 'next/image'

export default function EmprestimoSemTaxas() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100">
      {/* Header */}
      <header className="w-full bg-white/70 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Image
            src="/icon.png"
            alt="Top Mais Top"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Aviso principal */}
        <section className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-red-100 text-red-700 font-semibold text-sm">
            <Siren className="w-4 h-4" />
            AVISO IMPORTANTE
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Empréstimo <span className="text-teal-600">sem taxas!</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            <strong className="text-slate-900">NÃO cobramos</strong> nenhum valor antecipado ou taxa
            adicional para liberar o seu empréstimo. O processo é{' '}
            <strong className="text-teal-600">100% gratuito</strong>.
          </p>
        </section>

        {/* Alerta de golpe */}
        <section className="bg-white rounded-3xl border-2 border-red-200 shadow-xl p-8 md:p-12 mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Fique atento</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Se alguém te cobrar qualquer valor para liberar o dinheiro,{' '}
                <strong className="text-red-600">não pague. É golpe!</strong> Denuncie
                imediatamente.
              </p>
            </div>
          </div>
        </section>

        {/* Garantias */}
        <section className="grid sm:grid-cols-3 gap-6 mb-14">
          {[
            {
              icon: BadgeCheck,
              title: '100% Gratuito',
              desc: 'Nenhuma taxa antecipada para liberar seu empréstimo.',
            },
            {
              icon: ShieldCheck,
              title: 'Crédito Seguro',
              desc: 'Processo transparente, sem pegadinhas ou surpresas.',
            },
            {
              icon: Siren,
              title: 'Denuncie Golpes',
              desc: 'Cobrança para liberar o dinheiro é sempre golpe.',
            },
          ].map(item => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-10 md:p-14 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Crédito seguro e sem pegadinhas
          </h2>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto mb-8">
            Sua segurança é prioridade. Confie apenas nos canais oficiais da Top Mais Top.
          </p>
          <a
            href="mailto:contato@autopromotora.com.br"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-teal-700 font-semibold shadow-lg hover:bg-teal-50 transition-colors duration-300"
          >
            <Mail className="w-5 h-5" />
            contato@autopromotora.com.br
          </a>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Top Mais Top — Crédito seguro e transparente.
      </footer>
    </div>
  )
}
