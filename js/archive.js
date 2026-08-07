const archiveObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("archive_show");
            archiveObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

document
    .querySelectorAll(".archive_reveal")
    .forEach(section => archiveObserver.observe(section));