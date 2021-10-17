import React, { Component } from 'react'
import styles from "./ContentPlate.module.css"

export default class ContentPlate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            plateImgList: [],
        }
    }

    // component
    plateComponent = () => {
        const plateItem = this.state.plateImgList.map((item, i) => {
            return (
                <div key={i} className={styles.itemWrapper}>
                    <img src={item} alt="" />
                </div>
            )
        })
        return (
            <div className={styles.plateWrapper}>
                {plateItem}
            </div>
        )
    }
    // life cycle
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.pickImg != this.props.pickImg) {
            this.setState(state => {
                return {
                    plateImgList: [...state.plateImgList, this.props.pickImg]
                }
            })
        }
    }
    render() {
        return (
            <div className={styles.container}>
                <img src={this.props.pickImg} alt="" srcset="" />
                <div className={styles.plateContainerStyle}>
                    {this.plateComponent()}
                </div>
            </div>
        )
    }
}
