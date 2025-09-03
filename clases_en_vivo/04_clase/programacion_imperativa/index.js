console.log("hello world");

// DOM
const nodoH1 = document.createElement('h1')
nodoH1.textContent = "Soy una pagina web"

console.log(nodoH1);

// primera instancia seleccion de componente
document
    .getElementById("app")
    .appendChild(nodoH1)

// document.querySelector("#app") // . es para clase, # es para un id

document
    .querySelector("#app .nueva-lista.especifico .el-cambio")
    .textContent  = "He cambiado por un query selector especifico"