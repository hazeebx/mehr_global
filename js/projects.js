/* ==============================
PROJECTS CAROUSEL
============================== */

const projectsTrack =
    document.querySelector(".projects-track");

const projectsViewport =
    document.querySelector(".projects-viewport");

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
    projectsViewport &&
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

    function getCarouselState() {
        const slideWidth = projectsSlides[0].offsetWidth;
        const gap =
            parseFloat(
                getComputedStyle(
                    projectsTrack
                ).gap
            );


        const visibleSlides = Math.max(
            1,
            Math.floor(
                (projectsViewport.clientWidth + gap) /
                (slideWidth + gap)
            )
        );

        const maxIndex = Math.max(
            0,
            projectsSlides.length - visibleSlides
        );

        return {
            slideWidth,
            gap,
            maxIndex
        };
    }


    function updateProjects() {

        const {
            slideWidth,
            gap,
            maxIndex
        } = getCarouselState();

        currentIndex = Math.min(currentIndex, maxIndex);

        projectsTrack.style.transform =
            `translateX(-${currentIndex * (slideWidth + gap)}px)`;


        projectsCurrent.textContent =
            String(currentIndex + 1)
                .padStart(2, "0");


        projectsPrev.disabled =
            currentIndex === 0;

        projectsNext.disabled = currentIndex === maxIndex;

    }


    /* ==============================
    NEXT
    ============================== */

    projectsNext.addEventListener(
        "click",
        () => {

            if (
                currentIndex <
                getCarouselState().maxIndex
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


/* ==============================
PROJECT IMAGE LIGHTBOX
============================== */

const projectsLightbox =
    document.getElementById("projectsLightbox");

const projectsLightboxImage =
    projectsLightbox?.querySelector(".projects-lightbox-image");

const projectsLightboxCaption =
    projectsLightbox?.querySelector(".projects-lightbox-caption");

const projectsLightboxClose =
    projectsLightbox?.querySelector(".projects-lightbox-close");


if (
    projectsLightbox &&
    projectsLightboxImage &&
    projectsLightboxCaption &&
    projectsLightboxClose
) {

    let activeProjectSlide = null;

    const closeLightbox = () => {

        projectsLightbox.classList.remove("is-open");
        projectsLightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("projects-lightbox-open");

        activeProjectSlide?.focus();
    };

    const openLightbox = slide => {

        const image = slide.querySelector("img");

        if (!image) return;

        activeProjectSlide = slide;
        projectsLightboxImage.src = image.currentSrc || image.src;
        projectsLightboxImage.alt = image.alt;
        projectsLightboxCaption.textContent = image.alt;
        projectsLightbox.classList.add("is-open");
        projectsLightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("projects-lightbox-open");
        projectsLightboxClose.focus();
    };

    projectsSlides.forEach(slide => {

        const image = slide.querySelector("img");

        if (!image) return;

        slide.tabIndex = 0;
        slide.setAttribute("role", "button");
        slide.setAttribute(
            "aria-label",
            `Expand ${image.alt}`
        );

        slide.addEventListener("click", () => openLightbox(slide));

        slide.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();
                openLightbox(slide);
            }
        });
    });

    projectsLightboxClose.addEventListener("click", closeLightbox);

    projectsLightbox.addEventListener("click", event => {

        if (event.target === projectsLightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            projectsLightbox.classList.contains("is-open")
        ) {
            closeLightbox();
        }
    });
}
