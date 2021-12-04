//COMMENT FLECHAS PARA PASAR A LA SIG SECCION
const flechaSeccionPrincipal = document.querySelector(
  ".principal__anuncio-flecha"
);

//EVENT CLICK FLECHA DE SECCION
flechaSeccionPrincipal.addEventListener("click", () => {
  const offsetTop = document.getElementById("exclusivo").offsetTop;
  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
});
