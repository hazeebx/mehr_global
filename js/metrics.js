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
   GRID BACKGROUND
============================== */

const section = document.querySelector(".stats");
const canvas = section.querySelector("#stats-grid");
const ctx = canvas.getContext("2d");

const spacing = 70;
const radius = 150;

let mouse = {
    x: -9999,
    y: -9999
};

let points = [];

function resizeCanvas() {

    const dpr = window.devicePixelRatio || 1;

    canvas.width = section.clientWidth * dpr;
    canvas.height = section.clientHeight * dpr;

    canvas.style.width = section.clientWidth + "px";
    canvas.style.height = section.clientHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    points = [];

    for (let y = 0; y <= section.clientHeight; y += spacing) {

        for (let x = 0; x <= section.clientWidth; x += spacing) {

            points.push({
                x,
                y,
                glow: 0
            });

        }

    }

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

new ResizeObserver(resizeCanvas).observe(section);


/* ==============================
   MOUSE
============================== */

section.addEventListener("mousemove", e => {

    const rect = section.getBoundingClientRect();

    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

});

section.addEventListener("mouseleave", () => {

    mouse.x = -9999;
    mouse.y = -9999;

});


/* ==============================
   DRAW
============================== */

function draw() {

    ctx.clearRect(0, 0, section.clientWidth, section.clientHeight);

    /* ---------- GOLD GRID ---------- */

    ctx.strokeStyle = "rgba(203,168,91,.08)";
    ctx.lineWidth = 1;

    for (let x = 0; x <= section.clientWidth; x += spacing) {

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, section.clientHeight);
        ctx.stroke();

    }

    for (let y = 0; y <= section.clientHeight; y += spacing) {

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(section.clientWidth, y);
        ctx.stroke();

    }

    /* ---------- NODES ---------- */

    points.forEach(point => {

        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;

        const dist = Math.hypot(dx, dy);

        let target = 0;

        if (dist < radius) {
            target = 1 - dist / radius;
        }

        point.glow += (target - point.glow) * 0.12;

        /* ---------- GOLD GLOW ---------- */

        if (point.glow > 0.01) {

            const grad = ctx.createRadialGradient(
                point.x,
                point.y,
                0,
                point.x,
                point.y,
                16 * point.glow
            );

            grad.addColorStop(
                0,
                `rgba(255,225,160,${0.9 * point.glow})`
            );

            grad.addColorStop(
                .35,
                `rgba(203,168,91,${0.45 * point.glow})`
            );

            grad.addColorStop(
                1,
                "rgba(203,168,91,0)"
            );

            ctx.beginPath();
            ctx.fillStyle = grad;
            ctx.arc(
                point.x,
                point.y,
                16 * point.glow,
                0,
                Math.PI * 2
            );
            ctx.fill();

        }

        /* ---------- DOT ---------- */

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(240,216,141,${0.15 + point.glow * 0.85})`;

        ctx.arc(
            point.x,
            point.y,
            1.4 + point.glow * 1.8,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    requestAnimationFrame(draw);

}

draw();