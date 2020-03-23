let loadedCnt = 0;

const loadedImg = ((el, callback, totalSlides) => {
    let loaded = false;
    const loadHandler = () => {
        if (loaded) return;
        loaded = true;
        loadedCnt++;
        if (loadedCnt >= totalSlides) {
            callback();
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
        callback();
    }
})

export {loadedImg}