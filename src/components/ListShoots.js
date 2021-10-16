import React, { Component } from 'react'
import styles from "./ListShoots.module.css"

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
                const contents = item.res.map((src, i) => <div key={i} className={styles.contentSrcWrapper}>{src}</div>)
                return (
                    <div key={i} className={styles.ItemWrapper}>
                        {item.title}
                        {contents}
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
