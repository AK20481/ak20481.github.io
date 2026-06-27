(function () {
    var bgText = document.querySelector(".bg-text");
    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    var currentX = mouseX;
    var currentY = mouseY;
    var textW = 0;
    var textH = 0;

    function calculateMaxFontSize() {
        var refSize = 100;
        bgText.style.fontSize = refSize + "px";
        textW = bgText.offsetWidth;
        textH = bgText.offsetHeight;
        var scale = Math.min(
            (window.innerWidth * 0.98) / textW,
            (window.innerHeight * 0.98) / textH,
        );
        bgText.style.fontSize = refSize * scale + "px";
        textW = bgText.offsetWidth;
        textH = bgText.offsetHeight;
    }

    function animate() {
        currentX += (mouseX - currentX) * 0.2;
        currentY += (mouseY - currentY) * 0.2;
        bgText.style.left = currentX - textW / 2 + "px";
        bgText.style.top = currentY - textH / 2 + "px";
        requestAnimationFrame(animate);
    }
    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener(
        "touchmove",
        function (e) {
            if (e.touches.length > 0) {
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
            }
        },
        { passive: true },
    );

    window.addEventListener("resize", calculateMaxFontSize);

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(calculateMaxFontSize);
    }

    calculateMaxFontSize();
    animate();
})();
