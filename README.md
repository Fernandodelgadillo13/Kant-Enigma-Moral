# La roca y la estrella: una aventura navideña con Camus

Escape room + RPG educativo para enseñanza media (Chile), en parejas, ~90 minutos, con estética navideña.
Trabaja tres capítulos de *El mito de Sísifo* de Albert Camus: «Lo absurdo y el suicidio», «Los muros absurdos» y «El mito de Sísifo».

- Publicado en **https://camus-absurdo.web.app**. El sitio anterior (kant-enigma-moral.web.app) muestra una página de «actividad finalizada» (carpeta `baja/`).
- HTML, CSS y JavaScript sin dependencias. Progreso en `localStorage`; envío opcional de informes a planillas de Google por colegio.
- **Derechos de autor:** la obra de Camus está protegida (murió en 1960). La app solo contiene explicaciones originales; los fragmentos se comparten mediante el archivo privado de fragmentos (Panel docente), nunca en `content.js`.
- **Tema sensible:** el primer capítulo trata el suicidio como problema filosófico. La app muestra un aviso de cuidado con la Línea de Prevención del Suicidio *4141 (MINSAL). Ver `docs/GUIA_DOCENTE.md`.

## Estructura

```
public/
  index.html
  css/styles.css
  js/config.js      ← configuración editable y comentada (décimas, intentos, PIN, temporizador…)
  js/content.js     ← lecturas, desafíos, rúbrica, comprobación individual (editable y comentado)
  js/scoring.js     ← cálculo de PE, porcentaje y décimas (funciones puras)
  js/storage.js     ← localStorage con try/catch y respaldo en memoria
  js/app.js         ← motor del juego e interfaz
firebase.json
.firebaserc
firestore.rules     ← deniega todo acceso (la Fase 2 no está implementada)
.github/workflows/
  firebase-hosting-merge.yml         ← pruebas + despliegue en cada push a main
  firebase-hosting-pull-request.yml  ← pruebas + vista previa en cada pull request
tests/              ← pruebas Playwright
docs/GUIA_DOCENTE.md
```

## Probar en su computador

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run serve        # abre http://localhost:8123
```

Como es una página estática, también puede abrir `public/index.html` con cualquier servidor local.

### Pruebas automatizadas (Playwright)

```bash
npx playwright install chromium   # solo la primera vez
npm test
```

Las pruebas hacen lo siguiente:
- **Partida completa**: recorren las 10 lecturas y los 34 desafíos. Incluyen un acierto en el 2.º intento, un desafío con pista y uno fallado tres veces. Verifican los sellos, los PE (401,25 de 420), los resultados individuales (3/3 y 2/3), la descarga del informe y la persistencia al recargar.
- **Décimas con la tabla modificada**: desde el panel docente se cambian los tramos y se comprueba que el informe pasa de 4 a 3 décimas. Después se validan las respuestas abiertas y se verifica que se recalculen el porcentaje y las décimas.
- **Zonas y desafíos desactivados**: verifican que se recalcula el máximo de PE.
- **Fragmento del docente**: se muestra separado de la explicación.
- **Archivo de fragmentos**: el docente lo descarga, otra pareja lo carga en un navegador limpio, y se verifica que el texto no aparece en los archivos publicados.
- **Vista móvil** (Pixel 7): sin desbordamiento horizontal, botones de al menos 44 px y letra de al menos 16 px. También prueban los controles de tamaño de letra y fondo claro.

## Publicar en Firebase Hosting con GitHub

### 1. Preparar el proyecto

1. Cree un proyecto en <https://console.firebase.google.com> y anote su **ID de proyecto**.
2. Instale la CLI e inicie sesión:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```
3. Suba este repositorio a GitHub, con la rama `main`.

### 2. `firebase init hosting`

En la carpeta del repositorio:

```bash
firebase init hosting
```

Responda así:
- *Please select an option*: **Use an existing project** → su proyecto.
- *What do you want to use as your public directory?* **public**
- *Configure as a single-page app (rewrite all urls to /index.html)?* **No**
- *Set up automatic builds and deploys with GitHub?* **No** (se configura en el paso 3)
- *File public/index.html already exists. Overwrite?* **No** ← importante

Revise que `.firebaserc` tenga su ID de proyecto en lugar de `REEMPLAZAR-ID-DEL-PROYECTO`, y que `firebase.json` siga apuntando a `"public": "public"`.

Primer despliegue manual (opcional):

```bash
firebase deploy --only hosting
```

### 3. `firebase init hosting:github`

```bash
firebase init hosting:github
```

- Indique el repositorio con el formato `usuario/repositorio`.
- La CLI crea una cuenta de servicio y guarda su clave como **secreto** en GitHub, con un nombre como `FIREBASE_SERVICE_ACCOUNT_SU_PROYECTO`. Anote ese nombre.
- *Set up the workflow to run a build script before every deploy?* **No** (no hay compilación).
- *Set up automatic deployment to your site's live channel when a PR is merged?* **Yes**, rama **main**.
- Si pregunta si quiere sobrescribir los archivos de `.github/workflows/`, responda **No**: los de este repositorio ya incluyen las pruebas.

### 4. Secretos y variables en GitHub

En GitHub → *Settings → Secrets and variables → Actions*:

| Tipo | Nombre | Valor |
|---|---|---|
| Secreto | `FIREBASE_SERVICE_ACCOUNT` | La clave JSON de la cuenta de servicio (ver abajo) |
| Variable | `FIREBASE_PROJECT_ID` | El ID de su proyecto Firebase |

`GITHUB_TOKEN` lo entrega GitHub automáticamente.

Sobre el secreto, elija **una** de estas opciones:
- **Opción A (más simple):** en los dos archivos de `.github/workflows/`, reemplace `secrets.FIREBASE_SERVICE_ACCOUNT` por el nombre que creó la CLI (por ejemplo, `secrets.FIREBASE_SERVICE_ACCOUNT_SU_PROYECTO`).
- **Opción B:** cree el secreto `FIREBASE_SERVICE_ACCOUNT` a mano. En Google Cloud Console → *IAM → Cuentas de servicio*, genere una clave JSON para la cuenta `github-action-…` y pegue el JSON completo.

Con esto, cada push a `main` ejecuta las pruebas y luego despliega al sitio en vivo. Cada pull request ejecuta las pruebas y publica un enlace de vista previa (expira en 7 días) como comentario.

## Recibir los informes en una planilla de Google (opcional)

Con esto aparece en el informe el botón **«Enviar informe al profesor»**. Cada pareja llena una fila en su planilla: nombres, fecha, porcentaje, PE, décimas, resultados por zona, comprobación individual y respuestas abiertas. Si reenvía (por ejemplo, después de la validación docente), se actualiza la misma fila.

1. Cree una planilla en Google Sheets.
2. **Extensiones → Apps Script**. Borre lo que aparece, pegue el contenido de `docs/receptor-informes.gs` y guarde.
3. **Implementar → Nueva implementación → Aplicación web**. Use **Ejecutar como: Yo** y **Quién tiene acceso: Cualquier persona**. Autorice los permisos.
4. Copie la **URL de la aplicación web** (termina en `/exec`).
5. En `public/js/config.js`, ponga esa URL en `informeUrl: "…",` y vuelva a desplegar.
6. En el Panel docente → Instrucciones, pulse **«Probar conexión con la planilla»**.

**Varios colegios:** en `config.js`, la lista `colegios` admite un colegio por elemento: `id`, `nombre` e `informeUrl`, con una planilla en la cuenta de cada colegio. Cada colegio recibe su propio enlace: `https://SU-SITIO.web.app/?colegio=ID`. Con ese enlace, el colegio queda fijo y los informes llegan a su planilla. Sin el enlace, la pareja elige su colegio al empezar. Las parejas también pueden indicar su curso. El Panel docente → Instrucciones muestra los enlaces y un botón «Probar conexión» por colegio.

Notas:
- La URL queda visible en el código del sitio. Cualquiera que la encuentre podría enviar filas falsas. Revise que los nombres coincidan con su curso y, después de la actividad, puede desactivar la implementación en Apps Script.
- Mientras `informeUrl` esté vacío, la app no envía nada a ningún servidor.

## Configuración (docente)

Puede editar `public/js/config.js` o usar el **Panel docente** dentro de la app (botón superior derecho, clave inicial `kant1785`; **cámbiela** en `config.js`).

- Máximo de décimas y tramos (tabla inicial: <50 %: 0 · 50–<65: 1 · 65–<80: 2 · 80–<90: 3 · 90–<100: 4 · 100 %: 5).
- Activar o desactivar zonas, desafíos y la comprobación individual.
- Temporizador opcional.
- Solucionario explicado, rúbricas e instrucciones docentes.
- Reiniciar la actividad para otra pareja (conserva la configuración y los fragmentos).

Los cambios del panel quedan en ese navegador y tienen prioridad sobre `config.js`. Para que valgan en todos los equipos, edite `config.js` y vuelva a desplegar.

> La clave docente **no es una medida de seguridad**: está en el código fuente y solo evita entradas accidentales. Para un control real del acceso se necesitaría la Fase 2 (Firebase Authentication), que no está implementada.

## Tema navideño 🎄

`public/css/navidad.css` agrega nieve, luces, árbol, regalos y la montaña de Sísifo en el mapa. Está activo por defecto; el botón 🎄 lo apaga o enciende en cada navegador. Respeta «reducir movimiento», no se imprime y la decoración no recibe clics.

## Reglas de puntaje (resumen)

- PE por desafío: 100 % en el 1.er intento, 50 % en el 2.º y 25 % en el 3.º. La pista descuenta un 25 % del valor del desafío (mínimo 0). Hay un máximo de 3 intentos; después se muestra la solución explicada con 0 PE.
- Porcentaje = PE obtenidos ÷ PE máximos de los desafíos **activos**. La XP nunca entra en este cálculo.
- Respuestas abiertas: rúbrica de 3 criterios (0–2 cada uno). La pareja se autoevalúa y eso da un puntaje **provisorio**. Cuando el docente valida en el informe, el puntaje se recalcula.
- Comprobación individual: 3 preguntas distintas por integrante, con un solo intento. Se informa por separado, sin promediar.

## Limitaciones conocidas (honestidad)

- **Almacenamiento**: el progreso vive solo en el navegador de cada equipo. Si se borran los datos del navegador, se usa una ventana privada estricta o se cambia de equipo, se pierde. Si el navegador bloquea `localStorage`, la app avisa y funciona en memoria (se pierde al recargar). Por eso cada pareja debe **imprimir o descargar su informe**.
- **Validación docente**: se hace en el mismo navegador de la pareja, desde el informe y con la sesión docente abierta.
- **Despliegue**: los archivos de Firebase y GitHub Actions siguen la configuración estándar, pero **no se probaron contra un proyecto Firebase real**. Las pruebas Playwright se ejecutaron localmente y pasan (9/9). El envío a la planilla se probó con una planilla simulada; la conexión con Google Apps Script real no pudo probarse desde aquí.
- **Fragmentos**: la app no incluye texto de Camus. El docente es responsable de usar fragmentos de una edición que pueda reproducir y de citar edición y página.
