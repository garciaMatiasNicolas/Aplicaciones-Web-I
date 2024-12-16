function checkUserToken() {
    if (!localStorage.getItem("userToken") || !localStorage.getItem("userEmail")) {
      Swal.fire({
        title: "Debe iniciar sesión",
        text: "Por favor, inicie sesión para continuar.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      }).then(() => {
        window.location.href = "../login.html"; 
      });
    }
};
checkUserToken();

// ARRAYS Y VARIABLES //
let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [] ;
let total = document.getElementById("precioTotal");
let precio = document.getElementById("precio")
let modalCarrito = document.getElementById("modalBody");
let botonCarrito = document.getElementById("btnCarrito");
let btnVaciar = document.getElementById("btnVaciar");
let btnPedir = document.getElementById("btnEnd");
let div = document.getElementById("loader");

// FETCH DATA //
const mostrarCardsProductos = (array, seccion) => {
    array.forEach((element)=> {
        let seccionHtml;
        if (seccion === "hamburguesas") {
            seccionHtml = document.getElementById("sectionHamburguesas");
        } else if (seccion === "pollos") {
            seccionHtml = document.getElementById("sectionPollos");;
        } else if (seccion === "postres") {
            seccionHtml = document.getElementById("sectionPostres");
        } else {
            console.error("Sección no encontrada")
        };

        let cardProducto = document.createElement("div");
        cardProducto.innerHTML=
            `<div class= " d-flex flex-column justify-content-between align-items-center mt-5 animacion">
                <img class="imgBurguers imgAnimacion mb-3" src="${element.image}" alt="">
                <h2 class="titleFooter">${element.name}</h2>
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

        seccionHtml.appendChild(cardProducto);
        let btnAdd = document.getElementById(`btn-${element.id}`);
        btnAdd.addEventListener("click", () => {
            agregarCarrito(element)
            Toastify({
                text: `${element.name} agregado`,
                duration: 1500,
                style: {
                    background: "black",
                }
                }).showToast();
        });
    })
};

const obtenerProductos = async ()=> {
    try {
        const api = await fetch("../db.json");
        const data = await api.json();
        // Ejecutar funcion solo si me encuentro en el html del producto
        document.getElementById("sectionHamburguesas") !== null && mostrarCardsProductos(data.hamburguesas, 'hamburguesas');
        document.getElementById("sectionPollos") !== null && mostrarCardsProductos(data.pollos, 'pollos');
        document.getElementById("sectionPostres") !== null && mostrarCardsProductos(data.postres, 'postres'); 
    } catch (error) {
        console.error("Ocurrio un error", error);
    }
};

obtenerProductos();

const mostrarCarrito = () => {
    let plantilla = ``; 
    //Imprimir en el modal porductos seleccionados
    carrito.forEach((element)=> {
        plantilla+= 
        `
        <div id="card${element.id}" class="d-flex w-100 justify-content-around align-items-start border-bottom">
            <img class="imgPedidosModal mb-3" src="${element.image}" alt="">
            <div class="d-flex w-100 flex-column justify-content-between align-items-start mt-3 ms-3">
                <h3 class="fontTitle1">Producto: ${element.name}</h3>
                <h3 class="fontTitle1">Precio: ${element.price}$</h3>
            </div>  
            <button id="deletes-${element.id}" type="button" class="btn text-white mt-4 btnX"><img class="iconT" src="../img/trashpng.png"></button>      
        </div>
        `
        modalCarrito.innerHTML = plantilla;
    })
    // Agregar un evento a cada boton de eliminar de cada producto
    carrito.forEach((element)=>{
        document.getElementById(`deletes-${element.id}`).addEventListener("click", ()=>{
           let item = carrito.find((prod)=> prod.id === element.id);
           let indice = carrito.indexOf(item);
           carrito.splice(indice, 1);
           let card = document.getElementById(`card${element.id}`);
           card.remove()
           localStorage.setItem("carritoCompras", JSON.stringify(carrito))
           mostrarCarrito()
        })
    })
    // Calcular total de los productos seleccionados
    carrito.length === 0 ? carritoVacio() : total.innerHTML = carrito.reduce((acum, element) => acum + element.price, 0);
};

// BOTONES Y FUNCIONES// 
const agregarCarrito = (producto) => {
    carrito.push(producto)
    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
};

const carritoVacio = () => {
    modalCarrito.innerHTML = `<h3 class="fontTitle1">No has seleccionado ningun producto</h3>`;
    precio.className="d-none"
};

btnVaciar.addEventListener("click", ()=> {
    carrito.splice(0, carrito.length);
    localStorage.removeItem("carritoCompras");
    mostrarCarrito();
})

botonCarrito.addEventListener("click", () => {
    mostrarCarrito();
});


// HACER PEDIDO //
btnPedir.addEventListener("click", async () => {
    checkUserToken();
    try {
        const response = await fetch("https://675f69951f7ad242699852ca.mockapi.io/api/appwebs/users");
        const users = await response.json();
        
        const email = localStorage.getItem("userEmail"); 

        const user = users.find((user) => user.email === email);
        
        if (!user) {
            Swal.fire({
                title: "Error",
                text: "No se encontró un usuario con ese email.",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#ff0000"
            });
            return;
        }

        const { value: userInfo } = await Swal.fire({
            title: 'Tomamos tus datos del perfil',
            text: "Si deseas, puedes modificarlos.",
            icon: 'info',
            iconColor: "#ff0000",
            input: 'textarea',
            inputValue: `
                Nombre Completo: ${user.first_name} ${user.last_name}\n
                Email: ${user.email}\n
                Dirección: ${user.address}
            `,
            inputLabel: 'Tus datos',
            confirmButtonText: 'Avanzar',
            confirmButtonColor: '#ff0000',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        });

        if (userInfo === null) {
            return;
        }

        const userInputs = userInfo.split("\n").map(line => line.trim());
        const firstName = userInputs[0].split(":")[1]?.trim();
        const lastName = userInputs[1].split(":")[1]?.trim();
        const address = userInputs[2].split(":")[1]?.trim();

        if (firstName !== user.first_name || lastName !== user.last_name || address !== user.address) {
            const updatedUser = {
                ...user,
                first_name: firstName,
                last_name: lastName,
                address: address
            };

            await fetch(`https://675f69951f7ad242699852ca.mockapi.io/api/appwebs/users/${user.id}`, {
                method: "PUT",
                body: JSON.stringify(updatedUser),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            Swal.fire({
                title: "Pedido exitoso",
                text: "Tu pedido ha sido creado correctamente, nos estaremos comunicando contigo para darte el status de tu pedido.",
                icon: "success",
                iconColor: "#ff0000",
                confirmButtonColor: '#ff0000',
            });

        } else {
            Swal.fire({
                title: "Pedido exitoso",
                text: "Tu pedido ha sido creado correctamente, nos estaremos comunicando contigo para darte el status de tu pedido.",
                icon: "success",
                iconColor: "#ff0000",
                confirmButtonColor: '#ff0000',
            });
        }

        carrito.splice(0, carrito.length);
        localStorage.removeItem("carritoCompras");
        mostrarCarrito(carrito);

    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al procesar tu pedido. Inténtalo nuevamente.",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#ff0000"
        });
    }
});

