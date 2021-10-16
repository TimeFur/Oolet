import React, { Component } from 'react'
import styles from "./ListShoots.module.css"

const DEFAULT_IMG = "https://i.pinimg.com/564x/51/45/c0/5145c0dc420e967fc4c0f8f72e20c3a2.jpg"

export default class ListShoots extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // conponents
    eachItemComponent = (contentList = null) => {
        if (contentList == null)
            return
        const listComponent = contentList
            .filter(item => Object.keys(item).length != 0 && item.res.length > 0)
            .map((item, i) => {
                console.log(item)
                const contents = item.res.map((text, i) => {
                    return <div key={i} className={styles.contentSrcWrapper}>{text}</div>
                })
                return (
                    <div key={i} className={styles.ItemWrapper}>
                        {item.title}
                        <div className={styles.ItemImgListWrapper}>
                            <div className={styles.ItemTextWrapper}>
                                {contents}
                            </div>
                            <div className={styles.ItemThumbnailWrapper}>
                                <img src={DEFAULT_IMG} alt="" srcset="" />
                            </div>
                        </div>
                    </div>
                )
            })
        return listComponent
    }

    render() {

        return (
            <div className={styles.ListShootsContainer}>
                {this.eachItemComponent(this.props.contentList)}
            </div>
        )
    }
}
