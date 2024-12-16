document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const email = document.querySelector('input[name="email"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const first_name = document.querySelector('input[name="first_name"]').value;
    const last_name = document.querySelector('input[name="last_name"]').value;


    try {
      const response = await fetch("https://675f69951f7ad242699852ca.mockapi.io/api/appwebs/users");
      const users = await response.json();
  
      const emailExists = users.some((user) => user.email === email);
  
      if (emailExists) {
        Swal.fire({
          title: "Error",
          text: "El email ya está registrado. Por favor, use otro.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return; 
      }

      const userData = { email, address, password, first_name, last_name };
  
      const createResponse = await fetch("https://675f69951f7ad242699852ca.mockapi.io/api/appwebs/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (createResponse.ok) {
        Swal.fire({
          title: "¡Registro exitoso!",
          text: "Ahora serás redirigido al inicio de sesión.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          window.location.href = "login.html"; 
        });
      } else {
        throw new Error("Error al guardar los datos");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al registrar tus datos. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
});
  