/* =====================================================================
   ALMACENAMIENTO LOCAL (Fase 1)
   Guarda el progreso SOLO en este navegador (localStorage).
   Todas las lecturas y escrituras están protegidas con try/catch:
   si el navegador bloquea el almacenamiento (modo privado estricto,
   políticas del colegio, etc.), la app sigue funcionando en memoria,
   pero el progreso se pierde al recargar la página.
   Esta aplicación NO envía ni guarda datos en ningún servidor.
   ===================================================================== */
window.KantStorage = (function () {
  var memory = {};
  var available = (function () {
    try {
      var k = "__kant_test__";
      window.localStorage.setItem(k, "1");
      window.localStorage.removeItem(k);
      return true;
    } catch (e) { return false; }
  })();

  function get(key, fallback) {
    try {
      var raw = available ? window.localStorage.getItem(key) : memory[key];
      if (raw === null || raw === undefined) return fallback;
      return JSON.parse(raw);
    } catch (e) { return fallback; }
  }

  function set(key, value) {
    var raw = JSON.stringify(value);
    try {
      if (available) window.localStorage.setItem(key, raw);
      else memory[key] = raw;
      return true;
    } catch (e) {
      memory[key] = raw;
      return false;
    }
  }

  function remove(key) {
    try { if (available) window.localStorage.removeItem(key); } catch (e) { /* sin acción */ }
    delete memory[key];
  }

  return { get: get, set: set, remove: remove, available: available };
})();
