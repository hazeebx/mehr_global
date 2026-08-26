document.addEventListener("DOMContentLoaded", () => {

    const loader =
        document.getElementById("loader");


    // ==========================
    // CHECK IF LOADER WAS ALREADY SHOWN
    // ==========================

    if (sessionStorage.getItem("mehrLoaderShown")) {

        if (loader) {
            loader.remove();
        }

        document.body.style.overflow = "";

        return;
    }

    // Mark loader as shown for this browser session
    sessionStorage.setItem("mehrLoaderShown", "true");


    const skipLoader =
        document.querySelector(".skip-loader");

    let loaderSkipped = false;

    const words =
        gsap.utils.toArray(".loader-word");

    const initials =
        words.map(
            word => word.querySelector(".initial")
        );

    const finalLetters =
        gsap.utils.toArray(".mehr-final span");

    const finalMark =
        document.querySelector(".mehr-final");


    // ==========================
    // INITIAL POSITIONS
    // ==========================

    gsap.set(words[0], {
        x: -180,
        opacity: 0
    });

    gsap.set(words[1], {
        x: 180,
        opacity: 0
    });

    gsap.set(words[2], {
        x: -180,
        opacity: 0
    });

    gsap.set(words[3], {
        x: 180,
        opacity: 0
    });


    // ==========================
    // FINAL MEHR
    // ==========================

    gsap.set(finalMark, {
        opacity: 0
    });

    gsap.set(finalLetters, {
        opacity: 0
    });


    // ==========================
    // TIMELINE
    // ==========================

    const tl =
        gsap.timeline();


    // ==========================
    // SKIP LOADER
    // ==========================

    if (skipLoader) {

        gsap.to(skipLoader, {
            opacity: 1,
            duration: 0.5,
            delay: 0.1,
            ease: "power2.out"
        });

    }


    function skipLoaderAnimation() {

        if (loaderSkipped || !loader) return;

        loaderSkipped = true;

        tl.kill();


        if (skipLoader) {

            gsap.to(skipLoader, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.out"
            });

        }


        gsap.to(loader, {

            opacity: 0,

            duration: 0.6,

            ease: "power2.inOut",

            onComplete: () => {

                loader.remove();

                document.body.style.overflow = "";

                document.removeEventListener(
                    "click",
                    skipLoaderAnimation
                );

                document.removeEventListener(
                    "touchstart",
                    skipLoaderAnimation
                );

            }

        });

    }


    document.addEventListener(
        "click",
        skipLoaderAnimation
    );

    document.addEventListener(
        "touchstart",
        skipLoaderAnimation
    );


    // ==========================
    // 1. WORDS SLIDE IN
    // ==========================

    tl.to(words[0], {

        x: 0,
        opacity: 1,
        duration: 0.4225,
        ease: "power3.out"

    })

    .to(words[1], {

        x: 0,
        opacity: 1,
        duration: 0.4225,
        ease: "power3.out"

    }, "+=0.078")

    .to(words[2], {

        x: 0,
        opacity: 1,
        duration: 0.4225,
        ease: "power3.out"

    }, "+=0.078")

    .to(words[3], {

        x: 0,
        opacity: 1,
        duration: 0.4225,
        ease: "power3.out"

    }, "+=0.078");


    // ==========================
    // 2. BREATH
    // ==========================

    tl.to({}, {

        duration: 0.2925

    });


    // ==========================
    // 3. HIGHLIGHT M / E / H / R
    // ==========================

    tl.call(() => {

        words.forEach(word => {

            word.classList.add("highlight");

        });

    });


    tl.to({}, {

        duration: 0.3575

    });


    // ==========================
    // 4. CALCULATE FINAL POSITIONS
    // ==========================

    tl.call(() => {

        initials.forEach((initial, index) => {

            const start =
                initial.getBoundingClientRect();

            const target =
                finalLetters[index]
                    .getBoundingClientRect();


            const startX =
                start.left +
                start.width / 2;

            const startY =
                start.top +
                start.height / 2;

            const targetX =
                target.left +
                target.width / 2;

            const targetY =
                target.top +
                target.height / 2;


            initial.dataset.x =
                targetX - startX;

            initial.dataset.y =
                targetY - startY;

            initial.dataset.scale =
                target.height /
                start.height;

        });

    })


    // ==========================
    // 5. MOVE ORIGINAL INITIALS
    // ==========================

    .call(() => {

        initials.forEach((initial, index) => {

            const x =
                Number(initial.dataset.x);

            const y =
                Number(initial.dataset.y);

            const scale =
                Number(initial.dataset.scale);


            gsap.to(initial, {

                x: x,
                y: y,
                scale: scale,

                duration: 0.585,

                delay: index * 0.039,

                ease: "power3.inOut"

            });

        });

    })


    // ==========================
    // 6. FADE REMAINING WORDS
    // ==========================

    .to(

        words.map(word =>
            word.querySelector(
                "span:not(.initial)"
            )
        ),

        {

            opacity: 0,

            duration: 0.26,

            stagger: 0.0325,

            ease: "power2.out"

        }

    );


    // ==========================
    // 7. MEHR BREATH
    // ==========================

    tl.to({}, {

        duration: 0.455

    });


    // ==========================
    // 8. MEHR + LOADER FADE TOGETHER
    // ==========================

    tl.to(initials, {

        opacity: 0,

        duration: 1.3,

        stagger: 0,

        ease: "power2.inOut"

    })

    .to(loader, {

        opacity: 0,

        duration: 1.3,

        ease: "power2.inOut"

    }, "<");


    // ==========================
    // 9. REMOVE LOADER
    // ==========================

    tl.call(() => {

        if (loader) {

            loader.remove();

        }

        document.body.style.overflow = "";

    });

});