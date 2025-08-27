const mostrarMsg = text => {
    const msg = document.querySelector(".mensaje")
    msg.textContent = text
}


const comprarTicket = (ciudad, callback) => {
    console.log(`Procesando la compra en: ${ciudad}`)
    setTimeout(() => {
        console.log("Compra confirmada")
        callback()
    }, 500)
}


const comprarByEmail = texto => mostrarMsg("Compra hecha por Email")
const comprarByWhatsApp = texto => mostrarMsg("Compra hecha por WhatsApp")

// conector de html --> js
const btnEmailBaires = document.querySelector(".btn-email.baires")
const btnWhatsAppBaires = document.querySelector(".btn-whatsapp.baires")

//action type , logic
btnEmailBaires.addEventListener("click", e => {
    const ciudad = e.target.dataset.ciudad
    comprarTicket(ciudad, comprarByEmail)
})

btnWhatsAppBaires.addEventListener("click", e => {
    const ciudad = e.target.dataset.ciudad
    comprarTicket(ciudad, comprarByWhatsApp)
})

//: TODO -> challenge -> completar para rosario
// uso de closures


let buenosAiresTicketsDefault = 10
let rosarioTicketsDefault = 5

const bairesCounter = document.querySelector(".ticket.baires .counter")
bairesCounter.textContent = buenosAiresTicketsDefault

const rosarioCounter = document.querySelector(".ticket.rosario .counter")
rosarioCounter.textContent = rosarioTicketsDefault


const contadorTickets = tickets => {
    return () => {
        if (tickets > 0) {
            tickets--
            console.log("Se vendio un ticket")
            return tickets
        }
        else {
            alert("Chau tickets");
            return
        }
    }
}

const contadorTicketsBaires = contadorTickets(buenosAiresTicketsDefault)

const handleEvent = () => {
    const restantes = contadorTicketsBaires();
    if (restantes !== undefined) {
        setTimeout(() => {
            bairesCounter.textContent = restantes
        }, 500)
    }
}

btnEmailBaires.addEventListener("click", handleEvent)
btnWhatsAppBaires.addEventListener("click", handleEvent)


// HOF

const shows = [
    { ciudad: "Mendoza", fecha: "05/12/2025" },
    { ciudad: "Bariloche", fecha: "10/12/2025" },
    { ciudad: "Salta", fecha: "17/12/2025" },
    { ciudad: "Mar del Plata", fecha: "22/12/2025" },
    { ciudad: "Tucumán", fecha: "15/01/2026" },
    { ciudad: "Neuquén", fecha: "21/01/2026" },
    { ciudad: "Corrientes", fecha: "28/01/2026" },
    { ciudad: "La Plata", fecha: "05/02/2026" },
    { ciudad: "Ushuaia", fecha: "12/02/2026" },
    { ciudad: "San Juan", fecha: "19/02/2026" },
];


// const templateRender = show => `
//     <div class="show-item">
//         <h3>${show.ciudad}</h3>
//         <p>📅 ${show.fecha}</p>
//     </div>
// `

const templateRender = show => `
    <div class="show-item">
        <h3>${show.name}</h3>
        <p>📅 ${show.date}</p>
    </div>
`

// :TODO challenge -> averiguar como hacer esto usando reduce
const renderShows = shows => shows.map(templateRender).join("")



const logoBanda = document.querySelector(".shows-display .logo")

const handleLogoEvent = (shows) => {
    const showsEvents = document.querySelector(".next-shows")

    showsEvents.innerHTML = renderShows(shows)
    
}



// async await -> promises
// :TODO challenge -> llevarlo a async/await 

const url = new URL("https://68adf41ca0b85b2f2cf52bfc.mockapi.io/api/v1/cities/shows")
// filtro
url.searchParams.append('page', 1)
url.searchParams.append('limit', 5)


const getShowsFromAPI = () => {
    console.log("aca toy");

    fetch(url.toString(), { method: 'GET' })
        .then(res => res.json())
        .then(shows => {
            handleLogoEvent(shows)
        })
        .catch(error => console.error({ "fecth error": error }))
}

logoBanda.addEventListener("click", getShowsFromAPI)