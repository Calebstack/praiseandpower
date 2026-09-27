const pageLinks = [
  ['index.html', 'Home'],
  ['about.html', 'About'],
  ['leadership.html', 'Leadership'],
  ['building.html', 'Building project'],
  ['give.html', 'Give'],
  ['contact.html', 'Contact']
];

const headerHost = document.querySelector('[data-site-header]');
const footerHost = document.querySelector('[data-site-footer]');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.body.classList.add(`page-${currentPage.replace('.html', '')}`);

if (headerHost) {
  headerHost.outerHTML = `
      <div class="header-ribbon"><div class="container"><span><i class="bi bi-geo-alt-fill" aria-hidden="true"></i> Redemption Camp, Ogun State</span><span><i class="bi bi-sunrise-fill" aria-hidden="true"></i> Sunday worship · 8:00–11:30 AM</span></div></div>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Praise and Power Zonal Headquarters home">
            <img src="assets/images/logo.png" alt="">
            <span class="brand-name">Praise <span class="brand-amp">&amp;</span> Power<span>Zonal Headquarters</span></span>
          </a>
          <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="site-navigation"><i class="bi bi-list" aria-hidden="true"></i></button>
          <nav class="site-nav" id="site-navigation" aria-label="Main navigation">
            ${pageLinks.map(([href, label]) => `<a href="${href}"${href === currentPage ? ' aria-current="page"' : ''}${href === 'contact.html' ? ' class="nav-visit"' : ''}>${label === 'Contact' ? 'Plan a visit <i class="bi bi-arrow-up-right" aria-hidden="true"></i>' : label}</a>`).join('')}
          </nav>
        </div>
      </header>
    `;
}

if (footerHost) {
  footerHost.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-identity">
            <div class="footer-brand"><img src="assets/images/logo.png" alt=""><strong>Praise <span>&amp;</span> Power<small>Zonal Headquarters</small></strong></div>
            <p class="footer-tagline">Where faith ignites, lives transform, and destiny is fulfilled.</p>
            <div class="footer-socials" aria-label="Social media">
              <a href="https://www.instagram.com/official_praiseandpowerparish/" target="_blank" rel="noreferrer" aria-label="Instagram"><i class="bi bi-instagram" aria-hidden="true"></i></a>
              <a href="https://www.facebook.com/share/1CHg85GJvB/" target="_blank" rel="noreferrer" aria-label="Facebook"><i class="bi bi-facebook" aria-hidden="true"></i></a>
              <a href="https://t.me/praiseandpower" target="_blank" rel="noreferrer" aria-label="Telegram"><i class="bi bi-telegram" aria-hidden="true"></i></a>
            </div>
          </div>
          <div class="footer-col"><h2>Explore</h2><ul>${pageLinks.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul></div>
          <div class="footer-col"><h2>Gather with us</h2><ul><li><p>Sunday worship <span>8:00–11:30 AM</span></p></li><li><p>Digging Deep <span>Tuesday · 6:00 PM</span></p></li><li><p>Faith Clinic <span>Thursday · 6:00 PM</span></p></li></ul></div>
          <div class="footer-col"><h2>Find us</h2><p class="footer-contact"><a href="https://maps.google.com/?q=Redemption+Camp,+Ogun+State,+Nigeria" target="_blank" rel="noreferrer"><i class="bi bi-geo-alt-fill" aria-hidden="true"></i><span>Estate 11, Redemption Camp,<br>Ogun State, Nigeria</span></a></p><p class="footer-contact"><a href="tel:+2348034748050"><i class="bi bi-telephone" aria-hidden="true"></i> +234 803 474 8050</a></p><p class="footer-contact"><a href="mailto:praiseandpower25@gmail.com"><i class="bi bi-envelope" aria-hidden="true"></i> praiseandpower25@gmail.com</a></p></div>
        </div>
        <div class="footer-bottom"><span>&copy; <span data-year></span> Praise and Power Zonal Headquarters</span><a href="contact.html">Plan your visit <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a></div>
      </div>
    </footer>`;
}

document.querySelector('[data-year]')?.replaceChildren(String(new Date().getFullYear()));

const menuToggle = document.querySelector('.nav-toggle');
const siteNavigation = document.querySelector('.site-nav');
menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  menuToggle.innerHTML = `<i class="bi ${expanded ? 'bi-list' : 'bi-x-lg'}" aria-hidden="true"></i>`;
  siteNavigation?.classList.toggle('is-open', !expanded);
});

siteNavigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
  if (menuToggle) menuToggle.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i>';
  siteNavigation.classList.remove('is-open');
}));

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: 0.12 })
  : null;
document.querySelectorAll('.reveal').forEach(element => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('is-visible');
});

document.querySelectorAll('[data-giving-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    const selected = tab.dataset.givingTab;
    document.querySelectorAll('[data-giving-tab]').forEach(button => button.setAttribute('aria-selected', String(button === tab)));
    document.querySelectorAll('[data-giving-panel]').forEach(panel => {
      const active = panel.dataset.givingPanel === selected;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  });
});

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const status = document.querySelector('[data-form-status]');
  const idleButtonContent = submitButton?.innerHTML;
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.innerHTML = '<i class="bi bi-arrow-repeat" aria-hidden="true"></i> Sending...';
  }
  if (status) status.textContent = 'Sending your message...';

  try {
    const payload = Object.fromEntries(new FormData(contactForm).entries());
    payload._replyto = payload.email;
    const response = await fetch('https://formsubmit.co/ajax/praiseandpower25@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok || (result.success !== true && result.success !== 'true')) {
      throw new Error(result.message || 'The message could not be sent.');
    }
    contactForm.reset();
    if (status) status.textContent = '';
    window.alert('Your message has been sent. You will be replied to shortly.');
  } catch (error) {
    if (status) status.textContent = 'We could not send your message. Please try again or email praiseandpower25@gmail.com.';
    window.alert('Your message could not be sent. Please try again or email praiseandpower25@gmail.com.');
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.innerHTML = idleButtonContent;
    }
  }
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
document.querySelectorAll('[data-lightbox]').forEach(button => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.querySelector('img')?.alt || 'Church project photo';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
lightbox?.querySelector('button')?.addEventListener('click', () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
});
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});