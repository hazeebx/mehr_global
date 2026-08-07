document
    .querySelectorAll(".evolution_card, .evolution_feature")
    .forEach(el => el.classList.add("reveal"));

const io = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");
            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(".reveal").forEach(el => io.observe(el));