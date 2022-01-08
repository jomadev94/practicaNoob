"use strict";
const header = document.querySelector("header");
const seccionBreak = document.getElementById("principal");
const toAnimate = document.querySelectorAll(".animate");
const letters = document.querySelector(".promocion__anuncio-oferta-down");
const cards = document.querySelector(".dispositivos__box");
cards.addEventListener("click", (event) => {
    const element = event.target;
    console.log(element);
    if (element && element.classList.contains("dispositivos__box-card")) {
        console.log("ieeeeepaaaa");
    }
});
letters.addEventListener("mouseover", (event) => {
    const element = event.target;
    if (element && element.tagName === "SPAN") {
        element.classList.add("toAnimate");
        setTimeout(() => {
            element.classList.remove("toAnimate");
        }, 1500);
    }
});
const options = {
    rootMargin: "-80px"
};
const optionsAppear = {
    // threshold:.6,
    rootMargin: "-140px"
};
const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach((entry) => {
        entry.target.classList.add("appear");
        if (!entry.isIntersecting) {
            entry.target.classList.remove("appear");
        }
        // appearOnScroll.unobserve(entry.target);
    });
}, optionsAppear);
toAnimate.forEach((elem) => {
    appearOnScroll.observe(elem);
});
const breakObserver = new IntersectionObserver((entries, breakObserver) => {
    entries.forEach((entry) => {
        header.classList.remove("header-secciones");
        if (!entry.isIntersecting) {
            header.classList.add("header-secciones");
        }
    });
}, options);
breakObserver.observe(seccionBreak);
