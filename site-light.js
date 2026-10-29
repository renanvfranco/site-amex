/**
 * AMAX // THE COMMERCIAL OPERATING SYSTEM
 * Executive Light Interactive Engine (site-light.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. FRAME SWITCHER
  const tabButtons = document.querySelectorAll('.frame-tab-btn');
  const panes = document.querySelectorAll('.frame-pane');
  const urlDisplay = document.querySelector('.chrome-url b');

  const paneUrls = {
    'pane-kanban': 'amax.crm/terminal/deals-matrix',
    'pane-saas': 'amax.crm/cockpit/vendas-geral',
    'pane-empresas': 'amax.crm/enterprise/multi-tenant',
    'pane-mobile': 'amax.crm/pwa/ios-android'
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      
      tabButtons.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      if (urlDisplay && paneUrls[targetId]) {
        urlDisplay.textContent = paneUrls[targetId];
      }
    });
  });

  // 2. DYNAMIC ROI & REVENUE RECOVERY CALCULATOR (REDRIVE ENGINE)
  const sliderLeads = document.getElementById('slider-leads');
  const sliderTicket = document.getElementById('slider-ticket');
  const sliderLoss = document.getElementById('slider-loss');

  const valLeads = document.getElementById('val-leads');
  const valTicket = document.getElementById('val-ticket');
  const valLoss = document.getElementById('val-loss');

  const displayRecuperado = document.getElementById('roi-recuperado');
  const displayLeadsSalvos = document.getElementById('roi-leads-salvos');
  const displayAnual = document.getElementById('roi-anual');
  const btnRoiCta = document.getElementById('btn-roi-cta');

  const formatBRL = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  function updateRoi() {
    if (!sliderLeads || !sliderTicket || !sliderLoss) return;

    const leads = parseInt(sliderLeads.value, 10);
    const ticket = parseInt(sliderTicket.value, 10);
    const lossPct = parseInt(sliderLoss.value, 10);

    if (valLeads) valLeads.textContent = leads;
    if (valTicket) valTicket.textContent = formatBRL(ticket);
    if (valLoss) valLoss.textContent = `${lossPct}%`;

    const leadsPerdidos = leads * (lossPct / 100);
    const leadsRecuperados = Math.round(leadsPerdidos * 0.35);
    const receitaRecuperadaMes = leadsRecuperados * ticket;
    const receitaAnual = receitaRecuperadaMes * 12;

    if (displayRecuperado) displayRecuperado.textContent = formatBRL(receitaRecuperadaMes);
    if (displayLeadsSalvos) displayLeadsSalvos.textContent = `+${leadsRecuperados} contratos/mês`;
    if (displayAnual) displayAnual.textContent = formatBRL(receitaAnual);

    if (btnRoiCta) {
      const msg = encodeURIComponent(`Olá! Fiz a simulação no site da AMAX. Tenho ${leads} leads/mês e posso recuperar ${formatBRL(receitaRecuperadaMes)}/mês com o CRM. Quero iniciar a implantação!`);
      btnRoiCta.href = `https://wa.me/5511999999999?text=${msg}`;
    }
  }

  if (sliderLeads && sliderTicket && sliderLoss) {
    sliderLeads.addEventListener('input', updateRoi);
    sliderTicket.addEventListener('input', updateRoi);
    sliderLoss.addEventListener('input', updateRoi);
    updateRoi();
  }

  // 3. FAQ ACCORDION
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // 4. TELEMETRY LATENCY JITTER
  const latencyElem = document.getElementById('hud-latency');
  if (latencyElem) {
    setInterval(() => {
      const ms = Math.floor(11 + Math.random() * 5);
      latencyElem.textContent = `${ms}ms`;
    }, 4000);
  }
});
