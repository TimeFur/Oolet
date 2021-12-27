import React, { Component } from 'react'
import styles from "./CollectMap.module.css"

import Interactable from "../../util/Interactable";
import ImgInteract from "../../util/ImgInteract";
import EditTextBox from "../../util/EditTextBox";

const DEFAULT_IMG_URL = "https://i.pinimg.com/564x/61/61/7c/61617c4c84ffe787bdc0ef9c44f4cec4.jpg"
// https://i.pinimg.com/564x/a5/4b/ac/a54bacf62dc651a0fd3598310fdf2c87.jpg
// function

// This component is set for layout element and placement
export default class CollectMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            droppedItems: []
        };
    }
    // handler

    //sub-component
    layerComp = (props) => {
        return (
            <div className={styles.layerCompStyle}>
                {props.children}
            </div>
        )
    }

    render() {
        return (
            <div className={styles.container}>
                <div>Header</div>
                <this.layerComp>
                    <ImgInteract id="img1" horizontal={false} veritical={true} src={DEFAULT_IMG_URL} />
                    <ImgInteract id="img1" horizontal={false} veritical={true} src={DEFAULT_IMG_URL} />
                </this.layerComp>
                <this.layerComp>
                    <ImgInteract id="img1" horizontal={false} veritical={true} src={DEFAULT_IMG_URL} />
                </this.layerComp>
                <EditTextBox />
                <div>Footer</div>
            </div>
        )
    }
}
