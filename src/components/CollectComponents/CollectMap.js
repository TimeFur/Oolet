import React, { Component } from 'react'
import styles from "./CollectMap.module.css"

import Interactable from "../../util/Interactable";
import ImgInteract from "../../util/ImgInteract";

const DEFAULT_IMG_URL = "https://i.pinimg.com/564x/61/61/7c/61617c4c84ffe787bdc0ef9c44f4cec4.jpg"
// https://i.pinimg.com/564x/a5/4b/ac/a54bacf62dc651a0fd3598310fdf2c87.jpg
// function
const draggableOptions = {
    onmove: event => {
        const target = event.target;
        // keep the dragged position in the data-x/data-y attributes
        const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform = target.style.transform =
            "translate(" + x + "px, " + y + "px)";

        // update the posiion attributes
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
    }
};

// This component is set for layout element and placement
export default class CollectMap extends Component {
    constructor(props) {
        super(props)

        this.handleDrop = this.handleDrop.bind(this);
        this.state = {
            droppedItems: []
        };
    }

    handleDrop(event) {
        console.log("DROP", event);
    }

    render() {
        return (
            <div className={styles.container}>
                {/* <Interactable draggable={true} draggableOptions={draggableOptions}> */}
                <ImgInteract id="img1" src={DEFAULT_IMG_URL} />
                {/* </Interactable> */}
            </div>
        )
    }
}
