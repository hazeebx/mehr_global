/* =========================================================
   SERVICE NAVIGATION
========================================================= */

const navLinks = document.querySelectorAll(".nav-link");
const servicePages = document.querySelectorAll(".service-page");

function showService(serviceName) {

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.service === serviceName
        );
    });

    servicePages.forEach(page => {
        page.classList.toggle(
            "active",
            page.id === `service-${serviceName}`
        );
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

navLinks.forEach(link => {

    link.addEventListener("click", () => {
        showService(link.dataset.service);
    });

});


/* =========================================================
   ISO DATA
========================================================= */

const isoData = {

    "9001": {
        title: "ISO 9001:2015",
        subtitle: "Quality Management System",
        description:
            "ISO 9001:2015 is the internationally recognized standard for quality management systems (QMS). It helps organizations of all sizes and industries to improve performance, meet customer expectations and demonstrate their commitment to quality.",
        image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Improves customer satisfaction and loyalty",
            "Increases credibility and market opportunities",
            "Enhances operational efficiency and productivity",
            "Supports regulatory and statutory requirements",
            "Ensures consistent quality of products and services",
            "Drives continual improvement across the organization"
        ]
    },

    "14001": {
        title: "ISO 14001:2015",
        subtitle: "Environmental Management System",
        description:
            "ISO 14001:2015 provides a framework for organizations to protect the environment and respond to changing environmental conditions in balance with socio-economic needs.",
        image:
            "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Reduces environmental impact",
            "Improves resource efficiency",
            "Helps meet environmental regulations",
            "Strengthens environmental performance",
            "Reduces waste and operational costs",
            "Supports long-term sustainability"
        ]
    },

    "45001": {
        title: "ISO 45001:2018",
        subtitle: "Occupational Health & Safety",
        description:
            "ISO 45001:2018 provides organizations with a framework to create safer workplaces, reduce occupational risks and continually improve occupational health and safety performance.",
        image:
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Reduces workplace risks",
            "Improves employee safety",
            "Reduces workplace incidents",
            "Strengthens safety culture",
            "Supports legal compliance",
            "Improves organizational performance"
        ]
    },

    "13485": {
        title: "ISO 13485:2016",
        subtitle: "Medical Devices Quality Management System",
        description:
            "ISO 13485:2016 specifies requirements for a quality management system where an organization needs to demonstrate its ability to provide medical devices and related services that consistently meet regulatory requirements.",
        image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Improves medical device quality",
            "Supports regulatory compliance",
            "Reduces product risks",
            "Improves manufacturing processes",
            "Builds customer confidence",
            "Supports international market access"
        ]
    },

    "17025": {
        title: "ISO 17025:2017",
        subtitle: "Laboratory Competence Standard",
        description:
            "ISO/IEC 17025:2017 establishes general requirements for the competence, impartiality and consistent operation of laboratories.",
        image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Demonstrates laboratory competence",
            "Improves testing accuracy",
            "Strengthens credibility",
            "Supports regulatory requirements",
            "Improves laboratory processes",
            "Builds customer confidence"
        ]
    },

    "22000": {
        title: "ISO 22000:2018",
        subtitle: "Food Safety Management System",
        description:
            "ISO 22000:2018 provides a framework for organizations involved in the food chain to identify, control and prevent food safety hazards.",
        image:
            "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Improves food safety",
            "Reduces food safety hazards",
            "Strengthens customer trust",
            "Supports regulatory compliance",
            "Improves supply-chain control",
            "Enhances operational efficiency"
        ]
    },

    "27001": {
        title: "ISO 27001:2022",
        subtitle: "Information Security Management System",
        description:
            "ISO 27001:2022 specifies requirements for establishing, implementing, maintaining and continually improving an information security management system.",
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Protects sensitive information",
            "Reduces cybersecurity risks",
            "Improves security controls",
            "Supports regulatory compliance",
            "Builds customer trust",
            "Strengthens business resilience"
        ]
    },

    "20000": {
        title: "ISO 20000-1:2018",
        subtitle: "IT Service Management System",
        description:
            "ISO 20000-1:2018 specifies requirements for establishing, implementing, maintaining and continually improving a service management system.",
        image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Improves IT service quality",
            "Increases customer satisfaction",
            "Standardizes service processes",
            "Improves operational efficiency",
            "Reduces service risks",
            "Supports continual improvement"
        ]
    },

    "50001": {
        title: "ISO 50001:2018",
        subtitle: "Energy Management System",
        description:
            "ISO 50001:2018 provides organizations with a framework for establishing energy management systems and continually improving energy performance.",
        image:
            "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Improves energy performance",
            "Reduces energy consumption",
            "Lowers operational costs",
            "Improves energy efficiency",
            "Supports sustainability goals",
            "Reduces environmental impact"
        ]
    },

    "31000": {
        title: "ISO 31000:2018",
        subtitle: "Risk Management Guidelines",
        description:
            "ISO 31000:2018 provides principles, frameworks and processes for managing risk across organizations of all sizes and industries.",
        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Improves risk awareness",
            "Supports better decision-making",
            "Reduces organizational risks",
            "Improves resilience",
            "Strengthens governance",
            "Supports strategic objectives"
        ]
    }

};


/* =========================================================
   ISO UI
========================================================= */

const isoItems = document.querySelectorAll(".iso-item");
const isoTitle = document.getElementById("isoTitle");
const isoSubtitle = document.getElementById("isoSubtitle");
const isoDescription = document.getElementById("isoDescription");
const isoImage = document.getElementById("isoImage");
const benefitsGrid = document.getElementById("benefitsGrid");
const isoContent = document.getElementById("isoContent");
const isoSearch = document.getElementById("isoSearch");

function updateISO(iso) {

    const data = isoData[iso];

    if (!data) {
        return;
    }

    isoTitle.textContent = data.title;
    isoSubtitle.textContent = data.subtitle;
    isoDescription.textContent = data.description;

    isoImage.src = data.image;
    isoImage.alt = data.title;

    benefitsGrid.innerHTML = "";

    data.benefits.forEach(benefit => {

        const item = document.createElement("div");

        item.className = "benefit-point";

        item.innerHTML = `
            <span class="check">✓</span>
            <span>${benefit}</span>
        `;

        benefitsGrid.appendChild(item);
    });

    isoContent.classList.toggle(
        "environment",
        iso === "14001"
    );
}

isoItems.forEach(item => {

    item.addEventListener("click", () => {

        isoItems.forEach(isoItem => {
            isoItem.classList.remove("active");
        });

        item.classList.add("active");

        updateISO(item.dataset.iso);
    });

});


/* =========================================================
   ISO SEARCH
========================================================= */

isoSearch.addEventListener("input", () => {

    const query = isoSearch.value
        .toLowerCase()
        .trim();

    isoItems.forEach(item => {

        const text = item.textContent
            .toLowerCase();

        item.style.display =
            text.includes(query)
                ? ""
                : "none";
    });

});


/* =========================================================
   INITIAL STATE
========================================================= */

updateISO("9001");
