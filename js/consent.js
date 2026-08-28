/* Tolno Education Trust — cookie consent + consent-gated Google Analytics 4.
   GA4 is loaded ONLY after the visitor clicks "Accept". The choice is stored in
   localStorage ('cookie-consent' = 'granted' | 'denied') and shared across pages.
   Bilingual: reads the current language from the shared 'lang' key / <html lang>. */
(function () {
  'use strict';

  var GA_ID = 'G-JX678C427V';
  var CONSENT_KEY = 'cookie-consent';
  var LANG_KEY = 'lang';

  var STR = {
    en: {
      aria: 'Cookie consent',
      title: 'Cookies on this site',
      body: 'We’d like to use Google Analytics cookies to understand how visitors use our site so we can improve it. We’ll only do this if you agree — the site works fine without them.',
      policy: 'Read our Privacy Policy',
      accept: 'Accept',
      decline: 'Decline'
    },
    fr: {
      aria: 'Consentement aux cookies',
      title: 'Cookies sur ce site',
      body: 'Nous aimerions utiliser des cookies Google Analytics pour comprendre comment les visiteurs utilisent notre site afin de l’améliorer. Nous ne le ferons qu’avec votre accord — le site fonctionne parfaitement sans eux.',
      policy: 'Lire notre politique de confidentialité',
      accept: 'Accepter',
      decline: 'Refuser'
    }
  };

  function getLang() {
    // Prefer the live <html lang> attribute — both language systems set it, and
    // on the main page it is updated before localStorage, so it is the freshest
    // source when reacting to a language toggle.
    var l = document.documentElement.lang;
    if (!l) { try { l = localStorage.getItem(LANG_KEY); } catch (e) {} }
    return l === 'fr' ? 'fr' : 'en';
  }
  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function setConsent(v) {
    try { localStorage.setItem(CONSENT_KEY, v); } catch (e) {}
  }

  /* ---------- Google Analytics 4 ---------- */
  var gaLoaded = false;
  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }
  function deleteGACookies() {
    var host = location.hostname;
    var rootDomain = host.split('.').slice(-2).join('.');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0 || name === '_gid' || name.indexOf('_gat') === 0) {
        ['/', ''].forEach(function (path) {
          [host, '.' + host, '.' + rootDomain, ''].forEach(function (d) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=' + (path || '/') +
              (d ? '; domain=' + d : '');
          });
        });
      }
    });
  }

  /* ---------- Banner ---------- */
  var banner = null;

  function buildBanner() {
    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<div class="cookie-banner-text">' +
          '<p class="cookie-banner-title"></p>' +
          '<p class="cookie-banner-body"></p>' +
        '</div>' +
        '<div class="cookie-banner-actions">' +
          '<a class="cookie-banner-link" href="privacy.html"></a>' +
          '<button type="button" class="btn btn-outline cookie-decline"></button>' +
          '<button type="button" class="btn btn-accent cookie-accept"></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('.cookie-accept').addEventListener('click', function () {
      setConsent('granted');
      hideBanner();
      loadGA();
    });
    banner.querySelector('.cookie-decline').addEventListener('click', function () {
      var reload = (getConsent() === 'granted') || gaLoaded;
      setConsent('denied');
      hideBanner();
      if (reload) { deleteGACookies(); location.reload(); }
    });

    applyLang();
  }

  function applyLang() {
    if (!banner) return;
    var t = STR[getLang()];
    banner.setAttribute('aria-label', t.aria);
    banner.querySelector('.cookie-banner-title').textContent = t.title;
    banner.querySelector('.cookie-banner-body').textContent = t.body;
    banner.querySelector('.cookie-banner-link').textContent = t.policy;
    banner.querySelector('.cookie-decline').textContent = t.decline;
    banner.querySelector('.cookie-accept').textContent = t.accept;
  }

  function showBanner() {
    if (!banner) buildBanner();
    // Force a reflow so the entrance transition runs. (requestAnimationFrame is
    // unreliable here: browsers pause rAF callbacks in non-foreground tabs.)
    void banner.offsetWidth;
    banner.classList.add('is-visible');
  }
  function hideBanner() {
    if (banner) banner.classList.remove('is-visible');
  }

  /* ---------- "Cookie preferences" links in footers ---------- */
  function wireSettings() {
    var links = document.querySelectorAll('[data-cookie-settings]');
    Array.prototype.forEach.call(links, function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        showBanner();
      });
    });
  }

  /* ---------- React to language toggle (both pages set <html lang>) ---------- */
  function observeLang() {
    try {
      new MutationObserver(applyLang).observe(document.documentElement, {
        attributes: true, attributeFilter: ['lang']
      });
    } catch (e) {}
  }

  function init() {
    var consent = getConsent();
    if (consent === 'granted') {
      loadGA();
    } else if (consent !== 'denied') {
      showBanner();
    }
    wireSettings();
    observeLang();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
