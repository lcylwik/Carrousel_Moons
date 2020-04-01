import { createRef } from 'react';

let loadedCnt = 0;

const loadedImg = ((el, callback, totalSlides, style = true) => {
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

const loadedImg2 = ((el, callback, totalSlides, style = true) => {
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
    let img2 = el.lastElementChild;
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

    if (img2) {
        img2.onload = loadHandler;
        img2.src = require(`${img2.dataset.src}`);
        if (style) img2.style.width = "100%";
        img2.style.display = 'block';
        if (img2.complete) {
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

const getStyleItemByProperty = (node, property) => {
    const nodeStyle = window.getComputedStyle(node)
    let styles = parseInt(nodeStyle.getPropertyValue(property));
    return styles;
}

export {loadedImg, loadedImg2, dinamicRef, getStyleItemByProperty}