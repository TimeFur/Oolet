import React, { Component } from 'react'
import styles from "./ImgInteract.module.css"


const RBID = "scaleRB"
const LTID = "scaleLT"
const RTID = ""
const LBID = ""

const CROP_RBID = "cropRB"
const CROP_LTID = "cropLT"
const CROP_RTID = ""
const CROP_LBID = ""

const SCALE_OFFSET = 10
// with scale, crop and rotation
export default class ImgInteract extends Component {

    constructor(props) {
        super(props)

        this.state = {
            scale: {
                width: "",
                height: "",
            },
            crop: {

            },
            rotation: "",
            opacity: "",
            zIndex: 0
        }

        // TODO: merge as one event queue
        this.scaleFlag = false;
        this.moveFlag = false;
        this.cropFlag = false;

        //three instance
        this.node = null
        this.nodeImgWrapper = null
        this.nodeImg = null

        this.nodeStaticRect = {}
        this.imgRect = {}

        this.scaleDir = null
        this.cropDir = null

    }

    // 
    toggleScaleHandler = (e) => {
        const target = e.currentTarget
        console.log(target.id)
        // console.log("toggleScaleHandler", this.scaleFlag, this.node.getAttribute("data-x"))
        switch (target.id) {
            case this.props.id:
                this.moveFlag = !this.moveFlag;
                break;
            case CROP_RBID:
            case CROP_LTID:
            case CROP_RTID:
            case CROP_LBID:
                this.cropFlag = !this.cropFlag
                if (this.cropFlag == true) {
                    this.cropDir = e.currentTarget.getAttribute("id")
                    this.imgRect = this.nodeImg.getBoundingClientRect()
                    // console.log(this.node.childNodes[0].childNodes[0].getBoundingClientRect())
                }
                break;
            case RBID:
            case LTID:
            case RTID:
            case LBID:
                this.scaleFlag = !this.scaleFlag
                if (this.scaleFlag == true) {
                    this.scaleDir = e.currentTarget.getAttribute("id")
                }
                break;
        }
    }

    // handler for different function
    moveHandler = (e) => {
        if (this.moveFlag) {
            var { top, left, right, bottom, width, height } = this.nodeStaticRect
            var mX = e.clientX
            var mY = e.clientY

            // TODO: how to get the first touch position
            this.node.style.top = `${mY - (top + height / 2)}px`
            this.node.style.left = `${mX - (left + width / 2)}px`
        }
    }

    scaleHandler = (e) => {
        if (this.scaleFlag) {
            var { top, left, right, bottom, width, height } = this.node.getBoundingClientRect()

            var mX = e.clientX
            var mY = e.clientY
            var w = width;
            var h = height;
            // console.log(this.scaleDir, mY, mX, this.node.offsetLeft, this.node.style.transform)

            //RB estimate
            if (this.scaleDir == RBID) {
                w = mX - left
                h = mY - top
                this.node.style.width = `${w - SCALE_OFFSET}px`
                this.node.style.height = `${h - SCALE_OFFSET}px`
            }

            //LT estimate
            if (this.scaleDir == LTID) {
                w = right - mX - SCALE_OFFSET
                h = bottom - mY - SCALE_OFFSET

                this.node.style.width = `${w}px`
                this.node.style.height = `${h}px`
                this.node.style.top = `${mY - (this.nodeStaticRect.top) + SCALE_OFFSET}px`
                this.node.style.left = `${mX - (this.nodeStaticRect.left) + SCALE_OFFSET}px`
            }
        }
    }

    cropHandler = (e) => {
        if (this.cropFlag) {
            var { top, left, right, bottom, width, height } = this.node.getBoundingClientRect()
            var { top: imgTop, left: imgLeft, width: imgWidth, height: imgHeight } = this.imgRect

            console.log(imgTop, imgLeft, imgWidth, imgHeight)


            var mX = e.clientX
            var mY = e.clientY
            var w = width;
            var h = height;

            //RB estimate
            if (this.cropDir == CROP_RBID) {
                w = mX - left
                h = mY - top
                this.node.style.width = `${w}px`
                this.node.style.height = `${h}px`

            }

            //LT estimate
            if (this.cropDir == CROP_LTID) {
                w = right - mX
                h = bottom - mY

                this.node.style.width = `${w}px`
                this.node.style.height = `${h}px`
                this.node.style.top = `${mY - (this.nodeStaticRect.top)}px`
                this.node.style.left = `${mX - (this.nodeStaticRect.left)}px`
            }

            // this.nodeImg.style.width = `${imgWidth}px`
            // this.nodeImg.style.height = `${imgHeight}px`
            // this.nodeImg.style.top = `${imgTop - mY}px`
            // this.nodeImg.style.left = `${imgLeft - mX}px`
        }
    }
    // life-cycle handler
    componentDidMount() {
        // console.log(this.node)
        document.addEventListener("mousemove", (e) => {
            //select which func should be invoked
            this.scaleHandler(e)
            this.moveHandler(e)
            this.cropHandler(e)
        })
    }

    refMount = (ref) => {
        this.node = ref

        if (this.node != null) {
            this.nodeImgWrapper = this.node.childNodes[0]
            this.nodeImg = this.node.childNodes[0].childNodes[0];
            this.nodeStaticRect = this.node.getBoundingClientRect()
        }
    }

    render() {
        return (
            <div className={styles.container} ref={this.refMount} >
                <div className={styles.imgWrapper}>
                    <img id={this.props.id} className={styles.imgStyle} src={this.props.src} alt="" srcset="" onClick={(e) => this.toggleScaleHandler(e)} />
                </div>

                <div id={RBID} className={styles.scaleRBStyle}
                    onMouseUp={(e) => this.toggleScaleHandler(e)}
                ></div>
                <div id={LTID} className={styles.scaleLTStyle}
                    onMouseUp={(e) => this.toggleScaleHandler(e)}
                ></div>
                <div id={CROP_RBID} className={styles.cropRBStyle}
                    onMouseUp={(e) => this.toggleScaleHandler(e)}
                ></div>
                <div id={CROP_LTID} className={styles.cropLTStyle}
                    onMouseUp={(e) => this.toggleScaleHandler(e)}
                ></div>
            </div>
        )
    }
}
