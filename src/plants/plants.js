document.getElementById("plantsForm").addEventListener("submit",function(event){
    event.preventDefault();
    const tag = document.getElementById("tag").value
    const especie = document.getElementById("especie").value
    const fecha_germinacion = document.getElementById("fecha-germinacion").value
    const vivero_id = document.getElementById("vivero-id").value
    const condiciones_iniciales = document.getElementById("condiciones-iniciales").value
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/createPlants",{
        method:"post",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({tag, especie, fecha_germinacion, vivero_id, condiciones_iniciales})

    }).then(response=>response.json())
    .then(data=>{
        console.log("iuju!"),
        Swal.fire({
            title:'Creación',
            text:'La planta fue creada',
            icon:'success'
        })
    })
});
/*
document.getElementById("plantsForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const tag = document.getElementById("tag").value;
    const especie = document.getElementById("especie").value;
    const fecha_germinacion = document.getElementById("fecha-germinacion").value;
    const vivero_id = document.getElementById("vivero-id").value;
    const condiciones_iniciales = document.getElementById("condiciones-iniciales").value;

    // Limpiar cualquier mensaje previo
    const messageDiv = document.getElementById("message");
    messageDiv.innerHTML = '';

    fetch("http://localhost:3000/createPlants", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tag, especie, fecha_germinacion, vivero_id, condiciones_iniciales })
    })
    .then(response => {
        if (response.ok) {  // Si la respuesta es exitosa (HTTP 200-299)
            return response.json();  // Si el backend envía datos adicionales
        } else {
            throw new Error('Error en el registro de la planta');
        }
    })
    .then(data => {
        // Mostrar mensaje de éxito
        messageDiv.innerHTML = "<p style='color:#588157;'>La planta fue registrada con éxito.</p>";
    })
    .catch(error => {
        console.error("Error:", error);
        // Mostrar mensaje de error
        messageDiv.innerHTML = "<p style='color:#D9534F;'>Error al registrar la planta. Por favor, verifique los datos e intente nuevamente.</p>";
    });
});
*/