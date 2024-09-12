document.getElementById("plantsForm").addEventListener("submit",function(event){
    event.preventDefault();
    const tag = document.getElementById("tag").value
    const especie = document.getElementById("especie").value
    const fecha_germinacion = document.getElementById("fecha-germinacion").value
    const vivero_id = document.getElementById("vivero-id").value
    const condiciones_iniciales = document.getElementById("condiciones-iniciales").value

    fetch("http://localhost:3000/createPlants",{
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({tag, especie, fecha_germinacion, vivero_id, condiciones_iniciales})

    }).then(response=>response.json())
    .then(data=>{
        console.log("iuju!")
    })
    

   
})