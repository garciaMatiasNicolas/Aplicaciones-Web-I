// ARRAYS Y VARIABLES //

let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [] ;
let botonCarrito = document.getElementById("btnCarrito1");
let total = document.getElementById("precioTotal2");
let precio = document.getElementById("precio2")
let btnVaciar = document.getElementById("btnVaciar2");
let modalCarrito = document.getElementById("modalBody2");
let btnPedir = document.getElementById("btnPedir");

// FETCH OBJETOS //

fetch("../db.json")
.then(response => response.json())
.then ((data) => {
    imprimir(data.pollos);
})

// PLANTILLAS //

function imprimir(array){
   array.forEach((element)=> {
        let producto = document.getElementById("sectionPollos");
        let pollo = document.createElement("div");
        pollo.innerHTML=
                `<div class= " d-flex flex-column justify-content-between align-items-center mt-5 animacion">
                    <img class="imgBurguers imgAnimacion mb-3" src="${element.image}" alt="">
                    <div class="w-75">
                        <h2 class="titleFooter text-center text-white">${element.name}</h2>
                    </div>
                    <button type="button" class="btn btnColor btn-lg text-white" data-bs-toggle="modal" data-bs-target="#${element.id}">
                    Descripcion
                    </button>
                    <div class="modal fade modals" id="${element.id}" tabindex="-1" aria-labelledby="${element.id}Label" aria-hidden="true">
                    <div class = "modal-dialog">   
                        <div class="modal-content">
                            <div class="modal-header d-flex flex-column justify-content-between">
                                <div class="d-flex justify-content-between align-items-center w-100">
                                    <h2 class="modal-title fontTitle" id="${element.id}Label">${element.name}</h2>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <img class="imgBurguers mb-3" src="${element.image}" alt="${element.name}">
                            </div>
                            <div class="modal-body">
                            <p class="fontP">${element.description}</p>
                            </div>
                            <div class="modal-footer d-flex justify-content-between" id="modalF">
                                <h2 class="fontTitle">Precio: ${element.price}$</h2>
                                <button id="btn-${element.id}" type="button" class="btns btn btnColor text-white" data-bs-dismiss="modal" aria-label="Close">Añadir a mi pedido</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>`;
        producto.appendChild(pollo);
        let btnCartP = document.getElementById(`btn-${element.id}`);
        btnCartP.addEventListener("click",() =>  {
            agregarCarrito(element)
            Toastify({
                text: `${element.name} agregado`,
                duration: 1500,
                style: {
                    background: "black",
                  }
                }).showToast();
        })
    })
}

function ver(array){
    let plantilla = ``; 
    //Imprimir en el modal porductos seleccionados
    array.forEach((producto)=> {

        plantilla += 
        `
        <div id="pollo${producto.id}" class="d-flex w-100 justify-content-around align-items-start border-bottom">
        <img class="imgPedidosModal mb-3" src="${producto.image}" alt="">
        <div class="d-flex w-100 flex-column justify-content-between align-items-start mt-3 ms-2">
        <h3 class="fontTitle1">Producto: ${producto.name}</h3>
        <h3 class="fontTitle1">Precio: ${producto.price}$</h3>
        </div>
        <button id="delete-${producto.id}" type="button" class="btns btn bg-transparent text-white mt-4"><img class="iconT" src="../img/trashpng.png"></button>          
        </div>
        `
        modalCarrito.innerHTML = plantilla;
    })
    // Agregar un evento a cada boton de eliminar de cada producto
    carrito.forEach((producto)=>{
        document.getElementById(`delete-${producto.id}`).addEventListener("click", ()=>{
           let item = carrito.find((prod)=> prod.id === producto.id);
           let indice = carrito.indexOf(item);
           carrito.splice(indice, 1);
           let cards = document.getElementById(`pollo${producto.id}`);
           cards.remove();
           localStorage.setItem("carritoCompras", JSON.stringify(carrito));
           ver(carrito);
        })
    })
    // Calcular total de los productos seleccionados
    carrito.length == 0 ? carritoVacio() : total.innerHTML = carrito.reduce((acum, producto) => acum + producto.price, 0);
}

// BOTONES Y FUNCIONES //

botonCarrito.addEventListener("click", () => {
    ver(carrito);
});

btnPedir.addEventListener("click", () => {
    Swal.fire({
        title: 'Dejanos tus datos',
        text: "Nos estaremos comunicando con vos para darte el status de tu pedido",
        icon: 'question',
        iconColor:"#ff0000",
        input: "text",
        inputLabel: "Tu nombre y apellido",
        confirmButtonColor: ' #ff0000',
        confirmButtonText: 'Enviar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Dejanos tus datos',
            input: "text",
            inputLabel: "Tu numero de telefono",
            confirmButtonText: 'Enviar',
            icon: 'question',
            iconColor:"#ff0000",
            confirmButtonColor: ' #ff0000',
        }).then((result2)=> {
            if (result2.isConfirmed){
                Swal.fire({
                    title:"Gracias por comprar en Jovies",
                    text: "Tu compra ha sido confirmada, nos estaremos comunicando con vos para darte el status de tu pedido",
                    icon:"success",
                    iconColor:"#ff0000",
                    confirmButtonColor: ' #ff0000',
                })
                carrito.splice(0, carrito.length);
                localStorage.removeItem("carritoCompras")
            }
        })
        }
      })
})

btnVaciar.addEventListener("click", ()=> {
    carrito.splice(0, carrito.length);
    localStorage.removeItem("carritoCompras")
    ver(carrito)
})

function agregarCarrito(producto){
    carrito.push(producto)
    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
}

function carritoVacio(){
    modalCarrito.innerHTML = `<h3 class="fontTitle1">No has seleccionado ningun producto</h3>`
    precio.className = "d-none"
}

