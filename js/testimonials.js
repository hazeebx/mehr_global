const stack = document.querySelector(".stack");
let cards = [...document.querySelectorAll(".card")];

const visibleCards = 4;
let paused = false;

// Position every card
function layoutCards(animated = true) {

    cards.forEach((card, i) => {

        if (i < visibleCards) {

            gsap.to(card, {
                y: i * 18,
                scale: 1 - i * 0.04,
                rotation: i * -2,
                opacity: 1,
                duration: animated ? 0.6 : 0,
                ease: "power3.out"
            });

            card.style.zIndex = visibleCards - i;

        } else {

            gsap.to(card, {
                y: 80,
                scale: .84,
                rotation: -8,
                opacity: 0,
                duration: animated ? 0.6 : 0
            });

            card.style.zIndex = 0;

        }

    });

}

layoutCards(false);

// Mouse tilt
cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const r = card.getBoundingClientRect();

        const x = (e.clientX - r.left - r.width / 2) / 20;
        const y = (e.clientY - r.top - r.height / 2) / 20;

        gsap.to(card, {
            rotateY: x,
            rotateX: -y,
            duration: .3
        });

    });

    card.addEventListener("mouseleave", () => {

        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: .5
        });

    });

});

// Infinite deck
function cycleCards() {

    if (paused) return;

    const first = cards[0];

    gsap.to(first, {

        x: -180,
        y: -120,
        rotation: -12,
        opacity: 0,
        duration: .7,
        ease: "power2.inOut",

        onComplete() {

            gsap.set(first, {
                clearProps: "all",
                x: 0,
                y: 80,
                rotation: -8,
                opacity: 0
            });

            cards.push(cards.shift());

            layoutCards();

        }

    });

}

// Auto cycle
let interval = setInterval(cycleCards, 4000);

// Pause on hover
stack.addEventListener("mouseenter", () => {

    paused = true;

});

stack.addEventListener("mouseleave", () => {

    paused = false;

});


const dots = document.querySelectorAll(".testimonial-loader span");

let currentDot = 0;

function updateDots() {

    dots.forEach(dot => dot.classList.remove("active"));

    dots[currentDot].classList.add("active");

    currentDot++;

    if (currentDot >= dots.length) {

        currentDot = 0;

    }

}

updateDots();

setInterval(updateDots, 1000);