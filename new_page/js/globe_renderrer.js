import { RINGS } from "./rings.js";

(function () {

    let globeRunning = false;


    // ============================================================
    // CANVAS
    // ============================================================

    const canvas = document.getElementById("c");
    const hero = document.querySelector(".hero");

    if (!canvas || !hero) {
        console.warn("Globe renderer: canvas or hero not found.");
        return;
    }

    const ctx = canvas.getContext("2d");

    let W = 0;
    let H = 0;

    let DPR = 1;


    // ============================================================
    // GLOBE POSITION
    // ============================================================

    let CX = 90;
    let CY = 70;


    // ============================================================
    // FULL CANVAS CENTER
    // Used only for stars/background.
    // ============================================================

    let STAR_CX = 0;
    let STAR_CY = 0;


    // ============================================================
    // BACKGROUND CACHE
    // ============================================================

    let bgGradientCache = null;
    let bgW = 0;
    let bgH = 0;


    // ============================================================
    // ANIMATION TIME
    // ============================================================

    let t0 = performance.now();


    // ============================================================
    // VISIBILITY
    // ============================================================

    const globeObserver =
        new IntersectionObserver((entries) => {

            const visible =
                entries[0].isIntersecting;


            if (
                visible &&
                !globeRunning
            ) {

                globeRunning = true;

                requestAnimationFrame(frame);

            } else if (!visible) {

                globeRunning = false;

            }

        }, {
            threshold: 0.05
        });


    globeObserver.observe(hero);


    // ============================================================
    // RESIZE
    // ============================================================

    function resize() {

        // --------------------------------------------------------
        // Logical canvas size
        // --------------------------------------------------------

        W = hero.clientWidth;
        H = hero.clientHeight;


        // --------------------------------------------------------
        // Device pixel ratio
        // --------------------------------------------------------

        DPR =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        // --------------------------------------------------------
        // Physical canvas resolution
        // --------------------------------------------------------

        canvas.width =
            Math.round(W * DPR);

        canvas.height =
            Math.round(H * DPR);


        // --------------------------------------------------------
        // CSS size stays unchanged
        // --------------------------------------------------------

        canvas.style.width =
            W + "px";

        canvas.style.height =
            H + "px";


        // --------------------------------------------------------
        // Globe position
        // --------------------------------------------------------

        CX = 50;
        CY = 50;


        // --------------------------------------------------------
        // Full canvas center
        // --------------------------------------------------------

        STAR_CX = W / 2;
        STAR_CY = H / 2;


        // --------------------------------------------------------
        // Reset cached background
        // --------------------------------------------------------

        bgGradientCache = null;
        bgW = 0;
        bgH = 0;


        // --------------------------------------------------------
        // Set logical coordinate system
        // --------------------------------------------------------

        ctx.setTransform(
            DPR,
            0,
            0,
            DPR,
            0,
            0
        );

    }


    window.addEventListener(
        "resize",
        resize
    );


    resize();


    // ============================================================
    // BACKGROUND GRADIENT
    // ============================================================

    function backgroundGradient() {

        if (
            bgGradientCache &&
            bgW === W &&
            bgH === H
        ) {

            return bgGradientCache;

        }


        const g =
            ctx.createRadialGradient(
                STAR_CX,
                STAR_CY,
                0,
                STAR_CX,
                STAR_CY,
                Math.max(W, H) * 0.75
            );


        g.addColorStop(
            0,
            "#0c0a1e"
        );


        g.addColorStop(
            0.35,
            "#070512"
        );


        g.addColorStop(
            0.7,
            "#020103"
        );


        g.addColorStop(
            1,
            "#000000"
        );


        bgGradientCache = g;

        bgW = W;
        bgH = H;


        return g;

    }


    // ============================================================
    // FAR STARS
    // ============================================================

    const farStars = [];


    for (
        let i = 0;
        i < 350;
        i++
    ) {

        farStars.push({

            x:
                Math.random() * 2 - 1,

            y:
                Math.random() * 2 - 1,

            z:
                Math.random(),

            r:
                Math.random() * 1.2 + 0.2,

            tw:
                Math.random() *
                Math.PI *
                2

        });

    }


    // ============================================================
    // PARTICLE SPRITE TYPE
    // ============================================================

    function pickSpriteIdx() {

        const r =
            Math.random();


        if (r < 0.5) {
            return 1;
        }


        if (r < 0.78) {
            return 0;
        }


        return 2;

    }


    // ============================================================
    // GLOBE
    // ============================================================

    const R = 50;

    const DEG2RAD =
        Math.PI / 180;


    // ============================================================
    // PARTICLES
    // ============================================================

    const particles = [];


    // Higher number = fewer particles.
    // 10 is a good balance for this small globe.

    const PARTICLE_STEP = 20;


    for (
        const ring of RINGS
    ) {

        for (
            let i = 0;
            i < ring.length;
            i += PARTICLE_STEP
        ) {

            const [
                lon,
                lat
            ] = ring[i];


            const lonR =
                lon * DEG2RAD;


            const latR =
                lat * DEG2RAD;


            const ux =
                Math.cos(latR) *
                Math.cos(lonR);


            const uy =
                Math.sin(latR);


            const uz =
                Math.cos(latR) *
                Math.sin(lonR);


            particles.push({

                ux,
                uy,
                uz,

                spriteIdx:
                    pickSpriteIdx(),

                size:
                    0.7 +
                    Math.random() * 1.0,

                alphaMul:
                    1,

                bobPhase:
                    Math.random() *
                    Math.PI *
                    2,

                bobSpeed:
                    0.3 +
                    Math.random() * 0.5,

                bobAmp:
                    1 +
                    Math.random() * 2,

                twinklePhase:
                    Math.random() *
                    Math.PI *
                    2,

                twinkleSpeed:
                    0.5 +
                    Math.random() * 1.1

            });

        }

    }


    // ============================================================
    // LAT / LONG GRID
    // ============================================================

    function addGridPoint(
        lonDeg,
        latDeg
    ) {

        const lonR =
            lonDeg * DEG2RAD;


        const latR =
            latDeg * DEG2RAD;


        const ux =
            Math.cos(latR) *
            Math.cos(lonR);


        const uy =
            Math.sin(latR);


        const uz =
            Math.cos(latR) *
            Math.sin(lonR);


        particles.push({

            ux,
            uy,
            uz,

            spriteIdx:
                3,

            size:
                0.45 +
                Math.random() * 0.35,

            alphaMul:
                0.4,

            bobPhase:
                Math.random() *
                Math.PI *
                2,

            bobSpeed:
                0.2 +
                Math.random() * 0.3,

            bobAmp:
                0.6 +
                Math.random(),

            twinklePhase:
                Math.random() *
                Math.PI *
                2,

            twinkleSpeed:
                0.3 +
                Math.random() * 0.6

        });

    }


    const GRID_STEP_DEG = 20;

    const GRID_SAMPLE_DEG = 100;


    // ------------------------------------------------------------
    // Parallels
    // ------------------------------------------------------------

    for (
        let lat = -60;
        lat <= 60;
        lat += GRID_STEP_DEG
    ) {

        for (
            let lon = -180;
            lon < 180;
            lon += GRID_SAMPLE_DEG
        ) {

            addGridPoint(
                lon,
                lat
            );

        }

    }


    // ------------------------------------------------------------
    // Meridians
    // ------------------------------------------------------------

    for (
        let lon = -180;
        lon < 180;
        lon += GRID_STEP_DEG
    ) {

        for (
            let lat = -90;
            lat <= 90;
            lat += GRID_SAMPLE_DEG
        ) {

            addGridPoint(
                lon,
                lat
            );

        }

    }


    // ============================================================
    // CAMERA / INTERACTION
    // ============================================================

    let rotY = 0;

    const START_ROTATION =
        -Math.PI;


    let tiltX = 0.5;

    let dragRotY = 0;

    let dragTilt = -0.3;


    let dragging = false;

    let lastPX = 0;

    let lastPY = 0;


    function onDown(
        x,
        y
    ) {

        dragging = true;

        lastPX = x;
        lastPY = y;

    }


    function onMove(
        x,
        y
    ) {

        if (!dragging) {
            return;
        }


        const dx =
            x - lastPX;


        const dy =
            y - lastPY;


        lastPX = x;
        lastPY = y;


        dragRotY +=
            dx * 0.005;


        dragTilt =
            Math.max(
                -1.3,
                Math.min(
                    1.3,
                    dragTilt +
                    dy * 0.004
                )
            );

    }


    function onUp() {

        dragging = false;

    }


    canvas.addEventListener(
        "mousedown",
        (e) => {

            onDown(
                e.clientX,
                e.clientY
            );

        }
    );


    window.addEventListener(
        "mousemove",
        (e) => {

            onMove(
                e.clientX,
                e.clientY
            );

        }
    );


    window.addEventListener(
        "mouseup",
        onUp
    );


    canvas.addEventListener(
        "touchstart",
        (e) => {

            if (e.touches.length) {

                onDown(
                    e.touches[0].clientX,
                    e.touches[0].clientY
                );

            }

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchmove",
        (e) => {

            if (e.touches.length) {

                onMove(
                    e.touches[0].clientX,
                    e.touches[0].clientY
                );

            }

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchend",
        onUp
    );


    // ============================================================
    // HINT
    // ============================================================

    const hint =
        document.getElementById("hint");


    if (hint) {

        setTimeout(
            () => {

                hint.style.opacity = 0;

            },
            4500
        );

    }


    // ============================================================
    // PROJECTION
    // ============================================================

    const FOCAL = 400;

    const FOCAL_OFFSET = 620;


    // ============================================================
    // FRAME
    // ============================================================

    function frame(now) {

        if (!globeRunning) {
            return;
        }


        const time =
            (now - t0) / 1000;


        // --------------------------------------------------------
        // Rotation
        // --------------------------------------------------------

        rotY =
            START_ROTATION +
            time * 0.12 +
            dragRotY;


        tiltX +=
            (
                dragTilt -
                tiltX
            ) * 0.08;


        // --------------------------------------------------------
        // IMPORTANT:
        // Restore DPR transform every frame.
        // --------------------------------------------------------

        ctx.setTransform(
            DPR,
            0,
            0,
            DPR,
            0,
            0
        );


        ctx.globalCompositeOperation =
            "source-over";


        // --------------------------------------------------------
        // Full canvas background
        // --------------------------------------------------------

        ctx.fillStyle =
            backgroundGradient();


        ctx.fillRect(
            0,
            0,
            W,
            H
        );


        // ========================================================
        // BACKGROUND STARS
        // ========================================================

        ctx.save();



        // ========================================================
        // GLOBE GLOW
        // ========================================================

        ctx.globalCompositeOperation =
            "lighter";


        const coreGlow =
            ctx.createRadialGradient(
                CX,
                CY,
                0,
                CX,
                CY,
                120
            );


        coreGlow.addColorStop(
            0,
            "rgba(255,200,110,0.10)"
        );


        coreGlow.addColorStop(
            0.5,
            "rgba(200,140,60,0.05)"
        );


        coreGlow.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );


        ctx.fillStyle =
            coreGlow;


        ctx.fillRect(
            0,
            0,
            W,
            H
        );


        // ========================================================
        // CAMERA ROTATION
        // ========================================================

        const cosY =
            Math.cos(rotY);

        const sinY =
            Math.sin(rotY);

        const cosX =
            Math.cos(tiltX);

        const sinX =
            Math.sin(tiltX);


        const projected = [];


        // ========================================================
        // PROJECT PARTICLES
        // ========================================================

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            const p =
                particles[i];


            const rCur =
                p.spriteIdx === 3

                    ? R

                    : R +
                      Math.sin(
                          time *
                          p.bobSpeed +
                          p.bobPhase
                      ) *
                      p.bobAmp;


            const x =
                p.ux * rCur;

            const y =
                p.uy * rCur;

            const z =
                p.uz * rCur;


            let rx =
                x * cosY -
                z * sinY;


            let rz =
                x * sinY +
                z * cosY;


            let ry =
                y * cosX -
                rz * sinX;


            rz =
                y * sinX +
                rz * cosX;


            const depth =
                rz +
                FOCAL_OFFSET;


            if (
                depth <= 40
            ) {

                continue;

            }


            const scale =
                FOCAL /
                depth;


            const sx =
                CX +
                rx *
                scale;


            const sy =
                CY -
                ry *
                scale;


            if (
                sx < -50 ||
                sx > W + 50 ||
                sy < -50 ||
                sy > H + 50
            ) {

                continue;

            }


            const facing =
                -rz /
                rCur;


            const visibility =
                Math.max(
                    0,
                    Math.min(
                        1,
                        (
                            facing +
                            0.12
                        ) /
                        0.28
                    )
                );


            if (
                visibility <= 0.01
            ) {

                continue;

            }


            const twinkle =
                0.8 +
                0.2 *
                Math.sin(
                    time *
                    p.twinkleSpeed +
                    p.twinklePhase
                );


            projected.push({

                sx,
                sy,

                scale,

                depth,

                p,

                twinkle,

                visibility

            });

        }


        // ========================================================
        // DRAW PARTICLES
        // ========================================================

        ctx.globalCompositeOperation =
            "lighter";


        for (
            const o of projected
        ) {

            const p =
                o.p;


            const alpha =
                Math.min(
                    1,
                    o.scale * 0.95
                ) *
                o.twinkle *
                o.visibility *
                p.alphaMul;


            ctx.globalAlpha =
                alpha;


            ctx.fillStyle =
                "#FFDC5C";


            // Smaller, cleaner particle.
            ctx.fillRect(
                o.sx,
                o.sy,
                1,
                1
            );

        }


        // ========================================================
        // RESET
        // ========================================================

        ctx.globalCompositeOperation =
            "source-over";

        ctx.globalAlpha = 1;


        requestAnimationFrame(frame);

    }


    // ============================================================
    // INITIAL START
    // ============================================================

    if (
        hero.getBoundingClientRect().top <
            window.innerHeight &&

        hero.getBoundingClientRect().bottom >
            0
    ) {

        globeRunning = true;

        requestAnimationFrame(frame);

    }


    console.log(
        "Globe renderer initialized."
    );

})();