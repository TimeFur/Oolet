import React, { Component } from 'react'
import styles from "./OoletContainer.module.css"

import { PostToContent, registerCB } from "../util/Comm"

import ListShoots from "./ListShoots"
import ContentPlate from "./ContentPlate"
import CropImageContainer from "./CropImageContainer"
import ImgSearch from "../util/ImgSearch"
import { downloadImage } from "../util/download"
// static source
import LOGO_IMGSRC from "../static/icon-Oolet.png"

export default class OoletContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentList: [],
            pickStatus: {}, //{imgSrc, append},
            searchImage: undefined,
            cropImageSrc: ""
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
        this.setState(state => {
            return {
                contentList: data.imgList
            }
        })

    }

    searchImgHandler = (e) => {
        this.setState(state => {
            return {
                searchImage: state.cropImageSrc
            }
        }, () => {
            this.setState(state => {
                return {
                    searchImage: undefined
                }
            })
        })
    }

    downloadImgHandler = (e) => {
        downloadImage(this.state.cropImageSrc)
    }

    cropCompleteCallback = (cropImageSrc) => {
        this.setState(state => {
            return {
                cropImageSrc: cropImageSrc
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
                <ImgSearch searchImg={this.state.searchImage} />
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
                        <CropImageContainer imgSrc={this.state.pickStatus.imgSrc} cropCompleteCallback={this.cropCompleteCallback} />
                        {/* <ContentPlate pickStatus={this.state.pickStatus} /> */}
                    </div>
                    <div>
                        {/* for advertisement */}
                    </div>
                </div>
            </div>
        )
    }
}
