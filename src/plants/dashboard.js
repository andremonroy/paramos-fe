   // Inicializa el mapa de Google Maps
    let map;

    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
           //center: { lat: 4.60971, lng: -74.08175 }, // Centro inicial (Bogotá)
           center: { lat: 5.0667, lng: -74.1 }, //Paramo Guerrero
            zoom: 14,
        });
    }



    // Función para cargar los páramos y sus ubicaciones -- TOCA ARREGLARLO , NO FUNCIONA, solo con postman V1
    /*
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
    }*/

    
    // Función  de getParamos V2
    async function getParamos() {
        const token = localStorage.getItem("token");
        const paramoSelect = document.getElementById("paramo-id"); // ID correcto

        paramoSelect.innerHTML = '<option value="" selected disabled>Selecciona un paramo</option>';

        try {
            const response = await fetch("http://localhost:3000/getParamos", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const paramos = await response.json();

            const allParamos = document.createElement("option");
            allParamos.value = "0";
            allParamos.textContent = "Todos";
            paramoSelect.appendChild(allParamos);

            paramos.forEach(vivero => {
                const option = document.createElement("option");
                option.value = vivero.id;
                option.textContent = vivero.nombre;
                paramoSelect.appendChild(option);
            });

            paramoSelect.addEventListener("change", async (event) => {
                const selectedViveroId = event.target.value;
                await loadPlants(selectedViveroId); // Cargar plantas cuando se selecciona un vivero
            });

        } catch (error) {
            console.error("Error al cargar los viveros:", error);
        }
    }
    
    // Función original de getViveros para mantener el funcionamiento del menú
    async function getViveros() {
        const token = localStorage.getItem("token");
        const viveroSelect = document.getElementById("vivero-id"); 

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

            const allViveros = document.createElement("option");
            allViveros.value = "0";
            allViveros.textContent = "Todos";
            viveroSelect.appendChild(allViveros);

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
        //loadParamos();
        getViveros(); // Cargar viveros de la manera original

        const viveroSelect = document.getElementById("vivero-id"); 
        viveroSelect.addEventListener("change", async (event) => {
            event.preventDefault();
            const valor = event.target.value;
            const respuesta = await fetch(`http://localhost:3000/plantsbyVivero/${valor}`);
            const data = await respuesta.json();
            console.log(data)
            
            const tableBody = document.getElementById('plantsTBody');
            tableBody.innerHTML = '';
    
            data.forEach(plant => {
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
                deleteButton.onclick = () => deletePlant(plant.id);
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
        });
    });

