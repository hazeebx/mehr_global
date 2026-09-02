/* ==============================
   CONTACT FORM
============================== */

console.log("=================================");
console.log("CONTACT FORM SCRIPT LOADED");
console.log("=================================");


/* ==============================
   FIND FORM
============================== */

const contactForm =
    document.getElementById("contactForm");

console.log(
    "Contact form element:",
    contactForm
);


/* ==============================
   CHECK FORM
============================== */

if (contactForm) {

    console.log("✓ Contact form found");


    /* ==============================
       FIND BUTTON
    ============================== */

    const submitButton =
        document.getElementById("contactSubmit");

    console.log(
        "Submit button:",
        submitButton
    );


    /* ==============================
       FIND BUTTON ELEMENTS
    ============================== */

    const submitText =
        submitButton?.querySelector(".submit-text");

    const submitLoading =
        submitButton?.querySelector(".submit-loading");

    console.log(
        "Submit text:",
        submitText
    );

    console.log(
        "Submit loading:",
        submitLoading
    );


    /* ==============================
       FIND STATUS ELEMENT
    ============================== */

    const formStatus =
        document.getElementById("formStatus");

    console.log(
        "Form status:",
        formStatus
    );


    /* ==============================
       FORMSPREE ENDPOINT
    ============================== */

    const FORMSPREE_ENDPOINT =
        "https://formspree.io/f/xyegqeqb";


    console.log(
        "Formspree endpoint:",
        FORMSPREE_ENDPOINT
    );


    /* ==============================
       CHECK REQUIRED ELEMENTS
    ============================== */

    if (!submitButton) {

        console.error(
            "❌ ERROR: #contactSubmit was not found."
        );

    }

    if (!submitText) {

        console.error(
            "❌ ERROR: .submit-text was not found."
        );

    }

    if (!submitLoading) {

        console.error(
            "❌ ERROR: .submit-loading was not found."
        );

    }

    if (!formStatus) {

        console.error(
            "❌ ERROR: #formStatus was not found."
        );

    }


    /* ==============================
       SUBMIT
    ============================== */

    contactForm.addEventListener(
        "submit",
        async (event) => {

            console.log(
                "================================="
            );

            console.log(
                "FORM SUBMIT EVENT FIRED"
            );

            console.log(
                "================================="
            );


            /* ------------------------------
               Prevent normal form submission
            ------------------------------ */

            event.preventDefault();

            console.log(
                "✓ Default form submission prevented"
            );


            /* ------------------------------
               Prevent duplicate submissions
            ------------------------------ */

            if (submitButton.disabled) {

                console.warn(
                    "⚠ Submission blocked: button already disabled"
                );

                return;

            }


            /* ------------------------------
               Remove previous invalid states
            ------------------------------ */

            document
                .querySelectorAll(".invalid")
                .forEach((field) => {

                    field.classList.remove("invalid");

                });


            console.log(
                "✓ Previous validation states cleared"
            );


            /* ==============================
               GET FIELDS
            ============================== */

            const name =
                document.getElementById("name");

            const email =
                document.getElementById("email");

            const phone =
                document.getElementById("phone");

            const subject =
                document.getElementById("subject");

            const message =
                document.getElementById("message");


            console.log(
                "Form fields:",
                {
                    name,
                    email,
                    phone,
                    subject,
                    message
                }
            );


            /* ==============================
               CHECK FIELDS EXIST
            ============================== */

            if (!name) {

                console.error(
                    "❌ ERROR: #name not found"
                );

            }

            if (!email) {

                console.error(
                    "❌ ERROR: #email not found"
                );

            }

            if (!phone) {

                console.error(
                    "❌ ERROR: #phone not found"
                );

            }

            if (!subject) {

                console.error(
                    "❌ ERROR: #subject not found"
                );

            }

            if (!message) {

                console.error(
                    "❌ ERROR: #message not found"
                );

            }


            /* ==============================
               VALIDATION
            ============================== */

            let valid = true;


            /* ------------------------------
               Name
            ------------------------------ */

            if (
                !name ||
                name.value.trim() === ""
            ) {

                name?.classList.add("invalid");

                valid = false;

                console.warn(
                    "⚠ Name validation failed"
                );

            }


            /* ------------------------------
               Email
            ------------------------------ */

            if (
                !email ||
                email.value.trim() === "" ||
                !email.checkValidity()
            ) {

                email?.classList.add("invalid");

                valid = false;

                console.warn(
                    "⚠ Email validation failed"
                );

            }


            /* ------------------------------
               Subject
            ------------------------------ */

            if (
                !subject ||
                subject.value.trim() === ""
            ) {

                subject?.classList.add("invalid");

                valid = false;

                console.warn(
                    "⚠ Subject validation failed"
                );

            }


            /* ------------------------------
               Message
            ------------------------------ */

            if (
                !message ||
                message.value.trim() === ""
            ) {

                message?.classList.add("invalid");

                valid = false;

                console.warn(
                    "⚠ Message validation failed"
                );

            }


            /* ==============================
               STOP IF INVALID
            ============================== */

            if (!valid) {

                console.warn(
                    "❌ FORM VALIDATION FAILED"
                );

                if (formStatus) {

                    formStatus.textContent =
                        "Please check the highlighted fields.";

                    formStatus.className =
                        "form-status error";

                }

                return;

            }


            console.log(
                "✓ Form validation passed"
            );


            /* ==============================
               LOADING STATE
            ============================== */

            submitButton.disabled = true;

            if (submitText) {

                submitText.style.display =
                    "none";

            }

            if (submitLoading) {

                submitLoading.style.display =
                    "inline";

            }

            if (formStatus) {

                formStatus.textContent = "";

                formStatus.className =
                    "form-status";

            }


            console.log(
                "✓ Loading state activated"
            );


            /* ==============================
               FORM DATA
            ============================== */

            const formData =
                new FormData(contactForm);


            console.log(
                "✓ FormData created"
            );


            /* ==============================
               DEBUG FORM DATA
            ============================== */

            console.log(
                "Form data being sent:"
            );

            for (
                const [key, value]
                of formData.entries()
            ) {

                console.log(
                    `${key}:`,
                    value
                );

            }


            /* ==============================
               SEND TO FORMSPREE
            ============================== */

            console.log(
                "================================="
            );

            console.log(
                "SENDING REQUEST TO FORMSPREE..."
            );

            console.log(
                "Endpoint:",
                FORMSPREE_ENDPOINT
            );

            console.log(
                "================================="
            );


            try {

                const response =
                    await fetch(
                        FORMSPREE_ENDPOINT,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                /* ==============================
                   RESPONSE DEBUG
                ============================== */

                console.log(
                    "Formspree response received"
                );

                console.log(
                    "Status:",
                    response.status
                );

                console.log(
                    "Status text:",
                    response.statusText
                );

                console.log(
                    "Response OK:",
                    response.ok
                );


                /* ==============================
                   SUCCESS
                ============================== */

                if (response.ok) {

                    console.log(
                        "================================="
                    );

                    console.log(
                        "✓ FORMSPREE SUBMISSION SUCCESSFUL"
                    );

                    console.log(
                        "================================="
                    );


                    contactForm.reset();


                    if (formStatus) {

                        formStatus.textContent =
                            "Message sent successfully.";

                        formStatus.className =
                            "form-status success";

                    }


                    if (submitText) {

                        submitText.textContent =
                            "SENT ✓";

                        submitText.style.display =
                            "inline";

                    }

                    if (submitLoading) {

                        submitLoading.style.display =
                            "none";

                    }


                    /* ------------------------------
                       Reset button after 3 seconds
                    ------------------------------ */

                    setTimeout(() => {

                        if (submitText) {

                            submitText.textContent =
                                "SUBMIT";

                        }

                        submitButton.disabled =
                            false;


                        if (formStatus) {

                            formStatus.textContent =
                                "";

                        }

                        console.log(
                            "✓ Submit button reset"
                        );

                    }, 3000);


                    return;

                }


                /* ==============================
                   FORMSPREE ERROR
                ============================== */

                console.error(
                    "❌ FORMSPREE RETURNED AN ERROR"
                );


                const data =
                    await response
                        .json()
                        .catch(() => null);


                console.error(
                    "Formspree error response:",
                    data
                );


                throw new Error(
                    data?.errors?.[0]?.message ||
                    `Formspree returned HTTP ${response.status}`
                );


            } catch (error) {

                console.error(
                    "================================="
                );

                console.error(
                    "❌ CONTACT FORM ERROR"
                );

                console.error(
                    "================================="
                );

                console.error(
                    error
                );


                /* ------------------------------
                   Error state
                ------------------------------ */

                if (formStatus) {

                    formStatus.textContent =
                        "Couldn't send your message. Please try again.";

                    formStatus.className =
                        "form-status error";

                }


                if (submitText) {

                    submitText.style.display =
                        "inline";

                }

                if (submitLoading) {

                    submitLoading.style.display =
                        "none";

                }

                submitButton.disabled =
                    false;

            }

        }
    );


    console.log(
        "✓ Submit event listener attached"
    );


} else {

    /* ==============================
       FORM NOT FOUND
    ============================== */

    console.error(
        "================================="
    );

    console.error(
        "❌ CONTACT FORM NOT FOUND"
    );

    console.error(
        "There is no element with id='contactForm'."
    );

    console.error(
        "================================="
    );

}


/* ==============================
   OFFICE ADDRESS SWITCHER
============================== */

const officeTabs =
    document.querySelectorAll(".office-tab");

const officePanels =
    document.querySelectorAll("[data-office-panel]");

const contactBackground =
    document.querySelector(".contact-bg");

const officeBackgrounds = {
    saudi: "./assets/section_imgs/contact_riyadh.webp",
    canada: "./assets/section_imgs/contact_canada.webp",
    australia: "./assets/section_imgs/contact_australia.webp",
    india: "./assets/section_imgs/contact_india.webp"
};

let backgroundRequest = 0;


function setOfficeBackground(office) {

    const source = officeBackgrounds[office];

    if (
        !contactBackground ||
        !source ||
        contactBackground.dataset.officeBackground === office
    ) {
        return;
    }

    const request = ++backgroundRequest;
    const image = new Image();

    image.onload = () => {

        if (request !== backgroundRequest) return;

        contactBackground.classList.add("is-changing");

        window.setTimeout(() => {

            if (request !== backgroundRequest) return;

            contactBackground.src = source;
            contactBackground.dataset.officeBackground = office;
            contactBackground.classList.remove("is-changing");

        }, 220);
    };

    image.src = source;
}


Object.values(officeBackgrounds).forEach(source => {
    const image = new Image();
    image.src = source;
});


if (officeTabs.length && officePanels.length) {

    const showOffice = office => {

        setOfficeBackground(office);

        officeTabs.forEach(tab => {
            const isActive = tab.dataset.office === office;

            tab.classList.toggle("is-active", isActive);
            tab.setAttribute("aria-selected", String(isActive));
            tab.tabIndex = isActive ? 0 : -1;
        });

        officePanels.forEach(panel => {
            const isActive = panel.dataset.officePanel === office;

            panel.hidden = !isActive;
            panel.classList.toggle("is-active", isActive);
        });
    };

    officeTabs.forEach((tab, index) => {
        tab.addEventListener("click", () => showOffice(tab.dataset.office));

        tab.addEventListener("keydown", event => {
            if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
                return;
            }

            event.preventDefault();

            const nextIndex = event.key === "Home"
                ? 0
                : event.key === "End"
                    ? officeTabs.length - 1
                    : (index + (event.key === "ArrowRight" ? 1 : -1) + officeTabs.length) % officeTabs.length;

            officeTabs[nextIndex].focus();
            showOffice(officeTabs[nextIndex].dataset.office);
        });
    });
}
