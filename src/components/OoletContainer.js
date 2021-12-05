import React, { Component } from 'react'
import styles from "./OoletContainer.module.css"

// componenets
import GatherPage from "./GatherPage"

// utils function
import { PostToContent, registerCB } from "../util/Comm"

// static source
import LOGO_IMGSRC from "../static/icon-Oolet.png"

export default class OoletContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentList: [],
        }
    }

    // Handler and Communicate with extension
    collectHandler = (e) => {
        PostToContent({ type: "FROM_OOLETSITE_REQ" });
    }

    getContentListCallback = (data) => {
        // {imgSrc, imgList}
        console.log("get data imgList")
        this.setState(state => {
            return {
                contentList: data.imgList
            }
        })
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
                    <p>HOME</p>
                    <p onClick={this.collectHandler}>Gather</p>
                    <p>Download</p>
                </div>
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
                    <GatherPage contentList={this.state.contentList} />
                    <div>
                        {/* for advertisement */}
                    </div>
                </div>
            </div>
        )
    }
}
