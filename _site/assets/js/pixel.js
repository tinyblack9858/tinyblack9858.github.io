// ============================================================
// PIXEL THEME — pixel.js
// HP bar, boot sequence, copy buttons, mobile nav
// ============================================================

(function () {
  'use strict';

  // --- HP Bar (reading progress) ---
  var hpBar = document.querySelector('.hp-bar');
  if (hpBar) {
    function updateHP() {
      var doc = document.documentElement;
      var scrolled = doc.scrollTop || document.body.scrollTop;
      var total = doc.scrollHeight - doc.clientHeight;
      hpBar.style.width = total > 0 ? (scrolled / total * 100).toFixed(1) + '%' : '0%';
    }
    window.addEventListener('scroll', updateHP, { passive: true });
    updateHP();
  }

  // --- Boot Sequence ---
  var bootOverlay = document.getElementById('boot-overlay');
  if (bootOverlay) {
    var shown = sessionStorage.getItem('pixel_booted');
    if (shown) {
      bootOverlay.remove();
    } else {
      // Show lines then fade out
      var totalLines = bootOverlay.querySelectorAll('.boot-line').length;
      var hideDelay = totalLines * 300 + 600;
      setTimeout(function () {
        bootOverlay.style.opacity = '0';
        setTimeout(function () {
          bootOverlay.remove();
          sessionStorage.setItem('pixel_booted', '1');
        }, 400);
      }, hideDelay);
    }
  }

  // --- Copy Buttons ---
  document.querySelectorAll('pre').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'COPY';
    btn.setAttribute('aria-label', 'Copy code');
    pre.style.position = 'relative';
    pre.appendChild(btn);

    btn.addEventListener('click', function () {
      var code = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText;
      navigator.clipboard.writeText(code).then(function () {
        btn.textContent = 'OK!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'COPY';
          btn.classList.remove('copied');
        }, 1800);
      });
    });
  });

  // --- Mobile Nav Toggle ---
  var navToggle = document.querySelector('.pixel-nav__toggle');
  var navLinks  = document.querySelector('.pixel-nav__links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.textContent = open ? 'CLOSE' : 'MENU';
      navToggle.setAttribute('aria-expanded', open);
    });
  }

  // --- Heading Anchors ---
  document.querySelectorAll('.post-body h2, .post-body h3').forEach(function (h) {
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase().replace(/[^\w]+/g, '-');
    }
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.className = 'heading-anchor';
    a.setAttribute('aria-label', 'Link to section');
    a.textContent = ' #';
    a.style.cssText = 'opacity:0;font-size:0.6em;color:var(--accent,#9bbc0f);text-decoration:none;transition:opacity .2s';
    h.appendChild(a);
    h.addEventListener('mouseenter', function () { a.style.opacity = '1'; });
    h.addEventListener('mouseleave', function () { a.style.opacity = '0'; });
  });

  // --- Keyboard pixel blip (fun easter egg) ---
  var blips = ['A', 'B', 'UP', 'UP', 'DOWN', 'A', 'B'];
  var keys  = { 65: 'A', 66: 'B', 38: 'UP', 40: 'DOWN' };
  var seq   = [];
  document.addEventListener('keydown', function (e) {
    var k = keys[e.keyCode];
    if (!k) return;
    seq.push(k);
    if (seq.length > blips.length) seq.shift();
    if (seq.join(',') === blips.join(',')) {
      document.body.style.filter = 'hue-rotate(180deg)';
      setTimeout(function () { document.body.style.filter = ''; }, 1000);
      seq = [];
    }
  });

}());
