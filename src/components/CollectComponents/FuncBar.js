import React, { Component } from 'react'
import styles from "./FuncBar.module.css"
//utils
import ImgSearch from "../../util/ImgSearch"
import { downloadImage } from "../../util/download"

export default class FuncBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchImage: undefined
        }
    }

    // Handler
    downloadImgHandler = (e) => {
        downloadImage(this.props.cropImageSrc)
    }

    searchImgHandler = (e) => {
        this.setState(state => {
            return {
                searchImage: this.props.cropImageSrc
            }
        }, () => {
            this.setState(state => {
                return {
                    searchImage: undefined
                }
            })
        })
    }

    // component
    funcBarUpdate = (cropInfo = { x: 0, y: 0 }) => {
        const style = {
            position: "absolute",
            top: cropInfo.y,
            left: cropInfo.x,
            width: "10rem",
            backgroundColor: "yellow",
            transition: "all 0.2s ease",
            zIndex: 2
        }

        return (
            <div style={style}>
                <input className={styles.editBarSearchStyle} type="button" value="search" onClick={(e) => this.searchImgHandler(e)} />
                <input className={styles.editBarDownloadStyle} type="button" value="download" onClick={(e) => this.downloadImgHandler(e)} />
            </div>
        )
    }

    render() {
        return (
            <>
                {this.funcBarUpdate(this.props.cropInfo)}
                <ImgSearch className={styles.hiddenStyle} searchImg={this.state.searchImage} />
            </>
        )
    }
}
