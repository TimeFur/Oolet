import React, { Component } from 'react'
import styles from "./OoletContainer.module.css"

import { PostToContent, registerCB } from "../util/Comm"

import ListShoots from "./ListShoots"
import ContentPlate from "./ContentPlate"
import ImgSearch from "../util/ImgSearch"
import LOGO_IMGSRC from "../static/icon-Oolet.png"

export default class OoletContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentList: [],
            pickStatus: {}, //{imgSrc, append},
        }
    }

    // Handler
    collectHandler = (e) => {
        PostToContent({ type: "FROM_OOLETSITE_REQ" });
    }
    setPickImgCallback = (data) => {
        this.setState(state => {
            return {
                pickStatus: data
            }
        })
    }

    getContentListCallback = (data) => {
        // {imgSrc, imgList}
        console.log(data.imgList)
        this.setState(state => {
            return {
                contentList: data.imgList
            }
        })

    }

    searchImgHandler = (e) => {
        console.log("Search image")
    }

    downloadImgHandler = (e) => {
        console.log("Download image")
    }
    // component
    BarContainer = () => {
        return (
            <div className={styles.barStyle}>
                <div className={styles.barImgWrapperStyle}>
                    <img src={LOGO_IMGSRC} alt="" />
                </div>
                <div className={styles.barTitleStyle}>Oolet</div>
                <div className={styles.controlWrapper}>
                    <p>BUY</p>
                    <p onClick={this.collectHandler}>Collect</p>
                </div>
            </div>
        )
    }

    editImageBarContainer = () => {
        return (
            <div className={styles.editImgBarStyle}>
                <input className={styles.editBarSearchStyle} type="button" value="search" onClick={(e) => this.searchImgHandler(e)} />
                <input className={styles.editBarDownloadStyle} type="button" value="download" onClick={(e) => this.downloadImgHandler(e)} />
            </div>
        )
    }
    // life cycle
    componentDidMount() {
        registerCB({ type: "FROM_EXTENSION", callback: this.getContentListCallback })
    }

    render() {
        return (
            <div className={styles.container}>
                {this.BarContainer()}

                <div className={styles.contentWrapper}>
                    <div className={styles.layoutContainerStyle}>
                        <ListShoots contentList={this.state.contentList} setImgCb={this.setPickImgCallback} />
                    </div>
                    <div className={styles.ContentConainerStyle}>
                        <this.editImageBarContainer />
                        <ContentPlate pickStatus={this.state.pickStatus} />
                    </div>
                    <div>
                        {/* for advertisement */}
                    </div>
                </div>
            </div>
        )
    }
}
