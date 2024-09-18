/*// Inicializa el mapa de Google Maps
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

        paramoSelect.addEventListener('change', (event) => {
            const selectedParamo = paramos.find(p => p.id == event.target.value);
            if (selectedParamo) {
                // Mover el mapa a la ubicación del páramo seleccionado
                const location = { lat: selectedParamo.latitud, lng: selectedParamo.longitud };
                map.setCenter(location);
            }
        });

    } catch (error) {
        console.error('Error al cargar los páramos:', error);
    }
}

// Cargar viveros basados en el páramo seleccionado
async function loadViveros(paramoId) {
    const viveroSelect = document.getElementById('vivero-select');
    viveroSelect.innerHTML = '<option value="" selected disabled>Seleccione un vivero</option>';

    try {
        const response = await fetch(`/api/getViveros?paramoId=${paramoId}`);
        const viveros = await response.json();

        viveros.forEach(vivero => {
            const option = document.createElement('option');
            option.value = vivero.id;
            option.textContent = vivero.nombre;
            viveroSelect.appendChild(option);
        });

        viveroSelect.addEventListener('change', (event) => {
            const selectedViveroId = event.target.value;
            loadPlants(selectedViveroId);
        });

    } catch (error) {
        console.error('Error al cargar los viveros:', error);
    }
}

// Cargar las plantas del vivero seleccionado
async function loadPlants(viveroId) {
    try {
        const response = await fetch(`/api/getPlants?viveroId=${viveroId}`);
        const plants = await response.json();
        const plantsTableBody = document.querySelector('#plants-table tbody');
        plantsTableBody.innerHTML = '';

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
        console.error('Error al cargar las plantas:', error);
    }
}

// Inicializar la carga de datos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadParamos();
});
*/
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

        paramoSelect.addEventListener('change', (event) => {
            const selectedParamo = paramos.find(p => p.id == event.target.value);
            if (selectedParamo) {
                // Mover el mapa a la ubicación del páramo seleccionado
                const location = { lat: selectedParamo.latitud, lng: selectedParamo.longitud };
                map.setCenter(location);

                // Cargar los viveros correspondientes al páramo seleccionado
                loadViveros(selectedParamo.id);
            }
        });

    } catch (error) {
        console.error('Error al cargar los páramos:', error);
    }
}

// Cargar viveros basados en el páramo seleccionado
/*
async function loadViveros(paramoId) {
    const viveroSelect = document.getElementById('vivero-select');
    viveroSelect.innerHTML = '<option value="" selected disabled>Seleccione un vivero</option>';

    try {
        const response = await fetch(`/api/getViverosbyid?paramoId=${paramoId}`);
        const viveros = await response.json();

        viveros.forEach(vivero => {
            const option = document.createElement('option');
            option.value = vivero.id;
            option.textContent = vivero.nombre;
            viveroSelect.appendChild(option);
        });

        viveroSelect.addEventListener('change', (event) => {
            const selectedViveroId = event.target.value;
            loadPlants(selectedViveroId);
        });

    } catch (error) {
        console.error('Error al cargar los viveros:', error);
    }
}*/
// Muestra la info de los viveros
document.addEventListener("DOMContentLoaded", function() {
    const viveroSelect = document.getElementById("vivero-id");
    
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem("token");

    // Verificar si el token existe antes de hacer la solicitud
    if (!token) {
        console.error("No token found. Please log in.");
        return; // No continuar si no hay token
    }

    // Realizar la solicitud para obtener los viveros desde la API
    fetch("http://localhost:3000/getViveros", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Incluye el token en los headers
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch viveros");
        }
        return response.json();
    })
    .then(viveros => {
        // Limpiar el menú desplegable antes de agregar las opciones
        viveroSelect.innerHTML = '<option value="" disabled selected>Selecciona un vivero</option>';

        // Rellenar el menú desplegable con los viveros obtenidos
        viveros.forEach(vivero => {
            const option = document.createElement("option");
            option.value = vivero.id; // Usar el ID del vivero
            option.textContent = vivero.nombre; // Usar el nombre del vivero
            viveroSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error al obtener los viveros:", error);
    });
});


/*
// Cargar las plantas del vivero seleccionado
async function loadPlants(viveroId) {
    try {
        const response = await fetch(`/api/getPlants?viveroId=${viveroId}`);
        const plants = await response.json();
        const plantsTableBody = document.querySelector('#plants-table tbody');
        plantsTableBody.innerHTML = '';

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
        console.error('Error al cargar las plantas:', error);
    }
}
*/
document.getElementById("vivero-id").addEventListener("change", function() {
    const viveroId = this.value; // Obtén el ID del vivero seleccionado
    const token = localStorage.getItem("token");

    if (!viveroId) {
        console.error("No vivero selected.");
        return;
    }

    // Realiza una solicitud para obtener las plantas del vivero seleccionado
    fetch(`http://localhost:3000/plantsByVivero?viveroId=${viveroId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Incluir el token en la cabecera
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch plants");
        }
        return response.json();
    })
    .then(plants => {
        // Limpiar la tabla antes de agregar los datos
        const tableBody = document.getElementById("plants-table-body");
        tableBody.innerHTML = ""; // Limpia el cuerpo de la tabla

        // Rellenar la tabla con las plantas obtenidas
        plants.forEach(plant => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${plant.tag}</td>
                <td>${plant.especie}</td>
                <td>${plant.fecha_germinacion}</td>
                <td>${plant.condiciones_iniciales}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error al obtener las plantas:", error);
    });
});

// Inicializar la carga de datos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadParamos();
});
