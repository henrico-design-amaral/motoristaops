const form = document.querySelector('#presence-onboarding');
const steps = [...document.querySelectorAll('.mo-form-step')];
const navButtons = [...document.querySelectorAll('[data-step-jump]')];
const back = document.querySelector('[data-action="back"]');
const next = document.querySelector('[data-action="next"]');
const counter = document.querySelector('[data-current-step]');
const errorBox = document.querySelector('#form-error');
const review = document.querySelector('#onboarding-review');

let current = 0;
let maxReached = 0;

const escapeHtml = (value) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
  errorBox.focus?.();
}

function clearError() {
  errorBox.hidden = true;
  errorBox.textContent = '';
}

function validateCurrentStep() {
  clearError();
  const step = steps[current];
  const required = [...step.querySelectorAll('[required]')];

  for (const field of required) {
    if (!field.checkValidity()) {
      field.reportValidity();
      showError('Revise os campos obrigatórios desta etapa antes de continuar.');
      return false;
    }
  }

  if (current === 2) {
    const selected = form.querySelectorAll('input[name="services"]:checked').length;
    if (!selected) {
      showError('Selecione pelo menos um serviço.');
      return false;
    }
  }

  return true;
}

function collect() {
  const data = new FormData(form);
  return {
    displayName: data.get('displayName') || '',
    phone: data.get('phone') || '',
    whatsapp: data.get('whatsapp') || '',
    bio: data.get('bio') || '',
    vehicle: [data.get('vehicleBrand'), data.get('vehicleModel'), data.get('vehicleYear'), data.get('vehicleColor')].filter(Boolean).join(' · '),
    services: data.getAll('services'),
    serviceAreas: data.get('serviceAreas') || '',
    instagram: data.get('instagram') || '',
    linkedin: data.get('linkedin') || '',
    tiktok: data.get('tiktok') || '',
    youtube: data.get('youtube') || '',
    googleBusiness: data.get('googleBusiness') || 'not_requested',
    printDisplayName: data.get('printDisplayName') || '',
    shortServiceLine: data.get('shortServiceLine') || '',
    address: [data.get('street'), data.get('number'), data.get('complement'), data.get('neighborhood'), data.get('city'), data.get('state'), data.get('postalCode')].filter(Boolean).join(', ')
  };
}

function buildReview() {
  const d = collect();
  const social = [d.instagram && 'Instagram', d.linkedin && 'LinkedIn', d.tiktok && 'TikTok', d.youtube && 'YouTube'].filter(Boolean).join(', ') || 'Nenhuma rede informada';
  const gb = {
    not_requested: 'Não configurar agora',
    create: 'Criar perfil',
    connect_existing: 'Conectar perfil existente'
  }[d.googleBusiness] || d.googleBusiness;

  const items = [
    ['Nome profissional', d.displayName],
    ['WhatsApp', d.whatsapp],
    ['Veículo', d.vehicle],
    ['Serviços', d.services.join(', ')],
    ['Áreas atendidas', d.serviceAreas],
    ['Redes', social],
    ['Google Business', gb],
    ['Nome nos materiais', d.printDisplayName],
    ['Linha de serviço', d.shortServiceLine || 'Não informada'],
    ['Endereço de entrega', d.address]
  ];

  review.innerHTML = items.map(([label, value]) =>
    `<div class="mo-review-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value || 'Não informado')}</strong></div>`
  ).join('');
}

function render() {
  steps.forEach((step, index) => {
    const active = index === current;
    step.hidden = !active;
    step.classList.toggle('active', active);
  });

  navButtons.forEach((button, index) => {
    button.classList.toggle('active', index === current);
    button.setAttribute('aria-current', index === current ? 'step' : 'false');
    button.disabled = index > maxReached;
  });

  counter.textContent = String(current + 1);
  back.hidden = current === 0;
  next.hidden = current === steps.length - 1;

  if (current === steps.length - 1) buildReview();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

next.addEventListener('click', () => {
  if (!validateCurrentStep()) return;

  if (current === 0) {
    const source = form.elements.displayName.value.trim();
    const target = form.elements.printDisplayName;
    if (!target.value.trim()) target.value = source;
  }

  current = Math.min(current + 1, steps.length - 1);
  maxReached = Math.max(maxReached, current);
  render();
});

back.addEventListener('click', () => {
  clearError();
  current = Math.max(current - 1, 0);
  render();
});

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = Number(button.dataset.stepJump);
    if (!Number.isInteger(target)) return;

    if (target > maxReached) return;
    current = target;
    clearError();
    render();
  });
});

render();
