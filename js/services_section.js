(() => {
const wrapper = document.querySelector(".servicesWrapper");

if (!wrapper) return;

const glow = wrapper.querySelector(".cursorGlow");
const light = wrapper.querySelector(".light");

const services = wrapper.querySelector(".services");
const title = wrapper.querySelector(".services-title");

const cards = wrapper.querySelectorAll(".service-card");
const glassCards = wrapper.querySelectorAll(".glass");

const timelines = wrapper.querySelectorAll(".reveal, .timeline");

const canvas = wrapper.querySelector("#network");
const ctx = canvas.getContext("2d");

if (!wrapper) return;


let w, h;
let mouse = { x: -999, y: -999 };

function resize() {
    w = wrapper.clientWidth;
    h = wrapper.clientHeight;

    canvas.width = w;
    canvas.height = h;
}

resize();
window.addEventListener("resize", resize);

// Cursor interaction only inside services wrapper
wrapper.addEventListener("mousemove", e => {

    const rect = wrapper.getBoundingClientRect();

    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    glow.style.left = mouse.x + "px";
    glow.style.top = mouse.y + "px";

    light.style.left = mouse.x + "px";
    light.style.top = mouse.y + "px";

    glassCards.forEach(card => {

        const r = card.getBoundingClientRect();

        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        card.style.setProperty("--x", x + "px");
        card.style.setProperty("--y", y + "px");

        const dx = (e.clientX - (r.left + r.width / 2)) / 25;
        const dy = (e.clientY - (r.top + r.height / 2)) / 25;

        card.style.transform =
            `perspective(900px)
             rotateY(${dx}deg)
             rotateX(${-dy}deg)
             translate(${dx/3}px,${dy/3}px)`;

    });

});

wrapper.addEventListener("mouseleave", () => {

    mouse.x = -999;
    mouse.y = -999;

    glassCards.forEach(card => {
    card.style.transform = "";
});

});

// Reveal animations
const io = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            if (entry.target.classList.contains("timeline")) {
                entry.target.classList.add("active");
            }

        } else {

            entry.target.classList.remove("show");

            if (entry.target.classList.contains("timeline")) {
                entry.target.classList.remove("active");
            }

        }

    });

}, { threshold: 0.2 });


    timelines.forEach(el => io.observe(el));

// Constellation particles
const pts = [...Array(300)].map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35
}));

function loop() {

    ctx.clearRect(0, 0, w, h);

    for (const p of pts) {

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        for (const q of pts) {

            const d = Math.hypot(p.x - q.x, p.y - q.y);

            if (d < 110) {

                let a = 0.08 * (1 - d / 110);

                const md = Math.hypot(
                    (p.x + q.x) / 2 - mouse.x,
                    (p.y + q.y) / 2 - mouse.y
                );

                if (md < 180)
                    a += 0.4 * (1 - md / 180);

                ctx.strokeStyle = `rgba(144,124,101,${a})`;

                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
            }

        }

        ctx.fillStyle = "#907c65";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

    }

    requestAnimationFrame(loop);
}

loop();


/* ---------- Calculate radial offsets ---------- */

function setupAnimations() {

    const section = services.getBoundingClientRect();

    const centerX = section.left + section.width / 2;
    const centerY = section.top + section.height / 2;

    // Cards
    cards.forEach(card => {

        const rect = card.getBoundingClientRect();

        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;

        let dx = cardX - centerX;
        let dy = cardY - centerY;

        const length = Math.hypot(dx, dy) || 1;

        dx /= length;
        dy /= length;

        const distance = 500;

        card.style.setProperty("--tx", `${dx * distance}px`);
        card.style.setProperty("--ty", `${dy * distance}px`);

    });

    // Title
    const titleRect = title.getBoundingClientRect();

    let tx = titleRect.left + titleRect.width / 2 - centerX;
    let ty = titleRect.top + titleRect.height / 2 - centerY;

    const tLength = Math.hypot(tx, ty) || 1;

    tx /= tLength;
    ty /= tLength;

    const titleDistance = 180;

    title.style.setProperty("--tx", `${tx * titleDistance}px`);
    title.style.setProperty("--ty", `${ty * titleDistance}px`);

}

window.addEventListener("load", setupAnimations);
window.addEventListener("resize", setupAnimations);

/* ---------- Scroll Animation ---------- */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            title.classList.add("show");

            cards.forEach((card, i) => {

                setTimeout(() => {
                    card.classList.add("show");
                }, i * 100);

            });

        } else {

            title.classList.remove("show");

            cards.forEach(card => {
                card.classList.remove("show");
            });

        }

    });

}, {
    threshold: 0.35
});

observer.observe(services);

})();