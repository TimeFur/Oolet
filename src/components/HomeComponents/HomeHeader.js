import React, { Component } from 'react'
import styles from "./HomeHeader.module.css"
// modules
import YouTube from 'react-youtube';
// api
import FireBaseFunc from "../../util/FirebaseFunc"

import LOGO_IMGSRC from "../../static/icon-Oolet.png"
const DEFAULT_VID_ID = "5qr2WzQrrJQ"
export default class HomeHeader extends Component {
    constructor(props) {
        super(props)
    }

    // Handler
    downloadHandler = (e) => {
        FireBaseFunc.downloadHandler(process.env.REACT_APP_DOWNLOAD_FREE_FILE)
            .then((url) => {
                console.log("download ", url)
                window.open(url, '_blank').focus();
            })
    }
    // sub-components
    iconFloat = () => {
        return (
            <div className={styles.iconFlatStyle}>
                <img src={LOGO_IMGSRC} alt="" srcSet="" />
            </div>
        )
    }

    DespProductComponent = () => {
        return (<div className={styles.despStyle}>
            <div className={styles.despTitleStyle}>
                <h1>
                    O
                    o
                    l
                    e
                    t
                </h1>
            </div>
            <div className={styles.despDetailStyle}>
                <p>
                    Screenshot visible web page and snap to anywhere in the site
                    after website loading finished, you can shot mulitple images and save meaningful part
                    also show in the site
                </p>
                <p>
                    Oolet extension is created for user want to shot and see in current site
                    Also, want to see the different paragraph at the same time
                </p>
            </div>
            <div className={styles.despDownloadStyle} onClick={this.downloadHandler}>
                Free Download
            </div>
        </div>)
    }

    VideoDespComponent = () => {
        const opts = {
            height: '720',
            width: '1280',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                loop: 1
            },
        };

        return (
            <div className={styles.vidManualStyle}>
                <YouTube videoId={DEFAULT_VID_ID} opts={opts} />
            </div>
        )
    }

    render() {

        const style = {
            height: this.props.height
        }
        return (
            <div className={styles.container} style={style}>
                <this.DespProductComponent />
                <this.VideoDespComponent />
            </div>
        )
    }
}
