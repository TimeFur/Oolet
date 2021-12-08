import React, { Component } from 'react'
import styles from "./HomeHeader.module.css"
// modules
import YouTube from 'react-youtube';

import LOGO_IMGSRC from "../../static/icon-Oolet.png"

export default class HomeHeader extends Component {
    constructor(props) {
        super(props)
    }

    // Handler

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
                <h1>Oolet</h1>
                <p>
                    Screenshot visible web page and snap to anywhere in the site
                    after website loading finished, you can shot mulitple images and save meaningful part
                    also show in the site
                </p>
                <p>
                    Oolet extension is created for user want to shot several times in one site
                    Also, want to see the different paragraph at the same time
                </p>
            </div>
            <div className={styles.despDetailStyle}></div>
        </div>)
    }

    VideoDespComponent = () => {
        const opts = {
            height: '720',
            width: '1280',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };
        return (
            <div className={styles.vidManualStyle}>
                <YouTube videoId="nXpB1rixnPQ" opts={opts} />
            </div>
        )
    }

    render() {

        const style = {
            height: this.props.height
        }
        return (
            <div className={styles.container} style={style}>
                <this.iconFloat />
                <this.DespProductComponent />
                <this.VideoDespComponent />
            </div>
        )
    }
}
