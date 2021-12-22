import React, { Component } from 'react'

// Default img Style 
const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain"
}

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
    }

    render() {

        const wrapperStyle = {
            position: "relative",
            background: "grey",
            width: this.state.scale.width,
            height: this.state.scale.height,
        }

        return (
            <div style={wrapperStyle}>
                <img style={imgStyle} src={this.props.src} alt="" srcset="" />
            </div>
        )
    }
}
