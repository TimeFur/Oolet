import React, { Component } from 'react'
import styles from "./GatherPage.module.css"

// components
import ListShoots from "./ListShoots"
import CropImageContainer from "./CropImageContainer"

//utils
import ImgSearch from "../util/ImgSearch"
import { downloadImage } from "../util/download"

export default class GatherPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pickStatus: {}, //{imgSrc, append},
            searchImage: undefined,
            cropImageSrc: ""
        }
    }

    // Handler and callback
    gatherHandler = (e) => {
        this.props.gatherHandler(e)
    }
    setPickImgCallback = (data) => {
        this.setState(state => {
            return {
                pickStatus: data
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

    // sub-components
    editImageBarContainer = () => {
        return (
            <div className={styles.editImgBarStyle}>
                <input className={styles.editBarSearchStyle} type="button" value="search" onClick={(e) => this.searchImgHandler(e)} />
                <input className={styles.editBarDownloadStyle} type="button" value="download" onClick={(e) => this.downloadImgHandler(e)} />
                <ImgSearch className={styles.hiddenStyle} searchImg={this.state.searchImage} />
            </div>
        )
    }
    render() {
        return (
            <>
                <div className={styles.layoutContainerStyle}>
                    <input type="button" value="Gather Shoots" onClick={this.gatherHandler} />
                    <ListShoots contentList={this.props.contentList} setImgCb={this.setPickImgCallback} />
                </div>
                <div className={styles.ContentConainerStyle}>
                    <this.editImageBarContainer />
                    <CropImageContainer imgSrc={this.state.pickStatus.imgSrc} cropCompleteCallback={this.cropCompleteCallback} />
                </div>
            </>
        )
    }
}
