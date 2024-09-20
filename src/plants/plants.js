//Cambios por vercel
const apiUrl = 'https://paramos-backend.vercel.app';

// Ingresar los datos de una nueva planta
document.getElementById("plantsForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const tag = document.getElementById("tag").value;
    const especie = document.getElementById("especie").value;
    const fecha_germinacion = document.getElementById("fecha-germinacion").value;
    const vivero_id = document.getElementById("vivero-id").value;
    const condiciones_iniciales = document.getElementById("condiciones-iniciales").value;
    const token = localStorage.getItem("token");

    //fetch("http://localhost:3000/createPlants", {
    fetch(`${apiUrl}/createPlants`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ tag, especie, fecha_germinacion, vivero_id, condiciones_iniciales })
    })
    .then(async response => {
        if (!response.ok) {
            // Extraer el mensaje de error del cuerpo de la respuesta
            const errorData = await response.json();
            throw new Error(errorData.message || "Error desconocido");
        }
        return response.json();
    })
    .then(data => {
        console.log("iuju! it's working");
        Swal.fire({
            title: 'Creación',
            text: 'La planta fue creada',
            icon: 'success'
        });
    })
    .catch(error => {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal al crear la planta",
            footer: `<a href="#">${error.message}</a>` // Mostrar el mensaje de error en el footer
        });
    });
});


//Obtener info de los viveros como menu desplegable
document.addEventListener("DOMContentLoaded", function() {
    const viveroSelect = document.getElementById("vivero-id");
    
    // Obtener el token del almacenamiento local (ajustar si está en otro lugar)
    const token = localStorage.getItem("token");  // Asegúrate de tener el token guardado previamente

    if (!token) {
        console.error("No token found. Please log in.");
        return;
    }

    // Hacer un fetch para obtener los viveros desde el backend, incluyendo el token en los headers
    //fetch("http://localhost:3000/getViveros", {
    fetch(`${apiUrl}/getViveros`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Incluir el token en la cabecera
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch viveros");
        }
        return response.json();
    })
    .then(viveros => {
        // Limpiar el menú desplegable antes de agregar las opciones (por si acaso)
        viveroSelect.innerHTML = '<option value="" disabled selected>Selecciona un vivero</option>';

        // Rellenar el menú desplegable con los viveros obtenidos
        viveros.forEach(vivero => {
            const option = document.createElement("option");
            option.value = vivero.id; // El ID del vivero
            option.textContent = vivero.nombre; // El nombre del vivero
            viveroSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error al obtener los viveros:", error);
    });
});
