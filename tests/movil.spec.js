// Revisión de la vista móvil: sin desbordamiento horizontal, botones
// táctiles de tamaño adecuado y lectura legible.
const { test, expect } = require("@playwright/test");
const { startGame, openReading, closeOverlayIfAny } = require("./helpers");

async function noHorizontalOverflow(page) {
  const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  expect(o.sw, "desbordamiento horizontal").toBeLessThanOrEqual(o.cw + 1);
}

test("vista móvil: inicio, mapa, lectura, desafío, informe y panel docente", async ({ page }) => {
  await page.goto("/");
  await noHorizontalOverflow(page);
  await page.screenshot({ path: "test-results/movil-inicio.png", fullPage: true });

  await startGame(page);
  await noHorizontalOverflow(page);
  // En móvil el mapa se muestra como lista vertical
  const boxes = await page.locator(".map-node").evaluateAll((els) => els.map((e) => e.getBoundingClientRect().top));
  for (let i = 1; i < boxes.length; i++) expect(boxes[i]).toBeGreaterThan(boxes[i - 1]);
  await page.screenshot({ path: "test-results/movil-mapa.png", fullPage: true });

  await openReading(page, "r1");
  await noHorizontalOverflow(page);
  const fs = await page.locator(".panel.explain p").first().evaluate((e) => parseFloat(getComputedStyle(e).fontSize));
  expect(fs).toBeGreaterThanOrEqual(16);
  await page.screenshot({ path: "test-results/movil-lectura.png", fullPage: true });

  await page.click("button:has-text('Ir al desafío')");
  await closeOverlayIfAny(page);
  await noHorizontalOverflow(page);
  const h = await page.locator("#ch-actions button").first().evaluate((e) => e.getBoundingClientRect().height);
  expect(h).toBeGreaterThanOrEqual(44);
  await page.screenshot({ path: "test-results/movil-desafio.png", fullPage: true });

  // Desafío de asociación (selects) en pantalla angosta
  await openReading(page, "r1");
  await page.goto("/#/desafio/c2");
  await noHorizontalOverflow(page);

  await page.goto("/#/informe");
  await noHorizontalOverflow(page);

  await page.goto("/#/docente");
  await page.fill("#pin", "kant1785");
  await page.click("button:has-text('Entrar')");
  await page.click("[data-tab=decimas]");
  await noHorizontalOverflow(page);
  await page.screenshot({ path: "test-results/movil-docente.png", fullPage: true });
});

test("tamaño de letra y fondo claro", async ({ page }) => {
  await startGame(page);
  await page.click("button[data-action=font-up]");
  const scale = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--scale").trim());
  expect(Number(scale)).toBeGreaterThan(1);
  await page.click("#btn-light");
  await expect(page.locator("body")).toHaveClass(/light/);
  await expect(page.locator("#btn-light")).toHaveAttribute("aria-pressed", "true");
});
