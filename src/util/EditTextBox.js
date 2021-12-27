import React, { Component } from 'react'

// MODE SEL SETTING
const NULL_MODE = 0
const EDIT_MODE = 1
const MOVE_MODE = 2

export default class EditTextBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            funcMode: NULL_MODE,
            editEnable: false,

            editStyle: {
                fontSize: "5rem",
                color: "lightblue",
            },
            containerStyle: {
                position: "absolute",
                top: "5px",
                left: "5px",
                boxShadow: "2px 2px 8px lightblue",
                width: "auto",
                height: "auto",
                cursor: "default",
            }
        }

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
                funcMode: (state.funcMode + 1 > MOVE_MODE) ? NULL_MODE : state.funcMode + 1,
            }
        }, () => {
            this.styleSwitchHandler({ mX: e.clientX, mY: e.clientY })
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


    // life-cycle
    refMount = (ref) => {
        this.node = ref

        if (this.node) {
            this.nodeStaticRect = this.node.getBoundingClientRect()
        }
    }

    componentDidMount() {
        document.addEventListener('mousemove', (e) => {
            this.moveHandler(e)
        })
    }

    render() {
        return (
            <div style={this.state.containerStyle} ref={this.refMount} onDoubleClick={this.swithModeHandler}>
                <div contentEditable={this.state.editEnable} style={this.state.editStyle} onInput={this.inputHandler}>
                    TEXT
                </div>
            </div>
        )
    }
}
