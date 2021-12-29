enum Secciones{
  "exclusivo",
  "favoritos",
  "promocion",
  "contacto",
}

//FUNCTION NAVEGA A LA SIGUIENTE SECCION
function irSeccion(idSeccion:string):void{
  const offsetTop:number = document.getElementById(idSeccion).offsetTop;
  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

//COMMENT FLECHAS PARA PASAR A LA SIG SECCION
const flechasNavegacion: NodeList = document.querySelectorAll(
  ".principal__anuncio-flecha"
);

//EVENT CLICK FLECHA DE SECCION
flechasNavegacion.forEach((flecha,index)=>{
  const elem=flecha as HTMLElement;
  console.log(Secciones[index]);
  if(elem.tagName =="BUTTON"){
    elem.addEventListener("click",()=>{
      irSeccion(Secciones[index]);
    })
  }
}); 

