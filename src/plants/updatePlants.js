document.addEventListener('DOMContentLoaded', async (event) => {
    const idPlant = getQueryParams('id');
    const plant = await loadPlant(idPlant);

    if (!plant) {
        console.error('Planta no encontrada');
        return;
    }

    // Asigna los valores a los campos del formulario
    document.getElementById("tag").value = plant.tag;
    document.getElementById("especie").value = plant.especie;
    document.getElementById("fecha-germinacion").value = plant.fecha_germinacion;
    document.getElementById("vivero-id").value = plant.vivero_id;
    document.getElementById("condiciones-iniciales").value = plant.condiciones_iniciales;

    const updatePlantForm = document.getElementById('updatePlantsForm');
    
    if (updatePlantForm) {
        updatePlantForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            // Obtén los valores actuales del formulario
            const tag = document.getElementById("tag").value;
            const especie = document.getElementById("especie").value;
            const fecha_germinacion = document.getElementById("fecha-germinacion").value;
            const vivero_id = document.getElementById("vivero-id").value;
            const condiciones_iniciales = document.getElementById("condiciones-iniciales").value;

            await updatePlant(idPlant, tag, especie, fecha_germinacion, vivero_id, condiciones_iniciales);
        });
    } else {
        console.error('Formulario no encontrado');
    }
});


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
        const plants = await response.json();
        return plants[0]; // Retorna la planta
    } catch (error) {
        console.error(error);
    }
}

async function updatePlant(id, tag, especie, fecha_germinacion, vivero_id, condiciones_iniciales) {
    try {
        const response = await fetch(`http://localhost:3000/updatePlants/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tag, especie, fecha_germinacion, vivero_id, condiciones_iniciales }),
        });
        if (response.ok) {
            window.alert('Planta Actualizada Exitosamente.');
        } else {
            window.alert('Planta No Fue Actualizada.');
        }
    } catch (error) {
        console.error(error);
        window.alert('Tenemos problemas técnicos.');
    }
}
