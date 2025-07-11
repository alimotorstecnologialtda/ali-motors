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
          <a href="#">Início</a>
          <a href="#">Requisitos</a>
          <a href="#">FAQ</a>
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
              <div className="kit-subtitle" style={{fontWeight: 700, color: '#C92323', fontSize: '1.08rem', marginBottom: 8}}>Kit do Entregador Obrigatório</div>
              <div className="kit-title"><span style={{fontSize: '1.5em', color: '#C92323', marginRight: 8}}>🚚</span>Resumo da Ativação</div>
              <img src={kitImg} alt="Kit do Entregador" className="kit-img" style={{width: '100%', maxWidth: 220, margin: '0 auto 18px auto', display: 'block', borderRadius: 12}} />
              <div className="kit-includes-title">O que está incluso no Kit:</div>
              <ul className="kit-includes-list">
                <li><span className="kit-check">✔</span> Par de luvas AliExpress oficial</li>
                <li><span className="kit-check">✔</span> Capacete</li>
                <li><span className="kit-check">✔</span> Colete</li>
                <li><span className="kit-check">✔</span> Carteirinha oficial de identificação do motorista entregador</li>
              </ul>
              <div className="kit-guarantee">
                <span className="kit-guarantee-icon">⭐</span>
                <b>Garantia de 30 dias</b><br/>
                <span className="kit-guarantee-desc">Se não ficar satisfeito, devolvemos 100% do valor pago</span>
              </div>
              <div className="kit-section" style={{marginTop: 18, width: '100%', background: 'none', padding: 0, textAlign: 'left'}}>
                <b>Kit do Entregador Obrigatório</b>
                <div className="kit-desc">Pagamento único para receber seu kit e ativar sua conta na AliExpress Delivery</div>
              </div>
              <div className="kit-price-box">
                <div className="kit-price-label">Valor:</div>
                <div className="kit-price">R$ 99,99</div>
                <button className="kit-finish-btn">Finalizar cadastro agora!</button>
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
