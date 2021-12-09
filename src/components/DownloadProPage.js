import React, { Component } from 'react'
import styles from "./DownloadProPage.module.css"
// api
import FireBaseFunc from "../util/FirebaseFunc"

export default class DownloadProPage extends Component {
    constructor(props) {
        super(props)
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

    render() {



        return (
            <div className={styles.container}>

                <div className={styles.downloadLayoutStyle}>
                    <this.cardComponent title="Free extension" clickHandler={this.downloadHandler} />
                    <this.cardComponent title="Premium extension" clickHandler={this.downloadHandler} />
                </div>

                <div className={styles.compareListWrapper}>
                </div>

            </div>
        )
    }
}
