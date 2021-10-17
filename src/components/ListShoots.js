import React, { Component } from 'react'
import styles from "./ListShoots.module.css"
import { PostToContent, registerCB } from "../util/Comm"

const DEFAULT_IMG = "https://i.pinimg.com/564x/51/45/c0/5145c0dc420e967fc4c0f8f72e20c3a2.jpg"

export default class ListShoots extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewImgSrc: {},
        }
    }
    // handler
    itemHover = (e = null, tabId = "", getItem = "") => {
        if (e == null)
            return
        const target = e.currentTarget

        // toggle content to get imgSrc
        PostToContent({
            type: "GET_CONTENT_SHOOT_FROM_SITE",
            tabId: tabId,
            getItem: getItem
        })
    }
    itemClick = (e = null, tabId = "", getItem = "") => {
        if (e == null)
            return
        //get img from previewImgSrc
        this.props.setImgCb({ imgSrc: this.state.previewImgSrc[tabId], append: true })

    }
    getImgSrc = (data) => {
        if (data == null || data.imgSrc == null) {
            return
        }

        const tabId = data.id
        const imgSrc = data.imgSrc.imgSrc
        this.setState(state => {
            return {
                previewImgSrc: { ...state.previewImgSrc, [tabId]: imgSrc }
            }
        }, () => {
            this.props.setImgCb({ imgSrc: this.state.previewImgSrc[tabId], append: false })
        })
    }
    // conponents
    eachItemComponent = (contentList = null) => {
        if (contentList == null)
            return
        const listComponent = contentList
            .filter(item => Object.keys(item).length != 0 && item.res.length > 0)
            .map((item, i) => {
                // console.log(item)
                const tabId = item.id
                const contents = item.res.map((text, i) => {
                    return (
                        <div key={i} className={styles.contentSrcWrapper}
                            onMouseEnter={(e) => { this.itemHover(e, tabId, text) }}
                            onClick={(e) => { this.itemClick(e, tabId, text) }}>
                            {text}
                        </div>
                    )
                })
                return (
                    <div key={i} className={styles.ItemWrapper}>
                        <div className={styles.itemTitleStyle}>{item.title}</div>

                        <div className={styles.ItemImgListWrapper}>
                            <div className={styles.ItemTextWrapper} >
                                {contents}
                            </div>
                            <div className={styles.ItemThumbnailWrapper}>
                                {this.state.previewImgSrc[tabId] ?
                                    <img src={this.state.previewImgSrc[tabId]} alt="" srcset="" /> : ""}
                            </div>
                        </div>
                    </div>
                )
            })
        return listComponent
    }

    componentDidMount() {
        registerCB({ type: "IMGSRC_FROM_EXTENSION", callback: this.getImgSrc })
    }
    render() {

        return (
            <div className={styles.ListShootsContainer}>
                {this.eachItemComponent(this.props.contentList)}
            </div>
        )
    }
}
