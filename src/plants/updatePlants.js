window.onload = async (event) => {
    const idPlant = getQueryParams('id');
    const plant = await loadPlant(idPlant);
    const tag = document.getElementById("tag").value;
    const especie = document.getElementById("especie").value;
    const fecha_germinacion = document.getElementById("fecha-germinacion").value;
    const vivero_id = document.getElementById("vivero-id").value;
    const condiciones_iniciales = document.getElementById("condiciones-iniciales").value;
    const token = localStorage.getItem("token");

    idPlant = plant.id;
    tag = plant.tag;
    especie = plant.especie;
    fecha_germinacion = plant.fecha_germinacion;
    vivero_id = plant.vivero_id;
    condiciones_iniciales = plant.condiciones_iniciales;

    updatePlant.addEventListener('submit', async function (event) {
        event.preventDefault();
        await updatePlant(idPlant, tag, especie, fecha_germinacion, vivero_id, condiciones_iniciales);
    });
};

function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

async function loadPlant(id) {
    try {
        const response = await fetch(`http://localhost:3000/plants/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const categories = await response.json();
        return categories[0];
    } catch (error) {
        console.error(error);
    }
};


async function updatePlant(id, tag, especie, fecha_germinacion, vivero_id, condiciones_iniciales) {
    try {
        const response = await fetch(`http://localhost:3000/updatePlants/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({tag, especie, fecha_germinacion, vivero_id, condiciones_iniciales}),
        });
        const data = await response.json();
            if (response.ok) {
                window.alert('Planta Actualizada Exitosamente.'); 
            } else {
                window.alert('Planta No Fue Actualizada.');
            }
    } catch (error) {
        console.error(error);
        window.alert('Tenemos problemas técnicos.');
    }
};