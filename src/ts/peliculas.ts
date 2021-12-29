//COMMENT CONSTANTES GLOBALES
const contenedorCarousel: HTMLElement = document.querySelector(
  ".exclusivo__carousel-box"
);

//COMMENT FLECHAS DE DESPLAZAMIENTO
const flechaExclusivoIzq: HTMLElement = document.querySelector(
  ".exclusivo__carousel-flecha-izq"
);
const flechaExclusivoDer: HTMLElement = document.querySelector(
  ".exclusivo__carousel-flecha-der"
);

//EVENT EVENTO FLECHA DER
flechaExclusivoDer.addEventListener("click", () => {
  contenedorCarousel.scrollLeft += contenedorCarousel.offsetWidth;
  const indicadorActivo: HTMLElement = document.querySelector(
    ".exclusivo__carousel-controles-activo"
  );
  if (indicadorActivo.nextSibling) {
    indicadorActivo.classList.remove("exclusivo__carousel-controles-activo");
    const next= indicadorActivo.nextSibling as HTMLElement;
    next.classList.add(
      "exclusivo__carousel-controles-activo"
    );
  }
});

//EVENT EVENTO FLECHA IZQ
flechaExclusivoIzq.addEventListener("click", () => {
  contenedorCarousel.scrollLeft -= contenedorCarousel.offsetWidth;
  const indicadorActivo = document.querySelector(
    ".exclusivo__carousel-controles-activo"
  );
  if (indicadorActivo.previousSibling) {
    indicadorActivo.classList.remove("exclusivo__carousel-controles-activo");
    const previous= indicadorActivo.previousSibling as HTMLElement;
    previous.classList.add(
      "exclusivo__carousel-controles-activo"
    );
  }
});

//FUNCTION OBTENER INFO PARA CAROUSEL
async function obtener(page: number = 1): Promise<Pelicula[]> {
  try {
    let consulta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=0e4768cf9bee14374dd0719259db1c61&language=es&page=${page}`
    );
    if (consulta.status == 200) {
      let dato:{results:Pelicula[]}= await consulta.json();
      return dato.results;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
}

//FUNCTION CARGAR IMAGENES DEL CAROUSEL
async function crearImgCarousel(page:number = 1):Promise<boolean> {
  try {
    const infoPelis = await obtener(page);
    if (infoPelis.length>0) {
      const contenedorImg = document.querySelector(
        ".exclusivo__carousel-content"
      );
      infoPelis.forEach((peli:Pelicula) => {
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
function paginacion():void{
  // ME GUARDO LOS ELEMENTOS NECESARIOS
  const peliculas = document.querySelectorAll(
    ".exclusivo__carousel-content-pelicula"
  );
  const numeroPaginas:number = Math.ceil(peliculas.length / 5);
  const indicadores = document.querySelector(".exclusivo__carousel-controles");

  // CREO LOS INDICADORES SEGUN LA CANTIDAD DE PAGINAS
  for (let index = 0; index < numeroPaginas; index++) {
    const elem = document.createElement("button");
    elem.setAttribute("value", index.toString());
    if (index === 0) {
      elem.classList.add("exclusivo__carousel-controles-activo");
    }
    indicadores.appendChild(elem);
  }

  // AÑADO UN EVENT LISTENER A TODOS LOS INDICADORES CREADOS
  indicadores.addEventListener("click", (event:Event) => {
    const target:HTMLButtonElement= event.target as HTMLButtonElement;
    if (target && target.tagName === "BUTTON") {
      document
        .querySelector(".exclusivo__carousel-controles-activo")
        .classList.remove("exclusivo__carousel-controles-activo");
      target.classList.add("exclusivo__carousel-controles-activo");
      const pag:number = parseInt(target.value);
      contenedorCarousel.scrollLeft = pag * contenedorCarousel.offsetWidth;
    }
  });
}

//FUNCTION INICIALIZAR UN CAROUSEL
async function init(page:number = 1) {
  try {
    const crearImg:boolean = await crearImgCarousel(page);
    if (crearImg) {
      paginacion();
    }
  } catch (error) {
    console.log("No se pudo inicializar la app");
  }
}

init();
