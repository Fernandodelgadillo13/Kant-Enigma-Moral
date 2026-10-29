// Recorre una partida completa, verifica el puntaje (PE), la tabla de
// décimas modificada desde el panel docente, la validación docente de
// respuestas abiertas y la comprobación individual.
const { test, expect } = require("@playwright/test");
const { startGame, openReading, solve, closeOverlayIfAny } = require("./helpers");

const ZONES = {
  z1: { readings: ["r1", "r2", "r3"], challenges: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"] },
  z2: { readings: ["r4", "r5", "r6", "r7"], challenges: ["c8", "c9", "c10", "c11", "c12", "c13", "c14", "c15", "c16", "c17", "c18"] },
  z3: { readings: ["r8", "r9", "r10"], challenges: ["c19", "c20", "c21", "c22", "c23", "c24", "c25", "c26", "c27", "c28", "c29"] },
  z4: { readings: [], challenges: ["c30", "c31", "c32", "c33", "c34"] }
};

test("partida completa: zonas, sellos, puntaje, décimas e informe", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await startGame(page);

  // Zona 2 bloqueada al inicio
  await page.goto("/#/zona/z2");
  await expect(page.locator(".locked-card")).toBeVisible();

  // Un desafío no se abre antes de leer
  await page.goto("/#/desafio/c1");
  await expect(page.locator(".locked-card")).toContainText("Primero abran la lectura");

  // Pregunta previa (sin nota) con retroalimentación
  await openReading(page, "r1");
  // El fragmento de García Morente aparece separado de la explicación
  await expect(page.locator(".panel.fragment .kant-quote")).toContainText("Todo conocimiento racional");
  await expect(page.locator(".panel.fragment .ref")).toContainText("García Morente");
  await expect(page.locator(".label-noquote")).toHaveText("Explicación (no es cita)");
  const correctPre = await page.evaluate(() => window.KANT_CONTENT.lecturas[0].pregunta.opciones.findIndex((o) => o.correcta));
  await page.check(`input[name="pre"][value="${correctPre}"]`);
  await page.click("button:has-text('Comprobar comprensión')");
  await expect(page.locator("#pre-fb")).toContainText("Exacto");

  for (const [zid, z] of Object.entries(ZONES)) {
    for (const rid of z.readings) await openReading(page, rid);
    for (const cid of z.challenges) {
      if (cid === "c1") await solve(page, cid, { wrongFirst: 1 });        // 2.º intento → 50 %
      else if (cid === "c2") await solve(page, cid, { hint: true });      // pista → 100 % − 25 %
      else if (cid === "c13") await solve(page, cid, { fail: true });     // 3 errores → 0 PE con solución
      else await solve(page, cid);
    }
    await page.goto("/#/mapa");
    await closeOverlayIfAny(page);
    const sealed = await page.evaluate((id) => !!window.__kant.state().seals[id], zid);
    expect(sealed, `sello de ${zid}`).toBe(true);
  }

  // PE esperados: total 420; c1 = 5 (pierde 5), c2 = 11,25 (pierde 3,75), c13 = 0 (pierde 10)
  const t = await page.evaluate(() => window.__kant.totals());
  expect(t.peMax).toBe(420);
  expect(t.pe).toBeCloseTo(401.25, 2);
  expect(t.hints).toBe(1);
  expect(t.failed).toBe(1);
  expect(t.provisional).toBe(true); // respuestas abiertas sin validar
  // 401,25 / 420 = 95,54 % → 4 décimas con la tabla inicial
  expect(t.decimas).toBe(4);
  // La XP no participa en el porcentaje
  const xp = await page.evaluate(() => window.__kant.state().xp);
  expect(xp).toBeGreaterThan(0);

  // Comprobación individual: integrante 1 todo correcto; integrante 2 con un error
  await page.goto("/#/individual");
  for (const m of [0, 1]) {
    await page.click(`button[data-action="ind-start"][data-m="${m}"]`);
    const qs = await page.evaluate((mm) => window.KANT_CONTENT.individual.filter((q) => q.integrante === mm), m);
    for (let i = 0; i < 3; i++) {
      const q = qs[i];
      const wrong = m === 1 && i === 0;
      const idx = q.opciones.findIndex((o) => (wrong ? !o.correcta : o.correcta));
      await page.check(`#ind-form input[name="iq"][value="${idx}"]`);
      await page.click("button:has-text('Responder (definitivo)')");
      await expect(page.locator("#ind-fb")).toContainText(wrong ? "Incorrecto" : "Correcto");
      await expect(page.locator('#ind-form input[name="iq"]').first()).toBeDisabled(); // un solo intento
      await page.click("#ind-actions button");
    }
  }
  await expect(page.locator("h1")).toHaveText("Comprobación individual completada");

  // Informe (provisorio) con resultados individuales separados
  await page.goto("/#/informe");
  await expect(page.locator("[data-testid=report-decimas]")).toHaveText("4");
  await expect(page.locator(".warnbox")).toContainText("provisorios");
  await expect(page.locator(".ind-result").nth(0)).toContainText("3 de 3");
  await expect(page.locator(".ind-result").nth(1)).toContainText("2 de 3");

  // Docente: modifica la tabla de décimas
  await page.goto("/#/docente");
  await page.fill("#pin", await page.evaluate(() => window.KANT_CONFIG.teacherPin));
  await page.click("button:has-text('Entrar')");
  await page.click("[data-tab=decimas]");
  // Nueva tabla: 0→0, 50→1, 70→2, 85→3, 96→4, 100→5
  const nuevos = [[0, 0], [50, 1], [70, 2], [85, 3], [96, 4], [100, 5]];
  for (let i = 0; i < nuevos.length; i++) {
    await page.fill(`#td-${i}`, String(nuevos[i][0]));
    await page.fill(`#tc-${i}`, String(nuevos[i][1]));
  }
  // Una tabla inválida se rechaza
  await page.fill("#tc-2", "9");
  await page.click("button:has-text('Guardar tabla')");
  await expect(page.locator("#dec-error")).toContainText("supera el máximo");
  await page.fill("#tc-2", "2");
  await page.click("button:has-text('Guardar tabla')");
  await expect(page.locator("#dec-error")).toBeEmpty();

  // Con la tabla modificada, 95,54 % → 3 décimas
  await page.goto("/#/informe");
  await expect(page.locator("[data-testid=report-decimas]")).toHaveText("3");

  // Validación docente de las 3 respuestas abiertas: c34 baja a 1/1/1 (10 de 20 PE)
  for (const cid of ["c18", "c29", "c34"]) {
    const form = page.locator(`form.validate-form[data-cid="${cid}"]`);
    if (cid === "c34") for (const k of ["concepto", "texto", "razonamiento"]) await form.locator(`#t-${cid}-${k}-1`).check();
    await form.locator("button:has-text('Guardar validación')").click();
  }
  const t2 = await page.evaluate(() => window.__kant.totals());
  expect(t2.provisional).toBe(false);
  expect(t2.pe).toBeCloseTo(391.25, 2);   // 401,25 − 10
  // 391,25 / 420 = 93,15 % → 3 décimas con la tabla modificada (85 a < 96)
  await expect(page.locator("[data-testid=report-decimas]")).toHaveText("3");
  await expect(page.locator("[data-testid=report-pct]")).toContainText("93,2");
  await expect(page.locator(".warnbox")).toHaveCount(0);

  // Descarga del informe
  const [dl] = await Promise.all([page.waitForEvent("download"), page.click("button:has-text('Descargar informe (HTML)')")]);
  expect(dl.suggestedFilename()).toMatch(/^informe-kant-ana-benjamin-.*\.html$/);

  // El progreso persiste al recargar (localStorage)
  await page.reload();
  const t3 = await page.evaluate(() => window.__kant.totals());
  expect(t3.pe).toBeCloseTo(391.25, 2);

  // Reiniciar para otra pareja conserva la tabla modificada
  await page.goto("/#/docente");
  await page.fill("#pin", await page.evaluate(() => window.KANT_CONFIG.teacherPin));
  await page.click("button:has-text('Entrar')");
  await page.click("[data-tab=reiniciar]");
  page.once("dialog", (d) => d.accept());
  await page.click("button:has-text('Reiniciar actividad para otra pareja')");
  await expect(page.locator("#n1")).toBeVisible();
  const tramos = await page.evaluate(() => window.__kant.cfg().tramos.map((x) => x.desde));
  expect(tramos).toEqual([0, 50, 70, 85, 96, 100]);

  expect(errors).toEqual([]);
});

test("desactivar desafíos y zonas recalcula el máximo de PE", async ({ page }) => {
  await startGame(page);
  await page.goto("/#/docente");
  await page.fill("#pin", await page.evaluate(() => window.KANT_CONFIG.teacherPin));
  await page.click("button:has-text('Entrar')");
  await page.click("[data-tab=zonas]");
  await page.uncheck('.ch-toggle[value="c1"]');           // entrega la letra P automáticamente
  await page.uncheck('.zone-toggle[value="z3"]');
  await page.click("#zones-form button[type=submit]");
  const t = await page.evaluate(() => window.__kant.totals());
  // 420 − 10 (c1) − 135 (zona 3)
  expect(t.peMax).toBe(275);
  await page.goto("/#/desafio/c7");
  await expect(page.locator("text=Primero resuelvan")).toBeVisible();
});

test("fragmento pegado por el docente aparece separado de la explicación", async ({ page }) => {
  await startGame(page);
  await page.goto("/#/docente");
  await page.fill("#pin", await page.evaluate(() => window.KANT_CONFIG.teacherPin));
  await page.click("button:has-text('Entrar')");
  await page.click("[data-tab=fragmentos]");
  await page.fill("#fx-r4", "TEXTO DE PRUEBA DEL DOCENTE [...] segunda parte.");
  await page.fill("#fe-r4", "Edición del curso");
  await page.fill("#fp-r4", "p. 10");
  await page.click("button:has-text('Guardar fragmentos')");
  await page.evaluate(() => { window.__kant.state().seals.z1 = true; });
  await page.goto("/#/lectura/r4");
  await expect(page.locator(".kant-quote")).toContainText("TEXTO DE PRUEBA DEL DOCENTE");
  await expect(page.locator(".panel.fragment .ref")).toContainText("Edición del curso · p. 10");
  await expect(page.locator(".panel.explain .kant-quote")).toHaveCount(0);
});

test("archivo de fragmentos: el docente lo descarga y otra pareja lo carga sin publicarlo", async ({ page, browser }) => {
  // Docente: pega un fragmento y descarga el archivo
  await startGame(page);
  await page.goto("/#/docente");
  await page.fill("#pin", await page.evaluate(() => window.KANT_CONFIG.teacherPin));
  await page.click("button:has-text('Entrar')");
  await page.click("[data-tab=fragmentos]");
  await page.fill("#fx-r5", "FRAGMENTO PRIVADO DE PRUEBA [...] continúa.");
  await page.fill("#fe-r5", "Edición del curso");
  await page.fill("#fp-r5", "Ak. IV 394");
  await page.click("button:has-text('Guardar fragmentos')");
  const [dl] = await Promise.all([page.waitForEvent("download"), page.click("button:has-text('Descargar archivo de fragmentos')")]);
  expect(dl.suggestedFilename()).toBe("fragmentos-kant.json");
  const filePath = await dl.path();

  // El texto NO está en los archivos publicados
  const published = await page.evaluate(() => fetch("/js/content.js").then((r) => r.text()));
  expect(published).not.toContain("FRAGMENTO PRIVADO DE PRUEBA");

  // Otra pareja, en otro navegador (sin datos), carga el archivo desde el inicio
  const ctx = await browser.newContext();
  const p2 = await ctx.newPage();
  await p2.goto("/");
  await expect(p2.locator("#frag-status")).toContainText("10 de 10"); // García Morente ya viene incluido
  await p2.setInputFiles("#frag-file-start", filePath);
  await expect(p2.locator("#frag-status")).toContainText("10 de 10");
  await p2.fill("#n1", "Carla"); await p2.fill("#n2", "Diego"); await p2.check("#rules-ok");
  if (await p2.locator("select#colegio").count()) await p2.selectOption("select#colegio", { index: 1 });
  await p2.click("button:has-text('Entrar a la biblioteca')");
  await p2.evaluate(() => { const s = window.__kant.state(); s.seals.z1 = true; });
  await p2.goto("/#/lectura/r5");
  await expect(p2.locator(".kant-quote")).toContainText("FRAGMENTO PRIVADO DE PRUEBA");
  await expect(p2.locator(".panel.fragment .ref")).toContainText("Edición del curso · Ak. IV 394");

  // El archivo reemplaza solo la lectura que trae; las demás conservan García Morente
  await p2.goto("/#/lectura/r6");
  await expect(p2.locator(".kant-quote")).toContainText("Prescindo aquí");
  // Un archivo inválido se rechaza sin romper nada
  await p2.goto("/#/inicio");
  await p2.setInputFiles("#frag-file-start", { name: "otro.json", mimeType: "application/json", buffer: Buffer.from('{"hola":1}') });
  await expect(p2.locator(".toast-item").last()).toContainText("no es un archivo de fragmentos");
  await ctx.close();
});

test("envío del informe a la planilla del docente (simulada)", async ({ page }) => {
  const URL_PLANILLA = "https://script.google.com/macros/s/PRUEBA/exec";
  // Sin planilla configurada no hay botón de envío
  await startGame(page);
  await page.goto("/#/informe");
  await expect(page.locator("button[data-action=send-report]")).toHaveCount(0);

  // Con planilla configurada (se inyecta en config.js solo para esta prueba)
  await page.route("**/js/config.js", async (route) => {
    const res = await route.fetch();
    const body = (await res.text()) + `\nwindow.KANT_CONFIG.informeUrl = ${JSON.stringify(URL_PLANILLA)};`;
    await route.fulfill({ response: res, body });
  });
  const recibidos = [];
  let modo = "ok";
  await page.route(URL_PLANILLA, async (route) => {
    recibidos.push(JSON.parse(route.request().postData()));
    if (modo === "error") return route.fulfill({ status: 500, body: "fallo", headers: { "access-control-allow-origin": "*" } });
    await route.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify({ ok: true, actualizado: recibidos.length > 1 }) });
  });
  await page.reload();
  await expect(page.locator("#storage-notice p")).toContainText("Enviar informe al profesor");
  await openReading(page, "r1");
  await solve(page, "c1");
  await page.goto("/#/informe");
  await page.click("button[data-action=send-report]");
  await expect(page.locator("#send-status")).toContainText("✓ Informe enviado");
  const fila = recibidos[0].fila;
  expect(fila["Integrante 1"]).toBe("Ana");
  expect(fila["Integrante 2"]).toBe("Benjamín");
  expect(fila["PE"]).toBe(10);
  expect(fila["PE máximo"]).toBe(420);
  expect(fila["ID"]).toMatch(/^P-/);
  expect(fila["c18 respuesta"]).toBe("sin respuesta");

  // Reenviar actualiza la misma fila (mismo ID)
  await page.click("button[data-action=send-report]");
  await expect(page.locator("#send-status")).toContainText("✓ Informe actualizado");
  expect(recibidos[1].fila["ID"]).toBe(fila["ID"]);

  // Si la planilla falla, se avisa y se sugiere descargar
  modo = "error";
  await page.click("button[data-action=send-report]");
  await expect(page.locator("#send-status")).toContainText("No se pudo enviar");
});

test("dos colegios: el enlace fija el colegio y el informe va a SU planilla", async ({ page }) => {
  const URLS = { terranova: "https://script.google.com/macros/s/TERRANOVA/exec", sanagustin: "https://script.google.com/macros/s/SANAGUSTIN/exec" };
  await page.route("**/js/config.js", async (route) => {
    const res = await route.fetch();
    const body = (await res.text()) + `\nwindow.KANT_CONFIG.colegios = [
      { id: "terranova", nombre: "Colegio Quillota Terranova", informeUrl: ${JSON.stringify(URLS.terranova)} },
      { id: "sanagustin", nombre: "San Agustín", informeUrl: ${JSON.stringify(URLS.sanagustin)} }];`;
    await route.fulfill({ response: res, body });
  });
  const llegadas = { terranova: [], sanagustin: [] };
  for (const [id, url] of Object.entries(URLS)) {
    await page.route(url, async (route) => {
      llegadas[id].push(JSON.parse(route.request().postData()));
      await route.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: '{"ok":true}' });
    });
  }
  // Enlace de San Agustín: el colegio aparece fijo, sin selector
  await page.goto("/?colegio=sanagustin");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/?colegio=sanagustin#/inicio");
  await expect(page.locator(".school-fixed")).toContainText("San Agustín");
  await expect(page.locator("select#colegio")).toHaveCount(0);
  await page.fill("#n1", "Carla"); await page.fill("#n2", "Diego"); await page.fill("#curso", "3° medio B");
  await page.check("#rules-ok");
  await page.click("button:has-text('Entrar a la biblioteca')");
  await page.goto("/?colegio=sanagustin#/informe");
  await expect(page.locator("#report")).toContainText("San Agustín");
  await page.click("button[data-action=send-report]");
  await expect(page.locator("#send-status")).toContainText("✓");
  expect(llegadas.sanagustin.length).toBe(1);
  expect(llegadas.terranova.length).toBe(0);
  expect(llegadas.sanagustin[0].fila["Colegio"]).toBe("San Agustín");
  expect(llegadas.sanagustin[0].fila["Curso"]).toBe("3° medio B");

  // Sin enlace de colegio: la pareja debe elegirlo
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/#/inicio");
  await page.reload();
  await page.fill("#n1", "Eva"); await page.fill("#n2", "Fito"); await page.check("#rules-ok");
  await page.click("button:has-text('Entrar a la biblioteca')");
  await expect(page.locator("#start-error")).toContainText("Elijan su colegio");
  await page.selectOption("select#colegio", "terranova");
  await page.click("button:has-text('Entrar a la biblioteca')");
  await page.goto("/#/informe");
  await page.click("button[data-action=send-report]");
  await expect(page.locator("#send-status")).toContainText("✓");
  expect(llegadas.terranova.length).toBe(1);

  // Panel docente: enlaces por colegio y prueba de conexión
  await page.goto("/#/docente");
  await page.fill("#pin", await page.evaluate(() => window.KANT_CONFIG.teacherPin));
  await page.click("button:has-text('Entrar')");
  await expect(page.locator(".link-code").nth(0)).toContainText("?colegio=terranova");
  await page.click("button[data-action=test-send][data-school=sanagustin]");
  await expect(page.locator("#test-send-status")).toContainText("Funciona");
  expect(llegadas.sanagustin.at(-1).fila["ID"]).toBe("PRUEBA-sanagustin");
});
