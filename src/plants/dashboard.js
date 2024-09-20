   // Inicializa el mapa de Google Maps
    let map;
    let marcador;

    //Cambios por vercel
    const apiUrl = 'https://paramos-backend.vercel.app';


    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
           //center: { lat: 4.60971, lng: -74.08175 }, // Centro inicial (Bogotá)
           center: { lat: 5.0667, lng: -74.1 }, //Paramo Guerrero
           //center: { lat: 5.4172, lng: -73.5664 }, // Paramo Rabanal
           //center: { lat: 4.5176, lng: -73.7500 }, // Paramo Chingaza

            zoom: 14,
        });
        //Marcar cada vivero
        marcador = new google.maps.Marker({
            position: { lat: 5.066, lng: -74.1 },
            map: map
        })

    }


    // PARAMOS
    // Función  de Paramos V2
    async function getParamos() {
        const token = localStorage.getItem("token");
        const paramoSelect = document.getElementById("paramo-id");

        paramoSelect.innerHTML = '<option value="" selected disabled>Selecciona un paramo</option>';
        console.log("Dentro")
        try {
            const response = await fetch(`${apiUrl}/getParamos`, {
            //const response = await fetch("http://localhost:3000/getParamos", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const paramos = await response.json();

            // Traer los nombres que tengo en la BD para mostrarlos en el menu desplegable
            const allParamos = document.createElement("option");
            allParamos.value = "0";
            allParamos.textContent = "Todos";
            paramoSelect.appendChild(allParamos);

            paramos.forEach(paramo => {
                const option = document.createElement("option");
                option.value = paramo.objeto_codigo;
                option.textContent = paramo.complejo_nombre+'-'+paramo.objeto_codigo;    //Nombre de la columna que quiera traer de la BD para mostrar en el menu desplegable
                option.setAttribute('data-latitud',paramo.latitud);
                option.setAttribute('data-longitud',paramo.longitud);

                paramoSelect.appendChild(option);
            });

            paramoSelect.addEventListener("change", async (event) => {
                const selectedParamoId = event.target.value;
                //await loadPlants(selectedParamoId); // Cargar plantas cuando se selecciona un paramo
            });

        } catch (error) {
            console.error("Error al cargar los viveros:", error);
        }
    }

    // VIVEROS Y PLANTAS CON FILTRO DE VIVERO
    // Función getViveros funcionando OK
    async function getViveros() {
        const token = localStorage.getItem("token");
        const viveroSelect = document.getElementById("vivero-id"); 

        viveroSelect.innerHTML = '<option value="" selected disabled>Selecciona un vivero</option>';

        try {
            const response = await fetch(`${apiUrl}/getViveros`, {
            //const response = await fetch("http://localhost:3000/getViveros", {
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
                //await loadPlants(selectedViveroId); // Cargar plantas cuando se selecciona un vivero
            });

        } catch (error) {
            console.error("Error al cargar los viveros:", error);
        }
    }

    // Función para cargar las plantas del vivero seleccionado
    async function loadPlants(viveroId) {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${apiUrl}/plantsByVivero?viveroId=${viveroId}`, {
            //const response = await fetch(`http://localhost:3000/plantsByVivero?viveroId=${viveroId}`, {
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
        getParamos();
        getViveros(); // Cargar viveros de la manera original

        // Crea la tabla plantas con las filas del filtro de Vivero
        const viveroSelect = document.getElementById("vivero-id"); 
        viveroSelect.addEventListener("change", async (event) => {
            event.preventDefault();
            const valor = event.target.value;
            const respuesta = await fetch(`${apiUrl}/plantsbyVivero/${valor}`);
            //const respuesta = await fetch(`http://localhost:3000/plantsbyVivero/${valor}`);
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

        const paramoSelect = document.getElementById("paramo-id"); 
        paramoSelect.addEventListener("change", async (event) => {
            const opcionParamo= event.target.options[event.target.selectedIndex];
            const posicionParamo = {
                lat:parseFloat(opcionParamo.getAttribute('data-latitud')),
                lng:parseFloat(opcionParamo.getAttribute('data-longitud'))
            }
            map.setCenter(posicionParamo);
            marcador.setPosition(posicionParamo)

            const token = localStorage.getItem("token");
            const valor = event.target.value; //codigo_objeto del Paramo
            const respuesta = await fetch(`${apiUrl}/getViverosByParamo/${valor}`,{
            //const respuesta = await fetch(`http://localhost:3000/getViverosByParamo/${valor}`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
        });
            
            const viveros = await respuesta.json();
            const viveroSelect = document.getElementById("vivero-id"); 
            viveroSelect.innerHTML=''; //Limpiar select primero
            const prueba = document.createElement("option");
            prueba.value = '';
            prueba.textContent = 'Seleccione';
                viveroSelect.appendChild(prueba);


            viveros.forEach(vivero => {
                const option = document.createElement("option");
                option.value = vivero.id;
                option.textContent = vivero.nombre;
                viveroSelect.appendChild(option);
            });
        });

    });

