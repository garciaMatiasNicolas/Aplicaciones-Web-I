document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault(); 
  
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (!isValidEmail(email)) {
        Swal.fire({
        title: "Error",
        text: "El correo electrónico ingresado no es válido.",
        icon: "error",
        confirmButtonText: "Aceptar",
        });
        return;
    }

    try {
        const response = await fetch("https://675f69951f7ad242699852ca.mockapi.io/api/appwebs/users");
        const users = await response.json();

        const user = users.find((user) => user.email === email);

        if (!user) {
            Swal.fire({
                title: "Error",
                text: "El correo electrónico no está registrado.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        return;
        }

        if (user.password !== password) {
            Swal.fire({
                title: "Error",
                text: "La contraseña es incorrecta.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        return;
        }
        const userToken = generateUUID();

        localStorage.setItem("userToken", userToken);
        localStorage.setItem("userEmail", email);

        Swal.fire({
            title: "¡Inicio de sesión exitoso!",
            text: "Serás redirigido a la página principal.",
            icon: "success",
            confirmButtonText: "Aceptar",
            }).then(() => {
            window.location.href = "index.html"; 
            });
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
        title: "Error",
        text: "Hubo un problema al verificar tus datos. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
        });
    }
});

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
  