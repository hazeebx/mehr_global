/* ===========================
   SERVICES RADIAL ANIMATION
=========================== */

const services = document.querySelector(".services");
const title = document.querySelector(".services-title");
const cards = document.querySelectorAll(".service-card");

/* ---------- Calculate radial offsets ---------- */

function setupAnimations() {

    const section = services.getBoundingClientRect();

    const centerX = section.left + section.width / 2;
    const centerY = section.top + section.height / 2;

    // Cards
    cards.forEach(card => {

        const rect = card.getBoundingClientRect();

        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;

        let dx = cardX - centerX;
        let dy = cardY - centerY;

        const length = Math.hypot(dx, dy) || 1;

        dx /= length;
        dy /= length;

        const distance = 500;

        card.style.setProperty("--tx", `${dx * distance}px`);
        card.style.setProperty("--ty", `${dy * distance}px`);

    });

    // Title
    const titleRect = title.getBoundingClientRect();

    let tx = titleRect.left + titleRect.width / 2 - centerX;
    let ty = titleRect.top + titleRect.height / 2 - centerY;

    const tLength = Math.hypot(tx, ty) || 1;

    tx /= tLength;
    ty /= tLength;

    const titleDistance = 180;

    title.style.setProperty("--tx", `${tx * titleDistance}px`);
    title.style.setProperty("--ty", `${ty * titleDistance}px`);

}

window.addEventListener("load", setupAnimations);
window.addEventListener("resize", setupAnimations);

/* ---------- Scroll Animation ---------- */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            title.classList.add("show");

            cards.forEach((card, i) => {

                setTimeout(() => {
                    card.classList.add("show");
                }, i * 100);

            });

        } else {

            title.classList.remove("show");

            cards.forEach(card => {
                card.classList.remove("show");
            });

        }

    });

}, {
    threshold: 0.35
});

observer.observe(services);