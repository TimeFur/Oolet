import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styles from "./OoletContainer.module.css"

// componenets
import GatherPage from "./GatherPage"
import HomePage from "./HomePage"
import DownloadProPage from "./DownloadProPage"
// utils function
import { PostToContent, registerCB } from "../util/Comm"

// static source
import LOGO_IMGSRC from "../static/icon-Oolet.png"
import BG_SRC from "../static/bg.png"

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

        // mount
        const onBarMountRef = (ref) => {
            this.barRef = ref
        }
        //event of wheel
        document.addEventListener("wheel", (e) => {
            if (this.barRef) {
                if (e.deltaY < 0) {
                    this.barRef.style.height = "2.5rem";
                    this.barRef.style.opacity = "1"
                } else {
                    this.barRef.style.height = "0rem";
                    this.barRef.style.opacity = "0"
                }
            }
        })

        return (
            <div className={styles.barStyle} ref={onBarMountRef} >
                <div className={styles.barImgWrapperStyle}>
                    <img src={LOGO_IMGSRC} alt="" />
                </div>
                <div className={styles.controlWrapper}>
                    <Link to="/">
                        <span className={styles.barTextStyle}>Home</span>
                    </Link>
                    <Link to="/gather">
                        <span className={styles.barTextStyle}>Collect</span>
                    </Link>
                    <Link to="/downloadpro">
                        <span className={styles.barTextStyle}>Product</span>
                    </Link>
                    <a href="/#emailId">
                        <span className={styles.barTextStyle}>Contact</span>
                    </a>
                </div>
            </div>
        )
    }

    componentDidMount() {
        registerCB({ type: "FROM_EXTENSION", callback: this.getContentListCallback })
    }

    render() {

        const style = {
            backgroundImage: `url(${BG_SRC})`,
        }

        return (
            <div className={styles.container} style={style}>
                <BrowserRouter>
                    <this.BarContainer />
                    <div className={styles.contentWrapper}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/gather" element={<GatherPage contentList={this.state.contentList} gatherHandler={this.collectHandler} />} />
                            <Route path="/downloadpro" element={<DownloadProPage />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}
