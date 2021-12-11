import React, { Component } from 'react'
import styles from "./DownloadProPage.module.css"
// api
import FireBaseFunc from "../util/FirebaseFunc"

export default class DownloadProPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            compareList: [
                ["", ["Free", "Premium"]],
                ["Moving image", ["V", "V"]],
                ["Scale", ["V", "V"]],
                ["Crop", ["V", "V"]],
                ["Adjust Opacity", ["V", "V"]],
                ["Hidden", ["V", "V"]],
                ["Download", ["V", "V"]],
                ["Search", ["V", "V"]],
                ["Multi-Shoot", ["3 limitation", "V"]],
                ["Get shoot from other tabs", ["X", "V"]],
            ]
        }
    }


    // Handler
    downloadHandler = (e) => {
        FireBaseFunc.downloadHandler("WU.jpg")
            .then((url) => {
                console.log("download ", url)
                window.open(url, '_blank').focus();
            })
    }

    // component
    cardComponent = (props) => {

        var title = (props.title) ? props.title : ""
        var clickHandler = (props.clickHandler) ? props.clickHandler : (e) => { }

        return (
            <div className={styles.itemContainerWrapper}>
                <h1>{title}</h1>
                <div className={styles.itemImgWrapper}>
                    <img src="" alt="" srcset="" />
                </div>
                <div className={styles.itemBtnWrapper} onClick={clickHandler}>
                    Download
                </div>
            </div>
        )
    }

    proportyFunc = (key = 0, property = "", list = [], itemCusStyle = {}) => {
        const checkList = list.map((item, key) => {

            const style = {
                color: (item == "V") ? "green" : (item == "X") ? "red" : "",
                ...itemCusStyle
            }

            return (
                <div key={key} className={styles.propertyCheckStyle} style={style}>
                    {item}
                </div>
            )
        })
        return (
            <div key={key} className={styles.propertyWrapper}>
                <div className={styles.propertyTitleStyle}>{property}</div>
                {checkList}
            </div>
        )
    }

    checkButton = (title) => {
        return (
            <div className={styles.checkWrapperStyle} onClick={this.downloadHandler}>
                {title}
            </div>
        )
    }

    render() {

        const compareListComponent = this.state.compareList.map((items, key) => {
            var itemCusStyle = {}
            if (key == 0)
                itemCusStyle = {
                    fontSize: "2rem",
                    fontWeight: "600",
                    fontFamily: "'Josefin Slab', serif",
                }
            return this.proportyFunc(key, items[0], items[1], itemCusStyle)
        })
        const len = this.state.compareList.length

        return (
            <div className={styles.container}>
                <div className={styles.compareListWrapper}>
                    {compareListComponent}
                    {this.proportyFunc(len + 1, "", [this.checkButton("Download"), this.checkButton("Buy now")])}
                </div>
            </div>
        )
    }
}
