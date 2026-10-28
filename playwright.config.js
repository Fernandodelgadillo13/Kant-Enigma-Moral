// Configuración de pruebas automatizadas (Playwright).
// Levanta un servidor estático simple sobre public/ y ejecuta tests/.
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 120000,
  fullyParallel: false,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:8123",
    trace: "retain-on-failure"
  },
  webServer: {
    command: "node tests/static-server.js",
    url: "http://localhost:8123",
    reuseExistingServer: true
  },
  projects: [
    { name: "escritorio", use: { ...devices["Desktop Chrome"] }, testIgnore: /movil/ },
    { name: "movil", use: { ...devices["Pixel 7"] }, testMatch: /movil/ }
  ]
});
