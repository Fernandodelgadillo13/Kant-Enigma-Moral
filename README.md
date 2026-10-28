# El enigma de la moral: una aventura filosófica con Kant

Escape room + RPG educativo para enseñanza media (Chile), en parejas, ~90 minutos.
Trabaja **solo** el Prefacio y la Primera sección de la *Fundamentación de la metafísica de las costumbres* de Immanuel Kant.

- HTML, CSS y JavaScript sin frameworks ni dependencias externas.
- **Fase 1** (implementada): funciona solo con Firebase Hosting y guarda el progreso en `localStorage`.
- **Fase 2** (Firebase Auth + Firestore): **no implementada**. La aplicación no envía ni guarda resultados en ningún servidor.

## Sobre los textos de Kant

Las explicaciones, casos y preguntas son originales. Los **fragmentos textuales incluidos** son de la traducción de **Manuel García Morente (1921), de dominio público**. Se cotejaron con dos copias digitales de esa traducción (UNAM y la edición de P. M. Rosario Barbosa). Como ambas comparten digitalización, solo se corrigieron erratas evidentes, y en la Lectura 10 una repetición dudosa quedó marcada con [...]. Conviene una revisión final contra el facsímil de 1921 en Wikisource. Cada lectura tiene:

1. **Contexto filosófico**: qué problema investiga Kant.
2. **Explicación didáctica original**, rotulada «Explicación (no es cita)».
3. **Lectura de referencia**: un panel visible, dentro de la página, con el fragmento de Kant (García Morente) y su paginación académica. El docente puede reemplazarlo por otra edición. Si un panel queda vacío, muestra «FRAGMENTO PENDIENTE — lo agrega el docente» y la actividad funciona igual.
4. **Desafío interactivo**: una pregunta previa sin nota y los desafíos evaluados.

El docente puede agregar los fragmentos de tres maneras:
- **Panel docente → Fragmentos de lectura**: se guardan solo en ese navegador.
- **Archivo de fragmentos (recomendado para traducciones con derechos vigentes)**: en el panel, «Descargar archivo de fragmentos» genera `fragmentos-kant.json`. Compártalo por un canal cerrado del curso (Classroom, correo, pendrive) y **no lo suba a GitHub**. Cada pareja lo carga con «Cargar archivo de fragmentos» en la pantalla de inicio o en cualquier lectura. El texto no queda publicado en el sitio.
- **`public/js/content.js`**: complete `fragmento: { texto, edicion, pagina }` y vuelva a desplegar. **Solo para textos de dominio público** (por ejemplo, García Morente, 1921), porque este archivo queda publicado en el sitio y en el repositorio.

La «ubicación sugerida» (Ak. IV) de cada lectura viene de la planificación de la actividad. Confírmela con su edición.

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

## Configuración (docente)

Puede editar `public/js/config.js` o usar el **Panel docente** dentro de la app (botón superior derecho, clave inicial `kant1785`; **cámbiela** en `config.js`).

- Máximo de décimas y tramos (tabla inicial: <50 %: 0 · 50–<65: 1 · 65–<80: 2 · 80–<90: 3 · 90–<100: 4 · 100 %: 5).
- Activar o desactivar zonas, desafíos y la comprobación individual.
- Temporizador opcional.
- Solucionario explicado, rúbricas e instrucciones docentes.
- Reiniciar la actividad para otra pareja (conserva la configuración y los fragmentos).

Los cambios del panel quedan en ese navegador y tienen prioridad sobre `config.js`. Para que valgan en todos los equipos, edite `config.js` y vuelva a desplegar.

> La clave docente **no es una medida de seguridad**: está en el código fuente y solo evita entradas accidentales. Para un control real del acceso se necesitaría la Fase 2 (Firebase Authentication), que no está implementada.

## Reglas de puntaje (resumen)

- PE por desafío: 100 % en el 1.er intento, 50 % en el 2.º y 25 % en el 3.º. La pista descuenta un 25 % del valor del desafío (mínimo 0). Hay un máximo de 3 intentos; después se muestra la solución explicada con 0 PE.
- Porcentaje = PE obtenidos ÷ PE máximos de los desafíos **activos**. La XP nunca entra en este cálculo.
- Respuestas abiertas: rúbrica de 3 criterios (0–2 cada uno). La pareja se autoevalúa y eso da un puntaje **provisorio**. Cuando el docente valida en el informe, el puntaje se recalcula.
- Comprobación individual: 3 preguntas distintas por integrante, con un solo intento. Se informa por separado, sin promediar.

## Limitaciones conocidas (honestidad)

- **Almacenamiento**: el progreso vive solo en el navegador de cada equipo. Si se borran los datos del navegador, se usa una ventana privada estricta o se cambia de equipo, se pierde. Si el navegador bloquea `localStorage`, la app avisa y funciona en memoria (se pierde al recargar). Por eso cada pareja debe **imprimir o descargar su informe**.
- **Validación docente**: se hace en el mismo navegador de la pareja, desde el informe y con la sesión docente abierta.
- **Despliegue**: los archivos de Firebase y GitHub Actions siguen la configuración estándar, pero **no se probaron contra un proyecto Firebase real**. Las pruebas Playwright se ejecutaron localmente y pasan (6/6).
- **Fragmentos**: la app no incluye texto de Kant. El docente es responsable de usar fragmentos de una edición que pueda reproducir y de citar edición y página.
