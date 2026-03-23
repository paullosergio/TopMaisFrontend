'use client'

import { useState, useEffect } from 'react'

export default function ScamWarningModal() {
  const [showWarning, setShowWarning] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Lê do disco se o usuário já fechou a mensagem
    const isDismissed = localStorage.getItem('topmais_scam_warning_dismissed')
    if (!isDismissed) {
      setShowWarning(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('topmais_scam_warning_dismissed', 'true')
    setShowWarning(false)
  }

  if (!isMounted || !showWarning) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 transition-opacity backdrop-blur-sm">
      <div className="bg-white rounded-3xl sm:rounded-[32px] w-full max-w-[600px] p-6 sm:p-8 md:p-12 shadow-2xl relative animate-in fade-in zoom-in duration-300 my-auto max-h-[95vh] overflow-y-auto scrollbar-hide">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 mb-6 sm:mb-10 text-center sm:text-left">
          <span className="text-4xl sm:text-4xl bg-blend-multiply">🚨</span>
          <h2 className="text-[22px] sm:text-[26px] md:text-3xl font-medium text-slate-800 md:tracking-tight leading-tight">
            <span className="relative z-10 whitespace-nowrap inline-block">
              Fique atento
              {/* <span className="absolute bottom-1 left-0 w-full h-[12px] bg-[#66dec1] -z-10 rounded-sm"></span> */}
            </span>{' '}
            a possíveis golpes!
          </h2>
        </div>

        <div className="text-black font-normal space-y-4 sm:space-y-6 text-[15.5px] sm:text-[17.5px] leading-relaxed">
          <p className="text-center sm:text-left">
            A TOP MAIS TOP <strong>nunca</strong> entra em contato para pedir:
          </p>

          <ul className="list-disc pl-6 sm:pl-8 space-y-1 sm:space-y-2 marker:text-black text-left">
            <li><strong>Pagamentos adicionais;</strong></li>
            <li><strong>Devolução de valores.</strong></li>
          </ul>

          <p className="text-center sm:text-left">
            Golpistas podem utilizar mensagens, ligações ou perfis falsos se passando por empresas para tentar enganar.
          </p>

          <p className="text-center sm:text-left">
            <strong>Recebeu uma abordagem suspeita?</strong> Não realize pagamentos e entre em contato pelos nossos canais oficiais no WhatsApp.
          </p>

          <p className="font-bold text-black pt-1 sm:pt-2 text-center sm:text-left">
            A sua segurança é prioridade.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            onClick={handleDismiss}
            className="w-full sm:w-auto justify-center bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 sm:py-3 px-8 sm:px-12 text-[17px] sm:text-lg rounded-full flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer shadow-sm"
          >
            Entendi
            <svg className="w-5 h-5 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
