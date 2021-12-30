"use strict";
var Secciones;
(function (Secciones) {
    Secciones[Secciones["exclusivo"] = 0] = "exclusivo";
    Secciones[Secciones["favoritos"] = 1] = "favoritos";
    Secciones[Secciones["promocion"] = 2] = "promocion";
    Secciones[Secciones["contacto"] = 3] = "contacto";
})(Secciones || (Secciones = {}));
//COMMENT FLECHAS PARA PASAR A LA SIG SECCION
const flechasNavegacion = document.querySelectorAll(".seccion-flecha");
//FUNCTION NAVEGA A LA SIGUIENTE SECCION
function irSeccion(idSeccion) {
    const offsetTop = document.getElementById(idSeccion).offsetTop;
    scroll({
        top: offsetTop,
        behavior: "smooth",
    });
}
//EVENT CLICK FLECHA DE SECCION
flechasNavegacion.forEach((flecha, index) => {
    const elem = flecha;
    if (elem.tagName == "BUTTON") {
        elem.addEventListener("click", () => {
            irSeccion(Secciones[index]);
        });
    }
});
const header = document.querySelector("header");
const seccionBreak = document.getElementById("principal");
const options = {
    rootMargin: "-80px"
};
const breakObserver = new IntersectionObserver((entries, breakObserver) => {
    entries.forEach((entry) => {
        header.classList.remove("header-secciones");
        if (!entry.isIntersecting) {
            header.classList.add("header-secciones");
        }
    });
}, options);
breakObserver.observe(seccionBreak);
