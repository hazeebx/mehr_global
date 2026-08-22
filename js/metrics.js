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
