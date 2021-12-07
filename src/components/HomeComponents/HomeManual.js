import React, { Component } from 'react'
import styles from "./HomeManual.module.css"

import {
    CLICK_SRC, SHOOT_SRC, PREVIEW_SRC, SNAP_SRC,
    HOVER_CLICK_SRC, HOVER_SHOOT_SRC, HOVER_PREVIEW_SRC, HOVER_SNAP_SRC
} from "../../static/SourceExport"

export default class HomeManual extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                { imgSrc: CLICK_SRC, hoverImgSrc: HOVER_CLICK_SRC, title: "Click extension", popDesp: "Click icon" },
                { imgSrc: SHOOT_SRC, hoverImgSrc: HOVER_SHOOT_SRC, title: "Camera", popDesp: "Camera shoot" },
                { imgSrc: PREVIEW_SRC, hoverImgSrc: HOVER_PREVIEW_SRC, title: "Preview hover", popDesp: "preview img" },
                { imgSrc: SNAP_SRC, hoverImgSrc: HOVER_SNAP_SRC, title: "Snap", popDesp: "Snap in site" },
            ]
        }
    }

    // handler

    // sub-component
    manualCard = ({ key = 0, imgSrc = "", hoverImgSrc = "", title = "", popDesp = "" }) => {


        return (
            <div key={key} className={styles.manualCardStyle}>
                <div className={styles.manualCardImgWrapper}>
                    <img className={styles.hoverImgStyle} src={hoverImgSrc} alt="" />
                    <img className={styles.cardImgStyle} src={imgSrc} alt="" />
                </div>

                <div className={styles.popDespStyle}>{popDesp}</div>
                <h2>{title}</h2>
            </div>
        )
    }

    manualCardWrapper = () => {
        const cardGroup = this.state.list.map((item, i) => {
            return this.manualCard({ key: i, ...item })
        })
        return (
            <div className={styles.cardWrapperStyle}>
                {cardGroup}
            </div>
        )
    }
    render() {
        const style = {
            height: this.props.height
        }
        return (
            <div className={styles.container} style={style}>
                <h1>HomeManual</h1>
                <this.manualCardWrapper />
            </div>
        )
    }
}
