import React, { Component } from 'react'
import styles from "./ImgInteract.module.css"


const RBID = "scaleRB"
const LTID = "scaleLT"
const RTID = ""
const LBID = ""

const SCALE_OFFSET = 10
// with scale, crop and rotation
export default class ImgInteract extends Component {

    constructor(props) {
        super(props)

        this.state = {
            scale: {
                width: "250px",
                height: "250px",
            },
            crop: {

            },
            rotation: "",
            opacity: "",
            zIndex: 0
        }

        this.scaleFlag = false;
        this.scaleDir = null
        this.node = null
        this.nodeStaticRect = {}

        this.moveFlag = false;
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
            console.log(this.scaleDir, mY, mX, this.node.offsetLeft, this.node.style.transform)

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
    // life-cycle handler
    componentDidMount() {
        // console.log(this.node)
        document.addEventListener("mousemove", (e) => {
            //select which func should be invoked
            this.scaleHandler(e)
            this.moveHandler(e)
        })
    }

    render() {

        const wrapperStyle = {
            position: "relative",
            background: "grey",
            width: this.state.scale.width,
            height: this.state.scale.height,
            top: 0,
            left: 0
        }

        return (
            <div style={wrapperStyle} ref={(node => {
                this.node = node
                this.nodeStaticRect = this.node.getBoundingClientRect()
            })} >
                <img id={this.props.id} className={styles.imgStyle} src={this.props.src} alt="" srcset="" onClick={(e) => this.toggleScaleHandler(e)} />
                <div id={RBID} className={styles.scaleRBStyle}
                    onMouseUp={(e) => this.toggleScaleHandler(e)}
                ></div>
                <div id={LTID} className={styles.scaleLTStyle}
                    onMouseUp={(e) => this.toggleScaleHandler(e)}
                ></div>
            </div>
        )
    }
}
