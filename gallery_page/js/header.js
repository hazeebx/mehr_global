const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 120) {

        header.classList.add("compact");

    } else {

        header.classList.remove("compact");

    }

});
