import React, { Component } from 'react'
import styles from "./HomePage.module.css"

// sub-components
import HomeHeader from "./HomeComponents/HomeHeader"
import DespFeatures from "./HomeComponents/DespFeatures"
import FuncFeatures from "./HomeComponents/FuncFeatures"
import HomeManual from "./HomeComponents/HomeManual"

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    }


    // sub-component

    render() {

        return (
            <div className={styles.container}>
                <HomeHeader height="80vh" />
                {/* Add bar */}
                <DespFeatures height="40vh" />
                <HomeManual height="60vh" />
                <FuncFeatures height="60vh" />
            </div>
        )
    }
}
