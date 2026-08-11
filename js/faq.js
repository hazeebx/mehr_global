/* ==========================
   FAQ BOT
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
        <strong>Mehr Global</strong> is a consulting and professional
        services company helping organizations improve their systems,
        processes, compliance, and overall business performance.
    `,

    type: `
        Mehr Global is a <strong>consulting and professional services
        company</strong>. We work with organizations across different
        areas to help them strengthen their operations, compliance,
        management systems, and business processes.
    `,

    domains: `
        Not necessarily. The domains shown on our website represent
        our key areas of expertise, but our services are not strictly
        limited to those areas. If you have a specific requirement,
        feel free to contact our team and we'll be happy to discuss it.
    `,

    iso: `
        We work with organizations on <strong>multiple ISO standards</strong>,
        depending on their requirements and industry. Our team can help
        with the relevant ISO implementation, documentation, and
        certification process.
    `,

    fallback: `
        I'm not completely sure about that one 😅

        I can help with questions about our services, company,
        consulting domains, and ISO-related work.

        You can also contact our team directly for a specific enquiry.
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


    /* Fake response delay */

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