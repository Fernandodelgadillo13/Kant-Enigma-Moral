/* =====================================================================
   MOTOR DEL JUEGO E INTERFAZ
   "El enigma de la moral: una aventura filosófica con Kant"
   Sin frameworks ni dependencias externas.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.KANT_CONTENT;
  var BASE = window.KANT_CONFIG;
  var S = window.KantScoring;
  var ST = window.KantStorage;

  var KEYS = {
    game: "kantEnigma.partida",
    config: "kantEnigma.config",
    frag: "kantEnigma.fragmentos",
    prefs: "kantEnigma.preferencias",
    notice: "kantEnigma.avisoCerrado"
  };
  var EDITABLE_CONFIG = ["maxDecimas", "tramos", "timerMinutes", "zonesEnabled", "disabledChallenges", "individualCheckEnabled"];

  /* ------------------------------------------------------------------
     Utilidades
     ------------------------------------------------------------------ */
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function esc(s) {
    return String(s === undefined || s === null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function hashStr(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  /* Mezcla determinista: el mismo desafío siempre muestra el mismo orden. */
  function shuffleIdx(n, seedStr, avoidIdentity) {
    var r = rng(hashStr(seedStr));
    var a = [];
    for (var i = 0; i < n; i++) a.push(i);
    for (var tries = 0; tries < 10; tries++) {
      for (var j = a.length - 1; j > 0; j--) {
        var k = Math.floor(r() * (j + 1));
        var t = a[j]; a[j] = a[k]; a[k] = t;
      }
      if (!avoidIdentity || n < 2 || a.some(function (v, idx) { return v !== idx; })) break;
    }
    return a;
  }
  function normalizeKey(s) {
    return String(s || "").toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Z]/g, "");
  }
  function fmtNum(n) { return (Math.round(n * 100) / 100).toLocaleString("es-CL", { maximumFractionDigits: 2 }); }
  function today() {
    try { return new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" }); }
    catch (e) { return new Date().toISOString().slice(0, 10); }
  }

  /* Índices */
  var readingById = {}, challengeById = {}, zoneById = {};
  C.lecturas.forEach(function (r) { readingById[r.id] = r; });
  C.desafios.forEach(function (c) { challengeById[c.id] = c; });
  C.zonas.forEach(function (z) { zoneById[z.id] = z; });

  /* ------------------------------------------------------------------
     Configuración, fragmentos, preferencias y partida
     ------------------------------------------------------------------ */
  function loadConfig() {
    var c = clone(BASE);
    var o = ST.get(KEYS.config, null);
    if (o) EDITABLE_CONFIG.forEach(function (k) { if (o[k] !== undefined) c[k] = o[k]; });
    return c;
  }
  function saveConfig() {
    var o = {};
    EDITABLE_CONFIG.forEach(function (k) { o[k] = cfg[k]; });
    ST.set(KEYS.config, o);
  }
  function newState() {
    return {
      version: BASE.version, started: false, names: ["", ""], fecha: null, startedAt: null,
      readings: {}, pre: {}, challenges: {}, seals: {}, badges: {},
      xp: 0, streak: 0, noHintZones: {},
      individual: { started: [false, false], answers: {}, idx: [0, 0] },
      timerEnd: null, timerWarned: false
    };
  }
  function loadGame() {
    var s = ST.get(KEYS.game, null);
    if (!s || s.version !== BASE.version) return newState();
    return s;
  }
  function save() { ST.set(KEYS.game, state); }

  var cfg = loadConfig();
  var fragments = ST.get(KEYS.frag, {});
  var prefs = ST.get(KEYS.prefs, { scale: 1, light: false });
  var state = loadGame();
  var teacherUnlocked = false;
  var orderDraft = {};      // orden provisional de los desafíos "ordenar"
  var hintOpen = {};        // pistas visibles en esta sesión
  var lastFeedback = {};    // última retroalimentación (para volver a mostrarla)
  var pendingAnim = null;   // animación de sello/zona pendiente
  var teacherTab = "instrucciones";

  var appEl = document.getElementById("app");
  var liveEl = document.getElementById("live");

  function announce(msg) {
    liveEl.textContent = "";
    setTimeout(function () { liveEl.textContent = msg; }, 30);
  }

  function getFragment(r) {
    var f = fragments[r.id];
    if (f && f.texto && f.texto.trim()) return f;
    return r.fragmento || { texto: "", edicion: "", pagina: "" };
  }

  /* ------------------------------------------------------------------
     Lógica del juego
     ------------------------------------------------------------------ */
  function isActive(ch) { return S.isChallengeActive(ch, cfg); }
  function zoneEnabled(zid) { return !!cfg.zonesEnabled[zid]; }
  function challengesOf(zid) { return C.desafios.filter(function (c) { return c.zona === zid && isActive(c); }); }
  function rec(id) { return state.challenges[id]; }
  function isDone(id) { var r = rec(id); return !!(r && r.status && r.status !== "pending"); }
  function readingsOpened(zid) { return zoneById[zid].lecturas.every(function (rid) { return !!state.readings[rid]; }); }

  function zoneComplete(zid) {
    if (!zoneEnabled(zid)) return false;
    return readingsOpened(zid) && challengesOf(zid).every(function (c) { return isDone(c.id); });
  }
  function zoneUnlocked(zid) {
    if (!zoneEnabled(zid)) return false;
    var order = ["z1", "z2", "z3"];
    if (zid === "z4") return order.every(function (z) { return !zoneEnabled(z) || !!state.seals[z]; });
    var pos = order.indexOf(zid);
    for (var i = 0; i < pos; i++) if (zoneEnabled(order[i]) && !state.seals[order[i]]) return false;
    return true;
  }
  function letterChallenges() { return C.desafios.filter(function (c) { return c.zona === "z1" && c.letra; }); }
  function letterEarned(c) { return !isActive(c) || isDone(c.id); }
  function challengeAvailable(ch) {
    if (!isActive(ch) || !zoneUnlocked(ch.zona)) return false;
    if (ch.lectura) return !!state.readings[ch.lectura];
    if (!readingsOpened(ch.zona)) return false;
    if (ch.tipo === "lock") return letterChallenges().every(letterEarned);
    return true;
  }
  function nextChallengeFor(zid, afterId) {
    var list = challengesOf(zid);
    var start = afterId ? list.findIndex(function (c) { return c.id === afterId; }) + 1 : 0;
    for (var i = start; i < list.length; i++) if (!isDone(list[i].id) && challengeAvailable(list[i])) return list[i];
    for (var j = 0; j < list.length; j++) if (!isDone(list[j].id) && challengeAvailable(list[j])) return list[j];
    return null;
  }
  function individualAvailable() {
    if (!cfg.individualCheckEnabled) return false;
    if (zoneEnabled("z4")) return !!state.seals.z4;
    return ["z1", "z2", "z3"].every(function (z) { return !zoneEnabled(z) || !!state.seals[z]; });
  }

  function addXp(n) { state.xp += n; }
  function levelInfo() {
    var lv = cfg.levels[0], idx = 0;
    cfg.levels.forEach(function (l, i) { if (state.xp >= l.desde) { lv = l; idx = i; } });
    var next = cfg.levels[idx + 1];
    var pct = next ? Math.min(100, ((state.xp - lv.desde) / (next.desde - lv.desde)) * 100) : 100;
    return { nombre: lv.nombre, n: idx + 1, next: next, pct: pct };
  }

  function awardBadge(id) {
    if (state.badges[id]) return;
    state.badges[id] = true;
    var b = C.insignias.find(function (x) { return x.id === id; });
    if (b) showToast("Insignia obtenida: " + b.nombre);
  }

  function checkProgress() {
    ["z1", "z2", "z3", "z4"].forEach(function (zid) {
      if (zoneComplete(zid) && !state.seals[zid]) {
        state.seals[zid] = true;
        addXp(cfg.xp.sealEarned);
        pendingAnim = { tipo: "sello", zona: zid };
        var noHints = challengesOf(zid).every(function (c) { return !(rec(c.id) && rec(c.id).hintUsed); });
        if (noHints && challengesOf(zid).length) awardBadge("sinPistas");
        if (zid === "z4") awardBadge("juicio");
      }
    });
    if (C.lecturas.every(function (r) { return state.readings[r.id]; })) awardBadge("lector");
    if (["z1", "z2", "z3"].every(function (z) { return state.seals[z]; })) awardBadge("tresSellos");
    if (state.streak >= 5) awardBadge("primerIntento");
    save();
  }

  /* ------------------------------------------------------------------
     Enrutador (hash)
     ------------------------------------------------------------------ */
  function route() {
    var h = (location.hash || "#/inicio").replace(/^#\/?/, "").split("/");
    return { view: h[0] || "inicio", id: h[1] || null };
  }
  function go(path) {
    if (location.hash === "#/" + path) render();
    else location.hash = "#/" + path;
  }

  function render() {
    var r = route();
    if (!state.started && ["inicio", "docente"].indexOf(r.view) === -1) { go("inicio"); return; }
    var html;
    switch (r.view) {
      case "mapa": html = viewMap(); break;
      case "zona": html = viewZone(r.id); break;
      case "lectura": html = viewReading(r.id); break;
      case "desafio": html = viewChallenge(r.id); break;
      case "individual": html = viewIndividual(); break;
      case "informe": html = viewReport(); break;
      case "docente": html = viewTeacher(); break;
      default: html = viewStart();
    }
    appEl.innerHTML = html;
    document.body.setAttribute("data-view", r.view);
    renderStats();
    afterRender(r);
    var h1 = $("h1", appEl) || $("h2", appEl);
    if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: false }); }
    window.scrollTo(0, 0);
    if (pendingAnim) playAnim();
  }

  function afterRender(r) {
    if (r.view === "desafio") {
      var fb = lastFeedback[r.id];
      if (fb && !isDone(r.id)) { var box = $("#fb"); if (box) { box.className = "feedback " + fb.kind; box.innerHTML = fb.html; } }
    }
  }

  /* ------------------------------------------------------------------
     Barra superior: estadísticas, temporizador
     ------------------------------------------------------------------ */
  function renderStats() {
    var el = document.getElementById("stats");
    if (!state.started) { el.innerHTML = ""; el.hidden = true; return; }
    el.hidden = false;
    var lv = levelInfo();
    var t = S.computeTotals(state, C, cfg);
    var seals = ["z1", "z2", "z3"].filter(zoneEnabled).map(function (z) {
      return '<span class="mini-seal ' + (state.seals[z] ? "on" : "") + '" title="' + esc(zoneById[z].sello) + (state.seals[z] ? " (obtenido)" : " (pendiente)") + '">' + svgSeal(18) + '<span class="sr-only">' + esc(zoneById[z].sello) + (state.seals[z] ? " obtenido" : " pendiente") + "</span></span>";
    }).join("");
    el.innerHTML =
      '<div class="stat"><span class="stat-label">Nivel ' + lv.n + "</span><strong>" + esc(lv.nombre) + "</strong>" +
      '<span class="xpbar" role="progressbar" aria-label="Experiencia" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(lv.pct) + '"><span style="width:' + lv.pct + '%"></span></span>' +
      '<span class="stat-small">' + state.xp + " XP (solo motivación)</span></div>" +
      '<div class="stat"><span class="stat-label">Puntos de evaluación</span><strong data-testid="pe-total">' + fmtNum(t.pe) + " / " + fmtNum(t.peMax) + " PE</strong>" +
      '<span class="stat-small">' + S.formatPct(t.pct) + "</span></div>" +
      '<div class="stat seals"><span class="stat-label">Sellos</span><span>' + seals + "</span></div>" +
      '<div class="stat" id="timer-wrap"' + (state.timerEnd ? "" : " hidden") + '><span class="stat-label">Tiempo</span><strong id="timer">--:--</strong></div>';
    tickTimer();
  }

  function tickTimer() {
    var el = document.getElementById("timer");
    if (!el || !state.timerEnd) return;
    var ms = state.timerEnd - Date.now();
    if (ms <= 0) {
      el.textContent = "00:00";
      if (!state.timerWarned) {
        state.timerWarned = true; save();
        var b = document.getElementById("timer-banner");
        b.hidden = false;
        announce("El tiempo terminó. Pueden revisar el informe.");
      }
      return;
    }
    var s = Math.ceil(ms / 1000);
    el.textContent = String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  }
  setInterval(tickTimer, 1000);

  function showToast(msg) {
    var t = document.getElementById("toast");
    var item = document.createElement("div");
    item.className = "toast-item";
    item.textContent = msg;
    t.appendChild(item);
    announce(msg);
    setTimeout(function () { item.classList.add("out"); }, 3200);
    setTimeout(function () { item.remove(); }, 3800);
  }

  function playAnim() {
    var a = pendingAnim; pendingAnim = null;
    if (!a) return;
    var z = zoneById[a.zona];
    var ov = document.getElementById("overlay");
    ov.innerHTML = '<div class="overlay-card" role="dialog" aria-modal="true" aria-labelledby="ov-title">' +
      '<div class="stamp">' + svgSeal(120) + "</div>" +
      '<h2 id="ov-title">¡' + esc(z.sello) + "!</h2>" +
      "<p>Completaron la zona «" + esc(z.nombre) + "».</p>" +
      (a.zona !== "z4" && zoneUnlocked(nextZone(a.zona)) ? "<p>Se desbloqueó: <strong>" + esc(zoneById[nextZone(a.zona)].nombre) + "</strong>.</p>" : "") +
      '<button class="btn primary" data-action="close-overlay">Continuar</button></div>';
    ov.hidden = false;
    var btn = $("button", ov);
    if (btn) btn.focus();
    announce("Obtuvieron el " + z.sello);
  }
  function nextZone(zid) {
    var order = ["z1", "z2", "z3", "z4"];
    for (var i = order.indexOf(zid) + 1; i < order.length; i++) if (zoneEnabled(order[i])) return order[i];
    return null;
  }

  /* ------------------------------------------------------------------
     Ilustraciones SVG (propias)
     ------------------------------------------------------------------ */
  function svgSeal(size) {
    return '<svg class="svg-seal" width="' + size + '" height="' + size + '" viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
      '<path d="M50 4l9 8 12-3 4 12 12 4-3 12 8 9-8 9 3 12-12 4-4 12-12-3-9 8-9-8-12 3-4-12-12-4 3-12-8-9 8-9-3-12 12-4 4-12 12 3z" fill="currentColor" opacity=".9"/>' +
      '<circle cx="50" cy="50" r="27" fill="none" stroke="#0b1430" stroke-width="3" opacity=".55"/>' +
      '<path d="M38 52l8 8 16-18" fill="none" stroke="#0b1430" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/></svg>';
  }
  function svgIcon(name, size) {
    size = size || 56;
    var open = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 64 64" aria-hidden="true" focusable="false" class="icon">';
    var p = {
      manuscrito: '<rect x="14" y="10" width="36" height="44" rx="3" fill="#f3e6c4" stroke="#d9b45a" stroke-width="2"/><path d="M20 20h24M20 27h24M20 34h18M20 41h22" stroke="#7a5b2a" stroke-width="2" stroke-linecap="round"/><path d="M44 46l10-18 3 2-10 18z" fill="#3fd0c9"/><circle cx="12" cy="12" r="5" fill="#d9b45a"/><circle cx="52" cy="52" r="5" fill="#d9b45a"/>',
      matraz: '<path d="M26 8h12M28 8v16L14 50a4 4 0 003.6 6h28.8A4 4 0 0050 50L36 24V8" fill="#1d2a55" stroke="#d9b45a" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 44h24l4 8H16z" fill="#3fd0c9" opacity=".85"/><circle cx="28" cy="36" r="2.5" fill="#a98bff"/><circle cx="36" cy="30" r="1.8" fill="#a98bff"/>',
      puerta: '<path d="M14 58V24a18 18 0 0136 0v34z" fill="#3b2a6b" stroke="#d9b45a" stroke-width="2.5"/><path d="M32 8v50" stroke="#d9b45a" stroke-width="1.5" opacity=".6"/><circle cx="27" cy="38" r="2.5" fill="#d9b45a"/><circle cx="37" cy="38" r="2.5" fill="#d9b45a"/><path d="M8 58h48" stroke="#d9b45a" stroke-width="3" stroke-linecap="round"/>',
      sello: '<circle cx="32" cy="32" r="22" fill="#a98bff" stroke="#d9b45a" stroke-width="3"/><path d="M32 18l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill="#f6e7b0"/>',
      candado: '<rect x="14" y="28" width="36" height="28" rx="4" fill="#d9b45a"/><path d="M22 28v-8a10 10 0 0120 0v8" fill="none" stroke="#d9b45a" stroke-width="5"/><circle cx="32" cy="41" r="4" fill="#0b1430"/><path d="M32 44v6" stroke="#0b1430" stroke-width="3"/>'
    };
    return open + (p[name] || p.sello) + "</svg>";
  }
  function svgMapBackground() {
    var stars = "";
    var r = rng(42);
    for (var i = 0; i < 60; i++) {
      stars += '<circle cx="' + Math.round(r() * 1000) + '" cy="' + Math.round(r() * 560) + '" r="' + (r() * 1.6 + 0.4).toFixed(1) + '" fill="#f6e7b0" opacity="' + (r() * 0.6 + 0.2).toFixed(2) + '"/>';
    }
    return '<svg class="map-bg" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
      '<defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#d9b45a"/><stop offset="1" stop-color="#3fd0c9"/></linearGradient></defs>' +
      stars +
      '<path d="M120 440 C 260 420, 220 260, 360 250 S 560 380, 640 260 S 820 100, 880 120" fill="none" stroke="url(#g1)" stroke-width="6" stroke-dasharray="14 12" stroke-linecap="round" opacity=".75"/>' +
      '<path d="M40 520 Q 200 470 340 520 T 640 520 T 960 510" fill="none" stroke="#a98bff" stroke-width="2" opacity=".35"/>' +
      '<g opacity=".18" fill="#f3e6c4"><rect x="40" y="40" width="10" height="70"/><rect x="54" y="30" width="10" height="80"/><rect x="68" y="50" width="10" height="60"/><rect x="930" y="380" width="10" height="70"/><rect x="944" y="395" width="10" height="55"/></g>' +
      "</svg>";
  }

  /* ------------------------------------------------------------------
     Vista: Inicio
     ------------------------------------------------------------------ */
  function rulesHtml() {
    var tramos = cfg.tramos.slice().sort(function (a, b) { return a.desde - b.desde; });
    var rows = tramos.map(function (t, i) {
      var next = tramos[i + 1];
      var rango = next ? t.desde + " % a menos de " + next.desde + " %" : (t.desde === 100 ? "100 %" : t.desde + " % o más");
      if (i === 0 && next) rango = (t.desde === 0 ? "Menos de " + next.desde + " %" : rango);
      return "<tr><td>" + esc(rango) + "</td><td>" + t.decimas + "</td></tr>";
    }).join("");
    var m = cfg.attemptMultipliers.map(function (x) { return Math.round(x * 100) + " %"; });
    return '<section class="card rules" aria-labelledby="rules-h"><h2 id="rules-h">Reglas del puntaje (léanlas antes de comenzar)</h2>' +
      "<ul>" +
      "<li><strong>Puntos de evaluación (PE):</strong> cada desafío tiene un valor. Si aciertan al 1.er intento obtienen el " + m[0] + ", al 2.º el " + m[1] + " y al 3.º el " + m[2] + ".</li>" +
      "<li><strong>Pista:</strong> usarla descuenta un " + Math.round(cfg.hintPenalty * 100) + " % del valor del desafío.</li>" +
      "<li><strong>Máximo " + cfg.maxAttempts + " intentos.</strong> Después verán la solución explicada con 0 PE, para que nadie quede bloqueado.</li>" +
      "<li><strong>Respuestas abiertas:</strong> se evalúan con una rúbrica visible de 3 criterios. Primero ustedes se autoevalúan; luego el docente valida en el informe.</li>" +
      "<li><strong>Porcentaje</strong> = PE obtenidos ÷ PE máximos de los desafíos activos.</li>" +
      "<li><strong>XP, niveles, sellos e insignias</strong> son solo para motivar: <em>no</em> cuentan en el porcentaje ni en las décimas.</li>" +
      (cfg.individualCheckEnabled ? "<li><strong>Comprobación individual:</strong> al final, cada integrante responde 3 preguntas distintas, por turnos y con un solo intento. Se informa por separado.</li>" : "") +
      "</ul>" +
      '<table class="table"><caption>Tabla de décimas (máximo ' + cfg.maxDecimas + ")</caption><thead><tr><th scope=\"col\">Porcentaje</th><th scope=\"col\">Décimas</th></tr></thead><tbody>" + rows + "</tbody></table>" +
      (cfg.timerMinutes > 0 ? "<p><strong>Temporizador:</strong> tendrán " + cfg.timerMinutes + " minutos. Al terminar, aparecerá un aviso.</p>" : "") +
      "</section>";
  }

  function viewStart() {
    var hero = '<section class="hero"><div class="hero-art" aria-hidden="true">' + svgIcon("manuscrito", 72) + svgIcon("puerta", 72) + svgIcon("sello", 72) + "</div>" +
      "<h1>" + esc(C.titulo) + '<span class="subtitle">' + esc(C.subtitulo) + "</span></h1>" +
      '<p class="lead">Una misteriosa biblioteca guarda la respuesta a una pregunta antigua: <em>¿qué hace que una acción sea moralmente buena?</em> Para abrir la Puerta del juicio final deberán reunir tres sellos, leyendo y razonando como Immanuel Kant en el Prefacio y la Primera sección de la <em>Fundamentación de la metafísica de las costumbres</em>.</p></section>';
    if (state.started) {
      return hero + '<section class="card"><h2>Partida en curso</h2><p>Equipo: <strong>' + esc(state.names[0]) + "</strong> y <strong>" + esc(state.names[1]) + "</strong> · iniciada el " + esc(state.fecha) + ".</p>" +
        '<div class="actions"><button class="btn primary" data-action="go" data-to="mapa">Continuar la aventura</button>' +
        '<button class="btn" data-action="new-game">Nueva partida</button></div></section>' + rulesHtml();
    }
    return hero +
      '<form class="card" id="start-form" novalidate aria-labelledby="start-h"><h2 id="start-h">Formen su pareja</h2>' +
      '<div class="field"><label for="n1">Nombre del integrante 1</label><input id="n1" name="n1" autocomplete="off" required maxlength="60"></div>' +
      '<div class="field"><label for="n2">Nombre del integrante 2</label><input id="n2" name="n2" autocomplete="off" required maxlength="60"></div>' +
      '<p class="form-error" id="start-error" role="alert"></p>' +
      '<label class="check"><input type="checkbox" id="rules-ok" required> Leímos las reglas de puntaje y décimas.</label>' +
      '<div class="actions"><button class="btn primary" type="submit">Entrar a la biblioteca</button></div></form>' +
      rulesHtml();
  }

  /* ------------------------------------------------------------------
     Vista: Mapa
     ------------------------------------------------------------------ */
  function viewMap() {
    var pos = { z1: [12, 66], z2: [36, 38], z3: [62, 50], z4: [86, 16] };
    var nodes = C.zonas.map(function (z, i) {
      var enabled = zoneEnabled(z.id);
      var unlocked = zoneUnlocked(z.id);
      var done = !!state.seals[z.id];
      var list = challengesOf(z.id);
      var nDone = list.filter(function (c) { return isDone(c.id); }).length;
      var status = !enabled ? "Desactivada por el docente" : done ? "Sello obtenido" : unlocked ? nDone + " de " + list.length + " desafíos" : (z.id === "z4" ? "Se abre con los 3 sellos" : "Bloqueada");
      return '<li class="map-node ' + (done ? "done " : "") + (unlocked ? "unlocked" : "locked") + (enabled ? "" : " disabled") + '" style="--x:' + pos[z.id][0] + "%;--y:" + pos[z.id][1] + '%">' +
        '<button class="node-btn" data-action="go" data-to="zona/' + z.id + '" ' + (unlocked ? "" : 'aria-disabled="true"') + ' aria-describedby="st-' + z.id + '">' +
        '<span class="node-icon">' + svgIcon(unlocked ? z.icono : "candado", 52) + (done ? '<span class="node-seal">' + svgSeal(30) + "</span>" : "") + "</span>" +
        '<span class="node-name">' + (i + 1) + ". " + esc(z.nombre) + "</span>" +
        '<span class="node-status" id="st-' + z.id + '">' + esc(status) + "</span></button></li>";
    }).join("");
    var extra = "";
    if (individualAvailable()) {
      var both = state.individual.started[0] && state.individual.started[1] && indDone(0) && indDone(1);
      extra = '<div class="card center"><p>' + (both ? "La comprobación individual está completa." : "Se abrió la <strong>comprobación individual</strong>: 3 preguntas para cada integrante, por turnos.") + "</p>" +
        '<button class="btn primary" data-action="go" data-to="' + (both ? "informe" : "individual") + '">' + (both ? "Ver informe final" : "Ir a la comprobación individual") + "</button></div>";
    }
    return '<h1>Mapa de la biblioteca</h1><p class="lead small">Recorran las zonas en orden. Cada zona entrega un sello; con los tres sellos se abre la Puerta del juicio final.</p>' +
      '<nav class="map" aria-label="Zonas del mapa">' + svgMapBackground() + '<ol class="map-nodes">' + nodes + "</ol></nav>" + extra + badgesHtml();
  }

  function badgesHtml() {
    var items = C.insignias.map(function (b) {
      var on = !!state.badges[b.id];
      return '<li class="badge ' + (on ? "on" : "") + '"><span class="badge-icon" aria-hidden="true">' + svgIcon("sello", 34) + "</span><span><strong>" + esc(b.nombre) + "</strong><br><small>" + esc(b.descripcion) + "</small></span><span class=\"sr-only\">" + (on ? "obtenida" : "pendiente") + "</span></li>";
    }).join("");
    return '<section class="card" aria-labelledby="badges-h"><h2 id="badges-h">Insignias <small>(solo motivación)</small></h2><ul class="badges">' + items + "</ul></section>";
  }

  /* ------------------------------------------------------------------
     Vista: Zona
     ------------------------------------------------------------------ */
  function statusLabel(ch) {
    var r = rec(ch.id);
    if (!r || r.status === "pending") return r && r.attempts ? "En curso (" + r.attempts + "/" + cfg.maxAttempts + ")" : "Pendiente";
    if (r.status === "correct") return "Resuelto · " + fmtNum(S.pointsFor(ch, r, cfg).points) + " PE";
    if (r.status === "failed") return "Solución vista · 0 PE";
    if (r.status === "submitted") return r.teacher ? "Validado por docente" : "Enviado · pendiente de validación";
    return "";
  }

  function viewZone(zid) {
    var z = zoneById[zid];
    if (!z) return notFound();
    if (!zoneUnlocked(zid)) {
      return "<h1>" + esc(z.nombre) + '</h1><div class="card locked-card">' + svgIcon("candado", 64) +
        "<p>" + (zoneEnabled(zid) ? (zid === "z4" ? "Esta puerta solo se abre con los tres sellos." : "Esta zona se desbloquea al obtener el sello de la zona anterior.") : "El docente desactivó esta zona.") + "</p>" +
        '<button class="btn" data-action="go" data-to="mapa">Volver al mapa</button></div>';
    }
    var readings = z.lecturas.map(function (rid, i) {
      var r = readingById[rid];
      var chs = C.desafios.filter(function (c) { return c.lectura === rid && isActive(c); });
      var chHtml = chs.map(function (c) { return challengeItem(c); }).join("");
      return '<li class="reading-item"><div class="reading-head"><span class="reading-num">Lectura ' + (C.lecturas.indexOf(r) + 1) + "</span>" +
        '<button class="btn link-btn" data-action="go" data-to="lectura/' + rid + '">' + svgIcon("manuscrito", 26) + " " + esc(r.titulo) + "</button>" +
        '<span class="tag ' + (state.readings[rid] ? "ok" : "") + '">' + (state.readings[rid] ? "Leída" : "Por leer") + "</span></div>" +
        (chHtml ? '<ul class="ch-list">' + chHtml + "</ul>" : "") + "</li>";
    }).join("");
    var zoneLevel = challengesOf(zid).filter(function (c) { return !c.lectura; });
    var zl = zoneLevel.length ? '<section class="card" aria-labelledby="zl-h"><h2 id="zl-h">' + (zid === "z4" ? "Desafíos del juicio final" : "Desafíos de la zona") + "</h2>" +
      (z.lecturas.length && !readingsOpened(zid) ? '<p class="muted">Se habilitan cuando hayan abierto todas las lecturas de la zona.</p>' : "") +
      '<ul class="ch-list">' + zoneLevel.map(challengeItem).join("") + "</ul></section>" : "";
    var next = nextChallengeFor(zid);
    var seal = state.seals[zid] ? '<p class="seal-line">' + svgSeal(28) + " <strong>" + esc(z.sello) + "</strong> obtenido.</p>" : "";
    var after = "";
    if (state.seals[zid]) {
      var nz = nextZone(zid);
      if (zid === "z4" || !nz) after = individualAvailable() ? '<button class="btn primary" data-action="go" data-to="individual">Ir a la comprobación individual</button>' : '<button class="btn primary" data-action="go" data-to="informe">Ver informe</button>';
      else if (zoneUnlocked(nz)) after = '<button class="btn primary" data-action="go" data-to="zona/' + nz + '">Ir a ' + esc(zoneById[nz].nombre) + "</button>";
    }
    return '<p class="breadcrumb"><button class="btn link-btn" data-action="go" data-to="mapa">← Mapa</button></p>' +
      '<header class="zone-header">' + svgIcon(z.icono, 64) + "<div><h1>" + esc(z.nombre) + "</h1><p>" + esc(z.descripcion) + "</p>" + seal + "</div></header>" +
      (z.lecturas.length ? '<section class="card" aria-labelledby="rl-h"><h2 id="rl-h">Lecturas y desafíos</h2><p class="muted">Cada desafío se habilita después de abrir su lectura.</p><ol class="readings">' + readings + "</ol></section>" : "") +
      zl +
      '<div class="actions">' + (next ? '<button class="btn primary" data-action="go" data-to="desafio/' + next.id + '">Siguiente desafío disponible</button>' : "") + after + "</div>";
  }

  function challengeItem(c) {
    var avail = challengeAvailable(c);
    var done = isDone(c.id);
    return '<li class="ch-item ' + (done ? "done" : "") + '">' +
      '<button class="btn ch-btn" data-action="go" data-to="desafio/' + c.id + '" ' + (avail ? "" : 'aria-disabled="true"') + ">" +
      '<span class="ch-type">' + esc(typeName(c.tipo)) + "</span> " + esc(c.titulo) + "</button>" +
      '<span class="tag ' + (done ? "ok" : "") + '">' + (avail || done ? esc(statusLabel(c)) : "Bloqueado") + "</span> " +
      '<span class="tag val">' + c.valor + " PE</span></li>";
  }

  function typeName(t) {
    return { mcq: "Selección múltiple", tf: "V/F con justificación", match: "Asociación", classify: "Clasificación", fill: "Completar", order: "Ordenar", lock: "Clave cifrada", open: "Desarrollo breve" }[t] || t;
  }

  /* ------------------------------------------------------------------
     Vista: Lectura
     ------------------------------------------------------------------ */
  function viewReading(rid) {
    var r = readingById[rid];
    if (!r) return notFound();
    if (!zoneUnlocked(r.zona)) return viewZone(r.zona);
    if (!state.readings[rid]) {
      state.readings[rid] = true;
      addXp(cfg.xp.readReading);
      checkProgress();
      save();
    }
    var n = C.lecturas.indexOf(r) + 1;
    var f = getFragment(r);
    var hasFrag = !!(f.texto && f.texto.trim());
    var fragHtml = hasFrag
      ? '<blockquote class="kant-quote" lang="es">' + esc(f.texto).replace(/\n{2,}/g, "</p><p>").replace(/^/, "<p>").replace(/$/, "</p>").replace(/\n/g, "<br>") + "</blockquote>" +
        '<p class="ref"><strong>Referencia:</strong> ' + esc(r.ubicacion.seccion) + (f.edicion ? " · " + esc(f.edicion) : "") + (f.pagina ? " · " + esc(f.pagina) : "") + "</p>"
      : '<div class="frag-pending"><p><strong>FRAGMENTO PENDIENTE — lo agrega el docente.</strong></p><p>Este espacio está reservado para un fragmento de la edición autorizada que use el curso. Mientras tanto, trabajen con la explicación didáctica de arriba: la actividad funciona igual.</p></div>';
    var pq = r.pregunta;
    var order = shuffleIdx(pq.opciones.length, "pre-" + rid);
    var prev = state.pre[rid];
    var opts = order.map(function (oi) {
      return '<label class="opt"><input type="radio" name="pre" value="' + oi + '"' + (prev && prev.choice === oi ? " checked" : "") + "> <span>" + esc(pq.opciones[oi].texto) + "</span></label>";
    }).join("");
    var firstCh = C.desafios.find(function (c) { return c.lectura === rid && isActive(c) && !isDone(c.id); }) ||
                  C.desafios.find(function (c) { return c.lectura === rid && isActive(c); });
    var concepts = r.conceptos.map(function (k) { return "<div><dt>" + esc(k.termino) + "</dt><dd>" + esc(k.definicion) + "</dd></div>"; }).join("");
    return '<p class="breadcrumb"><button class="btn link-btn" data-action="go" data-to="zona/' + r.zona + '">← ' + esc(zoneById[r.zona].nombre) + "</button></p>" +
      '<article class="reading" aria-labelledby="rd-h">' +
      '<header class="reading-title">' + svgIcon("manuscrito", 54) + '<div><p class="kicker">Lectura ' + n + " · " + esc(r.ubicacion.seccion) + "</p><h1 id=\"rd-h\">" + esc(r.titulo) + "</h1></div></header>" +
      '<section class="panel context" aria-labelledby="ctx-h"><h2 id="ctx-h"><span class="pill">1</span> Contexto filosófico</h2><p>' + esc(r.contexto) + "</p></section>" +
      '<section class="panel explain" aria-labelledby="exp-h"><h2 id="exp-h"><span class="pill">2</span> Explicación didáctica <span class="label-noquote">Explicación (no es cita)</span></h2>' +
      r.explicacion.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<h3>Conceptos clave</h3><dl class="concepts">' + concepts + "</dl></section>" +
      '<section class="panel fragment" aria-labelledby="frg-h"><h2 id="frg-h"><span class="pill">3</span> Lectura de referencia <span class="label-quote">Palabras de Kant (fragmento incorporado por el docente)</span></h2>' +
      fragHtml +
      '<p class="loc"><strong>Ubicación sugerida en la obra:</strong> ' + esc(r.ubicacion.seccion) + " (" + esc(r.ubicacion.akSugerida) + ", paginación académica; el docente la confirma con su edición).</p>" +
      '<div class="frag-task"><h3>Trabajo con el fragmento</h3><p>' + esc(r.trabajoFragmento) + "</p>" + (hasFrag ? "" : '<p class="muted small">(Esta tarea se realiza cuando el docente haya agregado el fragmento.)</p>') + "</div></section>" +
      '<section class="panel prequestion" aria-labelledby="pq-h"><h2 id="pq-h"><span class="pill">4</span> Pregunta previa de comprensión <span class="tag">Sin nota</span></h2>' +
      '<form id="pre-form" data-rid="' + rid + '"><fieldset><legend>' + esc(pq.enunciado) + "</legend>" + opts + "</fieldset>" +
      '<div class="actions"><button class="btn" type="submit">Comprobar comprensión</button></div>' +
      '<div id="pre-fb" class="feedback" role="status" aria-live="polite">' + (prev ? preFeedback(pq, prev.choice) : "") + "</div></form></section>" +
      '<div class="actions sticky-actions">' +
      (firstCh ? '<button class="btn primary" data-action="go" data-to="desafio/' + firstCh.id + '">Ir al desafío</button>' : "") +
      '<button class="btn" data-action="go" data-to="zona/' + r.zona + '">Volver a la zona</button></div></article>';
  }

  function preFeedback(pq, choice) {
    var o = pq.opciones[choice];
    if (!o) return "";
    return (o.correcta ? "<p><strong>Bien.</strong> " : "<p><strong>Revisemos.</strong> ") + esc(o.retro) + "</p>" + (o.correcta ? "" : "<p>Pueden volver a intentarlo: esta pregunta no tiene nota.</p>");
  }

  /* ------------------------------------------------------------------
     Vista: Desafío
     ------------------------------------------------------------------ */
  function viewChallenge(cid) {
    var ch = challengeById[cid];
    if (!ch) return notFound();
    var z = zoneById[ch.zona];
    if (!isActive(ch)) return '<h1>Desafío desactivado</h1><p>El docente desactivó este desafío.</p><button class="btn" data-action="go" data-to="zona/' + ch.zona + '">Volver a la zona</button>';
    if (!challengeAvailable(ch) && !isDone(cid)) {
      var why = ch.lectura ? "Primero abran la lectura «" + readingById[ch.lectura].titulo + "»." :
        (ch.tipo === "lock" ? "Primero resuelvan los demás desafíos de la zona para reunir las letras." : "Primero abran todas las lecturas de la zona.");
      return "<h1>" + esc(ch.titulo) + '</h1><div class="card locked-card">' + svgIcon("candado", 56) + "<p>" + esc(why) + "</p>" +
        (ch.lectura ? '<button class="btn primary" data-action="go" data-to="lectura/' + ch.lectura + '">Abrir la lectura</button>' : "") +
        '<button class="btn" data-action="go" data-to="zona/' + ch.zona + '">Volver a la zona</button></div>';
    }
    var r = rec(cid) || { attempts: 0, wrong: 0, hintUsed: false, status: "pending" };
    var done = r.status && r.status !== "pending";
    var reread = rereadButtons(ch);
    var head = '<p class="breadcrumb"><button class="btn link-btn" data-action="go" data-to="zona/' + ch.zona + '">← ' + esc(z.nombre) + "</button></p>" +
      '<header class="ch-header"><p class="kicker">' + esc(typeName(ch.tipo)) + " · Valor: " + ch.valor + " PE</p><h1>" + esc(ch.titulo) + "</h1>" +
      (ch.tipo !== "open" ? '<p class="attempts" id="attempts">' + attemptsText(r) + "</p>" : "") + "</header>" +
      '<div class="reread">' + reread + "</div>";

    if (ch.tipo === "open") return head + openChallenge(ch, r);

    var body = '<form id="ch-form" class="card challenge" data-cid="' + cid + '" novalidate>' + renderInputs(ch, done ? r.last : null, done) + "</form>";
    var hint = "";
    if (!done) {
      hint = r.hintUsed || hintOpen[cid]
        ? '<div class="hint" id="hint-box"><strong>Pista:</strong> ' + esc(ch.pista) + "</div>"
        : '<button class="btn ghost" data-action="hint" data-cid="' + cid + '">Ver pista (−' + Math.round(cfg.hintPenalty * 100) + " % del valor)</button>";
    }
    var fb = '<div id="fb" class="feedback" role="status" aria-live="polite">' + (done ? finalFeedback(ch, r) : "") + "</div>";
    var actions = '<div class="actions" id="ch-actions">' +
      (done ? nextButtons(ch) : '<button class="btn primary" type="submit" form="ch-form">Comprobar</button>' + hint) + "</div>";
    return head + body + actions + fb;
  }

  function rereadButtons(ch) {
    var ids = ch.lectura ? [ch.lectura] : zoneById[ch.zona].lecturas;
    if (!ids.length) ids = C.lecturas.map(function (r) { return r.id; });
    if (ids.length === 1) return '<button class="btn small" data-action="go" data-to="lectura/' + ids[0] + '">📖 Volver a leer: ' + esc(readingById[ids[0]].titulo) + "</button>";
    return '<details class="reread-menu"><summary class="btn small">📖 Volver a leer</summary><ul>' +
      ids.map(function (id) { return '<li><button class="btn link-btn" data-action="go" data-to="lectura/' + id + '">Lectura ' + (C.lecturas.indexOf(readingById[id]) + 1) + ": " + esc(readingById[id].titulo) + "</button></li>"; }).join("") +
      "</ul></details>";
  }

  function attemptsText(r) {
    if (r.status === "correct") return "Resuelto en el intento " + r.attempts + (r.hintUsed ? " (con pista)" : "") + ".";
    if (r.status === "failed") return "Se usaron los " + cfg.maxAttempts + " intentos.";
    return "Intentos usados: " + (r.attempts || 0) + " de " + cfg.maxAttempts + (r.hintUsed ? " · pista usada" : "");
  }

  function renderInputs(ch, ans, disabled) {
    var dis = disabled ? " disabled" : "";
    var cid = ch.id;
    switch (ch.tipo) {
      case "mcq": {
        var ord = shuffleIdx(ch.opciones.length, cid);
        return "<fieldset><legend>" + esc(ch.enunciado) + "</legend>" + ord.map(function (oi) {
          return '<label class="opt"><input type="radio" name="a" value="' + oi + '"' + (ans === oi ? " checked" : "") + dis + "> <span>" + esc(ch.opciones[oi].texto) + "</span></label>";
        }).join("") + "</fieldset>";
      }
      case "tf": {
        var a = ans || {};
        var ordJ = shuffleIdx(ch.justificaciones.length, cid);
        return '<p class="statement">«' + esc(ch.afirmacion) + "»</p>" +
          '<fieldset class="inline"><legend>1. ¿Verdadero o falso?</legend>' +
          '<label class="opt"><input type="radio" name="v" value="true"' + (a.v === "true" ? " checked" : "") + dis + "> Verdadero</label>" +
          '<label class="opt"><input type="radio" name="v" value="false"' + (a.v === "false" ? " checked" : "") + dis + "> Falso</label></fieldset>" +
          "<fieldset><legend>2. Elijan la justificación correcta</legend>" + ordJ.map(function (ji) {
            return '<label class="opt"><input type="radio" name="j" value="' + ji + '"' + (a.j === ji ? " checked" : "") + dis + "> <span>" + esc(ch.justificaciones[ji].texto) + "</span></label>";
          }).join("") + "</fieldset>";
      }
      case "match": {
        var rightOrd = shuffleIdx(ch.pares.length, cid);
        return "<p>" + esc(ch.enunciado) + '</p><div class="grid-rows">' + ch.pares.map(function (p, i) {
          var opts = '<option value="">— Elegir —</option>' + rightOrd.map(function (ri) {
            return '<option value="' + ri + '"' + (ans && ans[i] === ri ? " selected" : "") + ">" + esc(ch.pares[ri].der) + "</option>";
          }).join("");
          return '<div class="row"><label for="m' + i + '">' + esc(p.izq) + '</label><select id="m' + i + '" name="m' + i + '"' + dis + ">" + opts + "</select></div>";
        }).join("") + "</div>";
      }
      case "classify": {
        return "<p>" + esc(ch.enunciado) + '</p><div class="grid-rows">' + shuffleIdx(ch.items.length, cid).map(function (ii) {
          var it = ch.items[ii];
          var opts = '<option value="">— Elegir —</option>' + ch.categorias.map(function (cat, ci) {
            return '<option value="' + ci + '"' + (ans && ans[ii] === ci ? " selected" : "") + ">" + esc(cat) + "</option>";
          }).join("");
          return '<div class="row"><label for="k' + ii + '">' + esc(it.texto) + '</label><select id="k' + ii + '" name="k' + ii + '"' + dis + ">" + opts + "</select></div>";
        }).join("") + "</div>";
      }
      case "fill": {
        var i = 0;
        var html = esc(ch.texto).replace(/\{(\d+)\}/g, function (m, n) {
          var k = Number(n);
          var h = ch.huecos[k];
          var ordF = shuffleIdx(h.opciones.length, cid + "-" + k);
          i++;
          return '<label class="sr-only" for="f' + k + '">Espacio ' + (k + 1) + '</label><select class="inline-select" id="f' + k + '" name="f' + k + '"' + dis + '><option value="">……</option>' +
            ordF.map(function (oi) { return '<option value="' + oi + '"' + (ans && ans[k] === oi ? " selected" : "") + ">" + esc(h.opciones[oi]) + "</option>"; }).join("") + "</select>";
        });
        return "<p>" + esc(ch.enunciado) + '</p><p class="fill-text">' + html + "</p>";
      }
      case "order": {
        var cur = ans || orderDraft[cid] || (orderDraft[cid] = shuffleIdx(ch.pasos.length, cid, true));
        return "<p>" + esc(ch.enunciado) + '</p><p class="muted small">Usen los botones ↑ y ↓ para mover cada paso.</p><ol class="order-list" id="order-list">' + cur.map(function (pi, pos) {
          return '<li class="order-item"><span class="order-text">' + esc(ch.pasos[pi]) + "</span>" +
            (disabled ? "" : '<span class="order-btns"><button type="button" class="btn icon-btn" data-action="move" data-cid="' + cid + '" data-pos="' + pos + '" data-dir="-1" aria-label="Subir: ' + esc(ch.pasos[pi]) + '"' + (pos === 0 ? " disabled" : "") + '>↑</button>' +
              '<button type="button" class="btn icon-btn" data-action="move" data-cid="' + cid + '" data-pos="' + pos + '" data-dir="1" aria-label="Bajar: ' + esc(ch.pasos[pi]) + '"' + (pos === cur.length - 1 ? " disabled" : "") + ">↓</button></span>") + "</li>";
        }).join("") + "</ol>";
      }
      case "lock": {
        var scramble = shuffleIdx(letterChallenges().length, cid + "-letras", true);
        var lcs = letterChallenges();
        var letters = scramble.map(function (li) {
          var c = lcs[li];
          var got = letterEarned(c);
          return '<span class="letter ' + (got ? "on" : "") + '">' + (got ? esc(c.letra) : "?") + "</span>";
        }).join("");
        return '<div class="lock-art">' + svgIcon("candado", 70) + '</div><p>' + esc(ch.enunciado) + '</p><p class="letters" aria-label="Letras obtenidas">' + letters + "</p>" +
          '<div class="field"><label for="key">Clave</label><input id="key" name="key" autocomplete="off" autocapitalize="characters" maxlength="20" value="' + esc(ans || "") + '"' + dis + "></div>";
      }
    }
    return "";
  }

  function readAnswer(ch, form) {
    var v;
    switch (ch.tipo) {
      case "mcq": v = form.querySelector('input[name="a"]:checked'); return v ? Number(v.value) : null;
      case "tf": {
        var a = form.querySelector('input[name="v"]:checked'), j = form.querySelector('input[name="j"]:checked');
        return a && j ? { v: a.value, j: Number(j.value) } : null;
      }
      case "match": {
        var out = [];
        for (var i = 0; i < ch.pares.length; i++) { var s = form.querySelector("#m" + i).value; if (s === "") return null; out.push(Number(s)); }
        return out;
      }
      case "classify": {
        var o2 = [];
        for (var k = 0; k < ch.items.length; k++) { var s2 = form.querySelector("#k" + k).value; if (s2 === "") return null; o2.push(Number(s2)); }
        return o2;
      }
      case "fill": {
        var o3 = [];
        for (var f = 0; f < ch.huecos.length; f++) { var s3 = form.querySelector("#f" + f).value; if (s3 === "") return null; o3.push(Number(s3)); }
        return o3;
      }
      case "order": return (orderDraft[ch.id] || []).slice();
      case "lock": { var key = form.querySelector("#key").value; return key.trim() ? key : null; }
    }
    return null;
  }

  /* Evalúa la respuesta. Devuelve { ok, msg } con la confusión probable. */
  function evaluate(ch, ans) {
    switch (ch.tipo) {
      case "mcq": {
        var o = ch.opciones[ans];
        return { ok: !!o.correcta, msg: o.retro || "" };
      }
      case "tf": {
        var vOk = ans.v === String(ch.respuesta);
        var jo = ch.justificaciones[ans.j];
        if (!vOk) return { ok: false, msg: ch.retroValor };
        return { ok: !!jo.correcta, msg: jo.retro || "Revisen la justificación: el valor de verdad es correcto, pero la razón no." };
      }
      case "match": {
        var bad = ans.filter(function (v, i) { return v !== i; }).length;
        return { ok: bad === 0, msg: bad + " asociación(es) incorrecta(s). " + ch.retroError };
      }
      case "classify": {
        var wrong = [];
        ans.forEach(function (v, i) { if (v !== ch.items[i].categoria) wrong.push(i); });
        var first = wrong.length ? ch.items[wrong[0]] : null;
        return { ok: wrong.length === 0, msg: wrong.length + " caso(s) mal clasificado(s). " + ch.retroError + (first && first.retro ? " Por ejemplo, revisen: «" + first.texto + "»." : "") };
      }
      case "fill": {
        var bf = ans.filter(function (v, i) { return v !== ch.huecos[i].correcta; }).length;
        return { ok: bf === 0, msg: bf + " espacio(s) incorrecto(s). " + ch.retroError };
      }
      case "order": {
        var bo = ans.filter(function (v, i) { return v !== i; }).length;
        return { ok: bo === 0, msg: bo + " paso(s) fuera de lugar. " + ch.retroError };
      }
      case "lock": return { ok: normalizeKey(ans) === normalizeKey(ch.clave), msg: ch.retroError };
    }
    return { ok: false, msg: "" };
  }

  function solutionHtml(ch) {
    switch (ch.tipo) {
      case "mcq": return "<p><strong>Respuesta correcta:</strong> " + esc(ch.opciones.find(function (o) { return o.correcta; }).texto) + "</p>";
      case "tf": return "<p><strong>Respuesta correcta:</strong> " + (ch.respuesta ? "Verdadero" : "Falso") + ". " + esc(ch.justificaciones.find(function (j) { return j.correcta; }).texto) + "</p>";
      case "match": return "<p><strong>Asociaciones correctas:</strong></p><ul>" + ch.pares.map(function (p) { return "<li>" + esc(p.izq) + " → " + esc(p.der) + "</li>"; }).join("") + "</ul>";
      case "classify": return "<p><strong>Clasificación correcta:</strong></p><ul>" + ch.items.map(function (it) { return "<li>" + esc(it.texto) + " → <em>" + esc(ch.categorias[it.categoria]) + "</em>" + (it.retro ? " (" + esc(it.retro) + ")" : "") + "</li>"; }).join("") + "</ul>";
      case "fill": return "<p><strong>Texto completo:</strong> " + esc(ch.texto).replace(/\{(\d+)\}/g, function (m, n) { var h = ch.huecos[Number(n)]; return "<mark>" + esc(h.opciones[h.correcta]) + "</mark>"; }) + "</p>";
      case "order": return "<p><strong>Orden correcto:</strong></p><ol>" + ch.pasos.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ol>";
      case "lock": return "<p><strong>Clave:</strong> " + esc(ch.clave) + "</p>";
      case "open": return "<p><strong>Orientación para una buena respuesta:</strong> " + esc(ch.explicacion) + "</p>";
    }
    return "";
  }

  function readingRef(ch) {
    if (ch.lectura) return " <span class=\"muted\">(Relación con la Lectura " + (C.lecturas.indexOf(readingById[ch.lectura]) + 1) + ": «" + esc(readingById[ch.lectura].titulo) + "»).</span>";
    return "";
  }

  function finalFeedback(ch, r) {
    if (r.status === "correct") {
      var pts = S.pointsFor(ch, r, cfg).points;
      return '<div class="fb-ok"><p><strong>¡Correcto!</strong> Obtuvieron ' + fmtNum(pts) + " de " + ch.valor + " PE.</p><p>" + esc(ch.explicacion) + readingRef(ch) + "</p>" +
        (ch.letra ? '<p class="letter-gain">Letra obtenida para la cerradura: <span class="letter on">' + esc(ch.letra) + "</span></p>" : "") + "</div>";
    }
    if (r.status === "failed") {
      return '<div class="fb-sol"><p><strong>Solución explicada (0 PE).</strong> Usaron los ' + cfg.maxAttempts + " intentos; aquí está la respuesta para que puedan seguir avanzando.</p>" + solutionHtml(ch) + "<p>" + esc(ch.explicacion) + readingRef(ch) + "</p>" +
        (ch.letra ? '<p class="letter-gain">Letra para la cerradura: <span class="letter on">' + esc(ch.letra) + "</span></p>" : "") + "</div>";
    }
    return "";
  }

  function nextButtons(ch) {
    var nxt = nextChallengeFor(ch.zona, ch.id);
    var out = "";
    if (nxt) out += '<button class="btn primary" data-action="go" data-to="desafio/' + nxt.id + '">Siguiente desafío</button>';
    else if (ch.lectura) {
      var z = zoneById[ch.zona];
      var nextR = z.lecturas.find(function (rid) { return !state.readings[rid]; });
      if (nextR) out += '<button class="btn primary" data-action="go" data-to="lectura/' + nextR + '">Siguiente lectura</button>';
    }
    out += '<button class="btn" data-action="go" data-to="zona/' + ch.zona + '">Volver a la zona</button>';
    return out;
  }

  function submitChallenge(form) {
    var ch = challengeById[form.getAttribute("data-cid")];
    var r = state.challenges[ch.id] || (state.challenges[ch.id] = { attempts: 0, wrong: 0, hintUsed: false, status: "pending" });
    if (r.status !== "pending") return;
    var fb = $("#fb");
    var ans = readAnswer(ch, form);
    if (ans === null) {
      fb.className = "feedback warn";
      fb.innerHTML = "<p>Completen todas las respuestas antes de comprobar. (Esto no cuenta como intento).</p>";
      return;
    }
    r.attempts++;
    r.last = ans;
    var res = evaluate(ch, ans);
    if (res.ok) {
      r.status = "correct";
      state.streak = r.attempts === 1 ? state.streak + 1 : 0;
      addXp(r.attempts === 1 ? cfg.xp.correctFirst : cfg.xp.correctLater);
    } else {
      r.wrong++;
      state.streak = 0;
      if (r.attempts >= cfg.maxAttempts) r.status = "failed";
    }
    save();
    if (r.status !== "pending") {
      delete lastFeedback[ch.id];
      checkProgress();
      // Bloquear el formulario y mostrar el resultado final
      $all("input, select, button", form).forEach(function (el) { el.disabled = true; });
      $all(".order-btns", form).forEach(function (el) { el.remove(); });
      fb.className = "feedback";
      fb.innerHTML = finalFeedback(ch, r);
      $("#ch-actions").innerHTML = nextButtons(ch);
      var at = $("#attempts"); if (at) at.textContent = attemptsText(r);
      renderStats();
      if (pendingAnim) playAnim();
    } else {
      var left = cfg.maxAttempts - r.attempts;
      var html = '<div class="fb-bad"><p><strong>Todavía no.</strong> ' + esc(res.msg) + "</p>" +
        "<p>Les queda" + (left === 1 ? " 1 intento" : "n " + left + " intentos") + ". " +
        (r.hintUsed ? "Relean la pista y la lectura." : "Pueden usar la pista (−" + Math.round(cfg.hintPenalty * 100) + " %) o volver a leer.") + "</p>" +
        "<p>" + rereadButtons(ch) + "</p></div>";
      lastFeedback[ch.id] = { kind: "", html: html };
      fb.className = "feedback";
      fb.innerHTML = html;
      var at2 = $("#attempts"); if (at2) at2.textContent = attemptsText(r);
      renderStats();
    }
  }

  /* --- Respuesta abierta con rúbrica --- */
  function rubricTable(prefix, values, disabled) {
    var rb = C.rubrica;
    return '<div class="rubric"><table class="table rubric-table"><caption>Rúbrica (3 criterios, 0 a 2 puntos cada uno)</caption><thead><tr><th scope="col">Criterio</th>' +
      rb.niveles.map(function (n) { return '<th scope="col">' + esc(n.nombre) + " (" + n.puntos + ")</th>"; }).join("") + "</tr></thead><tbody>" +
      rb.criterios.map(function (c) {
        return '<tr><th scope="row">' + esc(c.nombre) + "</th>" + rb.niveles.map(function (n, i) {
          var id = prefix + "-" + c.id + "-" + n.puntos;
          return '<td><label class="rb-cell" for="' + id + '"><input type="radio" id="' + id + '" name="' + prefix + "-" + c.id + '" value="' + n.puntos + '"' +
            (values && Number(values[c.id]) === n.puntos ? " checked" : "") + (disabled ? " disabled" : "") + "> <span>" + esc(c.descriptores[i]) + "</span></label></td>";
        }).join("") + "</tr>";
      }).join("") + "</tbody></table></div>";
  }

  function openChallenge(ch, r) {
    var done = r.status === "submitted";
    var val = r.text || "";
    return '<form id="open-form" class="card challenge" data-cid="' + ch.id + '">' +
      '<p class="statement">' + esc(ch.enunciado) + "</p>" +
      '<div class="field"><label for="open-text">Su respuesta (pareja)</label><textarea id="open-text" rows="8" maxlength="3000"' + (done ? " disabled" : "") + ">" + esc(val) + "</textarea>" +
      '<p class="muted small" id="open-count">' + val.length + " caracteres</p></div>" +
      "<h2>Autoevaluación de la pareja</h2><p class=\"muted\">Lean la rúbrica y marquen, con honestidad, el nivel de su respuesta en cada criterio. Este puntaje es provisorio: el docente lo valida en el informe. No hay corrección automática.</p>" +
      rubricTable("self", r.self, done) +
      (done ? '<div class="feedback" role="status"><p><strong>Respuesta enviada.</strong> Puntaje provisorio según su autoevaluación: ' + fmtNum(S.rubricPoints(ch.valor, r.self)) + " de " + ch.valor + " PE. " +
        (r.teacher ? "Validado por el docente: " + fmtNum(S.rubricPoints(ch.valor, r.teacher)) + " PE." : "Pendiente de validación docente.") + "</p></div>" +
        '<div class="actions">' + nextButtons(ch) + "</div>"
        : '<p class="form-error" id="open-error" role="alert"></p><div class="actions"><button class="btn primary" type="submit">Enviar respuesta y autoevaluación</button></div>') +
      "</form>";
  }

  function submitOpen(form) {
    var ch = challengeById[form.getAttribute("data-cid")];
    var text = $("#open-text").value.trim();
    var err = $("#open-error");
    var self = {};
    var missing = C.rubrica.criterios.filter(function (c) {
      var el = form.querySelector('input[name="self-' + c.id + '"]:checked');
      if (el) self[c.id] = Number(el.value);
      return !el;
    });
    if (text.length < 40) { err.textContent = "Escriban una respuesta más desarrollada (al menos 40 caracteres)."; $("#open-text").focus(); return; }
    if (missing.length) { err.textContent = "Marquen un nivel en cada criterio de la rúbrica (faltan: " + missing.map(function (c) { return c.nombre; }).join(", ") + ")."; return; }
    state.challenges[ch.id] = { attempts: 1, wrong: 0, hintUsed: false, status: "submitted", text: text, self: self, teacher: null };
    addXp(cfg.xp.correctLater);
    checkProgress();
    save();
    render();
    announce("Respuesta enviada. Queda pendiente de validación docente.");
  }

  /* ------------------------------------------------------------------
     Vista: Comprobación individual
     ------------------------------------------------------------------ */
  function indQuestions(m) { return C.individual.filter(function (q) { return q.integrante === m; }); }
  function indDone(m) { return indQuestions(m).every(function (q) { return state.individual.answers[q.id] !== undefined; }); }

  function viewIndividual() {
    if (!individualAvailable()) {
      return '<h1>Comprobación individual</h1><div class="card locked-card">' + svgIcon("candado", 56) +
        "<p>" + (cfg.individualCheckEnabled ? "Se abre después de completar la Puerta del juicio final." : "El docente desactivó la comprobación individual.") + '</p><button class="btn" data-action="go" data-to="mapa">Volver al mapa</button></div>';
    }
    var ind = state.individual;
    var m = !indDone(0) ? 0 : (!indDone(1) ? 1 : null);
    if (m === null) {
      return '<h1>Comprobación individual completada</h1><div class="card"><p>Ambos integrantes respondieron sus preguntas. Los resultados aparecen por separado en el informe.</p>' +
        '<button class="btn primary" data-action="go" data-to="informe">Ver informe final</button></div>';
    }
    var name = state.names[m], other = state.names[1 - m];
    if (!ind.started[m]) {
      return '<h1>Comprobación individual</h1><div class="card turn-card"><p class="kicker">Turno ' + (m + 1) + " de 2</p><h2>Turno de " + esc(name) + "</h2>" +
        "<p>" + esc(other) + ", por favor no mires la pantalla durante este turno.</p>" +
        "<ul><li>Son 3 preguntas, distintas para cada integrante.</li><li>Un solo intento por pregunta, sin pistas.</li><li>El resultado se informa por separado (no se promedia con la pareja).</li></ul>" +
        '<button class="btn primary" data-action="ind-start" data-m="' + m + '">Soy ' + esc(name) + ": comenzar</button></div>";
    }
    var qs = indQuestions(m);
    var q = qs.find(function (x) { return state.individual.answers[x.id] === undefined; });
    var idx = qs.indexOf(q);
    var ord = shuffleIdx(q.opciones.length, q.id);
    return '<h1>Comprobación individual: ' + esc(name) + '</h1><form id="ind-form" class="card" data-qid="' + q.id + '"><p class="kicker">Pregunta ' + (idx + 1) + " de 3 · un solo intento</p>" +
      "<fieldset><legend>" + esc(q.enunciado) + "</legend>" + ord.map(function (oi) {
        return '<label class="opt"><input type="radio" name="iq" value="' + oi + '"> <span>' + esc(q.opciones[oi].texto) + "</span></label>";
      }).join("") + '</fieldset><p class="form-error" id="ind-error" role="alert"></p>' +
      '<div class="actions" id="ind-actions"><button class="btn primary" type="submit">Responder (definitivo)</button></div>' +
      '<div id="ind-fb" class="feedback" role="status" aria-live="polite"></div></form>';
  }

  function submitIndividual(form) {
    var q = C.individual.find(function (x) { return x.id === form.getAttribute("data-qid"); });
    var sel = form.querySelector('input[name="iq"]:checked');
    if (!sel) { $("#ind-error").textContent = "Elige una alternativa."; return; }
    var choice = Number(sel.value);
    var ok = !!q.opciones[choice].correcta;
    state.individual.answers[q.id] = { choice: choice, ok: ok };
    save();
    $all("input, button", form).forEach(function (el) { el.disabled = true; });
    $("#ind-fb").innerHTML = (ok ? "<p><strong>Correcto.</strong> " : "<p><strong>Incorrecto.</strong> La respuesta era: «" + esc(q.opciones.find(function (o) { return o.correcta; }).texto) + "». ") + esc(q.explicacion) + "</p>";
    var m = q.integrante;
    var label = indDone(m) ? (indDone(1 - m) ? "Ver resultado" : "Terminé: pasar el turno a " + state.names[1 - m]) : "Siguiente pregunta";
    $("#ind-actions").innerHTML = '<button class="btn primary" data-action="go" data-to="individual">' + esc(label) + "</button>";
    $("#ind-actions button").focus();
  }

  /* ------------------------------------------------------------------
     Vista: Informe final
     ------------------------------------------------------------------ */
  function recommendations(t) {
    var recs = [];
    C.lecturas.forEach(function (r) {
      var chs = C.desafios.filter(function (c) { return c.lectura === r.id && isActive(c); });
      var weak = chs.filter(function (c) { var x = rec(c.id); return x && (x.status === "failed" || x.attempts > 1 || x.hintUsed); });
      if (weak.length) recs.push("Repasar la Lectura " + (C.lecturas.indexOf(r) + 1) + " «" + r.titulo + "» (desafíos con dificultad: " + weak.map(function (c) { return c.titulo; }).join("; ") + ").");
    });
    C.zonas.forEach(function (z) {
      var zr = t.byZone[z.id];
      if (zr.active && zr.peMax > 0 && zr.completed === zr.total && zr.pct < 70) recs.push("En la zona «" + z.nombre + "» el logro fue " + S.formatPct(zr.pct) + ": conviene revisar sus conceptos clave antes de la próxima clase.");
    });
    var openC = C.desafios.filter(function (c) { return c.tipo === "open" && isActive(c) && rec(c.id) && rec(c.id).self && Number(rec(c.id).self.texto) < 2; });
    if (openC.length) recs.push("En las respuestas abiertas, apoyarse más en una idea concreta de la lectura o del fragmento (criterio «Uso del texto»).");
    if (!recs.length) recs.push("Buen trabajo: no se detectaron dificultades específicas. Como desafío, expliquen a otra pareja la diferencia entre actuar conforme al deber y por deber.");
    return recs;
  }

  function viewReport() {
    var t = S.computeTotals(state, C, cfg);
    var zonesRows = C.zonas.map(function (z) {
      var zr = t.byZone[z.id];
      if (!zr.active) return "<tr><th scope=\"row\">" + esc(z.nombre) + '</th><td colspan="4">Desactivada</td></tr>';
      return "<tr><th scope=\"row\">" + esc(z.nombre) + "</th><td>" + fmtNum(zr.pe) + " / " + fmtNum(zr.peMax) + "</td><td>" + S.formatPct(zr.pct) + "</td><td>" + zr.completed + " / " + zr.total + "</td><td>" + (state.seals[z.id] ? "Sí" : "No") + "</td></tr>";
    }).join("");
    var detailRows = C.desafios.filter(isActive).map(function (c) {
      var r = rec(c.id);
      var st = !r ? "Sin responder" : r.status === "correct" ? "Correcto (intento " + r.attempts + ")" : r.status === "failed" ? "Solución vista" : r.status === "submitted" ? (r.teacher ? "Abierta · validada" : "Abierta · pendiente") : "En curso";
      return "<tr><td>" + esc(c.id) + "</td><td>" + esc(c.titulo) + "</td><td>" + esc(st) + "</td><td>" + (r ? (r.wrong || 0) : 0) + "</td><td>" + (r && r.hintUsed ? "Sí" : "No") + "</td><td>" + fmtNum(S.pointsFor(c, r, cfg).points) + " / " + c.valor + "</td></tr>";
    }).join("");
    var indHtml = "";
    if (cfg.individualCheckEnabled) {
      indHtml = [0, 1].map(function (m) {
        var qs = indQuestions(m);
        var answered = qs.filter(function (q) { return state.individual.answers[q.id] !== undefined; });
        var ok = answered.filter(function (q) { return state.individual.answers[q.id].ok; }).length;
        return '<div class="ind-result"><h3>' + esc(state.names[m] || "Integrante " + (m + 1)) + "</h3>" +
          (answered.length ? "<p><strong>" + ok + " de " + qs.length + "</strong> respuestas correctas" + (answered.length < qs.length ? " (respondió " + answered.length + " de " + qs.length + ")" : "") + ".</p><ul>" +
            qs.map(function (q) { var a = state.individual.answers[q.id]; return "<li>" + esc(q.enunciado) + " — " + (a === undefined ? "sin responder" : a.ok ? "correcta" : "incorrecta") + "</li>"; }).join("") + "</ul>"
            : "<p>Sin responder.</p>") + "</div>";
      }).join("");
      indHtml = '<section aria-labelledby="ind-h"><h2 id="ind-h">Resultado individual (no promediado)</h2><p class="muted small">Se informa por separado; no entra en el porcentaje de la pareja. El docente decide cómo usarlo.</p><div class="ind-grid">' + indHtml + "</div></section>";
    }
    var openHtml = C.desafios.filter(function (c) { return c.tipo === "open" && isActive(c); }).map(function (c) {
      var r = rec(c.id);
      if (!r || !r.text) return '<div class="open-item"><h3>' + esc(c.titulo) + "</h3><p>Sin respuesta.</p></div>";
      var selfPts = S.rubricPoints(c.valor, r.self);
      var crit = C.rubrica.criterios.map(function (k) {
        return "<li>" + esc(k.nombre) + ": autoevaluación " + r.self[k.id] + "/2" + (r.teacher ? " · docente " + r.teacher[k.id] + "/2" : "") + "</li>";
      }).join("");
      var validate = teacherUnlocked
        ? '<form class="validate-form no-print" data-cid="' + c.id + '"><p><strong>Validación docente:</strong></p>' + rubricTable("t-" + c.id, r.teacher || r.self, false) +
          '<div class="actions"><button class="btn primary" type="submit">Guardar validación</button></div></form>'
        : "";
      return '<div class="open-item"><h3>' + esc(c.titulo) + "</h3><p class=\"muted small\">" + esc(c.enunciado) + '</p><blockquote class="student-answer">' + esc(r.text).replace(/\n/g, "<br>") + "</blockquote>" +
        "<ul>" + crit + "</ul><p>Puntaje: " + (r.teacher ? "<strong>validado " + fmtNum(S.rubricPoints(c.valor, r.teacher)) + "</strong>" : "provisorio " + fmtNum(selfPts) + " <em>(pendiente de validación docente)</em>") + " de " + c.valor + " PE.</p>" + validate + "</div>";
    }).join("");
    var recs = recommendations(t).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");

    return '<div class="report-actions no-print actions"><button class="btn primary" data-action="print">Imprimir informe</button>' +
      '<button class="btn" data-action="download">Descargar informe (HTML)</button>' +
      '<button class="btn" data-action="download-json">Descargar datos (JSON)</button>' +
      (teacherUnlocked ? "" : '<button class="btn ghost" data-action="go" data-to="docente">Validar como docente</button>') +
      '<button class="btn" data-action="go" data-to="mapa">Volver al mapa</button></div>' +
      '<article id="report" class="report card">' +
      '<header><p class="kicker">Informe final</p><h1>' + esc(C.titulo) + ": " + esc(C.subtitulo) + "</h1>" +
      "<p><strong>Integrantes:</strong> " + esc(state.names[0]) + " y " + esc(state.names[1]) + " · <strong>Fecha:</strong> " + esc(state.fecha || today()) + "</p>" +
      '<p class="muted small">Contenido: ' + esc(C.obra) + ".</p></header>" +
      '<section class="summary" aria-label="Resumen"><div class="big"><span>Porcentaje</span><strong data-testid="report-pct">' + S.formatPct(t.pct) + "</strong></div>" +
      '<div class="big"><span>PE</span><strong data-testid="report-pe">' + fmtNum(t.pe) + " / " + fmtNum(t.peMax) + "</strong></div>" +
      '<div class="big gold"><span>Décimas</span><strong data-testid="report-decimas">' + t.decimas + "</strong><small>máx. " + cfg.maxDecimas + "</small></div></section>" +
      (t.provisional ? '<p class="warnbox">Hay respuestas abiertas pendientes de validación docente: el porcentaje y las décimas son <strong>provisorios</strong> hasta validarlas.</p>' : "") +
      '<ul class="facts"><li>Desafíos completados: <strong>' + t.completed + " de " + t.total + "</strong></li>" +
      "<li>Aciertos: <strong>" + t.correct + "</strong> (" + t.firstTry + " al primer intento)</li>" +
      "<li>Errores (intentos fallidos): <strong>" + t.wrongAttempts + "</strong> · Soluciones vistas: <strong>" + t.failed + "</strong></li>" +
      "<li>Pistas usadas: <strong>" + t.hints + "</strong></li>" +
      "<li>XP (motivación, no evalúa): " + state.xp + " · Insignias: " + Object.keys(state.badges).length + "</li></ul>" +
      '<section aria-labelledby="z-h"><h2 id="z-h">Resultado por zona</h2><table class="table"><thead><tr><th scope="col">Zona</th><th scope="col">PE</th><th scope="col">%</th><th scope="col">Completados</th><th scope="col">Sello</th></tr></thead><tbody>' + zonesRows + "</tbody></table></section>" +
      indHtml +
      '<section aria-labelledby="o-h"><h2 id="o-h">Respuestas abiertas</h2>' + (openHtml || "<p>No hay respuestas abiertas activas.</p>") + "</section>" +
      '<section aria-labelledby="r-h"><h2 id="r-h">Recomendaciones de repaso</h2><ul>' + recs + "</ul></section>" +
      '<details class="detail"><summary>Detalle por desafío</summary><table class="table small"><thead><tr><th scope="col">Id</th><th scope="col">Desafío</th><th scope="col">Estado</th><th scope="col">Errores</th><th scope="col">Pista</th><th scope="col">PE</th></tr></thead><tbody>' + detailRows + "</tbody></table></details>" +
      '<p class="muted small">Tabla de décimas aplicada: ' + cfg.tramos.map(function (x) { return "desde " + x.desde + " % → " + x.decimas; }).join(" · ") + ". Este informe se generó en el navegador; la aplicación no lo envía a ningún servidor.</p>" +
      "</article>";
  }

  function saveValidation(form) {
    var cid = form.getAttribute("data-cid");
    var r = rec(cid);
    var t = {};
    var ok = C.rubrica.criterios.every(function (k) {
      var el = form.querySelector('input[name="t-' + cid + "-" + k.id + '"]:checked');
      if (el) t[k.id] = Number(el.value);
      return !!el;
    });
    if (!ok) { showToast("Marquen un nivel en cada criterio."); return; }
    r.teacher = t;
    save();
    render();
    showToast("Validación guardada.");
  }

  function reportStandaloneHtml() {
    var node = $("#report").cloneNode(true);
    $all(".no-print, details.detail summary", node).forEach(function (n) { if (n.classList.contains("no-print")) n.remove(); });
    $all("details", node).forEach(function (d) { d.setAttribute("open", ""); });
    var css = "body{font-family:Georgia,serif;max-width:900px;margin:2rem auto;padding:0 1rem;color:#1c1c28;line-height:1.5}table{border-collapse:collapse;width:100%;margin:1rem 0}th,td{border:1px solid #bbb;padding:.4rem;text-align:left;vertical-align:top}.summary{display:flex;gap:1rem;flex-wrap:wrap}.big{border:2px solid #b08a2e;border-radius:8px;padding:.6rem 1rem}.big span{display:block;font-size:.85rem}.big strong{font-size:1.6rem}blockquote{border-left:4px solid #888;margin:0;padding:.3rem 1rem;background:#f5f5f5}.warnbox{border:1px solid #b08a2e;padding:.5rem;background:#fff6dc}.muted{color:#555}.ind-grid{display:flex;gap:1rem;flex-wrap:wrap}.ind-result{border:1px solid #ccc;padding:.5rem 1rem;border-radius:6px;flex:1}";
    return "<!DOCTYPE html><html lang=\"es\"><head><meta charset=\"utf-8\"><title>Informe — " + esc(state.names.join(" y ")) + "</title><style>" + css + "</style></head><body>" + node.innerHTML + "</body></html>";
  }

  function download(name, content, type) {
    try {
      var blob = new Blob([content], { type: type });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = name;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    } catch (e) {
      showToast("No se pudo descargar en este navegador. Usen «Imprimir» y guarden como PDF.");
    }
  }
  function fileSlug() {
    return ("informe-kant-" + state.names.join("-") + "-" + new Date().toISOString().slice(0, 10)).toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9-]+/g, "-");
  }

  /* ------------------------------------------------------------------
     Vista: Panel docente
     ------------------------------------------------------------------ */
  function viewTeacher() {
    if (!teacherUnlocked) {
      return '<div class="teacher"><h1>Panel docente</h1><form id="pin-form" class="card" novalidate><p>Ingrese la clave docente (definida en <code>public/js/config.js</code>).</p>' +
        '<div class="field"><label for="pin">Clave docente</label><input id="pin" type="password" autocomplete="off"></div>' +
        '<p class="form-error" id="pin-error" role="alert"></p><div class="actions"><button class="btn primary" type="submit">Entrar</button>' +
        '<button type="button" class="btn" data-action="go" data-to="' + (state.started ? "mapa" : "inicio") + '">Volver</button></div>' +
        '<p class="muted small">La clave solo evita accesos accidentales; no es una medida de seguridad.</p></form></div>';
    }
    var tabs = [
      ["instrucciones", "Instrucciones"], ["decimas", "Décimas"], ["zonas", "Zonas y desafíos"], ["tiempo", "Temporizador"],
      ["fragmentos", "Fragmentos de lectura"], ["solucionario", "Solucionario"], ["rubrica", "Rúbrica"], ["reiniciar", "Reiniciar"]
    ];
    var tabBtns = tabs.map(function (t) {
      return '<button role="tab" id="tab-' + t[0] + '" aria-controls="tp" aria-selected="' + (teacherTab === t[0]) + '" class="tab ' + (teacherTab === t[0] ? "on" : "") + '" data-action="tab" data-tab="' + t[0] + '">' + t[1] + "</button>";
    }).join("");
    var body = { instrucciones: tInstructions, decimas: tDecimas, zonas: tZones, tiempo: tTimer, fragmentos: tFragments, solucionario: tSolutions, rubrica: tRubric, reiniciar: tReset }[teacherTab]();
    return '<div class="teacher"><header class="teacher-head"><h1>Panel docente</h1><div class="actions"><button class="btn" data-action="go" data-to="informe"' + (state.started ? "" : " disabled") + '>Ver informe</button>' +
      '<button class="btn" data-action="go" data-to="' + (state.started ? "mapa" : "inicio") + '">Salir a la vista estudiante</button><button class="btn" data-action="lock-teacher">Cerrar sesión docente</button></div></header>' +
      '<div role="tablist" aria-label="Secciones del panel docente" class="tabs">' + tabBtns + "</div>" +
      '<section id="tp" role="tabpanel" aria-labelledby="tab-' + teacherTab + '" class="card tpanel">' + body + "</section></div>";
  }

  function tInstructions() {
    var nCh = C.desafios.filter(isActive).length;
    return "<h2>Instrucciones docentes</h2>" +
      "<h3>Duración y organización</h3><p>Aproximadamente <strong>90 minutos</strong>, en parejas, con un computador, tableta o teléfono por pareja. Sugerencia: 5 min de presentación de reglas · 20 min Zona 1 · 30 min Zona 2 · 20 min Zona 3 · 10 min Puerta final y comprobación individual · 5 min cierre con el informe.</p>" +
      "<h3>Objetivos de aprendizaje</h3><ul><li>Comprender por qué Kant busca una filosofía moral pura (a priori) y distinguir regla práctica de ley moral.</li><li>Explicar por qué la buena voluntad es lo único bueno sin restricción y por qué su valor no depende de los resultados.</li><li>Distinguir acciones contrarias al deber, conformes al deber y hechas por deber, identificando motivos.</li><li>Explicar la segunda y la tercera proposición (máxima, respeto, ley práctica) y la diferencia entre prudencia y deber.</li></ul>" +
      "<h3>Contenidos</h3><p>Solo el Prefacio y la Primera sección de la <em>Fundamentación de la metafísica de las costumbres</em>. No se adelanta la Segunda sección ni se trata el imperativo categórico como tema central (se menciona solo como anticipo en la Lectura 10). Se evitó deliberadamente el ejemplo de conservar la propia vida.</p>" +
      "<h3>Fragmentos de Kant</h3><p>La app <strong>no incluye citas</strong>: todo el texto es explicación original. En la pestaña <em>Fragmentos de lectura</em> puede pegar, para cada lectura, un fragmento de la edición autorizada que use el curso, con su edición y página. Se guarda en este navegador. Para que valga en todos los equipos, cópielo en <code>public/js/content.js</code> y vuelva a desplegar.</p>" +
      "<h3>Reglas de puntaje y décimas</h3><ul><li>PE por desafío: " + cfg.attemptMultipliers.map(function (x, i) { return (i + 1) + ".er/º intento " + Math.round(x * 100) + " %"; }).join(" · ") + ". Pista: −" + Math.round(cfg.hintPenalty * 100) + " % del valor. Máximo " + cfg.maxAttempts + " intentos; luego, solución con 0 PE.</li>" +
      "<li>Porcentaje = PE obtenidos ÷ PE máximos de los desafíos activos (actualmente " + nCh + " desafíos). La XP no participa.</li>" +
      "<li>Las respuestas abiertas suman un puntaje provisorio (autoevaluación) hasta que usted lo valida en el informe; al validar, el porcentaje y las décimas se recalculan.</li>" +
      "<li>La comprobación individual se informa por separado para cada integrante y no entra en el porcentaje.</li></ul>" +
      "<h3>Almacenamiento</h3><p>El progreso se guarda solo en el navegador de cada equipo (localStorage). " + (ST.available ? "" : "<strong>En este navegador el almacenamiento no está disponible: el progreso se perderá al recargar.</strong> ") +
      "La app no envía resultados a ningún servidor: pida a cada pareja imprimir o descargar su informe al terminar. Para otra pareja en el mismo equipo, use <em>Reiniciar</em>.</p>";
  }

  function tDecimas() {
    var rows = cfg.tramos.map(function (t, i) {
      return '<tr><td><label class="sr-only" for="td-' + i + '">Desde (%) tramo ' + (i + 1) + '</label><input type="number" id="td-' + i + '" class="t-desde" min="0" max="100" step="0.1" value="' + t.desde + '"></td>' +
        '<td><label class="sr-only" for="tc-' + i + '">Décimas tramo ' + (i + 1) + '</label><input type="number" id="tc-' + i + '" class="t-dec" min="0" step="1" value="' + t.decimas + '"></td>' +
        '<td><button type="button" class="btn small" data-action="del-tramo" data-i="' + i + '" aria-label="Eliminar tramo ' + (i + 1) + '">Eliminar</button></td></tr>';
    }).join("");
    return "<h2>Tabla de décimas</h2><p>Cada tramo se aplica desde el porcentaje indicado (incluido) hasta el siguiente tramo (excluido). El primer tramo debe comenzar en 0 %.</p>" +
      '<form id="dec-form" novalidate><div class="field inline"><label for="maxdec">Máximo de décimas</label><input type="number" id="maxdec" min="0" max="70" step="1" value="' + cfg.maxDecimas + '"></div>' +
      '<table class="table"><thead><tr><th scope="col">Desde (%)</th><th scope="col">Décimas</th><th scope="col"><span class="sr-only">Acciones</span></th></tr></thead><tbody id="tramos-body">' + rows + "</tbody></table>" +
      '<div class="actions"><button type="button" class="btn" data-action="add-tramo">Agregar tramo</button><button type="submit" class="btn primary">Guardar tabla</button><button type="button" class="btn" data-action="reset-tramos">Restaurar tabla inicial</button></div>' +
      '<p class="form-error" id="dec-error" role="alert"></p></form>' +
      '<div class="card inset"><h3>Probar la tabla</h3><div class="field inline"><label for="test-pct">Porcentaje</label><input type="number" id="test-pct" min="0" max="100" step="0.1" value="75"><button class="btn" data-action="test-pct">Calcular</button></div><p id="test-out" role="status" aria-live="polite"></p></div>';
  }

  function readTramosForm() {
    var desde = $all(".t-desde").map(function (i) { return Number(i.value); });
    var dec = $all(".t-dec").map(function (i) { return Number(i.value); });
    return { max: Number($("#maxdec").value), tramos: desde.map(function (d, i) { return { desde: d, decimas: dec[i] }; }) };
  }

  function tZones() {
    var z = C.zonas.map(function (zn) {
      var chs = C.desafios.filter(function (c) { return c.zona === zn.id; }).map(function (c) {
        return '<li><label class="check"><input type="checkbox" class="ch-toggle" value="' + c.id + '"' + (cfg.disabledChallenges.indexOf(c.id) === -1 ? " checked" : "") + "> " + esc(c.id) + " · " + esc(c.titulo) + " <span class=\"muted\">(" + esc(typeName(c.tipo)) + ", " + c.valor + " PE)</span></label></li>";
      }).join("");
      return '<fieldset class="zone-fs"><legend><label class="check"><input type="checkbox" class="zone-toggle" value="' + zn.id + '"' + (cfg.zonesEnabled[zn.id] ? " checked" : "") + "> <strong>" + esc(zn.nombre) + "</strong></label></legend><ul class=\"plain\">" + chs + "</ul></fieldset>";
    }).join("");
    return "<h2>Activar o desactivar zonas y desafíos</h2><p>Los desafíos desactivados no aparecen ni cuentan en el porcentaje. Una zona desactivada no se exige para abrir la Puerta final. Si desactiva un desafío que entrega una letra de la cerradura, la letra se entrega automáticamente.</p>" +
      '<form id="zones-form">' + z + '<label class="check"><input type="checkbox" id="ind-toggle"' + (cfg.individualCheckEnabled ? " checked" : "") + "> Comprobación individual al final</label>" +
      '<div class="actions"><button class="btn primary" type="submit">Guardar</button></div></form>';
  }

  function tTimer() {
    return "<h2>Temporizador opcional</h2><p>Use 0 para no mostrar temporizador. Al llegar a cero solo aparece un aviso; la actividad no se bloquea.</p>" +
      '<form id="timer-form"><div class="field inline"><label for="tmin">Minutos</label><input type="number" id="tmin" min="0" max="240" step="1" value="' + cfg.timerMinutes + '"></div>' +
      '<div class="actions"><button class="btn primary" type="submit">Guardar (se aplica en la próxima partida)</button>' +
      (state.started ? '<button type="button" class="btn" data-action="timer-now">Aplicar ahora a la partida en curso</button>' : "") + "</div></form>";
  }

  function tFragments() {
    var items = C.lecturas.map(function (r, i) {
      var f = fragments[r.id] || r.fragmento || {};
      var fromFile = !(fragments[r.id] && fragments[r.id].texto) && r.fragmento && r.fragmento.texto;
      return '<fieldset class="frag-fs"><legend>Lectura ' + (i + 1) + ": " + esc(r.titulo) + ' <span class="muted">(' + esc(r.ubicacion.seccion) + ", " + esc(r.ubicacion.akSugerida) + ")</span></legend>" +
        (fromFile ? '<p class="muted small">Este fragmento viene de content.js.</p>' : "") +
        '<div class="field"><label for="fx-' + r.id + '">Fragmento (texto de su edición; marque cortes con [...])</label><textarea id="fx-' + r.id + '" rows="5">' + esc(f.texto || "") + "</textarea></div>" +
        '<div class="two"><div class="field"><label for="fe-' + r.id + '">Traducción / edición</label><input id="fe-' + r.id + '" value="' + esc(f.edicion || "") + '"></div>' +
        '<div class="field"><label for="fp-' + r.id + '">Página o referencia</label><input id="fp-' + r.id + '" value="' + esc(f.pagina || "") + '"></div></div></fieldset>';
    }).join("");
    return "<h2>Fragmentos de lectura</h2><p>Pegue aquí, para cada lectura, el fragmento de la edición autorizada del curso. Aparecerá en el panel «Lectura de referencia», separado visualmente de las explicaciones didácticas. Respete los derechos de autor de la edición que utilice y cite edición y página.</p>" +
      '<form id="frag-form">' + items + '<div class="actions sticky-actions"><button class="btn primary" type="submit">Guardar fragmentos en este navegador</button><button type="button" class="btn" data-action="export-frag">Copiar como código para content.js</button></div></form>' +
      '<div id="frag-export" hidden><label for="frag-code">Código para pegar en content.js (reemplace cada «fragmento: {…}»)</label><textarea id="frag-code" rows="10" readonly></textarea></div>';
  }

  function tSolutions() {
    var byZone = C.zonas.map(function (z) {
      var reads = z.lecturas.map(function (rid) {
        var r = readingById[rid];
        var good = r.pregunta.opciones.find(function (o) { return o.correcta; });
        return "<li><strong>Pregunta previa — " + esc(r.titulo) + ":</strong> " + esc(good.texto) + "</li>";
      }).join("");
      var chs = C.desafios.filter(function (c) { return c.zona === z.id; }).map(function (c) {
        var body = c.tipo === "open" ? "<p>" + esc(c.enunciado) + "</p>" + solutionHtml(c) : "<p>" + esc(c.enunciado || c.afirmacion || "") + "</p>" + solutionHtml(c) + "<p><em>Explicación:</em> " + esc(c.explicacion) + "</p>" + (c.pista ? "<p><em>Pista:</em> " + esc(c.pista) + "</p>" : "");
        return '<details class="sol"><summary>' + esc(c.id) + " · " + esc(c.titulo) + " (" + esc(typeName(c.tipo)) + ", " + c.valor + " PE" + (isActive(c) ? "" : ", desactivado") + ")</summary>" + body + "</details>";
      }).join("");
      return "<h3>" + esc(z.nombre) + "</h3>" + (reads ? '<ul class="small">' + reads + "</ul>" : "") + chs;
    }).join("");
    var ind = "<h3>Comprobación individual</h3>" + [0, 1].map(function (m) {
      return "<p><strong>Integrante " + (m + 1) + ":</strong></p><ul>" + indQuestions(m).map(function (q) { return "<li>" + esc(q.enunciado) + " → " + esc(q.opciones.find(function (o) { return o.correcta; }).texto) + "</li>"; }).join("") + "</ul>";
    }).join("");
    return "<h2>Solucionario explicado</h2>" + byZone + ind;
  }

  function tRubric() {
    var c = C.desafios.filter(function (x) { return x.tipo === "open"; }).map(function (x) { return "<li><strong>" + esc(x.titulo) + ":</strong> " + esc(x.explicacion) + "</li>"; }).join("");
    return "<h2>Rúbrica de respuestas abiertas</h2><p>Cada criterio vale de 0 a 2 puntos. PE = valor del desafío × (suma ÷ 6). La pareja se autoevalúa; usted valida en el informe (pestaña de informe con sesión docente abierta).</p>" +
      rubricTable("view", null, true) + "<h3>Orientaciones por pregunta</h3><ul>" + c + "</ul>";
  }

  function tReset() {
    return "<h2>Reiniciar</h2><p>«Reiniciar para otra pareja» borra la partida en curso de este navegador (nombres, respuestas, puntajes). La configuración docente y los fragmentos se conservan. <strong>Antes, asegúrese de que la pareja imprimió o descargó su informe.</strong></p>" +
      '<div class="actions"><button class="btn danger" data-action="reset-game">Reiniciar actividad para otra pareja</button></div>' +
      "<hr><p>«Restaurar configuración inicial» descarta los cambios hechos en este panel (décimas, zonas, temporizador) y vuelve a los valores de <code>config.js</code>. No borra los fragmentos.</p>" +
      '<div class="actions"><button class="btn" data-action="reset-config">Restaurar configuración inicial</button></div>';
  }

  /* ------------------------------------------------------------------
     Otras vistas
     ------------------------------------------------------------------ */
  function notFound() {
    return '<h1>No encontramos esta página</h1><button class="btn" data-action="go" data-to="mapa">Ir al mapa</button>';
  }

  /* ------------------------------------------------------------------
     Eventos
     ------------------------------------------------------------------ */
  function confirmBox(msg) { try { return window.confirm(msg); } catch (e) { return true; } }

  function startGame(names) {
    state = newState();
    state.started = true;
    state.names = names;
    state.fecha = today();
    state.startedAt = Date.now();
    if (cfg.timerMinutes > 0) state.timerEnd = Date.now() + cfg.timerMinutes * 60000;
    orderDraft = {}; hintOpen = {}; lastFeedback = {};
    document.getElementById("timer-banner").hidden = true;
    save();
    go("mapa");
  }

  function resetGame() {
    ST.remove(KEYS.game);
    state = newState();
    orderDraft = {}; hintOpen = {}; lastFeedback = {};
    document.getElementById("timer-banner").hidden = true;
    save();
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    if (btn.getAttribute("aria-disabled") === "true") { e.preventDefault(); announce("Todavía no está disponible."); showToast("Todavía no está disponible."); return; }
    var a = btn.getAttribute("data-action");
    switch (a) {
      case "go": e.preventDefault(); go(btn.getAttribute("data-to")); break;
      case "new-game":
        if (confirmBox("¿Comenzar una nueva partida? Se borrará el progreso de este navegador. Antes, descarguen o impriman su informe si lo necesitan.")) { resetGame(); go("inicio"); render(); }
        break;
      case "hint": {
        var cid = btn.getAttribute("data-cid");
        var r = state.challenges[cid] || (state.challenges[cid] = { attempts: 0, wrong: 0, hintUsed: false, status: "pending" });
        r.hintUsed = true; hintOpen[cid] = true; save();
        var ch = challengeById[cid];
        var box = document.createElement("div");
        box.className = "hint"; box.id = "hint-box";
        box.innerHTML = "<strong>Pista:</strong> " + esc(ch.pista);
        btn.replaceWith(box);
        var at = $("#attempts"); if (at) at.textContent = attemptsText(r);
        announce("Pista: " + ch.pista);
        break;
      }
      case "move": {
        var c2 = btn.getAttribute("data-cid"), pos = Number(btn.getAttribute("data-pos")), dir = Number(btn.getAttribute("data-dir"));
        var arr = orderDraft[c2];
        var np = pos + dir;
        if (np < 0 || np >= arr.length) return;
        var t = arr[pos]; arr[pos] = arr[np]; arr[np] = t;
        var form = $("#ch-form");
        form.innerHTML = renderInputs(challengeById[c2], null, false);
        var target = form.querySelector('[data-pos="' + np + '"][data-dir="' + dir + '"]') || form.querySelector('[data-pos="' + np + '"]');
        if (target && !target.disabled) target.focus(); else { var alt = form.querySelector('[data-pos="' + np + '"]:not([disabled])'); if (alt) alt.focus(); }
        announce("Paso movido a la posición " + (np + 1) + ": " + challengeById[c2].pasos[arr[np]]);
        break;
      }
      case "close-overlay": {
        var ov = document.getElementById("overlay");
        ov.hidden = true; ov.innerHTML = "";
        render();
        break;
      }
      case "font-down": prefs.scale = Math.max(0.85, Math.round((prefs.scale - 0.1) * 100) / 100); applyPrefs(); break;
      case "font-up": prefs.scale = Math.min(1.5, Math.round((prefs.scale + 0.1) * 100) / 100); applyPrefs(); break;
      case "toggle-light": prefs.light = !prefs.light; applyPrefs(); break;
      case "close-notice": ST.set(KEYS.notice, true); document.getElementById("storage-notice").hidden = true; break;
      case "ind-start": state.individual.started[Number(btn.getAttribute("data-m"))] = true; save(); render(); break;
      case "print": window.print(); break;
      case "download": download(fileSlug() + ".html", reportStandaloneHtml(), "text/html;charset=utf-8"); break;
      case "download-json": {
        var t2 = S.computeTotals(state, C, cfg);
        download(fileSlug() + ".json", JSON.stringify({ integrantes: state.names, fecha: state.fecha, totales: t2, config: { tramos: cfg.tramos, maxDecimas: cfg.maxDecimas }, partida: state }, null, 2), "application/json");
        break;
      }
      /* Panel docente */
      case "tab": teacherTab = btn.getAttribute("data-tab"); render(); var tb = $("#tab-" + teacherTab); if (tb) tb.focus(); break;
      case "lock-teacher": teacherUnlocked = false; render(); break;
      case "add-tramo": {
        var cur = readTramosForm();
        var last = cur.tramos[cur.tramos.length - 1];
        cur.tramos.push({ desde: Math.min(100, (last ? last.desde : 0) + 5), decimas: last ? last.decimas : 0 });
        cfg.tramos = cur.tramos; cfg.maxDecimas = cur.max; render(); break;
      }
      case "del-tramo": {
        var cur2 = readTramosForm();
        cur2.tramos.splice(Number(btn.getAttribute("data-i")), 1);
        cfg.tramos = cur2.tramos; cfg.maxDecimas = cur2.max; render(); break;
      }
      case "reset-tramos": cfg.tramos = clone(BASE.tramos); cfg.maxDecimas = BASE.maxDecimas; saveConfig(); render(); showToast("Tabla inicial restaurada."); break;
      case "test-pct": {
        var p = Number($("#test-pct").value);
        var cur3 = readTramosForm();
        var errs = S.validateTramos(cur3.tramos, cur3.max);
        $("#test-out").textContent = errs.length ? "Corrija la tabla primero: " + errs[0] : "Con " + p + " % se obtienen " + S.decimasFor(p, cur3.tramos, cur3.max) + " décimas (según la tabla en pantalla).";
        break;
      }
      case "timer-now": {
        var mins = Number($("#tmin").value) || 0;
        cfg.timerMinutes = mins; saveConfig();
        state.timerEnd = mins > 0 ? Date.now() + mins * 60000 : null; state.timerWarned = false; save();
        document.getElementById("timer-banner").hidden = true;
        showToast(mins > 0 ? "Temporizador de " + mins + " min aplicado a la partida en curso." : "Temporizador desactivado.");
        render();
        break;
      }
      case "export-frag": {
        var code = C.lecturas.map(function (r) {
          var f = { texto: ($("#fx-" + r.id) || {}).value || "", edicion: ($("#fe-" + r.id) || {}).value || "", pagina: ($("#fp-" + r.id) || {}).value || "" };
          return "/* " + r.id + " */ fragmento: " + JSON.stringify(f, null, 2) + ",";
        }).join("\n\n");
        $("#frag-export").hidden = false; $("#frag-code").value = code; $("#frag-code").focus(); $("#frag-code").select();
        break;
      }
      case "reset-game":
        if (confirmBox("¿Reiniciar la actividad para otra pareja? Se borrará la partida actual de este navegador.")) { resetGame(); showToast("Actividad reiniciada."); go("inicio"); }
        break;
      case "reset-config":
        if (confirmBox("¿Restaurar la configuración inicial de config.js?")) { ST.remove(KEYS.config); cfg = loadConfig(); render(); showToast("Configuración inicial restaurada."); }
        break;
    }
  });

  document.addEventListener("submit", function (e) {
    var f = e.target;
    e.preventDefault();
    switch (f.id) {
      case "start-form": {
        var n1 = $("#n1").value.trim(), n2 = $("#n2").value.trim();
        var err = $("#start-error");
        if (!n1 || !n2) { err.textContent = "Escriban el nombre de ambos integrantes."; (n1 ? $("#n2") : $("#n1")).focus(); return; }
        if (!$("#rules-ok").checked) { err.textContent = "Confirmen que leyeron las reglas de puntaje y décimas."; $("#rules-ok").focus(); return; }
        startGame([n1, n2]);
        break;
      }
      case "pre-form": {
        var rid = f.getAttribute("data-rid");
        var sel = f.querySelector('input[name="pre"]:checked');
        var fb = $("#pre-fb");
        if (!sel) { fb.innerHTML = "<p>Elijan una alternativa.</p>"; return; }
        var first = !state.pre[rid];
        state.pre[rid] = { choice: Number(sel.value) };
        if (first) addXp(cfg.xp.preQuestion);
        save(); renderStats();
        fb.innerHTML = preFeedback(readingById[rid].pregunta, Number(sel.value));
        break;
      }
      case "ch-form": submitChallenge(f); break;
      case "open-form": submitOpen(f); break;
      case "ind-form": submitIndividual(f); break;
      case "pin-form": {
        if ($("#pin").value === cfg.teacherPin) { teacherUnlocked = true; render(); }
        else { $("#pin-error").textContent = "Clave incorrecta."; $("#pin").select(); }
        break;
      }
      case "dec-form": {
        var cur = readTramosForm();
        var errs = S.validateTramos(cur.tramos, cur.max);
        if (errs.length) { $("#dec-error").innerHTML = errs.map(esc).join("<br>"); return; }
        cfg.tramos = cur.tramos; cfg.maxDecimas = cur.max; saveConfig(); render(); showToast("Tabla de décimas guardada.");
        break;
      }
      case "zones-form": {
        $all(".zone-toggle", f).forEach(function (i) { cfg.zonesEnabled[i.value] = i.checked; });
        cfg.disabledChallenges = $all(".ch-toggle", f).filter(function (i) { return !i.checked; }).map(function (i) { return i.value; });
        cfg.individualCheckEnabled = $("#ind-toggle").checked;
        saveConfig(); checkProgress(); render(); showToast("Zonas y desafíos guardados.");
        break;
      }
      case "timer-form": {
        cfg.timerMinutes = Math.max(0, Number($("#tmin").value) || 0); saveConfig(); showToast("Temporizador guardado para la próxima partida."); render();
        break;
      }
      case "frag-form": {
        C.lecturas.forEach(function (r) {
          var t = $("#fx-" + r.id).value;
          if (t.trim()) fragments[r.id] = { texto: t, edicion: $("#fe-" + r.id).value.trim(), pagina: $("#fp-" + r.id).value.trim() };
          else delete fragments[r.id];
        });
        ST.set(KEYS.frag, fragments); showToast("Fragmentos guardados en este navegador.");
        break;
      }
      default:
        if (f.classList.contains("validate-form")) saveValidation(f);
    }
  });

  document.addEventListener("input", function (e) {
    if (e.target.id === "open-text") { var c = $("#open-count"); if (c) c.textContent = e.target.value.length + " caracteres"; }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { var ov = document.getElementById("overlay"); if (!ov.hidden) { ov.hidden = true; ov.innerHTML = ""; render(); } }
  });

  function applyPrefs() {
    document.documentElement.style.setProperty("--scale", prefs.scale);
    document.body.classList.toggle("light", !!prefs.light);
    var lb = document.getElementById("btn-light");
    if (lb) { lb.setAttribute("aria-pressed", String(!!prefs.light)); lb.textContent = prefs.light ? "Fondo oscuro" : "Fondo claro"; }
    ST.set(KEYS.prefs, prefs);
  }

  /* ------------------------------------------------------------------
     Inicio
     ------------------------------------------------------------------ */
  function init() {
    applyPrefs();
    var notice = document.getElementById("storage-notice");
    if (!ST.available) {
      notice.querySelector("p").innerHTML = "<strong>Aviso:</strong> este navegador no permite guardar datos locales. La actividad funciona, pero <strong>el progreso se perderá si recargan o cierran la página</strong>. Al terminar, impriman o descarguen el informe.";
      notice.hidden = false;
    } else if (!ST.get(KEYS.notice, false)) {
      notice.hidden = false;
    }
    if (state.timerEnd && state.timerEnd < Date.now() && state.timerWarned) document.getElementById("timer-banner").hidden = false;
    window.addEventListener("hashchange", render);
    render();
  }

  /* Expuesto solo para pruebas automatizadas. */
  window.__kant = { state: function () { return state; }, cfg: function () { return cfg; }, totals: function () { return S.computeTotals(state, C, cfg); } };

  init();
})();
