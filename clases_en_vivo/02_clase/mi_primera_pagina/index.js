let nombre = "Juan";
const PI = 3.1416;
var edad = 30;


let lenguajesDeProgramacion = [
    "python", "java", 17, 2e-10
]

const hijoDeJota = [
    {
        "nombre": "Python",
        "horarios": "Lunes y Miércoles de 18:00 a 20:00",
        "comentario": "Ideal para principiantes. Se usa en IA, desarrollo web y análisis de datos. Tiene una sintaxis clara y legible.",
        "precio": 250.50
    },
    {
        "nombre": "JavaScript",
        "horarios": "Martes y Jueves de 19:00 a 21:00",
        "comentario": "Esencial para el desarrollo web front-end y back-end. Se utiliza para crear interactividad en páginas web y en servidores (Node.js).",
        "precio": 300.00
    },
    {
        "nombre": "Java",
        "horarios": "Viernes de 17:00 a 20:00",
        "comentario": "Un lenguaje muy robusto y escalable. Se usa en aplicaciones de escritorio, móviles (Android) y sistemas empresariales de gran envergadura.",
        "precio": 420.75
    },
    {
        "nombre": "C#",
        "horarios": "Sábados de 10:00 a 13:00",
        "comentario": "Desarrollado por Microsoft. Se utiliza para crear aplicaciones de Windows, juegos con Unity y servicios en la nube con Azure.",
        "precio": 380.25
    },
    {
        "nombre": "Ruby",
        "horarios": "Lunes de 19:30 a 21:30",
        "comentario": "Conocido por su simplicidad y la agilidad que ofrece con el framework Ruby on Rails. Popular para el desarrollo rápido de aplicaciones web.",
        "precio": 280.90
    },
    {
        "nombre": "Swift",
        "horarios": "Martes y Jueves de 18:00 a 20:00",
        "comentario": "Creado por Apple para el desarrollo de aplicaciones en iOS, iPadOS y macOS. Moderno, seguro y de alto rendimiento.",
        "precio": 350.00
    },
    {
        "nombre": "PHP",
        "horarios": "Miércoles de 19:00 a 21:00",
        "comentario": "Ampliamente usado para el desarrollo web del lado del servidor. Soporta gran parte de la web, incluyendo WordPress y Facebook.",
        "precio": 200.00
    }
]


const renderTemplateText = function (objetoLenguaje, importancia = 0) {

    const IMPORTANTE = "importante-class";

    let templateText = `
    <div class="language-card" id="${importancia > 0 ? IMPORTANTE : null}">
        <p>${objetoLenguaje.nombre}</p>
        <i>${objetoLenguaje.horarios}</i>
        <hr>
        <p>${objetoLenguaje.comentario}</p>
        <strong>$ ${objetoLenguaje.precio}</strong>
    </div>
    `

    return templateText
}


const clearAppDiv = function () {
    console.warn("ojo que estoy limpiando");

    const appDiv = document.getElementById("app");
    if (appDiv) {
        appDiv.innerHTML = ''; // Elimina todo el contenido HTML dentro del div
    }
};

const renderizarApp = function (importancia = 0) {

    clearAppDiv()

    hijoDeJota.forEach(
        function (componente) {
            const card = document.createElement('div')
            card.innerHTML = renderTemplateText(componente, importancia)
            document.getElementById("app").appendChild(card)
        }
    )
}

for (lang of hijoDeJota) {
    // me va a dar un true
    if (!isNaN(lang.nombre)) {
        console.warn("el item a renderizar es un number! No lo tomo en cuenta")
        continue
    }

    console.log("mostrame que lenguajes estas pasando");
    console.log(lang.nombre);

    const componente = document.createElement('div')
    componente.innerHTML = renderTemplateText(lang, 0);
    //  lang.nombre === "python"? lang.nombre.toUpperCase() : lang.nombre ;
    document.getElementById("app").appendChild(componente)

    console.log("Voy a desmontar este componente html", lang.nombre);
}


const btn = document.createElement('button')
btn.innerText = "change me!"
btn.addEventListener("click", function () { renderizarApp(20) })


document.getElementById("root").appendChild(
    btn
)

