enum Secciones {
  "exclusivo",
  "favoritos",
  "promocion",
  "contacto",
}

//COMMENT FLECHAS PARA PASAR A LA SIG SECCION
const flechasNavegacion: NodeList =
  document.querySelectorAll(".seccion-flecha");

//FUNCTION NAVEGA A LA SIGUIENTE SECCION
function irSeccion(idSeccion: string): void {
  const offsetTop: number = document.getElementById(idSeccion).offsetTop;
  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

//EVENT CLICK FLECHA DE SECCION
flechasNavegacion.forEach((flecha, index) => {
  const elem = flecha as HTMLElement;
  if (elem.tagName == "BUTTON") {
    elem.addEventListener("click", () => {
      irSeccion(Secciones[index]);
    });
  }
});

const header: HTMLElement = document.querySelector("header");
const seccionBreak: HTMLElement = document.getElementById("principal");
const options = {
  rootMargin:"-80px"
};

const breakObserver: IntersectionObserver = new IntersectionObserver(
  (entries, breakObserver) => {
    entries.forEach((entry) => {
      header.classList.remove("header-secciones");
      if(!entry.isIntersecting){
        header.classList.add("header-secciones");
      }
    });
  },
  options
);

breakObserver.observe(seccionBreak);
