import React, { useEffect, useState, useRef } from 'react';
import './style/slider.css'
import './style/index.css'
import Description from './description';
import LinkCita from './linkCita';

const Mobile = (props) => {

    let { info } = props
    let scrollTimeout;
    let initialBooton = [true, false, false];
    let step_1 = 0, step_2 = 300, step_3 = 631;
    const [touchBoton, setTouchBoton] = useState(false);
    const [positionBootons, setPositionBootons] = useState(initialBooton);

    let refSlider = useRef(null);
    let refSliderContainer = useRef(null);
    let refImage = useRef(null);

    useEffect(() => {

    }, []);


    const reCalculteStep = () => {

        if(refImage.current.width < 481) {
            step_2 = 300
            step_3 = 631
        } else if(refImage.current.width <= 509) {
            step_2 = 481
            step_3 = 1019
        }else if(refImage.current.width <= 532) {
            step_2 = 492
            step_3 = 1019
        }else  {
            step_2 = 520
            step_3 = 1019
        }
        console.log("width", refImage.current.width)
        console.log("step_2", step_2)
        console.log("step_3", step_3)

    }

    const moveSlides = (n) => {
        reCalculteStep();
        let positionNext = [];
        let indexNext = n, indexCurrent, curentleft, dif;
        positionBootons.map((it, index) => {
            if (it === true) indexCurrent = index;
            if (index === n) {
                positionNext[index] = true;
            } else positionNext[index] = false;
        })
        if (indexNext > indexCurrent) {
            dif = indexNext - indexCurrent === 1 ? step_2 : step_3;
        } else if (indexNext < indexCurrent) {
            dif = indexCurrent - indexNext === 1 ? -step_2 : -step_3;
        } else {
            dif = 0;
        }
        curentleft = refSliderContainer.current.scrollLeft;
        refSliderContainer.current.scrollLeft = curentleft + dif
        setPositionBootons(positionNext);
        setTouchBoton(true);
    }

    const calculatePosition = (curentPosition) => {
        let finalPosition, positionBotons = [];
        reCalculteStep();

        if (step_2 > curentPosition) {
            let sideR = (step_2 - curentPosition) < (curentPosition - step_1);
            finalPosition = sideR ? step_2 : step_1;
            positionBotons = sideR ? [false, true, false] : [true, false, false];
        } else {
            let sideL = (step_3 - curentPosition) < (curentPosition - step_2);
            finalPosition = sideL ? step_3 : step_2;
            positionBotons = sideL ? [false, false, true] : [false, true, false];
        }
        refSliderContainer.current.scrollLeft = finalPosition;
        setPositionBootons(positionBotons);
    }

    const scroll = (e) => {
        console.log("scroll", refSliderContainer.current.scrollLeft, e.currentTarget.scrollLeft);
        e.preventDefault();
        scrollEnd(() => {
            let currentLeft = refSliderContainer.current.scrollLeft;
            console.log('stopped scrolling: ' + currentLeft, touchBoton);
            if(!touchBoton) {
              calculatePosition(currentLeft);
            } else setTouchBoton(false);
        }, 200)
    }

    const scrollEnd = (callback, time) => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(callback, time);
    }

    return (
        <div className="carousel_movil">
            <div ref={refSliderContainer} onScroll={(e) => scroll(e)} className="slideshow_container scroll-touch">
                <div>
                    <div ref={refSlider} className="slider_move_0 scroll-touch" >
                        {info.map(item => {
                            const image = require(`${item.image}`);
                            return (
                                <div key={item.id} className="step_container_images">
                                    <div className="moons_image_carrusel">
                                        <img ref={refImage} alt="step-one" className={`steps_image img_${item.id }`} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="slider_boot_out">
                {info.map(item => {
                    let id = item.id;
                    let classBotton = positionBootons[id] ? "slider_active" : "slider_no_active";
                    return (<button key={item.id} className={classBotton} onClick={(e) => moveSlides(item.id)}>
                    </button>)
                })}
            </div>

            {info.map((item, index) => {
                if (positionBootons[index]) {
                    return (<Description key={item.id} item={item}></Description>)
                }
            })}
            <LinkCita></LinkCita>
        </div>
    );
}

export default Mobile;