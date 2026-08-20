
// ============================================================
// SERVICE DATA
// ============================================================

const itData = {
    infrastructure: {
        title: "IT Infrastructure",
        subtitle: "Networks & Systems",
        description:
            "Reliable technology infrastructure designed around the way your organization operates. From networks and systems to monitoring and infrastructure management, we help create a stable foundation for your business.",
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85",
        icon: "⌘",
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
            "Cloud environments structured around scalable workloads, reliable operations and practical platform management.",
        image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",
        icon: "◈",
        capabilities: [
            "Cloud architecture and migration",
            "Platform management",
            "Scalable infrastructure planning",
            "Cloud operations",
            "Performance monitoring",
            "Cost-conscious deployment"
        ]
    },

    cybersecurity: {
        title: "Cybersecurity",
        subtitle: "Security & Risk",
        description:
            "Security practices designed to reduce exposure, strengthen controls and improve visibility across systems and workflows.",
        image:
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85",
        icon: "◇",
        capabilities: [
            "Security assessments",
            "Identity and access controls",
            "Risk visibility",
            "Monitoring and incident readiness",
            "Security policy support",
            "Infrastructure hardening"
        ]
    },

    transformation: {
        title: "Digital Transformation",
        subtitle: "Digital Workflows",
        description:
            "Technology-led improvements that simplify workflows, connect information and create more dependable operating models.",
        image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
        icon: "↗",
        capabilities: [
            "Workflow redesign",
            "Digital process mapping",
            "Systems integration",
            "Automation opportunities",
            "Operational visibility",
            "Technology adoption support"
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

    "27001": {
        title: "ISO 27001:2022",
        subtitle: "Information Security Management",
        description:
            "A systematic approach to managing information security risk, controls and governance across an organization.",
        image:
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Improves information security",
            "Strengthens risk management",
            "Supports security governance",
            "Improves control visibility",
            "Builds customer trust",
            "Supports continual improvement"
        ]
    },

    "20000": {
        title: "ISO 20000-1:2018",
        subtitle: "IT Service Management System",
        description:
            "A management system framework for delivering, monitoring and continually improving IT service management practices.",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Improves service consistency",
            "Strengthens service processes",
            "Improves operational visibility",
            "Supports continual improvement",
            "Aligns service delivery",
            "Builds customer confidence"
        ]
    },

    "50001": {
        title: "ISO 50001:2018",
        subtitle: "Energy Management System",
        description:
            "A framework for improving energy performance through systematic energy management, monitoring and continual improvement.",
        image:
            "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Improves energy performance",
            "Supports energy monitoring",
            "Reduces avoidable consumption",
            "Improves operational awareness",
            "Supports continual improvement",
            "Strengthens reporting"
        ]
    },

    "31000": {
        title: "ISO 31000:2018",
        subtitle: "Risk Management",
        description:
            "A principles-based framework for identifying, evaluating and managing risk across organizational activities.",
        image:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85",
        benefits: [
            "Improves risk visibility",
            "Supports structured decision-making",
            "Strengthens risk ownership",
            "Improves consistency",
            "Supports resilience",
            "Encourages continual review"
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
    "27001": ["◉", "ISO 27001:2022", "Information Security Management"],
    "20000": ["▣", "ISO 20000-1:2018", "IT Service Management System"],
    "50001": ["⚡", "ISO 50001:2018", "Energy Management System"],
    "31000": ["◌", "ISO 31000:2018", "Risk Management"]
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
