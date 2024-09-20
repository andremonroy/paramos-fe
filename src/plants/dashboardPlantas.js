//Cambios por vercel
const apiUrl = 'https://paramos-backend.vercel.app';

// Trae la info de la tabla "plants" de la BD y la muestra en una tabla
window.onload = (event) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token de autenticación no encontrado. Inicia sesión primero.");
        return; // Detener la ejecución si no hay token
    }

    const createCategories = document.getElementById('createPlant');
    createCategories.addEventListener('click', function(event) {
        console.log('Hice click');
        window.location.href = './formplants2.html';
    });
    
    // Llamar a la función para cargar las plantas
    loadPlants();
};

// Se incluye el token de autenticación
async function loadPlants() {
    try {
        const token = localStorage.getItem("token"); // Obtener el token de localStorage
        const response = await fetch(`${apiUrl}/plants`, {
        //const response = await fetch('http://localhost:3000/plants', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Incluir el token en los encabezados
            },
        });

        if (!response.ok) {
            // Extraer el mensaje de error del cuerpo de la respuesta
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al cargar las plantas");
        }

        const plants = await response.json();
        // Ordenar las plantas por ID
        plants.sort((a, b) => a.id - b.id);

        const tableBody = document.getElementById('plantsTBody');
        tableBody.innerHTML = '';

        plants.forEach(plant => {
            const row = document.createElement('tr');

            const idPlantCell = document.createElement('td');
            idPlantCell.textContent = plant.id;

            const tagCell = document.createElement('td');
            tagCell.textContent = plant.tag;

            const especieCell = document.createElement('td');
            especieCell.textContent = plant.especie;

            const fechagerminacionCell = document.createElement('td');
            fechagerminacionCell.textContent = plant.fecha_germinacion;

            const idViveroCell = document.createElement('td');
            idViveroCell.textContent = plant.vivero_id;

            const initConditionsCell = document.createElement('td');
            initConditionsCell.textContent = plant.condiciones_iniciales;

            const actionCell1 = document.createElement('td');
            const actionCell2 = document.createElement('td');

            /* Boton eliminar con texto "Eliminar"
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'delete_button';
            deleteButton.onclick = () => deletePlant(plant.id);*/

             // Botón de modificar con ícono de tuerca
            const modifyButton = document.createElement('button');
            modifyButton.className = 'modify_button';
            modifyButton.onclick = () => modifyPlants(plant.id);
            const cogIcon = document.createElement('i');
            cogIcon.className = 'fas fa-cog'; // Font Awesome classes
            modifyButton.appendChild(cogIcon);

            // Botón de eliminar con ícono de caneca
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete_button';
            deleteButton.onclick = () => {
                Swal.fire({
                    title: 'Mensaje confirmación',
                    text:'Estas seguro que deseas eliminar la planta?',
                    icon:'question',
                    showCancelButton: true,
                    confirmButtonText:'Si, lo deseo eliminar'
                }).then((result)=>{
                    if(result.isConfirmed){
                        deletePlant(plant.id);
                        
                    }
                });
                }
            const trashIcon = document.createElement('i');
            trashIcon.className = 'fas fa-trash'; // Font Awesome classes
            deleteButton.appendChild(trashIcon);

            actionCell1.appendChild(modifyButton);
            actionCell2.appendChild(deleteButton);

            row.appendChild(idPlantCell);
            row.appendChild(tagCell);
            row.appendChild(especieCell);
            row.appendChild(fechagerminacionCell);
            row.appendChild(idViveroCell);
            row.appendChild(initConditionsCell);
        
            row.appendChild(actionCell1);
            row.appendChild(actionCell2);

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error al cargar las plantas:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal al cargar las plantas",
            footer: `<a href="#">${error.message}</a>` // Mostrar el mensaje de error en el footer
        });
    }
};

async function deletePlant(id) {
    try {
        const token = localStorage.getItem("token"); // Obtener el token de localStorage
        //const response = await fetch(`http://localhost:3000/deletePlants/${id}`, {
        const response = await fetch(`${apiUrl}/deletePlants/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Incluir el token en los encabezados
            },
        });

        const data = await response.json();
        if (response.ok) {
            // Mostrar el popup y esperar a que el usuario lo cierre
            Swal.fire({
                title: 'Eliminación',
                text: 'La planta fue eliminada exitosamente',
                icon: 'success'
            }).then(() => {
                // Recargar la página después de que el usuario cierre el popup
                location.reload(); 
            });

        } else {
            Swal.fire({
                title: 'Error',
                text: 'La planta no fue eliminada.',
                icon: 'error'
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error',
            text: 'Tenemos problemas técnicos.',
            icon: 'error'
        });
    }
}

function modifyPlants (id) {
    window.location.href = `updatePlants.html?id=${id}`;
}
