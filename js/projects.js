/* ==============================
PROJECTS CAROUSEL
============================== */

const projectsTrack =
    document.querySelector(".projects-track");

const projectsSlides =
    document.querySelectorAll(".project-slide");

const projectsPrev =
    document.querySelector(".project-prev");

const projectsNext =
    document.querySelector(".project-next");

const projectsCurrent =
    document.querySelector(".projects-current");

const projectsTotal =
    document.querySelector(".projects-total");


if (
    projectsTrack &&
    projectsSlides.length &&
    projectsPrev &&
    projectsNext
) {

    let currentIndex = 0;


    /* ==============================
    TOTAL
    ============================== */

    projectsTotal.textContent =
        String(projectsSlides.length)
            .padStart(2, "0");


    /* ==============================
    UPDATE
    ============================== */

    function updateProjects() {

        const slide =
            projectsSlides[currentIndex];

        const slideWidth =
            slide.offsetWidth;

        const gap =
            parseFloat(
                getComputedStyle(
                    projectsTrack
                ).gap
            );


        projectsTrack.style.transform =
            `translateX(-${
                currentIndex *
                (slideWidth + gap)
            }px)`;


        projectsCurrent.textContent =
            String(currentIndex + 1)
                .padStart(2, "0");


        projectsPrev.disabled =
            currentIndex === 0;

        projectsNext.disabled =
            currentIndex ===
            projectsSlides.length - 1;

    }


    /* ==============================
    NEXT
    ============================== */

    projectsNext.addEventListener(
        "click",
        () => {

            if (
                currentIndex <
                projectsSlides.length - 1
            ) {

                currentIndex++;

                updateProjects();

            }

        }
    );


    /* ==============================
    PREVIOUS
    ============================== */

    projectsPrev.addEventListener(
        "click",
        () => {

            if (currentIndex > 0) {

                currentIndex--;

                updateProjects();

            }

        }
    );


    /* ==============================
    RESIZE
    ============================== */

    window.addEventListener(
        "resize",
        updateProjects
    );


    /* ==============================
    INITIALIZE
    ============================== */

    updateProjects();

}