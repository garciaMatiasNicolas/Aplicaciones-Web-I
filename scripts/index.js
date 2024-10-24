// VARIABLES //

let sectionS = document.getElementById("sucursales");
let input = document.getElementById("floatingInputValue");
let section = document.getElementById("indexCards");
let celdas = document.getElementsByTagName("td");

// CARDS //
const cardsFetch = async () => {
    const data = await fetch("db.json")
    const response = await data.json();
    console.log(response.index.cards)
    return response.index.cards;
};

const mostrarDatos = (array)=> {
    plantilla = ``
    array.forEach((element)=>{
        plantilla+= `
        <tr>
            <td class="text-white fontTitle">${element.name} - ${element.adress}</td>
        </tr>`
    })
    sectionS.innerHTML = plantilla
};

// SUCURSALES FETCH //
const sucursales = async() => {
    const data = await fetch("db.json");
    const response = await data.json()
    mostrarDatos(response.sucursales)
}
sucursales();

// PLANTILLAS //
const showCards = async () => {
    let cards = await cardsFetch();
    cards.forEach((element) => {
        let row = document.createElement("div");
        row.className = "w-50"
        row.innerHTML = 
        `
        <div class="col-6 d-flex justify-content-center p-0 w-100 mt-5">
            <div class="card bg-black" style="width: 25rem; height: 100%;">
            <img src="${element.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title text-white fontTitle">${element.title}</h3>
                <p class="card-text text-white fontP">${element.description}</p>
                <a href="${element.link}" class="btn btnColor text-white">${element.buttonText}</a>
            </div>
            </div>
        </div>
        `
        section.appendChild(row);
    });
};
showCards();

input.addEventListener("keyup", (e)=>{
    let texto = e.target.value;
    let er = new RegExp (texto, "i");
    for(let i=0; i<celdas.length; i++){
        let valores = celdas[i];
        er.test(valores.innerHTML) ? valores.classList.remove("ocultar"): valores.classList.add("ocultar")
    }
});

