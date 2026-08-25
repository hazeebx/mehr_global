/* ==============================
   TESTIMONIALS
============================== */

const stack = document.querySelector(".testimonial-stack");

if (stack) {

    const cards = [...stack.querySelectorAll(".testimonial-card")];
    const loader = document.querySelector(".testimonial-loader");

    let currentIndex = 0;
    let paused = false;
    let autoCycle;


    /* ==============================
       SETTINGS
    ============================== */

    const AUTO_DELAY = 4000;

    const positions = {

        front: {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            zIndex: 4
        },

        left: {
            x: -58,
            y: 8,
            scale: 0.88,
            rotation: -3,
            opacity: 0.28,
            zIndex: 3
        },

        right: {
            x: 58,
            y: 8,
            scale: 0.88,
            rotation: 3,
            opacity: 0.28,
            zIndex: 3
        },

        back: {
            x: 0,
            y: 4,
            scale: 0.82,
            rotation: 0,
            opacity: 0,
            zIndex: 2
        }

    };


    /* ==============================
       CREATE / UPDATE DOTS
    ============================== */

    if (loader) {

        loader.innerHTML = "";

        cards.forEach((_, index) => {

            const dot = document.createElement("span");

            dot.setAttribute("role", "button");
            dot.setAttribute("aria-label", `Show testimonial ${index + 1}`);
            dot.setAttribute("tabindex", "0");

            dot.addEventListener("click", () => {

                goTo(index);

            });

            dot.addEventListener("keydown", e => {

                if (e.key === "Enter" || e.key === " ") {

                    e.preventDefault();

                    goTo(index);

                }

            });

            loader.appendChild(dot);

        });

    }


    const dots = loader
        ? [...loader.querySelectorAll("span")]
        : [];


    /* ==============================
       GET CIRCULAR POSITION
    ============================== */

    function getPosition(index) {

        if (!cards.length) return "back";

        const relative =
            (index - currentIndex + cards.length) % cards.length;

        if (relative === 0) return "front";

        if (relative === 1) return "right";

        if (relative === cards.length - 1) return "left";

        return "back";

    }


    /* ==============================
       LAYOUT CARDS
    ============================== */

    function layoutCards(animated = true) {

        cards.forEach((card, index) => {

            const position = getPosition(index);
            const config = positions[position];

            gsap.to(card, {

                x: config.x,
                y: config.y,

                scale: config.scale,

                rotation: config.rotation,

                opacity: config.opacity,

                duration: animated ? 0.65 : 0,

                ease: "power3.inOut",

                overwrite: true

            });

            card.style.zIndex = config.zIndex;

            card.style.pointerEvents =
                position === "front"
                    ? "auto"
                    : "none";

        });


        updateDots();

    }


    /* ==============================
       DOT STATE
    ============================== */

    function updateDots() {

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }


    /* ==============================
       GO TO TESTIMONIAL
    ============================== */

    function goTo(index) {

        if (!cards.length) return;

        currentIndex =
            (index + cards.length) % cards.length;

        layoutCards(true);

    }


    /* ==============================
       NEXT / PREVIOUS
    ============================== */

    function nextCard() {

        goTo(currentIndex + 1);

    }


    function previousCard() {

        goTo(currentIndex - 1);

    }


    /* ==============================
       AUTO CYCLE
    ============================== */

    function startAutoCycle() {

        clearInterval(autoCycle);

        autoCycle = setInterval(() => {

            if (!paused) {

                nextCard();

            }

        }, AUTO_DELAY);

    }


    /* ==============================
       PAUSE ON HOVER
    ============================== */

    stack.addEventListener("mouseenter", () => {

        paused = true;

    });


    stack.addEventListener("mouseleave", () => {

        paused = false;

    });


    /* ==============================
       CARD TILT
    ============================== */

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const index = cards.indexOf(card);

            if (index !== currentIndex) return;

            const rect = card.getBoundingClientRect();

            const x =
                (e.clientX - rect.left - rect.width / 2) / 25;

            const y =
                (e.clientY - rect.top - rect.height / 2) / 25;

            gsap.to(card, {

                rotateY: x,
                rotateX: -y,

                duration: 0.3,

                ease: "power2.out",

                overwrite: true

            });

        });


        card.addEventListener("mouseleave", () => {

            gsap.to(card, {

                rotateX: 0,
                rotateY: 0,

                duration: 0.45,

                ease: "power2.out"

            });

        });

    });


    /* ==============================
       INITIAL STATE
    ============================== */

    layoutCards(false);

    startAutoCycle();


    /* ==============================
       OPTIONAL ARROW CONTROLS
    ============================== */

    const nextButton =
        document.querySelector(".testimonial-next");

    const previousButton =
        document.querySelector(".testimonial-prev");


    if (nextButton) {

        nextButton.addEventListener("click", nextCard);

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousCard
        );

    }

}