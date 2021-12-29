import React, { Component } from 'react'

import "slider-color-picker";
// MODE SEL SETTING
const NULL_MODE = 0
const MOVE_MODE = 1
const EDIT_MODE = 2

export default class EditTextBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            funcMode: NULL_MODE,
            editEnable: false,

            editStyle: {
                fontSize: "20px",
                color: "lightblue",
                boxShadow: "2px 2px 8px lightblue",
            },
            containerStyle: {
                position: "absolute",
                top: "5px", left: "5px",
                // width: "auto", height: "auto",
                cursor: "default",
            }
        }
        this.colorNode = null
        this.nodeStaticRect = {}
        this.clickPos = {}
    }
    // Handler
    styleSwitchHandler = ({ mX = 0, mY = 0 }) => {

        var containerStyle = { ...this.state.containerStyle }
        var editStyle = { ...this.state.editStyle }
        var editEnable = false

        // TODO: setting mode
        if (this.state.funcMode == MOVE_MODE) {
            this.clickPos = {
                'left': mX - this.node.getBoundingClientRect()['left'],
                'top': mY - this.node.getBoundingClientRect()['top'],
            }
            containerStyle.cursor = "grabbing"
        }

        if (this.state.funcMode == EDIT_MODE) {
            containerStyle.cursor = "text"
            editEnable = true
        }

        if (this.state.funcMode == NULL_MODE) {
            containerStyle.cursor = "default"
        }

        // setState
        this.setState(state => {
            return {
                ...state,
                containerStyle: containerStyle,
                editStyle: editStyle,
                editEnable: editEnable
            }
        })
    }

    swithModeHandler = (e) => {
        this.setState(state => {
            return {
                funcMode: (state.funcMode + 1 > EDIT_MODE) ? NULL_MODE : state.funcMode + 1,
            }
        }, () => {
            this.styleSwitchHandler({ mX: e.clientX, mY: e.clientY })
            // avoid selection
            var sel = window.getSelection();
            sel.removeAllRanges();
        })
    }
    inputHandler = (e) => {
        const target = e.currentTarget
        console.log(target.textContent, target.innerHTML)
    }
    moveHandler = (e) => {

        if (this.node == null)
            return
        if (this.state.funcMode == MOVE_MODE) {
            var { top, left } = this.nodeStaticRect
            var mX = e.clientX
            var mY = e.clientY
            this.node.style.top = `${mY - top - this.clickPos['top']}px`
            this.node.style.left = `${mX - left - this.clickPos['left']}px`
        }
    }

    onColorChange = (e) => {
        const target = e.currentTarget
        const color = target.value
        this.setState(state => {
            var editStyle = { ...state.editStyle }
            editStyle.color = color
            return {
                ...state,
                editStyle: editStyle
            }
        })
    }

    textSizeHandler = (e) => {
        const target = e.currentTarget
        const size = target.value

        this.setState(state => {
            var editStyle = { ...state.editStyle }
            editStyle.fontSize = `${size}px`
            return {
                ...state,
                editStyle: editStyle
            }
        })
    }
    // life-cycle
    refMount = (ref) => {
        this.node = ref

        if (this.node) {
            this.nodeStaticRect = this.node.getBoundingClientRect()
        }
    }

    colorRefMount = (ref) => {
        this.colorNode = ref;
        if (this.colorNode != null)
            this.colorNode.addEventListener("change", this.onColorChange);
    }

    componentDidMount() {
        document.addEventListener('mousemove', (e) => {
            this.moveHandler(e)
        })
    }

    render() {
        return (
            <div style={this.state.containerStyle} ref={this.refMount} onDoubleClick={this.swithModeHandler}>
                {(this.state.funcMode == EDIT_MODE) ? <input type="range" min="6" max="200" value={parseInt(this.state.editStyle.fontSize)} onInput={this.textSizeHandler} /> : ""}
                <div contentEditable={this.state.editEnable} style={this.state.editStyle} onInput={this.inputHandler}>
                    TEXT
                </div>
                {(this.state.funcMode == EDIT_MODE) ? <slider-color-picker ref={this.colorRefMount}></slider-color-picker> : ""}
            </div>
        )
    }
}
