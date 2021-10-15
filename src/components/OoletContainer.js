import React, { Component } from 'react'
import styles from "./OoletContainer.module.css"

const LOGO_IMGSRC = ""

export default class OoletContainer extends Component {
    constructor(props) {
        super(props)
    }

    BarContainer = () => {

        return (
            <div className={styles.barStyle}>
                <div className={styles.barImgWrapperStyle}>
                    <img src={LOGO_IMGSRC} alt="" srcset="LOGO" />
                </div>
                <div className={styles.barTitleStyle}>Oolet</div>
                <div className={styles.controlWrapper}>
                    <p>Collect</p>
                    <p>PDF</p>
                </div>

            </div>
        )
    }
    // life cycle
    componentDidMount() {

    }

    render() {
        return (
            <div className={styles.container}>
                {this.BarContainer()}
                <div className={styles.layoutContainerStyle}></div>
                <div className={styles.ContentConainerStyle}></div>
            </div>
        )
    }
}
