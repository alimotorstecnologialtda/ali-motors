import React, { useState } from 'react';
import './App.css';
import kitImg from './assets/img/kit.png';
import aliLogo from './assets/img/ali-logo.png';
import cadastroImg from './assets/img/cadastro.png';

const questions = [
  {
    title: 'Qual a categoria da sua CNH?',
    desc: 'É necessário ter CNH válida categoria A ou B ou superior.',
    icon: '📩',
    options: [
      'Categoria A',
      'Categoria B',
      'Categoria A e B',
      'Categoria ABC',
      'Categoria ABCD',
      'Categoria ABCDE',
    ],
  },
  {
    title: 'Qual seu tipo de veículo?',
    desc: 'Pode ser carro, moto, van, caminhão ou utilitário.',
    icon: '🚗',
    options: [
      'Carro',
      'Moto',
      'Van',
      'Caminhão',
    ],
  },
  {
    title: 'Seu veículo é próprio ou alugado?',
    desc: '',
    icon: '🚗',
    options: [
      'Veículo Próprio',
      'Veículo Alugado',
    ],
  },
  {
    title: 'Sua CNH possui EAR?',
    desc: 'Exercício de Atividade Remunerada é obrigatório.',
    icon: '🪪',
    options: [
      'SIM',
      'NÃO',
    ],
  },
];

const successIcon = '✅';

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' });
  const [showKit, setShowKit] = useState(false);

  const loadingSteps = [
    {
      label: 'Requisitos verificados',
      icon: '✔️',
      color: '#1db954',
      bg: '#e6ffe6',
    },
    {
      label: 'Preparando cadastro',
      icon: '🔵',
      color: '#2563eb',
      bg: '#e6f0ff',
    },
    {
      label: 'Conectando à rede AliExpress',
      icon: '🟣',
      color: '#7c3aed',
      bg: '#f3e8ff',
    },
  ];

  const handleOptionClick = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = option;
    setAnswers(newAnswers);
    setStep((prev) => prev + 1);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
  };

  const handleContinue = () => {
    setLoading(true);
    setLoadingStage(0);
    setShowForm(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setLoadingStage(i);
      if (i === loadingSteps.length) {
        clearInterval(interval);
        setTimeout(() => setShowForm(true), 1000); // mostra o form após 1s
      }
    }, 1200);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowKit(true);
  };

  return (
    <div className="main-bg">
      <header className="header">
        <div className="header-logo">
          <img src={aliLogo} alt="AliExpress Logo" className="logo-a" style={{width: 32, height: 32, borderRadius: 6, objectFit: 'cover', background: '#fff'}} />
          <div className="header-title">
            <div className="header-main">Entregador Parceiro</div>
            <div className="header-sub">AliExpress Delivery</div>
          </div>
        </div>
        <nav className="header-nav">
          <a href="#" style={{ color: '#FFD700', fontWeight: 700, fontSize: '1.05em', letterSpacing: 0.5, textShadow: '0 1px 4px #0002', margin: '0 8px' }}>Início</a>
          <a href="#" style={{ color: '#FFD700', fontWeight: 700, fontSize: '1.05em', letterSpacing: 0.5, textShadow: '0 1px 4px #0002', margin: '0 8px' }}>Requisitos</a>
          <a href="#" style={{ color: '#FFD700', fontWeight: 700, fontSize: '1.05em', letterSpacing: 0.5, textShadow: '0 1px 4px #0002', margin: '0 8px' }}>FAQ</a>
        </nav>
      </header>
      <main>
        <h1 className="main-title">Ganhe dinheiro sendo um <span>Entregador Parceiro</span></h1>
        <img src={cadastroImg} alt="Cadastro" className="main-cadastro-img" style={{width: '100%', maxWidth: 280, margin: '12px auto 10px auto', display: 'block'}} />
        <p className="main-sub">Junte-se ao maior programa de entregadores do mundo e transforme seu tempo em renda extra</p>
        <div className="benefits">
          <div className="benefit-card">
            <div className="benefit-icon">🚗</div>
            <div className="benefit-title">Flexibilidade Total</div>
            <div className="benefit-desc">Trabalhe nos seus horários</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💸</div>
            <div className="benefit-title">Renda Extra</div>
            <div className="benefit-desc">Ganhos por entrega realizada</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📋</div>
            <div className="benefit-title">Suporte Completo</div>
            <div className="benefit-desc">Treinamento e acompanhamento</div>
          </div>
        </div>
        <section className="form-section">
          {!loading && !showForm && !showKit ? (
            step < questions.length ? (
              <div className="form-card">
                <div className="form-progress">
                  <span>Pergunta {step + 1} de {questions.length}</span>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
                  </div>
                  <span className="progress-percent">{Math.round(((step + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="form-icon">{questions[step].icon}</div>
                <h2 className="form-title">{questions[step].title}</h2>
                {questions[step].desc && <p className="form-desc">{questions[step].desc}</p>}
                <div className="form-options">
                  {questions[step].options.map((option) => (
                    <button key={option} onClick={() => handleOptionClick(option)}>{option}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="form-success">
                <div className="form-success-icon">{successIcon}</div>
                <h2 className="form-title">Parabéns!</h2>
                <p className="form-desc">Você atende aos requisitos básicos para ser um Entregador Parceiro AliExpress!</p>
                <div className="form-success-list">
                  <div className="form-success-item">
                    <span>Qual a categoria da sua CNH?</span>
                    <span className="form-success-answer">{answers[0]} <span className="check">✔</span></span>
                  </div>
                  <div className="form-success-item">
                    <span>Qual seu tipo de veículo?</span>
                    <span className="form-success-answer">{answers[1]} <span className="check">✔</span></span>
                  </div>
                  <div className="form-success-item">
                    <span>Seu veículo é próprio ou alugado?</span>
                    <span className="form-success-answer">{answers[2]} <span className="check">✔</span></span>
                  </div>
                  <div className="form-success-item">
                    <span>Sua CNH possui EAR?</span>
                    <span className="form-success-answer">{answers[3]} <span className="check">✔</span></span>
                  </div>
                </div>
                <button className="form-success-btn" onClick={handleContinue}>
                  Continuar Cadastro <span style={{fontSize: '1.2em'}}>→</span>
                </button>
              </div>
            )
          ) : loading && !showForm && !showKit ? (
            <div className="form-loading-card">
              <div className="form-loading-icon">🧾</div>
              <h2 className="form-title">Analisando suas informações...</h2>
              <p className="form-desc">Estamos verificando seus dados e preparando sua jornada como Motorista Parceiro</p>
              <div className="form-loading-steps">
                {loadingSteps.map((stepObj, idx) => (
                  <div
                    key={stepObj.label}
                    className="form-loading-step"
                    style={{
                      background: idx < loadingStage ? stepObj.bg : '#f6f6f6',
                      color: idx < loadingStage ? stepObj.color : '#bbb',
                      borderColor: idx < loadingStage ? stepObj.color : '#eee',
                    }}
                  >
                    <span style={{marginRight: 8}}>{stepObj.icon}</span>
                    {stepObj.label}
                  </div>
                ))}
              </div>
              <div className="form-loading-progress-bar">
                <div
                  className="form-loading-progress-bar-fill"
                  style={{ width: `${(loadingStage / loadingSteps.length) * 100}%` }}
                ></div>
              </div>
              <div className="form-loading-wait">Isso pode levar alguns segundos...</div>
              <div className="form-loading-info">
                <b>Você sabia?</b><br/>
                Nossos motoristas parceiros ganham em média <span style={{color: '#C92323', fontWeight: 700}}>R$ 2.500</span> por mês trabalhando apenas 6 horas por dia!
              </div>
            </div>
          ) : showForm && !showKit ? (
            <form className="form-final-card" onSubmit={handleFormSubmit} autoComplete="off">
              <div className="form-final-icon">🧑‍💼</div>
              <h2 className="form-title">Quase pronto!</h2>
              <p className="form-desc">Agora precisamos de alguns dados seus para finalizar o cadastro</p>
              <div className="form-final-group">
                <label>Nome Completo</label>
                <div className="form-final-input-wrapper">
                  <span className="form-final-input-icon">👤</span>
                  <input name="nome" type="text" placeholder="Seu nome completo" value={form.nome} onChange={handleFormChange} required />
                </div>
              </div>
              <div className="form-final-group">
                <label>Email</label>
                <div className="form-final-input-wrapper">
                  <span className="form-final-input-icon">✉️</span>
                  <input name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleFormChange} required />
                </div>
              </div>
              <div className="form-final-group">
                <label>Telefone</label>
                <div className="form-final-input-wrapper">
                  <span className="form-final-input-icon">📞</span>
                  <input name="telefone" type="tel" placeholder="(11) 99999-9999" value={form.telefone} onChange={handleFormChange} required />
                </div>
              </div>
              <button className="form-final-btn" type="submit">Finalizar Cadastro <span style={{fontSize: '1.2em'}}>→</span></button>
              <div className="form-final-lgpd">
                <span style={{color: '#FBA13E', marginRight: 6}}>⚠️</span>
                Seus dados estão seguros e protegidos conforme a <a href="#" style={{color: '#2563eb', textDecoration: 'underline'}}>LGPD</a>
              </div>
            </form>
          ) : showKit ? (
            <div className="kit-card">
              <div className="kit-top-title" style={{fontWeight: 900, color: '#C92323', fontSize: '1.12rem', marginBottom: 8, textAlign: 'center', width: '100%'}}>Kit de ativação de Cadastro Obrigatório</div>
              <img src={kitImg} alt="Kit do Entregador" className="kit-img" style={{width: '100%', maxWidth: 360, margin: '0 auto 18px auto', display: 'block', borderRadius: 12}} />
              <div className="kit-modern-box">
                <div className="kit-modern-title"><span style={{fontSize: '1.2em', color: '#16a34a', marginRight: 4}}>✅</span> Tudo isso por apenas:</div>
                <div className="kit-modern-price">R$ 99,99 à vista no pix <span className="kit-modern-price-desc">(pagamento único)</span></div>
                <div className="kit-modern-payment-options" style={{marginBottom: 8, marginTop: 2, textAlign: 'center', width: '100%'}}>
                  <div style={{color: '#3c18db', fontWeight: 700, fontSize: '1.05rem'}}>12x de R$ 11,32 no cartão de crédito</div>
                </div>
                <ul className="kit-modern-benefits">
                  <li><span className="kit-modern-icon">🔒</span> Ativação 100% segura e garantida</li>
                  <li><span className="kit-modern-icon">💥</span> Kit completo com luvas, capacete, colete e carteirinha oficial</li>
                  <li><span className="kit-modern-icon">⭐</span> Garantia de satisfação: ou você ama, ou seu dinheiro de volta!</li>
                </ul>
                <div className="kit-modern-gatilhos">
                  <span className="kit-modern-gatilho">⏳ Vagas limitadas para ativação neste valor.</span><br/>
                  <span className="kit-modern-gatilho">⏰ Oferta válida até hoje às 23h59.</span><br/>
                  <span className="kit-modern-gatilho">🏆 Kit aprovado por mais de 10.000 entregadores.</span>
                </div>
                <div className="kit-modern-selo">
                  <span className="kit-modern-selo-icon">🔒</span> <b>+ de 95% de satisfação</b> &nbsp;|&nbsp; <span style={{color: '#16a34a'}}>Compra segura</span>
                </div>
                <a href="https://go.pepperpay.com.br/brapm" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', width: '100%', display: 'block', marginTop: 12}}>
                  <button className="kit-finish-btn kit-modern-btn" type="button" style={{width: '100%'}}>QUERO ATIVAR E COMEÇAR!</button>
                </a>
              </div>
            </div>
          ) : null}
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">Mais de <span>200.000 entregadores</span> já fazem parte da nossa rede global</div>
        <div className="footer-bottom">
          <div><b>4.8★</b><br/>Avaliação App</div>
          <div><b>24h</b><br/>Suporte</div>
          <div><b>R$ 2k+</b><br/>Média mensal</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
