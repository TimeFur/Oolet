import React, { Component } from 'react'
import styles from "./HomeManual.module.css"

import {
    CLICK_SRC, SHOOT_SRC, PREVIEW_SRC, SNAP_SRC,
    HOVER_CLICK_SRC, HOVER_SHOOT_SRC, HOVER_PREVIEW_SRC, HOVER_SNAP_SRC,
    SEARCH_SRC, SEARCH_HOVER_SRC, SEARCH_RESULT_SRC,
    DOWNLOAD_CROP_SRC, DOWNLOAD_CROP_HOVER_SRC, DOWNLOAD_SRC, DOWNLOAD_HOVER_SRC, DOWNLOAD_RESULT_SRC
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
            ],
            searchList: [
                { imgSrc: SEARCH_SRC, hoverImgSrc: SEARCH_HOVER_SRC, title: "S icon", popDesp: "Click search icon" },
                { imgSrc: SEARCH_RESULT_SRC, hoverImgSrc: SEARCH_RESULT_SRC, title: "Search", popDesp: "Google image search" },
            ],
            downloadList: [
                { imgSrc: DOWNLOAD_CROP_SRC, hoverImgSrc: DOWNLOAD_CROP_HOVER_SRC, title: "Crop", popDesp: "Crop image" },
                { imgSrc: DOWNLOAD_SRC, hoverImgSrc: DOWNLOAD_HOVER_SRC, title: "Download", popDesp: "Download as png file" },
                { imgSrc: DOWNLOAD_RESULT_SRC, hoverImgSrc: DOWNLOAD_RESULT_SRC, title: "Image", popDesp: "Parital Image file" },
            ]
        }
    }

    // handler

    // sub-component
    manualCard = ({ key = 0, imgSrc = "", hoverImgSrc = "", title = "", popDesp = "" }, width = "") => {
        const style = {
            width: width
        }
        return (
            <div key={key} className={styles.manualCardStyle} style={style}>
                <div className={styles.manualCardImgWrapper}>
                    <img className={styles.hoverImgStyle} src={hoverImgSrc} alt="" />
                    <img className={styles.cardImgStyle} src={imgSrc} alt="" />
                </div>

                <div className={styles.popDespStyle}>{popDesp}</div>
                <div>{title}</div>
            </div>
        )
    }

    // Basic manual
    manualCardWrapper = (list = [], itemWidth = "20%") => {
        const cardGroup = list.map((item, i) => {
            return this.manualCard({ key: i, ...item }, itemWidth)
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
                <h1 className={styles.manualTitleStyle}>Manual</h1>
                {this.manualCardWrapper(this.state.list, "24%")}
                <h1 className={styles.manualTitleStyle}>Search Image</h1>
                {this.manualCardWrapper(this.state.searchList, "40%")}
                <h1 className={styles.manualTitleStyle}>Download immediately</h1>
                {this.manualCardWrapper(this.state.downloadList, "26%")}
            </div>
        )
    }
}
