/*
// Inicializa el mapa de Google Maps
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 4.60971, lng: -74.08175 }, // Centro inicial (Bogotá)
        zoom: 8,
    });
}

// Función para cargar los páramos y sus ubicaciones
async function loadParamos() {
    try {
        const response = await fetch('/api/getParamos');
        const paramos = await response.json();
        const paramoSelect = document.getElementById('paramo-select');

        paramos.forEach(paramo => {
            const option = document.createElement('option');
            option.value = paramo.id;
            option.textContent = paramo.nombre;
            paramoSelect.appendChild(option);
        });

        paramoSelect.addEventListener('change', async (event) => {
            const selectedParamo = paramos.find(p => p.id == event.target.value);
            if (selectedParamo) {
                // Mover el mapa a la ubicación del páramo seleccionado
                const location = { lat: selectedParamo.latitud, lng: selectedParamo.longitud };
                map.setCenter(location);

                // Cargar los viveros correspondientes al páramo seleccionado
                await loadViveros(selectedParamo.id);
            }
        });

    } catch (error) {
        console.error('Error al cargar los páramos:', error);
    }
}

// Función original de getViveros para mantener el funcionamiento del menú
async function getViveros() {
    const token = localStorage.getItem("token");
    const viveroSelect = document.getElementById("vivero-id"); // ID correcto

    viveroSelect.innerHTML = '<option value="" selected disabled>Selecciona un vivero</option>';

    try {
        const response = await fetch("http://localhost:3000/getViveros", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const viveros = await response.json();

        viveros.forEach(vivero => {
            const option = document.createElement("option");
            option.value = vivero.id;
            option.textContent = vivero.nombre;
            viveroSelect.appendChild(option);
        });

        viveroSelect.addEventListener("change", async (event) => {
            const selectedViveroId = event.target.value;
            await loadPlants(selectedViveroId); // Cargar plantas cuando se selecciona un vivero
        });

    } catch (error) {
        console.error("Error al cargar los viveros:", error);
    }
}

// Función para cargar las plantas del vivero seleccionado
async function loadPlants(viveroId) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:3000/plantsByVivero?viveroId=${viveroId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const plants = await response.json();
        const plantsTableBody = document.querySelector("#plants-table tbody");
        plantsTableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

        plants.forEach(plant => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${plant.tag}</td>
                <td>${plant.especie}</td>
                <td>${plant.fecha_germinacion}</td>
                <td>${plant.condiciones_iniciales}</td>
            `;
            plantsTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error al cargar las plantas:", error);
    }
}

// Inicializar la carga de datos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    initMap();
    loadParamos();
    getViveros(); // Cargar viveros de la manera original
});
*/
