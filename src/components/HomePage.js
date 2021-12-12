import React, { Component } from 'react'
import styles from "./HomePage.module.css"

// sub-components
import HomeHeader from "./HomeComponents/HomeHeader"
import DespFeatures from "./HomeComponents/DespFeatures"
import FuncFeatures from "./HomeComponents/FuncFeatures"
import HomeManual from "./HomeComponents/HomeManual"
import EmailComponent from "./HomeComponents/EmailComponent"

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    // sub-component
    emailWrapper = (props) => {
        return (
            <div id='emailId' className={styles.footerStyle}>
                <h1 className={styles.emailTitleStyle}>Contact Email</h1>
                <div className={styles.emailDespStyle}>If you have any problem or customize request please feel free to contact with me</div>
                <div className={styles.emailWrapper}>
                    <EmailComponent />
                </div>
            </div>
        )
    }
    render() {

        return (
            <div className={styles.container}>
                <HomeHeader />
                {/* Add bar */}
                <DespFeatures />
                <HomeManual />
                <FuncFeatures />
                <this.emailWrapper />
            </div>
        )
    }
}
