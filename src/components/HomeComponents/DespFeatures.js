import React, { Component } from 'react'
import styles from "./DespFeatures.module.css"

import {
    FEATURE_SEARCH_SRC, FEATURE_DOWNLOAD_SRC, FEATURE_SHOOT_SRC, FEATURE_CROP_SRC
} from "../../static/SourceExport"
import ICON_DEFAULT from "../../static/icon-Oolet.png"

export default class DespFeatures extends Component {

    constructor(props) {
        super(props)

        this.state = {
            featureList: [
                { icon: FEATURE_SHOOT_SRC, title: "Screenshot and Snap", desp: "" },
                { icon: FEATURE_CROP_SRC, title: "Scale and Crop", desp: "" },
                { icon: FEATURE_SEARCH_SRC, title: "Image Search", desp: "" },
                { icon: FEATURE_DOWNLOAD_SRC, title: "Download visible area ", desp: "" },
            ]
        }
    }

    // sub-components
    FeatureCard = ({ key = 0, icon = "", title = "Title", desp = "" }) => {
        return (
            <div key={key} className={styles.cardContainerStyle}>
                <div className={styles.iconWrapperStyle}>
                    <img src={icon} alt="" />
                </div>
                <div>{title}</div>
                <p>{desp}</p>
            </div>
        )
    }

    FeaturesWrapper = () => {
        const wrapper = this.state.featureList.map((item, i) => {
            return this.FeatureCard({ key: i, ...item })
        })
        return (
            <div className={styles.featuresWrapperStyle}>
                {wrapper}
            </div>
        )
    }

    render() {
        const style = {
            height: this.props.height,
        }
        return (
            <div className={styles.container} style={style}>
                <div className={styles.featureTitleStyle}>Features</div>
                <this.FeaturesWrapper />
            </div>
        )
    }
}
