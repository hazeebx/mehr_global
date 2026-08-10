/* ==============================
TICKER
============================== */

document.querySelectorAll(".ticker-track").forEach(track => {

    // Duplicate ONCE only
    [...track.children].forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

});


/* ==============================
PAUSE TICKERS OFFSCREEN
============================== */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        const track = entry.target.querySelector(".ticker-track");

        if (!track) return;

        track.style.animationPlayState =
            entry.isIntersecting ? "running" : "paused";

    });

}, {
    threshold: 0.1
});


document.querySelectorAll(".ticker").forEach(ticker => {
    observer.observe(ticker);
});


/* ==============================
TOPOGRAPHIC BACKGROUND
============================== */

const section = document.querySelector(".stats");
const canvas = section.querySelector("#stats-grid");
const ctx = canvas.getContext("2d");

const contourCount = 18;
const contourSpacing = 34;
const contourSamples = 120;

const glowRadius = 350;

let mouse = {
    x: -9999,
    y: -9999
};

let contours = [];


/* ==============================
SMOOTH TOPOGRAPHIC SHAPE
============================== */

function contourRadius(angle, level) {

    /*
        Base radius.

        Each contour expands outward,
        creating the layered elevation effect.
    */

    const base =
        35 + level * contourSpacing;


    /*
        Multiple low-frequency waves create
        irregular terrain instead of perfect circles.
    */

    const wave1 =
        Math.sin(angle * 2.1 + level * 0.45) * 38;

    const wave2 =
        Math.sin(angle * 3.7 - level * 0.28) * 20;

    const wave3 =
        Math.cos(angle * 5.2 + level * 0.7) * 12;


    /*
        Slowly shift the center of the contours
        at different levels.
    */

    const offsetX =
        Math.sin(level * 0.55) * 35;

    const offsetY =
        Math.cos(level * 0.43) * 25;


    return {
        radius:
            base +
            wave1 +
            wave2 +
            wave3,

        offsetX,
        offsetY
    };

}


/* ==============================
GENERATE CONTOURS
============================== */

function generateContours() {

    contours = [];

    const width = section.clientWidth;
    const height = section.clientHeight;

    const centerX = width / 2;
    const centerY = height / 2;


    /*
        Generate more contour area than the
        visible canvas so the edges are covered.
    */

    for (
        let level = 0;
        level < contourCount;
        level++
    ) {

        const points = [];

        for (
            let i = 0;
            i < contourSamples;
            i++
        ) {

            const angle =
                (i / contourSamples) *
                Math.PI * 2;


            const shape =
                contourRadius(angle, level);


            const x =
                centerX +
                shape.offsetX +
                Math.cos(angle) * shape.radius;


            const y =
                centerY +
                shape.offsetY +
                Math.sin(angle) * shape.radius;


            points.push({
                x,
                y
            });

        }


        contours.push(points);

    }

}


/* ==============================
RESIZE CANVAS
============================== */

function resizeCanvas() {

    const dpr =
        window.devicePixelRatio || 1;

    const width =
        section.clientWidth;

    const height =
        section.clientHeight;


    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;


    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    generateContours();

}


resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

new ResizeObserver(
    resizeCanvas
).observe(section);


/* ==============================
MOUSE
============================== */

section.addEventListener(
    "mousemove",
    e => {

        const rect =
            section.getBoundingClientRect();


        mouse.x =
            e.clientX - rect.left;

        mouse.y =
            e.clientY - rect.top;

    }
);


section.addEventListener(
    "mouseleave",
    () => {

        mouse.x = -9999;
        mouse.y = -9999;

    }
);


/* ==============================
DISTANCE TO SEGMENT
============================== */

function distanceToSegment(
    px,
    py,
    x1,
    y1,
    x2,
    y2
) {

    const dx =
        x2 - x1;

    const dy =
        y2 - y1;


    if (dx === 0 && dy === 0) {

        return Math.hypot(
            px - x1,
            py - y1
        );

    }


    const t =
        Math.max(
            0,
            Math.min(
                1,
                (
                    (px - x1) * dx +
                    (py - y1) * dy
                ) /
                (dx * dx + dy * dy)
            )
        );


    const closestX =
        x1 + t * dx;

    const closestY =
        y1 + t * dy;


    return Math.hypot(
        px - closestX,
        py - closestY
    );

}


/* ==============================
DRAW
============================== */

function draw() {

    const width =
        section.clientWidth;

    const height =
        section.clientHeight;


    /* ---------- CLEAR ---------- */

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* ==============================
    TOPOGRAPHIC CONTOURS
    ============================== */

    contours.forEach(
        (contour, level) => {

            /*
                Outer contours are slightly
                less visible than inner ones.
            */

            const baseOpacity =
                0.08 +
                (1 - level / contourCount) * 0.025;


            /*
                Draw the contour in segments.

                This lets individual parts of the
                contour react independently to the mouse.
            */

            for (
                let i = 0;
                i < contour.length;
                i++
            ) {

                const current =
                    contour[i];

                const next =
                    contour[
                        (i + 1) %
                        contour.length
                    ];


                const distance =
                    distanceToSegment(
                        mouse.x,
                        mouse.y,
                        current.x,
                        current.y,
                        next.x,
                        next.y
                    );


                let glow = 0;


                if (
                    distance <
                    glowRadius
                ) {

                    glow =
                        1 -
                        distance /
                        glowRadius;

                }


                /*
                    Smooth the glow response
                    using a power curve.

                    This keeps the effect soft
                    instead of making a hard circle.
                */

                glow =
                    Math.pow(
                        glow,
                        2.2
                    );


                /* ==============================
                CONTOUR COLOR
                ============================== */

                if (glow > 0.01) {

                    ctx.strokeStyle =
                        `rgba(
                            254,
                            209,
                            96,
                            ${baseOpacity +
                            glow * 0.55}
                        )`;


                    ctx.lineWidth =
                        1 +
                        glow * 1.5;

                } else {

                    ctx.strokeStyle =
                        `rgba(
                            58,
                            66,
                            74,
                            ${baseOpacity}
                        )`;


                    ctx.lineWidth = 1;

                }


                /* ==============================
                DRAW SEGMENT
                ============================== */

                ctx.beginPath();

                ctx.moveTo(
                    current.x,
                    current.y
                );

                ctx.lineTo(
                    next.x,
                    next.y
                );

                ctx.stroke();


                /* ==============================
                GOLD GLOW
                ============================== */

                if (glow > 0.02) {

                    const midX =
                        (current.x +
                        next.x) / 2;

                    const midY =
                        (current.y +
                        next.y) / 2;


                    const grad =
                        ctx.createRadialGradient(
                            midX,
                            midY,
                            0,
                            midX,
                            midY,
                            45 * glow
                        );


                    grad.addColorStop(
                        0,
                        `rgba(
                            255,
                            230,
                            150,
                            ${0.28 * glow}
                        )`
                    );


                    grad.addColorStop(
                        .35,
                        `rgba(
                            254,
                            209,
                            96,
                            ${0.12 * glow}
                        )`
                    );


                    grad.addColorStop(
                        1,
                        "rgba(254, 209, 96, 0)"
                    );


                    ctx.beginPath();

                    ctx.strokeStyle =
                        grad;

                    ctx.lineWidth =
                        2.5 * glow;

                    ctx.moveTo(
                        current.x,
                        current.y
                    );

                    ctx.lineTo(
                        next.x,
                        next.y
                    );

                    ctx.stroke();

                }

            }

        }
    );


    /* ==============================
    MOUSE CENTER GLOW
    ============================== */

    if (
        mouse.x > -100 &&
        mouse.y > -100
    ) {

        const mouseGlow =
            ctx.createRadialGradient(
                mouse.x,
                mouse.y,
                0,
                mouse.x,
                mouse.y,
                glowRadius
            );


        mouseGlow.addColorStop(
            0,
            "rgba(254, 209, 96, .055)"
        );


        mouseGlow.addColorStop(
            .35,
            "rgba(254, 209, 96, .025)"
        );


        mouseGlow.addColorStop(
            1,
            "rgba(254, 209, 96, 0)"
        );


        ctx.beginPath();

        ctx.fillStyle =
            mouseGlow;

        ctx.arc(
            mouse.x,
            mouse.y,
            glowRadius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    requestAnimationFrame(draw);

}


draw();