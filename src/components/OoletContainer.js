import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styles from "./OoletContainer.module.css"

// componenets
import GatherPage from "./GatherPage"
import HomePage from "./HomePage"
import DownloadProPage from "./DownloadProPage"
import EmailComponent from "./EmailComponent"
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
        return (
            <div className={styles.barStyle}>
                <div className={styles.barImgWrapperStyle}>
                    <img src={LOGO_IMGSRC} alt="" />
                </div>
                <div className={styles.barTitleStyle}>Oolet</div>
                <div className={styles.controlWrapper}>
                    <Link to="/">HOME</Link>
                    <Link to="/gather">Gather</Link>
                    <Link to="/downloadpro">Download</Link>
                </div>
            </div>
        )
    }



    // life cycle
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
                            <Route path="/gather" element={<GatherPage contentList={this.state.contentList} gatherHandler={this.collectHandler} />} ></Route>
                            <Route path="/downloadpro" element={<DownloadProPage />} />
                        </Routes>
                        <div>
                            {/* for advertisement */}
                        </div>
                    </div>
                    <div className={styles.footerStyle}>
                        <EmailComponent height="20vh" width="100vw" />
                    </div>

                </BrowserRouter>
            </div>
        )
    }
}
