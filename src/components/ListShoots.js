import React, { Component } from 'react'
import styles from "./ListShoots.module.css"

export default class ListShoots extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {

        const listComponent = this.props.contentList
            .filter(item => item != {})
            .map((item, i) => {
                return (
                    <div key={i}>
                        {item.title}
                    </div>
                )
            })

        return (
            <div>
                ListShoots
                {listComponent}
            </div>
        )
    }
}
