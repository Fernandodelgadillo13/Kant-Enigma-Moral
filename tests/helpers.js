// Utilidades para recorrer la aplicación como lo haría una pareja.
const { expect } = require("@playwright/test");

async function startGame(page, n1 = "Ana", n2 = "Benjamín") {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/#/inicio");
  await page.fill("#n1", n1);
  await page.fill("#n2", n2);
  await page.check("#rules-ok");
  await page.click("button:has-text('Entrar a la biblioteca')");
  await expect(page.locator("h1")).toHaveText("Mapa de la biblioteca");
}

async function closeOverlayIfAny(page) {
  const btn = page.locator("#overlay button[data-action='close-overlay']");
  if (await btn.isVisible().catch(() => false)) await btn.click();
}

async function openReading(page, rid) {
  await page.goto(`/#/lectura/${rid}`);
  await expect(page.locator(".reading h1")).toBeVisible();
  await closeOverlayIfAny(page);
}

async function getChallenge(page, cid) {
  return page.evaluate((id) => window.KANT_CONTENT.desafios.find((c) => c.id === id), cid);
}

/* Completa el formulario con la respuesta correcta (o una incorrecta si wrong = true). */
async function fillAnswer(page, ch, wrong = false) {
  switch (ch.tipo) {
    case "mcq": {
      const idx = ch.opciones.findIndex((o) => (wrong ? !o.correcta : o.correcta));
      await page.check(`#ch-form input[name="a"][value="${idx}"]`);
      break;
    }
    case "tf": {
      await page.check(`#ch-form input[name="v"][value="${String(wrong ? !ch.respuesta : ch.respuesta)}"]`);
      const j = ch.justificaciones.findIndex((x) => x.correcta);
      await page.check(`#ch-form input[name="j"][value="${j}"]`);
      break;
    }
    case "match":
      for (let i = 0; i < ch.pares.length; i++) await page.selectOption(`#m${i}`, String(wrong ? (i + 1) % ch.pares.length : i));
      break;
    case "classify":
      for (let i = 0; i < ch.items.length; i++) await page.selectOption(`#k${i}`, String(wrong ? (ch.items[i].categoria + 1) % ch.categorias.length : ch.items[i].categoria));
      break;
    case "fill":
      for (let i = 0; i < ch.huecos.length; i++) await page.selectOption(`#f${i}`, String(wrong ? (ch.huecos[i].correcta + 1) % ch.huecos[i].opciones.length : ch.huecos[i].correcta));
      break;
    case "order": {
      // Mueve cada paso a su lugar usando solo los botones ↑ (como con teclado).
      for (let target = 0; target < ch.pasos.length; target++) {
        for (let guard = 0; guard < 10; guard++) {
          const texts = await page.locator("#order-list .order-text").allTextContents();
          const cur = texts.indexOf(ch.pasos[target]);
          if (cur === target) break;
          await page.click(`#order-list button[data-pos="${cur}"][data-dir="-1"]`);
        }
      }
      break;
    }
    case "lock":
      await page.fill("#key", wrong ? "MORAL" : ch.clave.toLowerCase());
      break;
  }
}

async function solve(page, cid, opts = {}) {
  const ch = await getChallenge(page, cid);
  await page.goto(`/#/desafio/${cid}`);
  await closeOverlayIfAny(page);
  if (ch.tipo === "open") {
    await page.fill("#open-text", opts.text || "Ejemplo propio: dos compañeros devuelven un libro de la biblioteca a tiempo. Uno lo hace solo para evitar la multa (conforme al deber); el otro, porque reconoce que es su deber. Por fuera es igual; la diferencia está en el motivo.");
    for (const k of ["concepto", "texto", "razonamiento"]) await page.check(`#self-${k}-${opts.self ?? 2}`);
    await page.click("button:has-text('Enviar respuesta')");
    await expect(page.locator("text=Respuesta enviada")).toBeVisible();
    return;
  }
  for (let i = 0; i < (opts.wrongFirst || 0); i++) {
    await fillAnswer(page, ch, true);
    await page.click("button:has-text('Comprobar')");
    await expect(page.locator("#fb")).toContainText("Todavía no");
  }
  if (opts.hint) {
    await page.click("button[data-action='hint']");
    await expect(page.locator("#hint-box")).toBeVisible();
  }
  if (opts.fail) {
    for (let i = (opts.wrongFirst || 0); i < 3; i++) {
      await fillAnswer(page, ch, true);
      await page.click("button:has-text('Comprobar')");
    }
    await expect(page.locator("#fb")).toContainText("Solución explicada");
    await closeOverlayIfAny(page);
    return;
  }
  await fillAnswer(page, ch, false);
  await page.click("#ch-actions button:has-text('Comprobar')");
  await expect(page.locator("#fb")).toContainText("Correcto");
  await closeOverlayIfAny(page);
}

module.exports = { startGame, openReading, solve, getChallenge, closeOverlayIfAny };
