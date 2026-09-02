/* ============================================================
   Tolno Education Trust — interactions
   Mobile nav, Projects dropdown, header shadow, active links,
   EN/FR language toggle
   ============================================================ */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');
  var projectsToggle = document.getElementById('projectsToggle');
  var projectsMenu = document.getElementById('projectsMenu');

  var mqMobile = window.matchMedia('(max-width: 960px)');

  /* ---- Current year in footer ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================================
     Language: English is the default (in the HTML); French below.
     ============================================================ */
  var FR = {
    'skip': 'Aller au contenu principal',
    'brand.tag': 'Promouvoir l’éducation pour tous en Guinée',

    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    'nav.stories': 'Histoires',
    'cta.donate': 'Faire un don',
    'cta.ourStory': 'Notre histoire',
    'cta.support': 'Soutenir ce projet',

    't.education': 'Éducation',
    't.school': 'École',
    't.library': 'Bibliothèque',
    't.health': 'Santé',
    't.livelihoods': 'Moyens de subsistance',
    't.water': 'Eau',
    't.collaboration': 'Collaboration',

    'hero.eyebrow': 'Le Tolno Education Trust',
    'hero.h1': 'Promouvoir l’éducation<br /><span class="hl">pour tous en Guinée</span>',
    'hero.lead': 'Nous travaillons aux côtés de la communauté de Millimou, en Guinée, pour construire des écoles, soutenir l’éducation des filles et améliorer l’eau, la santé et les moyens de subsistance — afin de transformer des vies, un enfant à la fois.',
    'hero.verse': '<span aria-hidden="true">« </span>Un enfant, un enseignant, un livre et un stylo peuvent changer le monde.<span aria-hidden="true"> »</span><cite class="quote-author">Malala Yousafzai</cite>',

    'quote.water': '<span aria-hidden="true">« </span>On ne connaît jamais la valeur de l’eau avant que le puits ne soit sec.<span aria-hidden="true"> »</span><cite class="quote-author">Thomas Fuller</cite>',

    'about.eyebrow': 'À propos de l’association',
    'about.h2': 'L’histoire de René',
    'about.caption': 'René Tolno · Fondateur',
    'about.p1': 'René Tolno, ingénieur en construction qualifié, a créé le Tolno Education Trust pour soutenir des projets communautaires dans le village de Millimou et ses environs, en Guinée, en Afrique de l’Ouest.',
    'about.p2': 'René a auparavant collaboré avec diverses ONG à la construction d’écoles, d’hôpitaux, de centres de santé et de projets d’eau et d’assainissement. Il vit aujourd’hui au Royaume-Uni et gère les projets à distance, grâce à une équipe solide et dévouée sur le terrain.',
    'about.p3': 'Il a fondé l’association pour promouvoir l’éducation pour tous dans sa région. René a grandi à Millimou — un territoire royal du sud de la Guinée — et sa famille lui a appris à valoriser l’éducation dès son plus jeune âge, donnant la priorité à sa scolarité malgré leurs très faibles moyens.',
    'about.p4': 'René est convaincu que <strong>l’éducation est un droit fondamental</strong> et que chaque enfant — et chaque adulte — devrait y avoir librement accès, quelles que soient ses ressources financières.',
    'about.quote': '«&nbsp;En 2008, lors d’une visite dans mon village, j’ai passé du temps avec les enfants — à lire des livres, jouer au football et bien plus — et j’ai réalisé qu’il fallait faire beaucoup plus dans la communauté. Mon projet de créer une école est né de là.&nbsp;»',
    'about.p5': 'Ces dernières années, nous avons construit une école de quatre salles de classe, pouvant accueillir plus de 120 enfants.',
    'about.p6': 'Les familles sont désormais enthousiastes à l’idée de l’éducation — celle des filles en particulier.',
    'about.wwdH': 'Ce que nous faisons',
    'about.wwdP': 'Nous promouvons l’éducation des filles, la formation à l’agriculture et le développement communautaire. Grâce à notre entreprise sociale pour les femmes, nous installons des puits à énergie solaire dans les écoles, fournissons du matériel éducatif essentiel et aidons à entretenir et améliorer les installations existantes — en soutenant le système éducatif ainsi que l’éducation de base à la santé et à la nutrition dans les écoles.',

    'hub.eyebrow': 'Notre action',
    'hub.h2': 'Des projets qui changent des vies',
    'hub.sub': 'Découvrez les domaines que nous soutenons dans la communauté de Millimou. Chacun est ouvert à tous.',
    'hub.education.desc': 'Parrainage, livres et plaidoyer pour les filles.',
    'hub.school.desc': 'Une école primaire en pleine croissance à Millimou.',
    'hub.library.desc': 'Des livres et des ressources — et comment en faire don.',
    'hub.health.desc': 'Santé maternelle, premiers secours, hygiène et nutrition.',
    'hub.livelihoods.desc': 'Agriculture, entreprise et autosuffisance.',
    'hub.water.desc': 'Puits, pompes manuelles et approvisionnement solaire.',
    'hub.collaboration.desc': 'Travailler avec l’Église, le gouvernement et la communauté.',

    'eye.education': 'Projets · Éducation',
    'edu.li1': 'Amélioration des bâtiments scolaires, du mobilier et création d’une bibliothèque communautaire.',
    'edu.li2': 'Agrandissement de l’école primaire et distribution de livres via les écoles, les églises et les centres communautaires locaux.',
    'edu.li3': 'Parrainage de l’éducation des filles, du primaire jusqu’à l’université.',
    'edu.li4': 'Plaidoyer pour aider les filles et leurs familles à voir leur rôle au-delà du foyer — comme actrices de la société.',

    'eye.school': 'Projets · École',
    'school.p': 'L’association a fait campagne pour une école dans le village, qui est aujourd’hui en pleine expansion — gérée en collaboration avec le gouvernement. Un nouveau bâtiment scolaire, du mobilier neuf et de meilleures installations nous permettent de créer une classe préparatoire et d’aider encore plus d’enfants.',
    'school.highlight': 'enfants ont réussi l’examen d’entrée en sixième (11+) en <strong>2025</strong> — contre seulement <strong>1</strong> en 2024, grâce à une meilleure qualité d’enseignement.',

    'eye.library': 'Projets · Bibliothèque',
    'library.p': 'Nous espérons créer une bibliothèque pour la communauté — une ressource essentielle pour l’apprentissage des enfants et un véritable atout pour l’école. L’association fait don de livres et de ressources, et notre personnel aide à gérer la bibliothèque, créée en collaboration avec le gouvernement.',
    'lib.donateHead': 'Faire don de livres',
    'lib.donateP': 'Nous accueillons chaleureusement les dons de livres physiques. Si vous avez des livres à offrir, contactez-nous et nous organiserons tout avec vous.',
    'lib.emailBtn': 'Écrivez-nous pour donner des livres',

    'eye.health': 'Projets · Santé',
    'health.sub': 'Soutenir la santé, l’hygiène et le bien-être de base dans toute la communauté.',
    'health.maternalH': 'Santé maternelle',
    'health.maternalP': 'Conseils pour prendre soin des nouveau-nés, aide à l’allaitement, hygiène pour les femmes, et mise en relation des mères avec les infirmières publiques ainsi que des conseils pendant la grossesse.',
    'health.firstaidH': 'Formation aux premiers secours',
    'health.firstaidP': 'Gestes de premiers secours de base, formation à la réanimation (RCP), pansements et soins des blessures, pour pouvoir réagir quand cela compte le plus.',
    'health.nutritionH': 'Nutrition',
    'health.nutritionP': 'Fournir des aliments locaux aux enfants et sensibiliser à une alimentation saine et équilibrée.',
    'health.diseaseH': 'Prévention des maladies',
    'health.diseaseP': 'Sensibilisation aux vaccins disponibles et aux moyens concrets d’empêcher la propagation des infections dans la communauté.',
    'health.hygieneH': 'Hygiène de base',
    'health.hygieneP': 'Se protéger contre des virus comme Ebola — sensibilisation à l’usage du savon, à la propreté des lieux, aux produits d’hygiène, aux moustiquaires et au lavage des mains.',
    'health.dentalH': 'Soins dentaires',
    'health.dentalP': 'Sensibilisation au brossage des dents et distribution de brosses à dents et de dentifrice.',

    'eye.livelihoods': 'Projets · Moyens de subsistance',
    'liv.sub': 'Aider les communautés à gagner leur vie et à devenir autosuffisantes grâce à l’agriculture et à l’entreprise.',
    'liv.li1': 'Soutien aux initiatives agricoles et aux entreprises sociales qui dynamisent les économies locales.',
    'liv.li2': 'Une pépinière de cacao et de café qui offre du travail et des revenus locaux.',
    'liv.li3': 'Des projets visant l’indépendance financière par la micro-entreprise et l’autosuffisance.',
    'liv.li4': 'Encourager les villages à développer leurs propres équipements et, avec une formation, à en assurer l’entretien.',
    'liv.li5': 'La plantation d’arbres, source de bienfaits durables pour toute la communauté.',
    'liv.cap1': 'Pépinière de cacao et de café',
    'liv.cap2': 'De jeunes plants florissants',
    'liv.cap3': 'Planter des arbres pour l’avenir',

    'eye.water': 'Projets · Eau',
    'water.li1': 'Améliorer l’approvisionnement en eau pour tous les membres de la communauté.',
    'water.li2': 'Creuser des puits et transformer les pompes manuelles en systèmes solaires acheminant l’eau directement jusqu’aux maisons.',
    'water.li3': 'Sensibiliser à une agriculture et une construction responsables, afin de ne pas épuiser ni polluer les sources d’eau.',
    'water.p': 'Là où les villages dépendaient autrefois d’une pompe manuelle laborieuse, une nouvelle pompe solaire fournit désormais l’eau plus rapidement — et l’achemine directement jusqu’aux habitations.',

    'eye.collaboration': 'Projets · Collaboration',
    'collab.sub': 'Nos projets sont ouverts à tous et rassemblent des personnes de toutes confessions et convictions.',
    'collab.churchH': 'Église',
    'collab.churchP': 'Nous collaborons avec des églises locales et étrangères pour atteindre les communautés et améliorer l’accès à l’éducation — un principe fondamental de la foi chrétienne au cœur de l’association.',
    'collab.govH': 'Gouvernement',
    'collab.govP': 'Nous travaillons avec les autorités locales et nationales pour améliorer l’éducation, fournir une bibliothèque communautaire, faciliter l’accès aux soins et aux équipements, fournir des livres et des ressources, et obtenir l’autorisation de construire des installations telles que des puits et des systèmes d’eau.',
    'collab.communityH': 'Communauté',
    'collab.communityP': 'Chaque projet est ouvert à tous. Nous organisons le partage d’idées et de compétences au sein de la communauté, rassemblant des personnes de toutes confessions et convictions pour bâtir un avenir commun.',

    'donate.eyebrow': 'S’impliquer',
    'donate.h2': 'Vous pouvez faire la différence',
    'donate.sub': 'Avec votre aide, nous pouvons aller plus loin et soutenir davantage de personnes.',
    'donate.needH': 'Nous avons besoin de votre aide pour…',
    'donate.need1': 'Équiper l’école',
    'donate.need2': 'Améliorer les installations d’eau et d’assainissement',
    'donate.need3': 'Éduquer davantage de personnes',
    'donate.need4': 'Financer des ressources pour la bibliothèque',
    'donate.need5': 'Contribuer à l’éducation à la santé',
    'donate.need6': 'Sensibiliser à la prévention des maladies et à la propreté',
    'donate.paypalH': 'PayPal',
    'donate.paypalP': 'Faites un don rapidement et en toute sécurité en ligne via PayPal.',
    'donate.paypalBtn': 'Faire un don via PayPal',
    'donate.supportH': 'Votre soutien nous aide à :',
    'donate.support1': 'Améliorer l’éducation',
    'donate.support2': 'Équiper l’école et la bibliothèque',
    'donate.support3': 'Améliorer l’eau et l’assainissement',
    'donate.support4': 'Assurer l’éducation à la santé',
    'donate.fees': 'Des frais de traitement des paiements peuvent être déduits des dons.',
    'donate.bankNote': 'Les virements bancaires nous parviennent intégralement, sans frais de traitement.',
    'donate.paypalNote': 'Chaque don contribue directement à l’éducation des enfants de la communauté de Millimou.',
    'donate.bankH': 'Virement bancaire',
    'donate.bankP': 'Faites un don directement par virement bancaire à l’aide des coordonnées ci-dessous.',
    'donate.accName': 'Titulaire du compte',
    'donate.sortCode': 'Code guichet (sort code)',
    'donate.accNumber': 'Numéro de compte',

    'stories.mandela': '<span aria-hidden="true">« </span>L’éducation est l’arme la plus puissante que l’on puisse utiliser pour changer le monde.<span aria-hidden="true"> »</span><cite>Nelson Mandela</cite>',
    'stories.eyebrow': 'Histoires de réussite',
    'stories.h2': 'Rencontrez Fanta',
    'stories.sub': 'Une jeune fille de Millimou — et ce que l’éducation a rendu possible.',
    'stories.fanta.p1': 'Sia Fanta Yombouno est née à Millimou en 2009 et a commencé l’école en 2018, dans l’établissement même que l’association a contribué à faire naître. De sa première à sa dernière année, elle a terminé première de sa classe — et lorsqu’elle a passé le Certificat d’Études Élémentaires (CEE), elle a été la seule élève de son école à être admise.',
    'stories.fanta.p2': 'Son père a décidé de l’envoyer à l’école après avoir vu une femme ingénieure diriger la construction du pont menant à leur village. «&nbsp;Quand j’ai vu que c’était cette femme qui dirigeait les travaux, je me suis dit : je veux que ma fille soit comme elle&nbsp;», raconte-t-il. Aujourd’hui, Fanta rêve de devenir ingénieure à son tour.',
    'stories.fanta.quote': '<span aria-hidden="true">« </span>Aujourd’hui, je suis très fier de Fanta — et tout Millimou est fier. Elle est notre porte-flambeau.<span aria-hidden="true"> »</span><cite>Directeur de l’école, Millimou</cite>',
    'stories.fanta.p3': 'À l’époque, l’école ne comptait que trois salles de classe pour six groupes d’élèves — les enseignants partageaient même un seul tableau en deux. Elle en compte désormais quatre. Avec votre soutien, nous pouvons offrir aux élèves comme Fanta les salles de classe, les enseignants et les ressources que leur talent mérite.',
    'stories.cta': 'Aidez des élèves comme Fanta',

    'footer.verse': '<span aria-hidden="true">« </span>Servez-vous les uns les autres humblement dans l’amour. Car toute la loi s’accomplit dans cette seule parole : tu aimeras ton prochain comme toi-même.<span aria-hidden="true"> »</span> <span class="verse-ref">Galates 5:13–14</span>',
    'footer.livelihoods': 'Subsistance',
    'footer.getInTouch': 'Nous contacter',
    'footer.explore': 'Explorer',
    'footer.charity': 'Association caritative enregistrée n° <a class="charity-link" href="https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5231369?_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_organisationNumber=5231369" target="_blank" rel="noopener noreferrer">1205943</a>',
    'footer.privacy': 'Politique de confidentialité',
    'footer.accessibility': 'Accessibilité',
    'footer.cookies': 'Préférences cookies',
    'footer.backToTop': 'Haut de page ↑'
  };

  var EN_TITLE = document.title;
  var FR_TITLE = 'Tolno Education Trust — Promouvoir l’éducation pour tous en Guinée';

  var langToggle = document.getElementById('langToggle');
  var i18nEls = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  // Capture the original English markup once, so switching back is lossless.
  i18nEls.forEach(function (el) { el.__enHTML = el.innerHTML; });

  function setLang(lang) {
    var fr = lang === 'fr';
    i18nEls.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (fr) {
        if (FR[key] != null) el.innerHTML = FR[key];
      } else {
        el.innerHTML = el.__enHTML;
      }
    });
    document.documentElement.lang = fr ? 'fr' : 'en';
    document.title = fr ? FR_TITLE : EN_TITLE;
    if (langToggle) {
      var label = langToggle.querySelector('.lang-label');
      if (label) label.textContent = fr ? 'EN' : 'FR';
      langToggle.setAttribute('lang', fr ? 'en' : 'fr');
      langToggle.setAttribute('aria-label', fr ? 'Switch to English' : 'Passer au français');
    }
    try { localStorage.setItem('lang', fr ? 'fr' : 'en'); } catch (e) {}
  }

  var savedLang = null;
  try { savedLang = localStorage.getItem('lang'); } catch (e) {}
  setLang(savedLang === 'fr' ? 'fr' : 'en');

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      setLang(document.documentElement.lang === 'fr' ? 'en' : 'fr');
    });
  }

  /* ---- Header shadow on scroll ---- */
  var onScroll = function () {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu toggle ---- */
  function setMobileNav(open) {
    primaryNav.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open && mqMobile.matches ? 'hidden' : '';
  }
  navToggle.addEventListener('click', function () {
    setMobileNav(!primaryNav.classList.contains('open'));
  });

  /* ---- Projects dropdown ---- */
  function setDropdown(open) {
    projectsMenu.classList.toggle('open', open);
    projectsToggle.setAttribute('aria-expanded', String(open));
  }
  var dropdownParent = projectsToggle.closest('.has-dropdown');
  // Click to toggle (reliable on both touch and pointer devices)
  projectsToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setDropdown(!projectsMenu.classList.contains('open'));
  });
  // Close when keyboard focus leaves the dropdown entirely
  dropdownParent.addEventListener('focusout', function (e) {
    if (!dropdownParent.contains(e.relatedTarget)) setDropdown(false);
  });

  /* ---- Close menus on outside click / Escape ---- */
  document.addEventListener('click', function (e) {
    if (!dropdownParent.contains(e.target)) setDropdown(false);
    if (mqMobile.matches && primaryNav.classList.contains('open') &&
        !primaryNav.contains(e.target) && !navToggle.contains(e.target)) {
      setMobileNav(false);
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setDropdown(false);
      if (primaryNav.classList.contains('open')) { setMobileNav(false); navToggle.focus(); }
    }
  });

  /* ---- Close mobile nav after clicking a link ---- */
  primaryNav.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (link) {
      setDropdown(false);
      if (mqMobile.matches) setMobileNav(false);
    }
  });

  /* ---- Reset state when crossing the breakpoint ---- */
  mqMobile.addEventListener('change', function () {
    setMobileNav(false);
    setDropdown(false);
    document.body.style.overflow = '';
  });

  /* ---- Scroll-spy: highlight current section in nav ---- */
  var navLinks = Array.prototype.slice.call(
    primaryNav.querySelectorAll('a[href^="#"]')
  );
  var linkByHash = {};
  navLinks.forEach(function (a) { linkByHash[a.getAttribute('href')] = a; });

  var sections = ['#about', '#projects', '#education', '#school', '#library',
                  '#health', '#livelihoods', '#water', '#collaboration', '#stories', '#donate', '#contact']
    .map(function (id) { return document.querySelector(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove('active'); });
        var hash = '#' + entry.target.id;
        if (linkByHash[hash]) linkByHash[hash].classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();

/* ============================================================
   Key link tracking (Google Analytics 4)
   Fires a distinct GA4 event when a visitor clicks a key contact or
   external link:
     • PayPal donate link           -> donate_click
     • "Email to donate books" link -> email_books_click
     • Any other mailto: email link -> email_contact_click
     • Facebook link                -> facebook_click
     • Instagram link               -> instagram_click
   A single delegated click handler covers every matching link on the
   page, and each click fires exactly one event (the first matching
   type wins), so the donate_click event is never double-counted.
   gtag only exists after the visitor accepts analytics cookies (see
   consent.js), so this respects consent automatically — no event is
   sent unless the visitor has agreed to analytics.
   ============================================================ */
(function () {
  'use strict';

  // Ordered list of link types to detect; the FIRST match wins. Donate is
  // checked before email so a PayPal link never counts as email/social, and
  // the "donate books" email (the only mailto: carrying a Book-donation
  // subject) is checked before the general contact email, so a general
  // mailto: falls through to email_contact_click.
  var TRACKED = [
    { event: 'donate_click',         match: 'a[href*="paypal.com/donate"]', extra: { method: 'paypal' } },
    { event: 'email_books_click',    match: 'a[href^="mailto:"][href*="subject=Book"]' },
    { event: 'email_contact_click',  match: 'a[href^="mailto:"]' },
    { event: 'facebook_click',       match: 'a[href*="facebook.com"]' },
    { event: 'instagram_click',      match: 'a[href*="instagram.com"]' }
  ];

  function linkText(link) {
    var text = (link.textContent || '').replace(/\s+/g, ' ').trim();
    return text || link.getAttribute('aria-label') || link.getAttribute('title') || '';
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;

    for (var i = 0; i < TRACKED.length; i++) {
      var link = e.target.closest(TRACKED[i].match);
      if (!link) continue;

      if (typeof window.gtag === 'function') {
        var params = {
          link_url: link.href,
          link_text: linkText(link),
          page_location: window.location.href,
          transport_type: 'beacon'
        };
        var extra = TRACKED[i].extra;
        if (extra) { for (var k in extra) { if (extra.hasOwnProperty(k)) params[k] = extra[k]; } }
        window.gtag('event', TRACKED[i].event, params);
      }
      return; // one event per click — stop at the first matching type
    }
  });
})();

/* ============================================================
   Currency selector for PayPal donations
   ============================================================ */
(function () {
  'use strict';
  var currencySelect = document.getElementById('currencySelect');
  var paypalLink = document.getElementById('paypalLink');
  var currencyNote = document.getElementById('currencyNote');

  if (!currencySelect || !paypalLink || !currencyNote) return;

  function updateCurrency(code) {
    var baseUrl = 'https://www.paypal.com/donate/?hosted_button_id=6QAJMPKUPJNJQ&currency_code=' + code;
    var returnUrl = '&return=https%3A%2F%2Fwww.tolnoeducationtrust.org.uk%2F';
    var cancelUrl = '&cancel_return=https%3A%2F%2Fwww.tolnoeducationtrust.org.uk%2F';
    paypalLink.href = baseUrl + returnUrl + cancelUrl;

    var isFrench = document.documentElement.lang === 'fr';
    var labels = {
      'GBP': { en: 'British Pounds (GBP)', fr: 'livres sterling (GBP)' },
      'USD': { en: 'US Dollars (USD)', fr: 'dollars americains (USD)' },
      'EUR': { en: 'Euros (EUR)', fr: 'euros (EUR)' }
    };
    var label = labels[code][isFrench ? 'fr' : 'en'];
    var noteText = isFrench
      ? 'Vous ferez un don en ' + label + '.'
      : 'You\'ll donate in ' + label + '.';
    currencyNote.textContent = noteText;
  }

  currencySelect.addEventListener('change', function () {
    updateCurrency(this.value);
  });

  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      updateCurrency(currencySelect.value);
    });
  }
})();

/* ============================================================
   Stories from the CMS
   Reads data/stories.json (edited via /admin) and renders each
   entry as a card under the featured story. Content is inserted
   with textContent (never innerHTML), so editor text can't break
   the page or inject markup. Fails silently — stories are optional.
   ============================================================ */
(function () {
  'use strict';
  var wrap = document.getElementById('moreStories');
  var grid = document.getElementById('storyCards');
  if (!wrap || !grid) return;

  fetch('data/stories.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      var stories = (data && Array.isArray(data.stories)) ? data.stories : [];
      if (!stories.length) return;

      // Most recently added story first (the CMS appends new entries to the end).
      stories = stories.slice().reverse();

      var frag = document.createDocumentFragment();
      stories.forEach(function (s) {
        if (!s || !s.title) return;
        var card = document.createElement('article');
        card.className = 'story-card';

        if (s.image) {
          var img = document.createElement('img');
          img.src = s.image;
          img.alt = s.alt || s.title || '';
          img.loading = 'lazy';
          card.appendChild(img);
        }

        var body = document.createElement('div');
        body.className = 'story-card-body';

        var h = document.createElement('h4');
        h.textContent = s.title;
        body.appendChild(h);

        if (s.body) {
          String(s.body).split(/\n\s*\n/).forEach(function (para) {
            var text = para.trim();
            if (!text) return;
            var p = document.createElement('p');
            p.textContent = text;
            body.appendChild(p);
          });
        }

        card.appendChild(body);
        frag.appendChild(card);
      });

      if (frag.childNodes.length) {
        grid.appendChild(frag);
        wrap.hidden = false;
      }
    })
    .catch(function () { /* stories are non-critical — ignore errors */ });
})();
