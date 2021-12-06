import React, { Component } from 'react'
import styles from "./FuncFeatures.module.css"

const IMG_SRC = "https://i.pinimg.com/564x/65/b8/ea/65b8ea016a92ac16696a640483926a4d.jpg"
const DEFAULT_HEIGHT = "40vh"
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
                    <li>Moving image in the site</li>
                    <li>Hold the left click in the position in the image and drag to right down to wrap area</li>
                    <li>red scale anchor: Scale the image in fix ratio</li>
                    <li>green scale anchor: Ajust visible area</li>
                    <li>Slider: control opacity of the image</li>
                    <li>"H" icon: hidden image by replacing it as H icon</li>
                    <li>"X" icon: delete this shot</li>
                    <li>"D" icon: Download visible part of image</li>
                    <li>"F" icon: show the whole image in container</li>
                    <li>"S" icon: search image</li>
                </ul>
            </div>
        )
    }

    featureIntroImage = () => {
        return (
            <div className={styles.featureImgStyle}>
                <img src={IMG_SRC} alt="" srcset="" />
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
