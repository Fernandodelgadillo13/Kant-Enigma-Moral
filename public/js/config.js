/* =====================================================================
   CONFIGURACIÓN — "El enigma de la moral: una aventura filosófica con Kant"
   ---------------------------------------------------------------------
   Este archivo contiene los valores INICIALES de la actividad.
   El docente puede cambiarlos de dos maneras:
     1) Editando este archivo (los cambios valen para todos los equipos
        que abran la página después del próximo despliegue).
     2) Desde el "Panel docente" dentro de la aplicación (los cambios se
        guardan solo en el navegador donde se hicieron).
   Si existe una configuración guardada en el navegador, esta tiene
   prioridad sobre los valores de este archivo. El botón
   "Restaurar configuración inicial" del panel docente la borra.
   ===================================================================== */

window.KANT_CONFIG = {
  /* Versión de la estructura de datos. Si cambias la estructura de
     content.js de forma importante, sube este número para que las
     partidas antiguas guardadas en el navegador no se mezclen. */
  version: 3,

  /* Clave (PIN) para entrar al panel docente.
     IMPORTANTE: no es una medida de seguridad real; solo evita que los
     estudiantes entren por accidente. Cualquiera que lea el código puede
     verla. Cámbiala antes de usar la actividad. */
  teacherPin: "Df.22793",
     colegios: [
    { id: "terranova", nombre: "Colegio Quillota Terranova", informeUrl: "https://script.google.com/macros/s/AKfycbxKquh2D2KmxB26tF49hyPXrGA_3_Npx6tTrrZ1JQUE2PuZ4ffkbLNMxuJ_IcahQg9vWg/exec" },
    { id: "sanagustin", nombre: "San Agustín", informeUrl: "https://script.google.com/macros/s/AKfycbxkbIL0mXCPiHLVBRixixfUKQyu8z9JouvDdyTzEc0VgCxkC3EGM4uEnzWxrmd_l4hI/exec" }
  ],

  /* ---------------- Puntaje de evaluación (PE) ----------------
     Porcentaje del valor del desafío que se obtiene según el intento
     en que se acierta: 1.er intento 100 %, 2.º 50 %, 3.º 25 %. */
  attemptMultipliers: [1, 0.5, 0.25],

  /* Número máximo de intentos por desafío. Después se muestra la
     solución explicada con 0 PE, para que nadie quede bloqueado. */
  maxAttempts: 3,

  /* Descuento por usar la pista: fracción del VALOR TOTAL del desafío
     (0.25 = 25 %). El resultado nunca baja de 0. */
  hintPenalty: 0.25,

  /* ---------------- Décimas ----------------
     maxDecimas: máximo de décimas que se pueden obtener.
     tramos: lista ordenada de menor a mayor. "desde" es el porcentaje
     mínimo (incluido) del tramo. Se aplica el último tramo cuyo "desde"
     sea menor o igual al porcentaje obtenido.
     Ejemplo inicial:
       menos de 50 %      → 0
       50 % a menos de 65 → 1
       65 % a menos de 80 → 2
       80 % a menos de 90 → 3
       90 % a menos de 100→ 4
       100 %              → 5                                          */
  maxDecimas: 5,
  tramos: [
    { desde: 0,   decimas: 0 },
    { desde: 50,  decimas: 1 },
    { desde: 65,  decimas: 2 },
    { desde: 80,  decimas: 3 },
    { desde: 90,  decimas: 4 },
    { desde: 100, decimas: 5 }
  ],

  /* Temporizador opcional en minutos (0 = sin temporizador).
     Al llegar a cero solo aparece un aviso; no se bloquea la actividad. */
  timerMinutes: 0,

  /* Zonas activas. Si desactivas una zona, sus desafíos no cuentan en
     el porcentaje y su sello no se exige para abrir la Puerta final. */
  zonesEnabled: { z1: true, z2: true, z3: true, z4: true },

  /* Identificadores de desafíos desactivados (por ejemplo ["c12","c27"]).
     Los desafíos desactivados no aparecen ni cuentan en el porcentaje. */
  disabledChallenges: [],

  /* Comprobación individual al final (3 preguntas por integrante). */
  individualCheckEnabled: true,

  /* ---------------- Experiencia (XP) — solo motivación ----------------
     La XP NUNCA se usa para calcular el porcentaje ni las décimas. */
  xp: {
    readReading: 10,
    preQuestion: 5,
    correctFirst: 20,
    correctLater: 10,
    sealEarned: 50
  },
  levels: [
    { desde: 0,   nombre: "Aprendiz de la biblioteca" },
    { desde: 120, nombre: "Lector atento" },
    { desde: 280, nombre: "Investigador de principios" },
    { desde: 460, nombre: "Guardián de la buena voluntad" },
    { desde: 650, nombre: "Filósofo crítico" }
  ]
};
