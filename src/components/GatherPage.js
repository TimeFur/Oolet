import React, { Component } from 'react'
import styles from "./GatherPage.module.css"

// components
import ListShoots from "./CollectComponents/ListShoots"
import FuncBar from "./CollectComponents/FuncBar"
import ToolBar from "./CollectComponents/ToolBar"
import CollectMap from "./CollectComponents/CollectMap"
import CropImageContainer from "./CropImageContainer"

export default class GatherPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pickStatus: {}, //{imgSrc, append},
            searchImage: undefined,
            cropImageSrc: "",
            cropInfo: {},
            funcBarComp: undefined,
            swapIndex: 0
        }

        this.swapBufferList = []
    }

    // Handler and callback
    swapBufferHandler = (e) => {
        this.setState(state => {
            var len = this.swapBufferList.length
            if (len != 0) {
                return {
                    swapIndex: (state.swapIndex + 1 >= len) ? 0 : (state.swapIndex + 1)
                }
            }
        })
    }
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
    containerBarWrapper = (props) => {
        return (
            <div className={styles.containerBarStyle}>
                <div className={styles.swapListStyle} onClick={this.swapBufferHandler}>
                    Swap
                </div>
                <div className={styles.toolBarStyle}>
                    <ToolBar />
                </div>
            </div>
        )
    }

    exhibitComponent = () => {
        this.swapBufferList = [
            <CollectMap />,
            <>
                <FuncBar cropInfo={this.state.cropInfo} cropImageSrc={this.state.cropImageSrc} />
                <CropImageContainer imgSrc={this.state.pickStatus.imgSrc} cropCompleteCallback={this.cropCompleteCallback} />
            </>
        ]
        const selfStyle = {
            width: "100%",
        }

        return (
            <div style={selfStyle}>
                {(this.swapBufferList.length > 0) ? this.swapBufferList[this.state.swapIndex] : ""}
            </div>
        )
    }

    containerEditWrapper = (props) => {
        return (
            <div className={styles.containerEditStyle}>
                <div className={styles.layoutContainerStyle}>
                    <input type="button" className={styles.collectBtnStyle} value="Collect Shoots" onClick={this.gatherHandler} />
                    <ListShoots contentList={this.props.contentList} setImgCb={this.setPickImgCallback} />
                </div>
                <div className={styles.contentConainerStyle}>
                    <this.exhibitComponent />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={styles.container}>
                <this.containerBarWrapper />
                <this.containerEditWrapper />
            </div>
        )
    }
}
