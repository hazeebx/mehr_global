const clientCards = document.querySelectorAll(".client-card");

let currentClient = 0;

function highlightNextClient() {

    // Remove highlight from current card
    clientCards[currentClient].classList.remove("active");

    // Move to next card
    currentClient = (currentClient + 1) % clientCards.length;

    // Highlight next card
    clientCards[currentClient].classList.add("active");
}

// Start with the first logo
clientCards[0].classList.add("active");

// Move every 1 second
setInterval(highlightNextClient, 1000);