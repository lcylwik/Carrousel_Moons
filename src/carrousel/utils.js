import { createRef } from 'react';

let loadedCnt = 0;

const loadedImg = ((el, callback, totalSlides, style = true) => {
    debugger
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
        if (style) img.style.width = "100%";
        img.style.display = 'block';
        if (img.complete) {
            loadHandler()
        }
    } else {
        callback();
    }
})

const dinamicRef = (total) => {
    let refs = [];
    for (let i = 0; i < total; i++) {
        refs[i] = createRef();
    }
    return refs
}

export {loadedImg, dinamicRef}