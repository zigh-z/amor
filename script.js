const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const loveBurstBtn = document.getElementById('loveBurstBtn');
const heartBurstTarget = document.getElementById('heartBurstTarget');
const floatingHearts = document.querySelector('.floating-hearts');

function createLoveBurst(x = 50, y = 50) {
  const burst = document.createElement('span');
  burst.className = 'heart-particle';
  burst.textContent = '❤';
  burst.style.left = `${x}%`;
  burst.style.top = `${y}%`;
  burst.style.setProperty('--x', `${(Math.random() * 120 - 60).toFixed(2)}px`);
  burst.style.setProperty('--y', `${(Math.random() * 40 + 40).toFixed(2)}px`);
  burst.style.setProperty('--r', `${(Math.random() * 180 - 90).toFixed(2)}deg`);

  if (floatingHearts) {
    floatingHearts.appendChild(burst);
    setTimeout(() => burst.remove(), 2200);
  }
}

if (loveBurstBtn) {
  loveBurstBtn.addEventListener('click', () => {
    for (let i = 0; i < 16; i += 1) {
      createLoveBurst(50 + (Math.random() * 18 - 9), 50 + (Math.random() * 18 - 9));
    }
    loveBurstBtn.classList.add('is-popping');
    setTimeout(() => loveBurstBtn.classList.remove('is-popping'), 300);
  });
}

if (heartBurstTarget) {
  heartBurstTarget.addEventListener('click', () => {
    for (let i = 0; i < 12; i += 1) {
      createLoveBurst(50 + (Math.random() * 16 - 8), 50 + (Math.random() * 16 - 8));
    }
  });
}

if (floatingHearts) {
  for (let i = 0; i < 18; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart-particle';
    heart.textContent = '❤';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.fontSize = `${Math.random() * 1.1 + 0.8}rem`;
    heart.style.opacity = '0.45';
    heart.style.animationDelay = `${(Math.random() * 1.8).toFixed(2)}s`;
    heart.style.setProperty('--x', `${(Math.random() * 28 - 14).toFixed(2)}px`);
    heart.style.setProperty('--y', `${(Math.random() * 40 + 20).toFixed(2)}px`);
    heart.style.setProperty('--r', `${(Math.random() * 200 - 100).toFixed(2)}deg`);
    floatingHearts.appendChild(heart);
  }
}

const memoryCards = [...document.querySelectorAll('.memory-card')];
const memoryViewer = document.querySelector('.memory-viewer');
const viewerContent = document.querySelector('.viewer-content');
let currentMemoryIndex = 0;

function showMemory(index) {
  if (!memoryViewer || !viewerContent || !memoryCards.length) return;

  currentMemoryIndex = (index + memoryCards.length) % memoryCards.length;
  const card = memoryCards[currentMemoryIndex];
  const media = document.createElement(card.dataset.kind === 'video' ? 'video' : 'img');
  media.src = card.dataset.src;

  if (media instanceof HTMLVideoElement) {
    media.controls = true;
    media.playsInline = true;
    media.preload = 'metadata';
    if (card.dataset.poster) media.poster = card.dataset.poster;
  } else {
    media.alt = card.dataset.alt || card.dataset.title || 'Foto do casal';
  }
  viewerContent.replaceChildren(media);
  viewerContent.replaceChildren(media);
}

memoryCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    if (!memoryViewer) return;
    showMemory(index);
    memoryViewer.showModal();
  });
});

const viewerClose = document.querySelector('.viewer-close');
const viewerPrev = document.querySelector('.viewer-prev');
const viewerNext = document.querySelector('.viewer-next');

if (viewerClose && memoryViewer) {
  viewerClose.addEventListener('click', () => memoryViewer.close());
}

if (viewerPrev) {
  viewerPrev.addEventListener('click', () => showMemory(currentMemoryIndex - 1));
}

if (viewerNext) {
  viewerNext.addEventListener('click', () => showMemory(currentMemoryIndex + 1));
}

if (memoryViewer) {
  memoryViewer.addEventListener('click', (event) => {
    if (event.target === memoryViewer) memoryViewer.close();
  });
}

const responseMessage = document.getElementById('responseMessage');
const responsePanel = document.querySelector('.response-panel');
const responseButtons = [...document.querySelectorAll('.response-button')];
const celebrationOverlay = document.getElementById('celebrationOverlay');
const celebrationBurst = document.querySelector('.celebration-burst');
const celebrationClose = document.getElementById('celebrationClose');
const noButton = document.querySelector('.response-no');
let noButtonTimer;

function playNoButtonPrank() {
  if (!noButton) return;

  window.clearTimeout(noButtonTimer);
  noButton.disabled = true;
  noButton.setAttribute('aria-pressed', 'false');
  noButton.classList.remove('is-selected', 'is-running', 'is-disappearing');
  const direction = Math.random() < 0.5 ? -1 : 1;
  noButton.style.setProperty('--flee-x', `${direction * (130 + Math.random() * 100)}px`);
  noButton.style.setProperty('--flee-y', `${-70 - Math.random() * 90}px`);
  noButton.classList.add('is-running', 'is-disappearing');

  noButtonTimer = window.setTimeout(() => {
    noButton.hidden = true;
  }, 950);
}

noButton?.addEventListener('pointerenter', (event) => {
  if (event.pointerType === 'mouse') playNoButtonPrank();
});

function celebrateYes() {
  if (!responsePanel || !celebrationOverlay || !celebrationBurst) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  celebrationOverlay.classList.add('is-active');
  celebrationOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('celebrating');
  celebrationClose?.focus();
  if (reducedMotion) return;

  const particles = ['❤', '♥', '✦', '✧', '●'];
  const colors = ['#ff8298', '#ffd166', '#b5f3c6', '#ffffff', '#f7c7aa'];

  for (let index = 0; index < 72; index += 1) {
    const particle = document.createElement('span');
    const angle = Math.random() * Math.PI * 2;
    const distance = 150 + Math.random() * Math.max(window.innerWidth, window.innerHeight) * 0.72;
    particle.className = 'celebration-particle';
    particle.setAttribute('aria-hidden', 'true');
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.setProperty('--burst-x', `${Math.cos(angle) * distance}px`);
    particle.style.setProperty('--burst-y', `${Math.sin(angle) * distance}px`);
    particle.style.setProperty('--burst-rotation', `${Math.random() * 720 - 360}deg`);
    particle.style.setProperty('--particle-color', colors[Math.floor(Math.random() * colors.length)]);
    particle.style.setProperty('--particle-size', `${0.8 + Math.random() * 2.1}rem`);
    particle.style.animationDelay = `${Math.random() * 0.25}s`;
    celebrationBurst.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove(), { once: true });
  }
}

function closeCelebration() {
  if (!celebrationOverlay) return;
  celebrationOverlay.classList.remove('is-active');
  celebrationOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('celebrating');
  responseButtons.find((button) => button.dataset.answer === 'yes')?.focus();
}

celebrationClose?.addEventListener('click', closeCelebration);

celebrationOverlay?.addEventListener('click', (event) => {
  if (event.target === celebrationOverlay) closeCelebration();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && celebrationOverlay?.classList.contains('is-active')) {
    closeCelebration();
  }
});

responseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!responseMessage) return;

    const saidYes = button.dataset.answer === 'yes';
    if (!saidYes) {
      responseButtons.forEach((option) => {
        option.classList.remove('is-selected');
        option.setAttribute('aria-pressed', 'false');
      });
      responsePanel?.classList.remove('has-answer');
      responseMessage.textContent = '';
      responseMessage.classList.remove('celebrate-message');
      playNoButtonPrank();
      return;
    }

    responseButtons.forEach((option) => {
      const isSelected = option === button;
      option.classList.toggle('is-selected', isSelected);
      option.setAttribute('aria-pressed', String(isSelected));
    });
    responsePanel?.classList.add('has-answer');
    responseMessage.textContent = 'Parabéns! Você está namorando — pode beijá-lo! 💚';
    responseMessage.classList.remove('celebrate-message');
    void responseMessage.offsetWidth;
    responseMessage.classList.add('celebrate-message');
    celebrateYes();
  });
});

const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}
