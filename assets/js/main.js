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

if (headerHost) {
  headerHost.innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="Praise and Power Zonal Headquarters home">
          <img src="assets/images/logo.png" alt="">
          <span class="brand-name">Praise and Power<span>Zonal Headquarters</span></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">Menu</button>
        <nav class="site-nav" id="site-navigation" aria-label="Main navigation">
          ${pageLinks.map(([href, label]) => `<a href="${href}"${href === currentPage ? ' aria-current="page"' : ''}${href === 'contact.html' ? ' class="nav-visit"' : ''}>${label === 'Contact' ? 'Plan a visit' : label}</a>`).join('')}
        </nav>
      </div>
    </header>`;
}

if (footerHost) {
  footerHost.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand"><img src="assets/images/logo.png" alt=""><strong>Praise and Power<br>Zonal Headquarters</strong></div>
            <p class="footer-tagline">Where faith ignites, lives transform, and destiny is fulfilled.</p>
          </div>
          <div class="footer-col"><h2>Explore</h2><ul>${pageLinks.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul></div>
          <div class="footer-col"><h2>Gather with us</h2><ul><li><p>Sunday worship · 8:00–11:30 AM</p></li><li><p>Tuesday · 6:00 PM</p></li><li><p>Thursday · 6:00 PM</p></li></ul></div>
          <div class="footer-col"><h2>Find us</h2><p>Estate 11, Redemption Camp,<br>Ogun State, Nigeria</p><p style="margin-top:10px"><a href="tel:+2348034748050">+234 803 474 8050</a></p><p><a href="mailto:praiseandpower25@gmail.com">praiseandpower25@gmail.com</a></p><p style="margin-top:10px"><a href="https://www.instagram.com/official_praiseandpowerparish/" target="_blank" rel="noreferrer">Instagram</a> · <a href="https://www.facebook.com/share/1CHg85GJvB/" target="_blank" rel="noreferrer">Facebook</a> · <a href="https://t.me/praiseandpower" target="_blank" rel="noreferrer">Telegram</a></p></div>
        </div>
        <div class="footer-bottom">&copy; <span data-year></span> Praise and Power Zonal Headquarters. All rights reserved.</div>
      </div>
    </footer>`;
}

document.querySelector('[data-year]')?.replaceChildren(String(new Date().getFullYear()));

const menuToggle = document.querySelector('.nav-toggle');
const siteNavigation = document.querySelector('.site-nav');
menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  siteNavigation?.classList.toggle('is-open', !expanded);
});

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
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(contactForm);
  const subject = encodeURIComponent(fields.get('subject') || 'Website message');
  const body = encodeURIComponent(`From: ${fields.get('name')}\nEmail: ${fields.get('email')}\nPhone: ${fields.get('phone') || 'Not provided'}\n\n${fields.get('message')}`);
  const status = document.querySelector('[data-form-status]');
  if (status) status.textContent = 'Your email app is opening with your message ready to send.';
  window.location.href = `mailto:praiseandpower25@gmail.com?subject=${subject}&body=${body}`;
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