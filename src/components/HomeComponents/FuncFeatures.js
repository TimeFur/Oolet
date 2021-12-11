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
                <div className={styles.featureListStyle}>
                    <div><b>Moving image:</b> Click once and drag anywhere</div>
                    <div><b>Crop image:</b> Hold the left click in any position of the image and drag to right down to crop area</div>
                    <div><b>Red scale anchor:</b> Scale the image in fix ratio</div>
                    <div><b>Green scale anchor:</b> Ajust visible area</div>
                    <div><b>Slider:</b> control opacity of the image</div>
                    <div><b>"H" icon:</b> hidden image by replacing it as H icon</div>
                    <div><b>"X" icon:</b> delete this shot</div>
                    <div><b>"D" icon:</b> Download visible part of image</div>
                    <div><b>"F" icon:</b> show the whole image in container</div>
                    <div><b>"S" icon:</b> search image by google search</div>
                </div>
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
                <h1 className={styles.titleStyle}>Hover image Features</h1>
                <div className={styles.featuresWrapperStyle}>
                    <this.featureList />
                    <this.featureIntroImage />
                </div>
            </div>
        )
    }
}
