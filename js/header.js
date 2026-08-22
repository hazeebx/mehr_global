const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 120) {

        header.classList.add("compact");

    } else {

        header.classList.remove("compact");

    }

});

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuClose = document.querySelector(".mobile-menu-close");

mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
});

mobileMenuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
});