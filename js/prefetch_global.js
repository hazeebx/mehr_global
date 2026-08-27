// ==========================
// HEADER PAGE PREFETCH
// ==========================

document.querySelectorAll(".nav-left a[href]").forEach(link => {

    link.addEventListener("pointerenter", () => {

        const href = link.href;

        // Ignore same-page anchors and special links
        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:")
        ) {
            return;
        }

        // Don't prefetch the same page twice
        if (
            document.querySelector(
                `link[rel="prefetch"][href="${href}"]`
            )
        ) {
            return;
        }

        const prefetch =
            document.createElement("link");

        prefetch.rel = "prefetch";
        prefetch.href = href;

        document.head.appendChild(prefetch);

    }, { once: true });

});

// ==========================
// PREFETCH SERVICES
// ==========================

if (
    window.location.pathname.endsWith("/") ||
    window.location.pathname.endsWith("index.html")
) {

    const servicesPrefetch =
        document.createElement("link");

    servicesPrefetch.rel = "prefetch";

    servicesPrefetch.href =
        "./services_page/services.html";

    document.head.appendChild(servicesPrefetch);
}