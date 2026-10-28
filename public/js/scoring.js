/* =====================================================================
   PUNTAJE Y DÉCIMAS — funciones puras (sin acceso a la página).
   Se usan en la aplicación y en las pruebas automatizadas.
   Regla central: el porcentaje = PE obtenidos / PE máximos de los
   desafíos ACTIVOS. La XP nunca participa en este cálculo.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.KantScoring = factory();
}(typeof self !== "undefined" ? self : this, function () {

  var EPS = 1e-9;

  function round2(n) { return Math.round(n * 100) / 100; }

  /* PE de un desafío cerrado (no abierto).
     attempt: número de intento en que acertaron (1, 2, 3) o null si fallaron.
     hintUsed: si usaron la pista. */
  function challengePoints(valor, attempt, hintUsed, cfg) {
    if (!attempt) return 0;
    var mult = cfg.attemptMultipliers[attempt - 1];
    if (mult === undefined) return 0;
    var pts = valor * mult - (hintUsed ? valor * cfg.hintPenalty : 0);
    return round2(Math.max(0, pts));
  }

  /* PE de una respuesta abierta según la rúbrica (3 criterios, 0–2 c/u). */
  function rubricPoints(valor, scores) {
    if (!scores) return 0;
    var keys = Object.keys(scores);
    var sum = 0;
    keys.forEach(function (k) { sum += Number(scores[k]) || 0; });
    return round2(valor * sum / 6);
  }

  /* Décimas según tabla. Se aplica el último tramo cuyo "desde" <= pct. */
  function decimasFor(pct, tramos, maxDecimas) {
    var sorted = tramos.slice().sort(function (a, b) { return a.desde - b.desde; });
    var d = 0;
    for (var i = 0; i < sorted.length; i++) {
      if (pct + EPS >= sorted[i].desde) d = sorted[i].decimas;
    }
    return Math.max(0, Math.min(maxDecimas, d));
  }

  /* Validación de la tabla editada por el docente. Devuelve lista de errores. */
  function validateTramos(tramos, maxDecimas) {
    var errs = [];
    if (!Array.isArray(tramos) || tramos.length === 0) return ["La tabla debe tener al menos un tramo."];
    if (!(maxDecimas >= 0 && maxDecimas <= 70)) errs.push("El máximo de décimas debe estar entre 0 y 70.");
    var prev = null;
    tramos.forEach(function (t, i) {
      if (!(t.desde >= 0 && t.desde <= 100)) errs.push("Tramo " + (i + 1) + ": el porcentaje debe estar entre 0 y 100.");
      if (!(t.decimas >= 0)) errs.push("Tramo " + (i + 1) + ": las décimas no pueden ser negativas.");
      if (t.decimas > maxDecimas) errs.push("Tramo " + (i + 1) + ": supera el máximo de " + maxDecimas + " décimas.");
      if (prev) {
        if (t.desde <= prev.desde) errs.push("Tramo " + (i + 1) + ": los porcentajes deben ir de menor a mayor.");
        if (t.decimas < prev.decimas) errs.push("Tramo " + (i + 1) + ": las décimas no pueden bajar al subir el porcentaje.");
      }
      prev = t;
    });
    if (tramos[0] && tramos[0].desde !== 0) errs.push("El primer tramo debe comenzar en 0 %.");
    return errs;
  }

  function isChallengeActive(ch, cfg) {
    return !!cfg.zonesEnabled[ch.zona] && cfg.disabledChallenges.indexOf(ch.id) === -1;
  }

  /* Puntaje de un desafío según su registro en el estado. */
  function pointsFor(ch, rec, cfg) {
    if (!rec) return { points: 0, provisional: false };
    if (ch.tipo === "open") {
      if (rec.teacher) return { points: rubricPoints(ch.valor, rec.teacher), provisional: false };
      if (rec.self) return { points: rubricPoints(ch.valor, rec.self), provisional: true };
      return { points: 0, provisional: false };
    }
    if (rec.status === "correct") return { points: challengePoints(ch.valor, rec.attempts, rec.hintUsed, cfg), provisional: false };
    return { points: 0, provisional: false };
  }

  /* Totales para el informe y el marcador. */
  function computeTotals(state, content, cfg) {
    var res = {
      pe: 0, peMax: 0, pct: 0, decimas: 0,
      completed: 0, total: 0, firstTry: 0, correct: 0, failed: 0,
      wrongAttempts: 0, hints: 0, provisional: false, byZone: {}
    };
    content.zonas.forEach(function (z) {
      res.byZone[z.id] = { pe: 0, peMax: 0, pct: 0, completed: 0, total: 0, active: !!cfg.zonesEnabled[z.id] };
    });
    content.desafios.forEach(function (ch) {
      if (!isChallengeActive(ch, cfg)) return;
      var rec = state.challenges[ch.id];
      var zr = res.byZone[ch.zona];
      res.peMax += ch.valor; zr.peMax += ch.valor;
      res.total++; zr.total++;
      var p = pointsFor(ch, rec, cfg);
      res.pe += p.points; zr.pe += p.points;
      if (p.provisional) res.provisional = true;
      if (rec && rec.status && rec.status !== "pending") {
        res.completed++; zr.completed++;
        if (rec.status === "correct") { res.correct++; if (rec.attempts === 1) res.firstTry++; }
        if (rec.status === "failed") res.failed++;
      }
      if (rec) {
        res.wrongAttempts += rec.wrong || 0;
        if (rec.hintUsed) res.hints++;
      }
    });
    res.pe = round2(res.pe);
    res.pct = res.peMax > 0 ? (res.pe / res.peMax) * 100 : 0;
    Object.keys(res.byZone).forEach(function (k) {
      var z = res.byZone[k];
      z.pe = round2(z.pe);
      z.pct = z.peMax > 0 ? (z.pe / z.peMax) * 100 : 0;
    });
    res.decimas = decimasFor(res.pct, cfg.tramos, cfg.maxDecimas);
    return res;
  }

  function formatPct(p) {
    return (Math.round(p * 10) / 10).toLocaleString("es-CL", { maximumFractionDigits: 1 }) + " %";
  }

  return {
    challengePoints: challengePoints,
    rubricPoints: rubricPoints,
    decimasFor: decimasFor,
    validateTramos: validateTramos,
    isChallengeActive: isChallengeActive,
    pointsFor: pointsFor,
    computeTotals: computeTotals,
    formatPct: formatPct
  };
}));
