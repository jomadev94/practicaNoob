
//COMMENT CONSTANTES GLOBALES
const contenedorCarousel = document.querySelector(".exclusivo__carousel-box");

//COMMENT FLECHAS DE DESPLAZAMIENTO
const flechaExclusivoIzq = document.querySelector(
  ".exclusivo__carousel-flecha-izq"
);
const flechaExclusivoDer = document.querySelector(
  ".exclusivo__carousel-flecha-der"
);

//EVENT EVENTO FLECHA DER
flechaExclusivoDer.addEventListener("click", () => {
  contenedorCarousel.scrollLeft += contenedorCarousel.offsetWidth;
  const indicadorActivo = document.querySelector(
    ".exclusivo__controles-carousel-activo"
  );
  if (indicadorActivo.nextSibling) {
    indicadorActivo.classList.remove("exclusivo__controles-carousel-activo");
    indicadorActivo.nextSibling.classList.add(
      "exclusivo__controles-carousel-activo"
    );
  }
});

//EVENT EVENTO FLECHA IZQ
flechaExclusivoIzq.addEventListener("click", () => {
  contenedorCarousel.scrollLeft -= contenedorCarousel.offsetWidth;
  const indicadorActivo = document.querySelector(
    ".exclusivo__controles-carousel-activo"
  );
  if (indicadorActivo.previousSibling) {
    indicadorActivo.classList.remove("exclusivo__controles-carousel-activo");
    indicadorActivo.previousSibling.classList.add(
      "exclusivo__controles-carousel-activo"
    );
  }
});

//FUNCTION OBTENER INFO PARA CAROUSEL
const obtener = async (page = 1) => {
  try {
    let consulta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=0e4768cf9bee14374dd0719259db1c61&language=es&page=${page}`
    );
    if (consulta.ok) {
      console.log("Se obtuvo una respuesta");
      let dato = consulta.json();
      return dato;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

//FUNCTION CARGAR IMAGENES DEL CAROUSEL
async function crearImgCarousel(page = 1) {
  try {
    const contenedorImg = document.querySelector(
      ".exclusivo__carousel-content"
    );
    contenedorImg.innerHTML ="<p>Loading...<p>"
    const infoPelis = await obtener(page);
    if (infoPelis) {
      contenedorImg.firstChild.remove();
      infoPelis.results.forEach((peli) => {
        contenedorImg.innerHTML += `
            <div class='exclusivo__carousel-content-pelicula'>
                <img src='https://image.tmdb.org/t/p/original${peli.poster_path}' alt='${peli.title}'>
            </div>
          `;
      });
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}

//FUNCTION CREAR INDICADORES PARA LA PAGINACION
function paginacion() {
  // ME GUARDO LOS ELEMENTOS NECESARIOS
  const peliculas = document.querySelectorAll(
    ".exclusivo__carousel-content-pelicula"
  );
  const numeroPaginas = Math.ceil(peliculas.length / 5);
  const indicadores = document.querySelector(".exclusivo__controles-carousel");

  // CREO LOS INDICADORES SEGUN LA CANTIDAD DE PAGINAS
  for (let index = 0; index < numeroPaginas; index++) {
    const elem = document.createElement("button");
    elem.setAttribute("value", index);
    if (index === 0) {
      elem.classList.add("exclusivo__controles-carousel-activo");
    }
    indicadores.appendChild(elem);
  }

  // AÑADO UN EVENT LISTENER A TODOS LOS INDICADORES CREADOS
  indicadores.addEventListener("click", (event) => {
    if (event.target && event.target.tagName === "BUTTON") {
      document
        .querySelector(".exclusivo__controles-carousel-activo")
        .classList.remove("exclusivo__controles-carousel-activo");
      event.target.classList.add("exclusivo__controles-carousel-activo");
      const pag = event.target.value;
      contenedorCarousel.scrollLeft = pag * contenedorCarousel.offsetWidth;
    }
  });
}

//FUNCTION INICIALIZAR UN CAROUSEL
async function init(page = 1) {
  try {
    const crearImg = await crearImgCarousel(page);
    if (crearImg) {
      paginacion();
    }
  } catch (error) {
    console.log("No se pudo inicializar la app");
  }
}

init();
