
// ============================================================
// SERVICE DATA
// ============================================================

const itData = {
    "27001": {
        title: "ISO 27001",
        subtitle: "Information Security Management System",
        description:
            "A systematic framework for managing information security risks, protecting sensitive information and strengthening security controls across the organization.",
        image:
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85",
        icon: "◇",
        capabilities: [
            "Information security risk management",
            "Security controls and governance",
            "Information asset protection",
            "Access and identity management",
            "Security monitoring and incident readiness",
            "Continual improvement of information security"
        ]
    },

    "20000": {
        title: "ISO 20000",
        subtitle: "IT Service Management System",
        description:
            "A management system framework for delivering consistent, reliable and continually improving IT services aligned with organizational and customer needs.",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
        icon: "◈",
        capabilities: [
            "IT service management processes",
            "Service delivery and support",
            "Service performance management",
            "Incident and problem management",
            "Service continuity and availability",
            "Continual service improvement"
        ]
    },

    itil: {
        title: "ITIL",
        subtitle: "IT Service Management",
        description:
            "IT service management practices designed to improve service delivery, operational efficiency and alignment between technology services and business needs.",
        image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
        icon: "↗",
        capabilities: [
            "IT service management practices",
            "Service design and delivery",
            "Incident and problem management",
            "Change and service transition",
            "Service performance improvement",
            "Business and IT alignment"
        ]
    }
};

const isoData = {
    "9001": {
        title: "ISO 9001:2015",
        subtitle: "Quality Management System",
        description:
            "ISO 9001:2015 is the internationally recognized standard for quality management systems (QMS). It helps organizations improve performance, meet customer expectations and demonstrate their commitment to quality.",
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
            "A framework for managing environmental responsibilities in a systematic way while supporting operational improvement and stronger environmental performance.",
        image:
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Improves environmental performance",
            "Supports regulatory compliance",
            "Reduces operational waste",
            "Strengthens environmental awareness",
            "Improves stakeholder confidence",
            "Encourages continual improvement"
        ]
    },

    "45001": {
        title: "ISO 45001:2018",
        subtitle: "Occupational Health & Safety",
        description:
            "A management system framework focused on improving occupational health and safety performance and reducing workplace risk.",
        image:
            "https://images.unsplash.com/photo-1581091215367-59ab6ad3c27f?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Reduces workplace risks",
            "Strengthens safety processes",
            "Improves employee participation",
            "Supports compliance",
            "Improves incident readiness",
            "Encourages continual improvement"
        ]
    },

    "13485": {
        title: "ISO 13485:2016",
        subtitle: "Medical Devices QMS",
        description:
            "A quality management system framework for organizations involved in the design, production and lifecycle support of medical devices.",
        image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Supports consistent quality",
            "Improves traceability",
            "Supports regulatory requirements",
            "Strengthens documentation",
            "Improves risk management",
            "Supports lifecycle controls"
        ]
    },

    "17025": {
        title: "ISO 17025:2017",
        subtitle: "Laboratory Management System",
        description:
            "A framework for laboratory competence, consistent testing and dependable measurement practices.",
        image:
            "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Demonstrates laboratory competence",
            "Improves testing consistency",
            "Strengthens measurement practices",
            "Supports reliable results",
            "Improves technical confidence",
            "Supports continual improvement"
        ]
    },

    "22000": {
        title: "ISO 22000:2018",
        subtitle: "Food Safety Management System",
        description:
            "A management system approach for organizations involved in the food chain to manage food safety hazards systematically.",
        image:
            "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Strengthens food safety controls",
            "Supports regulatory compliance",
            "Improves hazard management",
            "Strengthens traceability",
            "Improves operational discipline",
            "Builds stakeholder confidence"
        ]
    },

    "22301": {
        title: "ISO 22301",
        subtitle: "Business Continuity Management System",
        description:
            "A management system framework that helps organizations prepare for, respond to and recover from disruptive incidents while maintaining critical business operations.",
        image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Strengthens business resilience",
            "Improves preparedness for disruptions",
            "Supports continuity of critical operations",
            "Improves incident response",
            "Strengthens recovery planning",
            "Builds stakeholder confidence"
        ]
    }





};


// ============================================================
// RENDER IT LIST
// ============================================================

const itList = document.getElementById("itList");

function renderItList(filter = "") {
    itList.innerHTML = "";

    Object.entries(itData)
        .filter(([key, item]) => {
            const q = filter.trim().toLowerCase();

            if (!q) return true;

            return (
                item.title.toLowerCase().includes(q) ||
                item.subtitle.toLowerCase().includes(q)
            );
        })
        .forEach(([key, item], index) => {

            const button = document.createElement("button");
            button.type = "button";
            button.className = "explorer-item" + (index === 0 ? " active" : "");

            button.dataset.it = key;

            button.innerHTML = `
                <span class="item-icon">${item.icon}</span>
                <span class="item-copy">
                    <span class="item-code">${item.title}</span>
                    <span class="item-name">${item.subtitle}</span>
                </span>
                <span class="item-arrow">›</span>
            `;

            itList.appendChild(button);
        });

    const first = itList.querySelector(".explorer-item");

    if (first) {
        updateItPanel(first.dataset.it);
    }
}

function updateItPanel(key) {
    const item = itData[key];

    if (!item) return;

    document.querySelectorAll("#itList .explorer-item").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.it === key);
    });

    document.getElementById("itTitle").textContent = item.title;
    document.getElementById("itSubtitle").textContent = item.subtitle;
    document.getElementById("itDescription").textContent = item.description;

    const image = document.getElementById("itImage");
    image.src = item.image;
    image.alt = item.title;

    document.getElementById("itCapabilities").innerHTML =
        item.capabilities
            .map(text => `
                <div class="check-item">
                    <span class="check">✓</span>
                    <span>${text}</span>
                </div>
            `)
            .join("");
}

itList.addEventListener("click", (event) => {
    const button = event.target.closest(".explorer-item");
    if (!button) return;

    updateItPanel(button.dataset.it);
});

document.getElementById("itSearch").addEventListener("input", (event) => {
    renderItList(event.target.value);
});

renderItList();


// ============================================================
// RENDER ISO LIST
// ============================================================

const isoList = document.getElementById("isoList");

const isoLabels = {
    "9001": ["◎", "ISO 9001:2015", "Quality Management System"],
    "14001": ["◯", "ISO 14001:2015", "Environmental Management System"],
    "45001": ["♙", "ISO 45001:2018", "Occupational Health & Safety"],
    "13485": ["◈", "ISO 13485:2016", "Medical Devices QMS"],
    "17025": ["⚗", "ISO 17025:2017", "Laboratory Management System"],
    "22000": ["♜", "ISO 22000:2018", "Food Safety Management System"],
    "22301": ["♜", "ISO 22301", "Business Continuity Management System"]

};

function renderIsoList(filter = "") {
    isoList.innerHTML = "";

    Object.entries(isoData)
        .filter(([key, item]) => {
            const q = filter.trim().toLowerCase();
            if (!q) return true;

            return (
                item.title.toLowerCase().includes(q) ||
                item.subtitle.toLowerCase().includes(q)
            );
        })
        .forEach(([key, item], index) => {

            const [icon, code, name] = isoLabels[key];

            const button = document.createElement("button");

            button.type = "button";
            button.className = "explorer-item" + (index === 0 ? " active" : "");
            button.dataset.iso = key;

            button.innerHTML = `
                <span class="item-icon">${icon}</span>
                <span class="item-copy">
                    <span class="item-code">${code}</span>
                    <span class="item-name">${name}</span>
                </span>
                <span class="item-arrow">›</span>
            `;

            isoList.appendChild(button);
        });

    const first = isoList.querySelector(".explorer-item");

    if (first) {
        updateIsoPanel(first.dataset.iso);
    }
}

function updateIsoPanel(key) {
    const item = isoData[key];

    if (!item) return;

    document.querySelectorAll("#isoList .explorer-item").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.iso === key);
    });

    document.getElementById("isoTitle").textContent = item.title;
    document.getElementById("isoSubtitle").textContent = item.subtitle;
    document.getElementById("isoDescription").textContent = item.description;

    const image = document.getElementById("isoImage");
    image.src = item.image;
    image.alt = item.title;

    document.getElementById("isoBenefits").innerHTML =
        item.benefits
            .map(text => `
                <div class="check-item">
                    <span class="check">✓</span>
                    <span>${text}</span>
                </div>
            `)
            .join("");
}

isoList.addEventListener("click", (event) => {
    const button = event.target.closest(".explorer-item");
    if (!button) return;

    updateIsoPanel(button.dataset.iso);
});

document.getElementById("isoSearch").addEventListener("input", (event) => {
    renderIsoList(event.target.value);
});

renderIsoList();


// ============================================================
// RENDER API LIST
// ============================================================

const apiData = {

    "q1": {
        title: "API Spec Q1",
        subtitle: "Quality Management System",
        description:
            "API Spec Q1 is a quality management system standard designed for organizations manufacturing products for the petroleum and natural gas industry. It provides a structured framework for quality, operational control and continual improvement.",
        image:
            "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=85",
        icon: "◈",
        capabilities: [
            "Quality management system implementation",
            "Manufacturing process controls",
            "Product quality and consistency",
            "Supplier and purchasing controls",
            "Risk and operational management",
            "Continual improvement"
        ]
    },


    "q2": {
        title: "API Spec Q2",
        subtitle: "Service Supply Organization QMS",
        description:
            "API Spec Q2 provides a quality management system framework for organizations involved in service-related activities within the petroleum and natural gas industry.",
        image:
            "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=85",
        icon: "◇",
        capabilities: [
            "Service quality management",
            "Operational risk management",
            "Service delivery controls",
            "Equipment and resource management",
            "Supplier and subcontractor controls",
            "Continual service improvement"
        ]
    },


    "monogram": {
        title: "API Monogram Program",
        subtitle: "Product Certification",
        description:
            "The API Monogram Program supports manufacturers seeking recognition that their products conform to applicable API specifications and quality requirements.",
        image:
            "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=900&q=85",
        icon: "◎",
        capabilities: [
            "API Monogram certification support",
            "Product specification compliance",
            "Quality management system requirements",
            "Manufacturing process controls",
            "Documentation and record controls",
            "Certification readiness"
        ]
    }

};


// ============================================================
// API LABELS
// ============================================================

const apiLabels = {

    "q1": [
        "◈",
        "API Spec Q1",
        "Quality Management System"
    ],

    "q2": [
        "◇",
        "API Spec Q2",
        "Service Supply Organization QMS"
    ],

    "monogram": [
        "◎",
        "API Monogram",
        "Product Certification"
    ]

};


// ============================================================
// RENDER API LIST
// ============================================================

const apiList = document.getElementById("apiList");

function renderApiList(filter = "") {

    if (!apiList) return;

    apiList.innerHTML = "";

    Object.entries(apiData)

        .filter(([key, item]) => {

            const q = filter.trim().toLowerCase();

            if (!q) return true;

            return (
                item.title.toLowerCase().includes(q) ||
                item.subtitle.toLowerCase().includes(q)
            );

        })

        .forEach(([key, item], index) => {

            const [icon, code, name] =
                apiLabels[key];

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "explorer-item" +
                (index === 0 ? " active" : "");

            button.dataset.api = key;

            button.innerHTML = `

                <span class="item-icon">
                    ${icon}
                </span>

                <span class="item-copy">

                    <span class="item-code">
                        ${code}
                    </span>

                    <span class="item-name">
                        ${name}
                    </span>

                </span>

                <span class="item-arrow">
                    ›
                </span>

            `;

            apiList.appendChild(button);

        });


    const first =
        apiList.querySelector(".explorer-item");

    if (first) {

        updateApiPanel(
            first.dataset.api
        );

    }

}


// ============================================================
// UPDATE API PANEL
// ============================================================

function updateApiPanel(key) {

    const item = apiData[key];

    if (!item) return;


    document
        .querySelectorAll("#apiList .explorer-item")
        .forEach(btn => {

            btn.classList.toggle(
                "active",
                btn.dataset.api === key
            );

        });


    document.getElementById("apiTitle")
        .textContent = item.title;


    document.getElementById("apiSubtitle")
        .textContent = item.subtitle;


    document.getElementById("apiDescription")
        .textContent = item.description;


    const image =
        document.getElementById("apiImage");

    image.src = item.image;
    image.alt = item.title;


    document.getElementById("apiCapabilities")
        .innerHTML =

        item.capabilities

            .map(text => `

                <div class="check-item">

                    <span class="check">
                        ✓
                    </span>

                    <span>
                        ${text}
                    </span>

                </div>

            `)

            .join("");

}


// ============================================================
// API LIST CLICK
// ============================================================

if (apiList) {

    apiList.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    ".explorer-item"
                );

            if (!button) return;

            updateApiPanel(
                button.dataset.api
            );

        }
    );

}


// ============================================================
// API SEARCH
// ============================================================

const apiSearch =
    document.getElementById("apiSearch");

if (apiSearch) {

    apiSearch.addEventListener(
        "input",
        (event) => {

            renderApiList(
                event.target.value
            );

        }
    );

}


// ============================================================
// INITIAL API RENDER
// ============================================================

renderApiList();



const contractingData = {
    hvac: {
        title: "HVAC Maintenance Services",
        subtitle: "Heating, Ventilation & Air Conditioning",
        description:
            "Integrated HVAC maintenance services focused on reliable system performance, energy efficiency and long-term equipment reliability across critical facilities.",
        image:
            "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=85",
        icon: "❄",
        capabilities: [
            "Preventive maintenance",
            "Predictive maintenance",
            "Corrective maintenance",
            "Chiller overhauling",
            "Air duct cleaning",
            "Indoor air quality management",
            "Energy audits & efficiency optimization"
        ]
    },

    fireProtection: {
        title: "Fire Protection System Maintenance",
        subtitle: "Fire Safety & Protection",
        description:
            "Comprehensive fire protection maintenance designed to keep critical safety systems operational, compliant and ready to respond when required.",
        image:
            "https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=900&q=85",
        icon: "♨",
        capabilities: [
            "Fire pump testing & inspection",
            "Sprinkler system inspection",
            "Fire alarm testing & maintenance",
            "Emergency system verification",
            "Civil defense compliance support"
        ]
    },

    solar: {
        title: "Solar System Maintenance Services",
        subtitle: "Solar Energy & Performance",
        description:
            "Solar system services covering design, installation, maintenance and performance optimization to support reliable and efficient energy generation.",
        image:
            "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85",
        icon: "☀",
        capabilities: [
            "Solar plant design & engineering",
            "Solar panel installation",
            "Panel cleaning & preventive maintenance",
            "Performance monitoring & reporting",
            "Inverter maintenance",
            "Battery inspection & testing",
            "Energy yield optimization"
        ]
    }
};

const contractingIndustries = [
    "Hotels & Hospitality",
    "Hospitals & Healthcare",
    "Airports & Aviation",
    "Educational Institutions",
    "Universities & Research Centers",
    "Metro & Rail Infrastructure",
    "Industrial Facilities",
    "Manufacturing Plants",
    "Commercial Buildings",
    "Shopping Malls",
    "Data Centers",
    "Government Projects",
    "Residential Developments",
    "Oil & Gas Support Facilities",
    "Logistics & Warehousing Centers"
];

// ============================================================
// RENDER CONTRACTING LIST
// ============================================================

const contractingList =
    document.getElementById("contractingList");


function renderContractingList(filter = "") {

    contractingList.innerHTML = "";

    Object.entries(contractingData)

        .filter(([key, item]) => {

            const q =
                filter.trim().toLowerCase();

            if (!q) return true;

            return (
                item.title
                    .toLowerCase()
                    .includes(q) ||

                item.subtitle
                    .toLowerCase()
                    .includes(q)
            );

        })

        .forEach(([key, item], index) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "explorer-item" +
                (index === 0 ? " active" : "");

            button.dataset.contracting = key;

            button.innerHTML = `
                <span class="item-icon">
                    ${item.icon}
                </span>

                <span class="item-copy">

                    <span class="item-code">
                        ${item.title}
                    </span>

                    <span class="item-name">
                        ${item.subtitle}
                    </span>

                </span>

                <span class="item-arrow">
                    ›
                </span>
            `;

            contractingList.appendChild(button);

        });


    const first =
        contractingList.querySelector(
            ".explorer-item"
        );


    if (first) {

        updateContractingPanel(
            first.dataset.contracting
        );

    }

}


// ============================================================
// UPDATE CONTRACTING PANEL
// ============================================================

function updateContractingPanel(key) {

    const item =
        contractingData[key];

    if (!item) return;


    document
        .querySelectorAll(
            "#contractingList .explorer-item"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.contracting === key
            );

        });


    document
        .getElementById("contractingTitle")
        .textContent = item.title;


    document
        .getElementById("contractingSubtitle")
        .textContent = item.subtitle;


    document
        .getElementById("contractingDescription")
        .textContent = item.description;


    const image =
        document.getElementById(
            "contractingImage"
        );


    image.src = item.image;

    image.alt = item.title;


    document
        .getElementById(
            "contractingCapabilities"
        )
        .innerHTML =

        item.capabilities

            .map(text => `
                <div class="check-item">

                    <span class="check">
                        ✓
                    </span>

                    <span>
                        ${text}
                    </span>

                </div>
            `)

            .join("");

}


// ============================================================
// CONTRACTING CLICK
// ============================================================

contractingList.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".explorer-item"
            );

        if (!button) return;

        updateContractingPanel(
            button.dataset.contracting
        );

    }
);


// ============================================================
// CONTRACTING SEARCH
// ============================================================

document
    .getElementById("contractingSearch")
    .addEventListener(
        "input",
        event => {

            renderContractingList(
                event.target.value
            );

        }
    );


// INITIAL RENDER

renderContractingList();

// ============================================================
// COLLAPSIBLE MASTER SERVICE SIDEBAR
// ============================================================

const servicesLayout =
    document.querySelector(".services-layout");

const serviceSidebarToggle =
    document.getElementById("serviceSidebarToggle");

if (servicesLayout && serviceSidebarToggle) {

    serviceSidebarToggle.addEventListener("click", () => {

        const collapsed =
            servicesLayout.classList.toggle(
                "sidebar-collapsed"
            );

        serviceSidebarToggle.setAttribute(
            "aria-expanded",
            String(!collapsed)
        );

        serviceSidebarToggle.setAttribute(
            "aria-label",
            collapsed
                ? "Expand services sidebar"
                : "Collapse services sidebar"
        );

    });
}


// ============================================================
// MASTER SERVICE NAVIGATION
// ============================================================

const masterTabs = document.querySelectorAll(".master-tab");
const servicePanels = document.querySelectorAll(".service-panel");

function showService(service) {
    masterTabs.forEach(tab => {
        tab.classList.toggle(
            "active",
            tab.dataset.service === service
        );
    });

    servicePanels.forEach(panel => {
        panel.classList.toggle(
            "active",
            panel.dataset.panel === service
        );
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

masterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        showService(tab.dataset.service);
    });
});


// ============================================================
// DESIGN CARD DETAILS
// ============================================================

document.querySelectorAll(".design-card").forEach(card => {
    const openButton = card.querySelector(".design-card-toggle");
    const closeButton = card.querySelector(".design-card-back");
    const detail = card.querySelector(".design-card-detail");

    if (!openButton || !closeButton || !detail) return;

    const setExpanded = expanded => {
        card.classList.toggle("is-expanded", expanded);
        openButton.setAttribute("aria-expanded", String(expanded));
        detail.setAttribute("aria-hidden", String(!expanded));

        if (expanded) {
            closeButton.focus();
        } else {
            openButton.focus();
        }
    };

    openButton.addEventListener("click", () => setExpanded(true));
    closeButton.addEventListener("click", () => setExpanded(false));
});
