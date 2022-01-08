"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//COMMENT CONSTANTES GLOBALES
const contenedorCarousel = document.querySelector(".exclusivo__carousel-box");
const contenedorGrid = document.querySelector(".favoritos__box");
//COMMENT FLECHAS DE DESPLAZAMIENTO
const flechaExclusivoIzq = document.querySelector(".exclusivo__carousel-flecha-izq");
const flechaExclusivoDer = document.querySelector(".exclusivo__carousel-flecha-der");
//EVENT EVENTO FLECHA DER
flechaExclusivoDer.addEventListener("click", () => {
    contenedorCarousel.scrollLeft += contenedorCarousel.offsetWidth;
    const indicadorActivo = document.querySelector(".pagina-activa");
    if (indicadorActivo.nextSibling) {
        indicadorActivo.classList.remove("pagina-activa");
        const next = indicadorActivo.nextSibling;
        next.classList.add("pagina-activa");
    }
});
//EVENT EVENTO FLECHA IZQ
flechaExclusivoIzq.addEventListener("click", () => {
    contenedorCarousel.scrollLeft -= contenedorCarousel.offsetWidth;
    const indicadorActivo = document.querySelector(".pagina-activa");
    if (indicadorActivo.previousSibling) {
        indicadorActivo.classList.remove("pagina-activa");
        const previous = indicadorActivo.previousSibling;
        previous.classList.add("pagina-activa");
    }
});
//FUNCTION OBTENER INFO PARA CAROUSEL
function obtener(page = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let consulta = yield fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0e4768cf9bee14374dd0719259db1c61&language=es&page=${page}`);
            if (consulta.status == 200) {
                let dato = yield consulta.json();
                return dato.results;
            }
            return [];
        }
        catch (error) {
            console.log(error);
        }
    });
}
//FUNCTION CARGAR IMAGENES DEL CAROUSEL
function crearImgCarousel(page = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const infoPelis = yield obtener(page);
            if (infoPelis.length > 0) {
                const contenedorImg = document.querySelector(".exclusivo__carousel-content");
                infoPelis.forEach((peli) => {
                    contenedorImg.innerHTML += `
            <div class='exclusivo__carousel-content-pelicula'>
              <img src='https://image.tmdb.org/t/p/original${peli.poster_path}' alt='${peli.title}'>
            </div>
          `;
                });
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(error);
        }
    });
}
//FUNCTION CARGAR IMAGENES DEL GRID
function crearImgGrid(page = 1, contenedor, diferent = 9999999, max = 7) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const infoPelis = yield obtener(page);
            if (infoPelis.length > 0 && max <= infoPelis.length) {
                for (let index = 0; index < max; index++) {
                    if (index === diferent) {
                        addImgHTML(contenedor, "favoritos__item modified animate", "favoritos__item-text modified", infoPelis, index);
                        continue;
                    }
                    addImgHTML(contenedor, "favoritos__item animate", "favoritos__item-text", infoPelis, index);
                }
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(error);
        }
    });
}
//FUNCTION ADD HTML IMG
function addImgHTML(contenedor, claseContenedor, claseTexto, pelis, index) {
    contenedor.innerHTML += `
    <div class='${claseContenedor}'>
      <div class='${claseTexto}'><h3>${pelis[index].title}</h3></div>
      <img src='https://image.tmdb.org/t/p/original${pelis[index].poster_path}' alt='${pelis[index].title}'>
    </div>
  `;
}
//FUNCTION CREAR INDICADORES PARA LA PAGINACION
function paginacion() {
    // ME GUARDO LOS ELEMENTOS NECESARIOS
    const peliculas = document.querySelectorAll(".exclusivo__carousel-content-pelicula");
    const numeroPaginas = Math.ceil(peliculas.length / 5);
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
    indicadores.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.tagName === "BUTTON") {
            document
                .querySelector(".pagina-activa")
                .classList.remove("pagina-activa");
            target.classList.add("pagina-activa");
            const pag = parseInt(target.value);
            contenedorCarousel.scrollLeft = pag * contenedorCarousel.offsetWidth;
        }
    });
}
//FUNCTION INICIALIZAR UN CAROUSEL
function init(page = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const crearImg = yield crearImgCarousel(page);
            if (crearImg) {
                paginacion();
            }
        }
        catch (error) {
            console.log("No se pudo inicializar la app");
        }
    });
}
//FUNCTION INICIALIZAR UN GRID
function initGrid(page = 1, contenedor, diferent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const crearGrid = yield crearImgGrid(page, contenedor, diferent);
            if (crearGrid) {
                const toAnimate = document.querySelectorAll(".animate");
                toAnimate.forEach((elem) => {
                    appearOnScroll.observe(elem);
                });
            }
        }
        catch (error) {
            console.log("No se pudo inicializar la app");
        }
    });
}
init();
initGrid(3, contenedorGrid, 1);
