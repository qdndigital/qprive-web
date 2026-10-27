/* QPrive — marketing site · shared scripts */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* reveal-on-scroll */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .14 });
  document.querySelectorAll('.rv').forEach(function (el, i) { el.style.transitionDelay = ((i % 3) * 70) + 'ms'; io.observe(el); });

  /* sticky header hairline on scroll */
  var hdr = document.querySelector('header.site');
  if (hdr) {
    var scrolled = false, ticking = false;
    var apply = function () { ticking = false; var s = window.scrollY > 16; if (s !== scrolled) { scrolled = s; hdr.classList.toggle('scrolled', s); } };
    var onS = function () { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
    requestAnimationFrame(apply);
    addEventListener('scroll', onS, { passive: true });
  }

  /* mobile menu — class toggle only, with overlay + a11y */
  var mb = document.querySelector('.menu-btn');
  var ov = document.querySelector('.nav-overlay');
  var links = document.querySelector('.nav-links');
  if (mb && links) {
    var setMenu = function (open) {
      document.body.classList.toggle('nav-open', open);
      mb.setAttribute('aria-expanded', open ? 'true' : 'false');
      mb.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    mb.addEventListener('click', function () { setMenu(!document.body.classList.contains('nav-open')); });
    if (ov) ov.addEventListener('click', function () { setMenu(false); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    var mq = window.matchMedia('(min-width:1024px)');
    (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function (e) { if (e.matches) setMenu(false); });
  }

  /* "Features" nav dropdown — click to toggle, same on every breakpoint;
     closes on an outside click or Escape. */
  document.querySelectorAll('.nav-menu').forEach(function (menu) {
    var trg = menu.querySelector('.nav-menu-btn');
    if (!trg) return;
    var setOpen = function (open) {
      menu.classList.toggle('open', open);
      trg.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    trg.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!menu.classList.contains('open'));
    });
    document.addEventListener('click', function (e) { if (!menu.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  });

  /* contact form — AJAX submit to Netlify (no reload). Native POST to
     action="/thank-you" stays the no-JS fallback. */
  var cf = document.getElementById('brief-form');
  if (cf) {
    var st = document.getElementById('form-status');
    var msg = {
      sending: cf.getAttribute('data-msg-sending') || 'Sending…',
      ok: cf.getAttribute('data-msg-ok') || 'Thanks — we got your message.',
      err: cf.getAttribute('data-msg-err') || 'Could not send right now — please email us directly.'
    };
    var say = function (m, cls) { if (st) { st.textContent = m; st.className = 'form-status' + (cls ? ' ' + cls : ''); } };
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(cf);
      var btn = cf.querySelector('button[type=submit]');
      if (btn) btn.disabled = true;
      say(msg.sending);
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() })
        .then(function (r) { if (!r.ok) throw new Error(r.status); cf.reset(); say(msg.ok, 'ok'); })
        .catch(function () { say(msg.err, 'err'); })
        .finally(function () { if (btn) btn.disabled = false; });
    });
  }

  /* "What you get" tabs — all panels are in the markup; this only toggles
     which one shows. */
  var tabsEl = document.getElementById('offer-tabs');
  if (tabsEl) {
    var tabBtns = Array.prototype.slice.call(tabsEl.querySelectorAll('button'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('.offer-panel'));
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabBtns.forEach(function (x) { x.setAttribute('aria-selected', String(x === btn)); });
        panels.forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== btn.getAttribute('data-tab'); });
      });
    });
  }

  /* ============ BILLING RUN (hero) ============
     Walks the rows of #js-run one at a time: Due → Charging → Paid (order
     created). A row marked data-fail declines instead and moves onto the retry
     schedule. Paid rows add to the "Collected" tile. The loop resets after
     a pause. With reduced motion it paints the finished run once. */
  var run = document.getElementById('js-run');
  var shot = document.getElementById('appshot');
  if (run) {
    var rows = Array.prototype.slice.call(run.querySelectorAll('.brow'));
    var todayEl = document.getElementById('js-today');
    var today = 0;

    var fmt = function (n) { return '$' + n.toLocaleString('en-US'); };
    var bump = function (el, text) {
      if (!el) return;
      el.textContent = text;
      el.classList.add('bump');
      setTimeout(function () { el.classList.remove('bump'); }, 700);
    };
    var setRow = function (row, state, pill, note) {
      row.setAttribute('data-state', state);
      row.querySelector('.pill').textContent = pill;
      row.querySelector('.b-note').innerHTML = note || '&nbsp;';
    };
    var amount = function (row) {
      return Math.round(parseFloat(row.querySelector('.b-amt').textContent.replace(/[^0-9.]/g, '')));
    };
    var finish = function (row) {
      if (row.getAttribute('data-fail')) {
        setRow(row, 'retry', 'Retry 1/3', 'Card declined · in 3 days');
      } else {
        setRow(row, 'paid', 'Paid', 'Order ' + row.getAttribute('data-order') + ' created');
      }
    };
    var reset = function () {
      rows.forEach(function (r) { setRow(r, 'due', 'Due'); });
      today = 0;
      if (todayEl) todayEl.textContent = fmt(today);
    };

    if (reduce) {
      rows.forEach(function (r) { finish(r); if (!r.getAttribute('data-fail')) today += amount(r); });
      if (todayEl) todayEl.textContent = fmt(today);
    } else {
      var step = function (i) {
        if (i >= rows.length) { setTimeout(function () { reset(); setTimeout(function () { step(0); }, 900); }, 3600); return; }
        var row = rows[i];
        setRow(row, 'charging', 'Charging');
        setTimeout(function () {
          if (row.getAttribute('data-fail')) {
            setRow(row, 'failed', 'Failed', 'Card declined');
            setTimeout(function () { finish(row); step(i + 1); }, 1100);
          } else {
            finish(row);
            today += amount(row);
            bump(todayEl, fmt(today));
            setTimeout(function () { step(i + 1); }, 650);
          }
        }, 1000);
      };
      var started = false;
      var lo = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !started) {
            started = true;
            if (shot) shot.classList.add('in');
            setTimeout(function () { step(0); }, 700);
            lo.disconnect();
          }
        });
      }, { threshold: .25 });
      lo.observe(shot || run);
    }
    if (reduce && shot) shot.classList.add('in');
  }
})();
