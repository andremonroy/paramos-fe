//El código se ejecuta solo después de que todo el DOM haya sido completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    let bannerImages = [
        {
            "url": "imagenes/banner/carrusel1.webp",
            "nombre": "Banner 01",
            "descripcion": "MiniCooper"
        },
        {
            "url": "imagenes/banner/carrusel2.webp",
            "nombre": "Banner 02",
            "descripcion": "Enjoying"
        },
        {
            "url": "imagenes/banner/carrusel3.webp",
            "nombre": "Banner 03",
            "descripcion": "Family"
        },
        {
            "url": "imagenes/banner/carrusel4.webp",
            "nombre": "Banner 04",
            "descripcion": "On the road"
        },
        {
            "url": "imagenes/banner/carrusel5.webp",
            "nombre": "Banner 05",
            "descripcion": "Luxury"
        },
    ]

    // Creacion de variables 
    let atras = document.getElementById('atras');
    let adelante = document.getElementById('adelante');
    let imagen = document.getElementById('bannerImg');
    let puntos = document.getElementById('puntos');
    let texto = document.getElementById('bannerText');
    let actual = 0;

    // Inicialización del Carrusel
    posicionCarrusel();

    //  Ajuste del índice actual cuando se hace clic en los botones de "atrás" y "adelante"
    atras.addEventListener('click', function() {
        actual -= 1;
        if (actual == -1) {
            actual = bannerImages.length - 1;
        }
        actualizarCarrusel();
    });

    adelante.addEventListener('click', function() {
        actual += 1;
        if (actual == bannerImages.length) {
            actual = 0;
        }
        actualizarCarrusel();
    });

    // Actualiza la imagen y el texto del carrusel con la información de la imagen actual
    function actualizarCarrusel() {
        imagen.innerHTML = `<img class="main__banner2--carPhoto" src="${bannerImages[actual].url}" alt="imagen carrusel" loading="lazy">`;
        texto.innerHTML = `
            <h3>${bannerImages[actual].nombre}</h3>
            <p>${bannerImages[actual].descripcion}</p>
        `;
        posicionCarrusel();
    }

    // Negrita al punto de navegacion donde va la imagen seleccionada
    function posicionCarrusel() {
        puntos.innerHTML = "";
        for (let i = 0; i < bannerImages.length; i++) {
            if (i == actual) {
                puntos.innerHTML += '<p class="bold">.</p>';
            } else {
                puntos.innerHTML += '<p>.</p>';
            }
        }
    }
});

