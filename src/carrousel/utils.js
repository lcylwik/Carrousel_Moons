const loadedImg = ((el, callback, totalSlides) => {
    let loaded = false, loadedCnt = 0;
    const loadHandler = () => {
        if (loaded) return;
        loaded = true;
        loadedCnt++;
        if (loadedCnt >= totalSlides) {
            this.callback();
        }
    }

    let img = el.firstElementChild;
    if (img) {
        img.onload = loadHandler;
        img.src = require(`${img.dataset.src}`);
        img.style.width = "100%";
        img.style.display = 'block';
        if (img.complete) {
            loadHandler()
        }
    } else {
        this.callback();
    }
})

export {loadedImg}