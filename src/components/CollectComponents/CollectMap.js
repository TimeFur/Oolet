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
            selLayerIndex: 0,
            layerCompList: [
                <this.layerComp id="0">
                    <ImgInteract id="img1" horizontal={false} veritical={true} src={DEFAULT_IMG_URL} />
                </this.layerComp>]
        };
    }
    // handler
    selectHandler = (e) => {
        const target = e.currentTarget
        console.log(target, target.id)
    }

    addLayerHandler = (e) => {
        this.setState(state => {
            var len = state.layerCompList.length
            return {
                layerCompList: [...state.layerCompList, <this.layerComp id={len} key={len}><ImgInteract id="img1" horizontal={false} veritical={true} src={DEFAULT_IMG_URL} /></this.layerComp>]
            }
        }, () => {
            console.log(this.state.layerCompList)
        })
    }
    //sub-component
    layerComp = (props) => {
        return (
            <div id={props.id} key={props.key} className={styles.layerCompStyle} onClick={this.selectHandler}>
                {props.children}
            </div>
        )
    }
    addLayerBtn = () => {
        return (
            <div className={styles.addBtnStyle} onClick={this.addLayerHandler}>+</div>
        )
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    {this.state.layerCompList}
                    {/* <EditTextBox /> */}
                </div>
                {this.addLayerBtn()}
            </div>
        )
    }
}
