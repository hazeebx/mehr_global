/* ==============================
   TESTIMONIALS
============================== */

const stack = document.querySelector(".testimonial-stack");

if (stack) {

    const cards = [...stack.querySelectorAll(".testimonial-card")];
    const loader = document.querySelector(".testimonial-loader");

    let currentIndex = 0;
    let paused = false;
    let autoCycle = null;


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
            opacity: 0.18,
            zIndex: 2
        },

        right: {
            x: 58,
            y: 8,
            scale: 0.88,
            rotation: 3,
            opacity: 0.18,
            zIndex: 2
        },

        back: {
            x: 0,
            y: 0,
            scale: 0.82,
            rotation: 0,
            opacity: 0,
            zIndex: 1
        }

    };


    /* ==============================
       CREATE / UPDATE DOTS
    ============================== */

    if (loader) {

        loader.innerHTML = "";

        cards.forEach((_, index) => {

            const dot = document.createElement("span");

            dot.setAttribute(
                "role",
                "button"
            );

            dot.setAttribute(
                "aria-label",
                `Show testimonial ${index + 1}`
            );

            dot.setAttribute(
                "tabindex",
                "0"
            );


            /* --------------------------
               CLICK
            -------------------------- */

            dot.addEventListener("click", () => {

                goTo(index);
                restartAutoCycle();

            });


            /* --------------------------
               KEYBOARD
            -------------------------- */

            dot.addEventListener("keydown", e => {

                if (
                    e.key === "Enter" ||
                    e.key === " "
                ) {

                    e.preventDefault();

                    goTo(index);
                    restartAutoCycle();

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

        if (!cards.length) {
            return "back";
        }

        const relative =
            (index - currentIndex + cards.length) % cards.length;


        /* FRONT */

        if (relative === 0) {
            return "front";
        }


        /* NEXT CARD */

        if (relative === 1) {
            return "right";
        }


        /* PREVIOUS CARD */

        if (relative === cards.length - 1) {
            return "left";
        }


        /* EVERYTHING ELSE */

        return "back";

    }


    /* ==============================
       RESET TILT
    ============================== */

    function resetTilt(card, duration = 0.35) {

        gsap.to(card, {

            rotateX: 0,
            rotateY: 0,

            duration,

            ease: "power2.out",

            overwrite: "auto"

        });

    }


    /* ==============================
       LAYOUT CARDS
    ============================== */

    function layoutCards(animated = true) {

        cards.forEach((card, index) => {

            const position = getPosition(index);
            const config = positions[position];


            /* --------------------------
               STOP ONLY POSITION TWEENS
            -------------------------- */

            gsap.killTweensOf(
                card,
                "x,y,scale,rotation,opacity"
            );


            /* --------------------------
               STACKING
            -------------------------- */

            card.style.zIndex = config.zIndex;


            /* --------------------------
               POINTER EVENTS
            -------------------------- */

            card.style.pointerEvents =
                position === "front"
                    ? "auto"
                    : "none";


            /* --------------------------
               RESET TILT
            -------------------------- */

            if (position !== "front") {

                resetTilt(card, animated ? 0.3 : 0);

            }


            /* --------------------------
               ANIMATE POSITION
            -------------------------- */

            gsap.to(card, {

                x: config.x,
                y: config.y,

                scale: config.scale,

                rotation: config.rotation,

                opacity: config.opacity,

                duration: animated
                    ? 0.55
                    : 0,

                ease: "power2.inOut",

                overwrite: "auto"

            });

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

        if (!cards.length) {
            return;
        }


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

        stopAutoCycle();


        autoCycle = gsap.delayedCall(
            AUTO_DELAY / 1000,
            () => {

                if (!paused) {

                    nextCard();

                }


                /*
                   Schedule the next cycle
                   after the current transition.
                */

                startAutoCycle();

            }
        );

    }


    /* ==============================
       STOP AUTO CYCLE
    ============================== */

    function stopAutoCycle() {

        if (autoCycle) {

            autoCycle.kill();
            autoCycle = null;

        }

    }


    /* ==============================
       RESTART AUTO CYCLE
    ============================== */

    function restartAutoCycle() {

        if (paused) {
            return;
        }

        startAutoCycle();

    }





    /* ==============================
       CARD TILT
    ============================== */

    cards.forEach(card => {


        /* --------------------------
           MOUSE MOVE
        -------------------------- */

        card.addEventListener(
            "mousemove",
            e => {

                const index =
                    cards.indexOf(card);


                /*
                   Only the active card
                   responds to the mouse.
                */

                if (index !== currentIndex) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    (
                        e.clientX -
                        rect.left -
                        rect.width / 2
                    ) / 25;


                const y =
                    (
                        e.clientY -
                        rect.top -
                        rect.height / 2
                    ) / 25;


                gsap.to(card, {

                    rotateY: x,
                    rotateX: -y,

                    duration: 0.25,

                    ease: "power2.out",

                    overwrite: "auto"

                });

            }
        );


        /* --------------------------
           MOUSE LEAVE
        -------------------------- */

        card.addEventListener(
            "mouseleave",
            () => {

                resetTilt(card, 0.4);

            }
        );

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
        document.querySelector(
            ".testimonial-next"
        );

    const previousButton =
        document.querySelector(
            ".testimonial-prev"
        );


    /* --------------------------
       NEXT
    -------------------------- */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                nextCard();
                restartAutoCycle();

            }
        );

    }


    /* --------------------------
       PREVIOUS
    -------------------------- */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                previousCard();
                restartAutoCycle();

            }
        );

    }

}