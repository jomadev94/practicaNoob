//COMMENT CONSTANTES GLOBALES
const contenedorCarousel: HTMLElement = document.querySelector(
  ".exclusivo__carousel-box"
);
const contenedorGrid: HTMLElement = document.querySelector(".favoritos__box");

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
  const indicadorActivo: HTMLElement = document.querySelector(".pagina-activa");
  if (indicadorActivo.nextSibling) {
    indicadorActivo.classList.remove("pagina-activa");
    const next = indicadorActivo.nextSibling as HTMLElement;
    next.classList.add("pagina-activa");
  }
});

//EVENT EVENTO FLECHA IZQ
flechaExclusivoIzq.addEventListener("click", () => {
  contenedorCarousel.scrollLeft -= contenedorCarousel.offsetWidth;
  const indicadorActivo = document.querySelector(".pagina-activa");
  if (indicadorActivo.previousSibling) {
    indicadorActivo.classList.remove("pagina-activa");
    const previous = indicadorActivo.previousSibling as HTMLElement;
    previous.classList.add("pagina-activa");
  }
});

//FUNCTION OBTENER INFO PARA CAROUSEL
async function obtener(page: number = 1): Promise<Pelicula[]> {
  try {
    let consulta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=0e4768cf9bee14374dd0719259db1c61&language=es&page=${page}`
    );
    if (consulta.status == 200) {
      let dato: { results: Pelicula[] } = await consulta.json();
      return dato.results;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
}

//FUNCTION CARGAR IMAGENES DEL CAROUSEL
async function crearImgCarousel(page: number = 1): Promise<boolean> {
  try {
    const infoPelis = await obtener(page);
    if (infoPelis.length > 0) {
      const contenedorImg = document.querySelector(
        ".exclusivo__carousel-content"
      );
      infoPelis.forEach((peli: Pelicula) => {
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

//FUNCTION CARGAR IMAGENES DEL GRID
async function crearImgGrid(
  page: number = 1,
  contenedor: HTMLElement,
  diferent: number = 9999999,
  max: number = 7
): Promise<boolean> {
  try {
    const infoPelis = await obtener(page);
    if (infoPelis.length > 0 && max <= infoPelis.length) {
      for (let index = 0; index < max; index++) {
        if (index === diferent) {
          addImgHTML(contenedor,"favoritos__item modified animate","favoritos__item-text modified",infoPelis,index);
          continue;
        }
        addImgHTML(contenedor,"favoritos__item animate","favoritos__item-text",infoPelis,index);
      }
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}

//FUNCTION ADD HTML IMG
function addImgHTML(
  contenedor: HTMLElement,
  claseContenedor: string,
  claseTexto:string,
  pelis: Pelicula[],
  index: number,
): void {
  contenedor.innerHTML += `
    <div class='${claseContenedor}'>
      <div class='${claseTexto}'><h3>${pelis[index].title}</h3></div>
      <img src='https://image.tmdb.org/t/p/original${pelis[index].poster_path}' alt='${pelis[index].title}'>
    </div>
  `;
}

//FUNCTION CREAR INDICADORES PARA LA PAGINACION
function paginacion(): void {
  // ME GUARDO LOS ELEMENTOS NECESARIOS
  const peliculas = document.querySelectorAll(
    ".exclusivo__carousel-content-pelicula"
  );
  const numeroPaginas: number = Math.ceil(peliculas.length / 5);
  const indicadores = document.querySelector(".exclusivo__carousel-paginacion");

  // CREO LOS INDICADORES SEGUN LA CANTIDAD DE PAGINAS
  for (let index = 0; index < numeroPaginas; index++) {
    const elem = document.createElement("button");
    elem.setAttribute("value", index.toString());
    if (index === 0) {
      elem.classList.add("pagina-activa");
    }
    indicadores.appendChild(elem);
  }

  // AÑADO UN EVENT LISTENER A TODOS LOS INDICADORES CREADOS
  indicadores.addEventListener("click", (event: Event) => {
    const target: HTMLButtonElement = event.target as HTMLButtonElement;
    if (target && target.tagName === "BUTTON") {
      document
        .querySelector(".pagina-activa")
        .classList.remove("pagina-activa");
      target.classList.add("pagina-activa");
      const pag: number = parseInt(target.value);
      contenedorCarousel.scrollLeft = pag * contenedorCarousel.offsetWidth;
    }
  });
}

//FUNCTION INICIALIZAR UN CAROUSEL
async function init(page: number = 1) {
  try {
    const crearImg: boolean = await crearImgCarousel(page);
    if (crearImg) {
      paginacion();
    }
  } catch (error) {
    console.log("No se pudo inicializar la app");
  }
}

//FUNCTION INICIALIZAR UN GRID
async function initGrid(page: number = 1,contenedor:HTMLElement, diferent:number) {
  try {
    const crearGrid: boolean = await crearImgGrid(page,contenedor,diferent);
    if (crearGrid) {
      const toAnimate: NodeList= document.querySelectorAll(".animate");
      toAnimate.forEach(
        (elem)=>{
          appearOnScroll.observe(elem as Element);
        }
      );
    }
  } catch (error) {
    console.log("No se pudo inicializar la app");
  }
}


init();
initGrid(3,contenedorGrid,1);

