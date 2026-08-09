window.addEventListener("load", () => {
    const archiveImages = document.querySelectorAll(".archive_grid img");

    archiveImages.forEach(img => {
        const preload = new Image();
        preload.src = img.src;
    });
});