import React, { Component } from 'react'
import styles from "./DespFeatures.module.css"

import ICON_DEFAULT from "../../static/icon-Oolet.png"

export default class DespFeatures extends Component {

    constructor(props) {
        super(props)

        this.state = {
            featureList: [
                { icon: ICON_DEFAULT, title: "Title", desp: "lorem" },
                { icon: ICON_DEFAULT, title: "Title", desp: "lorem" },
                { icon: ICON_DEFAULT, title: "Title", desp: "lorem" },
                { icon: ICON_DEFAULT, title: "Title", desp: "lorem" },
            ]
        }
    }

    // sub-components
    FeatureCard = ({ key = 0, icon = "", title = "Title", desp = "" }) => {
        return (
            <div key={key}>
                <div className={styles.iconWrapperStyle}>
                    <img src={icon} alt="" />
                </div>
                <h2>{title}</h2>
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
            height: this.props.height
        }
        return (
            <div className={styles.container} style={style}>
                <h1>Features</h1>
                <this.FeaturesWrapper />
            </div>
        )
    }
}
