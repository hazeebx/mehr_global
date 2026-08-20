
/* ==========================
FAQ BOT — MIIKU
MEHR Intelligent Interactive Knowledge Unit
========================== */

const faqBot = document.querySelector(".faq-bot");

const faqToggle = document.getElementById("faqToggle");
const faqClose = document.getElementById("faqClose");

const faqChat = document.getElementById("faqChat");
const faqQuestions = document.getElementById("faqQuestions");

const faqForm = document.getElementById("faqForm");
const faqInput = document.getElementById("faqInput");


/* ==========================
ANSWERS
========================== */

const faqAnswers = {

    company: `
        Mehr Global is a consulting and professional
        services company that helps organizations improve
        their systems, processes, compliance, and overall
        business performance.
        <br><br>
        I hope that helps.
    `,

    type: `
        Mehr Global is a <strong>consulting and professional
        services company</strong>.
        <br><br>
        We work with organizations across different areas
        to strengthen their operations, compliance,
        management systems, and business processes.
    `,

    domains: `
        Not necessarily.
        <br><br>
        The domains shown on our website represent our key
        areas of expertise, but our services aren't strictly
        limited to those areas.
        <br><br>
        If you have a specific requirement, feel free to
        contact our team and we'll be happy to discuss it
        with you.
    `,

    iso: `
        We work with <strong>multiple ISO standards</strong>.
        <br><br>
        The specific standards depend on your organization's
        requirements and industry. Our team can assist with
        the relevant ISO implementation, documentation, and
        certification process.
    `,

    fallback: `
        I don't have an answer for that yet.
        <br><br>
        Try asking me about our <strong>services</strong>,
        <strong>company</strong>, <strong>domains</strong>,
        or <strong>ISO work</strong>.
    `

};


/* ==========================
QUESTION MATCHING
========================== */

function getAnswer(question) {

    const q = question.toLowerCase();


    /* Company */

    if (
        q.includes("what do you") ||
        q.includes("what does mehr") ||
        q.includes("what is mehr") ||
        q.includes("what do guys") ||
        q.includes("what do u guys") ||
        q.includes("what do you guys do")
    ) {
        return faqAnswers.company;
    }


    /* Company type */

    if (
        q.includes("type of company") ||
        q.includes("kind of company") ||
        q.includes("what company") ||
        q.includes("business type") ||
        q.includes("are you a consulting")
    ) {
        return faqAnswers.type;
    }


    /* Domains */

    if (
        q.includes("domain") ||
        q.includes("limited") ||
        q.includes("only these") ||
        q.includes("only offer") ||
        q.includes("services limited") ||
        q.includes("other services")
    ) {
        return faqAnswers.domains;
    }


    /* ISO */

    if (
        q.includes("iso") ||
        q.includes("iso's") ||
        q.includes("certification") ||
        q.includes("standards")
    ) {
        return faqAnswers.iso;
    }


    return faqAnswers.fallback;
}


/* ==========================
ADD MESSAGE
========================== */

function addMessage(content, type) {

    const message = document.createElement("div");

    message.classList.add(
        "faq-message",
        type === "user"
            ? "user-message"
            : "bot-message"
    );

    message.innerHTML = content;

    faqChat.appendChild(message);

    faqChat.scrollTop = faqChat.scrollHeight;

    return message;
}


/* ==========================
TYPING ANIMATION
========================== */

function showTyping() {

    const typing = document.createElement("div");

    typing.classList.add(
        "faq-message",
        "bot-message",
        "typing"
    );

    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    faqChat.appendChild(typing);

    faqChat.scrollTop = faqChat.scrollHeight;

    return typing;
}


/* ==========================
ASK QUESTION
========================== */

function askQuestion(question) {

    if (!question.trim()) return;


    /* User message */

    addMessage(question, "user");


    /* Hide question buttons */

    faqQuestions.style.display = "none";


    /* Typing */

    const typing = showTyping();


    /* Response delay */

    setTimeout(() => {

        typing.remove();

        const answer = getAnswer(question);

        addMessage(answer, "bot");


        /* Show questions again */

        setTimeout(() => {

            faqQuestions.style.display = "flex";

            faqChat.appendChild(faqQuestions);

            faqChat.scrollTop = faqChat.scrollHeight;

        }, 250);

    }, 650);

}


/* ==========================
OPEN
========================== */

faqToggle.addEventListener("click", () => {

    faqBot.classList.add("active");

    setTimeout(() => {
        faqInput.focus();
    }, 300);

});


/* ==========================
CLOSE
========================== */

faqClose.addEventListener("click", () => {

    faqBot.classList.remove("active");

});
/* ==========================
AUTO CLOSE — CLICK OUTSIDE
========================== */

document.addEventListener("click", (event) => {

    if (!faqBot.classList.contains("active")) return;

    const clickedInside = faqBot.contains(event.target);

    if (!clickedInside) {
        faqBot.classList.remove("active");
    }

});

/* ==========================
FAQ BUTTONS
========================== */

faqQuestions.addEventListener("click", (event) => {

    const button = event.target.closest("button");

    if (!button) return;

    const question = button.dataset.question;

    askQuestion(question);

});


/* ==========================
INPUT
========================== */

faqForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const question = faqInput.value.trim();

    if (!question) return;

    faqInput.value = "";

    askQuestion(question);

});


/* ==========================
ESC TO CLOSE
========================== */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        faqBot.classList.contains("active")
    ) {
        faqBot.classList.remove("active");
    }

});
