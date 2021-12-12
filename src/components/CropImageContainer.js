import React, { Component } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const DEFAULT_IMG_PATH = ""

export default class CropImageContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            crop: {
                unit: 'px', // default, can be 'px' or '%'
                x: 0,
                y: 0,
                width: 200,
                height: 200
            },
            croppedImageUrl: ""
        }
    }
    onCropComplete = (crop) => {
        this.makeClientCrop(crop);
    };
    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );

            this.setState({ croppedImageUrl }, () => {
                this.props.cropCompleteCallback(this.state.croppedImageUrl, crop)
            });
        }
    }
    onChange = crop => {
        this.setState({ crop });
    };
    onImageLoaded = image => {
        this.setState({ crop: { width: image.width, height: image.height } });
        return false; // Return false when setting crop state in here.
    };
    onImageLoaded = (image) => {
        this.imageRef = image;
    };

    // function
    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        return new Promise((resolve, reject) => {
            resolve(canvas.toDataURL())
        });
    }
    // component
    CropDemo = ({ src = DEFAULT_IMG_PATH }) => {
        return <ReactCrop src={src}
            crop={this.state.crop}
            onImageLoaded={this.onImageLoaded}
            onChange={this.onChange}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete} />;
    }

    render() {
        return (
            <div>
                {this.CropDemo({ src: this.props.imgSrc })}
            </div>
        )
    }
}
