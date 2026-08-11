const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    let valid = true;


    // Remove previous invalid states
    document.querySelectorAll(".invalid").forEach((field) => {
        field.classList.remove("invalid");
    });


    // Name
    if (name.value.trim() === "") {
        name.classList.add("invalid");
        valid = false;
    }


    // Email
    if (
        email.value.trim() === "" ||
        !email.checkValidity()
    ) {
        email.classList.add("invalid");
        valid = false;
    }


    // Subject
    if (subject.value.trim() === "") {
        subject.classList.add("invalid");
        valid = false;
    }


    // Message
    if (message.value.trim() === "") {
        message.classList.add("invalid");
        valid = false;
    }


    if (!valid) {
        return;
    }


    /*
        Frontend is valid.

        Replace this section with your actual
        form submission/backend/email service.
    */

    alert("Thank you! Your enquiry has been submitted.");

    form.reset();

});