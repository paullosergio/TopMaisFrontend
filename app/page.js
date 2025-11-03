export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-slate-800 to-stone-600">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center">
              <span className="text-slate-800 font-bold text-xl">T</span>
            </div>
            <span className="text-white text-xl font-bold">Top Mais Top</span>
          </div>
          {/* <nav className="hidden md:flex space-x-8">
            <a href="#sobre" className="text-white/90 hover:text-white transition-colors">
              Sobre
            </a>
            <a href="#servicos" className="text-white/90 hover:text-white transition-colors">
              Serviços
            </a>
            <a href="#contato" className="text-white/90 hover:text-white transition-colors">
              Contato
            </a>
          </nav> */}
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Crédito Consignado
              <span className="block text-orange-200">Inteligente</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Conectamos você às melhores ofertas de crédito consignado do mercado.
              <span className="text-orange-200 font-semibold"> Simples, rápido e seguro.</span>
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-orange-200/20 transition-all duration-300 border border-stone-600/30">
              <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-slate-800">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Aprovação Rápida</h3>
              <p className="text-white/80">Processo simplificado com aprovação em até 24 horas</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-orange-200/20 transition-all duration-300 border border-stone-600/30">
              <div className="w-16 h-16 bg-amber-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-orange-200">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">100% Seguro</h3>
              <p className="text-white/80">Seus dados protegidos com tecnologia de ponta</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-orange-200/20 transition-all duration-300 border border-stone-600/30">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-orange-200">💰</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Melhores Taxas</h3>
              <p className="text-white/80">Negociamos as melhores condições do mercado para você</p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-stone-600/20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Por que escolher a Top Mais Top?
              </h2>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                Somos especialistas em conectar você às melhores oportunidades de crédito consignado
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-200 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Análise Personalizada
                    </h3>
                    <p className="text-stone-600">
                      Avaliamos seu perfil e encontramos a proposta ideal para suas necessidades
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#109b96] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Zero Burocracia</h3>
                    <p className="text-stone-600">Processo 100% digital, sem papelada ou filas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-200 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Atendimento 24/7</h3>
                    <p className="text-stone-600">
                      Suporte especializado sempre disponível para você
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#109b96] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Transparência Total
                    </h3>
                    <p className="text-stone-600">
                      Todas as taxas e condições explicadas de forma clara
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-200 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Comparação Inteligente
                    </h3>
                    <p className="text-stone-600">
                      Avaliamos centenas de opções para encontrar a melhor
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#109b96] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Acompanhamento Completo
                    </h3>
                    <p className="text-stone-600">Estamos com você em cada etapa do processo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-white mb-6">
              Pronto para ter o melhor crédito consignado?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Junte-se a milhares de clientes satisfeitos
            </p>
            <a href="/cadastro"
              className="bg-amber-800 text-orange-200 font-bold px-12 py-4 rounded-xl hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg border border-stone-600/30"
            >
              Começar Agora
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/80">© 2025 Top Mais Top. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
