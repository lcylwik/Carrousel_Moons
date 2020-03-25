import { createRef } from 'react';

let loadedCnt = 0;

const loadedImg = ((el, callback, totalSlides) => {
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

    let div = el.firstElementChild;
    let image = require(`${el.dataset.image}`);
    if (el) {
        el.onload = loadHandler;
       // el.style.backgroundImage = `url("../../assets/comment_1/group-15@2x.png")`;
        el.style.backgroundImage = `url(${image})`;
        //   backgroundImage: "url(" + { Background } + ")"
        // div.src = require(`${img.dataset.src}`);
        if (el.complete) {
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