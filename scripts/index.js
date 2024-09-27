/* CONSTRUCTOR */

const cards = [];

class Card {
    constructor (id, nombre, imagen, descripcion, boton){
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.boton = boton;
    }
}

/* VAR - CARDS */

const card1 = new Card ("burguer", "Nueva Fat Lovie!", "./img/fondo1.png", "Llevando el combo de la nueva fat lovie, podes llevarte un combo fat joe con un 50% OFF!", "Quiero mi combo!");
cards.push(card1);
const card2 = new Card ("sucursales", "Conoce todas nuestras sucursales!", "./img/sucursales.jpg", "En jovies, siempre buscamos estar cerca tuyo, conoce nuestras sucursales!", "Ver sucursales");
cards.push(card2);
const card3 = new Card ("app", "Descarga nuestra app para todas las plataformas", "./img/app.jpg", "Ingresa al playstore de tu smartphone y tene tu pedido al alcance de tu telefono ", "Descargar");
cards.push(card3);
const card4 = new Card ("pollo", "Pedi nuestros buckets de Pollo", "./img/poio.jpg", "En jovies, tenemos el mejor pollo rebozado, para que lo disfrutes vos!", "Pedir mi Bucket");
cards.push(card4);
const card5 = new Card ("trabajo", "¿Te interesaria formar parte de jovies?", "./img/nosotros.jpg", "Aqui siempre estamos abiertos a darle oportunidades aquellos que quieran formar parte de nuestro Staff, sumate vos tambien", "+ Info");
cards.push(card5);
const card6 = new Card ("arma", "Arma la tuya!", "./img/jovie.jpg", "¿Ninguna de nuestras opciones te convencio? No te preocupes, tenemos la solucion. Arma tu Jovie como vos la desees! ", "Quiero mi Jovie");
cards.push(card6);

/* PLANTILLA */ 

let section = document.getElementById("indexCards");

for (let element of cards){
    
    let row = document.createElement("div");
    row.className = "w-50"
    row.innerHTML = 
    `
    <div class="col-6 d-flex justify-content-center p-0 w-100 mt-5">
        <div class="card bg-black" style="width: 25rem; height: 100%;">
        <img src="${element.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title text-white fontTitle">${element.nombre}</h3>
            <p class="card-text text-white fontP">${element.descripcion}</p>
            <a href="./secciones/hamburguesas.html" class="btn btnColor text-white">${element.boton}</a>
        </div>
        </div>
    </div>
    `
    section.appendChild(row);
}

