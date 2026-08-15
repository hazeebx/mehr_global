/* =========================================================
   IT SERVICES DATA
========================================================= */

const itData = {

    infrastructure: {

        title: "IT Infrastructure",

        subtitle: "Networks & Systems",

        description:
            "Reliable technology infrastructure designed around " +
            "the way your organization operates. From networks and " +
            "systems to monitoring and infrastructure management, " +
            "we help create a stable foundation for your business.",

        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85",

        capabilities: [

            "Network architecture and infrastructure",

            "Server and systems management",

            "Infrastructure monitoring",

            "Hardware and technology deployment",

            "System reliability and performance",

            "IT infrastructure optimization"

        ]

    },


    cloud: {

        title: "Cloud Solutions",

        subtitle: "Cloud & Platforms",

        description:
            "Secure and scalable cloud environments that make " +
            "collaboration, accessibility and business growth " +
            "simpler. We help organizations adopt and manage " +
            "cloud technologies according to their operational needs.",

        image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",

        capabilities: [

            "Cloud infrastructure planning",

            "Cloud migration and deployment",

            "Cloud environment management",

            "Scalable cloud architectures",

            "Data and application accessibility",

            "Cloud performance optimization"

        ]

    },


    cybersecurity: {

        title: "Cybersecurity",

        subtitle: "Security & Risk",

        description:
            "Practical cybersecurity solutions designed to protect " +
            "your organization's systems, data and operations. " +
            "We focus on strengthening security controls, reducing " +
            "risk and improving organizational resilience.",

        image:
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85",

        capabilities: [

            "Cybersecurity assessments",

            "Security controls and policies",

            "Risk identification and mitigation",

            "System and network protection",

            "Security monitoring",

            "Business continuity and resilience"

        ]

    },


    transformation: {

        title: "Digital Transformation",

        subtitle: "Digital Workflows",

        description:
            "Transform repetitive and manual processes into " +
            "streamlined digital workflows. We help organizations " +
            "use technology to improve efficiency, connect teams " +
            "and create more effective ways of working.",

        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",

        capabilities: [

            "Digital process optimization",

            "Workflow automation",

            "Business process digitization",

            "Technology integration",

            "Operational efficiency improvement",

            "Digital strategy and implementation"

        ]

    }

};


/* =========================================================
   IT UI
========================================================= */

const itItems =
    document.querySelectorAll(".it-item");

const itTitle =
    document.getElementById("itTitle");

const itSubtitle =
    document.getElementById("itSubtitle");

const itDescription =
    document.getElementById("itDescription");

const itImage =
    document.getElementById("itImage");

const itCapabilitiesGrid =
    document.getElementById("itCapabilitiesGrid");

const itContent =
    document.getElementById("itContent");

const itSearch =
    document.getElementById("itSearch");


/* =========================================================
   UPDATE IT SERVICE
========================================================= */

function updateIT(service) {

    const data = itData[service];

    if (!data) {
        return;
    }


    /* Text */

    itTitle.textContent =
        data.title;

    itSubtitle.textContent =
        data.subtitle;

    itDescription.textContent =
        data.description;


    /* Image */

    itImage.src =
        data.image;

    itImage.alt =
        data.title;


    /* Capabilities */

    itCapabilitiesGrid.innerHTML = "";


    data.capabilities.forEach(capability => {

        const item =
            document.createElement("div");

        item.className =
            "it-capability-point";

        item.innerHTML = `
            <span class="it-check">✓</span>
            <span>${capability}</span>
        `;

        itCapabilitiesGrid.appendChild(item);

    });

}


/* =========================================================
   IT NAVIGATION
========================================================= */

itItems.forEach(item => {

    item.addEventListener("click", () => {

        itItems.forEach(itItem => {

            itItem.classList.remove("active");

        });


        item.classList.add("active");


        updateIT(
            item.dataset.it
        );

    });

});


/* =========================================================
   IT SEARCH
========================================================= */

itSearch.addEventListener("input", () => {

    const query =
        itSearch.value
            .toLowerCase()
            .trim();


    itItems.forEach(item => {

        const text =
            item.textContent
                .toLowerCase();


        item.style.display =
            text.includes(query)
                ? ""
                : "none";

    });

});


/* =========================================================
   IT INITIAL STATE
========================================================= */

updateIT("infrastructure");