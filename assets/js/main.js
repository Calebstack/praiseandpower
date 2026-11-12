(function () {
  'use strict';

  var page = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
  if (page === '') page = 'index';
  document.body.classList.add('page-' + page);
  document.documentElement.classList.add('js');

  var links = [
    ['index.html', 'Home'],
    ['gallery.html', 'Gallery'],
    ['about.html', 'About'],
    ['leadership.html', 'Leadership'],
    ['building.html', 'Building project'],
    ['give.html', 'Giving'],
    ['contact.html', 'Contact']
  ];

  function isCurrent(href) {
    var file = href.replace('.html', '');
    return file === page || (file === 'index' && page === 'index');
  }

  /* ---------- Header ---------- */
  var headerSlot = document.querySelector('[data-site-header]');
  if (headerSlot && !headerSlot.querySelector('.site-header')) {
    var nav = links.map(function (l) {
      return '<a href="' + l[0] + '"' + (isCurrent(l[0]) ? ' aria-current="page"' : '') + '>' + l[1] + '</a>';
    }).join('');
    headerSlot.outerHTML =
      '<div class="scroll-progress" aria-hidden="true"></div>' +
      '<header class="site-header">' +
        '<div class="header-ribbon"><div class="container">' +
          '<span><i class="bi bi-clock-fill"></i> Sundays 8:00 AM – 11:30 AM</span>' +
          '<span><i class="bi bi-geo-alt-fill"></i> Estate 11, Redemption City of God</span>' +
        '</div></div>' +
        '<div class="container header-inner">' +
          '<a class="brand" href="index.html" aria-label="Praise and Power Zonal Headquarters home">' +
            '<img src="assets/images/logo.png" alt="Praise and Power logo">' +
            '<span class="brand-name">Praise <span class="brand-amp">&amp;</span> Power<span>Zonal Headquarters</span></span>' +
          '</a>' +
          '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span class="burger" aria-hidden="true"></span></button>' +
          '<nav class="site-nav" id="site-nav" aria-label="Main">' + nav +
            '<a class="nav-visit" href="contact.html">Plan a visit <i class="bi bi-arrow-up-right"></i></a>' +
          '</nav>' +
        '</div>' +
      '</header>';
  }
  var currentNavLink = document.querySelector('.site-nav a[href="' + page + '.html"]');
  if (currentNavLink) currentNavLink.setAttribute('aria-current', 'page');

  /* ---------- Footer ---------- */
  var footerSlot = document.querySelector('[data-site-footer]');
  if (footerSlot) {
    footerSlot.outerHTML =
      '<footer class="site-footer"><div class="container">' +
        '<div class="footer-cta"><div><p class="eyebrow">New here? Start right here.</p><p class="footer-cta-title">There is a seat with your name on it.</p></div><a class="button button--light" href="contact.html">Plan your visit <i class="bi bi-arrow-up-right"></i></a></div>' +
        '<div class="footer-grid">' +
          '<div class="footer-col footer-about">' +
            '<div class="footer-brand"><img src="assets/images/logo.png" alt="Praise and Power logo"><strong>Praise <span>&amp;</span> Power<small>Zonal Headquarters</small></strong></div>' +
            '<p class="footer-tagline">A place to belong. A faith to grow. Come as you are; grace has already made room for you.</p>' +
            '<div class="footer-socials" aria-label="Social media">' +
              '<a href="https://www.instagram.com/official_praiseandpowerparish/" target="_blank" rel="noreferrer" aria-label="Instagram"><i class="bi bi-instagram" aria-hidden="true"></i></a>' +
              '<a href="https://www.facebook.com/share/1CHg85GJvB/" target="_blank" rel="noreferrer" aria-label="Facebook"><i class="bi bi-facebook" aria-hidden="true"></i></a>' +
              '<a href="https://t.me/praiseandpower" target="_blank" rel="noreferrer" aria-label="Telegram"><i class="bi bi-telegram" aria-hidden="true"></i></a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-col"><h2>Explore</h2><ul>' +
            links.map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + '</a></li>'; }).join('') +
          '</ul></div>' +
          '<div class="footer-col"><h2>Service times</h2><ul>' +
            '<li><p>Sunday worship<span>8:00 AM – 11:30 AM</span></p></li>' +
            '<li><p>Digging Deep (Tuesday)<span>6:00 PM</span></p></li>' +
            '<li><p>Faith Clinic (Thursday)<span>6:00 PM</span></p></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h2>Find us</h2>' +
            '<p>Estate 11, Redemption City of God<br>Ogun State, Nigeria</p>' +
            '<p class="footer-contact"><a href="tel:+2348034748050"><i class="bi bi-telephone-fill"></i> +234 803 474 8050</a></p>' +
            '<p class="footer-contact"><a href="mailto:praiseandpower25@gmail.com"><i class="bi bi-envelope-fill"></i> praiseandpower25@gmail.com</a></p>' +
            '<p class="footer-contact"><a href="https://maps.google.com/?q=Redemption+City+of+God,+Ogun+State,+Nigeria" target="_blank" rel="noreferrer"><i class="bi bi-geo-alt-fill"></i> Get directions</a></p>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom"><span>&copy; <span data-year></span> Praise and Power Zonal Headquarters. All rights reserved.</span><a href="#top">Back to top &uarr;</a></div>' +
      '</div></footer>';
    var y = document.querySelector('[data-year]');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');
  if (toggle && siteNav) {
    toggle.addEventListener('click', function () {
      var open = siteNav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      toggle.classList.toggle('is-open', open);
    });
  }

  /* ---------- Scroll progress + header state ---------- */
  var bar = document.querySelector('.scroll-progress');
  var header = document.querySelector('.site-header');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
    if (header) header.classList.toggle('is-scrolled', h.scrollTop > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll (with stagger) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Fundraising bar + counters ---------- */
  var track = document.querySelector('.progress-track');
  if (track && 'IntersectionObserver' in window) {
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { track.classList.add('is-filled'); tio.disconnect(); }
      });
    }, { threshold: 0.4 });
    tio.observe(track);
  } else if (track) {
    track.classList.add('is-filled');
  }

  /* ---------- Giving tabs ---------- */
  var tabs = document.querySelectorAll('[data-giving-tab]');
  var panels = document.querySelectorAll('[data-giving-panel]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var key = tab.getAttribute('data-giving-tab');
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t === tab ? 'true' : 'false'); });
      panels.forEach(function (p) {
        var on = p.getAttribute('data-giving-panel') === key;
        p.classList.toggle('is-active', on);
        if (on) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var closeLb = function () {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    };
    document.querySelectorAll('[data-lightbox]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        lbImg.src = btn.getAttribute('data-lightbox');
        lbImg.alt = (btn.querySelector('img') || {}).alt || '';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.closest('button')) closeLb();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }

  /* ---------- Contact form (keeps FormSubmit action) ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', function () {
      if (status) status.textContent = 'Sending your message…';
    });
  }

  /* ---------- Hero parallax tilt ---------- */
  var heroPhoto = document.querySelector('.hero-photo');
  if (heroPhoto && window.matchMedia('(hover:hover) and (min-width: 901px)').matches) {
    heroPhoto.addEventListener('mousemove', function (e) {
      var r = heroPhoto.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      heroPhoto.style.setProperty('--tx', (x * 10).toFixed(2) + 'px');
      heroPhoto.style.setProperty('--ty', (y * 10).toFixed(2) + 'px');
    });
    heroPhoto.addEventListener('mouseleave', function () {
      heroPhoto.style.setProperty('--tx', '0px');
      heroPhoto.style.setProperty('--ty', '0px');
    });
  }

  /* ---------- Chatbot (rule-based, uses only site facts) ---------- */
  var KB = [
    { k: ['sunday', 'service time', 'worship time', 'when', 'what time', 'times', 'schedule'],
      a: 'Sunday worship holds every Sunday from 8:00 AM to 11:30 AM. Digging Deep (Bible study) is every Tuesday at 6:00 PM, and Faith Clinic (prayer & worship) is every Thursday at 6:00 PM.' },
    { k: ['tuesday', 'bible study', 'digging'],
      a: 'Digging Deep is our Bible study, every Tuesday at 6:00 PM. Explore the Word and bring faith into everyday life.' },
    { k: ['thursday', 'faith clinic', 'prayer'],
      a: 'Faith Clinic is our corporate intercession and worship, every Thursday at 6:00 PM. Come and pray with us.' },
    { k: ['where', 'location', 'address', 'direction', 'find you', 'map'],
      a: 'We are at Estate 11, Redemption City of God, Ogun State, Nigeria. You can get directions on the Contact page.',
      link: ['contact.html', 'Open Contact page'] },
    { k: ['phone', 'call', 'number', 'email', 'mail', 'contact', 'reach'],
      a: 'You can call +234 803 474 8050 or email praiseandpower25@gmail.com. You can also send a message from the Contact page.',
      link: ['contact.html', 'Open Contact page'] },
    { k: ['first visit', 'first time', 'new here', 'visit', 'newcomer', 'guest'],
      a: 'Welcome! Your first Sunday is on us. Come as you are; first-time guests are very welcome. Services start at 8:00 AM on Sundays at Estate 11, Redemption City of God.',
      link: ['contact.html', 'Plan your visit'] },
    { k: ['pastor', 'leader', 'leadership', 'head', 'usher', 'media', 'choir', 'protocol'],
      a: 'Our Zonal Pastor is Pastor Olusegun Ogunsanwo. Department heads include Dcns. Silas Akinsipe (Media), Dcns. Remi Jibodu (Protocol) and Sis. Helen Delight (Choir).',
      link: ['leadership.html', 'Meet the leadership'] },
    { k: ['building', 'project', 'construction', 'raised', 'goal', 'seating', 'dedication'],
      a: 'The building project launched in 2025, with a planned seating capacity of 5,000. It is in Phase 2 (roofing & walls), with a 2027 target for dedication. The latest supplied update records ₦45,000,000 raised toward a ₦200,000,000 goal.',
      link: ['building.html', 'See the building project'] },
    { k: ['give', 'giving', 'tithe', 'offering', 'account', 'bank', 'donate', 'welfare', 'missions', 'seed'],
      a: 'You can give by bank transfer to tithes & offerings, welfare, Good Women (Daughter\'s Purse), children, or missions (Let\'s Go A Fishing). Account details are on the Giving page.',
      link: ['give.html', 'Open Giving page'] },
    { k: ['mission', 'vision', 'value', 'believe', 'belief', 'story', 'about'],
      a: 'Our mission is to love God passionately, make disciples intentionally, and transform our world practically, one life at a time. Our values: Faith, Love, Integrity, Excellence, Community.',
      link: ['about.html', 'Read our story'] },
    { k: ['men', 'women', 'youth', 'young', 'worship team', 'ministry', 'ministries', 'fellowship', 'join'],
      a: 'We have Men\'s Fellowship, Women\'s Ministry, Youth & Young Adults, and the Worship Team. Get in touch and we will help you connect with a team.',
      link: ['contact.html', 'Get in touch'] },
    { k: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'peace'],
      a: 'Hello, and welcome to Praise and Power! How can I help you today?' },
    { k: ['thank', 'thanks'],
      a: 'You are most welcome. God bless you!' }
  ];
  var CHIPS = ['Service times', 'Where are you?', 'First visit', 'How to give', 'Building project'];

  function answer(q) {
    var t = q.toLowerCase();
    var best = null, score = 0;
    KB.forEach(function (item) {
      var s = 0;
      item.k.forEach(function (kw) { if (t.indexOf(kw) !== -1) s += kw.length; });
      if (s > score) { score = s; best = item; }
    });
    return best || {
      a: 'I am not sure about that one. You can reach our team on +234 803 474 8050 or at praiseandpower25@gmail.com, or send a message from the Contact page.',
      link: ['contact.html', 'Open Contact page']
    };
  }

  var bot = document.createElement('div');
  bot.className = 'chatbot';
  bot.innerHTML =
    '<button class="chatbot-fab" type="button" aria-expanded="false" aria-controls="chatbot-panel" aria-label="Open chat">' +
      '<i class="bi bi-chat-heart-fill chatbot-icon-open"></i><i class="bi bi-x-lg chatbot-icon-close"></i>' +
    '</button>' +
    '<section class="chatbot-panel" id="chatbot-panel" aria-label="Chat with Praise and Power" hidden>' +
      '<header class="chatbot-head"><img src="assets/images/logo.png" alt=""><div><strong>Praise &amp; Power</strong><span>Ask us anything</span></div></header>' +
      '<div class="chatbot-body" aria-live="polite"></div>' +
      '<div class="chatbot-chips"></div>' +
      '<form class="chatbot-form"><input type="text" placeholder="Type your question…" aria-label="Your question" autocomplete="off"><button type="submit" aria-label="Send"><i class="bi bi-send-fill"></i></button></form>' +
    '</section>';
  document.body.appendChild(bot);

  var fab = bot.querySelector('.chatbot-fab');
  var panel = bot.querySelector('.chatbot-panel');
  var body = bot.querySelector('.chatbot-body');
  var chips = bot.querySelector('.chatbot-chips');
  var cform = bot.querySelector('.chatbot-form');
  var cinput = cform.querySelector('input');
  var greeted = false;

  function addMsg(text, who, link) {
    var m = document.createElement('div');
    m.className = 'chatbot-msg chatbot-msg--' + who;
    m.textContent = text;
    if (link) {
      var a = document.createElement('a');
      a.href = link[0];
      a.textContent = link[1] + ' →';
      m.appendChild(document.createElement('br'));
      m.appendChild(a);
    }
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
  }

  function ask(q) {
    if (!q.trim()) return;
    addMsg(q, 'user');
    var typing = document.createElement('div');
    typing.className = 'chatbot-msg chatbot-msg--bot chatbot-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;
    setTimeout(function () {
      typing.remove();
      var r = answer(q);
      addMsg(r.a, 'bot', r.link);
    }, 650);
  }

  CHIPS.forEach(function (c) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = c;
    b.addEventListener('click', function () { ask(c); });
    chips.appendChild(b);
  });

  fab.addEventListener('click', function () {
    var open = panel.hasAttribute('hidden');
    if (open) {
      panel.removeAttribute('hidden');
      requestAnimationFrame(function () { bot.classList.add('is-open'); });
      if (!greeted) {
        greeted = true;
        addMsg('Hello, and welcome! I can help with service times, directions, giving, the building project and more.', 'bot');
      }
      setTimeout(function () { cinput.focus(); }, 250);
    } else {
      bot.classList.remove('is-open');
      setTimeout(function () { panel.setAttribute('hidden', ''); }, 250);
    }
    fab.setAttribute('aria-expanded', open ? 'true' : 'false');
    fab.setAttribute('aria-label', open ? 'Close chat' : 'Open chat');
  });

  cform.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = cinput.value;
    cinput.value = '';
    ask(q);
  });
})();
/* ===== Praise & Power: effects module (runs after main.js) ===== */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isHome = d.body.classList.contains('page-index');
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function store(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) {} }

  /* ---------- Dark sections (rhythm) ---------- */
  ['.ministry-grid', '.statement-grid', '.about-gatherings', '.service-list', '.giving-accounts', '.project-fund-section'].forEach(function (sel) {
    var el = $(sel), s = el && el.closest('section');
    if (s) s.classList.add('is-dark');
  });

  /* ---------- Split headline words ---------- */
  var wi;
  function splitNode(node) {
    Array.prototype.slice.call(node.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = d.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(d.createTextNode(' ')); return; }
          var w = d.createElement('span'); w.className = 'word';
          var i = d.createElement('span'); i.textContent = part; i.style.setProperty('--i', wi++);
          w.appendChild(i); frag.appendChild(w);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1) { splitNode(n); }
    });
  }
  var splitEls = $$('.home-hero h1, .page-intro h1, .project-hero h1, main h2');
  splitEls.forEach(function (el) {
    if (el.closest('.footer-cta, .chatbot')) return;
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    wi = 0; splitNode(el); el.classList.add('split');
    $$('.word', el).forEach(function (w) { w.setAttribute('aria-hidden', 'true'); });
  });
  var heroH = $$('.home-hero h1, .page-intro h1, .project-hero h1');
  function showHero() { heroH.forEach(function (h) { h.classList.add('is-in'); }); root.classList.add('hero-go'); }
  if ('IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); sio.unobserve(e.target); } });
    }, { threshold: 0.35 });
    splitEls.forEach(function (el) { if (heroH.indexOf(el) < 0) sio.observe(el); });
  } else { splitEls.forEach(function (el) { el.classList.add('is-in'); }); }

  /* ---------- Intro (home, once per session) ---------- */
  if (isHome && !store('pp-intro') && !reduce) {
    store('pp-intro', '1');
    var pre = d.createElement('div');
    pre.className = 'preloader';
    pre.innerHTML = '<div class="pre-inner"><div class="pre-ring"></div><img src="assets/images/logo.png" alt=""><p>Praise <span>&amp;</span> Power</p><small>Zonal Headquarters</small><div class="pre-bar"><i></i></div></div>';
    d.body.appendChild(pre);
    root.classList.add('is-intro');
    setTimeout(function () { pre.classList.add('is-leaving'); showHero(); }, 1900);
    setTimeout(function () { pre.remove(); root.classList.remove('is-intro'); }, 2900);
  } else { setTimeout(showHero, 80); }

  /* ---------- Hero light layers + particles ---------- */
  function particles(host, count) {
    if (reduce) return;
    var c = d.createElement('canvas'); c.className = 'fx-canvas'; c.setAttribute('aria-hidden', 'true');
    host.insertBefore(c, host.firstChild);
    var g = c.getContext('2d'), W, H, dpr = Math.min(window.devicePixelRatio || 1, 2), P = [], run = true, raf;
    var cols = ['255,223,138', '255,255,255', '43,224,122'];
    function size() { W = host.clientWidth; H = host.clientHeight; c.width = W * dpr; c.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function mk(initial) {
      return { x: Math.random() * W, y: initial ? Math.random() * H : H + 10, r: Math.random() * 2.2 + .6, s: Math.random() * .5 + .15,
        a: Math.random() * .6 + .2, ph: Math.random() * 6.28, col: cols[(Math.random() * 3) | 0] };
    }
    size();
    var n = window.innerWidth < 700 ? Math.round(count / 2) : count;
    for (var i = 0; i < n; i++) P.push(mk(true));
    function frame(t) {
      if (run) {
        g.clearRect(0, 0, W, H);
        P.forEach(function (p, i) {
          p.y -= p.s; p.x += Math.sin(t / 1800 + p.ph) * .25;
          if (p.y < -10) P[i] = mk(false);
          var tw = .55 + .45 * Math.sin(t / 700 + p.ph);
          var gr = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
          gr.addColorStop(0, 'rgba(' + p.col + ',' + (p.a * tw) + ')'); gr.addColorStop(1, 'rgba(' + p.col + ',0)');
          g.fillStyle = gr; g.beginPath(); g.arc(p.x, p.y, p.r * 5, 0, 6.283); g.fill();
        });
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', size);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { run = es[0].isIntersecting; }).observe(host);
  }
  $$('.home-hero, .page-intro, .project-hero, .home-visit-section, .leadership-cta, .site-footer').forEach(function (h) {
    var spot = d.createElement('div'); spot.className = 'hero-spot'; spot.setAttribute('aria-hidden', 'true');
    h.insertBefore(spot, h.firstChild);
    particles(h, h.classList.contains('site-footer') ? 26 : 46);
    if (fine) h.addEventListener('mousemove', function (e) {
      var r = h.getBoundingClientRect();
      spot.style.setProperty('--mx', (e.clientX - r.left) + 'px'); spot.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- Home hero extras ---------- */
  var hp = $('.hero-photo');
  if (hp) {
    var badge = d.createElement('div'); badge.className = 'hero-badge'; badge.setAttribute('aria-hidden', 'true');
    badge.innerHTML = '<svg viewBox="0 0 200 200"><defs><path id="hb" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><text><textPath href="#hb" startOffset="0">PRAISE &amp; POWER ✦ ZONAL HEADQUARTERS ✦ PRAISE &amp; POWER ✦ </textPath></text></svg><img src="assets/images/logo.png" alt="">';
    hp.appendChild(badge);
  }
  var hero = $('.home-hero');
  if (hero) {
    var cue = d.createElement('button'); cue.type = 'button'; cue.className = 'scroll-cue'; cue.setAttribute('aria-label', 'Scroll down');
    cue.innerHTML = '<span><i></i></span>Scroll';
    cue.addEventListener('click', function () { window.scrollBy({ top: window.innerHeight * .85, behavior: 'smooth' }); });
    hero.appendChild(cue);
  }

  /* ---------- Marquees ---------- */
  function track(inner, reverse, speed) {
    var t = d.createElement('div'); t.className = 'mq-track' + (reverse ? ' is-rev' : '');
    t.style.setProperty('--mq', speed + 's');
    t.innerHTML = inner + inner; return t;
  }
  var wb = $('.welcome-band-inner');
  if (wb) {
    var p = $('p', wb), a = $('a', wb), item = p.innerHTML, one = '';
    for (var k = 0; k < 4; k++) one += '<span class="mq-item">' + item + '</span><i class="bi bi-stars mq-dot" aria-hidden="true"></i>';
    p.className = 'sr-only';
    var wrap = d.createElement('div'); wrap.className = 'mq-viewport'; wrap.setAttribute('aria-hidden', 'true');
    wrap.appendChild(track(one, false, 60));
    wb.insertBefore(wrap, wb.firstChild);
    wb.parentNode.classList.add('is-marquee');
  }
  var band = $('.welcome-band');
  if (band) {
    var words = ['Praise', 'Power', 'Faith', 'Love', 'Integrity', 'Excellence', 'Community'], row = '';
    words.forEach(function (w, i) { row += '<span class="mq-word' + (i % 2 ? ' is-fill' : '') + '">' + w + '</span><i class="bi bi-brightness-high-fill mq-sun" aria-hidden="true"></i>'; });
    var mw = d.createElement('div'); mw.className = 'marquee-words'; mw.setAttribute('aria-hidden', 'true');
    var v1 = d.createElement('div'); v1.className = 'mq-viewport'; v1.appendChild(track(row, false, 55));
    var v2 = d.createElement('div'); v2.className = 'mq-viewport'; v2.appendChild(track(row, true, 70));
    mw.appendChild(v1); mw.appendChild(v2);
    band.parentNode.insertBefore(mw, band);
  }

  /* ---------- Tilt + spotlight ---------- */
  var tiltSel = '.gathering-card, .ministry-item, .belief, .statement, .department-card, .giving-purpose, .giving-item, .service-row, .project-fact, .contact-detail, .invite-visit';
  if (fine && !reduce) {
    $$(tiltSel).forEach(function (el) {
      el.setAttribute('data-tilt', '');
      var s = d.createElement('span'); s.className = 'spot'; s.setAttribute('aria-hidden', 'true'); el.appendChild(s);
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--rx', ((.5 - y) * 9).toFixed(2) + 'deg');
        el.style.setProperty('--ry', ((x - .5) * 11).toFixed(2) + 'deg');
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%'); el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
      el.addEventListener('mouseleave', function () { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    });
    /* magnetic buttons */
    $$('.button, .nav-visit, .giving-tabs button').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.translate = ((e.clientX - r.left - r.width / 2) * .22).toFixed(1) + 'px ' + ((e.clientY - r.top - r.height / 2) * .3).toFixed(1) + 'px';
      });
      b.addEventListener('mouseleave', function () { b.style.translate = ''; });
    });
  }

  /* ---------- Custom cursor ---------- */
  if (fine && !reduce) {
    var dot = d.createElement('div'), ring = d.createElement('div');
    dot.className = 'cursor-dot'; ring.className = 'cursor-ring';
    d.body.appendChild(ring); d.body.appendChild(dot);
    var mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; root.classList.add('has-cursor'); dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)'; });
    (function loop() { rx += (mx - rx) * .16; ry += (my - ry) * .16; ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)'; requestAnimationFrame(loop); })();
    d.addEventListener('mouseover', function (e) { ring.classList.toggle('is-hover', !!e.target.closest('a, button, input, textarea, [data-lightbox], .gallery-photo')); });
    d.addEventListener('mouseleave', function () { root.classList.remove('has-cursor'); });
  }

  /* ---------- Counters ---------- */
  function countUp(el) {
    var m = el.textContent.trim().match(/^([^\d]*)(\d{1,3}(?:,\d{3})+)$/);
    if (!m) return;
    var target = parseInt(m[2].replace(/,/g, ''), 10), pre = m[1], t0 = null, dur = 2000;
    el.textContent = pre + '0';
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min((t - t0) / dur, 1), e = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
      el.textContent = pre + Math.round(target * e).toLocaleString('en-US');
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = $$('.project-fact strong, .project-raised-stat strong');
  if ('IntersectionObserver' in window && !reduce) {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } });
    }, { threshold: .6 });
    counters.forEach(function (c) { if (/\d,\d{3}/.test(c.textContent)) cio.observe(c); });
  }

  /* ---------- Parallax ---------- */
  var par = $$('.story-photo img, .project-hero > img, .pastor-portrait img, .account-highlight img');
  if (par.length && !reduce) {
    var tick = false;
    function pl() {
      par.forEach(function (el) {
        var r = el.getBoundingClientRect(), vh = window.innerHeight;
        if (r.bottom < -100 || r.top > vh + 100) return;
        var k = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.setProperty('--py', (k * -42).toFixed(1) + 'px');
      });
      tick = false;
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(pl); } }, { passive: true });
    pl();
  }

  /* ---------- Generic lightbox for home gallery ---------- */
  var lb = $('.lightbox');
  if (!lb && $('.gallery-photo')) {
    lb = d.createElement('div'); lb.className = 'lightbox'; lb.setAttribute('aria-hidden', 'true');
    lb.innerHTML = '<button type="button" aria-label="Close photo">&times;</button><img src="" alt="">';
    d.body.appendChild(lb);
    var li = $('img', lb);
    var close = function () { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); };
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.closest('button')) close(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    $$('.gallery-photo').forEach(function (f) {
      f.setAttribute('tabindex', '0');
      var open = function () { var im = $('img', f); li.src = im.getAttribute('src'); li.alt = im.alt; lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); };
      f.addEventListener('click', function (e) { if (!e.target.closest('a')) open(); });
      f.addEventListener('keydown', function (e) { if (e.target === f && e.key === 'Enter') open(); });
    });
  }

  /* ---------- Back to top ---------- */
  var top = d.createElement('button'); top.type = 'button'; top.className = 'to-top'; top.setAttribute('aria-label', 'Back to top');
  top.innerHTML = '<i class="bi bi-arrow-up"></i>';
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  d.body.appendChild(top);
  window.addEventListener('scroll', function () { top.classList.toggle('is-on', window.scrollY > 700); }, { passive: true });

  /* ---------- Chatbot teaser ---------- */
  var cb = $('.chatbot');
  if (cb) {
    var tz = d.createElement('div'); tz.className = 'chatbot-teaser'; tz.innerHTML = 'Need help? Ask me <b>✦</b>';
    cb.appendChild(tz);
    setTimeout(function () { if (!cb.classList.contains('is-open')) tz.classList.add('is-on'); }, 6000);
    setTimeout(function () { tz.classList.remove('is-on'); }, 16000);
    $('.chatbot-fab', cb).addEventListener('click', function () { tz.classList.remove('is-on'); });
  }
})();
