(function () {
  // menu mobile
  var m = document.getElementById('mnav');
  var openB = document.querySelector('.menu-btn');
  if (m && openB) {
    var closeB = m.querySelector('.close');
    var set = function (o) {
      m.classList.toggle('open', o);
      openB.setAttribute('aria-expanded', o ? 'true' : 'false');
      document.body.style.overflow = o ? 'hidden' : '';
      if (o) closeB.focus(); else openB.focus();
    };
    openB.addEventListener('click', function () { set(true); });
    closeB.addEventListener('click', function () { set(false); });
    m.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  }

  // reveal allo scroll
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // anno
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // form contatti -> WhatsApp
  var f = document.getElementById('form');
  if (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = document.getElementById('form-err');
      var nome = f.nome.value.trim(), msg = f.messaggio.value.trim();
      if (!nome || !msg || !f.consenso.checked) {
        err.textContent = 'Compila nome, messaggio e accetta il trattamento dei dati.';
        return;
      }
      err.textContent = '';
      var serv = Array.prototype.map.call(f.querySelectorAll('input[name="servizi"]:checked'), function (i) { return i.value; });
      var txt = 'Ciao AEFFE! Sono ' + nome;
      if (f.attivita.value.trim()) txt += ' (' + f.attivita.value.trim() + ')';
      txt += '.';
      if (serv.length) txt += '\nMi interessa: ' + serv.join(', ') + '.';
      txt += '\n\n' + msg;
      window.open('https://wa.me/393911709592?text=' + encodeURIComponent(txt), '_blank', 'noopener');
    });
  }
})();
