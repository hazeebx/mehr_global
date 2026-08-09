gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {

    const cards = gsap.utils.toArray(".client-card");
    const grid = document.querySelector(".clients-grid");

    let tl;

    function buildTimeline() {

        if (tl) tl.kill();

        const gridRect = grid.getBoundingClientRect();

        const gridCenterX = gridRect.left + gridRect.width / 2;
        const gridCenterY = gridRect.top + gridRect.height / 2;

        let maxDistance = 0;

        cards.forEach(card => {

            const rect = card.getBoundingClientRect();

            const dx = rect.left + rect.width / 2 - gridCenterX;
            const dy = rect.top + rect.height / 2 - gridCenterY;

            maxDistance = Math.max(
                maxDistance,
                Math.hypot(dx, dy)
            );

        });

        tl = gsap.timeline({
            paused: true
        });

        cards.forEach(card => {

            const rect = card.getBoundingClientRect();

            const dx = rect.left + rect.width / 2 - gridCenterX;
            const dy = rect.top + rect.height / 2 - gridCenterY;

            const distance = Math.hypot(dx, dy);
            const ratio = distance / maxDistance;

            const travel = gsap.utils.interpolate(
                600,
                2200,
                ratio
            );

            const angle = Math.random() * Math.PI * 2;

            const startX = Math.cos(angle) * travel;
            const startY = Math.sin(angle) * travel;

            const delay = ratio * 0.45;

            tl.fromTo(
                card,
                {
                    x: startX,
                    y: startY,
                    scale: gsap.utils.random(0.15, 0.45),
                    rotation: gsap.utils.random(-180, 180),
                    opacity: 0
                },
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 1.35,
                    ease: "expo.out"
                },
                delay
            );

        });

        return tl;
    }

    // ----------------------------
    // ScrollTrigger
    // ----------------------------

    ScrollTrigger.create({

        trigger: ".clients",

        start: "top 75%",

        once: true,

        onEnter() {

            buildTimeline().play(0);

        }

    });

    ScrollTrigger.refresh();

});