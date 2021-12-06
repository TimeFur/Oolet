import React, { Component } from 'react'
import styles from "./HomeManual.module.css"

const IMG_SRC = "https://i.pinimg.com/564x/5b/8b/a6/5b8ba662dafbe11a4a67137628818f04.jpg"

export default class HomeManual extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                { imgSrc: IMG_SRC, title: "Stitch", popDesp: "Lorem" },
                { imgSrc: IMG_SRC, title: "Stitch", popDesp: "Pop click" },
                { imgSrc: IMG_SRC, title: "Stitch", popDesp: "Show up" },
                { imgSrc: IMG_SRC, title: "Stitch", popDesp: "Show up" },
            ]
        }
    }

    // handler

    // sub-component
    manualCard = ({ key = 0, imgSrc = IMG_SRC, title = "", popDesp = "" }) => {
        return (
            <div key={key} className={styles.manualCardStyle}>
                <div className={styles.popDespStyle}>{popDesp}</div>
                <div className={styles.manualCardImgWrapper}>
                    <img src={imgSrc} alt="" />
                </div>
                <h2>{title}</h2>
            </div>
        )
    }

    manualCardWrapper = () => {
        const cardGroup = this.state.list.map((item, i) => {
            return this.manualCard({ key: i, ...item })
        })
        return (
            <div className={styles.cardWrapperStyle}>
                {cardGroup}
            </div>
        )
    }
    render() {
        const style = {
            height: this.props.height
        }
        return (
            <div className={styles.container} style={style}>
                <h1>HomeManual</h1>
                <this.manualCardWrapper />
            </div>
        )
    }
}
