/* =====================================================================
   CONTENIDOS — «La roca y la estrella: una aventura con Camus»
   Albert Camus, El mito de Sísifo: «Lo absurdo y el suicidio»,
   «Los muros absurdos» y «El mito de Sísifo».
   ---------------------------------------------------------------------
   Todo el texto de este archivo es ORIGINAL (explicaciones, casos y
   preguntas). NO contiene citas del libro: Camus murió en 1960 y su obra
   (y su traducción) siguen protegidas por derecho de autor en Chile.

   ¿CÓMO AGREGAR LOS FRAGMENTOS DEL LIBRO?
   Use el Panel docente → «Fragmentos de lectura» y luego «Descargar
   archivo de fragmentos». Comparta ese archivo por un canal cerrado del
   curso (Classroom, correo); cada pareja lo carga en su equipo. Así el
   texto del libro NO queda publicado en internet. No pegue fragmentos de
   este libro aquí: este archivo se publica.

   TIPOS DE DESAFÍO: mcq, tf, match, classify, fill, order, lock, open
   (ver la documentación en el README). "valor" = puntos de evaluación.
   ===================================================================== */

window.KANT_CONTENT = {

  titulo: "La roca y la estrella",
  subtitulo: "Una aventura navideña con Camus",
  obra: "Albert Camus, El mito de Sísifo: «Lo absurdo y el suicidio», «Los muros absurdos» y «El mito de Sísifo»",
  autorFragmentos: "Camus",
  portada: "Es Nochebuena en un pueblo cubierto de nieve. En la cima de la montaña hay una estrella apagada, y solo podrá encenderse si alguien sube pensando con lucidez la pregunta más difícil de todas: <em>¿tiene sentido la vida, y qué hacemos si el mundo no nos responde?</em> Para llegar arriba deberán reunir tres estrellas, leyendo y razonando con Albert Camus en <em>El mito de Sísifo</em>.",

  /* Aviso de cuidado (se muestra en las lecturas marcadas con aviso: true
     y en la pantalla de inicio). */
  aviso: "Este ensayo de Camus parte de una pregunta delicada: si la vida vale la pena de ser vivida, y por eso menciona el suicidio como problema filosófico. Camus lo examina para responder que la falta de sentido NO exige renunciar a la vida. Si en algún momento te sientes mal o estás pasando por algo difícil, conversa con un adulto de confianza o llama al *4141 (Línea de Prevención del Suicidio del Ministerio de Salud): es gratuita, confidencial y atiende las 24 horas, todos los días.",

  /* Información para el panel docente */
  docente: {
    objetivos: [
      "Explicar por qué Camus considera que la pregunta por el sentido de la vida es la más urgente de la filosofía y por qué, para él, la falta de sentido no obliga a renunciar a vivir.",
      "Describir el sentimiento de lo absurdo y sus fuentes (la rutina, el tiempo, la extrañeza del mundo, la inhumanidad, los límites del conocimiento).",
      "Definir lo absurdo como la confrontación entre el deseo humano de claridad y el silencio irrazonable del mundo.",
      "Interpretar el mito de Sísifo: la conciencia, la lucidez frente a la esperanza como evasión, y la idea de imaginar a Sísifo feliz."
    ],
    contenidos: "Tres capítulos de <em>El mito de Sísifo</em>: «Lo absurdo y el suicidio», «Los muros absurdos» y «El mito de Sísifo». No se trabajan «El suicidio filosófico», «La libertad absurda», «El hombre absurdo» ni «La creación absurda».",
    cuidado: "El primer capítulo plantea el suicidio como problema filosófico. La actividad lo trata con cuidado: explica la pregunta de Camus y su respuesta (no hay equivalencia forzosa entre negar un sentido a la vida y declarar que no vale la pena), sin detalles ni desafíos sobre el acto mismo, y muestra el número *4141 (Línea de Prevención del Suicidio, MINSAL). Se sugiere anticipar el tema al curso, dar la posibilidad de conversar después y estar atento a señales de malestar. Ante cualquier señal, active los protocolos de convivencia y salud mental de su colegio."
  },

  /* ------------------------------------------------------------------
     ZONAS DEL MAPA (la montaña nevada)
     ------------------------------------------------------------------ */
  zonas: [
    {
      id: "z1",
      nombre: "La cabaña de la pregunta",
      sello: "Estrella de la pregunta",
      icono: "vela",
      descripcion: "Junto al fuego, Camus plantea la pregunta que considera más urgente y anuncia cómo la va a investigar.",
      lecturas: ["r1", "r2", "r3"]
    },
    {
      id: "z2",
      nombre: "El muro de hielo",
      sello: "Estrella de la lucidez",
      icono: "muro",
      descripcion: "¿Dónde aparece lo absurdo? En la rutina, el tiempo, el mundo, los otros y los límites de nuestro propio conocimiento.",
      lecturas: ["r4", "r5", "r6", "r7"]
    },
    {
      id: "z3",
      nombre: "La montaña de Sísifo",
      sello: "Estrella de la roca",
      icono: "montana",
      descripcion: "Sube junto a Sísifo y su roca: ¿qué pasa en la hora del descenso? ¿Por qué Camus nos pide imaginarlo feliz?",
      lecturas: ["r8", "r9", "r10"]
    },
    {
      id: "z4",
      nombre: "La cima de la estrella",
      sello: "Estrella de Sísifo dichoso",
      icono: "estrella",
      descripcion: "Solo se alcanza con las tres estrellas. Integren lo aprendido y luego cada integrante rinde su comprobación individual.",
      lecturas: []
    }
  ],

  /* ------------------------------------------------------------------
     RÚBRICA PARA RESPUESTAS ABIERTAS (visible para estudiantes)
     ------------------------------------------------------------------ */
  rubrica: {
    niveles: [
      { puntos: 0, nombre: "No logrado" },
      { puntos: 1, nombre: "Parcialmente logrado" },
      { puntos: 2, nombre: "Logrado" }
    ],
    criterios: [
      {
        id: "concepto",
        nombre: "Concepto correcto",
        descriptores: [
          "Confunde o no usa los conceptos de Camus (por ejemplo, identifica lo absurdo con «algo ridículo»).",
          "Usa los conceptos, pero con alguna imprecisión.",
          "Usa con precisión los conceptos de Camus (absurdo, conciencia, lucidez, esperanza como evasión, rebeldía, según corresponda)."
        ]
      },
      {
        id: "texto",
        nombre: "Uso del texto",
        descriptores: [
          "No se apoya en la lectura.",
          "Alude a la lectura de forma general.",
          "Se apoya en una idea concreta de la lectura o del fragmento (puede nombrar el ejemplo o la imagen)."
        ]
      },
      {
        id: "razonamiento",
        nombre: "Razonamiento propio",
        descriptores: [
          "Repite ideas sin explicar o no responde a la pregunta.",
          "Explica, pero el razonamiento tiene saltos o queda incompleto.",
          "Explica con sus palabras, conecta ideas y responde exactamente a lo pedido."
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------
     LECTURAS (10)
     ------------------------------------------------------------------ */
  lecturas: [
    /* ================= ZONA 1 ================= */
    {
      id: "r1",
      zona: "z1",
      aviso: true,
      titulo: "La pregunta más urgente",
      ubicacion: { seccion: "Lo absurdo y el suicidio", parte: "párrafos iniciales" },
      contexto: "Camus abre su ensayo preguntándose cuál es el problema filosófico más importante. Su respuesta sorprende: no es una cuestión teórica sobre el universo, sino una pregunta sobre nuestra propia vida.",
      explicacion: [
        "Para Camus, la pregunta fundamental de la filosofía es si la vida vale o no la pena de ser vivida. Las demás preguntas (cuántas dimensiones tiene el mundo, cuántas categorías tiene la mente) vienen después: en comparación, son casi un juego.",
        "¿Cómo decide qué pregunta es más urgente? Por los actos a los que obliga. Recuerda a Galileo, que renunció a defender una verdad científica cuando su vida estuvo en peligro: esa verdad no valía la hoguera. En cambio, la pregunta por el sentido de la vida sí compromete lo que hacemos.",
        "Camus propone pensarla con dos actitudes a la vez: la evidencia, que busca claridad, y el lirismo, que no olvida la emoción. Y aclara que no la estudia como un fenómeno social, sino como algo que ocurre en el pensamiento de cada persona: comenzar a pensar, dice, es comenzar a sentirse «minado» por dentro."
      ],
      conceptos: [
        { termino: "Pregunta fundamental", definicion: "Si la vida vale la pena de ser vivida: para Camus, la primera de la filosofía." },
        { termino: "Urgencia de una pregunta", definicion: "Se mide por los actos a los que obliga, no por su prestigio teórico." },
        { termino: "Evidencia y lirismo", definicion: "Pensar con claridad sin perder la emoción." },
        { termino: "Pensamiento individual", definicion: "Camus estudia la pregunta en la conciencia de cada persona, no como estadística social." }
      ],
      fragmento: { texto: "", edicion: "", pagina: "" },
      trabajoFragmento: "Busquen en el fragmento el ejemplo de Galileo. ¿Qué quiere mostrar Camus con él sobre la importancia de las preguntas?",
      pregunta: {
        enunciado: "Según Camus, ¿cómo se reconoce que una pregunta es más urgente que otra?",
        opciones: [
          { texto: "Por los actos a los que obliga en la vida de las personas.", correcta: true, retro: "Exacto: la urgencia se mide por lo que la pregunta compromete en nuestra vida." },
          { texto: "Por la cantidad de filósofos que la han estudiado.", correcta: false, retro: "Camus no usa un criterio de prestigio: le importa lo que la pregunta nos obliga a hacer." },
          { texto: "Por lo difícil que es demostrarla científicamente.", correcta: false, retro: "El ejemplo de Galileo muestra lo contrario: una verdad científica puede no valer una vida." }
        ]
      }
    },
    {
      id: "r2",
      zona: "z1",
      titulo: "El sentimiento de lo absurdo",
      ubicacion: { seccion: "Lo absurdo y el suicidio", parte: "parte central" },
      contexto: "¿Qué experiencia hace que alguien empiece a dudar del sentido de su vida? Camus le pone nombre: el sentimiento de lo absurdo.",
      explicacion: [
        "Camus observa que un mundo que podemos explicar, aunque sea con malas razones, nos resulta familiar. Pero cuando ese mundo pierde de pronto sus ilusiones y sus luces, nos sentimos extraños en él.",
        "Ese extrañamiento es como un exilio sin salida: ya no tenemos el recuerdo de una patria perdida ni la esperanza de una tierra prometida que nos consuele.",
        "A ese divorcio entre la persona y su vida, como el de un actor que de repente ya no reconoce el decorado en que actúa, Camus lo llama el sentimiento de lo absurdo. Ojo: «absurdo» aquí no significa «tonto» o «ridículo», sino la experiencia de no encontrar un sentido evidente en el mundo."
      ],
      conceptos: [
        { termino: "Mundo familiar", definicion: "El que podemos explicar, aunque sea con malas razones." },
        { termino: "Extrañamiento", definicion: "Sentirse ajeno en un mundo que perdió sus ilusiones." },
        { termino: "Exilio sin recurso", definicion: "Sin patria perdida que recordar ni tierra prometida que esperar." },
        { termino: "Sentimiento de lo absurdo", definicion: "El divorcio entre la persona y su vida, como un actor y su decorado." }
      ],
      fragmento: { texto: "", edicion: "", pagina: "" },
      trabajoFragmento: "Ubiquen en el fragmento la imagen del actor y el decorado. Explíquenla con un ejemplo de su propia vida (por ejemplo, un día en que todo les pareció extraño).",
      pregunta: {
        enunciado: "¿Qué significa «absurdo» en el ensayo de Camus?",
        opciones: [
          { texto: "La experiencia de no encontrar un sentido evidente en el mundo.", correcta: true, retro: "Bien: es el divorcio entre la persona y su vida, no algo «tonto»." },
          { texto: "Algo ridículo o gracioso que no hay que tomar en serio.", correcta: false, retro: "Es el uso cotidiano de la palabra, pero no el de Camus." },
          { texto: "Una opinión equivocada que la ciencia puede corregir.", correcta: false, retro: "Lo absurdo no es un error de razonamiento, sino una experiencia de la condición humana." }
        ]
      }
    },
    {
      id: "r3",
      zona: "z1",
      aviso: true,
      titulo: "¿Lo absurdo exige renunciar a la vida?",
      ubicacion: { seccion: "Lo absurdo y el suicidio", parte: "parte final" },
      contexto: "Camus formula el tema de su ensayo: si la falta de sentido obliga a abandonar la vida. Para responder, primero desarma una confusión muy común.",
      explicacion: [
        "Se suele creer que negar un sentido a la vida lleva forzosamente a decir que no vale la pena vivirla. Camus muestra que no hay ninguna equivalencia obligada entre ambos juicios: son dos afirmaciones distintas.",
        "Además, observa que en el apego a la vida hay algo más fuerte que todas las miserias: el cuerpo retrocede ante la destrucción. Nos acostumbramos a vivir antes de acostumbrarnos a pensar: la vida siempre lleva ventaja.",
        "También identifica una salida tramposa: la esperanza entendida como evasión, es decir, vivir para otra vida futura o para una gran idea que da sentido a la vida, pero al precio de traicionarla. Frente a eso, propone un «razonamiento absurdo»: mirar el problema de frente, con lucidez, sin escaparse, y averiguar si de verdad hay una lógica que lleve hasta la muerte. En los capítulos siguientes del libro, Camus responde que no: lo absurdo no exige renunciar a la vida."
      ],
      conceptos: [
        { termino: "Sin equivalencia forzosa", definicion: "Que la vida no tenga un sentido dado no implica que no valga la pena vivirla." },
        { termino: "Apego a la vida", definicion: "Algo más fuerte que las miserias: vivimos antes de pensar." },
        { termino: "Esperanza como evasión", definicion: "Escapar del problema poniendo el sentido fuera de esta vida." },
        { termino: "Razonamiento absurdo", definicion: "Pensar el problema con lucidez hasta el final, sin escaparse." }
      ],
      fragmento: { texto: "", edicion: "", pagina: "" },
      trabajoFragmento: "Busquen la frase en que Camus afirma que no hay equivalencia forzosa entre negar un sentido a la vida y declarar que no vale la pena. ¿Por qué es tan importante esa distinción?",
      pregunta: {
        enunciado: "Según la explicación, ¿qué relación hay entre «la vida no tiene un sentido dado» y «la vida no vale la pena»?",
        opciones: [
          { texto: "Ninguna obligada: la segunda no se sigue de la primera.", correcta: true, retro: "Exacto: Camus rechaza esa equivalencia; ese es el punto de partida de su respuesta." },
          { texto: "Son la misma afirmación dicha con otras palabras.", correcta: false, retro: "Esa es justamente la confusión que Camus desarma." },
          { texto: "La primera solo es verdadera si la segunda también lo es.", correcta: false, retro: "Camus muestra que pueden separarse: se puede reconocer lo absurdo y seguir afirmando la vida." }
        ]
      }
    },

    /* ================= ZONA 2 ================= */
    {
      id: "r4",
      zona: "z2",
      titulo: "Cuando los decorados se derrumban",
      ubicacion: { seccion: "Los muros absurdos", parte: "primera parte" },
      contexto: "Camus quiere mostrar dónde y cómo aparece lo absurdo. Empieza por lo más cotidiano.",
      explicacion: [
        "Lo absurdo puede aparecer en cualquier esquina y tiene comienzos humildes. Por ejemplo, cuando a alguien le preguntan en qué piensa y responde sinceramente «en nada»: la cadena de gestos diarios se corta y aparece un vacío que dice mucho.",
        "Camus describe la rutina: levantarse, viajar, trabajar, comer, volver, dormir… y repetir la semana. Ese camino se sigue sin problema casi siempre. Pero un día surge el «¿por qué?», y todo comienza con un cansancio mezclado con asombro.",
        "Lo importante es la palabra «comienza»: ese cansancio despierta la conciencia. Después, o se vuelve a la cadena de siempre sin pensar, o se produce un despertar definitivo. Para Camus esto es bueno, porque todo comienza por la conciencia y nada vale sino por ella."
      ],
      conceptos: [
        { termino: "Decorados", definicion: "La rutina diaria que vivimos sin preguntarnos por ella." },
        { termino: "El «por qué»", definicion: "La pregunta que de pronto interrumpe la rutina." },
        { termino: "Lasitud", definicion: "Cansancio mezclado con asombro que inicia la conciencia." },
        { termino: "Conciencia", definicion: "Darse cuenta: para Camus, todo comienza por ella." }
      ],
      fragmento: { texto: "", edicion: "", pagina: "" },
      trabajoFragmento: "Busquen en el fragmento la descripción de la rutina. Escriban una versión actual de esa rutina para un estudiante de 3° medio.",
      pregunta: {
        enunciado: "Para Camus, ¿qué valor tiene el cansancio que aparece cuando surge el «por qué»?",
        opciones: [
          { texto: "Es un comienzo: despierta la conciencia.", correcta: true, retro: "Bien: Camus subraya la palabra «comienza»." },
          { texto: "Es una enfermedad que hay que eliminar cuanto antes.", correcta: false, retro: "Camus reconoce que es incómodo, pero concluye que es bueno porque inicia la conciencia." },
          { texto: "Es una señal de que la rutina siempre es mala.", correcta: false, retro: "Camus no condena la rutina: describe el momento en que se vuelve visible." }
        ]
      }
    },
    {
      id: "r5",
      zona: "z2",
      titulo: "El tiempo, lo extraño y lo inhumano",
      ubicacion: { seccion: "Los muros absurdos", parte: "primera parte (continuación)" },
      contexto: "Además de la rutina, Camus encuentra otras puertas por las que entra lo absurdo.",
      explicacion: [
        "El tiempo: vivimos esperando el futuro («mañana», «cuando seas grande»). Pero un día alguien se da cuenta de su edad y se sitúa en el tiempo: comprende que el tiempo también lo lleva, y lo siente como un enemigo. Esa rebelión ante el paso del tiempo es lo absurdo.",
        "La extrañeza del mundo: a veces un paisaje o una piedra pierden el sentido que les dábamos y nos parecen ajenos, «espesos», indiferentes a nosotros. El mundo se nos escapa porque vuelve a ser él mismo.",
        "Lo inhumano en las personas: si vemos a alguien hablar por teléfono detrás de un vidrio, sin oírlo, sus gestos parecen una pantomima sin sentido. Incluso nuestra imagen en un espejo o en una foto puede parecernos la de un extraño. También eso es lo absurdo. Y está, finalmente, la conciencia de que somos mortales, que vuelve todo más urgente."
      ],
      conceptos: [
        { termino: "El tiempo", definicion: "Vivimos del futuro, hasta que descubrimos que el tiempo nos lleva." },
        { termino: "Espesor del mundo", definicion: "La naturaleza se vuelve ajena e indiferente a nuestros sentidos." },
        { termino: "Lo inhumano", definicion: "Los gestos humanos vistos sin sentido, como una pantomima." },
        { termino: "Mortalidad", definicion: "Saber que somos finitos vuelve más aguda la pregunta." }
      ],
      fragmento: { texto: "", edicion: "", pagina: "" },
      trabajoFragmento: "Ubiquen el ejemplo del hombre que habla por teléfono detrás de un vidrio. ¿Les ha pasado algo parecido mirando a alguien a lo lejos o en un video sin sonido?",
      pregunta: {
        enunciado: "Un estudiante ve una foto suya de hace años y por un momento siente que mira a un desconocido. Según Camus, eso es…",
        opciones: [
          { texto: "Una de las formas en que aparece lo absurdo.", correcta: true, retro: "Exacto: el extraño en el espejo o en la foto es uno de sus ejemplos." },
          { texto: "Un error de memoria sin importancia filosófica.", correcta: false, retro: "Camus le da importancia: muestra el extrañamiento frente a nosotros mismos." },
          { texto: "Una prueba de que el mundo es ridículo.", correcta: false, retro: "«Absurdo» no significa «ridículo»: es la experiencia de lo extraño y sin sentido evidente." }
        ]
      }
    },
    {
      id: "r6",
      zona: "z2",
      titulo: "La inteligencia ante sus muros",
      ubicacion: { seccion: "Los muros absurdos", parte: "parte central" },
      contexto: "Después de los sentimientos, Camus examina el conocimiento: ¿puede la razón darnos la claridad que buscamos?",
      explicacion: [
        "Comprender, dice Camus, es ante todo unificar: queremos reducir el mundo a algo familiar, a un principio que lo explique todo. A eso lo llama nostalgia de unidad o apetito de claridad.",
        "Pero el conocimiento choca con sus límites. Puedo sentir mi corazón y tocar el mundo y saber que existen, pero cuando intento definir quién soy, se me escapa como el agua que se escurre entre las manos: siempre seré en parte extraño a mí mismo.",
        "Con la ciencia ocurre algo parecido: describe y clasifica los fenómenos, pero cuando quiere explicarlo todo termina en hipótesis o imágenes (como representar el átomo como un pequeño sistema planetario). Camus siente que debe elegir entre descripciones ciertas que no le enseñan lo que busca e hipótesis que prometen enseñar, pero no son seguras."
      ],
      conceptos: [
        { termino: "Comprender es unificar", definicion: "Querer reducir el mundo a un principio familiar." },
        { termino: "Nostalgia de unidad", definicion: "El deseo profundo de claridad y de absoluto." },
        { termino: "Extraño a uno mismo", definicion: "No podemos definirnos por completo." },
        { termino: "Límite de la ciencia", definicion: "Describe fenómenos, pero no entrega el sentido del mundo." }
      ],
      fragmento: { texto: "", edicion: "", pagina: "" },
      trabajoFragmento: "Busquen en el fragmento el ejemplo del átomo como sistema planetario. ¿Por qué Camus dice que ahí la ciencia «terminó en poesía»?",
      pregunta: {
        enunciado: "¿Qué significa, según la explicación, que «comprender es unificar»?",
        opciones: [
          { texto: "Que queremos reducir el mundo a algo familiar y coherente.", correcta: true, retro: "Bien: es la nostalgia de unidad del espíritu humano." },
          { texto: "Que solo la ciencia puede comprender el mundo.", correcta: false, retro: "Camus muestra justamente los límites de la ciencia para darnos el sentido." },
          { texto: "Que todas las personas piensan exactamente lo mismo.", correcta: false, retro: "«Unificar» se refiere a reunir el mundo en un principio, no a pensar igual." }
        ]
      }
    },
    {
      id: "r7",
      zona: "z2",
      titulo: "¿Dónde está lo absurdo?",
      ubicacion: { seccion: "Los muros absurdos", parte: "parte final" },
      contexto: "Tras recorrer sentimientos y conocimiento, Camus precisa su definición. Y se corrige a sí mismo.",
      explicacion: [
        "Camus reconoce que exageraba al decir que «el mundo es absurdo». Lo correcto es decir que el mundo, en sí mismo, no es razonable: no responde a nuestras preguntas.",
        "Lo absurdo no está solo en el mundo ni solo en la persona: nace de la confrontación entre ese mundo irracional y el deseo desenfrenado de claridad que hay en lo más profundo del ser humano. Depende tanto de la persona como del mundo; es, por ahora, su único lazo.",
        "Por eso habla de tres personajes de un drama: lo irracional (el mundo que calla), la nostalgia humana (nuestro llamado a la claridad) y lo absurdo, que surge de su enfrentamiento. Otros pensadores de su época describieron este mismo clima; a Camus lo que le importa es qué consecuencias sacar de él con honradez."
      ],
      conceptos: [
        { termino: "Mundo no razonable", definicion: "El mundo en sí no responde a nuestras preguntas." },
        { termino: "Deseo de claridad", definicion: "El llamado humano a comprender y encontrar sentido." },
        { termino: "Lo absurdo", definicion: "La confrontación entre ese deseo y el silencio del mundo." },
        { termino: "Tres personajes", definicion: "Lo irracional, la nostalgia humana y lo absurdo." }
      ],
      fragmento: { texto: "", edicion: "", pagina: "" },
      trabajoFragmento: "Encuentren la frase en que Camus corrige su afirmación «el mundo es absurdo». ¿Qué cambia con esa corrección?",
      pregunta: {
        enunciado: "Según la corrección de Camus, ¿dónde está lo absurdo?",
        opciones: [
          { texto: "En la confrontación entre el deseo humano de claridad y el silencio del mundo.", correcta: true, retro: "Exacto: depende tanto de la persona como del mundo." },
          { texto: "Solo en el mundo, que es ridículo en sí mismo.", correcta: false, retro: "Camus se corrige: el mundo en sí solo es «no razonable»." },
          { texto: "Solo en la mente de las personas pesimistas.", correcta: false, retro: "Lo absurdo no es un estado de ánimo de algunos: es una relación entre todo ser humano y el mundo." }
        ]
      }
    },

    /* ================= ZONA 3 ================= */
    {
      id: "r8",
      zona: "z3",
      titulo: "Sísifo y su roca",
      ubicacion: { seccion: "El mito de Sísifo", parte: "primera parte" },
      contexto: "En el último capítulo, Camus recurre a un mito griego para mostrar en una imagen todo lo que ha pensado.",
      explicacion: [
        "Los dioses condenaron a Sísifo a subir una roca hasta la cima de una montaña, desde donde la piedra volvía a caer por su propio peso. Pensaron que no hay castigo peor que un trabajo inútil y sin esperanza.",
        "Las versiones del mito dan distintos motivos: Sísifo reveló secretos de los dioses a cambio de agua para su ciudad, encadenó a la Muerte, y cuando logró volver del mundo de los muertos ya no quiso regresar, porque amaba el agua, el sol y el mar. Los dioses tuvieron que llevarlo de vuelta por la fuerza.",
        "Por eso Camus dice que Sísifo es el héroe absurdo, tanto por sus pasiones (su desprecio de los dioses, su odio a la muerte, su amor por la vida) como por su tormento: un esfuerzo de todo el cuerpo que nunca termina nada."
      ],
      conceptos: [
        { termino: "El castigo", definicion: "Un trabajo inútil y sin esperanza: subir la roca para siempre." },
        { termino: "Sus pasiones", definicion: "Desprecio por los dioses, odio a la muerte, amor por la vida." },
        { termino: "Héroe absurdo", definicion: "Sísifo, por sus pasiones y por su tormento." }
      ],
      fragmento: { texto: "", edicion: "", pagina: "" },
      trabajoFragmento: "Busquen en el fragmento los motivos del castigo. ¿Cuál les parece que muestra mejor el amor de Sísifo por la vida?",
      pregunta: {
        enunciado: "¿Por qué los dioses eligieron ese castigo para Sísifo?",
        opciones: [
          { texto: "Porque creían que no hay castigo peor que un trabajo inútil y sin esperanza.", correcta: true, retro: "Bien: el castigo está en la inutilidad y en la falta de esperanza." },
          { texto: "Porque querían que Sísifo se pusiera más fuerte.", correcta: false, retro: "El castigo no busca un beneficio: busca que el esfuerzo no termine nada." },
          { texto: "Porque esperaban que algún día la roca quedara en la cima.", correcta: false, retro: "Al contrario: la roca siempre vuelve a caer; no hay esperanza de terminar." }
        ]
      }
    },
    {
      id: "r9",
      zona: "z3",
      titulo: "La hora de la conciencia",
      ubicacion: { seccion: "El mito de Sísifo", parte: "parte central" },
      contexto: "El mito no cuenta qué siente Sísifo. Camus imagina un momento preciso: cuando la roca ha caído y él baja a buscarla.",
      explicacion: [
        "A Camus le interesa el regreso, la pausa en que Sísifo baja de la montaña. Ese momento, que vuelve tan seguro como su castigo, es la hora de la conciencia. En cada uno de esos descensos, Sísifo es superior a su destino: es más fuerte que su roca.",
        "El mito es trágico porque su protagonista es consciente. Si a cada paso lo sostuviera la esperanza de lograrlo, el castigo no sería tal. Camus compara a Sísifo con el trabajador de hoy, que repite las mismas tareas todos los días: su destino no es menos absurdo, pero solo es trágico en los momentos en que se vuelve consciente.",
        "La lucidez que debía ser su tormento es, al mismo tiempo, su victoria: Sísifo conoce toda la magnitud de su condición y piensa en ella mientras baja. Camus resume: no hay destino que no se supere con el desprecio."
      ],
      conceptos: [
        { termino: "El descenso", definicion: "La pausa en que Sísifo baja a buscar la roca." },
        { termino: "Hora de la conciencia", definicion: "Momento en que es superior a su destino." },
        { termino: "Trágico", definicion: "El mito lo es porque Sísifo es consciente." },
        { termino: "Lucidez como victoria", definicion: "Lo que debía ser tormento se vuelve triunfo." }
      ],
      fragmento: { texto: "", edicion: "", pagina: "" },
      trabajoFragmento: "Ubiquen la comparación entre Sísifo y el trabajador actual. ¿En qué se parecen y en qué momento ambos se vuelven trágicos?",
      pregunta: {
        enunciado: "¿Por qué, según Camus, el mito de Sísifo es trágico?",
        opciones: [
          { texto: "Porque Sísifo es consciente de su condición.", correcta: true, retro: "Exacto: sin conciencia no habría tragedia." },
          { texto: "Porque Sísifo espera que algún día la roca se quede arriba.", correcta: false, retro: "Si tuviera esa esperanza, el castigo perdería su fuerza: es trágico porque no la tiene." },
          { texto: "Porque los dioses son injustos con él.", correcta: false, retro: "Puede que lo sean, pero Camus pone la tragedia en la conciencia de Sísifo." }
        ]
      }
    },
    {
      id: "r10",
      zona: "z3",
      titulo: "Imaginar a Sísifo feliz",
      ubicacion: { seccion: "El mito de Sísifo", parte: "parte final" },
      contexto: "Camus termina su ensayo con una afirmación que sorprende a todos los lectores.",
      explicacion: [
        "Si el descenso se hace algunos días con dolor, puede hacerse también con alegría. Camus recuerda a Edipo, que al final de su tragedia, ciego y desesperado, afirma que «todo está bien»: esa es la fórmula de la victoria absurda. La felicidad y lo absurdo son, dice, hijos de la misma tierra.",
        "Toda la alegría silenciosa de Sísifo consiste en que su destino le pertenece: su roca es «su cosa». Cuando deja de esperar algo de los dioses, el destino se vuelve un asunto humano, y el mundo, en silencio, vuelve a llenarse de las pequeñas voces de la tierra.",
        "Por eso Camus deja a Sísifo al pie de la montaña, con su carga de siempre, y concluye que el esfuerzo mismo por llegar a la cima basta para llenar un corazón humano. Su frase final es una invitación: hay que imaginar a Sísifo feliz. No porque haya ganado, sino porque vive con lucidez y hace suya su vida."
      ],
      conceptos: [
        { termino: "Victoria absurda", definicion: "Afirmar que «todo está bien» con plena lucidez." },
        { termino: "El destino le pertenece", definicion: "Su roca es su cosa: el destino se vuelve humano." },
        { termino: "El esfuerzo basta", definicion: "Subir hacia la cima llena un corazón, aunque no haya meta final." },
        { termino: "Sísifo feliz", definicion: "La conclusión del ensayo: vivir lúcidamente y hacer suya la vida." }
      ],
      fragmento: { texto: "", edicion: "", pagina: "" },
      trabajoFragmento: "Lean la última frase del ensayo. ¿Les parece una conclusión triste o esperanzadora? Justifiquen con lo que leyeron.",
      pregunta: {
        enunciado: "¿Por qué Camus dice que hay que imaginar a Sísifo feliz?",
        opciones: [
          { texto: "Porque su destino le pertenece y el esfuerzo mismo basta para llenar un corazón.", correcta: true, retro: "Bien: su felicidad no depende de terminar, sino de vivir lúcidamente." },
          { texto: "Porque al final los dioses lo perdonan y deja de cargar la roca.", correcta: false, retro: "Camus lo deja al pie de la montaña: la roca sigue rodando." },
          { texto: "Porque Sísifo olvida su castigo y deja de pensar en él.", correcta: false, retro: "Es al revés: su felicidad está ligada a la conciencia, no al olvido." }
        ]
      }
    }
  ],

  /* ------------------------------------------------------------------
     DESAFÍOS
     ------------------------------------------------------------------ */
  desafios: [
    /* ======================= ZONA 1 ======================= */
    {
      id: "c1", zona: "z1", lectura: "r1", tipo: "mcq", valor: 10, letra: "A",
      titulo: "La pregunta fundamental",
      enunciado: "¿Cuál es, para Camus, la pregunta fundamental de la filosofía?",
      opciones: [
        { texto: "Si la vida vale o no la pena de ser vivida.", correcta: true },
        { texto: "Cuántas dimensiones tiene realmente el mundo.", correcta: false, retro: "Camus pone ese tipo de preguntas en segundo lugar: son casi un juego en comparación." },
        { texto: "Si la Tierra gira alrededor del Sol o al revés.", correcta: false, retro: "Es el ejemplo de Galileo: Camus lo usa para mostrar una verdad que no vale una vida." },
        { texto: "Cuál es la mejor forma de organizar la sociedad.", correcta: false, retro: "Camus aclara que no estudia el problema como fenómeno social, sino en el pensamiento de cada persona." }
      ],
      explicacion: "Camus sostiene que juzgar si la vida vale la pena de ser vivida es responder a la pregunta fundamental de la filosofía; las demás vienen después.",
      pista: "Las otras preguntas, dice Camus, «vienen a continuación»."
    },
    {
      id: "c2", zona: "z1", lectura: "r1", tipo: "tf", valor: 10, letra: "B",
      titulo: "Galileo y la hoguera",
      afirmacion: "Camus usa el ejemplo de Galileo para mostrar que las verdades científicas son las más urgentes de todas.",
      respuesta: false,
      justificaciones: [
        { texto: "Es falso: lo usa para mostrar que esa verdad no valía una vida, a diferencia de la pregunta por el sentido de la vida.", correcta: true },
        { texto: "Es falso: Camus piensa que Galileo se equivocó al defender su teoría.", correcta: false, retro: "Camus no discute si Galileo tenía razón; discute cuánto vale esa verdad frente a la vida." },
        { texto: "Es verdadero: por eso Galileo prefirió morir antes que abjurar.", correcta: false, retro: "Revisen el ejemplo: Galileo abjuró cuando su vida estuvo en peligro." }
      ],
      retroValor: "Recuerden qué hizo Galileo cuando su vida estuvo en peligro y qué concluye Camus.",
      explicacion: "El ejemplo muestra que una verdad científica puede no valer una vida; en cambio, la pregunta por el sentido de la vida compromete nuestros actos.",
      pista: "Galileo abjuró de su verdad."
    },
    {
      id: "c3", zona: "z1", lectura: "r2", tipo: "mcq", valor: 10, letra: "S",
      titulo: "El actor y su decorado",
      enunciado: "¿Qué quiere expresar Camus con la imagen de un actor que se divorcia de su decorado?",
      opciones: [
        { texto: "La ruptura entre la persona y su vida, cuando el mundo deja de parecer familiar.", correcta: true },
        { texto: "Que la vida es una obra de teatro y por eso nada es real.", correcta: false, retro: "Camus no dice que nada sea real: describe un sentimiento de extrañamiento." },
        { texto: "Que las personas siempre fingen ser lo que no son.", correcta: false, retro: "La imagen no habla de fingir, sino de no reconocer el escenario en que se vive." },
        { texto: "Que el mundo es un lugar ridículo del que hay que reírse.", correcta: false, retro: "«Absurdo» no significa ridículo en Camus." }
      ],
      explicacion: "El divorcio entre el ser humano y su vida, como el de un actor y su decorado, es el sentimiento de lo absurdo.",
      pista: "La palabra clave es «divorcio»."
    },
    {
      id: "c4", zona: "z1", lectura: "r2", tipo: "match", valor: 15, letra: "U",
      titulo: "Relacionar conceptos",
      enunciado: "Asocien cada concepto con su descripción.",
      pares: [
        { izq: "Mundo familiar", der: "El que podemos explicar, aunque sea con malas razones" },
        { izq: "Exilio sin recurso", der: "Sin patria perdida ni tierra prometida que consuele" },
        { izq: "Sentimiento de lo absurdo", der: "Divorcio entre la persona y su vida" },
        { izq: "Evidencia y lirismo", der: "Pensar con claridad sin perder la emoción" }
      ],
      retroError: "Fíjense en qué concepto habla de explicación, cuál de consuelo, cuál de ruptura y cuál de método.",
      explicacion: "Un mundo explicable es familiar; sin ilusiones, nos sentimos en un exilio sin salida; ese divorcio es lo absurdo. Para pensarlo, Camus une evidencia y lirismo.",
      pista: "«Exilio» se relaciona con patria y tierra prometida."
    },
    {
      id: "c5", zona: "z1", lectura: "r3", tipo: "tf", valor: 10, letra: "R",
      titulo: "Una equivalencia falsa",
      afirmacion: "Para Camus, si la vida no tiene un sentido dado, entonces forzosamente no vale la pena vivirla.",
      respuesta: false,
      justificaciones: [
        { texto: "Es falso: Camus afirma que no hay equivalencia forzosa entre ambos juicios.", correcta: true },
        { texto: "Es falso: Camus demuestra que la vida tiene un sentido fijo dado desde fuera.", correcta: false, retro: "Camus no sostiene eso: acepta que el mundo no nos da un sentido evidente." },
        { texto: "Es verdadero: es la conclusión de su ensayo.", correcta: false, retro: "Es justamente la confusión que Camus desarma." }
      ],
      retroValor: "Revisen la Lectura 3: ¿esas dos afirmaciones son equivalentes para Camus?",
      explicacion: "Negar un sentido dado a la vida y declarar que no vale la pena son juicios distintos: uno no se sigue del otro.",
      pista: "Camus habla de «equivalencia forzosa»."
    },
    {
      id: "c6", zona: "z1", lectura: "r3", tipo: "mcq", valor: 10, letra: "D",
      titulo: "La esperanza como evasión",
      enunciado: "¿Qué entiende Camus por «esperanza» cuando la llama una evasión?",
      opciones: [
        { texto: "Poner el sentido fuera de esta vida, en otra vida o en una gran idea que la traiciona.", correcta: true },
        { texto: "Tener metas personales, como estudiar una carrera o ganar un campeonato.", correcta: false, retro: "Camus no critica tener proyectos: critica escapar del problema poniendo el sentido fuera de la vida." },
        { texto: "Sentirse optimista cuando las cosas salen bien.", correcta: false, retro: "No se refiere a un estado de ánimo, sino a una manera de eludir la pregunta." },
        { texto: "Confiar en que la ciencia resolverá todos los problemas.", correcta: false, retro: "Puede ser una forma de esperanza, pero la definición de Camus es más amplia: vivir para algo que supera y traiciona la vida." }
      ],
      explicacion: "La evasión típica es la esperanza de otra vida que hay que «merecer» o el vivir para una gran idea que da sentido a la vida, pero la traiciona.",
      pista: "La esperanza como evasión pone el sentido «fuera» de esta vida."
    },
    {
      id: "c7", zona: "z1", lectura: null, tipo: "order", valor: 15, letra: "O",
      titulo: "Ordenar el razonamiento",
      enunciado: "Ordenen los pasos del capítulo «Lo absurdo y el suicidio» (de arriba hacia abajo).",
      pasos: [
        "La pregunta más urgente es si la vida vale la pena de ser vivida.",
        "Esa pregunta surge del sentimiento de lo absurdo: el divorcio entre la persona y su vida.",
        "Pero no hay equivalencia forzosa entre negar un sentido a la vida y declarar que no vale la pena.",
        "Hay que evitar la evasión de la esperanza y mirar el problema con lucidez.",
        "Camus propone seguir un «razonamiento absurdo» para ver si hay una lógica que lleve hasta la muerte."
      ],
      retroError: "Camus va de la pregunta, al sentimiento que la origina, a la confusión que hay que evitar y, por último, al método.",
      explicacion: "Pregunta → sentimiento de lo absurdo → no hay equivalencia forzosa → rechazo de la evasión → razonamiento absurdo.",
      pista: "El primer paso es la pregunta; el último, el método."
    },
    {
      id: "c8", zona: "z1", lectura: null, tipo: "lock", valor: 10,
      titulo: "La cerradura de la cabaña",
      enunciado: "Cada desafío de esta zona les entregó una letra. Ordénenlas para formar la palabra que nombra el divorcio entre la persona y su vida.",
      clave: "ABSURDO",
      explicacion: "La clave es ABSURDO: el sentimiento de lo absurdo es el divorcio entre la persona y su vida, como un actor y su decorado.",
      retroError: "Esa palabra no abre la cerradura. Es un adjetivo que Camus usa como sustantivo: «lo …».",
      pista: "Es la palabra central del ensayo: «lo …»."
    },

    /* ======================= ZONA 2 ======================= */
    {
      id: "c9", zona: "z2", lectura: "r4", tipo: "mcq", valor: 10,
      titulo: "Cuando surge el «por qué»",
      enunciado: "Según Camus, ¿qué ocurre cuando, en medio de la rutina, surge un «¿por qué?»",
      opciones: [
        { texto: "Comienza a despertar la conciencia.", correcta: true },
        { texto: "La persona descubre que su rutina es mala y debe cambiarla.", correcta: false, retro: "Camus no juzga la rutina: describe el momento en que se vuelve visible." },
        { texto: "La persona pierde para siempre el interés por todo.", correcta: false, retro: "Camus subraya que es un comienzo, no un final." },
        { texto: "La persona confirma que todo tiene un sentido claro.", correcta: false, retro: "Es lo contrario: la pregunta muestra que el sentido no es evidente." }
      ],
      explicacion: "El cansancio teñido de asombro inicia el movimiento de la conciencia: todo comienza por ella.",
      pista: "Camus subraya la palabra «comienza»."
    },
    {
      id: "c10", zona: "z2", lectura: "r4", tipo: "fill", valor: 15,
      titulo: "Completar la idea",
      enunciado: "Completen la reconstrucción (en palabras de la actividad, no es cita).",
      texto: "Un día, en medio de la rutina, surge el {0}. Ese cansancio mezclado con asombro {1} la conciencia, y para Camus eso es bueno, porque todo comienza por la {2}.",
      huecos: [
        { opciones: ["«por qué»", "aburrimiento", "trabajo"], correcta: 0 },
        { opciones: ["despierta", "apaga", "reemplaza"], correcta: 0 },
        { opciones: ["conciencia", "costumbre", "esperanza"], correcta: 0 }
      ],
      retroError: "El cansancio no apaga nada: es un comienzo.",
      explicacion: "«Por qué» / despierta / conciencia.",
      pista: "El último espacio es la palabra que Camus repite: todo comienza por ella."
    },
    {
      id: "c11", zona: "z2", lectura: "r5", tipo: "classify", valor: 15,
      titulo: "Las puertas de lo absurdo",
      enunciado: "Clasifiquen cada experiencia según la fuente de lo absurdo que muestra.",
      categorias: ["La rutina", "El tiempo", "La extrañeza del mundo", "Lo inhumano en las personas"],
      items: [
        { texto: "Repetir cada semana: despertar, micro, clases, almuerzo, tareas, dormir.", categoria: 0 },
        { texto: "Darse cuenta de pronto de la propia edad y de que los años pasan.", categoria: 1 },
        { texto: "Mirar un cerro conocido y sentirlo, por un momento, completamente ajeno.", categoria: 2 },
        { texto: "Ver a alguien gesticular por videollamada sin sonido y que parezca una pantomima.", categoria: 3 },
        { texto: "Vivir siempre pensando en «cuando salga del colegio» o «el próximo año».", categoria: 1 },
        { texto: "Verse en una foto antigua y sentir que es un desconocido.", categoria: 3 }
      ],
      retroError: "Pregúntense si la experiencia trata de la repetición, del paso del tiempo, de la naturaleza o de las personas.",
      explicacion: "Camus encuentra lo absurdo en la rutina, en el tiempo (vivir del futuro y descubrirse en él), en la extrañeza de la naturaleza y en lo inhumano de los gestos y de nuestra propia imagen.",
      pista: "La foto antigua y la videollamada muestran a personas vistas como extrañas."
    },
    {
      id: "c12", zona: "z2", lectura: "r5", tipo: "mcq", valor: 10,
      titulo: "El tiempo como enemigo",
      enunciado: "¿Por qué, según Camus, el tiempo puede aparecer como un enemigo?",
      opciones: [
        { texto: "Porque vivimos esperando el futuro hasta descubrir que el tiempo también nos lleva.", correcta: true },
        { texto: "Porque nunca alcanza para hacer todas las tareas pendientes.", correcta: false, retro: "Es una queja cotidiana, pero Camus habla de descubrirse dentro de un tiempo que nos arrastra." },
        { texto: "Porque el pasado siempre fue mejor que el presente.", correcta: false, retro: "Camus no compara épocas: habla de cómo vivimos proyectados al futuro." },
        { texto: "Porque los relojes miden mal la duración de las cosas.", correcta: false, retro: "No es un problema de medición, sino de conciencia." }
      ],
      explicacion: "Vivimos del «mañana», pero un día nos situamos en el tiempo y lo reconocemos como lo que nos lleva: esa rebelión es lo absurdo.",
      pista: "Piensen en las frases «mañana» o «cuando seas grande»."
    },
    {
      id: "c13", zona: "z2", lectura: "r6", tipo: "mcq", valor: 10,
      titulo: "Extraño a mí mismo",
      enunciado: "Según la Lectura 6, ¿qué le ocurre a Camus cuando intenta definir quién es él mismo?",
      opciones: [
        { texto: "Se le escapa: siempre será en parte extraño a sí mismo.", correcta: true },
        { texto: "Lo logra fácilmente gracias a la psicología.", correcta: false, retro: "Camus dice que en psicología hay verdades, pero no la verdad completa." },
        { texto: "Descubre que en realidad no existe.", correcta: false, retro: "Camus está seguro de que existe: lo que no logra es definir su contenido." },
        { texto: "Comprende que es igual a todas las demás personas.", correcta: false, retro: "El problema no es la igualdad, sino que el «yo» no se deja resumir." }
      ],
      explicacion: "Puede sentir que existe, pero entre esa certeza y el contenido que intenta darle hay un foso que nunca se llena.",
      pista: "Piensen en la imagen del agua entre los dedos."
    },
    {
      id: "c14", zona: "z2", lectura: "r6", tipo: "tf", valor: 10,
      titulo: "Los límites de la ciencia",
      afirmacion: "Para Camus, la ciencia es inútil y no describe nada verdadero.",
      respuesta: false,
      justificaciones: [
        { texto: "Es falso: la ciencia describe y clasifica fenómenos, pero no le entrega el sentido del mundo que él busca.", correcta: true },
        { texto: "Es falso: para Camus la ciencia explica completamente el sentido de la vida.", correcta: false, retro: "Camus muestra sus límites: termina en hipótesis e imágenes." },
        { texto: "Es verdadero: por eso Camus prefiere ignorar la ciencia.", correcta: false, retro: "Camus valora la ciencia y quiere que siga avanzando, pero reconoce su límite." }
      ],
      retroValor: "¿Camus desprecia la ciencia o señala un límite?",
      explicacion: "La ciencia capta y enumera fenómenos, pero al querer explicarlo todo termina en hipótesis o metáforas: no puede darle el mundo «como suyo».",
      pista: "Recuerden el átomo como sistema planetario."
    },
    {
      id: "c15", zona: "z2", lectura: "r7", tipo: "mcq", valor: 10,
      titulo: "La corrección de Camus",
      enunciado: "Camus dice que se adelantaba al afirmar que «el mundo es absurdo». ¿Qué afirma en su lugar?",
      opciones: [
        { texto: "Que el mundo en sí no es razonable, y lo absurdo nace de su choque con nuestro deseo de claridad.", correcta: true },
        { texto: "Que el mundo es perfectamente razonable y el error está en nosotros.", correcta: false, retro: "Camus no dice que el mundo sea razonable." },
        { texto: "Que el absurdo solo existe en los libros de filosofía.", correcta: false, retro: "Lo absurdo es una experiencia que cualquiera puede sentir en un momento cotidiano." },
        { texto: "Que el mundo es absurdo solo para las personas tristes.", correcta: false, retro: "Lo absurdo es una relación entre todo ser humano y el mundo, no un estado de ánimo." }
      ],
      explicacion: "Lo absurdo depende tanto del ser humano como del mundo: es la confrontación entre lo irracional y el deseo de claridad.",
      pista: "Lo absurdo es un «lazo» entre dos términos."
    },
    {
      id: "c16", zona: "z2", lectura: "r7", tipo: "fill", valor: 15,
      titulo: "Los tres personajes",
      enunciado: "Completen la idea de los tres personajes del drama (en palabras de la actividad).",
      texto: "Lo absurdo nace de la confrontación entre el {0} humano de claridad y el {1} irrazonable del mundo. Por eso no está solo en el mundo ni solo en la persona: depende de {2}.",
      huecos: [
        { opciones: ["deseo", "miedo", "olvido"], correcta: 0 },
        { opciones: ["silencio", "orden", "ruido"], correcta: 0 },
        { opciones: ["ambos", "la suerte", "la ciencia"], correcta: 0 }
      ],
      retroError: "Lo absurdo es una relación: piensen en qué pone cada lado.",
      explicacion: "Deseo / silencio / ambos: lo absurdo une a la persona y al mundo en un enfrentamiento.",
      pista: "El mundo no responde: calla."
    },
    {
      id: "c17", zona: "z2", lectura: null, tipo: "classify", valor: 15,
      titulo: "¿Camus o confusión?",
      enunciado: "Decidan si cada afirmación describe correctamente a Camus o es una confusión frecuente.",
      categorias: ["Camus lo afirma", "Es una confusión"],
      items: [
        { texto: "Lo absurdo puede aparecer en cualquier momento cotidiano.", categoria: 0 },
        { texto: "«Absurdo» significa que algo es tonto o gracioso.", categoria: 1, retro: "En Camus es la experiencia de no encontrar un sentido evidente." },
        { texto: "Todo comienza por la conciencia.", categoria: 0 },
        { texto: "La ciencia nos entrega el sentido completo del mundo.", categoria: 1, retro: "Describe fenómenos, pero termina en hipótesis." },
        { texto: "Lo absurdo depende tanto de la persona como del mundo.", categoria: 0 },
        { texto: "Lo absurdo es un estado de ánimo de las personas pesimistas.", categoria: 1, retro: "Es una relación entre todo ser humano y el mundo." }
      ],
      retroError: "Revisen especialmente las afirmaciones sobre el significado de «absurdo» y sobre la ciencia.",
      explicacion: "Camus describe lo absurdo como una experiencia cotidiana que despierta la conciencia y que nace de la relación entre persona y mundo.",
      pista: "Hay tres afirmaciones correctas y tres confusiones."
    },
    {
      id: "c18", zona: "z2", lectura: null, tipo: "open", valor: 20,
      titulo: "Respuesta breve: mi «por qué»",
      enunciado: "Describan una situación cotidiana (distinta de las de la actividad) en que alguien podría sentir lo absurdo. Expliquen en 4 a 6 líneas qué fuente de lo absurdo muestra (rutina, tiempo, extrañeza del mundo, lo inhumano o los límites del conocimiento) y por qué, según Camus, ese momento puede ser un comienzo y no un final.",
      explicacion: "Una buena respuesta presenta una situación concreta, identifica con precisión la fuente de lo absurdo y explica que el «por qué» despierta la conciencia, que para Camus es el comienzo de todo."
    },

    /* ======================= ZONA 3 ======================= */
    {
      id: "c19", zona: "z3", lectura: "r8", tipo: "mcq", valor: 10,
      titulo: "El héroe absurdo",
      enunciado: "¿Por qué Camus llama a Sísifo «el héroe absurdo»?",
      opciones: [
        { texto: "Por sus pasiones (amor a la vida, desprecio de los dioses) y por su tormento.", correcta: true },
        { texto: "Porque logró engañar a los dioses para siempre.", correcta: false, retro: "Finalmente lo llevaron por la fuerza a cumplir su castigo." },
        { texto: "Porque su castigo tuvo un final feliz.", correcta: false, retro: "El castigo no termina: la roca siempre vuelve a caer." },
        { texto: "Porque nunca se dio cuenta de su situación.", correcta: false, retro: "Al contrario: lo decisivo será su conciencia." }
      ],
      explicacion: "Lo es tanto por sus pasiones como por su tormento: el precio de amar las cosas de esta tierra.",
      pista: "Camus lo explica por dos cosas: sus pasiones y su tormento."
    },
    {
      id: "c20", zona: "z3", lectura: "r8", tipo: "match", valor: 15,
      titulo: "Los motivos del castigo",
      enunciado: "Asocien cada episodio del mito con lo que muestra de Sísifo.",
      pares: [
        { izq: "Revela un secreto de los dioses a cambio de agua para su ciudad", der: "Desprecio de los dioses" },
        { izq: "Encadena a la Muerte", der: "Odio a la muerte" },
        { izq: "Vuelve a la tierra y no quiere regresar por el sol y el mar", der: "Amor apasionado por la vida" },
        { izq: "Sube la roca que siempre vuelve a caer", der: "Trabajo inútil y sin esperanza" }
      ],
      retroError: "Cada episodio muestra una pasión distinta; el último describe el castigo mismo.",
      explicacion: "Sus pasiones (desprecio de los dioses, odio a la muerte, amor a la vida) explican su castigo: un trabajo inútil y sin esperanza.",
      pista: "El sol y el mar hablan de cuánto ama Sísifo la vida."
    },
    {
      id: "c21", zona: "z3", lectura: "r9", tipo: "mcq", valor: 10,
      titulo: "El momento del descenso",
      enunciado: "¿Por qué a Camus le interesa especialmente el momento en que Sísifo baja de la montaña?",
      opciones: [
        { texto: "Porque es la hora de la conciencia, en la que es superior a su destino.", correcta: true },
        { texto: "Porque es el único momento en que Sísifo puede descansar de verdad.", correcta: false, retro: "No es un descanso: es el momento en que piensa su condición." },
        { texto: "Porque en ese momento planea cómo escapar de los dioses.", correcta: false, retro: "Camus no habla de escape: Sísifo vuelve a su roca." },
        { texto: "Porque ahí Sísifo olvida por fin su castigo.", correcta: false, retro: "Es al revés: es el momento de mayor lucidez." }
      ],
      explicacion: "En cada descenso, Sísifo es más fuerte que su roca: la conciencia lo hace superior a su destino.",
      pista: "Camus lo llama «la hora de la …»."
    },
    {
      id: "c22", zona: "z3", lectura: "r9", tipo: "tf", valor: 10,
      titulo: "Esperanza y castigo",
      afirmacion: "Según Camus, si Sísifo tuviera la esperanza de terminar algún día, su castigo sería todavía más terrible.",
      respuesta: false,
      justificaciones: [
        { texto: "Es falso: si lo sostuviera la esperanza, el castigo perdería su fuerza; es trágico porque es consciente y no espera.", correcta: true },
        { texto: "Es falso: Sísifo siempre tuvo la esperanza de que los dioses lo perdonaran.", correcta: false, retro: "El texto no dice eso: el castigo es justamente un trabajo sin esperanza." },
        { texto: "Es verdadero: la esperanza siempre hace sufrir más.", correcta: false, retro: "Camus pregunta en qué consistiría el castigo si lo sostuviera la esperanza: no sería tal." }
      ],
      retroValor: "Revisen la pregunta que se hace Camus en la Lectura 9 sobre la esperanza.",
      explicacion: "El mito es trágico porque Sísifo es consciente; si la esperanza lo sostuviera, ya no habría castigo.",
      pista: "¿En qué consistiría su castigo si esperara lograrlo?"
    },
    {
      id: "c23", zona: "z3", lectura: "r10", tipo: "mcq", valor: 10,
      titulo: "«Todo está bien»",
      enunciado: "¿Qué representa la frase de Edipo «todo está bien» en el ensayo de Camus?",
      opciones: [
        { texto: "La fórmula de la victoria absurda: afirmar la vida con plena lucidez.", correcta: true },
        { texto: "Que Edipo nunca supo realmente lo que le había pasado.", correcta: false, retro: "Al contrario: lo dice cuando ya lo sabe todo." },
        { texto: "Que el sufrimiento no existe si uno se lo propone.", correcta: false, retro: "Camus no niega el sufrimiento: lo reconoce y aun así afirma la vida." },
        { texto: "Que los dioses finalmente le dieron una recompensa.", correcta: false, retro: "Camus dice que esa frase expulsa a los dioses: hace del destino un asunto humano." }
      ],
      explicacion: "Edipo, ciego y desesperado, afirma que todo está bien: la sabiduría antigua coincide con el heroísmo moderno en la victoria absurda.",
      pista: "Camus la llama «la fórmula de la victoria …»."
    },
    {
      id: "c24", zona: "z3", lectura: "r10", tipo: "fill", valor: 15,
      titulo: "Sísifo dichoso",
      enunciado: "Completen la reconstrucción del final del ensayo (en palabras de la actividad).",
      texto: "La alegría de Sísifo consiste en que su destino le {0}: su roca es su cosa. El esfuerzo mismo por llegar a la cima basta para {1} un corazón humano. Por eso hay que imaginar a Sísifo {2}.",
      huecos: [
        { opciones: ["pertenece", "abandona", "castiga"], correcta: 0 },
        { opciones: ["llenar", "romper", "cansar"], correcta: 0 },
        { opciones: ["feliz", "vencido", "dormido"], correcta: 0 }
      ],
      retroError: "Es el final del ensayo: piensen en una conclusión que afirma la vida.",
      explicacion: "Pertenece / llenar / feliz: la última frase del ensayo pide imaginar a Sísifo dichoso.",
      pista: "La última palabra es la más conocida del ensayo."
    },
    {
      id: "c25", zona: "z3", lectura: null, tipo: "mcq", valor: 10,
      titulo: "Dilema: el ensayo que no termina",
      enunciado: "Florencia toca violín y ensaya cada día la misma pieza, que nunca le sale perfecta. ¿Qué actitud se parece más al Sísifo de Camus?",
      opciones: [
        { texto: "Seguir ensayando con conciencia de que la perfección no llegará, pero haciendo suyo el esfuerzo.", correcta: true },
        { texto: "Ensayar solo porque espera que un día un jurado la premie y entonces todo valga la pena.", correcta: false, retro: "Pone todo el sentido en un premio futuro: se parece a la esperanza como evasión." },
        { texto: "Ensayar sin pensar en nada, para no darse cuenta de lo que hace.", correcta: false, retro: "Sísifo es justamente consciente: la lucidez es su victoria." },
        { texto: "Dejar el violín, porque si no hay perfección no tiene sentido intentarlo.", correcta: false, retro: "Camus muestra que la falta de una meta final no hace inútil el esfuerzo: «basta para llenar un corazón»." }
      ],
      explicacion: "Como Sísifo, Florencia puede hacer suyo el esfuerzo con lucidez, sin necesitar una recompensa final que lo justifique.",
      pista: "Busquen la opción que une conciencia y esfuerzo."
    },
    {
      id: "c26", zona: "z3", lectura: null, tipo: "tf", valor: 10,
      titulo: "Dilema: la tarea de todos los días",
      afirmacion: "Para Camus, un trabajador que repite las mismas tareas cada día solo vive algo trágico en los momentos en que se vuelve consciente de su situación.",
      respuesta: true,
      justificaciones: [
        { texto: "Es verdadero: su destino no es menos absurdo que el de Sísifo, pero solo es trágico cuando se hace consciente.", correcta: true },
        { texto: "Es verdadero: porque todo trabajo repetitivo es malo en sí mismo.", correcta: false, retro: "El valor de verdad es correcto, pero Camus no condena el trabajo: pone lo trágico en la conciencia." },
        { texto: "Es falso: el trabajo repetitivo nunca tiene relación con lo absurdo.", correcta: false, retro: "Camus compara explícitamente a Sísifo con el trabajador actual." }
      ],
      retroValor: "Revisen la comparación entre Sísifo y el trabajador de hoy (Lectura 9).",
      explicacion: "El destino del trabajador no es menos absurdo, pero solo es trágico en los raros momentos en que se hace consciente.",
      pista: "La clave es la conciencia."
    },
    {
      id: "c27", zona: "z3", lectura: null, tipo: "mcq", valor: 10,
      titulo: "Dilema: «cuando me gane la lotería…»",
      enunciado: "Martín dice: «Lo de hoy no importa; mi vida empieza de verdad cuando me gane la lotería». Según Camus, esta actitud se parece a…",
      opciones: [
        { texto: "La esperanza como evasión: poner el sentido fuera del presente.", correcta: true },
        { texto: "La lucidez de Sísifo en la hora del descenso.", correcta: false, retro: "Sísifo no espera nada: vive con conciencia su situación presente." },
        { texto: "La victoria absurda de Edipo.", correcta: false, retro: "Edipo afirma la vida tal como es, no una vida futura ideal." },
        { texto: "El método de la evidencia y el lirismo.", correcta: false, retro: "Ese es el modo de pensar que propone Camus, no una actitud de evasión." }
      ],
      explicacion: "Vivir para un futuro que dará sentido a todo es una forma de esperanza como evasión: elude la vida presente.",
      pista: "¿Dónde pone Martín el sentido de su vida?"
    },
    {
      id: "c28", zona: "z3", lectura: null, tipo: "classify", valor: 15,
      titulo: "Lucidez o evasión",
      enunciado: "Clasifiquen cada actitud según Camus.",
      categorias: ["Lucidez (como Sísifo)", "Evasión"],
      items: [
        { texto: "Reconocer que no todo tiene una explicación y seguir haciendo lo que uno ama.", categoria: 0 },
        { texto: "Mirar el celular cada vez que aparece una pregunta incómoda.", categoria: 1, retro: "Distraerse para no pensar elude el problema." },
        { texto: "Pensar en lo que uno hace mientras lo hace, aunque sea repetitivo.", categoria: 0 },
        { texto: "Decir «todo tendrá sentido el próximo año» para no pensar en el presente.", categoria: 1, retro: "Es la esperanza como evasión." },
        { texto: "Hacer suyo un esfuerzo aunque no tenga una recompensa final.", categoria: 0 }
      ],
      retroError: "Pregúntense si la actitud mira el problema de frente o lo esquiva.",
      explicacion: "La lucidez mira de frente la condición humana y hace suya la vida; la evasión se distrae o pone el sentido fuera del presente.",
      pista: "Hay tres actitudes lúcidas y dos evasiones."
    },
    {
      id: "c29", zona: "z3", lectura: null, tipo: "open", valor: 20,
      titulo: "Justificación breve: mi roca",
      enunciado: "Elijan una actividad de su vida que se repita como la roca de Sísifo (estudiar, entrenar, ayudar en la casa…). Expliquen en 4 a 6 líneas cómo podrían vivirla con lucidez y no como evasión, usando los conceptos de conciencia, esperanza y la frase «su roca es su cosa».",
      explicacion: "Una buena respuesta presenta una actividad concreta, distingue vivirla con conciencia de vivirla esperando un premio que la justifique, y explica qué significa hacer suya la propia «roca»."
    },

    /* ======================= ZONA 4 ======================= */
    {
      id: "c30", zona: "z4", lectura: null, tipo: "mcq", valor: 10,
      titulo: "Pregunta integradora",
      enunciado: "¿Qué afirmación resume mejor el recorrido de los tres capítulos?",
      opciones: [
        { texto: "Lo absurdo nace del choque entre nuestro deseo de claridad y el silencio del mundo; no obliga a renunciar a la vida, sino que puede vivirse con lucidez, como Sísifo.", correcta: true },
        { texto: "El mundo es ridículo, por lo que nada importa y da lo mismo cómo se viva.", correcta: false, retro: "Mezcla dos confusiones: «absurdo» como ridículo y la idea de que nada importa." },
        { texto: "La vida tiene un sentido fijo que la ciencia algún día demostrará.", correcta: false, retro: "Camus muestra los límites de la ciencia para darnos el sentido." },
        { texto: "La única salida es la esperanza en una recompensa futura.", correcta: false, retro: "Camus la llama evasión." }
      ],
      explicacion: "El recorrido va de la pregunta (cap. 1) a la definición de lo absurdo (cap. 2) y a la imagen de Sísifo lúcido y feliz (cap. 3).",
      pista: "Busquen la opción que menciona lucidez y a Sísifo."
    },
    {
      id: "c31", zona: "z4", lectura: null, tipo: "classify", valor: 15,
      titulo: "Distinguir ideas",
      enunciado: "¿Cada afirmación describe correctamente a Camus o es una confusión?",
      categorias: ["Camus lo afirma", "Es una confusión"],
      items: [
        { texto: "No hay equivalencia forzosa entre negar un sentido a la vida y declarar que no vale la pena.", categoria: 0 },
        { texto: "El castigo de Sísifo es un trabajo inútil y sin esperanza.", categoria: 0 },
        { texto: "Camus concluye que Sísifo es infeliz porque nunca termina.", categoria: 1, retro: "Su conclusión es imaginarlo feliz." },
        { texto: "Lo absurdo depende solo del mundo.", categoria: 1, retro: "Depende tanto de la persona como del mundo." },
        { texto: "La lucidez de Sísifo es, a la vez, su tormento y su victoria.", categoria: 0 },
        { texto: "La esperanza en otra vida es, para Camus, la mejor respuesta a lo absurdo.", categoria: 1, retro: "La considera una evasión." }
      ],
      retroError: "Revisen las afirmaciones sobre la felicidad de Sísifo, el origen de lo absurdo y la esperanza.",
      explicacion: "Camus rechaza la equivalencia entre falta de sentido y renuncia a la vida, define lo absurdo como relación y termina con un Sísifo lúcido y feliz.",
      pista: "Hay tres afirmaciones correctas y tres confusiones."
    },
    {
      id: "c32", zona: "z4", lectura: null, tipo: "order", valor: 15,
      titulo: "Reconstruir el recorrido",
      enunciado: "Ordenen el recorrido completo de los tres capítulos (de arriba hacia abajo).",
      pasos: [
        "La pregunta más urgente es si la vida vale la pena de ser vivida.",
        "Lo absurdo aparece en la rutina, el tiempo, la extrañeza del mundo y lo inhumano.",
        "Lo absurdo es la confrontación entre el deseo humano de claridad y el silencio del mundo.",
        "Sísifo, consciente en la hora del descenso, es superior a su destino.",
        "Hay que imaginar a Sísifo feliz."
      ],
      retroError: "El primer capítulo plantea la pregunta, el segundo describe y define lo absurdo, el tercero lo ilustra con Sísifo.",
      explicacion: "Pregunta → manifestaciones de lo absurdo → definición → conciencia de Sísifo → Sísifo feliz.",
      pista: "La frase final del ensayo cierra el recorrido."
    },
    {
      id: "c33", zona: "z4", lectura: null, tipo: "tf", valor: 10,
      titulo: "Felicidad y absurdo",
      afirmacion: "Para Camus, la felicidad y lo absurdo son incompatibles: quien descubre lo absurdo ya no puede ser feliz.",
      respuesta: false,
      justificaciones: [
        { texto: "Es falso: Camus dice que la felicidad y lo absurdo son hijos de la misma tierra, y que hay que imaginar a Sísifo feliz.", correcta: true },
        { texto: "Es falso: lo absurdo desaparece apenas uno es feliz.", correcta: false, retro: "Lo absurdo no desaparece: la roca sigue rodando." },
        { texto: "Es verdadero: por eso Sísifo sufre eternamente.", correcta: false, retro: "Camus concluye lo contrario: hay que imaginarlo feliz." }
      ],
      retroValor: "¿Cómo termina el ensayo?",
      explicacion: "Felicidad y absurdo son inseparables: Sísifo, lúcido, puede ser dichoso.",
      pista: "Recuerden la última frase del ensayo."
    },
    {
      id: "c34", zona: "z4", lectura: null, tipo: "open", valor: 20,
      titulo: "Reflexión final y fundamentación escrita",
      enunciado: "Un compañero dice: «Si el mundo no tiene un sentido dado, entonces nada de lo que hagamos importa». Respondan como lo haría Camus (6 a 8 líneas): expliquen si están de acuerdo o no, y relacionen su respuesta con al menos dos ideas del ensayo (lo absurdo, la conciencia, la esperanza como evasión, el mito de Sísifo, «hay que imaginar a Sísifo feliz»).",
      explicacion: "Una buena respuesta rechaza la equivalencia entre falta de sentido dado y «nada importa», explica lo absurdo como relación, distingue lucidez de evasión y usa la figura de Sísifo para mostrar que el esfuerzo vivido con conciencia puede llenar una vida."
    }
  ],

  /* ------------------------------------------------------------------
     COMPROBACIÓN INDIVIDUAL (3 preguntas por integrante, 1 intento)
     ------------------------------------------------------------------ */
  individual: [
    {
      id: "i1", integrante: 0,
      enunciado: "Para Camus, la pregunta fundamental de la filosofía es…",
      opciones: [
        { texto: "si la vida vale o no la pena de ser vivida.", correcta: true },
        { texto: "si la Tierra gira alrededor del Sol.", correcta: false },
        { texto: "cuántas dimensiones tiene el mundo.", correcta: false }
      ],
      explicacion: "Las demás preguntas vienen después; esa compromete nuestros actos."
    },
    {
      id: "i2", integrante: 0,
      enunciado: "El sentimiento de lo absurdo es…",
      opciones: [
        { texto: "el divorcio entre la persona y su vida.", correcta: true },
        { texto: "la risa ante algo ridículo.", correcta: false },
        { texto: "un error de razonamiento.", correcta: false }
      ],
      explicacion: "Como un actor que ya no reconoce su decorado."
    },
    {
      id: "i3", integrante: 0,
      enunciado: "¿Por qué el mito de Sísifo es trágico según Camus?",
      opciones: [
        { texto: "Porque Sísifo es consciente de su condición.", correcta: true },
        { texto: "Porque Sísifo espera terminar algún día.", correcta: false },
        { texto: "Porque la roca es demasiado pesada.", correcta: false }
      ],
      explicacion: "Sin conciencia no habría tragedia."
    },
    {
      id: "i4", integrante: 1,
      enunciado: "Para Camus, lo absurdo nace…",
      opciones: [
        { texto: "del choque entre el deseo de claridad y el silencio del mundo.", correcta: true },
        { texto: "solo de la mente de las personas tristes.", correcta: false },
        { texto: "de los errores de la ciencia.", correcta: false }
      ],
      explicacion: "Depende tanto de la persona como del mundo."
    },
    {
      id: "i5", integrante: 1,
      enunciado: "Vivir solo pensando en que «todo tendrá sentido el próximo año» es, para Camus…",
      opciones: [
        { texto: "una forma de esperanza como evasión.", correcta: true },
        { texto: "la lucidez de Sísifo.", correcta: false },
        { texto: "la victoria absurda.", correcta: false }
      ],
      explicacion: "Pone el sentido fuera del presente."
    },
    {
      id: "i6", integrante: 1,
      enunciado: "¿Cómo termina El mito de Sísifo?",
      opciones: [
        { texto: "Afirmando que hay que imaginar a Sísifo feliz.", correcta: true },
        { texto: "Con Sísifo liberado por los dioses.", correcta: false },
        { texto: "Afirmando que nada vale la pena.", correcta: false }
      ],
      explicacion: "El esfuerzo mismo basta para llenar un corazón humano."
    }
  ],

  /* Niveles de experiencia (solo motivación; reemplazan los de config.js) */
  niveles: [
    { desde: 0,   nombre: "Caminante de la nieve" },
    { desde: 120, nombre: "Lector lúcido" },
    { desde: 280, nombre: "Escalador de muros" },
    { desde: 460, nombre: "Compañero de Sísifo" },
    { desde: 650, nombre: "Guardián de la estrella" }
  ],

  insignias: [
    { id: "lector", nombre: "Lectores lúcidos", descripcion: "Abrieron las diez lecturas." },
    { id: "clave", nombre: "Descifradores", descripcion: "Abrieron la cerradura de la cabaña." },
    { id: "sinPistas", nombre: "Sin atajos", descripcion: "Completaron una zona sin usar pistas." },
    { id: "primerIntento", nombre: "Puntería filosófica", descripcion: "Acertaron 5 desafíos seguidos al primer intento." },
    { id: "tresSellos", nombre: "Tres estrellas", descripcion: "Reunieron las tres estrellas." },
    { id: "juicio", nombre: "La estrella encendida", descripcion: "Completaron la cima de la estrella." }
  ]
};
