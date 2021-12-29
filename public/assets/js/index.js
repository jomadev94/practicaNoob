"use strict";
var Secciones;
(function (Secciones) {
    Secciones[Secciones["exclusivo"] = 0] = "exclusivo";
    Secciones[Secciones["favoritos"] = 1] = "favoritos";
    Secciones[Secciones["promocion"] = 2] = "promocion";
    Secciones[Secciones["contacto"] = 3] = "contacto";
})(Secciones || (Secciones = {}));
//FUNCTION NAVEGA A LA SIGUIENTE SECCION
function irSeccion(idSeccion) {
    const offsetTop = document.getElementById(idSeccion).offsetTop;
    scroll({
        top: offsetTop,
        behavior: "smooth",
    });
}
//COMMENT FLECHAS PARA PASAR A LA SIG SECCION
const flechasNavegacion = document.querySelectorAll(".principal__anuncio-flecha");
//EVENT CLICK FLECHA DE SECCION
flechasNavegacion.forEach((flecha, index) => {
    const elem = flecha;
    console.log(Secciones[index]);
    if (elem.tagName == "BUTTON") {
        elem.addEventListener("click", () => {
            irSeccion(Secciones[index]);
        });
    }
});
