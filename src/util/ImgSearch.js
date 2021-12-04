import React, { Component } from 'react'

export default class ImgSearch extends Component {

    constructor(props) {
        super(props)
        this.formInst = null

        //get cb for getting imgSrc from bg

    }

    //ref mount callback
    mountFormInst = (ref) => {
        this.formInst = ref
    }

    render() {
        return (
            <div>
                <form id="formId" ref={this.mountFormInst} action="https://www.google.com/searchbyimage/upload" METHOD="POST" enctype="multipart/form-data">
                    <input type="file" id="fId" name="encoded_image" />
                </form>
            </div>
        )
    }
}
