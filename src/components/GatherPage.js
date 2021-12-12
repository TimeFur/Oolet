import React, { Component } from 'react'
import styles from "./GatherPage.module.css"

// components
import ListShoots from "./CollectComponents/ListShoots"
import FuncBar from "./CollectComponents/FuncBar"
import CropImageContainer from "./CropImageContainer"

export default class GatherPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pickStatus: {}, //{imgSrc, append},
            searchImage: undefined,
            cropImageSrc: "",
            cropInfo: {},
            funcBarComp: undefined
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

    cropCompleteCallback = (cropImageSrc, cropInfo) => {
        // mouse release
        this.setState(state => {
            return {
                cropImageSrc: cropImageSrc,
                cropInfo: cropInfo
            }
        })
    }

    // sub-components

    render() {
        return (
            <>
                <div className={styles.layoutContainerStyle}>
                    <input type="button" value="Gather Shoots" onClick={this.gatherHandler} />
                    <ListShoots contentList={this.props.contentList} setImgCb={this.setPickImgCallback} />
                </div>
                <div className={styles.ContentConainerStyle}>
                    <FuncBar cropInfo={this.state.cropInfo} cropImageSrc={this.state.cropImageSrc} />
                    <CropImageContainer imgSrc={this.state.pickStatus.imgSrc} cropCompleteCallback={this.cropCompleteCallback} />
                </div>
            </>
        )
    }
}
