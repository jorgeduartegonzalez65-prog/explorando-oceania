/* ==========================
        NAVEGACIÓN
========================== */

function mostrarPantalla(id) {

    document.querySelectorAll(".pantalla").forEach(pantalla => {
        pantalla.classList.remove("activa");
    });

    document.getElementById(id).classList.add("activa");

    if (id === "juego") {
        reiniciarJuego();
    }
}


/* ==========================
         PREGUNTAS
========================== */

const preguntas = [

    {
        pregunta: "¿Cuál es el marsupial más grande del mundo?",
        opciones: ["Lori Arcoíris", "Canguro Rojo", "Babosa de Mar"],
        correcta: 1
    },

    {
        pregunta: "¿Qué animal de Oceanía es un mamífero que pone huevos?",
        opciones: ["Ornitorrinco", "Canguro Rojo", "Lori Arcoíris"],
        correcta: 0
    },

    {
        pregunta: "¿Qué animal ayuda a las plantas transportando el polen?",
        opciones: ["Canguro Rojo", "Cangrejo Cocotero", "Lori Arcoíris"],
        correcta: 2
    },

    {
        pregunta: "¿Cuál es el artrópodo terrestre más grande del mundo?",
        opciones: ["Babosa de Mar", "Cangrejo Cocotero", "Ornitorrinco"],
        correcta: 1
    },

    {
        pregunta: "¿En qué océano se encuentra Oceanía?",
        opciones: ["Atlántico", "Pacífico", "Índico"],
        correcta: 1
    },

    {
        pregunta: "¿Qué planta tiene una raíz rica en almidón?",
        opciones: ["Taro", "Coco", "Pandanus"],
        correcta: 0
    },

    {
        pregunta: "¿Qué fruto contiene agua y pulpa comestible?",
        opciones: ["Camote", "Árbol del Pan", "Coco"],
        correcta: 2
    },

    {
        pregunta: "¿Qué planta se utiliza para fabricar canastos y esteras?",
        opciones: ["Pandanus", "Taro", "Camote"],
        correcta: 0
    },

    {
        pregunta: "¿Dónde vive el ornitorrinco?",
        opciones: [
            "Bosques de America",
            "Desiertos de África",
            "Ríos y lagos de Australia"
        ],
        correcta: 2
    },

    {
        pregunta: "¿Por qué Oceanía es un continente especial?",
        opciones: [
            "Porque tiene muchas especies únicas",
            "Porque no posee vegetación",
            "Porque está cubierto de hielo"
        ],
        correcta: 0
    }

];


/* ==========================
         VARIABLES
========================== */

let indicePregunta = 0;


/* ==========================
      CARGAR PREGUNTA
========================== */

function cargarPregunta() {

    const pregunta = document.getElementById("pregunta");
    const opciones = document.getElementById("opciones");
    const mensaje = document.getElementById("mensaje");
    const contador = document.getElementById("contador");
    const barra = document.getElementById("progreso");

    const actual = preguntas[indicePregunta];

    pregunta.textContent = actual.pregunta;

    contador.textContent =
        `Pregunta ${indicePregunta + 1} de ${preguntas.length}`;

    let porcentaje =
        (indicePregunta / preguntas.length) * 100;

    barra.style.width = porcentaje + "%";

    opciones.innerHTML = "";
    mensaje.textContent = "";

    actual.opciones.forEach((opcion, indice) => {

        const boton = document.createElement("button");

        boton.textContent = opcion;
        boton.classList.add("opcion");

        boton.onclick = () => {
            verificarRespuesta(indice);
        };

        opciones.appendChild(boton);
    });
}


/* ==========================
     VERIFICAR RESPUESTA
========================== */

function verificarRespuesta(respuesta) {

    const mensaje = document.getElementById("mensaje");

    const actual = preguntas[indicePregunta];

    if (respuesta === actual.correcta) {

        mensaje.textContent = "✅ ¡Correcto!";

        setTimeout(() => {

            indicePregunta++;

            if (indicePregunta < preguntas.length) {

                cargarPregunta();

            } else {

                document.getElementById("progreso").style.width = "100%";

                mostrarPantalla("finalJuego");
            }

        }, 800);

    } else {

        mensaje.textContent =
            "❌ Incorrecto. Inténtalo nuevamente.";

    }
}


/* ==========================
       REINICIAR JUEGO
========================== */

function reiniciarJuego() {

    indicePregunta = 0;

    document.getElementById("progreso").style.width = "0%";

    cargarPregunta();
}
const iconos = [
    "🦘","🦘",
    "🦆","🦆",
    "🦜","🦜",
    "🌿","🌿",
    "🥥","🥥",
    "🌴","🌴"
];

let primeraCarta = null;
let segundaCarta = null;

function iniciarMemoria() {

    const tablero = document.getElementById("tablero");

    tablero.innerHTML = "";

    const cartas = [...iconos]
        .sort(() => Math.random() - 0.5);

    cartas.forEach(icono => {

        const carta = document.createElement("div");

        carta.classList.add("carta");
        carta.textContent = icono;

        carta.onclick = () => {

            if (
                carta.classList.contains("abierta") ||
                segundaCarta
            ) {
                return;
            }

            carta.classList.add("abierta");

            if (!primeraCarta) {
                primeraCarta = carta;
                return;
            }

            segundaCarta = carta;

            if (
                primeraCarta.textContent ===
                segundaCarta.textContent
            ) {

                primeraCarta = null;
                segundaCarta = null;

            } else {

                setTimeout(() => {

                    primeraCarta.classList.remove("abierta");
                    segundaCarta.classList.remove("abierta");

                    primeraCarta = null;
                    segundaCarta = null;

                }, 800);
            }
        };

        tablero.appendChild(carta);
    });
}