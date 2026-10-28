/* =====================================================================
   CONTENIDOS — "El enigma de la moral: una aventura filosófica con Kant"
   ---------------------------------------------------------------------
   Todo el texto de este archivo es ORIGINAL (explicaciones didácticas,
   casos y preguntas). NO contiene citas de ninguna traducción.

   ¿CÓMO AGREGAR LOS FRAGMENTOS DE KANT?
   Cada lectura tiene un objeto "fragmento" vacío:
       fragmento: { texto: "", edicion: "", pagina: "" }
   El docente puede:
     a) Escribir aquí el fragmento de su edición autorizada (texto,
        traducción/edición y página), y volver a desplegar; o
     b) Pegarlo desde el Panel docente → "Fragmentos de lectura"
        (queda guardado solo en ese navegador).
   Mientras el campo esté vacío, la lectura muestra un panel marcado
   "Fragmento pendiente — lo agrega el docente" y la actividad funciona
   igual con la explicación original.

   Use [...] para marcar los cortes dentro de un fragmento.

   FRAGMENTOS INCLUIDOS: traducción de Manuel García Morente (1921),
   de dominio público (el traductor murió en 1942). Se cotejaron con dos
   copias digitales de esa traducción (Instituto de Investigaciones
   Filosóficas, UNAM, y la edición digital de P. M. Rosario Barbosa, 2007).
   Ambas comparten una digitalización, por lo que se corrigieron solo
   erratas evidentes («en tomo suyo» → «en torno suyo», «lo basta» →
   «le basta», «unía» → «una»). En la Lectura 10 se marcó con [...] una
   repetición dudosa de la digitalización. Conviene una revisión final
   contra el facsímil de 1921 en Wikisource.
   Solo deben ir aquí textos de dominio público: este archivo se publica.
   La "ubicación sugerida" (Ak. IV) proviene de la planificación de la
   actividad; confírmela con su edición antes de usarla.

   TIPOS DE DESAFÍO
     mcq      selección múltiple (cada alternativa trae su retroalimentación)
     tf       verdadero/falso + elección de la justificación
     match    asociación (cada elemento de la izquierda con uno de la derecha)
     classify clasificación en categorías
     fill     completar frases (con listas de palabras)
     order    ordenar pasos
     lock     cerradura de letras (clave cifrada)
     open     desarrollo breve, evaluado con rúbrica (autoevaluación +
              validación docente). NO hay corrección automática.
   "valor" = puntos de evaluación (PE) máximos del desafío.
   ===================================================================== */

window.KANT_CONTENT = {

  titulo: "El enigma de la moral",
  subtitulo: "Una aventura filosófica con Kant",
  obra: "Fundamentación de la metafísica de las costumbres (1785): Prefacio y Primera sección",

  /* ------------------------------------------------------------------
     ZONAS DEL MAPA
     ------------------------------------------------------------------ */
  zonas: [
    {
      id: "z1",
      nombre: "Biblioteca de los fundamentos",
      sello: "Sello de la razón pura",
      icono: "manuscrito",
      descripcion: "Antes de juzgar acciones, Kant pregunta qué tipo de conocimiento es la moral. Aquí descubrirán por qué busca una filosofía moral \"pura\".",
      lecturas: ["r1", "r2", "r3"]
    },
    {
      id: "z2",
      nombre: "Laboratorio de las acciones",
      sello: "Sello de la buena voluntad",
      icono: "matraz",
      descripcion: "Pongan a prueba acciones que se ven iguales por fuera, pero que nacen de motivos distintos.",
      lecturas: ["r4", "r5", "r6", "r7"]
    },
    {
      id: "z3",
      nombre: "Cámara de las decisiones",
      sello: "Sello del respeto",
      icono: "puerta",
      descripcion: "Máximas, respeto por la ley y promesas difíciles: decidan como Kant esperaría que se piense una decisión.",
      lecturas: ["r8", "r9", "r10"]
    },
    {
      id: "z4",
      nombre: "Puerta del juicio final",
      sello: "Sello del juicio",
      icono: "sello",
      descripcion: "Solo se abre con los tres sellos. Integren todo lo aprendido y luego cada integrante rinde su comprobación individual.",
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
          "Confunde o no usa los conceptos de Kant (por ejemplo, identifica el valor moral con los resultados).",
          "Usa los conceptos, pero con alguna imprecisión.",
          "Usa los conceptos de Kant con precisión (deber, inclinación, máxima, buena voluntad, según corresponda)."
        ]
      },
      {
        id: "texto",
        nombre: "Uso del texto",
        descriptores: [
          "No se apoya en la lectura.",
          "Alude a la lectura de forma general.",
          "Se apoya en una idea concreta de la lectura o del fragmento (puede nombrar el ejemplo o la proposición)."
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
     LECTURAS (10). Cada una: contexto filosófico, explicación original,
     conceptos clave, panel del fragmento (vacío), pregunta previa.
     ------------------------------------------------------------------ */
  lecturas: [
    /* ================= ZONA 1 ================= */
    {
      id: "r1",
      zona: "z1",
      titulo: "Un mapa del saber: ¿dónde vive la moral?",
      ubicacion: { seccion: "Prefacio", akSugerida: "Ak. IV 387–388" },
      contexto: "Kant abre la obra con una pregunta de orden: si queremos estudiar la moral con rigor, primero hay que saber qué tipo de conocimiento es y en qué lugar del \"mapa\" de la filosofía se ubica.",
      explicacion: [
        "Kant retoma una división antigua de la filosofía en tres ciencias: la física, la ética y la lógica. La lógica estudia solo la forma del pensar, sin importar de qué objeto se trate. La física y la ética, en cambio, tienen un objeto propio: la física estudia las leyes de la naturaleza (lo que sucede) y la ética estudia las leyes de la libertad (lo que debe suceder).",
        "Luego distingue dos maneras de conocer. Un conocimiento es empírico cuando se apoya en la experiencia (observar, medir, recordar casos). Es puro o a priori cuando se obtiene solo de la razón, sin depender de lo que observamos.",
        "Con estas dos distinciones arma su mapa: la ética tendría una parte empírica, que estudia cómo se comportan de hecho los seres humanos (Kant la llama antropología práctica), y una parte racional o pura, que es la moral propiamente tal. A esa parte pura la llama metafísica de las costumbres. La palabra \"metafísica\" aquí no significa algo misterioso: significa conocimiento que viene de la razón y no de la experiencia."
      ],
      conceptos: [
        { termino: "Conocimiento formal", definicion: "El que estudia solo la forma del pensar, sin un objeto particular (la lógica)." },
        { termino: "Conocimiento material", definicion: "El que estudia un objeto: la naturaleza (física) o la libertad (ética)." },
        { termino: "Empírico", definicion: "Que se apoya en la experiencia." },
        { termino: "Puro / a priori", definicion: "Que proviene solo de la razón, sin depender de la experiencia." },
        { termino: "Antropología práctica", definicion: "Parte empírica de la ética: cómo actúan de hecho los seres humanos." },
        { termino: "Metafísica de las costumbres", definicion: "Parte pura de la ética: los principios morales que da la razón." }
      ],
      fragmento: {
        texto: "Todo conocimiento racional, o es material y considera algún objeto, o es formal y se ocupa tan sólo de la forma del entendimiento y de la razón misma, y de las reglas universales del pensar en general, sin distinción de objetos. La filosofía formal se llama lógica; la filosofía material, empero, que tiene referencia a determinados objetos y a las leyes a que éstos están sometidos, se divide a su vez en dos. Porque las leyes son, o leyes de la naturaleza, o leyes de la libertad. La ciencia de las primeras llámase física; la de las segundas, ética; aquélla también suele llamarse teoría de la naturaleza, y ésta, teoría de las costumbres. [...]\n\nPuede llamarse empírica toda filosofía que arraiga en fundamentos de la experiencia; pero la que presenta sus teorías derivándolas exclusivamente de principios a priori, se llama filosofía pura. Esta última, cuando es meramente formal, se llama lógica; pero si se limita a determinados objetos del entendimiento, se llama entonces metafísica. De esta manera se origina la idea de una doble metafísica, una metafísica de la naturaleza y una metafísica de las costumbres. La física, pues, tendrá su parte empírica, pero también una parte racional; la ética igualmente, aun cuando aquí la parte empírica podría llamarse especialmente antropología práctica, y la parte racional, propiamente moral.",
        edicion: "Trad. de Manuel García Morente (Madrid, Calpe, 1921; dominio público)",
        pagina: "Ak. IV 387–388"
      },
      trabajoFragmento: "Busquen en el fragmento las palabras que nombran la parte empírica y la parte racional de la ética. ¿Cuál de las dos estudiará Kant en esta obra?",
      pregunta: {
        enunciado: "Según la explicación, ¿qué estudia la parte pura de la ética?",
        opciones: [
          { texto: "Los principios morales que la razón puede establecer sin depender de la experiencia.", correcta: true, retro: "Exacto: esa parte pura es lo que Kant llama metafísica de las costumbres." },
          { texto: "Las costumbres reales de cada país, observadas y descritas.", correcta: false, retro: "Eso sería observación de la experiencia: corresponde a la parte empírica (antropología práctica)." },
          { texto: "Las leyes que gobiernan los cuerpos y la naturaleza.", correcta: false, retro: "Eso corresponde a la física, no a la ética." }
        ]
      }
    },
    {
      id: "r2",
      zona: "z1",
      titulo: "\"No debes mentir\": una ley para todo ser racional",
      ubicacion: { seccion: "Prefacio", akSugerida: "Ak. IV 389" },
      contexto: "¿Por qué no basta con observar cómo vive la gente para saber qué es moral? Kant sostiene que es urgente elaborar una filosofía moral pura, separada de todo lo empírico.",
      explicacion: [
        "Kant apela a algo que, según él, cualquiera reconoce: cuando hablamos de una ley moral, pensamos que obliga de manera absoluta, sin excepciones según el lugar, la época o el gusto de cada uno.",
        "Usa como ejemplo el mandato de no mentir. Ese mandato no valdría solo para los seres humanos, como si otro ser racional pudiera ignorarlo; valdría para todo ser racional. Por eso, el fundamento de la obligación no puede buscarse en la naturaleza humana ni en las circunstancias del mundo, sino a priori, en la razón.",
        "De aquí sale una distinción importante. Un consejo basado en la experiencia (por ejemplo, \"si quieres que confíen en ti, no mientas\") puede ser útil y valer casi siempre: Kant lo llamaría una regla práctica. Pero una ley moral es otra cosa: obliga con necesidad, y su fundamento no depende de lo que la experiencia nos enseñe sobre lo que conviene."
      ],
      conceptos: [
        { termino: "Necesidad absoluta", definicion: "Obligar sin excepciones; no depende de casos, gustos ni circunstancias." },
        { termino: "Ser racional", definicion: "Todo ser capaz de razonar, no solo el ser humano." },
        { termino: "Regla práctica", definicion: "Indicación útil basada (aunque sea en parte) en la experiencia." },
        { termino: "Ley moral", definicion: "Mandato con necesidad absoluta, fundado a priori en la razón." }
      ],
      fragmento: {
        texto: "Todo el mundo ha de confesar que una ley, para valer moralmente, esto es, como fundamento de una obligación, tiene que llevar consigo una necesidad absoluta; que el mandato siguiente: no debes mentir, no tiene su validez limitada a los hombres, como si otros seres racionales pudieran desentenderse de él, y asimismo las demás leyes propiamente morales; que, por lo tanto, el fundamento de la obligación no debe buscarse en la naturaleza del hombre o en las circunstancias del universo en que el hombre está puesto, sino a priori exclusivamente en conceptos de la razón pura, y que cualquier otro precepto que se funde en principios de la mera experiencia, incluso un precepto que, siendo universal en cierto respecto, se asiente en fundamentos empíricos, aunque no fuese más que en una mínima parte, acaso tan sólo por un motivo de determinación, podrá llamarse una regla práctica, pero nunca una ley moral.",
        edicion: "Trad. de Manuel García Morente (Madrid, Calpe, 1921; dominio público)",
        pagina: "Ak. IV 389"
      },
      trabajoFragmento: "Identifiquen en el fragmento el ejemplo que usa Kant y la expresión que muestra que la ley vale para todo ser racional, no solo para los humanos.",
      pregunta: {
        enunciado: "\"Si no mientes, la gente confiará en ti y te irá mejor\". Para Kant, esta frase es…",
        opciones: [
          { texto: "Una regla práctica: se apoya en lo que la experiencia muestra que conviene.", correcta: true, retro: "Bien: la frase depende de consecuencias conocidas por experiencia; no tiene la necesidad absoluta de una ley moral." },
          { texto: "Una ley moral, porque prohíbe mentir.", correcta: false, retro: "El contenido coincide, pero el fundamento es la conveniencia. Para Kant, lo decisivo de una ley moral es su fundamento racional a priori." },
          { texto: "Un ejemplo de lógica, porque es un razonamiento.", correcta: false, retro: "La lógica estudia solo la forma del pensar. Esta frase trata de cómo actuar." }
        ]
      }
    },
    {
      id: "r3",
      zona: "z1",
      titulo: "Conforme a la ley o por la ley: el propósito de la obra",
      ubicacion: { seccion: "Prefacio", akSugerida: "Ak. IV 390–392" },
      contexto: "Si una acción ya coincide con lo que la moral manda, ¿para qué hace falta una filosofía moral pura? Kant responde y anuncia qué busca exactamente en este libro.",
      explicacion: [
        "Kant da una razón práctica, además de una teórica: sin un principio claro y puro, nuestras costumbres quedan expuestas a corromperse, porque mezclamos el deber con el interés y terminamos justificando cualquier cosa.",
        "Y agrega una idea que será clave en todo el libro: para que una acción sea moralmente buena no basta que coincida por fuera con lo que la ley moral pide; tiene que hacerse por la ley moral. Si solo coincide, esa coincidencia es frágil: un motivo no moral a veces produce acciones correctas, pero muchas otras veces produce acciones incorrectas.",
        "Por eso Kant delimita su tarea: esta obra no es todavía una moral completa. Su objetivo es buscar y establecer el principio supremo de la moralidad. Para lograrlo, avanzará desde el conocimiento moral común (lo que cualquier persona sensata ya piensa sobre el bien) hasta su formulación filosófica."
      ],
      conceptos: [
        { termino: "Conforme a la ley", definicion: "Que coincide por fuera con lo que la ley manda." },
        { termino: "Por la ley", definicion: "Que se realiza porque la ley lo manda: el motivo es la ley misma." },
        { termino: "Principio supremo de la moralidad", definicion: "El criterio último del que depende juzgar qué es moral; es lo que busca esta obra." },
        { termino: "Conocimiento moral común", definicion: "Lo que cualquier persona razonable ya sabe sobre el bien, aunque no lo formule filosóficamente." }
      ],
      fragmento: {
        texto: "Porque lo que debe ser moralmente bueno no basta que sea conforme a la ley moral, sino que tiene que suceder por la ley moral; de lo contrario, esa conformidad será muy contingente e incierta, porque el fundamento inmoral producirá a veces acciones conformes a la ley, aun cuando más a menudo las produzca contrarias. [...]\n\nSin embargo, la presente fundamentación no es más que la investigación y asiento del principio supremo de la moralidad, que constituye un asunto aislado, completo en su propósito, y que ha de separarse de cualquier otra investigación moral.",
        edicion: "Trad. de Manuel García Morente (Madrid, Calpe, 1921; dominio público)",
        pagina: "Ak. IV 390 y 392"
      },
      trabajoFragmento: "Ubiquen en el fragmento las dos expresiones que Kant contrapone (coincidir con la ley / actuar por la ley) y la frase que indica qué busca la obra.",
      pregunta: {
        enunciado: "¿Por qué, según Kant, una simple coincidencia con la ley moral es \"frágil\"?",
        opciones: [
          { texto: "Porque si el motivo no es moral, unas veces llevará a actuar bien y otras a actuar mal.", correcta: true, retro: "Así es: un motivo como el interés acierta solo cuando le conviene." },
          { texto: "Porque las leyes morales cambian con el tiempo.", correcta: false, retro: "Kant sostiene lo contrario: la ley moral obliga con necesidad, no cambia según la época." },
          { texto: "Porque nadie puede saber nunca lo que manda la ley moral.", correcta: false, retro: "Kant parte de que el conocimiento moral común ya reconoce el deber; el problema no es ignorarlo, sino el motivo." }
        ]
      }
    },

    /* ================= ZONA 2 ================= */
    {
      id: "r4",
      zona: "z2",
      titulo: "Lo único bueno sin restricción",
      ubicacion: { seccion: "Primera sección", akSugerida: "Ak. IV 393" },
      contexto: "La primera sección comienza con una pregunta muy amplia: ¿hay algo que sea bueno en cualquier circunstancia, sin condiciones?",
      explicacion: [
        "Kant responde que solo hay una cosa así: la buena voluntad. Todo lo demás que valoramos es bueno solo bajo condiciones.",
        "Revisa tres grupos. Los talentos del espíritu (inteligencia, ingenio, capacidad de juzgar) y las cualidades del temperamento (valentía, decisión, perseverancia) son deseables, pero pueden volverse muy dañinos si los usa una voluntad que no es buena: un estafador inteligente y perseverante es más peligroso, no mejor. Lo mismo ocurre con los dones de la fortuna (poder, riqueza, honores, salud, bienestar): sin buena voluntad que los oriente, pueden producir soberbia.",
        "Kant agrega que un espectador imparcial y razonable no podría alegrarse de ver que le va siempre bien a alguien que no muestra ningún rasgo de buena voluntad. Por eso la buena voluntad parece ser la condición que nos hace dignos de ser felices."
      ],
      conceptos: [
        { termino: "Buena voluntad", definicion: "Lo único bueno sin restricción, según Kant." },
        { termino: "Bueno con restricción (condicionado)", definicion: "Bueno solo si se usa bien; puede volverse dañino." },
        { termino: "Talentos del espíritu", definicion: "Capacidades intelectuales: inteligencia, ingenio, juicio." },
        { termino: "Cualidades del temperamento", definicion: "Rasgos de carácter: valentía, decisión, perseverancia." },
        { termino: "Dones de la fortuna", definicion: "Bienes que dependen en parte de la suerte: poder, riqueza, honor, salud, bienestar." }
      ],
      fragmento: {
        texto: "Ni en el mundo, ni, en general, tampoco fuera del mundo, es posible pensar nada que pueda considerarse como bueno sin restricción, a no ser tan sólo una buena voluntad. El entendimiento, el gracejo, el Juicio, o como quieran llamarse los talentos del espíritu; el valor, la decisión, la perseverancia en los propósitos, como cualidades del temperamento, son, sin duda, en muchos respectos, buenos y deseables; pero también pueden llegar a ser extraordinariamente malos y dañinos si la voluntad que ha de hacer uso de estos dones de la naturaleza, y cuya peculiar constitución se llama por eso carácter, no es buena. Lo mismo sucede con los dones de la fortuna.",
        edicion: "Trad. de Manuel García Morente (Madrid, Calpe, 1921; dominio público)",
        pagina: "Ak. IV 393"
      },
      trabajoFragmento: "Hagan una lista con los talentos, cualidades y dones que aparecen en el fragmento. ¿Qué condición pone Kant para que sean buenos?",
      pregunta: {
        enunciado: "Una persona muy valiente usa su valentía para intimidar a otros. ¿Qué mostraría este caso según Kant?",
        opciones: [
          { texto: "Que la valentía es buena solo con restricción: depende de la voluntad que la usa.", correcta: true, retro: "Correcto: la valentía es una cualidad del temperamento; sin buena voluntad puede volverse dañina." },
          { texto: "Que la valentía es mala en sí misma.", correcta: false, retro: "Kant reconoce que estas cualidades son buenas y deseables en muchos aspectos; el problema es que no lo son sin restricción." },
          { texto: "Que la valentía es lo único bueno sin restricción.", correcta: false, retro: "Precisamente el ejemplo muestra que puede usarse mal; según Kant, solo la buena voluntad es buena sin restricción." }
        ]
      }
    },
    {
      id: "r5",
      zona: "z2",
      titulo: "La joya que brilla por sí misma",
      ubicacion: { seccion: "Primera sección", akSugerida: "Ak. IV 394" },
      contexto: "Si la buena voluntad es lo único bueno sin restricción, ¿de dónde saca su valor? ¿De lo que logra?",
      explicacion: [
        "Kant sostiene que la buena voluntad no es buena por lo que consigue ni por servir para alcanzar un fin. Es buena por el querer mismo, es decir, en sí misma.",
        "Imagina, dice Kant en sustancia, que por mala suerte esa voluntad no lograra realizar nada de lo que se propone. Aun así seguiría teniendo todo su valor, como una joya que brilla con luz propia. Que sea útil o inútil no le agrega ni le quita valor.",
        "Ojo con una confusión frecuente: buena voluntad no es \"tener buenas intenciones\" en el sentido de desear vagamente que las cosas salgan bien. Kant aclara que se trata de poner en juego todos los medios que están a nuestro alcance. Si alguien pudiendo ayudar no hace nada, no hay buena voluntad, aunque lo desee."
      ],
      conceptos: [
        { termino: "Bueno en sí mismo", definicion: "Valioso por lo que es, no por lo que produce." },
        { termino: "Querer", definicion: "La decisión de la voluntad, no un simple deseo." },
        { termino: "Utilidad", definicion: "Capacidad de producir resultados; no aumenta ni disminuye el valor de la buena voluntad." },
        { termino: "Imagen de la joya", definicion: "La buena voluntad brilla por sí misma, aunque no logre su propósito." }
      ],
      fragmento: {
        texto: "La buena voluntad no es buena por lo que efectúe o realice, no es buena por su adecuación para alcanzar algún fin que nos hayamos propuesto; es buena sólo por el querer, es decir, es buena en sí misma. [...]\n\nAun cuando, por particulares enconos del azar o por la mezquindad de una naturaleza madrastra, le faltase por completo a esa voluntad la facultad de sacar adelante su propósito; si, a pesar de sus mayores esfuerzos, no pudiera llevar a cabo nada y sólo quedase la buena voluntad —no desde luego como un mero deseo, sino como el acopio de todos los medios que están en nuestro poder—, sería esa buena voluntad como una joya brillante por sí misma [...]\n\nLa utilidad o la esterilidad no pueden ni añadir ni quitar nada a ese valor.",
        edicion: "Trad. de Manuel García Morente (Madrid, Calpe, 1921; dominio público)",
        pagina: "Ak. IV 394"
      },
      trabajoFragmento: "Busquen en el fragmento la imagen de la joya y la aclaración de que la buena voluntad no es un mero deseo. ¿Qué agrega cada una?",
      pregunta: {
        enunciado: "Una estudiante hace todo lo posible por rescatar a un perro atrapado, pero no lo logra. Según Kant, su buena voluntad…",
        opciones: [
          { texto: "Conserva todo su valor, porque no depende del resultado.", correcta: true, retro: "Exacto: como la joya, brilla por sí misma. Lo decisivo es que puso todos los medios a su alcance." },
          { texto: "Pierde su valor, porque no consiguió el objetivo.", correcta: false, retro: "Esa es justamente la idea que Kant rechaza: el valor de la buena voluntad no depende de lo que consigue." },
          { texto: "Vale la mitad, porque lo intentó, pero falló.", correcta: false, retro: "Para Kant no hay \"descuento\" por el resultado: la utilidad o inutilidad no agrega ni quita valor." }
        ]
      }
    },
    {
      id: "r6",
      zona: "z2",
      titulo: "El deber y el mercader",
      ubicacion: { seccion: "Primera sección", akSugerida: "Ak. IV 397" },
      contexto: "Para aclarar qué es una buena voluntad, Kant examina el concepto de deber, que la contiene, y propone distinguir tipos de acciones.",
      explicacion: [
        "Kant distingue tres casos. Hay acciones contrarias al deber (por ejemplo, engañar): ahí ni siquiera cabe preguntar si se hicieron por deber. Hay acciones conformes al deber, es decir, que coinciden por fuera con lo que el deber pide, pero que se hacen por otro motivo, como el interés o una inclinación. Y hay acciones hechas por deber, cuyo motivo es el deber mismo.",
        "El caso difícil es el segundo, porque por fuera se ve igual que el tercero. Kant lo muestra con un comerciante que no cobra de más a un cliente sin experiencia y mantiene un precio fijo para todos, de modo que incluso un niño compraría con seguridad en su tienda. El cliente es tratado con honradez. Pero eso no basta para afirmar que el comerciante actúa por deber: puede hacerlo porque le conviene mantener su clientela.",
        "En ese caso, la acción es conforme al deber, pero su motivo es el propio provecho, no el deber ni un afecto especial por los clientes."
      ],
      conceptos: [
        { termino: "Contraria al deber", definicion: "Se opone a lo que el deber manda." },
        { termino: "Conforme al deber", definicion: "Coincide por fuera con el deber, pero el motivo es otro (interés o inclinación)." },
        { termino: "Por deber", definicion: "Se realiza porque es el deber: el motivo es el deber mismo." },
        { termino: "Inclinación", definicion: "Tendencia o deseo sensible: gusto, afecto, interés, miedo." },
        { termino: "Motivo", definicion: "Lo que mueve a la voluntad a actuar; no se ve desde fuera." }
      ],
      fragmento: {
        texto: "Prescindo aquí de todas aquellas acciones conocidas ya como contrarias al deber, aunque en este o aquel sentido puedan ser útiles; en efecto, en ellas ni siquiera se plantea la cuestión de si pueden suceder por deber, puesto que ocurren en contra de éste. [...]\n\nPor ejemplo: es, desde luego, conforme al deber que el mercader no cobre más caro a un comprador inexperto; y en los sitios donde hay mucho comercio, el comerciante avisado y prudente no lo hace, en efecto, sino que mantiene un precio fijo para todos en general, de suerte que un niño puede comprar en su casa tan bien como otro cualquiera. Así, pues, uno es servido honradamente. Mas esto no es ni mucho menos suficiente para creer que el mercader haya obrado así por deber, por principios de honradez: su provecho lo exigía; mas no es posible admitir además que el comerciante tenga una inclinación inmediata hacia los compradores, de suerte que por amor a ellos, por decirlo así, no haga diferencias a ninguno en el precio. Así, pues, la acción no ha sucedido ni por deber ni por inclinación inmediata, sino simplemente con una intención egoísta.",
        edicion: "Trad. de Manuel García Morente (Madrid, Calpe, 1921; dominio público)",
        pagina: "Ak. IV 397"
      },
      trabajoFragmento: "En el fragmento, ¿qué hace el comerciante y cuál es su verdadero motivo? Subrayen la frase que lo revela.",
      pregunta: {
        enunciado: "Dos cajeros devuelven exactamente el vuelto correcto. ¿Qué no podemos saber solo mirándolos?",
        opciones: [
          { texto: "Si lo hacen por deber o por otro motivo, como el temor a ser descubiertos.", correcta: true, retro: "Bien: la conducta externa es igual; la diferencia moral está en el motivo, que no se ve." },
          { texto: "Si su acción es conforme al deber.", correcta: false, retro: "Eso sí lo vemos: devolver el vuelto correcto coincide con el deber. Lo que no vemos es el motivo." },
          { texto: "Si su acción es contraria al deber.", correcta: false, retro: "Devolver el vuelto correcto no es contrario al deber." }
        ]
      }
    },
    {
      id: "r7",
      zona: "z2",
      titulo: "El filántropo: sentir o deber",
      ubicacion: { seccion: "Primera sección", akSugerida: "Ak. IV 398–399" },
      contexto: "¿Qué pasa cuando alguien hace el bien porque le gusta hacerlo? Kant examina el caso más delicado: el de una persona compasiva.",
      explicacion: [
        "Ayudar a otros cuando se puede es un deber. Y hay personas tan compasivas que disfrutan alegrando a los demás, sin vanidad ni interés. Kant sostiene que esas acciones, por correctas y amables que sean, no tienen todavía un auténtico valor moral, porque su motivo es una inclinación (el gusto de ayudar).",
        "Esto no significa que Kant las desprecie. Dice que esa clase de acciones merecen alabanza y estímulo; lo que no tienen es el valor moral propio, porque su máxima no tiene contenido moral: no se hacen por deber.",
        "Luego imagina que a esa misma persona la invade un dolor propio que apaga su compasión. Ya no siente nada por los demás, pero aun así ayuda, solo porque es su deber. Entonces, dice Kant, su acción tiene verdadero valor moral. El ejemplo sirve para aislar el motivo: cuando no hay inclinación, se ve con claridad que actúa por deber. No dice que haya que dejar de sentir compasión."
      ],
      conceptos: [
        { termino: "Filántropo", definicion: "Persona que ayuda a los demás." },
        { termino: "Inclinación inmediata", definicion: "Deseo o gusto directo por hacer algo (ayudar porque le agrada)." },
        { termino: "Alabanza y estímulo", definicion: "Lo que merecen las acciones correctas hechas por inclinación." },
        { termino: "Valor moral", definicion: "El que tiene una acción cuando se hace por deber." },
        { termino: "Máxima con contenido moral", definicion: "Principio de acción cuyo motivo es el deber." }
      ],
      fragmento: {
        texto: "Ser benéfico en cuanto se puede es un deber; pero, además, hay muchas almas tan llenas de conmiseración, que encuentran un placer íntimo en distribuir la alegría en torno suyo, sin que a ello les impulse ningún movimiento de vanidad o de provecho propio, y que pueden regocijarse del contento de los demás, en cuanto que es su obra. Pero yo sostengo que, en tal caso, semejantes actos, por muy conformes que sean al deber, por muy dignos de amor que sean, no tienen, sin embargo, un valor moral verdadero y corren parejas con otras inclinaciones; por ejemplo, con el afán de honras, el cual, cuando, por fortuna, se refiere a cosas que son en realidad de general provecho, conformes al deber y, por tanto, honrosas, merece alabanzas y estímulos, pero no estimación; pues le falta a la máxima contenido moral, esto es, que las tales acciones sean hechas, no por inclinación, sino por deber.\n\nPero supongamos que el ánimo de ese filántropo está envuelto en las nubes de un propio dolor, que apaga en él toda conmiseración por la suerte del prójimo; supongamos, además, que le queda todavía con qué hacer el bien a otros miserables, aunque la miseria ajena no lo conmueve, porque le basta la suya para ocuparle; si entonces, cuando ninguna inclinación le empuja a ello, sabe desasirse de esa mortal insensibilidad y realiza la acción benéfica sin inclinación alguna, sólo por deber, entonces, y sólo entonces, posee esta acción su verdadero valor moral.",
        edicion: "Trad. de Manuel García Morente (Madrid, Calpe, 1921; dominio público)",
        pagina: "Ak. IV 398"
      },
      trabajoFragmento: "Comparen en el fragmento al filántropo compasivo con el filántropo que sufre. ¿Qué cambia entre ambos y qué permanece igual?",
      pregunta: {
        enunciado: "¿Qué opina Kant de quien ayuda porque disfruta ayudando?",
        opciones: [
          { texto: "Que su acción merece alabanza y estímulo, aunque su valor moral no se funde en esa inclinación.", correcta: true, retro: "Exacto: no es reprochable; simplemente su motivo es una inclinación y no el deber." },
          { texto: "Que actúa mal, porque disfrutar ayudar es egoísta.", correcta: false, retro: "Es una confusión frecuente. Kant no dice que actúe mal ni que sea reprochable." },
          { texto: "Que su acción vale más que la de quien ayuda por deber.", correcta: false, retro: "Kant sostiene lo contrario: el valor moral está en actuar por deber." }
        ]
      }
    },

    /* ================= ZONA 3 ================= */
    {
      id: "r8",
      zona: "z3",
      titulo: "Segunda proposición: el valor está en la máxima",
      ubicacion: { seccion: "Primera sección", akSugerida: "Ak. IV 399–400" },
      contexto: "Después de los ejemplos, Kant resume sus conclusiones en proposiciones. (La primera, implícita, es que solo las acciones hechas por deber tienen valor moral.) ¿Dónde está, entonces, ese valor?",
      explicacion: [
        "Kant responde: una acción hecha por deber no tiene su valor moral en el propósito que con ella se quiere alcanzar, sino en la máxima según la cual se decide. Una máxima es el principio personal con que alguien decide actuar, algo como \"cuando me pase X, haré Y por tal motivo\".",
        "Por eso el valor moral no depende de que el objetivo se realice, sino del principio del querer. Si lo valioso fueran los resultados, cualquier causa que los produjera tendría el mismo mérito, incluso la suerte.",
        "Kant describe a la voluntad como situada en una encrucijada: por un lado, un principio formal (a priori); por otro, un móvil material (lo que deseamos obtener). Si la acción se hace por deber, la voluntad se guía por el principio formal y no por el objeto deseado."
      ],
      conceptos: [
        { termino: "Máxima", definicion: "Principio subjetivo (personal) del querer: la regla con que alguien decide." },
        { termino: "Propósito", definicion: "El objetivo o resultado que se busca con la acción." },
        { termino: "Principio formal", definicion: "Principio a priori, que no depende de un objeto deseado." },
        { termino: "Móvil material", definicion: "El objeto o resultado deseado que podría impulsar la acción." }
      ],
      fragmento: {
        texto: "La segunda proposición es ésta: una acción hecha por deber tiene su valor moral, no en el propósito que por medio de ella se quiere alcanzar, sino en la máxima por la cual ha sido resuelta; no depende, pues, de la realidad del objeto de la acción, sino meramente del principio del querer, según el cual ha sucedido la acción, prescindiendo de todos los objetos de la facultad del desear.",
        edicion: "Trad. de Manuel García Morente (Madrid, Calpe, 1921; dominio público)",
        pagina: "Ak. IV 399–400"
      },
      trabajoFragmento: "Busquen en el fragmento dónde dice Kant que está el valor moral y dónde dice que NO está.",
      pregunta: {
        enunciado: "¿Cuál de estas frases es una máxima?",
        opciones: [
          { texto: "\"Cuando alguien me preste algo, lo devolveré a tiempo porque es mi deber.\"", correcta: true, retro: "Sí: expresa el principio personal con que decido actuar, incluido el motivo." },
          { texto: "\"Ojalá todo el mundo fuera honesto.\"", correcta: false, retro: "Es un deseo, no un principio de acción propio." },
          { texto: "\"El 80 % de las personas devuelve lo que pide prestado.\"", correcta: false, retro: "Es un dato empírico, no una regla con la que yo decido actuar." }
        ]
      }
    },
    {
      id: "r9",
      zona: "z3",
      titulo: "Tercera proposición: respeto por la ley",
      ubicacion: { seccion: "Primera sección", akSugerida: "Ak. IV 400–401" },
      contexto: "Kant une las dos ideas anteriores en una definición del deber y distingue lo que es personal (la máxima) de lo que vale para todos (la ley práctica).",
      explicacion: [
        "La tercera proposición define el deber como la necesidad de una acción por respeto a la ley. Podemos sentir inclinación por un objeto, pero no respeto: el respeto solo puede dirigirse a una ley, a algo que se impone a nuestras inclinaciones en vez de servirlas.",
        "Por eso, una acción hecha por deber deja fuera el influjo de la inclinación. Lo que queda para determinar la voluntad es, objetivamente, la ley y, subjetivamente, el respeto por esa ley; de ahí surge la máxima de obedecerla incluso cuando contraría lo que deseamos.",
        "En una nota, Kant precisa dos conceptos: la máxima es el principio subjetivo del querer (el que yo adopto), mientras que la ley práctica es el principio objetivo, el que valdría para todo ser racional si la razón dominara por completo sobre el deseo. Concluye que el bien moral no está en el efecto esperado, sino en que la representación de la ley determine la voluntad."
      ],
      conceptos: [
        { termino: "Deber", definicion: "Necesidad de una acción por respeto a la ley." },
        { termino: "Respeto", definicion: "Reconocimiento de una ley que se impone a mis inclinaciones; no se dirige a objetos." },
        { termino: "Máxima", definicion: "Principio subjetivo del querer." },
        { termino: "Ley práctica", definicion: "Principio objetivo, válido para todo ser racional." }
      ],
      fragmento: {
        texto: "La tercera proposición, consecuencia de las dos anteriores, la formularía yo de esta manera: el deber es la necesidad de una acción por respeto a la ley. Por el objeto, como efecto de la acción que me propongo realizar, puedo, sí, tener inclinación, mas nunca respeto, justamente porque es un efecto y no una actividad de una voluntad. [...]\n\nUna acción realizada por deber tiene, empero, que excluir por completo el influjo de la inclinación, y con ésta todo objeto de la voluntad; no queda, pues, otra cosa que pueda determinar la voluntad, si no es, objetivamente, la ley y, subjetivamente, el respeto puro a esa ley práctica, y, por tanto, la máxima de obedecer siempre a esa ley, aun con perjuicio de todas mis inclinaciones.\n\n[Nota de Kant:] Máxima es el principio subjetivo del querer; el principio objetivo —esto es, el que serviría de principio práctico, aun subjetivamente, a todos los seres racionales, si la razón tuviera pleno dominio sobre la facultad de desear— es la ley práctica.",
        edicion: "Trad. de Manuel García Morente (Madrid, Calpe, 1921; dominio público)",
        pagina: "Ak. IV 400–401"
      },
      trabajoFragmento: "Encuentren en el fragmento la definición del deber y, si su edición incluye la nota, la distinción entre máxima y ley práctica.",
      pregunta: {
        enunciado: "Según la explicación, ¿hacia qué puede dirigirse el respeto en sentido kantiano?",
        opciones: [
          { texto: "Hacia una ley que se impone a mis inclinaciones.", correcta: true, retro: "Correcto: el respeto tiene por objeto la ley, no las cosas que deseamos." },
          { texto: "Hacia cualquier objeto que me guste mucho.", correcta: false, retro: "Por un objeto podemos sentir inclinación, pero no respeto en este sentido." },
          { texto: "Hacia los resultados exitosos de una acción.", correcta: false, retro: "Kant aclara que el bien moral no está en el efecto esperado." }
        ]
      }
    },
    {
      id: "r10",
      zona: "z3",
      titulo: "La promesa falsa: ¿prudente o conforme al deber?",
      ubicacion: { seccion: "Primera sección", akSugerida: "Ak. IV 402–403" },
      contexto: "Kant pone a prueba sus ideas con una pregunta concreta: estando en apuros, ¿puedo hacer una promesa sabiendo que no la cumpliré?",
      explicacion: [
        "Kant muestra que la pregunta puede entenderse de dos maneras: ¿es prudente hacer una promesa falsa? o ¿es conforme al deber? Son preguntas diferentes.",
        "Si pregunto por la prudencia, calculo consecuencias: tal vez la mentira me saque del apuro, pero después pierdo la confianza de los demás y quedo peor. Entonces podría decidir no prometer en falso... por miedo a las consecuencias. Esa decisión sigue fundada en el interés.",
        "Ser veraz por deber es muy distinto de serlo por temor a lo que pueda pasar. En el primer caso, el concepto mismo de la acción contiene una ley para mí; en el segundo, tengo que mirar a mi alrededor para calcular los efectos. Apartarse del deber es siempre malo; apartarse de una regla de prudencia a veces incluso puede convenir. Kant anticipa aquí una prueba para examinar máximas, que desarrollará más adelante: preguntarse si la propia máxima podría valer para todos. Aplicada a la promesa falsa, la máxima se destruiría a sí misma, porque nadie volvería a creer en promesas."
      ],
      conceptos: [
        { termino: "Prudencia", definicion: "Cálculo de lo que conviene según las consecuencias." },
        { termino: "Conforme al deber", definicion: "Lo que coincide con lo que la ley moral manda." },
        { termino: "Veracidad por deber", definicion: "Decir la verdad porque es el deber, no por miedo a las consecuencias." },
        { termino: "Promesa falsa", definicion: "Promesa hecha con la intención de no cumplirla." }
      ],
      fragmento: {
        texto: "Sea, por ejemplo, la pregunta siguiente: ¿me es lícito, cuando me hallo apurado, hacer una promesa con el propósito de no cumplirla? Fácilmente hago aquí la diferencia que puede comportar la significación de la pregunta: de si es prudente o de si es conforme al deber hacer una falsa promesa. [...]\n\nAhora bien; es cosa muy distinta ser veraz por deber [...] por temor a las consecuencias perjudiciales; porque, en el primer caso, el concepto de la acción en sí mismo contiene ya una ley para mí, y en el segundo, tengo que empezar por observar alrededor cuáles efectos para mí puedan derivarse de la acción. Si me aparto del principio del deber, de seguro es ello malo; pero si soy infiel a mi máxima de la sagacidad, puede ello a veces serme provechoso, aun cuando desde luego es más seguro permanecer adicto a ella.",
        edicion: "Trad. de Manuel García Morente (Madrid, Calpe, 1921; dominio público)",
        pagina: "Ak. IV 402–403"
      },
      trabajoFragmento: "Identifiquen en el fragmento las dos maneras de entender la pregunta sobre la promesa. ¿Qué palabra usa su edición para cada una?",
      pregunta: {
        enunciado: "\"No voy a mentirle a mi profesor, porque si me pilla me va peor\". Este razonamiento es…",
        opciones: [
          { texto: "De prudencia: se basa en el temor a las consecuencias.", correcta: true, retro: "Exacto: la acción podría ser conforme al deber, pero el motivo es el cálculo de consecuencias." },
          { texto: "Por deber, porque al final no miente.", correcta: false, retro: "El resultado coincide con el deber, pero el motivo es evitar un castigo." },
          { texto: "Contrario al deber, porque piensa en sí mismo.", correcta: false, retro: "No es contrario al deber: no miente. Simplemente su motivo no es el deber." }
        ]
      }
    }
  ],

  /* ------------------------------------------------------------------
     DESAFÍOS
     zona: z1..z4 · lectura: lectura previa obligatoria (o null si es
     de zona y se habilita al terminar todas las lecturas de la zona)
     ------------------------------------------------------------------ */
  desafios: [
    /* ======================= ZONA 1 ======================= */
    {
      id: "c1", zona: "z1", lectura: "r1", tipo: "mcq", valor: 10, letra: "P",
      titulo: "La idea principal del mapa",
      enunciado: "¿Cuál es la idea principal de la Lectura 1?",
      opciones: [
        { texto: "La ética tiene una parte empírica y una parte pura; esta última, la metafísica de las costumbres, es la moral propiamente tal.", correcta: true },
        { texto: "La ética debe estudiarse observando cómo se comportan las personas en distintas culturas.", correcta: false, retro: "Eso corresponde a la parte empírica (antropología práctica). Kant quiere separar de ella la parte pura." },
        { texto: "La metafísica de las costumbres estudia fenómenos misteriosos que la ciencia no explica.", correcta: false, retro: "\"Metafísica\" aquí significa conocimiento a priori, que proviene de la razón; no tiene que ver con lo misterioso." },
        { texto: "La ética es una parte de la lógica, porque ambas estudian el pensamiento.", correcta: false, retro: "La lógica es formal (sin objeto); la ética es material: tiene por objeto las leyes de la libertad." }
      ],
      explicacion: "La lectura construye un mapa: la ética, como la física, tiene una parte empírica y una parte pura. La parte pura de la ética es la metafísica de las costumbres.",
      pista: "Piensen en las dos distinciones: formal/material y empírico/puro. ¿Qué resulta al cruzarlas en la ética?"
    },
    {
      id: "c2", zona: "z1", lectura: "r1", tipo: "match", valor: 15, letra: "U",
      titulo: "Relacionar conceptos del mapa",
      enunciado: "Asocien cada concepto con su descripción.",
      pares: [
        { izq: "Lógica", der: "Estudia solo la forma del pensar" },
        { izq: "Física", der: "Estudia las leyes de la naturaleza" },
        { izq: "Ética", der: "Estudia las leyes de la libertad" },
        { izq: "Antropología práctica", der: "Parte empírica de la ética" },
        { izq: "Metafísica de las costumbres", der: "Parte pura de la ética" }
      ],
      retroError: "Revisen qué disciplina no tiene objeto propio (solo forma) y cuáles se dividen en parte empírica y parte pura.",
      explicacion: "La lógica es formal; la física y la ética son materiales. En la ética, la parte empírica es la antropología práctica y la parte pura es la metafísica de las costumbres.",
      pista: "La única disciplina sin objeto propio es la lógica. \"Empírico\" se relaciona con observar a los seres humanos."
    },
    {
      id: "c3", zona: "z1", lectura: "r2", tipo: "tf", valor: 10, letra: "R",
      titulo: "¿Solo para humanos?",
      afirmacion: "Según Kant, el mandato de no mentir obliga solo a los seres humanos, porque se funda en la naturaleza humana.",
      respuesta: false,
      justificaciones: [
        { texto: "Es falso: vale para todo ser racional, porque su fundamento se busca a priori en la razón y no en la naturaleza humana.", correcta: true },
        { texto: "Es falso: no obliga a nadie, porque cada persona decide su propia moral.", correcta: false, retro: "Kant parte de lo contrario: una ley moral obliga con necesidad absoluta." },
        { texto: "Es verdadero: la moral se descubre observando cómo viven los humanos.", correcta: false, retro: "Observar cómo viven los humanos es tarea de la antropología práctica, no el fundamento de la ley moral." }
      ],
      retroValor: "Recuerden el alcance que Kant da al mandato de no mentir: ¿solo humanos o todo ser racional?",
      explicacion: "Kant sostiene que una ley moral vale para todo ser racional y que su fundamento se encuentra a priori en conceptos de la razón pura.",
      pista: "En la lectura 2 aparece la expresión \"todo ser racional\"."
    },
    {
      id: "c4", zona: "z1", lectura: "r2", tipo: "mcq", valor: 10, letra: "E",
      titulo: "Regla práctica o ley moral",
      enunciado: "¿Qué diferencia mejor una regla práctica de una ley moral?",
      opciones: [
        { texto: "La regla práctica se apoya, aunque sea en parte, en la experiencia; la ley moral se funda a priori en la razón y obliga con necesidad absoluta.", correcta: true },
        { texto: "La regla práctica es más general y la ley moral se aplica solo a casos particulares.", correcta: false, retro: "Una regla basada en la experiencia puede ser muy general, pero eso no la convierte en ley moral. Lo decisivo es el fundamento." },
        { texto: "La ley moral es la que está escrita en la Constitución; la regla práctica es un consejo.", correcta: false, retro: "Kant no habla de leyes jurídicas: la ley moral es un mandato de la razón." },
        { texto: "No hay diferencia: si un consejo funciona bien, ya es ley moral.", correcta: false, retro: "Funcionar bien es un criterio de utilidad, basado en la experiencia: eso define a una regla práctica." }
      ],
      explicacion: "Para Kant, basta que un precepto se apoye en fundamentos empíricos, aunque sea mínimamente, para que sea solo una regla práctica y no una ley moral.",
      pista: "Pregúntense de dónde viene el fundamento: ¿de la experiencia o de la razón?"
    },
    {
      id: "c5", zona: "z1", lectura: "r3", tipo: "tf", valor: 10, letra: "Z",
      titulo: "¿Basta con coincidir?",
      afirmacion: "Para Kant, basta con que una acción coincida con lo que manda la ley moral para que sea moralmente buena.",
      respuesta: false,
      justificaciones: [
        { texto: "Es falso: además de ser conforme a la ley, la acción debe hacerse por la ley moral.", correcta: true },
        { texto: "Es falso: lo que importa es que la acción tenga buenos resultados.", correcta: false, retro: "Kant no pone el valor moral en los resultados. La diferencia está entre coincidir con la ley y actuar por la ley." },
        { texto: "Es verdadero: si por fuera la acción es correcta, ya es moral.", correcta: false, retro: "Kant advierte que la mera coincidencia es frágil: un motivo no moral a veces acierta y a veces no." }
      ],
      retroValor: "Recuerden la contraposición de la lectura 3: conforme a la ley / por la ley.",
      explicacion: "En lo moralmente bueno no basta la conformidad con la ley: la acción tiene que suceder por la ley. Si no, la coincidencia es contingente.",
      pista: "Kant usa dos preposiciones distintas: \"conforme a\" y \"por\"."
    },
    {
      id: "c6", zona: "z1", lectura: "r3", tipo: "mcq", valor: 10, letra: "A",
      titulo: "El propósito de la obra",
      enunciado: "¿Qué se propone Kant en la Fundamentación, según el Prefacio?",
      opciones: [
        { texto: "Buscar y establecer el principio supremo de la moralidad.", correcta: true },
        { texto: "Escribir un manual con todas las normas morales para cada situación.", correcta: false, retro: "Kant aclara que la obra no es una moral completa: busca solo su principio supremo." },
        { texto: "Demostrar que la moral depende de la cultura de cada pueblo.", correcta: false, retro: "Eso contradice la idea de una ley moral válida para todo ser racional." },
        { texto: "Describir cómo la gente suele comportarse en la práctica.", correcta: false, retro: "Eso sería antropología práctica, la parte empírica que Kant deja aparte." }
      ],
      explicacion: "Kant delimita su tarea: no es todavía una moral completa, sino la búsqueda y el establecimiento del principio supremo de la moralidad.",
      pista: "La respuesta tiene la palabra \"supremo\"."
    },
    {
      id: "c7", zona: "z1", lectura: null, tipo: "lock", valor: 10,
      titulo: "La cerradura de letras",
      enunciado: "Cada desafío de esta zona les entregó una letra. Ordénenlas para formar la palabra que describe cómo debe ser, según el Prefacio, la filosofía moral: sin mezcla de nada empírico.",
      clave: "PUREZA",
      explicacion: "La clave es PUREZA: Kant busca una filosofía moral pura, depurada de todo lo empírico, porque solo así una ley puede obligar con necesidad absoluta.",
      retroError: "Esa palabra no abre la cerradura. Revisen las letras: es un sustantivo relacionado con la idea de una moral \"pura\".",
      pista: "Es el sustantivo que corresponde al adjetivo \"pura\"."
    },

    /* ======================= ZONA 2 ======================= */
    {
      id: "c8", zona: "z2", lectura: "r4", tipo: "mcq", valor: 10,
      titulo: "Bueno sin restricción",
      enunciado: "¿Qué es lo único que Kant considera bueno sin restricción?",
      opciones: [
        { texto: "La buena voluntad.", correcta: true },
        { texto: "La felicidad.", correcta: false, retro: "La felicidad está entre los dones de la fortuna: sin buena voluntad puede producir arrogancia." },
        { texto: "La inteligencia.", correcta: false, retro: "La inteligencia es un talento del espíritu: puede volverse dañina si la usa una mala voluntad." },
        { texto: "La valentía.", correcta: false, retro: "La valentía es una cualidad del temperamento: es buena solo con restricción." }
      ],
      explicacion: "Según Kant, ni en el mundo ni fuera de él puede pensarse algo bueno sin restricción, salvo la buena voluntad.",
      pista: "Todo lo demás, dice Kant, puede usarse mal."
    },
    {
      id: "c9", zona: "z2", lectura: "r4", tipo: "classify", valor: 15,
      titulo: "Bienes con condiciones",
      enunciado: "Clasifiquen cada bien en el grupo al que pertenece según la Lectura 4. Todos son buenos solo con restricción.",
      categorias: ["Talento del espíritu", "Cualidad del temperamento", "Don de la fortuna"],
      items: [
        { texto: "Inteligencia", categoria: 0 },
        { texto: "Ingenio", categoria: 0 },
        { texto: "Perseverancia", categoria: 1 },
        { texto: "Valentía", categoria: 1 },
        { texto: "Riqueza", categoria: 2 },
        { texto: "Salud", categoria: 2 },
        { texto: "Poder", categoria: 2 }
      ],
      retroError: "Distingan: capacidades intelectuales (espíritu), rasgos de carácter (temperamento) y bienes que dependen en parte de la suerte (fortuna).",
      explicacion: "Talentos: capacidades intelectuales. Temperamento: rasgos de carácter. Fortuna: bienes que en parte dependen de la suerte. Ninguno es bueno sin una buena voluntad que lo oriente.",
      pista: "Pregúntense: ¿esto es una capacidad de la mente, un rasgo de carácter o algo que también depende de la suerte?"
    },
    {
      id: "c10", zona: "z2", lectura: "r5", tipo: "mcq", valor: 10,
      titulo: "La joya",
      enunciado: "¿Qué quiere mostrar Kant con la imagen de la joya que brilla por sí misma?",
      opciones: [
        { texto: "Que la buena voluntad tiene valor en sí misma, aunque no logre su propósito.", correcta: true },
        { texto: "Que la buena voluntad es valiosa porque es escasa, como una joya.", correcta: false, retro: "La imagen no habla de escasez, sino de un valor propio que no depende de lo que se consigue." },
        { texto: "Que la buena voluntad vale por lo que se puede comprar o lograr con ella.", correcta: false, retro: "Es justo al revés: su valor no depende de lo que produce." },
        { texto: "Que basta con desear el bien, sin hacer nada.", correcta: false, retro: "Kant aclara que la buena voluntad no es un mero deseo: implica poner todos los medios a nuestro alcance." }
      ],
      explicacion: "La buena voluntad es buena por el querer, no por sus resultados. La utilidad o la inutilidad no le agregan ni le quitan valor.",
      pista: "¿Una joya necesita iluminar otra cosa para brillar?"
    },
    {
      id: "c11", zona: "z2", lectura: "r5", tipo: "tf", valor: 10,
      titulo: "¿Basta con desear?",
      afirmacion: "Para Kant, tener buena voluntad es lo mismo que desear que las cosas salgan bien.",
      respuesta: false,
      justificaciones: [
        { texto: "Es falso: la buena voluntad implica el esfuerzo de emplear todos los medios a nuestro alcance.", correcta: true },
        { texto: "Es falso: la buena voluntad solo existe si se logra el resultado.", correcta: false, retro: "Kant dice que la buena voluntad conserva su valor aunque no logre nada. Lo que no puede faltar es el esfuerzo." },
        { texto: "Es verdadero: lo que cuenta es la intención, aunque no se haga nada.", correcta: false, retro: "Una intención sin esfuerzo es un mero deseo; Kant lo distingue de la buena voluntad." }
      ],
      retroValor: "Recuerden la aclaración final de la Lectura 5 sobre los medios a nuestro alcance.",
      explicacion: "La buena voluntad no es un mero deseo: es poner en juego todos los medios que están en nuestro poder. Su valor no depende del éxito, pero sí exige el esfuerzo.",
      pista: "Distingan entre \"no lograrlo\" y \"no intentarlo\"."
    },
    {
      id: "c12", zona: "z2", lectura: "r6", tipo: "classify", valor: 15,
      titulo: "Misma conducta, motivos distintos",
      enunciado: "Clasifiquen cada caso. Atención: varios tienen la misma conducta externa, pero motivos diferentes.",
      categorias: ["Contraria al deber", "Conforme al deber, pero no por deber", "Por deber"],
      items: [
        { texto: "Tomás se queda con el vuelto de más que le dio por error el cajero del kiosco.", categoria: 0, retro: "Quedarse con lo ajeno se opone al deber." },
        { texto: "Valentina devuelve el vuelto de más porque vio que había una cámara grabando.", categoria: 1, retro: "La conducta coincide con el deber, pero el motivo es el temor a ser descubierta." },
        { texto: "Matías devuelve el vuelto de más, aunque nadie lo vio, porque reconoce que ese dinero no es suyo y debe devolverlo.", categoria: 2, retro: "El motivo es el deber mismo, no el miedo ni la conveniencia." },
        { texto: "Una almacenera cobra precios justos a todos solo para que no se le vayan los clientes.", categoria: 1, retro: "Es el caso del comerciante de Kant: actúa con honradez por su propio provecho." },
        { texto: "Un vendedor de la feria le cobra el doble a un turista que no conoce los precios.", categoria: 0, retro: "Aprovecharse de la inexperiencia del cliente es contrario al deber." },
        { texto: "Una vendedora cobra precios justos, incluso cuando podría engañar sin que se notara, porque es lo que debe hacer.", categoria: 2, retro: "La misma conducta que la almacenera, pero por deber." }
      ],
      retroError: "Pregúntense primero si la conducta coincide con el deber. Si coincide, busquen el motivo: ¿interés o temor, o el deber mismo?",
      explicacion: "Por fuera, devolver el vuelto o cobrar precios justos se ve igual. La diferencia moral está en el motivo: el temor o el provecho hacen la acción solo conforme al deber; el deber mismo la hace por deber.",
      pista: "Las palabras \"porque\", \"solo para\" y \"aunque nadie lo vio\" revelan el motivo."
    },
    {
      id: "c13", zona: "z2", lectura: "r6", tipo: "mcq", valor: 10,
      titulo: "El comerciante honrado",
      enunciado: "El comerciante del ejemplo de Kant trata a todos con honradez. ¿Por qué Kant no le atribuye a su acción valor moral?",
      opciones: [
        { texto: "Porque su motivo es su propio provecho, aunque la acción sea conforme al deber.", correcta: true },
        { texto: "Porque cobrar un precio fijo es contrario al deber.", correcta: false, retro: "Cobrar un precio fijo y justo es conforme al deber: por fuera la acción es correcta." },
        { texto: "Porque siente un gran cariño por sus clientes.", correcta: false, retro: "Kant aclara que el comerciante tampoco actúa por una inclinación inmediata hacia los clientes; actúa por interés." },
        { texto: "Porque sus resultados son malos para el negocio.", correcta: false, retro: "Al contrario: le conviene. Y, en todo caso, para Kant el valor moral no depende de los resultados." }
      ],
      explicacion: "La acción es conforme al deber: el cliente es servido con honradez. Pero el motivo es el provecho, de modo que no es una acción por deber.",
      pista: "¿Qué ganaría el comerciante si engañara a un cliente y se supiera?"
    },
    {
      id: "c14", zona: "z2", lectura: "r7", tipo: "mcq", valor: 10,
      titulo: "El filántropo compasivo",
      enunciado: "¿Cuál es la posición de Kant sobre quien ayuda a los demás porque disfruta haciéndolo?",
      opciones: [
        { texto: "Su acción es conforme al deber y merece alabanza y estímulo, pero su valor moral no se funda en esa inclinación.", correcta: true },
        { texto: "Su acción es reprochable, porque disfrutar ayudando es egoísmo.", correcta: false, retro: "Kant no la reprocha. Dice que merece alabanza y estímulo; solo que su motivo es una inclinación." },
        { texto: "Su acción tiene el máximo valor moral, porque nace de un buen sentimiento.", correcta: false, retro: "Para Kant el valor moral está en actuar por deber, no en el sentimiento que impulsa la acción." },
        { texto: "Debería dejar de sentir compasión para que su acción valga moralmente.", correcta: false, retro: "Kant no pide eliminar los sentimientos. El ejemplo del filántropo que sufre sirve para aislar el motivo." }
      ],
      explicacion: "Kant distingue: la acción compasiva es correcta y digna de alabanza, pero su valor moral propio aparece cuando se realiza por deber.",
      pista: "Kant usa dos palabras positivas para estas acciones: alabanza y…"
    },
    {
      id: "c15", zona: "z2", lectura: "r7", tipo: "match", valor: 15,
      titulo: "Identificar motivaciones",
      enunciado: "Asocien cada acción con el motivo que la mueve.",
      pares: [
        { izq: "Javiera ayuda a su vecino porque le encanta compartir con él.", der: "Inclinación inmediata (gusto o afecto)" },
        { izq: "Diego ayuda a un profesor para que le suba la nota.", der: "Interés propio" },
        { izq: "Fernanda, triste y sin ganas, ayuda igual a su compañera porque reconoce que es su deber.", der: "Deber" },
        { izq: "Benjamín ayuda en la campaña solidaria para salir en las redes del colegio.", der: "Deseo de reconocimiento (vanidad)" }
      ],
      retroError: "Busquen la palabra que revela el motivo de cada acción: \"le encanta\", \"para que…\", \"porque es su deber\", \"para salir…\".",
      explicacion: "Las cuatro acciones son conformes al deber de ayudar, pero solo la de Fernanda, que actúa sin inclinación y porque es su deber, corresponde al caso que Kant usa para mostrar el valor moral.",
      pista: "El caso de Fernanda se parece al del filántropo que sufre."
    },
    {
      id: "c16", zona: "z2", lectura: null, tipo: "mcq", valor: 10,
      titulo: "Utilidad frente a valor moral",
      enunciado: "Dos personas donan sangre. La donación de Ana salva una vida; la de Pedro no se usa porque se contaminó. Ambos donaron por deber. ¿Qué diría Kant?",
      opciones: [
        { texto: "Ambas acciones tienen el mismo valor moral, porque este no depende de la utilidad del resultado.", correcta: true },
        { texto: "La de Ana tiene más valor moral, porque salvó una vida.", correcta: false, retro: "Confunde utilidad con valor moral. Para Kant la utilidad no agrega ni quita valor a la buena voluntad." },
        { texto: "La de Pedro no tiene valor moral, porque fue inútil.", correcta: false, retro: "Recuerden la joya: la buena voluntad brilla aunque no logre su propósito." },
        { texto: "Ninguna tiene valor moral, porque ambos esperaban un resultado.", correcta: false, retro: "Que una acción tenga un propósito no le quita valor moral; lo decisivo es si se hizo por deber." }
      ],
      explicacion: "El resultado de la acción de Ana es más útil, pero el valor moral, para Kant, está en el querer: ambas donaciones se hicieron por deber.",
      pista: "Vuelvan a la imagen de la joya (Lectura 5)."
    },
    {
      id: "c17", zona: "z2", lectura: null, tipo: "order", valor: 15,
      titulo: "Ordenar el argumento",
      enunciado: "Ordenen los pasos del argumento de Kant en la primera parte de la Primera sección (de arriba hacia abajo).",
      pasos: [
        "Solo la buena voluntad es buena sin restricción.",
        "La buena voluntad es buena por el querer, no por sus resultados.",
        "Para aclararla, Kant examina el concepto de deber, que la contiene.",
        "Distingue acciones contrarias al deber, conformes al deber y hechas por deber.",
        "Con ejemplos (el comerciante, el filántropo) muestra que solo las acciones hechas por deber tienen valor moral."
      ],
      retroError: "Kant va de lo más general (qué es bueno) a lo más preciso (qué acciones tienen valor moral).",
      explicacion: "El argumento parte de la buena voluntad, aclara de dónde le viene su valor, introduce el deber para precisarla y, con distinciones y ejemplos, concluye que el valor moral está en actuar por deber.",
      pista: "El primer paso es la tesis de la Lectura 4; el último usa los ejemplos de las Lecturas 6 y 7."
    },
    {
      id: "c18", zona: "z2", lectura: null, tipo: "open", valor: 20,
      titulo: "Respuesta breve: conforme al deber y por deber",
      enunciado: "Inventen un ejemplo propio (distinto de los de la actividad) en que dos personas hagan exactamente lo mismo, pero una actúe solo conforme al deber y la otra por deber. Expliquen en 4 a 6 líneas en qué se diferencian, según Kant.",
      explicacion: "Una buena respuesta muestra una conducta externa idéntica, identifica el motivo de cada persona (interés, temor o inclinación frente al deber) y explica que el valor moral está en el motivo, no en lo que se ve."
    },

    /* ======================= ZONA 3 ======================= */
    {
      id: "c19", zona: "z3", lectura: "r8", tipo: "mcq", valor: 10,
      titulo: "La segunda proposición",
      enunciado: "Según la segunda proposición, ¿dónde está el valor moral de una acción hecha por deber?",
      opciones: [
        { texto: "En la máxima según la cual se decide la acción.", correcta: true },
        { texto: "En el propósito que se quiere alcanzar.", correcta: false, retro: "Kant lo niega expresamente: el valor no está en el propósito." },
        { texto: "En que el objetivo efectivamente se realice.", correcta: false, retro: "El valor moral no depende de la realidad del objeto de la acción." },
        { texto: "En la cantidad de personas beneficiadas.", correcta: false, retro: "Eso mide consecuencias; Kant pone el valor en el principio del querer." }
      ],
      explicacion: "La segunda proposición ubica el valor moral en la máxima, es decir, en el principio del querer, y no en el propósito ni en el resultado.",
      pista: "Busquen la palabra técnica de la Lectura 8."
    },
    {
      id: "c20", zona: "z3", lectura: "r8", tipo: "fill", valor: 15,
      titulo: "Completar la proposición",
      enunciado: "Completen la reconstrucción (en palabras de la actividad, no es cita).",
      texto: "Una acción hecha por deber no tiene su valor moral en el {0} que se quiere alcanzar, sino en la {1} según la cual se decide. Por eso no depende de la realidad del objeto, sino del principio del {2}.",
      huecos: [
        { opciones: ["propósito", "respeto", "deber"], correcta: 0 },
        { opciones: ["consecuencia", "máxima", "inclinación"], correcta: 1 },
        { opciones: ["querer", "resultado", "placer"], correcta: 0 }
      ],
      retroError: "Recuerden: el valor no está en lo que se busca obtener, sino en el principio con que se decide.",
      explicacion: "Propósito / máxima / querer: el valor moral está en el principio del querer y no en el objeto deseado.",
      pista: "El primer espacio es lo que Kant descarta; el segundo es la palabra técnica de la Lectura 8."
    },
    {
      id: "c21", zona: "z3", lectura: "r9", tipo: "mcq", valor: 10,
      titulo: "Definición del deber",
      enunciado: "¿Cómo define Kant el deber en la tercera proposición?",
      opciones: [
        { texto: "Como la necesidad de una acción por respeto a la ley.", correcta: true },
        { texto: "Como lo que la mayoría considera correcto.", correcta: false, retro: "Eso sería un criterio empírico; el deber se vincula con la ley que da la razón." },
        { texto: "Como la acción que produce más felicidad.", correcta: false, retro: "La definición no menciona la felicidad ni los resultados." },
        { texto: "Como el sentimiento de compasión hacia los demás.", correcta: false, retro: "La compasión es una inclinación. El deber se define por el respeto a la ley." }
      ],
      explicacion: "La tercera proposición, que surge de las dos anteriores, define el deber como la necesidad de una acción por respeto a la ley.",
      pista: "La definición tiene tres conceptos: necesidad, respeto y…"
    },
    {
      id: "c22", zona: "z3", lectura: "r9", tipo: "match", valor: 15,
      titulo: "Máxima y ley práctica",
      enunciado: "Asocien cada concepto con su definición.",
      pares: [
        { izq: "Máxima", der: "Principio subjetivo del querer" },
        { izq: "Ley práctica", der: "Principio objetivo, válido para todo ser racional" },
        { izq: "Respeto", der: "Reconocimiento de una ley que se impone a las inclinaciones" },
        { izq: "Inclinación", der: "Deseo sensible dirigido a un objeto" }
      ],
      retroError: "Distingan lo subjetivo (lo que yo adopto) de lo objetivo (lo que vale para todos), y el respeto (hacia la ley) de la inclinación (hacia objetos).",
      explicacion: "La máxima es el principio que el sujeto adopta; la ley práctica es el principio que valdría para todo ser racional. El respeto se dirige a la ley; la inclinación, a objetos.",
      pista: "\"Subjetivo\" se refiere a lo personal; \"objetivo\", a lo que vale para todos."
    },
    {
      id: "c23", zona: "z3", lectura: "r10", tipo: "mcq", valor: 10,
      titulo: "La promesa falsa",
      enunciado: "Kant distingue dos maneras de preguntar si es lícito hacer una promesa falsa. ¿Cuáles?",
      opciones: [
        { texto: "Si es prudente (conviene según las consecuencias) o si es conforme al deber.", correcta: true },
        { texto: "Si es legal o si es ilegal según las leyes del país.", correcta: false, retro: "Kant no plantea una pregunta jurídica, sino moral." },
        { texto: "Si me hará feliz o si hará felices a los demás.", correcta: false, retro: "Ambas opciones miran consecuencias; Kant contrapone el cálculo de consecuencias con el deber." },
        { texto: "Si la promesa es grande o pequeña.", correcta: false, retro: "El tamaño de la promesa no es lo que Kant distingue." }
      ],
      explicacion: "Kant separa la pregunta por la prudencia, que calcula consecuencias, de la pregunta por el deber. Ser veraz por temor a las consecuencias no es lo mismo que serlo por deber.",
      pista: "Una de las preguntas mira hacia los efectos; la otra, hacia la ley."
    },
    {
      id: "c24", zona: "z3", lectura: null, tipo: "mcq", valor: 10,
      titulo: "Dilema: el objeto perdido",
      enunciado: "Catalina encuentra un celular en el patio. Nadie la vio. ¿Cuál de estas máximas está bien formulada y expresa una acción por deber?",
      opciones: [
        { texto: "\"Cuando encuentre algo que no es mío, lo devolveré a su dueño porque es mi deber, aunque nadie me vea.\"", correcta: true },
        { texto: "\"Cuando encuentre algo que no es mío, lo devolveré si hay una recompensa.\"", correcta: false, retro: "Está bien formulada como máxima, pero su motivo es el interés: sería solo conforme al deber." },
        { texto: "\"Ojalá que el dueño aparezca pronto.\"", correcta: false, retro: "Es un deseo, no una máxima: no dice qué haré ni por qué." },
        { texto: "\"Devolver celulares es lo que hace la mayoría.\"", correcta: false, retro: "Es una observación empírica, no un principio de acción." }
      ],
      explicacion: "Una máxima indica en qué situación, qué haré y por qué motivo. Solo la primera hace del deber el motivo, incluso cuando nadie observa.",
      pista: "Una máxima tiene forma de regla personal: \"Cuando…, haré… porque…\"."
    },
    {
      id: "c25", zona: "z3", lectura: null, tipo: "mcq", valor: 10,
      titulo: "Dilema: la promesa inconveniente",
      enunciado: "Ignacio prometió ayudar a su prima a estudiar el sábado, pero lo invitaron a un paseo. Decide cumplir: \"Si la dejo plantada, se va a enojar y no me va a prestar su consola\". ¿Cómo lo analizaría Kant?",
      opciones: [
        { texto: "Su acción es conforme al deber, pero por prudencia: lo mueve el temor a las consecuencias.", correcta: true },
        { texto: "Su acción es por deber, porque cumple la promesa.", correcta: false, retro: "Cumplir coincide con el deber, pero el motivo que declara es evitar perder la consola." },
        { texto: "Su acción es contraria al deber, porque piensa en la consola.", correcta: false, retro: "Cumplir una promesa no es contrario al deber; lo que falta es que el motivo sea el deber." },
        { texto: "Su acción no puede evaluarse, porque los motivos no importan.", correcta: false, retro: "Para Kant los motivos son precisamente lo decisivo del valor moral." }
      ],
      explicacion: "Es el mismo análisis que en la promesa falsa: decidir según lo que conviene es prudencia, aunque la acción coincida con el deber.",
      pista: "Comparen con la diferencia entre prudente y conforme al deber de la Lectura 10."
    },
    {
      id: "c26", zona: "z3", lectura: null, tipo: "tf", valor: 10,
      titulo: "Dilema: decir la verdad",
      afirmacion: "Si Camila dice la verdad sobre quién rompió el vidrio solo porque cree que igual la van a descubrir, su acción tiene pleno valor moral según Kant.",
      respuesta: false,
      justificaciones: [
        { texto: "Es falso: su acción es conforme al deber, pero la motiva el temor a las consecuencias, no el deber.", correcta: true },
        { texto: "Es falso: decir la verdad es contrario al deber cuando perjudica a alguien.", correcta: false, retro: "Decir la verdad coincide con el deber. El problema está en el motivo." },
        { texto: "Es verdadero: lo importante es que dijo la verdad.", correcta: false, retro: "Kant distingue ser veraz por deber de serlo por temor a las consecuencias." }
      ],
      retroValor: "Fíjense en el motivo que se menciona: \"solo porque cree que igual la van a descubrir\".",
      explicacion: "Ser veraz por temor a las consecuencias no es lo mismo que serlo por deber: la acción es correcta por fuera, pero su motivo es prudencial.",
      pista: "La palabra \"solo\" indica el único motivo."
    },
    {
      id: "c27", zona: "z3", lectura: null, tipo: "mcq", valor: 10,
      titulo: "Dilema: ayudar por interés o por deber",
      enunciado: "Sebastián ayuda a un compañero nuevo a integrarse. ¿En cuál de estas versiones actúa por deber?",
      opciones: [
        { texto: "No le cae especialmente bien, pero lo ayuda porque reconoce que debe hacerlo.", correcta: true },
        { texto: "Lo ayuda porque así el profesor jefe lo elige delegado.", correcta: false, retro: "Su motivo es el interés: la acción es solo conforme al deber." },
        { texto: "Lo ayuda porque le cae muy bien y le gusta su compañía.", correcta: false, retro: "Es una inclinación, digna de alabanza, pero no es el caso que Kant usa para mostrar el valor moral." },
        { texto: "Lo ayuda porque todos sus amigos lo hacen.", correcta: false, retro: "Seguir al grupo es una inclinación o conveniencia, no el deber como motivo." }
      ],
      explicacion: "Como en el caso del filántropo que sufre, cuando no hay inclinación ni interés y aun así se ayuda porque es el deber, el motivo moral se ve con claridad.",
      pista: "Busquen la versión parecida al filántropo que sufre."
    },
    {
      id: "c28", zona: "z3", lectura: null, tipo: "fill", valor: 15,
      titulo: "Dilema: actuar sin que nadie mire",
      enunciado: "En una prueba en línea, Antonia podría copiar sin que nadie se entere. Completen el argumento.",
      texto: "Si Antonia no copia solo por miedo a que la descubran, su acción sería {0}. Si no copia aunque nadie la vigile, porque reconoce que es su deber, su acción sería {1}. Para Kant, la diferencia no se ve desde fuera, porque está en el {2}.",
      huecos: [
        { opciones: ["conforme al deber, pero no por deber", "contraria al deber", "por deber"], correcta: 0 },
        { opciones: ["por deber", "conforme al deber, pero no por deber", "contraria al deber"], correcta: 0 },
        { opciones: ["motivo", "resultado", "público"], correcta: 0 }
      ],
      retroError: "Si nadie la mira, el miedo a ser descubierta deja de funcionar. ¿Qué motivo queda?",
      explicacion: "La conducta externa es la misma (no copiar). Con miedo es solo conforme al deber; sin vigilancia y por deber, tiene valor moral. La diferencia está en el motivo.",
      pista: "El último espacio es lo que no se ve desde afuera."
    },
    {
      id: "c29", zona: "z3", lectura: null, tipo: "open", valor: 20,
      titulo: "Justificación breve",
      enunciado: "Elijan uno de los dilemas de esta zona. Escriban la máxima con la que actuarían y justifiquen en 4 a 6 líneas, usando los conceptos de máxima, deber y prudencia, por qué su acción tendría (o no) valor moral según Kant.",
      explicacion: "Una buena respuesta formula una máxima completa (situación, acción, motivo), distingue entre actuar por deber y actuar por prudencia, y se apoya en la segunda y la tercera proposición o en el ejemplo de la promesa."
    },

    /* ======================= ZONA 4 ======================= */
    {
      id: "c30", zona: "z4", lectura: null, tipo: "mcq", valor: 10,
      titulo: "Pregunta integradora",
      enunciado: "¿Qué afirmación resume mejor el recorrido del Prefacio y la Primera sección?",
      opciones: [
        { texto: "La moral necesita un fundamento puro; lo único bueno sin restricción es la buena voluntad, y el valor moral está en actuar por deber según una máxima, no en los resultados.", correcta: true },
        { texto: "La moral se aprende observando a las personas buenas; quien obtiene mejores resultados tiene más mérito moral.", correcta: false, retro: "Mezcla dos confusiones: fundamento empírico y valor según resultados." },
        { texto: "Lo moral es actuar con buenos sentimientos; quien siente compasión siempre actúa con valor moral.", correcta: false, retro: "Kant valora los sentimientos, pero no funda en ellos el valor moral." },
        { texto: "Cada persona decide qué es moral según sus inclinaciones, siempre que no dañe a otros.", correcta: false, retro: "Contradice la idea de una ley con necesidad absoluta para todo ser racional." }
      ],
      explicacion: "El recorrido va del fundamento puro (Prefacio) a la buena voluntad, el deber y las proposiciones (Primera sección).",
      pista: "Busquen la opción que menciona fundamento puro, buena voluntad y deber."
    },
    {
      id: "c31", zona: "z4", lectura: null, tipo: "classify", valor: 15,
      titulo: "Distinguir conceptos",
      enunciado: "¿Cada afirmación describe correctamente el pensamiento de Kant o es una confusión?",
      categorias: ["Kant lo afirma", "Es una confusión"],
      items: [
        { texto: "La buena voluntad conserva su valor aunque no logre su propósito.", categoria: 0 },
        { texto: "Una acción conforme al deber tiene siempre valor moral.", categoria: 1, retro: "Puede ser solo conforme al deber, por interés o inclinación." },
        { texto: "Las acciones hechas por inclinación son reprochables.", categoria: 1, retro: "Kant dice que pueden merecer alabanza y estímulo." },
        { texto: "La máxima es el principio subjetivo del querer.", categoria: 0 },
        { texto: "La buena voluntad es un simple deseo de que las cosas salgan bien.", categoria: 1, retro: "Exige emplear todos los medios a nuestro alcance." },
        { texto: "El deber es la necesidad de una acción por respeto a la ley.", categoria: 0 },
        { texto: "El valor moral depende de las consecuencias de la acción.", categoria: 1, retro: "Está en la máxima, no en el propósito ni en el resultado." }
      ],
      retroError: "Revisen especialmente las afirmaciones sobre sentimientos, resultados y simple deseo: son las confusiones más comunes.",
      explicacion: "Kant afirma que la buena voluntad vale en sí misma, define la máxima y el deber. Son confusiones: identificar conformidad con valor moral, reprochar las inclinaciones, reducir la buena voluntad a un deseo y medir el valor moral por las consecuencias.",
      pista: "Tres afirmaciones son correctas y cuatro son confusiones."
    },
    {
      id: "c32", zona: "z4", lectura: null, tipo: "order", valor: 15,
      titulo: "Reconstruir el argumento completo",
      enunciado: "Ordenen el recorrido completo de la obra estudiada, de arriba hacia abajo.",
      pasos: [
        "La ley moral debe fundarse a priori en la razón, no en la experiencia.",
        "Lo único bueno sin restricción es la buena voluntad.",
        "Solo las acciones hechas por deber, y no las meramente conformes al deber, tienen valor moral.",
        "Segunda proposición: el valor moral está en la máxima, no en el propósito.",
        "Tercera proposición: el deber es la necesidad de una acción por respeto a la ley."
      ],
      retroError: "El Prefacio va primero. En la Primera sección, la tercera proposición es consecuencia de las anteriores.",
      explicacion: "Prefacio (fundamento a priori) → buena voluntad → deber y valor moral → segunda proposición → tercera proposición, que se deriva de las dos anteriores.",
      pista: "La definición del deber cierra el recorrido."
    },
    {
      id: "c33", zona: "z4", lectura: null, tipo: "tf", valor: 10,
      titulo: "Sentimientos y moral",
      afirmacion: "Según Kant, si una persona ayuda sintiendo alegría, su acción pierde todo valor y es reprochable.",
      respuesta: false,
      justificaciones: [
        { texto: "Es falso: la acción hecha por inclinación merece alabanza y estímulo; lo que Kant sostiene es que su valor moral no se funda en la inclinación.", correcta: true },
        { texto: "Es falso: para Kant los sentimientos son el fundamento del valor moral.", correcta: false, retro: "Kant no funda el valor moral en los sentimientos, aunque no los condene." },
        { texto: "Es verdadero: Kant exige actuar sin sentir nada.", correcta: false, retro: "El filántropo que sufre sirve para aislar el motivo, no para exigir insensibilidad." }
      ],
      retroValor: "¿Kant reprocha al filántropo compasivo?",
      explicacion: "Sentir alegría al ayudar no es reprochable. Lo que Kant precisa es dónde está el valor moral: en actuar por deber.",
      pista: "Recuerden \"alabanza y estímulo\" (Lectura 7)."
    },
    {
      id: "c34", zona: "z4", lectura: null, tipo: "open", valor: 20,
      titulo: "Dilema final y fundamentación escrita",
      enunciado: "Un amigo les ofrece las respuestas de una prueba que encontró en el pasillo. Si las usan, subirían su promedio; nadie lo sabría. Decidan qué harían y fundamenten por escrito (6 a 8 líneas): formulen su máxima, expliquen si su acción sería contraria al deber, conforme al deber o por deber, y relacionen su respuesta con al menos dos ideas de Kant (buena voluntad, deber, máxima, respeto por la ley, prudencia).",
      explicacion: "Una buena respuesta formula una máxima clara, clasifica la acción con precisión, explica el motivo, distingue prudencia de deber (por ejemplo, no hacerlo solo por miedo frente a no hacerlo por deber) y usa al menos dos conceptos con precisión."
    }
  ],

  /* ------------------------------------------------------------------
     COMPROBACIÓN INDIVIDUAL
     Integrante 1 responde las preguntas con integrante: 0;
     integrante 2, las de integrante: 1. Un solo intento, sin pistas.
     Se informa por separado y no entra en el porcentaje de la pareja.
     ------------------------------------------------------------------ */
  individual: [
    {
      id: "i1", integrante: 0,
      enunciado: "Para Kant, la inteligencia es…",
      opciones: [
        { texto: "Buena con restricción: depende de la voluntad que la usa.", correcta: true },
        { texto: "Buena sin restricción.", correcta: false },
        { texto: "Mala en sí misma.", correcta: false }
      ],
      explicacion: "La inteligencia es un talento del espíritu: deseable, pero puede ser dañina sin buena voluntad."
    },
    {
      id: "i2", integrante: 0,
      enunciado: "Un comerciante es honrado solo porque así conserva a sus clientes. Su acción es…",
      opciones: [
        { texto: "Conforme al deber, pero no por deber.", correcta: true },
        { texto: "Por deber.", correcta: false },
        { texto: "Contraria al deber.", correcta: false }
      ],
      explicacion: "Coincide por fuera con el deber, pero su motivo es el provecho."
    },
    {
      id: "i3", integrante: 0,
      enunciado: "La máxima es…",
      opciones: [
        { texto: "El principio subjetivo del querer.", correcta: true },
        { texto: "El principio objetivo, válido para todo ser racional.", correcta: false },
        { texto: "El resultado que se espera de la acción.", correcta: false }
      ],
      explicacion: "La máxima es subjetiva; la ley práctica es el principio objetivo."
    },
    {
      id: "i4", integrante: 1,
      enunciado: "¿Por qué Kant busca una filosofía moral pura?",
      opciones: [
        { texto: "Porque una ley moral debe obligar con necesidad absoluta, y eso no puede fundarse en la experiencia.", correcta: true },
        { texto: "Porque la experiencia muestra que la mayoría actúa bien.", correcta: false },
        { texto: "Porque la moral es una parte de la lógica.", correcta: false }
      ],
      explicacion: "Lo que se funda en la experiencia es, a lo sumo, una regla práctica; la ley moral requiere un fundamento a priori."
    },
    {
      id: "i5", integrante: 1,
      enunciado: "Una persona hace todo lo que puede por ayudar, pero fracasa. Según Kant, su buena voluntad…",
      opciones: [
        { texto: "Conserva su valor, como una joya que brilla por sí misma.", correcta: true },
        { texto: "Pierde su valor por no lograr el resultado.", correcta: false },
        { texto: "Nunca existió, porque no hubo resultado.", correcta: false }
      ],
      explicacion: "El valor de la buena voluntad no depende de su éxito."
    },
    {
      id: "i6", integrante: 1,
      enunciado: "Decir la verdad solo por miedo a ser descubierto es…",
      opciones: [
        { texto: "Una decisión prudente, conforme al deber, pero no por deber.", correcta: true },
        { texto: "Una acción por deber.", correcta: false },
        { texto: "Una acción contraria al deber.", correcta: false }
      ],
      explicacion: "Ser veraz por temor a las consecuencias es distinto de serlo por deber."
    }
  ],

  /* ------------------------------------------------------------------
     INSIGNIAS (solo motivación)
     ------------------------------------------------------------------ */
  insignias: [
    { id: "lector", nombre: "Lector atento", descripcion: "Abrieron las diez lecturas." },
    { id: "clave", nombre: "Descifradores", descripcion: "Abrieron la cerradura de letras." },
    { id: "sinPistas", nombre: "Sin atajos", descripcion: "Completaron una zona sin usar pistas." },
    { id: "primerIntento", nombre: "Puntería filosófica", descripcion: "Acertaron 5 desafíos seguidos al primer intento." },
    { id: "tresSellos", nombre: "Portadores de los sellos", descripcion: "Reunieron los tres sellos." },
    { id: "juicio", nombre: "Juicio final", descripcion: "Completaron la Puerta del juicio final." }
  ]
};
