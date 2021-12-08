import React, { Component } from 'react'
import styles from "./FuncFeatures.module.css"

import {
    FUNC_FEATURES_SRC
} from "../../static/SourceExport"

export default class FuncFeatures extends Component {
    constructor(props) {
        super(props)
    }

    // Handler

    // sub-components
    featureList = ({ }) => {
        return (
            <div className={styles.featureListWrapperStyle}>
                <ul className={styles.featureListStyle}>
                    <li><b>Moving image:</b> Click once and drag anywhere</li>
                    <li><b>Crop image:</b> Hold the left click in any position of the image and drag to right down to crop area</li>
                    <li><b>Red scale anchor:</b> Scale the image in fix ratio</li>
                    <li><b>Green scale anchor:</b> Ajust visible area</li>
                    <li><b>Slider:</b> control opacity of the image</li>
                    <li><b>"H" icon:</b> hidden image by replacing it as H icon</li>
                    <li><b>"X" icon:</b> delete this shot</li>
                    <li><b>"D" icon:</b> Download visible part of image</li>
                    <li><b>"F" icon:</b> show the whole image in container</li>
                    <li><b>"S" icon:</b> search image by google search</li>
                </ul>
            </div>
        )
    }

    featureIntroImage = () => {
        return (
            <div className={styles.featureImgStyle}>
                <img src={FUNC_FEATURES_SRC} alt="" srcSet="" />
            </div>
        )
    }
    render() {
        // Setting height
        const style = {
            height: this.props.height,
        }

        return (
            <div className={styles.container} style={style}>
                <h1>Hover image Features</h1>
                <div className={styles.featuresWrapperStyle}>
                    <this.featureList />
                    <this.featureIntroImage />
                </div>
            </div>
        )
    }
}
