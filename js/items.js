document.addEventListener("DOMContentLoaded", function() {
    const url = "https://japceibal.github.io/japflix_api/movies-data.json";

    // Variables para almacenar los datos de películas
    let moviesData = [];

    // Función para cargar los datos de películas
    function cargarDatosDePeliculas() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                moviesData = data;
             console.log ('Datos de peliculas cargados correctamente:', moviesData);
            })
            .catch(error => {
                console.error("Error al cargar los datos de las películas:", error);
            });
    }

    // Función para mostrar los resultados de la búsqueda
    function mostrarResultadosDeBusqueda(query) {
        // Limpiar resultados anteriores
        const lista = document.getElementById("lista");
        lista.innerHTML = "";

        // Filtrar películas que coincidan con la consulta
        const resultados = moviesData.filter(movie => {
            const textoBuscado = query.toLowerCase();
            const genres = typeof movie.genres === 'string' ? movie.genres.toLowerCase() : '';
            return (
                movie.title.toLowerCase().includes(textoBuscado) ||
                genres.includes(textoBuscado) ||
                movie.tagline.toLowerCase().includes(textoBuscado) ||
                movie.overview.toLowerCase().includes(textoBuscado)
            );
        });

        // Mostrar resultados en la página
        resultados.forEach(movie => {
            const itemLista = document.createElement("li");
            itemLista.className = "list-group-item";
            itemLista.innerHTML = `
                <h3>${movie.title}</h3>
                <p>${movie.tagline}</p>
                <p>Rating: ${convertirARatingEstrellas(movie.vote_average)}</p>
            `;
            lista.appendChild(itemLista);

            // Agregar evento de clic para mostrar detalles de la película
            itemLista.addEventListener("click", function() {
                mostrarTodasLasPeliculas(movie);
            });
        });
    }

    // Función para mostrar todas las películas
    function mostrarTodasLasPeliculas() {
        // Limpiar resultados anteriores
        const lista = document.getElementById("lista");
        lista.innerHTML = "";

        // Mostrar todas las películas
        moviesData.forEach(movie => {
            const itemLista = document.createElement("li");
            itemLista.className = "list-group-item";
            itemLista.innerHTML = `
                <h3>${movie.title}</h3>
                <p>${movie.tagline}</p>
                <p>Rating: ${convertirARatingEstrellas(movie.vote_average)}</p>
            `;
            lista.appendChild(itemLista);

            // Agregar evento de clic para mostrar detalles de la película
            itemLista.addEventListener("click", function() {
                mostrarDetallesPelicula(movie);
            });
        });
    }

    // Función para convertir el valor de vote_average a "estrellas"
    function convertirARatingEstrellas(voteAverage) {
        const estrellas = "&#9733;".repeat(Math.round(voteAverage / 2)); // Cada estrella representa 0.5 de puntuación
        return estrellas;
    }

    // Evento al presionar el botón de búsqueda
    const btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.addEventListener("click", function() {
        const inputBuscar = document.getElementById("inputBuscar");
        const query = inputBuscar.value.trim();

        // Verificar que se haya ingresado un valor en el campo de búsqueda
        if (query !== "") {
            mostrarResultadosDeBusqueda(query);
        } else {
            mostrarTodasLasPeliculas();
        }
    });

    // Cargar los datos de películas al inicio
    cargarDatosDePeliculas();
});
/*const MOVIES_URL = "https://japceibal.github.io/japflix_api/movies-data.json";

let moviesArray = [];

document.addEventListener("DOMContentLoaded", function () {
fetch(MOVIES_URL)
.then(response=> response.json())
.then (data =>{
  moviesArray = data;//moviesArray = resultObj.data.listaMovies;
  console.log(moviesArray);
  searchMovie();
})
.catch(error =>{
console.error('Error fetching data', error);
});

});


// Función para filtrar productos según lo que se escriba en la barra de búsqueda
function searchMovie() {
    let searchBar = document.getElementById("inputBuscar");
    if (searchBar){

    searchBar.addEventListener("input", function() {
        const input = searchBar.value.toLowerCase();

        let filteredMovie = moviesArray.filter(movie => {
            return movie.title.toLowerCase().includes(input) || 
                   movie.genres.some(genre => genre.name.toLowerCase().includes(input))
                   movie.tagline.toLowerCase().includes(input) || 
                   movie.vote_average.toString().toLowerCase().includes(input);
        });

        console.log(filteredMovie);
    });
}
}


function showFilteredItems(items) {
    console.log(items);
}*/