import React, { useEffect, useState, useRef } from 'react';
import './style/slider.css'
import './style/index.css'
import Description from './description';
import LinkCita from './linkCita';

const Table = (props) => {

    let { info } = props
    let scrollTimeout;
    let initialBooton = [true, true, false];
    let step_1 = 0, step_2 = 306;
    const [currentPosition, setCurrentPosition] = useState(0);
    const [positionBootons, setPositionBootons] = useState(initialBooton);
    const image_0 = require(`${info[0].image}`);
    const image_1 = require(`${info[1].image}`);
    const image_2 = require(`${info[2].image}`);

    let refSlider = useRef(null);
    let refSliderTable = useRef(null);

    useEffect(() => {

    }, []);


    const moveSlides = (n) => {
        let curentleft = refSliderTable.current.scrollLeft;

        if (n === 0) {
            setPositionBootons([true, true, false]);
            if (curentleft !== 0)
                refSliderTable.current.scrollLeft = curentleft - step_2
        } else if (n === 2) {
            setPositionBootons([false, true, true]);
            if (curentleft !== step_2)
                refSliderTable.current.scrollLeft = curentleft + step_2
        }
    }

    const calculatePosition = (curentPosition) => {
        let finalPosition, positionBotons = [];

        let side = (step_2 - curentPosition) < (curentPosition - step_1);
        finalPosition = side ? step_2 : step_1;
        positionBotons = side ? [false, true, true] :[true, true, false];

        refSliderTable.current.scrollLeft = finalPosition;
        setCurrentPosition(finalPosition);
        setPositionBootons(positionBotons);
    }

    const scroll = (e) => {
        e.preventDefault();
        scrollEnd(() => {
            let currentLeft = refSliderTable.current.scrollLeft;
            console.log('stopped scrolling: ' + currentLeft);
            calculatePosition(currentLeft)
        }, 50)
    }

    const scrollEnd = (callback, time) => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(callback, time);
    }

    const touchMove = (e) => {
        e.preventDefault();
    }

    return (
        <div className="carousel_tablet">
            <div ref={refSliderTable} onScroll={(e) => scroll(e)} onTouchMove={(e) => touchMove(e)} className="slideshow_container_table scroll-touch">
                <div>
                    <div ref={refSlider} className="slider_move_tablet" >
                        <div className="step_container_images_table">
                            <div className="moons_image_two_table">
                                <img alt="step-one" className="one_image_table" src={image_0} />
                                <Description key={info[0].id} item={info[0]}></Description>
                                <LinkCita></LinkCita>
                            </div>
                            <div className="moons_image_two_table">
                                <img alt="step-two" className="one_image_table" src={image_1} />
                                <Description key={info[1].id} item={info[1]}></Description>
                            </div>
                            <div className="moons_image_three_table">
                                <img alt="step-three" className="one_image_table" src={image_2} />
                                <Description key={info[2].id} item={info[2]}></Description>
                            </div>
                        </div>
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
        </div>
    );
}

export default Table;