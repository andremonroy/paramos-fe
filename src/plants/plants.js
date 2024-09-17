/*document.getElementById("plantsForm").addEventListener("submit",function(event){
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
        console.log("iuju! it's working"),
        Swal.fire({
            title:'Creación',
            text:'La planta fue creada',
            icon:'success'
        })
    })
});

*/
document.getElementById("plantsForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const tag = document.getElementById("tag").value;
    const especie = document.getElementById("especie").value;
    const fecha_germinacion = document.getElementById("fecha-germinacion").value;
    const vivero_id = document.getElementById("vivero-id").value;
    const condiciones_iniciales = document.getElementById("condiciones-iniciales").value;
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/createPlants", {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ tag, especie, fecha_germinacion, vivero_id, condiciones_iniciales })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la creación de la planta");
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
            footer: '<a href="#">¿Por qué tengo este problema?</a>'
        });
    });
});
