const { test, expect } = require("@playwright/test");
const CLAVE = "rocaerzdmz";

test("el enlace con clave abre los fragmentos sin subir archivos", async ({ page }) => {
  await page.goto("/?colegio=terranova&clave=" + CLAVE);
  await expect(page.locator("#toast").getByText(/Fragmentos de lectura listos: 10 de 10/)).toBeVisible({ timeout: 15000 });
  expect(page.url()).not.toContain("clave=");
  await page.reload();
  await expect(page.getByText(/Fragmentos cargados en este equipo: 10 de 10/)).toBeVisible();
});

test("el código escrito a mano también funciona y uno incorrecto no", async ({ page }) => {
  await page.goto("/");
  await page.fill("#frag-code", "equivocado");
  await page.getByRole("button", { name: /Abrir fragmentos/ }).click();
  await expect(page.locator("#toast").getByText(/Código de lectura incorrecto/)).toBeVisible({ timeout: 15000 });
  await page.fill("#frag-code", CLAVE.toUpperCase());
  await page.getByRole("button", { name: /Abrir fragmentos/ }).click();
  await expect(page.locator("#toast").getByText(/Fragmentos cargados: 10 de 10/)).toBeVisible({ timeout: 15000 });
});
