'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const aboutContent = {
    title: 'Especialistas em Crédito CLT',
    intro:
      'A Top Mais Top é uma fintech especializada em crédito CLT, voltada para o setor privado, ou seja, para trabalhadores de carteira assinada.',
    highlights: [
      {
        icon: '🎯',
        title: 'Referência no Mercado',
        description:
          'Somos referência no universo de correspondentes bancários, oferecendo um sistema próprio que facilita o cadastramento de equipes.',
      },
      {
        icon: '⚙️',
        title: 'Gestão Eficiente',
        description:
          'Facilitamos a gestão eficiente dos pagamentos, permitindo que reduzam custos operacionais e tributários.',
      },
      {
        icon: '💳',
        title: 'Modelo Flexível',
        description:
          'Nossos parceiros podem optar por um modelo em que pagamos diretamente suas equipes, de forma simples e automatizada.',
      },
    ],
    conclusion:
      'Transformamos a rotina dos correspondentes bancários com tecnologia moderna, eficiência real e modelo de negócio inovador.',
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-b from-white via-blue-50 to-blue-100 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200'
            : 'bg-white/50 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image
              src="/icon.png"
              alt="Top Mais Top"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          <nav className="hidden md:flex space-x-1">
            {['Sobre', 'Produtos', 'Diferenciais', 'Parceiros'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-300 font-medium text-sm"
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
          </button>

          <a
            href="https://app.topmaistop.com.br/cadastro-parceiros?ref=1766492220539x396710812009889800znt27dch"
            className="hidden md:block px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Cadastro
          </a>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 py-4 px-6 space-y-3">
            {['Sobre', 'Produtos', 'Diferenciais', 'Parceiros'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-slate-700 hover:text-teal-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="https://app.topmaistop.com.br/cadastro-parceiros?ref=1766492220539x396710812009889800znt27dch"
              className="block w-full px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-center rounded-lg font-semibold transition-all duration-300"
            >
              Cadastro
            </a>
          </div>
        )}
      </header>

      <main className="pt-24">
        {/* Seção Sobre - Hero */}
        <section
          id="sobre"
          className="py-24 bg-gradient-to-b from-white via-blue-50 to-blue-100 border-b-4 border-blue-400"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-12">
                  <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                    {aboutContent.title}
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed">{aboutContent.intro}</p>
                </div>

                <div className="space-y-4">
                  {aboutContent.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl flex-shrink-0">{highlight.icon}</div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-1">
                            {highlight.title}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center justify-center min-h-[500px]">
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-600 opacity-10 z-10"></div>
                  <Image
                    src="/comissao.png"
                    alt="Comissao Top Mais Top"
                    fill
                    className="object-fill"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Produtos */}
        <section
          id="produtos"
          className="py-24 bg-gradient-to-b from-white via-teal-50 to-teal-100 border-b-4 border-teal-500"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">Produtos</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Informações claras sobre os produtos e soluções que oferecemos para o seu negócio
                crescer.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                {[
                  {
                    icon: '🏢',
                    color: 'teal',
                    title: 'Múltiplas Averbadoras',
                    desc: 'Trabalhamos com múltiplas averbadoras em um único sistema, diferenciando-nos de outras fintechs que trabalham com apenas uma.',
                  },
                  {
                    icon: '✓',
                    color: 'orange',
                    title: 'Sem Recadastramento',
                    desc: 'Se um cliente não for aprovado em uma averbadora, ele tenta outra sem necessidade de recadastramento.',
                  },
                  {
                    icon: '📈',
                    color: 'green',
                    title: 'Maiores Chances de Aprovação',
                    desc: 'Aumentamos as chances de aprovação e simplificamos o processo para seus clientes.',
                  },
                ].map((item, i) => {
                  const colorMap = {
                    teal: 'from-teal-50 to-slate-50 border-teal-200 bg-teal-600',
                    orange: 'from-orange-50 to-slate-50 border-orange-200 bg-orange-500',
                    green: 'from-green-50 to-slate-50 border-green-200 bg-green-600',
                  }
                  const [bgGradient, bgColor] = colorMap[item.color].split(' bg-')
                  return (
                    <div
                      key={i}
                      className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-8 border ${bgGradient.split('border-')[1] || ''} hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-14 h-14 bg-${bgColor} rounded-xl flex items-center justify-center flex-shrink-0 text-white text-2xl shadow-lg`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="relative">
                <div className="relative rounded-3xl p-12 min-h-[480px] flex flex-col items-center justify-center shadow-2xl overflow-hidden">
                  {/* Imagem de fundo */}
                  <Image src="/produtos.png" alt="Background" fill  priority />

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Diferenciais */}
        <section
          id="diferenciais"
          className="py-24 bg-gradient-to-b from-white via-orange-50 to-orange-100 border-b-4 border-orange-400"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                Por Que Somos Diferentes?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Descubra o que nos torna referência no mercado de crédito CLT
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-8">Nossos Diferenciais</h3>
                <ul className="space-y-4">
                  {[
                    'Sistema próprio inovador',
                    'Cadastramento simplificado de equipes',
                    'Gestão eficiente de pagamentos',
                    'Redução de custos operacionais e tributários',
                    'Modelo flexível de parcerias',
                    'Pagamento automático direto',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-white text-lg font-bold">✓</span>
                      </div>
                      <span className="text-lg text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-12 border-2 border-orange-200 shadow-xl">
                <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="text-3xl">🎯</span>
                  Nossa Missão
                </h4>
                <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                  {aboutContent.conclusion}
                </p>
                <div className="pt-6 border-t-2 border-orange-200">
                  <p className="text-slate-500 leading-relaxed">
                    Transformando o mercado de crédito CLT com tecnologia, eficiência e inovação
                    para criar oportunidades reais de crescimento.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-12 text-center shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pronto para fazer parte da revolução?
              </h3>
              <p className="text-teal-100 mb-10 text-lg max-w-2xl mx-auto">
                Junte-se a centenas de parceiros que já estão crescendo com a Top Mais Top
              </p>
              <a
                href="https://app.topmaistop.com.br/cadastro-parceiros?ref=1766492220539x396710812009889800znt27dch"
                className="inline-flex items-center justify-center gap-3 px-12 py-4 bg-white hover:bg-slate-100 text-teal-600 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
              >
                <span>👑</span>
                <span>Começar Agora</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
