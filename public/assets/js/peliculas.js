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
//COMMENT FLECHAS DE DESPLAZAMIENTO
const flechaExclusivoIzq = document.querySelector(".exclusivo__carousel-flecha-izq");
const flechaExclusivoDer = document.querySelector(".exclusivo__carousel-flecha-der");
//EVENT EVENTO FLECHA DER
flechaExclusivoDer.addEventListener("click", () => {
    contenedorCarousel.scrollLeft += contenedorCarousel.offsetWidth;
    const indicadorActivo = document.querySelector(".exclusivo__carousel-controles-activo");
    if (indicadorActivo.nextSibling) {
        indicadorActivo.classList.remove("exclusivo__carousel-controles-activo");
        const next = indicadorActivo.nextSibling;
        next.classList.add("exclusivo__carousel-controles-activo");
    }
});
//EVENT EVENTO FLECHA IZQ
flechaExclusivoIzq.addEventListener("click", () => {
    contenedorCarousel.scrollLeft -= contenedorCarousel.offsetWidth;
    const indicadorActivo = document.querySelector(".exclusivo__carousel-controles-activo");
    if (indicadorActivo.previousSibling) {
        indicadorActivo.classList.remove("exclusivo__carousel-controles-activo");
        const previous = indicadorActivo.previousSibling;
        previous.classList.add("exclusivo__carousel-controles-activo");
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
//FUNCTION CREAR INDICADORES PARA LA PAGINACION
function paginacion() {
    // ME GUARDO LOS ELEMENTOS NECESARIOS
    const peliculas = document.querySelectorAll(".exclusivo__carousel-content-pelicula");
    const numeroPaginas = Math.ceil(peliculas.length / 5);
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
    indicadores.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.tagName === "BUTTON") {
            document
                .querySelector(".exclusivo__carousel-controles-activo")
                .classList.remove("exclusivo__carousel-controles-activo");
            target.classList.add("exclusivo__carousel-controles-activo");
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
init();
