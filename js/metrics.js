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

const spacing = 40;
const radius = 130;

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


section.addEventListener("mousemove", e => {

    const rect = section.getBoundingClientRect();

    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

});

section.addEventListener("mouseleave", () => {

    mouse.x = -9999;
    mouse.y = -9999;

});


function draw() {

    ctx.clearRect(0, 0, section.clientWidth, section.clientHeight);

    /* Grid */

    ctx.strokeStyle = "rgba(255,255,255,.04)";
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

    /* Nodes */

    points.forEach(point => {

        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;

        const dist = Math.hypot(dx, dy);

        let target = 0;

        if (dist < radius) {
            target = 1 - dist / radius;
        }

        point.glow += (target - point.glow) * 0.12;

        if (point.glow > 0.01) {

            const grad = ctx.createRadialGradient(
                point.x,
                point.y,
                0,
                point.x,
                point.y,
                16 * point.glow
            );

            grad.addColorStop(0, `rgba(180,140,255,${0.9 * point.glow})`);
            grad.addColorStop(.35, `rgba(130,90,255,${0.35 * point.glow})`);
            grad.addColorStop(1, "rgba(130,90,255,0)");

            ctx.beginPath();
            ctx.fillStyle = grad;
            ctx.arc(point.x, point.y, 16 * point.glow, 0, Math.PI * 2);
            ctx.fill();

        }

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(255,255,255,${0.12 + point.glow * 0.9})`;

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