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
    // Each location is [name, longitude, latitude].
    //
    // ============================================================

    const LOCATION_COORDS = [

        // Riyadh
        ["Riyadh", 46.6753, 24.7136],

        // Delhi
        ["Delhi", 77.1025, 28.7041],

        // Toronto
        ["Toronto", -79.3832, 43.6532],

        // Melbourne
        ["Melbourne", 144.9631, -37.8136]

    ];


    const locationPoints = [];


    for (
        const [name, lon, lat]
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

            name,

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

    let hoveredLocation = null;

    let visibleLocationPoints = [];


    function updateHoveredLocation(event) {

        const rect = canvas.getBoundingClientRect();

        const pointerX = event.clientX - rect.left;
        const pointerY = event.clientY - rect.top;

        hoveredLocation = visibleLocationPoints.find(location => {

            const hitRadius = Math.max(18, location.radius * 2.6);

            return Math.hypot(
                pointerX - location.sx,
                pointerY - location.sy
            ) <= hitRadius;
        }) || null;

        canvas.style.cursor = hoveredLocation
            ? "pointer"
            : dragging
                ? "grabbing"
                : "grab";
    }


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


    canvas.addEventListener(
        "mousemove",
        updateHoveredLocation
    );


    canvas.addEventListener(
        "mouseleave",
        () => {
            hoveredLocation = null;
            canvas.style.cursor = "grab";
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
        // LOCATION ORBS
        // ========================================================

        visibleLocationPoints = [];

        for (const location of locationPoints) {

            const x = location.ux * R;
            const y = location.uy * R;
            const z = location.uz * R;

            let rx = x * cosY - z * sinY;
            let rz = x * sinY + z * cosY;
            const ry = y * cosX - rz * sinX;

            rz = y * sinX + rz * cosX;

            const depth = rz + FOCAL_OFFSET;

            if (depth <= 40) continue;

            const scale = FOCAL / depth;
            const facing = -rz / R;
            const visibility = Math.max(
                0,
                Math.min(1, (facing + 0.08) / 0.22)
            );

            if (visibility <= 0.03) continue;

            const sx = CX + rx * scale;
            const sy = CY - ry * scale;
            const pulse = .5 + .5 * Math.sin(
                time * location.pulseSpeed + location.pulsePhase
            );
            const radius = Math.max(3, 4.2 * scale);

            visibleLocationPoints.push({
                ...location,
                sx,
                sy,
                radius,
                visibility,
                pulse
            });
        }

        for (const location of visibleLocationPoints) {

            const isHovered = hoveredLocation?.name === location.name;
            const pulseRadius = location.radius * (2.5 + location.pulse * 2.2);

            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            ctx.globalAlpha = location.visibility;

            const glow = ctx.createRadialGradient(
                location.sx,
                location.sy,
                0,
                location.sx,
                location.sy,
                pulseRadius
            );

            glow.addColorStop(0, "rgba(104, 208, 255, .90)");
            glow.addColorStop(.22, "rgba(42, 144, 255, .50)");
            glow.addColorStop(1, "rgba(24, 100, 255, 0)");

            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(location.sx, location.sy, pulseRadius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "rgba(111, 209, 255, .58)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(
                location.sx,
                location.sy,
                location.radius * (1.25 + location.pulse * 1.5),
                0,
                Math.PI * 2
            );
            ctx.stroke();

            ctx.fillStyle = "#b9f0ff";
            ctx.beginPath();
            ctx.arc(location.sx, location.sy, location.radius, 0, Math.PI * 2);
            ctx.fill();

            if (isHovered) {

                const label = location.name;
                ctx.font = "600 12px Inter, sans-serif";
                const labelWidth = ctx.measureText(label).width;
                const paddingX = 11;
                const labelHeight = 29;
                const labelX = Math.min(
                    location.sx + 15,
                    W - labelWidth - paddingX * 2 - 8
                );
                const labelY = Math.max(
                    8,
                    location.sy - labelHeight - 13
                );

                ctx.globalAlpha = Math.min(1, location.visibility + .28);
                ctx.fillStyle = "rgba(9, 27, 55, .60)";
                ctx.strokeStyle = "rgba(101, 208, 255, .78)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(
                    labelX,
                    labelY,
                    labelWidth + paddingX * 2,
                    labelHeight,
                    7
                );
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = "#c7f4ff";
                ctx.textBaseline = "middle";
                ctx.fillText(
                    label,
                    labelX + paddingX,
                    labelY + labelHeight / 2
                );
            }

            ctx.restore();
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
