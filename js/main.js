const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

/* En esta seccion busco que al tocar fuera del nav el mismo se cierre solo.*/

document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.nav');
    const abrirMenu = document.querySelector('.abrir-menu');

    document.addEventListener('click', function (event) {
        const isNavClicked = nav.contains(event.target);
        const isAbrirMenuClicked = abrirMenu.contains(event.target);

        if (!isNavClicked && !isAbrirMenuClicked) {
            nav.classList.remove('visible');
        }
    });

    abrirMenu.addEventListener('click', function () {
        nav.classList.add('visible');
    });
});




