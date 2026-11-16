(function () {
  "use strict";

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Zatvori" : "Meni";
    });
  }

  // Hero lamp: click to flip between ambient light and the call signal
  var lamp = document.querySelector(".lamp-btn");
  if (lamp) {
    var stage = lamp.closest(".stage");
    var chipText = stage ? stage.querySelector(".stage-chip-text") : null;
    var hint = stage ? stage.querySelector(".stage-hint") : null;
    lamp.addEventListener("click", function () {
      var calling = !lamp.classList.contains("is-on");
      lamp.classList.toggle("is-flipped");
      lamp.classList.toggle("is-on", calling);
      lamp.setAttribute("aria-pressed", calling ? "true" : "false");
      if (stage) stage.classList.toggle("is-calling", calling);
      if (chipText) chipText.textContent = calling ? "Sto 7 · gost zove konobara" : "Sto 7 · sve je u redu";
      if (hint) hint.textContent = calling ? "Konobar je stigao? Okreni lampu nazad." : "Klikni na lampu i okreni je";
    });
  }

  // Floor plan: tables light up red at random, then the waiter "arrives"
  var floor = document.querySelector(".floor-grid");
  if (floor) {
    var tables = Array.prototype.slice.call(floor.querySelectorAll(".tbl"));
    var status = document.querySelector(".floor-status");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var updateStatus = function () {
      if (!status) return;
      var calling = tables.filter(function (t) { return t.classList.contains("call"); })
        .map(function (t) { return t.getAttribute("data-n"); });
      status.textContent = calling.length
        ? "Poziv sa stola: " + calling.join(", ")
        : "Nijedan sto trenutno ne zove.";
    };
    updateStatus();
    if (!reduce) {
      setInterval(function () {
        var idle = tables.filter(function (t) { return !t.classList.contains("call"); });
        var active = tables.filter(function (t) { return t.classList.contains("call"); });
        if (active.length && (active.length >= 3 || Math.random() < 0.5)) {
          active[Math.floor(Math.random() * active.length)].classList.remove("call");
        } else if (idle.length) {
          idle[Math.floor(Math.random() * idle.length)].classList.add("call");
        }
        updateStatus();
      }, 1800);
    }
  }

  // Quote form.
  // To receive submissions directly, set data-endpoint on the <form> to a form
  // service URL (e.g. Formspree, Netlify Forms, or your own backend). Without it,
  // the visitor gets a ready-to-send summary to copy into an email.
  var form = document.getElementById("quote-form");
  if (form) {
    var done = document.getElementById("form-done");

    // Pre-select table count when arriving from a package button (kontakt.html?paket=25)
    try {
      var paket = new URLSearchParams(window.location.search).get("paket");
      var map = { "15": "Do 15", "25": "16–25", "50": "26–50" };
      if (paket && map[paket]) document.getElementById("f-stolovi").value = map[paket];
    } catch (err) { /* ignore */ }
    var summaryEl = document.getElementById("form-summary");
    var copyBtn = document.getElementById("copy-summary");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var data = new FormData(form);
      var lines = [
        "Upit za ponudu – FlipMe lampe",
        "Ime i prezime: " + (data.get("ime") || ""),
        "Objekat: " + (data.get("objekat") || ""),
        "Tip objekta: " + (data.get("tip") || ""),
        "Grad: " + (data.get("grad") || ""),
        "Broj stolova: " + (data.get("stolovi") || ""),
        "Telefon: " + (data.get("telefon") || ""),
        "E-pošta: " + (data.get("email") || ""),
        "Besplatna demonstracija: " + (data.get("demo") ? "Da" : "Ne"),
        "Poruka: " + (data.get("poruka") || "-")
      ];
      var summary = lines.join("\n");
      var endpoint = form.getAttribute("data-endpoint");

      var showDone = function (sent) {
        form.hidden = true;
        done.hidden = false;
        done.querySelector(".done-title").textContent = sent
          ? "Hvala! Upit je primljen."
          : "Vaš upit je spreman.";
        done.querySelector(".done-text").textContent = sent
          ? "Javljamo vam se u roku od jednog radnog dana sa ponudom za vaš objekat."
          : "Kopirajte tekst ispod i pošaljite ga na našu e-poštu ili nas pozovite, a ponudu dobijate u roku od jednog radnog dana.";
        summaryEl.textContent = summary;
        done.focus();
      };

      if (endpoint) {
        fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) { showDone(r.ok); })
          .catch(function () { showDone(false); });
      } else {
        showDone(false);
      }
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var text = summaryEl.textContent;
        var selectIt = function () {
          var range = document.createRange();
          range.selectNodeContents(summaryEl);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        };
        try {
          navigator.clipboard.writeText(text).then(function () {
            copyBtn.textContent = "Kopirano";
          }, selectIt);
        } catch (err) { selectIt(); }
      });
    }
  }
})();
