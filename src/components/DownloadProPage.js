import React, { Component } from 'react'
import FireBaseFunc from "../util/FirebaseFunc"

export default class DownloadProPage extends Component {
    constructor(props) {
        super(props)
    }


    // Handler
    downloadHandler = (e) => {
        FireBaseFunc.downloadHandler("WU.jpg")
            .then((url) => {
                console.log("download ", url)
            })
    }

    render() {
        return (
            <div>
                DownloadProPage
                <div onClick={this.downloadHandler}>
                    Click
                </div>
            </div>
        )
    }
}
