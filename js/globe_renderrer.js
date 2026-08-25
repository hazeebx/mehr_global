import { RINGS } from "./rings.js";

(function () {

    let globeRunning = false;

    const canvas = document.getElementById("c");

    const ctx = canvas.getContext("2d");

    let W, H, CX, CY;


    // ============================================================
    // HERO / VISIBILITY
    // ============================================================

    const hero = document.querySelector(".hero");


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

        W =
            canvas.width =
            hero.clientWidth;


        H =
            canvas.height =
            hero.clientHeight;


        CX = W / 2;

        CY =
            H / 2 + 10;
        // Move globe down with +ve, up with -ve

    }


    window.addEventListener(
        "resize",
        resize
    );


    resize();


    // ============================================================
    // BACKGROUND
    // ============================================================

    let bgGradientCache = null;

    let bgW = 0;

    let bgH = 0;


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
                CX,
                CY,
                0,
                CX,
                CY,
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

    const R = 230;

    const DEG2RAD =
        Math.PI / 180;


    // ============================================================
    // GLOBE PARTICLES
    // ============================================================

    const particles = [];


    const PARTICLE_STEP = 8;


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
                lon *
                DEG2RAD;


            const latR =
                lat *
                DEG2RAD;


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
            lonDeg *
            DEG2RAD;


        const latR =
            latDeg *
            DEG2RAD;


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
                Math.random() * 1,

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


    // Parallels

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


    // Meridians

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
    // LOCATION ORBS
    // ============================================================
    //
    // Add locations as:
    //
    // [longitude, latitude]
    //
    // Example:
    // [46.6753, 24.7136]
    //
    // Longitude first.
    // Latitude second.
    //
    // ============================================================

    const LOCATION_COORDS = [

        // Riyadh
        [46.6753, 24.7136],

        // New York
        [-74.0060, 40.7128],

        // Bengaluru
        [77.5946, 12.9716]

    ];


    const locationPoints = [];


    for (
        const [lon, lat]
        of LOCATION_COORDS
    ) {

        const lonR =
            lon *
            DEG2RAD;


        const latR =
            lat *
            DEG2RAD;


        const ux =
            Math.cos(latR) *
            Math.cos(lonR);


        const uy =
            Math.sin(latR);


        const uz =
            Math.cos(latR) *
            Math.sin(lonR);


        locationPoints.push({

            ux,
            uy,
            uz,

            pulsePhase:
                Math.random() *
                Math.PI *
                2,

            pulseSpeed:
                2 +
                Math.random() *
                0.8

        });

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


        // Horizontal rotation

        dragRotY +=
            dx * 0.005;


        // Flipped vertical rotation

        dragTilt =
            Math.max(
                -1.3,
                Math.min(
                    1.3,
                    dragTilt -
                    dy * 0.004
                )
            );

    }


    function onUp() {

        dragging = false;

    }


    // Mouse

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


    // Touch

    canvas.addEventListener(
        "touchstart",
        (e) => {

            if (
                e.touches.length
            ) {

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

            if (
                e.touches.length
            ) {

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
    // ZOOM
    // ============================================================

    let zoom = 1;

    let targetZoom = 1;


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
    // TIME
    // ============================================================

    let t0 =
        performance.now();


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
        // Reset canvas
        // --------------------------------------------------------

        ctx.setTransform(
            1,
            0,
            0,
            1,
            0,
            0
        );


        ctx.globalCompositeOperation =
            "source-over";


        // --------------------------------------------------------
        // Background
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


        for (
            const s of farStars
        ) {

            const tw =
                0.5 +
                0.5 *
                Math.sin(
                    time * 1.2 +
                    s.tw
                );


            ctx.globalAlpha =
                0.15 +
                0.5 *
                tw *
                (
                    1 -
                    s.z * 0.5
                );


            ctx.fillStyle =
                "#dfe6ff";


            const sx =
                CX +
                s.x *
                CX *
                1.4;


            const sy =
                CY +
                s.y *
                CY *
                1.4;


            ctx.beginPath();


            ctx.arc(
                sx,
                sy,
                s.r,
                0,
                Math.PI * 2
            );


            ctx.fill();

        }


        ctx.restore();


        // ========================================================
        // GLOW
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
                300
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
        // ROTATION
        // ========================================================

        const cosY =
            Math.cos(rotY);


        const sinY =
            Math.sin(rotY);


        const cosX =
            Math.cos(tiltX);


        const sinX =
            Math.sin(tiltX);


        // ========================================================
        // GLOBE PARTICLES
        // ========================================================

        const projected = [];


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
                p.ux *
                rCur;


            const y =
                p.uy *
                rCur;


            const z =
                p.uz *
                rCur;


            let rx =
                x *
                cosY -
                z *
                sinY;


            let rz =
                x *
                sinY +
                z *
                cosY;


            let ry =
                y *
                cosX -
                rz *
                sinX;


            rz =
                y *
                sinX +
                rz *
                cosX;


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
        // DRAW GLOBE PARTICLES
        // ========================================================

        ctx.globalCompositeOperation =
            "lighter";


        for (
            const o of projected
        ) {

            const p =
                o.p;


            const size =
                Math.max(
                    0.45,
                    p.size *
                    o.scale *
                    1.15
                ) *
                o.twinkle;


            const alpha =
                Math.min(
                    1,
                    o.scale *
                    0.95
                ) *
                o.twinkle *
                o.visibility *
                p.alphaMul;


            ctx.globalAlpha =
                alpha;


            ctx.fillStyle =
                "#FFDC5C";


            ctx.fillRect(
                o.sx,
                o.sy,
                1.5,
                1.5
            );


            // VERY HIGH LOAD — don't use this
            //
            // ctx.drawImage(
            //     sprites[p.spriteIdx],
            //     o.sx - size,
            //     o.sy - size,
            //     size * 2,
            //     size * 2
            // );

        }





        // ========================================================
        // RESET
        // ========================================================

        ctx.globalCompositeOperation =
            "source-over";


        ctx.globalAlpha =
            1;


        requestAnimationFrame(
            frame
        );

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

        requestAnimationFrame(
            frame
        );

    }


    console.log(
        "Why u looking in the console bro?"
    );


})();