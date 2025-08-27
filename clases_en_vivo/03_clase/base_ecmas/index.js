// clousures

// 3 tipos de contadores

// 10 
// -10
// 25


const counter = (start) => {
    // let start = 0 // interna de la funcion estoy utilizando ese estado // private
    return () => {
        start++
        console.log("Este contador internamente esta en:\t", start);

    }
}

const counter_basico = counter(10)
const counter_negativo = counter(-10)
const counter_superior = counter(25)

counter_basico()
counter_basico()

counter_negativo()
counter_negativo()
counter_negativo()


counter_superior()
counter_superior()
counter_superior()

// console.log(start);


// metodos de pago

const listPagos = []

const bryanPago = (valor, metodoDePago) => {
    console.log("Realizando la accion de pago");
    return metodoDePago(valor)
}

const pagoEfectivo = (valor) => {
    console.log("El metodo seleccionado es por efectivo");
    listPagos.push(valor)
    console.log("Pago efectuado");
    return true
}

const pagoMercadoPago = (valor) => {
    console.log("El metodo seleccionado es por mercado pago");
    setTimeout(
        () => {

            listPagos.push(valor)
            console.log("Se acredito")
            console.log(listPagos);

        }
        , 2000)
    return true
}

const pagoCredito = (valor) => {
    console.log("El metodo seleccionado es por tarjeta de credito");
    listPagos.push(valor)
    return true
}


bryanPago(5000, pagoMercadoPago)

console.log(listPagos);


// HOF's

// a que me retorne la promedio de edades
const personas = [
    { nombre: "Ana", edad: 25 },
    { nombre: "Carlos", edad: 32 },
    { nombre: "María", edad: 19 },
    { nombre: "Juan", edad: 41 },
    { nombre: "Laura", edad: 28 },
    { nombre: "Pedro", edad: 36 },
    { nombre: "Sofía", edad: 22 },
    { nombre: "Miguel", edad: 45 },
    { nombre: "Elena", edad: 31 },
    { nombre: "David", edad: 27 }
];


let edades = personas.filter(persona => persona.edad > 30 ? persona.edad : null)

console.log(edades);


// // async await
// fetch("https://api.github.com/users/anderson-ort/repos")
// .then( res => res.json())
// // .then( data => console.log(data))
// .then( data => {
//     const newData = data.map(repos => ({id:repos.id, language:repos.language, fechaCreado: repos.created_at}))
//     console.log(newData);

// })
// .catch(error => console.error(error.msg))


const url = "https://api.github.com/users/anderson-ort/repo"


const peticionAsync = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        const newData = await data.map(repos => ({ id: repos.id, language: repos.language, fechaCreado: repos.created_at }))
        console.log(newData);

    } catch (e) {
        console.error(e);
    }
}


peticionAsync(url)
