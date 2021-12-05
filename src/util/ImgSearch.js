import React, { Component } from 'react'

export default class ImgSearch extends Component {

    constructor(props) {
        super(props)
        this.formInst = null

        //get cb for getting imgSrc from bg

    }

    autoImgSearch = (img) => {

        // this.props.searchImg
        this.dataURLtoFile(img, "img.png", (file) => {
            // console.log("image search")
            this.fileInst.files = file
            this.formInst.submit();
            // console.log("image search finished")
        })

    }
    // base64 to byte
    dataURLtoFile = (dataurl, filename, cb = null) => {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        var finalFile = new File([u8arr], filename, { type: mime })
        //data transfer
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(finalFile)
        if (cb)
            cb(dataTransfer.files)

        return finalFile;
    }

    //ref mount callback
    mountFormInst = (ref) => {
        this.formInst = ref
    }
    mountFileInst = (ref) => {
        this.fileInst = ref
    }

    componentDidUpdate() {
        if (this.props.searchImg)
            this.autoImgSearch(this.props.searchImg)
    }

    render() {
        return (
            <div className={this.props.className}>
                <form id="formId" ref={this.mountFormInst} action="https://www.google.com/searchbyimage/upload" method="POST" target="_blank" encType="multipart/form-data">
                    <input ref={this.mountFileInst} type="file" id="fId" name="encoded_image" />
                </form>
            </div>
        )
    }
}
