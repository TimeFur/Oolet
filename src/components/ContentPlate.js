import React, { Component } from 'react'
import styles from "./ContentPlate.module.css"

export default class ContentPlate extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className={styles.container}>
                <img src={this.props.pickImg} alt="" srcset="" />
            </div>
        )
    }
}
