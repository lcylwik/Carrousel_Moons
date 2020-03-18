import React, { useEffect, useState, useRef, updateState } from 'react';
import './style/slider.css'
import './style/index.css'

const Mobile = (props) => {

    let { info } = props
    let slideIndex = 1;
    let initialBooton = [true, false, false];
    const [transformSilders, setTransformSilders] = useState();
    const [positionBootons, setPositionBootons] = useState(initialBooton);


    let refSlider = useRef(null);
    useEffect(() => {

    }, []);


    const moveSlides = (n) => {
        refSlider.current.className = `slider_move_${n}`;
        let positionNext = [];
        positionBootons.map((it, index) => {
            if (index === n) positionNext[index] = true;
            else positionNext[index] = false;
        })
        setPositionBootons(positionNext);
    }

    return (
        <div className="carousel_movil">
            <div className="slideshow_container">
                <div>
                    <div ref={refSlider} className="slider_move_0">
                        {info.map(item => {
                            const image = require(`${item.image}`);
                            return (
                                <div key={item.id} className="step_container_images">
                                    <div className="moons_image_carrusel">
                                        <img alt="step-one" className="steps_image"
                                            src={image} />
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
        </div >

    );
}

export default Mobile;